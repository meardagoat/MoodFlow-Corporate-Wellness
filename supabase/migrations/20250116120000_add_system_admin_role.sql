/*
  # Ajout du rôle system_admin
  
  Cette migration ajoute le rôle 'system_admin' au système de rôles hiérarchique.
  
  ## Changements
  - Ajoute 'system_admin' aux valeurs possibles du champ role
  - Met à jour les contraintes CHECK
  - Ajoute des policies RLS pour les system_admin
  - Crée un script pour créer le premier system_admin
*/

-- Supprimer l'ancienne contrainte et ajouter la nouvelle
ALTER TABLE profiles DROP CONSTRAINT IF EXISTS profiles_role_check;
ALTER TABLE profiles ADD CONSTRAINT profiles_role_check 
  CHECK (role IN ('employee', 'manager', 'system_admin'));

-- Ajouter des policies RLS pour les system_admin
CREATE POLICY "System admins can view all profiles"
  ON profiles FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'system_admin'
    )
  );

CREATE POLICY "System admins can update any profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'system_admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'system_admin'
    )
  );

-- Policy pour que les system_admin puissent créer des utilisateurs
CREATE POLICY "System admins can create profiles"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'system_admin'
    )
  );

-- Policy pour que les managers puissent créer des employés
CREATE POLICY "Managers can create employee profiles"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'manager'
    )
    AND role = 'employee'
  );

-- Fonction pour créer le premier system_admin
-- À utiliser manuellement avec l'email du premier admin
CREATE OR REPLACE FUNCTION create_first_system_admin(admin_email text)
RETURNS void AS $$
DECLARE
  user_id uuid;
BEGIN
  -- Vérifier si l'utilisateur existe déjà
  SELECT id INTO user_id FROM auth.users WHERE email = admin_email;
  
  IF user_id IS NOT NULL THEN
    -- Mettre à jour le rôle existant
    UPDATE profiles 
    SET role = 'system_admin', updated_at = now()
    WHERE id = user_id;
    
    RAISE NOTICE 'Utilisateur % promu au rôle system_admin', admin_email;
  ELSE
    RAISE EXCEPTION 'Utilisateur avec l''email % non trouvé. Créez d''abord le compte utilisateur.', admin_email;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Commentaire pour l'utilisation
COMMENT ON FUNCTION create_first_system_admin IS 
'Utilisez cette fonction pour promouvoir un utilisateur existant au rôle system_admin.
Exemple: SELECT create_first_system_admin(''admin@company.com'');';

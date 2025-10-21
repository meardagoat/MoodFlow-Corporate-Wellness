-- Fix pour les policies RLS qui causent une récursion infinie
-- À exécuter dans Supabase SQL Editor

-- 1. Supprimer les policies problématiques
DROP POLICY IF EXISTS "System admins can view all profiles" ON profiles;
DROP POLICY IF EXISTS "System admins can update any profile" ON profiles;
DROP POLICY IF EXISTS "System admins can create profiles" ON profiles;
DROP POLICY IF EXISTS "Managers can create employee profiles" ON profiles;

-- 2. Recréer les policies sans récursion
-- Policy pour la lecture - tous les utilisateurs authentifiés peuvent voir tous les profils
CREATE POLICY "Authenticated users can view all profiles"
  ON profiles FOR SELECT
  TO authenticated
  USING (true);

-- Policy pour la mise à jour - les utilisateurs peuvent modifier leur propre profil
CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Policy pour l'insertion - seuls les utilisateurs authentifiés peuvent créer des profils
-- (géré par la fonction handle_new_user)
CREATE POLICY "Authenticated users can create profiles"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- 3. Vérifier que la fonction create_first_system_admin existe toujours
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

-- 4. Commentaire pour l'utilisation
COMMENT ON FUNCTION create_first_system_admin IS 
'Utilisez cette fonction pour promouvoir un utilisateur existant au rôle system_admin.
Exemple: SELECT create_first_system_admin(''admin@company.com'');';

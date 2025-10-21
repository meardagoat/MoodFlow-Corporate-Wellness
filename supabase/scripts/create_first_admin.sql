/*
  # Script pour créer le premier Super Admin
  
  Ce script permet de promouvoir un utilisateur existant au rôle system_admin.
  Utilisez ce script après avoir créé un compte utilisateur normal.
  
  ## Utilisation
  
  1. Créez d'abord un compte utilisateur normal via l'interface d'inscription
  2. Exécutez ce script en remplaçant 'admin@company.com' par l'email de l'utilisateur
  3. L'utilisateur sera promu au rôle system_admin
  
  ## Exemple d'utilisation
  
  ```sql
  SELECT create_first_system_admin('admin@company.com');
  ```
*/

-- Vérifier si la fonction existe déjà
DO $$
BEGIN
  -- La fonction create_first_system_admin devrait déjà exister dans la migration
  -- mais on la recrée ici pour être sûr
  IF NOT EXISTS (SELECT 1 FROM pg_proc WHERE proname = 'create_first_system_admin') THEN
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
  END IF;
END $$;

-- Commentaire pour l'utilisation
COMMENT ON FUNCTION create_first_system_admin IS 
'Utilisez cette fonction pour promouvoir un utilisateur existant au rôle system_admin.
Exemple: SELECT create_first_system_admin(''admin@company.com'');';

-- Instructions d'utilisation
DO $$
BEGIN
  RAISE NOTICE '=== INSTRUCTIONS POUR CRÉER LE PREMIER SUPER ADMIN ===';
  RAISE NOTICE '1. Créez d''abord un compte utilisateur normal via l''interface d''inscription';
  RAISE NOTICE '2. Remplacez ''admin@company.com'' par l''email de l''utilisateur dans la commande suivante:';
  RAISE NOTICE '3. Exécutez: SELECT create_first_system_admin(''admin@company.com'');';
  RAISE NOTICE '4. L''utilisateur sera promu au rôle system_admin et pourra accéder au panneau d''administration';
  RAISE NOTICE '================================================';
END $$;

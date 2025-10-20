-- filepath: supabase/migrations/20251020_add_system_admin_role.sql
BEGIN;

-- Retirer la contrainte existante si elle existe
ALTER TABLE profiles DROP CONSTRAINT IF EXISTS profiles_role_check;

-- Recréer la contrainte en incluant system_admin
ALTER TABLE profiles ADD CONSTRAINT profiles_role_check
  CHECK (role IN ('employee', 'manager', 'system_admin'));

COMMIT;

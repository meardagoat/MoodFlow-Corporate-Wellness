-- Fonction pour récupérer l'email d'un utilisateur
-- Cette fonction permet aux super admins de voir les emails dans les demandes de modification

CREATE OR REPLACE FUNCTION get_user_email(user_uuid uuid)
RETURNS text AS $$
DECLARE
  user_email text;
BEGIN
  -- Récupérer l'email depuis auth.users
  SELECT email INTO user_email
  FROM auth.users
  WHERE id = user_uuid;
  
  RETURN COALESCE(user_email, 'Email non disponible');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Créer une vue pour les demandes avec emails
CREATE OR REPLACE VIEW modification_requests_with_email AS
SELECT 
  mr.*,
  get_user_email(mr.user_id) as user_email
FROM modification_requests mr;

-- Donner l'accès aux utilisateurs authentifiés
GRANT SELECT ON modification_requests_with_email TO authenticated;

-- Commentaire
COMMENT ON FUNCTION get_user_email IS 
'Récupère l''email d''un utilisateur depuis auth.users. Utilisée pour afficher les emails dans les demandes de modification.';

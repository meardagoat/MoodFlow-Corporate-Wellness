/*
  # Système de Demandes de Modification
  
  Cette migration crée un système de demandes de modification d'informations
  où les utilisateurs peuvent demander des changements et les super admins
  peuvent les approuver après vérification.
  
  ## Nouvelle Table: modification_requests
  
  - `id` (uuid, primary key)
  - `user_id` (uuid, references profiles) - Utilisateur qui fait la demande
  - `request_type` (text) - Type de demande: 'email_change', 'service_change', 'display_name_change'
  - `current_value` (text) - Valeur actuelle
  - `requested_value` (text) - Nouvelle valeur demandée
  - `reason` (text) - Raison de la demande
  - `status` (text) - Statut: 'pending', 'approved', 'rejected'
  - `admin_id` (uuid, references profiles) - Super admin qui traite la demande
  - `admin_notes` (text) - Notes du super admin
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)
  - `processed_at` (timestamptz)
*/

-- Créer la table des demandes de modification
CREATE TABLE IF NOT EXISTS modification_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  request_type text NOT NULL CHECK (request_type IN ('email_change', 'service_change', 'display_name_change')),
  current_value text NOT NULL,
  requested_value text NOT NULL,
  reason text NOT NULL,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  admin_id uuid REFERENCES profiles(id) ON DELETE SET NULL,
  admin_notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  processed_at timestamptz
);

-- Créer les index
CREATE INDEX IF NOT EXISTS idx_modification_requests_user_id ON modification_requests(user_id);
CREATE INDEX IF NOT EXISTS idx_modification_requests_status ON modification_requests(status);
CREATE INDEX IF NOT EXISTS idx_modification_requests_created_at ON modification_requests(created_at DESC);

-- Activer RLS
ALTER TABLE modification_requests ENABLE ROW LEVEL SECURITY;

-- Policies RLS
-- Les utilisateurs peuvent voir leurs propres demandes
CREATE POLICY "Users can view own modification requests"
  ON modification_requests FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Les utilisateurs peuvent créer leurs propres demandes
CREATE POLICY "Users can create own modification requests"
  ON modification_requests FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Les utilisateurs peuvent modifier leurs propres demandes en attente
CREATE POLICY "Users can update own pending requests"
  ON modification_requests FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id AND status = 'pending')
  WITH CHECK (auth.uid() = user_id);

-- Les super admins peuvent voir toutes les demandes
CREATE POLICY "System admins can view all modification requests"
  ON modification_requests FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'system_admin'
    )
  );

-- Les super admins peuvent traiter toutes les demandes
CREATE POLICY "System admins can process modification requests"
  ON modification_requests FOR UPDATE
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

-- Fonction pour traiter une demande de modification
CREATE OR REPLACE FUNCTION process_modification_request(
  request_id uuid,
  new_status text,
  admin_notes text DEFAULT NULL
)
RETURNS void AS $$
DECLARE
  request_record modification_requests%ROWTYPE;
  target_user_id uuid;
BEGIN
  -- Vérifier que l'utilisateur est un super admin
  IF NOT EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.role = 'system_admin'
  ) THEN
    RAISE EXCEPTION 'Seuls les super admins peuvent traiter les demandes';
  END IF;

  -- Récupérer la demande
  SELECT * INTO request_record
  FROM modification_requests
  WHERE id = request_id AND status = 'pending';

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Demande non trouvée ou déjà traitée';
  END IF;

  -- Mettre à jour la demande
  UPDATE modification_requests
  SET 
    status = new_status,
    admin_id = auth.uid(),
    admin_notes = admin_notes,
    processed_at = now(),
    updated_at = now()
  WHERE id = request_id;

  -- Si approuvée, appliquer le changement
  IF new_status = 'approved' THEN
    CASE request_record.request_type
      WHEN 'email_change' THEN
        -- Note: Le changement d'email nécessite une confirmation par email
        -- Ici on peut juste mettre à jour le profil avec une note
        UPDATE profiles
        SET 
          updated_at = now()
        WHERE id = request_record.user_id;
        
      WHEN 'service_change' THEN
        UPDATE profiles
        SET 
          service = request_record.requested_value,
          updated_at = now()
        WHERE id = request_record.user_id;
        
      WHEN 'display_name_change' THEN
        UPDATE profiles
        SET 
          display_name = request_record.requested_value,
          updated_at = now()
        WHERE id = request_record.user_id;
    END CASE;
  END IF;

  RAISE NOTICE 'Demande % traitée avec le statut %', request_id, new_status;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Commentaire pour la fonction
COMMENT ON FUNCTION process_modification_request IS 
'Traite une demande de modification (approbation ou rejet) par un super admin.
Exemple: SELECT process_modification_request(''request-id'', ''approved'', ''Changement approuvé'');';

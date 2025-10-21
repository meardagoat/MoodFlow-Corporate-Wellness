import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Créer le client Supabase avec les clés d'administration
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Vérifier le JWT de l'appelant
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'Token d\'authentification manquant' }), 
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const token = authHeader.replace('Bearer ', '')
    const { data: { user }, error: userError } = await supabaseAdmin.auth.getUser(token)

    if (userError || !user) {
      return new Response(
        JSON.stringify({ error: 'Token invalide ou expiré' }), 
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Récupérer le profil de l'appelant
    const { data: callerProfile, error: profileError } = await supabaseAdmin
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    if (profileError || !callerProfile) {
      return new Response(
        JSON.stringify({ error: 'Profil utilisateur non trouvé' }), 
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Récupérer les données de la requête
    const { email, password, role, service } = await req.json()

    if (!email || !password || !role || !service) {
      return new Response(
        JSON.stringify({ error: 'Données manquantes: email, password, role et service sont requis' }), 
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Vérifier les permissions selon la hiérarchie
    const canCreate = (creatorRole: string, targetRole: string): boolean => {
      if (creatorRole === 'system_admin') {
        return true // Peut créer n'importe quel rôle
      }
      if (creatorRole === 'manager' && targetRole === 'employee') {
        return true // Manager peut créer des employés
      }
      return false // Employés ne peuvent créer personne
    }

    if (!canCreate(callerProfile.role, role)) {
      return new Response(
        JSON.stringify({ 
          error: `Permissions insuffisantes. Votre rôle (${callerProfile.role}) ne peut pas créer un utilisateur avec le rôle ${role}` 
        }), 
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Créer l'utilisateur avec le service role key
    const { data: newUser, error: createError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { 
        role, 
        service 
      }
    })

    if (createError) {
      console.error('Erreur lors de la création de l\'utilisateur:', createError)
      return new Response(
        JSON.stringify({ 
          error: 'Erreur lors de la création de l\'utilisateur', 
          details: createError.message 
        }), 
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Le profil sera automatiquement créé par le trigger handle_new_user()
    return new Response(
      JSON.stringify({ 
        data: { 
          user: newUser,
          message: `Utilisateur ${email} créé avec succès avec le rôle ${role}` 
        }, 
        error: null 
      }), 
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Erreur inattendue:', error)
    return new Response(
      JSON.stringify({ 
        error: 'Erreur interne du serveur', 
        details: error.message 
      }), 
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})

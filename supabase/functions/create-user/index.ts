// filepath: supabase/functions/create-user/index.ts
import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

serve(async (req) => {
  try {
    const SUPABASE_URL = Deno.env.get('SUPABASE_URL') ?? ''
    const SERVICE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''

    if (!SUPABASE_URL || !SERVICE_KEY) {
      return new Response(JSON.stringify({ error: 'Configuration serveur manquante' }), { status: 500 })
    }

    const supabaseAdmin = createClient(SUPABASE_URL, SERVICE_KEY)

    const authHeader = req.headers.get('Authorization') || ''
    const token = authHeader.replace(/^Bearer\s+/i, '').trim()
    if (!token) {
      return new Response(JSON.stringify({ error: 'Non authentifié' }), { status: 401 })
    }

    // Vérifier le JWT de l'appelant et récupérer l'utilisateur
    const { data: getUserData, error: getUserError } = await supabaseAdmin.auth.getUser(token)
    if (getUserError || !getUserData?.user) {
      return new Response(JSON.stringify({ error: 'Token invalide ou utilisateur introuvable' }), { status: 401 })
    }
    const callerUser = getUserData.user

    // Récupérer le profil de l'appelant
    const { data: callerProfile, error: pErr } = await supabaseAdmin
      .from('profiles')
      .select('role')
      .eq('id', callerUser.id)
      .single()

    if (pErr || !callerProfile) {
      return new Response(JSON.stringify({ error: 'Profil appelant introuvable' }), { status: 403 })
    }

    // Lire le body JSON
    let body: any
    try {
      body = await req.json()
    } catch (e) {
      return new Response(JSON.stringify({ error: 'Body JSON invalide' }), { status: 400 })
    }

    const { email, password, role, service } = body || {}
    if (!email || !password || !role) {
      return new Response(JSON.stringify({ error: 'Paramètres manquants: email, password et role requis' }), { status: 400 })
    }

    // Vérifier permissions : system_admin peut tout, manager seulement employee
    if (callerProfile.role !== 'system_admin') {
      if (!(callerProfile.role === 'manager' && role === 'employee')) {
        return new Response(JSON.stringify({ error: 'Permissions insuffisantes' }), { status: 403 })
      }
    }

    // Créer l'utilisateur côté serveur avec la Service Role Key
    const { data: createData, error: createError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { role, service },
    })

    if (createError) {
      return new Response(JSON.stringify({ error: createError }), { status: 400 })
    }

    // Extraire l'ID du user créé
    const createdUserId = createData?.user?.id || createData?.id || null

    // Upsert le profile dans la table profiles
    if (createdUserId) {
      try {
        await supabaseAdmin.from('profiles').upsert({ id: createdUserId, email, role, service, created_at: new Date().toISOString() }, { onConflict: 'id' })
      } catch (e) {
        // Log et continuer
        console.warn('Failed to upsert profile for user', createdUserId, e)
      }
    }

    return new Response(JSON.stringify({ data: createData }), { status: 200 })
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), { status: 500 })
  }
})

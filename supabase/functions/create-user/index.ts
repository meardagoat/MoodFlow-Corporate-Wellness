import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { z } from 'https://deno.land/x/zod@v3.22.2/mod.ts'

function parseAllowedOrigins(): string[] {
  const raw = Deno.env.get('ALLOWED_ORIGINS')?.trim() ?? ''
  if (!raw) return []
  return raw.split(',').map(o => o.trim()).filter(Boolean)
}

function buildCorsHeaders(origin: string | null) {
  const allowed = parseAllowedOrigins()
  const allowOrigin = origin && (allowed.includes('*') || allowed.includes(origin))
    ? origin
    : ''
  return {
    'Access-Control-Allow-Origin': allowOrigin,
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-correlation-id',
    'Vary': 'Origin',
  }
}

function jsonResponse(body: unknown, status = 200, origin: string | null) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...buildCorsHeaders(origin), 'Content-Type': 'application/json' },
  })
}

function getCorrelationId(req: Request): string {
  const headerId = req.headers.get('x-correlation-id')
  if (headerId) return headerId
  try { return crypto.randomUUID() } catch { return `${Date.now()}-${Math.random()}` }
}

const CreateUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).regex(/^(?=.*[A-Za-z])(?=.*\d).+$/, 'Le mot de passe doit contenir lettres et chiffres'),
  role: z.enum(['employee', 'manager', 'system_admin']),
  service: z.string().min(1).max(120),
})

serve(async (req) => {
  const origin = req.headers.get('Origin')
  // Preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: buildCorsHeaders(origin) })
  }

  try {
    const correlationId = getCorrelationId(req)

    // Env checks
    const url = Deno.env.get('SUPABASE_URL')?.trim()
    const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')?.trim()
    if (!url || !serviceKey) {
      console.error(`[${correlationId}] Env manquante: SUPABASE_URL/SUPABASE_SERVICE_ROLE_KEY`)
      return jsonResponse({ error: 'Configuration serveur invalide', correlationId }, 500, origin)
    }

    const supabaseAdmin = createClient(url, serviceKey)

    // Auth appelant
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      return jsonResponse({ error: "Token d'authentification manquant", correlationId }, 401, origin)
    }

    const token = authHeader.replace('Bearer ', '')
    const { data: { user }, error: userError } = await supabaseAdmin.auth.getUser(token)
    if (userError || !user) {
      return jsonResponse({ error: 'Token invalide ou expiré', correlationId }, 401, origin)
    }

    // Profil appelant
    const { data: callerProfile, error: profileError } = await supabaseAdmin
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    if (profileError || !callerProfile) {
      return jsonResponse({ error: 'Profil utilisateur non trouvé', correlationId }, 404, origin)
    }

    // Parse + validation input
    const json = await req.json().catch(() => null)
    const parsed = CreateUserSchema.safeParse(json)
    if (!parsed.success) {
      return jsonResponse({ error: 'Validation échouée', details: parsed.error.issues, correlationId }, 400, origin)
    }
    const { email, password, role, service } = parsed.data

    // Permissions
    const canCreate = (creatorRole: string, targetRole: string): boolean => {
      if (creatorRole === 'system_admin') return true
      if (creatorRole === 'manager' && targetRole === 'employee') return true
      return false
    }

    if (!canCreate(callerProfile.role, role)) {
      return jsonResponse({ 
        error: `Permissions insuffisantes. Votre rôle (${callerProfile.role}) ne peut pas créer un utilisateur avec le rôle ${role}`,
        correlationId,
      }, 403, origin)
    }

    // Création utilisateur
    const { data: newUser, error: createError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { role, service }
    })

    if (createError) {
      const message = (createError as any).message || ''
      const lower = message.toLowerCase()
      const isConflict = lower.includes('already') || lower.includes('exist')
      const status = isConflict ? 409 : ((createError as any).status || 500)
      console.error(`[${correlationId}] Erreur création utilisateur:`, createError)
      return jsonResponse({
        error: isConflict ? 'Un compte avec cet email existe déjà' : "Erreur lors de la création de l'utilisateur",
        details: isConflict ? undefined : message,
        correlationId,
      }, status, origin)
    }

    // Succès
    return jsonResponse({
      data: { user: newUser, message: `Utilisateur ${email} créé avec succès avec le rôle ${role}` },
      error: null,
      correlationId,
    }, 200, origin)

  } catch (error) {
    const origin = req.headers.get('Origin')
    const correlationId = getCorrelationId(req)
    console.error(`[${correlationId}] Erreur inattendue:`, error)
    return jsonResponse({ error: 'Erreur interne du serveur', details: (error as Error)?.message, correlationId }, 500, origin)
  }
})

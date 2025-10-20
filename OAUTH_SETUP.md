# Configuration OAuth pour MoodFlow

Ce guide explique comment configurer Google et GitHub OAuth dans Supabase.

## Google OAuth

### 1. Créer un projet Google Cloud

1. Va sur [Google Cloud Console](https://console.cloud.google.com/)
2. Crée un nouveau projet ou sélectionne un projet existant
3. Va dans "APIs & Services" > "Credentials"

### 2. Configurer OAuth consent screen

1. Clique sur "OAuth consent screen" dans le menu
2. Choisis "External" (à moins que tu aies un workspace Google)
3. Remplis les infos :
   - App name: **MoodFlow**
   - User support email: ton email
   - Developer contact: ton email
4. Sauvegarde

### 3. Créer les credentials OAuth

1. Retourne sur "Credentials"
2. Clique "Create Credentials" > "OAuth client ID"
3. Application type: **Web application**
4. Name: **MoodFlow Web**
5. Authorized redirect URIs:
   ```
   https://spommkyyjgbhbfbgxjye.supabase.co/auth/v1/callback
   ```
6. Clique "Create"
7. **Note** ton Client ID et Client Secret

### 4. Configurer dans Supabase

1. Va dans ton projet Supabase
2. Authentication > Providers > Google
3. Active le provider
4. Colle ton **Client ID** et **Client Secret**
5. Sauvegarde

## GitHub OAuth

### 1. Créer une GitHub OAuth App

1. Va sur [GitHub Settings](https://github.com/settings/developers)
2. Clique "OAuth Apps" > "New OAuth App"
3. Remplis:
   - Application name: **MoodFlow**
   - Homepage URL: `https://moodflow.com` (ou ton URL)
   - Authorization callback URL:
     ```
     https://spommkyyjgbhbfbgxjye.supabase.co/auth/v1/callback
     ```
4. Clique "Register application"

### 2. Récupérer les credentials

1. **Note** ton Client ID
2. Clique "Generate a new client secret"
3. **Note** ton Client Secret (tu ne pourras plus le voir après)

### 3. Configurer dans Supabase

1. Va dans ton projet Supabase
2. Authentication > Providers > GitHub
3. Active le provider
4. Colle ton **Client ID** et **Client Secret**
5. Sauvegarde

## Tester

### En développement local

1. Assure-toi que ton `.env` contient:
   ```env
   VITE_SUPABASE_URL=https://spommkyyjgbhbfbgxjye.supabase.co
   VITE_SUPABASE_ANON_KEY=ton_anon_key
   ```

2. Lance le projet: `npm run dev`

3. Va sur `/login` ou `/register`

4. Clique sur "Google" ou "GitHub"

5. Tu seras redirigé vers la page d'auth du provider

6. Après auth, tu seras redirigé vers `/feed`

### URLs de redirection

Pour la production, n'oublie pas d'ajouter tes URLs de prod dans:
- Google Cloud Console (Authorized redirect URIs)
- GitHub OAuth App (Authorization callback URL)

Exemple:
```
https://ton-app.com/auth/callback
https://ton-app.com
```

## Gestion des profils OAuth

Quand un utilisateur se connecte avec OAuth:
- Un compte est créé automatiquement dans Supabase Auth
- Le trigger `handle_new_user()` crée un profil dans la table `profiles`
- Par défaut, le rôle est "employee"
- Le service est "General" (peut être modifié après)

## Troubleshooting

### Erreur "redirect_uri_mismatch"
- Vérifie que l'URL de callback dans Google/GitHub correspond exactement à celle de Supabase
- Format: `https://[ton-projet].supabase.co/auth/v1/callback`

### Erreur "unauthorized_client"
- Vérifie que ton Client ID et Secret sont corrects dans Supabase
- Assure-toi que le provider est bien activé

### L'utilisateur n'est pas créé
- Vérifie que le trigger `handle_new_user()` existe dans ta base
- Vérifie les logs Supabase pour voir les erreurs

### En développement local
- OAuth fonctionne en local car la redirection se fait vers Supabase, pas vers localhost
- Pas besoin de config spéciale pour localhost

## Notes

- Les utilisateurs OAuth n'ont pas de mot de passe (c'est normal)
- Ils peuvent seulement se connecter via le provider qu'ils ont utilisé
- Pour permettre plusieurs providers pour un même email, active "Allow multiple accounts with the same email" dans Supabase Auth settings


# 🎫 TICKET POUR MEHMET - Configuration OAuth Google & GitHub

**Priorité**: Haute  
**Type**: Configuration Backend  
**Assigné à**: Mehmet  
**Date**: 21 Octobre 2025

---

## 📋 Contexte

Le frontend a déjà les boutons OAuth pour Google et GitHub sur les pages `/login` et `/register`, mais ils ne fonctionnent pas car les providers ne sont **pas encore configurés dans Supabase**.

**Code frontend déjà implémenté** ✅ :
- Fonctions `signInWithGoogle()` et `signInWithGithub()` dans `src/lib/auth.ts`
- Boutons OAuth sur LoginView et RegisterView
- Redirection automatique vers `/feed` après connexion

## 🎯 Ce qu'il faut faire

### 1️⃣ Configurer Google OAuth

#### A. Créer l'OAuth App dans Google Cloud Console

1. Va sur [Google Cloud Console](https://console.cloud.google.com/)
2. Crée un nouveau projet ou utilise un projet existant
3. **APIs & Services** > **Credentials**
4. Configure **OAuth consent screen** :
   - App name: `MoodFlow`
   - User support email: ton email
   - Developer contact: ton email
5. Crée **OAuth client ID** :
   - Type: **Web application**
   - Name: `MoodFlow Web`
   - **Authorized redirect URIs** (IMPORTANT) :
     ```
     https://spommkyyjgbhbfbgxjye.supabase.co/auth/v1/callback
     ```
6. **Copie** le Client ID et Client Secret

#### B. Configurer dans Supabase

1. Dashboard Supabase > **Authentication** > **Providers**
2. Trouve **Google** dans la liste
3. **Active** le provider (toggle ON)
4. Colle le **Client ID**
5. Colle le **Client Secret**
6. **Save**

---

### 2️⃣ Configurer GitHub OAuth

#### A. Créer l'OAuth App sur GitHub

1. Va sur [GitHub Developer Settings](https://github.com/settings/developers)
2. **OAuth Apps** > **New OAuth App**
3. Remplis :
   - Application name: `MoodFlow`
   - Homepage URL: `https://moodflow.com` (ou ton URL de prod)
   - **Authorization callback URL** (IMPORTANT) :
     ```
     https://spommkyyjgbhbfbgxjye.supabase.co/auth/v1/callback
     ```
4. **Register application**
5. **Copie** le Client ID
6. **Generate a new client secret** et copie-le (tu ne pourras plus le voir après !)

#### B. Configurer dans Supabase

1. Dashboard Supabase > **Authentication** > **Providers**
2. Trouve **GitHub** dans la liste
3. **Active** le provider (toggle ON)
4. Colle le **Client ID**
5. Colle le **Client Secret**
6. **Save**

---

## ✅ Comment tester

### En local

1. Lance l'app : `npm run dev`
2. Va sur `http://localhost:5173/login`
3. Clique sur le bouton **Google** ou **GitHub**
4. Tu dois être redirigé vers la page de connexion du provider
5. Après connexion, tu dois être redirigé vers `/feed`
6. Vérifie que ton profil est créé dans la table `profiles`

### Vérifications

- [ ] OAuth Google fonctionne
- [ ] OAuth GitHub fonctionne
- [ ] Le profil est créé automatiquement dans `profiles`
- [ ] Redirection vers `/feed` après connexion
- [ ] Pas d'erreurs dans la console

---

## 🔧 Troubleshooting

### Erreur "redirect_uri_mismatch"
➡️ L'URL de callback dans Google/GitHub ne correspond pas à celle de Supabase  
**Solution** : Vérifie que tu as bien mis :
```
https://spommkyyjgbhbfbgxjye.supabase.co/auth/v1/callback
```

### Erreur "unauthorized_client"
➡️ Client ID ou Secret incorrect  
**Solution** : Revérifie que tu as copié les bonnes credentials dans Supabase

### L'utilisateur n'est pas créé dans `profiles`
➡️ Le trigger `handle_new_user()` n'existe pas ou ne fonctionne pas  
**Solution** : Vérifie les migrations dans `supabase/migrations/`

---

## 📚 Ressources

- Documentation complète : `OAUTH_SETUP.md` (déjà dans le repo)
- Code frontend : `src/lib/auth.ts` (lignes 75-97)
- [Doc Supabase OAuth](https://supabase.com/docs/guides/auth/social-login)

---

## 📝 Notes importantes

- Les utilisateurs OAuth n'auront **pas de mot de passe** (c'est normal)
- Le trigger `handle_new_user()` doit créer automatiquement le profil
- Par défaut, le rôle sera "employee" et le service "General"
- En production, il faudra ajouter les URLs de prod dans Google/GitHub

---

## ✉️ Questions ?

Si tu bloques, ping moi sur Slack ou Discord. Les infos sont dans `OAUTH_SETUP.md` aussi.

**Estimation** : 15-30 minutes max  
**Deadline** : ASAP (bloque la feature login/register)

---

✅ **Checklist finale** :
- [ ] Google OAuth configuré dans Google Cloud Console
- [ ] Google OAuth activé dans Supabase
- [ ] GitHub OAuth configuré sur GitHub
- [ ] GitHub OAuth activé dans Supabase
- [ ] Testé en local (login Google fonctionne)
- [ ] Testé en local (login GitHub fonctionne)
- [ ] Profils créés automatiquement
- [ ] Fermer ce ticket

---

**Créé par** : AI Assistant  
**Date** : 21 Octobre 2025  
**Projet** : MoodFlow Corporate Wellness


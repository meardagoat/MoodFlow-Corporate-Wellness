# Déploiement sur Vercel

## Étapes

### 1. Installer Vercel CLI (optionnel)
```bash
npm install -g vercel
```

### 2. Déployer via le site

**Option A - Via GitHub (recommandé) :**

1. Va sur [vercel.com](https://vercel.com)
2. Clique "New Project"
3. Importe ton repo GitHub `MoodFlow-Corporate-Wellness`
4. Vercel détecte automatiquement Vite
5. Ajoute tes variables d'environnement :
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
6. Clique "Deploy"

**Option B - Via CLI :**

```bash
cd /path/to/MoodFlow-Corporate-Wellness
vercel
```

Suis les instructions, ajoute tes env vars quand demandé.

### 3. Variables d'environnement

Dans le dashboard Vercel :
- Settings > Environment Variables
- Ajoute :
  - `VITE_SUPABASE_URL` = `https://spommkyyjgbhbfbgxjye.supabase.co`
  - `VITE_SUPABASE_ANON_KEY` = ta clé anon

### 4. Configuration Supabase

Dans Supabase, ajoute ton URL Vercel aux URL autorisées :
- Authentication > URL Configuration
- Site URL : `https://ton-app.vercel.app`
- Redirect URLs : `https://ton-app.vercel.app/**`

Pour OAuth (Google/GitHub), ajoute aussi :
- `https://ton-app.vercel.app` dans les redirect URIs

## Déploiement automatique

Chaque push sur `main` redéploie automatiquement sur Vercel.

Les pull requests créent des preview deployments.

## Custom domain

Settings > Domains > Add domain

Tu peux ajouter ton propre domaine genre `moodflow.fr`

## Notes

- Le build prend ~2-3 minutes
- Vercel utilise automatiquement `npm run build`
- Le résultat est dans `/dist`
- Pas besoin de config particulière, Vercel détecte Vite automatiquement


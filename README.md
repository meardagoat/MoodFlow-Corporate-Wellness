# MoodFlow - Corporate Wellness App 🧘‍♀️

Une application moderne de bien-être au travail construite avec Vue 3, TypeScript et Supabase.  
**Disponible en Web & Mobile (iOS/Android)** via Capacitor ! 📱

![MoodFlow Logo](src/assets/mood_flow_logo.png)

## ✨ Fonctionnalités

### 🎭 Partage d'humeur
- Sélecteur d'humeur interactif (5 niveaux)
- Posts anonymes ou identifiés
- Tags pour catégoriser (Workload, Team, Work-Life, etc.)
- **Filtre par mood** pour voir les humeurs spécifiques
- **Filtre "New Posts"** : Posts de moins de 5 minutes
- Réactions et réponses (threads)

### 💬 Chat anonyme
- Conversations privées entre collègues
- Messages en temps réel
- Anonymat garanti

### 📈 Tableaux de bord
- Statistiques pour les managers
- Visualisation des tendances
- Graphiques interactifs (Chart.js)

### 🔐 Authentification
- Login/Register sécurisé
- **Fonds interactifs 3D** avec Vanta.js (effet clouds)
- Gestion des rôles (Employee/Manager)

### 📱 Mobile Native
- App iOS et Android avec Capacitor
- Retour haptique
- Gestion native du clavier
- Status bar personnalisée
- Safe areas pour appareils avec encoche

## 🛠️ Technologies

### Frontend
- **Vue 3** avec Composition API & `<script setup>`
- **TypeScript** pour la sûreté du typage
- **Tailwind CSS** pour le design
- **Vite** pour le build ultra-rapide

### Backend & Database
- **Supabase** (PostgreSQL + Auth + Realtime)
- Row Level Security (RLS)
- Migrations SQL versionnées

### Effets & Animations
- **Vanta.js** + Three.js pour les fonds 3D
- Animations CSS personnalisées
- Transitions fluides

### Mobile
- **Capacitor 7.x** pour iOS et Android
- Plugins : App, Haptics, Keyboard, Status Bar, Splash Screen

## 🚀 Installation

### Prérequis
- Node.js 18+
- npm ou yarn

### Installation web

```bash
# Cloner le repo
git clone [repo-url]
cd MoodFlow-Corporate-Wellness

# Installer les dépendances
npm install

# Lancer le serveur de dev
npm run dev
```

### Installation mobile

```bash
# Build le projet
npm run build

# Synchroniser avec les plateformes natives
npm run cap:sync

# Ouvrir Android Studio
npm run cap:android

# Ouvrir Xcode (Mac uniquement)
npm run cap:ios
```

Pour plus de détails, consultez [MOBILE_SETUP.md](MOBILE_SETUP.md).

## ⚙️ Configuration

### Variables d'environnement

Créez un fichier `.env` à la racine :

```env
VITE_SUPABASE_URL=votre_url_supabase
VITE_SUPABASE_ANON_KEY=votre_cle_anon
```

### Base de données Supabase

1. Créer un projet sur [supabase.com](https://supabase.com)
2. Exécuter les migrations dans l'ordre :
   ```bash
   supabase/migrations/20251015140227_create_initial_schema.sql
   supabase/migrations/20251015140300_add_missing_tables.sql
   supabase/migrations/20251015140400_fix_missing_tables_safe.sql
   ```

## 📜 Scripts disponibles

### Développement web
```bash
npm run dev          # Serveur de développement
npm run build        # Build de production
npm run preview      # Preview du build
npm run typecheck    # Vérification TypeScript
```

### Mobile
```bash
npm run cap:sync         # Build + sync toutes plateformes
npm run cap:android      # Ouvrir dans Android Studio
npm run cap:ios          # Ouvrir dans Xcode
npm run cap:run:android  # Build + lancer sur Android
npm run cap:run:ios      # Build + lancer sur iOS
npm run cap:copy         # Copier web assets vers native
```

## 📱 App Mobile

### Android
- **API Level minimum** : 21 (Android 5.0)
- **Target SDK** : 34
- **App ID** : `com.moodflow.app`

### iOS
- **iOS minimum** : 13.0
- **Bundle ID** : `com.moodflow.app`
- **Nécessite Xcode 14+**

## 🎨 Personnalisation

### Couleurs Vanta.js (Login/Register)

Éditez `src/composables/useVantaEffect.ts` :

```typescript
skyColor: 0x68b8d7,        // Couleur du ciel
cloudColor: 0xadc9d8,      // Couleur des nuages
sunColor: 0xff9919,        // Couleur du soleil
speed: 1.2                 // Vitesse d'animation
```

Voir [VANTA_SETUP.md](VANTA_SETUP.md) pour plus d'options.

### Thème et couleurs

Les couleurs sont définies dans `tailwind.config.js` :

```javascript
colors: {
  primary: {...},    // Indigo
  secondary: {...},  // Bleu
  accent: {...},     // Violet
  mood: {...}        // Couleurs pour chaque humeur
}
```

## 📚 Documentation

- [MOBILE_SETUP.md](MOBILE_SETUP.md) - Guide complet mobile
- [VANTA_SETUP.md](VANTA_SETUP.md) - Configuration Vanta.js
- [CHANGELOG_VANTA.md](CHANGELOG_VANTA.md) - Changements Vanta
- [CHANGELOG_MOBILE.md](CHANGELOG_MOBILE.md) - Changements Mobile

## 🏗️ Structure du projet

```
MoodFlow-Corporate-Wellness/
├── src/
│   ├── assets/           # Images et ressources
│   │   └── mood_flow_logo.png
│   ├── components/       # Composants Vue
│   │   ├── AppLayout.vue
│   │   ├── SplashScreen.vue
│   │   └── ...
│   ├── composables/      # Composables réutilisables
│   │   ├── useNative.ts     # Fonctionnalités natives
│   │   └── useVantaEffect.ts # Effet Vanta.js
│   ├── lib/              # Utilitaires
│   │   ├── auth.ts
│   │   ├── supabase.ts
│   │   └── database.types.ts
│   ├── router/           # Configuration Vue Router
│   ├── views/            # Pages de l'app
│   │   ├── LoginView.vue
│   │   ├── RegisterView.vue
│   │   ├── FeedView.vue
│   │   ├── ChatView.vue
│   │   ├── DashboardView.vue
│   │   └── ProfileView.vue
│   ├── App.vue           # Composant racine
│   ├── main.ts           # Point d'entrée
│   └── style.css         # Styles globaux
├── android/              # Projet Android natif
├── ios/                  # Projet iOS natif
├── supabase/             # Migrations SQL
├── capacitor.config.ts   # Config Capacitor
├── tailwind.config.js    # Config Tailwind
└── vite.config.ts        # Config Vite
```

## 🐛 Dépannage

### Problème : Vanta.js ne s'affiche pas
- Vérifier que Three.js est bien chargé dans `index.html`
- Ouvrir la console pour voir les erreurs
- Tester sur un autre navigateur

### Problème : Build mobile échoue
- Vérifier les prérequis (Android Studio/Xcode)
- Nettoyer et rebuilder : `npm run build && npm run cap:sync`

### Problème : Erreur Supabase
- Vérifier les variables d'environnement `.env`
- S'assurer que les migrations sont appliquées
- Vérifier les RLS policies dans Supabase

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir des issues ou pull requests.

## 📄 Licence

MIT License - Voir le fichier LICENSE pour plus de détails.

## 🙏 Remerciements

- [Vanta.js](https://www.vantajs.com/) pour les magnifiques effets 3D
- [Supabase](https://supabase.com/) pour le backend
- [Capacitor](https://capacitorjs.com/) pour le mobile
- [Tailwind CSS](https://tailwindcss.com/) pour le design

---

**Version** : 1.0.0  
**Dernière mise à jour** : 16 Octobre 2025  

Fait avec ❤️ pour le bien-être au travail

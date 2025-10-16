# 📱 MoodFlow - Configuration Mobile avec Capacitor

## 🎯 Vue d'ensemble

MoodFlow est maintenant disponible en tant qu'application mobile native pour iOS et Android grâce à Capacitor ! Cette guide vous aidera à compiler et tester l'application sur les plateformes mobiles.

## 📦 Prérequis

### Pour Android
- **Android Studio** (dernière version) : [Télécharger](https://developer.android.com/studio)
- **Java JDK 17+**
- **Android SDK** (installé avec Android Studio)
- Variable d'environnement `ANDROID_HOME` configurée

### Pour iOS (Mac uniquement)
- **Xcode 14+** : [Télécharger](https://developer.apple.com/xcode/)
- **CocoaPods** : `sudo gem install cocoapods`
- **Command Line Tools** : `xcode-select --install`

## 🚀 Scripts de développement mobile

### Build et synchronisation

```bash
# Construire le web et synchroniser avec les plateformes natives
npm run cap:sync

# Copier les fichiers web sans rebuild
npm run cap:copy
```

### Développement Android

```bash
# Ouvrir le projet dans Android Studio
npm run cap:android

# Builder et lancer sur un appareil/émulateur Android
npm run cap:run:android
```

### Développement iOS

```bash
# Ouvrir le projet dans Xcode
npm run cap:ios

# Builder et lancer sur un appareil/simulateur iOS
npm run cap:run:ios
```

## 🛠️ Configuration initiale

### 1. Installer les dépendances natives

Les plugins Capacitor suivants sont déjà installés :

- ✅ `@capacitor/core` - Core de Capacitor
- ✅ `@capacitor/android` - Plateforme Android
- ✅ `@capacitor/ios` - Plateforme iOS
- ✅ `@capacitor/app` - Gestion du cycle de vie de l'app
- ✅ `@capacitor/haptics` - Retour haptique
- ✅ `@capacitor/keyboard` - Gestion du clavier
- ✅ `@capacitor/status-bar` - Personnalisation de la barre de statut
- ✅ `@capacitor/splash-screen` - Écran de démarrage

### 2. Configuration de l'app

Le fichier `capacitor.config.ts` contient la configuration :

```typescript
{
  appId: 'com.moodflow.app',
  appName: 'MoodFlow',
  webDir: 'dist'
}
```

Pour changer l'ID ou le nom de l'app, éditez ce fichier.

## 📱 Tester sur appareils physiques

### Android

1. Activer le **mode développeur** sur votre appareil Android :
   - Paramètres → À propos → Appuyez 7 fois sur "Numéro de build"
   
2. Activer le **débogage USB** :
   - Paramètres → Options de développement → Débogage USB

3. Connecter l'appareil et lancer :
   ```bash
   npm run cap:run:android
   ```

### iOS

1. Connecter votre iPhone/iPad via USB

2. Ouvrir Xcode :
   ```bash
   npm run cap:ios
   ```

3. Sélectionner votre appareil dans Xcode

4. Signer l'app avec votre Apple Developer ID

5. Cliquer sur ▶️ Run

## 🎨 Personnalisation mobile

### Icônes et Splash Screen

1. Générer les icônes pour Android et iOS :
   - Placer une icône 1024x1024px dans `resources/icon.png`
   - Utiliser un outil comme [Capacitor Assets](https://github.com/ionic-team/capacitor-assets)

2. Personnaliser le splash screen :
   - Éditer `capacitor.config.ts` → section `SplashScreen`

### Couleurs et thème

- **Status Bar** : Configurée dans `capacitor.config.ts`
- **Couleur primaire** : #4F46E5 (Indigo)

## 🔧 Fonctionnalités natives implémentées

### ✨ Retour haptique

Utilisé lors des interactions importantes (boutons, actions).

```typescript
import { useNative } from './composables/useNative';

const { triggerHaptic } = useNative();
triggerHaptic(ImpactStyle.Light);
```

### ⌨️ Gestion du clavier

Le clavier se ferme automatiquement lors du scroll, avec ajustement de la vue.

```typescript
const { hideKeyboard } = useNative();
hideKeyboard();
```

### 📊 Détection de la plateforme

```typescript
const { isNative, platform } = useNative();

if (isNative.value) {
  console.log(`Running on ${platform.value}`);
}
```

## 🎯 Safe Area (Zones de sécurité)

Pour les appareils avec encoche (iPhone X+), utilisez les classes CSS :

```html
<div class="safe-top safe-bottom">
  <!-- Contenu protégé des zones de sécurité -->
</div>
```

## 📝 Workflow de développement

### Développement web (rapide)

```bash
npm run dev
```
Tester dans le navigateur avec les outils de développement mobile.

### Test sur émulateur/simulateur

```bash
# Android
npm run cap:android

# iOS
npm run cap:ios
```

### Déploiement

```bash
# 1. Builder le projet
npm run build

# 2. Synchroniser avec les plateformes
npx cap sync

# 3. Ouvrir dans l'IDE natif
npx cap open android  # ou ios

# 4. Créer un build de release depuis Android Studio/Xcode
```

## 🐛 Résolution de problèmes

### Problème : "Command not found: cap"

```bash
npm install @capacitor/cli --save-dev
```

### Problème : Android build échoue

```bash
# Nettoyer le cache Gradle
cd android
./gradlew clean
cd ..
npm run cap:sync
```

### Problème : iOS pods ne s'installent pas

```bash
cd ios/App
pod install --repo-update
cd ../..
```

### Problème : "Plugin not implemented"

Vérifier que le plugin est bien installé :
```bash
npm list @capacitor/plugin-name
```

Si absent, réinstaller :
```bash
npm install @capacitor/plugin-name --legacy-peer-deps
npx cap sync
```

## 📦 Build de production

### Android APK/Bundle

1. Ouvrir Android Studio : `npm run cap:android`
2. Build → Generate Signed Bundle / APK
3. Suivre l'assistant pour signer l'app
4. Choisir release build variant

### iOS IPA

1. Ouvrir Xcode : `npm run cap:ios`
2. Product → Archive
3. Distribuer via App Store Connect ou Ad Hoc

## 🔒 Variables d'environnement

Pour les builds de production, créer un fichier `.env.production` :

```env
VITE_SUPABASE_URL=votre_url_supabase
VITE_SUPABASE_ANON_KEY=votre_key_supabase
```

## 📚 Ressources

- [Documentation Capacitor](https://capacitorjs.com/docs)
- [Guide iOS](https://capacitorjs.com/docs/ios)
- [Guide Android](https://capacitorjs.com/docs/android)
- [Plugins Capacitor](https://capacitorjs.com/docs/plugins)

## 🎉 Félicitations !

Votre app MoodFlow est maintenant prête pour mobile ! 🚀

Pour toute question, consulter la documentation officielle de Capacitor ou ouvrir une issue.

---

**Version App** : 1.0.0  
**Capacitor** : 7.x  
**Dernière mise à jour** : 16 Octobre 2025


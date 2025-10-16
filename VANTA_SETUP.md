# Configuration Vanta.js pour MoodFlow

## 🎨 Effet Clouds Interactif

Les pages de login et register utilisent maintenant [Vanta.js](https://www.vantajs.com/?effect=clouds) pour créer un fond 3D interactif et animé avec des nuages.

## 📦 Installation

Les librairies sont chargées via CDN dans `index.html`:
- **Three.js** (r134) - Moteur 3D
- **Vanta.js Clouds** - Effet de nuages

## 🚀 Utilisation

### Utilisation de base

```vue
<template>
  <div ref="vantaContainer" class="min-h-screen">
    <!-- Votre contenu ici -->
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useVantaEffect } from '../composables/useVantaEffect';

const vantaContainer = ref<HTMLElement | null>(null);
useVantaEffect(vantaContainer);
</script>
```

### Personnalisation des couleurs

```typescript
const vantaContainer = ref<HTMLElement | null>(null);
useVantaEffect(vantaContainer, {
  skyColor: 0x4a90e2,        // Bleu ciel personnalisé
  cloudColor: 0xffffff,      // Nuages blancs
  cloudShadowColor: 0x2c3e50, // Ombres des nuages
  sunColor: 0xffa500,        // Couleur du soleil
  speed: 1.5                 // Vitesse d'animation
});
```

## 🎨 Options disponibles

| Option | Type | Défaut | Description |
|--------|------|--------|-------------|
| `skyColor` | hex | `0x68b8d7` | Couleur du ciel |
| `cloudColor` | hex | `0xadc9d8` | Couleur des nuages |
| `cloudShadowColor` | hex | `0x183550` | Couleur des ombres |
| `sunColor` | hex | `0xff9919` | Couleur du soleil |
| `sunGlareColor` | hex | `0xff6633` | Couleur de l'éclat du soleil |
| `sunlightColor` | hex | `0xff9933` | Couleur de la lumière |
| `speed` | number | `1.2` | Vitesse d'animation |
| `mouseControls` | boolean | `true` | Contrôle à la souris |
| `touchControls` | boolean | `true` | Contrôle tactile |

## 💡 Conseils

1. **Performance**: L'effet utilise WebGL et peut être gourmand sur des appareils anciens
2. **Mobile**: Fonctionne sur la plupart des appareils mobiles modernes
3. **Fallback**: Le formulaire reste visible même si l'effet ne charge pas
4. **Transparence**: Utiliser `bg-white/95 backdrop-blur-sm` sur le contenu pour un effet de glassmorphism

## 🎯 Palette de couleurs recommandée

Pour MoodFlow, voici quelques palettes suggérées:

### Palette Calme (Actuelle)
```typescript
{
  skyColor: 0x68b8d7,        // Bleu doux
  cloudColor: 0xadc9d8,      // Nuages clairs
  cloudShadowColor: 0x183550 // Ombres douces
}
```

### Palette Énergique
```typescript
{
  skyColor: 0x87ceeb,        // Bleu ciel vif
  cloudColor: 0xffffff,      // Nuages blancs
  cloudShadowColor: 0x4682b4 // Ombres bleues
}
```

### Palette Sunset
```typescript
{
  skyColor: 0xffa07a,        // Orange saumon
  cloudColor: 0xffd700,      // Or
  cloudShadowColor: 0xff6347 // Rouge tomate
}
```

## 📱 Responsive

L'effet s'adapte automatiquement à la taille de l'écran grâce aux options `minHeight` et `minWidth`.

## 🔧 Débogage

Si l'effet ne s'affiche pas:
1. Vérifiez la console pour les erreurs
2. Assurez-vous que Three.js et Vanta.js sont bien chargés
3. Vérifiez que le conteneur a une hauteur définie
4. Testez sur un autre navigateur (Chrome, Firefox, Safari recommandés)


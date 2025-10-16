# 🎨 MoodFlow Design System Premium

## Vue d'ensemble

Design inspiré des meilleures apps de santé mentale (Headspace, Calm, Jour) avec une identité visuelle unique et professionnelle.

## 🌈 Palette de couleurs

### Couleur principale - Peach/Coral (Signature)
```css
primary-400: #ff9d70  /* Couleur signature - Pêche vif */
primary-500: #ff7e46  /* Orange pêche intense */
primary-600: #f96332  /* Orange coral */
```
**Usage** : Boutons primaires, accents, éléments interactifs principaux

### Cream/Beige (Neutralité chaleureuse)
```css
cream-100: #fffcf0   /* Arrière-plans doux */
cream-400: #ffe8a3   /* Accents chaleureux */
cream-500: #ffd978   /* Mood neutre */
```
**Usage** : Arrière-plans, zones neutres, mood neutre

### Sky/Calm (Apaisant)
```css
sky-400: #38bdf8     /* Bleu ciel vif */
sky-500: #0ea5e9     /* Bleu océan */
```
**Usage** : Boutons secondaires, zones de relaxation, éléments calmes

### Lavender (Élégance)
```css
lavender-400: #c084fc  /* Lavande vif */
lavender-500: #a855f7  /* Violet lavande */
```
**Usage** : Accents élégants, statistiques, éléments premium

### Sage (Nature et bien-être)
```css
sage-400: #8aba8a    /* Vert sauge medium */
sage-500: #6a9d6a    /* Vert sauge - Mood heureux */
```
**Usage** : Moods positifs, éléments nature, succès

### Neutral (Gris chauds)
```css
neutral-600: #57534e  /* Gris foncé */
neutral-800: #292524  /* Texte principal */
```
**Usage** : Textes, bordures subtiles

## 🎯 Composants

### Boutons

#### Primary Button
```vue
<button class="btn-primary">Action principale</button>
```
- Gradient pêche/coral
- Shadow douce
- Hover: scale + shadow plus prononcée
- Rounded-2xl (très arrondi)

#### Secondary Button
```vue
<button class="btn-secondary">Action secondaire</button>
```
- Gradient bleu ciel
- Même style que primary mais couleur différente

#### Ghost Button
```vue
<button class="btn-ghost">Action tertiaire</button>
```
- Fond transparent avec backdrop-blur
- Subtil et élégant

### Cards

#### Card Standard (Glassmorphism)
```vue
<div class="card">Contenu</div>
```
- Fond blanc/80 avec backdrop-blur
- Shadow douce
- Hover: scale légèrement + shadow plus prononcée

#### Card Solid
```vue
<div class="card-solid">Contenu</div>
```
- Fond blanc opaque
- Pour contenus importants

#### Card Gradient
```vue
<div class="card-gradient">Contenu spécial</div>
```
- Gradient pêche/lavande
- Pour contenus mis en avant

### Inputs

```vue
<input class="input-field" placeholder="Votre texte" />
```
- Border-2 (plus visible)
- Rounded-2xl
- Focus: ring primary avec shadow douce
- Transition fluide

## ✨ Animations

### Breathe (Respiration)
```css
.breathe { animation: breathe 4s ease-in-out infinite; }
```
**Usage** : Cercles d'arrière-plan, éléments zen

### Float (Flottement)
```css
.float { animation: float 6s ease-in-out infinite; }
```
**Usage** : Éléments légers, icônes

### Pulse Soft (Pulsation douce)
```css
.pulse-soft { animation: pulse-soft 3s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
```
**Usage** : Indicateurs subtils

### Shimmer (Scintillement)
```css
.shimmer { animation: shimmer 2s infinite; }
```
**Usage** : Chargement élégant, effets de lumière

## 📐 Espacements

### Padding cards/sections
- `p-6` (24px) - Standard
- `p-8` (32px) - Large
- `p-10` (40px) - Extra large

### Marges entre éléments
- `mb-4` (16px) - Petit
- `mb-6` (24px) - Standard
- `mb-8` (32px) - Large
- `mb-10` (40px) - Extra large

### Gaps dans grids
- `gap-4` (16px) - Standard
- `gap-6` (24px) - Confortable

## 🔤 Typographie

### Familles de polices
```css
font-sans: Inter, Poppins, system-ui
font-display: Cal Sans, Inter (pour titres)
```

### Tailles de texte
- **Titres principaux**: `text-5xl` ou `text-6xl` (48-60px)
- **Sous-titres**: `text-lg` ou `text-xl` (18-20px)
- **Corps**: `text-base` (16px)
- **Petits**: `text-sm` (14px)
- **Micro**: `text-xs` (12px)

### Poids
- **Light**: `font-light` (300) - Sous-titres, descriptions
- **Regular**: `font-normal` (400) - Corps de texte
- **Medium**: `font-medium` (500) - Boutons, labels
- **Bold**: `font-bold` (700) - Titres, chiffres importants

## 🎭 Splash Screens

### SplashScreen
- Fond: `gradient-to-br from-cream-100 via-cream-50 to-primary-50`
- Animation: Cercles respirants (breathe)
- Logo: Gradient primary avec pulse-ring
- Indicateur: Dots minimalistes qui s'élargissent

### WelcomeScreen
- Fond: `gradient-to-br from-cream-50 via-primary-50 to-lavender-50`
- Animation: Float-slow pour cercles organiques
- Cards: Glassmorphism avec icônes colorées
- Boutons: Primary gradient avec hover scale

### GoodbyeScreen
- Fond: `gradient-to-br from-lavender-100 via-sky-50 to-cream-100`
- Animation: Breathe-slow + twinkle pour étoiles
- Style: Plus apaisant avec lavande dominant

## 🎨 Moods Colors

```css
very_happy: #6a9d6a   /* Vert sauge joyeux */
happy: #8aba8a        /* Vert clair */
neutral: #ffd978      /* Beige neutre */
sad: #ff9d70          /* Pêche mélancolique */
very_sad: #ff7e46     /* Coral triste */
```

**Philosophie** : Palette cohérente sans couleurs agressives (pas de rouge vif, vert criard)

## 🔍 Ombres (Shadows)

### Shadow Soft
```css
shadow-soft: 0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)
```
**Usage** : Cards, boutons au repos

### Shadow Soft-Lg
```css
shadow-soft-lg: 0 10px 40px -10px rgba(0, 0, 0, 0.08), 0 20px 60px -15px rgba(0, 0, 0, 0.06)
```
**Usage** : Hover states, éléments élevés

## 🌊 Formes organiques

### SVG Waves
Utilisées en bas des splash screens pour transitions douces.

```html
<svg viewBox="0 0 1440 120" preserveAspectRatio="none">
  <path d="M0,64 C240,96 480,80 720,64..." class="fill-primary-200/30" />
</svg>
```

### Cercles flous (Blur circles)
```html
<div class="w-64 h-64 bg-primary-300/20 rounded-full blur-3xl animate-breathe"></div>
```

## ✨ Glassmorphism

### Standard Glass
```css
.glass {
  bg-white/60 backdrop-blur-md border border-white/40 shadow-soft
}
```

### Utilisation
- Cards subtiles
- Overlays
- Statistiques
- Éléments de navigation

## 🎬 Transitions

### Standard
```css
transition-all duration-300
```

### Hover Scale
```css
hover:scale-105 /* Léger agrandissement */
hover:scale-[1.02] /* Très subtil */
```

## 📱 Mobile Adaptations

- Touch targets: minimum 44x44px
- Rounded corners plus prononcés sur mobile
- Shadows plus légères
- Animations plus courtes (2-3s au lieu de 4-6s)

## 🎯 Principes de design

1. **Minimalisme élégant** - Chaque élément a sa place
2. **Animations organiques** - Mouvements naturels, jamais brusques
3. **Palette cohérente** - Maximum 5-6 couleurs principales
4. **Glassmorphism subtil** - Transparence avec blur, jamais opaque à 100%
5. **Espace respirant** - Beaucoup de padding, margins généreuses
6. **Typographie lisible** - Inter pour corps, Poppins pour accents
7. **Ombres douces** - Jamais de shadows dures
8. **Rounded corners** - 2xl ou 3xl (16-24px)

## 🚀 Exemples d'utilisation

### Page complète
```vue
<div class="gradient-bg-light min-h-screen p-6">
  <div class="max-w-4xl mx-auto">
    <!-- Header -->
    <div class="card-solid mb-8">
      <h1 class="text-4xl font-bold text-neutral-800 mb-2 font-display">
        MoodFlow
      </h1>
      <p class="text-neutral-600 font-light">
        Cultivez votre bien-être
      </p>
    </div>

    <!-- Content cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="card">
        <h3 class="font-medium text-neutral-700 mb-3">Stats</h3>
        <div class="text-3xl font-bold text-primary-600">42</div>
      </div>
      
      <div class="card-gradient">
        <h3 class="font-medium text-neutral-700 mb-3">Premium</h3>
        <button class="btn-primary w-full">Action</button>
      </div>
    </div>
  </div>
</div>
```

## 🎨 Comparaison Avant/Après

### Avant
- Gradients violets/bleus génériques
- Particules cheap qui tombent
- Shadows dures
- Couleurs saturées
- Animations bounce basiques

### Après
- Palette pêche/crème sophistiquée inspirée Headspace
- Cercles organiques avec animation breathe
- Shadows douces (soft, soft-lg)
- Couleurs apaisantes et cohérentes
- Animations fluides et naturelles (breathe, float, gentle-scale)

## 📚 Inspiration

- **Headspace** : Palette pêche/orange, animations de respiration
- **Calm** : Bleu apais ant, formes organiques, simplicité
- **Jour** : Glassmorphism, typographie clean, espacements généreux
- **Apple Health** : Minimalisme, couleurs douces, statistiques claires

---

**Version** : 2.0.0 Premium  
**Date** : 16 Octobre 2025  
**Design** : MoodFlow Design Team

✨ **L'app a maintenant un look ultra-professionnel et unique !** ✨


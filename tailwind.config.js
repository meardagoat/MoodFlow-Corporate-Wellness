/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Palette Peach/Coral (inspirée Headspace) - Couleur principale
        primary: {
          50: '#fff5f0',    // Pêche très clair
          100: '#ffe8dd',   // Pêche clair
          200: '#ffd4c4',   // Pêche doux
          300: '#ffb89a',   // Pêche medium
          400: '#ff9d70',   // Pêche vif - Couleur signature
          500: '#ff7e46',   // Orange pêche intense
          600: '#f96332',   // Orange coral
          700: '#e64920',   // Orange profond
          800: '#c23b16',   // Orange foncé
          900: '#9e3014',   // Orange très foncé
        },
        // Palette Cream/Beige (tons neutres chauds)
        cream: {
          50: '#fffef9',    // Crème très clair
          100: '#fffcf0',   // Crème clair
          200: '#fff7db',   // Crème doux
          300: '#fff0c2',   // Beige clair
          400: '#ffe8a3',   // Beige doux
          500: '#ffd978',   // Beige chaud
          600: '#f5c754',   // Jaune doré doux
          700: '#d9a536',   // Or vintage
          800: '#b8842a',   // Bronze
          900: '#8f6621',   // Bronze foncé
        },
        // Palette Sky/Calm (bleu apaisant inspiré Calm)
        sky: {
          50: '#f0f9ff',    // Ciel très clair
          100: '#e0f2fe',   // Ciel clair
          200: '#bae6fd',   // Bleu ciel doux
          300: '#7dd3fc',   // Bleu ciel medium
          400: '#38bdf8',   // Bleu ciel vif
          500: '#0ea5e9',   // Bleu océan
          600: '#0284c7',   // Bleu profond
          700: '#0369a1',   // Bleu intense
          800: '#075985',   // Bleu foncé
          900: '#0c4a6e',   // Bleu nuit
        },
        // Palette Lavender (violet doux)
        lavender: {
          50: '#faf5ff',    // Lavande très clair
          100: '#f3e8ff',   // Lavande clair
          200: '#e9d5ff',   // Lavande doux
          300: '#d8b4fe',   // Lavande medium
          400: '#c084fc',   // Lavande vif
          500: '#a855f7',   // Violet lavande
          600: '#9333ea',   // Violet
          700: '#7e22ce',   // Violet profond
          800: '#6b21a8',   // Violet foncé
          900: '#581c87',   // Violet intense
        },
        // Palette Sage (vert sauge apaisant)
        sage: {
          50: '#f6f7f6',    // Vert très clair
          100: '#e8f0e8',   // Vert clair
          200: '#d1e4d1',   // Vert sauge très doux
          300: '#afd1af',   // Vert sauge doux
          400: '#8aba8a',   // Vert sauge medium
          500: '#6a9d6a',   // Vert sauge
          600: '#528052',   // Vert foncé
          700: '#3e6440',   // Vert profond
          800: '#2d4a2f',   // Vert très foncé
          900: '#1f3422',   // Vert nuit
        },
        // Palette Neutral (gris chauds)
        neutral: {
          50: '#fafaf9',    // Blanc cassé
          100: '#f5f5f4',   // Gris très clair
          200: '#e7e5e4',   // Gris clair
          300: '#d6d3d1',   // Gris doux
          400: '#a8a29e',   // Gris medium
          500: '#78716c',   // Gris
          600: '#57534e',   // Gris foncé
          700: '#44403c',   // Gris profond
          800: '#292524',   // Gris très foncé
          900: '#1c1917',   // Presque noir
        },
        // Couleurs fonctionnelles (subtle et élégantes)
        success: {
          50: '#f0fdf4',
          100: '#dcfce7',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
        },
        warning: {
          50: '#fffbeb',
          100: '#fef3c7',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
        },
        error: {
          50: '#fef2f2',
          100: '#fee2e2',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
        },
        // Couleurs pour les moods (plus douces et cohérentes)
        mood: {
          very_happy: '#6a9d6a',    // Vert sauge joyeux
          happy: '#8aba8a',         // Vert clair
          neutral: '#ffd978',       // Beige neutre
          sad: '#ff9d70',           // Pêche mélancolique
          very_sad: '#ff7e46',      // Coral triste
        }
      },
      fontFamily: {
        sans: ['Inter', 'Poppins', 'system-ui', 'sans-serif'],
        display: ['Cal Sans', 'Inter', 'sans-serif'],
      },
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '0.875rem' }],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'soft-lg': '0 10px 40px -10px rgba(0, 0, 0, 0.08), 0 20px 60px -15px rgba(0, 0, 0, 0.06)',
      },
    },
  },
  plugins: [],
}

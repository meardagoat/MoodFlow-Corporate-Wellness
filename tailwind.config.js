/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Palette principale inspirée de Headspace
        primary: {
          50: '#f8fafc',   // Gris très clair
          100: '#f1f5f9',  // Gris clair
          200: '#e2e8f0',  // Gris doux
          300: '#cbd5e1',  // Gris medium
          400: '#94a3b8',  // Gris
          500: '#64748b',  // Gris principal
          600: '#475569',  // Gris foncé
          700: '#334155',  // Gris profond
          800: '#1e293b',  // Gris très foncé
          900: '#0f172a',  // Gris le plus foncé
        },
        // Palette secondaire - orange Headspace
        secondary: {
          50: '#fff7ed',   // Orange très clair
          100: '#ffedd5',  // Orange clair
          200: '#fed7aa',  // Orange doux
          300: '#fdba74',  // Orange medium
          400: '#fb923c',  // Orange vif
          500: '#f97316',  // Orange principal
          600: '#ea580c',  // Orange foncé
          700: '#c2410c',  // Orange profond
          800: '#9a3412',  // Orange très foncé
          900: '#7c2d12',  // Orange le plus foncé
        },
        // Palette accent - violet Headspace
        accent: {
          50: '#faf5ff',   // Violet très clair
          100: '#f3e8ff',  // Violet clair
          200: '#e9d5ff',  // Violet doux
          300: '#d8b4fe',  // Violet medium
          400: '#c084fc',  // Violet vif
          500: '#a855f7',  // Violet principal
          600: '#9333ea',  // Violet foncé
          700: '#7c3aed',  // Violet profond
          800: '#6b21a8',  // Violet très foncé
          900: '#581c87',  // Violet le plus foncé
        },
        // Palette neutre - tons gris chauds
        neutral: {
          50: '#fafafa',   // Gris très clair
          100: '#f5f5f5',  // Gris clair
          200: '#e5e5e5',  // Gris doux
          300: '#d4d4d4',  // Gris medium
          400: '#a3a3a3',  // Gris
          500: '#737373',  // Gris principal
          600: '#525252',  // Gris foncé
          700: '#404040',  // Gris profond
          800: '#262626',  // Gris très foncé
          900: '#171717',  // Gris le plus foncé
        },
        // Couleurs d'état
        success: {
          50: '#f0fdf4',
          100: '#dcfce7',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
        },
        warning: {
          50: '#fffbeb',
          100: '#fef3c7',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
        },
        error: {
          50: '#fef2f2',
          100: '#fee2e2',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
        },
        // Couleurs pour les humeurs
        mood: {
          very_happy: '#22c55e',    // Vert
          happy: '#84cc16',         // Vert lime
          neutral: '#f59e0b',       // Orange
          sad: '#f97316',           // Orange foncé
          very_sad: '#ef4444',      // Rouge
        }
      },
      fontFamily: {
        sans: ['Poppins', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

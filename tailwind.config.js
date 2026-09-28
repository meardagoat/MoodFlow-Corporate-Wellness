/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Palette MoodFlow — tirée du logo (soleil, MOOD violet, FLOW rouge)
        // et des fonds des vidéos / portraits du site.
        ink: {
          DEFAULT: '#1A0E2B', // aubergine presque noire, couleur du texte
          soft: '#3D2E52',
        },
        paper: {
          DEFAULT: '#FFF8EF', // crème chaud, fond principal
          deep: '#F6EADC',
        },
        blush: '#FFE3D8',
        sun: {
          DEFAULT: '#FED94E',
          deep: '#F5C518',
        },
        tangerine: '#FF8944',
        flame: '#FF691C',
        coral: '#FA4D52',
        candy: '#FF5BBC',
        grape: {
          DEFAULT: '#8248FE',
          deep: '#5B2BD9',
        },
        lilac: '#CDB8FF',
        aqua: '#5EDDE7',
        lagoon: '#11C1DC',

        // Échelle des humeurs : du plein soleil à l'orage
        mood: {
          very_happy: '#FED94E',
          happy: '#FF8944',
          neutral: '#CDB8FF',
          sad: '#5EDDE7',
          very_sad: '#8248FE',
        },
      },
      fontFamily: {
        sans: ['"Instrument Sans Variable"', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Bricolage Grotesque Variable"', '"Instrument Sans Variable"', 'system-ui', 'sans-serif'],
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
        mono: ['"DM Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      fontSize: {
        '2xs': ['0.6875rem', { lineHeight: '1rem' }],
        // Titres fluides, du plus spectaculaire au plus sobre
        'display-2xl': ['clamp(3.75rem, 13.5vw, 15rem)', { lineHeight: '0.84', letterSpacing: '-0.055em' }],
        'display-xl': ['clamp(3.25rem, 10vw, 10.5rem)', { lineHeight: '0.86', letterSpacing: '-0.05em' }],
        'display-lg': ['clamp(2.6rem, 7vw, 7rem)', { lineHeight: '0.9', letterSpacing: '-0.045em' }],
        'display-md': ['clamp(2.1rem, 4.6vw, 4.5rem)', { lineHeight: '0.95', letterSpacing: '-0.04em' }],
        'display-sm': ['clamp(1.65rem, 2.8vw, 2.6rem)', { lineHeight: '1.02', letterSpacing: '-0.03em' }],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
        '6xl': '3rem',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'out-back': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'in-out-quart': 'cubic-bezier(0.76, 0, 0.24, 1)',
      },
      maxWidth: {
        'site': '96rem',
      },
      keyframes: {
        'spin-slow': {
          to: { transform: 'rotate(360deg)' },
        },
        twinkle: {
          '0%, 100%': { transform: 'scale(1) rotate(0deg)', opacity: '1' },
          '50%': { transform: 'scale(0.6) rotate(45deg)', opacity: '0.55' },
        },
        drift: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0) rotate(0deg)' },
          '50%': { transform: 'translate3d(0, -14px, 0) rotate(4deg)' },
        },
        'marquee-x': {
          to: { transform: 'translate3d(-50%, 0, 0)' },
        },
        'fade-up': {
          from: { opacity: '0', transform: 'translate3d(0, 16px, 0)' },
          to: { opacity: '1', transform: 'none' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-6px)' },
          '75%': { transform: 'translateX(6px)' },
        },
      },
      animation: {
        'spin-slow': 'spin-slow 48s linear infinite',
        'spin-slower': 'spin-slow 90s linear infinite',
        twinkle: 'twinkle 3.2s ease-in-out infinite',
        drift: 'drift 7s ease-in-out infinite',
        'fade-up': 'fade-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) both',
        shake: 'shake 0.45s ease-in-out',
      },
    },
  },
  plugins: [],
}

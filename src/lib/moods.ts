/**
 * Système visuel des humeurs : une couleur et un visage par humeur,
 * du plein soleil (very_happy) à l'orage (very_sad).
 * Les valeurs correspondent à celles stockées en base (posts.mood).
 */
export type MoodValue = 'very_happy' | 'happy' | 'neutral' | 'sad' | 'very_sad';

/** Expressions supplémentaires utilisées par le soleil de la marque */
export type FaceState = MoodValue | 'sleepy' | 'closed' | 'peek';

export const MOOD_VALUES: MoodValue[] = ['very_happy', 'happy', 'neutral', 'sad', 'very_sad'];

export const MOOD_COLORS: Record<MoodValue, string> = {
  very_happy: '#FED94E',
  happy: '#FF8944',
  neutral: '#CDB8FF',
  sad: '#5EDDE7',
  very_sad: '#8248FE',
};

/** Couleur lisible posée sur chaque couleur d'humeur */
export const MOOD_ON_COLORS: Record<MoodValue, string> = {
  very_happy: '#1A0E2B',
  happy: '#1A0E2B',
  neutral: '#1A0E2B',
  sad: '#1A0E2B',
  very_sad: '#FFF8EF',
};

export function isMood(value: string | null | undefined): value is MoodValue {
  return !!value && (MOOD_VALUES as string[]).includes(value);
}

export function moodColor(value: string | null | undefined): string {
  return isMood(value) ? MOOD_COLORS[value] : MOOD_COLORS.neutral;
}

export function moodOnColor(value: string | null | undefined): string {
  return isMood(value) ? MOOD_ON_COLORS[value] : MOOD_ON_COLORS.neutral;
}

/** Moyenne sur 5 → humeur (mêmes seuils que le tableau de bord) */
export function moodFromScore(score: number): MoodValue {
  if (score >= 4.5) return 'very_happy';
  if (score >= 3.5) return 'happy';
  if (score >= 2.5) return 'neutral';
  if (score >= 1.5) return 'sad';
  return 'very_sad';
}

/** Géométrie du visage, dans une boîte de 100 × 100 */
export const FACE = {
  eyes: [
    { cx: 37, cy: 44 },
    { cx: 63, cy: 44 },
  ],
  eyeR: 4.8,
  arcUp: ['M31.5 46.5 Q37 38.5 42.5 46.5', 'M57.5 46.5 Q63 38.5 68.5 46.5'],
  arcDown: ['M31.5 43 Q37 49.5 42.5 43', 'M57.5 43 Q63 49.5 68.5 43'],
  brows: ['M28 35 L41 30.5', 'M59 30.5 L72 35'],
  cheeks: [
    { cx: 25, cy: 58 },
    { cx: 75, cy: 58 },
  ],
  tear: 'M66 50 C66 50 70.5 55.5 70.5 58.2 A4.5 4.5 0 0 1 61.5 58.2 C61.5 55.5 66 50 66 50 Z',
  // Toutes les bouches ont la même structure (M … Q …) pour pouvoir se transformer
  mouth: {
    very_happy: 'M31 57 Q50 82 69 57',
    happy: 'M35 60 Q50 73 65 60',
    neutral: 'M37 64 Q50 64 63 64',
    sad: 'M37 69 Q50 59 63 69',
    very_sad: 'M34 71 Q50 55 66 71',
    sleepy: 'M40 62 Q50 69.5 60 62',
    closed: 'M40 63 Q50 68.5 60 63',
    peek: 'M44 64 Q50 70 56 64',
  } as Record<FaceState, string>,
};

export type EyeStyle = 'dots' | 'arcUp' | 'arcDown';

export function faceFeatures(state: FaceState) {
  const eyes: EyeStyle =
    state === 'very_happy' ? 'arcUp' : state === 'sleepy' || state === 'closed' ? 'arcDown' : 'dots';
  return {
    eyes,
    cheeks: state === 'very_happy' || state === 'happy' || state === 'sleepy' || state === 'peek' || state === 'closed',
    brows: state === 'sad' || state === 'very_sad',
    tear: state === 'very_sad',
    eyeScale: state === 'peek' ? 1.35 : 1,
  };
}

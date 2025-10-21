// Type definitions for Vanta.js
interface VantaEffect {
  destroy(): void;
  resize(): void;
  setOptions(options: any): void;
}

interface VantaBirdsOptions {
  el: HTMLElement;
  THREE?: any;
  mouseControls?: boolean;
  touchControls?: boolean;
  gyroControls?: boolean;
  minHeight?: number;
  minWidth?: number;
  scale?: number;
  scaleMobile?: number;
  backgroundColor?: number;
  color1?: number;
  color2?: number;
  colorMode?: string;
  birdSize?: number;
  wingSpan?: number;
  speedLimit?: number;
  separation?: number;
  alignment?: number;
  cohesion?: number;
  quantity?: number;
  backgroundAlpha?: number;
}

interface VantaCloudsOptions {
  el: HTMLElement;
  THREE?: any;
  mouseControls?: boolean;
  touchControls?: boolean;
  gyroControls?: boolean;
  minHeight?: number;
  minWidth?: number;
  skyColor?: number;
  cloudColor?: number;
  cloudShadowColor?: number;
  sunColor?: number;
  sunGlareColor?: number;
  sunlightColor?: number;
  speed?: number;
}

interface Window {
  VANTA: {
    BIRDS(options: VantaBirdsOptions): VantaEffect;
    CLOUDS(options: VantaCloudsOptions): VantaEffect;
  };
  THREE: any;
}


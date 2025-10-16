// Type definitions for Vanta.js
interface VantaEffect {
  destroy(): void;
  resize(): void;
  setOptions(options: any): void;
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
    CLOUDS(options: VantaCloudsOptions): VantaEffect;
  };
  THREE: any;
}


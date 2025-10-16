import { onMounted, onUnmounted, Ref } from 'vue';

export function useVantaEffect(
  elementRef: Ref<HTMLElement | null>, 
  customOptions?: Partial<VantaCloudsOptions>
) {
  let vantaEffect: VantaEffect | null = null;

  onMounted(() => {
    // Attendre que les scripts soient chargés
    const initVanta = () => {
      if (!window.VANTA || !elementRef.value) {
        setTimeout(initVanta, 100);
        return;
      }

      try {
        // Configuration par défaut pour l'effet Clouds
        const defaultOptions: VantaCloudsOptions = {
          el: elementRef.value,
          THREE: window.THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.00,
          minWidth: 200.00,
          skyColor: 0x68b8d7,
          cloudColor: 0xadc9d8,
          cloudShadowColor: 0x183550,
          sunColor: 0xff9919,
          sunGlareColor: 0xff6633,
          sunlightColor: 0xff9933,
          speed: 1.2
        };

        // Fusionner avec les options personnalisées
        vantaEffect = window.VANTA.CLOUDS({
          ...defaultOptions,
          ...customOptions
        });
      } catch (error) {
        console.error('Error initializing Vanta effect:', error);
      }
    };

    initVanta();
  });

  onUnmounted(() => {
    if (vantaEffect) {
      vantaEffect.destroy();
    }
  });

  return {
    vantaEffect
  };
}


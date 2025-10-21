import { onMounted, onUnmounted, Ref } from 'vue';

export function useVantaEffect(
  elementRef: Ref<HTMLElement | null>, 
  customOptions?: Partial<VantaBirdsOptions>
) {
  let vantaEffect: VantaEffect | null = null;

  onMounted(() => {
    // Vérifier si on est sur mobile - désactiver l'animation pour économiser les ressources
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isLowPerformance = navigator.hardwareConcurrency ? navigator.hardwareConcurrency < 4 : false;
    
    // Sur mobile ou appareil faible, on peut skip l'animation
    if (isMobile || isLowPerformance) {
      console.log('Vanta effect disabled on mobile/low-performance device');
      return;
    }

    // Attendre que les scripts soient chargés
    const initVanta = () => {
      if (!window.VANTA || !elementRef.value) {
        setTimeout(initVanta, 100);
        return;
      }

      try {
        // Configuration optimisée pour l'effet Birds (beaucoup plus léger que Clouds)
        const defaultOptions: VantaBirdsOptions = {
          el: elementRef.value,
          THREE: window.THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.00,
          minWidth: 200.00,
          scale: 1.00,
          scaleMobile: 0.75, // Échelle réduite sur mobile pour de meilleures perfs
          backgroundColor: 0xffffff, // Blanc
          color1: 0xff0000, // Rouge
          color2: 0xa3a3ff, // Mauve/Violet
          colorMode: 'varianceGradient',
          birdSize: 1.00,
          wingSpan: 30.00,
          speedLimit: 5.00,
          separation: 20.00,
          alignment: 20.00,
          cohesion: 20.00,
          quantity: 5, // Seulement 5 oiseaux pour des perfs optimales
          backgroundAlpha: 1.00
        };

        // Fusionner avec les options personnalisées
        vantaEffect = window.VANTA.BIRDS({
          ...defaultOptions,
          ...customOptions
        });
        
        // Performance boost: limiter le FPS si possible
        if (vantaEffect && (vantaEffect as any).renderer) {
          const renderer = (vantaEffect as any).renderer;
          // Limiter à 30 FPS au lieu de 60 pour économiser les ressources
          if (renderer.setAnimationLoop) {
            let lastTime = 0;
            const fps = 30;
            const interval = 1000 / fps;
            
            const originalAnimate = (vantaEffect as any).animate?.bind(vantaEffect);
            if (originalAnimate) {
              (vantaEffect as any).animate = function(time: number) {
                if (!lastTime || time - lastTime >= interval) {
                  lastTime = time;
                  originalAnimate(time);
                }
              };
            }
          }
        }
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


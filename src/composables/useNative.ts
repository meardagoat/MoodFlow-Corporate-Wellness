import { ref, onMounted } from 'vue';
import { Capacitor } from '@capacitor/core';
import { StatusBar, Style } from '@capacitor/status-bar';
import { Keyboard } from '@capacitor/keyboard';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { SplashScreen } from '@capacitor/splash-screen';

export function useNative() {
  const isNative = ref(false);
  const platform = ref<string>('web');

  onMounted(async () => {
    // Détecter si on est sur une plateforme native
    isNative.value = Capacitor.isNativePlatform();
    platform.value = Capacitor.getPlatform();

    // Initialiser les plugins natifs si on est sur mobile
    if (isNative.value) {
      await initializeNativePlugins();
    }
  });

  async function initializeNativePlugins() {
    try {
      // Ajouter une classe pour la plateforme
      if (platform.value === 'ios') {
        document.documentElement.classList.add('ios');
      } else if (platform.value === 'android') {
        document.documentElement.classList.add('android');
      }

      // Cacher le splash screen après l'initialisation
      await SplashScreen.hide();

      // Configurer la barre de statut
      if (platform.value === 'ios' || platform.value === 'android') {
        await StatusBar.setStyle({ style: Style.Light });
        if (platform.value === 'android') {
          await StatusBar.setBackgroundColor({ color: '#ff9d70' });
        }
        // Afficher la status bar (importante pour safe area)
        await StatusBar.show();
      }

      // Configurer le clavier
      if (Capacitor.isPluginAvailable('Keyboard')) {
        Keyboard.addListener('keyboardWillShow', () => {
          document.body.classList.add('keyboard-open');
        });

        Keyboard.addListener('keyboardWillHide', () => {
          document.body.classList.remove('keyboard-open');
        });
      }
    } catch (error) {
      console.error('Error initializing native plugins:', error);
    }
  }

  // Fonction pour déclencher un retour haptique
  async function triggerHaptic(style: ImpactStyle = ImpactStyle.Light) {
    if (isNative.value && Capacitor.isPluginAvailable('Haptics')) {
      try {
        await Haptics.impact({ style });
      } catch (error) {
        console.error('Error triggering haptic:', error);
      }
    }
  }

  // Fonction pour cacher le clavier
  async function hideKeyboard() {
    if (isNative.value && Capacitor.isPluginAvailable('Keyboard')) {
      try {
        await Keyboard.hide();
      } catch (error) {
        console.error('Error hiding keyboard:', error);
      }
    }
  }

  return {
    isNative,
    platform,
    triggerHaptic,
    hideKeyboard,
  };
}


<template>
  <div class="grid min-h-[100svh] bg-paper lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
    <!-- Formulaire -->
    <div class="safe-top flex min-w-0 flex-col px-5 pb-8 sm:px-10 lg:px-14 xl:px-20">
      <div class="flex items-center justify-between py-4">
        <router-link to="/" class="btn btn-sm btn-ghost">
          <Icon name="arrow-left" class="h-4 w-4" />
          <span>Accueil</span>
        </router-link>
        <router-link to="/" class="flex items-center gap-2 lg:hidden" aria-label="MoodFlow, accueil">
          <SunMark class="h-9 w-9" :ray-count="16" :ray-width="8" :state="sunState" />
          <span class="display text-xl tracking-[-0.045em]">MoodFlow</span>
        </router-link>
      </div>

      <div class="mx-auto flex w-full max-w-[28rem] flex-1 flex-col justify-center py-10">
        <h1 class="display animate-fade-up text-display-md">{{ title }}</h1>
        <p class="mt-3 animate-fade-up text-lg text-ink/65 [animation-delay:80ms]">{{ subtitle }}</p>

        <slot name="notice" />

        <nav
          class="relative mt-10 grid animate-fade-up grid-cols-2 rounded-full bg-ink/[0.06] p-1.5 [animation-delay:140ms]"
          aria-label="Connexion ou inscription"
        >
          <span
            class="absolute inset-y-1.5 left-1.5 w-[calc(50%-0.375rem)] rounded-full bg-ink transition-transform duration-500 ease-out-expo"
            :class="mode === 'register' ? 'translate-x-full' : 'translate-x-0'"
            aria-hidden="true"
          />
          <router-link
            to="/login"
            class="relative z-10 rounded-full py-3 text-center text-[15px] font-semibold transition-colors"
            :class="mode === 'login' ? 'text-paper' : 'text-ink/70 hover:text-ink'"
            :aria-current="mode === 'login' ? 'page' : undefined"
          >
            Connexion
          </router-link>
          <router-link
            to="/register"
            class="relative z-10 rounded-full py-3 text-center text-[15px] font-semibold transition-colors"
            :class="mode === 'register' ? 'text-paper' : 'text-ink/70 hover:text-ink'"
            :aria-current="mode === 'register' ? 'page' : undefined"
          >
            Inscription
          </router-link>
        </nav>

        <div class="mt-8 animate-fade-up [animation-delay:200ms]">
          <slot />
        </div>
      </div>

      <p class="label text-ink/40 lg:hidden">© {{ currentYear }} MoodFlow. Tous droits réservés.</p>
    </div>

    <!-- Panneau de marque -->
    <aside class="relative hidden overflow-hidden bg-grape text-paper lg:block" aria-hidden="true">
      <div class="sticky top-0 flex h-[100svh] flex-col justify-between p-10 xl:p-14">
        <div class="label flex items-center justify-between text-paper/60">
          <span>MoodFlow ©{{ currentYear }}</span>
          <span>Bien-être au travail</span>
        </div>

        <div class="relative mx-auto w-[min(76%,32rem)]">
          <Icon name="spark" class="absolute -left-4 top-6 h-8 w-8 animate-twinkle text-sun" />
          <Icon name="spark" class="absolute -right-2 bottom-10 h-6 w-6 animate-twinkle text-candy [animation-delay:1.2s]" />
          <SunMark :state="sunState" :ray-colors="['#FED94E', '#FF5BBC']" track />
        </div>

        <div>
          <p class="display text-[clamp(2.75rem,4.6vw,5rem)] leading-[0.9] tracking-[-0.05em]">
            Le bien-être au travail, <span class="accent text-sun">simplifié</span>
          </p>
          <div class="mt-10 max-w-md border-t border-paper/20 pt-5 text-xs leading-relaxed text-paper/55">
            <p class="text-sm text-paper/75">© {{ currentYear }} MoodFlow. Tous droits réservés.</p>
            <p class="mt-1">
              Toute reproduction, même partielle, des contenus de ce site est interdite. Pour en savoir plus,
              consultez notre <router-link to="/privacy" class="underline underline-offset-2 hover:text-paper">politique de confidentialité</router-link>.
            </p>
          </div>
        </div>
      </div>
    </aside>
  </div>
</template>

<script setup lang="ts">
const currentYear = new Date().getFullYear();
import SunMark from '../brand/SunMark.vue';
import Icon from '../ui/Icon.vue';
import type { FaceState } from '../../lib/moods';

defineProps<{
  mode: 'login' | 'register';
  title: string;
  subtitle: string;
  sunState: FaceState;
}>();
</script>

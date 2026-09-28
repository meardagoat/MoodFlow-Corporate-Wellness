import type { App, Directive } from 'vue';
import { gsap, SplitText, prefersReducedMotion, hasFinePointer } from '../lib/motion';

/* ------------------------------------------------------------------
   v-reveal : fondu + glissement à l'entrée dans l'écran
   v-reveal="0.2"  ou  v-reveal="{ delay: 0.2, variant: 'scale' }"
   ------------------------------------------------------------------ */
type RevealValue = number | { delay?: number; variant?: 'up' | 'fade' | 'scale' } | undefined;

let revealObserver: IntersectionObserver | null = null;

function getRevealObserver() {
  if (revealObserver) return revealObserver;
  revealObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('is-revealed');
        revealObserver?.unobserve(entry.target);
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.01 },
  );
  return revealObserver;
}

export const vReveal: Directive<HTMLElement, RevealValue> = {
  mounted(el, binding) {
    if (prefersReducedMotion() || typeof IntersectionObserver === 'undefined') return;
    const value = binding.value;
    const delay = typeof value === 'number' ? value : value?.delay ?? 0;
    const variant = typeof value === 'object' && value?.variant !== 'up' ? value?.variant : undefined;
    el.dataset.reveal = variant ?? '';
    if (delay) el.style.setProperty('--reveal-delay', `${delay}s`);
    getRevealObserver().observe(el);
  },
  unmounted(el) {
    revealObserver?.unobserve(el);
  },
};

/* ------------------------------------------------------------------
   v-split : les lignes d'un titre montent une à une derrière un masque
   v-split  ou  v-split="{ delay: 0.3, immediate: true }"
   ------------------------------------------------------------------ */
type SplitValue = { delay?: number; immediate?: boolean; stagger?: number } | undefined;

interface SplitEl extends HTMLElement {
  __split?: SplitText;
  __splitTimer?: number;
}

export const vSplit: Directive<SplitEl, SplitValue> = {
  mounted(el, binding) {
    if (prefersReducedMotion()) return;
    const opts = binding.value ?? {};
    const show = () => {
      el.style.visibility = '';
    };

    el.style.visibility = 'hidden';
    // Filet de sécurité : le texte ne reste jamais caché
    el.__splitTimer = window.setTimeout(show, 2500);

    document.fonts.ready.then(() => {
      if (!el.isConnected) return;
      try {
        el.__split = SplitText.create(el, {
          type: 'lines',
          mask: 'lines',
          linesClass: 'split-line',
          autoSplit: true,
          onSplit(self) {
            show();
            return gsap.from(self.lines, {
              yPercent: 118,
              duration: 1.25,
              ease: 'expo.out',
              stagger: opts.stagger ?? 0.09,
              delay: opts.delay ?? 0,
              scrollTrigger: opts.immediate ? undefined : { trigger: el, start: 'top 90%', once: true },
            });
          },
        });
      } catch {
        show();
      }
    });
  },
  unmounted(el) {
    window.clearTimeout(el.__splitTimer);
    el.__split?.revert();
  },
};

/* ------------------------------------------------------------------
   v-magnetic : l'élément suit légèrement le curseur
   ------------------------------------------------------------------ */
interface MagneticEl extends HTMLElement {
  __magnetic?: { move: (e: PointerEvent) => void; leave: () => void };
}

export const vMagnetic: Directive<MagneticEl, number | undefined> = {
  mounted(el, binding) {
    if (prefersReducedMotion() || !hasFinePointer()) return;
    const strength = binding.value ?? 0.3;
    const xTo = gsap.quickTo(el, 'x', { duration: 0.7, ease: 'power3.out' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.7, ease: 'power3.out' });

    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      xTo((e.clientX - (r.left + r.width / 2)) * strength);
      yTo((e.clientY - (r.top + r.height / 2)) * strength);
    };
    const leave = () => {
      xTo(0);
      yTo(0);
    };

    el.addEventListener('pointermove', move);
    el.addEventListener('pointerleave', leave);
    el.__magnetic = { move, leave };
  },
  unmounted(el) {
    if (!el.__magnetic) return;
    el.removeEventListener('pointermove', el.__magnetic.move);
    el.removeEventListener('pointerleave', el.__magnetic.leave);
    gsap.killTweensOf(el);
  },
};

/* ------------------------------------------------------------------
   v-parallax : décalage vertical lié au défilement
   v-parallax="0.3"  (positif = plus lent que la page)
   ------------------------------------------------------------------ */
interface ParallaxEl extends HTMLElement {
  __parallax?: gsap.core.Tween;
}

export const vParallax: Directive<ParallaxEl, number | undefined> = {
  mounted(el, binding) {
    if (prefersReducedMotion()) return;
    const speed = binding.value ?? 0.2;
    el.__parallax = gsap.fromTo(
      el,
      { yPercent: speed * 60 },
      {
        yPercent: -speed * 60,
        ease: 'none',
        scrollTrigger: {
          trigger: el.parentElement ?? el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      },
    );
  },
  unmounted(el) {
    el.__parallax?.scrollTrigger?.kill();
    el.__parallax?.kill();
  },
};

export function registerMotionDirectives(app: App) {
  app.directive('reveal', vReveal);
  app.directive('split', vSplit);
  app.directive('magnetic', vMagnetic);
  app.directive('parallax', vParallax);
}

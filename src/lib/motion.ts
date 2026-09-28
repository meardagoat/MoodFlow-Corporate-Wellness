import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger, SplitText);

export { gsap, ScrollTrigger, SplitText };

export function prefersReducedMotion(): boolean {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function hasFinePointer(): boolean {
  return typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches;
}

let lenis: Lenis | null = null;

function raf(time: number) {
  lenis?.raf(time * 1000);
}

/** Défilement doux, réservé aux pages vitrine. */
export function startSmoothScroll(): Lenis | null {
  if (lenis || prefersReducedMotion()) return lenis;

  lenis = new Lenis({
    duration: 1.15,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  });

  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add(raf);
  gsap.ticker.lagSmoothing(0);

  return lenis;
}

export function stopSmoothScroll() {
  if (!lenis) return;
  gsap.ticker.remove(raf);
  lenis.destroy();
  lenis = null;
}

export function getLenis(): Lenis | null {
  return lenis;
}

export function scrollToTop(immediate = true) {
  if (lenis) {
    lenis.scrollTo(0, { immediate, force: true });
  } else {
    window.scrollTo({ top: 0, behavior: immediate ? 'auto' : 'smooth' });
  }
}

export function scrollToElement(target: HTMLElement | null, offset = -24) {
  if (!target) return;
  if (lenis) {
    lenis.scrollTo(target, { offset, duration: 1.4 });
  } else {
    const top = target.getBoundingClientRect().top + window.scrollY + offset;
    window.scrollTo({ top, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
  }
}

/** Recalcule les déclencheurs une fois la page (images, polices) en place. */
export function refreshScrollTriggers(delay = 120) {
  window.setTimeout(() => ScrollTrigger.refresh(), delay);
}

import type Lenis from "lenis";

let lenis: Lenis | null = null;
let locked = false;

/** Called from SmoothScroll when the Lenis instance is created or destroyed. */
export function registerLenis(instance: Lenis | null): void {
  lenis = instance;
  if (instance && locked) {
    instance.stop();
  }
}

/** Freeze Lenis + native page scroll while the preloader runs. */
export function lockScroll(): void {
  locked = true;
  if (typeof document !== "undefined") {
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
  }
  lenis?.stop();
}

/** Restore scrolling after the preloader exits (or is skipped). */
export function unlockScroll(): void {
  locked = false;
  if (typeof document !== "undefined") {
    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";
  }
  lenis?.start();
}

export function isScrollLocked(): boolean {
  return locked;
}

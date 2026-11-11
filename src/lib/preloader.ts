/** Session + handshake for the load ritual (Step 6a) and hero follow-ups (6b). */

export const PRELOADED_STORAGE_KEY = "vd-preloaded";
export const PRELOADED_EVENT = "vd:preloaded";
export const PRELOADED_DATA_ATTR = "data-vd-preloaded";

let settled = false;
let resolveWhenPreloaded: (() => void) | null = null;

/**
 * Resolves once the preloader finishes, is skipped (repeat visit),
 * or is omitted for reduced motion. Safe for Step 6b to `await`.
 */
export const whenPreloaded = new Promise<void>((resolve) => {
  resolveWhenPreloaded = resolve;
});

export function isPreloaded(): boolean {
  return settled;
}

/** Persist skip flag, stamp `<html>`, notify listeners, resolve `whenPreloaded`. */
export function markPreloaded(): void {
  if (settled) return;
  settled = true;

  if (typeof window !== "undefined") {
    try {
      sessionStorage.setItem(PRELOADED_STORAGE_KEY, "1");
    } catch {
      /* private mode / blocked storage */
    }
    document.documentElement.setAttribute(PRELOADED_DATA_ATTR, "1");
    window.dispatchEvent(new Event(PRELOADED_EVENT));
  }

  resolveWhenPreloaded?.();
  resolveWhenPreloaded = null;
}

/** True when this session already ran the preloader (or marked complete). */
export function hasPreloadedSession(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return sessionStorage.getItem(PRELOADED_STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

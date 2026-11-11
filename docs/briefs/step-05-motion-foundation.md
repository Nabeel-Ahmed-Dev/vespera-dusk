# Step 5: Motion foundation

Branch step-05-motion-foundation (from main). Contract: docs/plan.md Step 5 + docs/motion-spec.md "Stack & feel" and "Global background". Follow .cursor/rules/gsap.mdc.
Versions installed: gsap 3.15.1, @gsap/react 2.1.2, lenis 1.3.27. Before writing code, read the actual API in node_modules (lenis README / types, lenis/react if present, gsap types) - don't rely on memory.

Scope:
1. src/lib/gsap.ts: register ScrollTrigger (and useGSAP) once; export gsap, ScrollTrigger, and shared ease/duration constants from the spec (expo.out reveals, power2.inOut scrubs, scrub 1). Client-only.
2. Smooth scroll provider (client component, mounted in layout around page content): Lenis with autoRaf disabled, driven by gsap.ticker (lenis.raf(time*1000)), gsap.ticker.lagSmoothing(0), lenis 'scroll' -> ScrollTrigger.update. Include lenis base CSS. Cleanup on unmount. Anchor links (e.g. "Discover Dusk") should scroll via Lenis. No ScrollSmoother.
3. Reduced motion: when prefers-reduced-motion: reduce, do NOT start Lenis (native scroll) and skip/zero scrub animations. Expose a small useReducedMotion or matchMedia helper; use gsap.matchMedia with conditions { desktop: (min-width:1024px), mobile: (max-width:1023px), reduce: (prefers-reduced-motion: reduce) }.
4. Global sunset background: scroll-linked gradient #E7C07F -> #A9681F -> #0E0B08 from Hero to the Scent Pyramid (Notes) section, via CSS custom properties on a fixed background layer (or the page root) scrubbed by one ScrollTrigger (scrub 1, power2.inOut-ish mapping). Text color flips at midpoint (CSS var). Proof and Offer stay ivory, Final CTA night - keep their existing section backgrounds; only the hero->notes stretch is driven. Must look identical to the current static design at scroll 0 and at the Notes section, on desktop and mobile; under reduced motion, render the current static backgrounds. Note: Story currently has its own background - integrate so the transition is seamless, no double backgrounds or flashes.
5. No section-specific animations (preloader, bottle tilt, SplitText, marquee etc. are later steps).
6. Do not break SSR / static prerender; no hydration warnings.

Don't start a dev server (one is running on :3000). pnpm lint && pnpm build must pass. Small commits (lib+provider, reduced motion, gradient). Report what you built, file list, and how to verify.

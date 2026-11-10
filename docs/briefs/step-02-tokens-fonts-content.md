# Step 2 brief: design tokens, fonts, content

You are the developer. Read AGENTS.md, .cursor/rules/*, docs/plan.md (Step 2), docs/design.md first. STEP 2 ONLY. You are on branch step-02-tokens-fonts-content.

Do:
1. src/app/globals.css: Tailwind v4 CSS-first. `@import "tailwindcss";` plus `@theme` with every color token from docs/design.md (night, night9, amber7, amber6, honey4, honey3, honey2, cream, cream5, gold #E7C07F, amber-mid #A9681F), font families (--font-display, --font-sans, --font-logo wired to next/font CSS variables), and small utility tokens for label/button letter-spacing. Remove the create-next-app demo styles. Cross-check values with design-handoff/web/base.css.
2. src/app/fonts.ts (or layout.tsx): next/font/google: Cormorant Garamond weights 300/400/500 normal+italic, Manrope 400-800, Montserrat 600; expose as CSS variables on <html>. Set metadata title "Vespera Dusk N° 01".
3. src/content/site.ts: typed (export const + TS types) single source for ALL placeholder copy of every section (Nav, Hero, Story, Scent Pyramid notes Top/Heart/Base, Craft/Vessel, Social Proof press + reviews + 4.9 rating from 2,184 reviews, Offer sizes $125/$185 with ml, stock 71%, $8 sample, Guarantee 30-day, FAQ incl. "What if it isn't for me?", Final CTA "Wear the hour.", Footer). Extract the text from design-handoff/web/mobile_v2.html and the screenshots in design-handoff/. Also image paths in public/images.
4. src/app/page.tsx: replace demo with a TEMPORARY minimal style-guide preview (color swatches, the three font families incl. italic, a label sample, a pill button sample) reading from tokens; comment that step 3 replaces it.
No new dependencies. No section layouts, no animation.
Verify: pnpm lint && pnpm build must pass. Commit on this branch: "feat: step 2 design tokens, fonts, content". Report files changed and anything ambiguous.

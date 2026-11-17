# Step 7b fix 4 - Restore the bigger PR #10 layout, keep pyramid numerals + tier content

Branch: step-07b-scent-pyramid. ScentPyramid.tsx has just been restored to the committed version (fb546c3) - that layout and sizing is what Nabeel wants (the Figma 3-column rewrite felt too small and is discarded; backup at C:/Users/Wajiz.pk/vd-qa/backup/ScentPyramid.fix3.tsx for reference only). src/content/site.ts already contains scentPyramid.bodyLong and tier.description - keep them.
Edit src/components/sections/ScentPyramid.tsx only. Do not start a dev server (one is on :3000). Do not commit.

## Keep EXACTLY as committed
The layout, sizes, columns, spacing, typography, labels, pills, pin, scroll highlight timeline, hover rules, reveals, reduced motion, and all mobile (< 1024px) rendering. Mobile must be pixel-identical to the committed version - all additions are lg-only.

## Add (lg+ only)
1. Roman numerals I / II / III inside the pyramid bands as SVG <text>, centred horizontally in each band and vertically near the band's visual centre (top band: lower part of the triangle where it is wide enough). Font: the display serif (CSS variable used for headings), italic, light, size about 9-10% of the svg viewBox height. Colour: I and II dark night (#0E0B08 at ~70% opacity), III honey (the existing honey3 colour) because the base band is dark. Each <text> goes INSIDE its band's [data-pyramid-band] <g> so the fill reveal and the highlight dimming apply to it. aria-hidden. Hide below lg (class "hidden lg:inline" or equivalent).
2. Tier description (tier.description) under each row's title: ~15-16px sans, cream at 60%, small top margin. lg only (hidden below lg). It must be part of that row's reveal (fades up with the label/title) and dims with its row in the highlight/hover.
3. On lg, replace the short body text with scentPyramid.bodyLong in the SAME place the short body is now (short body stays on mobile, use lg:hidden / hidden lg:block). Same styling as the current body.

## Must still hold
Section exactly 100dvh on lg with all content visible inside the viewport and nothing overlapping at 1024x768, 1280x720, 1366x768, 1440x900, 1536x864, 1920x1080. If the descriptions make it too tall on the short sizes, trim only row padding / gaps via dvh clamps; do NOT shrink the headline, pyramid or titles at 1440x900 and above compared to the committed version.
Verify with node C:/Users/Wajiz.pk/vd-qa/pw/rows.js (must be ALL PASS; adapt its selectors only if markup differs) and node C:/Users/Wajiz.pk/vd-qa/pw/pin.js all (contentBottom <= innerHeight at every size, errors 0). Then npm run lint and npm run build. Report results.

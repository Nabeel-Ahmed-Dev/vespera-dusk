# Step 3 fix round 3: image quality + optimized formats (Nabeel feedback)

Branch step-03-static-desktop. Nabeel reports some images look low quality. Two causes: (a) source files in public/images are low-res (bottle cutouts ~430x600, photos 1360x768); higher-res sources will be swapped in later with the same file names, so do not touch the image files. (b) next/image config. Fix (b) only:
1. next.config.ts: images.formats ['image/avif','image/webp']; images.qualities [75, 90] (Next 16 requires whitelisting quality values); sensible deviceSizes/imageSizes incl. 2880 for retina full-bleed. Check the current Next 16 docs in node_modules/next/dist/docs or the official docs for exact option names; don't guess.
2. Every <Image>: correct `sizes` matching rendered width (Hero and Offer bottles currently lack sizes; set them), quality={90} on hero bottle, offer bottle, craft label close-up, story image and final CTA background; keep 75 for thumbnails. Ensure no image is rendered larger than needed via CSS scaling.
3. Keep alt text meaningful.
Do not start a dev server (one runs on :3000). pnpm lint && pnpm build must pass. Commit "fix: next/image AVIF/WebP, quality and sizes". Report what changed.

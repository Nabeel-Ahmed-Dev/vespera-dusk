import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 90],
    // Defaults plus 1440 (layout max) and 2880 (retina full-bleed).
    deviceSizes: [640, 750, 828, 1080, 1200, 1440, 1920, 2048, 2880, 3840],
    imageSizes: [32, 48, 64, 96, 128, 256, 384],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;

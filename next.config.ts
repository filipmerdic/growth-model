import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/growth-model',
  assetPrefix: '/growth-model/',
};

export default nextConfig;

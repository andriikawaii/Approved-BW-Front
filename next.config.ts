import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow images from the backend API domain
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },

  // Ensure trailing slashes match backend canonical URLs
  trailingSlash: true,

  experimental: {
    optimizeCss: true,
  },
};

export default nextConfig;

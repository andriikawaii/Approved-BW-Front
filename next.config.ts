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
  },

  // Ensure trailing slashes match backend canonical URLs
  trailingSlash: true,
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  productionBrowserSourceMaps: false,

  // Allow images from the backend API domain
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
  },

  // Ensure trailing slashes match backend canonical URLs
  trailingSlash: true,

  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['lucide-react', 'react-markdown', 'remark-gfm'],
  },

  async headers() {
    const immutable = [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }];
    return [
      { source: '/hero/:file*', headers: immutable },
      { source: '/portfolio/:file*', headers: immutable },
      { source: '/logos/:file*', headers: immutable },
      { source: '/team/:file*', headers: immutable },
      { source: '/services/:file*', headers: immutable },
      { source: '/avatars/:file*', headers: immutable },
      { source: '/images/:file*', headers: immutable },
      { source: '/fonts/:file*', headers: immutable },
      { source: '/og-default.jpg', headers: immutable },
      { source: '/_next/image/:path*', headers: immutable },
      { source: '/:slug(.+\\.(?:svg|jpg|jpeg|png|webp|avif|gif|ico|woff|woff2|ttf|otf|eot|mp4|webm))', headers: immutable },
    ];
  },

};

export default nextConfig;

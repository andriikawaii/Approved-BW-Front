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

  async redirects() {
    const droppedTownHubs = [
      'stamford-ct', 'new-canaan-ct', 'norwalk-ct', 'darien-ct', 'fairfield-ct', 'ridgefield-ct',
    ].map((slug) => ({ source: `/fairfield-county/${slug}/:path*`, destination: '/fairfield-county/', permanent: true }));

    const droppedNHTownHubs = [
      'hamden-ct', 'branford-ct', 'guilford-ct', 'madison-ct', 'milford-ct', 'woodbridge-ct',
    ].map((slug) => ({ source: `/new-haven-county/${slug}/:path*`, destination: '/new-haven-county/', permanent: true }));

    const droppedCaseStudies = [
      'basement-finishing-darien',
      'bathroom-remodeling-westport',
      'kitchen-remodeling-milford',
      'kitchen-remodeling-new-canaan',
      'whole-home-restoration-hamden',
    ].map((slug) => ({ source: `/case-studies/${slug}/:path*`, destination: '/case-studies/', permanent: true }));

    return [
      ...droppedTownHubs,
      ...droppedNHTownHubs,
      ...droppedCaseStudies,
      { source: '/kitchen-remodeling/fairfield-county/:path*', destination: '/kitchen-remodeling/', permanent: true },
    ];
  },
};

export default nextConfig;

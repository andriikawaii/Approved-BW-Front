import './globals.css';
import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://builtwellct.com';

export const metadata: Metadata = {
  title: {
    default: 'BuiltWell CT | Home Remodeling Contractor in Connecticut',
    template: '%s | BuiltWell CT',
  },
  description: "Connecticut's trusted home remodeling contractor. Kitchens, bathrooms, basements & more. The last contractor you'll hire.",
  metadataBase: new URL(SITE_URL),

  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },

  openGraph: {
    siteName: 'BuiltWell CT',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: '/og-default.jpg',
        width: 1200,
        height: 630,
        alt: 'BuiltWell CT — Home Remodeling Contractor in Connecticut',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    site: '@builtwellct',
    creator: '@builtwellct',
    images: ['/og-default.jpg'],
  },

  authors: [{ name: 'BuiltWell CT' }],

  other: {
    'geo.region': 'US-CT',
    'geo.placename': 'Connecticut',
  },
};

const isDevelopment = process.env.NODE_ENV === 'development';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body suppressHydrationWarning={isDevelopment} className="font-sans antialiased">{children}</body>
    </html>
  );
}

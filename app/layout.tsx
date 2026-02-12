import './globals.css';
import type { Metadata } from 'next';
import Layout from '@/src/components/layouts/Layout';

// Fallback metadata — pages override via generateMetadata()
export const metadata: Metadata = {
  title: {
    default: 'BuiltWell',
    template: '%s | BuiltWell',
  },
  description: "The Last Contractor You'll Hire",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}

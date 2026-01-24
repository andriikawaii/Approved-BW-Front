import './globals.css';
import type { Metadata } from 'next';
import Layout from '@/src/components/layouts/Layout';

export const metadata: Metadata = {
  title: 'BuiltWell',
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

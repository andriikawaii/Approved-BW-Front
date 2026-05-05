import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPageBySlug } from '@/src/api/pages';
import { PageDataProvider } from '@/src/context/PageDataContext';
import { HomePageTemplate } from '@/src/templates/HomePageTemplate';
import { resolvePhones } from '@/lib/phones';
import Layout from '@/src/components/layouts/Layout';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL;

if (!SITE_URL) {
  throw new Error('NEXT_PUBLIC_SITE_URL environment variable is required');
}

function normalizeApiPhones(value: unknown) {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => {
      if (!item || typeof item !== 'object') return null;
      const m = item as { label?: unknown; number?: unknown };
      if (typeof m.label !== 'string' || typeof m.number !== 'string') return null;
      return { label: m.label, number: m.number };
    })
    .filter((item): item is { label: string; number: string } => Boolean(item));
}

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug('');
  if (!page) return {};

  const canonical = page.seo.canonical ?? `${SITE_URL}/`;
  const ogImageAlt = page.seo.og_image_alt ?? page.seo.title;
  const robotsValue = page.seo.robots;
  const robots: Metadata['robots'] = robotsValue
    ? { index: !robotsValue.includes('noindex'), follow: !robotsValue.includes('nofollow') }
    : undefined;

  return {
    title: page.seo.title,
    description: page.seo.description,
    alternates: { canonical },
    ...(robots && { robots }),
    openGraph: {
      title: page.seo.title,
      description: page.seo.description,
      url: canonical,
      type: 'website',
      images: [{ url: '/og-default.jpg', width: 1200, height: 630, alt: ogImageAlt }],
    },
    twitter: {
      card: 'summary_large_image',
      title: page.seo.title,
      description: page.seo.description,
      images: [{ url: '/og-default.jpg', alt: ogImageAlt }],
    },
  };
}

export default async function HomePage() {
  const page = await getPageBySlug('');
  if (!page) notFound();

  const apiPhones = normalizeApiPhones((page as { phones?: { items?: unknown } }).phones?.items);
  const phones = apiPhones.length > 0 ? apiPhones : resolvePhones('A');

  return (
    <PageDataProvider footerVariant="A" phones={phones}>
      {page.schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(page.schema) }}
        />
      )}
      <Layout>
        <HomePageTemplate page={page} />
      </Layout>
    </PageDataProvider>
  );
}

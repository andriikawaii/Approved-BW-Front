import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPageBySlug } from '@/src/api/pages';
import { PageDataProvider } from '@/src/context/PageDataContext';
import { renderTemplate } from '@/src/templates';
import { resolveFooterVariant, type FooterVariant } from '@/lib/footer';
import { resolvePhones, type PhoneItem } from '@/lib/phones';
import Layout from '@/src/components/layouts/Layout';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL;

if (!SITE_URL) {
  throw new Error('NEXT_PUBLIC_SITE_URL environment variable is required');
}

type Props = {
  params: Promise<{ slug: string[] }>;
};

async function resolveSlugPath(params: Props['params']) {
  const { slug } = await params;
  return slug.join('/');
}

function isFooterVariant(value: unknown): value is FooterVariant {
  return value === 'A' || value === 'B' || value === 'C' || value === 'D';
}

function normalizeApiPhones(value: unknown): PhoneItem[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) => {
      if (!item || typeof item !== 'object') {
        return null;
      }
      const maybeItem = item as { label?: unknown; number?: unknown };
      if (typeof maybeItem.label !== 'string' || typeof maybeItem.number !== 'string') {
        return null;
      }
      return {
        label: maybeItem.label,
        number: maybeItem.number,
      };
    })
    .filter((item): item is PhoneItem => Boolean(item));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const path = await resolveSlugPath(params);
  const page = await getPageBySlug(path);
  if (!page) return {};

  const normalizedPath = path.replace(/^\/+|\/+$/g, '');
  const canonical = page.seo.canonical
    ?? (normalizedPath ? `${SITE_URL}/${normalizedPath}/` : `${SITE_URL}/`);

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
      images: [
        {
          url: '/og-default.jpg',
          width: 1200,
          height: 630,
          alt: ogImageAlt,
        },
      ],
    },

    twitter: {
      card: 'summary_large_image',
      title: page.seo.title,
      description: page.seo.description,
      images: [{ url: '/og-default.jpg', alt: ogImageAlt }],
    },
  };
}


export default async function DynamicPage({ params }: Props) {
  const { slug } = await params;
  const path = slug.join('/');
  const page = await getPageBySlug(path);
  if (!page) notFound();

  const apiFooterTemplate = page.footer?.template?.toUpperCase();
  const footerVariant = isFooterVariant(apiFooterTemplate)
    ? apiFooterTemplate
    : resolveFooterVariant(page.template, page.slug);

  const apiPhones = normalizeApiPhones(page.phones?.items);
  const phones = apiPhones.length > 0 ? apiPhones : resolvePhones(footerVariant);

  return (
    <PageDataProvider footerVariant={footerVariant} phones={phones}>
      {page.schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(page.schema) }}
        />
      )}
      <Layout>
        {renderTemplate(page)}
      </Layout>
    </PageDataProvider>
  );
}

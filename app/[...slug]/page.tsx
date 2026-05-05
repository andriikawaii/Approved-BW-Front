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

// Fallback hero images per slug — these match the hardcoded fallbacks in each template.
// Preloading here allows the browser to fetch the image before the lazy JS chunk loads.
const HERO_FALLBACKS: Record<string, string> = {
  'new-haven-county/orange-ct': '/portfolio/builtwell-team-office-exterior-ct.jpg',
  'new-haven-county/new-haven-ct': '/images/areas/new-haven-ct-skyline.jpg',
  'fairfield-county/greenwich-ct': '/images/areas/greenwich-ct-avenue.jpg',
  'fairfield-county/madison-ct': '/images/areas/madison-ct-town.jpg',
};

function resolveHeroImage(
  page: Awaited<ReturnType<typeof getPageBySlug>>,
  slug: string,
): string | null {
  if (!page) return null;
  const heroSection = page.sections.find((s) => s.type === 'hero');
  const bg = heroSection
    ? (heroSection.data as Record<string, unknown>)['background_image']
    : null;
  if (typeof bg === 'string' && bg.trim()) return bg.trim();
  // Use static fallback if we know the template's default
  return HERO_FALLBACKS[slug] ?? null;
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

  const heroImage = resolveHeroImage(page, path);

  return (
    <PageDataProvider footerVariant={footerVariant} phones={phones}>
      {heroImage && (
        <link
          rel="preload"
          as="image"
          href={`/_next/image?url=${encodeURIComponent(heroImage)}&w=1080&q=85`}
          fetchPriority="high"
        />
      )}
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

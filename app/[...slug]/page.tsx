import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPageBySlug } from '@/src/api/pages';
import { PageDataProvider } from '@/src/context/PageDataContext';
import { renderTemplate } from '@/src/templates';
import { resolveFooterVariant } from '@/lib/footer';
import { resolvePhones } from '@/lib/phones';
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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const path = await resolveSlugPath(params);
  const page = await getPageBySlug(path);
  if (!page) return {};

  const normalizedPath = path.replace(/^\/+|\/+$/g, '');
  const canonical = normalizedPath ? `${SITE_URL}/${normalizedPath}/` : `${SITE_URL}/`;

  return {
    title: page.seo.title,
    description: page.seo.description,
    alternates: { canonical },
    openGraph: {
      title: page.seo.title,
      description: page.seo.description,
      url: canonical,
      type: 'website',
    },
  };
}

export default async function DynamicPage({ params }: Props) {
  const { slug } = await params;
  const path = slug.join('/');
  const page = await getPageBySlug(path);
  if (!page) notFound();

  const footerVariant = resolveFooterVariant(page.template, page.slug);
  const phones = resolvePhones(footerVariant);

  return (
    <PageDataProvider footerVariant={footerVariant} phones={phones}>
      <Layout>
        {renderTemplate(page)}
      </Layout>
    </PageDataProvider>
  );
}

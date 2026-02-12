import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPageBySlug } from '@/src/api/pages';
import { PageDataProvider } from '@/src/context/PageDataContext';
import { renderTemplate } from '@/src/templates';
import { JsonLd } from '@/src/components/seo/JsonLd';

type Props = {
  params: Promise<{ slug: string[] }>;
};

async function fetchPage(params: Props['params']) {
  const { slug } = await params;
  const path = slug.join('/');
  return getPageBySlug(path);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = await fetchPage(params);
  if (!page) return {};

  return {
    title: page.seo.title,
    description: page.seo.description,
    ...(page.seo.canonical ? { alternates: { canonical: page.seo.canonical } } : {}),
  };
}

export default async function DynamicPage({ params }: Props) {
  const page = await fetchPage(params);
  if (!page) notFound();

  return (
    <PageDataProvider phones={page.phones} footer={page.footer}>
      <JsonLd schemas={page.seo.schemas} />
      {renderTemplate(page)}
    </PageDataProvider>
  );
}

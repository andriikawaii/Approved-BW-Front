import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPreviewPage } from '@/src/api/pages';
import { PageDataProvider } from '@/src/context/PageDataContext';
import { renderTemplate } from '@/src/templates';
import { JsonLd } from '@/src/components/seo/JsonLd';

export const metadata: Metadata = {
  robots: 'noindex, nofollow',
};

type Props = {
  searchParams: Promise<{ path?: string; signature?: string }>;
};

export default async function PreviewPage({ searchParams }: Props) {
  const { path, signature } = await searchParams;

  if (!path || !signature) notFound();

  const page = await getPreviewPage(path, signature);
  if (!page) notFound();

  return (
    <PageDataProvider phones={page.phones} footer={page.footer}>
      {/* Preview banner */}
      <div className="bg-yellow-400 text-black text-center py-2 text-sm font-semibold">
        PREVIEW MODE — This page is not published
      </div>
      <JsonLd schemas={page.seo.schemas} />
      {renderTemplate(page)}
    </PageDataProvider>
  );
}

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPreviewPage } from '@/src/api/pages';
import { PageDataProvider } from '@/src/context/PageDataContext';
import { renderTemplate } from '@/src/templates';
import { resolveFooterVariant } from '@/lib/footer';
import { resolvePhones } from '@/lib/phones';

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

  const footerVariant = resolveFooterVariant(page.template, page.slug);
  const phones = resolvePhones(footerVariant);

  return (
    <PageDataProvider footerVariant={footerVariant} phones={phones}>
      {/* Preview banner */}
      <div className="bg-yellow-400 text-black text-center py-2 text-sm font-semibold">
        PREVIEW MODE — This page is not published
      </div>
      {renderTemplate(page)}
    </PageDataProvider>
  );
}

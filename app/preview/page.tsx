import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPreviewPage } from '@/src/api/pages';
import { PageDataProvider } from '@/src/context/PageDataContext';
import { renderTemplate } from '@/src/templates';
import { resolveFooterVariant, type FooterVariant } from '@/lib/footer';
import { resolvePhones, type PhoneItem } from '@/lib/phones';
import TextUsWidget from '@/src/components/layouts/TextUsWidget';

export const metadata: Metadata = {
  robots: 'noindex, nofollow',
};
 
type Props = {
  searchParams: Promise<{ path?: string; signature?: string }>;
};

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

export default async function PreviewPage({ searchParams }: Props) {
  const { path, signature } = await searchParams;

  if (!path || !signature) notFound();

  const page = await getPreviewPage(path, signature);
  if (!page) notFound();

  const apiFooterTemplate = page.footer?.template?.toUpperCase();
  const footerVariant = isFooterVariant(apiFooterTemplate)
    ? apiFooterTemplate
    : resolveFooterVariant(page.template, page.slug);

  const apiPhones = normalizeApiPhones(page.phones?.items);
  const phones = apiPhones.length > 0 ? apiPhones : resolvePhones(footerVariant);

  return (
    <PageDataProvider footerVariant={footerVariant} phones={phones}>
      {/* Preview banner */}
      <div className="bg-yellow-400 text-black text-center py-2 text-sm font-semibold">
        PREVIEW MODE — This page is not published
      </div>
      {renderTemplate(page)}
      <TextUsWidget />
    </PageDataProvider>
  );
}

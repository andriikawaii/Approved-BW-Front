import { getPageBySlug } from '@/src/api/pages';
import { notFound } from 'next/navigation';
import { DefaultPageTemplate } from '@/src/templates/DefaultPageTemplate';

export default async function DynamicPage({ params }: { params: { slug: string } }) {
  const page = await getPageBySlug(params.slug);

  if (!page) notFound();

  return <DefaultPageTemplate page={page} />;
}

import { getPageBySlug } from '@/src/api/pages';
import { DefaultPageTemplate } from '@/src/templates/DefaultPageTemplate';

export default async function HomePage() {
  const page = await getPageBySlug('/');

  if (!page) return null;

  return <DefaultPageTemplate page={page} />;
}

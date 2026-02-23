import { Page } from '../types/page';

const API_URL = (process.env.LARAVEL_API_URL ?? 'http://localhost:8000').replace(/\/+$/, '');
const isDev = process.env.NODE_ENV === 'development';

export async function getPageBySlug(slug: string): Promise<Page | null> {
  try {
    const path = slug.replace(/^\/+|\/+$/g, '');
    const url = path ? `${API_URL}/api/pages/${path}` : `${API_URL}/api/pages/`;

    const res = await fetch(url, isDev
      ? { cache: 'no-store' }
      : { next: { revalidate: 600 } },
    );

    if (res.status === 404) return null;

    if (!res.ok) {
      return null;
    }

    const data = await res.json();
    console.log('[getPageBySlug]', url, 'template:', data?.template, 'sections:', data?.sections?.length);
    return data;
  } catch (error) {
    console.error('[getPageBySlug] error:', error);
    return null;
  }
}

export async function getPreviewPage(path: string, signature: string): Promise<Page | null> {
  try {
    const res = await fetch(
      `${API_URL}/api/preview/pages?path=${encodeURIComponent(path)}&signature=${encodeURIComponent(signature)}`,
      { cache: 'no-store' },
    );

    if (res.status === 404) return null;

    if (!res.ok) {
      return null;
    }

    return res.json();
  } catch (error) {
    return null;
  }
}

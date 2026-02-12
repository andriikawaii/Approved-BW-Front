import { Page } from '../types/page';

const API_URL = process.env.API_URL ?? 'http://localhost:8000';
const isDev = process.env.NODE_ENV === 'development';

export async function getPageBySlug(slug: string): Promise<Page | null> {
  const path = slug.replace(/^\/+|\/+$/g, '');
  const url = path ? `${API_URL}/api/pages/${path}` : `${API_URL}/api/pages/`;

  const res = await fetch(url, isDev
    ? { cache: 'no-store' }
    : { next: { revalidate: 600 } },
  );

  if (res.status === 404) return null;

  if (!res.ok) {
    throw new Error(`API error: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

export async function getPreviewPage(path: string, signature: string): Promise<Page | null> {
  const res = await fetch(
    `${API_URL}/api/preview/pages?path=${encodeURIComponent(path)}&signature=${encodeURIComponent(signature)}`,
    { cache: 'no-store' },
  );

  if (res.status === 404) return null;

  if (!res.ok) {
    throw new Error(`Preview API error: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

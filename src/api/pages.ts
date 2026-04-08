import { Page } from '../types/page';
import * as fs from 'fs';
import * as path from 'path';

const API_URL = (process.env.LARAVEL_API_URL ?? 'http://localhost:8000').replace(/\/+$/, '');
const CACHE_DIR = path.join(process.cwd(), 'src/api/cache');

// OFFLINE MODE: skip API entirely, serve from local cache only
const OFFLINE_MODE = true;
let apiDown = false;
let lastApiCheck = 0;

function readCache(slug: string): Page | null {
  try {
    const cleanSlug = slug.replace(/^\/+|\/+$/g, '');
    const fileName = cleanSlug ? `${cleanSlug.replace(/\//g, '__')}.json` : '_home.json';
    const filePath = path.join(CACHE_DIR, fileName);

    if (fs.existsSync(filePath)) {
      const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
      return data;
    }
  } catch (_) {}
  return null;
}

function writeCache(slug: string, data: Page): void {
  try {
    const cleanSlug = slug.replace(/^\/+|\/+$/g, '');
    if (!fs.existsSync(CACHE_DIR)) fs.mkdirSync(CACHE_DIR, { recursive: true });
    const fileName = cleanSlug ? `${cleanSlug.replace(/\//g, '__')}.json` : '_home.json';
    fs.writeFileSync(path.join(CACHE_DIR, fileName), JSON.stringify(data));
  } catch (_) {}
}

function stubPage(slug: string): Page {
  const p = slug.replace(/^\/+|\/+$/g, '');
  const parts = p.split('/');
  let template = p.replace(/\//g, '_') || 'home';

  if (!p) template = 'home';
  else if (/^(kitchen-remodeling|flooring|bathroom-remodeling|basement-finishing)\/[a-z-]+-ct$/.test(p)) template = 'service_town';
  else if (['kitchen-remodeling', 'flooring', 'bathroom-remodeling', 'basement-finishing'].includes(parts[0]) && parts.length === 1) template = 'service_global';
  else if (['fairfield-county', 'new-haven-county'].includes(p)) template = 'county';
  else if (parts.length === 2 && ['fairfield-county', 'new-haven-county'].includes(parts[0])) template = 'town';

  return {
    id: 0,
    slug: `/${p}`,
    template,
    seo: {
      title: 'BuiltWell CT | Home Remodeling Contractor in Connecticut',
      description: 'Licensed home remodeling contractor serving Fairfield and New Haven Counties, CT.',
    },
    phones: {
      mode: 'both',
      items: [
        { label: 'Fairfield County', number: '(203) 919-9616' },
        { label: 'New Haven County', number: '(203) 466-9148' },
      ],
    },
    footer: { template: 'A' },
    breadcrumbs: [{ label: 'Home', url: '/' }],
    sections: [],
  };
}

async function fetchFromApi(slug: string): Promise<Page | null> {
  const p = slug.replace(/^\/+|\/+$/g, '');
  const url = p ? `${API_URL}/api/pages/${p}` : `${API_URL}/api/pages/`;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);

  try {
    const res = await fetch(url, { cache: 'no-store', signal: controller.signal });
    clearTimeout(timeout);

    if (res.status === 404) return null;
    if (!res.ok) return null;

    const text = await res.text();
    if (!text || text.length === 0) return null;

    const data = JSON.parse(text);
    apiDown = false;
    return data;
  } catch (_) {
    clearTimeout(timeout);
    apiDown = true;
    lastApiCheck = Date.now();
    return null;
  }
}

export async function getPageBySlug(slug: string): Promise<Page | null> {
  // OFFLINE MODE — skip API, use local cache only
  if (OFFLINE_MODE) {
    const cached = readCache(slug);
    if (cached) return cached;
    return stubPage(slug);
  }

  const cached = readCache(slug);

  const now = Date.now();
  if (apiDown && (now - lastApiCheck) < 60000) {
    if (cached) return cached;
    return stubPage(slug);
  }

  const apiData = await fetchFromApi(slug);

  if (apiData) {
    writeCache(slug, apiData);
    return apiData;
  }

  if (cached) return cached;
  return stubPage(slug);
}

export async function getPreviewPage(path: string, signature: string): Promise<Page | null> {
  try {
    const res = await fetch(
      `${API_URL}/api/preview/pages?path=${encodeURIComponent(path)}&signature=${encodeURIComponent(signature)}`,
      { cache: 'no-store' },
    );
    if (res.status === 404) return null;
    if (!res.ok) return null;
    return res.json();
  } catch (_) {
    return null;
  }
}

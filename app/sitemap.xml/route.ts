import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 3600;

export async function GET() {
  const apiUrl = (process.env.LARAVEL_API_URL ?? 'http://localhost:8000').replace(/\/+$/, '');
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000').replace(/\/+$/, '');

  try {
    const response = await fetch(`${apiUrl}/sitemap.xml`, {
      headers: { Accept: 'application/xml' },
      cache: 'no-store',
    });

    if (!response.ok) {
      return new NextResponse(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>`, {
        status: 200,
        headers: { 'Content-Type': 'application/xml; charset=UTF-8' },
      });
    }

    let xml = await response.text();
    xml = xml.replace(/http:\/\/localhost(:\d+)?/g, siteUrl);

    return new NextResponse(xml, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml; charset=UTF-8',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    });
  } catch {
    return new NextResponse(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>`, {
      status: 200,
      headers: { 'Content-Type': 'application/xml; charset=UTF-8' },
    });
  }
}

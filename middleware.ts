import { NextRequest, NextResponse } from 'next/server';

const API_URL = process.env.API_URL ?? 'http://localhost:8000';

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Skip static files and Next.js internals
  if (
    path.startsWith('/_next') ||
    path.startsWith('/api') ||
    path.startsWith('/images') ||
    path.includes('.')
  ) {
    return NextResponse.next();
  }

  // Check with backend for redirects (HEAD request — lightweight)
  try {
    const cleanPath = path.replace(/^\/+|\/+$/g, '') || '/';
    const res = await fetch(`${API_URL}/api/pages/${cleanPath}`, {
      method: 'HEAD',
      redirect: 'manual',
    });

    if (res.status === 301 || res.status === 302) {
      const location = res.headers.get('Location');
      if (location) {
        const redirectUrl = new URL(location, request.url);
        return NextResponse.redirect(redirectUrl, res.status);
      }
    }
  } catch {
    // If backend is unreachable, let the page handler deal with it
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match all paths except static files and Next.js internals
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};

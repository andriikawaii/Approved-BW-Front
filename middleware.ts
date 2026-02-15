import { NextRequest, NextResponse } from 'next/server';

const REDIRECT_PREFIXES = ['/legacy/', '/old/'];

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  if (
    path.startsWith('/_next') ||
    path.startsWith('/api') ||
    path.startsWith('/images') ||
    path.includes('.')
  ) {
    return NextResponse.next();
  }

  if (!REDIRECT_PREFIXES.some((prefix) => path.startsWith(prefix))) {
    return NextResponse.next();
  }

  const matchedPrefix = REDIRECT_PREFIXES.find((prefix) => path.startsWith(prefix));

  if (!matchedPrefix) {
    return NextResponse.next();
  }

  const strippedPath = path.slice(matchedPrefix.length - 1);
  const redirectPath = strippedPath.length > 0 ? strippedPath : '/';

  const redirectUrl = new URL(redirectPath, request.url);
  redirectUrl.search = request.nextUrl.search;

  return NextResponse.redirect(redirectUrl, 308);
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};

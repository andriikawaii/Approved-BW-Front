import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  const apiUrl = (process.env.LARAVEL_API_URL ?? 'http://localhost:8000').replace(/\/+$/, '');

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid JSON body.' }, { status: 400 });
  }

  const forwarded = request.headers.get('x-forwarded-for');
  const clientIp = forwarded ? forwarded.split(',')[0]!.trim() : request.headers.get('x-real-ip') ?? '';
  const userAgent = request.headers.get('user-agent') ?? '';

  try {
    const response = await fetch(`${apiUrl}/api/leads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'X-Forwarded-For': clientIp,
        'User-Agent': userAgent,
      },
      body: JSON.stringify(body),
      cache: 'no-store',
    });

    const data = await response.json().catch(() => ({ success: false, error: 'Upstream returned non-JSON' }));
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Unable to reach submission endpoint. Please try again.' },
      { status: 502 },
    );
  }
}

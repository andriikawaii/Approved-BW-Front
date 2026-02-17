'use client';

import Link from 'next/link';

export default function ErrorPage({
  error: _error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F5F3EF]">
      <div className="max-w-xl px-6 text-center">
        <h1 className="mb-4 text-6xl text-[#1E2F4A]">500</h1>

        <h2 className="mb-4 text-2xl text-[#1E2F4A]">Something went wrong</h2>

        <p className="mb-8 text-[#6B7280]">
          We&apos;re sorry, an unexpected error occurred. Please try again.
        </p>

        <div className="flex justify-center gap-4">
          <button
            onClick={reset}
            className="inline-block rounded-md bg-[#C89B5B] px-6 py-3 text-white transition hover:bg-[#b98747]"
          >
            Try Again
          </button>

          <Link href="/" className="inline-block rounded-md bg-[#1E2F4A] px-6 py-3 text-white">
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}

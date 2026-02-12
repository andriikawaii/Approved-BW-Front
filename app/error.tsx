'use client';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center max-w-xl px-6">
        <h1 className="text-6xl font-serif text-[#1E2B43] mb-4">500</h1>

        <h2 className="text-2xl font-serif mb-4">Something went wrong</h2>

        <p className="text-gray-600 mb-8">
          We&apos;re sorry, an unexpected error occurred. Please try again.
        </p>

        <div className="flex gap-4 justify-center">
          <button
            onClick={reset}
            className="inline-block bg-[#C68E4D] text-white px-6 py-3 transition hover:bg-[#B07C3C]"
          >
            Try Again
          </button>

          <a
            href="/"
            className="inline-block bg-[#1E2B43] text-white px-6 py-3"
          >
            Back to Home
          </a>
        </div>
      </div>
    </main>
  );
}

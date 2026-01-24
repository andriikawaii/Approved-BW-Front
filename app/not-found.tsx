export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center max-w-xl px-6">
        <h1 className="text-6xl font-serif text-[#1E2B43] mb-4">
          404
        </h1>

        <h2 className="text-2xl font-serif mb-4">
          Page not found
        </h2>

        <p className="text-gray-600 mb-8">
          The page you are looking for doesn’t exist or has been moved.
        </p>

        <a
          href="/"
          className="inline-block bg-[#1E2B43] text-white px-6 py-3"
        >
          Back to Home
        </a>
      </div>
    </main>
  );
}

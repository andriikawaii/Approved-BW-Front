import Link from "next/link";

type BreadcrumbsProps = {
  slug: string[];
};

function toLabel(segment: string): string {
  return segment
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function resolveHomeHref(): string {
  return "/";
}

export default async function Breadcrumbs({ slug }: BreadcrumbsProps) {
  // Hide breadcrumbs on homepage (when slug is empty)
  if (slug.length === 0) {
    return null;
  }

  const homeHref = resolveHomeHref();

  return (
    <nav aria-label="Breadcrumb" className="bg-gray-50 py-3 px-6 border-b border-gray-200">
      <div className="max-w-7xl mx-auto">
        <ol className="flex items-center gap-2 text-sm">
          <li>
            <Link href={homeHref} className="text-blue-600 hover:text-blue-800">Home</Link>
          </li>
          {slug.map((segment, index) => {
            const href = `/${slug.slice(0, index + 1).join("/")}`;
            const isLast = index === slug.length - 1;
            const label = toLabel(segment);

            return (
              <li key={href} className="flex items-center gap-2">
                <span className="text-gray-400">/</span>
                {isLast ? (
                  <span className="text-gray-700 font-medium" aria-current="page">{label}</span>
                ) : (
                  <Link href={href} className="text-blue-600 hover:text-blue-800">{label}</Link>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}

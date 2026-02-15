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
  const homeHref = resolveHomeHref();

  return (
    <nav aria-label="Breadcrumb">
      <ol>
        <li>
          <Link href={homeHref}>Home</Link>
        </li>
        {slug.map((segment, index) => {
          const href = `/${slug.slice(0, index + 1).join("/")}`;
          const isLast = index === slug.length - 1;
          const label = toLabel(segment);

          return (
            <li key={href} aria-current={isLast ? "page" : undefined}>
              {isLast ? label : <Link href={href}>{label}</Link>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export type FooterVariant = "A" | "B" | "C" | "D";

export function resolveFooterVariant(templateKey: string, slug: string): FooterVariant {
  const normalizedTemplate = templateKey.trim().toLowerCase().replace(/^\/+|\/+$/g, "");
  const normalizedSlug = slug.trim().toLowerCase().replace(/^\/+|\/+$/g, "");

  if (normalizedSlug === "orange" || normalizedSlug.endsWith("/orange")) {
    return "D";
  }

  if (normalizedTemplate.includes("fairfield") || normalizedSlug.includes("fairfield-county")) {
    return "B";
  }

  if (
    normalizedTemplate.includes("new_haven") ||
    normalizedTemplate.includes("new-haven") ||
    normalizedSlug.includes("new-haven-county")
  ) {
    return "C";
  }

  return "A";
}

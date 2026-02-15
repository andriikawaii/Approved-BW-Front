export type FooterVariant = "A" | "B" | "C" | "D";

const TEMPLATE_VARIANT_MAP: Record<string, FooterVariant> = {
  landing: "A",
  service: "B",
  location: "C",
  blog: "D",
};

export function resolveFooterVariant(template: string): FooterVariant {
  const normalized = template.trim().toLowerCase();

  if (TEMPLATE_VARIANT_MAP[normalized]) {
    return TEMPLATE_VARIANT_MAP[normalized];
  }

  if (normalized.includes("service")) {
    return "B";
  }

  if (normalized.includes("location")) {
    return "C";
  }

  if (normalized.includes("blog") || normalized.includes("article") || normalized.includes("news")) {
    return "D";
  }

  return "A";
}

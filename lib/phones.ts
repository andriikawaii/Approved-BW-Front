type PhoneResolverContext = {
  template?: string;
  slugPath?: string;
};

const DEFAULT_PHONE = "(800) 555-0100";

const TEMPLATE_PHONE_MAP: Record<string, string> = {
  service: "(800) 555-0110",
  location: "(800) 555-0120",
  blog: "(800) 555-0130",
};

const SLUG_PHONE_MATCHERS: Array<{ pattern: RegExp; phone: string }> = [
  { pattern: /^locations\//i, phone: "(800) 555-0120" },
  { pattern: /^services\//i, phone: "(800) 555-0110" },
  { pattern: /^blog\//i, phone: "(800) 555-0130" },
];

export function resolvePhone(context: PhoneResolverContext = {}): string {
  const normalizedTemplate = (context.template ?? "").trim().toLowerCase();
  const normalizedSlug = (context.slugPath ?? "").trim().replace(/^\/+|\/+$/g, "");

  if (normalizedTemplate && TEMPLATE_PHONE_MAP[normalizedTemplate]) {
    return TEMPLATE_PHONE_MAP[normalizedTemplate];
  }

  if (normalizedSlug) {
    const matched = SLUG_PHONE_MATCHERS.find((matcher) => matcher.pattern.test(normalizedSlug));
    if (matched) {
      return matched.phone;
    }
  }

  return DEFAULT_PHONE;
}

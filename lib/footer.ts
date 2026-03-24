export type FooterVariant = "A" | "B" | "C" | "D";

const FOOTER_A_PATHS = new Set([
  '/',
  '/about/',
  '/portfolio/',
  '/reviews/',
  '/contact/',
  '/free-consultation/',
  '/process/',
  '/financing/',
  '/warranty/',
  '/careers/',
  '/privacy-policy/',
  '/terms/',
  '/thank-you/',
  '/services/',
  '/kitchen-remodeling/',
  '/bathroom-remodeling/',
  '/basement-finishing/',
  '/flooring/',
  '/remodeling-design-planning/',
  '/comfort-accessibility-remodeling/',
  '/home-additions/',
  '/interior-painting/',
  '/interior-carpentry/',
  '/attic-conversions/',
  '/decks-porches/',
  '/areas-we-serve/',
  '/case-studies/',
  '/homeowner-hub/',
  '/faq/',
  '/sitemap/',
]);

const FOOTER_B_PATHS = new Set([
  '/fairfield-county/',
  '/fairfield-county/greenwich-ct/',
  '/fairfield-county/westport-ct/',
  '/kitchen-remodeling/greenwich-ct/',
  '/kitchen-remodeling/westport-ct/',
  '/kitchen-remodeling/darien-ct/',
  '/kitchen-remodeling/new-canaan-ct/',
  '/kitchen-remodeling/stamford-ct/',
  '/kitchen-remodeling/norwalk-ct/',
  '/kitchen-remodeling/fairfield-ct/',
  '/kitchen-remodeling/ridgefield-ct/',
  '/bathroom-remodeling/greenwich-ct/',
  '/bathroom-remodeling/westport-ct/',
  '/bathroom-remodeling/darien-ct/',
  '/bathroom-remodeling/new-canaan-ct/',
  '/bathroom-remodeling/stamford-ct/',
  '/bathroom-remodeling/norwalk-ct/',
  '/bathroom-remodeling/fairfield-ct/',
  '/bathroom-remodeling/ridgefield-ct/',
  '/basement-finishing/greenwich-ct/',
  '/basement-finishing/westport-ct/',
  '/basement-finishing/darien-ct/',
  '/basement-finishing/new-canaan-ct/',
  '/basement-finishing/stamford-ct/',
  '/basement-finishing/norwalk-ct/',
  '/basement-finishing/fairfield-ct/',
  '/basement-finishing/ridgefield-ct/',
  '/flooring/greenwich-ct/',
  '/flooring/westport-ct/',
  '/flooring/darien-ct/',
  '/flooring/new-canaan-ct/',
  '/flooring/stamford-ct/',
  '/flooring/norwalk-ct/',
  '/flooring/fairfield-ct/',
  '/flooring/ridgefield-ct/',
  '/case-studies/basement-finishing-darien/',
  '/case-studies/bathroom-remodeling-westport/',
  '/case-studies/kitchen-remodeling-new-canaan/',
]);

const FOOTER_C_PATHS = new Set([
  '/new-haven-county/',
  '/new-haven-county/new-haven-ct/',
  '/new-haven-county/madison-ct/',
  '/kitchen-remodeling/orange-ct/',
  '/kitchen-remodeling/new-haven-ct/',
  '/kitchen-remodeling/hamden-ct/',
  '/kitchen-remodeling/branford-ct/',
  '/kitchen-remodeling/guilford-ct/',
  '/kitchen-remodeling/madison-ct/',
  '/kitchen-remodeling/woodbridge-ct/',
  '/kitchen-remodeling/milford-ct/',
  '/bathroom-remodeling/orange-ct/',
  '/bathroom-remodeling/new-haven-ct/',
  '/bathroom-remodeling/hamden-ct/',
  '/bathroom-remodeling/branford-ct/',
  '/bathroom-remodeling/guilford-ct/',
  '/bathroom-remodeling/madison-ct/',
  '/bathroom-remodeling/woodbridge-ct/',
  '/bathroom-remodeling/milford-ct/',
  '/basement-finishing/orange-ct/',
  '/basement-finishing/new-haven-ct/',
  '/basement-finishing/hamden-ct/',
  '/basement-finishing/branford-ct/',
  '/basement-finishing/guilford-ct/',
  '/basement-finishing/madison-ct/',
  '/basement-finishing/woodbridge-ct/',
  '/basement-finishing/milford-ct/',
  '/flooring/orange-ct/',
  '/flooring/new-haven-ct/',
  '/flooring/hamden-ct/',
  '/flooring/branford-ct/',
  '/flooring/guilford-ct/',
  '/flooring/madison-ct/',
  '/flooring/woodbridge-ct/',
  '/flooring/milford-ct/',
  '/case-studies/whole-home-restoration-hamden/',
  '/case-studies/kitchen-remodeling-milford/',
]);

function normalizePath(value: string): string {
  const normalized = value.trim().toLowerCase().replace(/^\/+|\/+$/g, '');
  return normalized ? `/${normalized}/` : '/';
}

export function resolveFooterVariant(_templateKey: string, slug: string): FooterVariant {
  const normalizedPath = normalizePath(slug);

  if (FOOTER_A_PATHS.has(normalizedPath)) {
    return "A";
  }

  if (FOOTER_B_PATHS.has(normalizedPath)) {
    return "B";
  }

  if (FOOTER_C_PATHS.has(normalizedPath)) {
    return "C";
  }

  // Keep parity with backend FooterTemplateResolver::isOrangePage.
  if (normalizedPath === "/new-haven-county/orange-ct/") {
    return "D";
  }

  return "A";
}

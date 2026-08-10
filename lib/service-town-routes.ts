// AUTO-GENERATED from the live sitemap (builtwellct.com/sitemap.xml).
// Maps a service hub slug to the town pages that actually exist for it, so the
// areas-served block can link towns without ever emitting a 404.
// Regenerate when new service/town pages ship.

export const SERVICE_TOWN_ROUTES: Record<string, Record<string, string>> = {
  'basement-finishing': {
    'Branford': '/basement-finishing/branford-ct/',
    'Darien': '/basement-finishing/darien-ct/',
    'Fairfield': '/basement-finishing/fairfield-ct/',
    'Greenwich': '/basement-finishing/greenwich-ct/',
    'Guilford': '/basement-finishing/guilford-ct/',
    'Hamden': '/basement-finishing/hamden-ct/',
    'Madison': '/basement-finishing/madison-ct/',
    'Milford': '/basement-finishing/milford-ct/',
    'New Canaan': '/basement-finishing/new-canaan-ct/',
    'New Haven': '/basement-finishing/new-haven-ct/',
    'Norwalk': '/basement-finishing/norwalk-ct/',
    'Orange': '/basement-finishing/orange-ct/',
    'Ridgefield': '/basement-finishing/ridgefield-ct/',
    'Stamford': '/basement-finishing/stamford-ct/',
    'Westport': '/basement-finishing/westport-ct/',
    'Woodbridge': '/basement-finishing/woodbridge-ct/',
  },
  'bathroom-remodeling': {
    'Branford': '/bathroom-remodeling/branford-ct/',
    'Darien': '/bathroom-remodeling/darien-ct/',
    'Fairfield': '/bathroom-remodeling/fairfield-ct/',
    'Greenwich': '/bathroom-remodeling/greenwich-ct/',
    'Guilford': '/bathroom-remodeling/guilford-ct/',
    'Hamden': '/bathroom-remodeling/hamden-ct/',
    'Madison': '/bathroom-remodeling/madison-ct/',
    'Milford': '/bathroom-remodeling/milford-ct/',
    'New Canaan': '/bathroom-remodeling/new-canaan-ct/',
    'New Haven': '/bathroom-remodeling/new-haven-ct/',
    'Norwalk': '/bathroom-remodeling/norwalk-ct/',
    'Orange': '/bathroom-remodeling/orange-ct/',
    'Ridgefield': '/bathroom-remodeling/ridgefield-ct/',
    'Stamford': '/bathroom-remodeling/stamford-ct/',
    'Westport': '/bathroom-remodeling/westport-ct/',
    'Woodbridge': '/bathroom-remodeling/woodbridge-ct/',
  },
  'flooring': {
    'Branford': '/flooring/branford-ct/',
    'Darien': '/flooring/darien-ct/',
    'Fairfield': '/flooring/fairfield-ct/',
    'Greenwich': '/flooring/greenwich-ct/',
    'Guilford': '/flooring/guilford-ct/',
    'Hamden': '/flooring/hamden-ct/',
    'Madison': '/flooring/madison-ct/',
    'Milford': '/flooring/milford-ct/',
    'New Canaan': '/flooring/new-canaan-ct/',
    'New Haven': '/flooring/new-haven-ct/',
    'Norwalk': '/flooring/norwalk-ct/',
    'Orange': '/flooring/orange-ct/',
    'Ridgefield': '/flooring/ridgefield-ct/',
    'Stamford': '/flooring/stamford-ct/',
    'Westport': '/flooring/westport-ct/',
    'Woodbridge': '/flooring/woodbridge-ct/',
  },
  'kitchen-remodeling': {
    'Branford': '/kitchen-remodeling/branford-ct/',
    'Darien': '/kitchen-remodeling/darien-ct/',
    'Fairfield': '/kitchen-remodeling/fairfield-ct/',
    'Greenwich': '/kitchen-remodeling/greenwich-ct/',
    'Guilford': '/kitchen-remodeling/guilford-ct/',
    'Hamden': '/kitchen-remodeling/hamden-ct/',
    'Madison': '/kitchen-remodeling/madison-ct/',
    'Milford': '/kitchen-remodeling/milford-ct/',
    'New Canaan': '/kitchen-remodeling/new-canaan-ct/',
    'New Haven': '/kitchen-remodeling/new-haven-ct/',
    'Norwalk': '/kitchen-remodeling/norwalk-ct/',
    'Orange': '/kitchen-remodeling/orange-ct/',
    'Ridgefield': '/kitchen-remodeling/ridgefield-ct/',
    'Stamford': '/kitchen-remodeling/stamford-ct/',
    'Westport': '/kitchen-remodeling/westport-ct/',
    'Woodbridge': '/kitchen-remodeling/woodbridge-ct/',
  },
};

/** Look up an existing town page for a service hub. Returns undefined if none exists. */
export function serviceTownUrl(serviceSlug: string, townName: string): string | undefined {
  const table = SERVICE_TOWN_ROUTES[serviceSlug];
  if (!table) return undefined;
  return table[townName.trim()];
}

type UnknownRecord = Record<string, unknown>;

const AREAS_SECTION_TYPES = new Set(['areas_served', 'service_areas']);

function isRecord(v: unknown): v is UnknownRecord {
  return typeof v === 'object' && v !== null && !Array.isArray(v);
}

/**
 * The CMS ships areas-served towns as bare strings, so the areas block renders them as
 * plain text. Every service/town page was therefore left with one inbound internal link
 * (from /areas-we-serve/), and Google declined to crawl them: measured 2026-08-09 across
 * all 103 sitemap URLs, indexed pages carried a median of 25 inbound links and
 * non-indexed pages a median of 1, with 56 never crawled.
 *
 * This upgrades a town string to { name, url } when a page genuinely exists for that
 * service, so the existing renderer emits a real link. Towns with no matching page stay
 * plain strings, so a 404 can never be produced. Applied once before template dispatch
 * so it covers every service template.
 */
export function linkServiceAreaTowns<T extends { slug: string; sections?: unknown }>(page: T): T {
  const service = String(page.slug ?? '').trim().toLowerCase().replace(/^\/+|\/+$/g, '');
  if (!SERVICE_TOWN_ROUTES[service]) return page;
  if (!Array.isArray(page.sections)) return page;

  let touched = false;

  const sections = page.sections.map((sectionRaw) => {
    if (!isRecord(sectionRaw)) return sectionRaw;
    if (!AREAS_SECTION_TYPES.has(String(sectionRaw.type))) return sectionRaw;

    const data = sectionRaw.data;
    if (!isRecord(data) || !Array.isArray(data.counties)) return sectionRaw;

    const counties = data.counties.map((countyRaw) => {
      if (!isRecord(countyRaw)) return countyRaw;
      const key = Array.isArray(countyRaw.towns) ? 'towns' : Array.isArray(countyRaw.cities) ? 'cities' : null;
      if (!key) return countyRaw;

      const towns = (countyRaw[key] as unknown[]).map((town) => {
        if (typeof town !== 'string') return town;
        const url = serviceTownUrl(service, town);
        if (!url) return town;
        touched = true;
        return { name: town, url };
      });

      return { ...countyRaw, [key]: towns };
    });

    return { ...sectionRaw, data: { ...data, counties } };
  });

  return touched ? { ...page, sections } : page;
}

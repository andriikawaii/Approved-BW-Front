// CANARY CONTENT OVERRIDE — TEMPORARY.
//
// /bathroom-remodeling/greenwich-ct is one of only two pages Google crawled and then declined to
// index. 11 of its 17 CMS sections are byte-identical to the Darien page once the town name is
// swapped. This patches the three sections that carry the duplication that matters, to test whether
// differentiation alone flips the page to indexed.
//
// This belongs in the CMS. It lives here only because there is no production CMS write access.
// MOVE IT AND DELETE THIS FILE once the copy is pasted into the backend.
//
// Follows the existing TEMPLATE_OVERRIDES_BY_SLUG pattern in DynamicTemplateRenderer.

type UnknownRecord = Record<string, unknown>;

function isRecord(v: unknown): v is UnknownRecord {
  return typeof v === 'object' && v !== null && !Array.isArray(v);
}

const GREENWICH_BATH = '/bathroom-remodeling/greenwich-ct';

const GREENWICH_LOCAL_CONTEXT: UnknownRecord = {
  eyebrow: 'Building In Greenwich',
  title: 'Three Greenwich Houses, Three Different Bathroom Jobs',
  highlight_text: 'Three Different Bathroom Jobs',
  content:
    'A bathroom is not the same job on both sides of the Merritt Parkway.\n\n' +
    'South of the Post Road, in Old Greenwich, Riverside and Byram, the water is the constraint. ' +
    'Lower-level and first-floor bathrooms near Long Island Sound sit in mapped flood zones, which ' +
    'changes what can be installed below a given elevation and how the space should be detailed. It ' +
    'is worth knowing your flood zone before choosing a vanity, not after.\n\n' +
    'In the older village stock around Greenwich Avenue and Cos Cob, the constraint is what is behind ' +
    'the wall. Plaster and lath, cast iron waste lines and original framing are common, and none of ' +
    'them are visible on a walkthrough. We open a wall and confirm before quoting the finish work, ' +
    'because a bathroom priced off assumptions is a bathroom that gets repriced halfway through.\n\n' +
    'In the backcountry north of the Parkway, the constraint is the site. Properties on private well ' +
    'and septic have to account for added fixture load, and driveways and lot access shape how ' +
    'material and debris move. On a larger house, a primary suite renovation is usually a sequencing ' +
    'problem more than a construction one.\n\n' +
    'We walk the space, confirm what is behind the wall, and put the constraint in the proposal ' +
    'rather than in a change order.',
};

const GREENWICH_TIMELINE: UnknownRecord = {
  title: 'What A Greenwich Bathroom Timeline Really Looks Like',
  subtitle:
    'Three to eight weeks from demolition to walkthrough, with the variables that actually move that number in this town.',
  items: [
    {
      icon: 'file-text',
      title: 'Planning & Design',
      description:
        '1 to 2 weeks. Measurements, selections and a written proposal. If the house sits in one of Greenwich local historic districts, exterior-visible work can need review before anything is ordered.',
    },
    {
      icon: 'clock',
      title: 'Permits & Material Lead Time',
      description:
        '1 to 4 weeks. Bathroom work that moves plumbing or electrical is permitted through the Town of Greenwich Building Division. Vanities, tile, fixtures and glass are ordered in parallel so the two clocks run together.',
    },
    {
      icon: 'hammer',
      title: 'Construction',
      description:
        '2 to 4 weeks. Demo, rough plumbing and electrical, waterproofing, tile, vanity and paint. Older Greenwich houses often mean plaster and lath rather than drywall, and a cast iron waste line that has to be opened up before anyone can price the finish work honestly.',
    },
    {
      icon: 'shield-check',
      title: 'Final Touches',
      description:
        '2 to 3 days. Glass, hardware, accessories, cleanup and walkthrough, then inspection sign-off.',
    },
  ],
};

const GREENWICH_HERO_PATCH: UnknownRecord = {
  subheadline:
    'Licensed Connecticut bathroom remodeler working across Greenwich, from Old Greenwich and Riverside to Cos Cob, Byram and the backcountry. Pre-war plaster, coastal lower levels, and full primary suites.',
};

export function applyContentOverrides<T extends { slug: string; sections?: unknown }>(page: T): T {
  const slug = String(page.slug || '').trim().toLowerCase().replace(/\/+$/, '');
  if (slug !== GREENWICH_BATH) return page;
  if (!Array.isArray(page.sections)) return page;

  const next: unknown[] = [];
  for (const raw of page.sections) {
    if (!isRecord(raw)) {
      next.push(raw);
      continue;
    }
    const type = String(raw.type);
    const data = isRecord(raw.data) ? raw.data : {};

    if (type === 'hero_service_location') {
      next.push({ ...raw, data: { ...data, ...GREENWICH_HERO_PATCH } });
      continue;
    }
    if (type === 'feature_grid') {
      next.push({ ...raw, data: { ...data, ...GREENWICH_TIMELINE } });
      continue;
    }
    next.push(raw);
    // the local-context block earns its place right after the intro
    if (type === 'service_intro_split') {
      next.push({ id: 900001, type: 'rich_text', is_active: true, data: GREENWICH_LOCAL_CONTEXT });
    }
  }

  return { ...page, sections: next };
}

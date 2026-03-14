"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, CalendarDays, Check, ChevronDown, Shield, Star, Upload } from "lucide-react";
import type { CMSPage } from "@/types/cms";

const cls = (...values: Array<string | false | null | undefined>) => values.filter(Boolean).join(" ");
const section = <T,>(page: CMSPage, type: string) => page.sections.find((entry) => entry.is_active && entry.type === type)?.data as T | undefined;
const sections = <T,>(page: CMSPage, type: string) => page.sections.filter((entry) => entry.is_active && entry.type === type).map((entry) => entry.data as T);
const opts = (value?: Array<string | { label: string; value: string }> | null) => (value || []).map((item) => typeof item === "string" ? { label: item, value: item } : item);

const FALLBACK_MEDIA: Record<string, string> = {
  "/portfolio/builtwell-team-client-arrival-ct.jpeg": "/portfolio/builtwell-team-client-arrival-ct.jpeg",
  "/portfolio/builtwell-contractor-sign-consultation-ct-01.jpg": "/portfolio/builtwell-contractor-sign-consultation-ct-01.jpg",
};

const COUNTY_PAGE_COPY: Record<string, {
  heroSubtitle: string;
  overviewTitle: string;
  overviewEyebrow: string;
  overviewParagraphs: string[];
  servicesTitle: string;
  servicesSubtitle: string;
  townsTitle: string;
  townsSubtitle: string;
  featuredTitle: string;
  featuredSubtitle: string;
  leadTitle: string;
  leadSubtitle: string;
}> = {
  "fairfield-county": {
    heroSubtitle: "Full-service home remodeling across Fairfield County, Connecticut. Kitchens, bathrooms, basements, flooring, additions, and more - built right by a licensed CT contractor.",
    overviewTitle: "Full-Service Home Remodeling in Fairfield County",
    overviewEyebrow: "Fairfield County's Remodeling Contractor",
    overviewParagraphs: [
      "Fairfield County is one of the most demanding residential remodeling markets in the Northeast. The housing stock ranges from pre-war colonials and Tudor estates in Greenwich to mid-century moderns in New Canaan, 1960s ranches in Fairfield, and Victorian-era homes in South Norwalk. Each town has its own building department, zoning requirements, and historic district regulations. Working here requires a contractor who understands the specific construction conditions, permitting processes, and material demands of each municipality.",
      "BuiltWell CT provides full-scope home remodeling across Fairfield County - kitchens, bathrooms, basements, flooring, additions, interior carpentry, painting, decks, attic conversions, and accessibility modifications. Every project is managed by our in-house team, not subcontracted out. We hold Connecticut Home Improvement Contractor license #0668405 and carry full liability and workers' compensation insurance.",
      "Whether you are renovating a coastal home in Westport dealing with salt air and FEMA flood zone requirements, or updating a colonial on a wooded lot in Ridgefield with ledge rock and well water, we have the local experience to anticipate site conditions, navigate the permitting process, and deliver work that holds up over time. Call (203) 919-9616 for a free consultation.",
    ],
    servicesTitle: "Remodeling Services in Fairfield County",
    servicesSubtitle: "We provide a full range of residential remodeling services across every town in Fairfield County. Each project is managed by our in-house team from consultation through final walkthrough.",
    townsTitle: "Towns We Serve in Fairfield County",
    townsSubtitle: "We work in every town across Fairfield County. Below are the communities where we complete the most projects.",
    featuredTitle: "Featured Projects in Fairfield County",
    featuredSubtitle: "Recent remodeling work completed across Fairfield County towns.",
    leadTitle: "Ready to Start Your Fairfield County Project?",
    leadSubtitle: "Tell us about your project. We respond within one business day. Call (203) 919-9616 or fill out the form below.",
  },
  "new-haven-county": {
    heroSubtitle: "Full-service home remodeling across New Haven County, Connecticut. Kitchens, bathrooms, basements, flooring, additions, and more - built right by a licensed CT contractor.",
    overviewTitle: "Full-Service Home Remodeling in New Haven County",
    overviewEyebrow: "New Haven County's Remodeling Contractor",
    overviewParagraphs: [
      "New Haven County offers a broad mix of architecture, from 1920s city row homes and brick Victorians in New Haven to 1950s-1970s split-levels and capes in Hamden and Orange. Shoreline homes in Branford, Guilford, and Madison deal with salt air and moisture, while inland homes in Woodbridge and Bethany face site drainage, well water, septic, and ledge rock conditions. Remodeling here requires a contractor who understands the local construction realities and permitting process in each town.",
      "BuiltWell CT provides full-scope home remodeling across New Haven County - kitchens, bathrooms, basements, flooring, additions, interior carpentry, painting, decks, attic conversions, and accessibility modifications. Every project is managed by our in-house team from our Orange, CT office and backed by Connecticut Home Improvement Contractor license #0668405, full liability insurance, and workers' compensation coverage.",
      "Whether you are renovating a beach-adjacent home in Branford dealing with salt air and flood zone requirements, or updating a colonial in Woodbridge with well water and ledge rock site conditions, we have the local experience to anticipate project challenges, navigate building departments, and deliver work that holds up over time.",
    ],
    servicesTitle: "Remodeling Services in New Haven County",
    servicesSubtitle: "We provide a full range of residential remodeling services across every town in New Haven County. Each project is managed by our in-house team from consultation through final walkthrough.",
    townsTitle: "Towns We Serve in New Haven County",
    townsSubtitle: "We work in every town across New Haven County. Below are the communities where we complete the most projects.",
    featuredTitle: "Featured Projects in New Haven County",
    featuredSubtitle: "Recent remodeling work completed across New Haven County towns.",
    leadTitle: "Ready to Start Your New Haven County Project?",
    leadSubtitle: "Tell us about your project. We respond within one business day. Call (203) 466-9148 or fill out the form below.",
  },
};

const COUNTY_SERVICE_OVERRIDES: Record<string, { summary: string; price: string; timeline: string }> = {
  "Kitchen Remodeling": { summary: "Full kitchen renovations including cabinetry, countertops, tile, electrical, plumbing, and permits.", price: "$25K-$150K+", timeline: "6-12 weeks" },
  "Bathroom Remodeling": { summary: "Complete bathroom renovations - tile, vanities, showers, tubs, and plumbing upgrades.", price: "$15K-$120K+", timeline: "3-6 weeks" },
  "Basement Finishing": { summary: "Convert unfinished basements into living space with proper waterproofing and egress.", price: "$25K-$100K+", timeline: "4-8 weeks" },
  Flooring: { summary: "Hardwood, LVP, tile, and engineered wood with expert subfloor preparation.", price: "$4-$25/sq ft", timeline: "2-5 days" },
  "Home Additions": { summary: "Single-story and second-story additions, sunrooms, garage conversions, and bump-outs with full structural and finish work.", price: "$150-$400/sq ft", timeline: "8-16 weeks" },
  "Interior Painting": { summary: "Walls, ceilings, trim, doors, and built-ins. Professional-grade paints with proper surface preparation on every project.", price: "$3-$6/sq ft", timeline: "2-5 days" },
  "Interior Carpentry": { summary: "Custom millwork, built-in cabinetry, wainscoting, crown molding, coffered ceilings, closet systems, and finish trim.", price: "$75-$150/hr", timeline: "Varies" },
  "Attic Conversions": { summary: "Converting unfinished attics into bedrooms, offices, or playrooms - structural assessment through final finish.", price: "$50K-$150K", timeline: "6-12 weeks" },
  "Decks & Porches": { summary: "Pressure-treated lumber, composite, and hardwood. Covered porches, screened-in structures, pergolas, and multi-level decks.", price: "$15K-$75K", timeline: "2-4 weeks" },
  "Design & Planning": { summary: "Space planning, material selection, finish coordination, and project documentation before construction begins.", price: "$2.5K-$15K", timeline: "2-6 weeks" },
  "Comfort & Accessibility": { summary: "Grab bars, roll-in showers, wider doorways, ramp installation, and first-floor adaptations for all ages and abilities.", price: "$5K-$50K", timeline: "1-4 weeks" },
};

const COUNTY_TOWN_OVERRIDES: Record<string, Record<string, { style: string; description: string; linked?: boolean }>> = {
  "fairfield-county": {
    Greenwich: { style: "Colonial, Tudor, French Provincial", description: "Pre-1940 housing stock with strict setbacks and historic district requirements. High-end renovations on large lots with mature landscaping and estate-level finishes.", linked: true },
    Westport: { style: "1940s-1970s Colonials & Ranches", description: "Coastal town with salt air exposure and FEMA flood zone considerations. Many homes are colonials and ranches from the 1940s through 1970s undergoing modern updates.", linked: true },
    Darien: { style: "Colonials on Wooded Lots", description: "Colonial homes on wooded lots with high water tables and ledge rock. Basement waterproofing and foundation work are common project components here." },
    "New Canaan": { style: "Mid-Century Modern & Colonial", description: "A mix of mid-century modern and colonial architecture with a historic commission and strict zoning. Renovations often require additional design review approvals." },
    Stamford: { style: "Urban/Suburban Mix", description: "An urban-suburban mix of condos and single-family homes across diverse ages. Projects range from condo kitchen updates to full single-family renovations." },
    Norwalk: { style: "Victorian-Era & Newer", description: "Victorian-era homes in South Norwalk alongside newer construction. Coastal salt air conditions require careful material selection for long-term durability." },
    Fairfield: { style: "1940s-1970s Colonial Homes", description: "A family-oriented town with colonial homes from the 1940s through 1970s. Proximity to the coast means moisture management is a consistent consideration." },
    Ridgefield: { style: "Colonial & Cape on Large Lots", description: "Rural character with larger lots, rock ledge, and colonial and cape architecture. Well water systems and septic considerations factor into project planning." },
  },
  "new-haven-county": {
    Orange: { style: "1960s-1980s Colonials & Ranches", description: "Our home base. Orange has well-maintained colonials and ranches from the 1960s through 1980s on generous lots. Many homeowners here are updating kitchens and bathrooms that haven't been touched in decades.", linked: true },
    "New Haven": { style: "Victorian, Colonial & Multi-Family", description: "A mix of Victorian-era homes, colonials, and multi-family properties. Older construction often involves plaster walls, balloon framing, and outdated electrical that require experienced handling.", linked: true },
    Hamden: { style: "1950s-1970s Split-Levels & Capes", description: "Split-levels, capes, and colonials from the 1950s through 1970s. Basement finishing and whole-home renovations are common as families modernize these well-built mid-century homes." },
    Branford: { style: "Coastal Colonials & Capes", description: "A coastal town with salt air exposure and FEMA flood zone considerations in shoreline neighborhoods. Material selection for moisture resistance is a key factor in every project here." },
    Guilford: { style: "Historic & Coastal", description: "One of the oldest towns in Connecticut with a significant historic district. Renovations here often require design review approval and careful attention to period-appropriate details." },
    Madison: { style: "Coastal & Suburban", description: "Shoreline town with a mix of beach cottages and larger suburban homes. Elevated humidity and salt air require careful material choices for kitchens, bathrooms, and exterior work.", linked: true },
    Woodbridge: { style: "Colonials on Wooded Lots", description: "Rural character with larger lots, well water systems, and septic considerations. Colonials and contemporaries on wooded lots where site access and ledge rock factor into project planning." },
    Milford: { style: "Mixed Suburban & Coastal", description: "A diverse housing stock from beach cottages to newer subdivisions. Coastal areas deal with moisture management while inland neighborhoods feature 1960s-1980s colonials and ranches." },
  },
};

const COUNTY_FEATURED_OVERRIDES: Record<string, Array<{ title: string; body: string; quote: string; cite: string }>> = {
  "fairfield-county": [
    { title: "Basement Finishing in Darien", body: "A Darien homeowner needed a finished basement with a home office, guest suite, and full bathroom. The site had a high water table - we installed an interior drainage system and sump pump before framing, then built out 1,200 square feet of finished living space with LVP flooring and recessed lighting.", quote: "\"The basement is the most-used room in the house now. We use the office every day.\"", cite: "The Andersons, Darien" },
    { title: "Bathroom Remodeling in Westport", body: "A Westport couple wanted to update two bathrooms in their 1960s colonial. We replaced dated tile with large-format porcelain, installed a frameless glass shower enclosure, upgraded the plumbing to PEX, and added radiant floor heating throughout both bathrooms.", quote: "\"The heated floors were the best decision we made. BuiltWell guided us through every choice.\"", cite: "The Brennans, Westport" },
    { title: "Kitchen Remodeling in New Canaan", body: "A New Canaan family wanted to open up a kitchen closed off by a load-bearing wall. We engineered a beam solution, installed white shaker cabinets with a quartz island, and extended hardwood flooring into the new open layout.", quote: "\"BuiltWell made it straightforward. Now we can't imagine how we lived before.\"", cite: "The Chens, New Canaan" },
  ],
  "new-haven-county": [
    { title: "Whole-Home Renovation in Hamden", body: "A Hamden family purchased a 1960s split-level and wanted to modernize the entire home. We renovated the kitchen with new cabinetry and quartz countertops, updated both bathrooms, refinished hardwood floors throughout, and finished the basement as a family room with an egress window.", quote: "\"BuiltWell transformed this house into exactly what we envisioned. The basement alone was worth it.\"", cite: "The Patels, Hamden" },
    { title: "Kitchen Remodeling in Milford", body: "A Milford homeowner needed to replace dated 1990s oak cabinets and laminate countertops. We removed the peninsula, installed soft-close cabinetry with quartz countertops and subway tile, and extended LVP flooring into the dining room.", quote: "\"They showed up when they said they would, cleaned up every day, and the kitchen turned out better than I imagined.\"", cite: "Ivana P., Milford" },
    { title: "Bathroom Remodeling in Branford", body: "A Branford homeowner in a 1970s coastal colonial needed both bathrooms updated. Salt air exposure had damaged the existing tile grout and fixtures. We installed porcelain tile with Schluter waterproofing, new vanities, low-profile shower pans, and updated all plumbing to PEX throughout both spaces.", quote: "\"We had put this off for years. BuiltWell handled everything and the result is exactly what we needed.\"", cite: "The Garcias, Branford" },
  ],
};

function media(value?: string | null, fallback = "") {
  const source = value || "";
  if (!source) return fallback;
  try {
    const normalized = source.startsWith("http") ? new URL(source).pathname : source;
    return FALLBACK_MEDIA[source] || FALLBACK_MEDIA[normalized] || normalized || fallback;
  } catch {
    return FALLBACK_MEDIA[source] || source || fallback;
  }
}

function parts(text?: string | null, mark?: string | null) {
  const source = (text || "").trim();
  const accent = (mark || "").trim();
  if (!accent || !source.includes(accent)) return { before: source, accent: "", after: "" };
  const index = source.indexOf(accent);
  return { before: source.slice(0, index), accent, after: source.slice(index + accent.length) };
}

function label(text: React.ReactNode, dark = false) {
  return (
    <span className={cls("mb-4 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em]", dark ? "text-[#c89b5b]" : "text-[#bc9155]")}>
      <span className={cls("h-px w-7", dark ? "bg-[#c89b5b]" : "bg-[#bc9155]")} />
      {text}
    </span>
  );
}

function linkNode(href: string, children: React.ReactNode, className?: string) {
  return /^https?:\/\//i.test(href) || href.startsWith("tel:") ? (
    <a href={href} className={className} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noreferrer" : undefined}>
      {children}
    </a>
  ) : (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

function trustIcon(icon?: string | null) {
  switch ((icon || "").toLowerCase()) {
    case "star":
      return <Star className="h-5 w-5" />;
    case "shield":
      return <Shield className="h-5 w-5" />;
    case "calendar":
    case "clock":
      return <CalendarDays className="h-5 w-5" />;
    default:
      return <Check className="h-5 w-5" />;
  }
}

export function CountyHubPageTemplate({ page }: { page: CMSPage }) {
  const slug = page.slug.replace(/^\/+|\/+$/g, "");
  const hero = section<any>(page, "hero");
  const rich = sections<any>(page, "rich_text");
  const trustBars = sections<any>(page, "trust_bar");
  const services = section<any>(page, "services_grid");
  const towns = section<any>(page, "town_list");
  const lead = section<any>(page, "lead_form");
  const countyCopy = COUNTY_PAGE_COPY[slug] || COUNTY_PAGE_COPY["fairfield-county"];
  const townOverrides = COUNTY_TOWN_OVERRIDES[slug] || {};
  const featuredOverrides = COUNTY_FEATURED_OVERRIDES[slug] || [];
  const financing = rich.find((item) => item.style_variant === "financing_strip");
  const heroTrust = trustBars[0];
  const stripTrust = trustBars[1];
  const [showAllServices, setShowAllServices] = useState(false);
  const [pickedServices, setPickedServices] = useState<string[]>([]);
  const [serviceOpen, setServiceOpen] = useState(false);
  const [fileNames, setFileNames] = useState<string[]>([]);
  const [formValues, setFormValues] = useState<Record<string, string>>({ contact_method: "call" });
  const [submitted, setSubmitted] = useState(false);

  const countyName = slug === "fairfield-county" ? "Fairfield County" : "New Haven County";
  const heroParts = parts(hero?.headline, countyName);
  const overviewParts = parts(countyCopy.overviewTitle, countyName);
  const servicesParts = parts(countyCopy.servicesTitle, countyName);
  const townsParts = parts(countyCopy.townsTitle, countyName);
  const featuredParts = parts(countyCopy.featuredTitle, countyName);
  const leadParts = parts(countyCopy.leadTitle, countyName);
  const visibleCount = services?.initial_visible_count || 6;
  const serviceCards = (services?.items || []).map((item: any) => ({ ...item, ...(COUNTY_SERVICE_OVERRIDES[item.title] || {}) }));
  const visibleServices = showAllServices ? serviceCards : serviceCards.slice(0, visibleCount);
  const fields = lead?.fields || [];
  const topFields = fields.filter((field: any) => !["checkbox_group", "radio_group", "textarea", "file"].includes(field.type));
  const servicesField = fields.find((field: any) => field.type === "checkbox_group");
  const timeField = fields.find((field: any) => field.name === "best_time" || field.type === "select");
  const contactField = fields.find((field: any) => field.type === "radio_group");
  const messageField = fields.find((field: any) => field.type === "textarea");

  return (
    <div className="bg-[#f5f1e9] text-[#1e2b43]">
      <section className="relative isolate overflow-hidden bg-[#151e30] px-5 pb-0 pt-[84px] text-white md:px-10">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${media(hero?.background_image, slug === "fairfield-county" ? "/images/areas/fairfield-county.jpg" : "/images/areas/new-haven-county.jpg")})` }} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_38%),linear-gradient(180deg,rgba(21,30,48,0.28)_0%,rgba(21,30,48,0.16)_24%,rgba(21,30,48,0.54)_70%,rgba(21,30,48,0.92)_100%)]" />
        <div className="relative z-10 mx-auto flex min-h-[460px] max-w-[1240px] flex-col items-center justify-center pb-12 text-center">
          <ol className="mb-4 flex list-none items-center text-[12px] font-semibold text-white/92">
            <li>{linkNode("/", "Home", "transition-colors hover:text-[#bc9155]")}</li>
            <li className="before:px-2.5 before:text-[#bc9155] before:content-['›']">{linkNode("/areas-we-serve/", "Areas We Serve", "transition-colors hover:text-[#bc9155]")}</li>
            <li className="before:px-2.5 before:text-[#bc9155] before:content-['›']"><span>{countyName}</span></li>
          </ol>
          <h1 className="max-w-[860px] text-[clamp(40px,4.6vw,60px)] font-bold leading-[1.04] tracking-[-0.03em] text-white">
            {heroParts.before}
            {heroParts.accent ? <span className="text-[#bc9155]">{heroParts.accent}</span> : null}
            {heroParts.after}
          </h1>
          <p className="mt-5 max-w-[700px] text-[14px] leading-[1.7] text-white/92 md:text-[15px]">{countyCopy.heroSubtitle}</p>
          <div className="mt-8 flex flex-wrap items-stretch justify-center gap-4">
            {(hero?.badges || []).map((badge: any, index: number) => {
              const isPrimary = !!badge.is_primary;
              return (
                <div key={`${badge.label || "badge"}-${index}`}>
                  {linkNode(
                    badge.url || "#",
                    <div className={cls("min-w-[184px] rounded-[6px] border px-6 py-4 text-left shadow-[0_12px_32px_rgba(0,0,0,0.16)] transition-all hover:-translate-y-0.5", isPrimary ? "border-[#bc9155] bg-[#bc9155] text-white" : "border-white/10 bg-[rgba(39,49,72,0.82)] text-white")}>
                      <div className={cls("text-[11px] font-semibold uppercase tracking-[0.16em]", isPrimary ? "text-white/84" : "text-white/68")}>{badge.label}</div>
                      {badge.value ? <div className="mt-1.5 text-[17px] font-bold">{badge.value}</div> : null}
                    </div>,
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <div className="bg-[#1e2b43]">
        <div className="mx-auto grid max-w-[1440px] grid-cols-2 border-y border-[#bc91551f] md:grid-cols-4">
          {(heroTrust?.items || []).map((item: any, index: number) => (
            <div key={`${item.label || "trust"}-${index}`} className="flex min-h-[76px] flex-col items-center justify-center border-r border-[#bc91551f] px-4 py-3 text-center last:border-r-0 md:min-h-[78px]">
              {index < 3 && item.value ? <div className="font-serif text-[26px] font-bold leading-none text-[#bc9155] md:text-[28px]">{item.value}</div> : <div className="text-[#bc9155]">{trustIcon(item.icon)}</div>}
              <div className="mt-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/78 md:text-[11px]">{item.label}</div>
            </div>
          ))}
        </div>
      </div>

      <section className="bg-white px-5 py-20 md:px-10">
        <div className="mx-auto max-w-[760px] text-center">
          {label(countyCopy.overviewEyebrow)}
          <h2 className="text-[clamp(36px,3.8vw,50px)] font-bold leading-[1.08] tracking-[-0.03em]">
            {overviewParts.before}
            {overviewParts.accent ? <span className="text-[#bc9155]">{overviewParts.accent}</span> : null}
            {overviewParts.after}
          </h2>
          <div className="mx-auto mt-6 max-w-[690px] space-y-5 text-left text-[14px] leading-[1.75] text-[#5c677d] md:text-[15px]">
            {countyCopy.overviewParagraphs.map((paragraph, index) => (
              <p key={`overview-${index}`}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f5f1e9] px-5 py-20 md:px-10">
        <div className="mx-auto max-w-[1240px]">
          <div className="mb-12 text-center">
            {label("Our Services")}
            <h2 className="text-[clamp(34px,3.8vw,48px)] font-bold leading-[1.08] tracking-[-0.03em]">
              {servicesParts.before}
              {servicesParts.accent ? <span className="text-[#bc9155]">{servicesParts.accent}</span> : null}
              {servicesParts.after}
            </h2>
            <p className="mx-auto mt-3 max-w-[760px] text-[14px] leading-[1.8] text-[#5c677d] md:text-[15px]">{countyCopy.servicesSubtitle}</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {visibleServices.map((item: any, index: number) => (
              <article key={`${item.title || "service"}-${index}`} className="overflow-hidden rounded-[10px] border border-[#e6dccd] bg-white shadow-[0_16px_34px_rgba(30,43,67,0.06)]">
                <div className="h-[228px] overflow-hidden">
                  <img src={media(item.image, "/services/kitchen-remodeling-ct.jpg")} alt={item.title} className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" />
                </div>
                <div className="p-5">
                  <h3 className="text-[19px] font-bold leading-[1.22]">{item.title}</h3>
                  <p className="mt-3 text-[13px] leading-[1.72] text-[#5c677d]">{item.summary}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {item.price ? <span className="rounded-full bg-[#bc915512] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#bc9155]">{item.price}</span> : null}
                    {item.timeline ? <span className="rounded-full bg-[#f5f1e9] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#1e2b43]">{item.timeline}</span> : null}
                  </div>
                  {item.url ? linkNode(item.url, <><span>{item.cta_label || "Learn More"}</span><ArrowRight className="h-4 w-4" /></>, "mt-5 inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.12em] text-[#bc9155] transition-all hover:gap-3") : null}
                </div>
              </article>
            ))}
            {showAllServices && services?.cta_card ? (
              <article className="flex flex-col justify-between rounded-[10px] border border-[#bc915544] bg-[#1e2b43] p-7 text-white shadow-[0_18px_40px_rgba(30,43,67,0.18)]">
                <div>
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#bc9155] text-white">
                    <ArrowRight className="h-5 w-5" />
                  </div>
                  <h3 className="text-[24px] font-bold">{services.cta_card.title}</h3>
                  <p className="mt-3 text-[15px] leading-[1.8] text-white/75">{services.cta_card.body}</p>
                </div>
                <div className="mt-6">
                  {services.cta_card.url ? linkNode(services.cta_card.url, services.cta_card.label || "Learn More", "inline-flex rounded-[8px] bg-[#bc9155] px-5 py-3 text-[14px] font-semibold text-white transition-colors hover:bg-[#a57d48]") : null}
                  {services.cta_card.subtext ? <p className="mt-3 text-[13px] text-white/55">{services.cta_card.subtext}</p> : null}
                </div>
              </article>
            ) : null}
          </div>
          {serviceCards.length > visibleCount ? (
            <div className="mt-8 text-center">
              <button type="button" onClick={() => setShowAllServices((current) => !current)} className="inline-flex items-center gap-2 rounded-[6px] border border-[#bc9155] px-5 py-3 text-[12px] font-semibold uppercase tracking-[0.14em] text-[#bc9155] transition-colors hover:bg-[#bc9155] hover:text-white">
                <span>{showAllServices ? "Show Fewer Services" : `Show ${Math.max(serviceCards.length - visibleCount, 0)} More Services`}</span>
                <ChevronDown className={cls("h-4 w-4 transition-transform", showAllServices && "rotate-180")} />
              </button>
            </div>
          ) : null}
        </div>
      </section>

      <section className="bg-[#f5f1e9] px-5 py-20 md:px-10">
        <div className="mx-auto max-w-[1240px]">
          <div className="mb-12 text-center">
            {label("Where We Work")}
            <h2 className="text-[clamp(34px,3.8vw,48px)] font-bold leading-[1.08] tracking-[-0.03em]">
              {townsParts.before}
              {townsParts.accent ? <span className="text-[#bc9155]">{townsParts.accent}</span> : null}
              {townsParts.after}
            </h2>
            <p className="mx-auto mt-3 max-w-[720px] text-[14px] leading-[1.8] text-[#5c677d] md:text-[15px]">{countyCopy.townsSubtitle}</p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {(towns?.tier1 || []).map((town: any, index: number) => {
              const override = townOverrides[town.label] || { style: "", description: town.description || "" };
              const content = (
                <div className={cls("h-full rounded-[10px] border border-[#e6dccd] bg-white p-6 shadow-[0_14px_28px_rgba(30,43,67,0.05)] transition-all", override.linked && "hover:-translate-y-0.5 hover:border-[#bc9155]")}>
                  <h3 className="text-[19px] font-bold">{town.label}</h3>
                  {override.style ? <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#bc9155]">{override.style}</p> : null}
                  <p className="mt-3 text-[13px] leading-[1.72] text-[#5c677d]">{override.description}</p>
                  {override.linked ? <span className="mt-4 inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#bc9155]">View Town <ArrowRight className="h-3.5 w-3.5" /></span> : null}
                </div>
              );

              return override.linked && town.url ? (
                <Link key={`${town.label || "town"}-${index}`} href={town.url}>
                  {content}
                </Link>
              ) : (
                <div key={`${town.label || "town"}-${index}`}>{content}</div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#f5f1e9] px-5 py-20 md:px-10">
        <div className="mx-auto max-w-[1240px]">
          <div className="mb-12 text-center">
            {label("Recent Work")}
            <h2 className="text-[clamp(34px,3.8vw,48px)] font-bold leading-[1.08] tracking-[-0.03em]">
              {featuredParts.before}
              {featuredParts.accent ? <span className="text-[#bc9155]">{featuredParts.accent}</span> : null}
              {featuredParts.after}
            </h2>
            <p className="mx-auto mt-3 max-w-[760px] text-[14px] leading-[1.8] text-[#5c677d] md:text-[15px]">{countyCopy.featuredSubtitle}</p>
          </div>
          <div className="grid gap-7 lg:grid-cols-3">
            {featuredOverrides.map((item, index) => (
              <article key={`${item.title}-${index}`} className="rounded-[10px] border border-[#e6dccd] bg-white shadow-[0_16px_36px_rgba(30,43,67,0.06)]">
                <div className="p-6">
                  <h3 className="text-[20px] font-bold leading-[1.22]">{item.title}</h3>
                  <p className="mt-3 text-[13px] leading-[1.72] text-[#5c677d]">{item.body}</p>
                </div>
                <div className="border-t border-[#efe6d8] px-6 py-5">
                  <p className="text-[13px] italic leading-[1.72] text-[#5c677d]">{item.quote}</p>
                  <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#bc9155]">{item.cite}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <div className="relative overflow-hidden bg-[linear-gradient(135deg,#1a2438_0%,#1e2b43_50%,#151e30_100%)] px-5 py-12 md:px-10 md:py-14">
        <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-center">
          {(stripTrust?.items || []).map((item: any, index: number) => (
            <div key={`${item.label || "strip"}-${index}`} className="contents">
              {item.url ? linkNode(item.url, <div className="flex min-w-[180px] flex-1 flex-col items-center gap-3 px-8 py-5 text-center text-[13px] font-semibold tracking-[0.03em] text-white/90 transition-all hover:text-[#bc9155]"><span className="text-[#bc9155]">{trustIcon(item.icon)}</span><span>{[item.label, item.value].filter(Boolean).join(" ")}</span></div>, "flex flex-1 justify-center") : <div className="flex flex-1 justify-center"><div className="flex min-w-[180px] flex-1 flex-col items-center gap-3 px-8 py-5 text-center text-[13px] font-semibold tracking-[0.03em] text-white/90"><span className="text-[#bc9155]">{trustIcon(item.icon)}</span><span>{[item.label, item.value].filter(Boolean).join(" ")}</span></div></div>}
              {index < (stripTrust?.items || []).length - 1 ? <div className="hidden h-10 w-px bg-white/10 lg:block" /> : null}
            </div>
          ))}
        </div>
      </div>

      <section className="bg-[#f5f1e9] px-5 py-20 md:px-10" id="contact">
        <div className="mx-auto max-w-[1200px]">
          <div className="mb-8 text-center">
            {label("Get In Touch")}
            <h2 className="text-[clamp(34px,3.8vw,48px)] font-bold tracking-[-0.02em]">{leadParts.before}{leadParts.accent ? <span className="text-[#bc9155]">{leadParts.accent}</span> : null}{leadParts.after}</h2>
            <p className="mx-auto mt-3 max-w-[620px] text-[15px] leading-[1.8] text-[#5c677d]">{countyCopy.leadSubtitle}</p>
          </div>
          <div className="grid gap-8 lg:grid-cols-[1fr_1.08fr]">
            <div className="grid gap-3">
              {(lead?.images || []).slice(0, 2).map((image: any, index: number) => (
                <div key={`${image.alt || "lead"}-${index}`} className="overflow-hidden rounded-[10px] shadow-[0_16px_38px_rgba(30,43,67,0.1)]">
                  <img src={media(image.image, index === 0 ? "/portfolio/builtwell-team-client-arrival-ct.jpeg" : "/portfolio/builtwell-contractor-sign-consultation-ct-01.jpg")} alt={image.alt || "BuiltWell CT consultation"} className="h-[270px] w-full object-cover" />
                </div>
              ))}
            </div>
            <div className="rounded-[12px] border border-[#e4dac9] bg-white px-6 py-8 shadow-[0_20px_46px_rgba(30,43,67,0.1)] md:px-8">
              {submitted ? (
                <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
                  <h3 className="text-[34px] font-bold">Thank You</h3>
                  <p className="mt-3 max-w-[420px] text-[15px] leading-7 text-[#5c677d]">We received your request and will get back to you within one business day.</p>
                </div>
              ) : (
                <form onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }} className="flex flex-col">
                  <div className="grid gap-4 md:grid-cols-2">
                    {topFields.map((field: any) => (
                      <div key={field.name}>
                        <label className="mb-1.5 block text-[13px] font-semibold uppercase tracking-[0.04em] text-[#1e2b43]">{field.label}{field.required ? " *" : ""}</label>
                        <input type={field.type} required={field.required} value={formValues[field.name] || ""} placeholder={field.placeholder || ""} onChange={(event) => setFormValues((current) => ({ ...current, [field.name]: event.target.value }))} className="w-full rounded-[6px] border border-[#1e2b4326] px-3.5 py-3 text-[15px] text-[#1e2b43] outline-none transition-colors focus:border-[#bc9155]" />
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 grid gap-4 md:grid-cols-2">
                    {servicesField ? <div className="md:col-span-2 lg:col-span-1"><label className="mb-1.5 block text-[13px] font-semibold uppercase tracking-[0.04em] text-[#1e2b43]">{servicesField.label}{servicesField.required ? " *" : ""}</label><div className="relative"><button type="button" onClick={() => setServiceOpen((current) => !current)} className="flex w-full items-center justify-between rounded-[4px] border border-[#1e2b4326] px-3.5 py-3 text-left text-[15px] text-[#1e2b43]"><span className={cls("truncate", pickedServices.length ? "font-medium text-[#1e2b43]" : "text-[#5c677d]")}>{pickedServices.length ? pickedServices.join(", ") : "Select services"}</span><ChevronDown className={cls("h-4 w-4 transition-transform", serviceOpen && "rotate-180")} /></button><div className={cls("absolute left-0 right-0 top-[calc(100%+4px)] z-20 max-h-60 overflow-y-auto rounded-[6px] border border-[#1e2b4326] bg-white py-1 shadow-[0_8px_24px_rgba(0,0,0,0.12)]", serviceOpen ? "block" : "hidden")}>{opts(servicesField.options).map((option) => <label key={option.value} className="flex cursor-pointer items-center gap-2.5 px-3.5 py-2 text-[14px] text-[#1e2b43] transition-colors hover:bg-[#bc91550f]"><input type="checkbox" checked={pickedServices.includes(option.value)} onChange={() => setPickedServices((current) => current.includes(option.value) ? current.filter((value) => value !== option.value) : [...current, option.value])} className="h-[18px] w-[18px] rounded-[3px] accent-[#bc9155]" />{option.label}</label>)}</div></div></div> : null}
                    {timeField ? <div><label className="mb-1.5 block text-[13px] font-semibold uppercase tracking-[0.04em] text-[#1e2b43]">{timeField.label}{timeField.required ? " *" : ""}</label><select required={timeField.required} value={formValues[timeField.name] || ""} onChange={(event) => setFormValues((current) => ({ ...current, [timeField.name]: event.target.value }))} className="w-full rounded-[6px] border border-[#1e2b4326] bg-white px-3.5 py-3 text-[15px] text-[#1e2b43] outline-none transition-colors focus:border-[#bc9155]"><option value="">Select a time</option>{opts(timeField.options).map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select></div> : null}
                    {contactField ? <fieldset className="md:col-span-2"><legend className="mb-1.5 block text-[13px] font-semibold uppercase tracking-[0.04em] text-[#1e2b43]">{contactField.label}{contactField.required ? " *" : ""}</legend><div className="flex flex-wrap gap-2.5 md:flex-nowrap">{opts(contactField.options).map((option) => { const checked = (formValues[contactField.name] || "call") === option.value; return <label key={option.value} className={cls("flex flex-1 cursor-pointer items-center justify-center rounded-[6px] border-2 px-4 py-3 text-[13px] font-medium transition-colors", checked ? "border-[#bc9155] bg-[#bc91550f] text-[#bc9155]" : "border-[#1e2b431f] bg-white text-[#1e2b43]")}><input type="radio" name={contactField.name} checked={checked} onChange={() => setFormValues((current) => ({ ...current, [contactField.name]: option.value }))} className="hidden" /><span>{option.label}</span></label>; })}</div></fieldset> : null}
                  </div>
                  {messageField ? <div className="mt-4"><label className="mb-1.5 block text-[13px] font-semibold uppercase tracking-[0.04em] text-[#1e2b43]">{messageField.label}</label><textarea rows={6} value={formValues[messageField.name] || ""} placeholder={messageField.placeholder || ""} onChange={(event) => setFormValues((current) => ({ ...current, [messageField.name]: event.target.value }))} className="min-h-[180px] w-full rounded-[6px] border border-[#1e2b4326] px-3.5 py-3 text-[15px] leading-[1.6] text-[#1e2b43] outline-none transition-colors focus:border-[#bc9155]" /></div> : null}
                  <div className="mt-6 grid gap-4 md:grid-cols-2">
                    <div><label className="flex min-h-[52px] cursor-pointer items-center justify-center gap-2 rounded-[8px] border border-[#1e2b4326] px-5 py-3 text-[15px] font-semibold text-[#1e2b43] transition-colors hover:border-[#bc9155]" htmlFor={`${page.slug}-lead-files`}><Upload className="h-4 w-4" />Upload Photos</label><input id={`${page.slug}-lead-files`} type="file" multiple accept="image/jpeg,image/png,image/heic,.heic" className="hidden" onChange={(event) => setFileNames(Array.from(event.target.files || []).map((file) => file.name))} />{fileNames.length ? <p className="mt-2 text-[12px] text-[#5c677d]">{fileNames.join(", ")}</p> : null}</div>
                    <button type="submit" className="min-h-[52px] rounded-[8px] bg-[#bc9155] px-5 py-3 text-[15px] font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-[#a57d48]">{lead?.submit_label || "Send Request"}</button>
                  </div>
                  <p className="mt-4 text-center text-[13px] italic text-[#5c677d]">{lead?.consent_text}</p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {financing ? <div className="border-t border-[#1e2b4314] bg-white px-5 py-12 md:px-10 md:py-14"><div className="mx-auto flex max-w-[1200px] flex-col items-center gap-6 text-center md:flex-row md:justify-between md:text-left"><div className="flex flex-col items-center gap-4 md:flex-row"><div className="text-[24px] font-bold tracking-[-0.02em]"><span className="text-[#6bbf4e]">Green</span><span className="text-[#1e2b43]">Sky</span></div><p className="max-w-[760px] text-[16px] leading-[1.6] text-[#5c677d]"><strong className="text-[#1e2b43]">{financing.title}.</strong> {financing.content}</p></div>{financing.cta?.url ? linkNode(financing.cta.url, <><span>{financing.cta.label || "Check Financing Options"}</span><ArrowRight className="h-4 w-4" /></>, "inline-flex min-h-[52px] min-w-[280px] items-center justify-center gap-2 rounded-[8px] bg-[#bc9155] px-8 py-3 text-[15px] font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-[#a57d48]") : null}</div></div> : null}
    </div>
  );
}

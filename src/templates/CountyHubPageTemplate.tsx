"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, CalendarDays, Check, ChevronDown, Shield, Upload } from "lucide-react";
import type { CMSPage } from "@/types/cms";
import { FinancingStrip as SharedFinancingStrip, LeadFormSection as SharedLeadFormSection } from "./template-utils";

function FadeUp({ delay = 0, children, className = "" }: { delay?: number; children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setVisible(true); return; }
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } }, { threshold: 0.15 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} className={className} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(24px)", transition: `opacity 0.7s cubic-bezier(0.4,0,0.2,1) ${delay}ms, transform 0.7s cubic-bezier(0.4,0,0.2,1) ${delay}ms` }}>
      {children}
    </div>
  );
}

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
  overviewParagraphsBefore: string[];
  overviewPhoneHref: string;
  overviewPhoneLabel: string;
  overviewPhoneTrailing: string;
  midCtaTitle: string;
  midCtaAccent: string;
  midCtaBody: string;
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
    heroSubtitle: "From Greenwich estates to Stamford condos — renovation that matches the standard.",
    overviewTitle: "Full-Service Home Remodeling in Fairfield County",
    overviewEyebrow: "Fairfield County's Remodeling Contractor",
    overviewParagraphsBefore: [
      "Fairfield County is one of the most demanding residential remodeling markets in the Northeast. The housing stock ranges from pre-war colonials and Tudor estates in Greenwich to mid-century moderns in New Canaan, 1960s ranches in Fairfield, and Victorian-era homes in South Norwalk. Each town has its own building department, zoning requirements, and historic district regulations. Working here requires a contractor who understands the specific construction conditions, permitting processes, and material demands of each municipality.",
      "BuiltWell CT provides full-scope home remodeling across Fairfield County — kitchens, bathrooms, basements, flooring, additions, interior carpentry, painting, decks, attic conversions, and accessibility modifications. Every project is managed by our in-house team, not subcontracted out. We hold Connecticut Home Improvement Contractor license #0668405 and carry full liability and workers' compensation insurance.",
      "Whether you are renovating a coastal home in Westport dealing with salt air and FEMA flood zone requirements, or updating a colonial on a wooded lot in Ridgefield with ledge rock and well water, we have the local experience to anticipate site conditions, navigate the permitting process, and deliver work that holds up over time. Call ",
    ],
    overviewPhoneHref: "tel:2039199616",
    overviewPhoneLabel: "(203) 919-9616",
    overviewPhoneTrailing: " for a free consultation.",
    midCtaTitle: "Remodeling in",
    midCtaAccent: "Fairfield County",
    midCtaBody: "From Greenwich estates to Ridgefield colonials — we know the homes, the codes, and the craftsmanship your neighborhood expects.",
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
    heroSubtitle: "From the shoreline to the suburbs — built by the team next door.",
    overviewTitle: "Full-Service Home Remodeling in New Haven County",
    overviewEyebrow: "New Haven County's Remodeling Contractor",
    overviewParagraphsBefore: [
      "New Haven County's housing stock spans a wide range, from 1950s through 1980s colonials and split-levels in Hamden and Orange, Victorian-era homes in downtown New Haven, coastal cottages and capes in Branford and Guilford, and newer construction throughout Milford and Woodbridge. Each town has its own building department, zoning requirements, and permitting process. Working here requires a contractor who understands the specific construction conditions and regulatory landscape of each municipality.",
      "BuiltWell CT provides full-scope home remodeling across New Haven County, including kitchens, bathrooms, basements, flooring, additions, interior carpentry, painting, decks, attic conversions, and accessibility modifications. Every project is managed by our in-house team from our Orange, CT office, not subcontracted out. We hold Connecticut Home Improvement Contractor license #0668405 and carry full liability and workers' compensation insurance.",
      "Whether you are renovating a coastal home in Madison dealing with salt air and elevated humidity, or updating a colonial in Woodbridge with well water and ledge rock, we have the local experience to anticipate site conditions, navigate the permitting process, and deliver work that holds up over time. Call ",
    ],
    overviewPhoneHref: "tel:2034669148",
    overviewPhoneLabel: "(203) 466-9148",
    overviewPhoneTrailing: " for a free consultation.",
    midCtaTitle: "Remodeling in",
    midCtaAccent: "New Haven County",
    midCtaBody: "From our Orange headquarters, we serve every town in New Haven County with crews who know the housing stock and building departments.",
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

const COUNTY_SERVICE_OVERRIDES: Record<string, Record<string, { summary: string; price: string; timeline: string }>> = {
  "fairfield-county": {
    "Kitchen Remodeling": { summary: "Full kitchen renovations including cabinetry, countertops, tile, electrical, plumbing, and permits.", price: "$25K-$150K+", timeline: "6-12 weeks" },
    "Bathroom Remodeling": { summary: "Complete bathroom renovations — tile, vanities, showers, tubs, and plumbing upgrades.", price: "$15K-$120K+", timeline: "3-6 weeks" },
    "Basement Finishing": { summary: "Convert unfinished basements into living space with proper waterproofing and egress.", price: "$25K-$100K+", timeline: "4-8 weeks" },
    Flooring: { summary: "Hardwood, LVP, tile, and engineered wood with expert subfloor preparation.", price: "$4-$25/sq ft", timeline: "2-5 days" },
    "Home Additions": { summary: "Single-story and second-story additions, sunrooms, garage conversions, and bump-outs with full structural and finish work.", price: "$150-$400/sq ft", timeline: "8-16 weeks" },
    "Interior Painting": { summary: "Walls, ceilings, trim, doors, and built-ins. Professional-grade paints with proper surface preparation on every project.", price: "$3-$6/sq ft", timeline: "2-5 days" },
    "Interior Carpentry": { summary: "Custom millwork, built-in cabinetry, wainscoting, crown molding, coffered ceilings, closet systems, and finish trim.", price: "$75-$150/hr", timeline: "Varies" },
    "Attic Conversions": { summary: "Converting unfinished attics into bedrooms, offices, or playrooms — structural assessment through final finish.", price: "$50K-$150K", timeline: "6-12 weeks" },
    "Decks & Porches": { summary: "Pressure-treated lumber, composite, and hardwood. Covered porches, screened-in structures, pergolas, and multi-level decks.", price: "$15K-$75K", timeline: "2-4 weeks" },
    "Design & Planning": { summary: "Space planning, material selection, finish coordination, and project documentation before construction begins.", price: "$2.5K-$15K", timeline: "2-6 weeks" },
    "Comfort & Accessibility": { summary: "Grab bars, roll-in showers, wider doorways, ramp installation, and first-floor adaptations for all ages and abilities.", price: "$5K-$50K", timeline: "1-4 weeks" },
  },
  "new-haven-county": {
    "Kitchen Remodeling": { summary: "Full kitchen renovations including cabinetry, countertops, tile, electrical, plumbing, and permits.", price: "$25K-$150K+", timeline: "6-12 weeks" },
    "Bathroom Remodeling": { summary: "Complete bathroom renovations including tile, vanities, showers, tubs, and plumbing upgrades.", price: "$15K-$120K+", timeline: "3-6 weeks" },
    "Basement Finishing": { summary: "Convert unfinished basements into living space with proper waterproofing and egress.", price: "$25K-$100K+", timeline: "4-8 weeks" },
    Flooring: { summary: "Hardwood, LVP, tile, and engineered wood with expert subfloor preparation.", price: "$4-$25/sq ft", timeline: "2-5 days" },
    "Home Additions": { summary: "Room additions, bump-outs, and second-story additions with full structural engineering and permitting.", price: "$150-$400/sq ft", timeline: "8-16 weeks" },
    "Interior Painting": { summary: "Professional interior painting with proper prep, premium paints, and clean lines throughout.", price: "$3-$6/sq ft", timeline: "2-5 days" },
    "Interior Carpentry": { summary: "Custom trim, built-ins, wainscoting, crown molding, and finish carpentry throughout your home.", price: "$75-$150/hr", timeline: "Varies" },
    "Attic Conversions": { summary: "Transform unused attic space into bedrooms, offices, or bonus rooms with proper insulation and egress.", price: "$50K-$150K", timeline: "6-12 weeks" },
    "Decks & Porches": { summary: "New deck construction, porch builds, and repairs using composite and pressure-treated materials.", price: "$15K-$75K", timeline: "2-4 weeks" },
    "Design & Planning": { summary: "Professional design consultation, 3D renderings, material selection, and project planning.", price: "$2.5K-$15K", timeline: "2-6 weeks" },
    "Comfort & Accessibility": { summary: "Aging-in-place modifications, grab bars, walk-in showers, ramps, and wider doorways.", price: "$5K-$50K", timeline: "1-4 weeks" },
  },
};

const COUNTY_TOWN_OVERRIDES: Record<string, Record<string, { style: string; description: string; linked?: boolean }>> = {
  "fairfield-county": {
    Greenwich: { style: "Colonial, Tudor, French Provincial", description: "Pre-1940 housing stock with strict setbacks and historic district requirements. High-end renovations on large lots with mature landscaping and estate-level finishes.", linked: true },
    Westport: { style: "1940s-1970s Colonials & Ranches", description: "Coastal town with salt air exposure and FEMA flood zone considerations. Many homes are colonials and ranches from the 1940s through 1970s undergoing modern updates.", linked: true },
    Darien: { style: "Colonials on Wooded Lots", description: "Colonial homes on wooded lots with high water tables and ledge rock conditions throughout. Basement waterproofing and foundation work are common project components here. Families expect quality craftsmanship and clear timelines on every renovation." },
    "New Canaan": { style: "Mid-Century Modern and Colonial", description: "A mix of mid-century modern and colonial architecture with a historic commission and strict zoning. Renovations often require additional design review approvals. Homeowners here have typically renovated before and value precision and communication." },
    Stamford: { style: "Urban/Suburban Mix", description: "An urban-suburban mix of condos and single-family homes across diverse ages. Projects range from condo kitchen updates to full single-family renovations. Reliable communication and on-time arrivals set us apart in a market where homeowners have options." },
    Norwalk: { style: "Victorian-Era and Newer", description: "Victorian-era homes in South Norwalk alongside newer construction throughout the town. Coastal salt air conditions require careful material selection for long-term durability. Bathroom and kitchen remodels are common as homeowners update older layouts to match current living standards." },
    Fairfield: { style: "1940s-1970s Colonial Homes", description: "A family-oriented town with colonial homes from the 1940s through 1970s. Proximity to the coast means moisture management is a consistent consideration. Kitchen and bathroom remodels are the most common projects as families update aging layouts." },
    Ridgefield: { style: "Colonial and Cape on Large Lots", description: "Rural character with larger lots, rock ledge conditions, and colonial and cape architecture throughout. Well water systems and septic considerations factor into project planning. Homeowners here value thorough site assessments and clear communication before any work begins." },
  },
  "new-haven-county": {
    Orange: { style: "1960s-1980s Colonials & Ranches", description: "Our home base. Well-maintained colonials and ranches from the 1960s through 1980s on generous lots. Split-levels and raised ranches are the most common renovation candidates, with kitchens and bathrooms that haven't been touched in decades.", linked: true },
    "New Haven": { style: "Victorian, Colonial & Multi-Family", description: "A mix of Victorian-era homes, colonials, and multi-family properties. Over 40% of homes predate 1940 with plaster walls, balloon framing, and knob-and-tube wiring that require experienced handling.", linked: true },
    Hamden: { style: "1950s-1970s Split-Levels and Capes", description: "Split-levels, capes, and colonials from the 1950s through 1970s. Basement finishing and whole-home renovations are common as families modernize these well-built mid-century homes with outdated electrical and original plumbing." },
    Branford: { style: "Coastal Colonials and Capes", description: "A coastal town where salt air exposure and FEMA flood zone considerations shape every renovation decision. Material selection for moisture resistance is a key factor in shoreline neighborhoods." },
    Guilford: { style: "Historic and Coastal", description: "One of the oldest towns in Connecticut with a significant historic district and pre-Revolutionary housing stock. Renovations here often require design review approval and careful attention to period-appropriate details." },
    Madison: { style: "Coastal & Suburban", description: "A shoreline town with a mix of beach cottages and larger suburban homes along the Long Island Sound. Elevated humidity and salt air require careful material choices for kitchens, bathrooms, and exterior work.", linked: true },
    Woodbridge: { style: "Colonials on Wooded Lots", description: "Rural character with larger lots, well water systems, and septic considerations that affect renovation planning. Colonials and contemporaries sit on wooded lots where site access and ledge rock conditions factor into every project." },
    Milford: { style: "Mixed Suburban and Coastal", description: "A diverse housing stock ranging from beach cottages along the Long Island Sound to newer inland subdivisions. Coastal areas require moisture management while inland neighborhoods feature 1960s-1980s colonials and ranches." },
  },
};

const COUNTY_FEATURED_OVERRIDES: Record<string, Array<{ title: string; body: string; quote: string; cite: string }>> = {
  "fairfield-county": [
    { title: "Basement Finishing in Darien", body: "A Darien homeowner needed a finished basement with a home office, guest suite, and full bathroom. The site had a high water table - we installed an interior drainage system and sump pump before framing, then built out 1,200 square feet of finished living space with LVP flooring and recessed lighting.", quote: "\"The basement is the most-used room in the house now. We use the office every day.\"", cite: "The Andersons, Darien" },
    { title: "Bathroom Remodeling in Westport", body: "A Westport couple wanted to update two bathrooms in their 1960s colonial. We replaced dated tile with large-format porcelain, installed a frameless glass shower enclosure, upgraded the plumbing to PEX, and added radiant floor heating throughout both bathrooms.", quote: "\"The heated floors were the best decision we made. BuiltWell guided us through every choice.\"", cite: "The Brennans, Westport" },
    { title: "Kitchen Remodeling in New Canaan", body: "A New Canaan family wanted to open up a kitchen closed off by a load-bearing wall. We engineered a beam solution, installed white shaker cabinets with a quartz island, and extended hardwood flooring into the new open layout.", quote: "\"BuiltWell made it straightforward. Now we can't imagine how we lived before.\"", cite: "Homeowner, New Canaan" },
  ],
  "new-haven-county": [
    { title: "Whole-Home Renovation in Hamden", body: "A Hamden family purchased a 1960s split-level and wanted to modernize the entire home. We renovated the kitchen with new cabinetry and quartz countertops, updated both bathrooms, refinished hardwood floors throughout, and finished the basement as a family room with an egress window.", quote: "\"BuiltWell transformed this house into exactly what we envisioned. The basement alone was worth it.\"", cite: "The Patels, Hamden" },
    { title: "Kitchen Remodeling in Milford", body: "A Milford homeowner needed to replace dated 1990s oak cabinets and laminate countertops. We removed the peninsula, installed soft-close cabinetry with quartz countertops and subway tile, and extended LVP flooring into the dining room.", quote: "\"They showed up when they said they would, cleaned up every day, and the kitchen turned out better than I imagined.\"", cite: "Homeowner, Milford" },
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
      return <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none" aria-hidden="true"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>;
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
  const countyServiceOverrides = COUNTY_SERVICE_OVERRIDES[slug] || COUNTY_SERVICE_OVERRIDES["fairfield-county"];
  const serviceCards = (services?.items || []).map((item: any) => ({ ...item, ...(countyServiceOverrides[item.title] || {}) }));
  const visibleServices = showAllServices ? serviceCards : serviceCards.slice(0, visibleCount);
  const fields = lead?.fields || [];
  const topFields = fields.filter((field: any) => !["checkbox_group", "radio_group", "textarea", "file"].includes(field.type));
  const servicesField = fields.find((field: any) => field.type === "checkbox_group");
  const timeField = fields.find((field: any) => field.name === "best_time" || field.type === "select");
  const contactField = fields.find((field: any) => field.type === "radio_group");
  const messageField = fields.find((field: any) => field.type === "textarea");

  return (
    <div className="bg-[#f5f1e9] text-[#1e2b43]">
      <section className="relative isolate overflow-hidden bg-[#151e30] px-5 pb-0 pt-[130px] text-white md:px-10">
        <div className="absolute inset-0 bg-cover bg-center opacity-[0.72]" style={{ backgroundImage: `url(${media(hero?.background_image, slug === "fairfield-county" ? "/images/areas/fairfield-county.jpg" : "/images/areas/new-haven-county.jpg")})` }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(21,30,48,0.45) 0%, rgba(21,30,48,0.35) 24%, rgba(21,30,48,0.68) 70%, rgba(21,30,48,0.95) 100%)" }} />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(188,145,85,0.06) 0%, transparent 50%)" }} />
        <div className="relative z-10 mx-auto flex min-h-[380px] max-w-[1240px] flex-col items-center justify-center pb-14 text-center md:min-h-[440px]">
          <ol className="mb-4 flex list-none items-center text-[12px] font-semibold text-white/92">
            <li>{linkNode("/", "Home", "transition-colors hover:text-[#bc9155]")}</li>
            <li className="before:px-2.5 before:text-[#bc9155] before:content-['›']">{linkNode("/areas-we-serve/", "Areas We Serve", "transition-colors hover:text-[#bc9155]")}</li>
            <li className="before:px-2.5 before:text-[#bc9155] before:content-['›']"><span>{countyName}</span></li>
          </ol>
          <h1 className="max-w-[860px] font-serif text-[clamp(40px,4.6vw,60px)] font-bold leading-[1.04] tracking-[-0.03em] text-white">
            {heroParts.before}
            {heroParts.accent ? <span className="text-[#bc9155]">{heroParts.accent}</span> : null}
            {heroParts.after}
          </h1>
          <p className="mt-5 max-w-[700px] text-[14px] leading-[1.7] text-white/92 md:text-[15px]">{countyCopy.heroSubtitle}</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            {[...(hero?.badges || [])].sort((a: any, b: any) => (b.is_primary ? 1 : 0) - (a.is_primary ? 1 : 0)).map((badge: any, index: number) => {
              const isPrimary = !!badge.is_primary;
              const btnText = isPrimary ? (badge.value || badge.label) : `Call ${badge.value || badge.label}`;
              return (
                <div key={`${badge.label || "badge"}-${index}`}>
                  {linkNode(
                    badge.url || "#",
                    <span
                      className={cls(
                        "inline-flex items-center justify-center rounded-[8px] px-8 py-[14px] text-[15px] font-semibold leading-none transition-all duration-300 hover:-translate-y-[2px]",
                        isPrimary
                          ? "bg-[#bc9155] text-white shadow-[0_4px_16px_rgba(188,145,85,0.35)] hover:bg-[#d4a95a] hover:shadow-[0_8px_24px_rgba(188,145,85,0.45)]"
                          : "border border-white/[0.22] bg-[rgba(10,18,35,0.42)] text-white backdrop-blur-[12px] hover:bg-[rgba(10,18,35,0.62)] hover:border-white/[0.35] hover:shadow-[0_8px_24px_rgba(0,0,0,0.3)]",
                      )}
                    >
                      {btnText}
                    </span>,
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-y border-[rgba(188,145,85,0.2)]" style={{ background: "linear-gradient(135deg, #1E2B43 0%, #151E30 100%)" }}>
        <div className="mx-auto grid max-w-[1280px] grid-cols-2 text-center md:grid-cols-4">
          {(heroTrust?.items || []).map((item: any, index: number, items: any[]) => {
            const isShield = (item.icon || "").toLowerCase() === "shield" || /bonded|insured/i.test(item.label || "");
            const showBorder = index < items.length - 1;
            return (
              <div key={`${item.label || "trust"}-${index}`} className={cls("group cursor-default px-5 py-9 transition-all duration-300 hover:-translate-y-[3px] hover:bg-[rgba(188,145,85,0.08)]", showBorder && "border-r border-[rgba(188,145,85,0.12)]")}>
                <div className="flex h-[42px] items-end justify-center leading-none text-[#BC9155] transition-all duration-300 group-hover:text-[#d4a95a] group-hover:[text-shadow:0_0_20px_rgba(188,145,85,0.3)]" style={{ fontFamily: "'Playfair Display', serif", fontSize: 42, fontWeight: 700 }}>
                  {isShield ? (
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                  ) : (
                    item.value
                  )}
                </div>
                <div className="mt-2 text-[13px] font-medium uppercase tracking-[1px] text-white/60 transition-colors duration-300 group-hover:text-white/85">
                  {item.label}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="bg-white px-5 py-20 md:px-10 md:py-[100px]">
        <FadeUp>
          <div className="mx-auto max-w-[760px] text-center">
            {label(countyCopy.overviewEyebrow)}
            <h2 className="font-serif text-[clamp(32px,3.5vw,48px)] font-bold leading-[1.08] tracking-[-0.03em]">
              {overviewParts.before}
              {overviewParts.accent ? <span className="text-[#bc9155]">{overviewParts.accent}</span> : null}
              {overviewParts.after}
            </h2>
            <div className="mx-auto mt-6 max-w-[690px] space-y-5 text-left text-[15px] leading-[1.75] text-[#5c677d]">
              {countyCopy.overviewParagraphsBefore.map((paragraph, index) => {
                const isLast = index === countyCopy.overviewParagraphsBefore.length - 1;
                if (isLast) {
                  return (
                    <p key={`overview-${index}`}>
                      {paragraph}
                      <a href={countyCopy.overviewPhoneHref} style={{ color: "#bc9155", fontWeight: 600 }}>{countyCopy.overviewPhoneLabel}</a>
                      {countyCopy.overviewPhoneTrailing}
                    </p>
                  );
                }
                return <p key={`overview-${index}`}>{paragraph}</p>;
              })}
            </div>
          </div>
        </FadeUp>
      </section>

      <section className="bg-[#f5f1e9] px-5 py-20 md:px-10">
        <div className="mx-auto max-w-[1240px]">
          <FadeUp>
            <div className="mb-12 text-center">
              {label("Our Services")}
              <h2 className="font-serif text-[clamp(34px,3.8vw,48px)] font-bold leading-[1.08] tracking-[-0.03em]">
                {servicesParts.before}
                {servicesParts.accent ? <span className="text-[#bc9155]">{servicesParts.accent}</span> : null}
                {servicesParts.after}
              </h2>
              <p className="mx-auto mt-3 max-w-[760px] text-[15px] leading-[1.8] text-[#5c677d]">{countyCopy.servicesSubtitle}</p>
            </div>
          </FadeUp>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {visibleServices.map((item: any, index: number) => (
              <FadeUp key={`${item.title || "service"}-${index}`} delay={index % 3 * 100} className="h-full">
                <article className="group/card flex h-full flex-col overflow-hidden rounded-[10px] border border-[#e6dccd] border-b-[3px] border-b-transparent bg-white shadow-[0_16px_34px_rgba(30,43,67,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-b-[#bc9155] hover:shadow-[0_12px_28px_rgba(30,43,67,0.1),0_28px_56px_rgba(30,43,67,0.12)]">
                  <div className="h-[228px] overflow-hidden">
                    <img src={media(item.image, "/services/kitchen-remodeling-ct.jpg")} alt={item.image_alt || item.title} className="h-full w-full object-cover transition-transform duration-500 group-hover/card:scale-105" />
                  </div>
                  <div className="flex flex-1 flex-col p-5 text-center">
                    <h3 className="font-serif text-[22px] font-bold leading-[1.22]">{item.title}</h3>
                    <p className="mt-3 flex-1 text-[15px] leading-[1.72] text-[#5c677d]">{item.summary}</p>
                    <div className="mt-4 flex flex-wrap justify-center gap-2">
                      {item.price ? <span className="rounded-full bg-[#bc915512] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#bc9155]">{item.price}</span> : null}
                      {item.timeline ? <span className="rounded-full bg-[#bc915512] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#bc9155]">{item.timeline}</span> : null}
                    </div>
                    {item.url ? linkNode(item.url, <><span>Get Started</span><ArrowRight className="h-4 w-4" /></>, "mt-5 inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.12em] text-[#bc9155] transition-all duration-300 hover:gap-3 justify-center") : null}
                  </div>
                </article>
              </FadeUp>
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

      {/* MID-PAGE CTA */}
      <div className="relative overflow-hidden" style={{ padding: "64px 0" }}>
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #1E2B43 0%, #151E30 100%)" }} />
        <div className="absolute inset-0" style={{ backgroundImage: "url('/portfolio/builtwell-contractor-client-consultation-ct.jpeg')", backgroundPosition: "center 15%", backgroundSize: "cover", opacity: 0.25 }} />
        <div className="relative z-[1] mx-auto max-w-[700px] px-8 text-center">
          <h2 className="mb-3 font-serif text-[clamp(28px,3.5vw,40px)] font-bold">
            <span style={{ color: "#ffffff" }}>{countyCopy.midCtaTitle} </span><span style={{ color: "#BC9155" }}>{countyCopy.midCtaAccent}</span><span style={{ color: "#ffffff" }}>?</span>
          </h2>
          <p className="mb-7 text-[16px] leading-[1.7] text-white/70">{countyCopy.midCtaBody}</p>
          <a href="#contact" className="inline-block rounded-[8px] bg-[#BC9155] px-12 py-4 font-['Inter'] text-[16px] font-semibold text-white transition-colors hover:bg-[#a57d48]" style={{ cursor: "pointer" }}>Get Your Free Estimate</a>
          <p className="mt-4 text-[14px] italic text-white/50">On-site or remote via Google Meet. No charge, no obligation.</p>
        </div>
      </div>

      {/* TOWNS WE SERVE */}
      <section className="bg-[#f5f1e9] px-5 pt-10 pb-20 md:px-10">
        <div className="mx-auto max-w-[1240px]">
          <FadeUp>
            <div className="mb-12 text-center">
              {label("Where We Work")}
              <h2 className="font-serif text-[clamp(34px,3.8vw,48px)] font-bold leading-[1.08] tracking-[-0.03em]">
                {townsParts.before}
                {townsParts.accent ? <span className="text-[#bc9155]">{townsParts.accent}</span> : null}
                {townsParts.after}
              </h2>
              <p className="mx-auto mt-3 max-w-[720px] text-[15px] leading-[1.8] text-[#5c677d]">{countyCopy.townsSubtitle}</p>
            </div>
          </FadeUp>
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {(towns?.tier1 || []).map((town: any, index: number) => {
              const override = townOverrides[town.label] || { style: "", description: town.description || "" };
              const content = (
                <div className="flex h-full flex-col rounded-[12px] border-b-2 border-b-transparent bg-white p-7 shadow-[0_2px_12px_rgba(30,43,67,0.06),0_1px_3px_rgba(30,43,67,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-b-[#bc9155] hover:shadow-[0_12px_28px_rgba(30,43,67,0.1),0_28px_56px_rgba(30,43,67,0.12)]">
                  <h3 className="text-[20px] font-bold text-[#1e2b43]">{town.label}</h3>
                  {override.style ? <p className="mt-2 text-[13px] font-semibold uppercase tracking-[0.5px] text-[#9a7340]">{override.style}</p> : null}
                  <p className="mt-3 flex-1 text-[14px] leading-[1.65] text-[#5c677d]">{override.description}</p>
                  {override.linked ? <span className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#bc9155] transition-all hover:gap-2.5">view {town.label} <ArrowRight className="h-3.5 w-3.5" /></span> : null}
                </div>
              );

              return (
                <FadeUp key={`${town.label || "town"}-${index}`} delay={index % 4 * 80} className="h-full">
                  {override.linked && town.url ? (
                    <Link href={town.url} className="block h-full no-underline">
                      {content}
                    </Link>
                  ) : (
                    <div className="h-full">{content}</div>
                  )}
                </FadeUp>
              );
            })}
          </div>
        </div>
      </section>

      {/* FEATURED PROJECTS */}
      <section className="border-t border-[#1e2b43]/8 bg-[#f5f1e9] px-5 py-20 md:px-10">
        <div className="mx-auto max-w-[1240px]">
          <FadeUp>
            <div className="mb-12 text-center">
              {label("Recent Work")}
              <h2 className="font-serif text-[clamp(34px,3.8vw,48px)] font-bold leading-[1.08] tracking-[-0.03em]">
                {featuredParts.before}
                {featuredParts.accent ? <span className="text-[#bc9155]">{featuredParts.accent}</span> : null}
                {featuredParts.after}
              </h2>
              <p className="mx-auto mt-3 max-w-[760px] text-[15px] leading-[1.8] text-[#5c677d]">{countyCopy.featuredSubtitle}</p>
            </div>
          </FadeUp>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredOverrides.map((item, index) => (
              <FadeUp key={`${item.title}-${index}`} delay={index * 100}>
                <article className="flex h-full flex-col rounded-[12px] border-b-[3px] border-b-transparent bg-white p-7 shadow-[0_2px_12px_rgba(30,43,67,0.06),0_1px_3px_rgba(30,43,67,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-b-[#bc9155] hover:shadow-[0_12px_28px_rgba(30,43,67,0.1),0_28px_56px_rgba(30,43,67,0.12)]">
                  <div className="flex-1">
                    <h3 className="mb-3 font-serif text-[22px] font-bold">{item.title}</h3>
                    <p className="text-[15px] leading-[1.75] text-[#5c677d]">{item.body}</p>
                  </div>
                  <div className="mt-4 border-l-[3px] border-l-[#bc9155] pl-4">
                    <p className="min-h-[72px] text-[15px] italic leading-[1.65] text-[#1e2b43]">{item.quote}</p>
                    <cite className="mt-2 block text-[12px] font-semibold not-italic text-[#5c677d]">{item.cite}</cite>
                  </div>
                </article>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <FadeUp>
        <div className="relative overflow-hidden bg-[linear-gradient(135deg,#1e2b43_0%,#151E30_100%)] px-5 py-14 md:px-10">
          <div className="absolute inset-0 bg-[url('/hero/builtwell-job-site-aerial-hero-ct.jpg')] bg-cover bg-center opacity-[0.12]" />
          <div className="relative z-[1] mx-auto flex max-w-[1200px] flex-wrap items-center justify-center">
            {(stripTrust?.items || []).map((item: any, index: number) => {
              const inner = (
                <div className="flex min-w-[180px] flex-1 flex-col items-center gap-[10px] px-8 py-5 text-center text-[13px] font-semibold tracking-[0.03em] text-white/90 transition-all duration-300 hover:-translate-y-1 hover:text-[#bc9155]">
                  <span className="text-[#bc9155] drop-shadow-[0_2px_4px_rgba(188,145,85,0.3)]">{trustIcon(item.icon)}</span>
                  <span>{[item.label, item.value].filter(Boolean).join(" ")}</span>
                </div>
              );
              return (
                <div key={`${item.label || "strip"}-${index}`} className="contents">
                  {item.url ? linkNode(item.url, inner, "flex flex-1 justify-center") : <div className="flex flex-1 justify-center">{inner}</div>}
                  {index < (stripTrust?.items || []).length - 1 ? <div className="hidden h-10 w-px bg-white/10 lg:block" /> : null}
                </div>
              );
            })}
          </div>
        </div>
      </FadeUp>

      <SharedLeadFormSection page={page} data={lead} accent={lead?.title_highlight || "Project"} />
      <SharedFinancingStrip data={financing} />
    </div>
  );
}

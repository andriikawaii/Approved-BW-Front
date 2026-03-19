"use client";

import { useMemo, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Components } from "react-markdown";
import type { CMSPage } from "@/types/cms";
import {
  DarkTrustStrip,
  FinancingStrip,
  HeroTrustBar,
  LeadFormSection,
  label,
  linkNode,
  media,
  parts,
  section,
  sections,
} from "./template-utils";

type HeroData = {
  headline?: string;
  subheadline?: string;
  background_image?: string | null;
  primary_cta?: { label?: string; url?: string } | null;
};

type RichTextData = {
  eyebrow?: string | null;
  title?: string | null;
  highlight_text?: string | null;
  content?: string | null;
  style_variant?: string | null;
};

type ServiceIntroData = {
  title?: string | null;
  content?: string | null;
  image_main?: string | null;
  image_secondary?: string | null;
  bullet_points?: Array<{ text?: string | null }>;
};

type BeforeAfterData = {
  title?: string | null;
  subtitle?: string | null;
  items?: Array<{
    title?: string | null;
    before_image?: string | null;
    after_image?: string | null;
    before_text?: string | null;
    quote?: { text?: string | null; author?: string | null; location?: string | null } | null;
  }>;
};

type PricingData = {
  title?: string | null;
  subtitle?: string | null;
  columns?: string[];
  rows?: Array<{ label?: string | null; price?: string | null; notes?: string | null }>;
};

type ProcessData = {
  title?: string | null;
  subtitle?: string | null;
  steps?: Array<{ title?: string | null; short?: string | null; description?: string | null }>;
};

type FeatureGridData = {
  title?: string | null;
  subtitle?: string | null;
  items?: Array<{ title?: string | null; description?: string | null }>;
};

type FaqData = {
  title?: string | null;
  items?: Array<{ question?: string | null; answer?: string | null }>;
};

type LogoStripData = {
  title?: string | null;
  subtitle?: string | null;
  items?: Array<{ name?: string | null; logo?: string | null; url?: string | null }>;
};

type ProjectHighlightsData = {
  eyebrow?: string | null;
  title?: string | null;
  items?: Array<{ title?: string | null; description?: string | null; image?: string | null; url?: string | null }>;
};

type PhoneItem = { label?: string; number?: string };
type LeadFormData = Record<string, unknown>;
type AreasData = {
  eyebrow?: string;
  title?: string;
  highlight_text?: string;
  subtitle?: string;
  counties?: Array<{
    name?: string;
    image?: string;
    url?: string;
    phone?: string;
    description?: string;
    towns?: string[];
    extra_towns?: string[];
    town_links?: Record<string, string>;
    cta_label?: string;
  }>;
};
type TrustBarData = { items?: any[] };

const FAIRFIELD_TOWNS = new Set([
  "greenwich", "westport", "darien", "new-canaan", "stamford", "norwalk", "fairfield", "ridgefield",
  "bethel", "bridgeport", "brookfield", "danbury", "easton", "monroe", "new-fairfield", "newtown",
  "redding", "shelton", "sherman", "stratford", "trumbull", "weston", "wilton",
]);

const KITCHEN_INCLUDED_COPY: Record<string, string> = {
  Cabinetry: "Soft-close hardware and adjustable shelving as standard. Custom, semi-custom, or stock options available.",
  "Countertops & Tile": "Countertop fabrication and installation, backsplash tile work, and underlayment preparation.",
  Electrical: "New circuits for appliances, under-cabinet lighting, and updated outlet and switch locations.",
  Plumbing: "Sink and dishwasher connections, garbage disposal installation, and relocated water lines.",
  Appliances: "Coordinated delivery and installation so you are not managing that separately.",
  Flooring: "Underlayment preparation and flooring installation with transitions to adjacent rooms.",
  "Demolition & Prep": "Removal of existing cabinets, countertops, and flooring. Wall assessment and structural repair as needed.",
  "Painting & Finish": "Interior painting, drywall patching, daily cleanup, dust barriers, and final walkthrough.",
};

const FLOORING_INCLUDED_COPY: Record<string, string> = {
  "Hardwood Installation": "Solid and engineered hardwood installation with precision fitting and finishing.",
  "Hardwood Refinishing": "Sanding, staining, and multi-coat polyurethane finish to restore existing floors.",
  "Luxury Vinyl Plank (LVP)": "Waterproof, commercial-grade luxury vinyl plank with click-lock installation.",
  "Tile Flooring": "Porcelain, ceramic, and natural stone tile with proper underlayment and grouting.",
  "Subfloor Repair": "Leveling, sistering, and moisture remediation to ensure a solid foundation.",
  "Moisture Barriers": "Vapor barriers and moisture testing to protect against damage and warping.",
  "Transitions & Trim": "Seamless transitions between rooms and professional trim and molding installation.",
  "Furniture Moving & Protection": "Careful furniture relocation and surface protection throughout the project.",
};

const BASEMENT_INCLUDED_COPY: Record<string, string> = {
  "Framing & Insulation": "Steel or wood stud framing with rigid foam or fiberglass insulation for comfort and code compliance.",
  "Drywall & Paint": "Moisture-resistant drywall throughout, taped, mudded, sanded, and finished with premium interior paint.",
  Electrical: "New circuits, recessed lighting, outlet and switch placement, and panel upgrades as needed.",
  Plumbing: "Bathroom rough-in, wet bar connections, sump pump assessment, and drain line coordination.",
  Flooring: "LVP, tile, or engineered hardwood rated for below-grade installation over concrete or subfloor systems.",
  "Egress Windows": "Code-required egress windows for bedrooms, including window well excavation and installation.",
  "HVAC Extension": "Ductwork extension, mini-split installation, or supplemental heating and cooling for the finished space.",
  "Trim & Finish": "Baseboards, door casings, interior doors, closet systems, and final detail work.",
};

const BATHROOM_INCLUDED_COPY: Record<string, string> = {
  "Tile & Stone": "Shower tile, floor tile, and accent walls — porcelain, ceramic, marble, and natural stone options.",
  "Vanity & Countertops": "Custom, semi-custom, or stock vanities with stone or solid-surface countertops and undermount sinks.",
  "Shower & Tub": "Walk-in showers, tub-to-shower conversions, freestanding tubs, and glass enclosures.",
  Plumbing: "New supply lines, drain relocation, fixture connections, and water heater assessment.",
  Electrical: "GFCI outlets, exhaust fan upgrades, vanity lighting, recessed lighting, and heated floors.",
  "Waterproofing": "Kerdi membrane, cement board, and moisture barriers behind all wet-area surfaces.",
  "Demolition & Prep": "Removal of existing fixtures, tile, and vanities. Subfloor and wall assessment.",
  "Painting & Finish": "Interior painting, trim work, hardware installation, and final cleanup.",
};

type ServiceMeta = {
  serviceLabel: string;
  servicePath: string;
  defaultHeroImage: string;
  scopeLabel: string;
  includedCopy: Record<string, string>;
  relatedFooter: string;
};

const SERVICE_META: Record<string, ServiceMeta> = {
  "kitchen-remodeling": {
    serviceLabel: "Kitchen Remodeling",
    servicePath: "/kitchen-remodeling/",
    defaultHeroImage: "/images/headers/kitchen-remodeling-header.jpg",
    scopeLabel: "Scope of Work",
    includedCopy: KITCHEN_INCLUDED_COPY,
    relatedFooter: "Many kitchen remodeling projects include or lead to these related services.",
  },
  flooring: {
    serviceLabel: "Flooring",
    servicePath: "/flooring/",
    defaultHeroImage: "/images/headers/flooring-header.jpg",
    scopeLabel: "Scope of Work",
    includedCopy: FLOORING_INCLUDED_COPY,
    relatedFooter: "Many flooring projects include or lead to these related services.",
  },
  "bathroom-remodeling": {
    serviceLabel: "Bathroom Remodeling",
    servicePath: "/bathroom-remodeling/",
    defaultHeroImage: "/images/headers/bathroom-remodeling-header.jpg",
    scopeLabel: "Scope of Work",
    includedCopy: BATHROOM_INCLUDED_COPY,
    relatedFooter: "Many bathroom remodeling projects include or lead to these related services.",
  },
  "basement-finishing": {
    serviceLabel: "Basement Finishing",
    servicePath: "/basement-finishing/",
    defaultHeroImage: "/images/headers/basement-finishing-header.jpg",
    scopeLabel: "Scope of Work",
    includedCopy: BASEMENT_INCLUDED_COPY,
    relatedFooter: "Many basement finishing projects include or lead to these related services.",
  },
};

function deriveServiceSlug(slug: string): string {
  const match = slug.match(/^([a-z-]+)\/[a-z-]+-ct$/);
  return match ? match[1] : "kitchen-remodeling";
}

function deriveCityConfig(slug: string) {
  const serviceSlug = deriveServiceSlug(slug);
  const match = slug.match(/[a-z-]+\/([a-z-]+)-ct$/);
  const townSlug = match ? match[1] : "stamford";
  const cityShort = townSlug.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  const isFairfield = FAIRFIELD_TOWNS.has(townSlug);
  const meta = SERVICE_META[serviceSlug] || SERVICE_META["kitchen-remodeling"];
  return {
    cityLabel: `${cityShort}, CT`,
    cityShort,
    countyLabel: isFairfield ? "Fairfield County" : "New Haven County",
    defaultPhone: isFairfield ? "(203) 919-9616" : "(203) 466-9148",
    heroAccent: `${cityShort}, CT`,
    overviewEyebrow: `${cityShort}'s ${meta.serviceLabel} Contractor`,
    serviceLabel: meta.serviceLabel,
    servicePath: meta.servicePath,
    defaultHeroImage: meta.defaultHeroImage,
    scopeLabel: meta.scopeLabel,
    includedCopy: meta.includedCopy,
    relatedFooter: meta.relatedFooter,
  };
}

const markdownComponents: Components = {
  h3: ({ children }) => <h3 className="mt-8 text-[22px] font-bold leading-[1.3] text-[#1e2b43]">{children}</h3>,
  p: ({ children }) => <p className="mt-4 text-[16px] leading-[1.85] text-[#5c677d]">{children}</p>,
  ul: ({ children }) => <ul className="mt-4 list-disc space-y-3 pl-6 text-[16px] leading-[1.85] text-[#5c677d]">{children}</ul>,
  li: ({ children }) => <li>{children}</li>,
  strong: ({ children }) => <strong className="font-semibold text-[#1e2b43]">{children}</strong>,
  a: ({ href, children }) => {
    const safeHref = typeof href === "string" && href ? href : "#";
    return linkNode(safeHref, children, "font-semibold text-[#bc9155] hover:underline");
  },
};

function AccentTitle({ text, accent }: { text?: string | null; accent?: string | null }) {
  const title = parts(text, accent);
  return <>{title.before}{title.accent ? <span className="text-[#bc9155]">{title.accent}</span> : null}{title.after}</>;
}

function HeroCta({ label, value, href, primary = false }: { label: string; value: string; href: string; primary?: boolean }) {
  return linkNode(
    href,
    <span className={[
      "flex min-w-[180px] flex-col items-center rounded-[8px] px-7 py-4 text-center transition-all duration-300 hover:-translate-y-0.5",
      primary
        ? "border border-[#bc9155] border-b-2 border-b-[#a57d48] bg-[#bc9155] text-white hover:bg-[#d4a95a] hover:border-[#d4a95a] hover:border-b-[#a57d48] hover:shadow-[0_8px_24px_rgba(188,145,85,0.4)]"
        : "border border-white/[0.18] border-b-2 border-b-[#bc9155] bg-[rgba(10,18,35,0.42)] text-white backdrop-blur-[12px] hover:bg-[rgba(10,18,35,0.62)] hover:border-white/[0.28] hover:border-b-[#bc9155] hover:shadow-[0_8px_24px_rgba(0,0,0,0.3),0_0_0_1px_rgba(188,145,85,0.2)]",
    ].join(" ")}>
      <span className={`text-[11px] font-semibold uppercase tracking-[0.18em] ${primary ? "text-white/90" : "text-white/70"}`}>{label}</span>
      <span className="mt-1 font-serif text-[18px] font-semibold">{value}</span>
    </span>,
  );
}

function IncludedIcon() {
  return <div className="h-[22px] w-[22px] rounded-full border-2 border-[#bc9155]" aria-hidden="true" />;
}

function paragraphize(value?: string | null) {
  return (value || "").split(/\n\n+/).map((entry) => entry.trim()).filter(Boolean);
}

function normalizeSlug(slug?: string) {
  return (slug || "").trim().toLowerCase().replace(/^\/+|\/+$/g, "");
}

function resolveCountyPhone(phones: PhoneItem[], countyLabel: string, fallback: string) {
  const key = countyLabel.toLowerCase();
  return phones.find((item) => (item.label || "").toLowerCase().includes(key))?.number || fallback;
}

function resolveAreaPhone(phones: PhoneItem[], countyName?: string, fallback?: string) {
  if (!countyName) return fallback || "";
  return resolveCountyPhone(phones, countyName, fallback || "");
}

export function KitchenRemodelingCityPageTemplate({ page }: { page: CMSPage }) {
  const hero = section<HeroData>(page, "hero_service_location");
  const trustBars = sections<TrustBarData>(page, "trust_bar");
  const richTexts = sections<RichTextData>(page, "rich_text");
  const overview = richTexts[0];
  const localizedBlock = richTexts[1];
  const permits = richTexts[2];
  const localExpertise = richTexts[3];
  const financing = richTexts.find((item) => item.style_variant === "financing_strip");
  const intro = section<ServiceIntroData>(page, "service_intro_split");
  const recentProjects = section<BeforeAfterData>(page, "before_after");
  const pricing = section<PricingData>(page, "pricing_table");
  const process = section<ProcessData>(page, "process_steps");
  const timeline = section<FeatureGridData>(page, "feature_grid");
  const areas = section<AreasData>(page, "areas_served");
  const faq = section<FaqData>(page, "faq_list");
  const brands = section<LogoStripData>(page, "logo_strip");
  const lead = section<LeadFormData>(page, "lead_form");
  const related = section<ProjectHighlightsData>(page, "project_highlights");
  const slug = normalizeSlug(page.slug);
  const config = deriveCityConfig(slug);
  const phones = ((page as CMSPage & { phones?: { items?: PhoneItem[] } }).phones?.items) || [];
  const primaryPhone = resolveCountyPhone(phones, config.countyLabel, config.defaultPhone);
  const repeatedBrands = useMemo(() => ([...(brands?.items || []), ...(brands?.items || [])]), [brands?.items]);
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [countyOpen, setCountyOpen] = useState<Record<number, boolean>>({});
  const localExpertiseParagraphs = paragraphize(localExpertise?.content);
  const localExpertiseIntro = localExpertiseParagraphs[0];
  const localExpertiseBody = localExpertiseParagraphs.slice(1);

  return (
    <div className="bg-white text-[#1e2b43]">
      <main id="main">
        <section className="kitchen-city-hero relative isolate overflow-hidden bg-[#151e30] px-5 pb-12 pt-[120px] text-white md:min-h-[50vh] md:px-10">
          <div className="absolute inset-0 bg-cover bg-[center_30%] opacity-[0.72]" style={{ backgroundImage: `url(${media(hero?.background_image, config.defaultHeroImage)})` }} />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_97%_97%,rgba(21,30,48,1)_0%,rgba(21,30,48,0.9)_8%,transparent_30%),radial-gradient(ellipse_at_3%_97%,rgba(21,30,48,0.9)_0%,transparent_25%),linear-gradient(180deg,rgba(21,30,48,0.35)_0%,rgba(21,30,48,0.2)_30%,rgba(21,30,48,0.45)_65%,rgba(21,30,48,0.92)_100%)]" />
          <div className="relative mx-auto flex min-h-[430px] max-w-[1240px] flex-col items-center justify-center text-center">
            <ol className="mb-5 flex list-none items-center text-[13px] font-medium text-white/90">
              <li>{linkNode("/", "Home", "text-white/85 hover:text-[#bc9155]")}</li>
              <li className="mx-[10px] text-[#bc9155]">{">"}</li>
              <li>{linkNode("/services/", "Services", "text-white/85 hover:text-[#bc9155]")}</li>
              <li className="mx-[10px] text-[#bc9155]">{">"}</li>
              <li>{linkNode(config.servicePath, config.serviceLabel, "text-white/85 hover:text-[#bc9155]")}</li>
              <li className="mx-[10px] text-[#bc9155]">{">"}</li>
              <li><span className="font-semibold text-white">{config.cityLabel}</span></li>
            </ol>
            <h1 className="max-w-[920px] font-serif text-[clamp(40px,4.7vw,58px)] font-bold leading-[1.08] tracking-[-0.03em] text-white">
              <AccentTitle text={hero?.headline || `${config.serviceLabel} in ${config.cityLabel}`} accent={config.heroAccent} />
            </h1>
            {hero?.subheadline ? <p className="mt-4 max-w-[720px] text-[17px] leading-[1.72] text-white/84">{hero.subheadline}</p> : null}
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <HeroCta label={config.countyLabel} value={primaryPhone} href={`tel:${primaryPhone.replace(/\D/g, "")}`} />
              <HeroCta label={hero?.primary_cta?.label || "Free Estimate"} value="Schedule Now" href={hero?.primary_cta?.url || "#contact"} primary />
            </div>
          </div>
        </section>

        <HeroTrustBar items={trustBars[0]?.items} />

        <section className="border-b border-[#1e2b430f] bg-white px-5 py-20 md:px-10">
          <div className="mx-auto max-w-[860px] text-center">
            {label(overview?.eyebrow || config.overviewEyebrow)}
            <h2 className="text-[clamp(32px,3.8vw,46px)] font-bold leading-[1.2] tracking-[-0.02em]">
              <AccentTitle text={overview?.title || `${config.serviceLabel} in ${config.cityLabel}`} accent={overview?.highlight_text || config.cityLabel} />
            </h2>
            {paragraphize(overview?.content).map((paragraph) => (
              <p key={paragraph.slice(0, 30)} className="mt-5 text-[16px] leading-[1.85] text-[#5c677d]">{paragraph}</p>
            ))}
          </div>
        </section>

        <section className="bg-[#f5f1e9] px-5 py-20 md:px-10">
          <div className="mx-auto max-w-[1240px]">
            <div className="mb-12 text-center">
              {label("Scope of Work")}
              <h2 className="text-[clamp(32px,3.8vw,46px)] font-bold leading-[1.2] tracking-[-0.02em]">
                <AccentTitle text={intro?.title || `What Is Included in a ${config.serviceLabel} Project in ${config.cityShort}`} accent={config.cityShort} />
              </h2>
            </div>
            <div className="grid gap-12 lg:grid-cols-2">
              <div className="grid gap-3">
                <div className="overflow-hidden rounded-[12px] shadow-[0_10px_34px_rgba(30,43,67,0.1)]">
                  <img src={media(intro?.image_main, "/services/kitchen-remodeling-ct.jpg")} alt="Finished kitchen remodel" className="h-[280px] w-full object-cover md:h-[320px]" />
                </div>
                <div className="overflow-hidden rounded-[12px] shadow-[0_10px_34px_rgba(30,43,67,0.1)]">
                  <img src={media(intro?.image_secondary, "/services/kitchen-remodeling-ct.jpg")} alt="Kitchen remodeling consultation" className="h-[280px] w-full object-cover md:h-[320px]" />
                </div>
              </div>
              <div className="rounded-[12px] border border-[#1e2b4312] bg-white px-6 py-7 shadow-[0_2px_12px_rgba(30,43,67,0.05)] md:px-9">
                {paragraphize(intro?.content).map((paragraph, index) => (
                  <p key={paragraph.slice(0, 30)} className={`mb-[18px] text-[16px] leading-[1.8] text-[#5c677d] last:mb-0 ${index === 0 ? "border-b border-[#1e2b4312] pb-[18px] font-medium text-[#1e2b43]" : ""}`}>
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
              {(intro?.bullet_points || []).map((item, index) => (
                <article key={`${item.text}-${index}`} className="rounded-[12px] border-b-2 border-transparent bg-white px-6 py-8 text-center shadow-[0_2px_12px_rgba(30,43,67,0.06),0_1px_3px_rgba(30,43,67,0.04)] transition-all duration-[350ms] [transition-timing-function:cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-1 hover:border-b-[#bc9155] hover:shadow-[0_12px_28px_rgba(30,43,67,0.1),0_28px_56px_rgba(30,43,67,0.12)]">
                  <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#bc9155]/10">
                    <IncludedIcon />
                  </div>
                  <h3 className="mb-[10px] text-[18px] font-semibold">{item.text}</h3>
                  <p className="text-[14px] leading-[1.68] text-[#5c677d]">{config.includedCopy[item.text || ""] || `Included as part of a full-scope ${config.serviceLabel.toLowerCase()} project.`}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-[#1e2b430f] bg-white px-5 py-20 md:px-10">
          <div className="mx-auto max-w-[1100px]">
            <div className="text-center">
              {label(localizedBlock?.eyebrow || "Local Expertise")}
              <h2 className="text-[clamp(32px,3.8vw,46px)] font-bold leading-[1.2] tracking-[-0.02em]">
                <AccentTitle text={localizedBlock?.title || `What Makes ${config.serviceLabel} in ${config.cityShort} Different`} accent={localizedBlock?.highlight_text || config.cityShort} />
              </h2>
            </div>
            <div className="mx-auto mt-6 max-w-[800px]">
              <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>{localizedBlock?.content || ""}</ReactMarkdown>
            </div>
          </div>
        </section>

        <section className="border-b border-[#1e2b430f] bg-[#f5f1e9] px-5 py-20 md:px-10">
          <div className="mx-auto max-w-[1100px]">
            <div className="text-center">
              {label(permits?.eyebrow || "Permits & Approvals")}
              <h2 className="text-[clamp(32px,3.8vw,46px)] font-bold leading-[1.2] tracking-[-0.02em]">
                <AccentTitle text={permits?.title || `${config.cityShort} Building Department and Permits`} accent={permits?.highlight_text || "and Permits"} />
              </h2>
            </div>
            <div className="mx-auto mt-6 max-w-[800px]">
              <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>{permits?.content || ""}</ReactMarkdown>
            </div>
          </div>
        </section>

        <section className="border-t border-[#1e2b430d] bg-[#f5f1e9] px-5 py-20 md:px-10">
          <div className="mx-auto max-w-[1240px]">
            <div className="mb-12 text-center">
              {label("Recent Work")}
              <h2 className="text-[clamp(32px,3.8vw,46px)] font-bold leading-[1.2] tracking-[-0.02em]">
                <AccentTitle text={recentProjects?.title || `Recent ${config.serviceLabel} Projects`} accent="Projects" />
              </h2>
              {recentProjects?.subtitle ? <p className="mx-auto mt-3 max-w-[720px] text-[17px] leading-[1.75] text-[#5c677d]">{recentProjects.subtitle}</p> : null}
            </div>
            <div className="grid gap-6 lg:grid-cols-3">
              {(recentProjects?.items || []).map((item, index) => (
                <article key={`${item.title}-${index}`} className="overflow-hidden rounded-[12px] border-b-2 border-transparent bg-white shadow-[0_2px_12px_rgba(30,43,67,0.06),0_1px_3px_rgba(30,43,67,0.04)] transition-all duration-[350ms] [transition-timing-function:cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-1 hover:border-b-[#bc9155] hover:shadow-[0_12px_28px_rgba(30,43,67,0.1),0_28px_56px_rgba(30,43,67,0.12)]">
                  <div className="relative h-[280px] overflow-hidden">
                    <div className="grid h-full grid-cols-2">
                      <img src={media(item.before_image, "/images/before-after/kitchen-before-after-1.jpg")} alt={`${item.title || "Kitchen project"} before`} className="h-full w-full object-cover" />
                      <img src={media(item.after_image, "/images/before-after/kitchen-before-after-1.png")} alt={`${item.title || "Kitchen project"} after`} className="h-full w-full object-cover" />
                    </div>
                    <div className="absolute inset-x-0 bottom-0 h-[76px] bg-[linear-gradient(to_bottom,transparent_0%,rgba(0,0,0,0.92)_55%,rgba(0,0,0,0.96)_100%)]" />
                    <div className="absolute bottom-0 left-0 flex h-[76px] w-1/2 items-end px-[14px] pb-[13px]"><span className="text-[13px] font-extrabold uppercase tracking-[2.5px] text-white">Before</span></div>
                    <div className="absolute bottom-0 right-0 flex h-[76px] w-1/2 items-end justify-end px-[14px] pb-[13px]"><span className="text-[13px] font-extrabold uppercase tracking-[2.5px] text-white">After</span></div>
                  </div>
                  <div className="px-7 py-7">
                    <h3 className="mb-3 text-[20px] font-bold">{item.title}</h3>
                    <p className="text-[14px] leading-[1.75] text-[#5c677d]">{item.before_text}</p>
                  </div>
                  {item.quote?.text ? (
                    <div className="border-t border-[#1e2b430f] px-7 py-6">
                      <div className="border-l-[3px] border-[#bc9155] pl-4">
                        <p className="min-h-[72px] text-[14px] italic leading-[1.65] text-[#1e2b43]">&quot;{item.quote.text}&quot;</p>
                        <cite className="mt-2 block text-[12px] font-semibold not-italic text-[#5c677d]">{[item.quote.author, item.quote.location].filter(Boolean).join(", ")}</cite>
                      </div>
                    </div>
                  ) : null}
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white px-5 py-20 md:px-10" id="investment">
          <div className="mx-auto max-w-[1240px]">
            <div className="mb-10 text-center">
              {label("Investment")}
              <h2 className="text-[clamp(32px,3.8vw,46px)] font-bold leading-[1.2] tracking-[-0.02em]">
                <AccentTitle text={pricing?.title || `${config.serviceLabel} Cost in ${config.cityLabel}`} accent={config.cityLabel} />
              </h2>
              {pricing?.subtitle ? <p className="mx-auto mt-3 max-w-[760px] text-[17px] leading-[1.75] text-[#5c677d]">{pricing.subtitle}</p> : null}
            </div>
            <div className="mx-auto max-w-[800px] overflow-x-auto">
              <table className="w-full overflow-hidden rounded-[12px] bg-white shadow-[0_2px_12px_rgba(30,43,67,0.06)]">
                <thead>
                  <tr>
                    {(pricing?.columns || []).map((column) => <th key={column} className="bg-[#1e2b43] px-6 py-4 text-left text-[13px] font-semibold uppercase tracking-[0.04em] text-white">{column}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {(pricing?.rows || []).map((row, index) => (
                    <tr key={`${row.label}-${index}`} className="transition-colors even:bg-[#1e2b43]/[0.02] hover:bg-[rgba(188,145,85,0.06)]">
                      <td className="border-b border-[#1e2b430d] px-6 py-4 text-[15px]">{row.label}</td>
                      <td className="border-b border-[#1e2b430d] px-6 py-4 font-serif text-[16px] font-bold text-[#bc9155]">{row.price}</td>
                      <td className="border-b border-[#1e2b430d] px-6 py-4 text-[15px]">{row.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="mt-5 text-center text-[14px] italic text-[#5c677d]">All prices include labor and materials. Final cost depends on scope, selections, and site conditions.</p>
              {pricing?.subtitle ? null : <p className="mt-4 text-[15px] leading-[1.75] text-[#5c677d]">{config.cityShort} pricing reflects the local cost of labor, permitting fees, and the material selections common in {config.countyLabel}.</p>}
            </div>
          </div>
        </section>

        <section className="bg-white px-5 py-20 md:px-10">
          <div className="mx-auto max-w-[820px]">
            <div className="text-center">
              {label(localExpertise?.eyebrow || "Local Knowledge")}
              <h2 className="text-[clamp(32px,3.8vw,46px)] font-bold leading-[1.2] tracking-[-0.02em]">
                <AccentTitle text={localExpertise?.title || `Why ${config.serviceLabel} in ${config.cityShort} Requires Local Expertise`} accent={localExpertise?.highlight_text || "Local Expertise"} />
              </h2>
              {localExpertiseIntro ? <p className="mx-auto mt-3 max-w-[720px] text-[17px] leading-[1.75] text-[#5c677d]">{localExpertiseIntro}</p> : null}
            </div>
            {localExpertiseBody.map((paragraph) => (
              <p key={paragraph.slice(0, 30)} className="mt-5 text-[16px] leading-[1.85] text-[#5c677d]">{paragraph}</p>
            ))}
          </div>
        </section>

        <section className="kitchen-city-process relative overflow-hidden px-5 py-[52px] text-white md:px-8 md:py-20 lg:px-10 lg:py-[100px]">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/portfolio/builtwell-team-contractors-ct-04.png')" }} aria-hidden="true" />
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(10,18,34,0.90)_0%,rgba(30,43,67,0.85)_100%)]" />
          <div className="relative z-10 mx-auto max-w-[1280px]">
            <div className="mb-16 text-center">
              {label("Our Process", true)}
              <h2 className="text-[clamp(32px,3.8vw,46px)] font-bold leading-[1.2] tracking-[-0.02em] text-white">
                <AccentTitle text={process?.title || `Our ${config.serviceLabel} Process`} accent="Process" />
              </h2>
              {process?.subtitle ? <p className="mx-auto mt-3 max-w-[820px] text-[17px] leading-[1.75] text-white/60">{process.subtitle}</p> : null}
            </div>
            <div className="relative mx-auto grid max-w-full gap-0 lg:max-w-none lg:grid-cols-5">
              <div className="absolute bottom-[34px] left-[25px] top-[28px] w-0.5 bg-[#BC9155]/25 md:left-[33px] md:top-[34px] lg:bottom-auto lg:left-[10%] lg:right-[10%] lg:top-[34px] lg:h-0.5 lg:w-auto" />
              {(process?.steps || []).map((item, index) => {
                const isActive = activeStep === index;
                return (
                  <button key={`${item.title}-${index}`} type="button" onClick={() => setActiveStep((current) => current === index ? null : index)} aria-expanded={isActive} className={`relative flex w-full cursor-pointer items-start gap-4 rounded-lg border-0 bg-transparent px-0 py-3 text-left transition-colors duration-300 hover:bg-[rgba(188,145,85,0.08)] md:gap-5 md:py-4 lg:block lg:px-4 lg:pb-5 lg:pt-4 lg:text-center ${isActive ? "bg-[rgba(188,145,85,0.14)]" : ""}`}>
                    <div className="relative z-10 flex h-[50px] w-[50px] shrink-0 items-center justify-center rounded-full border-[2.5px] border-[#BC9155] bg-[rgba(188,145,85,0.42)] font-serif text-[18px] font-bold text-[#f5e0c0] shadow-[0_0_0_4px_rgba(188,145,85,0.12)] md:h-[68px] md:w-[68px] md:text-2xl lg:-mt-2 lg:mx-auto lg:mb-5">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="mb-1.5 text-left text-base font-semibold text-white md:mb-3 md:text-lg lg:text-center">{item.title}</h3>
                      <p className={`text-left text-[14px] leading-[1.6] text-white/70 transition-all duration-300 lg:text-center lg:leading-[1.65] ${isActive ? "max-h-[200px] opacity-100" : "max-h-none opacity-100 lg:max-h-0 lg:overflow-hidden lg:opacity-0"}`}>
                        {isActive ? item.description : item.short || item.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
            <p className="mt-7 hidden text-center text-[13px] text-white/40 lg:block">Click any step to learn more</p>
          </div>
        </section>

        <section className="bg-[#f5f1e9] px-5 py-20 md:px-10" id="timeline">
          <div className="mx-auto max-w-[1240px]">
            <div className="mb-10 text-center">
              {label("Timeline")}
              <h2 className="text-[clamp(32px,3.8vw,46px)] font-bold leading-[1.2] tracking-[-0.02em]">Project <span className="text-[#bc9155]">Timeline</span></h2>
              {timeline?.subtitle ? <p className="mx-auto mt-3 max-w-[760px] text-[17px] leading-[1.75] text-[#5c677d]">{timeline.subtitle}</p> : null}
            </div>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {(timeline?.items || []).map((item, index) => {
                const [duration, ...rest] = (item.description || "").split(". ");
                const copy = rest.join(". ");
                return (
                  <article key={`${item.title}-${index}`} className="rounded-[10px] border border-[#1e2b430d] border-t-[3px] border-t-[#bc9155] bg-white px-6 py-8 shadow-[0_2px_8px_rgba(30,43,67,0.04)] transition-all duration-[350ms] [transition-timing-function:cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(30,43,67,0.1),0_28px_56px_rgba(30,43,67,0.12)]">
                    <div className="mb-3 inline-block rounded-[4px] bg-[#bc9155] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-white">Phase {index + 1}</div>
                    <h3 className="text-[18px] font-bold">{item.title}</h3>
                    <div className="mt-3 font-serif text-[24px] font-bold text-[#bc9155]">{duration}</div>
                    <p className="mt-3 text-[14px] leading-[1.7] text-[#5c677d]">{copy}</p>
                  </article>
                );
              })}
            </div>
            <p className="mt-6 text-center text-[14px] italic text-[#5c677d]">Timelines vary based on project scope, material lead times, and permit requirements.</p>
          </div>
        </section>

        <section className="bg-[#f5f1e9] px-5 py-20 md:px-10">
          <div className="mx-auto max-w-[1240px]">
            <div className="mb-10 text-center">
              {label(areas?.eyebrow || "Where We Work")}
              <h2 className="text-[clamp(32px,3.8vw,46px)] font-bold leading-[1.2] tracking-[-0.02em]">
                <AccentTitle text={areas?.title || `${config.serviceLabel} Across Two Counties`} accent={areas?.highlight_text || "Two Counties"} />
              </h2>
              {areas?.subtitle ? <p className="mx-auto mt-3 max-w-[760px] text-[17px] leading-[1.75] text-[#5c677d]">{areas.subtitle}</p> : null}
            </div>
            <div className="grid gap-8 lg:grid-cols-2">
              {(areas?.counties || []).map((county, index) => {
                const expanded = !!countyOpen[index];
                const links = county.town_links || {};
                const displayPhone = resolveAreaPhone(phones, county.name, county.phone);
                return (
                  <article key={`${county.name}-${index}`} className="group overflow-hidden rounded-[12px] border-b-[3px] border-transparent bg-white shadow-[0_2px_12px_rgba(30,43,67,0.06),0_1px_3px_rgba(30,43,67,0.04)] transition-all duration-[350ms] [transition-timing-function:cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-[6px] hover:border-b-[#bc9155] hover:shadow-[0_16px_40px_rgba(30,43,67,0.1),0_32px_64px_rgba(30,43,67,0.08)]">
                    <div className="relative h-[220px] overflow-hidden">
                      <img src={media(county.image, index === 0 ? "/images/areas/fairfield-county.jpg" : "/images/areas/new-haven-county.jpg")} alt={county.name || "County"} className={`h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 ${index === 1 ? "object-top" : ""}`} />
                      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-[linear-gradient(to_top,rgba(30,43,67,0.4),transparent)]" />
                    </div>
                    <div className="px-7 py-8">
                      <h3 className="text-[24px] font-bold text-[#1e2b43]">{county.name}</h3>
                      <div className="mt-1 text-[15px] text-[#5c677d]">Call: <a href={`tel:${String(displayPhone || "").replace(/\D/g, "")}`} className="font-semibold text-[#bc9155] hover:underline">{displayPhone}</a></div>
                      <p className="mt-4 border-b border-[#1e2b430f] pb-[18px] text-[14px] leading-[1.7] text-[#5c677d]">{county.description}</p>
                      <div className="mt-5 grid grid-cols-3 gap-2 md:grid-cols-4">
                        {(county.towns || []).map((town) => (
                          <div key={`${county.name}-${town}`}>{linkNode(links[town] || county.url || "#", town, "block rounded-full bg-[#f5f1e9] px-[10px] py-[7px] text-center text-[11px] font-semibold text-[#1e2b43] transition-colors hover:bg-[#bc9155] hover:text-white")}</div>
                        ))}
                        {expanded ? (county.extra_towns || []).map((town) => <span key={`${county.name}-${town}`} className="rounded-full bg-[#f5f1e9] px-[10px] py-[7px] text-center text-[11px] font-semibold text-[#1e2b43] transition-colors hover:text-[#9a7340]">{town}</span>) : null}
                        {county.extra_towns?.length ? <button type="button" className="col-span-full mt-1 text-center text-[13px] font-semibold text-[#bc9155]" aria-expanded={expanded} onClick={() => setCountyOpen((current) => ({ ...current, [index]: !current[index] }))}>{expanded ? "Show Less -" : "See All Towns +"}</button> : null}
                      </div>
                      {county.url ? linkNode(county.url, <span className="mt-4 inline-flex items-center gap-[6px] text-[14px] font-semibold text-[#bc9155]">{county.cta_label || `Learn more about ${county.name}`}<span aria-hidden="true">-&gt;</span></span>) : null}
                    </div>
                  </article>
                );
              })}
            </div>
            <p className="mt-8 text-center text-[14px] text-[#5c677d]">Not sure if we cover your area? {linkNode("/contact/", "Contact our Connecticut remodeling team", "font-semibold text-[#bc9155] underline")} and we'll let you know.</p>
          </div>
        </section>

        <section className="bg-white px-5 py-20 md:px-10">
          <div className="mx-auto max-w-[800px]">
            <div className="mb-10 text-center">
              {label("FAQ")}
              <h2 className="text-[clamp(32px,3.8vw,46px)] font-bold leading-[1.2] tracking-[-0.02em]">
                <AccentTitle text={faq?.title || `${config.serviceLabel} in ${config.cityShort} - Questions`} accent="Questions" />
              </h2>
            </div>
            <div className="space-y-3">
              {(faq?.items || []).map((item, index) => (
                <details key={`${item.question}-${index}`} className="group overflow-hidden rounded-[8px] border border-[#1e2b4312] open:border-[#bc9155]">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 text-[16px] font-semibold text-[#1e2b43] marker:hidden hover:bg-[#bc9155]/[0.04]">
                    <span>{item.question}</span>
                    <span className="text-[22px] font-light text-[#bc9155] group-open:hidden">+</span>
                    <span className="hidden text-[22px] font-light text-[#bc9155] group-open:inline">-</span>
                  </summary>
                  <div className="px-6 pb-5 text-[15px] leading-[1.78] text-[#5c677d]">{item.answer}</div>
                </details>
              ))}
            </div>
          </div>
        </section>

        <DarkTrustStrip items={trustBars[1]?.items} />

        <section className="bg-white px-5 py-20 md:px-10">
          <div className="mx-auto max-w-[1240px] text-center">
            {label("Trusted Brands")}
            <h2 className="text-[clamp(32px,3.8vw,46px)] font-bold leading-[1.2] tracking-[-0.02em]">
              <AccentTitle text={brands?.title || "Materials We Stand Behind"} accent="Stand Behind" />
            </h2>
            {brands?.subtitle ? <p className="mx-auto mt-3 max-w-[760px] text-[17px] leading-[1.75] text-[#5c677d]">{brands.subtitle}</p> : null}
            <div className="brand-mask mt-10 overflow-hidden">
              <div className="brand-track flex w-max items-center gap-12">
                {repeatedBrands.map((item, index) => (
                  <a key={`${item.name}-${index}`} href={item.url || "#"} target="_blank" rel="noreferrer noopener" className="flex h-[72px] shrink-0 items-center justify-center px-8 opacity-[0.55] transition-opacity hover:opacity-100">
                    <img src={media(item.logo, "/images/brands/kraftmaid.svg")} alt={item.name || "Brand"} className="max-h-[52px] max-w-[200px] w-auto object-contain" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        {lead ? <LeadFormSection page={page} data={lead} accent={config.cityShort} /> : null}
        {financing ? <FinancingStrip data={financing} /> : null}

        <section className="bg-[#f5f1e9] px-5 py-20 md:px-10">
          <div className="mx-auto max-w-[1240px]">
            <div className="mb-10 text-center">
              {label(related?.eyebrow || "Related Services")}
              <h2 className="text-[clamp(32px,3.8vw,46px)] font-bold leading-[1.2] tracking-[-0.02em]">
                <AccentTitle text={related?.title || "You May Also Need"} accent="Need" />
              </h2>
              <p className="mx-auto mt-3 max-w-[760px] text-[17px] leading-[1.75] text-[#5c677d]">{config.relatedFooter}</p>
            </div>
            <div className="grid gap-8 lg:grid-cols-3">
              {(related?.items || []).map((item, index) => (
                <article key={`${item.title}-${index}`} className="group flex flex-col overflow-hidden rounded-[8px] border-b-2 border-transparent bg-white shadow-[0_2px_12px_rgba(30,43,67,0.06),0_1px_3px_rgba(30,43,67,0.04)] transition-all duration-[350ms] [transition-timing-function:cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-1 hover:border-b-[#bc9155] hover:shadow-[0_12px_28px_rgba(30,43,67,0.1),0_28px_56px_rgba(30,43,67,0.12)]">
                  <div className="h-[220px] overflow-hidden">
                    <img src={media(item.image, "/services/bathroom-remodeling-ct.jpg")} alt={item.title || "Related service"} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <div className="flex flex-1 flex-col px-7 pb-8 pt-7">
                    <h3 className="mb-3 text-[22px] font-bold text-[#1e2b43]">{item.url ? linkNode(item.url, item.title, "text-[#1e2b43] hover:text-[#bc9155]") : item.title}</h3>
                    <p className="mb-5 flex-1 text-[15px] leading-[1.7] text-[#5c677d]">{item.description}</p>
                    {item.url ? linkNode(item.url, <span className="inline-flex items-center gap-[6px] text-[14px] font-semibold text-[#bc9155] transition-[gap] duration-300 hover:gap-[10px]">Learn More<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg></span>) : null}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <style jsx global>{`
        .kitchen-city-hero h1,
        .kitchen-city-process h2,
        .kitchen-city-process h3 {
          color: #ffffff;
        }
        .brand-mask {
          -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
          mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
        }
        .brand-track {
          animation: kitchen-city-brand-scroll 32s linear infinite;
        }
        .brand-track:hover {
          animation-play-state: paused;
        }
        @keyframes kitchen-city-brand-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .brand-track {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}

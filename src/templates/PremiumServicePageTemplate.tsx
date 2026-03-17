"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, CalendarDays, Check, ChevronDown, Droplets, FileText, Grid2x2, Hammer, House, Paintbrush, RectangleHorizontal, Shield, ShieldCheck, Star, Upload, Wrench, Zap } from "lucide-react";
import type { CMSPage } from "@/types/cms";

type RichTextData = {
  eyebrow?: string | null;
  title?: string | null;
  highlight_text?: string | null;
  content?: string | null;
  style_variant?: string | null;
  surface?: string | null;
  cta?: { label?: string; url?: string } | null;
};

const FALLBACK_MEDIA: Record<string, string> = {
  "/hero/builtwell-team-van-consultation-hero-ct.jpg": "/portfolio/builtwell-team-client-arrival-ct.jpeg",
  "/team/builtwell-owner-handshake-client-ct-02.jpg": "/portfolio/builtwell-contractor-sign-consultation-ct-01.jpg",
  "/hero/builtwell-job-site-aerial-hero-ct.jpg": "/portfolio/builtwell-job-site-aerial-ct.jpg",
  "/services/bathroom-remodeling-ct.jpg": "/images/services/bathroom-remodel-new.jpg",
  "/services/kitchen-remodeling-ct.jpg": "/images/services/service-kitchen.jpg",
  "/services/flooring-installation-ct.jpg": "/images/services/service-flooring.png",
  "/services/comfort-accessibility-ct.jpg": "/images/services/comfort-accessibility.jpg",
  "/services/attic-conversions-ct.jpg": "/images/services/attic-empty.jpg",
  "/services/basement-finishing-ct.jpg": "/images/services/basement-finish-real.jpeg",
  "/services/decks-porches-ct.jpg": "/images/services/deck-real.jpg",
  "/services/design-planning-ct.jpg": "/images/services/remodeling-design.png",
  "/services/interior-carpentry-ct.jpg": "/images/services/interior-carpentry-final.jpeg",
  "/services/interior-painting-ct.jpg": "/images/services/interior-painting-new.jpg",
  "/services/home-additions-ct.jpg": "/portfolio/home-remodeling-contractor-tour-ct.png",
  "/images/headers/attic-conversions-header.jpg": "/images/headers/attic-conversions-header.jpg",
  "/images/headers/basement-finishing-header.jpg": "/images/headers/basement-finishing-header.jpg",
  "/images/headers/comfort-accessibility-header.jpg": "/images/headers/comfort-accessibility-header.jpg",
  "/images/headers/decks-porches-header.jpg": "/images/headers/decks-porches-header.jpg",
  "/images/headers/design-planning-header.jpg": "/images/headers/design-planning-header.jpg",
  "/images/headers/flooring-header.jpg": "/images/headers/flooring-header.jpg",
  "/images/headers/home-additions-header.jpg": "/images/headers/home-additions-header.jpg",
  "/images/headers/interior-carpentry-header.jpg": "/images/headers/interior-carpentry-header.jpg",
  "/images/headers/interior-painting-header.jpg": "/images/headers/interior-painting-header.jpg",
  "/images/before-after/bathroom-renovation-1.jpg": "/images/services/bathroom-remodel-new.jpg",
  "/images/before-after/bathroom-renovation-1.png": "/portfolio/builtwell-team-completed-interior-ct.png",
  "/images/before-after/bathroom-renovation-2.jpg": "/portfolio/builtwell-team-interior-inspection-ct.jpg",
  "/images/before-after/bathroom-renovation-2.png": "/portfolio/builtwell-contractor-client-consultation-ct.jpeg",
  "/images/before-after/bathroom-renovation-3.jpg": "/portfolio/builtwell-contractor-handshake-arrival-ct-optimized.jpg",
  "/images/before-after/bathroom-renovation-3.png": "/portfolio/builtwell-owner-portrait-van-ct.jpg",
  "/images/before-after/basement-renovation-1.jpg": "/images/services/basement-finish-real.jpeg",
  "/images/before-after/basement-renovation-1.png": "/portfolio/builtwell-team-completed-interior-ct.png",
  "/images/before-after/basement-renovation-2.jpg": "/portfolio/builtwell-team-interior-inspection-ct.jpg",
  "/images/before-after/basement-renovation-2.png": "/portfolio/builtwell-contractor-client-consultation-ct.jpeg",
  "/images/before-after/basement-renovation-3.jpg": "/portfolio/home-remodeling-contractor-tour-ct.png",
  "/images/before-after/basement-renovation-3.png": "/portfolio/builtwell-owner-portrait-van-ct.jpg",
};

const cls = (...values: Array<string | false | null | undefined>) => values.filter(Boolean).join(" ");
const section = <T,>(page: CMSPage, type: string) => page.sections.find((entry) => entry.is_active && entry.type === type)?.data as T | undefined;
const sections = <T,>(page: CMSPage, type: string) => page.sections.filter((entry) => entry.is_active && entry.type === type).map((entry) => entry.data as T);
const media = (value?: string | null, fallback = "") => {
  const source = value || "";

  if (!source) {
    return fallback;
  }

  try {
    const normalized = source.startsWith("http") ? new URL(source).pathname : source;
    return FALLBACK_MEDIA[source] || FALLBACK_MEDIA[normalized] || source || fallback;
  } catch {
    return FALLBACK_MEDIA[source] || source || fallback;
  }
};
const paras = (value?: string | null) => (value || "").replace(/\r/g, "").split(/\n{2,}/).map((item) => item.trim()).filter(Boolean);
const opts = (value?: Array<string | { label: string; value: string }> | null) => (value || []).map((item) => typeof item === "string" ? { label: item, value: item } : item);

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
    <a href={href} className={className} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noreferrer" : undefined}>{children}</a>
  ) : (
    <Link href={href} className={className}>{children}</Link>
  );
}

function iconNode(icon?: string | null, className = "h-5 w-5") {
  switch (icon) {
    case "star":
      return <Star className={className} />;
    case "shield":
      return <Shield className={className} />;
    case "shield-check":
      return <ShieldCheck className={className} />;
    case "calendar":
    case "clock":
      return <CalendarDays className={className} />;
    case "hammer":
      return <Hammer className={className} />;
    case "file-text":
      return <FileText className={className} />;
    default:
      return <Check className={className} />;
  }
}

function introIcon(title?: string | null) {
  switch ((title || "").toLowerCase()) {
    case "structural assessment":
    case "space assessment":
    case "budget development":
    case "permit research":
    case "design documentation":
      return <FileText className="h-6 w-6" />;
    case "joist reinforcement":
    case "grab bars and rails":
    case "ramp installation":
    case "design and layout":
    case "footings and foundation":
    case "railings and stairs":
    case "contractor coordination":
      return <Hammer className="h-6 w-6" />;
    case "insulation & air sealing":
      return <Shield className="h-6 w-6" />;
    case "egress & dormers":
    case "wider doorways":
    case "first-floor living":
      return <House className="h-6 w-6" />;
    case "hvac & mini-split":
      return <CalendarDays className="h-6 w-6" />;
    case "demolition":
    case "removal & disposal":
    case "surface prep":
      return <Wrench className="h-6 w-6" />;
    case "waterproofing":
    case "moisture assessment":
    case "final walkthrough":
      return <Shield className="h-6 w-6" />;
    case "tile work":
    case "wall treatments":
      return <Grid2x2 className="h-6 w-6" />;
    case "plumbing":
      return <Droplets className="h-6 w-6" />;
    case "electrical":
      return <Zap className="h-6 w-6" />;
    case "vanity & countertop":
      return <RectangleHorizontal className="h-6 w-6" />;
    case "ventilation":
      return <CalendarDays className="h-6 w-6" />;
    case "permits & finish":
    case "foundation":
    case "egress windows":
      return <House className="h-6 w-6" />;
    case "framing":
    case "installation":
    case "custom built-ins":
    case "fireplace surrounds":
      return <Hammer className="h-6 w-6" />;
    case "subfloor assessment":
    case "underlayment":
    case "transitions":
    case "base shoe/molding":
    case "furniture moving":
    case "flooring & drywall":
    case "non-slip flooring":
    case "decking and boards":
    case "floor covering":
    case "flooring":
      return <RectangleHorizontal className="h-6 w-6" />;
    case "roofing":
    case "roofing (porches)":
    case "siding and windows":
      return <House className="h-6 w-6" />;
    case "plumbing and hvac":
      return <Droplets className="h-6 w-6" />;
    case "insulation":
    case "insulation and drywall":
    case "drywall and ceiling":
      return <FileText className="h-6 w-6" />;
    case "trim and finishes":
    case "trim and casing":
    case "window seats":
    case "coffered ceilings":
    case "stair railings":
    case "closet systems":
    case "lever hardware":
    case "finish & trim":
      return <House className="h-6 w-6" />;
    case "priming":
    case "wall painting":
    case "walk-in showers":
    case "lighting upgrades":
    case "electrical and lighting":
    case "staining and sealing":
    case "material selection":
    case "timeline planning":
    case "trim and door painting":
    case "daily cleanup":
      return <Paintbrush className="h-6 w-6" />;
    case "layout planning":
      return <Grid2x2 className="h-6 w-6" />;
    default:
      return <Check className="h-6 w-6" />;
  }
}

const INTRO_CARD_COPY: Record<string, string> = {
  Demolition: "Full removal of existing tile, fixtures, vanity, and flooring. Subfloor and framing inspection before any new work begins.",
  Waterproofing: "Membrane systems behind all shower and tub tile. Cement board in wet areas as standard practice.",
  "Tile Work": "Floor and wall tile installation with proper substrate preparation and grout finishing.",
  Plumbing: "All fixture connections, drain lines, supply lines, and shower valve installation. Relocated lines as needed.",
  Electrical: "Updated lighting, GFCI outlets, exhaust fan installation, and new circuits as required by code.",
  "Vanity & Countertop": "Vanity installation with countertop, faucet, and mirror. Stock, semi-custom, or custom options available.",
  Ventilation: "Properly sized exhaust fan ducted to exterior. We correct improperly vented fans found during demolition.",
  "Permits & Finish": "All permit applications, inspection coordination, interior painting, drywall patching, and final walkthrough.",
  "Moisture Assessment": "We evaluate moisture conditions, wall seepage, and slab readiness before any basement finishing work begins.",
  Framing: "Layout framing for walls, soffits, storage, and finished spaces sized around how the area will actually be used.",
  Insulation: "Insulation selected for comfort, energy performance, and basement-specific conditions in Connecticut homes.",
  "Drywall and Ceiling": "Hanging, taping, finishing, and ceiling work completed after framing, insulation, and rough-ins are in place.",
  Flooring: "Durable flooring installed for the room use, traffic level, and moisture conditions in the finished space.",
  "Egress Windows": "Code-compliant egress openings added where a legal bedroom or safer basement exit is required.",
  "Subfloor Assessment": "We check flatness, structure, and moisture conditions before recommending the right flooring system.",
  "Removal & Disposal": "Existing flooring, fasteners, and debris are removed before the new installation begins.",
  Underlayment: "The correct underlayment or sound-control layer is installed based on the flooring type and room conditions.",
  Installation: "Layout, cutting, fastening, and finish details are handled carefully so the floor looks clean and performs long term.",
  Transitions: "Reducers, thresholds, and flush transitions are installed for a clean room-to-room result.",
  "Base Shoe/Molding": "Trim is reset or installed so the finished flooring looks complete at every perimeter edge.",
  "Furniture Moving": "We coordinate furniture moving and room sequencing so installation stays practical and efficient.",
  "Final Cleanup": "Dust, scraps, and packaging are removed and the space is left ready for walkthrough and use.",
  Foundation: "Excavation, footings, and foundation work coordinated correctly to support the new addition from the start.",
  Roofing: "Roof framing, sheathing, flashing, and tie-ins built to integrate cleanly with the existing structure.",
  "Siding and Windows": "Exterior finishes and windows are selected and installed to match the existing home as closely as possible.",
  "Plumbing and HVAC": "Mechanical systems are extended or upgraded wherever the new space needs heating, cooling, water, or drainage.",
  "Insulation and Drywall": "Envelope insulation and drywall work complete the shell once structural and mechanical rough-ins are done.",
  "Trim and Finishes": "Interior doors, trim, flooring, paint, fixtures, and final details bring the addition together.",
  "Trim and Casing": "Baseboard, door casing, window trim, and full trim packages installed cleanly and consistently.",
  "Wall Treatments": "Wainscoting, board and batten, panel molding, and decorative wall details built for scale and balance.",
  "Custom Built-Ins": "Shelving, media walls, libraries, and storage solutions sized to the room and built for daily use.",
  "Window Seats": "Bench seating and storage built into the window opening with proportions that fit the space.",
  "Coffered Ceilings": "Decorative ceiling layouts framed and finished to elevate the room without feeling out of scale.",
  "Fireplace Surrounds": "Mantels, trim, cladding, and focal wall details designed to match the room and existing home style.",
  "Stair Railings": "Railings, trim, and detail work installed to improve safety while matching the surrounding interior.",
  "Closet Systems": "Shelving, hanging, drawers, and millwork details tailored to the way the closet will be used.",
  "Surface Prep": "Walls, trim, and doors are patched, sanded, caulked, and protected before paint is applied.",
  "Structural Assessment": "We assess framing, headroom, access, and existing conditions to confirm whether the attic can be converted properly.",
  "Joist Reinforcement": "Floor framing is strengthened where needed so the new living space performs safely under real use.",
  "Insulation & Air Sealing": "Roof slopes, knee walls, and transitions are insulated and sealed to improve comfort and energy performance.",
  "Egress & Dormers": "We plan egress windows, stair access, and dormer changes when the attic needs more code-compliant headroom or safer exits.",
  "HVAC & Mini-Split": "Heating and cooling are extended or added so the finished attic stays usable year-round.",
  "Flooring & Drywall": "Drywall, flooring, and ceiling finishes are installed once structure, insulation, and rough-ins are complete.",
  "Finish & Trim": "Doors, casing, base, paint, and final details turn the attic into a finished living space instead of overflow storage.",
  "Grab Bars and Rails": "Support hardware is installed where stability matters most, with proper backing and clean, durable placement.",
  "Walk-In Showers": "Shower conversions improve access, reduce thresholds, and make everyday bathing safer and easier.",
  "Wider Doorways": "Openings are widened where needed to improve circulation, accessibility, and room-to-room movement.",
  "Ramp Installation": "Entry conditions are evaluated so ramps fit the site, meet practical slope requirements, and feel integrated with the home.",
  "Non-Slip Flooring": "Flooring selections are made for traction, clean transitions, and easier movement through wet or high-use areas.",
  "Lever Hardware": "Lever handles and easier-operating hardware improve usability throughout the home without major disruption.",
  "Lighting Upgrades": "Lighting is improved where visibility and safer movement matter most, especially in bathrooms, halls, and entries.",
  "First-Floor Living": "We adapt layouts to bring key daily-use spaces onto the first floor when stairs become less practical.",
  "Design and Layout": "We plan the footprint, traffic flow, and relationship to the yard before construction begins.",
  "Footings and Foundation": "The structure starts with the right footing depth, layout, and support for long-term outdoor performance.",
  "Decking and Boards": "Deck surfaces are installed with proper spacing, fastening, and alignment for a clean finished result.",
  "Railings and Stairs": "Railings, guard systems, and stairs are built for safety, code compliance, and a cohesive outdoor look.",
  "Roofing (Porches)": "Covered porches include roof framing, waterproofing details, and tie-ins that work with the existing house.",
  "Electrical and Lighting": "We coordinate outlets, exterior lighting, fans, and convenience features where the new outdoor space needs them.",
  "Staining and Sealing": "Wood protection and finish coats are applied when the material requires it for long-term durability and appearance.",
  "Space Assessment": "We document the existing house, identify constraints, and establish what the remodeling plan needs to solve first.",
  "Layout Planning": "Room arrangement, circulation, and functional adjacencies are worked through before any construction begins.",
  "Material Selection": "Fixtures, finishes, and product choices are organized early so the budget and scope stay aligned.",
  "Budget Development": "We define realistic cost ranges and decision points so the plan matches the project goals from the start.",
  "Permit Research": "Permit and zoning requirements are reviewed early so the planning package reflects real municipal expectations.",
  "Timeline Planning": "The project is sequenced around selections, permits, lead times, and the practical order of construction.",
  "Contractor Coordination": "Trades, consultants, and installation assumptions are aligned before field work starts.",
  "Design Documentation": "The planning package is assembled into clear scope notes, drawings, and decision records that can guide the build.",
  Priming: "Primer is applied where needed for adhesion, stain blocking, and an even final finish color.",
  "Wall Painting": "Walls are cut in and rolled with clean lines, even coverage, and the specified number of finish coats.",
  "Trim and Door Painting": "Doors, casings, baseboards, crown, and detail trim are painted with the right finish for each surface.",
  "Furniture Protection": "Furniture, fixtures, and adjacent surfaces are carefully moved, masked, or covered before work starts.",
  "Floor Covering": "Floors are fully protected during prep and painting so the home stays clean and damage-free.",
  "Daily Cleanup": "We keep the jobsite orderly each day so occupied homes remain workable throughout the project.",
  "Final Walkthrough": "Every painted surface is reviewed with you at the end so touchups are handled before closeout.",
};

export function PremiumServicePageTemplate({ page }: { page: CMSPage }) {
  const hero = section<any>(page, "service_hero");
  const trustBars = sections<any>(page, "trust_bar");
  const overview = sections<RichTextData>(page, "rich_text").find((item) => item.title?.includes("Full-Service"));
  const localExpertise = sections<RichTextData>(page, "rich_text").find((item) => item.title?.includes("Local Expertise"));
  const financing = sections<RichTextData>(page, "rich_text").find((item) => item.style_variant === "financing_strip");
  const intro = section<any>(page, "service_intro_split");
  const caseStudies = section<any>(page, "before_after_grid");
  const pricing = section<any>(page, "pricing_table");
  const process = section<any>(page, "process_steps");
  const timeline = section<any>(page, "feature_grid");
  const areas = section<any>(page, "areas_served");
  const faq = section<any>(page, "faq_list");
  const brands = section<any>(page, "logo_strip");
  const lead = section<any>(page, "lead_form");
  const related = section<any>(page, "project_highlights");
  const heroStats = trustBars[0];
  const trustStrip = trustBars[1];
  const slug = page.slug?.replace(/^\/+|\/+$/g, "") || "";
  const serviceName = (hero?.title || page.seo?.title || "").replace(/\s+in\s+connecticut$/i, "").replace(/\s+\|\s+.*$/, "").trim();
  const heroParts = parts(hero?.title, "Connecticut");
  const overviewParts = parts(overview?.title, overview?.highlight_text || "Across Connecticut");
  const introHighlight = /\ba\s+/i.test(intro?.title || "") ? (intro?.title || "").split(/\ba\s+/i).slice(1).join("a ").trim() : "";
  const introParts = parts(intro?.title, introHighlight);
  const pricingParts = parts(pricing?.title, "Connecticut");
  const localParts = parts(localExpertise?.title, localExpertise?.highlight_text || "Local Expertise");
  const areasParts = parts(areas?.title, areas?.highlight_text || "Two Counties");
  const leadParts = parts(lead?.title, lead?.title_highlight || "Remodeling Project");

  const [activeStep, setActiveStep] = useState(0);
  const [countyOpen, setCountyOpen] = useState<Record<number, boolean>>({});
  const [serviceOpen, setServiceOpen] = useState(false);
  const [pickedServices, setPickedServices] = useState<string[]>([]);
  const [formValues, setFormValues] = useState<Record<string, string>>({ contact_method: "call" });
  const [fileNames, setFileNames] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const fields = lead?.fields || [];
  const topFields = fields.filter((field: any) => !["checkbox_group", "radio_group", "textarea", "file"].includes(field.type));
  const servicesField = fields.find((field: any) => field.type === "checkbox_group");
  const timeField = fields.find((field: any) => field.type === "select");
  const contactField = fields.find((field: any) => field.type === "radio_group");
  const messageField = fields.find((field: any) => field.type === "textarea");
  const counties = areas?.counties || [];

  return (
    <div className="bg-[#f5f1e9] text-[#1e2b43]">
      <section className="relative isolate min-h-[620px] overflow-hidden bg-[#151e30] px-5 pb-20 pt-[88px] text-white md:px-10 md:pb-24">
        <div className="absolute inset-0 bg-cover bg-center opacity-[0.78]" style={{ backgroundImage: `url(${media(hero?.background_image, "/portfolio/builtwell-team-van-exterior-ct-01.jpg")})` }} />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,16,28,0.28)_0%,rgba(12,19,33,0.34)_22%,rgba(16,25,42,0.56)_55%,rgba(19,31,52,0.88)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(21,30,48,0.10)_0%,rgba(21,30,48,0.32)_38%,rgba(21,30,48,0.64)_100%)]" />
        <div className="relative z-10 mx-auto flex min-h-[510px] max-w-[1240px] flex-col items-center justify-center text-center">
          <ol className="mb-5 flex list-none items-center justify-center text-[12px] font-medium text-white/92 [text-shadow:0_1px_3px_rgba(0,0,0,0.35)]">
            <li>{linkNode("/", "Home", "hover:text-[#bc9155]")}</li>
            <li className="before:px-2.5 before:text-[#bc9155] before:content-['›']">{linkNode("/services/", "Services", "hover:text-[#bc9155]")}</li>
            <li className="before:px-2.5 before:text-[#bc9155] before:content-['›']"><span className="text-white">{serviceName || "Service"}</span></li>
          </ol>
          <div className="mx-auto max-w-[900px]">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#bc91554d] bg-[#bc91551a] px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#e4bf8e]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#bc9155]" />
              Connecticut Remodeling Services
            </div>
            <h1 className="text-[clamp(42px,5.2vw,62px)] font-bold leading-[1.04] tracking-[-0.028em] [text-shadow:0_3px_18px_rgba(0,0,0,0.35)]">
              <span className="text-white">{heroParts.before}</span>
              {heroParts.accent ? <span className="text-[#bc9155]">{heroParts.accent}</span> : null}
              <span className="text-white">{heroParts.after}</span>
            </h1>
            {hero?.subtitle ? <p className="mx-auto mt-6 max-w-[690px] text-[16px] leading-[1.72] text-white/90 [text-shadow:0_2px_12px_rgba(0,0,0,0.28)] md:text-[17px]">{hero.subtitle}</p> : null}
            <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
              {counties.slice(0, 2).map((county: any, index: number) => (
                <div key={`${county.name || county.phone || "county"}-${index}`}>
                  {linkNode(`tel:${(county.phone || "").replace(/\D/g, "")}`, <span className="flex flex-col items-start text-left"><span className="text-[11px] uppercase tracking-[0.18em] text-white/75">{county.name}</span><span className="text-[15px] font-semibold text-white">{county.phone}</span></span>, "min-w-[156px] rounded-[8px] border border-white/18 bg-[rgba(255,255,255,0.12)] px-5 py-3.5 shadow-[0_12px_28px_rgba(8,12,20,0.18)] backdrop-blur-md transition-colors hover:border-[#bc9155] hover:bg-[rgba(255,255,255,0.16)]")}
                </div>
              ))}
              {hero?.primary_cta?.url ? linkNode(hero.primary_cta.url, <span className="flex min-h-[54px] items-center justify-center text-[14px] font-semibold text-white">{hero.primary_cta.label || "Schedule a Free Consultation"}</span>, "min-w-[228px] rounded-[8px] bg-[#bc9155] px-7 shadow-[0_18px_32px_rgba(17,24,39,0.24)] transition-all hover:-translate-y-0.5 hover:bg-[#a57d48]") : null}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#1d283f]">
        <div className="mx-auto grid max-w-full gap-px bg-white/10 md:grid-cols-4">
          {(heroStats?.items || []).map((item: any, index: number) => (
            <div key={`${item.label}-${index}`} className="flex min-h-[118px] flex-col items-center justify-center bg-[#1d283f] px-5 text-center">
              <div className="text-[34px] font-bold text-[#bc9155]">{item.value || <span className="inline-flex rounded-full border border-[#bc9155] p-2 text-[#bc9155]">{iconNode(item.icon, "h-5 w-5")}</span>}</div>
              <div className="mt-2 text-[13px] font-semibold uppercase tracking-[0.12em] text-white/75">{item.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white px-5 py-24 md:px-10">
        <div className="mx-auto max-w-[980px] text-center">
          {label(overview?.eyebrow)}
          <h2 className="text-[clamp(34px,3.8vw,48px)] font-bold leading-[1.12] tracking-[-0.02em]">{overviewParts.before}{overviewParts.accent ? <span className="text-[#bc9155]">{overviewParts.accent}</span> : null}{overviewParts.after}</h2>
          <div className="mt-6 space-y-5 text-[15px] leading-[1.85] text-[#5c677d] md:text-[16px]">
            {paras(overview?.content).map((paragraph) => <p key={paragraph.slice(0, 30)}>{paragraph}</p>)}
          </div>
        </div>
      </section>

      <section className="bg-[#f5f1e9] px-5 py-24 md:px-10">
        <div className="mx-auto max-w-[1240px]">
          <div className="mb-12 text-center">
            {label("Scope of Work")}
            <h2 className="text-[clamp(34px,3.8vw,48px)] font-bold leading-[1.12] tracking-[-0.02em]">{introParts.before}{introParts.accent ? <span className="text-[#bc9155]">{introParts.accent}</span> : null}{introParts.after}</h2>
          </div>
          <div className="grid gap-8 lg:grid-cols-[1fr_1.08fr] lg:items-start">
            <div className="grid gap-3">
              <div className="overflow-hidden rounded-[10px] bg-white shadow-[0_16px_38px_rgba(30,43,67,0.1)]">
                <img src={media(intro?.image_main, "/portfolio/builtwell-team-completed-interior-ct.png")} alt={`${serviceName || "Service"} project`} className="h-[272px] w-full object-cover md:h-[298px]" />
              </div>
              <div className="overflow-hidden rounded-[10px] bg-white shadow-[0_16px_38px_rgba(30,43,67,0.1)]">
                <img src={media(intro?.image_secondary, "/portfolio/builtwell-contractor-sign-consultation-ct-01.jpg")} alt={`${serviceName || "Service"} consultation`} className="h-[272px] w-full object-cover md:h-[298px]" />
              </div>
            </div>
            <div className="rounded-[12px] border border-[#e4dac9] bg-white px-6 py-8 shadow-[0_20px_46px_rgba(30,43,67,0.1)] md:px-8">
              <div className="space-y-6 text-[14px] leading-[1.9] text-[#5c677d] md:text-[15px]">
                {paras(intro?.content).map((paragraph) => <p key={paragraph.slice(0, 30)}>{paragraph}</p>)}
              </div>
            </div>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {(intro?.bullet_points || []).map((item: any, index: number) => (
              <article key={`${item.text}-${index}`} className="flex min-h-[278px] flex-col items-center rounded-[12px] border border-[#e6ddcf] bg-white px-7 py-8 text-center shadow-[0_14px_32px_rgba(30,43,67,0.06)]">
                <div className="mb-5 inline-flex h-[58px] w-[58px] items-center justify-center rounded-full bg-[#f6f0e8] text-[#bc9155]">
                  {introIcon(item.text)}
                </div>
                <h3 className="text-[18px] font-bold leading-[1.2] text-[#1e2b43] md:text-[19px]">{item.text}</h3>
                <p className="mt-4 max-w-[250px] text-[14px] leading-[1.75] text-[#5c677d]">
                  {INTRO_CARD_COPY[item.text] || `Included as part of a full-scope ${serviceName.toLowerCase() || "home improvement"} project.`}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-24 md:px-10">
        <div className="mx-auto max-w-[1240px]">
          <div className="mb-12 text-center">
            {label("Recent Work")}
            <h2 className="text-[clamp(34px,3.8vw,48px)] font-bold tracking-[-0.02em]">{parts(caseStudies?.title, "Projects").before}{parts(caseStudies?.title, "Projects").accent ? <span className="text-[#bc9155]">{parts(caseStudies?.title, "Projects").accent}</span> : null}{parts(caseStudies?.title, "Projects").after}</h2>
            {caseStudies?.subtitle ? <p className="mx-auto mt-3 max-w-[680px] text-[15px] leading-[1.8] text-[#5c677d]">{caseStudies.subtitle}</p> : null}
          </div>
          <div className="grid gap-7 lg:grid-cols-3">
            {(caseStudies?.projects || []).map((project: any, index: number) => (
              <article key={`${project.location}-${index}`} className="overflow-hidden rounded-[12px] border border-[#e6dece] bg-[#fdfcfa] shadow-[0_14px_32px_rgba(30,43,67,0.08)]">
                <div className="relative grid h-[240px] grid-cols-2 overflow-hidden">
                  <img src={media(project.before_image, "/portfolio/builtwell-team-interior-inspection-ct.jpg")} alt={`${project.location} before`} className="h-full w-full object-cover" />
                  <img src={media(project.after_image, "/portfolio/builtwell-team-completed-interior-ct.png")} alt={`${project.location} after`} className="h-full w-full object-cover" />
                  <span className="absolute left-3 top-3 rounded-full bg-[#1e2b43] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-white">Before</span>
                  <span className="absolute right-3 top-3 rounded-full bg-[#bc9155] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-white">After</span>
                </div>
                <div className="p-6">
                  <h3 className="text-[24px] font-bold">{project.location}</h3>
                  <p className="mt-3 text-[14px] leading-[1.78] text-[#5c677d]">{project.description}</p>
                  {project.testimonial_quote ? <p className="mt-5 rounded-[10px] bg-white px-4 py-4 text-[14px] italic leading-[1.75] text-[#1e2b43] shadow-[inset_0_0_0_1px_rgba(30,43,67,0.06)]">{project.testimonial_quote}</p> : null}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f5f1e9] px-5 py-24 md:px-10">
        <div className="mx-auto max-w-[980px]">
          <div className="mb-10 text-center">
            {label("Investment")}
            <h2 className="text-[clamp(34px,3.8vw,48px)] font-bold tracking-[-0.02em]">{pricingParts.before}{pricingParts.accent ? <span className="text-[#bc9155]">{pricingParts.accent}</span> : null}{pricingParts.after}</h2>
            {pricing?.subtitle ? <p className="mx-auto mt-3 max-w-[760px] text-[15px] leading-[1.8] text-[#5c677d]">{pricing.subtitle}</p> : null}
          </div>
          <div className="overflow-hidden rounded-[12px] border border-[#ddd2bf] bg-white shadow-[0_16px_36px_rgba(30,43,67,0.07)]">
            <table className="w-full border-collapse text-left">
              <thead className="bg-[#1e2b43] text-white">
                <tr>{(pricing?.columns || []).map((column: string) => <th key={column} className="px-5 py-4 text-[13px] uppercase tracking-[0.14em]">{column}</th>)}</tr>
              </thead>
              <tbody>
                {(pricing?.rows || []).map((row: any, index: number) => (
                  <tr key={`${row.label}-${index}`} className="border-t border-[#ece4d4] align-top">
                    <td className="px-5 py-4 text-[15px] font-semibold">{row.label}</td>
                    <td className="px-5 py-4 text-[15px] font-semibold text-[#bc9155]">{row.price}</td>
                    <td className="px-5 py-4 text-[14px] leading-[1.7] text-[#5c677d]">{row.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-5 text-center text-[13px] italic text-[#5c677d]">All prices include labor and materials. Final cost depends on scope, selections, and site conditions.</p>
        </div>
      </section>

      <section className="bg-[#1c263b] px-5 py-24 text-white md:px-10">
        <div className="mx-auto max-w-[1080px]">
          <div className="mb-10 text-center">
            {label(localExpertise?.eyebrow, true)}
            <h2 className="text-[clamp(34px,3.8vw,48px)] font-bold tracking-[-0.02em]">{localParts.before}{localParts.accent ? <span className="text-[#bc9155]">{localParts.accent}</span> : null}{localParts.after}</h2>
          </div>
          <div className="space-y-5 text-[15px] leading-[1.9] text-white/72">
            {paras(localExpertise?.content).map((paragraph) => <p key={paragraph.slice(0, 30)}>{paragraph}</p>)}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#142033] px-5 py-24 text-white md:px-10">
        <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: `url(${media("/hero/builtwell-job-site-aerial-hero-ct.jpg")})` }} />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(15,23,39,0.95)_0%,rgba(29,41,65,0.88)_100%)]" />
        <div className="relative z-10 mx-auto max-w-[1240px]">
          <div className="mb-10 text-center">
            {label("Our Process", true)}
            <h2 className="text-[clamp(34px,3.8vw,48px)] font-bold tracking-[-0.02em]">{parts(process?.title, "Process").before}{parts(process?.title, "Process").accent ? <span className="text-[#bc9155]">{parts(process?.title, "Process").accent}</span> : null}{parts(process?.title, "Process").after}</h2>
            {process?.subtitle ? <p className="mx-auto mt-3 max-w-[760px] text-[15px] leading-[1.8] text-white/72">{process.subtitle}</p> : null}
          </div>
          <div className="grid gap-4 xl:grid-cols-6">
            {(process?.steps || []).map((item: any, index: number) => {
              const active = activeStep === index;
              return (
                <button key={`${item.title}-${index}`} type="button" onClick={() => setActiveStep(index)} className={cls("rounded-[12px] border px-5 py-6 text-left transition-all xl:min-h-[250px]", active ? "border-[#bc9155] bg-[#bc91551c] shadow-[0_18px_36px_rgba(0,0,0,0.14)]" : "border-white/10 bg-white/5 hover:border-[#bc915555] hover:bg-white/[0.07]")}>
                  <div className={cls("mb-4 flex h-12 w-12 items-center justify-center rounded-full border-2 text-[18px] font-bold", active ? "border-[#bc9155] bg-[#bc91551c] text-[#f0d9b6]" : "border-white/20 text-white")}>{index + 1}</div>
                  <h3 className="text-[20px] font-bold text-white">{item.title}</h3>
                  <p className="mt-2 text-[13px] font-semibold uppercase tracking-[0.14em] text-[#bc9155]">{item.short}</p>
                  <p className="mt-4 text-[14px] leading-[1.72] text-white/72">{item.description}</p>
                </button>
              );
            })}
            <div className="rounded-[12px] border border-[#bc915555] bg-[#bc91551a] px-5 py-6 shadow-[0_18px_36px_rgba(0,0,0,0.12)]">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#bc9155] text-white"><ArrowRight className="h-5 w-5" /></div>
              <h3 className="text-[20px] font-bold">Get Started</h3>
              <p className="mt-4 text-[14px] leading-[1.72] text-white/72">Ready to begin? Schedule your free consultation today.</p>
              {linkNode("#contact", "Free Consultation", "mt-6 inline-flex rounded-[8px] bg-[#bc9155] px-4 py-3 text-[13px] font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-[#a57d48]")}
            </div>
          </div>
          <p className="mt-6 text-center text-[13px] text-white/45">Click any step to learn more</p>
        </div>
      </section>

      <section className="bg-[#f5f1e9] px-5 py-24 md:px-10">
        <div className="mx-auto max-w-[1240px]">
          <div className="mb-10 text-center">
            {label("Timeline")}
            <h2 className="text-[clamp(34px,3.8vw,48px)] font-bold tracking-[-0.02em]">Project <span className="text-[#bc9155]">Timeline</span></h2>
            {timeline?.subtitle ? <p className="mx-auto mt-3 max-w-[680px] text-[15px] leading-[1.8] text-[#5c677d]">{timeline.subtitle}</p> : null}
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {(timeline?.items || []).map((item: any, index: number) => (
              <article key={`${item.title}-${index}`} className="rounded-[12px] border border-[#e4d9c8] bg-white p-6 shadow-[0_12px_26px_rgba(30,43,67,0.06)]">
                <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#bc9155]">Phase {index + 1}</div>
                <h3 className="text-[22px] font-bold">{item.title.replace(/^Phase \d:\s*/, "")}</h3>
                <div className="mt-3 inline-flex rounded-full bg-[#bc915512] px-3 py-1 text-[12px] font-semibold text-[#bc9155]">{item.description.split(".")[0]}</div>
                <p className="mt-4 text-[14px] leading-[1.75] text-[#5c677d]">{item.description}</p>
              </article>
            ))}
          </div>
          <p className="mt-5 text-center text-[13px] italic text-[#5c677d]">Timelines vary based on project scope, material lead times, and permit requirements.</p>
        </div>
      </section>

      <section className="bg-white px-5 py-24 md:px-10">
        <div className="mx-auto max-w-[1240px]">
          <div className="mb-10 text-center">
            {label(areas?.eyebrow)}
            <h2 className="text-[clamp(34px,3.8vw,48px)] font-bold tracking-[-0.02em]">{areasParts.before}{areasParts.accent ? <span className="text-[#bc9155]">{areasParts.accent}</span> : null}{areasParts.after}</h2>
            {areas?.subtitle ? <p className="mx-auto mt-3 max-w-[720px] text-[15px] leading-[1.8] text-[#5c677d]">{areas.subtitle}</p> : null}
          </div>
          <div className="grid gap-8 lg:grid-cols-2">
            {counties.map((county: any, index: number) => {
              const expanded = !!countyOpen[index];
              const towns = expanded ? [...(county.towns || []), ...(county.extra_towns || [])] : county.towns || [];
              const links = county.town_links || {};
              return (
                <article key={`${county.name}-${index}`} className="overflow-hidden rounded-[12px] border border-[#e6ddcd] bg-[#fdfcfa] shadow-[0_14px_32px_rgba(30,43,67,0.07)]">
                  <div className="relative h-[230px] overflow-hidden">
                    <img src={media(county.image, index === 0 ? "/images/areas/fairfield-county.jpg" : "/images/areas/new-haven-county.jpg")} alt={county.name} className={cls("h-full w-full object-cover", index === 1 && "object-top")} />
                    <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#1e2b4370] to-transparent" />
                  </div>
                  <div className="p-7">
                    <h3 className="text-[28px] font-bold">{county.name}</h3>
                    <p className="mt-1 text-[15px] text-[#5c677d]">Call: {linkNode(`tel:${(county.phone || "").replace(/\D/g, "")}`, county.phone, "font-semibold text-[#bc9155] hover:underline")}</p>
                    <p className="mt-4 text-[14px] leading-[1.78] text-[#5c677d]">{county.description}</p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {towns.map((town: string, townIndex: number) => (
                        <div key={`${county.name}-${town}-${townIndex}`}>
                          {linkNode(links[town] || county.url || "#", town, "rounded-full bg-[#f5f1e9] px-3.5 py-2 text-center text-[11px] font-semibold text-[#1e2b43] transition-colors hover:bg-[#bc9155] hover:text-white")}
                        </div>
                      ))}
                    </div>
                    {county.extra_towns?.length ? <button type="button" onClick={() => setCountyOpen((current) => ({ ...current, [index]: !current[index] }))} className="mt-3 text-[13px] font-semibold text-[#bc9155]">{expanded ? "Show Fewer Towns -" : "See All Towns +"}</button> : null}
                    {county.url ? linkNode(county.url, <><span>{county.cta_label || `Learn more about ${county.name}`}</span><ArrowRight className="h-4 w-4" /></>, "mt-5 inline-flex items-center gap-2 text-[14px] font-semibold text-[#bc9155] transition-all hover:gap-3") : null}
                  </div>
                </article>
              );
            })}
          </div>
          <p className="mt-6 text-center text-[14px] text-[#5c677d]">Not sure if we cover your area? {linkNode("/contact/", "Contact our Connecticut remodeling team", "font-semibold text-[#bc9155]")} and we&apos;ll let you know.</p>
        </div>
      </section>

      <section className="bg-[#f5f1e9] px-5 py-24 md:px-10">
        <div className="mx-auto max-w-[980px]">
          <div className="mb-10 text-center">
            {label("FAQ")}
            <h2 className="text-[clamp(34px,3.8vw,48px)] font-bold tracking-[-0.02em]">{parts(faq?.title, faq?.title?.includes("Questions") ? "Questions" : "Connecticut").before}{parts(faq?.title, faq?.title?.includes("Questions") ? "Questions" : "Connecticut").accent ? <span className="text-[#bc9155]">{parts(faq?.title, faq?.title?.includes("Questions") ? "Questions" : "Connecticut").accent}</span> : null}{parts(faq?.title, faq?.title?.includes("Questions") ? "Questions" : "Connecticut").after}</h2>
          </div>
          <div className="overflow-hidden rounded-[12px] border border-[#e2d7c6] bg-white shadow-[0_16px_36px_rgba(30,43,67,0.06)]">
            {(faq?.items || []).map((item: any, index: number) => (
              <details key={`${item.question}-${index}`} className="group border-t border-[#eee6d7] first:border-t-0">
                <summary className="cursor-pointer list-none px-6 py-5 text-[18px] font-semibold text-[#1e2b43] marker:hidden">{item.question}</summary>
                <div className="px-6 pb-6 text-[15px] leading-[1.8] text-[#5c677d]">{item.answer}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <div className="relative overflow-hidden bg-[linear-gradient(135deg,#1a2438_0%,#1e2b43_50%,#151e30_100%)] px-5 py-12 md:px-10 md:py-14">
        <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-center">
          {(trustStrip?.items || []).map((item: any, index: number) => (
            <div key={`${item.label}-${index}`} className="contents">
              {linkNode(item.url || "#", <div className="flex min-w-[180px] flex-1 flex-col items-center gap-3 px-8 py-5 text-center text-[13px] font-semibold tracking-[0.03em] text-white/90 transition-all hover:text-[#bc9155]"><span className="text-[#bc9155]">{iconNode(item.icon)}</span><span>{[item.label, item.value].filter(Boolean).join(" ")}</span></div>, "flex flex-1 justify-center")}
              {index < (trustStrip?.items || []).length - 1 ? <div className="hidden h-10 w-px bg-white/10 lg:block" /> : null}
            </div>
          ))}
        </div>
      </div>

      <section className="bg-white px-5 py-24 md:px-10">
        <div className="mx-auto max-w-[1240px] text-center">
          {label("Trusted Brands")}
          <h2 className="text-[clamp(34px,3.8vw,48px)] font-bold tracking-[-0.02em]">Materials We <span className="text-[#bc9155]">Stand Behind</span></h2>
          {brands?.subtitle ? <p className="mx-auto mt-3 max-w-[720px] text-[15px] leading-[1.8] text-[#5c677d]">{brands.subtitle}</p> : null}
          <div className="mt-10 grid items-center gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {(brands?.items || []).map((item: any, index: number) => (
              <a key={`${item.name}-${index}`} href={item.url || "#"} target="_blank" rel="noreferrer" className="flex min-h-[96px] items-center justify-center rounded-[12px] border border-[#ebe2d2] bg-[#fbfaf8] px-6 py-5 transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_32px_rgba(30,43,67,0.08)]">
                <img src={media(item.logo, "/logos/builtwell-logo-text-only.png")} alt={item.name} className="max-h-10 w-auto object-contain opacity-90" />
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f5f1e9] px-5 py-24 md:px-10" id="contact">
        <div className="mx-auto max-w-[1200px]">
          <div className="mb-10 text-center">
            {label(lead?.eyebrow)}
            <h2 className="text-[clamp(34px,3.8vw,48px)] font-bold leading-[1.12] tracking-[-0.02em]">{leadParts.before}{leadParts.accent ? <span className="text-[#bc9155]">{leadParts.accent}</span> : null}{leadParts.after}</h2>
            {lead?.subtitle ? <p className="mx-auto mt-3 max-w-[620px] text-[15px] leading-[1.8] text-[#5c677d]">{lead.subtitle}</p> : null}
          </div>
          <div className="grid gap-8 lg:grid-cols-[1fr_1.08fr]">
            <div className="grid gap-3">
              {(lead?.images || []).slice(0, 2).map((image: any, index: number) => <div key={`${image.alt}-${index}`} className="overflow-hidden rounded-[10px] shadow-[0_16px_38px_rgba(30,43,67,0.1)]"><img src={media(image.image, index === 0 ? "/portfolio/builtwell-team-client-arrival-ct.jpeg" : "/portfolio/builtwell-contractor-sign-consultation-ct-01.jpg")} alt={image.alt} className="h-[272px] w-full object-cover md:h-[298px]" /></div>)}
            </div>
            <div className="rounded-[12px] border border-[#e4dac9] bg-white px-6 py-8 shadow-[0_20px_46px_rgba(30,43,67,0.1)] md:px-8">
              {submitted ? <div className="flex min-h-[420px] flex-col items-center justify-center text-center"><h3 className="text-[34px] font-bold">Thank You</h3><p className="mt-3 max-w-[420px] text-[15px] leading-7 text-[#5c677d]">We received your request and will get back to you within one business day.</p></div> : <form onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }} className="flex flex-col">
                <div className="grid gap-4 md:grid-cols-2">
                  {topFields.map((field: any) => <div key={field.name}><label className="mb-1.5 block text-[13px] font-semibold uppercase tracking-[0.04em] text-[#1e2b43]">{field.label}{field.required ? " *" : ""}</label><input type={field.type} required={field.required} value={formValues[field.name] || ""} placeholder={field.placeholder || ""} onChange={(event) => setFormValues((current) => ({ ...current, [field.name]: event.target.value }))} className="w-full rounded-[6px] border border-[#1e2b4326] px-3.5 py-[13px] text-[15px] text-[#1e2b43] outline-none transition-colors focus:border-[#bc9155]" /></div>)}
                </div>
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  {servicesField ? <div className="md:col-span-2 lg:col-span-1"><label className="mb-1.5 block text-[13px] font-semibold uppercase tracking-[0.04em] text-[#1e2b43]">{servicesField.label}{servicesField.required ? " *" : ""}</label><div className="relative"><button type="button" onClick={() => setServiceOpen((current) => !current)} className="flex w-full items-center justify-between rounded-[4px] border border-[#1e2b4326] px-3.5 py-[13px] text-left text-[15px] text-[#1e2b43]"><span className={cls("truncate", pickedServices.length ? "font-medium text-[#1e2b43]" : "text-[#5c677d]")}>{pickedServices.length ? pickedServices.join(", ") : "Select services"}</span><ChevronDown className={cls("h-4 w-4 transition-transform", serviceOpen && "rotate-180")} /></button><div className={cls("absolute left-0 right-0 top-[calc(100%+4px)] z-20 max-h-60 overflow-y-auto rounded-[6px] border border-[#1e2b4326] bg-white py-1 shadow-[0_8px_24px_rgba(0,0,0,0.12)]", serviceOpen ? "block" : "hidden")}>{opts(servicesField.options).map((option) => <label key={option.value} className="flex cursor-pointer items-center gap-2.5 px-3.5 py-2 text-[14px] text-[#1e2b43] transition-colors hover:bg-[#bc91550f]"><input type="checkbox" checked={pickedServices.includes(option.value)} onChange={() => setPickedServices((current) => current.includes(option.value) ? current.filter((value) => value !== option.value) : [...current, option.value])} className="h-[18px] w-[18px] rounded-[3px] accent-[#bc9155]" />{option.label}</label>)}</div></div></div> : null}
                  {timeField ? <div><label className="mb-1.5 block text-[13px] font-semibold uppercase tracking-[0.04em] text-[#1e2b43]">{timeField.label}{timeField.required ? " *" : ""}</label><select required={timeField.required} value={formValues[timeField.name] || ""} onChange={(event) => setFormValues((current) => ({ ...current, [timeField.name]: event.target.value }))} className="w-full rounded-[6px] border border-[#1e2b4326] bg-white px-3.5 py-[13px] text-[15px] text-[#1e2b43] outline-none transition-colors focus:border-[#bc9155]"><option value="">Select a time</option>{opts(timeField.options).map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select></div> : null}
                  {contactField ? <fieldset className="md:col-span-2"><legend className="mb-1.5 block text-[13px] font-semibold uppercase tracking-[0.04em] text-[#1e2b43]">{contactField.label}{contactField.required ? " *" : ""}</legend><div className="flex flex-wrap gap-3 md:flex-nowrap md:justify-start">{opts(contactField.options).map((option) => { const checked = (formValues[contactField.name] || "call") === option.value; return <label key={option.value} className={cls("flex min-h-[50px] min-w-[74px] cursor-pointer items-center justify-center rounded-[6px] border-2 px-5 text-[13px] font-medium transition-colors", checked ? "border-[#bc9155] bg-[#bc91550f] text-[#bc9155]" : "border-[#1e2b431f] bg-white text-[#1e2b43]")}><input type="radio" name={contactField.name} checked={checked} onChange={() => setFormValues((current) => ({ ...current, [contactField.name]: option.value }))} className="hidden" /><span>{option.label}</span></label>; })}</div></fieldset> : null}
                </div>
                {messageField ? <div className="mt-4"><label className="mb-1.5 block text-[13px] font-semibold uppercase tracking-[0.04em] text-[#1e2b43]">{messageField.label}</label><textarea rows={6} value={formValues[messageField.name] || ""} placeholder={messageField.placeholder || ""} onChange={(event) => setFormValues((current) => ({ ...current, [messageField.name]: event.target.value }))} className="min-h-[240px] w-full rounded-[6px] border border-[#1e2b4326] px-3.5 py-3 text-[15px] leading-[1.6] text-[#1e2b43] outline-none transition-colors focus:border-[#bc9155]" /></div> : null}
                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <div><label className="flex min-h-[52px] cursor-pointer items-center justify-center gap-2 rounded-[8px] border border-[#1e2b4326] px-5 py-3 text-[15px] font-semibold text-[#1e2b43] transition-colors hover:border-[#bc9155]" htmlFor={`${slug || "service"}-lead-files`}><Upload className="h-4 w-4" />Upload Photos</label><input id={`${slug || "service"}-lead-files`} type="file" multiple accept="image/jpeg,image/png,image/heic,.heic" className="hidden" onChange={(event) => setFileNames(Array.from(event.target.files || []).map((file) => file.name))} />{fileNames.length ? <p className="mt-2 text-[12px] text-[#5c677d]">{fileNames.join(", ")}</p> : null}</div>
                  <button type="submit" className="min-h-[52px] rounded-[8px] bg-[#bc9155] px-5 py-3 text-[15px] font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-[#a57d48]">{lead?.submit_label || "Send Request"}</button>
                </div>
                <p className="mt-4 text-center text-[13px] italic text-[#5c677d]">{lead?.consent_text}</p>
              </form>}
            </div>
          </div>
        </div>
      </section>

      {financing ? <div className="border-t border-[#1e2b4314] bg-white px-5 py-12 md:px-10 md:py-14"><div className="mx-auto flex max-w-[1200px] flex-col items-center gap-6 text-center md:flex-row md:justify-between md:text-left"><div className="flex flex-col items-center gap-4 md:flex-row"><div className="text-[24px] font-bold tracking-[-0.02em]"><span className="text-[#6bbf4e]">Green</span><span className="text-[#1e2b43]">Sky</span></div><p className="max-w-[760px] text-[16px] leading-[1.6] text-[#5c677d]"><strong className="text-[#1e2b43]">{financing.title}.</strong> {financing.content}</p></div>{financing.cta?.url ? linkNode(financing.cta.url, <><span>{financing.cta.label || "Check Financing Options"}</span><ArrowRight className="h-4 w-4" /></>, "inline-flex min-h-[52px] min-w-[280px] items-center justify-center gap-2 rounded-[8px] bg-[#bc9155] px-8 py-3 text-[15px] font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-[#a57d48]") : null}</div></div> : null}

      <section className="bg-[#f5f1e9] px-5 py-20 md:px-10">
        <div className="mx-auto max-w-[1240px]">
          <div className="mb-10 text-center">
            {label(related?.eyebrow || "Related Services")}
            <h2 className="text-[clamp(34px,3.8vw,48px)] font-bold tracking-[-0.02em]">You May Also <span className="text-[#bc9155]">Need</span></h2>
            <p className="mx-auto mt-3 max-w-[640px] text-[15px] leading-[1.8] text-[#5c677d]">{`Many ${(serviceName || "service").toLowerCase()} projects include or lead to these related services.`}</p>
          </div>
          <div className="grid gap-7 lg:grid-cols-3">
            {(related?.items || []).map((item: any, index: number) => (
              <article key={`${item.title}-${index}`} className="overflow-hidden rounded-[12px] border border-[#e5dac8] bg-white shadow-[0_14px_32px_rgba(30,43,67,0.06)]">
                <div className="h-[220px] overflow-hidden"><img src={media(item.image, "/portfolio/builtwell-team-completed-interior-ct.png")} alt={item.title} className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" /></div>
                <div className="p-6">
                  <h3 className="text-[24px] font-bold">{item.title}</h3>
                  <p className="mt-3 text-[14px] leading-[1.76] text-[#5c677d]">{item.description}</p>
                  {item.url ? linkNode(item.url, <><span>Learn More</span><ArrowRight className="h-4 w-4" /></>, "mt-5 inline-flex items-center gap-2 text-[14px] font-semibold text-[#bc9155] transition-all hover:gap-3") : null}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

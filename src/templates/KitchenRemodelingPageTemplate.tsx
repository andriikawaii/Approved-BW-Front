"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import type { CMSPage } from "@/types/cms";

type KitchenPage = CMSPage & {
  phones?: { items?: Array<{ label?: string; number?: string }> };
};
type RichTextData = {
  eyebrow?: string | null;
  title?: string | null;
  highlight_text?: string | null;
  content?: string | null;
  style_variant?: string | null;
  cta?: { label?: string; url?: string } | null;
};
type Option = string | { label: string; value: string };

const FALLBACK_MEDIA: Record<string, string> = {
  "/hero/builtwell-team-van-consultation-hero-ct.jpg":
    "/portfolio/builtwell-team-client-arrival-ct.jpeg",
  "/team/builtwell-owner-handshake-client-ct-02.jpg":
    "/portfolio/builtwell-contractor-sign-consultation-ct-01.jpg",
  "/hero/builtwell-job-site-aerial-hero-ct.jpg":
    "/portfolio/builtwell-job-site-aerial-ct.jpg",
};
const INCLUDED_COPY: Record<string, string> = {
  Cabinetry:
    "Soft-close hardware and adjustable shelving as standard. Custom, semi-custom, or stock options available.",
  "Countertops & Tile":
    "Countertop fabrication and installation, backsplash tile work, and underlayment preparation.",
  Electrical:
    "New circuits for appliances, under-cabinet lighting, and updated outlet and switch locations.",
  Plumbing:
    "Sink and dishwasher connections, garbage disposal installation, and relocated water lines.",
  Appliances:
    "Coordinated delivery and installation so you are not managing that separately.",
  Flooring:
    "Underlayment preparation and flooring installation with transitions to adjacent rooms.",
  "Demolition & Prep":
    "Removal of existing cabinets, countertops, and flooring. Wall assessment and structural repair as needed.",
  "Painting & Finish":
    "Interior painting, drywall patching, daily cleanup, dust barriers, and final walkthrough.",
  Waterproofing:
    "Membrane systems behind all shower and tub tile. Cement board in wet areas as standard practice.",
  "Tile Work":
    "Floor and wall tile installation with proper substrate preparation and grout finishing.",
  Ventilation:
    "Properly sized exhaust fan ducted to exterior. We correct improperly vented fans found during demolition.",
  "Permits & Finish":
    "All permit applications, inspection coordination, interior painting, drywall patching, and final walkthrough.",
  "Moisture Assessment":
    "We evaluate moisture conditions, wall seepage, and slab readiness before any basement finishing work begins.",
  Framing:
    "Layout framing for walls, soffits, storage, and finished spaces sized around how the area will actually be used.",
  Insulation:
    "Insulation selected for comfort, energy performance, and basement-specific conditions in Connecticut homes.",
  "Drywall and Ceiling":
    "Hanging, taping, finishing, and ceiling work completed after framing, insulation, and rough-ins are in place.",
  "Egress Windows":
    "Code-compliant egress openings added where a legal bedroom or safer basement exit is required.",
  "Subfloor Assessment":
    "We check flatness, structure, and moisture conditions before recommending the right flooring system.",
  "Removal & Disposal":
    "Existing flooring, fasteners, and debris are removed before the new installation begins.",
  Underlayment:
    "The correct underlayment or sound-control layer is installed based on the flooring type and room conditions.",
  Installation:
    "Layout, cutting, fastening, and finish details are handled carefully so the floor looks clean and performs long term.",
  Transitions:
    "Reducers, thresholds, and flush transitions are installed for a clean room-to-room result.",
  "Base Shoe/Molding":
    "Trim is reset or installed so the finished flooring looks complete at every perimeter edge.",
  "Furniture Moving":
    "We coordinate furniture moving and room sequencing so installation stays practical and efficient.",
  "Final Cleanup":
    "Dust, scraps, and packaging are removed and the space is left ready for walkthrough and use.",
  Foundation:
    "Excavation, footings, and foundation work coordinated correctly to support the new addition from the start.",
  Roofing:
    "Roof framing, sheathing, flashing, and tie-ins built to integrate cleanly with the existing structure.",
  "Siding and Windows":
    "Exterior finishes and windows are selected and installed to match the existing home as closely as possible.",
  "Plumbing and HVAC":
    "Mechanical systems are extended or upgraded wherever the new space needs heating, cooling, water, or drainage.",
  "Insulation and Drywall":
    "Envelope insulation and drywall work complete the shell once structural and mechanical rough-ins are done.",
  "Trim and Finishes":
    "Interior doors, trim, flooring, paint, fixtures, and final details bring the addition together.",
  "Trim and Casing":
    "Baseboard, door casing, window trim, and full trim packages installed cleanly and consistently.",
  "Wall Treatments":
    "Wainscoting, board and batten, panel molding, and decorative wall details built for scale and balance.",
  "Custom Built-Ins":
    "Shelving, media walls, libraries, and storage solutions sized to the room and built for daily use.",
  "Window Seats":
    "Bench seating and storage built into the window opening with proportions that fit the space.",
  "Coffered Ceilings":
    "Decorative ceiling layouts framed and finished to elevate the room without feeling out of scale.",
  "Fireplace Surrounds":
    "Mantels, trim, cladding, and focal wall details designed to match the room and existing home style.",
  "Stair Railings":
    "Railings, trim, and detail work installed to improve safety while matching the surrounding interior.",
  "Closet Systems":
    "Shelving, hanging, drawers, and millwork details tailored to the way the closet will be used.",
  "Surface Prep":
    "Walls, trim, and doors are patched, sanded, caulked, and protected before paint is applied.",
  "Structural Assessment":
    "We assess framing, headroom, access, and existing conditions to confirm whether the attic can be converted properly.",
  "Joist Reinforcement":
    "Floor framing is strengthened where needed so the new living space performs safely under real use.",
  "Insulation & Air Sealing":
    "Roof slopes, knee walls, and transitions are insulated and sealed to improve comfort and energy performance.",
  "Egress & Dormers":
    "We plan egress windows, stair access, and dormer changes when the attic needs more code-compliant headroom or safer exits.",
  "HVAC & Mini-Split":
    "Heating and cooling are extended or added so the finished attic stays usable year-round.",
  "Flooring & Drywall":
    "Drywall, flooring, and ceiling finishes are installed once structure, insulation, and rough-ins are complete.",
  "Finish & Trim":
    "Doors, casing, base, paint, and final details turn the attic into a finished living space instead of overflow storage.",
  "Grab Bars and Rails":
    "Support hardware is installed where stability matters most, with proper backing and clean, durable placement.",
  "Walk-In Showers":
    "Shower conversions improve access, reduce thresholds, and make everyday bathing safer and easier.",
  "Wider Doorways":
    "Openings are widened where needed to improve circulation, accessibility, and room-to-room movement.",
  "Ramp Installation":
    "Entry conditions are evaluated so ramps fit the site, meet practical slope requirements, and feel integrated with the home.",
  "Non-Slip Flooring":
    "Flooring selections are made for traction, clean transitions, and easier movement through wet or high-use areas.",
  "Lever Hardware":
    "Lever handles and easier-operating hardware improve usability throughout the home without major disruption.",
  "Lighting Upgrades":
    "Lighting is improved where visibility and safer movement matter most, especially in bathrooms, halls, and entries.",
  "First-Floor Living":
    "We adapt layouts to bring key daily-use spaces onto the first floor when stairs become less practical.",
  "Design and Layout":
    "We plan the footprint, traffic flow, and relationship to the yard before construction begins.",
  "Footings and Foundation":
    "The structure starts with the right footing depth, layout, and support for long-term outdoor performance.",
  "Decking and Boards":
    "Deck surfaces are installed with proper spacing, fastening, and alignment for a clean finished result.",
  "Railings and Stairs":
    "Railings, guard systems, and stairs are built for safety, code compliance, and a cohesive outdoor look.",
  "Roofing (Porches)":
    "Covered porches include roof framing, waterproofing details, and tie-ins that work with the existing house.",
  "Electrical and Lighting":
    "We coordinate outlets, exterior lighting, fans, and convenience features where the new outdoor space needs them.",
  "Staining and Sealing":
    "Wood protection and finish coats are applied when the material requires it for long-term durability and appearance.",
  "Space Assessment":
    "We document the existing house, identify constraints, and establish what the remodeling plan needs to solve first.",
  "Layout Planning":
    "Room arrangement, circulation, and functional adjacencies are worked through before any construction begins.",
  "Material Selection":
    "Fixtures, finishes, and product choices are organized early so the budget and scope stay aligned.",
  "Budget Development":
    "We define realistic cost ranges and decision points so the plan matches the project goals from the start.",
  "Permit Research":
    "Permit and zoning requirements are reviewed early so the planning package reflects real municipal expectations.",
  "Timeline Planning":
    "The project is sequenced around selections, permits, lead times, and the practical order of construction.",
  "Contractor Coordination":
    "Trades, consultants, and installation assumptions are aligned before field work starts.",
  "Design Documentation":
    "The planning package is assembled into clear scope notes, drawings, and decision records that can guide the build.",
  Priming:
    "Primer is applied where needed for adhesion, stain blocking, and an even final finish color.",
  "Wall Painting":
    "Walls are cut in and rolled with clean lines, even coverage, and the specified number of finish coats.",
  "Trim and Door Painting":
    "Doors, casings, baseboards, crown, and detail trim are painted with the right finish for each surface.",
  "Furniture Protection":
    "Furniture, fixtures, and adjacent surfaces are carefully moved, masked, or covered before work starts.",
  "Floor Covering":
    "Floors are fully protected during prep and painting so the home stays clean and damage-free.",
  "Daily Cleanup":
    "We keep the jobsite orderly each day so occupied homes remain workable throughout the project.",
  "Final Walkthrough":
    "Every painted surface is reviewed with you at the end so touchups are handled before closeout.",
};
const EXACT_PROCESS: Record<string, string> = {
  Consultation:
    "We visit your home or connect via Google Meet or Zoom to discuss your goals, assess the space, and answer your questions. No charge. No obligation. We look at the layout, note the existing electrical and plumbing conditions, and get a clear picture of what you want to accomplish.",
  Planning:
    "You receive a clear written proposal covering exactly what's included, how long it will take, and what it costs. Line items are specific. We break out cabinetry, countertops, tile, electrical, plumbing, flooring, and permits separately so you understand exactly where the budget is going.",
  Selections:
    "We guide you through material choices with options at different price points. We communicate lead times clearly so selections are made on schedule before construction begins. If a material has a long lead time, we flag that immediately.",
  Build:
    "Construction begins on the agreed schedule. You receive daily updates on progress, a clean job site at the end of every workday, and crews who arrive when scheduled. If something unexpected comes up behind a wall, we contact you that day and present your options.",
  Walkthrough:
    "We walk through the finished project together. We check every cabinet, every drawer, every tile, every light fixture. If anything needs attention, we address it before calling the project complete. Your written acceptance at the final walkthrough is the last step.",
};

const section = <T,>(page: CMSPage, type: string) =>
  page.sections.find((entry) => entry.is_active && entry.type === type)
    ?.data as T | undefined;
const sections = <T,>(page: CMSPage, type: string) =>
  page.sections
    .filter((entry) => entry.is_active && entry.type === type)
    .map((entry) => entry.data as T);
const media = (value?: string | null, fallback = "") =>
  FALLBACK_MEDIA[value || ""] || value || fallback;
const paras = (value?: string | null) =>
  (value || "")
    .replace(/\r/g, "")
    .split(/\n{2,}/)
    .map((item) => item.trim())
    .filter(Boolean);
const opts = (value?: Option[] | null) =>
  (value || []).map((item) =>
    typeof item === "string" ? { label: item, value: item } : item,
  );
const cx = (...classes: Array<string | false | null | undefined>) =>
  classes.filter(Boolean).join(" ");
const linkNode = (
  href: string,
  children: React.ReactNode,
  className?: string,
) =>
  /^https?:\/\//i.test(href) || href.startsWith("tel:") ? (
    <a
      href={href}
      className={className}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noreferrer noopener" : undefined}
    >
      {children}
    </a>
  ) : (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
const splitTitle = (text?: string | null, accent?: string | null) => {
  const source = (text || "").trim();
  const mark = (accent || "").trim();
  if (!mark || !source.includes(mark))
    return { before: source, accent: "", after: "" };
  const index = source.indexOf(mark);
  return {
    before: source.slice(0, index),
    accent: mark,
    after: source.slice(index + mark.length),
  };
};
const splitQuote = (value?: string | null) => {
  const compact = (value || "").trim().replace(/^"+|"+$/g, "");
  const match = compact.match(/^(.*?)(?:\s+-\s+)([^-].*)$/);
  return match
    ? { quote: match[1].replace(/^"+|"+$/g, "").trim(), cite: match[2].trim() }
    : { quote: compact, cite: "" };
};
const splitDuration = (value?: string | null) => {
  const source = (value || "").trim();
  const match = source.match(/^([^.]*)\.\s*(.*)$/);
  return match
    ? { duration: match[1].trim(), body: match[2].trim() }
    : { duration: source, body: "" };
};

function AccentTitle({
  text,
  accent,
}: {
  text?: string | null;
  accent?: string | null;
}) {
  const p = splitTitle(text, accent);
  return (
    <>
      {p.before}
      {p.accent ? <span className="text-[#BC9155]">{p.accent}</span> : null}
      {p.after}
    </>
  );
}

function Arrow() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      aria-hidden="true"
    >
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

function IncludedCardIcon({ label }: { label: string }) {
  const iconClass = "h-6 w-6 text-[#BC9155]";

  if (label === "Cabinetry") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className={iconClass}
        aria-hidden="true"
      >
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 7V5a4 4 0 0 0-8 0v2" />
        <line x1="12" y1="12" x2="12" y2="16" />
      </svg>
    );
  }
  if (label === "Countertops & Tile") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className={iconClass}
        aria-hidden="true"
      >
        <rect x="1" y="6" width="22" height="4" rx="1" />
        <rect x="3" y="10" width="18" height="10" rx="1" />
      </svg>
    );
  }
  if (label === "Electrical") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className={iconClass}
        aria-hidden="true"
      >
        <path d="M9 18l6-6-6-6" />
        <circle cx="12" cy="12" r="10" />
      </svg>
    );
  }
  if (label === "Plumbing") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className={iconClass}
        aria-hidden="true"
      >
        <path d="M12 2v6l3-3" />
        <path d="M12 2v6l-3-3" />
        <path d="M20 12a8 8 0 1 1-16 0" />
        <path d="M20 12h2" />
        <path d="M2 12h2" />
      </svg>
    );
  }
  if (label === "Appliances") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className={iconClass}
        aria-hidden="true"
      >
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <line x1="2" y1="10" x2="22" y2="10" />
      </svg>
    );
  }
  if (label === "Flooring") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className={iconClass}
        aria-hidden="true"
      >
        <path d="M3 21h18" />
        <path d="M3 21V8l9-5 9 5v13" />
        <rect x="9" y="13" width="6" height="8" />
      </svg>
    );
  }
  if (label === "Demolition & Prep") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className={iconClass}
        aria-hidden="true"
      >
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    );
  }
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className={iconClass}
      aria-hidden="true"
    >
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
    </svg>
  );
}

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      className={className}
      aria-hidden="true"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

export function KitchenRemodelingPageTemplate({ page }: { page: CMSPage }) {
  const kitchenPage = page as KitchenPage;
  const hero = section<any>(page, "service_hero");
  const trustBars = sections<any>(page, "trust_bar");
  const richTexts = sections<RichTextData>(page, "rich_text");
  const overview =
    richTexts.find((item) =>
      item.title?.toLowerCase().includes("full-service"),
    ) || richTexts.find((item) => item.style_variant !== "financing_strip");
  const localExpertise = richTexts.find((item) =>
    item.title?.toLowerCase().includes("local expertise"),
  );
  const financing = richTexts.find(
    (item) => item.style_variant === "financing_strip",
  );
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
  const normalizedSlug = (page.slug || "").replace(/^\/+|\/+$/g, "");
  const serviceRoot = normalizedSlug.split("/")[0] || "kitchen-remodeling";
  const serviceLabel = (hero?.title || "")
    .replace(/\s+in\s+connecticut$/i, "")
    .replace(/\s+\|\s+.*$/i, "")
    .trim();
  const isKitchenService = serviceRoot === "kitchen-remodeling";
  const phones = kitchenPage.phones?.items || [];
  const heroStats = trustBars[0];
  const trustStrip = trustBars[1];
  const counties = areas?.counties || [];
  const townHref = (town: string) =>
    `/${serviceRoot}/${town.toLowerCase().replace(/\s+/g, "-")}-ct/`;
  const townLinkPillClass =
    "flex min-h-[32px] w-full items-center justify-center rounded-full bg-[#DFDBD5] px-[10px] py-[7px] text-center text-[11px] font-semibold tracking-[0.2px] text-[#1E2B43] transition-colors duration-200 hover:bg-[#BC9155] hover:text-white";
  const townStaticPillClass =
    "flex min-h-[32px] w-full items-center justify-center rounded-full bg-[#DFDBD5] px-[10px] py-[7px] text-center text-[11px] font-semibold tracking-[0.2px] text-[#1E2B43] transition-colors duration-200 hover:text-[#9A7340]";
  const relatedHref = (item: any) =>
    item?.url || item?.href || item?.link || item?.cta_url || "";
  const ctaPhones: Array<{ label?: string; number?: string }> = phones.length
    ? phones
    : counties
        .filter((county: any) => county?.phone)
        .slice(0, 2)
        .map((county: any) => ({
          label: county.name || "County",
          number: county.phone,
        }));
  const repeatedBrands = useMemo(
    () => [...(brands?.items || []), ...(brands?.items || [])],
    [brands?.items],
  );
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [countyOpen, setCountyOpen] = useState<Record<number, boolean>>({});
  const [serviceOpen, setServiceOpen] = useState(false);
  const [pickedServices, setPickedServices] = useState<string[]>([]);
  const [contactMethod, setContactMethod] = useState("call");
  const [formValues, setFormValues] = useState<Record<string, string>>({});
  const [fileNames, setFileNames] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const fields = lead?.fields || [];
  const basicFields = ["name", "phone", "email", "zip"]
    .map((name) => fields.find((field: any) => field.name === name))
    .filter(Boolean);
  const servicesField = fields.find(
    (field: any) => field.type === "checkbox_group",
  );
  const timeField = fields.find((field: any) => field.type === "select");
  const messageField = fields.find((field: any) => field.type === "textarea");

  useEffect(() => {
    const nodes = Array.from(
      document.querySelectorAll<HTMLElement>(".kitchen-fade-up"),
    );
    if (!nodes.length) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      nodes.forEach((node) => node.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-white text-[#1E2B43]">
      <main id="main">
        <section className="relative isolate overflow-hidden bg-[#151E30] px-5 pb-8 pt-[80px] text-white sm:pb-9 sm:pt-[92px] md:px-10 md:pb-12 md:pt-[120px]">
          <div
            className="absolute inset-0 bg-cover bg-[position:center_30%] opacity-[0.72]"
            style={{
              backgroundImage: `url(${media(
                hero?.background_image,
                "/images/headers/kitchen-remodeling-header.jpg",
              )})`,
            }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_97%_97%,rgba(21,30,48,1)_0%,rgba(21,30,48,0.9)_8%,transparent_30%),radial-gradient(ellipse_at_3%_97%,rgba(21,30,48,0.9)_0%,transparent_25%),linear-gradient(180deg,rgba(21,30,48,0.35)_0%,rgba(21,30,48,0.2)_30%,rgba(21,30,48,0.45)_65%,rgba(21,30,48,0.92)_100%)]" />
          <div className="relative mx-auto flex min-h-[35vh] max-w-[1240px] flex-col items-center justify-center text-center sm:min-h-[40vh] lg:min-h-[50vh]">
            <ol className="mb-5 flex list-none items-center text-[13px] font-medium text-white/90 [text-shadow:0_1px_6px_rgba(0,0,0,0.7)]">
              <li>
                {linkNode("/", "Home", "text-white/85 hover:text-[#BC9155]")}
              </li>
              <li aria-hidden="true" className="mx-[10px] text-[#BC9155]">
                &#8250;
              </li>
              <li>
                {linkNode(
                  "/services/",
                  "Services",
                  "text-white/85 hover:text-[#BC9155]",
                )}
              </li>
              <li aria-hidden="true" className="mx-[10px] text-[#BC9155]">
                &#8250;
              </li>
              <li>
                <span className="font-semibold text-white">
                  {serviceLabel || "Service"}
                </span>
              </li>
            </ol>
            <h1 className="max-w-[900px] font-serif text-[clamp(40px,4.5vw,56px)] font-bold leading-[1.08] tracking-[-0.5px] text-white [text-shadow:0_2px_20px_rgba(0,0,0,0.5)]">
              <AccentTitle
                text={hero?.title || "Remodeling in Connecticut"}
                accent="Connecticut"
              />
            </h1>
            <p className="mt-4 max-w-[560px] text-[17px] leading-[1.7] text-white/80">
              {hero?.subtitle}
            </p>
            <div className="mt-8 flex w-full max-w-[620px] flex-col gap-4 sm:w-auto sm:max-w-none sm:flex-row sm:flex-wrap sm:justify-center">
              {ctaPhones.map((item) => (
                <a
                  key={item.label}
                  href={`tel:${(item.number || "").replace(/\D/g, "")}`}
                  className="min-w-[180px] rounded-[8px] border border-white/20 border-b-2 border-b-[#BC9155] bg-[rgba(10,18,35,0.42)] px-7 py-4 text-center backdrop-blur-[12px] transition-[background,border-color,transform,box-shadow] duration-300 hover:-translate-y-[2px] hover:border-white/30 hover:bg-[rgba(10,18,35,0.62)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.3),0_0_0_1px_rgba(188,145,85,0.2)]"
                >
                  <span className="mb-1 block text-[11px] uppercase tracking-[1.2px] text-white/70">
                    {item.label}
                  </span>
                  <span className="font-serif text-[18px] font-semibold text-white">
                    {item.number}
                  </span>
                </a>
              ))}
              <a
                href={hero?.primary_cta?.url || "#contact"}
                className="min-w-[180px] rounded-[8px] border border-[#BC9155] border-b-2 border-b-[#A57D48] bg-[#BC9155] px-7 py-4 text-center transition-[background,border-color,transform,box-shadow] duration-300 hover:-translate-y-[2px] hover:border-[#D4A95A] hover:bg-[#D4A95A] hover:shadow-[0_8px_24px_rgba(188,145,85,0.4)]"
              >
                <span className="mb-1 block text-[11px] uppercase tracking-[1.2px] text-white/90">
                  {hero?.primary_cta?.label || "Free Estimate"}
                </span>
                <span className="font-serif text-[18px] font-semibold text-white">
                  Schedule Now
                </span>
              </a>
            </div>
          </div>
        </section>
        <section className="border-y border-y-[#BC9155]/20 bg-[linear-gradient(135deg,#1E2B43_0%,#151E30_100%)]">
          <div className="mx-auto grid max-w-[1280px] grid-cols-2 text-center lg:grid-cols-4">
            {(heroStats?.items || []).map((item: any, index: number) => (
              <div
                key={`${item.label}-${index}`}
                className={cx(
                  "group cursor-default bg-[#BC9155]/[0.08] px-4 py-6 transition-all duration-300 md:bg-transparent md:px-5 md:py-9 md:hover:-translate-y-[3px] md:hover:bg-[#BC9155]/8",
                  index % 2 === 0 && "border-r border-[#BC9155]/12",
                  index < 2 && "border-b border-[#BC9155]/12",
                  "lg:border-b-0",
                  index < (heroStats?.items || []).length - 1
                    ? "lg:border-r lg:border-[#BC9155]/12"
                    : "lg:border-r-0",
                )}
              >
                <div className="flex min-h-[42px] items-center justify-center font-serif text-[32px] font-bold leading-none text-[#BC9155] transition-all duration-300 md:text-[42px] md:group-hover:text-[#D4A95A] md:group-hover:[text-shadow:0_0_20px_rgba(188,145,85,0.3)]">
                  {item.value ? (
                    item.value
                  ) : (
                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                  )}
                </div>
                <div className="mt-1.5 text-[11px] font-medium uppercase tracking-[0.8px] text-white/85 transition-colors duration-300 md:mt-2 md:text-[13px] md:tracking-[1px] md:text-white/60 md:group-hover:text-white/85">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </section>
        <section className="border-b border-b-[#1E2B43]/6 bg-white px-4 py-20 md:px-10">
          <div className="mx-auto max-w-[820px] text-center">
            <span className="mb-4 inline-block pl-5 text-[11px] font-bold uppercase tracking-[1.5px] text-[#9A7340] before:relative before:-left-5 before:top-[-3px] before:inline-block before:h-[2px] before:w-[10px] before:bg-[#BC9155]">
              {overview?.eyebrow || "Connecticut Remodeling Contractor"}
            </span>
            <h2 className="mx-auto mb-6 max-w-[780px] font-serif text-[clamp(28px,3.5vw,44px)] font-bold leading-[1.2] tracking-[-0.5px]">
              <AccentTitle
                text={
                  overview?.title ||
                  "Full-Service Remodeling Across Connecticut"
                }
                accent={overview?.highlight_text || "Across Connecticut"}
              />
            </h2>
            {paras(overview?.content).map((paragraph) => (
              <p
                key={paragraph.slice(0, 24)}
                className="mb-5 text-[16px] leading-[1.85] text-[#5C677D] last:mb-0"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </section>
        <section className="bg-[#F5F1E9] px-5 py-[52px] md:px-8 md:py-20 lg:px-10 lg:py-[100px]">
          <div className="mx-auto max-w-[1240px]">
            <div className="mb-12 text-center kitchen-fade-up">
              <span className="mb-4 inline-block pl-5 text-[11px] font-bold uppercase tracking-[1.5px] text-[#9A7340] before:relative before:-left-5 before:top-[-3px] before:inline-block before:h-[2px] before:w-[10px] before:bg-[#BC9155]">
                Scope of Work
              </span>
              <h2 className="font-serif text-[clamp(28px,3.5vw,44px)] font-bold leading-[1.2] tracking-[-0.5px]">
                <AccentTitle
                  text={intro?.title || "What Is Included in This Remodel"}
                  accent={intro?.highlight_text || ""}
                />
              </h2>
            </div>
            <div className="grid gap-12 lg:grid-cols-2">
              <div className="grid gap-3 kitchen-fade-up">
                <div className="overflow-hidden rounded-[12px] shadow-[0_8px_32px_rgba(30,43,67,0.1)]">
                  <img
                    src={media(
                      intro?.image_main,
                      "/services/kitchen-remodeling-ct.jpg",
                    )}
                    alt={`${serviceLabel || "Remodeling"} project`}
                    className="h-[280px] w-full object-cover md:h-[320px]"
                  />
                </div>
                <div className="overflow-hidden rounded-[12px] shadow-[0_8px_32px_rgba(30,43,67,0.1)]">
                  <img
                    src={media(
                      intro?.image_secondary,
                      "/portfolio/builtwell-contractor-sign-consultation-ct-01.jpg",
                    )}
                    alt={`${serviceLabel || "Remodeling"} consultation`}
                    className="h-[280px] w-full object-cover md:h-[320px]"
                  />
                </div>
              </div>
              <div className="kitchen-fade-up rounded-[12px] border border-[#1E2B43]/7 bg-white px-5 py-7 shadow-[0_2px_12px_rgba(30,43,67,0.05)] md:px-9">
                {paras(intro?.content).map((paragraph, index) => (
                  <p
                    key={paragraph.slice(0, 24)}
                    className={`mb-[18px] text-[16px] leading-[1.8] text-[#5C677D] ${index === 0 ? "border-b border-b-[#1E2B43]/8 pb-[18px] text-[17px] font-medium leading-[1.7] text-[#1E2B43]" : ""} last:mb-0`}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {(intro?.bullet_points || []).map((item: any, index: number) => (
                <article
                  key={`${item.text}-${index}`}
                  className="kitchen-fade-up rounded-[12px] border-b-2 border-b-transparent bg-white px-6 py-8 text-center shadow-[0_2px_12px_rgba(30,43,67,0.06),0_1px_3px_rgba(30,43,67,0.04)] transition-all duration-[350ms] ease-[cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-1 hover:border-b-[#BC9155] hover:shadow-[0_12px_28px_rgba(30,43,67,0.1),0_28px_56px_rgba(30,43,67,0.12)]"
                  style={{ transitionDelay: `${Math.min(index * 50, 250)}ms` }}
                >
                  <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#BC9155]/10">
                    <IncludedCardIcon label={item.text} />
                  </div>
                  <h3 className="mb-[10px] text-[18px] font-semibold">
                    {item.text}
                  </h3>
                  <p className="text-[14px] leading-[1.65] text-[#5C677D]">
                    {INCLUDED_COPY[item.text] ||
                      "Included as part of a full-scope remodeling project."}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section className="border-t border-t-[#1E2B43]/8 bg-[#F5F1E9] px-4 py-20 md:px-10">
          <div className="mx-auto max-w-[1240px]">
            <div className="mb-12 text-center">
              <span className="mb-4 inline-block pl-5 text-[11px] font-bold uppercase tracking-[1.5px] text-[#9A7340] before:relative before:-left-5 before:top-[-3px] before:inline-block before:h-[2px] before:w-[10px] before:bg-[#BC9155]">
                Recent Work
              </span>
              <h2 className="font-serif text-[clamp(28px,3.5vw,44px)] font-bold tracking-[-0.5px]">
                <AccentTitle
                  text={caseStudies?.title || "Recent Remodeling Projects"}
                  accent="Projects"
                />
              </h2>
              <p className="mx-auto mt-3 max-w-[700px] text-[17px] leading-[1.75] text-[#5C677D]">
                {caseStudies?.subtitle}
              </p>
            </div>
            <div className="grid gap-6 lg:grid-cols-3">
              {(caseStudies?.projects || []).map(
                (project: any, index: number) => {
                  const quote = splitQuote(project.testimonial_quote);
                  return (
                    <article
                      key={`${project.location}-${index}`}
                      className="rounded-[12px] border-b-2 border-b-transparent bg-white px-7 py-7 shadow-[0_2px_12px_rgba(30,43,67,0.06),0_1px_3px_rgba(30,43,67,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-b-[#BC9155] hover:shadow-[0_12px_28px_rgba(30,43,67,0.1),0_28px_56px_rgba(30,43,67,0.12)]"
                    >
                      <div className="relative mb-5 h-[280px] overflow-hidden rounded-[8px]">
                        <div className="grid h-full grid-cols-2">
                          <img
                            src={media(
                              project.before_image,
                              "/images/before-after/kitchen-before-after-1.jpg",
                            )}
                            alt={`${project.location} before`}
                            className="h-full w-full object-cover"
                          />
                          <img
                            src={media(
                              project.after_image,
                              "/images/before-after/kitchen-before-after-1.png",
                            )}
                            alt={`${project.location} after`}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="absolute inset-x-0 bottom-0 h-[76px] bg-[linear-gradient(to_bottom,transparent_0%,rgba(0,0,0,0.92)_55%,rgba(0,0,0,0.96)_100%)]" />
                        <div className="absolute bottom-0 left-0 flex h-[76px] w-1/2 items-end px-[14px] pb-[13px]">
                          <span className="text-[13px] font-extrabold uppercase tracking-[2.5px] text-white">
                            Before
                          </span>
                        </div>
                        <div className="absolute bottom-0 right-0 flex h-[76px] w-1/2 items-end justify-end px-[14px] pb-[13px]">
                          <span className="text-[13px] font-extrabold uppercase tracking-[2.5px] text-white">
                            After
                          </span>
                        </div>
                      </div>
                      <h3 className="mb-3 text-[20px] font-bold">
                        {project.location}
                      </h3>
                      <p className="text-[14px] leading-[1.75] text-[#5C677D]">
                        {project.description}
                      </p>
                      {project.testimonial_quote ? (
                        <div className="mt-4 border-l-[3px] border-l-[#BC9155] pl-4 italic">
                          <p className="min-h-[72px] text-[14px] leading-[1.65] text-[#1E2B43]">
                            &quot;{quote.quote}&quot;
                          </p>
                          {quote.cite ? (
                            <cite className="mt-2 block text-[12px] font-semibold not-italic text-[#5C677D]">
                              {quote.cite}
                            </cite>
                          ) : null}
                        </div>
                      ) : null}
                    </article>
                  );
                },
              )}
            </div>
          </div>
        </section>
        <section className="border-t border-t-[#1E2B43]/8 bg-white px-4 py-20 md:px-10">
          <div className="mx-auto max-w-[1240px]">
            <div className="mb-10 text-center">
              <span className="mb-4 inline-block pl-5 text-[11px] font-bold uppercase tracking-[1.5px] text-[#9A7340] before:relative before:-left-5 before:top-[-3px] before:inline-block before:h-[2px] before:w-[10px] before:bg-[#BC9155]">
                Investment
              </span>
              <h2 className="font-serif text-[clamp(28px,3.5vw,44px)] font-bold tracking-[-0.5px]">
                <AccentTitle
                  text={pricing?.title || "Remodeling Cost in Connecticut"}
                  accent="Connecticut"
                />
              </h2>
              <p className="mx-auto mt-3 max-w-[720px] text-[17px] leading-[1.75] text-[#5C677D]">
                {pricing?.subtitle}
              </p>
            </div>
            <div className="mx-auto max-w-[800px] overflow-x-auto">
              <table className="w-full overflow-hidden rounded-[12px] bg-white shadow-[0_2px_12px_rgba(30,43,67,0.06),0_1px_3px_rgba(30,43,67,0.04)]">
                <thead>
                  <tr>
                    {(pricing?.columns || []).map((column: string) => (
                      <th
                        key={column}
                        className="bg-[#1E2B43] px-6 py-4 text-left text-[12px] uppercase tracking-[0.5px] text-white"
                      >
                        {column}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {(pricing?.rows || []).map((row: any, index: number) => (
                    <tr
                      key={`${row.label}-${index}`}
                      className="even:bg-[#1E2B43]/[0.02] hover:bg-[#BC9155]/[0.06]"
                    >
                      <td className="border-b border-b-[#1E2B43]/6 px-6 py-4 text-[15px]">
                        {row.label}
                      </td>
                      <td className="border-b border-b-[#1E2B43]/6 px-6 py-4 font-serif text-[16px] font-bold text-[#BC9155]">
                        {row.price}
                      </td>
                      <td className="border-b border-b-[#1E2B43]/6 px-6 py-4 text-[15px]">
                        {row.notes}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="mt-5 text-center text-[14px] italic text-[#5C677D]">
                All prices include labor and materials. Final cost depends on
                scope, selections, and site conditions.
              </p>
            </div>
          </div>
        </section>
        <section className="border-t border-t-[#1E2B43]/8 bg-white px-4 py-20 md:px-10">
          <div className="mx-auto max-w-[820px]">
            <div className="mb-10 text-center">
              <span className="mb-4 inline-block pl-5 text-[11px] font-bold uppercase tracking-[1.5px] text-[#9A7340] before:relative before:-left-5 before:top-[-3px] before:inline-block before:h-[2px] before:w-[10px] before:bg-[#BC9155]">
                {localExpertise?.eyebrow || "Local Knowledge"}
              </span>
              <h2 className="font-serif text-[clamp(28px,3.5vw,44px)] font-bold tracking-[-0.5px]">
                <AccentTitle
                  text={localExpertise?.title || "Why Local Expertise Matters"}
                  accent={localExpertise?.highlight_text || "Local Expertise"}
                />
              </h2>
            </div>
            {paras(localExpertise?.content).map((paragraph) => (
              <p
                key={paragraph.slice(0, 24)}
                className="mb-5 text-[16px] leading-[1.8] text-[#5C677D] last:mb-0"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </section>
        <section className="relative overflow-hidden px-5 py-[52px] text-white md:px-8 md:py-20 lg:px-10 lg:py-[100px]">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('/portfolio/builtwell-team-contractors-ct-04.png')",
            }}
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(10,18,34,0.90)_0%,rgba(30,43,67,0.85)_100%)]" />
          <div className="relative z-10 mx-auto max-w-[1240px]">
            <div className="mb-10 text-center kitchen-fade-up">
              <span className="mb-4 inline-block pl-5 text-[11px] font-bold uppercase tracking-[1.5px] text-[#BC9155] before:relative before:-left-5 before:top-[-3px] before:inline-block before:h-[2px] before:w-[10px] before:bg-[#BC9155]">
                Our Process
              </span>
              <h2 className="font-serif text-[clamp(28px,3.5vw,44px)] font-bold tracking-[-0.5px] text-white">
                <AccentTitle
                  text={process?.title || "Our Remodeling Process"}
                  accent="Process"
                />
              </h2>
              <p className="mx-auto mt-3 max-w-[720px] text-[17px] leading-[1.75] text-white/70">
                {process?.subtitle}
              </p>
            </div>

            <div className="kitchen-fade-up relative mx-auto grid max-w-full gap-0 lg:grid-cols-5">
              <div className="absolute bottom-[34px] left-[25px] top-[28px] w-0.5 bg-[#BC9155]/25 md:left-[33px] md:top-[34px] lg:bottom-auto lg:left-[10%] lg:right-[10%] lg:top-[34px] lg:h-0.5 lg:w-auto" />
              {(process?.steps || []).map((item: any, index: number) => (
                <button
                  type="button"
                  key={`${item.title}-${index}`}
                  onClick={() =>
                    setActiveStep((current) =>
                      current === index ? null : index,
                    )
                  }
                  className={cx(
                    "relative flex w-full items-start gap-4 rounded-[8px] border-0 bg-transparent px-0 py-3 text-left transition-colors md:gap-5 md:py-4 lg:block lg:px-4 lg:pb-5 lg:pt-4 lg:text-center lg:hover:bg-[#BC9155]/10",
                    activeStep === index && "bg-[#BC9155]/14",
                  )}
                  aria-expanded={activeStep === index}
                >
                  <div className="relative z-10 flex h-[50px] w-[50px] shrink-0 items-center justify-center rounded-full border-[2.5px] border-[#BC9155] bg-[#BC9155]/42 font-serif text-[18px] font-bold text-[#F5E0C0] shadow-[0_0_0_4px_rgba(188,145,85,0.12)] md:h-[68px] md:w-[68px] md:text-2xl lg:-mt-2 lg:mx-auto lg:mb-5">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="mb-1.5 text-left text-base font-semibold text-white md:mb-3 md:text-lg lg:text-center">
                      {item.title}
                    </h3>
                    <p
                      className={cx(
                        "text-left text-[14px] leading-[1.6] text-white/70 transition-all duration-300 lg:text-center lg:leading-[1.65]",
                        activeStep === index
                          ? "max-h-[220px] opacity-100"
                          : "max-h-none opacity-100 lg:max-h-0 lg:overflow-hidden lg:opacity-0",
                      )}
                    >
                      {(isKitchenService && EXACT_PROCESS[item.title]) ||
                        item.description}
                    </p>
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-2 flex items-start gap-4 lg:hidden md:mt-4 md:gap-5">
              <div className="relative z-10 flex h-[50px] w-[50px] shrink-0 items-center justify-center rounded-full border-[2.5px] border-[#BC9155] bg-[#BC9155] text-white shadow-[0_0_0_4px_rgba(188,145,85,0.12)] md:h-[68px] md:w-[68px]">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </div>
              <div>
                <h3 className="mb-[6px] text-[16px] font-semibold text-white md:text-[18px]">
                  Get Started
                </h3>
                <p className="text-[14px] leading-[1.6] text-white/70">
                  Ready to begin? Schedule your free consultation today.
                </p>
                <a
                  href="#contact"
                  className="mt-3 inline-flex rounded-[4px] bg-[#BC9155] px-5 py-[10px] text-[13px] font-semibold text-white transition-[background,transform] duration-200 hover:-translate-y-px hover:bg-[#A57D48]"
                >
                  Free Consultation
                </a>
              </div>
            </div>
            <p className="mt-7 hidden text-center text-[13px] text-white/40 lg:block">
              Click any step to learn more
            </p>
          </div>
        </section>
        <section className="bg-[#F5F1E9] px-5 py-[52px] md:px-8 md:py-20 lg:px-10 lg:py-[100px]">
          <div className="mx-auto max-w-[1240px]">
            <div className="mb-10 text-center kitchen-fade-up">
              <span className="mb-4 inline-block pl-5 text-[11px] font-bold uppercase tracking-[1.5px] text-[#9A7340] before:relative before:-left-5 before:top-[-3px] before:inline-block before:h-[2px] before:w-[10px] before:bg-[#BC9155]">
                Timeline
              </span>
              <h2 className="font-serif text-[clamp(28px,3.5vw,44px)] font-bold tracking-[-0.5px]">
                Project <span className="text-[#BC9155]">Timeline</span>
              </h2>
              <p className="mx-auto mt-3 max-w-[720px] text-[17px] leading-[1.75] text-[#5C677D]">
                {timeline?.subtitle}
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {(timeline?.items || []).map((item: any, index: number) => {
                const detail = splitDuration(item.description);
                return (
                  <article
                    key={`${item.title}-${index}`}
                    className="rounded-[10px] border border-[#1E2B43]/6 border-t-[3px] border-t-[#BC9155] bg-white px-6 py-8 shadow-[0_2px_8px_rgba(30,43,67,0.04)] transition-all hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(30,43,67,0.1)]"
                  >
                    <div className="mb-3 inline-block rounded-[4px] bg-[#BC9155] px-3 py-1 text-[11px] font-semibold uppercase tracking-[1.5px] text-white">
                      Phase {index + 1}
                    </div>
                    <h3 className="mb-2 text-[18px] font-bold">
                      {item.title.replace(/^Phase \d:\s*/, "")}
                    </h3>
                    <div className="mb-3 font-serif text-[24px] font-bold text-[#BC9155]">
                      {detail.duration}
                    </div>
                    <p className="text-[14px] leading-[1.65] text-[#5C677D]">
                      {detail.body || item.description}
                    </p>
                  </article>
                );
              })}
            </div>
            <p className="mt-6 text-center text-[14px] italic text-[#5C677D]">
              Timelines vary based on project scope, material lead times, and
              permit requirements.
            </p>
          </div>
        </section>
        <section className="bg-[#F5F1E9] px-4 py-20 md:px-10">
          <div className="mx-auto max-w-[1240px]">
            <div className="mb-10 text-center kitchen-fade-up">
              <span className="mb-4 inline-block pl-5 text-[11px] font-bold uppercase tracking-[1.5px] text-[#9A7340] before:relative before:-left-5 before:top-[-3px] before:inline-block before:h-[2px] before:w-[10px] before:bg-[#BC9155]">
                {areas?.eyebrow || "Where We Work"}
              </span>
              <h2 className="font-serif text-[clamp(28px,3.5vw,44px)] font-bold tracking-[-0.5px]">
                <AccentTitle
                  text={areas?.title || "Remodeling Across Two Counties"}
                  accent={areas?.highlight_text || "Two Counties"}
                />
              </h2>
              <p className="mx-auto mt-3 max-w-[720px] text-[17px] leading-[1.75] text-[#5C677D]">
                {areas?.subtitle}
              </p>
            </div>
            <div className="grid gap-8 lg:grid-cols-2">
              {counties.map((county: any, index: number) => {
                const expanded = !!countyOpen[index];
                return (
                  <article
                    key={`${county.name}-${index}`}
                    className="kitchen-fade-up group overflow-hidden rounded-[12px] border-b-[3px] border-b-transparent bg-white shadow-[0_2px_12px_rgba(30,43,67,0.06),0_1px_3px_rgba(30,43,67,0.04)] transition-all duration-[350ms] ease-[cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-[6px] hover:border-b-[#BC9155] hover:shadow-[0_16px_40px_rgba(30,43,67,0.1),0_32px_64px_rgba(30,43,67,0.08)]"
                    style={{
                      transitionDelay: `${Math.min(index * 90, 180)}ms`,
                    }}
                  >
                    <div className="relative h-[220px] overflow-hidden">
                      <img
                        src={media(
                          county.image,
                          index === 0
                            ? "/images/areas/fairfield-county.jpg"
                            : "/images/areas/new-haven-county.jpg",
                        )}
                        className={`absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 ${index === 1 ? "object-top" : ""}`}
                        alt={county.name}
                      />
                      <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#1E2B43]/40 to-transparent" />
                    </div>
                    <div className="px-7 py-8">
                      <h3 className="mb-[6px] text-[24px] font-bold">
                        {county.name}
                      </h3>
                      <div className="mb-[14px] text-[15px] text-[#5C677D]">
                        Call:{" "}
                        <a
                          href={`tel:${(county.phone || "").replace(/\D/g, "")}`}
                          className="font-semibold text-[#BC9155] hover:underline"
                        >
                          {county.phone}
                        </a>
                      </div>
                      <p className="mb-[18px] border-b border-b-[#1E2B43]/6 pb-[18px] text-[14px] leading-[1.7] text-[#5C677D]">
                        {county.description}
                      </p>
                      <div className="grid grid-cols-3 gap-2 md:grid-cols-4">
                        {(county.towns || []).map((town: string) => (
                          <div key={town}>
                            {linkNode(townHref(town), town, townLinkPillClass)}
                          </div>
                        ))}
                        {expanded
                          ? (county.extra_towns || []).map((town: string) => (
                              <span key={town} className={townStaticPillClass}>
                                {town}
                              </span>
                            ))
                          : null}
                        {county.extra_towns?.length ? (
                          <button
                            className="col-span-full mt-1 bg-transparent px-0 py-1 text-center text-[13px] font-semibold text-[#BC9155]"
                            aria-expanded={expanded}
                            onClick={() =>
                              setCountyOpen((current) => ({
                                ...current,
                                [index]: !current[index],
                              }))
                            }
                          >
                            {expanded ? "Show Less -" : "See All Towns +"}
                          </button>
                        ) : null}
                      </div>
                      {county.url
                        ? linkNode(
                            county.url,
                            <>
                              <span>
                                {county.cta_label ||
                                  `Learn more about ${county.name}`}
                              </span>
                              <Arrow />
                            </>,
                            "mt-4 inline-flex items-center gap-[6px] text-[14px] font-semibold text-[#BC9155] transition-all hover:gap-[10px]",
                          )
                        : null}
                    </div>
                  </article>
                );
              })}
            </div>
            <p className="kitchen-fade-up mt-8 text-center text-[14px] text-[#5C677D]">
              Not sure if we cover your area?{" "}
              {linkNode(
                "/contact/",
                "Contact our Connecticut remodeling team",
                "font-semibold text-[#BC9155] underline",
              )}{" "}
              and we&apos;ll let you know.
            </p>
          </div>
        </section>
        <section className="border-t border-t-[#1E2B43]/8 bg-white px-5 py-[52px] md:px-8 md:py-20 lg:px-10 lg:py-[100px]">
          <div className="mx-auto max-w-[800px]">
            <div className="mb-10 text-center kitchen-fade-up">
              <span className="mb-4 inline-block pl-5 text-[11px] font-bold uppercase tracking-[1.5px] text-[#9A7340] before:relative before:-left-5 before:top-[-3px] before:inline-block before:h-[2px] before:w-[10px] before:bg-[#BC9155]">
                FAQ
              </span>
              <h2 className="font-serif text-[clamp(28px,3.5vw,44px)] font-bold tracking-[-0.5px]">
                <AccentTitle
                  text={faq?.title || `${serviceLabel || "Service"} Questions`}
                  accent="Questions"
                />
              </h2>
            </div>
            <div className="space-y-3 kitchen-fade-up">
              {(faq?.items || []).map((item: any, index: number) => (
                <details
                  key={`${item.question}-${index}`}
                  className="group overflow-hidden rounded-[8px] border border-[#1E2B43]/10 transition-colors duration-200 open:border-[#BC9155]"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 text-[16px] font-semibold text-[#1E2B43] marker:hidden hover:bg-[#BC9155]/[0.04]">
                    <span>{item.question}</span>
                    <span className="text-[22px] font-light text-[#BC9155] group-open:hidden">
                      +
                    </span>
                    <span className="hidden text-[22px] font-light text-[#BC9155] group-open:inline">
                      -
                    </span>
                  </summary>
                  <div className="px-6 pb-5 text-[15px] leading-[1.75] text-[#5C677D]">
                    {item.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>
        <div className="relative overflow-hidden bg-[linear-gradient(135deg,#1E2B43_0%,#151E30_100%)] px-5 py-14 md:px-10 md:py-[56px]">
          <div className="absolute inset-0 bg-[url('/portfolio/builtwell-job-site-aerial-ct.jpg')] bg-cover bg-center opacity-[0.12]" />
          <div className="relative mx-auto flex max-w-[1200px] flex-wrap items-center justify-center">
            {(trustStrip?.items || []).map((item: any, index: number) => (
              <div key={`${item.label}-${index}`} className="contents">
                <a
                  href={item.url || "#"}
                  target={item.url?.startsWith("http") ? "_blank" : undefined}
                  rel={
                    item.url?.startsWith("http")
                      ? "noreferrer noopener"
                      : undefined
                  }
                  className="kitchen-fade-up flex min-w-[50%] flex-1 flex-col items-center gap-[10px] px-4 py-3 text-center text-[11px] font-semibold tracking-[0.4px] text-white/90 transition-all duration-300 hover:-translate-y-[2px] hover:text-[#BC9155] md:min-w-[180px] md:px-8 md:py-5 md:text-[13px]"
                  style={{ transitionDelay: `${Math.min(index * 70, 280)}ms` }}
                >
                  <span className="text-[#BC9155] [filter:drop-shadow(0_2px_4px_rgba(188,145,85,0.3))]">
                    {item.label === "Google" ? (
                      <svg
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ) : item.label === "CT HIC License" ? (
                      <svg
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <rect x="3" y="4" width="18" height="16" rx="2" />
                        <path d="M8 2v4M16 2v4M3 10h18" />
                      </svg>
                    ) : item.label === "BBB" ? (
                      <svg
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      </svg>
                    ) : (
                      <svg
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <path d="M9 12l2 2 4-4" />
                      </svg>
                    )}
                  </span>
                  <span>
                    {item.label === "Google"
                      ? `Google ${item.value}`
                      : item.label === "Houzz"
                        ? item.value
                        : item.label === "Angi & Thumbtack"
                          ? `${item.value} on Angi & Thumbtack`
                          : item.label === "CT HIC License"
                            ? `${item.label} ${item.value}`
                            : [item.label, item.value]
                                .filter(Boolean)
                                .join(" ")}
                  </span>
                </a>
                {index < (trustStrip?.items || []).length - 1 ? (
                  <div className="hidden h-10 w-px bg-white/10 lg:block" />
                ) : null}
              </div>
            ))}
          </div>
        </div>
        <section className="border-t border-t-[#1E2B43]/8 bg-white px-4 py-20 md:px-10">
          <div className="mx-auto max-w-[1240px] text-center">
            <span className="mb-4 inline-block pl-5 text-[11px] font-bold uppercase tracking-[1.5px] text-[#9A7340] before:relative before:-left-5 before:top-[-3px] before:inline-block before:h-[2px] before:w-[10px] before:bg-[#BC9155]">
              Trusted Brands
            </span>
            <h2 className="font-serif text-[clamp(28px,3.5vw,44px)] font-bold tracking-[-0.5px]">
              Materials We <span className="text-[#BC9155]">Stand Behind</span>
            </h2>
            <p className="mx-auto mt-3 max-w-[720px] text-[17px] leading-[1.75] text-[#5C677D]">
              {brands?.subtitle}
            </p>
            <div className="brand-mask mt-10 overflow-hidden">
              <div className="brand-track flex w-max items-center gap-12">
                {repeatedBrands.map((item: any, index: number) => (
                  <a
                    key={`${item.name}-${index}`}
                    href={item.url || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-[72px] shrink-0 items-center justify-center px-8 opacity-[0.55] transition-opacity hover:opacity-100"
                  >
                    <img
                      src={media(item.logo, "/images/brands/kraftmaid.svg")}
                      alt={item.name}
                      className="max-h-[52px] max-w-[200px] w-auto object-contain"
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>
        <section
          className="bg-[#F5F1E9] px-5 py-12 md:px-8 md:py-[72px] lg:px-10"
          id="contact"
        >
          <div className="mx-auto max-w-[1200px]">
            <div className="mb-8 text-center kitchen-fade-up">
              <span className="mb-4 inline-block pl-5 text-[11px] font-bold uppercase tracking-[1.5px] text-[#9A7340] before:relative before:-left-5 before:top-[-3px] before:inline-block before:h-[2px] before:w-[10px] before:bg-[#BC9155]">
                {lead?.eyebrow || "GET IN TOUCH"}
              </span>
              <h2 className="font-serif text-[clamp(30px,3vw,42px)] font-bold tracking-[-0.5px]">
                <AccentTitle
                  text={`${lead?.title || "Ready to Start Your Remodeling"} ${lead?.title_highlight || "Project"}?`}
                  accent={lead?.title_highlight || "Remodeling Project"}
                />
              </h2>
              <p className="mx-auto mt-3 max-w-[620px] text-[16px] leading-[1.7] text-[#5C677D]">
                {lead?.subtitle}
              </p>
            </div>
            <div className="grid items-stretch gap-8 md:grid-cols-[1fr_1.15fr]">
              <div className="hidden gap-3 kitchen-fade-up md:grid">
                {(lead?.images || [])
                  .slice(0, 2)
                  .map((image: any, index: number) => (
                    <div
                      key={`${image.alt}-${index}`}
                      className="relative overflow-hidden rounded-[8px]"
                    >
                      <img
                        src={media(
                          image.image,
                          index === 0
                            ? "/portfolio/builtwell-team-client-arrival-ct.jpeg"
                            : "/portfolio/builtwell-contractor-sign-consultation-ct-01.jpg",
                        )}
                        alt={image.alt}
                        className="h-full min-h-[260px] w-full object-cover"
                      />
                      <div className="pointer-events-none absolute bottom-0 right-0 h-[60px] w-[60px] rounded-br-[8px] bg-[linear-gradient(135deg,transparent_30%,rgba(30,43,67,0.5)_100%)]" />
                    </div>
                  ))}
              </div>
              <div className="kitchen-fade-up rounded-[10px] border border-[#1E2B43]/8 bg-white px-5 py-8 shadow-[0_16px_48px_rgba(30,43,67,0.1),0_4px_12px_rgba(30,43,67,0.04)] md:px-9">
                {submitted ? (
                  <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
                    <h3 className="mb-3 font-serif text-[34px] font-bold">
                      Thank You
                    </h3>
                    <p className="max-w-[420px] leading-[1.8] text-[#5C677D]">
                      We received your request and will get back to you within
                      one business day.
                    </p>
                  </div>
                ) : (
                  <form
                    onSubmit={(event) => {
                      event.preventDefault();
                      setSubmitted(true);
                    }}
                    className="flex flex-1 flex-col"
                  >
                    <div className="grid gap-4 md:grid-cols-2">
                      {basicFields.map((field: any) => (
                        <div key={field.name}>
                          <label
                            htmlFor={`kitchen-${field.name}`}
                            className="mb-1.5 block text-[13px] font-semibold uppercase tracking-[0.5px] text-[#1E2B43]"
                          >
                            {field.label} *
                          </label>
                          <input
                            id={`kitchen-${field.name}`}
                            type={field.type}
                            value={formValues[field.name] || ""}
                            placeholder={field.placeholder || ""}
                            onChange={(event) =>
                              setFormValues((current) => ({
                                ...current,
                                [field.name]: event.target.value,
                              }))
                            }
                            className="w-full rounded-[6px] border border-[#1E2B43]/15 bg-white px-[14px] py-3 text-[15px] text-[#1E2B43] outline-none transition-colors focus:border-[#BC9155]"
                          />
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 grid gap-4 md:grid-cols-2">
                      {servicesField ? (
                        <div>
                          <label className="mb-1.5 block text-[13px] font-semibold uppercase tracking-[0.5px] text-[#1E2B43]">
                            Services Needed *
                          </label>
                          <div className="relative">
                            <button
                              type="button"
                              className="flex w-full items-center justify-between rounded-[4px] border border-[#1E2B43]/15 bg-white px-[14px] py-[13px] text-left text-[15px] text-[#1E2B43]"
                              aria-expanded={serviceOpen}
                              onClick={() =>
                                setServiceOpen((current) => !current)
                              }
                            >
                              <span
                                className={`${pickedServices.length ? "font-medium text-[#1E2B43]" : "text-[#5C677D]"} truncate`}
                              >
                                {pickedServices.length
                                  ? pickedServices.join(", ")
                                  : "Select services"}
                              </span>
                              <ChevronDownIcon
                                className={cx(
                                  "text-[#5C677D] transition-transform",
                                  serviceOpen && "rotate-180",
                                )}
                              />
                            </button>
                            <div
                              className={`${serviceOpen ? "block" : "hidden"} absolute left-0 right-0 top-[calc(100%+4px)] z-20 max-h-60 overflow-y-auto rounded-[6px] border border-[#1E2B43]/15 bg-white py-1 shadow-[0_8px_24px_rgba(0,0,0,0.12)]`}
                            >
                              {opts(servicesField.options).map((option) => (
                                <label
                                  key={option.value}
                                  className="flex cursor-pointer items-center gap-2.5 px-[14px] py-2 text-[14px] text-[#1E2B43] hover:bg-[#BC9155]/[0.06]"
                                >
                                  <input
                                    type="checkbox"
                                    checked={pickedServices.includes(
                                      option.value,
                                    )}
                                    onChange={() =>
                                      setPickedServices((current) =>
                                        current.includes(option.value)
                                          ? current.filter(
                                              (value) => value !== option.value,
                                            )
                                          : [...current, option.value],
                                      )
                                    }
                                    className="kitchen-multi-checkbox h-[18px] w-[18px] cursor-pointer rounded-[3px] border-2 border-[#1E2B43]/25 bg-white"
                                  />
                                  {option.label}
                                </label>
                              ))}
                            </div>
                          </div>
                        </div>
                      ) : null}
                      {timeField ? (
                        <div>
                          <label
                            htmlFor="kitchen-best-time"
                            className="mb-1.5 block text-[13px] font-semibold uppercase tracking-[0.5px] text-[#1E2B43]"
                          >
                            Best Time to Contact *
                          </label>
                          <select
                            id="kitchen-best-time"
                            value={formValues[timeField.name] || ""}
                            onChange={(event) =>
                              setFormValues((current) => ({
                                ...current,
                                [timeField.name]: event.target.value,
                              }))
                            }
                            className="w-full appearance-none rounded-[6px] border border-[#1E2B43]/15 bg-white bg-[right_16px_center] bg-no-repeat px-[14px] py-3 pr-10 text-[15px] text-[#1E2B43] outline-none transition-colors focus:border-[#BC9155]"
                            style={{
                              backgroundImage:
                                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%235C677D' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E\")",
                            }}
                          >
                            <option value="">Select a time</option>
                            {opts(timeField.options).map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                        </div>
                      ) : null}
                    </div>
                    <fieldset className="mt-4 m-0 border-0 p-0">
                      <legend className="mb-1.5 block text-[13px] font-semibold uppercase tracking-[0.5px] text-[#1E2B43]">
                        Preferred Contact Method *
                      </legend>
                      <div className="flex flex-wrap gap-2.5 md:flex-nowrap">
                        {["call", "text", "email"].map((method) => (
                          <label
                            key={method}
                            className={cx(
                              "inline-flex min-w-[84px] cursor-pointer items-center justify-center rounded-[6px] border px-5 py-3 text-[13px] font-medium transition-colors",
                              contactMethod === method
                                ? "border-[#BC9155] bg-[#BC9155]/[0.06] text-[#BC9155]"
                                : "border-[#1E2B43]/18 bg-white text-[#1E2B43] hover:border-[#BC9155]",
                            )}
                          >
                            <input
                              type="radio"
                              checked={contactMethod === method}
                              onChange={() => setContactMethod(method)}
                              className="sr-only"
                            />
                            <span>
                              {method === "call"
                                ? "Call"
                                : method === "text"
                                  ? "Text"
                                  : "Email"}
                            </span>
                          </label>
                        ))}
                      </div>
                    </fieldset>
                    {messageField ? (
                      <div className="mt-4">
                        <label
                          htmlFor="kitchen-message"
                          className="mb-1.5 block text-[13px] font-semibold uppercase tracking-[0.5px] text-[#1E2B43]"
                        >
                          {messageField.label}
                        </label>
                        <textarea
                          id="kitchen-message"
                          rows={4}
                          value={formValues[messageField.name] || ""}
                          placeholder={messageField.placeholder || ""}
                          onChange={(event) =>
                            setFormValues((current) => ({
                              ...current,
                              [messageField.name]: event.target.value,
                            }))
                          }
                          className="min-h-[120px] w-full rounded-[6px] border border-[#1E2B43]/15 bg-white px-[14px] py-3 text-[15px] leading-[1.6] text-[#1E2B43] outline-none transition-colors focus:border-[#BC9155]"
                        />
                      </div>
                    ) : null}
                    <div className="mt-2 grid gap-4 md:grid-cols-2">
                      <div>
                        <button
                          type="button"
                          className="flex min-h-[52px] w-full items-center justify-center gap-2 rounded-[8px] border border-[#1E2B43]/15 bg-white px-5 py-3 text-[15px] font-semibold tracking-[0.3px] text-[#1E2B43] transition-colors hover:border-[#BC9155]"
                          onClick={() =>
                            document.getElementById("kitchen-files")?.click()
                          }
                        >
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="17 8 12 3 7 8" />
                            <line x1="12" y1="3" x2="12" y2="15" />
                          </svg>
                          Upload Photos
                        </button>
                        <input
                          id="kitchen-files"
                          type="file"
                          multiple
                          accept="image/jpeg,image/png,image/heic,.heic"
                          hidden
                          onChange={(event) =>
                            setFileNames(
                              Array.from(event.target.files || []).map(
                                (file) => file.name,
                              ),
                            )
                          }
                        />
                        {fileNames.length ? (
                          <p className="mt-1.5 text-[12px] text-[#5C677D]">
                            {fileNames.join(", ")}
                          </p>
                        ) : null}
                      </div>
                      <button
                        type="submit"
                        className="min-h-[52px] rounded-[8px] bg-[#BC9155] px-5 py-3 text-[15px] font-semibold tracking-[0.3px] text-white transition-all hover:-translate-y-px hover:bg-[#A57D48] hover:shadow-[0_4px_12px_rgba(188,145,85,0.3)]"
                      >
                        {lead?.submit_label || "Send Request"}
                      </button>
                    </div>
                    <p className="mt-4 text-center text-[13px] italic text-[#5C677D]">
                      {lead?.consent_text}
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
        {financing ? (
          <div className="border-t border-t-[#1E2B43]/8 bg-white px-4 py-14 md:px-10">
            <div className="mx-auto flex max-w-[1200px] flex-col items-center gap-6 text-center md:flex-row md:justify-between md:text-left">
              <div className="flex flex-col items-center gap-4 md:flex-row">
                <div className="text-[24px] font-bold tracking-[-0.3px]">
                  <span className="text-[#6BBF4E]">Green</span>
                  <span className="text-[#1E2B43]">Sky</span>
                </div>
                <p className="text-[16px] leading-[1.6] text-[#5C677D]">
                  <strong className="text-[#1E2B43]">{financing.title}.</strong>{" "}
                  {financing.content}
                </p>
              </div>
              {financing.cta?.url ? (
                <a
                  href={financing.cta.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[52px] min-w-[280px] items-center justify-center gap-[10px] rounded-[8px] bg-[#BC9155] px-8 py-3 text-[15px] font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-[#A57D48] hover:shadow-[0_4px_12px_rgba(188,145,85,0.3)]"
                >
                  {financing.cta.label || "Check Financing Options"}
                  <Arrow />
                </a>
              ) : null}
            </div>
          </div>
        ) : null}
        <section className="bg-[#F5F1E9] px-4 py-20 md:px-10">
          <div className="mx-auto max-w-[1240px]">
            <div className="mb-10 text-center">
              <span className="mb-4 inline-block pl-5 text-[11px] font-bold uppercase tracking-[1.5px] text-[#9A7340] before:relative before:-left-5 before:top-[-3px] before:inline-block before:h-[2px] before:w-[10px] before:bg-[#BC9155]">
                {related?.eyebrow || "Related Services"}
              </span>
              <h2 className="font-serif text-[clamp(28px,3.5vw,44px)] font-bold tracking-[-0.5px]">
                You May Also <span className="text-[#BC9155]">Need</span>
              </h2>
              <p className="mx-auto mt-3 max-w-[640px] text-[17px] leading-[1.75] text-[#5C677D]">
                Many {(serviceLabel || "home remodeling").toLowerCase()}{" "}
                projects include or lead to these related services.
              </p>
            </div>
            <div className="grid gap-8 lg:grid-cols-3">
              {(related?.items || []).map((item: any, index: number) => {
                const href = relatedHref(item) || "#";
                return (
                  <article
                    key={`${item.title}-${index}`}
                    className="group flex h-full flex-col overflow-hidden rounded-[8px] border-b-2 border-b-transparent bg-white shadow-[0_2px_12px_rgba(30,43,67,0.06),0_1px_3px_rgba(30,43,67,0.04)] transition-all hover:-translate-y-1 hover:border-b-[#BC9155] hover:shadow-[0_12px_28px_rgba(30,43,67,0.1),0_28px_56px_rgba(30,43,67,0.12)]"
                  >
                    <div className="relative h-[220px] overflow-hidden">
                      {linkNode(
                        href,
                        <img
                          src={media(
                            item.image,
                            "/services/bathroom-remodeling-ct.jpg",
                          )}
                          alt={item.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />,
                        "absolute inset-0 block",
                      )}
                    </div>
                    <div className="flex flex-1 flex-col px-7 py-8">
                      <h3 className="mb-3 text-[22px] font-bold">
                        {linkNode(href, item.title, "hover:text-[#BC9155]")}
                      </h3>
                      <p className="flex-1 text-[14px] leading-[1.75] text-[#5C677D]">
                        {item.description}
                      </p>
                      {linkNode(
                        href,
                        <>
                          <span>Learn More</span>
                          <Arrow />
                        </>,
                        "mt-[18px] inline-flex items-center gap-[6px] text-[14px] font-semibold text-[#BC9155] transition-all hover:gap-[10px]",
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <style jsx global>{`
        .brand-mask {
          -webkit-mask-image: linear-gradient(
            to right,
            transparent,
            black 10%,
            black 90%,
            transparent
          );
          mask-image: linear-gradient(
            to right,
            transparent,
            black 10%,
            black 90%,
            transparent
          );
        }
        .brand-track {
          animation: kitchen-brand-scroll 32s linear infinite;
        }
        .brand-track:hover {
          animation-play-state: paused;
        }
        .kitchen-fade-up {
          opacity: 0;
          transform: translateY(30px);
          transition:
            opacity 0.7s ease,
            transform 0.7s ease;
        }
        .kitchen-fade-up.is-visible {
          opacity: 1;
          transform: translateY(0);
        }
        .kitchen-multi-checkbox {
          -webkit-appearance: none;
          appearance: none;
          margin: 0;
          min-width: 18px;
          min-height: 18px;
          padding: 0;
          position: relative;
          flex-shrink: 0;
        }
        .kitchen-multi-checkbox:checked {
          background: #bc9155;
          border-color: #bc9155;
        }
        .kitchen-multi-checkbox:checked::after {
          content: "";
          position: absolute;
          left: 5px;
          top: 2px;
          width: 5px;
          height: 9px;
          border: solid #fff;
          border-width: 0 2px 2px 0;
          transform: rotate(45deg);
        }
        @keyframes kitchen-brand-scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .brand-track {
            animation: none;
          }
          .kitchen-fade-up {
            opacity: 1;
            transform: none;
            transition: none;
          }
        }
      `}</style>
    </div>
  );
}

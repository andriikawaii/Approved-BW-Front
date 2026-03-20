"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import type { CMSPage } from "@/types/cms";
import { DarkTrustStrip, FinancingStrip, HeroTrustBar, LeadFormSection, cls, label, linkNode, media, parts, section, sections, trustIcon } from "./template-utils";

type RichTextData = {
  eyebrow?: string | null;
  title?: string | null;
  highlight_text?: string | null;
  content?: string | null;
  style_variant?: string | null;
  image?: string | null;
  cta?: { label?: string; url?: string } | null;
};

const FALLBACK_MEDIA: Record<string, string> = {
  "/hero/builtwell-job-site-aerial-hero-ct.jpg": "/portfolio/builtwell-job-site-aerial-ct.jpg",
  "/hero/builtwell-team-van-consultation-hero-ct.jpg": "/portfolio/builtwell-team-client-arrival-ct.jpeg",
  "/team/builtwell-owner-handshake-client-ct-02.jpg": "/portfolio/builtwell-contractor-sign-consultation-ct-01.jpg",
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
  "/images/areas/fairfield-county.png": "/images/areas/fairfield-county.jpg",
  "/images/areas/new-haven-county.png": "/images/areas/new-haven-county.jpg",
};

function localMedia(value?: string | null, fallback = "") {
  const source = value || "";
  if (!source) return fallback;
  try {
    const normalized = source.startsWith("http") ? new URL(source).pathname : source;
    return FALLBACK_MEDIA[source] || FALLBACK_MEDIA[normalized] || source || fallback;
  } catch {
    return FALLBACK_MEDIA[source] || source || fallback;
  }
}

function paras(value?: string | null) {
  return (value || "").replace(/\r/g, "").split(/\n{2,}/).map((item) => item.trim()).filter(Boolean);
}

const opts = (value?: Array<string | { label: string; value: string }> | null) => (value || []).map((item) => typeof item === "string" ? { label: item, value: item } : item);

/* ── fade-up scroll animation hook ── */
function useFadeUp() {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const els = container.querySelectorAll<HTMLElement>(".fade-up");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).style.opacity = "1";
            (entry.target as HTMLElement).style.transform = "translateY(0)";
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  return containerRef;
}

const fadeUpStyle: React.CSSProperties = {
  opacity: 0,
  transform: "translateY(30px)",
  transition: "opacity 0.7s ease, transform 0.7s ease",
};

/* ── trust strip fallback data ── */
const defaultTrustStrip = [
  { icon: "star", label: "Google Rating", value: "4.9", url: "https://www.google.com/search?q=builtwell+ct+reviews" },
  { icon: "shield", label: "BBB A+ Accredited", url: "https://www.bbb.org/search?find_country=USA&find_text=builtwell+ct&find_loc=Orange%2C+CT" },
  { icon: "check", label: "Trusted on Houzz", url: "https://www.houzz.com/professionals/general-contractors/builtwell-ct" },
  { icon: "calendar", label: "CT HIC License #0668405", url: "https://www.elicense.ct.gov/Lookup/LicenseLookup.aspx" },
  { icon: "check", label: "Verified on Angi & Thumbtack", url: "https://www.angi.com/companylist/us/ct/orange/builtwell-ct-reviews-" },
];

export function ServicesOverviewPageTemplate({ page }: { page: CMSPage }) {
  const hero = section<any>(page, "hero");
  const servicesGrid = section<any>(page, "services_grid");
  const process = section<any>(page, "process_steps");
  const brands = section<any>(page, "logo_strip");
  const areas = section<any>(page, "areas_served");
  const trustBars = sections<any>(page, "trust_bar");
  const lead = section<any>(page, "lead_form");
  const financing = sections<RichTextData>(page, "rich_text").find((item) => item.style_variant === "financing_strip");

  const heroParts = parts(hero?.headline, "Services in Connecticut");
  const gridParts = parts(servicesGrid?.title, servicesGrid?.highlight_text || "Services");
  const processParts = parts(process?.title, "Process");
  const brandsParts = parts(brands?.title, "Stand Behind");
  const areasParts = parts(areas?.title, areas?.highlight_text || "Work");

  const [countyOpen, setCountyOpen] = useState<Record<number, boolean>>({});
  const [activeProcessStep, setActiveProcessStep] = useState(0);
  const fadeRef = useFadeUp();

  const trustStripItems = trustBars[1]?.items || defaultTrustStrip;

  return (
    <div ref={fadeRef} className="bg-[#f5f1e9] text-[#1e2b43]">

      {/* ══════ HERO ══════ */}
      <section className="relative isolate overflow-hidden bg-[#151e30] px-5 pt-[120px] text-white md:px-10">
        <div className="absolute inset-0 bg-cover bg-center opacity-[0.78]" style={{ backgroundImage: `url(${localMedia(hero?.background_image, "/portfolio/builtwell-job-site-aerial-ct.jpg")})` }} />
        <div className="absolute inset-0" style={{
          background: [
            "radial-gradient(ellipse at 97% 97%, rgba(21,30,48,1) 0%, rgba(21,30,48,0.9) 8%, transparent 30%)",
            "radial-gradient(ellipse at 3% 97%, rgba(21,30,48,0.9) 0%, transparent 25%)",
            "linear-gradient(180deg, rgba(21,30,48,0.35) 0%, rgba(21,30,48,0.2) 30%, rgba(21,30,48,0.45) 65%, rgba(21,30,48,0.92) 100%)",
          ].join(", "),
        }} />
        <div className="relative z-10 mx-auto flex min-h-[50vh] max-w-[1240px] flex-col items-center justify-center pb-12 text-center">
          <ol className="fade-up mb-5 flex list-none items-center gap-0 text-[13px] font-medium text-white/[0.92] [text-shadow:0_1px_6px_rgba(0,0,0,0.7)]" style={fadeUpStyle}>
            <li>{linkNode("/", "Home", "text-white/85 transition-colors hover:text-[#bc9155]")}</li>
            <li className="before:mx-2.5 before:text-[12px] before:text-[#bc9155] before:content-['›']">
              <span className="font-semibold text-white">Services</span>
            </li>
          </ol>
          <h1 className="fade-up mb-3 max-w-[900px] text-[clamp(40px,4.5vw,56px)] font-bold leading-[1.08] tracking-[-0.5px] text-white [text-shadow:0_2px_20px_rgba(0,0,0,0.5)]" style={{ ...fadeUpStyle, transitionDelay: "0.1s" }}>
            <span className="text-white">{heroParts.before || "Home Remodeling "}</span>
            <span className="text-[#bc9155]">{heroParts.accent || "Services in Connecticut"}</span>
            <span className="text-white">{heroParts.after}</span>
          </h1>
          {hero?.subheadline ? (
            <p className="fade-up mx-auto mt-4 max-w-[560px] text-center text-[17px] font-normal leading-[1.7] text-white/[0.82]" style={{ ...fadeUpStyle, transitionDelay: "0.2s" }}>
              {hero.subheadline}
            </p>
          ) : null}
          {/* CTA buttons */}
          {(hero?.badges || []).length > 0 && (
            <div className="fade-up mt-8 flex flex-wrap items-stretch justify-center gap-4" style={{ ...fadeUpStyle, transitionDelay: "0.3s" }}>
              {(hero?.badges || []).map((badge: any, index: number) => {
                const isPrimary = !!badge.is_primary;
                return (
                  <div key={`${badge.label || "badge"}-${index}`}>
                    {linkNode(
                      badge.url || "#",
                      <div
                        className={cls(
                          "flex min-w-[180px] flex-col items-center rounded-[8px] border px-7 py-4 text-center transition-all duration-300 hover:-translate-y-[2px]",
                          isPrimary
                            ? "border-[#bc9155] border-b-2 border-b-[#a57d48] bg-[#bc9155] text-white hover:border-[#d4a95a] hover:border-b-[#a57d48] hover:bg-[#d4a95a] hover:shadow-[0_8px_24px_rgba(188,145,85,0.4)]"
                            : "border-b-2 border-b-[#bc9155] border-white/[0.18] bg-[rgba(10,18,35,0.42)] text-white backdrop-blur-[12px] hover:border-white/[0.28] hover:border-b-[#bc9155] hover:bg-[rgba(10,18,35,0.62)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.3),0_0_0_1px_rgba(188,145,85,0.2)]",
                        )}
                      >
                        <div className={cls("text-[11px] uppercase tracking-[1.2px]", isPrimary ? "opacity-90" : "opacity-70")}>
                          {badge.label}
                        </div>
                        {badge.value ? (
                          <div className="mt-1 text-[18px] font-semibold" style={{ fontFamily: "'Playfair Display', serif" }}>
                            {badge.value}
                          </div>
                        ) : null}
                      </div>,
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ══════ SERVICES GRID ══════ */}
      <section className="bg-[#f5f1e9] px-5 py-24 md:px-10">
        <div className="mx-auto max-w-[1240px]">
          <div className="fade-up mx-auto mb-20 max-w-3xl text-center" style={fadeUpStyle}>
            {label(servicesGrid?.eyebrow || "What We Do")}
            <h2 className="font-serif text-[clamp(28px,3.5vw,44px)] font-bold tracking-[-0.5px]">
              {gridParts.before || "Our "}
              <span className="text-[#bc9155]">{gridParts.accent || "Services"}</span>
              {gridParts.after}
            </h2>
            {servicesGrid?.subtitle ? <p className="mx-auto mt-6 max-w-[620px] text-[17px] leading-[1.7] text-[#5c677d]">{servicesGrid.subtitle}</p> : null}
          </div>

          <div className="fade-up grid gap-8 sm:grid-cols-2 lg:grid-cols-3" style={{ ...fadeUpStyle, transitionDelay: "0.15s" }}>
            {(servicesGrid?.items || []).map((item: any, index: number) => (
              <article key={`${item.title}-${index}`} className="group flex flex-col overflow-hidden rounded-[8px] border-b-[3px] border-b-transparent bg-white hover:border-b-[#bc9155] shadow-[0_2px_12px_rgba(30,43,67,0.06),0_1px_3px_rgba(30,43,67,0.04)] transition-all duration-[350ms] [transition-timing-function:cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(30,43,67,0.1),0_28px_56px_rgba(30,43,67,0.12)]">
                <div className="h-[280px] overflow-hidden">
                  <img src={localMedia(item.image, "/images/services/service-kitchen.jpg")} alt={item.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="flex flex-1 flex-col px-7 pb-8 pt-7">
                  <h3 className="mb-3 text-[22px] font-bold leading-[1.2]">{item.url ? linkNode(item.url, item.title, "transition-colors group-hover:text-[#bc9155]") : item.title}</h3>
                  <p className="mb-5 flex-1 text-[15px] leading-[1.7] text-[#5c677d]">{item.summary}</p>
                  <div className="mb-5 flex flex-wrap gap-3">
                    {item.price ? <span className="inline-flex items-center gap-1.5 rounded-full bg-[#bc91551a] px-3.5 py-1.5 text-[12px] font-semibold text-[#9a7340]"><span className="text-[#bc9155]">$</span>{item.price}</span> : null}
                    {item.timeline ? <span className="inline-flex items-center gap-1.5 rounded-full bg-[#bc91551a] px-3.5 py-1.5 text-[12px] font-semibold text-[#9a7340]"><svg className="h-3.5 w-3.5 text-[#bc9155]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>{item.timeline}</span> : null}
                  </div>
                  {item.url ? linkNode(item.url, <><span>{item.cta_label || "Learn More"}</span><ArrowRight className="h-[14px] w-[14px]" /></>, "inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#bc9155] transition-all duration-300 hover:gap-2.5") : null}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ OUR PROCESS — matching home page style ══════ */}
      <section className="relative overflow-hidden px-5 py-[52px] text-white md:px-8 md:py-20 lg:px-10 lg:py-[100px]">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/portfolio/builtwell-team-contractors-ct-04.png')" }} aria-hidden="true" />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(10,18,34,0.90)_0%,rgba(30,43,67,0.85)_100%)]" />
        <div className="relative z-10 mx-auto max-w-[1280px]">
          <div className="fade-up mb-14 text-center" style={fadeUpStyle}>
            {label(process?.eyebrow || "Our Process", true)}
            <h2 className="font-serif text-[clamp(28px,3.5vw,44px)] font-bold tracking-[-0.5px]">
              {processParts.before || "Our Remodeling "}
              <span className="text-[#bc9155]">{processParts.accent || "Process"}</span>
              {processParts.after}
            </h2>
            {process?.subtitle ? <p className="mx-auto mt-4 max-w-[860px] text-[15px] leading-[1.8] text-white/78">{process.subtitle}</p> : null}
          </div>

          <div className="fade-up relative mx-auto grid max-w-full gap-0 lg:max-w-none lg:grid-cols-5" style={{ ...fadeUpStyle, transitionDelay: "0.15s" }}>
            {/* Connecting line — vertical on mobile, horizontal on desktop */}
            <div className="absolute bottom-[34px] left-[25px] top-[28px] w-0.5 bg-[#bc9155]/25 md:left-[33px] md:top-[34px] lg:bottom-auto lg:left-[10%] lg:right-[10%] lg:top-[34px] lg:h-0.5 lg:w-auto" />
            {(process?.steps || []).map((item: any, index: number) => (
              <button
                type="button"
                key={`${item.title}-${index}`}
                onClick={() => setActiveProcessStep(activeProcessStep === index ? -1 : index)}
                className={cls(
                  "relative flex w-full cursor-pointer items-start gap-4 rounded-lg border-0 bg-transparent px-0 py-3 text-left transition-colors duration-300 hover:bg-[#bc9155]/[0.08] md:gap-5 md:py-4 lg:block lg:px-4 lg:pb-5 lg:pt-4 lg:text-center",
                  activeProcessStep === index && "bg-[#bc9155]/[0.14]",
                )}
                aria-expanded={activeProcessStep === index}
              >
                <div className="relative z-10 flex h-[50px] w-[50px] shrink-0 items-center justify-center rounded-full border-[2.5px] border-[#bc9155] bg-[#bc9155]/[0.42] font-serif text-[18px] font-bold text-[#f5e0c0] shadow-[0_0_0_4px_rgba(188,145,85,0.12)] md:h-[68px] md:w-[68px] md:text-2xl lg:-mt-2 lg:mx-auto lg:mb-5">
                  {index + 1}
                </div>
                <div>
                  <h3 className="mb-1.5 text-left text-base font-semibold text-white md:mb-3 md:text-lg lg:text-center">{item.title}</h3>
                  {item.description ? (
                    <p className={cls(
                      "text-left text-[14px] leading-[1.6] text-white/70 transition-all duration-300 lg:text-center lg:leading-[1.65]",
                      activeProcessStep === index ? "max-h-[200px] opacity-100" : "max-h-none opacity-100 lg:max-h-0 lg:overflow-hidden lg:opacity-0",
                    )}>
                      {item.description}
                    </p>
                  ) : null}
                </div>
              </button>
            ))}
          </div>
          <p className="mt-7 hidden text-center text-[13px] text-white/40 lg:block">Click any step to learn more</p>
        </div>
      </section>

      {/* ══════ TRUSTED BRANDS ══════ */}
      <section className="bg-white px-5 py-24 md:px-10">
        <div className="mx-auto max-w-[1240px] text-center">
          <div className="fade-up" style={fadeUpStyle}>
            {label("Trusted Brands")}
            <h2 className="font-serif text-[clamp(28px,3.5vw,44px)] font-bold tracking-[-0.5px]">
              {brandsParts.before || "Materials We "}
              <span className="text-[#bc9155]">{brandsParts.accent || "Stand Behind"}</span>
              {brandsParts.after}
            </h2>
            {brands?.subtitle ? <p className="mx-auto mt-4 max-w-[760px] text-[15px] leading-[1.8] text-[#5c677d]">{brands.subtitle}</p> : null}
          </div>
          <div className="fade-up relative mx-auto mt-14 max-w-[1320px] overflow-hidden" style={{ ...fadeUpStyle, transitionDelay: "0.15s" }}>
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-white to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-white to-transparent" />
            <div className="flex w-max min-w-full animate-[servicesLogoMarquee_28s_linear_infinite] items-center gap-16 whitespace-nowrap">
              {[...(brands?.items || []), ...(brands?.items || [])].map((item: any, index: number) => (
                <a key={`${item.name}-${index}`} href={item.url || "#"} target="_blank" rel="noreferrer" className="flex min-h-[30px] items-center justify-center text-center opacity-90 transition-opacity hover:opacity-100">
                  {item.logo ? (
                    <img src={localMedia(item.logo, "/logos/builtwell-logo-text-only.png")} alt={item.name} className="max-h-8 w-auto object-contain" />
                  ) : (
                    <span className="text-[12px] font-semibold uppercase tracking-[0.24em] text-[#7f8898]">{item.name}</span>
                  )}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════ AREAS WE SERVE ══════ */}
      <ServicesAreasSection data={areas} areasParts={areasParts} countyOpen={countyOpen} setCountyOpen={setCountyOpen} />

      {/* ══════ TRUST STRIP (Google rating section) ══════ */}
      <DarkTrustStrip items={trustStripItems} />

      {/* ══════ LEAD FORM ══════ */}
      <LeadFormSection page={page} data={lead} accent="Project" />

      {/* ══════ FINANCING ══════ */}
      <FinancingStrip data={financing} />
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
   Services-specific AreasSection with reference-matched style
   ──────────────────────────────────────────────────────────── */
function ServicesAreasSection({
  data,
  areasParts,
  countyOpen,
  setCountyOpen,
}: {
  data: any;
  areasParts: { before: string; accent: string; after: string };
  countyOpen: Record<number, boolean>;
  setCountyOpen: React.Dispatch<React.SetStateAction<Record<number, boolean>>>;
}) {
  const areasFadeRef = useFadeUp();

  return (
    <section ref={areasFadeRef} className="bg-[#f5f1e9] px-5 py-24 md:px-10">
      <div className="mx-auto max-w-[1240px]">
        <div className="fade-up mb-16 text-center" style={fadeUpStyle}>
          {label("Areas We Serve")}
          <h2 className="mx-auto max-w-[780px] font-serif text-[clamp(28px,3.5vw,44px)] font-bold tracking-[-0.5px]">
            {areasParts.before || "Where We "}
            <span className="text-[#bc9155]">{areasParts.accent || "Work"}</span>
            {areasParts.after}
          </h2>
          {data?.subtitle ? (
            <p className="mx-auto mt-5 max-w-[700px] text-[17px] leading-[1.75] text-[#5c677d]">{data.subtitle}</p>
          ) : null}
        </div>

        <div className="fade-up grid gap-8 lg:grid-cols-2" style={{ ...fadeUpStyle, transitionDelay: "0.15s" }}>
          {(data?.counties || []).map((county: any, index: number) => {
            const expanded = !!countyOpen[index];
            const mainTowns = county.towns || [];
            const extraTowns = county.extra_towns || [];
            const towns = expanded ? [...mainTowns, ...extraTowns] : mainTowns;
            const links = county.town_links || {};

            return (
              <article
                key={`${county.name || "county"}-${index}`}
                className="flex flex-col overflow-hidden rounded-[12px] border-b-[3px] border-b-transparent bg-white shadow-[0_2px_12px_rgba(30,43,67,0.06),0_1px_3px_rgba(30,43,67,0.04)] transition-all duration-[350ms] [transition-timing-function:cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-1.5 hover:border-b-[#bc9155] hover:shadow-[0_16px_40px_rgba(30,43,67,0.1),0_32px_64px_rgba(30,43,67,0.08)]"
              >
                {/* Image with gradient overlay + zoom */}
                <div className="group relative h-[220px] overflow-hidden">
                  <img
                    src={localMedia(county.image, index === 0 ? "/images/areas/fairfield-county.jpg" : "/images/areas/new-haven-county.jpg")}
                    alt={county.name || "BuiltWell CT service area"}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[rgba(30,43,67,0.4)] to-transparent" />
                </div>

                <div className="flex flex-1 flex-col p-7 pb-8">
                  <h3 className="text-[24px] font-bold">{county.name}</h3>
                  {county.phone ? (
                    <p className="mt-1 text-[15px] text-[#5c677d]">
                      Call:{" "}
                      <a href={`tel:${county.phone.replace(/\D/g, "")}`} className="font-semibold text-[#bc9155] hover:underline">
                        {county.phone}
                      </a>
                    </p>
                  ) : null}
                  {county.description ? (
                    <p className="mt-4 border-b border-[rgba(30,43,67,0.06)] pb-5 text-[14px] leading-[1.7] text-[#5c677d]">
                      {county.description}
                    </p>
                  ) : null}

                  {/* Town pills — first 2 rows (8 items) get gold bg hover, rest text-only hover */}
                  <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {towns.map((town: string, townIndex: number) => {
                      const hasLink = !!links[town];
                      const isTopRow = townIndex < 8;
                      if (hasLink && isTopRow) {
                        return (
                          <div key={`${county.name}-${town}-${townIndex}`}>
                            {linkNode(
                              links[town] || county.url || "#",
                              town,
                              "block rounded-full bg-[#f5f1e9] px-3 py-[7px] text-center text-[11px] font-semibold tracking-[0.2px] text-[#1e2b43] transition-all duration-200 hover:bg-[#bc9155] hover:text-white",
                            )}
                          </div>
                        );
                      }
                      return (
                        <span
                          key={`${county.name}-${town}-${townIndex}`}
                          className={cls(
                            "block rounded-full bg-[#f5f1e9] px-3 py-[7px] text-center text-[11px] font-semibold tracking-[0.2px] text-[#1e2b43] transition-all duration-200",
                            isTopRow ? "hover:bg-[#bc9155] hover:text-white" : "hover:text-[#9a7340]",
                          )}
                        >
                          {town}
                        </span>
                      );
                    })}
                  </div>

                  {extraTowns.length ? (
                    <button
                      type="button"
                      onClick={() => setCountyOpen((c) => ({ ...c, [index]: !c[index] }))}
                      className="mt-3 text-center text-[13px] font-semibold text-[#bc9155] transition-colors hover:text-[#9a7340]"
                    >
                      {expanded ? "Show Less ▴" : "See All Towns +"}
                    </button>
                  ) : null}

                  {county.url
                    ? linkNode(
                        county.url,
                        <>
                          <span>{county.cta_label || `Learn more about ${county.name}`}</span>
                          <ArrowRight className="h-4 w-4" />
                        </>,
                        "mt-5 inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#bc9155] transition-all duration-300 hover:gap-2.5",
                      )
                    : null}
                </div>
              </article>
            );
          })}
        </div>

        <p className="fade-up mt-6 text-center text-[14px] text-[#5c677d]" style={{ ...fadeUpStyle, transitionDelay: "0.25s" }}>
          Not sure if we cover your area? {linkNode("/contact/", "Contact our Connecticut remodeling team", "font-semibold text-[#bc9155]")} and we&apos;ll let you know.
        </p>
      </div>
    </section>
  );
}

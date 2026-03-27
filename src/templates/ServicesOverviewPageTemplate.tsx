"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import type { CMSPage } from "@/types/cms";
import { AreasSection, FinancingStrip, HeroTrustBar, LeadFormSection, cls, label, linkNode, media, parts, section, sections } from "./template-utils";

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
  { icon: "check-circle", label: "Trusted on Houzz", url: "#houzz" },
  { icon: "calendar", label: "CT HIC License #0668405", url: "https://www.elicense.ct.gov/Lookup/LicenseLookup.aspx" },
  { icon: "check-circle", label: "Verified on Angi", url: "#angi" },
];

function ServicesTrustIcon({ icon }: { icon?: string | null }) {
  const key = (icon || "").toLowerCase();
  if (key === "star") {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" aria-hidden="true">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    );
  }
  if (key === "calendar" || key === "clock") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <path d="M8 2v4M16 2v4M3 10h18" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

function ServicesTrustStrip({ items }: { items?: any[] }) {
  const list = items || [];
  return (
    <>
      <div className="services-trust-strip" role="region" aria-label="Trust indicators">
        <div className="services-trust-strip-inner">
          {list.map((item: any, index: number) => {
            const text = [item?.label, item?.value].filter(Boolean).join(" ").trim();
            const href = item?.url || "#";
            const isExternal = /^https?:\/\//i.test(href);
            return (
              <div key={`${text || "trust"}-${index}`} className="contents">
                <a
                  href={href}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noreferrer noopener" : undefined}
                  className="services-trust-strip-item"
                  aria-label={text || "Trust item"}
                >
                  <ServicesTrustIcon icon={item?.icon} />
                  {text}
                </a>
                {index < list.length - 1 ? <div className="services-trust-strip-divider" /> : null}
              </div>
            );
          })}
        </div>
      </div>
      <style jsx global>{`
        .services-trust-strip {
          background: linear-gradient(135deg, #1e2b43 0%, #151e30 100%);
          padding: 56px 40px;
          position: relative;
          overflow: hidden;
        }
        .services-trust-strip::before {
          content: "";
          position: absolute;
          inset: 0;
          background: url('/hero/builtwell-job-site-aerial-hero-ct.jpg') center/cover no-repeat;
          opacity: 0.06;
        }
        .services-trust-strip-inner {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0;
          flex-wrap: wrap;
          position: relative;
          z-index: 1;
        }
        .services-trust-strip-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          font-size: 13px;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.9);
          letter-spacing: 0.4px;
          text-decoration: none;
          transition: all 0.3s;
          padding: 20px 32px;
          flex: 1;
          min-width: 180px;
          text-align: center;
          white-space: nowrap;
        }
        .services-trust-strip-item:hover {
          color: #bc9155;
          transform: translateY(-2px);
        }
        .services-trust-strip-item svg {
          color: #bc9155;
          flex-shrink: 0;
          width: 22px;
          height: 22px;
          filter: drop-shadow(0 2px 4px rgba(188, 145, 85, 0.3));
        }
        .services-trust-strip-divider {
          width: 1px;
          height: 40px;
          background: rgba(255, 255, 255, 0.1);
          flex-shrink: 0;
        }
        @media (max-width: 1024px) {
          .services-trust-strip-inner { gap: 20px; }
          .services-trust-strip-divider { display: none; }
        }
        @media (max-width: 768px) {
          .services-trust-strip-divider { display: none; }
          .services-trust-strip-item {
            padding: 16px 12px;
            min-width: 33.33%;
            font-size: 11px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
          }
        }
      `}</style>
    </>
  );
}

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
  const [activeProcessStep, setActiveProcessStep] = useState(-1);
  const fadeRef = useFadeUp();

  const trustStripItems = trustBars[1]?.items || defaultTrustStrip;

  return (
    <div ref={fadeRef} className="bg-[#f5f1e9] text-[#1e2b43]">

      {/* ══════ HERO ══════ */}
      <section className="relative isolate overflow-hidden bg-[#151e30] px-5 pb-8 pt-[60px] text-white md:px-10">
        <div className="absolute inset-0 bg-cover bg-[center_15%] opacity-[0.72]" style={{ backgroundImage: `url(${localMedia(hero?.background_image, "/hero/builtwell-job-site-aerial-hero-ct.jpg")})` }} />
        <div className="absolute inset-0" style={{
          background: [
            "radial-gradient(ellipse at 97% 97%, rgba(21,30,48,1) 0%, rgba(21,30,48,0.9) 8%, transparent 30%)",
            "radial-gradient(ellipse at 3% 97%, rgba(21,30,48,0.9) 0%, transparent 25%)",
            "linear-gradient(180deg, rgba(21,30,48,0.35) 0%, rgba(21,30,48,0.2) 30%, rgba(21,30,48,0.45) 65%, rgba(21,30,48,0.92) 100%)",
          ].join(", "),
        }} />
        <div className="relative z-10 mx-auto flex min-h-[40vh] max-w-[1240px] flex-col items-center justify-center text-center">
          <ol className="fade-up mb-5 flex list-none items-center gap-0 text-[13px] font-medium text-white/[0.92] [text-shadow:0_1px_6px_rgba(0,0,0,0.7)]" style={fadeUpStyle}>
            <li>{linkNode("/", "Home", "text-white/85 transition-colors hover:text-[#bc9155]")}</li>
            <li className="before:mx-2.5 before:text-[12px] before:text-[#bc9155] before:content-['›']">
              <span className="font-semibold text-white">Services</span>
            </li>
          </ol>
          <h1 className="fade-up mb-3 whitespace-nowrap font-serif text-[clamp(28px,4.5vw,56px)] font-bold leading-[1.08] tracking-[-0.5px] text-white [text-shadow:0_2px_20px_rgba(0,0,0,0.5)]" style={{ ...fadeUpStyle, transitionDelay: "0.1s" }}>
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
                            ? "border-[#bc9155] bg-[#bc9155] text-white hover:border-[#d4a95a] hover:bg-[#d4a95a] hover:shadow-[0_8px_24px_rgba(188,145,85,0.4)]"
                            : "border-white/[0.22] bg-[rgba(10,18,35,0.42)] text-white backdrop-blur-[12px] hover:border-white/[0.35] hover:bg-[rgba(10,18,35,0.62)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.3)]",
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
      <section className="bg-[#f5f1e9] px-5 py-[52px] md:px-8 md:py-20 lg:px-10 lg:py-[100px]">
        <div className="mx-auto max-w-[1240px]">
          <div className="fade-up mx-auto mb-16 max-w-3xl text-center" style={fadeUpStyle}>
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
              <article key={`${item.title}-${index}`} className="group flex flex-col overflow-hidden rounded-[8px] border-b-2 border-b-transparent bg-white shadow-[0_2px_12px_rgba(30,43,67,0.06),0_1px_3px_rgba(30,43,67,0.04)] transition-all duration-[350ms] [transition-timing-function:cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-1 hover:border-b-[#bc9155] hover:shadow-[0_12px_28px_rgba(30,43,67,0.1),0_28px_56px_rgba(30,43,67,0.12)]">
                <div className="h-[280px] overflow-hidden">
                  <img src={localMedia(item.image, "/images/services/service-kitchen.jpg")} alt={item.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="flex flex-1 flex-col items-center px-7 pb-8 pt-7 text-center">
                  <h3 className="mb-3 text-[22px] font-bold leading-[1.2]">{item.url ? linkNode(item.url, item.title, "transition-colors group-hover:text-[#bc9155]") : item.title}</h3>
                  <p className="mb-5 flex-1 text-[15px] leading-[1.7] text-[#5c677d]">{item.summary}</p>
                  <div className="mb-5 flex flex-wrap justify-center gap-3">
                    {item.price ? <span className="inline-flex items-center gap-[6px] rounded-full bg-[#bc91551a] px-[14px] py-[6px] text-[12px] font-semibold text-[#9a7340]"><svg className="h-[14px] w-[14px] text-[#bc9155]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>{item.price}</span> : null}
                    {item.timeline ? <span className="inline-flex items-center gap-[6px] rounded-full bg-[#bc91551a] px-[14px] py-[6px] text-[12px] font-semibold text-[#9a7340]"><svg className="h-[14px] w-[14px] text-[#bc9155]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>{item.timeline}</span> : null}
                  </div>
                  {item.url ? linkNode(item.url, <><span>{item.cta_label || "Learn More"}</span><ArrowRight className="h-[14px] w-[14px]" /></>, "inline-flex items-center gap-[6px] text-[14px] font-semibold text-[#bc9155] transition-all duration-300 hover:gap-[10px]") : null}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ OUR PROCESS ══════ */}
      <section className="svc-process scroll-mt-28 px-5 py-[52px] text-white md:px-8 md:py-20 lg:px-10 lg:py-[100px]">
        <div className="svc-process-bg" aria-hidden="true" />
        <div className="svc-process-inner">
          <div className="fade-up svc-process-header" style={fadeUpStyle}>
            <span className="svc-process-label">{process?.eyebrow || "Our Process"}</span>
            <h2>
              {processParts.before || "Our Remodeling "}
              <span className="text-[#bc9155]">{processParts.accent || "Process"}</span>
              {processParts.after}
            </h2>
            <p>{process?.subtitle || "We follow the same five-step process on every project, whether it's a single bathroom or a whole-home renovation. It keeps projects on schedule and keeps you informed at every stage."}</p>
          </div>

          <div className="fade-up svc-process-timeline" style={{ ...fadeUpStyle, transitionDelay: "0.15s" }}>
            {(process?.steps || []).map((item: any, index: number) => (
              <button
                type="button"
                key={`${item.title}-${index}`}
                onClick={() => setActiveProcessStep(activeProcessStep === index ? -1 : index)}
                className={cls("svc-process-step", activeProcessStep === index ? "is-active" : "")}
                aria-expanded={activeProcessStep === index}
              >
                <div className="svc-process-step-num">{index + 1}</div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </button>
            ))}
          </div>
          <p className="svc-process-hint">Click any step to learn more</p>
        </div>
        <style jsx>{`
          .svc-process {
            position: relative;
            overflow: hidden;
            color: #fff;
          }
          .svc-process-bg {
            position: absolute;
            inset: 0;
            background: linear-gradient(135deg, rgba(10,18,34,0.9) 0%, rgba(30,43,67,0.85) 100%);
            z-index: 0;
          }
          .svc-process-inner {
            position: relative;
            z-index: 1;
            max-width: 1280px;
            margin: 0 auto;
          }
          .svc-process-header {
            text-align: center;
            margin-bottom: 64px;
          }
          .svc-process-label {
            display: inline-block;
            font-size: 13px;
            font-weight: 700;
            color: #9a7340;
            text-transform: uppercase;
            letter-spacing: 1.5px;
            margin-bottom: 16px;
            position: relative;
            padding-left: 20px;
          }
          .svc-process-label::before {
            content: '';
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
            width: 10px;
            height: 2px;
            background: #bc9155;
          }
          .svc-process-header h2 {
            font-family: 'Playfair Display', serif;
            font-size: clamp(32px, 3.5vw, 48px);
            font-weight: 700;
            letter-spacing: -0.5px;
            color: #fff;
            margin-bottom: 20px;
          }
          .svc-process-header p {
            font-size: 17px;
            color: rgba(255,255,255,0.6);
            max-width: 700px;
            margin: 0 auto;
            line-height: 1.75;
          }
          .svc-process-timeline {
            display: grid;
            grid-template-columns: repeat(5, minmax(0, 1fr));
            gap: 0;
            position: relative;
          }
          .svc-process-timeline::before {
            content: '';
            position: absolute;
            top: 34px;
            left: 10%;
            right: 10%;
            height: 2px;
            background: rgba(188,145,85,0.25);
          }
          .svc-process-step {
            text-align: center;
            padding: 16px 16px 20px;
            position: relative;
            cursor: pointer;
            border-radius: 8px;
            transition: background 0.3s;
            border: 0;
            background: transparent;
            color: inherit;
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 100%;
            outline: none;
          }
          .svc-process-step:focus,
          .svc-process-step:focus-visible {
            outline: none;
            box-shadow: none;
          }
          .svc-process-step:hover { background: rgba(188,145,85,0.08); }
          .svc-process-step.is-active {
            background: rgba(188,145,85,0.14);
            z-index: 2;
            position: relative;
          }
          .svc-process-step-num {
            width: 68px;
            height: 68px;
            border-radius: 9999px;
            background: rgba(188,145,85,0.42);
            border: 2.5px solid #bc9155;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: -8px auto 20px;
            font-family: 'Playfair Display', serif;
            font-size: 24px;
            font-weight: 700;
            color: #f5e0c0;
            position: relative;
            z-index: 2;
            box-shadow: 0 0 0 4px rgba(188,145,85,0.12);
            flex-shrink: 0;
          }
          .svc-process-step h3 {
            font-family: 'Playfair Display', serif;
            font-size: 18px;
            margin: 0 0 12px;
            color: #fff;
            font-weight: 700;
            line-height: 1.25;
            text-align: center;
          }
          .svc-process-step p {
            font-size: 14px;
            color: rgba(255,255,255,0.7);
            line-height: 1.65;
            max-height: 0;
            opacity: 0;
            overflow: hidden;
            margin: 0;
            transition: max-height 0.4s ease, opacity 0.35s ease, margin-top 0.35s ease;
            text-align: center;
          }
          .svc-process-step.is-active p {
            max-height: 200px;
            opacity: 1;
            margin-top: 8px;
          }
          .svc-process-hint {
            text-align: center;
            margin-top: 28px;
            font-size: 13px;
            color: rgba(255,255,255,0.4);
          }
          @media (max-width: 1024px) {
            .svc-process-timeline {
              grid-template-columns: repeat(3, minmax(0, 1fr));
              gap: 24px;
              max-width: 700px;
              margin: 0 auto;
            }
            .svc-process-timeline::before { display: none; }
            .svc-process-step { padding: 16px 8px; gap: 0; }
            .svc-process-step-num { margin: 0 0 10px; }
            .svc-process-step h3 { font-size: 15px; margin: 0; text-align: center; }
            .svc-process-step p { display: none !important; }
          }
          @media (max-width: 768px) {
            .svc-process-header { margin-bottom: 36px; }
            .svc-process-header h2 { font-size: 24px; margin-bottom: 14px; }
            .svc-process-header p { font-size: 15px; line-height: 1.7; }
            .svc-process-timeline { grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 20px; max-width: 600px; }
            .svc-process-step { padding: 14px 8px; }
            .svc-process-step-num { width: 48px; height: 48px; font-size: 17px; margin: 0 0 8px; }
          }
        `}</style>
      </section>

      {/* ══════ TRUSTED BRANDS ══════ */}
      <section className="bg-[#f5f1e9] px-5 pb-[52px] pt-10 md:px-8 md:pb-20 lg:px-10 lg:pb-[100px]">
        <div className="mx-auto max-w-[1240px] text-center">
          <div className="fade-up mb-10" style={fadeUpStyle}>
            {label("Trusted Brands")}
            <h2 className="mx-auto max-w-[780px] font-serif text-[clamp(28px,3.5vw,44px)] font-bold tracking-[-0.5px]">
              {brandsParts.before || "Materials We "}
              <span className="text-[#bc9155]">{brandsParts.accent || "Stand Behind"}</span>
              {brandsParts.after}
            </h2>
            {brands?.subtitle ? <p className="mx-auto mt-5 max-w-[700px] text-[17px] leading-[1.75] text-[#5c677d]">{brands.subtitle}</p> : null}
          </div>
          <div className="fade-up relative overflow-hidden" style={{
            ...fadeUpStyle,
            transitionDelay: "0.15s",
            maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
            WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          }}>
            <div className="flex w-max items-center gap-12 animate-[servicesLogoMarquee_32s_linear_infinite] hover:[animation-play-state:paused]">
              {[...(brands?.items || []), ...(brands?.items || [])].map((item: any, index: number) => (
                <a key={`${item.name}-${index}`} href={item.url || "#"} target="_blank" rel="noreferrer" className="flex h-[44px] shrink-0 items-center justify-center px-[18px] opacity-[0.55] transition-opacity duration-200 hover:opacity-100">
                  {item.logo ? (
                    <img src={localMedia(item.logo, "/logos/builtwell-logo-text-only.png")} alt={item.name} className="h-8 w-auto max-w-[140px] object-contain" />
                  ) : (
                    <span className="whitespace-nowrap text-[16px] font-bold uppercase tracking-[1px] text-[#1e2b43]">{item.name}</span>
                  )}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════ AREAS WE SERVE ══════ */}
      <AreasSection data={areas} />

      {/* ══════ TRUST STRIP (Google rating section) ══════ */}
      <ServicesTrustStrip items={trustStripItems} />

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

"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, CalendarDays, Check, ChevronDown, Shield, Star, Upload } from "lucide-react";
import { FAQ_REFERENCE_CATEGORIES, FAQ_REFERENCE_GENERAL, FAQ_REFERENCE_HERO } from "@/src/data/faqPageReference";
import type { CMSPage } from "@/types/cms";
import { AreasSection as SharedAreasSection, FinancingStrip as SharedFinancingStrip, LeadFormSection as SharedLeadFormSection } from "./template-utils";

const cls = (...values: Array<string | false | null | undefined>) => values.filter(Boolean).join(" ");
const section = <T,>(page: CMSPage, type: string) => page.sections.find((entry) => entry.is_active && entry.type === type)?.data as T | undefined;
const sections = <T,>(page: CMSPage, type: string) => page.sections.filter((entry) => entry.is_active && entry.type === type).map((entry) => entry.data as T);
const opts = (value?: Array<string | { label: string; value: string }> | null) => (value || []).map((item) => typeof item === "string" ? { label: item, value: item } : item);

function media(value?: string | null, fallback = "") {
  if (!value) return fallback;
  try {
    return value.startsWith("http") ? new URL(value).pathname : value;
  } catch {
    return value;
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

export function FaqPageTemplate({ page }: { page: CMSPage }) {
  const hero = section<any>(page, "hero");
  const areas = section<any>(page, "areas_served");
  const lead = section<any>(page, "lead_form");
  const financing = sections<any>(page, "rich_text").find((item) => item.style_variant === "financing_strip");
  const related = section<any>(page, "project_highlights");
  const [showAllGeneral, setShowAllGeneral] = useState(false);
  const [showAllCategory, setShowAllCategory] = useState<Record<string, boolean>>({});
  const [countyOpen, setCountyOpen] = useState<Record<number, boolean>>({});
  const [pickedServices, setPickedServices] = useState<string[]>([]);
  const [serviceOpen, setServiceOpen] = useState(false);
  const [fileNames, setFileNames] = useState<string[]>([]);
  const [formValues, setFormValues] = useState<Record<string, string>>({ contact_method: "call" });
  const [submitted, setSubmitted] = useState(false);
  const faqHeroParts = parts(FAQ_REFERENCE_HERO.title, "Connecticut");
  const mainFaqHeadingParts = parts(FAQ_REFERENCE_HERO.heading, "Questions Answered");
  const leadParts = parts(lead?.title, lead?.title_highlight || "Project");
  const fields = lead?.fields || [];
  const topFields = fields.filter((field: any) => !["checkbox_group", "radio_group", "textarea", "file"].includes(field.type));
  const servicesField = fields.find((field: any) => field.type === "checkbox_group");
  const timeField = fields.find((field: any) => field.name === "best_time" || field.type === "select");
  const contactField = fields.find((field: any) => field.type === "radio_group");
  const messageField = fields.find((field: any) => field.type === "textarea");
  const heroCtas = [
    { label: "Fairfield County", value: "(203) 919-9616", url: "tel:2039199616", primary: false },
    { label: "New Haven County", value: "(203) 466-9148", url: "tel:2034669148", primary: false },
    { label: "Free Estimate", value: "Schedule Now", url: "#contact", primary: true },
  ];
  const topTrustItems = [
    { value: "15+", label: "Years of Experience", icon: "value" },
    { value: "100+", label: "Completed Projects", icon: "value" },
    { value: "4.9", label: "Google Rating", icon: "value" },
    { value: "", label: "Fully Bonded & Insured", icon: "shield" },
  ];
  const generalTopFaq = FAQ_REFERENCE_GENERAL.slice(0, 5);
  const generalMoreFaq = FAQ_REFERENCE_GENERAL.slice(5);

  return (
    <div className="faq-ref bg-[#f5f1e9] text-[#1e2b43]">
      <section className="relative isolate overflow-hidden bg-[#151e30] px-5 pt-[120px] text-white md:px-10">
        <div className="absolute inset-0 bg-cover bg-[center_30%]" style={{ backgroundImage: `url(${media(hero?.background_image, "/images/headers/kitchen-remodeling-header.jpg")})`, opacity: 0.72 }} />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_97%_97%,rgba(21,30,48,1)_0%,rgba(21,30,48,0.9)_8%,transparent_30%),radial-gradient(ellipse_at_3%_97%,rgba(21,30,48,0.9)_0%,transparent_25%),linear-gradient(180deg,rgba(21,30,48,0.35)_0%,rgba(21,30,48,0.2)_30%,rgba(21,30,48,0.45)_65%,rgba(21,30,48,0.92)_100%)]" />
        <div className="relative z-10 mx-auto flex min-h-[50vh] w-full max-w-[1240px] flex-col items-center justify-center pb-12 text-center">
          <ol className="mb-5 flex list-none items-center p-0 text-[13px] font-medium text-white/90 [text-shadow:0_1px_6px_rgba(0,0,0,0.7)]">
            <li className="flex items-center">{linkNode("/", "Home", "transition-colors hover:text-[#bc9155]")}</li>
            <li className="mx-[10px] text-[12px] text-[#bc9155]">›</li>
            <li className="flex items-center font-semibold text-white">FAQ</li>
          </ol>
          <h1 className="max-w-[980px] text-[clamp(40px,4.5vw,56px)] font-bold leading-[1.08] tracking-[-0.03em] [text-shadow:0_2px_20px_rgba(0,0,0,0.5)]">
            {faqHeroParts.before}
            {faqHeroParts.accent ? <span className="text-[#bc9155]">{faqHeroParts.accent}</span> : null}
            {faqHeroParts.after}
          </h1>
          <p className="mt-4 max-w-[560px] text-[17px] leading-[1.7] text-white/85 [text-shadow:0_1px_8px_rgba(0,0,0,0.4)]">{FAQ_REFERENCE_HERO.subtitle}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            {heroCtas.map((cta) => (
              <div key={`${cta.label}-${cta.value}`}>
                {linkNode(
                  cta.url,
                  <span className={cls("hero-cta-btn flex min-w-[180px] flex-col items-center rounded-[8px] px-7 py-4 text-center transition-all", cta.primary && "hero-cta-primary")}>
                    <span className="hero-cta-label text-[11px] font-semibold uppercase tracking-[1.2px]">{cta.label}</span>
                    <span className="hero-cta-phone text-[18px] font-semibold">{cta.value}</span>
                  </span>,
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="trust-bar">
        <div className="trust-bar-inner">
          {topTrustItems.map((item, index) => (
            <div key={`${item.label}-${index}`} className="trust-item">
              {item.icon === "shield" ? (
                <div className="trust-number trust-number-icon">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                </div>
              ) : (
                <div className="trust-number">{item.value}</div>
              )}
              <div className="trust-label">{item.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-[#1e2b4310] bg-white px-5 pb-[100px] pt-20 md:px-10">
        <div className="mx-auto max-w-[1240px]">
          <div className="mb-10 text-center">
            {label("FAQ")}
            <h2 className="text-[clamp(34px,3.8vw,50px)] font-bold tracking-[-0.02em]">
              {mainFaqHeadingParts.before}
              {mainFaqHeadingParts.accent ? <span className="text-[#bc9155]">{mainFaqHeadingParts.accent}</span> : null}
              {mainFaqHeadingParts.after}
            </h2>
          </div>

          <div className="faq-list">
            {generalTopFaq.map((item, index) => (
              <details key={`general-top-${index}`} className="faq-item">
                <summary>{item.question}</summary>
                <div className="faq-answer">{item.answer}</div>
              </details>
            ))}
          </div>

          <div className={cls("faq-more mt-0", showAllGeneral && "show")}>
            <div className="faq-list">
              {generalMoreFaq.map((item, index) => (
                <details key={`general-more-${index}`} className="faq-item">
                  <summary>{item.question}</summary>
                  <div className="faq-answer">{item.answer}</div>
                </details>
              ))}
            </div>
          </div>

          <button type="button" onClick={() => setShowAllGeneral((current) => !current)} className={cls("faq-show-more", showAllGeneral && "open")}>
            {showAllGeneral ? "Show less" : "Read more"}
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>

          <div className="faq-services mt-14 grid gap-4 lg:grid-cols-2">
            {FAQ_REFERENCE_CATEGORIES.map((group, groupIndex) => {
              const key = `${group.title}-${groupIndex}`;
              const topCategoryItems = group.items.slice(0, 5);
              const moreCategoryItems = group.items.slice(5);
              const showMoreCategory = !!showAllCategory[key];

              return (
                <article key={key} className="faq-category-card">
                  <h3 className="faq-category-heading">{group.title}</h3>
                  <div className="faq-list">
                    {topCategoryItems.map((item, itemIndex) => (
                      <details key={`${key}-top-${itemIndex}`} className="faq-item">
                        <summary>{item.question}</summary>
                        <div className="faq-answer" dangerouslySetInnerHTML={{ __html: item.answer }} />
                      </details>
                    ))}
                  </div>
                  {moreCategoryItems.length ? (
                    <>
                      <div className={cls("faq-more", showMoreCategory && "show")}>
                        <div className="faq-list">
                          {moreCategoryItems.map((item, itemIndex) => (
                            <details key={`${key}-more-${itemIndex}`} className="faq-item">
                              <summary>{item.question}</summary>
                              <div className="faq-answer" dangerouslySetInnerHTML={{ __html: item.answer }} />
                            </details>
                          ))}
                        </div>
                      </div>
                      <button type="button" onClick={() => setShowAllCategory((current) => ({ ...current, [key]: !current[key] }))} className={cls("faq-show-more", showMoreCategory && "open")}>
                        {showMoreCategory ? "Show less" : "Read more"}
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </button>
                    </>
                  ) : null}
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <SharedAreasSection data={areas} />

      <div className="trust-strip" role="region" aria-label="Trust indicators">
        <div className="trust-strip-inner">
          <a href="https://www.google.com/search?q=builtwell+ct+reviews" target="_blank" rel="noopener noreferrer" className="trust-strip-item" aria-label="Google Rating 4.9">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" stroke="none" aria-hidden="true">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            Google Rating 4.9
          </a>
          <div className="trust-strip-divider" />
          <a href="https://www.bbb.org/search?find_country=USA&find_text=builtwell+ct&find_loc=Orange%2C+CT" target="_blank" rel="noopener noreferrer" className="trust-strip-item">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            BBB A+ Accredited
          </a>
          <div className="trust-strip-divider" />
          <a href="https://www.houzz.com/professionals/general-contractors/builtwell-ct" target="_blank" rel="noopener noreferrer" className="trust-strip-item" aria-label="Trusted on Houzz">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <circle cx="12" cy="12" r="10" />
              <path d="M9 12l2 2 4-4" />
            </svg>
            Trusted on Houzz
          </a>
          <div className="trust-strip-divider" />
          <a href="https://www.elicense.ct.gov/Lookup/LicenseLookup.aspx" target="_blank" rel="noopener noreferrer" className="trust-strip-item">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <rect x="3" y="4" width="18" height="16" rx="2" />
              <path d="M8 2v4M16 2v4M3 10h18" />
            </svg>
            CT HIC License #0668405
          </a>
          <div className="trust-strip-divider" />
          <a href="https://www.angi.com/companylist/us/ct/orange/builtwell-ct-reviews-" target="_blank" rel="noopener noreferrer" className="trust-strip-item" aria-label="Verified on Angi and Thumbtack">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <circle cx="12" cy="12" r="10" />
              <path d="M9 12l2 2 4-4" />
            </svg>
            Verified on Angi &amp; Thumbtack
          </a>
        </div>
      </div>

      <SharedLeadFormSection page={page} data={lead} accent={lead?.title_highlight || "Project"} />
      <SharedFinancingStrip data={financing} />

      <section className="bg-[#f5f1e9] px-5 py-20 md:px-10">
        <div className="mx-auto max-w-[1240px]">
          <div className="mb-10 text-center">
            {label(related?.eyebrow || "Our Services")}
            <h2 className="text-[clamp(34px,3.8vw,48px)] font-bold tracking-[-0.02em]">{(() => { const p = parts(related?.title, related?.title_highlight); return <>{p.before}{p.accent ? <span className="text-[#bc9155]">{p.accent}</span> : null}{p.after}</>; })()}</h2>
            {related?.subtitle ? <p className="mx-auto mt-3 max-w-[760px] text-[15px] leading-[1.8] text-[#5c677d]">{related.subtitle}</p> : null}
          </div>
          <div className="grid gap-7 lg:grid-cols-3">
            {(related?.items || []).map((item: any, index: number) => {
              const fallbackImage = index === 0
                ? "/images/headers/kitchen-remodeling-header.jpg"
                : index === 1
                ? "/images/services/bathroom-remodel-new.jpg"
                : "/images/services/basement-finish-real.jpeg";
              return (
                <article key={`${item.title || "related"}-${index}`} className="faq-related-card group overflow-hidden rounded-[12px] border border-[#e5dac8] bg-white">
                  <div className="faq-related-media h-[220px] overflow-hidden">
                    <img
                      src={media(item.image, fallbackImage)}
                      alt={item.image_alt || item.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(event) => {
                        if (event.currentTarget.src.includes(fallbackImage)) return;
                        event.currentTarget.src = fallbackImage;
                      }}
                    />
                  </div>
                  <div className="faq-related-body p-6">
                    <h3 className="text-[24px] font-bold">{item.title}</h3>
                    <p className="mt-3 text-[14px] leading-[1.76] text-[#5c677d]">{item.description}</p>
                    {item.url ? linkNode(item.url, <><span>Learn More</span><ArrowRight className="h-4 w-4" /></>, "faq-related-link mt-5 inline-flex items-center gap-2 text-[14px] font-semibold text-[#bc9155] transition-all") : null}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <style jsx global>{`
        .faq-ref .hero-cta-btn {
          background: rgba(10, 18, 35, 0.42);
          border: 1px solid rgba(255, 255, 255, 0.18);
          border-bottom: 2px solid #bc9155;
          backdrop-filter: blur(12px);
          color: #ffffff;
          text-decoration: none;
        }
        .faq-ref .hero-cta-btn:hover {
          background: rgba(10, 18, 35, 0.62);
          border-color: rgba(255, 255, 255, 0.28);
          border-bottom-color: #bc9155;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(188, 145, 85, 0.2);
        }
        .faq-ref .hero-cta-btn.hero-cta-primary {
          background: #bc9155;
          border: 1px solid #bc9155;
          border-bottom: 2px solid #a57d48;
          backdrop-filter: none;
        }
        .faq-ref .hero-cta-btn.hero-cta-primary:hover {
          background: #d4a95a;
          border-color: #d4a95a;
          border-bottom-color: #a57d48;
          box-shadow: 0 8px 24px rgba(188, 145, 85, 0.4);
        }
        .faq-ref .hero-cta-label {
          opacity: 0.7;
          margin-bottom: 4px;
        }
        .faq-ref .hero-cta-primary .hero-cta-label {
          opacity: 0.9;
        }
        .faq-ref .hero-cta-phone {
          font-family: "Playfair Display", serif;
        }
        .faq-ref .trust-bar {
          background: linear-gradient(135deg, #1e2b43 0%, #151e30 100%);
          border-top: 1px solid rgba(188, 145, 85, 0.2);
          border-bottom: 1px solid rgba(188, 145, 85, 0.2);
        }
        .faq-ref .trust-bar-inner {
          max-width: 1280px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          text-align: center;
        }
        .faq-ref .trust-item {
          padding: 36px 20px;
          border-right: 1px solid rgba(188, 145, 85, 0.12);
          cursor: default;
          transition: background 0.3s, transform 0.3s;
        }
        .faq-ref .trust-item:hover {
          background: rgba(188, 145, 85, 0.08);
          transform: translateY(-3px);
        }
        .faq-ref .trust-item:last-child {
          border-right: none;
        }
        .faq-ref .trust-number {
          font-family: "Playfair Display", serif;
          font-size: 42px;
          font-weight: 700;
          color: #bc9155;
          line-height: 1;
          transition: color 0.3s, text-shadow 0.3s;
        }
        .faq-ref .trust-number-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 42px;
          line-height: 0;
        }
        .faq-ref .trust-number-icon svg {
          width: 32px;
          height: 32px;
          display: block;
          stroke-width: 2;
          transform: translateY(2px);
        }
        .faq-ref .trust-item:hover .trust-number {
          color: #d4a95a;
          text-shadow: 0 0 20px rgba(188, 145, 85, 0.3);
        }
        .faq-ref .trust-label {
          font-size: 13px;
          color: rgba(255, 255, 255, 0.6);
          margin-top: 8px;
          text-transform: uppercase;
          letter-spacing: 1px;
          font-weight: 500;
          transition: color 0.3s;
        }
        .faq-ref .trust-item:hover .trust-label {
          color: rgba(255, 255, 255, 0.85);
        }
        .faq-ref .faq-list {
          max-width: 780px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 0;
        }
        .faq-ref .faq-item {
          border-bottom: 1px solid rgba(30, 43, 67, 0.08);
          overflow: hidden;
          transition: background 0.2s;
          background: transparent;
        }
        .faq-ref .faq-item:last-child {
          border-bottom: none;
        }
        .faq-ref .faq-item[open] {
          background: rgba(188, 145, 85, 0.04);
        }
        .faq-ref .faq-item summary {
          padding: 20px 8px;
          font-size: 16px;
          font-weight: 600;
          color: #1e2b43;
          cursor: pointer;
          list-style: none;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          transition: color 0.2s;
        }
        .faq-ref .faq-item summary::-webkit-details-marker {
          display: none;
        }
        .faq-ref .faq-item summary::after {
          content: "+";
          font-size: 22px;
          font-weight: 300;
          color: #bc9155;
          flex-shrink: 0;
          transition: transform 0.2s;
        }
        .faq-ref .faq-item[open] summary::after {
          content: "-";
        }
        .faq-ref .faq-item summary:hover {
          color: #bc9155;
        }
        .faq-ref .faq-answer {
          padding: 0 8px 20px;
          font-size: 15px;
          color: #5c677d;
          line-height: 1.75;
        }
        .faq-ref .faq-category-card {
          background: #f5f1e9;
          border-radius: 14px;
          padding: 36px 40px 32px;
          margin-bottom: 16px;
        }
        .faq-ref .faq-category-card .faq-list {
          max-width: 100%;
        }
        .faq-ref .faq-category-card .faq-item {
          border-color: rgba(30, 43, 67, 0.06);
        }
        .faq-ref .faq-category-card .faq-item[open] {
          background: rgba(255, 255, 255, 0.6);
        }
        .faq-ref .faq-category-heading {
          font-family: "Playfair Display", serif;
          font-size: 22px;
          color: #1e2b43;
          margin: 0 0 20px;
          text-align: center;
          position: relative;
        }
        .faq-ref .faq-category-heading::after {
          content: "";
          display: block;
          width: 40px;
          height: 2px;
          background: #bc9155;
          margin: 10px auto 0;
        }
        .faq-ref .faq-more {
          display: none;
        }
        .faq-ref .faq-more.show {
          display: block;
        }
        .faq-ref .faq-show-more {
          background: none;
          border: none;
          color: #bc9155;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          padding: 14px 0 0;
          transition: color 0.2s;
          display: flex;
          align-items: center;
          gap: 6px;
          justify-content: center;
          margin: 0 auto;
        }
        .faq-ref .faq-show-more:hover {
          color: #a57d48;
        }
        .faq-ref .faq-show-more svg {
          transition: transform 0.3s;
        }
        .faq-ref .faq-show-more.open svg {
          transform: rotate(180deg);
        }
        .faq-ref .trust-strip {
          background: linear-gradient(135deg, #1e2b43 0%, #151e30 100%);
          padding: 56px 40px;
          position: relative;
          overflow: hidden;
        }
        .faq-ref .trust-strip::before {
          content: "";
          position: absolute;
          inset: 0;
          background: url("/hero/builtwell-job-site-aerial-hero-ct.jpg") center/cover no-repeat;
          opacity: 0.12;
        }
        .faq-ref .trust-strip-inner {
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
        .faq-ref .trust-strip-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          font-size: 13px;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.9);
          letter-spacing: 0.4px;
          white-space: nowrap;
          text-decoration: none;
          transition: all 0.3s;
          padding: 20px 32px;
          flex: 1;
          min-width: 180px;
          text-align: center;
        }
        .faq-ref .trust-strip-item:hover {
          color: #bc9155;
          transform: translateY(-2px);
        }
        .faq-ref .trust-strip-item svg {
          color: #bc9155;
          flex-shrink: 0;
          width: 22px;
          height: 22px;
          filter: drop-shadow(0 2px 4px rgba(188, 145, 85, 0.3));
        }
        .faq-ref .trust-strip-divider {
          width: 1px;
          height: 40px;
          background: rgba(255, 255, 255, 0.1);
          flex-shrink: 0;
        }
        .faq-ref .faq-contact-card {
          transition: box-shadow 0.3s ease, transform 0.3s ease;
        }
        .faq-ref .faq-contact-card:hover {
          box-shadow: 0 22px 52px rgba(30, 43, 67, 0.14), 0 6px 16px rgba(30, 43, 67, 0.08);
          transform: translateY(-2px);
        }
        .faq-ref .faq-contact-form input,
        .faq-ref .faq-contact-form select,
        .faq-ref .faq-contact-form textarea,
        .faq-ref .faq-contact-form button[type="button"] {
          transition: border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease, transform 0.2s ease;
        }
        .faq-ref .faq-contact-form input:hover,
        .faq-ref .faq-contact-form select:hover,
        .faq-ref .faq-contact-form textarea:hover,
        .faq-ref .faq-contact-form button[type="button"]:hover {
          border-color: rgba(188, 145, 85, 0.45);
        }
        .faq-ref .faq-contact-form input:focus,
        .faq-ref .faq-contact-form select:focus,
        .faq-ref .faq-contact-form textarea:focus,
        .faq-ref .faq-contact-form button[type="button"]:focus-visible {
          outline: none;
          border-color: #bc9155;
          box-shadow: 0 0 0 3px rgba(188, 145, 85, 0.14);
        }
        .faq-ref .faq-contact-form label[for$="-lead-files"] {
          transition: border-color 0.2s ease, background 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
        }
        .faq-ref .faq-contact-form label[for$="-lead-files"]:hover {
          border-color: #bc9155;
          background: rgba(188, 145, 85, 0.05);
          transform: translateY(-1px);
          box-shadow: 0 6px 16px rgba(30, 43, 67, 0.08);
        }
        .faq-ref .faq-contact-form button[type="submit"] {
          transition: background 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
        }
        .faq-ref .faq-contact-form button[type="submit"]:hover {
          background: #a57d48;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(188, 145, 85, 0.3);
        }
        .faq-ref .faq-related-card {
          border-bottom: 2px solid transparent;
          box-shadow: 0 2px 12px rgba(30, 43, 67, 0.06), 0 1px 3px rgba(30, 43, 67, 0.04);
          transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          flex-direction: column;
        }
        .faq-ref .faq-related-card:hover {
          transform: translateY(-4px);
          border-bottom-color: #bc9155;
          box-shadow: 0 12px 28px rgba(30, 43, 67, 0.1), 0 28px 56px rgba(30, 43, 67, 0.12);
        }
        .faq-ref .faq-related-body {
          flex: 1;
          display: flex;
          flex-direction: column;
          padding: 28px 28px 32px;
        }
        .faq-ref .faq-related-body p {
          flex: 1;
          font-size: 15px;
          line-height: 1.7;
        }
        .faq-ref .faq-related-link {
          gap: 6px;
        }
        .faq-ref .faq-related-link:hover,
        .faq-ref .faq-related-card:hover .faq-related-link {
          gap: 10px;
        }
        .faq-ref .area-town-static {
          transition: color 0.25s ease;
          cursor: default;
        }
        .faq-ref .area-town-static:hover {
          color: #bc9155;
        }
        @media (max-width: 1024px) {
          .faq-ref .trust-bar-inner {
            grid-template-columns: repeat(2, 1fr);
          }
          .faq-ref .trust-item {
            padding: 24px 16px;
            background: rgba(188, 145, 85, 0.08);
          }
          .faq-ref .trust-item:hover {
            transform: none;
          }
          .faq-ref .trust-strip {
            padding: 40px 24px;
          }
          .faq-ref .trust-strip-inner {
            gap: 0;
          }
          .faq-ref .trust-strip-item {
            padding: 16px 20px;
            min-width: 140px;
            font-size: 12px;
          }
          .faq-ref .trust-strip-divider {
            display: none;
          }
          .faq-ref .faq-category-card {
            padding: 28px 22px 24px;
          }
        }
        @media (max-width: 768px) {
          .faq-ref .trust-strip {
            padding: 32px 20px;
          }
          .faq-ref .trust-strip-inner {
            gap: 0;
            flex-wrap: wrap;
          }
          .faq-ref .trust-strip-item {
            padding: 12px 16px;
            min-width: 50%;
            font-size: 11px;
          }
          .faq-ref .trust-strip-item svg {
            width: 18px;
            height: 18px;
          }
          .faq-ref .trust-strip-divider {
            display: none;
          }
          .faq-ref .faq-item summary {
            font-size: 14px;
            padding: 16px;
          }
          .faq-ref .faq-answer {
            font-size: 14px;
            padding: 0 16px 16px;
          }
          .faq-ref .faq-category-card {
            padding: 24px 16px 20px;
          }
          .faq-ref .faq-category-heading {
            font-size: 18px;
          }
        }
      `}</style>
    </div>
  );
}



"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BriefcaseBusiness,
  CircleHelp,
  List,
  Star,
  Users,
} from "lucide-react";
import type { CMSPage } from "@/types/cms";
import {
  AreasSection,
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
  background_image?: string;
  badges?: Array<{ label?: string; value?: string | null; url?: string; is_primary?: boolean }>;
};

type TrustBarData = {
  items?: Array<{ icon?: string; label?: string; value?: string | null; url?: string }>;
};

type RichTextData = {
  eyebrow?: string;
  title?: string;
  highlight_text?: string;
  content?: string;
  style_variant?: string;
  anchor_id?: string;
  tags?: string[];
  blocks?: Array<{ title?: string | null; content_html?: string }>;
  ctas?: Array<{ label?: string; url?: string }>;
  callout?: { title?: string; content_html?: string };
  intro_paragraphs?: string[];
  image?: string;
  image_alt?: string;
};

type FeatureGridData = {
  variant?: string;
  eyebrow?: string;
  title?: string;
  highlight_text?: string;
  subtitle?: string;
  background_image?: string;
  items?: Array<any>;
  note_html?: string;
};

function useFadeUp() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const items = Array.from(root.querySelectorAll<HTMLElement>(".fade-up"));
    if (!items.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
    );

    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return ref;
}

function ensureParagraphHtml(value?: string | null) {
  const text = (value || "").trim();
  if (!text) return "";
  if (text.startsWith("<p") || text.startsWith("<ul") || text.startsWith("<ol") || text.startsWith("<div")) {
    return text;
  }
  return `<p>${text}</p>`;
}

function renderHtml(value?: string | null) {
  return { __html: ensureParagraphHtml(value) };
}

function tagAnchor(tag: string) {
  const normalized = tag.trim().toLowerCase();
  if (normalized === "planning") return "#planning";
  if (normalized === "budgeting") return "#budgeting";
  if (normalized === "permits") return "#permits";
  if (normalized === "contractor") return "#contractor";
  if (normalized === "aging in place") return "#accessibility";
  return "#";
}

function resourceIcon(icon?: string, title?: string) {
  const key = (icon || title || "").toLowerCase();
  if (key.includes("faq") || key.includes("help")) return <CircleHelp aria-hidden="true" />;
  if (key.includes("review") || key.includes("star")) return <Star aria-hidden="true" />;
  if (key.includes("about") || key.includes("user")) return <Users aria-hidden="true" />;
  if (key.includes("case") || key.includes("brief")) return <BriefcaseBusiness aria-hidden="true" />;
  return <List aria-hidden="true" />;
}

function PhoneCtas({ items }: { items: HeroData["badges"] }) {
  return (
    <div className="hero-ctas">
      {(items || []).map((item, index) => {
        const text = [item?.label, item?.value].filter(Boolean).join(" ").trim();
        const className = item?.is_primary ? "hero-cta-btn hero-cta-primary" : "hero-cta-btn";

        return item?.url
          ? <a key={`${text || "cta"}-${index}`} href={item.url} className={className}>{text}</a>
          : <span key={`${text || "cta"}-${index}`} className={className}>{text}</span>;
      })}
    </div>
  );
}

function OverviewSection({ data }: { data?: RichTextData }) {
  const titleParts = parts(data?.title, data?.highlight_text);

  return (
    <section className="service-overview section">
      <div className="section-inner service-overview-content">
        <div className="section-header fade-up homeowner-header-tight">
          {label(data?.eyebrow || "Homeowner Hub")}
          <h2>
            {titleParts.before}
            {titleParts.accent ? <span className="gold">{titleParts.accent}</span> : null}
            {titleParts.after}
          </h2>
          <div className="hub-tags">
            {(data?.tags || []).map((tag) => (
              <a key={tag} href={tagAnchor(tag)} className="hub-tag">{tag}</a>
            ))}
          </div>
        </div>
        <div className="fade-up overview-copy" dangerouslySetInnerHTML={renderHtml(data?.content)} />
      </div>
    </section>
  );
}

function ContentSection({ data }: { data?: RichTextData }) {
  if (!data) return null;
  const titleParts = parts(data.title, data.highlight_text);
  const surfaceClass = data.anchor_id === "planning" ? "hub-section-light" : "hub-section-white";

  return (
    <section id={data.anchor_id} className={`section hub-prose-section ${surfaceClass}`}>
      <div className="section-inner hub-prose-inner">
        <div className="section-header fade-up">
          {label(data.eyebrow || "")}
          <h2>
            {titleParts.before}
            {titleParts.accent ? <span className="gold">{titleParts.accent}</span> : null}
            {titleParts.after}
          </h2>
        </div>
        <article className="fade-up hub-prose-article">
          <div className="hub-prose-copy" dangerouslySetInnerHTML={renderHtml(data.content)} />
          {(data.blocks || []).map((block, index) => (
            <div key={`${block.title || "block"}-${index}`} className="hub-prose-block">
              {block.title ? <h3>{block.title}</h3> : null}
              <div className="hub-prose-copy" dangerouslySetInnerHTML={renderHtml(block.content_html)} />
            </div>
          ))}
          {data.ctas?.length ? (
            <div className="hub-cta-row">
              {data.ctas.map((cta, index) => (
                cta.url
                  ? <span key={`cta-${index}`} className="contents">{linkNode(
                      cta.url,
                      <><span>{cta.label}</span><ArrowRight aria-hidden="true" /></>,
                      "hub-card-link hub-cta-btn",
                    )}</span>
                  : <span key={`cta-${index}`} className="hub-card-link hub-cta-btn">{cta.label}</span>
              ))}
            </div>
          ) : null}
          {data.callout ? (
            <div className="hub-callout">
              {data.callout.title ? <h3>{data.callout.title}</h3> : null}
              <div className="hub-prose-copy hub-callout-copy" dangerouslySetInnerHTML={renderHtml(data.callout.content_html)} />
            </div>
          ) : null}
        </article>
      </div>
    </section>
  );
}

function PermitsSection({ data }: { data?: FeatureGridData }) {
  if (!data) return null;
  const titleParts = parts(data.title, data.highlight_text);

  return (
    <section id="permits" className="section hub-dark-section">
      <div className="hub-dark-bg" style={{ backgroundImage: `url('${media(data.background_image, "/hero/builtwell-job-site-aerial-hero-ct.jpg")}')` }} />
      <div className="section-inner hub-dark-inner">
        <div className="section-header fade-up">
          {label(data.eyebrow || "Permits and Codes", true)}
          <h2>
            {titleParts.before}
            {titleParts.accent ? <span className="gold">{titleParts.accent}</span> : null}
            {titleParts.after}
          </h2>
          {data.subtitle ? <p>{data.subtitle}</p> : null}
        </div>
        <div className="permit-grid fade-up">
          {(data.items || []).map((item, index) => (
            <div key={`${item.title || "permit"}-${index}`} className="permit-card">
              <h3>{item.title}</h3>
              <ul>
                {(item.bullets || []).map((bullet: string) => <li key={bullet}>{bullet}</li>)}
              </ul>
            </div>
          ))}
        </div>
        {data.note_html ? <div className="permit-card permit-note fade-up" dangerouslySetInnerHTML={renderHtml(data.note_html)} /> : null}
      </div>
    </section>
  );
}

function ChecklistSection({ data }: { data?: FeatureGridData }) {
  if (!data) return null;
  const titleParts = parts(data.title, data.highlight_text);

  return (
    <section id="contractor" className="section hub-section-light">
      <div className="section-inner hub-prose-inner">
        <div className="section-header fade-up">
          {label(data.eyebrow || "Contractor Checklist")}
          <h2>
            {titleParts.before}
            {titleParts.accent ? <span className="gold">{titleParts.accent}</span> : null}
            {titleParts.after}
          </h2>
        </div>
        {data.subtitle ? <div className="fade-up hub-checklist-intro"><p>{data.subtitle}</p></div> : null}
        <div className="hub-checklist fade-up">
          {(data.items || []).map((item, index) => (
            <div key={`${item.title || "item"}-${index}`} className="checklist-item">
              <div className="checklist-num">{item.step_number || index + 1}</div>
              <div className="checklist-content">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AccessibilitySection({ data, roomCards }: { data?: RichTextData; roomCards?: FeatureGridData }) {
  if (!data) return null;
  const titleParts = parts(data.title, data.highlight_text);

  return (
    <section id="accessibility" className="section hub-section-white">
      <div className="section-inner hub-prose-inner">
        <div className="section-header fade-up">
          {label(data.eyebrow || "Accessibility")}
          <h2>
            {titleParts.before}
            {titleParts.accent ? <span className="gold">{titleParts.accent}</span> : null}
            {titleParts.after}
          </h2>
        </div>
        <article className="fade-up hub-prose-article">
          {(data.intro_paragraphs || []).map((paragraph, index) => (
            <div key={`intro-${index}`} className="hub-prose-copy" dangerouslySetInnerHTML={renderHtml(paragraph)} />
          ))}
          {(data.blocks || []).slice(0, 1).map((block, index) => (
            <div key={`access-top-${index}`} className="hub-prose-block">
              {block.title ? <h3>{block.title}</h3> : null}
              <div className="hub-prose-copy" dangerouslySetInnerHTML={renderHtml(block.content_html)} />
            </div>
          ))}
        </article>
      </div>

      {roomCards?.items?.length ? (
        <div className="section-inner fade-up hub-room-inner">
          <div className="aip-room-grid">
            {roomCards.items.map((item, index) => (
              <div key={`${item.title || "room"}-${index}`} className="aip-room-card">
                <h4>{item.title}</h4>
                <ul>
                  {(item.bullets || []).map((bullet: string) => <li key={bullet}>{bullet}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {data.image ? (
        <div className="section-inner fade-up hub-access-image-wrap">
          <div className="hub-access-image-card">
            <img src={media(data.image)} alt={data.image_alt || "Accessibility remodeling"} />
          </div>
        </div>
      ) : null}

      <div className="section-inner fade-up hub-prose-inner">
        <article className="hub-prose-article">
          {(data.blocks || []).slice(1).map((block, index) => (
            <div key={`access-bottom-${index}`} className="hub-prose-block">
              {block.title ? <h3>{block.title}</h3> : null}
              <div className="hub-prose-copy" dangerouslySetInnerHTML={renderHtml(block.content_html)} />
            </div>
          ))}
          {data.callout ? (
            <div className="hub-callout">
              {data.callout.title ? <h3>{data.callout.title}</h3> : null}
              <div className="hub-prose-copy hub-callout-copy" dangerouslySetInnerHTML={renderHtml(data.callout.content_html)} />
            </div>
          ) : null}
        </article>
      </div>
    </section>
  );
}

function FundingSection({ data }: { data?: FeatureGridData }) {
  if (!data) return null;
  const titleParts = parts(data.title, data.highlight_text);

  return (
    <section className="section hub-dark-section">
      <div className="hub-dark-bg hub-dark-bg-soft" style={{ backgroundImage: `url('${media(data.background_image, "/hero/builtwell-job-site-aerial-hero-ct.jpg")}')` }} />
      <div className="section-inner hub-dark-inner">
        <div className="section-header fade-up">
          {label(data.eyebrow || "Funding and Assistance", true)}
          <h2>
            {titleParts.before}
            {titleParts.accent ? <span className="gold">{titleParts.accent}</span> : null}
            {titleParts.after}
          </h2>
          {data.subtitle ? <p>{data.subtitle}</p> : null}
        </div>
        <div className="aip-funding-grid fade-up">
          {(data.items || []).map((item, index) => (
            <div key={`${item.title || "fund"}-${index}`} className="aip-funding-card">
              {item.url ? linkNode(item.url, item.title, "aip-funding-link") : <h4>{item.title}</h4>}
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ResourcesSection({ data }: { data?: FeatureGridData }) {
  if (!data) return null;
  const titleParts = parts(data.title, data.highlight_text);

  return (
    <section className="section hub-section-light">
      <div className="section-inner">
        <div className="section-header fade-up">
          {label(data.eyebrow || "Additional Resources")}
          <h2>
            {titleParts.before}
            {titleParts.accent ? <span className="gold">{titleParts.accent}</span> : null}
            {titleParts.after}
          </h2>
        </div>
        <div className="resource-grid fade-up">
          {(data.items || []).map((item, index) => (
            <a key={`${item.title || "resource"}-${index}`} href={item.url || "#"} className="resource-card">
              <div className="resource-card-icon">{resourceIcon(item.icon, item.title)}</div>
              <h3>{item.title}</h3>
              <p className="resource-card-desc">{item.description}</p>
              <span className="resource-arrow">View <ArrowRight aria-hidden="true" /></span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function BottomTrustStrip({ data }: { data?: TrustBarData }) {
  const items = [
    {
      url: data?.items?.[0]?.url || "https://www.google.com/search?q=builtwell+ct+reviews",
      label: "Google Rating 4.9",
      ariaLabel: "Google Rating 4.9",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="var(--gold)" stroke="none" aria-hidden="true">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ),
    },
    {
      url: data?.items?.[1]?.url || "https://www.houzz.com/professionals/general-contractors/builtwell-ct",
      label: "Trusted on Houzz",
      ariaLabel: "Trusted on Houzz",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <circle cx="12" cy="12" r="10" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      ),
    },
    {
      url: data?.items?.[2]?.url || "https://www.elicense.ct.gov/Lookup/LicenseLookup.aspx",
      label: "CT HIC License #0668405",
      ariaLabel: "CT HIC License #0668405",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <rect x="3" y="4" width="18" height="16" rx="2" />
          <path d="M8 2v4M16 2v4M3 10h18" />
        </svg>
      ),
    },
    {
      url: data?.items?.[3]?.url || "https://www.angi.com/companylist/us/ct/orange/builtwell-ct-reviews-",
      label: "Verified on Angi",
      ariaLabel: "Verified on Angi",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <circle cx="12" cy="12" r="10" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      ),
    },
  ];

  return (
    <div className="trust-strip" role="region" aria-label="Trust indicators">
      <div className="trust-strip-inner">
        {items.map((item, index) => (
          <div key={`${item.label || "trust"}-${index}`} className="trust-strip-fragment">
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="trust-strip-item"
              aria-label={item.ariaLabel}
            >
              {item.icon}
              {item.label}
            </a>
            {index < items.length - 1 ? <div className="trust-strip-divider" /> : null}
          </div>
        ))}
      </div>
    </div>
  );
}

export function HomeownerHubPageTemplate({ page }: { page: CMSPage }) {
  const fadeRef = useFadeUp();
  const hero = section<HeroData>(page, "hero");
  const trustBars = sections<TrustBarData>(page, "trust_bar");
  const richTexts = sections<RichTextData>(page, "rich_text");
  const grids = sections<FeatureGridData>(page, "feature_grid");
  const areas = section<any>(page, "areas_served");
  const lead = section<any>(page, "lead_form");

  const overview = useMemo(() => richTexts.find((item) => item.style_variant === "homeowner_hub_overview"), [richTexts]);
  const planning = useMemo(() => richTexts.find((item) => item.anchor_id === "planning"), [richTexts]);
  const budgeting = useMemo(() => richTexts.find((item) => item.anchor_id === "budgeting"), [richTexts]);
  const accessibility = useMemo(() => richTexts.find((item) => item.style_variant === "homeowner_hub_accessibility"), [richTexts]);
  const financing = useMemo(() => richTexts.find((item) => item.style_variant === "financing_strip"), [richTexts]);
  const permits = useMemo(() => grids.find((item) => item.variant === "homeowner_hub_permits"), [grids]);
  const checklist = useMemo(() => grids.find((item) => item.variant === "homeowner_hub_checklist"), [grids]);
  const roomCards = useMemo(() => grids.find((item) => item.variant === "homeowner_hub_room_cards"), [grids]);
  const funding = useMemo(() => grids.find((item) => item.variant === "homeowner_hub_funding_cards"), [grids]);
  const resources = useMemo(() => grids.find((item) => item.variant === "homeowner_hub_resources"), [grids]);
  const heroParts = parts(hero?.headline, "Connecticut Remodeling Guide");

  return (
    <div ref={fadeRef} data-homeowner-hub-page>
      <style jsx global>{`
        [data-homeowner-hub-page] { --oxford-blue:#1e2b43; --gold:#bc9155; --gold-dark:#9a7340; --cream:#f5f1e9; --slate-gray:#5c677d; --gold-light:rgba(188,145,85,0.1); --blue-dark:#151e30; }
        [data-homeowner-hub-page] .fade-up { opacity:0; transform:translateY(30px); transition:opacity .7s ease, transform .7s ease; }
        [data-homeowner-hub-page] .fade-up.visible { opacity:1; transform:translateY(0); }
        [data-homeowner-hub-page] .section { padding:100px 40px; }
        [data-homeowner-hub-page] .section-inner { max-width:1240px; margin:0 auto; }
        [data-homeowner-hub-page] .section-header { text-align:center; margin-bottom:64px; }
        [data-homeowner-hub-page] .homeowner-header-tight { margin-bottom:32px; }
        [data-homeowner-hub-page] .section-header h2 { font-family:"Playfair Display",serif; font-size:clamp(28px,3.5vw,44px); line-height:1.2; letter-spacing:-0.5px; color:var(--oxford-blue); max-width:780px; margin:0 auto; }
        [data-homeowner-hub-page] .section-header p { max-width:700px; margin:20px auto 0; color:rgba(255,255,255,0.7); font-size:17px; line-height:1.75; }
        [data-homeowner-hub-page] .gold { color:var(--gold); }
        [data-homeowner-hub-page] .page-hero { background:var(--blue-dark); padding:120px 40px 48px; min-height:50vh; position:relative; overflow:hidden; display:flex; align-items:stretch; isolation:isolate; color:#fff; }
        [data-homeowner-hub-page] .page-hero::after { content:""; position:absolute; inset:0; background:var(--hub-hero-image) center 30%/cover no-repeat; opacity:.72; z-index:0; }
        [data-homeowner-hub-page] .page-hero::before { content:""; position:absolute; inset:0; background:radial-gradient(ellipse at 97% 97%, rgba(21,30,48,1) 0%, rgba(21,30,48,.9) 8%, transparent 30%),radial-gradient(ellipse at 3% 97%, rgba(21,30,48,.9) 0%, transparent 25%),linear-gradient(180deg, rgba(21,30,48,.35) 0%, rgba(21,30,48,.2) 30%, rgba(21,30,48,.45) 65%, rgba(21,30,48,.92) 100%); z-index:1; }
        [data-homeowner-hub-page] .page-hero-inner { position:relative; z-index:2; max-width:1240px; margin:0 auto; width:100%; display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center; }
        [data-homeowner-hub-page] .hero-breadcrumb { display:flex; align-items:center; justify-content:center; gap:0; width:100%; font-size:13px; font-weight:500; color:rgba(255,255,255,.92); margin:0 auto 20px; padding:0; list-style:none; text-shadow:0 1px 6px rgba(0,0,0,.7); }
        [data-homeowner-hub-page] .hero-breadcrumb li { display:flex; align-items:center; }
        [data-homeowner-hub-page] .hero-breadcrumb li + li::before { content:"›"; color:var(--gold); margin:0 10px; font-size:12px; }
        [data-homeowner-hub-page] .hero-breadcrumb a { color:rgba(255,255,255,.85); text-decoration:none; }
        [data-homeowner-hub-page] .hero-breadcrumb a:hover { color:var(--gold); }
        [data-homeowner-hub-page] .hero-breadcrumb .current { color:#fff; font-weight:600; }
        [data-homeowner-hub-page] .page-hero h1 { font-family:"Playfair Display",serif; font-size:clamp(40px,4.5vw,56px); line-height:1.08; letter-spacing:-0.5px; margin:0 0 12px; text-shadow:0 2px 20px rgba(0,0,0,.5); }
        [data-homeowner-hub-page] .hero-subtitle { font-size:17px; line-height:1.7; color:rgba(255,255,255,.82); max-width:560px; margin:16px auto 0; text-align:center; }
        [data-homeowner-hub-page] .hero-ctas { display:flex; gap:14px; margin-top:28px; justify-content:center; align-items:center; flex-wrap:wrap; }
        [data-homeowner-hub-page] .hero-cta-btn { display:inline-flex; align-items:center; justify-content:center; gap:8px; padding:14px 32px; border-radius:8px; background:rgba(10,18,35,.42); border:1px solid rgba(255,255,255,.22); backdrop-filter:blur(12px); color:#fff; font-size:15px; font-weight:600; letter-spacing:.3px; text-decoration:none; white-space:nowrap; transition:background .3s, border-color .3s, transform .3s, box-shadow .3s; }
        [data-homeowner-hub-page] .hero-cta-btn:hover { background:rgba(10,18,35,.62); border-color:rgba(255,255,255,.35); transform:translateY(-2px); box-shadow:0 8px 24px rgba(0,0,0,.3); }
        [data-homeowner-hub-page] .hero-cta-btn.hero-cta-primary { background:var(--gold); border-color:var(--gold); backdrop-filter:none; }
        [data-homeowner-hub-page] .hero-cta-btn.hero-cta-primary:hover { background:#d4a95a; border-color:#d4a95a; box-shadow:0 8px 24px rgba(188,145,85,.4); }
        [data-homeowner-hub-page] .service-overview { background:#fff; border-bottom:1px solid rgba(30,43,67,.06); }
        [data-homeowner-hub-page] .service-overview-content, [data-homeowner-hub-page] .hub-prose-inner { max-width:800px; margin:0 auto; padding:0 32px; }
        [data-homeowner-hub-page] .overview-copy p, [data-homeowner-hub-page] .hub-prose-copy p { font-size:16px; line-height:1.85; color:var(--slate-gray); margin:0 0 20px; }
        [data-homeowner-hub-page] .hub-prose-copy p:last-child { margin-bottom:0; }
        [data-homeowner-hub-page] .hub-prose-copy a, [data-homeowner-hub-page] .permit-note a, [data-homeowner-hub-page] .hub-callout-copy a { color:var(--gold); font-weight:500; text-decoration:none; }
        [data-homeowner-hub-page] .hub-prose-copy a:hover, [data-homeowner-hub-page] .permit-note a:hover, [data-homeowner-hub-page] .hub-callout-copy a:hover { color:var(--gold-dark); }
        [data-homeowner-hub-page] .hub-tags { display:flex; flex-wrap:wrap; gap:10px; justify-content:center; margin-top:20px; }
        [data-homeowner-hub-page] .hub-tag { display:inline-block; padding:8px 20px; border-radius:999px; background:var(--gold-light); color:var(--oxford-blue); font-size:13px; font-weight:600; transition:background .3s, color .3s, transform .3s; }
        [data-homeowner-hub-page] .hub-tag:hover { background:var(--oxford-blue); color:#fff; transform:translateY(-1px); }
        [data-homeowner-hub-page] .hub-section-light { background:var(--cream); }
        [data-homeowner-hub-page] .hub-section-white { background:#fff; }
        [data-homeowner-hub-page] .hub-prose-block { margin-top:36px; }
        [data-homeowner-hub-page] .hub-prose-block h3, [data-homeowner-hub-page] .hub-callout h3 { font-family:"Playfair Display",serif; font-size:22px; color:var(--oxford-blue); margin:0 0 12px; }
        [data-homeowner-hub-page] .hub-cta-row { display:flex; flex-wrap:wrap; gap:12px; margin-top:32px; justify-content:center; }
        [data-homeowner-hub-page] .hub-cta-btn { display:inline-flex; align-items:center; justify-content:center; gap:8px; min-width:200px; padding:14px 32px; border-radius:6px; background:#fff; color:var(--oxford-blue); box-shadow:0 2px 8px rgba(30,43,67,.06); text-decoration:none; transition:all .35s cubic-bezier(.4,0,.2,1); }
        [data-homeowner-hub-page] .hub-cta-btn:hover { color:var(--gold); transform:translateY(-4px); box-shadow:0 12px 24px rgba(30,43,67,.08); }
        [data-homeowner-hub-page] .hub-callout { margin-top:40px; padding:28px 32px; background:var(--cream); border-radius:8px; border-left:3px solid var(--gold); }
        [data-homeowner-hub-page] .hub-callout-copy p { font-size:14px; line-height:1.85; margin-bottom:0; }
      `}</style>
      <style jsx global>{`
        [data-homeowner-hub-page] .hub-dark-section { position:relative; overflow:hidden; background:linear-gradient(135deg, var(--oxford-blue) 0%, #151e30 100%); color:#fff; }
        [data-homeowner-hub-page] .hub-dark-bg { position:absolute; inset:0; background-position:center; background-size:cover; opacity:.12; z-index:0; }
        [data-homeowner-hub-page] .hub-dark-bg-soft { opacity:.08; }
        [data-homeowner-hub-page] .hub-dark-inner { position:relative; z-index:1; }
        [data-homeowner-hub-page] .hub-dark-section .section-header h2 { color:#fff; }
        [data-homeowner-hub-page] .permit-grid { display:grid; grid-template-columns:1fr 1fr; gap:32px; max-width:800px; margin:0 auto; }
        [data-homeowner-hub-page] .permit-card { background:rgba(255,255,255,.06); border:1px solid rgba(255,255,255,.1); border-radius:8px; padding:32px; display:flex; flex-direction:column; }
        [data-homeowner-hub-page] .permit-card h3 { font-family:"Playfair Display",serif; font-size:18px; color:var(--gold); margin:0 0 16px; }
        [data-homeowner-hub-page] .permit-card ul { list-style:none; padding:0; margin:0; }
        [data-homeowner-hub-page] .permit-card li { position:relative; padding-left:24px; margin-bottom:16px; font-size:14px; line-height:1.7; color:rgba(255,255,255,.85); }
        [data-homeowner-hub-page] .permit-card li::before { content:"✓"; position:absolute; left:0; color:var(--gold); }
        [data-homeowner-hub-page] .permit-note { max-width:800px; margin:32px auto 0; color:rgba(255,255,255,.8); font-size:14px; line-height:1.8; }
        [data-homeowner-hub-page] .permit-note strong { color:var(--gold); }
        [data-homeowner-hub-page] .hub-checklist-intro { max-width:800px; margin:0 auto 48px; padding:0 32px; text-align:center; }
        [data-homeowner-hub-page] .hub-checklist-intro p { font-size:16px; line-height:1.85; color:var(--slate-gray); margin:0; }
        [data-homeowner-hub-page] .hub-checklist { max-width:800px; margin:0 auto; }
        [data-homeowner-hub-page] .checklist-item { display:flex; align-items:flex-start; gap:20px; padding:24px 16px; border-bottom:1px solid rgba(30,43,67,.08); border-radius:8px; transition:background .3s, transform .3s; }
        [data-homeowner-hub-page] .checklist-item:last-child { border-bottom:none; }
        [data-homeowner-hub-page] .checklist-item:hover { background:rgba(30,43,67,.04); transform:translateX(4px); }
        [data-homeowner-hub-page] .checklist-item:hover .checklist-num { background:var(--gold); color:#fff; border-color:var(--gold); }
        [data-homeowner-hub-page] .checklist-num { width:48px; height:48px; flex-shrink:0; display:flex; align-items:center; justify-content:center; border-radius:50%; background:rgba(188,145,85,.1); border:2px solid var(--gold); color:var(--gold); font-family:"Playfair Display",serif; font-size:20px; font-weight:700; transition:background .3s, color .3s, border-color .3s; }
        [data-homeowner-hub-page] .checklist-content h3 { font-family:"Playfair Display",serif; font-size:18px; color:var(--oxford-blue); margin:0 0 6px; }
        [data-homeowner-hub-page] .checklist-content p { font-size:14px; line-height:1.8; color:var(--slate-gray); margin:0; }
        [data-homeowner-hub-page] .hub-room-inner { max-width:800px; margin:0 auto; padding:0 32px; }
        [data-homeowner-hub-page] .aip-room-grid { display:grid; grid-template-columns:1fr 1fr; gap:24px; margin:32px 0; }
        [data-homeowner-hub-page] .aip-room-card { background:#fff; border-radius:8px; padding:28px; box-shadow:0 2px 12px rgba(30,43,67,.06); border-bottom:2px solid transparent; transition:all .35s cubic-bezier(.4,0,.2,1); }
        [data-homeowner-hub-page] .aip-room-card:hover { transform:translateY(-4px); border-bottom-color:var(--gold); box-shadow:0 12px 28px rgba(30,43,67,.1); }
        [data-homeowner-hub-page] .aip-room-card h4 { font-family:"Playfair Display",serif; font-size:18px; color:var(--oxford-blue); margin:0 0 12px; }
        [data-homeowner-hub-page] .aip-room-card ul { list-style:none; padding:0; margin:0; }
        [data-homeowner-hub-page] .aip-room-card li { position:relative; padding-left:22px; margin-bottom:12px; color:var(--slate-gray); font-size:14px; line-height:1.8; }
        [data-homeowner-hub-page] .aip-room-card li::before { content:"✓"; position:absolute; left:0; color:var(--gold); }
        [data-homeowner-hub-page] .hub-access-image-wrap { max-width:800px; margin:0 auto; padding:0 32px; }
        [data-homeowner-hub-page] .hub-access-image-card { overflow:hidden; border-radius:12px; box-shadow:0 8px 32px rgba(30,43,67,.1); margin-top:48px; }
        [data-homeowner-hub-page] .hub-access-image-card img { width:100%; height:320px; object-fit:cover; display:block; }
        [data-homeowner-hub-page] .aip-funding-grid { max-width:900px; margin:0 auto; display:grid; grid-template-columns:1fr 1fr; gap:24px; }
        [data-homeowner-hub-page] .aip-funding-card { background:rgba(255,255,255,.06); border:1px solid rgba(255,255,255,.08); border-radius:8px; padding:28px; transition:background .3s, transform .3s; }
        [data-homeowner-hub-page] .aip-funding-card:hover { background:rgba(255,255,255,.1); transform:translateY(-2px); }
        [data-homeowner-hub-page] .aip-funding-card h4, [data-homeowner-hub-page] .aip-funding-link { display:inline; font-family:"Playfair Display",serif; font-size:18px; color:var(--gold); text-decoration:underline; text-underline-offset:3px; }
        [data-homeowner-hub-page] .aip-funding-card p { margin:12px 0 0; font-size:14px; line-height:1.8; color:rgba(255,255,255,.8); }
        [data-homeowner-hub-page] .resource-grid { display:grid; grid-template-columns:repeat(5,1fr); gap:20px; }
        [data-homeowner-hub-page] .resource-card { background:#fff; border-radius:12px; padding:32px 20px 28px; text-align:center; text-decoration:none; box-shadow:0 2px 12px rgba(30,43,67,.06); transition:all .35s cubic-bezier(.4,0,.2,1); display:flex; flex-direction:column; align-items:center; gap:14px; border-bottom:3px solid transparent; }
        [data-homeowner-hub-page] .resource-card:hover { transform:translateY(-6px); box-shadow:0 12px 28px rgba(30,43,67,.1); border-bottom-color:var(--gold); }
        [data-homeowner-hub-page] .resource-card-icon { width:58px; height:58px; border-radius:50%; background:var(--gold-light); display:flex; align-items:center; justify-content:center; color:var(--gold); }
        [data-homeowner-hub-page] .resource-card-icon svg { width:22px; height:22px; }
        [data-homeowner-hub-page] .resource-card h3 { font-family:"Playfair Display",serif; font-size:20px; color:var(--oxford-blue); margin:0; }
        [data-homeowner-hub-page] .resource-card-desc { color:var(--slate-gray); font-size:14px; line-height:1.75; margin:0; }
        [data-homeowner-hub-page] .resource-arrow { display:inline-flex; align-items:center; gap:6px; color:var(--gold); font-size:14px; font-weight:600; }
        [data-homeowner-hub-page] .resource-arrow svg { width:14px; height:14px; }
        [data-homeowner-hub-page] .trust-strip { background:linear-gradient(135deg,var(--oxford-blue) 0%,#151e30 100%); padding:56px 40px; position:relative; overflow:hidden; }
        [data-homeowner-hub-page] .trust-strip::before { content:""; position:absolute; inset:0; background:url("/hero/builtwell-job-site-aerial-hero-ct.jpg") center/cover no-repeat; opacity:.12; }
        [data-homeowner-hub-page] .trust-strip-inner { max-width:1200px; margin:0 auto; display:flex; align-items:center; justify-content:center; gap:0; flex-wrap:wrap; position:relative; z-index:1; }
        [data-homeowner-hub-page] .trust-strip-fragment { display:contents; }
        [data-homeowner-hub-page] .trust-strip-item { display:flex; flex-direction:column; align-items:center; gap:10px; min-width:180px; padding:20px 32px; flex:1; text-align:center; text-decoration:none; color:rgba(255,255,255,.9); font-size:13px; font-weight:600; letter-spacing:.4px; white-space:nowrap; transition:all .3s; }
        [data-homeowner-hub-page] .trust-strip-item:hover { color:var(--gold); transform:translateY(-2px); }
        [data-homeowner-hub-page] .trust-strip-item svg { width:22px; height:22px; color:var(--gold); flex-shrink:0; filter:drop-shadow(0 2px 4px rgba(188,145,85,.3)); }
        [data-homeowner-hub-page] .trust-strip-divider { width:1px; height:40px; background:rgba(255,255,255,.1); flex-shrink:0; }
      `}</style>
      <style jsx global>{`
        @media (max-width:1024px) {
          [data-homeowner-hub-page] .resource-grid { grid-template-columns:repeat(3,1fr); }
          [data-homeowner-hub-page] .trust-strip { padding:40px 24px; }
          [data-homeowner-hub-page] .trust-strip-inner { gap:0; }
          [data-homeowner-hub-page] .trust-strip-item { padding:16px 20px; min-width:140px; font-size:12px; }
          [data-homeowner-hub-page] .trust-strip-divider { display:none; }
        }
        @media (max-width:768px) {
          [data-homeowner-hub-page] .fade-up { opacity:1 !important; transform:none !important; }
          [data-homeowner-hub-page] .page-hero { padding:100px 20px 36px; min-height:40vh; }
          [data-homeowner-hub-page] .page-hero h1 { font-size:clamp(30px,7vw,42px); }
          [data-homeowner-hub-page] .hero-subtitle { font-size:15px; }
          [data-homeowner-hub-page] .hero-ctas { flex-direction:column; align-items:center; }
          [data-homeowner-hub-page] .hero-cta-btn { width:100%; max-width:300px; padding:12px 24px; font-size:14px; }
          [data-homeowner-hub-page] .section { padding:52px 20px; }
          [data-homeowner-hub-page] .section-header { margin-bottom:36px; }
          [data-homeowner-hub-page] .service-overview-content, [data-homeowner-hub-page] .hub-prose-inner, [data-homeowner-hub-page] .hub-room-inner, [data-homeowner-hub-page] .hub-access-image-wrap, [data-homeowner-hub-page] .hub-checklist-intro { padding:0; }
          [data-homeowner-hub-page] .permit-grid, [data-homeowner-hub-page] .aip-room-grid, [data-homeowner-hub-page] .aip-funding-grid { grid-template-columns:1fr; }
          [data-homeowner-hub-page] .resource-grid { grid-template-columns:repeat(2,1fr); }
          [data-homeowner-hub-page] .hub-tags { gap:8px; }
          [data-homeowner-hub-page] .hub-tag { padding:6px 16px; font-size:12px; }
          [data-homeowner-hub-page] .hub-cta-row { flex-direction:column !important; align-items:stretch !important; }
          [data-homeowner-hub-page] .hub-cta-btn { min-width:0 !important; width:100% !important; }
          [data-homeowner-hub-page] .trust-strip { padding:32px 20px; }
          [data-homeowner-hub-page] .trust-strip-inner { gap:0; flex-wrap:wrap; }
          [data-homeowner-hub-page] .trust-strip-item { min-width:33.33%; padding:16px 12px; font-size:11px; display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center; }
          [data-homeowner-hub-page] .trust-strip-item svg { width:18px; height:18px; }
          [data-homeowner-hub-page] .trust-strip-divider { display:none; }
        }
        @media (max-width:480px) {
          [data-homeowner-hub-page] .page-hero { padding:90px 16px 32px; min-height:35vh; }
          [data-homeowner-hub-page] .page-hero h1 { font-size:clamp(26px,7vw,36px); }
          [data-homeowner-hub-page] .hero-subtitle { font-size:14px; }
          [data-homeowner-hub-page] .section { padding:48px 16px; }
          [data-homeowner-hub-page] .resource-grid { grid-template-columns:1fr; }
          [data-homeowner-hub-page] .resource-card { padding:20px 14px 18px; gap:8px; }
          [data-homeowner-hub-page] .resource-card h3 { font-size:14px; }
          [data-homeowner-hub-page] .resource-card-desc { font-size:11px; }
          [data-homeowner-hub-page] .resource-card-icon { width:40px; height:40px; }
          [data-homeowner-hub-page] .resource-card-icon svg { width:16px; height:16px; }
        }
        @media (prefers-reduced-motion:reduce) {
          [data-homeowner-hub-page] .fade-up, [data-homeowner-hub-page] .hub-tag, [data-homeowner-hub-page] .hero-cta-btn, [data-homeowner-hub-page] .hub-cta-btn, [data-homeowner-hub-page] .permit-card, [data-homeowner-hub-page] .checklist-item, [data-homeowner-hub-page] .aip-room-card, [data-homeowner-hub-page] .aip-funding-card, [data-homeowner-hub-page] .resource-card, [data-homeowner-hub-page] .trust-strip-item { transition:none !important; transform:none !important; }
        }
      `}</style>

      <section
        className="page-hero"
        style={{ ["--hub-hero-image" as any]: `url("${media(hero?.background_image, "/hero/builtwell-team-van-consultation-hero-ct.jpg")}")` }}
      >
        <div className="page-hero-inner">
          <div className="fade-up visible">
            <ol className="hero-breadcrumb" aria-label="Breadcrumb">
              <li><Link href="/">Home</Link></li>
              <li><span className="current">Homeowner Hub</span></li>
            </ol>
            <h1>
              {heroParts.before}
              {heroParts.accent ? <span className="gold">{heroParts.accent}</span> : null}
              {heroParts.after}
            </h1>
            {hero?.subheadline ? <p className="hero-subtitle">{hero.subheadline}</p> : null}
            <PhoneCtas items={hero?.badges} />
          </div>
        </div>
      </section>

      <HeroTrustBar items={trustBars[0]?.items} />
      <OverviewSection data={overview} />
      <ContentSection data={planning} />
      <ContentSection data={budgeting} />
      <PermitsSection data={permits} />
      <ChecklistSection data={checklist} />
      <AccessibilitySection data={accessibility} roomCards={roomCards} />
      <FundingSection data={funding} />
      {areas ? <AreasSection data={areas} /> : null}
      <ResourcesSection data={resources} />
      {lead ? <LeadFormSection page={page} data={lead} /> : null}
      <BottomTrustStrip data={trustBars[1]} />
      {financing ? <FinancingStrip data={financing} /> : null}
    </div>
  );
}

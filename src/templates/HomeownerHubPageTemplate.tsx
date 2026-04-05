"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

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
import HomeownerHubFadeWrapper from "./HomeownerHubFadeWrapper";
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
  const hero = section<HeroData>(page, "hero");
  const trustBars = sections<TrustBarData>(page, "trust_bar");
  const richTexts = sections<RichTextData>(page, "rich_text");
  const grids = sections<FeatureGridData>(page, "feature_grid");
  const areas = section<any>(page, "areas_served");
  const lead = section<any>(page, "lead_form");

  const overview = richTexts.find((item) => item.style_variant === "homeowner_hub_overview");
  const planning = richTexts.find((item) => item.anchor_id === "planning");
  const budgeting = richTexts.find((item) => item.anchor_id === "budgeting");
  const accessibility = richTexts.find((item) => item.style_variant === "homeowner_hub_accessibility");
  const financing = richTexts.find((item) => item.style_variant === "financing_strip");
  const permits = grids.find((item) => item.variant === "homeowner_hub_permits");
  const checklist = grids.find((item) => item.variant === "homeowner_hub_checklist");
  const roomCards = grids.find((item) => item.variant === "homeowner_hub_room_cards");
  const funding = grids.find((item) => item.variant === "homeowner_hub_funding_cards");
  const resources = grids.find((item) => item.variant === "homeowner_hub_resources");
  const heroParts = parts(hero?.headline, "Connecticut Remodeling Guide");

  return (
    <HomeownerHubFadeWrapper>
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
    </HomeownerHubFadeWrapper>
  );
}

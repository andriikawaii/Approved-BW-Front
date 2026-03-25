"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, CalendarDays, Check, CheckCircle, ChevronDown, CreditCard, Shield, Star } from "lucide-react";
import type { CMSPage } from "@/types/cms";

export const cls = (...values: Array<string | false | null | undefined>) => values.filter(Boolean).join(" ");
export const section = <T,>(page: CMSPage, type: string) => page.sections.find((entry) => entry.is_active && entry.type === type)?.data as T | undefined;
export const sections = <T,>(page: CMSPage, type: string) => page.sections.filter((entry) => entry.is_active && entry.type === type).map((entry) => entry.data as T);
export const opts = (value?: Array<string | { label: string; value: string }> | null) => (value || []).map((item) => typeof item === "string" ? { label: item, value: item } : item);

export function media(value?: string | null, fallback = "") {
  if (!value) return fallback;
  return value || fallback;
}

export function parts(text?: string | null, mark?: string | null) {
  const source = (text || "").trim();
  const accent = (mark || "").trim();
  if (!accent || !source.includes(accent)) return { before: source, accent: "", after: "" };
  const index = source.indexOf(accent);
  return { before: source.slice(0, index), accent, after: source.slice(index + accent.length) };
}

export function label(text: React.ReactNode, dark = false) {
  return (
    <span className={cls("mb-4 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em]", dark ? "text-[#c89b5b]" : "text-[#9a7340]")}>
      <span className={cls("h-0.5 w-[10px]", dark ? "bg-[#c89b5b]" : "bg-[#bc9155]")} />
      {text}
    </span>
  );
}

export function linkNode(href: string, children: React.ReactNode, className?: string) {
  return /^https?:\/\//i.test(href) || href.startsWith("tel:") ? (
    <a href={href} className={className} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noreferrer" : undefined}>{children}</a>
  ) : (
    <Link href={href} className={className}>{children}</Link>
  );
}

export function trustIcon(icon?: string | null) {
  switch ((icon || "").toLowerCase()) {
    case "star": return <Star className="h-5 w-5" />;
    case "shield": return <Shield className="h-5 w-5" />;
    case "calendar":
    case "clock": return <CalendarDays className="h-5 w-5" />;
    case "check-circle":
    case "circle-check":
    case "verified": return <CheckCircle className="h-5 w-5" />;
    case "license":
    case "card":
    case "credit-card": return <CreditCard className="h-5 w-5" />;
    default: return <Check className="h-5 w-5" />;
  }
}

export function HeroTrustBar({ items }: { items?: any[] }) {
  const list = items || [];
  return (
    <section className="border-y border-y-[#BC9155]/20 bg-[linear-gradient(135deg,#1E2B43_0%,#151E30_100%)]">
      <div className="mx-auto grid max-w-[1280px] grid-cols-2 text-center lg:grid-cols-4">
        {list.map((item: any, index: number) => (
          <div
            key={`${item.label || "trust"}-${index}`}
            className={cls(
              "group cursor-default bg-[#BC9155]/[0.08] px-4 py-6 transition-all duration-300 md:bg-transparent md:px-5 md:py-9 md:hover:-translate-y-[3px] md:hover:bg-[#BC9155]/8",
              index % 2 === 0 ? "border-r border-[#BC9155]/12" : "",
              index < 2 ? "border-b border-[#BC9155]/12" : "",
              "lg:border-b-0",
              index < list.length - 1 ? "lg:border-r lg:border-[#BC9155]/12" : "lg:border-r-0",
            )}
          >
            <div className="flex min-h-[42px] items-center justify-center font-serif text-[32px] font-bold leading-none text-[#BC9155] transition-all duration-300 md:text-[42px] md:group-hover:text-[#D4A95A] md:group-hover:[text-shadow:0_0_20px_rgba(188,145,85,0.3)]">
              {item.value ? item.value : <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>}
            </div>
            <div className="mt-1.5 text-[11px] font-medium uppercase tracking-[0.8px] text-white/85 transition-colors duration-300 md:mt-2 md:text-[13px] md:tracking-[1px] md:text-white/60 md:group-hover:text-white/85">
              {item.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function DarkTrustStrip({ items }: { items?: any[] }) {
  return (
    <div className="relative overflow-hidden bg-[linear-gradient(135deg,#1e2b43_0%,#151E30_100%)] px-5 py-14 md:px-10">
      <div className="absolute inset-0 bg-[url('/hero/builtwell-job-site-aerial-hero-ct.jpg')] bg-cover bg-center opacity-[0.12]" />
      <div className="relative z-[1] mx-auto flex max-w-[1200px] flex-wrap items-center justify-center">
        {(items || []).map((item: any, index: number) => (
          <div key={`${item.label || "strip"}-${index}`} className="contents">
            {item.url ? linkNode(item.url, <div className="flex min-w-[180px] flex-1 flex-col items-center gap-[10px] px-8 py-5 text-center text-[13px] font-semibold tracking-[0.03em] text-white/90 transition-all duration-300 hover:-translate-y-0.5 hover:text-[#bc9155]"><span className="text-[#bc9155] drop-shadow-[0_2px_4px_rgba(188,145,85,0.3)]">{trustIcon(item.icon)}</span><span>{[item.label, item.value].filter(Boolean).join(" ")}</span></div>, "flex flex-1 justify-center") : <div className="flex flex-1 justify-center"><div className="flex min-w-[180px] flex-1 flex-col items-center gap-[10px] px-8 py-5 text-center text-[13px] font-semibold tracking-[0.03em] text-white/90 transition-all duration-300 hover:-translate-y-0.5 hover:text-[#bc9155]"><span className="text-[#bc9155] drop-shadow-[0_2px_4px_rgba(188,145,85,0.3)]">{trustIcon(item.icon)}</span><span>{[item.label, item.value].filter(Boolean).join(" ")}</span></div></div>}
            {index < (items || []).length - 1 ? <div className="hidden h-10 w-px bg-white/10 lg:block" /> : null}
          </div>
        ))}
      </div>
    </div>
  );
}

export function AreasSection({ data }: { data: any }) {
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});
  const titleParts = parts(data?.title, data?.highlight_text);
  const counties: any[] = data?.counties || [];

  const resolveTownUrl = (county: any, town: string) => {
    const links = county.town_links;
    if (!links) return "";
    if (Array.isArray(links)) return links.find((e: any) => e?.name?.toLowerCase() === town.toLowerCase())?.url || "";
    return links[town] || "";
  };

  return (
    <>
      <section className="bw-areas-section">
        <div className="bw-areas-inner">
          <div className="bw-areas-header">
            {label(data?.eyebrow || "Where We Work")}
            <h2>{titleParts.before}{titleParts.accent ? <span className="bw-gold">{titleParts.accent}</span> : null}{titleParts.after}</h2>
            {data?.subtitle ? <p>{data.subtitle}</p> : null}
          </div>
          <div className="bw-areas-grid">
            {counties.map((county: any, index: number) => {
              const isExpanded = !!expanded[index];
              const featuredTowns: string[] = county.towns || [];
              const extraTowns: string[] = county.extra_towns || [];
              const countyKey = String(county.slug || county.url || county.name || county.phone || `county-${index}`);
              const featuredTownKeyCounts: Record<string, number> = {};
              const extraTownKeyCounts: Record<string, number> = {};
              return (
                <article key={countyKey} className="bw-area-card">
                  <div className="bw-area-card-img">
                    <img src={media(county.image, index === 0 ? "/images/areas/fairfield-county.jpg" : "/images/areas/new-haven-county.jpg")} alt={county.name || "BuiltWell CT service area"} className={(county.name || "").toLowerCase().includes("new haven") ? "bw-show-top" : undefined} />
                  </div>
                  <div className="bw-area-card-body">
                    <h3>{county.name}</h3>
                    {county.phone ? <div className="bw-area-card-phone">Call: <a href={`tel:${county.phone.replace(/\D/g, "")}`}>{county.phone}</a></div> : null}
                    {county.description ? <p className="bw-area-card-desc">{county.description}</p> : null}
                    <div className="bw-area-towns">
                      {featuredTowns.map((town: string) => {
                        const url = resolveTownUrl(county, town);
                        const normalizedTown = (String(town || "town").trim().toLowerCase().replace(/[^a-z0-9]+/g, "-")) || "town";
                        const normalizedUrl = (url || "").toLowerCase().replace(/[^a-z0-9]+/g, "-");
                        const townBaseKey = `${countyKey}-town-${normalizedTown}-${normalizedUrl}`;
                        featuredTownKeyCounts[townBaseKey] = (featuredTownKeyCounts[townBaseKey] || 0) + 1;
                        const townKey = featuredTownKeyCounts[townBaseKey] === 1 ? townBaseKey : `${townBaseKey}-${featuredTownKeyCounts[townBaseKey]}`;
                        return url
                          ? <span key={townKey} className="contents">{linkNode(url, town, "bw-area-town")}</span>
                          : <span key={townKey} className="bw-area-town bw-area-town-static">{town}</span>;
                      })}
                      <div className={`bw-area-towns-more${isExpanded ? " show" : ""}`}>
                        {extraTowns.map((town: string) => {
                          const extraBaseKey = `${countyKey}-extra-${town.toLowerCase().replace(/[^a-z0-9]+/g, "-") || "town"}`;
                          extraTownKeyCounts[extraBaseKey] = (extraTownKeyCounts[extraBaseKey] || 0) + 1;
                          const extraTownKey = extraTownKeyCounts[extraBaseKey] === 1 ? extraBaseKey : `${extraBaseKey}-${extraTownKeyCounts[extraBaseKey]}`;
                          return <span key={extraTownKey} className="bw-area-town bw-area-town-static">{town}</span>;
                        })}
                      </div>
                      {extraTowns.length > 0 ? (
                        <button type="button" className="bw-area-towns-toggle" aria-expanded={isExpanded} onClick={() => setExpanded((c) => ({ ...c, [index]: !c[index] }))}>
                          {isExpanded ? "Show Less -" : "See All Towns +"}
                        </button>
                      ) : null}
                    </div>
                    {county.url ? linkNode(county.url, <><span>{county.cta_label || `Learn more about ${county.name}`}</span><ArrowRight className="bw-area-link-arrow" /></>, "bw-area-link") : null}
                  </div>
                </article>
              );
            })}
          </div>
          {data?.note_html ? <p className="bw-areas-note" dangerouslySetInnerHTML={{ __html: data.note_html }} /> : null}
          {!data?.note_html && data?.note ? <p className="bw-areas-note">{data.note}</p> : null}
        </div>
      </section>
      <style jsx global>{`
        .bw-areas-section { background:#f5f1e9; padding:80px 40px; }
        .bw-areas-inner { max-width:1200px; margin:0 auto; }
        .bw-areas-header { text-align:center; margin-bottom:48px; }
        .bw-areas-header h2 { font:700 clamp(34px,3.8vw,50px)/1.15 "Playfair Display",serif; color:#1e2b43; letter-spacing:-.02em; margin:0; }
        .bw-areas-header p { max-width:760px; margin:12px auto 0; font-size:15px; line-height:1.8; color:#5c677d; }
        .bw-gold { color:#bc9155; }
        .bw-areas-grid { display:grid; grid-template-columns:1fr 1fr; gap:32px; align-items:start; }
        .bw-area-card { background:#fff; border-radius:12px; overflow:hidden; border-bottom:3px solid transparent; box-shadow:0 2px 12px rgba(30,43,67,.06),0 1px 3px rgba(30,43,67,.04); transition:all .35s cubic-bezier(.4,0,.2,1); position:relative; display:flex; flex-direction:column; }
        .bw-area-card:hover { transform:translateY(-6px); border-bottom-color:#bc9155; box-shadow:0 16px 40px rgba(30,43,67,.1),0 32px 64px rgba(30,43,67,.08); }
        .bw-area-card-img { width:100%; height:220px; overflow:hidden; position:relative; }
        .bw-area-card-img::after { content:""; position:absolute; bottom:0; left:0; right:0; height:80px; background:linear-gradient(to top,rgba(30,43,67,.4),transparent); pointer-events:none; }
        .bw-area-card-img img { width:100%; height:100%; object-fit:cover; transition:transform .5s; }
        .bw-area-card-img img.bw-show-top { object-position:top; }
        .bw-area-card:hover .bw-area-card-img img { transform:scale(1.05); }
        .bw-area-card-body { padding:28px 28px 32px; text-align:center; }
        .bw-area-card-body h3 { font:700 24px/1.2 "Playfair Display",serif; color:#1e2b43; margin:0 0 6px; }
        .bw-area-card-phone { font-size:15px; color:#5c677d; margin-bottom:14px; }
        .bw-area-card-phone a { color:#bc9155; font-weight:600; text-decoration:none; }
        .bw-area-card-phone a:hover { text-decoration:underline; }
        .bw-area-card-desc { font-size:14px; line-height:1.7; color:#5c677d; margin-bottom:18px; padding-bottom:18px; border-bottom:1px solid rgba(30,43,67,.06); flex:1; }
        .bw-area-towns { display:grid; grid-template-columns:repeat(4,1fr); gap:8px; margin-bottom:16px; }
        .bw-area-town { font-size:11px; font-weight:600; color:#1e2b43; background:#f5f1e9; padding:7px 10px; border-radius:50px; text-align:center; letter-spacing:.2px; transition:all .2s; white-space:nowrap; text-decoration:none; }
        .bw-area-town:hover { background:#e8dcc4; color:#9a7340; }
        a.bw-area-town:hover { background:#bc9155; color:#fff; }
        .bw-area-town-static:hover { background:#f5f1e9; color:#9a7340; }
        .bw-area-towns-more { display:none; grid-template-columns:repeat(4,1fr); gap:8px; grid-column:1 / -1; }
        .bw-area-towns-more.show { display:grid; }
        .bw-area-towns-toggle { grid-column:1 / -1; margin-top:4px; background:none; border:none; color:#bc9155; font-size:13px; font-weight:600; cursor:pointer; padding:4px 0; transition:color .2s; text-align:center; }
        .bw-area-towns-toggle:hover { color:#9a7340; }
        .bw-area-link { display:inline-flex; align-items:center; gap:6px; margin-top:4px; color:#bc9155; font-size:14px; font-weight:600; text-decoration:none; transition:gap .3s; justify-content:center; }
        .bw-area-link:hover { gap:10px; }
        .bw-area-link-arrow { width:14px; height:14px; }
        .bw-areas-note { margin:20px auto 0; text-align:center; font-size:14px; line-height:1.7; color:#5c677d; }
        .bw-areas-note a { color:#bc9155; font-weight:600; text-decoration:none; }
        .bw-areas-note a:hover { text-decoration:underline; }
        @media (max-width:1024px) {
          .bw-areas-section { padding:60px 32px; }
          .bw-areas-grid { grid-template-columns:1fr; max-width:640px; margin:0 auto; }
          .bw-area-towns,.bw-area-towns-more { grid-template-columns:repeat(3,1fr); }
        }
        @media (max-width:768px) {
          .bw-areas-section { padding:48px 20px; }
          .bw-area-card-body { padding:20px 20px 24px; }
          .bw-area-towns,.bw-area-towns-more { grid-template-columns:repeat(3,1fr); }
          .bw-area-town { display:flex; align-items:center; justify-content:center; min-height:38px; text-align:center; }
        }
      `}</style>
    </>
  );
}

export function FinancingStrip({ data }: { data: any }) {
  if (!data) return null;
  return (
    <>
      <div className="bw-financing-strip" role="region" aria-label="Financing options">
        <div className="bw-financing-strip-inner">
          <div className="bw-financing-strip-left">
            <span className="bw-greensky-logo"><span className="bw-gs-green">Green</span><span className="bw-gs-dark">Sky</span></span>
            <p className="bw-financing-strip-text"><strong>{data.title}.</strong> {typeof data.content === "string" ? data.content.replace(/<[^>]+>/g, "") : data.content}</p>
          </div>
          {data.cta?.url ? linkNode(data.cta.url, <span>{data.cta.label || "Check Financing Options"}</span>, "bw-financing-strip-cta") : null}
        </div>
      </div>
      <style jsx global>{`
        .bw-financing-strip { background:#fff; border-top:1px solid rgba(30,43,67,.08); padding:56px 40px; }
        .bw-financing-strip-inner { max-width:1200px; margin:0 auto; display:flex; flex-direction:column; align-items:center; gap:24px; text-align:center; }
        .bw-financing-strip-left { display:flex; flex-direction:column; align-items:center; gap:16px; }
        .bw-greensky-logo { font-size:28px; font-weight:700; letter-spacing:-.3px; }
        .bw-gs-green { color:#6bbf4e; }
        .bw-gs-dark { color:#1e2b43; }
        .bw-financing-strip-text { font-size:16px; line-height:1.6; color:#5c677d; max-width:760px; }
        .bw-financing-strip-text strong { color:#1e2b43; font-weight:700; }
        .bw-financing-strip-cta { min-width:280px; min-height:52px; padding:14px 32px; border-radius:8px; display:inline-flex; align-items:center; justify-content:center; gap:10px; text-decoration:none; background:#bc9155; color:#fff; font-size:15px; font-weight:600; letter-spacing:.3px; transition:background .2s,transform .2s,box-shadow .2s; }
        .bw-financing-strip-cta:hover { background:#a57d48; transform:translateY(-1px); box-shadow:0 4px 12px rgba(188,145,85,.3); }
        @media (max-width:1024px) {
          .bw-financing-strip { padding:36px 32px; }
          .bw-financing-strip-inner,.bw-financing-strip-left { flex-direction:column; text-align:center; gap:16px; }
        }
        @media (max-width:768px) {
          .bw-financing-strip { padding:28px 20px; }
          .bw-financing-strip-text { font-size:14px; }
        }
      `}</style>
    </>
  );
}

export function LeadFormSection({ page, data, accent }: { page: CMSPage; data: any; accent?: string }) {
  const [pickedServices, setPickedServices] = useState<string[]>([]);
  const [serviceOpen, setServiceOpen] = useState(false);
  const [formValues, setFormValues] = useState<Record<string, string>>({ contact_method: "call" });
  const [submitted, setSubmitted] = useState(false);
  const [contactMethod, setContactMethod] = useState("call");
  const titleParts = parts(data?.title, accent || data?.title_highlight || "Project");
  const fields = data?.fields || [];
  const topFields = fields.filter((field: any) => !["checkbox_group", "radio_group", "textarea", "file", "select"].includes(field.type));
  const servicesField = fields.find((field: any) => field.type === "checkbox_group");
  const timeField = fields.find((field: any) => field.name === "best_time" || field.type === "select");
  const contactField = fields.find((field: any) => field.type === "radio_group");
  const messageField = fields.find((field: any) => field.type === "textarea");
  const defaultImages = [
    { src: "/portfolio/builtwell-team-client-arrival-ct.jpeg", alt: "BuiltWell CT consultation" },
    { src: "/portfolio/builtwell-contractor-sign-consultation-ct-01.jpg", alt: "BuiltWell CT team" },
  ];
  const cmsImages: Array<{ src: string; alt: string }> = (data?.images || []).slice(0, 2).map((image: any, index: number) => ({
    src: media(image.image, defaultImages[index]?.src || ""),
    alt: image.alt || "BuiltWell CT consultation",
  }));
  const images = cmsImages.length > 0 ? cmsImages : defaultImages;
  const selectedServicesLabel = pickedServices.length === 0 ? "Select services" : `${pickedServices.length} service${pickedServices.length === 1 ? "" : "s"} selected`;
  const methodOptions = contactField ? opts(contactField.options) : [];

  return (
    <>
      <section className="bw-cta-section" id="contact">
        <div className="bw-cta-section-inner">
          <div className="bw-cta-header">
            {label(data?.eyebrow || "Get In Touch")}
            <h2>{titleParts.before}{titleParts.accent ? <span className="bw-gold">{titleParts.accent}</span> : null}{titleParts.after}</h2>
            {data?.subtitle ? <p className="bw-cta-sub">{data.subtitle}</p> : null}
          </div>
          <div className="bw-cta-body">
            <div className="bw-cta-left">
              <div className="bw-cta-images">
                {images.map((image, index) => (
                  <div key={`${image.src}-${index}`} className="bw-cta-img-wrap">
                    <img src={image.src} alt={image.alt} />
                  </div>
                ))}
              </div>
            </div>
            <div className="bw-contact-form-wrap">
              {submitted ? (
                <div className="bw-form-success">
                  <CheckCircle className="h-12 w-12 text-[#bc9155]" />
                  <h3>Thank You</h3>
                  <p>We received your request and will reach out within one business day.</p>
                </div>
              ) : (
                <form onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }}>
                  <div className="bw-form-row">
                    {topFields.map((field: any) => (
                      <div key={field.name} className="bw-form-group">
                        <label>{field.label}{field.required ? " *" : ""}</label>
                        <input type={field.type} required={field.required} value={formValues[field.name] || ""} placeholder={field.placeholder || ""} onChange={(event) => setFormValues((current) => ({ ...current, [field.name]: event.target.value }))} />
                      </div>
                    ))}
                  </div>
                  <div className="bw-form-row">
                    {servicesField ? (
                      <div className="bw-form-group">
                        <label>{servicesField.label}{servicesField.required ? " *" : ""}</label>
                        <div className="bw-multi-select-wrap">
                          <button type="button" className="bw-multi-select-toggle" aria-expanded={serviceOpen} onClick={() => setServiceOpen((current) => !current)}>
                            <span className={cls("bw-multi-select-text", pickedServices.length > 0 && "bw-has-selection")}>{selectedServicesLabel}</span>
                            <ChevronDown className="h-3 w-3" />
                          </button>
                          <div className={cls("bw-multi-select-dropdown", serviceOpen && "bw-open")}>
                            {opts(servicesField.options).map((option) => (
                              <label key={option.value}>
                                <input type="checkbox" checked={pickedServices.includes(option.value)} onChange={() => setPickedServices((current) => current.includes(option.value) ? current.filter((value) => value !== option.value) : [...current, option.value])} />
                                <span>{option.label}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : null}
                    {timeField ? (
                      <div className="bw-form-group">
                        <label>{timeField.label}{timeField.required ? " *" : ""}</label>
                        <select required={timeField.required} value={formValues[timeField.name] || ""} onChange={(event) => setFormValues((current) => ({ ...current, [timeField.name]: event.target.value }))}>
                          <option value="">Select a time</option>
                          {opts(timeField.options).map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
                        </select>
                      </div>
                    ) : null}
                    {methodOptions.length > 0 ? (
                      <fieldset className="bw-form-group">
                        <legend>{contactField.label}{contactField.required ? " *" : ""}</legend>
                        <div className="bw-form-radio-group">
                          {methodOptions.map((option) => (
                            <label key={option.value}>
                              <input type="radio" name={contactField.name} value={option.value} checked={contactMethod === option.value} onChange={() => setContactMethod(option.value)} />
                              <span>{option.label}</span>
                            </label>
                          ))}
                        </div>
                      </fieldset>
                    ) : null}
                  </div>
                  {messageField ? (
                    <div className="bw-form-group">
                      <label>{messageField.label}</label>
                      <textarea rows={4} value={formValues[messageField.name] || ""} placeholder={messageField.placeholder || ""} onChange={(event) => setFormValues((current) => ({ ...current, [messageField.name]: event.target.value }))} />
                    </div>
                  ) : null}
                  <div className="bw-form-consent">
                    <label>
                      <input type="checkbox" name="consent" required />
                      <span>I agree to the <a href="/privacy-policy/" className="bw-form-consent-link">Privacy Policy</a> and <a href="/terms/" className="bw-form-consent-link">Terms of Service</a>. I consent to receive calls, texts (SMS), and emails from BuiltWell CT, including automated messages. Msg &amp; data rates may apply. Reply STOP to opt out.</span>
                    </label>
                  </div>
                  <button type="submit" className="bw-form-submit">{data?.submit_label || "Get Your Free Estimate"}</button>
                  <p className="bw-form-note">{data?.consent_text || "We respond within 24 hours. No spam, no obligation."}</p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
      <style jsx global>{`
        .bw-gold { color:#bc9155; }
        .bw-cta-section { background:#f5f1e9; border-top:1px solid rgba(30,43,67,.08); padding:64px 40px 72px; }
        .bw-cta-section-inner { max-width:1200px; margin:0 auto; }
        .bw-cta-header { text-align:center; margin-bottom:32px; }
        .bw-cta-header h2 { margin-bottom:8px; font:700 clamp(30px,3vw,42px)/1.2 "Playfair Display",serif; color:#1e2b43; letter-spacing:-.5px; }
        .bw-cta-header .bw-cta-sub { max-width:600px; margin:0 auto; font-size:16px; line-height:1.7; color:#5c677d; }
        .bw-cta-body { display:grid; grid-template-columns:1fr 1.15fr; gap:32px; align-items:stretch; }
        .bw-cta-left { display:flex; flex-direction:column; gap:16px; }
        .bw-cta-images { display:flex; flex-direction:column; gap:12px; flex:1; }
        .bw-cta-img-wrap { position:relative; flex:1; min-height:0; overflow:hidden; border-radius:8px; }
        .bw-cta-img-wrap img { width:100%; height:100%; object-fit:cover; display:block; }
        .bw-cta-img-wrap::after { content:""; position:absolute; bottom:0; right:0; width:200px; height:200px; background:radial-gradient(circle at bottom right,rgba(30,43,67,1) 0%,rgba(30,43,67,.9) 25%,rgba(30,43,67,.5) 50%,transparent 75%); pointer-events:none; border-radius:0 0 8px 0; }
        .bw-contact-form-wrap { background:#fff; border-radius:10px; padding:32px 36px; border:1px solid rgba(30,43,67,.08); box-shadow:0 16px 48px rgba(30,43,67,.1),0 4px 12px rgba(30,43,67,.04); display:flex; flex-direction:column; }
        .bw-contact-form-wrap form { display:flex; flex-direction:column; flex:1; }
        .bw-form-success { min-height:420px; display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center; }
        .bw-form-success h3 { margin-top:16px; font:700 32px/1.2 "Playfair Display",serif; color:#1e2b43; }
        .bw-form-success p { margin-top:12px; max-width:420px; line-height:1.7; color:#5c677d; }
        .bw-form-row { display:grid; grid-template-columns:1fr 1fr; gap:16px; }
        .bw-form-group { margin-bottom:16px; border:none; padding:0; min-width:0; }
        .bw-form-row fieldset.bw-form-group { grid-column:1 / -1; }
        .bw-form-group label,.bw-form-group legend { display:block; margin-bottom:6px; font-size:13px; font-weight:600; text-transform:uppercase; letter-spacing:.5px; color:#1e2b43; }
        .bw-form-group input:not([type="radio"]):not([type="checkbox"]),.bw-form-group select,.bw-form-group textarea,.bw-multi-select-toggle { width:100%; border:1px solid rgba(30,43,67,.15); border-radius:6px; padding:12px 14px; font-size:15px; color:#1e2b43; background:#fff; transition:border-color .2s; box-sizing:border-box; }
        .bw-form-group textarea { min-height:120px; line-height:1.6; resize:vertical; }
        .bw-form-group input:not([type="radio"]):not([type="checkbox"]):focus,.bw-form-group select:focus,.bw-form-group textarea:focus,.bw-multi-select-toggle:focus { outline:none; border-color:#bc9155; }
        .bw-form-group select { appearance:none; -webkit-appearance:none; padding-right:40px; background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%235C677D' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E"); background-repeat:no-repeat; background-position:right 16px center; }
        .bw-multi-select-wrap { position:relative; }
        .bw-multi-select-toggle { display:flex; align-items:center; justify-content:space-between; border-radius:4px; cursor:pointer; text-align:left; }
        .bw-multi-select-toggle svg { transition:transform .2s; }
        .bw-multi-select-toggle[aria-expanded="true"] svg { transform:rotate(180deg); }
        .bw-multi-select-text { color:#5c677d; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
        .bw-multi-select-text.bw-has-selection { color:#1e2b43; font-weight:500; }
        .bw-multi-select-dropdown { display:none; position:absolute; top:calc(100% + 4px); left:0; right:0; max-height:240px; overflow-y:auto; z-index:20; background:#fff; border:1px solid rgba(30,43,67,.15); border-radius:6px; box-shadow:0 8px 24px rgba(0,0,0,.12); padding:6px 0; }
        .bw-multi-select-dropdown.bw-open { display:block; }
        .bw-multi-select-dropdown label { display:flex; align-items:center; gap:10px; margin:0; padding:8px 14px; font-size:14px; font-weight:400; letter-spacing:0; text-transform:none; cursor:pointer; }
        .bw-multi-select-dropdown label:hover { background:rgba(188,145,85,.06); }
        .bw-multi-select-dropdown input[type="checkbox"] { appearance:none; -webkit-appearance:none; width:18px; height:18px; border:2px solid rgba(30,43,67,.25); border-radius:3px; position:relative; cursor:pointer; margin:0; flex-shrink:0; }
        .bw-multi-select-dropdown input[type="checkbox"]:checked { background:#bc9155; border-color:#bc9155; }
        .bw-multi-select-dropdown input[type="checkbox"]:checked::after { content:""; position:absolute; left:5px; top:2px; width:5px; height:9px; border:solid #fff; border-width:0 2px 2px 0; transform:rotate(45deg); }
        .bw-form-radio-group { display:flex; gap:10px; flex-wrap:nowrap; }
        .bw-form-radio-group label { flex:1; margin:0; padding:12px 14px; border:2px solid rgba(30,43,67,.12); border-radius:6px; display:flex; justify-content:center; align-items:center; text-transform:none; letter-spacing:0; font-size:13px; font-weight:500; cursor:pointer; transition:.2s; }
        .bw-form-radio-group label:hover { border-color:#bc9155; }
        .bw-form-radio-group input { display:none!important; opacity:0!important; width:0!important; height:0!important; margin:0!important; padding:0!important; border:0!important; position:absolute!important; pointer-events:none!important; appearance:none!important; -webkit-appearance:none!important; }
        .bw-form-radio-group input:checked + span { color:#bc9155; font-weight:600; }
        .bw-form-radio-group label:has(input:checked) { border-color:#bc9155; background:rgba(188,145,85,.06); }
        .bw-form-consent { margin:10px 0 8px; }
        .bw-form-consent label { display:flex; align-items:flex-start; gap:10px; font-size:12px; line-height:1.5; color:#6b7280; cursor:pointer; }
        .bw-form-consent input[type="checkbox"] { margin-top:3px; accent-color:#bc9155; min-width:16px; }
        .bw-form-consent-link { color:#bc9155; text-decoration:underline; }
        .bw-form-submit { width:100%; min-height:52px; padding:14px 20px; border:none; border-radius:8px; background:#bc9155; color:#fff; font-size:15px; font-weight:600; letter-spacing:.3px; cursor:pointer; transition:background .2s,transform .2s,box-shadow .2s; }
        .bw-form-submit:hover { background:#a57d48; transform:translateY(-1px); box-shadow:0 4px 12px rgba(188,145,85,.3); }
        .bw-form-note { margin-top:16px; text-align:center; font-size:13px; font-style:italic; color:#5c677d; }
        @media (max-width:768px) {
          .bw-cta-section { padding:48px 20px; }
          .bw-cta-body { grid-template-columns:1fr; }
          .bw-cta-left { order:2; }
          .bw-cta-img-wrap + .bw-cta-img-wrap { display:none; }
          .bw-cta-images img { max-height:200px; object-fit:cover; border-radius:10px; }
          .bw-contact-form-wrap { padding:24px 18px; }
          .bw-form-row { grid-template-columns:1fr; }
          .bw-form-radio-group { flex-wrap:wrap; }
          .bw-form-group input:not([type="radio"]):not([type="checkbox"]),.bw-form-group select,.bw-form-group textarea { font-size:16px; }
          .bw-form-submit { font-size:16px; font-weight:700; }
        }
      `}</style>
    </>
  );
}

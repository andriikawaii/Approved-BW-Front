"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, CalendarDays, Check, ChevronDown, Shield, Star, Upload } from "lucide-react";
import type { CMSPage } from "@/types/cms";

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

const cls = (...values: Array<string | false | null | undefined>) => values.filter(Boolean).join(" ");
const section = <T,>(page: CMSPage, type: string) => page.sections.find((entry) => entry.is_active && entry.type === type)?.data as T | undefined;
const sections = <T,>(page: CMSPage, type: string) => page.sections.filter((entry) => entry.is_active && entry.type === type).map((entry) => entry.data as T);
const opts = (value?: Array<string | { label: string; value: string }> | null) => (value || []).map((item) => typeof item === "string" ? { label: item, value: item } : item);

function media(value?: string | null, fallback = "") {
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
}

function paras(value?: string | null) {
  return (value || "").replace(/\r/g, "").split(/\n{2,}/).map((item) => item.trim()).filter(Boolean);
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
    <a href={href} className={className} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noreferrer" : undefined}>{children}</a>
  ) : (
    <Link href={href} className={className}>{children}</Link>
  );
}

function trustIcon(icon?: string | null) {
  switch (icon) {
    case "star":
      return <Star className="h-5 w-5" />;
    case "shield":
    case "check":
      return <Shield className="h-5 w-5" />;
    default:
      return <CalendarDays className="h-5 w-5" />;
  }
}

export function ServicesOverviewPageTemplate({ page }: { page: CMSPage }) {
  const hero = section<any>(page, "hero");
  const servicesGrid = section<any>(page, "services_grid");
  const process = section<any>(page, "process_steps");
  const brands = section<any>(page, "logo_strip");
  const areas = section<any>(page, "areas_served");
  const trust = section<any>(page, "trust_bar");
  const lead = section<any>(page, "lead_form");
  const financing = sections<RichTextData>(page, "rich_text").find((item) => item.style_variant === "financing_strip");

  const heroParts = parts(hero?.headline, "Services in Connecticut");
  const gridParts = parts(servicesGrid?.title, servicesGrid?.highlight_text || "Services");
  const processParts = parts(process?.title, "Process");
  const brandsParts = parts(brands?.title, "Stand Behind");
  const areasParts = parts(areas?.title, areas?.highlight_text || "Work");
  const leadParts = parts(lead?.title, lead?.title_highlight || "Project");

  const [countyOpen, setCountyOpen] = useState<Record<number, boolean>>({});
  const [activeProcessStep, setActiveProcessStep] = useState(0);
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
  const slug = page.slug?.replace(/^\/+|\/+$/g, "") || "services";

  return (
    <div className="bg-[#f5f1e9] text-[#1e2b43]">
      <section className="relative isolate min-h-[460px] overflow-hidden bg-[#151e30] px-5 py-0 text-white md:px-10">
        <div className="absolute inset-0 bg-cover bg-center opacity-[0.78]" style={{ backgroundImage: `url(${media(hero?.background_image, "/portfolio/builtwell-job-site-aerial-ct.jpg")})` }} />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,28,48,0.26)_0%,rgba(15,28,48,0.44)_36%,rgba(15,28,48,0.84)_100%)]" />
        <div className="relative z-10 mx-auto flex min-h-[460px] max-w-[1240px] flex-col items-center justify-center text-center">
          <ol className="mb-5 flex list-none items-center justify-center text-[12px] font-medium text-white/90">
            <li>Home</li>
            <li className="before:px-2.5 before:text-[#bc9155] before:content-['›']">Services</li>
          </ol>
          <div className="mx-auto max-w-[980px]">
            <h1 className="text-[44px] font-bold leading-[1.06] tracking-[-0.03em] md:text-[60px]">
              <span className="text-white">{heroParts.before || "Home Remodeling "}</span>
              <span className="text-[#bc9155]">{heroParts.accent || "Services in Connecticut"}</span>
              <span className="text-white">{heroParts.after}</span>
            </h1>
            {hero?.subheadline ? <p className="mx-auto mt-4 max-w-[700px] text-[17px] leading-[1.68] text-white/87">{hero.subheadline}</p> : null}
          </div>
        </div>
      </section>

      <section className="bg-[#f5f1e9] px-5 py-24 md:px-10">
        <div className="mx-auto max-w-[1240px]">
          <div className="mx-auto mb-20 max-w-3xl text-center">
            {label(servicesGrid?.eyebrow || "What We Do")}
            <h2 className="text-[42px] font-bold leading-[1.08] tracking-[-0.025em] md:text-[56px]">
              {gridParts.before || "Our "}
              <span className="text-[#bc9155]">{gridParts.accent || "Services"}</span>
              {gridParts.after}
            </h2>
            {servicesGrid?.subtitle ? <p className="mx-auto mt-6 max-w-[620px] text-[17px] leading-[1.7] text-[#5e6f86]">{servicesGrid.subtitle}</p> : null}
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {(servicesGrid?.items || []).map((item: any, index: number) => (
              <article key={`${item.title}-${index}`} className="group flex flex-col overflow-hidden rounded-[8px] border-b-2 border-b-transparent bg-white shadow-[0_2px_12px_rgba(30,43,67,0.06),0_1px_3px_rgba(30,43,67,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-b-[#bc9155] hover:shadow-[0_12px_28px_rgba(30,43,67,0.1),0_28px_56px_rgba(30,43,67,0.12)]">
                <div className="h-[280px] overflow-hidden">
                  <img src={media(item.image, "/images/services/service-kitchen.jpg")} alt={item.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="flex flex-1 flex-col px-7 pb-8 pt-7">
                  <h3 className="mb-3 text-[22px] font-bold leading-[1.2]">{item.url ? linkNode(item.url, item.title, "transition-colors group-hover:text-[#bc9155]") : item.title}</h3>
                  <p className="mb-5 flex-1 text-[15px] leading-[1.7] text-[#5c677d]">{item.summary}</p>
                  <div className="mb-5 flex flex-wrap gap-3">
                    {item.price ? <span className="inline-flex items-center rounded-full bg-[#bc91551a] px-3.5 py-1.5 text-[12px] font-semibold text-[#9a7340]">{item.price}</span> : null}
                    {item.timeline ? <span className="inline-flex items-center rounded-full bg-[#bc91551a] px-3.5 py-1.5 text-[12px] font-semibold text-[#9a7340]">{item.timeline}</span> : null}
                  </div>
                  {item.url ? linkNode(item.url, <><span>{item.cta_label || "Learn More"}</span><ArrowRight className="h-[14px] w-[14px]" /></>, "inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#bc9155] transition-all hover:gap-2.5") : null}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#142033] px-5 py-24 text-white md:px-10">
        <div className="absolute inset-0 bg-cover bg-center opacity-[0.18]" style={{ backgroundImage: `url(${media("/hero/builtwell-team-van-consultation-hero-ct.jpg")})` }} />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(21,30,48,0.96)_0%,rgba(30,43,67,0.90)_100%)]" />
        <div className="relative z-10 mx-auto max-w-[1240px]">
          <div className="mb-14 text-center">
            {label("Our Process", true)}
            <h2 className="text-[clamp(34px,3.8vw,48px)] font-bold tracking-[-0.02em]">{processParts.before || "Our Remodeling "}<span className="text-[#bc9155]">{processParts.accent || "Process"}</span>{processParts.after}</h2>
            {process?.subtitle ? <p className="mx-auto mt-4 max-w-[860px] text-[15px] leading-[1.8] text-white/78">{process.subtitle}</p> : null}
          </div>
          <div className="hidden lg:block">
            <div className="relative mx-auto max-w-[1180px]">
              <div className="absolute left-[9.5%] right-[9.5%] top-[20px] h-px bg-[#bc915580]" />
              <div className="grid grid-cols-5 gap-10">
                {(process?.steps || []).map((item: any, index: number) => (
                  <button
                    key={`${item.title}-${index}`}
                    type="button"
                    onClick={() => setActiveProcessStep(index)}
                    className="text-center"
                  >
                    <div className={cls("mx-auto mb-6 flex h-10 w-10 items-center justify-center rounded-full border text-[12px] font-semibold transition-all", activeProcessStep === index ? "border-[#bc9155] bg-[rgba(188,145,85,0.20)] text-[#f4dcc0] shadow-[0_0_0_4px_rgba(188,145,85,0.08)]" : "border-[#bc9155] bg-transparent text-white hover:bg-[rgba(188,145,85,0.12)]")}>{index + 1}</div>
                    <h3 className={cls("text-[18px] font-bold transition-colors", activeProcessStep === index ? "text-white" : "text-white/92")}>{item.title}</h3>
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="grid gap-4 lg:hidden">
            {(process?.steps || []).map((item: any, index: number) => (
              <button key={`${item.title}-${index}`} type="button" onClick={() => setActiveProcessStep(activeProcessStep === index ? index : index)} className={cls("rounded-[12px] border px-5 py-6 text-left", activeProcessStep === index ? "border-[#bc9155] bg-[rgba(188,145,85,0.12)]" : "border-white/10 bg-white/5")}>
                <div className={cls("mb-4 flex h-10 w-10 items-center justify-center rounded-full border text-[12px] font-semibold", activeProcessStep === index ? "border-[#bc9155] bg-[rgba(188,145,85,0.20)] text-[#f0d9b6]" : "border-[#bc9155] bg-transparent text-white")}>{index + 1}</div>
                <h3 className="text-[18px] font-bold text-white">{item.title}</h3>
                {activeProcessStep === index ? <>
                  <p className="mt-2 text-[12px] font-semibold uppercase tracking-[0.14em] text-[#bc9155]">{item.short}</p>
                  <p className="mt-3 text-[14px] leading-[1.72] text-white/75">{item.description}</p>
                </> : null}
              </button>
            ))}
          </div>
          <p className="mt-10 text-center text-[13px] text-white/48">Click any step to learn more</p>
          {(process?.steps || [])[activeProcessStep] ? (
            <div className="mx-auto mt-10 max-w-[1040px] rounded-[14px] border border-white/10 bg-white/[0.03] px-8 py-8 backdrop-blur-sm">
              <div className="mx-auto max-w-[760px] text-center">
                <h3 className="text-[18px] font-bold uppercase tracking-[0.02em] text-white md:text-[20px]">{(process.steps || [])[activeProcessStep].title}</h3>
                <p className="mt-4 text-[12px] font-semibold uppercase tracking-[0.18em] text-[#bc9155]">{(process.steps || [])[activeProcessStep].short}</p>
                <p className="mx-auto mt-5 max-w-[680px] text-[15px] leading-[1.9] text-white/78">{(process.steps || [])[activeProcessStep].description}</p>
              </div>
            </div>
          ) : null}
        </div>
      </section>

      <section className="bg-white px-5 py-24 md:px-10">
        <div className="mx-auto max-w-[1240px] text-center">
          {label("Trusted Brands")}
          <h2 className="text-[clamp(34px,3.8vw,48px)] font-bold tracking-[-0.02em]">{brandsParts.before || "Materials We "}<span className="text-[#bc9155]">{brandsParts.accent || "Stand Behind"}</span>{brandsParts.after}</h2>
          {brands?.subtitle ? <p className="mx-auto mt-4 max-w-[760px] text-[15px] leading-[1.8] text-[#5c677d]">{brands.subtitle}</p> : null}
          <div className="relative mx-auto mt-14 max-w-[1320px] overflow-hidden">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-white to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-white to-transparent" />
            <div className="flex w-max min-w-full animate-[servicesLogoMarquee_28s_linear_infinite] items-center gap-16 whitespace-nowrap">
              {[...(brands?.items || []), ...(brands?.items || [])].map((item: any, index: number) => (
                <a key={`${item.name}-${index}`} href={item.url || "#"} target="_blank" rel="noreferrer" className="flex min-h-[30px] items-center justify-center text-center opacity-90 transition-opacity hover:opacity-100">
                  {item.logo ? (
                    <img src={media(item.logo, "/logos/builtwell-logo-text-only.png")} alt={item.name} className="max-h-8 w-auto object-contain" />
                  ) : (
                    <span className="text-[12px] font-semibold uppercase tracking-[0.24em] text-[#7f8898]">{item.name}</span>
                  )}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f5f1e9] px-5 py-24 md:px-10">
        <div className="mx-auto max-w-[1240px]">
          <div className="mb-10 text-center">
            {label("Areas We Serve")}
            <h2 className="text-[clamp(34px,3.8vw,48px)] font-bold tracking-[-0.02em]">{areasParts.before || "Where We "}<span className="text-[#bc9155]">{areasParts.accent || "Work"}</span>{areasParts.after}</h2>
          </div>
          <div className="grid gap-8 lg:grid-cols-2">
            {(areas?.counties || []).map((county: any, index: number) => {
              const expanded = !!countyOpen[index];
              const towns = expanded ? [...(county.towns || []), ...(county.extra_towns || [])] : county.towns || [];

              return (
                <article key={`${county.name}-${index}`} className="overflow-hidden rounded-[12px] border border-[#e6ddcd] bg-white shadow-[0_14px_32px_rgba(30,43,67,0.07)]">
                  <div className="relative h-[230px] overflow-hidden">
                    <img src={media(county.image, index === 0 ? "/images/areas/fairfield-county.jpg" : "/images/areas/new-haven-county.jpg")} alt={county.name} className="h-full w-full object-cover" />
                  </div>
                  <div className="p-7">
                    <h3 className="text-[28px] font-bold">{county.name}</h3>
                    <p className="mt-1 text-[15px] text-[#5c677d]">Call: {linkNode(`tel:${(county.phone || "").replace(/\D/g, "")}`, county.phone, "font-semibold text-[#bc9155] hover:underline")}</p>
                    <p className="mt-4 text-[14px] leading-[1.78] text-[#5c677d]">{county.description}</p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {towns.map((town: string, townIndex: number) => (
                        <div key={`${county.name}-${town}-${townIndex}`}>
                          {linkNode(county.url || "#", town, "rounded-full bg-[#f5f1e9] px-3.5 py-2 text-center text-[11px] font-semibold text-[#1e2b43] transition-colors hover:bg-[#bc9155] hover:text-white")}
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

      <div className="relative overflow-hidden bg-[linear-gradient(135deg,#1a2438_0%,#1e2b43_50%,#151e30_100%)] px-5 py-12 md:px-10 md:py-14">
        <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-center">
          {(trust?.items || []).map((item: any, index: number) => (
            <div key={`${item.label}-${index}`} className="contents">
              {linkNode(item.url || "#", <div className="flex min-w-[180px] flex-1 flex-col items-center gap-3 px-8 py-5 text-center text-[13px] font-semibold tracking-[0.03em] text-white/90 transition-all hover:text-[#bc9155]"><span className="text-[#bc9155]">{trustIcon(item.icon)}</span><span>{[item.label, item.value].filter(Boolean).join(" ")}</span></div>, "flex flex-1 justify-center")}
              {index < (trust?.items || []).length - 1 ? <div className="hidden h-10 w-px bg-white/10 lg:block" /> : null}
            </div>
          ))}
        </div>
      </div>

      <section className="bg-[#f5f1e9] px-5 py-24 md:px-10" id="contact">
        <div className="mx-auto max-w-[1200px]">
          <div className="mb-10 text-center">
            {label(lead?.eyebrow)}
            <h2 className="text-[clamp(34px,3.8vw,48px)] font-bold leading-[1.12] tracking-[-0.02em]">{leadParts.before || "Tell Us About Your "}<span className="text-[#bc9155]">{leadParts.accent || "Project"}</span>{leadParts.after}</h2>
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
                  <div><label className="flex min-h-[52px] cursor-pointer items-center justify-center gap-2 rounded-[8px] border border-[#1e2b4326] px-5 py-3 text-[15px] font-semibold text-[#1e2b43] transition-colors hover:border-[#bc9155]" htmlFor={`${slug}-lead-files`}><Upload className="h-4 w-4" />Upload Photos</label><input id={`${slug}-lead-files`} type="file" multiple accept="image/jpeg,image/png,image/heic,.heic" className="hidden" onChange={(event) => setFileNames(Array.from(event.target.files || []).map((file) => file.name))} />{fileNames.length ? <p className="mt-2 text-[12px] text-[#5c677d]">{fileNames.join(", ")}</p> : null}</div>
                  <button type="submit" className="min-h-[52px] rounded-[8px] bg-[#bc9155] px-5 py-3 text-[15px] font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-[#a57d48]">{lead?.submit_label || "Send Request"}</button>
                </div>
                <p className="mt-4 text-center text-[13px] italic text-[#5c677d]">{lead?.consent_text}</p>
              </form>}
            </div>
          </div>
        </div>
      </section>

      {financing ? (
        <section className="border-t border-[#1e2b4314] bg-white px-5 py-12 md:px-10 md:py-14">
          <div className="mx-auto flex max-w-[1200px] flex-col items-center gap-6 text-center md:flex-row md:justify-between md:text-left">
            <div className="flex flex-col items-center gap-4 md:flex-row">
              {financing.image ? <img src={media(financing.image)} alt={financing.title || "Financing"} className="max-h-8 w-auto object-contain" /> : <div className="text-[24px] font-bold tracking-[-0.02em]"><span className="text-[#6bbf4e]">Green</span><span className="text-[#1e2b43]">Sky</span></div>}
              <p className="max-w-[760px] text-[16px] leading-[1.6] text-[#5c677d]"><strong className="text-[#1e2b43]">{financing.title}.</strong> {paras(financing.content).join(" ")}</p>
            </div>
            {financing.cta?.url ? linkNode(financing.cta.url, <><span>{financing.cta.label || "Check Financing Options"}</span><ArrowRight className="h-4 w-4" /></>, "inline-flex min-h-[52px] min-w-[280px] items-center justify-center gap-2 rounded-[8px] bg-[#bc9155] px-8 py-3 text-[15px] font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-[#a57d48]") : null}
          </div>
        </section>
      ) : null}
    </div>
  );
}

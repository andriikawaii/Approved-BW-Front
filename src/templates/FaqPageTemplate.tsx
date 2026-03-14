"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, CalendarDays, Check, ChevronDown, Shield, Star, Upload } from "lucide-react";
import type { CMSPage } from "@/types/cms";

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
  const trustBars = sections<any>(page, "trust_bar");
  const faqs = sections<any>(page, "faq_list");
  const areas = section<any>(page, "areas_served");
  const lead = section<any>(page, "lead_form");
  const financing = sections<any>(page, "rich_text").find((item) => item.style_variant === "financing_strip");
  const related = section<any>(page, "project_highlights");
  const heroTrust = trustBars[0];
  const stripTrust = trustBars[1];
  const generalFaq = faqs[0];
  const categoryFaqs = faqs.slice(1);
  const [showAllGeneral, setShowAllGeneral] = useState(false);
  const [openGeneral, setOpenGeneral] = useState<number | null>(0);
  const [openCategory, setOpenCategory] = useState<Record<string, number | null>>({});
  const [showAllCategory, setShowAllCategory] = useState<Record<string, boolean>>({});
  const [countyOpen, setCountyOpen] = useState<Record<number, boolean>>({});
  const [pickedServices, setPickedServices] = useState<string[]>([]);
  const [serviceOpen, setServiceOpen] = useState(false);
  const [fileNames, setFileNames] = useState<string[]>([]);
  const [formValues, setFormValues] = useState<Record<string, string>>({ contact_method: "call" });
  const [submitted, setSubmitted] = useState(false);
  const heroParts = parts(hero?.headline, "Connecticut");
  const leadParts = parts(lead?.title, lead?.title_highlight || "Project");
  const fields = lead?.fields || [];
  const topFields = fields.filter((field: any) => !["checkbox_group", "radio_group", "textarea", "file"].includes(field.type));
  const servicesField = fields.find((field: any) => field.type === "checkbox_group");
  const timeField = fields.find((field: any) => field.name === "best_time" || field.type === "select");
  const contactField = fields.find((field: any) => field.type === "radio_group");
  const messageField = fields.find((field: any) => field.type === "textarea");

  return (
    <div className="bg-[#f5f1e9] text-[#1e2b43]">
      <section className="relative isolate overflow-hidden bg-[#151e30] px-5 pt-[84px] text-white md:px-10">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${media(hero?.background_image, "/portfolio/builtwell-team-client-arrival-ct.jpeg")})` }} />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(21,30,48,0.55)_0%,rgba(21,30,48,0.42)_30%,rgba(21,30,48,0.68)_78%,rgba(21,30,48,0.92)_100%)]" />
        <div className="relative z-10 mx-auto flex min-h-[560px] max-w-[1280px] flex-col items-center justify-center pb-16 text-center">
          <ol className="mb-5 flex list-none items-center text-[13px] font-medium text-white/90">
            <li className="flex items-center">{linkNode("/", "Home", "transition-colors hover:text-[#bc9155]")}</li>
            <li className="flex items-center before:px-2.5 before:text-[#bc9155] before:content-['›']"><span className="font-semibold text-white">FAQ</span></li>
          </ol>
          <h1 className="max-w-[1100px] text-[clamp(40px,5vw,76px)] font-bold leading-[0.98] tracking-[-0.03em] text-white">
            {heroParts.before}
            {heroParts.accent ? <span className="text-[#bc9155]">{heroParts.accent}</span> : null}
            {heroParts.after}
          </h1>
          {hero?.subheadline ? <p className="mt-6 max-w-[820px] text-[17px] leading-[1.65] text-white/90">{hero.subheadline}</p> : null}
          <div className="mt-8 flex flex-wrap items-stretch justify-center gap-4">
            {(hero?.badges || []).map((badge: any, index: number) => {
              const isPrimary = !!badge.is_primary;
              return (
                <div key={`${badge.label || "badge"}-${index}`}>
                  {linkNode(
                    badge.url || "#",
                    <div className={cls("min-w-[180px] rounded-[10px] border px-7 py-5 text-left shadow-[0_10px_28px_rgba(0,0,0,0.12)] backdrop-blur-sm transition-all hover:-translate-y-0.5", isPrimary ? "border-[#bc9155] bg-[#bc9155] text-white" : "border-white/12 bg-[#273148d8] text-white")}>
                      <div className={cls("text-[12px] font-semibold uppercase tracking-[0.14em]", isPrimary ? "text-white/85" : "text-white/65")}>{badge.label}</div>
                      {badge.value ? <div className="mt-1 text-[18px] font-bold">{badge.value}</div> : null}
                    </div>,
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <div className="bg-[#1e2b43]">
        <div className="mx-auto grid max-w-[1440px] grid-cols-2 border-y border-white/10 md:grid-cols-4">
          {(heroTrust?.items || []).map((item: any, index: number) => (
            <div key={`${item.label || "trust"}-${index}`} className="flex min-h-[144px] flex-col items-center justify-center border-r border-white/10 px-4 text-center last:border-r-0">
              <div className="mb-2 text-[#bc9155]">{trustIcon(item.icon)}</div>
              {item.value ? <div className="text-[26px] font-bold text-[#bc9155]">{item.value}</div> : null}
              <div className="mt-1 text-[12px] font-semibold uppercase tracking-[0.16em] text-white/75">{item.label}</div>
            </div>
          ))}
        </div>
      </div>

      <section className="bg-white px-5 py-20 md:px-10">
        <div className="mx-auto max-w-[1040px]">
          <div className="mb-10 text-center">
            {label("Frequently Asked")}
            <h2 className="text-[clamp(34px,3.8vw,50px)] font-bold tracking-[-0.02em]">{generalFaq?.title}</h2>
            {generalFaq?.subtitle ? <p className="mx-auto mt-3 max-w-[760px] text-[15px] leading-[1.8] text-[#5c677d]">{generalFaq.subtitle}</p> : null}
          </div>
          <div className="overflow-hidden rounded-[12px] border border-[#e2d7c6] bg-white shadow-[0_16px_36px_rgba(30,43,67,0.06)]">
            {(showAllGeneral ? generalFaq?.items || [] : (generalFaq?.items || []).slice(0, 5)).map((item: any, index: number) => (
              <div key={`${item.question || "faq"}-${index}`} className="border-t border-[#eee6d7] first:border-t-0">
                <button type="button" onClick={() => setOpenGeneral((current) => current === index ? null : index)} className="flex w-full items-center justify-between px-6 py-5 text-left text-[18px] font-semibold text-[#1e2b43]">
                  <span>{item.question}</span>
                  <ChevronDown className={cls("h-5 w-5 transition-transform", openGeneral === index && "rotate-180")} />
                </button>
                {openGeneral === index ? <div className="px-6 pb-6 text-[15px] leading-[1.8] text-[#5c677d]">{item.answer}</div> : null}
              </div>
            ))}
          </div>
          {(generalFaq?.items || []).length > 5 ? <div className="mt-8 text-center"><button type="button" onClick={() => setShowAllGeneral((current) => !current)} className="inline-flex rounded-[999px] border border-[#bc9155] px-5 py-3 text-[13px] font-semibold uppercase tracking-[0.12em] text-[#bc9155] transition-colors hover:bg-[#bc9155] hover:text-white">{showAllGeneral ? "Show Fewer -" : "Read More +"}</button></div> : null}
        </div>
      </section>

      <section className="bg-[#f5f1e9] px-5 py-20 md:px-10">
        <div className="mx-auto max-w-[1240px]">
          <div className="mb-12 text-center">
            {label("By Service")}
            <h2 className="text-[clamp(34px,3.8vw,50px)] font-bold tracking-[-0.02em]">Questions by <span className="text-[#bc9155]">Project Type</span></h2>
          </div>
          <div className="grid gap-7 lg:grid-cols-2">
            {categoryFaqs.map((group: any, groupIndex: number) => {
              const key = group.title || `group-${groupIndex}`;
              const shownItems = showAllCategory[key] ? group.items || [] : (group.items || []).slice(0, 3);
              return (
                <article key={key} className="rounded-[12px] border border-[#e4dac9] bg-white p-7 shadow-[0_16px_34px_rgba(30,43,67,0.06)]">
                  <h3 className="text-[28px] font-bold">{group.title.replace(/ FAQ$/, "")}</h3>
                  {group.subtitle ? <p className="mt-2 text-[14px] leading-[1.75] text-[#5c677d]">{group.subtitle}</p> : null}
                  <div className="mt-6 overflow-hidden rounded-[10px] border border-[#eee6d7]">
                    {shownItems.map((item: any, index: number) => {
                      const openKey = openCategory[key];
                      return (
                        <div key={`${item.question || "item"}-${index}`} className="border-t border-[#eee6d7] first:border-t-0">
                          <button type="button" onClick={() => setOpenCategory((current) => ({ ...current, [key]: current[key] === index ? null : index }))} className="flex w-full items-center justify-between px-5 py-4 text-left text-[16px] font-semibold text-[#1e2b43]">
                            <span>{item.question}</span>
                            <ChevronDown className={cls("h-5 w-5 transition-transform", openKey === index && "rotate-180")} />
                          </button>
                          {openKey === index ? <div className="px-5 pb-5 text-[14px] leading-[1.8] text-[#5c677d]">{item.answer}</div> : null}
                        </div>
                      );
                    })}
                  </div>
                  {(group.items || []).length > 3 ? <button type="button" onClick={() => setShowAllCategory((current) => ({ ...current, [key]: !current[key] }))} className="mt-5 inline-flex rounded-[999px] border border-[#bc9155] px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.12em] text-[#bc9155] transition-colors hover:bg-[#bc9155] hover:text-white">{showAllCategory[key] ? "Show Fewer -" : "Read More +"}</button> : null}
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-20 md:px-10">
        <div className="mx-auto max-w-[1240px]">
          <div className="mb-12 text-center">
            {label(areas?.eyebrow || "Where We Work")}
            <h2 className="text-[clamp(34px,3.8vw,50px)] font-bold tracking-[-0.02em]">{parts(areas?.title, areas?.highlight_text || "New Haven").before}<span className="text-[#bc9155]">{parts(areas?.title, areas?.highlight_text || "New Haven").accent}</span>{parts(areas?.title, areas?.highlight_text || "New Haven").after}</h2>
            {areas?.subtitle ? <p className="mx-auto mt-3 max-w-[760px] text-[15px] leading-[1.8] text-[#5c677d]">{areas.subtitle}</p> : null}
          </div>
          <div className="grid gap-8 lg:grid-cols-2">
            {(areas?.counties || []).map((county: any, index: number) => {
              const expanded = !!countyOpen[index];
              const towns = expanded ? [...(county.towns || []), ...(county.extra_towns || [])] : county.towns || [];
              const links = county.town_links || {};
              return (
                <article key={`${county.name || "county"}-${index}`} className="flex flex-col overflow-hidden rounded-[12px] bg-white shadow-[0_2px_12px_rgba(30,43,67,0.06),0_1px_3px_rgba(30,43,67,0.04)]">
                  <div className="relative h-[220px] overflow-hidden">
                    <img src={media(county.image, index === 0 ? "/images/areas/fairfield-county.jpg" : "/images/areas/new-haven-county.jpg")} alt={county.name || "BuiltWell CT service area"} className={cls("h-full w-full object-cover", index === 1 && "object-top")} />
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#1e2b4360] to-transparent" />
                  </div>
                  <div className="flex flex-1 flex-col p-7 pb-8">
                    <h3 className="text-[24px] font-bold">{county.name}</h3>
                    {county.phone ? <p className="mt-1 text-[15px] text-[#5c677d]">Call: <a href={`tel:${county.phone.replace(/\D/g, "")}`} className="font-semibold text-[#bc9155] hover:underline">{county.phone}</a></p> : null}
                    {county.description ? <p className="mt-4 border-b border-[#1e2b430f] pb-5 text-[14px] leading-[1.7] text-[#5c677d]">{county.description}</p> : null}
                    <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
                      {towns.map((town: string, townIndex: number) => (
                        <div key={`${county.name || "county"}-${town}-${townIndex}`}>
                          {linkNode(links[town] || county.url || "#", town, "block rounded-full bg-[#f5f1e9] px-3 py-2 text-center text-[11px] font-semibold text-[#1e2b43] transition-colors hover:bg-[#bc9155] hover:text-white")}
                        </div>
                      ))}
                    </div>
                    {county.extra_towns?.length ? <button type="button" onClick={() => setCountyOpen((current) => ({ ...current, [index]: !current[index] }))} className="mt-3 text-center text-[13px] font-semibold text-[#bc9155] transition-colors hover:text-[#a57d48]">{expanded ? "Show Fewer Towns -" : "See All Towns +"}</button> : null}
                    {county.url ? linkNode(county.url, <><span>{county.cta_label || `Learn more about ${county.name}`}</span><ArrowRight className="h-4 w-4" /></>, "mt-5 inline-flex items-center gap-2 text-[14px] font-semibold text-[#bc9155] transition-all hover:gap-3") : null}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <div className="relative overflow-hidden bg-[linear-gradient(135deg,#1a2438_0%,#1e2b43_50%,#151e30_100%)] px-5 py-12 md:px-10 md:py-14">
        <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-center">
          {(stripTrust?.items || []).map((item: any, index: number) => (
            <div key={`${item.label || "strip"}-${index}`} className="contents">
              {item.url ? linkNode(item.url, <div className="flex min-w-[180px] flex-1 flex-col items-center gap-3 px-8 py-5 text-center text-[13px] font-semibold tracking-[0.03em] text-white/90 transition-all hover:text-[#bc9155]"><span className="text-[#bc9155]">{trustIcon(item.icon)}</span><span>{[item.label, item.value].filter(Boolean).join(" ")}</span></div>, "flex flex-1 justify-center") : <div className="flex flex-1 justify-center"><div className="flex min-w-[180px] flex-1 flex-col items-center gap-3 px-8 py-5 text-center text-[13px] font-semibold tracking-[0.03em] text-white/90"><span className="text-[#bc9155]">{trustIcon(item.icon)}</span><span>{[item.label, item.value].filter(Boolean).join(" ")}</span></div></div>}
              {index < (stripTrust?.items || []).length - 1 ? <div className="hidden h-10 w-px bg-white/10 lg:block" /> : null}
            </div>
          ))}
        </div>
      </div>

      <section className="bg-[#f5f1e9] px-5 py-20 md:px-10" id="contact">
        <div className="mx-auto max-w-[1200px]">
          <div className="mb-8 text-center">
            {label(lead?.eyebrow || "Get In Touch")}
            <h2 className="text-[clamp(34px,3.8vw,48px)] font-bold tracking-[-0.02em]">{leadParts.before}{leadParts.accent ? <span className="text-[#bc9155]">{leadParts.accent}</span> : null}{leadParts.after}</h2>
            {lead?.subtitle ? <p className="mx-auto mt-3 max-w-[620px] text-[15px] leading-[1.8] text-[#5c677d]">{lead.subtitle}</p> : null}
          </div>
          <div className="grid gap-8 lg:grid-cols-[1fr_1.08fr]">
            <div className="grid gap-3">
              {(lead?.images || []).slice(0, 2).map((image: any, index: number) => <div key={`${image.alt || "lead"}-${index}`} className="overflow-hidden rounded-[10px] shadow-[0_16px_38px_rgba(30,43,67,0.1)]"><img src={media(image.image, index === 0 ? "/portfolio/builtwell-team-client-arrival-ct.jpeg" : "/portfolio/builtwell-contractor-sign-consultation-ct-01.jpg")} alt={image.alt || "BuiltWell CT consultation"} className="h-[270px] w-full object-cover" /></div>)}
            </div>
            <div className="rounded-[12px] border border-[#e4dac9] bg-white px-6 py-8 shadow-[0_20px_46px_rgba(30,43,67,0.1)] md:px-8">
              {submitted ? <div className="flex min-h-[420px] flex-col items-center justify-center text-center"><h3 className="text-[34px] font-bold">Thank You</h3><p className="mt-3 max-w-[420px] text-[15px] leading-7 text-[#5c677d]">We received your request and will get back to you within one business day.</p></div> : <form onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }} className="flex flex-col">
                <div className="grid gap-4 md:grid-cols-2">
                  {topFields.map((field: any) => <div key={field.name}><label className="mb-1.5 block text-[13px] font-semibold uppercase tracking-[0.04em] text-[#1e2b43]">{field.label}{field.required ? " *" : ""}</label><input type={field.type} required={field.required} value={formValues[field.name] || ""} placeholder={field.placeholder || ""} onChange={(event) => setFormValues((current) => ({ ...current, [field.name]: event.target.value }))} className="w-full rounded-[6px] border border-[#1e2b4326] px-3.5 py-3 text-[15px] text-[#1e2b43] outline-none transition-colors focus:border-[#bc9155]" /></div>)}
                </div>
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  {servicesField ? <div className="md:col-span-2 lg:col-span-1"><label className="mb-1.5 block text-[13px] font-semibold uppercase tracking-[0.04em] text-[#1e2b43]">{servicesField.label}{servicesField.required ? " *" : ""}</label><div className="relative"><button type="button" onClick={() => setServiceOpen((current) => !current)} className="flex w-full items-center justify-between rounded-[4px] border border-[#1e2b4326] px-3.5 py-3 text-left text-[15px] text-[#1e2b43]"><span className={cls("truncate", pickedServices.length ? "font-medium text-[#1e2b43]" : "text-[#5c677d]")}>{pickedServices.length ? pickedServices.join(", ") : "Select services"}</span><ChevronDown className={cls("h-4 w-4 transition-transform", serviceOpen && "rotate-180")} /></button><div className={cls("absolute left-0 right-0 top-[calc(100%+4px)] z-20 max-h-60 overflow-y-auto rounded-[6px] border border-[#1e2b4326] bg-white py-1 shadow-[0_8px_24px_rgba(0,0,0,0.12)]", serviceOpen ? "block" : "hidden")}>{opts(servicesField.options).map((option) => <label key={option.value} className="flex cursor-pointer items-center gap-2.5 px-3.5 py-2 text-[14px] text-[#1e2b43] transition-colors hover:bg-[#bc91550f]"><input type="checkbox" checked={pickedServices.includes(option.value)} onChange={() => setPickedServices((current) => current.includes(option.value) ? current.filter((value) => value !== option.value) : [...current, option.value])} className="h-[18px] w-[18px] rounded-[3px] accent-[#bc9155]" />{option.label}</label>)}</div></div></div> : null}
                  {timeField ? <div><label className="mb-1.5 block text-[13px] font-semibold uppercase tracking-[0.04em] text-[#1e2b43]">{timeField.label}{timeField.required ? " *" : ""}</label><select required={timeField.required} value={formValues[timeField.name] || ""} onChange={(event) => setFormValues((current) => ({ ...current, [timeField.name]: event.target.value }))} className="w-full rounded-[6px] border border-[#1e2b4326] bg-white px-3.5 py-3 text-[15px] text-[#1e2b43] outline-none transition-colors focus:border-[#bc9155]"><option value="">Select a time</option>{opts(timeField.options).map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select></div> : null}
                  {contactField ? <fieldset className="md:col-span-2"><legend className="mb-1.5 block text-[13px] font-semibold uppercase tracking-[0.04em] text-[#1e2b43]">{contactField.label}{contactField.required ? " *" : ""}</legend><div className="flex flex-wrap gap-2.5 md:flex-nowrap">{opts(contactField.options).map((option) => { const checked = (formValues[contactField.name] || "call") === option.value; return <label key={option.value} className={cls("flex flex-1 cursor-pointer items-center justify-center rounded-[6px] border-2 px-4 py-3 text-[13px] font-medium transition-colors", checked ? "border-[#bc9155] bg-[#bc91550f] text-[#bc9155]" : "border-[#1e2b431f] bg-white text-[#1e2b43]")}><input type="radio" name={contactField.name} checked={checked} onChange={() => setFormValues((current) => ({ ...current, [contactField.name]: option.value }))} className="hidden" /><span>{option.label}</span></label>; })}</div></fieldset> : null}
                </div>
                {messageField ? <div className="mt-4"><label className="mb-1.5 block text-[13px] font-semibold uppercase tracking-[0.04em] text-[#1e2b43]">{messageField.label}</label><textarea rows={6} value={formValues[messageField.name] || ""} placeholder={messageField.placeholder || ""} onChange={(event) => setFormValues((current) => ({ ...current, [messageField.name]: event.target.value }))} className="min-h-[180px] w-full rounded-[6px] border border-[#1e2b4326] px-3.5 py-3 text-[15px] leading-[1.6] text-[#1e2b43] outline-none transition-colors focus:border-[#bc9155]" /></div> : null}
                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <div><label className="flex min-h-[52px] cursor-pointer items-center justify-center gap-2 rounded-[8px] border border-[#1e2b4326] px-5 py-3 text-[15px] font-semibold text-[#1e2b43] transition-colors hover:border-[#bc9155]" htmlFor={`${page.slug}-lead-files`}><Upload className="h-4 w-4" />Upload Photos</label><input id={`${page.slug}-lead-files`} type="file" multiple accept="image/jpeg,image/png,image/heic,.heic" className="hidden" onChange={(event) => setFileNames(Array.from(event.target.files || []).map((file) => file.name))} />{fileNames.length ? <p className="mt-2 text-[12px] text-[#5c677d]">{fileNames.join(", ")}</p> : null}</div>
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
            {label(related?.eyebrow || "Our Services")}
            <h2 className="text-[clamp(34px,3.8vw,48px)] font-bold tracking-[-0.02em]">{related?.title || "You May Also Need"}</h2>
          </div>
          <div className="grid gap-7 lg:grid-cols-3">
            {(related?.items || []).map((item: any, index: number) => (
              <article key={`${item.title || "related"}-${index}`} className="overflow-hidden rounded-[12px] border border-[#e5dac8] bg-white shadow-[0_14px_32px_rgba(30,43,67,0.06)]">
                <div className="h-[220px] overflow-hidden"><img src={media(item.image, "/services/kitchen-remodeling-ct.jpg")} alt={item.title} className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" /></div>
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

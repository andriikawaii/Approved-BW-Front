"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, CalendarDays, Check, ChevronDown, Shield, Star, Upload } from "lucide-react";
import type { CMSPage } from "@/types/cms";

export const cls = (...values: Array<string | false | null | undefined>) => values.filter(Boolean).join(" ");
export const section = <T,>(page: CMSPage, type: string) => page.sections.find((entry) => entry.is_active && entry.type === type)?.data as T | undefined;
export const sections = <T,>(page: CMSPage, type: string) => page.sections.filter((entry) => entry.is_active && entry.type === type).map((entry) => entry.data as T);
export const opts = (value?: Array<string | { label: string; value: string }> | null) => (value || []).map((item) => typeof item === "string" ? { label: item, value: item } : item);

export function media(value?: string | null, fallback = "") {
  if (!value) return fallback;
  try {
    return value.startsWith("http") ? new URL(value).pathname : value;
  } catch {
    return value;
  }
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
  const [countyOpen, setCountyOpen] = useState<Record<number, boolean>>({});
  const titleParts = parts(data?.title, data?.highlight_text);
  return (
    <section className="bg-white px-5 py-20 md:px-10">
      <div className="mx-auto max-w-[1240px]">
        <div className="mb-12 text-center">
          {label(data?.eyebrow || "Where We Work")}
          <h2 className="text-[clamp(34px,3.8vw,50px)] font-bold tracking-[-0.02em]">{titleParts.before}{titleParts.accent ? <span className="text-[#bc9155]">{titleParts.accent}</span> : null}{titleParts.after}</h2>
          {data?.subtitle ? <p className="mx-auto mt-3 max-w-[760px] text-[15px] leading-[1.8] text-[#5c677d]">{data.subtitle}</p> : null}
        </div>
        <div className="grid gap-8 lg:grid-cols-2">
          {(data?.counties || []).map((county: any, index: number) => {
            const expanded = !!countyOpen[index];
            const towns = expanded ? [...(county.towns || []), ...(county.extra_towns || [])] : county.towns || [];
            const links = county.town_links || {};
            return (
              <article key={`${county.name || "county"}-${index}`} className="flex flex-col overflow-hidden rounded-[12px] bg-white shadow-[0_2px_12px_rgba(30,43,67,0.06),0_1px_3px_rgba(30,43,67,0.04)]">
                <div className="relative h-[220px] overflow-hidden"><img src={media(county.image, index === 0 ? "/images/areas/fairfield-county.jpg" : "/images/areas/new-haven-county.jpg")} alt={county.name || "BuiltWell CT service area"} className="h-full w-full object-cover" /></div>
                <div className="flex flex-1 flex-col p-7 pb-8">
                  <h3 className="text-[24px] font-bold">{county.name}</h3>
                  {county.phone ? <p className="mt-1 text-[15px] text-[#5c677d]">Call: <a href={`tel:${county.phone.replace(/\D/g, "")}`} className="font-semibold text-[#bc9155] hover:underline">{county.phone}</a></p> : null}
                  {county.description ? <p className="mt-4 border-b border-[#1e2b430f] pb-5 text-[14px] leading-[1.7] text-[#5c677d]">{county.description}</p> : null}
                  <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {towns.map((town: string, townIndex: number) => <div key={`${county.name || "county"}-${town}-${townIndex}`}>{linkNode(links[town] || county.url || "#", town, "block rounded-full bg-[#f5f1e9] px-3 py-2 text-center text-[11px] font-semibold text-[#1e2b43] transition-colors hover:bg-[#bc9155] hover:text-white")}</div>)}
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
  );
}

export function FinancingStrip({ data }: { data: any }) {
  if (!data) return null;
  return <div className="border-t border-[#1e2b4314] bg-white px-5 py-12 md:px-10 md:py-14"><div className="mx-auto flex max-w-[1200px] flex-col items-center gap-6 text-center md:flex-row md:justify-between md:text-left"><div className="flex flex-col items-center gap-4 md:flex-row"><div className="text-[24px] font-bold tracking-[-0.02em]"><span className="text-[#6bbf4e]">Green</span><span className="text-[#1e2b43]">Sky</span></div><p className="max-w-[760px] text-[16px] leading-[1.6] text-[#5c677d]"><strong className="text-[#1e2b43]">{data.title}.</strong> {data.content}</p></div>{data.cta?.url ? linkNode(data.cta.url, <><span>{data.cta.label || "Check Financing Options"}</span><ArrowRight className="h-4 w-4" /></>, "inline-flex min-h-[52px] min-w-[280px] items-center justify-center gap-2 rounded-[8px] bg-[#bc9155] px-8 py-3 text-[15px] font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-[#a57d48]") : null}</div></div>;
}

export function LeadFormSection({ page, data, accent }: { page: CMSPage; data: any; accent?: string }) {
  const [pickedServices, setPickedServices] = useState<string[]>([]);
  const [serviceOpen, setServiceOpen] = useState(false);
  const [fileNames, setFileNames] = useState<string[]>([]);
  const [formValues, setFormValues] = useState<Record<string, string>>({ contact_method: "call" });
  const [submitted, setSubmitted] = useState(false);
  const titleParts = parts(data?.title, accent || data?.title_highlight || "Project");
  const fields = data?.fields || [];
  const topFields = fields.filter((field: any) => !["checkbox_group", "radio_group", "textarea", "file"].includes(field.type));
  const servicesField = fields.find((field: any) => field.type === "checkbox_group");
  const timeField = fields.find((field: any) => field.name === "best_time" || field.type === "select");
  const contactField = fields.find((field: any) => field.type === "radio_group");
  const messageField = fields.find((field: any) => field.type === "textarea");
  return (
    <section className="bg-[#f5f1e9] px-5 py-20 md:px-10" id="contact">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-8 text-center">
          {label(data?.eyebrow || "Get In Touch")}
          <h2 className="text-[clamp(34px,3.8vw,48px)] font-bold tracking-[-0.02em]">{titleParts.before}{titleParts.accent ? <span className="text-[#bc9155]">{titleParts.accent}</span> : null}{titleParts.after}</h2>
          {data?.subtitle ? <p className="mx-auto mt-3 max-w-[620px] text-[15px] leading-[1.8] text-[#5c677d]">{data.subtitle}</p> : null}
        </div>
        <div className="grid gap-8 lg:grid-cols-[1fr_1.08fr]">
          <div className="grid gap-3">{(data?.images || []).slice(0, 2).map((image: any, index: number) => <div key={`${image.alt || "lead"}-${index}`} className="overflow-hidden rounded-[10px] shadow-[0_16px_38px_rgba(30,43,67,0.1)]"><img src={media(image.image, index === 0 ? "/portfolio/builtwell-team-client-arrival-ct.jpeg" : "/portfolio/builtwell-contractor-sign-consultation-ct-01.jpg")} alt={image.alt || "BuiltWell CT consultation"} className="h-[270px] w-full object-cover" /></div>)}</div>
          <div className="rounded-[12px] border border-[#e4dac9] bg-white px-6 py-8 shadow-[0_20px_46px_rgba(30,43,67,0.1)] md:px-8">
            {submitted ? <div className="flex min-h-[420px] flex-col items-center justify-center text-center"><h3 className="text-[34px] font-bold">Thank You</h3><p className="mt-3 max-w-[420px] text-[15px] leading-7 text-[#5c677d]">We received your request and will get back to you within one business day.</p></div> : <form onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }} className="flex flex-col">
              <div className="grid gap-4 md:grid-cols-2">{topFields.map((field: any) => <div key={field.name}><label className="mb-1.5 block text-[13px] font-semibold uppercase tracking-[0.04em] text-[#1e2b43]">{field.label}{field.required ? " *" : ""}</label><input type={field.type} required={field.required} value={formValues[field.name] || ""} placeholder={field.placeholder || ""} onChange={(event) => setFormValues((current) => ({ ...current, [field.name]: event.target.value }))} className="w-full rounded-[6px] border border-[#1e2b4326] px-3.5 py-3 text-[15px] text-[#1e2b43] outline-none transition-colors focus:border-[#bc9155]" /></div>)}</div>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                {servicesField ? <div className="md:col-span-2 lg:col-span-1"><label className="mb-1.5 block text-[13px] font-semibold uppercase tracking-[0.04em] text-[#1e2b43]">{servicesField.label}{servicesField.required ? " *" : ""}</label><div className="relative"><button type="button" onClick={() => setServiceOpen((current) => !current)} className="flex w-full items-center justify-between rounded-[4px] border border-[#1e2b4326] px-3.5 py-3 text-left text-[15px] text-[#1e2b43]"><span className={cls("truncate", pickedServices.length ? "font-medium text-[#1e2b43]" : "text-[#5c677d]")}>{pickedServices.length ? pickedServices.join(", ") : "Select services"}</span><ChevronDown className={cls("h-4 w-4 transition-transform", serviceOpen && "rotate-180")} /></button><div className={cls("absolute left-0 right-0 top-[calc(100%+4px)] z-20 max-h-60 overflow-y-auto rounded-[6px] border border-[#1e2b4326] bg-white py-1 shadow-[0_8px_24px_rgba(0,0,0,0.12)]", serviceOpen ? "block" : "hidden")}>{opts(servicesField.options).map((option) => <label key={option.value} className="flex cursor-pointer items-center gap-2.5 px-3.5 py-2 text-[14px] text-[#1e2b43] transition-colors hover:bg-[#bc91550f]"><input type="checkbox" checked={pickedServices.includes(option.value)} onChange={() => setPickedServices((current) => current.includes(option.value) ? current.filter((value) => value !== option.value) : [...current, option.value])} className="h-[18px] w-[18px] rounded-[3px] accent-[#bc9155]" />{option.label}</label>)}</div></div></div> : null}
                {timeField ? <div><label className="mb-1.5 block text-[13px] font-semibold uppercase tracking-[0.04em] text-[#1e2b43]">{timeField.label}{timeField.required ? " *" : ""}</label><select required={timeField.required} value={formValues[timeField.name] || ""} onChange={(event) => setFormValues((current) => ({ ...current, [timeField.name]: event.target.value }))} className="w-full rounded-[6px] border border-[#1e2b4326] bg-white px-3.5 py-3 text-[15px] text-[#1e2b43] outline-none transition-colors focus:border-[#bc9155]"><option value="">Select a time</option>{opts(timeField.options).map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select></div> : null}
                {contactField ? <fieldset className="md:col-span-2"><legend className="mb-1.5 block text-[13px] font-semibold uppercase tracking-[0.04em] text-[#1e2b43]">{contactField.label}{contactField.required ? " *" : ""}</legend><div className="flex flex-wrap gap-2.5 md:flex-nowrap">{opts(contactField.options).map((option) => { const checked = (formValues[contactField.name] || "call") === option.value; return <label key={option.value} className={cls("flex flex-1 cursor-pointer items-center justify-center rounded-[6px] border-2 px-4 py-3 text-[13px] font-medium transition-colors", checked ? "border-[#bc9155] bg-[#bc91550f] text-[#bc9155]" : "border-[#1e2b431f] bg-white text-[#1e2b43]")}><input type="radio" name={contactField.name} checked={checked} onChange={() => setFormValues((current) => ({ ...current, [contactField.name]: option.value }))} className="hidden" /><span>{option.label}</span></label>; })}</div></fieldset> : null}
              </div>
              {messageField ? <div className="mt-4"><label className="mb-1.5 block text-[13px] font-semibold uppercase tracking-[0.04em] text-[#1e2b43]">{messageField.label}</label><textarea rows={6} value={formValues[messageField.name] || ""} placeholder={messageField.placeholder || ""} onChange={(event) => setFormValues((current) => ({ ...current, [messageField.name]: event.target.value }))} className="min-h-[180px] w-full rounded-[6px] border border-[#1e2b4326] px-3.5 py-3 text-[15px] leading-[1.6] text-[#1e2b43] outline-none transition-colors focus:border-[#bc9155]" /></div> : null}
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <div><label className="flex min-h-[52px] cursor-pointer items-center justify-center gap-2 rounded-[8px] border border-[#1e2b4326] px-5 py-3 text-[15px] font-semibold text-[#1e2b43] transition-colors hover:border-[#bc9155]" htmlFor={`${page.slug}-lead-files`}><Upload className="h-4 w-4" />Upload Photos</label><input id={`${page.slug}-lead-files`} type="file" multiple accept="image/jpeg,image/png,image/heic,.heic" className="hidden" onChange={(event) => setFileNames(Array.from(event.target.files || []).map((file) => file.name))} />{fileNames.length ? <p className="mt-2 text-[12px] text-[#5c677d]">{fileNames.join(", ")}</p> : null}</div>
                <button type="submit" className="min-h-[52px] rounded-[8px] bg-[#bc9155] px-5 py-3 text-[15px] font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-[#a57d48]">{data?.submit_label || "Send Request"}</button>
              </div>
              <p className="mt-4 text-center text-[13px] italic text-[#5c677d]">{data?.consent_text}</p>
            </form>}
          </div>
        </div>
      </div>
    </section>
  );
}

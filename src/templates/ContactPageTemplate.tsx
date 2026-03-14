"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, CalendarDays, Check, ChevronDown, FileText, Home, Monitor, Shield, ShieldCheck, Star, Upload } from "lucide-react";
import type { CMSPage } from "@/types/cms";

type RichTextData = {
  eyebrow?: string | null;
  title?: string | null;
  content?: string | null;
  body?: string | null;
  style_variant?: string | null;
  cta?: { label?: string; url?: string } | null;
};

const FALLBACK_MEDIA: Record<string, string> = {
  "/hero/builtwell-team-van-consultation-hero-ct.jpg": "/portfolio/builtwell-team-client-arrival-ct.jpeg",
  "/team/builtwell-owner-handshake-client-ct-02.jpg": "/portfolio/builtwell-contractor-sign-consultation-ct-01.jpg",
};

const cls = (...values: Array<string | false | null | undefined>) => values.filter(Boolean).join(" ");
const section = <T,>(page: CMSPage, type: string) => page.sections.find((entry) => entry.is_active && entry.type === type)?.data as T | undefined;
const sections = <T,>(page: CMSPage, type: string) => page.sections.filter((entry) => entry.is_active && entry.type === type).map((entry) => entry.data as T);
const media = (value?: string | null, fallback = "") => FALLBACK_MEDIA[value || ""] || value || fallback;
const opts = (value?: Array<string | { label: string; value: string }> | null) => (value || []).map((item) => typeof item === "string" ? { label: item, value: item } : item);

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
  return /^https?:\/\//i.test(href) ? (
    <a href={href} className={className} target="_blank" rel="noreferrer">{children}</a>
  ) : (
    <Link href={href} className={className}>{children}</Link>
  );
}

export function ContactPageTemplate({ page }: { page: CMSPage }) {
  const hero = section<any>(page, "hero") || section<any>(page, "page_hero");
  const lead = section<any>(page, "lead_form");
  const areas = section<any>(page, "areas_served");
  const trust = section<any>(page, "trust_bar");
  const rich = sections<RichTextData>(page, "rich_text");
  const grids = sections<any>(page, "feature_grid");
  const consultIntro = rich.find((item) => item.style_variant !== "financing_strip");
  const expectIntro = rich.filter((item) => item.style_variant !== "financing_strip")[1];
  const financing = rich.find((item) => item.style_variant === "financing_strip");
  const consultCards = grids[0]?.items || [];
  const expectCards = grids[1]?.items || [];
  const [countyOpen, setCountyOpen] = useState<Record<number, boolean>>({});
  const [serviceOpen, setServiceOpen] = useState(false);
  const [pickedServices, setPickedServices] = useState<string[]>([]);
  const [formValues, setFormValues] = useState<Record<string, string>>({ contact_method: "call" });
  const [fileNames, setFileNames] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [scheduleType, setScheduleType] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string>("");

  const heroParts = parts(hero?.headline || hero?.title, "BuiltWell CT");
  const leadParts = parts(lead?.title, lead?.title_highlight || "Project");
  const areaParts = parts(areas?.title, areas?.highlight_text || "New Haven");
  const consultParts = parts(consultIntro?.title, "Consultation");
  const expectParts = parts(expectIntro?.title, "Expect");

  const fields = lead?.fields || [];
  const topFields = fields.filter((field: any) => !["checkbox_group", "radio_group", "textarea", "file"].includes(field.type));
  const servicesField = fields.find((field: any) => field.type === "checkbox_group");
  const timeField = fields.find((field: any) => field.name === "best_time" || field.type === "select");
  const contactField = fields.find((field: any) => field.type === "radio_group");
  const messageField = fields.find((field: any) => field.type === "textarea");

  return (
    <div className="bg-[#f5f1e9] text-[#1e2b43]">
      <section className="relative isolate flex min-h-[48vh] items-stretch overflow-hidden bg-[#151e30] px-5 pb-12 pt-[72px] text-white md:px-10">
        <div className="absolute inset-0 bg-cover bg-center opacity-70" style={{ backgroundImage: `url(${media(hero?.background_image, "/images/hero/hero-carousel-2.jpg")})` }} />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_97%_97%,rgba(21,30,48,1)_0%,rgba(21,30,48,0.9)_8%,transparent_30%),radial-gradient(ellipse_at_3%_97%,rgba(21,30,48,0.9)_0%,transparent_25%),linear-gradient(180deg,rgba(21,30,48,0.35)_0%,rgba(21,30,48,0.2)_30%,rgba(21,30,48,0.45)_65%,rgba(21,30,48,0.92)_100%)]" />
        <div className="relative z-10 mx-auto flex w-full max-w-[1240px] flex-col items-center justify-center text-center">
          <ol className="mb-5 flex list-none items-center text-[13px] font-medium text-white/90">
            <li className="flex items-center">{linkNode("/", "Home", "transition-colors hover:text-[#bc9155]")}</li>
            <li className="flex items-center before:px-2.5 before:text-[#bc9155] before:content-['›']"><span className="font-semibold text-white">Contact</span></li>
          </ol>
          <h1 className="max-w-[980px] text-[clamp(40px,4.5vw,56px)] font-bold leading-[1.08] tracking-[-0.02em] text-white">
            {heroParts.before}{heroParts.accent ? <span className="text-[#bc9155]">{heroParts.accent}</span> : null}{heroParts.after}
          </h1>
          {hero?.subheadline || hero?.subtitle ? <p className="mt-3 max-w-[640px] text-[17px] leading-[1.65] text-white/85">{hero?.subheadline || hero?.subtitle}</p> : null}
        </div>
      </section>

      <section className="bg-[#f5f1e9] px-5 py-16 md:px-10 md:py-20" id="contact">
        <div className="mx-auto max-w-[1200px]">
          <div className="mb-8 text-center">
            {label(lead?.eyebrow || "Get In Touch")}
            <h2 className="text-[clamp(30px,3vw,42px)] font-bold tracking-[-0.02em]">{leadParts.before}{leadParts.accent ? <span className="text-[#bc9155]">{leadParts.accent}</span> : null}{leadParts.after}</h2>
            {lead?.subtitle ? <p className="mx-auto mt-2 max-w-[600px] text-[16px] leading-[1.7] text-[#5c677d]">{lead.subtitle}</p> : null}
          </div>
          <div className="grid gap-8 lg:grid-cols-[1fr_1.15fr]">
            <div className="flex flex-col gap-3">
              {(lead?.images || []).slice(0, 2).map((image: any, index: number) => <div key={`${image.alt || "lead"}-${index}`} className="relative min-h-[260px] overflow-hidden rounded-[8px]"><img src={media(image.image, index === 0 ? "/portfolio/builtwell-team-client-arrival-ct.jpeg" : "/portfolio/builtwell-contractor-sign-consultation-ct-01.jpg")} alt={image.alt || "BuiltWell CT consultation"} className="h-full w-full object-cover" /><div className="pointer-events-none absolute bottom-0 right-0 h-[60px] w-[60px] rounded-br-[8px] bg-[linear-gradient(135deg,transparent_30%,rgba(30,43,67,0.5)_100%)]" /></div>)}
            </div>
            <div className="flex flex-col rounded-[10px] border border-[#1e2b4314] bg-white px-6 py-8 shadow-[0_16px_48px_rgba(30,43,67,0.1),0_4px_12px_rgba(30,43,67,0.04)] md:px-9">
              {submitted ? <div className="flex min-h-[420px] flex-col items-center justify-center text-center"><h3 className="text-[34px] font-bold">Thank You</h3><p className="mt-3 max-w-[420px] text-[15px] leading-7 text-[#5c677d]">We received your request and will get back to you within one business day.</p></div> : <form onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }} className="flex flex-1 flex-col">
                <div className="grid gap-4 md:grid-cols-2">
                  {topFields.map((field: any) => <div key={field.name}><label className="mb-1.5 block text-[13px] font-semibold uppercase tracking-[0.04em] text-[#1e2b43]">{field.label}{field.required ? " *" : ""}</label><input type={field.type} required={field.required} value={formValues[field.name] || ""} placeholder={field.placeholder || ""} onChange={(event) => setFormValues((current) => ({ ...current, [field.name]: event.target.value }))} className="w-full rounded-[6px] border border-[#1e2b4326] px-3.5 py-3 text-[15px] text-[#1e2b43] outline-none transition-colors focus:border-[#bc9155]" /></div>)}
                </div>
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  {servicesField ? <div className="md:col-span-2 lg:col-span-1"><label className="mb-1.5 block text-[13px] font-semibold uppercase tracking-[0.04em] text-[#1e2b43]">{servicesField.label}{servicesField.required ? " *" : ""}</label><div className="relative"><button type="button" onClick={() => setServiceOpen((current) => !current)} className="flex w-full items-center justify-between rounded-[4px] border border-[#1e2b4326] px-3.5 py-3 text-left text-[15px] text-[#1e2b43]"><span className={cls("truncate", pickedServices.length ? "font-medium text-[#1e2b43]" : "text-[#5c677d]")}>{pickedServices.length ? pickedServices.join(", ") : "Select services"}</span><ChevronDown className={cls("h-4 w-4 transition-transform", serviceOpen && "rotate-180")} /></button><div className={cls("absolute left-0 right-0 top-[calc(100%+4px)] z-20 max-h-60 overflow-y-auto rounded-[6px] border border-[#1e2b4326] bg-white py-1 shadow-[0_8px_24px_rgba(0,0,0,0.12)]", serviceOpen ? "block" : "hidden")}>{opts(servicesField.options).map((option) => <label key={option.value} className="flex cursor-pointer items-center gap-2.5 px-3.5 py-2 text-[14px] text-[#1e2b43] transition-colors hover:bg-[#bc91550f]"><input type="checkbox" checked={pickedServices.includes(option.value)} onChange={() => setPickedServices((current) => current.includes(option.value) ? current.filter((value) => value !== option.value) : [...current, option.value])} className="h-[18px] w-[18px] rounded-[3px] accent-[#bc9155]" />{option.label}</label>)}</div></div></div> : null}
                  {timeField ? <div><label className="mb-1.5 block text-[13px] font-semibold uppercase tracking-[0.04em] text-[#1e2b43]">{timeField.label}{timeField.required ? " *" : ""}</label><select required={timeField.required} value={formValues[timeField.name] || ""} onChange={(event) => setFormValues((current) => ({ ...current, [timeField.name]: event.target.value }))} className="w-full rounded-[6px] border border-[#1e2b4326] bg-white px-3.5 py-3 text-[15px] text-[#1e2b43] outline-none transition-colors focus:border-[#bc9155]"><option value="">Select a time</option>{opts(timeField.options).map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select></div> : null}
                  {contactField ? <fieldset className="md:col-span-2"><legend className="mb-1.5 block text-[13px] font-semibold uppercase tracking-[0.04em] text-[#1e2b43]">{contactField.label}{contactField.required ? " *" : ""}</legend><div className="flex flex-wrap gap-2.5 md:flex-nowrap">{opts(contactField.options).map((option) => { const checked = (formValues[contactField.name] || "call") === option.value; return <label key={option.value} className={cls("flex flex-1 cursor-pointer items-center justify-center rounded-[6px] border-2 px-4 py-3 text-[13px] font-medium transition-colors", checked ? "border-[#bc9155] bg-[#bc91550f] text-[#bc9155]" : "border-[#1e2b431f] bg-white text-[#1e2b43]")}><input type="radio" name={contactField.name} checked={checked} onChange={() => setFormValues((current) => ({ ...current, [contactField.name]: option.value }))} className="hidden" /><span>{option.label}</span></label>; })}</div></fieldset> : null}
                </div>
                {messageField ? <div className="mt-4"><label className="mb-1.5 block text-[13px] font-semibold uppercase tracking-[0.04em] text-[#1e2b43]">{messageField.label}</label><textarea rows={7} value={formValues[messageField.name] || ""} placeholder={messageField.placeholder || ""} onChange={(event) => setFormValues((current) => ({ ...current, [messageField.name]: event.target.value }))} className="min-h-[240px] w-full rounded-[6px] border border-[#1e2b4326] px-3.5 py-3 text-[15px] leading-[1.6] text-[#1e2b43] outline-none transition-colors focus:border-[#bc9155]" /></div> : null}
                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <div><label className="flex min-h-[52px] cursor-pointer items-center justify-center gap-2 rounded-[8px] border border-[#1e2b4326] px-5 py-3 text-[15px] font-semibold text-[#1e2b43] transition-colors hover:border-[#bc9155]" htmlFor="contact-lead-files"><Upload className="h-4 w-4" />Upload Photos</label><input id="contact-lead-files" type="file" multiple accept="image/jpeg,image/png,image/heic,.heic" className="hidden" onChange={(event) => setFileNames(Array.from(event.target.files || []).map((file) => file.name))} />{fileNames.length ? <p className="mt-2 text-[12px] text-[#5c677d]">{fileNames.join(", ")}</p> : null}</div>
                  <button type="submit" className="min-h-[52px] rounded-[8px] bg-[#bc9155] px-5 py-3 text-[15px] font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-[#a57d48] hover:shadow-[0_4px_12px_rgba(188,145,85,0.3)]">{lead?.submit_label || "Send Request"}</button>
                </div>
                <p className="mt-4 text-center text-[13px] italic text-[#5c677d]">{lead?.consent_text || "We respond within 24 hours. No spam, no obligation."}</p>
              </form>}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-16 md:px-10 md:py-24">
        <div className="mx-auto max-w-[1240px]">
          <div className="mb-12 text-center">
            {label(areas?.eyebrow || "Where We Work")}
            <h2 className="text-[clamp(30px,3vw,42px)] font-bold tracking-[-0.02em]">{areaParts.before}{areaParts.accent ? <span className="text-[#bc9155]">{areaParts.accent}</span> : null}{areaParts.after}</h2>
          </div>
          <div className="grid gap-8 lg:grid-cols-2">
            {(areas?.counties || []).map((county: any, index: number) => {
              const expanded = !!countyOpen[index];
              const links = county.town_links || {};
              const towns = expanded ? [...(county.towns || []), ...(county.extra_towns || [])] : county.towns || [];

              return (
                <article key={`${county.name || "county"}-${index}`} className="flex flex-col overflow-hidden rounded-[12px] bg-white shadow-[0_2px_12px_rgba(30,43,67,0.06),0_1px_3px_rgba(30,43,67,0.04)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_16px_40px_rgba(30,43,67,0.1),0_32px_64px_rgba(30,43,67,0.08)]">
                  <div className="relative h-[220px] overflow-hidden">
                    <img src={media(county.image, index === 0 ? "/images/areas/fairfield-county.jpg" : "/images/areas/new-haven-county.jpg")} alt={county.name || "BuiltWell CT service area"} className={cls("h-full w-full object-cover", index === 1 && "object-top")} />
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#1e2b4360] to-transparent" />
                  </div>
                  <div className="flex flex-1 flex-col p-7 pb-8">
                    <h3 className="text-[24px] font-bold">{county.name}</h3>
                    {county.phone ? <p className="mt-1 text-[15px] text-[#5c677d]">Call: <a href={`tel:${county.phone.replace(/\D/g, "")}`} className="font-semibold text-[#bc9155] hover:underline">{county.phone}</a></p> : null}
                    {county.description ? <p className="mt-4 border-b border-[#1e2b430f] pb-5 text-[14px] leading-[1.7] text-[#5c677d]">{county.description}</p> : null}
                    <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
                      {towns.map((town: string) => <span key={`${county.name || "county"}-${town}`} className="contents">{linkNode(Array.isArray(links) ? (links.find((entry: any) => entry?.name === town)?.url || county.url || "#") : (links[town] || county.url || "#"), town, "rounded-full bg-[#f5f1e9] px-3 py-2 text-center text-[11px] font-semibold text-[#1e2b43] transition-colors hover:bg-[#bc9155] hover:text-white")}</span>)}
                    </div>
                    {county.extra_towns?.length ? <button type="button" onClick={() => setCountyOpen((current) => ({ ...current, [index]: !current[index] }))} className="mt-3 text-center text-[13px] font-semibold text-[#bc9155] transition-colors hover:text-[#a57d48]">{expanded ? "Show Fewer Towns -" : "See All Towns +"}</button> : null}
                    {county.url ? linkNode(county.url, <><span>{county.cta_label || `Learn more about ${county.name}`}</span><ArrowRight className="h-4 w-4" /></>, "mt-5 inline-flex items-center gap-2 text-[14px] font-semibold text-[#bc9155] transition-all hover:gap-3") : null}
                  </div>
                </article>
              );
            })}
          </div>
          <p className="mt-8 text-center text-[14px] text-[#5c677d]">Not sure if we cover your area? {linkNode("/contact/", "Contact our Connecticut remodeling team", "font-semibold text-[#bc9155] transition-colors hover:text-[#a57d48]")} and we&apos;ll let you know.</p>
        </div>
      </section>

      <div className="relative overflow-hidden bg-[linear-gradient(135deg,#1a2438_0%,#1e2b43_50%,#151e30_100%)] px-5 py-12 md:px-10 md:py-14">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgba(188,145,85,0.05)_0%,transparent_70%)]" />
        <div className="relative z-10 mx-auto flex max-w-[1200px] flex-wrap items-center justify-center">
          {(trust?.items || []).map((item: any, index: number) => (
            <div key={`${item.label || "trust"}-${index}`} className="contents">
              {item.url ? linkNode(item.url, <div className="flex min-w-[180px] flex-1 flex-col items-center gap-3 px-8 py-5 text-center text-[13px] font-semibold tracking-[0.03em] text-white/90 transition-all hover:-translate-y-0.5 hover:text-[#bc9155]"><span className="text-[#bc9155]">{item.icon === "calendar" ? <CalendarDays className="h-5 w-5" /> : item.icon === "shield" ? <Shield className="h-5 w-5" /> : item.icon === "check" ? <Check className="h-5 w-5" /> : <Star className="h-5 w-5 fill-current" />}</span><span>{[item.label, item.value].filter(Boolean).join(" ")}</span></div>, "flex flex-1 justify-center") : <div className="flex flex-1 justify-center"><div className="flex min-w-[180px] flex-1 flex-col items-center gap-3 px-8 py-5 text-center text-[13px] font-semibold tracking-[0.03em] text-white/90"><span className="text-[#bc9155]">{item.icon === "calendar" ? <CalendarDays className="h-5 w-5" /> : item.icon === "shield" ? <Shield className="h-5 w-5" /> : item.icon === "check" ? <Check className="h-5 w-5" /> : <Star className="h-5 w-5 fill-current" />}</span><span>{[item.label, item.value].filter(Boolean).join(" ")}</span></div></div>}
              {index < (trust?.items || []).length - 1 ? <div className="hidden h-10 w-px bg-white/10 lg:block" /> : null}
            </div>
          ))}
        </div>
      </div>

      <section className="bg-[#f5f1e9] px-5 py-16 md:px-10 md:py-24">
        <div className="mx-auto max-w-[1240px]">
          <div className="mb-10 text-center">
            {label(consultIntro?.eyebrow || "Get Started")}
            <h2 className="text-[clamp(30px,3vw,42px)] font-bold tracking-[-0.02em]">{consultParts.before}{consultParts.accent ? <span className="text-[#bc9155]">{consultParts.accent}</span> : null}{consultParts.after}</h2>
            {consultIntro?.content || consultIntro?.body ? <p className="mx-auto mt-3 max-w-[780px] text-[15px] leading-[1.8] text-[#5c677d]">{consultIntro?.content || consultIntro?.body}</p> : null}
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {consultCards.map((item: any, index: number) => <article key={`${item.title || "consult"}-${index}`} className="rounded-[12px] bg-white p-8 text-center shadow-[0_12px_30px_rgba(30,43,67,0.08)]"><div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#bc915514] text-[#bc9155]">{index === 0 ? <Home className="h-7 w-7" /> : <Monitor className="h-7 w-7" />}</div><h3 className="text-[26px] font-bold">{item.title}</h3><p className="mt-4 text-[15px] leading-[1.8] text-[#5c677d]">{item.description}</p><button type="button" onClick={() => { setScheduleType(index === 0 ? "In-Person Consultation" : "Remote Consultation"); setSelectedSlot(""); }} className="mt-6 inline-flex items-center justify-center rounded-[8px] bg-[#bc9155] px-6 py-3 text-[14px] font-semibold text-white transition-colors hover:bg-[#a57d48]">{index === 0 ? "Book In-Person" : "Book Remote"}</button></article>)}
          </div>
        </div>
      </section>

      <section className="bg-[#f5f1e9] px-5 pb-16 md:px-10 md:pb-24">
        <div className="mx-auto max-w-[1240px]">
          <div className="mb-10 text-center">
            {label(expectIntro?.eyebrow || "After You Reach Out")}
            <h2 className="text-[clamp(30px,3vw,42px)] font-bold tracking-[-0.02em]">{expectParts.before}{expectParts.accent ? <span className="text-[#bc9155]">{expectParts.accent}</span> : null}{expectParts.after}</h2>
            {expectIntro?.content || expectIntro?.body ? <p className="mx-auto mt-3 max-w-[720px] text-[15px] leading-[1.8] text-[#5c677d]">{expectIntro?.content || expectIntro?.body}</p> : null}
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {expectCards.map((item: any, index: number) => <article key={`${item.title || "expect"}-${index}`} className="rounded-[12px] bg-white p-7 text-center shadow-[0_10px_28px_rgba(30,43,67,0.07)]"><div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border-2 border-[#bc9155] bg-[#bc915512] text-[20px] font-bold text-[#bc9155]">{index + 1}</div><h4 className="text-[22px] font-bold">{item.title}</h4><p className="mt-3 text-[14px] leading-[1.75] text-[#5c677d]">{item.description}</p></article>)}
          </div>
        </div>
      </section>

      {financing ? <div className="border-t border-[#1e2b4314] bg-white px-5 py-12 md:px-10 md:py-14"><div className="mx-auto flex max-w-[1200px] flex-col items-center gap-6 text-center"><div className="flex flex-col items-center gap-4"><div className="text-[24px] font-bold tracking-[-0.02em]"><span className="text-[#6bbf4e]">Green</span><span className="text-[#1e2b43]">Sky</span></div><p className="max-w-[760px] text-[16px] leading-[1.6] text-[#5c677d]"><strong className="text-[#1e2b43]">{financing.title}.</strong> {(financing.content || financing.body || "").replace(/^\s*Get approved/i, "Get approved")}</p></div>{financing.cta?.url ? linkNode(financing.cta.url, <><span>{financing.cta.label || "Check Financing Options"}</span><ArrowRight className="h-4 w-4" /></>, "inline-flex min-h-[52px] min-w-[280px] items-center justify-center gap-2 rounded-[8px] bg-[#bc9155] px-8 py-3 text-[15px] font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-[#a57d48] hover:shadow-[0_4px_12px_rgba(188,145,85,0.3)]") : null}</div></div> : null}

      {scheduleType ? <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#151e30]/75 px-5 backdrop-blur-sm"><div className="w-full max-w-[560px] rounded-[16px] bg-white p-7 shadow-[0_24px_60px_rgba(0,0,0,0.28)]"><div className="flex items-start justify-between gap-4"><div><p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#bc9155]">Schedule Consultation</p><h3 className="mt-2 text-[30px] font-bold text-[#1e2b43]">{scheduleType}</h3><p className="mt-2 text-[14px] leading-[1.7] text-[#5c677d]">Choose a preferred slot and we&apos;ll send a confirmation to your email within 24 hours.</p></div><button type="button" onClick={() => setScheduleType(null)} className="rounded-full border border-[#1e2b431f] px-3 py-1 text-sm text-[#1e2b43]">Close</button></div><div className="mt-6 grid gap-3 sm:grid-cols-2">{["Mon 10:00 AM","Tue 1:30 PM","Wed 4:00 PM","Thu 11:00 AM","Fri 2:00 PM","Sat 9:30 AM"].map((slot) => <button key={slot} type="button" onClick={() => setSelectedSlot(slot)} className={cls("rounded-[10px] border px-4 py-3 text-left text-[14px] font-medium transition-colors", selectedSlot === slot ? "border-[#bc9155] bg-[#bc91550f] text-[#bc9155]" : "border-[#1e2b431f] text-[#1e2b43] hover:border-[#bc9155]")}>{slot}</button>)}</div><div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><p className="text-[13px] text-[#5c677d]">{selectedSlot ? `Selected: ${selectedSlot}` : "Select a time to continue."}</p><button type="button" onClick={() => setScheduleType(null)} className="inline-flex items-center justify-center rounded-[8px] bg-[#bc9155] px-6 py-3 text-[14px] font-semibold text-white transition-colors hover:bg-[#a57d48]">{selectedSlot ? "Confirm Request" : "Got It"}</button></div></div></div> : null}
    </div>
  );
}

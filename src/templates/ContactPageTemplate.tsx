"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, CalendarDays, Check, ChevronDown, Home, Monitor, Shield, Star, Upload } from "lucide-react";
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

const IN_PERSON_SLOTS = [
  "8:00 AM - 10:00 AM",
  "10:00 AM - 12:00 PM",
  "12:00 PM - 2:00 PM",
  "2:00 PM - 4:00 PM",
];

const REMOTE_WEEKDAY_SLOTS = [
  "8:00 AM - 9:00 AM",
  "9:00 AM - 10:00 AM",
  "10:00 AM - 11:00 AM",
  "11:00 AM - 12:00 PM",
  "12:00 PM - 1:00 PM",
  "1:00 PM - 2:00 PM",
  "2:00 PM - 3:00 PM",
  "3:00 PM - 4:00 PM",
  "4:00 PM - 5:00 PM",
  "5:00 PM - 6:00 PM",
];

const REMOTE_SATURDAY_SLOTS = [
  "9:00 AM - 10:00 AM",
  "10:00 AM - 11:00 AM",
  "11:00 AM - 12:00 PM",
  "12:00 PM - 1:00 PM",
  "1:00 PM - 2:00 PM",
  "2:00 PM - 3:00 PM",
];

const selectChevronStyle = {
  backgroundImage:
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%235C677D' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E\")",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "right 16px center",
};

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

function tomorrowISO() {
  const date = new Date();
  date.setDate(date.getDate() + 1);
  return date.toISOString().split("T")[0];
}

function dayFromISO(value: string) {
  if (!value) return null;
  return new Date(`${value}T12:00:00`).getDay();
}

function trustIcon(icon?: string) {
  if (icon === "calendar") return <CalendarDays className="h-[22px] w-[22px]" />;
  if (icon === "shield") return <Shield className="h-[22px] w-[22px]" />;
  if (icon === "check") return <Check className="h-[22px] w-[22px]" />;
  return <Star className="h-[22px] w-[22px] fill-current" />;
}

function trustText(item: { label?: string; value?: string }) {
  const label = (item.label || "").trim();
  const value = (item.value || "").trim();
  if (!label) return value;
  if (!value) return label;
  return label.toLowerCase().includes(value.toLowerCase()) ? label : `${label} ${value}`;
}

export function ContactPageTemplate({ page }: { page: CMSPage }) {
  const pageRef = useRef<HTMLDivElement>(null);
  const serviceWrapRef = useRef<HTMLDivElement>(null);
  const tomorrow = useMemo(() => tomorrowISO(), []);

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
  const [scheduleOpen, setScheduleOpen] = useState(false);
  const [scheduleMode, setScheduleMode] = useState<"in-person" | "remote">("in-person");
  const [scheduleCounty, setScheduleCounty] = useState<"fairfield" | "new-haven" | null>(null);
  const [scheduleDate, setScheduleDate] = useState(tomorrow);
  const [selectedSlot, setSelectedSlot] = useState<string>("");
  const [scheduleValues, setScheduleValues] = useState({ name: "", phone: "", email: "", zip: "" });

  const heroParts = parts(hero?.headline || hero?.title, "BuiltWell CT");
  const leadParts = parts(lead?.title, lead?.title_highlight || "Project");
  const areaParts = parts(areas?.title, areas?.highlight_text || "New Haven");
  const consultParts = parts(consultIntro?.title, "Consultation");
  const expectParts = parts(expectIntro?.title, "Expect");

  const fields = lead?.fields || [];
  const topFields = fields.filter((field: any) => !["checkbox_group", "radio_group", "textarea", "file", "select"].includes(field.type));
  const servicesField = fields.find((field: any) => field.type === "checkbox_group");
  const timeField = fields.find((field: any) => field.name === "best_time" || field.type === "select");
  const contactField = fields.find((field: any) => field.type === "radio_group");
  const messageField = fields.find((field: any) => field.type === "textarea");
  const selectedServicesLabel = !pickedServices.length
    ? "Select services"
    : pickedServices.length <= 2
      ? pickedServices.join(", ")
      : `${pickedServices.length} services selected`;

  const day = useMemo(() => dayFromISO(scheduleDate), [scheduleDate]);
  const isSaturday = day === 6;
  const isSunday = day === 0;

  const availableSlots = useMemo(() => {
    if (isSunday) return [];
    if (scheduleMode === "in-person") return isSaturday ? [] : IN_PERSON_SLOTS;
    return isSaturday ? REMOTE_SATURDAY_SLOTS : REMOTE_WEEKDAY_SLOTS;
  }, [isSaturday, isSunday, scheduleMode]);

  useEffect(() => {
    if (!serviceOpen) return;

    const onDocumentClick = (event: MouseEvent) => {
      if (serviceWrapRef.current && !serviceWrapRef.current.contains(event.target as Node)) {
        setServiceOpen(false);
      }
    };

    const onEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") setServiceOpen(false);
    };

    document.addEventListener("mousedown", onDocumentClick);
    document.addEventListener("keydown", onEsc);

    return () => {
      document.removeEventListener("mousedown", onDocumentClick);
      document.removeEventListener("keydown", onEsc);
    };
  }, [serviceOpen]);

  useEffect(() => {
    if (!scheduleOpen) return;

    const onEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") setScheduleOpen(false);
    };

    document.addEventListener("keydown", onEsc);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onEsc);
      document.body.style.overflow = previousOverflow;
    };
  }, [scheduleOpen]);

  useEffect(() => {
    const root = pageRef.current;
    if (!root) return;

    const elements = Array.from(root.querySelectorAll<HTMLElement>(".contact-fade-up"));
    if (!elements.length) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      elements.forEach((element) => element.classList.add("contact-fade-up-visible"));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("contact-fade-up-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  const openScheduleModal = (type: "in-person" | "remote") => {
    if (type === "in-person" && isSaturday) {
      setScheduleMode("remote");
      setScheduleCounty(null);
    } else {
      setScheduleMode(type);
    }
    setScheduleOpen(true);
    setSelectedSlot("");
  };

  const onScheduleDateChange = (value: string) => {
    if (!value) {
      setScheduleDate("");
      setSelectedSlot("");
      return;
    }

    const selectedDay = dayFromISO(value);
    if (selectedDay === 0) {
      window.alert("We are closed on Sundays. Please select a weekday or Saturday.");
      return;
    }

    if (selectedDay === 6 && scheduleMode === "in-person") {
      setScheduleMode("remote");
      setScheduleCounty(null);
    }

    setScheduleDate(value);
    setSelectedSlot("");
  };

  const onScheduleSubmit = () => {
    const { name, phone, email, zip } = scheduleValues;

    if (!name || !phone || !email || !zip || !scheduleDate || !selectedSlot) {
      window.alert("Please fill in all fields and select a time slot.");
      return;
    }

    if (scheduleMode === "in-person" && !scheduleCounty) {
      window.alert("Please select your county.");
      return;
    }

    const typeLabel = scheduleMode === "in-person" ? "In-Person Visit" : "Google Meet";
    const countyLabel = scheduleCounty === "fairfield" ? "Fairfield County" : "New Haven County";
    const summary = scheduleMode === "in-person"
      ? `${typeLabel} in ${countyLabel}\n${scheduleDate} at ${selectedSlot}\n\nName: ${name}\nPhone: ${phone}\nEmail: ${email}\nZip: ${zip}`
      : `${typeLabel}\n${scheduleDate} at ${selectedSlot}\n\nName: ${name}\nPhone: ${phone}\nEmail: ${email}\nZip: ${zip}`;

    window.alert(`Thank you! Your consultation request has been submitted.\n\n${summary}\n\nWe'll confirm by email within 24 hours.`);
    setScheduleOpen(false);
  };

  return (
    <div ref={pageRef} data-contact-page className="bg-[#f5f1e9] text-[#1e2b43]">
      <section className="contact-page-hero relative isolate flex min-h-[50vh] items-stretch overflow-hidden bg-[#151e30] px-5 pb-12 pt-[60px] text-white md:px-10">
        <div className="absolute inset-0 bg-cover bg-center opacity-70" style={{ backgroundImage: `url(${media(hero?.background_image, "/images/hero/hero-carousel-2.jpg")})` }} />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_97%_97%,rgba(21,30,48,1)_0%,rgba(21,30,48,0.9)_8%,transparent_30%),radial-gradient(ellipse_at_3%_97%,rgba(21,30,48,0.9)_0%,transparent_25%),linear-gradient(180deg,rgba(21,30,48,0.35)_0%,rgba(21,30,48,0.2)_30%,rgba(21,30,48,0.45)_65%,rgba(21,30,48,0.92)_100%)]" />
        <div className="relative z-10 mx-auto flex w-full max-w-[1240px] flex-col items-center justify-center text-center">
          <ol className="mb-5 flex list-none items-center text-[13px] font-medium text-white/90">
            <li className="flex items-center">{linkNode("/", "Home", "transition-colors duration-200 hover:text-[#bc9155]")}</li>
            <li className="flex items-center"><span className="px-2.5 text-[12px] text-[#bc9155]" aria-hidden>{"\u203A"}</span><span className="font-semibold text-white">Contact</span></li>
          </ol>
          <h1 className="max-w-[980px] text-[clamp(40px,4.5vw,56px)] font-bold leading-[1.08] tracking-[-0.02em] text-white [text-shadow:0_2px_20px_rgba(0,0,0,0.5)]">
            {heroParts.before}{heroParts.accent ? <span className="text-[#bc9155]">{heroParts.accent}</span> : null}{heroParts.after}
          </h1>
          {hero?.subheadline || hero?.subtitle ? <p className="mt-3 max-w-[640px] text-[17px] leading-[1.65] text-white/85 [text-shadow:0_1px_8px_rgba(0,0,0,0.4)]">{hero?.subheadline || hero?.subtitle}</p> : null}
        </div>
      </section>

      <section className="bg-[#f5f1e9] px-5 py-16 md:px-10 md:py-[72px]" id="contact">
        <div className="mx-auto max-w-[1200px]">
          <div className="contact-fade-up mb-8 text-center">
            {label(lead?.eyebrow || "Get In Touch")}
            <h2 className="text-[clamp(30px,3vw,42px)] font-bold tracking-[-0.02em]">{leadParts.before}{leadParts.accent ? <span className="text-[#bc9155]">{leadParts.accent}</span> : null}{leadParts.after}</h2>
            {lead?.subtitle ? <p className="mx-auto mt-2 max-w-[600px] text-[16px] leading-[1.7] text-[#5c677d]">{lead.subtitle}</p> : null}
          </div>
          <div className="grid gap-8 lg:grid-cols-[1fr_1.15fr] lg:items-stretch">
            <div className="contact-fade-up flex flex-col gap-3">
              {(lead?.images || []).slice(0, 2).map((image: any, index: number) => <div key={`${image.alt || "lead"}-${index}`} className="relative min-h-[220px] overflow-hidden rounded-[8px] lg:min-h-[258px]"><img src={media(image.image, index === 0 ? "/portfolio/builtwell-team-client-arrival-ct.jpeg" : "/portfolio/builtwell-contractor-sign-consultation-ct-01.jpg")} alt={image.alt || "BuiltWell CT consultation"} className="h-full w-full object-cover" /><div className="pointer-events-none absolute bottom-0 right-0 h-[60px] w-[60px] rounded-br-[8px] bg-[linear-gradient(135deg,transparent_30%,rgba(30,43,67,0.5)_100%)]" /></div>)}
            </div>
            <div className="contact-fade-up flex flex-col rounded-[10px] border border-[#1e2b4314] bg-white px-6 py-8 shadow-[0_16px_48px_rgba(30,43,67,0.1),0_4px_12px_rgba(30,43,67,0.04)] md:px-9">
              {submitted ? <div className="flex min-h-[420px] flex-col items-center justify-center text-center"><h3 className="text-[34px] font-bold">Thank You</h3><p className="mt-3 max-w-[420px] text-[15px] leading-7 text-[#5c677d]">We received your request and will get back to you within one business day.</p></div> : <form onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }} className="flex flex-1 flex-col" aria-label="Request a free consultation">
                <div className="grid gap-4 md:grid-cols-2">
                  {topFields.map((field: any) => {
                    const isZipField = field.name === "zip" || field.name === "zip_code";
                    return <div key={field.name}><label className="mb-1.5 block text-[13px] font-semibold uppercase tracking-[0.04em] text-[#1e2b43]">{field.label}{field.required ? " *" : ""}</label><input type={field.type === "phone" ? "tel" : field.type} required={field.required} value={formValues[field.name] || ""} placeholder={field.placeholder || ""} maxLength={isZipField ? 5 : undefined} pattern={isZipField ? "[0-9]{5}" : undefined} onChange={(event) => setFormValues((current) => ({ ...current, [field.name]: event.target.value }))} className="w-full rounded-[6px] border border-[#1e2b4326] px-3.5 py-3 text-[15px] text-[#1e2b43] outline-none transition-colors duration-200 focus:border-[#bc9155]" /></div>;
                  })}
                </div>
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  {servicesField ? <div className="md:col-span-2 lg:col-span-1"><label className="mb-1.5 block text-[13px] font-semibold uppercase tracking-[0.04em] text-[#1e2b43]">{servicesField.label}{servicesField.required ? " *" : ""}</label><div ref={serviceWrapRef} className="relative"><button type="button" onClick={() => setServiceOpen((current) => !current)} aria-expanded={serviceOpen} className="flex w-full items-center justify-between rounded-[4px] border border-[#1e2b4326] px-3.5 py-[13px] text-left text-[15px] text-[#1e2b43]"><span className={cls("truncate", pickedServices.length ? "font-medium text-[#1e2b43]" : "text-[#5c677d]")}>{selectedServicesLabel}</span><ChevronDown className={cls("h-4 w-4 transition-transform duration-200", serviceOpen && "rotate-180")} /></button><div className={cls("absolute left-0 right-0 top-[calc(100%+4px)] z-20 max-h-60 overflow-y-auto rounded-[6px] border border-[#1e2b4326] bg-white py-1 shadow-[0_8px_24px_rgba(0,0,0,0.12)]", serviceOpen ? "block" : "hidden")}>{opts(servicesField.options).map((option) => <label key={option.value} className="flex cursor-pointer items-center gap-2.5 px-3.5 py-2 text-[14px] font-normal text-[#1e2b43] transition-colors duration-150 hover:bg-[#bc91550f]"><input type="checkbox" checked={pickedServices.includes(option.value)} onChange={() => setPickedServices((current) => current.includes(option.value) ? current.filter((value) => value !== option.value) : [...current, option.value])} className="contact-multiselect-checkbox" />{option.label}</label>)}</div></div></div> : null}
                  {timeField ? <div><label className="mb-1.5 block text-[13px] font-semibold uppercase tracking-[0.04em] text-[#1e2b43]">{timeField.label}{timeField.required ? " *" : ""}</label><select required={timeField.required} value={formValues[timeField.name] || ""} onChange={(event) => setFormValues((current) => ({ ...current, [timeField.name]: event.target.value }))} style={selectChevronStyle} className="w-full appearance-none rounded-[6px] border border-[#1e2b4326] bg-white px-3.5 py-3 pr-10 text-[15px] text-[#1e2b43] outline-none transition-colors duration-200 focus:border-[#bc9155]"><option value="">Select a time</option>{opts(timeField.options).map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select></div> : null}
                  {contactField ? <fieldset className="md:col-span-2"><legend className="mb-1.5 block text-[13px] font-semibold uppercase tracking-[0.04em] text-[#1e2b43]">{contactField.label}{contactField.required ? " *" : ""}</legend><div className="flex flex-wrap gap-2.5 md:flex-nowrap">{opts(contactField.options).map((option) => { const checked = (formValues[contactField.name] || "call") === option.value; return <label key={option.value} className={cls("flex flex-1 cursor-pointer items-center justify-center rounded-[6px] border-2 px-4 py-3 text-[13px] font-medium transition-colors duration-200 hover:border-[#bc9155]", checked ? "border-[#bc9155] bg-[#bc91550f] text-[#bc9155]" : "border-[#1e2b431f] bg-white text-[#1e2b43]")}><input type="radio" name={contactField.name} checked={checked} onChange={() => setFormValues((current) => ({ ...current, [contactField.name]: option.value }))} className="hidden" /><span>{option.label}</span></label>; })}</div></fieldset> : null}
                </div>
                {messageField ? <div className="mt-4"><label className="mb-1.5 block text-[13px] font-semibold uppercase tracking-[0.04em] text-[#1e2b43]">{messageField.label}</label><textarea rows={4} value={formValues[messageField.name] || ""} placeholder={messageField.placeholder || ""} onChange={(event) => setFormValues((current) => ({ ...current, [messageField.name]: event.target.value }))} className="min-h-[120px] w-full rounded-[6px] border border-[#1e2b4326] px-3.5 py-3 text-[15px] leading-[1.6] text-[#1e2b43] outline-none transition-colors duration-200 focus:border-[#bc9155] md:min-h-[160px]" /></div> : null}
                <div className="mt-2 grid gap-4 pt-2 md:grid-cols-2">
                  <div><label className="flex min-h-[52px] cursor-pointer items-center justify-center gap-2 rounded-[8px] border border-[#1e2b4326] px-5 py-3 text-[15px] font-semibold text-[#1e2b43] transition-colors duration-200 hover:border-[#bc9155]" htmlFor="contact-lead-files"><Upload className="h-4 w-4" />Upload Photos</label><input id="contact-lead-files" type="file" multiple accept="image/jpeg,image/png,image/heic,.heic" className="hidden" onChange={(event) => setFileNames(Array.from(event.target.files || []).map((file) => file.name))} />{fileNames.length ? <p className="mt-1.5 text-[12px] text-[#5c677d]">{fileNames.join(", ")}</p> : null}</div>
                  <button type="submit" className="min-h-[52px] rounded-[8px] bg-[#bc9155] px-5 py-3 text-[15px] font-semibold text-white transition-all duration-200 hover:-translate-y-px hover:bg-[#a57d48] hover:shadow-[0_4px_12px_rgba(188,145,85,0.3)]">{lead?.submit_label || "Send Request"}</button>
                </div>
                <p className="mt-4 text-center text-[13px] italic text-[#5c677d]">{lead?.consent_text || "We respond within 24 hours. No spam, no obligation."}</p>
              </form>}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f5f1e9] px-5 py-16 md:px-10 md:py-20">
        <div className="mx-auto max-w-[1240px]">
          <div className="contact-fade-up mb-12 text-center">
            {label(areas?.eyebrow || "Where We Work")}
            <h2 className="text-[clamp(32px,3.5vw,48px)] font-bold tracking-[-0.02em]">{areaParts.before}{areaParts.accent ? <span className="text-[#bc9155]">{areaParts.accent}</span> : null}{areaParts.after}</h2>
          </div>
          <div className="contact-fade-up grid gap-8 lg:grid-cols-2">
            {(areas?.counties || []).map((county: any, index: number) => {
              const expanded = !!countyOpen[index];
              const links = county.town_links || {};
              const topTowns = county.towns || [];
              const visibleExtraTowns = expanded ? (county.extra_towns || []) : [];
              const resolveTownUrl = (town: string) => {
                if (Array.isArray(links)) return links.find((entry: any) => entry?.name === town)?.url;
                return links[town];
              };
              const renderTown = (town: string, allowCountyFallback = false) => {
                const townUrl = resolveTownUrl(town) || (allowCountyFallback ? county.url : undefined);
                if (townUrl) {
                  return linkNode(townUrl, town, "rounded-full bg-[#f5f1e9] px-[10px] py-[7px] text-center text-[11px] font-semibold tracking-[0.2px] text-[#1e2b43] transition-colors duration-200 hover:bg-[#bc9155] hover:text-white");
                }
                return <span className="rounded-full bg-[#f5f1e9] px-[10px] py-[7px] text-center text-[11px] font-semibold tracking-[0.2px] text-[#1e2b43] transition-colors duration-200 hover:bg-[#bc91551a] hover:text-[#9a7340]">{town}</span>;
              };

              return (
                <article key={`${county.name || "county"}-${index}`} className="group flex flex-col overflow-hidden rounded-[12px] border-b-[3px] border-b-transparent bg-white shadow-[0_2px_12px_rgba(30,43,67,0.06),0_1px_3px_rgba(30,43,67,0.04)] transition-all duration-300 hover:-translate-y-1.5 hover:border-b-[#bc9155] hover:shadow-[0_16px_40px_rgba(30,43,67,0.1),0_32px_64px_rgba(30,43,67,0.08)]">
                  <div className="relative h-[220px] overflow-hidden">
                    <img src={media(county.image, index === 0 ? "/images/areas/fairfield-county.jpg" : "/images/areas/new-haven-county.jpg")} alt={county.name || "BuiltWell CT service area"} className={cls("h-full w-full object-cover transition-transform duration-500 group-hover:scale-105", index === 1 && "object-top")} />
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#1e2b4360] to-transparent" />
                  </div>
                  <div className="flex flex-1 flex-col p-7 pb-8">
                    <h3 className="text-[24px] font-bold">{county.name}</h3>
                    {county.phone ? <p className="mt-1 text-[15px] text-[#5c677d]">Call: <a href={`tel:${county.phone.replace(/\D/g, "")}`} className="font-semibold text-[#bc9155] hover:underline">{county.phone}</a></p> : null}
                    {county.description ? <p className="mt-4 border-b border-[#1e2b430f] pb-5 text-[14px] leading-[1.7] text-[#5c677d]">{county.description}</p> : null}
                    <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
                      {topTowns.map((town: string) => <span key={`${county.name || "county"}-top-${town}`} className="contents">{renderTown(town, true)}</span>)}
                      {visibleExtraTowns.map((town: string) => <span key={`${county.name || "county"}-more-${town}`} className="contents">{renderTown(town)}</span>)}
                    </div>
                    {county.extra_towns?.length ? <button type="button" onClick={() => setCountyOpen((current) => ({ ...current, [index]: !current[index] }))} className="mt-3 text-center text-[13px] font-semibold text-[#bc9155] transition-colors hover:text-[#a57d48]">{expanded ? "Show Fewer Towns -" : "See All Towns +"}</button> : null}
                    {county.url ? linkNode(county.url, <><span>{county.cta_label || `Learn more about ${county.name}`}</span><ArrowRight className="h-4 w-4" /></>, "mt-1 inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#bc9155] transition-all duration-300 hover:gap-2.5") : null}
                  </div>
                </article>
              );
            })}
          </div>
          <p className="contact-fade-up mt-8 text-center text-[14px] text-[#5c677d]">Not sure if we cover your area? {linkNode("/contact/", "Contact our Connecticut remodeling team", "font-semibold text-[#bc9155] underline transition-colors duration-200 hover:text-[#a57d48]")} and we&apos;ll let you know.</p>
        </div>
      </section>

      <div className="relative overflow-hidden px-5 py-14 md:px-10" style={{ background: "linear-gradient(135deg, #1e2b43 0%, #151e30 100%)" }}>
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/hero/builtwell-job-site-aerial-hero-ct.jpg')", opacity: 0.06 }} />
        <div className="relative z-10 mx-auto flex max-w-[1200px] flex-wrap items-center justify-center">
          {(trust?.items || []).map((item: any, index: number) => (
            <div key={`${item.label || "trust"}-${index}`} className="contents">
              {item.url ? linkNode(item.url, <div className="flex min-w-[180px] flex-1 flex-col items-center gap-2.5 px-8 py-5 text-center text-[13px] font-semibold tracking-[0.03em] text-white/90 transition-all duration-300 hover:-translate-y-0.5 hover:text-[#bc9155]"><span className="text-[#bc9155] [filter:drop-shadow(0_2px_4px_rgba(188,145,85,0.3))]">{trustIcon(item.icon)}</span><span className="whitespace-nowrap">{trustText(item)}</span></div>, "flex flex-1 justify-center") : <div className="flex flex-1 justify-center"><div className="flex min-w-[180px] flex-1 flex-col items-center gap-2.5 px-8 py-5 text-center text-[13px] font-semibold tracking-[0.03em] text-white/90 transition-all duration-300 hover:-translate-y-0.5 hover:text-[#bc9155]"><span className="text-[#bc9155] [filter:drop-shadow(0_2px_4px_rgba(188,145,85,0.3))]">{trustIcon(item.icon)}</span><span className="whitespace-nowrap">{trustText(item)}</span></div></div>}
              {index < (trust?.items || []).length - 1 ? <div className="hidden h-10 w-px bg-white/10 lg:block" /> : null}
            </div>
          ))}
        </div>
      </div>

      <section className="bg-[#f5f1e9] px-5 py-16 md:px-10 md:py-20">
        <div className="mx-auto max-w-[1240px]">
          <div className="contact-fade-up mb-10 text-center">
            {label(consultIntro?.eyebrow || "Get Started")}
            <h2 className="text-[clamp(32px,3.5vw,48px)] font-bold tracking-[-0.02em]">{consultParts.before}{consultParts.accent ? <span className="text-[#bc9155]">{consultParts.accent}</span> : null}{consultParts.after}</h2>
            {consultIntro?.content || consultIntro?.body ? <p className="mx-auto mt-3 max-w-[780px] text-[15px] leading-[1.8] text-[#5c677d]">{consultIntro?.content || consultIntro?.body}</p> : null}
          </div>
          <div className="contact-fade-up grid gap-7 md:grid-cols-2">
            {consultCards.map((item: any, index: number) => <article key={`${item.title || "consult"}-${index}`} className="flex flex-col rounded-[8px] border-b-2 border-b-transparent bg-white p-8 shadow-[0_2px_12px_rgba(30,43,67,0.06),0_1px_3px_rgba(30,43,67,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-b-[#bc9155] hover:shadow-[0_12px_28px_rgba(30,43,67,0.1),0_28px_56px_rgba(30,43,67,0.12)]"><div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full border-2 border-[#bc9155] bg-[#bc91551f] text-[#bc9155]">{index === 0 ? <Home className="h-6 w-6" /> : <Monitor className="h-6 w-6" />}</div><h3 className="text-[20px] font-bold">{item.title}</h3><p className="mt-3 text-[15px] leading-[1.7] text-[#5c677d]">{item.description}</p><button type="button" onClick={() => openScheduleModal(index === 0 ? "in-person" : "remote")} className="mt-5 inline-flex min-w-[200px] items-center justify-center rounded-[4px] bg-[#bc9155] px-8 py-3 text-[14px] font-semibold text-white transition-colors duration-300 hover:bg-[#9a7340]">{index === 0 ? "Book In-Person" : "Book Remote"}</button></article>)}
          </div>
        </div>
      </section>

      <section className="bg-[#f5f1e9] px-5 pb-16 md:px-10 md:pb-24">
        <div className="mx-auto max-w-[1240px]">
          <div className="contact-fade-up mb-10 text-center">
            {label(expectIntro?.eyebrow || "After You Reach Out")}
            <h2 className="text-[clamp(32px,3.5vw,48px)] font-bold tracking-[-0.02em]">{expectParts.before}{expectParts.accent ? <span className="text-[#bc9155]">{expectParts.accent}</span> : null}{expectParts.after}</h2>
            {expectIntro?.content || expectIntro?.body ? <p className="mx-auto mt-3 max-w-[720px] text-[15px] leading-[1.8] text-[#5c677d]">{expectIntro?.content || expectIntro?.body}</p> : null}
          </div>
          <div className="contact-fade-up grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {expectCards.map((item: any, index: number) => <article key={`${item.title || "expect"}-${index}`} className="rounded-[8px] border-b-2 border-b-transparent bg-white px-4 pb-8 pt-7 text-center shadow-[0_2px_12px_rgba(30,43,67,0.06)] transition-all duration-300 hover:-translate-y-1.5 hover:border-b-[#bc9155] hover:shadow-[0_12px_28px_rgba(30,43,67,0.1),0_28px_56px_rgba(30,43,67,0.08)]"><div className="mx-auto mb-4 flex h-[52px] w-[52px] items-center justify-center rounded-full border-2 border-[#bc9155] bg-[#bc91551f] text-[20px] font-bold text-[#bc9155]">{index + 1}</div><h4 className="text-[17px] font-bold">{item.title}</h4><p className="mt-2.5 text-[14px] leading-[1.65] text-[#5c677d]">{item.description}</p></article>)}
          </div>
        </div>
      </section>

      {financing ? <div className="border-t border-[#1e2b4314] bg-white px-5 py-12 md:px-10 md:py-14"><div className="mx-auto flex max-w-[1200px] flex-col items-center gap-6 text-center"><div className="flex flex-col items-center gap-4"><div className="text-[24px] font-bold tracking-[-0.02em]"><span className="text-[#6bbf4e]">Green</span><span className="text-[#1e2b43]">Sky</span></div><p className="max-w-[760px] text-[16px] leading-[1.6] text-[#5c677d]"><strong className="text-[#1e2b43]">{financing.title}.</strong> {(financing.content || financing.body || "").replace(/^\s*Get approved/i, "Get approved")}</p></div>{financing.cta?.url ? linkNode(financing.cta.url, <><span>{financing.cta.label || "Check Financing Options"}</span><ArrowRight className="h-4 w-4" /></>, "inline-flex min-h-[52px] min-w-[280px] items-center justify-center gap-2 rounded-[8px] bg-[#bc9155] px-8 py-3 text-[15px] font-semibold text-white transition-all duration-200 hover:-translate-y-[2px] hover:bg-[#a57d48] hover:shadow-[0_6px_24px_rgba(188,145,85,0.4)]") : null}</div></div> : null}

            {scheduleOpen ? <div className="contact-schedule-overlay fixed inset-0 z-50 flex items-center justify-center bg-[#151e30]/70 backdrop-blur-sm" onMouseDown={(event) => { if (event.target === event.currentTarget) setScheduleOpen(false); }}><div className="contact-schedule-modal max-h-[90vh] w-[92%] max-w-[640px] overflow-y-auto rounded-[12px] bg-white shadow-[0_24px_80px_rgba(0,0,0,0.3)]"><div className="contact-schedule-header relative rounded-t-[12px] bg-[#1e2b43] px-8 py-7 text-center text-white"><h3 className="contact-schedule-title text-[24px] font-bold">Schedule a <span className="text-[#bc9155]">Free Consultation</span></h3><p className="mt-1 text-[14px] text-white/65">No charge, no obligation. Pick a time that works for you.</p><button type="button" onClick={() => setScheduleOpen(false)} className="contact-schedule-close absolute right-5 top-5 bg-transparent p-1 text-[24px] leading-none text-white/60 transition-colors duration-200 hover:text-white" aria-label="Close schedule modal">&times;</button></div><div className="contact-schedule-body p-8"><div className="contact-schedule-tabs mb-7 grid gap-3 sm:grid-cols-2"><button type="button" onClick={() => { if (!isSaturday) { setScheduleMode("in-person"); setSelectedSlot(""); } }} className={cls("contact-schedule-tab rounded-[8px] border-2 p-4 text-center transition-all duration-200", scheduleMode === "in-person" ? "border-[#bc9155] bg-[#bc91550f]" : "border-[#1e2b431a] bg-white hover:border-[#bc9155]", isSaturday && "cursor-not-allowed opacity-40")}><Home className="mx-auto mb-2 h-7 w-7 text-[#bc9155]" /><h4 className="text-[15px] font-semibold text-[#1e2b43]">In-Person Visit</h4><p className="mt-1 text-[12px] text-[#5c677d]">We come to your home<br />Mon-Fri, 8am - 4pm<br />2-hour windows</p></button><button type="button" onClick={() => { setScheduleMode("remote"); setScheduleCounty(null); setSelectedSlot(""); }} className={cls("contact-schedule-tab rounded-[8px] border-2 p-4 text-center transition-all duration-200", scheduleMode === "remote" ? "border-[#bc9155] bg-[#bc91550f]" : "border-[#1e2b431a] bg-white hover:border-[#bc9155]")}><Monitor className="mx-auto mb-2 h-7 w-7 text-[#bc9155]" /><h4 className="text-[15px] font-semibold text-[#1e2b43]">Google Meet</h4><p className="mt-1 text-[12px] text-[#5c677d]">Video call from anywhere<br />Mon-Fri 8am-6pm, Sat 9am-3pm<br />1-hour windows</p></button></div>

            {scheduleMode === "in-person" ? <div className="mb-6"><label className="mb-2.5 block text-[13px] font-semibold uppercase tracking-[0.04em] text-[#1e2b43]">Which county?</label><div className="contact-schedule-county grid gap-3 sm:grid-cols-2"><button type="button" onClick={() => setScheduleCounty("fairfield")} className={cls("rounded-[6px] border px-3 py-3 text-[14px] font-medium transition-colors duration-200", scheduleCounty === "fairfield" ? "border-[#bc9155] bg-[#bc9155] text-white" : "border-[#1e2b431f] text-[#1e2b43] hover:border-[#bc9155]")}>Fairfield County</button><button type="button" onClick={() => setScheduleCounty("new-haven")} className={cls("rounded-[6px] border px-3 py-3 text-[14px] font-medium transition-colors duration-200", scheduleCounty === "new-haven" ? "border-[#bc9155] bg-[#bc9155] text-white" : "border-[#1e2b431f] text-[#1e2b43] hover:border-[#bc9155]")}>New Haven County</button></div></div> : null}

            <div className="mb-6"><label htmlFor="schedule-date" className="mb-2 block text-[13px] font-semibold uppercase tracking-[0.04em] text-[#1e2b43]">Select a Date</label><input id="schedule-date" type="date" min={tomorrow} value={scheduleDate} onChange={(event) => onScheduleDateChange(event.target.value)} className="w-full rounded-[4px] border border-[#1e2b4326] px-4 py-3 text-[15px] text-[#1e2b43] outline-none transition-colors duration-200 focus:border-[#bc9155]" /></div>

            <div className="mb-6"><label className="mb-2.5 block text-[13px] font-semibold uppercase tracking-[0.04em] text-[#1e2b43]">Available Times</label>{isSunday ? <p className="rounded-[6px] border border-[#1e2b431f] px-4 py-4 text-center text-[14px] text-[#5c677d]">We are closed on Sundays. Please choose a weekday or Saturday.</p> : (scheduleMode === "in-person" && isSaturday) ? <p className="rounded-[6px] border border-[#1e2b431f] px-4 py-4 text-center text-[14px] text-[#5c677d]">In-person visits are not available on Saturdays. Please select a weekday or choose Google Meet.</p> : <div className="contact-schedule-slots grid grid-cols-2 gap-2">{availableSlots.map((slot) => <button key={slot} type="button" onClick={() => setSelectedSlot(slot)} className={cls("rounded-[6px] border px-3 py-3 text-center text-[14px] font-medium transition-all duration-200", selectedSlot === slot ? "border-[#bc9155] bg-[#bc9155] text-white" : "border-[#1e2b431f] text-[#1e2b43] hover:border-[#bc9155] hover:bg-[#bc91550f]")}>{slot}</button>)}</div>}</div>

            <div className="mb-3 grid gap-3 sm:grid-cols-2"><div><label className="mb-1.5 block text-[13px] font-semibold uppercase tracking-[0.04em] text-[#1e2b43]">Your Name</label><input type="text" value={scheduleValues.name} onChange={(event) => setScheduleValues((current) => ({ ...current, name: event.target.value }))} placeholder="Full name" className="w-full rounded-[6px] border border-[#1e2b4326] px-3.5 py-3 text-[15px] text-[#1e2b43] outline-none transition-colors duration-200 focus:border-[#bc9155]" /></div><div><label className="mb-1.5 block text-[13px] font-semibold uppercase tracking-[0.04em] text-[#1e2b43]">Phone Number</label><input type="tel" value={scheduleValues.phone} onChange={(event) => setScheduleValues((current) => ({ ...current, phone: event.target.value }))} placeholder="(203) 000-0000" className="w-full rounded-[6px] border border-[#1e2b4326] px-3.5 py-3 text-[15px] text-[#1e2b43] outline-none transition-colors duration-200 focus:border-[#bc9155]" /></div></div>

            <div className="mb-6 grid gap-3 sm:grid-cols-2"><div><label className="mb-1.5 block text-[13px] font-semibold uppercase tracking-[0.04em] text-[#1e2b43]">Email</label><input type="email" value={scheduleValues.email} onChange={(event) => setScheduleValues((current) => ({ ...current, email: event.target.value }))} placeholder="you@email.com" className="w-full rounded-[6px] border border-[#1e2b4326] px-3.5 py-3 text-[15px] text-[#1e2b43] outline-none transition-colors duration-200 focus:border-[#bc9155]" /></div><div><label className="mb-1.5 block text-[13px] font-semibold uppercase tracking-[0.04em] text-[#1e2b43]">Zip Code</label><input type="text" pattern="[0-9]{5}" maxLength={5} value={scheduleValues.zip} onChange={(event) => setScheduleValues((current) => ({ ...current, zip: event.target.value }))} placeholder="06477" className="w-full rounded-[6px] border border-[#1e2b4326] px-3.5 py-3 text-[15px] text-[#1e2b43] outline-none transition-colors duration-200 focus:border-[#bc9155]" /></div></div>

            <button type="button" onClick={onScheduleSubmit} className="w-full rounded-[4px] bg-[#bc9155] px-4 py-4 text-[16px] font-semibold text-white transition-colors duration-200 hover:bg-[#a57d48]">Confirm Consultation</button>
            <p className="mt-4 text-center text-[13px] italic text-[#5c677d]">We&apos;ll send a confirmation to your email within 24 hours.</p>
          </div></div></div> : null}

      <style jsx global>{`
        [data-contact-page] .contact-fade-up {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }

        [data-contact-page] .contact-fade-up.contact-fade-up-visible {
          opacity: 1;
          transform: translateY(0);
        }

        [data-contact-page] .contact-multiselect-checkbox {
          -webkit-appearance: none;
          appearance: none;
          width: 18px;
          height: 18px;
          min-width: 18px;
          min-height: 18px;
          margin: 0;
          padding: 0;
          border: 2px solid rgba(30, 43, 67, 0.25);
          border-radius: 3px;
          background: #fff;
          position: relative;
          cursor: pointer;
          flex-shrink: 0;
        }

        [data-contact-page] .contact-multiselect-checkbox:checked {
          background: #bc9155;
          border-color: #bc9155;
        }

        [data-contact-page] .contact-multiselect-checkbox:checked::after {
          content: "";
          position: absolute;
          left: 5px;
          top: 2px;
          width: 5px;
          height: 9px;
          border: solid #fff;
          border-width: 0 2px 2px 0;
          transform: rotate(45deg);
        }

        [data-contact-page] .contact-page-hero > div:first-child {
          opacity: 0.72;
        }

        [data-contact-page] .contact-schedule-title {
          font-family: "Playfair Display", serif;
          line-height: 1.15;
        }

        [data-contact-page] .contact-schedule-close {
          width: 28px;
          height: 28px;
          border: none;
          cursor: pointer;
        }

        @media (max-width: 768px) {
          [data-contact-page] .contact-fade-up {
            transform: translateY(20px);
          }

          [data-contact-page] .contact-page-hero {
            min-height: 40vh;
            padding-top: 52px;
            padding-bottom: 36px;
          }

          [data-contact-page] .contact-schedule-overlay {
            align-items: stretch;
          }

          [data-contact-page] .contact-schedule-modal {
            width: 100%;
            max-width: 100%;
            height: 100%;
            max-height: 100vh;
            border-radius: 0;
            display: flex;
            flex-direction: column;
          }

          [data-contact-page] .contact-schedule-header {
            padding: 20px;
            border-radius: 0;
            flex-shrink: 0;
          }

          [data-contact-page] .contact-schedule-title {
            font-size: 20px;
          }

          [data-contact-page] .contact-schedule-close {
            top: 14px;
            right: 14px;
            width: 44px;
            height: 44px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 28px;
          }

          [data-contact-page] .contact-schedule-body {
            padding: 20px;
            flex: 1;
            overflow-y: auto;
            -webkit-overflow-scrolling: touch;
          }

          [data-contact-page] .contact-schedule-tabs {
            grid-template-columns: 1fr;
            gap: 10px;
            margin-bottom: 20px;
          }

          [data-contact-page] .contact-schedule-tab {
            padding: 14px;
          }

          [data-contact-page] .contact-schedule-tab h4 {
            font-size: 14px;
          }

          [data-contact-page] .contact-schedule-tab p {
            font-size: 11px;
          }

          [data-contact-page] .contact-schedule-county {
            grid-template-columns: 1fr;
            gap: 10px;
          }

          [data-contact-page] .contact-schedule-slots {
            grid-template-columns: 1fr 1fr;
            gap: 8px;
          }

          [data-contact-page] .contact-schedule-slots button {
            min-height: 44px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 13px;
          }
        }

        @media (max-width: 480px) {
          [data-contact-page] .contact-page-hero {
            min-height: 35vh;
            padding-left: 16px;
            padding-right: 16px;
            padding-bottom: 32px;
          }

          [data-contact-page] .contact-schedule-header {
            padding: 20px 16px;
          }

          [data-contact-page] .contact-schedule-title {
            font-size: 18px;
          }

          [data-contact-page] .contact-schedule-body {
            padding: 20px 16px;
          }

          [data-contact-page] .contact-schedule-slots {
            grid-template-columns: 1fr;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          [data-contact-page] .contact-fade-up {
            opacity: 1;
            transform: none;
            transition: none;
          }
        }
      `}</style>
    </div>
  );
}


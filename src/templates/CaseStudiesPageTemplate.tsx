"use client";

import { useState } from "react";
import { ArrowRight, CalendarDays, CheckCircle2, ChevronDown, ShieldCheck, Star, Upload } from "lucide-react";
import type { CMSPage } from "@/types/cms";
import { cls, linkNode, media, opts, parts, section, sections } from "./template-utils";

type PhoneItem = {
  label: string;
  number: string;
};

type CaseStudiesPage = CMSPage & {
  phones?: {
    items?: PhoneItem[];
  };
};

type HeroData = {
  headline?: string;
  subheadline?: string;
  background_image?: string | null;
  cta_primary?: { label?: string; url?: string } | null;
};

type TrustItem = {
  icon?: string | null;
  label?: string | null;
  value?: string | null;
  url?: string | null;
};

type TrustBarData = {
  variant?: string | null;
  items?: TrustItem[];
};

type RichTextData = {
  eyebrow?: string;
  title?: string;
  highlight_text?: string | null;
  content?: string;
  style_variant?: string;
  cta?: {
    label?: string;
    url?: string;
  } | null;
};

type LeadFormOption = string | { label: string; value: string };

type LeadFormField = {
  name: string;
  label: string;
  type: string;
  required?: boolean;
  placeholder?: string;
  options?: LeadFormOption[];
};

type LeadFormData = {
  eyebrow?: string;
  title?: string;
  title_highlight?: string;
  subtitle?: string;
  images?: Array<{
    image?: string | null;
    alt?: string;
  }>;
  fields?: LeadFormField[];
  submit_label?: string;
  consent_text?: string;
};

type CaseStudyCard = {
  title: string;
  timeline: string;
  badge: string;
  summary: string;
  quote: string;
  attribution: string;
  link: string;
};

const CARD_IMAGE_MAP: Record<string, string> = {
  "Whole-Home Restoration — Hamden": "/portfolio/builtwell-team-interior-inspection-ct.jpg",
  "Basement Finishing — Darien": "/images/headers/basement-finishing-header.jpg",
  "Bathroom Remodeling — Westport": "/images/headers/bathroom-remodeling-header.jpg",
  "Kitchen Remodeling — New Canaan": "/images/headers/kitchen-remodeling-header.jpg",
  "Kitchen + Flooring — Milford": "/portfolio/builtwell-team-completed-interior-ct.png",
};

const CARD_LINK_MAP: Record<string, string> = {
  "Whole-Home Restoration — Hamden": "/case-studies/whole-home-restoration-hamden",
  "Basement Finishing — Darien": "/case-studies/basement-finishing-darien",
  "Bathroom Remodeling — Westport": "/case-studies/bathroom-remodeling-westport",
  "Kitchen Remodeling — New Canaan": "/case-studies/kitchen-remodeling-new-canaan",
  "Kitchen + Flooring — Milford": "/case-studies/kitchen-remodeling-milford",
};

function toTelHref(number?: string) {
  return `tel:${(number || "").replace(/\D/g, "")}`;
}

function getPhone(phones: PhoneItem[], county: "fairfield" | "new-haven", fallback: string) {
  const match = phones.find((item) => {
    const label = item.label.toLowerCase();
    return county === "fairfield" ? label.includes("fairfield") : label.includes("new haven");
  });

  return match?.number || fallback;
}

function trustIcon(icon?: string | null) {
  switch ((icon || "").toLowerCase()) {
    case "star":
      return <Star className="h-[22px] w-[22px]" />;
    case "shield":
      return <ShieldCheck className="h-[22px] w-[22px]" />;
    case "calendar":
    case "clock":
      return <CalendarDays className="h-[22px] w-[22px]" />;
    default:
      return <CheckCircle2 className="h-[22px] w-[22px]" />;
  }
}

function parseCaseStudy(block: RichTextData): CaseStudyCard {
  const values = new Map<string, string>();

  for (const line of (block.content || "").split("\n").map((entry) => entry.trim()).filter(Boolean)) {
    const match = line.match(/^([^:]+):\s*(.+)$/);
    if (!match) continue;
    values.set(match[1].trim().toLowerCase(), match[2].trim());
  }

  return {
    title: block.title || "Case Study",
    timeline: values.get("timeline") || "",
    badge: values.get("badge") || "",
    summary: values.get("summary") || "",
    quote: values.get("quote") || "",
    attribution: values.get("attribution") || "",
    link: values.get("link") || "#contact",
  };
}

function HeroSection({ hero, phones }: { hero?: HeroData; phones: PhoneItem[] }) {
  const titleParts = parts(hero?.headline || "Our Case Studies", "Case Studies");
  const fairfieldPhone = getPhone(phones, "fairfield", "(203) 919-9616");
  const newHavenPhone = getPhone(phones, "new-haven", "(203) 466-9148");

  return (
    <section className="relative isolate overflow-hidden bg-[#151E30] px-5 pb-12 pt-[120px] text-white md:px-10">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${media(hero?.background_image, "/images/headers/kitchen-remodeling-header.jpg")})`, backgroundPosition: "center 30%" }} />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_97%_97%,rgba(21,30,48,1)_0%,rgba(21,30,48,0.9)_8%,transparent_30%),radial-gradient(ellipse_at_3%_97%,rgba(21,30,48,0.9)_0%,transparent_25%),linear-gradient(180deg,rgba(21,30,48,0.35)_0%,rgba(21,30,48,0.2)_30%,rgba(21,30,48,0.45)_65%,rgba(21,30,48,0.92)_100%)]" />
      <div className="relative mx-auto flex min-h-[360px] max-w-[1240px] flex-col items-center justify-center text-center md:min-h-[420px]">
        <ol className="mb-5 flex list-none items-center text-[13px] font-medium text-white/92 [text-shadow:0_1px_6px_rgba(0,0,0,0.7)]">
          <li>{linkNode("/", "Home", "text-white/85 transition-colors hover:text-[#BC9155]")}</li>
          <li className="before:px-2.5 before:text-[#BC9155] before:content-['›']"><span className="font-semibold text-white">Case Studies</span></li>
        </ol>
        <h1 className="max-w-[900px] font-serif text-[clamp(40px,4.5vw,56px)] font-bold leading-[1.08] tracking-[-0.03em] text-white [text-shadow:0_2px_20px_rgba(0,0,0,0.5)]">
          {titleParts.before}
          {titleParts.accent ? <span className="text-[#BC9155]">{titleParts.accent}</span> : null}
          {titleParts.after}
        </h1>
        {hero?.subheadline ? <p className="mt-4 max-w-[560px] text-[17px] leading-[1.7] text-white/82">{hero.subheadline}</p> : null}
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          {linkNode(toTelHref(fairfieldPhone), <div className="flex min-w-[180px] flex-col items-center rounded-[8px] border border-white/18 border-b-2 border-b-[#BC9155] bg-[rgba(10,18,35,0.42)] px-7 py-4 text-center text-white backdrop-blur-[12px] transition-all hover:-translate-y-0.5 hover:bg-[rgba(10,18,35,0.62)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.3)]"><span className="text-[11px] font-semibold uppercase tracking-[1.2px] text-white/70">Fairfield County</span><span className="mt-1 font-serif text-[18px] font-semibold">{fairfieldPhone}</span></div>)}
          {linkNode(toTelHref(newHavenPhone), <div className="flex min-w-[180px] flex-col items-center rounded-[8px] border border-white/18 border-b-2 border-b-[#BC9155] bg-[rgba(10,18,35,0.42)] px-7 py-4 text-center text-white backdrop-blur-[12px] transition-all hover:-translate-y-0.5 hover:bg-[rgba(10,18,35,0.62)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.3)]"><span className="text-[11px] font-semibold uppercase tracking-[1.2px] text-white/70">New Haven County</span><span className="mt-1 font-serif text-[18px] font-semibold">{newHavenPhone}</span></div>)}
          {linkNode(hero?.cta_primary?.url || "#contact", <div className="flex min-w-[180px] flex-col items-center rounded-[8px] border border-[#BC9155] border-b-2 border-b-[#A57D48] bg-[#BC9155] px-7 py-4 text-center text-white transition-all hover:-translate-y-0.5 hover:bg-[#D4A95A] hover:shadow-[0_8px_24px_rgba(188,145,85,0.4)]"><span className="text-[11px] font-semibold uppercase tracking-[1.2px] text-white/90">{hero?.cta_primary?.label || "Free Estimate"}</span><span className="mt-1 font-serif text-[18px] font-semibold">Schedule Now</span></div>)}
        </div>
      </div>
    </section>
  );
}

function StatsBar({ data }: { data?: TrustBarData }) {
  return (
    <section className="border-y border-[#BC9155]/20 bg-[linear-gradient(135deg,#1E2B43_0%,#151E30_100%)] text-white">
      <div className="mx-auto max-w-[1280px]">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {(data?.items || []).map((item, index, items) => (
            <div key={`${item.label}-${index}`} className={`flex min-h-[124px] flex-col items-center justify-center border-[#BC9155]/12 px-5 py-9 text-center transition-all hover:-translate-y-0.5 hover:bg-[#BC9155]/8 ${index < items.length - 1 ? "border-r" : ""}`}>
              <div className="text-[#BC9155]">{item.value ? <span className="font-serif text-[42px] font-bold leading-none">{item.value}</span> : trustIcon(item.icon)}</div>
              <div className="mt-2 text-[13px] font-medium uppercase tracking-[1px] text-white/60">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function IntroSection({ data }: { data?: RichTextData }) {
  const titleParts = parts(data?.title || "Every Project Tells a Story", data?.highlight_text || "Story");

  return (
    <section className="border-b border-[#1E2B43]/10 bg-white px-5 py-[72px] md:px-10">
      <div className="mx-auto max-w-[1240px]">
        <div className="mx-auto max-w-[800px] text-center">
          <span className="mb-4 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[1.5px] text-[#9A7340]">
            <span className="h-[2px] w-[10px] bg-[#BC9155]" />
            {data?.eyebrow || "Real Projects, Real Results"}
          </span>
          <h2 className="mx-auto max-w-[780px] font-serif text-[clamp(28px,3.5vw,44px)] font-bold tracking-[-0.5px] text-[#1E2B43]">
            {titleParts.before}
            {titleParts.accent ? <span className="text-[#BC9155]">{titleParts.accent}</span> : null}
            {titleParts.after}
          </h2>
          {data?.content ? <p className="mx-auto mt-5 max-w-[700px] text-[17px] leading-[1.75] text-[#5C677D]">{data.content}</p> : null}
        </div>
      </div>
    </section>
  );
}

function CaseStudyGrid({ cards }: { cards: CaseStudyCard[] }) {
  return (
    <section className="border-t border-[#1E2B43]/8 bg-[#F5F1E9] px-5 pb-24 pt-0 md:px-10">
      <div className="mx-auto max-w-[1240px]">
        <div className="mx-auto grid max-w-[1200px] gap-8 md:grid-cols-2">
          {cards.map((card) => {
            const image = CARD_IMAGE_MAP[card.title] || "/portfolio/builtwell-contractor-client-consultation-ct.jpeg";

            return (
              <article key={card.title} className="flex flex-col rounded-[12px] border-b-2 border-b-transparent bg-white p-7 shadow-[0_2px_12px_rgba(30,43,67,0.06),0_1px_3px_rgba(30,43,67,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-b-[#BC9155] hover:shadow-[0_12px_28px_rgba(30,43,67,0.1),0_28px_56px_rgba(30,43,67,0.12)]">
                <div className="relative mb-5 h-[280px] overflow-hidden rounded-[8px]">
                  <img src={image} alt={`${card.title} before and after`} className="h-full w-full object-cover" />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-[76px] bg-[linear-gradient(to_bottom,transparent_0%,rgba(0,0,0,0.92)_55%,rgba(0,0,0,0.96)_100%)]" />
                  <div className="absolute bottom-0 left-0 z-[2] flex h-[76px] w-1/2 items-end px-[14px] pb-[13px]"><span className="text-[13px] font-extrabold uppercase tracking-[2.5px] text-white">Before</span></div>
                  <div className="absolute bottom-0 right-0 z-[2] flex h-[76px] w-1/2 items-end justify-end px-[14px] pb-[13px]"><span className="text-[13px] font-extrabold uppercase tracking-[2.5px] text-white">After</span></div>
                </div>
                <div className="flex flex-1 flex-col">
                  <h3 className="mb-3 font-serif text-[20px] font-bold text-[#1E2B43]">{card.title}</h3>
                  <div className="mb-3 flex flex-wrap gap-[10px]">
                    <span className="rounded-full bg-[rgba(188,145,85,0.1)] px-3 py-1 text-[12px] font-semibold tracking-[0.3px] text-[#9A7340]">{card.timeline}</span>
                    <span className="rounded-full bg-[rgba(188,145,85,0.1)] px-3 py-1 text-[12px] font-semibold tracking-[0.3px] text-[#9A7340]">{card.badge}</span>
                  </div>
                  <p className="text-[14px] leading-[1.75] text-[#5C677D]">{card.summary}</p>
                  <div className="mt-4 border-l-[3px] border-l-[#BC9155] pl-4 italic text-[#1E2B43]">
                    <p className="min-h-[72px] text-[14px] leading-[1.65] text-[#1E2B43]">&quot;{card.quote}&quot;</p>
                    <cite className="mt-2 block text-[12px] font-semibold not-italic text-[#5C677D]">- {card.attribution}</cite>
                  </div>
                  {linkNode(CARD_LINK_MAP[card.title] || card.link, <><span>View Case Study</span><ArrowRight className="h-[14px] w-[14px]" /></>, "mt-auto inline-flex items-center gap-[6px] pt-4 text-[14px] font-semibold text-[#BC9155] transition-all hover:gap-[10px]")}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function TrustStrip({ data }: { data?: TrustBarData }) {
  const items = data?.items ?? [];
  if (!items.length) return null;

  return (
    <div className="relative overflow-hidden bg-[linear-gradient(135deg,#1E2B43_0%,#151E30_100%)] px-5 py-14 md:px-10">
      <div className="absolute inset-0 bg-cover bg-center opacity-[0.06]" style={{ backgroundImage: "url(/portfolio/builtwell-job-site-aerial-ct.jpg)" }} />
      <div className="relative mx-auto flex max-w-[1200px] flex-wrap items-center justify-center">
        {items.map((item, index) => (
          <div key={`${item.label}-${index}`} className="contents">
            {linkNode(item.url || "#", <div className="flex min-w-[180px] flex-1 flex-col items-center gap-[10px] px-8 py-5 text-center text-[13px] font-semibold tracking-[0.4px] text-white/90 transition-all hover:-translate-y-0.5 hover:text-[#BC9155]"><span className="text-[#BC9155] [filter:drop-shadow(0_2px_4px_rgba(188,145,85,0.3))]">{trustIcon(item.icon)}</span><span>{item.label}</span></div>, "flex flex-1 justify-center")}
            {index < items.length - 1 ? <div className="hidden h-10 w-px bg-white/10 lg:block" /> : null}
          </div>
        ))}
      </div>
    </div>
  );
}

function ContactSection({ page, data }: { page: CMSPage; data?: LeadFormData }) {
  const [submitted, setSubmitted] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [contactMethod, setContactMethod] = useState("call");
  const [fileNames, setFileNames] = useState<string[]>([]);
  const [formValues, setFormValues] = useState<Record<string, string>>({});
  const titleParts = parts(data?.title, data?.title_highlight || "Remodeling Project");
  const images = (data?.images || []).map((item, index) => ({
    src: media(item.image, index === 0 ? "/portfolio/builtwell-team-client-arrival-ct.jpeg" : "/portfolio/builtwell-contractor-sign-consultation-ct-01.jpg"),
    alt: item.alt || "BuiltWell CT consultation",
  }));

  const fields = data?.fields || [];
  const getField = (name: string) => fields.find((field) => field.name === name);
  const servicesField = getField("services_needed");
  const bestTimeField = getField("best_time");
  const contactMethodField = getField("contact_method");
  const messageField = getField("message");
  const basicFields = ["name", "phone", "email", "zip"].map((name) => getField(name)).filter((field): field is LeadFormField => Boolean(field));
  const serviceOptions = opts(servicesField?.options);
  const bestTimeOptions = opts(bestTimeField?.options);
  const methodOptions = opts(contactMethodField?.options);

  return (
    <section id="contact" className="border-t border-[#1E2B43]/8 bg-[#F5F1E9] px-5 py-16 md:px-10 md:py-[72px]">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-8 text-center">
          <span className="mb-4 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[1.5px] text-[#9A7340]">
            <span className="h-[2px] w-[10px] bg-[#BC9155]" />
            {data?.eyebrow || "GET IN TOUCH"}
          </span>
          <h2 className="font-serif text-[clamp(30px,3vw,42px)] font-bold text-[#1E2B43]">
            {titleParts.before}
            {titleParts.accent ? <span className="text-[#BC9155]">{titleParts.accent}</span> : null}
            {titleParts.after}
          </h2>
          {data?.subtitle ? <p className="mx-auto mt-2 max-w-[600px] text-[16px] leading-[1.7] text-[#5C677D]">{data.subtitle}</p> : null}
        </div>
        <div className="grid items-stretch gap-8 md:grid-cols-[1fr_1.15fr]">
          <div className="hidden flex-col gap-3 md:flex">
            {images.map((image, index) => (
              <div key={`${image.src}-${index}`} className="relative min-h-0 flex-1 overflow-hidden rounded-[8px]">
                <img src={image.src} alt={image.alt} className="h-full w-full object-cover" />
              </div>
            ))}
          </div>
          <div className="flex flex-col rounded-[10px] border border-[#1E2B43]/8 bg-white px-5 py-8 shadow-[0_16px_48px_rgba(30,43,67,0.1),0_4px_12px_rgba(30,43,67,0.04)] md:px-9">
            {submitted ? (
              <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
                <CheckCircle2 className="h-12 w-12 text-[#BC9155]" />
                <h3 className="mt-4 font-serif text-[32px] font-bold text-[#1E2B43]">Thank You</h3>
                <p className="mt-3 max-w-[420px] text-[15px] leading-7 text-[#5C677D]">We received your request and will reach out within one business day.</p>
              </div>
            ) : (
              <form
                className="flex flex-1 flex-col"
                onSubmit={(event) => {
                  event.preventDefault();
                  setSubmitted(true);
                }}
              >
                <div className="grid gap-4 md:grid-cols-2">
                  {basicFields.map((field) => (
                    <div key={field.name}>
                      <label className="mb-1.5 block text-[13px] font-semibold uppercase tracking-[0.5px] text-[#1E2B43]">
                        {field.label}
                        {field.required ? " *" : ""}
                      </label>
                      <input
                        type={field.type}
                        name={field.name}
                        required={field.required}
                        value={formValues[field.name] || ""}
                        placeholder={field.placeholder}
                        onChange={(event) => setFormValues((current) => ({ ...current, [field.name]: event.target.value }))}
                        className="w-full rounded-[6px] border border-[#1E2B43]/15 bg-white px-[14px] py-3 text-[15px] text-[#1E2B43] outline-none transition-colors focus:border-[#BC9155]"
                      />
                    </div>
                  ))}
                </div>

                <div className="mt-4 grid gap-4 md:grid-cols-[1fr_1fr]">
                  {servicesField ? (
                    <div className="relative">
                      <label className="mb-1.5 block text-[13px] font-semibold uppercase tracking-[0.5px] text-[#1E2B43]">
                        {servicesField.label}
                        {servicesField.required ? " *" : ""}
                      </label>
                      <button type="button" className="flex w-full items-center justify-between rounded-[6px] border border-[#1E2B43]/15 px-[14px] py-3 text-left text-[15px] text-[#1E2B43] transition-colors hover:border-[#BC9155]" onClick={() => setServicesOpen((current) => !current)}>
                        <span className={selectedServices.length ? "text-[#1E2B43]" : "text-[#5C677D]"}>{selectedServices.length ? selectedServices.join(", ") : "Select services"}</span>
                        <ChevronDown className={cls("h-4 w-4 transition-transform", servicesOpen && "rotate-180")} />
                      </button>
                      <div className={cls("absolute left-0 right-0 top-[calc(100%+6px)] z-20 rounded-[6px] border border-[#1E2B43]/12 bg-white py-1 shadow-[0_8px_24px_rgba(0,0,0,0.12)]", servicesOpen ? "block" : "hidden")}>
                        {serviceOptions.map((option) => (
                          <label key={option.value} className="flex cursor-pointer items-center gap-2.5 px-3.5 py-2 text-[14px] text-[#1E2B43] transition-colors hover:bg-[#BC9155]/10">
                            <input type="checkbox" checked={selectedServices.includes(option.value)} onChange={() => setSelectedServices((current) => current.includes(option.value) ? current.filter((value) => value !== option.value) : [...current, option.value])} className="h-[18px] w-[18px] rounded-[3px] accent-[#BC9155]" />
                            {option.label}
                          </label>
                        ))}
                      </div>
                    </div>
                  ) : null}

                  {bestTimeField ? (
                    <div>
                      <label className="mb-1.5 block text-[13px] font-semibold uppercase tracking-[0.5px] text-[#1E2B43]">
                        {bestTimeField.label}
                        {bestTimeField.required ? " *" : ""}
                      </label>
                      <select required={bestTimeField.required} value={formValues[bestTimeField.name] || ""} onChange={(event) => setFormValues((current) => ({ ...current, [bestTimeField.name]: event.target.value }))} className="w-full rounded-[6px] border border-[#1E2B43]/15 bg-white px-[14px] py-3 text-[15px] text-[#1E2B43] outline-none transition-colors focus:border-[#BC9155]">
                        <option value="">Select a time</option>
                        {bestTimeOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
                      </select>
                    </div>
                  ) : null}
                </div>

                {methodOptions.length ? (
                  <fieldset className="mt-4">
                    <legend className="mb-1.5 block text-[13px] font-semibold uppercase tracking-[0.5px] text-[#1E2B43]">
                      {contactMethodField?.label || "Preferred Contact Method"}{contactMethodField?.required ? " *" : ""}
                    </legend>
                    <div className="flex flex-wrap gap-2.5">
                      {methodOptions.map((option) => (
                        <label key={option.value} className={cls("inline-flex cursor-pointer items-center justify-center rounded-[6px] border px-4 py-3 text-[13px] font-medium transition-colors", contactMethod === option.value ? "border-[#BC9155] bg-[#BC9155]/10 text-[#BC9155]" : "border-[#1E2B43]/12 bg-white text-[#1E2B43]")}>
                          <input type="radio" className="sr-only" name={contactMethodField?.name || "contact_method"} value={option.value} checked={contactMethod === option.value} onChange={() => setContactMethod(option.value)} />
                          <span>{option.label}</span>
                        </label>
                      ))}
                    </div>
                  </fieldset>
                ) : null}

                {messageField ? (
                  <div className="mt-4">
                    <label className="mb-1.5 block text-[13px] font-semibold uppercase tracking-[0.5px] text-[#1E2B43]">{messageField.label}</label>
                    <textarea rows={4} value={formValues[messageField.name] || ""} placeholder={messageField.placeholder} onChange={(event) => setFormValues((current) => ({ ...current, [messageField.name]: event.target.value }))} className="w-full rounded-[6px] border border-[#1E2B43]/15 px-[14px] py-3 text-[15px] text-[#1E2B43] outline-none transition-colors focus:border-[#BC9155]" />
                  </div>
                ) : null}

                <div className="mt-5 grid gap-4 border-t border-[#1E2B43]/8 pt-5 md:grid-cols-[1fr_auto]">
                  <div>
                    <label className="inline-flex cursor-pointer items-center gap-2 rounded-[6px] border border-[#1E2B43]/15 px-4 py-3 text-[15px] font-semibold text-[#1E2B43] transition-colors hover:border-[#BC9155]" htmlFor={`${page.slug}-case-files`}>
                      <Upload className="h-4 w-4" />
                      Upload Photos
                    </label>
                    <input id={`${page.slug}-case-files`} type="file" multiple accept="image/jpeg,image/png,image/heic,.heic" className="hidden" onChange={(event) => setFileNames(Array.from(event.target.files || []).map((file) => file.name))} />
                    {fileNames.length ? <p className="mt-1.5 text-[12px] text-[#5C677D]">{fileNames.join(", ")}</p> : null}
                  </div>
                  <button type="submit" className="min-h-[52px] rounded-[6px] bg-[#BC9155] px-8 py-3 text-[15px] font-semibold text-white transition-colors hover:bg-[#A57D48]">{data?.submit_label || "Send Request"}</button>
                </div>
                {data?.consent_text ? <p className="mt-4 text-[13px] italic text-[#5C677D]">{data.consent_text}</p> : null}
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function FinancingBand({ data }: { data?: RichTextData }) {
  if (!data) return null;

  return (
    <div className="border-t border-[#1E2B43]/8 bg-white px-5 py-14 md:px-10">
      <div className="mx-auto flex max-w-[1200px] flex-col items-center gap-6 text-center">
        <div className="flex flex-col items-center gap-4 md:flex-row md:text-left">
          <div className="text-[24px] font-bold tracking-[-0.3px]"><span className="text-[#6BBF4E]">Green</span><span className="text-[#1E2B43]">Sky</span></div>
          <p className="max-w-[760px] text-[16px] leading-[1.6] text-[#5C677D]"><strong className="text-[#1E2B43]">{data.title}.</strong> {data.content}</p>
        </div>
        {data.cta?.url ? linkNode(data.cta.url, <><span>{data.cta.label || "Check Financing Options"}</span><ArrowRight className="h-4 w-4" /></>, "inline-flex min-h-[52px] min-w-[280px] items-center justify-center gap-[10px] rounded-[8px] bg-[#BC9155] px-8 py-3 text-[15px] font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-[#A57D48] hover:shadow-[0_4px_12px_rgba(188,145,85,0.3)]") : null}
      </div>
    </div>
  );
}

export function CaseStudiesPageTemplate({ page }: { page: CMSPage }) {
  const caseStudiesPage = page as CaseStudiesPage;
  const phones = caseStudiesPage.phones?.items || [];
  const hero = section<HeroData>(page, "hero");
  const trustBars = sections<TrustBarData>(page, "trust_bar");
  const rich = sections<RichTextData>(page, "rich_text");
  const lead = section<LeadFormData>(page, "lead_form");
  const statsBar = trustBars.find((item) => item.variant === "stats") || trustBars[0];
  const linkStrip = trustBars.find((item) => item.variant === "link_strip") || trustBars[1];
  const financing = rich.find((item) => item.style_variant === "financing_strip");
  const contentBlocks = rich.filter((item) => item.style_variant !== "financing_strip");
  const intro = contentBlocks[0];
  const cards = contentBlocks.slice(1).map(parseCaseStudy);

  return (
    <div className="bg-white text-[#1E2B43]">
      <main>
        <HeroSection hero={hero} phones={phones} />
        <StatsBar data={statsBar} />
        <IntroSection data={intro} />
        <CaseStudyGrid cards={cards} />
        <TrustStrip data={linkStrip} />
        <ContactSection page={page} data={lead} />
        <FinancingBand data={financing} />
      </main>
    </div>
  );
}

export default CaseStudiesPageTemplate;

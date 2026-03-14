"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, CalendarDays, Check, ChevronDown, FileText, Hammer, Shield, ShieldCheck, Star, Upload } from "lucide-react";
import type { CMSPage } from "@/types/cms";

type RichTextData = {
  eyebrow?: string | null;
  title?: string | null;
  highlight_text?: string | null;
  content?: string | null;
  style_variant?: string | null;
  surface?: string | null;
  cta?: { label?: string; url?: string } | null;
};

const FALLBACK_MEDIA: Record<string, string> = {
  "/hero/builtwell-team-van-consultation-hero-ct.jpg": "/portfolio/builtwell-team-client-arrival-ct.jpeg",
  "/team/builtwell-owner-handshake-client-ct-02.jpg": "/portfolio/builtwell-contractor-sign-consultation-ct-01.jpg",
  "/hero/builtwell-job-site-aerial-hero-ct.jpg": "/portfolio/builtwell-job-site-aerial-ct.jpg",
};

const cls = (...values: Array<string | false | null | undefined>) => values.filter(Boolean).join(" ");
const section = <T,>(page: CMSPage, type: string) => page.sections.find((entry) => entry.is_active && entry.type === type)?.data as T | undefined;
const sections = <T,>(page: CMSPage, type: string) => page.sections.filter((entry) => entry.is_active && entry.type === type).map((entry) => entry.data as T);
const media = (value?: string | null, fallback = "") => FALLBACK_MEDIA[value || ""] || value || fallback;
const paras = (value?: string | null) => (value || "").replace(/\r/g, "").split(/\n{2,}/).map((item) => item.trim()).filter(Boolean);
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
  return /^https?:\/\//i.test(href) || href.startsWith("tel:") ? (
    <a href={href} className={className} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noreferrer" : undefined}>{children}</a>
  ) : (
    <Link href={href} className={className}>{children}</Link>
  );
}

function iconNode(icon?: string | null, className = "h-5 w-5") {
  switch (icon) {
    case "star":
      return <Star className={className} />;
    case "shield":
      return <Shield className={className} />;
    case "shield-check":
      return <ShieldCheck className={className} />;
    case "calendar":
    case "clock":
      return <CalendarDays className={className} />;
    case "hammer":
      return <Hammer className={className} />;
    case "file-text":
      return <FileText className={className} />;
    default:
      return <Check className={className} />;
  }
}

export function KitchenRemodelingPageTemplate({ page }: { page: CMSPage }) {
  const hero = section<any>(page, "service_hero");
  const trustBars = sections<any>(page, "trust_bar");
  const overview = sections<RichTextData>(page, "rich_text").find((item) => item.title?.includes("Full-Service Kitchen Remodeling"));
  const localExpertise = sections<RichTextData>(page, "rich_text").find((item) => item.title?.includes("Local Expertise"));
  const financing = sections<RichTextData>(page, "rich_text").find((item) => item.style_variant === "financing_strip");
  const intro = section<any>(page, "service_intro_split");
  const caseStudies = section<any>(page, "before_after_grid");
  const pricing = section<any>(page, "pricing_table");
  const process = section<any>(page, "process_steps");
  const timeline = section<any>(page, "feature_grid");
  const areas = section<any>(page, "areas_served");
  const faq = section<any>(page, "faq_list");
  const brands = section<any>(page, "logo_strip");
  const lead = section<any>(page, "lead_form");
  const related = section<any>(page, "project_highlights");
  const heroStats = trustBars[0];
  const trustStrip = trustBars[1];
  const heroParts = parts(hero?.title, "Connecticut");
  const overviewParts = parts(overview?.title, overview?.highlight_text || "Across Connecticut");
  const introParts = parts(intro?.title, "Kitchen Remodel");
  const pricingParts = parts(pricing?.title, "Connecticut");
  const localParts = parts(localExpertise?.title, localExpertise?.highlight_text || "Local Expertise");
  const areasParts = parts(areas?.title, areas?.highlight_text || "Two Counties");
  const leadParts = parts(lead?.title, lead?.title_highlight || "Remodeling Project");

  const [activeStep, setActiveStep] = useState(0);
  const [countyOpen, setCountyOpen] = useState<Record<number, boolean>>({});
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
  const counties = areas?.counties || [];

  return (
    <div className="bg-[#f5f1e9] text-[#1e2b43]">
      <section className="relative isolate min-h-[560px] overflow-hidden bg-[#151e30] px-5 pb-16 pt-[82px] text-white md:px-10">
        <div className="absolute inset-0 bg-cover bg-center opacity-75" style={{ backgroundImage: `url(${media(hero?.background_image, "/images/headers/kitchen-remodeling-header.jpg")})` }} />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,18,31,0.22)_0%,rgba(15,23,39,0.35)_34%,rgba(19,31,52,0.82)_100%)]" />
        <div className="relative z-10 mx-auto flex min-h-[440px] max-w-[1240px] flex-col items-center justify-center text-center">
          <ol className="mb-6 flex list-none items-center justify-center text-[12px] font-semibold text-white/90">
            <li>{linkNode("/", "Home", "hover:text-[#bc9155]")}</li>
            <li className="before:px-2.5 before:text-[#bc9155] before:content-['›']">{linkNode("/services/", "Services", "hover:text-[#bc9155]")}</li>
            <li className="before:px-2.5 before:text-[#bc9155] before:content-['›']"><span className="text-white">Kitchen Remodeling</span></li>
          </ol>
          <div className="max-w-[860px]">
            <h1 className="text-[clamp(42px,5.3vw,68px)] font-bold leading-[0.98] tracking-[-0.03em]">
              <span className="text-white">{heroParts.before}</span>
              {heroParts.accent ? <span className="text-[#bc9155]">{heroParts.accent}</span> : null}
              <span className="text-white">{heroParts.after}</span>
            </h1>
            {hero?.subtitle ? <p className="mx-auto mt-5 max-w-[680px] text-[17px] leading-[1.7] text-white/85">{hero.subtitle}</p> : null}
            <div className="mt-8 flex flex-col items-center gap-3 md:flex-row md:flex-wrap md:justify-center">
              {counties.slice(0, 2).map((county: any) => linkNode(`tel:${(county.phone || "").replace(/\D/g, "")}`, <span className="flex flex-col items-start text-left"><span className="text-[11px] uppercase tracking-[0.18em] text-white/70">{county.name}</span><span className="text-[15px] font-semibold text-white">{county.phone}</span></span>, "min-w-[145px] rounded-[8px] border border-white/20 bg-white/10 px-5 py-3 backdrop-blur-sm transition-colors hover:border-[#bc9155] hover:bg-white/14"))}
              {hero?.primary_cta?.url ? linkNode(hero.primary_cta.url, <span className="flex flex-col items-start text-left"><span className="text-[11px] uppercase tracking-[0.18em] text-white/70">{hero.primary_cta.label}</span><span className="text-[15px] font-semibold text-white">Schedule Now</span></span>, "min-w-[145px] rounded-[8px] bg-[#bc9155] px-5 py-3 transition-colors hover:bg-[#a57d48]") : null}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#1d283f]">
        <div className="mx-auto grid max-w-full gap-px bg-white/10 md:grid-cols-4">
          {(heroStats?.items || []).map((item: any, index: number) => (
            <div key={`${item.label}-${index}`} className="flex min-h-[118px] flex-col items-center justify-center bg-[#1d283f] px-5 text-center">
              <div className="text-[34px] font-bold text-[#bc9155]">{item.value || <span className="inline-flex rounded-full border border-[#bc9155] p-2 text-[#bc9155]">{iconNode(item.icon, "h-5 w-5")}</span>}</div>
              <div className="mt-2 text-[13px] font-semibold uppercase tracking-[0.12em] text-white/75">{item.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white px-5 py-20 md:px-10">
        <div className="mx-auto max-w-[1020px] text-center">
          {label(overview?.eyebrow)}
          <h2 className="text-[clamp(34px,3.8vw,48px)] font-bold tracking-[-0.02em]">{overviewParts.before}{overviewParts.accent ? <span className="text-[#bc9155]">{overviewParts.accent}</span> : null}{overviewParts.after}</h2>
          <div className="mt-6 space-y-5 text-[16px] leading-[1.85] text-[#5c677d]">
            {paras(overview?.content).map((paragraph) => <p key={paragraph.slice(0, 30)}>{paragraph}</p>)}
          </div>
        </div>
      </section>

      <section className="bg-[#f5f1e9] px-5 py-20 md:px-10">
        <div className="mx-auto max-w-[1240px]">
          <div className="mb-12 text-center">
            {label("Scope of Work")}
            <h2 className="text-[clamp(34px,3.8vw,48px)] font-bold tracking-[-0.02em]">{introParts.before}{introParts.accent ? <span className="text-[#bc9155]">{introParts.accent}</span> : null}{introParts.after}</h2>
          </div>
          <div className="grid gap-10 lg:grid-cols-[520px_minmax(0,1fr)] lg:items-start">
            <div className="grid gap-4">
              <div className="overflow-hidden rounded-[12px] shadow-[0_20px_50px_rgba(30,43,67,0.12)]"><img src={media(intro?.image_main, "/images/services/service-kitchen.jpg")} alt="Kitchen remodel" className="h-[300px] w-full object-cover" /></div>
              <div className="overflow-hidden rounded-[12px] shadow-[0_20px_50px_rgba(30,43,67,0.12)]"><img src={media(intro?.image_secondary, "/portfolio/builtwell-contractor-sign-consultation-ct-01.jpg")} alt="Kitchen consultation" className="h-[300px] w-full object-cover" /></div>
            </div>
            <div>
              <div className="space-y-4 text-[15px] leading-[1.8] text-[#5c677d]">
                {paras(intro?.content).map((paragraph) => <p key={paragraph.slice(0, 30)}>{paragraph}</p>)}
              </div>
              <div className="mt-10 grid gap-4 md:grid-cols-2">
                {(intro?.bullet_points || []).map((item: any, index: number) => (
                  <article key={`${item.text}-${index}`} className="rounded-[10px] border border-[#e2d9ca] bg-white p-5 shadow-[0_10px_28px_rgba(30,43,67,0.05)]">
                    <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#bc915514] text-[#bc9155]"><Check className="h-5 w-5" /></div>
                    <h3 className="text-[19px] font-bold">{item.text}</h3>
                    <p className="mt-2 text-[14px] leading-[1.7] text-[#5c677d]">Included as part of a full-scope kitchen remodeling project when needed for your layout, selections, and final finish.</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-20 md:px-10">
        <div className="mx-auto max-w-[1240px]">
          <div className="mb-12 text-center">
            {label("Recent Work")}
            <h2 className="text-[clamp(34px,3.8vw,48px)] font-bold tracking-[-0.02em]">Recent Kitchen <span className="text-[#bc9155]">Remodeling Projects</span></h2>
            {caseStudies?.subtitle ? <p className="mx-auto mt-3 max-w-[680px] text-[15px] leading-[1.8] text-[#5c677d]">{caseStudies.subtitle}</p> : null}
          </div>
          <div className="grid gap-7 lg:grid-cols-3">
            {(caseStudies?.projects || []).map((project: any, index: number) => (
              <article key={`${project.location}-${index}`} className="overflow-hidden rounded-[12px] border border-[#e6dece] bg-[#fdfcfa] shadow-[0_14px_32px_rgba(30,43,67,0.08)]">
                <div className="relative grid h-[240px] grid-cols-2 overflow-hidden">
                  <img src={media(project.before_image, "/images/before-after/kitchen-before-after-1.jpg")} alt={`${project.location} before`} className="h-full w-full object-cover" />
                  <img src={media(project.after_image, "/images/before-after/kitchen-before-after-1.png")} alt={`${project.location} after`} className="h-full w-full object-cover" />
                  <span className="absolute left-3 top-3 rounded-full bg-[#1e2b43] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-white">Before</span>
                  <span className="absolute right-3 top-3 rounded-full bg-[#bc9155] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-white">After</span>
                </div>
                <div className="p-6">
                  <h3 className="text-[24px] font-bold">{project.location}</h3>
                  <p className="mt-3 text-[14px] leading-[1.78] text-[#5c677d]">{project.description}</p>
                  {project.testimonial_quote ? <p className="mt-5 rounded-[10px] bg-white px-4 py-4 text-[14px] italic leading-[1.75] text-[#1e2b43] shadow-[inset_0_0_0_1px_rgba(30,43,67,0.06)]">{project.testimonial_quote}</p> : null}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f5f1e9] px-5 py-20 md:px-10">
        <div className="mx-auto max-w-[980px]">
          <div className="mb-10 text-center">
            {label("Investment")}
            <h2 className="text-[clamp(34px,3.8vw,48px)] font-bold tracking-[-0.02em]">{pricingParts.before}{pricingParts.accent ? <span className="text-[#bc9155]">{pricingParts.accent}</span> : null}{pricingParts.after}</h2>
            {pricing?.subtitle ? <p className="mx-auto mt-3 max-w-[760px] text-[15px] leading-[1.8] text-[#5c677d]">{pricing.subtitle}</p> : null}
          </div>
          <div className="overflow-hidden rounded-[12px] border border-[#ddd2bf] bg-white shadow-[0_16px_36px_rgba(30,43,67,0.07)]">
            <table className="w-full border-collapse text-left">
              <thead className="bg-[#1e2b43] text-white">
                <tr>{(pricing?.columns || []).map((column: string) => <th key={column} className="px-5 py-4 text-[13px] uppercase tracking-[0.14em]">{column}</th>)}</tr>
              </thead>
              <tbody>
                {(pricing?.rows || []).map((row: any, index: number) => (
                  <tr key={`${row.label}-${index}`} className="border-t border-[#ece4d4] align-top">
                    <td className="px-5 py-4 text-[15px] font-semibold">{row.label}</td>
                    <td className="px-5 py-4 text-[15px] font-semibold text-[#bc9155]">{row.price}</td>
                    <td className="px-5 py-4 text-[14px] leading-[1.7] text-[#5c677d]">{row.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-5 text-center text-[13px] italic text-[#5c677d]">All prices include labor and materials. Final cost depends on scope, selections, and site conditions.</p>
        </div>
      </section>

      <section className="bg-[#1c263b] px-5 py-20 text-white md:px-10">
        <div className="mx-auto max-w-[1080px]">
          <div className="mb-10 text-center">
            {label(localExpertise?.eyebrow, true)}
            <h2 className="text-[clamp(34px,3.8vw,48px)] font-bold tracking-[-0.02em]">{localParts.before}{localParts.accent ? <span className="text-[#bc9155]">{localParts.accent}</span> : null}{localParts.after}</h2>
          </div>
          <div className="space-y-5 text-[15px] leading-[1.9] text-white/72">
            {paras(localExpertise?.content).map((paragraph) => <p key={paragraph.slice(0, 30)}>{paragraph}</p>)}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#142033] px-5 py-20 text-white md:px-10">
        <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: `url(${media("/hero/builtwell-job-site-aerial-hero-ct.jpg")})` }} />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(15,23,39,0.95)_0%,rgba(29,41,65,0.88)_100%)]" />
        <div className="relative z-10 mx-auto max-w-[1240px]">
          <div className="mb-10 text-center">
            {label("Our Process", true)}
            <h2 className="text-[clamp(34px,3.8vw,48px)] font-bold tracking-[-0.02em]">Our Kitchen <span className="text-[#bc9155]">Remodeling Process</span></h2>
            {process?.subtitle ? <p className="mx-auto mt-3 max-w-[760px] text-[15px] leading-[1.8] text-white/72">{process.subtitle}</p> : null}
          </div>
          <div className="grid gap-4 xl:grid-cols-6">
            {(process?.steps || []).map((item: any, index: number) => {
              const active = activeStep === index;
              return (
                <button key={`${item.title}-${index}`} type="button" onClick={() => setActiveStep(index)} className={cls("rounded-[12px] border px-5 py-6 text-left transition-all xl:min-h-[250px]", active ? "border-[#bc9155] bg-[#bc91551c]" : "border-white/10 bg-white/5 hover:border-[#bc915555]")}>
                  <div className={cls("mb-4 flex h-12 w-12 items-center justify-center rounded-full border-2 text-[18px] font-bold", active ? "border-[#bc9155] bg-[#bc91551c] text-[#f0d9b6]" : "border-white/20 text-white")}>{index + 1}</div>
                  <h3 className="text-[20px] font-bold text-white">{item.title}</h3>
                  <p className="mt-2 text-[13px] font-semibold uppercase tracking-[0.14em] text-[#bc9155]">{item.short}</p>
                  <p className="mt-4 text-[14px] leading-[1.72] text-white/72">{item.description}</p>
                </button>
              );
            })}
            <div className="rounded-[12px] border border-[#bc915555] bg-[#bc91551a] px-5 py-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#bc9155] text-white"><ArrowRight className="h-5 w-5" /></div>
              <h3 className="text-[20px] font-bold">Get Started</h3>
              <p className="mt-4 text-[14px] leading-[1.72] text-white/72">Ready to begin? Schedule your free consultation today.</p>
              {linkNode("#contact", "Free Consultation", "mt-6 inline-flex rounded-[8px] bg-[#bc9155] px-4 py-3 text-[13px] font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-[#a57d48]")}
            </div>
          </div>
          <p className="mt-6 text-center text-[13px] text-white/45">Click any step to learn more</p>
        </div>
      </section>

      <section className="bg-[#f5f1e9] px-5 py-20 md:px-10">
        <div className="mx-auto max-w-[1240px]">
          <div className="mb-10 text-center">
            {label("Timeline")}
            <h2 className="text-[clamp(34px,3.8vw,48px)] font-bold tracking-[-0.02em]">Project <span className="text-[#bc9155]">Timeline</span></h2>
            {timeline?.subtitle ? <p className="mx-auto mt-3 max-w-[680px] text-[15px] leading-[1.8] text-[#5c677d]">{timeline.subtitle}</p> : null}
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {(timeline?.items || []).map((item: any, index: number) => (
              <article key={`${item.title}-${index}`} className="rounded-[12px] border border-[#e4d9c8] bg-white p-6 shadow-[0_12px_26px_rgba(30,43,67,0.06)]">
                <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#bc9155]">Phase {index + 1}</div>
                <h3 className="text-[22px] font-bold">{item.title.replace(/^Phase \d:\s*/, "")}</h3>
                <div className="mt-3 inline-flex rounded-full bg-[#bc915512] px-3 py-1 text-[12px] font-semibold text-[#bc9155]">{item.description.split(".")[0]}</div>
                <p className="mt-4 text-[14px] leading-[1.75] text-[#5c677d]">{item.description}</p>
              </article>
            ))}
          </div>
          <p className="mt-5 text-center text-[13px] italic text-[#5c677d]">Timelines vary based on project scope, material lead times, and permit requirements.</p>
        </div>
      </section>

      <section className="bg-white px-5 py-20 md:px-10">
        <div className="mx-auto max-w-[1240px]">
          <div className="mb-10 text-center">
            {label(areas?.eyebrow)}
            <h2 className="text-[clamp(34px,3.8vw,48px)] font-bold tracking-[-0.02em]">{areasParts.before}{areasParts.accent ? <span className="text-[#bc9155]">{areasParts.accent}</span> : null}{areasParts.after}</h2>
            {areas?.subtitle ? <p className="mx-auto mt-3 max-w-[720px] text-[15px] leading-[1.8] text-[#5c677d]">{areas.subtitle}</p> : null}
          </div>
          <div className="grid gap-8 lg:grid-cols-2">
            {counties.map((county: any, index: number) => {
              const expanded = !!countyOpen[index];
              const towns = expanded ? [...(county.towns || []), ...(county.extra_towns || [])] : county.towns || [];
              const links = county.town_links || {};
              return (
                <article key={`${county.name}-${index}`} className="overflow-hidden rounded-[12px] border border-[#e6ddcd] bg-[#fdfcfa] shadow-[0_14px_32px_rgba(30,43,67,0.07)]">
                  <div className="relative h-[230px] overflow-hidden">
                    <img src={media(county.image, index === 0 ? "/images/areas/fairfield-county.jpg" : "/images/areas/new-haven-county.jpg")} alt={county.name} className={cls("h-full w-full object-cover", index === 1 && "object-top")} />
                    <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#1e2b4370] to-transparent" />
                  </div>
                  <div className="p-7">
                    <h3 className="text-[28px] font-bold">{county.name}</h3>
                    <p className="mt-1 text-[15px] text-[#5c677d]">Call: {linkNode(`tel:${(county.phone || "").replace(/\D/g, "")}`, county.phone, "font-semibold text-[#bc9155] hover:underline")}</p>
                    <p className="mt-4 text-[14px] leading-[1.78] text-[#5c677d]">{county.description}</p>
                    <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
                      {towns.map((town: string) => linkNode(links[town] || county.url || "#", town, "rounded-full bg-[#f5f1e9] px-3 py-2 text-center text-[11px] font-semibold text-[#1e2b43] transition-colors hover:bg-[#bc9155] hover:text-white"))}
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

      <section className="bg-[#f5f1e9] px-5 py-20 md:px-10">
        <div className="mx-auto max-w-[980px]">
          <div className="mb-10 text-center">
            {label("FAQ")}
            <h2 className="text-[clamp(34px,3.8vw,48px)] font-bold tracking-[-0.02em]">Kitchen Remodeling <span className="text-[#bc9155]">Questions</span></h2>
          </div>
          <div className="overflow-hidden rounded-[12px] border border-[#e2d7c6] bg-white shadow-[0_16px_36px_rgba(30,43,67,0.06)]">
            {(faq?.items || []).map((item: any, index: number) => (
              <details key={`${item.question}-${index}`} className="group border-t border-[#eee6d7] first:border-t-0">
                <summary className="cursor-pointer list-none px-6 py-5 text-[18px] font-semibold text-[#1e2b43] marker:hidden">{item.question}</summary>
                <div className="px-6 pb-6 text-[15px] leading-[1.8] text-[#5c677d]">{item.answer}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <div className="relative overflow-hidden bg-[linear-gradient(135deg,#1a2438_0%,#1e2b43_50%,#151e30_100%)] px-5 py-12 md:px-10 md:py-14">
        <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-center">
          {(trustStrip?.items || []).map((item: any, index: number) => (
            <div key={`${item.label}-${index}`} className="contents">
              {linkNode(item.url || "#", <div className="flex min-w-[180px] flex-1 flex-col items-center gap-3 px-8 py-5 text-center text-[13px] font-semibold tracking-[0.03em] text-white/90 transition-all hover:text-[#bc9155]"><span className="text-[#bc9155]">{iconNode(item.icon)}</span><span>{[item.label, item.value].filter(Boolean).join(" ")}</span></div>, "flex flex-1 justify-center")}
              {index < (trustStrip?.items || []).length - 1 ? <div className="hidden h-10 w-px bg-white/10 lg:block" /> : null}
            </div>
          ))}
        </div>
      </div>

      <section className="bg-white px-5 py-20 md:px-10">
        <div className="mx-auto max-w-[1240px] text-center">
          {label("Trusted Brands")}
          <h2 className="text-[clamp(34px,3.8vw,48px)] font-bold tracking-[-0.02em]">Materials We <span className="text-[#bc9155]">Stand Behind</span></h2>
          {brands?.subtitle ? <p className="mx-auto mt-3 max-w-[720px] text-[15px] leading-[1.8] text-[#5c677d]">{brands.subtitle}</p> : null}
          <div className="mt-10 grid items-center gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {(brands?.items || []).map((item: any, index: number) => (
              <a key={`${item.name}-${index}`} href={item.url || "#"} target="_blank" rel="noreferrer" className="flex min-h-[96px] items-center justify-center rounded-[12px] border border-[#ebe2d2] bg-[#fbfaf8] px-6 py-5 transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_32px_rgba(30,43,67,0.08)]">
                <img src={media(item.logo, "/images/brands/kraftmaid.svg")} alt={item.name} className="max-h-10 w-auto object-contain opacity-90" />
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f5f1e9] px-5 py-20 md:px-10" id="contact">
        <div className="mx-auto max-w-[1200px]">
          <div className="mb-8 text-center">
            {label(lead?.eyebrow)}
            <h2 className="text-[clamp(34px,3.8vw,48px)] font-bold tracking-[-0.02em]">{leadParts.before}{leadParts.accent ? <span className="text-[#bc9155]">{leadParts.accent}</span> : null}{leadParts.after}</h2>
            {lead?.subtitle ? <p className="mx-auto mt-3 max-w-[620px] text-[15px] leading-[1.8] text-[#5c677d]">{lead.subtitle}</p> : null}
          </div>
          <div className="grid gap-8 lg:grid-cols-[1fr_1.08fr]">
            <div className="grid gap-3">
              {(lead?.images || []).slice(0, 2).map((image: any, index: number) => <div key={`${image.alt}-${index}`} className="overflow-hidden rounded-[10px] shadow-[0_16px_38px_rgba(30,43,67,0.1)]"><img src={media(image.image, index === 0 ? "/portfolio/builtwell-team-client-arrival-ct.jpeg" : "/portfolio/builtwell-contractor-sign-consultation-ct-01.jpg")} alt={image.alt} className="h-[270px] w-full object-cover" /></div>)}
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
                  <div><label className="flex min-h-[52px] cursor-pointer items-center justify-center gap-2 rounded-[8px] border border-[#1e2b4326] px-5 py-3 text-[15px] font-semibold text-[#1e2b43] transition-colors hover:border-[#bc9155]" htmlFor="kitchen-lead-files"><Upload className="h-4 w-4" />Upload Photos</label><input id="kitchen-lead-files" type="file" multiple accept="image/jpeg,image/png,image/heic,.heic" className="hidden" onChange={(event) => setFileNames(Array.from(event.target.files || []).map((file) => file.name))} />{fileNames.length ? <p className="mt-2 text-[12px] text-[#5c677d]">{fileNames.join(", ")}</p> : null}</div>
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
            {label(related?.eyebrow || "Related Services")}
            <h2 className="text-[clamp(34px,3.8vw,48px)] font-bold tracking-[-0.02em]">You May Also <span className="text-[#bc9155]">Need</span></h2>
            <p className="mx-auto mt-3 max-w-[640px] text-[15px] leading-[1.8] text-[#5c677d]">Many kitchen remodeling projects include or lead to these related services.</p>
          </div>
          <div className="grid gap-7 lg:grid-cols-3">
            {(related?.items || []).map((item: any, index: number) => (
              <article key={`${item.title}-${index}`} className="overflow-hidden rounded-[12px] border border-[#e5dac8] bg-white shadow-[0_14px_32px_rgba(30,43,67,0.06)]">
                <div className="h-[220px] overflow-hidden"><img src={media(item.image, "/services/bathroom-remodeling-ct.jpg")} alt={item.title} className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" /></div>
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

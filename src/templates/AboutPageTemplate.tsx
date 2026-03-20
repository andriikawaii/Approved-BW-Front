"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowRight, CalendarDays, Check, ChevronDown, FileText, Shield, ShieldCheck, Star, Upload, Users } from "lucide-react";
import type { CMSPage, CMSSection } from "@/types/cms";

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
  "/services/builtwell-team-contractors-ct-05.png": "/portfolio/builtwell-team-contractors-ct-03.png",
};

const cls = (...values: Array<string | false | null | undefined>) => values.filter(Boolean).join(" ");
const section = <T,>(page: CMSPage, type: string) => page.sections.find((entry) => entry.is_active && entry.type === type)?.data as T | undefined;
const richTexts = (page: CMSPage) => page.sections.filter((entry) => entry.is_active && entry.type === "rich_text").map((entry) => entry.data as RichTextData);
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
    <span className={cls("relative mb-4 inline-block pl-5 text-[13px] font-bold uppercase tracking-[0.1em]", dark ? "text-[#9a7340]" : "text-[#9a7340]")}>
      <span className={cls("absolute left-0 top-1/2 h-[2px] w-[10px] -translate-y-1/2", dark ? "bg-[#bc9155]" : "bg-[#bc9155]")} />
      {text}
    </span>
  );
}

function FadeUp({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) { setReducedMotion(true); setVisible(true); return; }

    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.unobserve(el); } },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={reducedMotion ? undefined : {
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(30px)",
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function linkNode(href: string, children: React.ReactNode, className?: string) {
  return /^https?:\/\//i.test(href) ? (
    <a href={href} className={className} target="_blank" rel="noreferrer">{children}</a>
  ) : (
    <Link href={href} className={className}>{children}</Link>
  );
}

export function AboutPageTemplate({ page }: { page: CMSPage }) {
  const hero = section<any>(page, "page_hero");
  const intro = section<any>(page, "image_text_split");
  const team = section<any>(page, "team_members");
  const process = section<any>(page, "process_steps");
  const features = section<any>(page, "feature_grid");
  const areas = section<any>(page, "areas_served");
  const trust = section<any>(page, "trust_bar");
  const lead = section<any>(page, "lead_form");
  const [activeStep, setActiveStep] = useState(0);
  const [bioOpen, setBioOpen] = useState<Record<number, boolean>>({});
  const [countyOpen, setCountyOpen] = useState<Record<number, boolean>>({});
  const [serviceOpen, setServiceOpen] = useState(false);
  const [pickedServices, setPickedServices] = useState<string[]>([]);
  const [formValues, setFormValues] = useState<Record<string, string>>({ contact_method: "call" });
  const [fileNames, setFileNames] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const [licensed, financing] = (() => {
    const items = richTexts(page);
    return [items.find((item) => item.style_variant !== "financing_strip"), items.find((item) => item.style_variant === "financing_strip")];
  })();

  const heroParts = parts(hero?.title, "Home Remodeling Team");
  const licensedParts = parts(licensed?.title, "Insured");
  const areaParts = parts(areas?.title, areas?.highlight_text || "New Haven");
  const leadParts = parts(lead?.title, lead?.title_highlight || "Project");

  const fields = lead?.fields || [];
  const topFields = fields.filter((field: any) => !["checkbox_group", "radio_group", "textarea", "file"].includes(field.type));
  const servicesField = fields.find((field: any) => field.type === "checkbox_group");
  const timeField = fields.find((field: any) => field.name === "best_time" || field.type === "select");
  const contactField = fields.find((field: any) => field.type === "radio_group");
  const messageField = fields.find((field: any) => field.type === "textarea");

  return (
    <div className="bg-[#f5f1e9] text-[#1e2b43]">
      <section className="relative isolate flex min-h-[50vh] items-stretch overflow-hidden bg-[#151e30] px-5 pb-12 pt-[60px] text-white md:px-10">
        <div className="absolute inset-0 bg-cover bg-[center_15%] opacity-[0.72]" style={{ backgroundImage: `url(${media(hero?.background_image, "/images/hero/hero-carousel-2.jpg")})` }} />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_97%_97%,rgba(21,30,48,1)_0%,rgba(21,30,48,0.9)_8%,transparent_30%),radial-gradient(ellipse_at_3%_97%,rgba(21,30,48,0.9)_0%,transparent_25%),linear-gradient(180deg,rgba(21,30,48,0.35)_0%,rgba(21,30,48,0.2)_30%,rgba(21,30,48,0.45)_65%,rgba(21,30,48,0.92)_100%)]" />
        <div className="relative z-10 mx-auto flex w-full max-w-[1240px] flex-col items-center justify-center text-center">
          {hero?.badge ? <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#bc91554d] bg-[#bc915526] px-[22px] py-2.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#bc9155]"><span className="h-1.5 w-1.5 rounded-full bg-[#bc9155]" />{hero.badge}</div> : null}
          <ol className="mb-5 flex list-none items-center text-[13px] font-medium text-white/92 [text-shadow:0_1px_6px_rgba(0,0,0,0.7)]">
            <li className="flex items-center">{linkNode("/", "Home", "text-white/85 transition-colors hover:text-[#bc9155]")}</li>
            <li className="flex items-center before:mx-2.5 before:text-[12px] before:text-[#bc9155] before:content-['›']"><span className="font-semibold text-white">About</span></li>
          </ol>
          <h1 className="max-w-[980px] text-[clamp(40px,4.5vw,56px)] font-bold leading-[1.08] tracking-[-0.5px] text-white [text-shadow:0_2px_20px_rgba(0,0,0,0.5)]">
            {heroParts.before}{heroParts.accent ? <span className="text-[#bc9155]">{heroParts.accent}</span> : null}{heroParts.after}
          </h1>
          {hero?.subtitle ? <p className="mt-3 max-w-[640px] text-[17px] leading-[1.65] text-white/[0.88] [text-shadow:0_1px_8px_rgba(0,0,0,0.4)]">{hero.subtitle}</p> : null}
        </div>
      </section>

      <section className="bg-white px-5 py-16 md:px-10 md:py-[100px]">
        <div className="mx-auto max-w-[1240px]">
          <FadeUp className="mb-16 text-center">
            {label(intro?.eyebrow || "Who We Are")}
            <h2 className="text-[clamp(32px,3.5vw,48px)] font-bold tracking-[-0.5px]">About <span className="text-[#bc9155]">BuiltWell CT</span></h2>
          </FadeUp>
          <FadeUp className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(460px,1fr)] lg:items-stretch xl:gap-12">
            <div className="flex flex-col justify-center">
              <div className="space-y-4 text-[15px] leading-[1.78] text-[#5c677d]">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    p: ({ children }) => <p>{children}</p>,
                    a: ({ href, children }) => href ? linkNode(href, children, "font-semibold text-[#bc9155] transition-colors hover:text-[#a57d48]") : <>{children}</>,
                  }}
                >
                  {intro?.content || ""}
                </ReactMarkdown>
              </div>
            </div>
            <div className="overflow-hidden rounded-[8px] shadow-[0_24px_60px_rgba(30,43,67,0.12)]">
              <img src={media(intro?.image, "/portfolio/builtwell-contractor-client-consultation-ct.jpeg")} alt={intro?.image_alt || "BuiltWell CT consultation"} className="h-full min-h-[320px] w-full object-cover object-top" />
            </div>
          </FadeUp>
        </div>
      </section>

      <section className="bg-[#f5f1e9] px-5 py-16 md:px-10 md:py-[100px]">
        <div className="mx-auto max-w-[1240px]">
          <FadeUp className="mb-16 text-center">
            {label("Our Team")}
            <h2 className="text-[clamp(32px,3.5vw,48px)] font-bold tracking-[-0.5px]">Meet the <span className="text-[#bc9155]">Team</span></h2>
          </FadeUp>
          <FadeUp className="grid gap-8 lg:grid-cols-2">
            {(team?.members || []).map((member: any, index: number) => {
              const expanded = !!bioOpen[index];
              const image = media(member.image, index === 0 ? "/portfolio/builtwell-owner-van-exterior-ct-01.jpg" : "/images/team/malhazi.png");

              return (
                <article key={`${member.name || "member"}-${index}`} className="flex flex-col overflow-hidden rounded-[8px] border-b-2 border-b-transparent bg-white shadow-[0_2px_12px_rgba(30,43,67,0.06),0_1px_3px_rgba(30,43,67,0.04)] transition-all duration-[350ms] [transition-timing-function:cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-1 hover:border-b-[#bc9155] hover:shadow-[0_12px_28px_rgba(30,43,67,0.1),0_28px_56px_rgba(30,43,67,0.12)]">
                  <div className="h-[420px] overflow-hidden md:h-[520px]">
                    <img src={image} alt={member.name || "BuiltWell CT team"} className="h-full w-full object-cover object-[center_20%]" />
                  </div>
                  <div className="flex flex-1 flex-col p-8">
                    <h3 className="text-[24px] font-bold">{member.name}</h3>
                    <p className="mt-1 text-[14px] font-semibold uppercase tracking-[0.08em] text-[#bc9155]">{member.position}</p>
                    <div className={cls("mt-5 overflow-hidden text-[15px] leading-[1.8] text-[#5c677d] transition-[max-height] duration-300", expanded ? "max-h-[620px]" : "max-h-[10.5em]")}>
                      {paras(member.bio).map((paragraph) => <p key={paragraph.slice(0, 30)} className="mb-4 last:mb-0">{paragraph}</p>)}
                    </div>
                    <button type="button" onClick={() => setBioOpen((current) => ({ ...current, [index]: !current[index] }))} className="mt-4 inline-flex items-center gap-1 text-[14px] font-semibold text-[#bc9155] transition-colors hover:text-[#a57d48]">
                      {expanded ? "Show Less" : "Read More"}
                    </button>
                  </div>
                </article>
              );
            })}
          </FadeUp>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#1e2b43] px-5 py-16 text-white md:px-10 md:py-[100px]">
        <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{ backgroundImage: `url(${media("/services/builtwell-team-contractors-ct-05.png")})` }} />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(10,18,34,0.90)_0%,rgba(30,43,67,0.85)_100%)]" />
        <div className="relative z-10 mx-auto max-w-[1240px]">
          <FadeUp className="mx-auto mb-16 max-w-[820px] text-center">
            {label("Our Process", true)}
            <h2 className="text-[clamp(32px,3.5vw,48px)] font-bold tracking-[-0.5px] text-white">Our Remodeling <span className="text-[#bc9155]">Process</span></h2>
            {process?.subtitle ? <p className="mx-auto mt-5 max-w-[700px] text-[17px] leading-[1.75] text-white/60">{process.subtitle}</p> : null}
          </FadeUp>
          <FadeUp className="relative grid gap-4 md:grid-cols-2 xl:grid-cols-5 xl:gap-0 xl:before:absolute xl:before:left-[10%] xl:before:right-[10%] xl:before:top-[26px] xl:before:h-[2px] xl:before:bg-[#bc915540] xl:before:content-['']">
            {(process?.steps || []).map((step: any, index: number) => {
              const active = activeStep === index;

              return (
                <button type="button" key={`${step.title || "step"}-${index}`} onClick={() => setActiveStep(index)} className={cls("relative cursor-pointer rounded-[8px] px-4 py-4 text-left transition-colors duration-300 xl:px-4 xl:py-5 xl:text-center", active ? "bg-[#bc915524]" : "hover:bg-[#bc91551a]")}>
                  <div className="relative z-[1] mb-4 flex h-[52px] w-[52px] items-center justify-center rounded-full border-[2.5px] border-[#bc9155] bg-[rgba(188,145,85,0.42)] font-['Playfair_Display',serif] text-[20px] font-bold text-[#f5e0c0] shadow-[0_0_0_4px_rgba(188,145,85,0.12)] xl:mx-auto xl:mb-5 xl:h-[68px] xl:w-[68px] xl:-translate-y-2 xl:text-[24px]">{index + 1}</div>
                  <h3 className="mb-3 text-[18px] font-bold text-white">{step.title || step.short}</h3>
                  <p className={cls("text-[14px] leading-[1.65] text-white/70 transition-all duration-300 max-xl:mt-3", active ? "xl:mt-3 xl:max-h-[240px] xl:opacity-100" : "xl:mt-0 xl:max-h-0 xl:overflow-hidden xl:opacity-0")}>{step.description}</p>
                </button>
              );
            })}
          </FadeUp>
          <div className="mt-8 flex justify-center xl:mt-10">
            <Link href="/contact/" className="inline-flex items-center gap-2 rounded-[4px] bg-[#bc9155] px-6 py-3 text-[13px] font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-[#a57d48]">Free Consultation <ArrowRight className="h-4 w-4" /></Link>
          </div>
          <p className="mt-5 text-center text-[13px] text-white/40 xl:block hidden">Click any step to learn more</p>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[linear-gradient(135deg,#2d3e33_0%,#1a2d22_100%)] px-5 py-16 text-white md:px-10 md:py-[100px]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_80%,rgba(188,145,85,0.06)_0%,transparent_60%)]" />
        <div className="relative z-10 mx-auto max-w-[1240px]">
          <FadeUp className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center lg:gap-20">
            <div>
              {label(licensed?.eyebrow || "Licensed in Connecticut", true)}
              <h2 className="text-[clamp(32px,3.5vw,44px)] font-bold tracking-[-0.5px] text-white">{licensedParts.before}{licensedParts.accent ? <span className="text-[#bc9155]">{licensedParts.accent}</span> : null}{licensedParts.after}</h2>
              <div className="mt-6 space-y-5 text-[16px] leading-[1.8] text-white/70">
                {paras(licensed?.content || licensed?.body).map((paragraph) => <p key={paragraph.slice(0, 30)}>{paragraph}</p>)}
              </div>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              {(features?.items || []).map((item: any, index: number) => (
                <div key={`${item.title || "feature"}-${index}`} className="rounded-[8px] border border-white/8 border-b-2 border-b-transparent bg-white/6 p-6 transition-all duration-300 hover:border-b-[#bc9155] hover:bg-white/[0.09]">
                  <div className="mb-3.5 flex h-[44px] w-[44px] items-center justify-center rounded-[10px] bg-[#bc915526] text-[#bc9155]">
                    {item.icon === "shield-check" ? <ShieldCheck className="h-5 w-5" /> : item.icon === "users" ? <Users className="h-5 w-5" /> : item.icon === "file-text" ? <FileText className="h-5 w-5" /> : <Shield className="h-5 w-5" />}
                  </div>
                  <h4 className="font-sans text-[15px] font-semibold text-white">{item.title}</h4>
                  <p className="mt-2 text-[13px] leading-[1.55] text-white/55">{item.description}</p>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      <section className="bg-[#f5f1e9] px-5 py-16 md:px-10 md:py-[100px]">
        <div className="mx-auto max-w-[1240px]">
          <FadeUp className="mb-16 text-center">
            {label(areas?.eyebrow || "Where We Work")}
            <h2 className="text-[clamp(32px,3.5vw,48px)] font-bold tracking-[-0.5px]">{areaParts.before}{areaParts.accent ? <span className="text-[#bc9155]">{areaParts.accent}</span> : null}{areaParts.after}</h2>
          </FadeUp>
          <FadeUp className="grid gap-8 lg:grid-cols-2">
            {(areas?.counties || []).map((county: any, index: number) => {
              const expanded = !!countyOpen[index];
              const links = county.town_links || {};

              return (
                <article key={`${county.name || "county"}-${index}`} className="group/card flex flex-col overflow-hidden rounded-[12px] border-b-[3px] border-b-transparent bg-white shadow-[0_2px_12px_rgba(30,43,67,0.06),0_1px_3px_rgba(30,43,67,0.04)] transition-all duration-[350ms] [transition-timing-function:cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-1.5 hover:border-b-[#bc9155] hover:shadow-[0_16px_40px_rgba(30,43,67,0.1),0_32px_64px_rgba(30,43,67,0.08)]">
                  <div className="relative h-[220px] overflow-hidden">
                    <img src={media(county.image, index === 0 ? "/images/areas/fairfield-county.png" : "/images/areas/new-haven-county.png")} alt={county.name || "BuiltWell CT service area"} className={cls("h-full w-full object-cover transition-transform duration-500 group-hover/card:scale-105", index === 1 && "object-top")} />
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#1e2b4360] to-transparent" />
                  </div>
                  <div className="flex flex-1 flex-col p-7 pb-8">
                    <h3 className="text-[24px] font-bold">{county.name}</h3>
                    {county.phone ? <p className="mt-1 text-[15px] text-[#5c677d]">Call: <a href={`tel:${county.phone.replace(/\D/g, "")}`} className="font-semibold text-[#bc9155] hover:underline">{county.phone}</a></p> : null}
                    {county.description ? <p className="mt-4 border-b border-[#1e2b430f] pb-5 text-[14px] leading-[1.7] text-[#5c677d]">{county.description}</p> : null}
                    <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
                      {(county.towns || []).map((town: string) => (
                        <span key={`${county.name || "county"}-${town}`} className="contents">
                          {linkNode(Array.isArray(links) ? (links.find((entry: any) => entry?.name === town)?.url || county.url || "#") : (links[town] || county.url || "#"), town, "rounded-full bg-[#f5f1e9] px-3 py-2 text-center text-[11px] font-semibold text-[#1e2b43] transition-colors hover:bg-[#bc9155] hover:text-white")}
                        </span>
                      ))}
                      {expanded && (county.extra_towns || []).map((town: string) => (
                        <span key={`${county.name || "county"}-extra-${town}`} className="rounded-full bg-[#f5f1e9] px-3 py-2 text-center text-[11px] font-semibold text-[#1e2b43] transition-colors hover:text-[#9a7340]">{town}</span>
                      ))}
                    </div>
                    {county.extra_towns?.length ? <button type="button" onClick={() => setCountyOpen((current) => ({ ...current, [index]: !current[index] }))} className="mt-3 text-center text-[13px] font-semibold text-[#bc9155] transition-colors hover:text-[#a57d48]">{expanded ? "Show Fewer Towns -" : "See All Towns +"}</button> : null}
                    {county.url ? linkNode(county.url, <><span>{county.cta_label || `Learn more about ${county.name}`}</span><ArrowRight className="h-4 w-4" /></>, "mt-5 inline-flex items-center gap-2 text-[14px] font-semibold text-[#bc9155] transition-all hover:gap-3") : null}
                  </div>
                </article>
              );
            })}
          </FadeUp>
          <FadeUp><p className="mt-8 text-center text-[14px] text-[#5c677d]">Not sure if we cover your area? {linkNode("/contact/", "Contact our Connecticut remodeling team", "font-semibold text-[#bc9155] transition-colors hover:text-[#a57d48]")} and we&apos;ll let you know.</p></FadeUp>
        </div>
      </section>

      <div className="relative overflow-hidden bg-[linear-gradient(135deg,#1a2438_0%,#1e2b43_50%,#151e30_100%)] px-5 py-14 md:px-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgba(188,145,85,0.05)_0%,transparent_70%)]" />
        <div className="relative z-10 mx-auto flex max-w-[1200px] flex-wrap items-center justify-center">
          {(trust?.items || []).map((item: any, index: number) => (
            <div key={`${item.label || "trust"}-${index}`} className="contents">
              {item.url ? linkNode(item.url, <div className="flex min-w-[180px] flex-1 flex-col items-center gap-2.5 px-8 py-5 text-center text-[13px] font-semibold tracking-[0.03em] text-white/90 transition-all duration-300 hover:-translate-y-0.5 hover:text-[#bc9155]"><span className="text-[#bc9155] drop-shadow-[0_2px_4px_rgba(188,145,85,0.3)]">{item.icon === "calendar" ? <CalendarDays className="h-[22px] w-[22px]" /> : item.icon === "shield" ? <Shield className="h-[22px] w-[22px]" /> : item.icon === "check" ? <Check className="h-[22px] w-[22px]" /> : <Star className="h-[22px] w-[22px] fill-current" />}</span><span>{[item.label, item.value].filter(Boolean).join(" ")}</span></div>, "flex flex-1 justify-center") : <div className="flex flex-1 justify-center"><div className="flex min-w-[180px] flex-1 flex-col items-center gap-2.5 px-8 py-5 text-center text-[13px] font-semibold tracking-[0.03em] text-white/90 transition-all duration-300 hover:-translate-y-0.5 hover:text-[#bc9155]"><span className="text-[#bc9155] drop-shadow-[0_2px_4px_rgba(188,145,85,0.3)]">{item.icon === "calendar" ? <CalendarDays className="h-[22px] w-[22px]" /> : item.icon === "shield" ? <Shield className="h-[22px] w-[22px]" /> : item.icon === "check" ? <Check className="h-[22px] w-[22px]" /> : <Star className="h-[22px] w-[22px] fill-current" />}</span><span>{[item.label, item.value].filter(Boolean).join(" ")}</span></div></div>}
              {index < (trust?.items || []).length - 1 ? <div className="hidden h-10 w-px bg-white/10 lg:block" /> : null}
            </div>
          ))}
        </div>
      </div>

      <section className="bg-[#f5f1e9] px-5 py-16 md:px-10 md:py-20">
        <div className="mx-auto max-w-[1200px]">
          <FadeUp className="mb-8 text-center">
            {label(lead?.eyebrow || "Get In Touch")}
            <h2 className="text-[clamp(32px,3.5vw,48px)] font-bold tracking-[-0.5px]">{leadParts.before}{leadParts.accent ? <span className="text-[#bc9155]">{leadParts.accent}</span> : null}{leadParts.after}</h2>
            {lead?.subtitle ? <p className="mx-auto mt-2 max-w-[600px] text-[16px] leading-[1.7] text-[#5c677d]">{lead.subtitle}</p> : null}
          </FadeUp>
          <div className="grid gap-8 lg:grid-cols-[1fr_1.15fr]">
            <FadeUp className="flex flex-col gap-3">
              {(lead?.images || []).slice(0, 2).map((image: any, index: number) => <div key={`${image.alt || "lead"}-${index}`} className="relative min-h-[260px] overflow-hidden rounded-[8px]"><img src={media(image.image, index === 0 ? "/portfolio/builtwell-team-client-arrival-ct.jpeg" : "/portfolio/builtwell-contractor-sign-consultation-ct-01.jpg")} alt={image.alt || "BuiltWell CT consultation"} className="h-full w-full object-cover" /><div className="pointer-events-none absolute bottom-0 right-0 h-[60px] w-[60px] rounded-br-[8px] bg-[linear-gradient(135deg,transparent_30%,rgba(30,43,67,0.5)_100%)]" /></div>)}
            </FadeUp>
            <FadeUp className="flex flex-col rounded-[10px] border border-[#1e2b4314] bg-white px-6 py-8 shadow-[0_16px_48px_rgba(30,43,67,0.1),0_4px_12px_rgba(30,43,67,0.04)] md:px-9">
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
                  <div><label className="flex min-h-[52px] cursor-pointer items-center justify-center gap-2 rounded-[8px] border border-[#1e2b4326] px-5 py-3 text-[15px] font-semibold text-[#1e2b43] transition-colors hover:border-[#bc9155]" htmlFor="about-lead-files"><Upload className="h-4 w-4" />Upload Photos</label><input id="about-lead-files" type="file" multiple accept="image/jpeg,image/png,image/heic,.heic" className="hidden" onChange={(event) => setFileNames(Array.from(event.target.files || []).map((file) => file.name))} />{fileNames.length ? <p className="mt-2 text-[12px] text-[#5c677d]">{fileNames.join(", ")}</p> : null}</div>
                  <button type="submit" className="min-h-[52px] rounded-[8px] bg-[#bc9155] px-5 py-3 text-[15px] font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-[#a57d48] hover:shadow-[0_4px_12px_rgba(188,145,85,0.3)]">{lead?.submit_label || "Send Request"}</button>
                </div>
                <p className="mt-4 text-center text-[13px] italic text-[#5c677d]">{lead?.consent_text || "We respond within 24 hours. No spam, no obligation."}</p>
              </form>}
            </FadeUp>
          </div>
        </div>
      </section>

      {financing ? <div className="border-t border-[#1e2b4314] bg-white px-5 py-12 md:px-10 md:py-14"><div className="mx-auto flex max-w-[1200px] flex-col items-center gap-6 text-center"><div className="flex flex-col items-center gap-4"><div className="text-[24px] font-bold tracking-[-0.5px]"><span className="text-[#6bbf4e]">Green</span><span className="text-[#1e2b43]">Sky</span></div><p className="max-w-[760px] text-[16px] leading-[1.6] text-[#5c677d]"><strong className="text-[#1e2b43]">{financing.title}.</strong> {(financing.content || financing.body || "").replace(/^\s*Get approved/i, "Get approved")}</p></div>{financing.cta?.url ? linkNode(financing.cta.url, <><span>{financing.cta.label || "Check Financing Options"}</span><ArrowRight className="h-4 w-4" /></>, "inline-flex min-h-[52px] min-w-[280px] items-center justify-center gap-2 rounded-[8px] bg-[#bc9155] px-8 py-3 text-[15px] font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-[#a57d48] hover:shadow-[0_4px_12px_rgba(188,145,85,0.3)]") : null}</div></div> : null}
    </div>
  );
}

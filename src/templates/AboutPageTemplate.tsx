"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowRight, CalendarDays, Check, ChevronDown, CircleCheck, FileText, Shield, ShieldCheck, Star, Upload, Users } from "lucide-react";
import type { CMSPage, CMSSection } from "@/types/cms";
import { AreasSection as SharedAreasSection, FinancingStrip as SharedFinancingStrip, LeadFormSection as SharedLeadFormSection } from "./template-utils";

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
  const [activeStep, setActiveStep] = useState<number | null>(null);
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
  const processSteps = ((process?.steps || []).length ? process.steps : [
    {
      title: "Consultation",
      description: "We visit your home or connect via Google Meet or Zoom at no charge and with no obligation, so we can understand the scope before we put anything in writing.",
    },
    {
      title: "Planning",
      description: "You receive a written proposal with a clear breakdown of exactly what's included, the full project timeline, and the cost. No vague ranges, no surprises later.",
    },
    {
      title: "Selections",
      description: "We guide you through every material choice and communicate lead times upfront, so nothing delays construction once the schedule is set.",
    },
    {
      title: "Build",
      description: "Construction begins on the agreed start date. Crews show up on time, daily updates are sent, and the job site is cleaned every evening.",
    },
    {
      title: "Walkthrough",
      description: "When the work is finished, we walk through the project together. Nothing is signed off until you're satisfied with every detail.",
    },
  ]).slice(0, 5);
  const trustItems = ((trust?.items || []).length ? (trust?.items || []) : [
    {
      icon: "star",
      label: "Google Rating 4.9",
      url: "https://www.google.com/maps/search/?api=1&query=BuiltWell+CT,+206A+Boston+Post+Road,+Orange,+CT+06477",
    },
    { icon: "check", label: "Trusted on Houzz", url: "#houzz" },
    { icon: "calendar", label: "CT HIC License #0668405", url: "https://www.elicense.ct.gov/Lookup/LicenseLookup.aspx" },
  ]).slice(0, 4);

  return (
    <div className="about-page-template bg-[#f5f1e9] text-[#1e2b43]">
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
                    <img src={image} alt={member.image_alt || member.name || "BuiltWell CT team"} className="h-full w-full object-cover object-[center_20%]" />
                  </div>
                  <div className="flex flex-1 flex-col p-8 text-center">
                    <h3 className="text-[24px] font-bold">{member.name}</h3>
                    <p className="mt-1 text-[14px] font-semibold uppercase tracking-[0.08em] text-[#bc9155]">{member.position}</p>
                    <div className={cls("mt-5 overflow-hidden text-[15px] leading-[1.8] text-[#5c677d] transition-[max-height] duration-300", expanded ? "max-h-[620px]" : "max-h-[10.5em]")}>
                      {paras(member.bio).map((paragraph) => <p key={paragraph.slice(0, 30)} className="mb-4 last:mb-0">{paragraph}</p>)}
                    </div>
                    <button type="button" onClick={() => setBioOpen((current) => ({ ...current, [index]: !current[index] }))} className="mt-4 inline-flex items-center justify-center gap-1 text-[14px] font-semibold text-[#bc9155] transition-colors hover:text-[#a57d48]">
                      {expanded ? "Show Less" : "Read More"}
                    </button>
                  </div>
                </article>
              );
            })}
          </FadeUp>
        </div>
      </section>

      <section id="process" className="home-process scroll-mt-28 px-5 py-[52px] text-white md:px-8 md:py-20 lg:px-10 lg:py-[100px]">
        <div className="home-process-bg" aria-hidden="true" />
        <div className="home-process-inner">
          <FadeUp className="home-process-header">
            <span className="home-process-label">{process?.eyebrow || "Our Process"}</span>
            <h2 className="text-[clamp(32px,3.5vw,48px)] font-bold tracking-[-0.5px] text-white">
              Our Remodeling <span className="text-[#bc9155]">Process</span>
            </h2>
            <p>{process?.subtitle || "We follow the same five-step process on every project, whether it's a single bathroom or a whole-home renovation. It keeps projects on schedule and keeps you informed at every stage."}</p>
          </FadeUp>
          <FadeUp className="home-process-timeline">
            {processSteps.map((step: any, index: number) => (
              <button
                type="button"
                key={`${step.title || "step"}-${index}`}
                onClick={() => setActiveStep((current) => current === index ? null : index)}
                className={cls("home-process-step", activeStep === index && "is-active")}
                aria-expanded={activeStep === index}
              >
                <div className="home-process-step-num">{index + 1}</div>
                <h3>{step.title || step.short || `Step ${index + 1}`}</h3>
                <p>{step.description}</p>
              </button>
            ))}
          </FadeUp>
          <p className="home-process-hint">Click any step to learn more</p>
        </div>
        <style jsx global>{`
          .home-process {
            position: relative;
            overflow: hidden;
            color: #fff;
          }
          .home-process-bg {
            position: absolute;
            inset: 0;
            background: linear-gradient(135deg, rgba(10, 18, 34, 0.9) 0%, rgba(30, 43, 67, 0.85) 100%);
            z-index: 0;
          }
          .home-process-inner {
            position: relative;
            z-index: 1;
            max-width: 1280px;
            margin: 0 auto;
          }
          .home-process-header {
            text-align: center;
            margin-bottom: 64px;
          }
          .home-process-label {
            display: inline-block;
            font-size: 13px;
            font-weight: 700;
            color: #9a7340;
            text-transform: uppercase;
            letter-spacing: 1.5px;
            margin-bottom: 16px;
            position: relative;
            padding-left: 20px;
          }
          .home-process-label::before {
            content: "";
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
            width: 10px;
            height: 2px;
            background: #bc9155;
          }
          .home-process-header p {
            font-size: 17px;
            color: rgba(255, 255, 255, 0.6);
            max-width: 700px;
            margin: 20px auto 0;
            line-height: 1.75;
          }
          .home-process-timeline {
            display: grid;
            grid-template-columns: repeat(5, minmax(0, 1fr));
            gap: 0;
            position: relative;
          }
          .home-process-timeline::before {
            content: "";
            position: absolute;
            top: 34px;
            left: 10%;
            right: 10%;
            height: 2px;
            background: rgba(188, 145, 85, 0.25);
          }
          .home-process-step {
            text-align: center;
            padding: 16px 16px 20px;
            position: relative;
            cursor: pointer;
            border-radius: 8px;
            transition: background 0.3s;
            border: 0;
            background: transparent;
            color: inherit;
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 100%;
            outline: none;
          }
          .home-process-step:focus,
          .home-process-step:focus-visible {
            outline: none;
            box-shadow: none;
          }
          .home-process-step.is-active {
            background: rgba(188, 145, 85, 0.14);
            z-index: 2;
            position: relative;
          }
          .home-process-step-num {
            width: 68px;
            height: 68px;
            border-radius: 9999px;
            background: rgba(188, 145, 85, 0.42);
            border: 2.5px solid #bc9155;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: -8px auto 20px;
            font-family: "Playfair Display", serif;
            font-size: 24px;
            font-weight: 700;
            color: #f5e0c0;
            position: relative;
            z-index: 2;
            box-shadow: 0 0 0 4px rgba(188, 145, 85, 0.12);
            flex-shrink: 0;
          }
          .home-process-step h3 {
            font-size: 18px;
            margin: 0 0 12px;
            color: #fff;
            font-weight: 700;
            font-family: "Playfair Display", serif;
            line-height: 1.25;
            text-align: center;
          }
          .home-process-step p {
            font-size: 14px;
            color: rgba(255, 255, 255, 0.7);
            line-height: 1.65;
            max-height: 0;
            opacity: 0;
            overflow: hidden;
            margin: 0;
            transition: max-height 0.4s ease, opacity 0.35s ease, margin-top 0.35s ease;
            text-align: center;
          }
          .home-process-step.is-active p {
            max-height: 200px;
            opacity: 1;
            margin-top: 8px;
          }
          .home-process-hint {
            text-align: center;
            margin-top: 28px;
            font-size: 13px;
            color: rgba(255, 255, 255, 0.4);
          }
          .about-page-template .about-areas-wrap .bw-areas-section {
            padding: 100px 40px;
          }
          .about-page-template .about-areas-wrap .bw-areas-inner {
            max-width: 1240px;
          }
          .about-page-template .about-areas-wrap .bw-areas-header {
            margin-bottom: 64px;
          }
          .about-page-template .about-areas-wrap .bw-areas-header h2 {
            font-size: clamp(32px, 3.5vw, 48px);
            margin-bottom: 20px;
            letter-spacing: -0.5px;
          }
          .about-page-template .about-areas-wrap .bw-areas-note {
            margin-top: 32px;
            font-size: 14px;
            line-height: 1.7;
          }
          .about-page-template .about-areas-wrap .bw-areas-note a,
          .about-page-template .about-areas-wrap .bw-areas-note a:hover {
            text-decoration: none;
          }
          .about-page-template .about-areas-wrap .bw-areas-note a:hover {
            color: #a57d48;
          }
          @media (max-width: 1024px) {
            .about-page-template .about-areas-wrap .bw-areas-section {
              padding: 60px 32px;
            }
            .home-process-timeline {
              grid-template-columns: 1fr;
              gap: 12px;
              max-width: 720px;
              margin: 0 auto;
            }
            .home-process-timeline::before {
              display: none;
            }
            .home-process-step {
              padding: 20px 16px;
              flex-direction: column;
              align-items: center;
              gap: 12px;
              text-align: center;
              border: 1px solid rgba(188, 145, 85, 0.18);
              background: rgba(255, 255, 255, 0.03);
              border-radius: 10px;
            }
            .home-process-step.is-active {
              border-color: rgba(188, 145, 85, 0.55);
              background: rgba(188, 145, 85, 0.16);
            }
            .home-process-step-num {
              width: 52px;
              height: 52px;
              font-size: 22px;
              margin: 0;
              box-shadow: 0 0 0 3px rgba(188, 145, 85, 0.12);
            }
            .home-process-step h3 {
              text-align: center;
              font-size: 18px;
              margin: 0;
              width: 100%;
            }
            .home-process-step p {
              display: block !important;
              text-align: center;
              margin-top: 0;
              padding-left: 0;
              width: 100%;
            }
            .home-process-step.is-active p {
              max-height: 300px;
              margin-top: 8px;
            }
          }
          @media (max-width: 768px) {
            .about-page-template .about-areas-wrap .bw-areas-section {
              padding: 48px 20px;
            }
            .about-page-template .about-areas-wrap .bw-areas-header {
              margin-bottom: 36px;
            }
            .home-process-header {
              margin-bottom: 36px;
            }
            .home-process-header h2 {
              font-size: 24px;
              margin-bottom: 14px;
            }
            .home-process-header p {
              font-size: 15px;
              line-height: 1.7;
            }
            .home-process-step {
              padding: 14px;
            }
            .home-process-step h3 {
              font-size: 14px;
              margin-bottom: 0;
            }
            .home-process-hint {
              display: none;
            }
          }
          @media (max-width: 480px) {
            .home-process-header {
              margin-bottom: 32px;
            }
            .home-process-header h2 {
              font-size: 26px;
            }
            .home-process-header p {
              font-size: 14px;
            }
            .home-process-timeline {
              gap: 16px !important;
              max-width: 360px;
            }
            .home-process-step {
              padding: 12px 6px;
            }
            .home-process-step-num {
              width: 44px;
              height: 44px;
              font-size: 16px;
              margin: 0 0 8px;
            }
            .home-process-step h3 {
              font-size: 12px;
              line-height: 1.3;
            }
          }
        `}</style>
      </section>

      <section className="relative overflow-hidden px-5 py-[52px] text-white md:px-8 md:py-20 lg:px-10 lg:py-[100px]">
        <div className="absolute inset-0 bg-cover bg-center opacity-[0.15]" style={{ backgroundImage: `url(${media("/hero/builtwell-job-site-aerial-hero-ct.jpg")})` }} aria-hidden="true" />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#1e2b43_0%,#151e30_100%)]" />
        <div className="relative z-10 mx-auto grid max-w-[1280px] gap-8 md:gap-10 lg:grid-cols-2 lg:items-center lg:gap-20">
          <FadeUp>
            <span className="mb-4 block text-center text-[11px] font-bold uppercase tracking-[1.5px] text-[#bc9155] md:text-[13px]">
              {licensed?.eyebrow || "Licensed in Connecticut"}
            </span>
            <h2 className="text-center text-[clamp(2rem,3.5vw,2.75rem)] font-bold tracking-[-0.5px] text-white">{licensedParts.before}{licensedParts.accent ? <span className="text-[#bc9155]">{licensedParts.accent}</span> : null}{licensedParts.after}</h2>
            <div className="mt-6 space-y-5 text-[15px] leading-[1.8] text-white/70 md:text-[16px] md:leading-[1.8]">
              {paras(licensed?.content || licensed?.body).map((paragraph) => <p key={paragraph.slice(0, 30)}>{paragraph}</p>)}
            </div>
          </FadeUp>
          <FadeUp className="grid gap-3 md:grid-cols-2 md:gap-5">
            {(features?.items || []).map((item: any, index: number) => (
              <article key={`${item.title || "feature"}-${index}`} className="rounded-lg border border-white/15 border-b-2 border-b-transparent bg-white/8 p-5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-[3px] hover:border-b-[#bc9155] hover:bg-white/12 hover:shadow-[0_8px_24px_rgba(0,0,0,0.2)] md:p-7">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#bc9155]/28 text-[#bc9155]">
                  {item.icon === "shield-check" ? <ShieldCheck className="h-5 w-5" /> : item.icon === "users" ? <Users className="h-5 w-5" /> : item.icon === "file-text" ? <FileText className="h-5 w-5" /> : item.icon === "circle-check" || item.icon === "check-circle" ? <CircleCheck className="h-5 w-5" /> : <Shield className="h-5 w-5" />}
                </div>
                <h4 className="font-sans text-[15px] font-semibold text-white">{item.title}</h4>
                <p className="mt-1.5 text-[12px] leading-[1.55] text-white/65 md:text-[13px]">{item.description}</p>
              </article>
            ))}
          </FadeUp>
        </div>
      </section>

      <div className="about-areas-wrap">
        <SharedAreasSection data={areas} />
      </div>

      <div className="relative overflow-hidden bg-[linear-gradient(135deg,#1e2b43_0%,#151e30_100%)] px-5 py-10 md:px-8 md:py-14 lg:px-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgba(188,145,85,0.05)_0%,transparent_70%)]" />
        <div className="relative z-10 mx-auto flex max-w-[1200px] flex-wrap items-center justify-center gap-0 md:flex-nowrap">
          {trustItems.map((item: any, index: number) => (
            <div key={`${item.label || "trust"}-${index}`} className="contents">
              {item.url ? linkNode(item.url, <div className="flex min-w-[50%] flex-1 flex-col items-center gap-2.5 px-3 py-4 text-center text-[11px] font-semibold tracking-[0.4px] whitespace-nowrap text-white/90 transition-all duration-300 hover:-translate-y-0.5 hover:text-[#bc9155] md:min-w-0 md:px-8 md:py-5 md:text-[13px]"><span>{item.icon === "star" ? <Star className="h-[18px] w-[18px] fill-[#bc9155] text-[#bc9155] [filter:drop-shadow(0_2px_4px_rgba(188,145,85,0.3))] md:h-[22px] md:w-[22px]" /> : item.icon === "calendar" ? <CalendarDays className="h-[18px] w-[18px] text-[#bc9155] [filter:drop-shadow(0_2px_4px_rgba(188,145,85,0.3))] md:h-[22px] md:w-[22px]" /> : <span className="flex h-[18px] w-[18px] items-center justify-center rounded-full border-2 border-current text-[#bc9155] [filter:drop-shadow(0_2px_4px_rgba(188,145,85,0.3))] md:h-[22px] md:w-[22px]"><Check className="h-3 w-3 md:h-3.5 md:w-3.5" /></span>}</span><span>{[item.label, item.value].filter(Boolean).join(" ")}</span></div>, "flex flex-1 justify-center") : <div className="flex flex-1 justify-center"><div className="flex min-w-[50%] flex-1 flex-col items-center gap-2.5 px-3 py-4 text-center text-[11px] font-semibold tracking-[0.4px] whitespace-nowrap text-white/90 transition-all duration-300 hover:-translate-y-0.5 hover:text-[#bc9155] md:min-w-0 md:px-8 md:py-5 md:text-[13px]"><span>{item.icon === "star" ? <Star className="h-[18px] w-[18px] fill-[#bc9155] text-[#bc9155] [filter:drop-shadow(0_2px_4px_rgba(188,145,85,0.3))] md:h-[22px] md:w-[22px]" /> : item.icon === "calendar" ? <CalendarDays className="h-[18px] w-[18px] text-[#bc9155] [filter:drop-shadow(0_2px_4px_rgba(188,145,85,0.3))] md:h-[22px] md:w-[22px]" /> : <span className="flex h-[18px] w-[18px] items-center justify-center rounded-full border-2 border-current text-[#bc9155] [filter:drop-shadow(0_2px_4px_rgba(188,145,85,0.3))] md:h-[22px] md:w-[22px]"><Check className="h-3 w-3 md:h-3.5 md:w-3.5" /></span>}</span><span>{[item.label, item.value].filter(Boolean).join(" ")}</span></div></div>}
              {index < trustItems.length - 1 ? <div className="hidden h-10 w-px shrink-0 bg-white/10 lg:block" /> : null}
            </div>
          ))}
        </div>
      </div>

      <SharedLeadFormSection page={page} data={lead} accent={lead?.title_highlight || "Project"} />
      <SharedFinancingStrip data={financing} />
    </div>
  );
}

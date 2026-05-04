"use client";

import { useEffect, useState } from "react";
import {
  ArrowRight,
  CalendarDays,
  Check,
  ChevronDown,
  Droplets,
  FileText,
  Grid2x2,
  Hammer,
  House,
  MessageCircle,
  Shield,
  Star,
  Upload,
} from "lucide-react";
import type { CMSPage } from "@/types/cms";
import {
  AreasSection as SharedAreasSection,
  FinancingStrip,
  cls,
  label,
  linkNode,
  media,
  parts,
  section,
  sections,
} from "./template-utils";

type PhoneItem = {
  label?: string;
  number?: string;
};

type InsurancePage = CMSPage & {
  phones?: {
    items?: PhoneItem[];
  };
};

type RichTextData = {
  eyebrow?: string | null;
  title?: string | null;
  highlight_text?: string | null;
  content?: string | null;
  style_variant?: string | null;
  cta?: { label?: string; url?: string } | null;
};

type LeadField = {
  name: string;
  label: string;
  type: string;
  required?: boolean;
  placeholder?: string;
  options?: Array<string | { label: string; value: string }>;
};

const DEFAULT_PHONES: PhoneItem[] = [
  { label: "Fairfield County", number: "(203) 919-9616" },
  { label: "New Haven County", number: "(203) 466-9148" },
];

const SECTION_WIDTH = "mx-auto max-w-[1240px] px-5 md:px-8 lg:px-10";

function paragraphs(value?: string | null) {
  return (value || "")
    .replace(/\r/g, "")
    .split(/\n{2,}/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function normalizeOptions(options?: LeadField["options"]) {
  return (options || []).map((option) =>
    typeof option === "string" ? { label: option, value: option } : option,
  );
}

function toTelHref(value?: string) {
  const digits = (value || "").replace(/\D/g, "");
  return digits ? `tel:${digits}` : "#";
}

function iconForValue(icon?: string | null) {
  switch ((icon || "").toLowerCase()) {
    case "clock":
    case "calendar":
      return <CalendarDays className="h-6 w-6" />;
    case "star":
      return <Star className="h-6 w-6" />;
    case "shield":
      return <Shield className="h-6 w-6" />;
    case "shield-check":
      return <Shield className="h-6 w-6" />;
    case "file-text":
      return <FileText className="h-6 w-6" />;
    case "house":
      return <House className="h-6 w-6" />;
    case "message-circle":
      return <MessageCircle className="h-6 w-6" />;
    case "hammer":
      return <Hammer className="h-6 w-6" />;
    case "droplets":
      return <Droplets className="h-6 w-6" />;
    case "grid":
      return <Grid2x2 className="h-6 w-6" />;
    default:
      return <Check className="h-6 w-6" />;
  }
}

function HeroButtons({
  phones,
  scheduleLabel,
  scheduleUrl,
}: {
  phones: PhoneItem[];
  scheduleLabel?: string;
  scheduleUrl?: string;
}) {
  return (
    <div className="mt-8 flex flex-col items-center gap-[14px] sm:flex-row sm:justify-center">
      <a href="#contact" className="w-[280px] rounded-[8px] border border-[#BC9155] bg-[#BC9155] px-8 py-[14px] text-center text-[15px] font-semibold text-white transition-[background,border-color,transform,box-shadow] duration-300 hover:-translate-y-[2px] hover:border-[#D4A95A] hover:bg-[#D4A95A] hover:shadow-[0_8px_24px_rgba(188,145,85,0.4)]">
        Get Your Free Estimate
      </a>
      <a href="tel:2039199616" className="w-[280px] rounded-[8px] border border-white/[0.22] bg-[rgba(10,18,35,0.42)] px-8 py-[14px] text-center backdrop-blur-[12px] transition-[background,border-color,transform,box-shadow] duration-300 hover:-translate-y-[2px] hover:border-white/[0.35] hover:bg-[rgba(10,18,35,0.62)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.3)]">
        <span className="text-[15px] font-semibold tracking-[0.1px] text-white">Fairfield: (203) 919-9616</span>
      </a>
      <a href="tel:2034669148" className="w-[280px] rounded-[8px] border border-white/[0.22] bg-[rgba(10,18,35,0.42)] px-8 py-[14px] text-center backdrop-blur-[12px] transition-[background,border-color,transform,box-shadow] duration-300 hover:-translate-y-[2px] hover:border-white/[0.35] hover:bg-[rgba(10,18,35,0.62)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.3)]">
        <span className="text-[15px] font-semibold tracking-[0.1px] text-white">New Haven: (203) 466-9148</span>
      </a>
    </div>
  );
}

function TrustMetricBar({ data }: { data?: any }) {
  const items = data?.items || [];

  if (!items.length) return null;

  return (
    <section className="border-y border-[#bc915533] bg-[linear-gradient(135deg,#1e2b43_0%,#151e30_100%)]">
      <div className="mx-auto grid max-w-[1280px] grid-cols-2 text-center lg:grid-cols-4">
        {items.map((item: any, index: number) => (
          <div
            key={`${item.label}-${index}`}
            className={cls(
              "group flex min-h-[122px] cursor-default flex-col items-center justify-center px-4 py-6 text-center transition-all duration-300 md:px-5 md:py-9 lg:hover:-translate-y-[3px] lg:hover:bg-[#bc91550f]",
              index % 2 === 0 && "border-r border-[#bc915533]",
              index < 2 && "border-b border-[#bc915533]",
              "lg:border-b-0",
              index < items.length - 1
                ? "lg:border-r lg:border-[#bc915533]"
                : "lg:border-r-0",
            )}
          >
            <div className="flex min-h-[42px] items-center justify-center font-serif text-[32px] font-bold leading-none text-[#bc9155] transition-all duration-300 md:text-[42px] lg:group-hover:text-[#d4a95a] lg:group-hover:[text-shadow:0_0_20px_rgba(188,145,85,0.3)]">
              {item.value ? (
                item.value
              ) : (
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              )}
            </div>
            <div className="mt-1.5 text-[11px] font-medium uppercase tracking-[0.8px] text-white/85 transition-colors duration-300 md:mt-2 md:text-[13px] md:tracking-[1px] lg:text-white/60 lg:group-hover:text-white/85">
              {item.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function TwoColumnTextSection({
  copy,
  images,
  surface = "white",
}: {
  copy?: RichTextData;
  images?: any;
  surface?: "white" | "cream";
}) {
  if (!copy) return null;

  const titleParts = parts(copy.title, copy.highlight_text);
  const imageItems = images?.items || [];

  return (
    <section
      className={cls(
        "py-20 sm:py-24",
        surface === "cream" ? "bg-[#f5f1e9]" : "bg-white",
      )}
    >
      <div className={SECTION_WIDTH}>
        <div className="mb-12 text-center kitchen-fade-up">
          {label(copy.eyebrow || "Overview")}
          <h2 className="text-[clamp(32px,4vw,46px)] font-bold tracking-[-0.02em] text-[#1e2b43]">
            {titleParts.before}
            {titleParts.accent ? (
              <span className="text-[#bc9155]">{titleParts.accent}</span>
            ) : null}
            {titleParts.after}
          </h2>
        </div>
        <div className="grid gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:items-stretch">
          <div className="space-y-5">
            {paragraphs(copy.content).map((paragraph, index) => (
              <p
                key={index}
                className="text-[15px] leading-[1.9] text-[#5c677d] md:text-[16px]"
              >
                {paragraph}
              </p>
            ))}
          </div>
          <div className="grid gap-4">
            {(imageItems.length ? imageItems : [{ image: "" }, { image: "" }])
              .slice(0, 2)
              .map((item: any, index: number) => (
                <div
                  key={`${item.alt || "overview"}-${index}`}
                  className="overflow-hidden rounded-[12px] shadow-[0_18px_45px_rgba(30,43,67,0.08)]"
                >
                  <img
                    src={media(
                      item.image,
                      index === 0
                        ? "/portfolio/builtwell-contractor-handshake-arrival-ct-optimized.jpg"
                        : "/portfolio/builtwell-team-completed-interior-ct.png",
                    )}
                    alt={item.alt || "BuiltWell insurance reconstruction"}
                    className="h-[260px] w-full object-cover md:h-[300px]"
                  />
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function RightsSection({
  copy,
  bullets,
}: {
  copy?: RichTextData;
  bullets?: any;
}) {
  if (!copy || !bullets) return null;

  const titleParts = parts(copy.title, copy.highlight_text);

  return (
    <section className="bg-[#f5f1e9] py-20 sm:py-24">
      <div className={SECTION_WIDTH}>
        <div className="mb-12 text-center kitchen-fade-up">
          {label(copy.eyebrow || "Know Your Rights")}
          <h2 className="text-[clamp(32px,4vw,46px)] font-bold tracking-[-0.02em] text-[#1e2b43]">
            {titleParts.before}
            {titleParts.accent ? (
              <span className="text-[#bc9155]">{titleParts.accent}</span>
            ) : null}
            {titleParts.after}
          </h2>
        </div>
        <div className="grid gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:items-stretch">
          <div className="flex flex-col justify-center space-y-6">
            {paragraphs(copy.content).map((paragraph, index) => (
              <p
                key={index}
                className="text-[16px] leading-[2] text-[#5c677d] md:text-[17px]"
              >
                {paragraph}
              </p>
            ))}
          </div>
          <div className="flex items-center">
            <div className="w-full rounded-[14px] bg-[#1e2b43] px-8 py-10 text-center shadow-[0_20px_48px_rgba(21,30,48,0.18)]">
              <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-[#bc915526] text-[#bc9155]">
                <Shield className="h-7 w-7" />
              </div>
              <h3 className="font-serif text-[28px] font-bold" style={{ color: "#FFFFFF" }}>
                {bullets.title}
              </h3>
              <div className="mx-auto mt-3 h-[2px] w-[60px] rounded-full bg-[#BC9155]" />
              <div className="mt-7 space-y-4 text-left">
                {(bullets.items || []).map((item: string, index: number) => (
                  <div
                    key={`${item}-${index}`}
                    className="flex gap-3 text-[15px] leading-[1.85] text-white/90"
                  >
                    <span className="mt-1.5 text-[#bc9155]">
                      <Check className="h-4 w-4" />
                    </span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function RebuildGrid({ data }: { data?: any }) {
  if (!data) return null;

  const titleParts = parts(data.title, "Rebuild");

  return (
    <section className="bg-white py-20 sm:py-24">
      <div className={SECTION_WIDTH}>
        <div className="mb-12 text-center kitchen-fade-up">
          {label("Reconstruction Services")}
          <h2 className="text-[clamp(32px,4vw,46px)] font-bold tracking-[-0.02em] text-[#1e2b43]">
            {titleParts.before}
            {titleParts.accent ? (
              <span className="text-[#bc9155]">{titleParts.accent}</span>
            ) : null}
            {titleParts.after}
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {(data.items || []).map((item: any, index: number) => (
            <article
              key={`${item.title}-${index}`}
              className="rounded-[14px] border border-[#1e2b4310] border-l-[3px] border-l-[#BC9155] bg-white p-8 shadow-[0_12px_30px_rgba(30,43,67,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(30,43,67,0.1),0_28px_56px_rgba(30,43,67,0.12)]"
            >
              <h3 className="text-[22px] font-bold text-[#1e2b43]">
                {item.title}
              </h3>
              <p className="mt-4 text-[15px] leading-[1.85] text-[#5c677d]">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyChooseSection({ data }: { data?: any }) {
  if (!data) return null;

  const titleParts = parts(data.title, "BuiltWell");

  return (
    <section className="bg-[#f5f1e9] py-20 sm:py-24">
      <div className={SECTION_WIDTH}>
        <div className="mb-12 text-center kitchen-fade-up">
          {label("The Difference")}
          <h2 className="text-[clamp(32px,4vw,46px)] font-bold tracking-[-0.02em] text-[#1e2b43]">
            {titleParts.before}
            {titleParts.accent ? (
              <span className="text-[#bc9155]">{titleParts.accent}</span>
            ) : null}
            {titleParts.after}
          </h2>
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
          {(data.items || []).map((item: any, index: number) => (
            <article
              key={`${item.title}-${index}`}
              className="rounded-[14px] border border-[#d9cdbd] bg-white px-6 py-7 text-center shadow-[0_12px_28px_rgba(30,43,67,0.05)] transition-all hover:-translate-y-1 hover:shadow-[0_18px_36px_rgba(30,43,67,0.1)]"
            >
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#bc915512] text-[#bc9155]">
                {iconForValue(item.icon)}
              </div>
              <h3 className="text-[21px] font-bold text-[#1e2b43]">
                {item.title}
              </h3>
              <p className="mt-4 text-[14px] leading-[1.78] text-[#5c677d]">
                {item.description}
              </p>
            </article>
          ))}
        </div>
        <p className="mt-7 text-center text-[13px] text-[#5c677d]/70">
          Hover over any item to learn more
        </p>
      </div>
    </section>
  );
}

function CarriersSection({ data }: { data?: any }) {
  if (!data) return null;

  const titleParts = parts(data.title, "We Work With");

  return (
    <section className="bg-white py-20 sm:py-24">
      <div className={SECTION_WIDTH}>
        <div className="mb-8 text-center">
          {label("Trusted Partners")}
          <h2 className="text-[clamp(32px,4vw,46px)] font-bold tracking-[-0.02em] text-[#1e2b43]">
            {titleParts.before}
            {titleParts.accent ? (
              <span className="text-[#bc9155]">{titleParts.accent}</span>
            ) : null}
            {titleParts.after}
          </h2>
          {data.subtitle ? (
            <p className="mx-auto mt-5 max-w-[760px] text-[15px] leading-[1.85] text-[#5c677d]">
              {data.subtitle}
            </p>
          ) : null}
        </div>
        <div className="mx-auto grid max-w-[760px] gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {(data.items || []).map((item: any, index: number) => (
            <a
              key={`${item.name}-${index}`}
              href={item.url || "#"}
              target="_blank"
              rel="noreferrer"
              className="rounded-[10px] border border-[#1e2b4310] bg-[#f5f1e9] px-4 py-3 text-center text-[13px] font-semibold text-[#1e2b43] transition-all hover:-translate-y-0.5 hover:border-[#bc915544] hover:bg-[#efe6d8]"
            >
              {item.name}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function AdvantageSection({
  intro,
  contractor,
  insurance,
}: {
  intro?: RichTextData;
  contractor?: any;
  insurance?: any;
}) {
  if (!intro || !contractor || !insurance) return null;

  const titleParts = parts(intro.title, intro.highlight_text);
  const introParagraphs = paragraphs(intro.content);

  return (
    <section className="bg-[#f5f1e9] py-20 sm:py-24">
      <div className={SECTION_WIDTH}>
        <div className="mb-12 text-center kitchen-fade-up">
          {label(intro.eyebrow || "The Advantage")}
          <h2 className="text-[clamp(32px,4vw,46px)] font-bold tracking-[-0.02em] text-[#1e2b43]">
            {titleParts.before}
            {titleParts.accent ? (
              <span className="text-[#bc9155]">{titleParts.accent}</span>
            ) : null}
            {titleParts.after}
          </h2>
          {introParagraphs[0] ? (
            <p className="mx-auto mt-5 max-w-[760px] text-[15px] leading-[1.85] text-[#5c677d]">
              {introParagraphs[0]}
            </p>
          ) : null}
        </div>
        <div className="overflow-hidden rounded-[14px] border border-[#1e2b4314] md:grid md:grid-cols-2">
          {[contractor, insurance].map((block: any, index: number) => (
            <div
              key={`${block.title}-${index}`}
              className={cls(
                "bg-[#1e2b43] px-8 py-9",
                index === 1 &&
                  "border-t border-[#bc915533] md:border-l md:border-t-0",
              )}
            >
              <h3 className="text-center font-serif text-[28px] font-bold" style={{ color: "#BC9155" }}>
                {block.title}
              </h3>
              <div className="mx-auto mt-4 h-[2px] w-[40px] rounded-full" style={{ backgroundColor: "rgba(255,255,255,0.6)" }} />
              <div className="mt-6 space-y-4">
                {(block.items || []).map((item: string, itemIndex: number) => (
                  <div
                    key={`${item}-${itemIndex}`}
                    className="flex items-start gap-3 text-[15px] leading-[1.85] text-white/90"
                  >
                    <span className="mt-1 flex-shrink-0 text-[#bc9155]">
                      <Check className="h-4 w-4" />
                    </span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        {introParagraphs[1] ? (
          <p className="mx-auto mt-6 max-w-[760px] text-center text-[14px] leading-[1.85] text-[#5c677d]">
            {introParagraphs[1]}
          </p>
        ) : null}
      </div>
    </section>
  );
}

function ProcessSection({ data }: { data?: any }) {
  if (!data) return null;

  const titleParts = parts(data.title, "Process");

  return (
    <section className="relative overflow-hidden bg-[linear-gradient(135deg,#1e2b43_0%,#151e30_100%)] px-5 py-[52px] text-white md:px-8 md:py-20 lg:px-10 lg:py-[100px]">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-[0.12]"
        style={{
          backgroundImage: `url(${media("/portfolio/builtwell-job-site-aerial-ct.jpg")})`,
        }}
      />
      <div className={cls(SECTION_WIDTH, "relative")}>
        <div className="mb-10 text-center kitchen-fade-up">
          {label("How It Works", true)}
          <h2 className="text-[clamp(32px,4vw,46px)] font-bold tracking-[-0.02em]" style={{ color: "#FFFFFF", textShadow: "0 2px 16px rgba(0,0,0,0.5)" }}>
            {titleParts.before}
            {titleParts.accent ? (
              <span style={{ color: "#BC9155" }}>{titleParts.accent}</span>
            ) : null}
            {titleParts.after}
          </h2>
        </div>
        <style dangerouslySetInnerHTML={{ __html: `
          .ins-process-timeline { display:grid; grid-template-columns:repeat(5,minmax(0,1fr)); gap:0; position:relative; }
          .ins-process-timeline::before { content:""; position:absolute; top:34px; left:10%; right:10%; height:2px; background:rgba(188,145,85,0.25); }
          .ins-process-step { text-align:center; padding:16px 16px 20px; position:relative; cursor:pointer; border-radius:8px; transition:background 0.3s; border:0; background:transparent; color:inherit; display:flex; flex-direction:column; align-items:center; width:100%; outline:none; }
          .ins-process-step:focus,.ins-process-step:focus-visible { outline:none; box-shadow:none; }
          .ins-process-step.is-active { background:rgba(188,145,85,0.14); z-index:2; position:relative; }
          .ins-process-step-num { width:68px; height:68px; border-radius:9999px; background:rgba(188,145,85,0.42); border:2.5px solid #bc9155; display:flex; align-items:center; justify-content:center; margin:-8px auto 20px; font-family:"Playfair Display",serif; font-size:24px; font-weight:700; color:#f5e0c0; position:relative; z-index:2; box-shadow:0 0 0 4px rgba(188,145,85,0.12); flex-shrink:0; }
          .ins-process-step h3 { font-size:18px; margin:0 0 12px; color:#fff; font-weight:700; font-family:"Playfair Display",serif; line-height:1.25; text-align:center; }
          .ins-process-step p { font-size:14px; color:rgba(255,255,255,0.7); line-height:1.65; max-height:0; opacity:0; overflow:hidden; margin:0; transition:max-height 0.4s ease,opacity 0.35s ease,margin-top 0.35s ease; text-align:center; }
          .ins-process-step.is-active p { max-height:640px; opacity:1; margin-top:8px; }
          .ins-process-hint { text-align:center; margin-top:28px; font-size:13px; color:rgba(255,255,255,0.4); }
          @media (max-width:1023px) {
            .ins-process-timeline { grid-template-columns:1fr; gap:12px; max-width:720px; margin:0 auto; }
            .ins-process-timeline::before { display:none; }
            .ins-process-step { padding:16px; flex-direction:row; flex-wrap:wrap; align-items:center; gap:16px; text-align:left; border:1px solid rgba(188,145,85,0.18); background:rgba(255,255,255,0.03); border-radius:10px; }
            .ins-process-step.is-active { border-color:rgba(188,145,85,0.55); background:rgba(188,145,85,0.16); }
            .ins-process-step-num { width:52px; height:52px; font-size:22px; margin:0; box-shadow:0 0 0 3px rgba(188,145,85,0.12); }
            .ins-process-step h3 { text-align:center; font-size:18px; margin:0; flex:1; }
            .ins-process-step p { display:block; max-height:0; opacity:0; text-align:center; margin-top:0; padding-left:0; width:100%; }
            .ins-process-step.is-active p { max-height:640px; opacity:1; margin-top:8px; }
          }
          @media (max-width:639px) { .ins-process-step { padding:14px; } }
        ` }} />
        <div className="ins-process-timeline">
          {(data.steps || []).map((step: any, index: number) => (
            <button
              type="button"
              key={`${step.title}-${index}`}
              className="ins-process-step"
              onClick={(e) => e.currentTarget.classList.toggle("is-active")}
            >
              <div className="ins-process-step-num">{step.step_number || index + 1}</div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </button>
          ))}
        </div>
        <p className="ins-process-hint">Click any step to learn more</p>
      </div>
    </section>
  );
}

function FaqSection({ data }: { data?: any }) {
  if (!data) return null;

  const titleParts = parts(data.title, "FAQ");

  return (
    <section className="bg-white py-20 sm:py-24">
      <div className={SECTION_WIDTH}>
        <div className="mb-12 text-center kitchen-fade-up">
          {label("Common Questions")}
          <h2 className="text-[clamp(32px,4vw,46px)] font-bold tracking-[-0.02em] text-[#1e2b43]">
            {titleParts.before}
            {titleParts.accent ? (
              <span className="text-[#bc9155]">{titleParts.accent}</span>
            ) : null}
            {titleParts.after}
          </h2>
        </div>
        <div className="mx-auto flex max-w-[820px] flex-col gap-3 kitchen-fade-up">
          {(data.items || []).map((item: any, index: number) => (
            <details
              key={`${item.question}-${index}`}
              className="group overflow-hidden rounded-[8px] border border-[#1E2B43]/10 transition-colors duration-200 open:border-[#BC9155]"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 text-left text-[16px] font-semibold text-[#1E2B43] marker:hidden hover:bg-[#BC9155]/[0.04]">
                <span>{item.question}</span>
                <span className="text-[22px] font-light text-[#BC9155] group-open:hidden">
                  +
                </span>
                <span className="hidden text-[22px] font-light text-[#BC9155] group-open:inline">
                  -
                </span>
              </summary>
              <div className="px-6 pb-5 text-[15px] leading-[1.75] text-[#5C677D]">
                {item.answer}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function CallToActionBand({
  data,
  phones,
}: {
  data?: any;
  phones: PhoneItem[];
}) {
  if (!data) return null;

  const titleParts = parts(data.title, "Rebuilt");

  return (
    <section className="relative overflow-hidden bg-[linear-gradient(135deg,#1e2b43_0%,#151e30_100%)] py-20 text-center">
      <div className={cls(SECTION_WIDTH, "relative max-w-[760px]")}>
        {label(data.eyebrow || "Get Started", true)}
        <h2 className="text-[clamp(32px,4vw,46px)] font-bold tracking-[-0.02em]" style={{ color: "#FFFFFF", textShadow: "0 2px 16px rgba(0,0,0,0.5)" }}>
          {titleParts.before}
          {titleParts.accent ? (
            <span style={{ color: "#BC9155" }}>{titleParts.accent}</span>
          ) : null}
          {titleParts.after}
        </h2>
        {data.subtitle ? (
          <p className="mx-auto mt-5 max-w-[680px] text-[16px] leading-[1.85] text-white/90">
            {data.subtitle}
          </p>
        ) : null}
        <HeroButtons
          phones={phones}
          scheduleLabel={data.button?.label}
          scheduleUrl={data.button?.url}
        />
      </div>
    </section>
  );
}

function AreasSection({ data }: { data?: any }) {
  const [countyOpen, setCountyOpen] = useState<Record<number, boolean>>({});

  if (!data) return null;

  const titleParts = parts(data.title, data.highlight_text);

  return (
    <section className="bg-white py-20 sm:py-24">
      <div className={SECTION_WIDTH}>
        <div className="mb-12 text-center kitchen-fade-up">
          {label(data.eyebrow || "Where We Work")}
          <h2 className="text-[clamp(32px,4vw,46px)] font-bold tracking-[-0.02em] text-[#1e2b43]">
            {titleParts.before}
            {titleParts.accent ? (
              <span className="text-[#bc9155]">{titleParts.accent}</span>
            ) : null}
            {titleParts.after}
          </h2>
          {data.subtitle ? (
            <p className="mx-auto mt-5 max-w-[760px] text-[15px] leading-[1.85] text-[#5c677d]">
              {data.subtitle}
            </p>
          ) : null}
        </div>
        <div className="grid gap-8 lg:grid-cols-2">
          {(data.counties || []).map((county: any, index: number) => {
            const expanded = !!countyOpen[index];
            const towns = expanded
              ? [...(county.towns || []), ...(county.extra_towns || [])]
              : county.towns || [];
            const links = county.town_links || {};

            return (
              <article
                key={`${county.name}-${index}`}
                className="kitchen-fade-up group overflow-hidden rounded-[12px] border-b-[3px] border-b-transparent bg-white shadow-[0_2px_12px_rgba(30,43,67,0.06),0_1px_3px_rgba(30,43,67,0.04)] transition-all duration-[350ms] ease-[cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-[6px] hover:border-b-[#BC9155] hover:shadow-[0_16px_40px_rgba(30,43,67,0.1),0_32px_64px_rgba(30,43,67,0.08)]"
              >
                <div className="relative h-[220px] overflow-hidden">
                  <img
                    src={media(
                      county.image,
                      index === 0
                        ? "/images/areas/fairfield-county.jpg"
                        : "/images/areas/new-haven-county.jpg",
                    )}
                    alt={county.name || "BuiltWell service area"}
                    className={cls(
                      "absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105",
                      index === 1 && "object-top",
                    )}
                  />
                  <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#1E2B43]/40 to-transparent" />
                </div>
                <div className="px-7 py-8">
                  <h3 className="mb-[6px] text-[24px] font-bold text-[#1E2B43]">
                    {county.name}
                  </h3>
                  {county.phone ? (
                    <p className="mb-[14px] text-[15px] text-[#5C677D]">
                      Call:{" "}
                      {linkNode(
                        toTelHref(county.phone),
                        county.phone,
                        "font-semibold text-[#BC9155] hover:underline",
                      )}
                    </p>
                  ) : null}
                  {county.description ? (
                    <p className="mb-[18px] border-b border-b-[#1E2B43]/6 pb-[18px] text-[14px] leading-[1.7] text-[#5C677D]">
                      {county.description}
                    </p>
                  ) : null}
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {towns.map((town: string, townIndex: number) => (
                      <div key={`${county.name}-${town}-${townIndex}`}>
                        {linkNode(
                          links[town] || county.url || "#",
                          town,
                          "flex min-h-[32px] w-full items-center justify-center rounded-full bg-[#DFDBD5] px-[10px] py-[7px] text-center text-[11px] font-semibold tracking-[0.2px] text-[#1E2B43] transition-colors duration-200 hover:bg-[#BC9155] hover:text-white",
                        )}
                      </div>
                    ))}
                  </div>
                  {county.extra_towns?.length ? (
                    <button
                      type="button"
                      onClick={() =>
                        setCountyOpen((current) => ({
                          ...current,
                          [index]: !current[index],
                        }))
                      }
                      className="col-span-full mt-1 bg-transparent px-0 py-1 text-center text-[13px] font-semibold text-[#BC9155]"
                    >
                      {expanded ? "Show Less -" : "See All Towns +"}
                    </button>
                  ) : null}
                  {county.url ? (
                    <div className="mt-5">
                      {linkNode(
                        county.url,
                        <>
                          <span>
                            {county.cta_label ||
                              `Learn more about ${county.name}`}
                          </span>
                          <ArrowRight className="h-4 w-4" />
                        </>,
                        "inline-flex items-center gap-2 text-[14px] font-semibold text-[#bc9155] transition-all hover:gap-3",
                      )}
                    </div>
                  ) : null}
                </div>
              </article>
            );
          })}
        </div>
        <p className="mt-7 text-center text-[14px] text-[#5c677d]">
          Not sure if we cover your area?{" "}
          {linkNode(
            "/contact/",
            "Contact our Connecticut reconstruction team",
            "font-semibold text-[#bc9155]",
          )}{" "}
          and we&apos;ll let you know.
        </p>
      </div>
    </section>
  );
}

function TrustStrip({ data }: { data?: any }) {
  const items = data?.items || [];

  if (!items.length) return null;

  return (
    <div className="relative overflow-hidden bg-[linear-gradient(135deg,#1E2B43_0%,#151E30_100%)] px-5 py-14 md:px-10 md:py-[56px]">
      <div className="absolute inset-0 bg-[url('/portfolio/builtwell-job-site-aerial-ct.jpg')] bg-cover bg-center opacity-[0.12]" />
      <div className="relative mx-auto flex max-w-[1240px] flex-wrap items-center justify-center gap-y-2">
        {items.map((item: any, index: number) => (
          <div key={`${item.label}-${index}`} className="contents">
            <a
              href={item.url || "#"}
              target={item.url ? "_blank" : undefined}
              rel={item.url ? "noreferrer" : undefined}
              className="kitchen-fade-up flex min-w-[50%] flex-1 flex-col items-center gap-[10px] px-4 py-3 text-center text-[11px] font-semibold tracking-[0.4px] text-white/90 transition-all duration-300 hover:-translate-y-[2px] hover:text-[#BC9155] md:min-w-[180px] md:px-8 md:py-5 md:text-[13px]"
            >
              <span className="text-[#BC9155] [filter:drop-shadow(0_2px_4px_rgba(188,145,85,0.3))]">
                {iconForValue(item.icon)}
              </span>
              <span>{[item.label, item.value].filter(Boolean).join(" ")}</span>
            </a>
            {index < items.length - 1 ? (
              <div className="hidden h-10 w-px bg-white/10 lg:block" />
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}

function ContactSection({ page, data }: { page: CMSPage; data?: any }) {
  const [pickedServices, setPickedServices] = useState<string[]>([]);
  const [serviceOpen, setServiceOpen] = useState(false);
  const [fileNames, setFileNames] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [formValues, setFormValues] = useState<Record<string, string>>({
    contact_method: "call",
  });

  if (!data) return null;

  const titleParts = parts(data.title, data.title_highlight);
  const fields = (data.fields || []) as LeadField[];
  const topFields = fields.filter((field) =>
    ["name", "phone", "email", "zip"].includes(field.name),
  );
  const servicesField = fields.find((field) => field.type === "checkbox_group");
  const timeField = fields.find((field) => field.name === "best_time");
  const contactField = fields.find((field) => field.type === "radio_group");
  const messageField = fields.find((field) => field.type === "textarea");
  const serviceOptions = normalizeOptions(servicesField?.options);
  const timeOptions = normalizeOptions(timeField?.options);
  const contactOptions = normalizeOptions(contactField?.options);

  return (
    <section
      className="bg-[#F5F1E9] px-5 py-12 md:px-8 md:py-[72px] lg:px-10"
      id="contact"
    >
      <div className={cls(SECTION_WIDTH, "max-w-[1200px]")}>
        <div className="mb-8 text-center kitchen-fade-up">
          {label(data.eyebrow || "Get In Touch")}
          <h2 className="text-[clamp(32px,4vw,46px)] font-bold tracking-[-0.02em] text-[#1e2b43]">
            {titleParts.before}
            {titleParts.accent ? (
              <span className="text-[#bc9155]">{titleParts.accent}</span>
            ) : null}
            {titleParts.after}
          </h2>
          {data.subtitle ? (
            <p className="mx-auto mt-3 max-w-[620px] text-[16px] leading-[1.7] text-[#5c677d]">
              {data.subtitle}
            </p>
          ) : null}
        </div>
        <div className="grid items-stretch gap-8 md:grid-cols-[1fr_1.15fr]">
          <div className="hidden gap-3 kitchen-fade-up md:grid">
            {(data.images || [])
              .slice(0, 2)
              .map((image: any, index: number) => (
                <div
                  key={`${image.alt || "contact"}-${index}`}
                  className="overflow-hidden rounded-[12px] shadow-[0_18px_42px_rgba(30,43,67,0.1)]"
                >
                  <img
                    src={media(
                      image.image,
                      index === 0
                        ? "/portfolio/builtwell-contractor-handshake-arrival-ct-optimized.jpg"
                        : "/images/headers/kitchen-remodeling-header.jpg",
                    )}
                    alt={image.alt || "BuiltWell reconstruction project"}
                    className="h-full min-h-[260px] w-full object-cover"
                  />
                </div>
              ))}
          </div>
          <div className="kitchen-fade-up rounded-[10px] border border-[#1E2B43]/8 bg-white px-5 py-8 shadow-[0_16px_48px_rgba(30,43,67,0.1),0_4px_12px_rgba(30,43,67,0.04)] md:px-9">
            {submitted ? (
              <div className="flex min-h-[430px] flex-col items-center justify-center text-center">
                <h3 className="text-[34px] font-bold text-[#1e2b43]">
                  Thank You
                </h3>
                <p className="mt-3 max-w-[430px] text-[15px] leading-7 text-[#5c677d]">
                  We received your request and will get back to you within one
                  business day.
                </p>
              </div>
            ) : (
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  setSubmitted(true);
                }}
                className="flex flex-col"
              >
                <div className="grid gap-4 md:grid-cols-2">
                  {topFields.map((field) => (
                    <div key={field.name}>
                      <label className="mb-1.5 block text-[13px] font-semibold uppercase tracking-[0.05em] text-[#1e2b43]">
                        {field.label}
                        {field.required ? " *" : ""}
                      </label>
                      <input
                        type={field.type}
                        required={field.required}
                        value={formValues[field.name] || ""}
                        placeholder={field.placeholder || ""}
                        onChange={(event) =>
                          setFormValues((current) => ({
                            ...current,
                            [field.name]: event.target.value,
                          }))
                        }
                        className="w-full rounded-[6px] border border-[#1e2b4326] px-3.5 py-3 text-[15px] text-[#1e2b43] outline-none transition-colors focus:border-[#bc9155]"
                      />
                    </div>
                  ))}
                </div>

                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  {servicesField ? (
                    <div>
                      <label className="mb-1.5 block text-[13px] font-semibold uppercase tracking-[0.05em] text-[#1e2b43]">
                        {servicesField.label}
                        {servicesField.required ? " *" : ""}
                      </label>
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() => setServiceOpen((current) => !current)}
                          className="flex w-full items-center justify-between rounded-[6px] border border-[#1e2b4326] px-3.5 py-3 text-left text-[15px] text-[#1e2b43]"
                        >
                          <span
                            className={cls(
                              "truncate",
                              pickedServices.length
                                ? "font-medium text-[#1e2b43]"
                                : "text-[#5c677d]",
                            )}
                          >
                            {pickedServices.length
                              ? pickedServices.join(", ")
                              : "Select services"}
                          </span>
                          <ChevronDown
                            className={cls(
                              "h-4 w-4 transition-transform",
                              serviceOpen && "rotate-180",
                            )}
                          />
                        </button>
                        <div
                          className={cls(
                            "absolute left-0 right-0 top-[calc(100%+4px)] z-20 max-h-60 overflow-y-auto rounded-[6px] border border-[#1e2b4326] bg-white py-1 shadow-[0_8px_24px_rgba(0,0,0,0.12)]",
                            serviceOpen ? "block" : "hidden",
                          )}
                        >
                          {serviceOptions.map((option) => (
                            <label
                              key={option.value}
                              className="flex cursor-pointer items-center gap-2.5 px-3.5 py-2 text-[14px] text-[#1e2b43] transition-colors hover:bg-[#bc91550f]"
                            >
                              <input
                                type="checkbox"
                                checked={pickedServices.includes(option.value)}
                                onChange={() =>
                                  setPickedServices((current) =>
                                    current.includes(option.value)
                                      ? current.filter(
                                          (value) => value !== option.value,
                                        )
                                      : [...current, option.value],
                                  )
                                }
                                className="h-[18px] w-[18px] rounded-[3px] accent-[#bc9155]"
                              />
                              {option.label}
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : null}

                  {timeField ? (
                    <div>
                      <label className="mb-1.5 block text-[13px] font-semibold uppercase tracking-[0.05em] text-[#1e2b43]">
                        {timeField.label}
                        {timeField.required ? " *" : ""}
                      </label>
                      <select
                        required={timeField.required}
                        value={formValues[timeField.name] || ""}
                        onChange={(event) =>
                          setFormValues((current) => ({
                            ...current,
                            [timeField.name]: event.target.value,
                          }))
                        }
                        className="w-full rounded-[6px] border border-[#1e2b4326] bg-white px-3.5 py-3 text-[15px] text-[#1e2b43] outline-none transition-colors focus:border-[#bc9155]"
                      >
                        <option value="">Select a time</option>
                        {timeOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  ) : null}
                </div>

                {contactField ? (
                  <fieldset className="mt-4">
                    <legend className="mb-1.5 block text-[13px] font-semibold uppercase tracking-[0.05em] text-[#1e2b43]">
                      {contactField.label}
                      {contactField.required ? " *" : ""}
                    </legend>
                    <div className="flex flex-wrap gap-2.5 md:flex-nowrap">
                      {contactOptions.map((option) => {
                        const checked =
                          (formValues[contactField.name] || "call") ===
                          option.value;
                        return (
                          <label
                            key={option.value}
                            className={cls(
                              "flex flex-1 cursor-pointer items-center justify-center rounded-[6px] border-2 px-4 py-3 text-[13px] font-medium transition-colors",
                              checked
                                ? "border-[#bc9155] bg-[#bc91550f] text-[#bc9155]"
                                : "border-[#1e2b431f] bg-white text-[#1e2b43]",
                            )}
                          >
                            <input
                              type="radio"
                              name={contactField.name}
                              checked={checked}
                              onChange={() =>
                                setFormValues((current) => ({
                                  ...current,
                                  [contactField.name]: option.value,
                                }))
                              }
                              className="hidden"
                            />
                            <span>{option.label}</span>
                          </label>
                        );
                      })}
                    </div>
                  </fieldset>
                ) : null}

                {messageField ? (
                  <div className="mt-4">
                    <label className="mb-1.5 block text-[13px] font-semibold uppercase tracking-[0.05em] text-[#1e2b43]">
                      {messageField.label}
                    </label>
                    <textarea
                      rows={5}
                      value={formValues[messageField.name] || ""}
                      placeholder={messageField.placeholder || ""}
                      onChange={(event) =>
                        setFormValues((current) => ({
                          ...current,
                          [messageField.name]: event.target.value,
                        }))
                      }
                      className="min-h-[120px] w-full rounded-[6px] border border-[#1e2b4326] px-3.5 py-3 text-[15px] leading-[1.65] text-[#1e2b43] outline-none transition-colors focus:border-[#bc9155]"
                    />
                  </div>
                ) : null}

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <div>
                    <label
                      className="flex min-h-[52px] cursor-pointer items-center justify-center gap-2 rounded-[8px] border border-[#1e2b4326] px-5 py-3 text-[15px] font-semibold text-[#1e2b43] transition-colors hover:border-[#bc9155]"
                      htmlFor={`${page.slug}-insurance-files`}
                    >
                      <Upload className="h-4 w-4" />
                      Upload Photos
                    </label>
                    <input
                      id={`${page.slug}-insurance-files`}
                      type="file"
                      multiple
                      accept="image/jpeg,image/png,image/heic,.heic"
                      className="hidden"
                      onChange={(event) =>
                        setFileNames(
                          Array.from(event.target.files || []).map(
                            (file) => file.name,
                          ),
                        )
                      }
                    />
                    {fileNames.length ? (
                      <p className="mt-2 text-[12px] text-[#5c677d]">
                        {fileNames.join(", ")}
                      </p>
                    ) : null}
                  </div>
                  <button
                    type="submit"
                    className="min-h-[52px] rounded-[8px] bg-[#bc9155] px-5 py-3 text-[15px] font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-[#a57d48]"
                  >
                    {data.submit_label || "Send Request"}
                  </button>
                </div>
                <p className="mt-4 text-center text-[13px] text-[#5c677d]">
                  {data.consent_text}
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export function InsuranceRestorationPageTemplate({ page }: { page: CMSPage }) {
  const insurancePage = page as InsurancePage;
  const phones = insurancePage.phones?.items?.length
    ? insurancePage.phones.items
    : DEFAULT_PHONES;
  const hero = section<any>(page, "service_hero");
  const trustBars = sections<any>(page, "trust_bar");
  const richTexts = sections<RichTextData>(page, "rich_text");
  const includeSections = sections<any>(page, "service_includes");
  const featureGrids = sections<any>(page, "feature_grid");
  const overview = richTexts.find((item) =>
    item.title?.includes("Rebuilding Homes After"),
  );
  const rights = richTexts.find((item) =>
    item.title?.includes("You Choose Your"),
  );
  const advantage = richTexts.find((item) =>
    item.title?.includes("A General Contractor Built"),
  );
  const financing = richTexts.find(
    (item) => item.style_variant === "financing_strip",
  );
  const gallery = section<any>(page, "image_gallery");
  const rebuild = featureGrids.find((item) =>
    item.title?.includes("What We Rebuild"),
  );
  const whyChoose = featureGrids.find((item) =>
    item.title?.includes("Why Homeowners Choose"),
  );
  const rightsBullets = includeSections.find((item) =>
    item.title?.includes("What This Means"),
  );
  const contractorBullets = includeSections.find((item) =>
    item.title?.includes("Licensed General Contractor"),
  );
  const insuranceBullets = includeSections.find((item) =>
    item.title?.includes("Insurance Claims Expertise"),
  );
  const carriers = section<any>(page, "logo_strip");
  const process = section<any>(page, "service_process");
  const faq = section<any>(page, "faq_list");
  const cta = section<any>(page, "cta_block");
  const areas = section<any>(page, "areas_served");
  const lead = section<any>(page, "lead_form");
  const heroTitleParts = parts(hero?.title, "Reconstruction");

  useEffect(() => {
    const nodes = Array.from(
      document.querySelectorAll<HTMLElement>(".kitchen-fade-up"),
    );
    if (!nodes.length) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      nodes.forEach((node) => node.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <div data-template={page.template} data-page-slug={page.slug}>
      <section className="relative isolate overflow-hidden bg-[#151e30] px-5 pb-8 pt-[80px] text-white sm:pb-9 sm:pt-[92px] md:px-10 md:pb-12 md:pt-[120px]">
        <div
          className="absolute inset-0 bg-cover bg-[position:center_30%] opacity-[0.72]"
          style={{
            backgroundImage: `url(${media(hero?.background_image, "/portfolio/builtwell-team-client-arrival-ct.jpeg")})`,
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(21,30,48,1)_0%,rgba(21,30,48,0.92)_10%,transparent_34%),radial-gradient(ellipse_at_bottom_left,rgba(21,30,48,0.95)_0%,transparent_28%),linear-gradient(180deg,rgba(21,30,48,0.3)_0%,rgba(21,30,48,0.22)_28%,rgba(21,30,48,0.48)_64%,rgba(21,30,48,0.94)_100%)]" />
        <div className="relative mx-auto flex min-h-[35vh] max-w-[1240px] flex-col items-center justify-center text-center sm:min-h-[40vh] lg:min-h-[50vh]">
          <ol className="mb-5 flex list-none items-center text-[13px] font-medium text-white/90 [text-shadow:0_1px_6px_rgba(0,0,0,0.7)]">
            <li>
              {linkNode("/", "Home", "text-white/85 hover:text-[#bc9155]")}
            </li>
            <li className="mx-[10px] text-[#bc9155]" aria-hidden="true">
              &#8250;
            </li>
            <li>
              {linkNode(
                "/services/",
                "Services",
                "text-white/85 hover:text-[#bc9155]",
              )}
            </li>
            <li className="mx-[10px] text-[#bc9155]" aria-hidden="true">
              &#8250;
            </li>
            <li className="font-semibold text-white">Insurance Restoration</li>
          </ol>
          <h1 className="max-w-[900px] font-serif text-[clamp(40px,4.5vw,56px)] font-bold leading-[1.08] tracking-[-0.5px] text-white [text-shadow:0_2px_20px_rgba(0,0,0,0.5)]">
            {heroTitleParts.before}
            {heroTitleParts.accent ? (
              <span className="text-[#bc9155]">{heroTitleParts.accent}</span>
            ) : null}
            {heroTitleParts.after}
          </h1>
          {hero?.subtitle ? (
            <p className="mt-4 max-w-[560px] text-[17px] leading-[1.7] text-white/80">
              {hero.subtitle}
            </p>
          ) : null}
          <HeroButtons
            phones={phones}
            scheduleLabel={hero?.primary_cta?.label}
            scheduleUrl={hero?.primary_cta?.url}
          />
        </div>
      </section>

      <TrustMetricBar data={trustBars[0]} />
      <TwoColumnTextSection copy={overview} images={gallery} />
      <RightsSection copy={rights} bullets={rightsBullets} />
      <RebuildGrid data={rebuild} />
      <WhyChooseSection data={whyChoose} />
      <CarriersSection data={carriers} />
      <AdvantageSection
        intro={advantage}
        contractor={contractorBullets}
        insurance={insuranceBullets}
      />
      <ProcessSection data={process} />
      <FaqSection data={faq} />
      <CallToActionBand data={cta} phones={phones} />
      <SharedAreasSection data={areas} />
      <TrustStrip data={trustBars[1]} />
      <ContactSection page={page} data={lead} />
      <FinancingStrip data={financing} />
      <style jsx global>{`
        .kitchen-fade-up {
          opacity: 0;
          transform: translateY(30px);
          transition:
            opacity 0.7s ease,
            transform 0.7s ease;
        }
        .kitchen-fade-up.is-visible {
          opacity: 1;
          transform: translateY(0);
        }
        @media (prefers-reduced-motion: reduce) {
          .kitchen-fade-up {
            opacity: 1;
            transform: none;
            transition: none;
          }
        }
      `}</style>
    </div>
  );
}

"use client";

import { useState } from "react";
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
  ShieldCheck,
  Star,
  Upload,
} from "lucide-react";
import type { CMSPage } from "@/types/cms";
import { FinancingStrip, cls, label, linkNode, media, parts, section, sections } from "./template-utils";

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

const SECTION_WIDTH = "mx-auto max-w-[1100px] px-6 sm:px-8 lg:px-10";

function paragraphs(value?: string | null) {
  return (value || "")
    .replace(/\r/g, "")
    .split(/\n{2,}/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function normalizeOptions(options?: LeadField["options"]) {
  return (options || []).map((option) => (typeof option === "string" ? { label: option, value: option } : option));
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
      return <ShieldCheck className="h-6 w-6" />;
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
    <div className="mt-8 flex flex-wrap justify-center gap-4">
      {phones.map((phone) => (
        <a
          key={`${phone.label}-${phone.number}`}
          href={toTelHref(phone.number)}
          className="flex min-w-[185px] flex-col items-center rounded-[10px] border border-white/15 bg-[#0b132333] px-6 py-4 text-center text-white backdrop-blur-md transition-all hover:-translate-y-0.5 hover:border-white/30 hover:bg-[#0b132355]"
        >
          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70">{phone.label}</span>
          <span className="mt-1 font-serif text-[21px] font-bold">{phone.number}</span>
        </a>
      ))}
      <a
        href={scheduleUrl || "#contact"}
        className="flex min-w-[185px] flex-col items-center rounded-[10px] border border-[#bc9155] bg-[#bc9155] px-6 py-4 text-center text-white transition-all hover:-translate-y-0.5 hover:bg-[#a57d48]"
      >
        <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/85">Free Estimate</span>
        <span className="mt-1 font-serif text-[21px] font-bold">{scheduleLabel || "Schedule Now"}</span>
      </a>
    </div>
  );
}

function TrustMetricBar({ data }: { data?: any }) {
  const items = data?.items || [];

  if (!items.length) return null;

  return (
    <section className="border-y border-[#bc915533] bg-[linear-gradient(135deg,#1e2b43_0%,#151e30_100%)]">
      <div className="mx-auto grid max-w-[1280px] md:grid-cols-4">
        {items.map((item: any, index: number) => (
          <div
            key={`${item.label}-${index}`}
            className="flex min-h-[122px] flex-col items-center justify-center border-b border-white/8 px-5 py-6 text-center transition-colors hover:bg-[#bc91550f] md:border-b-0 md:border-r md:border-r-white/8 last:md:border-r-0"
          >
            {item.value ? (
              <div className="font-serif text-[42px] font-bold leading-none text-[#bc9155]">{item.value}</div>
            ) : (
              <div className="text-[#bc9155]">{iconForValue(item.icon)}</div>
            )}
            <div className="mt-2 text-[12px] font-semibold uppercase tracking-[0.18em] text-white/65">{item.label}</div>
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
    <section className={cls("py-20 sm:py-24", surface === "cream" ? "bg-[#f5f1e9]" : "bg-white")}>
      <div className={SECTION_WIDTH}>
        <div className="mb-12 text-center">
          {label(copy.eyebrow || "Overview")}
          <h2 className="text-[clamp(32px,4vw,46px)] font-bold tracking-[-0.02em] text-[#1e2b43]">
            {titleParts.before}
            {titleParts.accent ? <span className="text-[#bc9155]">{titleParts.accent}</span> : null}
            {titleParts.after}
          </h2>
        </div>
        <div className="grid gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:items-stretch">
          <div className="space-y-5">
            {paragraphs(copy.content).map((paragraph, index) => (
              <p key={index} className="text-[15px] leading-[1.9] text-[#5c677d] md:text-[16px]">
                {paragraph}
              </p>
            ))}
          </div>
          <div className="grid gap-4">
            {(imageItems.length ? imageItems : [{ image: "" }, { image: "" }]).slice(0, 2).map((item: any, index: number) => (
              <div key={`${item.alt || "overview"}-${index}`} className="overflow-hidden rounded-[12px] shadow-[0_18px_45px_rgba(30,43,67,0.08)]">
                <img
                  src={media(item.image, index === 0 ? "/portfolio/builtwell-contractor-handshake-arrival-ct-optimized.jpg" : "/portfolio/builtwell-team-completed-interior-ct.png")}
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

function RightsSection({ copy, bullets }: { copy?: RichTextData; bullets?: any }) {
  if (!copy || !bullets) return null;

  const titleParts = parts(copy.title, copy.highlight_text);

  return (
    <section className="bg-[#f5f1e9] py-20 sm:py-24">
      <div className={SECTION_WIDTH}>
        <div className="mb-12 text-center">
          {label(copy.eyebrow || "Know Your Rights")}
          <h2 className="text-[clamp(32px,4vw,46px)] font-bold tracking-[-0.02em] text-[#1e2b43]">
            {titleParts.before}
            {titleParts.accent ? <span className="text-[#bc9155]">{titleParts.accent}</span> : null}
            {titleParts.after}
          </h2>
        </div>
        <div className="grid gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:items-stretch">
          <div className="space-y-5">
            {paragraphs(copy.content).map((paragraph, index) => (
              <p key={index} className="text-[15px] leading-[1.9] text-[#5c677d] md:text-[16px]">
                {paragraph}
              </p>
            ))}
          </div>
          <div className="flex items-center">
            <div className="w-full rounded-[14px] bg-[#1e2b43] px-8 py-10 text-center shadow-[0_20px_48px_rgba(21,30,48,0.18)]">
              <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-[#bc915526] text-[#bc9155]">
                <Shield className="h-7 w-7" />
              </div>
              <h3 className="font-serif text-[28px] font-bold text-white">{bullets.title}</h3>
              <div className="mt-7 space-y-4 text-left">
                {(bullets.items || []).map((item: string, index: number) => (
                  <div key={`${item}-${index}`} className="flex gap-3 text-[14px] leading-[1.8] text-white/82">
                    <span className="mt-1.5 text-[#bc9155]"><Check className="h-4 w-4" /></span>
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
        <div className="mb-12 text-center">
          {label("Reconstruction Services")}
          <h2 className="text-[clamp(32px,4vw,46px)] font-bold tracking-[-0.02em] text-[#1e2b43]">
            {titleParts.before}
            {titleParts.accent ? <span className="text-[#bc9155]">{titleParts.accent}</span> : null}
            {titleParts.after}
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {(data.items || []).map((item: any, index: number) => (
            <article key={`${item.title}-${index}`} className="rounded-[14px] border border-[#1e2b4310] bg-white p-8 shadow-[0_12px_30px_rgba(30,43,67,0.06)] transition-transform hover:-translate-y-1">
              <h3 className="text-[22px] font-bold text-[#1e2b43]">{item.title}</h3>
              <p className="mt-4 text-[14px] leading-[1.82] text-[#5c677d]">{item.description}</p>
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
        <div className="mb-12 text-center">
          {label("The Difference")}
          <h2 className="text-[clamp(32px,4vw,46px)] font-bold tracking-[-0.02em] text-[#1e2b43]">
            {titleParts.before}
            {titleParts.accent ? <span className="text-[#bc9155]">{titleParts.accent}</span> : null}
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
              <h3 className="text-[21px] font-bold text-[#1e2b43]">{item.title}</h3>
              <p className="mt-4 text-[14px] leading-[1.78] text-[#5c677d]">{item.description}</p>
            </article>
          ))}
        </div>
        <p className="mt-7 text-center text-[13px] text-[#5c677d]/70">Hover over any item to learn more</p>
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
            {titleParts.accent ? <span className="text-[#bc9155]">{titleParts.accent}</span> : null}
            {titleParts.after}
          </h2>
          {data.subtitle ? <p className="mx-auto mt-5 max-w-[760px] text-[15px] leading-[1.85] text-[#5c677d]">{data.subtitle}</p> : null}
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
        <div className="mb-12 text-center">
          {label(intro.eyebrow || "The Advantage")}
          <h2 className="text-[clamp(32px,4vw,46px)] font-bold tracking-[-0.02em] text-[#1e2b43]">
            {titleParts.before}
            {titleParts.accent ? <span className="text-[#bc9155]">{titleParts.accent}</span> : null}
            {titleParts.after}
          </h2>
          {introParagraphs[0] ? <p className="mx-auto mt-5 max-w-[760px] text-[15px] leading-[1.85] text-[#5c677d]">{introParagraphs[0]}</p> : null}
        </div>
        <div className="overflow-hidden rounded-[14px] border border-[#1e2b4314] md:grid md:grid-cols-2">
          {[contractor, insurance].map((block: any, index: number) => (
            <div
              key={`${block.title}-${index}`}
              className={cls(
                "bg-[#1e2b43] px-8 py-9",
                index === 1 && "border-t border-[#bc915533] md:border-l md:border-t-0",
              )}
            >
              <h3 className="font-serif text-[28px] font-bold text-[#bc9155]">{block.title}</h3>
              <div className="mt-6 space-y-4">
                {(block.items || []).map((item: string, itemIndex: number) => (
                  <div key={`${item}-${itemIndex}`} className="flex gap-3 text-[14px] leading-[1.82] text-white/84">
                    <span className="mt-1.5 text-[#bc9155]"><Check className="h-4 w-4" /></span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        {introParagraphs[1] ? <p className="mx-auto mt-6 max-w-[760px] text-center text-[14px] leading-[1.85] text-[#5c677d]">{introParagraphs[1]}</p> : null}
      </div>
    </section>
  );
}

function ProcessSection({ data }: { data?: any }) {
  if (!data) return null;

  const titleParts = parts(data.title, "Process");

  return (
    <section className="relative overflow-hidden bg-[linear-gradient(135deg,#1e2b43_0%,#151e30_100%)] py-20 sm:py-24">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-[0.12]"
        style={{ backgroundImage: `url(${media("/portfolio/builtwell-job-site-aerial-ct.jpg")})` }}
      />
      <div className={cls(SECTION_WIDTH, "relative")}>
        <div className="mb-12 text-center">
          {label("How It Works", true)}
          <h2 className="text-[clamp(32px,4vw,46px)] font-bold tracking-[-0.02em] text-white">
            {titleParts.before}
            {titleParts.accent ? <span className="text-[#bc9155]">{titleParts.accent}</span> : null}
            {titleParts.after}
          </h2>
        </div>
        <div className="grid gap-5 lg:grid-cols-4">
          {(data.steps || []).map((step: any, index: number) => (
            <article
              key={`${step.title}-${index}`}
              className="rounded-[14px] border border-white/10 bg-white/5 px-6 py-7 text-white shadow-[0_12px_30px_rgba(0,0,0,0.12)] backdrop-blur-sm transition-all hover:-translate-y-1 hover:border-[#bc915566] hover:bg-white/8"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#bc9155] text-[18px] font-bold text-white">
                {step.step_number || index + 1}
              </div>
              <h3 className="text-[22px] font-bold">{step.title}</h3>
              <p className="mt-4 text-[14px] leading-[1.82] text-white/75">{step.description}</p>
            </article>
          ))}
        </div>
        <p className="mt-6 text-center text-[13px] text-white/45">Hover over any step to learn more</p>
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
        <div className="mb-12 text-center">
          {label("Common Questions")}
          <h2 className="text-[clamp(32px,4vw,46px)] font-bold tracking-[-0.02em] text-[#1e2b43]">
            {titleParts.before}
            {titleParts.accent ? <span className="text-[#bc9155]">{titleParts.accent}</span> : null}
            {titleParts.after}
          </h2>
        </div>
        <div className="mx-auto flex max-w-[820px] flex-col gap-3">
          {(data.items || []).map((item: any, index: number) => (
            <details key={`${item.question}-${index}`} className="group overflow-hidden rounded-[10px] border border-[#1e2b4310] bg-[#f5f1e9]">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 text-left text-[15px] font-semibold text-[#1e2b43] marker:hidden">
                <span>{item.question}</span>
                <ChevronDown className="h-4 w-4 shrink-0 transition-transform group-open:rotate-180" />
              </summary>
              <div className="px-6 pb-6 text-[14px] leading-[1.82] text-[#5c677d]">{item.answer}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function CallToActionBand({ data, phones }: { data?: any; phones: PhoneItem[] }) {
  if (!data) return null;

  const titleParts = parts(data.title, "Rebuilt");

  return (
    <section className="relative overflow-hidden bg-[linear-gradient(135deg,#1e2b43_0%,#151e30_100%)] py-20 text-center">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-10"
        style={{ backgroundImage: `url(${media("/portfolio/builtwell-team-client-arrival-ct.jpeg")})` }}
      />
      <div className={cls(SECTION_WIDTH, "relative max-w-[760px]")}>
        {label(data.eyebrow || "Get Started", true)}
        <h2 className="text-[clamp(32px,4vw,46px)] font-bold tracking-[-0.02em] text-white">
          {titleParts.before}
          {titleParts.accent ? <span className="text-[#bc9155]">{titleParts.accent}</span> : null}
          {titleParts.after}
        </h2>
        {data.subtitle ? <p className="mx-auto mt-5 max-w-[680px] text-[15px] leading-[1.85] text-white/72">{data.subtitle}</p> : null}
        <HeroButtons phones={phones} scheduleLabel={data.button?.label} scheduleUrl={data.button?.url} />
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
        <div className="mb-12 text-center">
          {label(data.eyebrow || "Where We Work")}
          <h2 className="text-[clamp(32px,4vw,46px)] font-bold tracking-[-0.02em] text-[#1e2b43]">
            {titleParts.before}
            {titleParts.accent ? <span className="text-[#bc9155]">{titleParts.accent}</span> : null}
            {titleParts.after}
          </h2>
          {data.subtitle ? <p className="mx-auto mt-5 max-w-[760px] text-[15px] leading-[1.85] text-[#5c677d]">{data.subtitle}</p> : null}
        </div>
        <div className="grid gap-8 lg:grid-cols-2">
          {(data.counties || []).map((county: any, index: number) => {
            const expanded = !!countyOpen[index];
            const towns = expanded ? [...(county.towns || []), ...(county.extra_towns || [])] : county.towns || [];
            const links = county.town_links || {};

            return (
              <article key={`${county.name}-${index}`} className="overflow-hidden rounded-[14px] border border-[#1e2b4310] bg-white shadow-[0_18px_40px_rgba(30,43,67,0.08)]">
                <div className="h-[230px] overflow-hidden">
                  <img
                    src={media(county.image, index === 0 ? "/images/areas/fairfield-county.jpg" : "/images/areas/new-haven-county.jpg")}
                    alt={county.name || "BuiltWell service area"}
                    className={cls("h-full w-full object-cover", index === 1 && "object-top")}
                  />
                </div>
                <div className="p-7">
                  <h3 className="text-[30px] font-bold text-[#1e2b43]">{county.name}</h3>
                  {county.phone ? (
                    <p className="mt-1 text-[15px] text-[#5c677d]">
                      Call: {linkNode(toTelHref(county.phone), county.phone, "font-semibold text-[#bc9155] hover:underline")}
                    </p>
                  ) : null}
                  {county.description ? <p className="mt-4 text-[14px] leading-[1.8] text-[#5c677d]">{county.description}</p> : null}
                  <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {towns.map((town: string, townIndex: number) => (
                      <div key={`${county.name}-${town}-${townIndex}`}>
                        {linkNode(
                          links[town] || county.url || "#",
                          town,
                          "block rounded-full bg-[#f5f1e9] px-3 py-2 text-center text-[11px] font-semibold text-[#1e2b43] transition-colors hover:bg-[#bc9155] hover:text-white",
                        )}
                      </div>
                    ))}
                  </div>
                  {county.extra_towns?.length ? (
                    <button
                      type="button"
                      onClick={() => setCountyOpen((current) => ({ ...current, [index]: !current[index] }))}
                      className="mt-4 text-[13px] font-semibold text-[#bc9155] transition-colors hover:text-[#a57d48]"
                    >
                      {expanded ? "Show Less -" : "See All Towns +"}
                    </button>
                  ) : null}
                  {county.url ? (
                    <div className="mt-5">
                      {linkNode(
                        county.url,
                        <>
                          <span>{county.cta_label || `Learn more about ${county.name}`}</span>
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
          {linkNode("/contact/", "Contact our Connecticut reconstruction team", "font-semibold text-[#bc9155]")}
          {" "}and we&apos;ll let you know.
        </p>
      </div>
    </section>
  );
}

function TrustStrip({ data }: { data?: any }) {
  const items = data?.items || [];

  if (!items.length) return null;

  return (
    <div className="bg-[linear-gradient(135deg,#1a2438_0%,#1e2b43_50%,#151e30_100%)] px-6 py-4 sm:px-8">
      <div className="mx-auto flex max-w-[1240px] flex-wrap items-center justify-center gap-y-2">
        {items.map((item: any, index: number) => (
          <div key={`${item.label}-${index}`} className="contents">
            <a
              href={item.url || "#"}
              target={item.url ? "_blank" : undefined}
              rel={item.url ? "noreferrer" : undefined}
              className="flex min-w-[210px] flex-1 items-center justify-center gap-3 px-6 py-4 text-center text-[13px] font-semibold text-white/90 transition-colors hover:text-[#bc9155]"
            >
              <span className="text-[#bc9155]">{iconForValue(item.icon)}</span>
              <span>{[item.label, item.value].filter(Boolean).join(" ")}</span>
            </a>
            {index < items.length - 1 ? <div className="hidden h-10 w-px bg-white/10 lg:block" /> : null}
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
  const [formValues, setFormValues] = useState<Record<string, string>>({ contact_method: "call" });

  if (!data) return null;

  const titleParts = parts(data.title, data.title_highlight);
  const fields = (data.fields || []) as LeadField[];
  const topFields = fields.filter((field) => ["name", "phone", "email", "zip"].includes(field.name));
  const servicesField = fields.find((field) => field.type === "checkbox_group");
  const timeField = fields.find((field) => field.name === "best_time");
  const contactField = fields.find((field) => field.type === "radio_group");
  const messageField = fields.find((field) => field.type === "textarea");
  const serviceOptions = normalizeOptions(servicesField?.options);
  const timeOptions = normalizeOptions(timeField?.options);
  const contactOptions = normalizeOptions(contactField?.options);

  return (
    <section className="bg-white py-20 sm:py-24" id="contact">
      <div className={cls(SECTION_WIDTH, "max-w-[1200px]")}>
        <div className="mb-10 text-center">
          {label(data.eyebrow || "Get In Touch")}
          <h2 className="text-[clamp(32px,4vw,46px)] font-bold tracking-[-0.02em] text-[#1e2b43]">
            {titleParts.before}
            {titleParts.accent ? <span className="text-[#bc9155]">{titleParts.accent}</span> : null}
            {titleParts.after}
          </h2>
          {data.subtitle ? <p className="mx-auto mt-5 max-w-[720px] text-[15px] leading-[1.85] text-[#5c677d]">{data.subtitle}</p> : null}
        </div>
        <div className="grid gap-8 lg:grid-cols-[0.94fr_1.06fr]">
          <div className="grid gap-4">
            {(data.images || []).slice(0, 2).map((image: any, index: number) => (
              <div key={`${image.alt || "contact"}-${index}`} className="overflow-hidden rounded-[12px] shadow-[0_18px_42px_rgba(30,43,67,0.1)]">
                <img
                  src={media(image.image, index === 0 ? "/portfolio/builtwell-contractor-handshake-arrival-ct-optimized.jpg" : "/images/headers/kitchen-remodeling-header.jpg")}
                  alt={image.alt || "BuiltWell reconstruction project"}
                  className="h-[270px] w-full object-cover"
                />
              </div>
            ))}
          </div>
          <div className="rounded-[14px] border border-[#e4dac9] bg-white px-6 py-8 shadow-[0_22px_48px_rgba(30,43,67,0.1)] md:px-8">
            {submitted ? (
              <div className="flex min-h-[430px] flex-col items-center justify-center text-center">
                <h3 className="text-[34px] font-bold text-[#1e2b43]">Thank You</h3>
                <p className="mt-3 max-w-[430px] text-[15px] leading-7 text-[#5c677d]">
                  We received your request and will get back to you within one business day.
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
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
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
                        onChange={(event) => setFormValues((current) => ({ ...current, [field.name]: event.target.value }))}
                        className="w-full rounded-[6px] border border-[#1e2b4326] px-3.5 py-3 text-[15px] text-[#1e2b43] outline-none transition-colors focus:border-[#bc9155]"
                      />
                    </div>
                  ))}
                </div>

                <div className="mt-4 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
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
                          <span className={cls("truncate", pickedServices.length ? "font-medium text-[#1e2b43]" : "text-[#5c677d]")}>
                            {pickedServices.length ? pickedServices.join(", ") : "Select services"}
                          </span>
                          <ChevronDown className={cls("h-4 w-4 transition-transform", serviceOpen && "rotate-180")} />
                        </button>
                        <div className={cls(
                          "absolute left-0 right-0 top-[calc(100%+4px)] z-20 max-h-60 overflow-y-auto rounded-[6px] border border-[#1e2b4326] bg-white py-1 shadow-[0_8px_24px_rgba(0,0,0,0.12)]",
                          serviceOpen ? "block" : "hidden",
                        )}>
                          {serviceOptions.map((option) => (
                            <label key={option.value} className="flex cursor-pointer items-center gap-2.5 px-3.5 py-2 text-[14px] text-[#1e2b43] transition-colors hover:bg-[#bc91550f]">
                              <input
                                type="checkbox"
                                checked={pickedServices.includes(option.value)}
                                onChange={() =>
                                  setPickedServices((current) =>
                                    current.includes(option.value)
                                      ? current.filter((value) => value !== option.value)
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
                        onChange={(event) => setFormValues((current) => ({ ...current, [timeField.name]: event.target.value }))}
                        className="w-full rounded-[6px] border border-[#1e2b4326] bg-white px-3.5 py-3 text-[15px] text-[#1e2b43] outline-none transition-colors focus:border-[#bc9155]"
                      >
                        <option value="">Select a time</option>
                        {timeOptions.map((option) => (
                          <option key={option.value} value={option.value}>{option.label}</option>
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
                        const checked = (formValues[contactField.name] || "call") === option.value;
                        return (
                          <label
                            key={option.value}
                            className={cls(
                              "flex flex-1 cursor-pointer items-center justify-center rounded-[6px] border-2 px-4 py-3 text-[13px] font-medium transition-colors",
                              checked ? "border-[#bc9155] bg-[#bc91550f] text-[#bc9155]" : "border-[#1e2b431f] bg-white text-[#1e2b43]",
                            )}
                          >
                            <input
                              type="radio"
                              name={contactField.name}
                              checked={checked}
                              onChange={() => setFormValues((current) => ({ ...current, [contactField.name]: option.value }))}
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
                      onChange={(event) => setFormValues((current) => ({ ...current, [messageField.name]: event.target.value }))}
                      className="min-h-[180px] w-full rounded-[6px] border border-[#1e2b4326] px-3.5 py-3 text-[15px] leading-[1.65] text-[#1e2b43] outline-none transition-colors focus:border-[#bc9155]"
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
                      onChange={(event) => setFileNames(Array.from(event.target.files || []).map((file) => file.name))}
                    />
                    {fileNames.length ? <p className="mt-2 text-[12px] text-[#5c677d]">{fileNames.join(", ")}</p> : null}
                  </div>
                  <button type="submit" className="min-h-[52px] rounded-[8px] bg-[#bc9155] px-5 py-3 text-[15px] font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-[#a57d48]">
                    {data.submit_label || "Send Request"}
                  </button>
                </div>
                <p className="mt-4 text-center text-[13px] text-[#5c677d]">{data.consent_text}</p>
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
  const phones = insurancePage.phones?.items?.length ? insurancePage.phones.items : DEFAULT_PHONES;
  const hero = section<any>(page, "service_hero");
  const trustBars = sections<any>(page, "trust_bar");
  const richTexts = sections<RichTextData>(page, "rich_text");
  const includeSections = sections<any>(page, "service_includes");
  const featureGrids = sections<any>(page, "feature_grid");
  const overview = richTexts.find((item) => item.title?.includes("Rebuilding Homes After"));
  const rights = richTexts.find((item) => item.title?.includes("You Choose Your"));
  const advantage = richTexts.find((item) => item.title?.includes("A General Contractor Built"));
  const financing = richTexts.find((item) => item.style_variant === "financing_strip");
  const gallery = section<any>(page, "image_gallery");
  const rebuild = featureGrids.find((item) => item.title?.includes("What We Rebuild"));
  const whyChoose = featureGrids.find((item) => item.title?.includes("Why Homeowners Choose"));
  const rightsBullets = includeSections.find((item) => item.title?.includes("What This Means"));
  const contractorBullets = includeSections.find((item) => item.title?.includes("Licensed General Contractor"));
  const insuranceBullets = includeSections.find((item) => item.title?.includes("Insurance Claims Expertise"));
  const carriers = section<any>(page, "logo_strip");
  const process = section<any>(page, "service_process");
  const faq = section<any>(page, "faq_list");
  const cta = section<any>(page, "cta_block");
  const areas = section<any>(page, "areas_served");
  const lead = section<any>(page, "lead_form");
  const heroTitleParts = parts(hero?.title, "Reconstruction");

  return (
    <div data-template={page.template} data-page-slug={page.slug}>
      <section className="relative isolate overflow-hidden bg-[#151e30] px-6 pb-14 pt-[108px] text-white sm:px-8 lg:px-10">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-70"
          style={{ backgroundImage: `url(${media(hero?.background_image, "/portfolio/builtwell-team-client-arrival-ct.jpeg")})` }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(21,30,48,1)_0%,rgba(21,30,48,0.92)_10%,transparent_34%),radial-gradient(ellipse_at_bottom_left,rgba(21,30,48,0.95)_0%,transparent_28%),linear-gradient(180deg,rgba(21,30,48,0.3)_0%,rgba(21,30,48,0.22)_28%,rgba(21,30,48,0.48)_64%,rgba(21,30,48,0.94)_100%)]" />
        <div className="relative mx-auto flex min-h-[470px] max-w-[1240px] flex-col items-center justify-center text-center">
          <ol className="mb-6 flex flex-wrap items-center justify-center gap-1 text-[13px] font-medium text-white/86">
            <li>{linkNode("/", "Home", "transition-colors hover:text-[#bc9155]")}</li>
            <li className="px-2.5 text-[#bc9155]">›</li>
            <li>{linkNode("/services/", "Services", "transition-colors hover:text-[#bc9155]")}</li>
            <li className="px-2.5 text-[#bc9155]">›</li>
            <li className="font-semibold text-white">Insurance Restoration</li>
          </ol>
          <h1 className="max-w-[820px] text-[clamp(40px,5vw,58px)] font-bold leading-[1.06] tracking-[-0.03em] text-white">
            {heroTitleParts.before}
            {heroTitleParts.accent ? <span className="text-[#bc9155]">{heroTitleParts.accent}</span> : null}
            {heroTitleParts.after}
          </h1>
          {hero?.subtitle ? <p className="mt-5 max-w-[700px] text-[16px] leading-[1.82] text-white/82 md:text-[17px]">{hero.subtitle}</p> : null}
          <HeroButtons phones={phones} scheduleLabel={hero?.primary_cta?.label} scheduleUrl={hero?.primary_cta?.url} />
        </div>
      </section>

      <TrustMetricBar data={trustBars[0]} />
      <TwoColumnTextSection copy={overview} images={gallery} />
      <RightsSection copy={rights} bullets={rightsBullets} />
      <RebuildGrid data={rebuild} />
      <WhyChooseSection data={whyChoose} />
      <CarriersSection data={carriers} />
      <AdvantageSection intro={advantage} contractor={contractorBullets} insurance={insuranceBullets} />
      <ProcessSection data={process} />
      <FaqSection data={faq} />
      <CallToActionBand data={cta} phones={phones} />
      <AreasSection data={areas} />
      <TrustStrip data={trustBars[1]} />
      <ContactSection page={page} data={lead} />
      <FinancingStrip data={financing} />
    </div>
  );
}

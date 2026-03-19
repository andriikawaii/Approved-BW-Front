"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Clock,
  Hammer,
  Lightbulb,
  MapPin,
  Phone,
  Quote,
  Shield,
  Sparkles,
  Star,
  Tag,
  Trophy,
  Users,
} from "lucide-react";
import type { CMSPage } from "@/types/cms";
import { cls, media, section, sections, linkNode } from "./template-utils";

/* ─────────────────────── types ─────────────────────── */

type HeaderData = {
  title?: string;
  subtitle?: string | null;
  cover_image?: string | null;
  cover_alt?: string | null;
};

type MetaItem = { label?: string; value?: string };
type MetaData = { items?: MetaItem[] };
type BodyBlock = { heading?: string; content?: string };
type BodyData = { blocks?: BodyBlock[] };
type GalleryItem = { image?: string; alt?: string; caption?: string | null };
type GalleryData = { items?: GalleryItem[] };

type TestimonialItem = {
  quote?: string;
  name?: string;
  location?: string;
  role?: string;
  rating?: number;
  image?: string | null;
  avatar?: string | null;
};
type TestimonialsData = { items?: TestimonialItem[]; title?: string };

type RichTextData = {
  eyebrow?: string;
  title?: string;
  highlight_text?: string | null;
  content?: string;
  style_variant?: string;
  cta?: { label?: string; url?: string } | null;
};

type CtaBlockData = {
  eyebrow?: string | null;
  title?: string;
  subtitle?: string;
  button?: { label?: string; url?: string };
  subtext?: string;
};

type HighlightData = {
  image?: string | null;
  outcome?: string;
  headline?: string;
  solution?: string;
  challenge?: string;
  project_details?: {
    duration?: string;
    location?: string;
    service_type?: string;
  };
};

/* ─────────────────────── constants ─────────────────────── */

const RELATED = [
  { title: "Whole-Home Restoration", location: "Hamden, CT", slug: "/case-studies/whole-home-restoration-hamden", badge: "Full Home", image: "/portfolio/builtwell-team-interior-inspection-ct.jpg" },
  { title: "Basement Finishing", location: "Darien, CT", slug: "/case-studies/basement-finishing-darien", badge: "Basement", image: "/images/headers/basement-finishing-header.jpg" },
  { title: "Bathroom Remodeling", location: "Westport, CT", slug: "/case-studies/bathroom-remodeling-westport", badge: "Bathroom", image: "/images/headers/bathroom-remodeling-header.jpg" },
  { title: "Kitchen Remodeling", location: "New Canaan, CT", slug: "/case-studies/kitchen-remodeling-new-canaan", badge: "Kitchen", image: "/images/headers/kitchen-remodeling-header.jpg" },
  { title: "Kitchen + Flooring", location: "Milford, CT", slug: "/case-studies/kitchen-remodeling-milford", badge: "Kitchen", image: "/portfolio/builtwell-team-completed-interior-ct.png" },
];

function metaIcon(label: string) {
  const l = label.toLowerCase();
  if (l.includes("location")) return <MapPin className="h-5 w-5" />;
  if (l.includes("timeline") || l.includes("duration")) return <CalendarDays className="h-5 w-5" />;
  if (l.includes("service") || l.includes("type")) return <Hammer className="h-5 w-5" />;
  if (l.includes("client")) return <Users className="h-5 w-5" />;
  return <Tag className="h-5 w-5" />;
}

/* ─────────────────────── scroll animation ─────────────────────── */

function useFadeUp() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const targets = el.querySelectorAll<HTMLElement>("[data-fade-up]");
    targets.forEach((t) => { t.style.opacity = "0"; t.style.transform = "translateY(28px)"; t.style.transition = "opacity 0.7s cubic-bezier(0.4,0,0.2,1), transform 0.7s cubic-bezier(0.4,0,0.2,1)"; });
    const obs = new IntersectionObserver((entries) => { entries.forEach((e) => { if (e.isIntersecting) { (e.target as HTMLElement).style.opacity = "1"; (e.target as HTMLElement).style.transform = "translateY(0)"; obs.unobserve(e.target); } }); }, { threshold: 0.08 });
    targets.forEach((t) => obs.observe(t));
    return () => obs.disconnect();
  }, []);
  return ref;
}

/* ─────────────────────── markdown helpers ─────────────────────── */

function isMarkdownTable(p: string) { const l = p.split("\n").map(s => s.trim()).filter(Boolean); return l.length >= 2 && l.every(s => s.startsWith("|") && s.endsWith("|")); }

function parseMarkdownTable(p: string) {
  const lines = p.split("\n").map(s => s.trim()).filter(Boolean);
  if (lines.length < 2) return null;
  const rows = lines.filter((l, i) => !(i === 1 && /^[|\s:-]+$/.test(l))).map(l => l.split("|").slice(1, -1).map(c => c.trim())).filter(r => r.length > 0);
  return rows.length < 1 ? null : { headers: rows[0], rows: rows.slice(1) };
}

function isBulletList(p: string) { const l = p.split("\n").map(s => s.trim()).filter(Boolean); return l.length > 0 && l.every(s => s.startsWith("- ")); }

function renderContent(content: string, keyPrefix: string) {
  const paragraphs = content.split(/\n{2,}/).map(p => p.trim()).filter(Boolean);
  return paragraphs.map((p, i) => {
    const key = `${keyPrefix}-${i}`;

    if (isMarkdownTable(p)) {
      const table = parseMarkdownTable(p);
      if (!table) return null;
      return (
        <div key={key} className="overflow-x-auto rounded-[10px] border border-[#e2d8c5] shadow-[0_2px_8px_rgba(30,43,67,0.04)]">
          <table className="min-w-full border-collapse text-left text-[14px]">
            <thead className="bg-[#1E2B43]">
              <tr>{table.headers.map((h, hi) => <th key={`${key}-h-${hi}`} className="border-b border-[#2a3d5c] px-5 py-3.5 text-[12px] font-semibold uppercase tracking-[0.8px] text-white/90">{h}</th>)}</tr>
            </thead>
            <tbody>
              {table.rows.map((row, ri) => (
                <tr key={`${key}-r-${ri}`} className="transition-colors hover:bg-[#BC9155]/5 even:bg-[#fcfaf6]">
                  {row.map((cell, ci) => <td key={`${key}-c-${ri}-${ci}`} className="border-b border-[#eee4d4] px-5 py-3.5 text-[#4B5D78]">{cell}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }

    if (isBulletList(p)) {
      return (
        <ul key={key} className="space-y-3 text-[15px] text-[#4B5D78]">
          {p.split("\n").map(s => s.trim()).filter(Boolean).map(s => s.replace(/^- /, "")).map((item, li) => (
            <li key={`${key}-li-${li}`} className="flex gap-3 leading-[1.75]">
              <CheckCircle2 className="mt-[3px] h-4 w-4 shrink-0 text-[#BC9155]" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    }

    return <p key={key} className="text-[15px] leading-[1.85] text-[#4B5D78]">{p}</p>;
  });
}

function cleanQuote(raw: string) {
  let q = raw.replace(/^[""\u201C]+|[""\u201D]+$/g, "").trim();
  const dashMatch = q.match(/\s*[-–—]\s*(?:The\s|Mrs?\.\s|Dr\.\s).+$/);
  if (dashMatch) q = q.slice(0, dashMatch.index).trim();
  return q.replace(/^[""\u201C]+|[""\u201D]+$/g, "").trim();
}

/* ═══════════════════════════════════════════════════════════════
   HERO
   ═══════════════════════════════════════════════════════════════ */

function HeroSection({ data, meta }: { data?: HeaderData; meta?: MetaData }) {
  const title = data?.title || "Case Study";
  const cover = media(data?.cover_image, "/images/headers/kitchen-remodeling-header.jpg");
  const items = (meta?.items || []).filter(i => i?.label && i?.value);

  const location = items.find(i => i.label!.toLowerCase().includes("location"))?.value;
  const timeline = items.find(i => i.label!.toLowerCase().includes("timeline"))?.value;
  const serviceType = items.find(i => i.label!.toLowerCase().includes("type"))?.value;

  return (
    <section className="relative isolate overflow-hidden bg-[#151E30] text-white">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${cover})`, backgroundPosition: "center 30%" }} />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_97%_97%,rgba(21,30,48,1)_0%,rgba(21,30,48,0.93)_8%,transparent_30%),radial-gradient(ellipse_at_3%_97%,rgba(21,30,48,0.93)_0%,transparent_25%),linear-gradient(180deg,rgba(21,30,48,0.45)_0%,rgba(21,30,48,0.2)_20%,rgba(21,30,48,0.5)_55%,rgba(21,30,48,0.98)_100%)]" />
      <div className="absolute inset-0 bg-[url('/portfolio/builtwell-job-site-aerial-ct.jpg')] bg-cover bg-center opacity-[0.03]" />

      <div className="relative px-5 pb-0 pt-[130px] md:px-10 md:pt-[148px]">
        <div className="mx-auto max-w-[1240px]">
          {/* breadcrumb */}
          <ol className="mb-8 flex list-none flex-wrap items-center text-[13px] font-medium text-white/90 [text-shadow:0_1px_6px_rgba(0,0,0,0.6)]">
            <li>{linkNode("/", "Home", "text-white/75 transition-colors hover:text-[#BC9155]")}</li>
            <li className="flex items-center before:px-2 before:text-[#BC9155]/60 before:content-['›']">{linkNode("/case-studies", "Case Studies", "text-white/75 transition-colors hover:text-[#BC9155]")}</li>
          </ol>

          {/* title */}
          <span className="mb-5 inline-flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[1.8px] text-[#C89B5B] [text-shadow:none]">
            <span className="h-[2px] w-3 bg-[#BC9155]" />
            Case Study
          </span>
          <h1 className="max-w-[800px] font-serif text-[clamp(32px,4.2vw,52px)] font-bold leading-[1.1] tracking-[-0.02em] !text-white [text-shadow:0_2px_24px_rgba(0,0,0,0.4)]">
            {title}
          </h1>

          {/* quick fact pills */}
          {(location || timeline || serviceType) ? (
            <div className="mt-7 flex flex-wrap gap-3">
              {location ? (
                <div className="flex items-center gap-2 rounded-full border border-white/12 bg-[rgba(10,18,35,0.5)] px-4 py-2 backdrop-blur-[12px]">
                  <MapPin className="h-[14px] w-[14px] text-[#BC9155]" />
                  <span className="text-[13px] font-medium text-white/85">{location}</span>
                </div>
              ) : null}
              {timeline ? (
                <div className="flex items-center gap-2 rounded-full border border-white/12 bg-[rgba(10,18,35,0.5)] px-4 py-2 backdrop-blur-[12px]">
                  <Clock className="h-[14px] w-[14px] text-[#BC9155]" />
                  <span className="text-[13px] font-medium text-white/85">{timeline}</span>
                </div>
              ) : null}
              {serviceType ? (
                <div className="flex items-center gap-2 rounded-full border border-white/12 bg-[rgba(10,18,35,0.5)] px-4 py-2 backdrop-blur-[12px]">
                  <Hammer className="h-[14px] w-[14px] text-[#BC9155]" />
                  <span className="text-[13px] font-medium text-white/85">{serviceType}</span>
                </div>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>

      {/* bottom area: meta strip integrated into hero */}
      {items.length > 0 ? (
        <div className="relative mt-12 border-t border-white/8 bg-[rgba(10,18,35,0.55)] backdrop-blur-[20px]">
          <div className="mx-auto max-w-[1240px] px-5 md:px-10">
            <div className={cls(
              "grid",
              items.length <= 3 ? "grid-cols-1 sm:grid-cols-3" :
              items.length <= 4 ? "grid-cols-2 lg:grid-cols-4" :
              items.length <= 6 ? "grid-cols-2 md:grid-cols-3" :
              "grid-cols-2 md:grid-cols-4",
            )}>
              {items.map((item, i) => (
                <div
                  key={`${item.label}-${i}`}
                  className="flex items-center gap-3 border-b border-white/6 px-5 py-4 transition-all duration-300 last:border-b-0 hover:bg-white/[0.04] md:border-b-0 md:border-r md:border-white/8 md:last:border-r-0"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#BC9155]/12 text-[#BC9155]">
                    {metaIcon(item.label || "")}
                  </div>
                  <div className="min-w-0">
                    <span className="block text-[10px] font-bold uppercase tracking-[1.2px] text-white/45">{item.label}</span>
                    <span className="block text-[13px] font-semibold leading-snug text-white/90">{item.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   OVERVIEW BLOCK (first body block, treated specially)
   ═══════════════════════════════════════════════════════════════ */

function OverviewSection({ block, gallery }: { block: BodyBlock; gallery?: GalleryData }) {
  const firstImage = (gallery?.items || [])[0];
  const content = block.content || "";
  const hasTable = content.includes("|");

  const textOnly = content.split(/\n{2,}/).map(p => p.trim()).filter(Boolean).filter(p => !isMarkdownTable(p));

  return (
    <section className="border-b border-[#1E2B43]/6 bg-white px-5 py-20 md:px-10 md:py-[88px]">
      <div className="mx-auto max-w-[1240px]" data-fade-up>
        <div className="mb-10">
          <span className="mb-4 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[1.5px] text-[#9A7340]">
            <span className="h-[2px] w-[10px] bg-[#BC9155]" />
            Project Overview
          </span>
          <h2 className="font-serif text-[clamp(28px,3.5vw,44px)] font-bold tracking-[-0.5px] text-[#1E2B43]">
            About This Project
          </h2>
        </div>

        <div className={cls("grid items-start gap-10", firstImage?.image ? "lg:grid-cols-[1fr_0.85fr]" : "")}>
          {/* text side */}
          <div className="space-y-5">
            {textOnly.map((p, i) => (
              <p key={`ov-${i}`} className={cls(
                "leading-[1.85] text-[#4B5D78]",
                i === 0 ? "text-[17px] font-medium text-[#1E2B43]" : "text-[15px]",
              )}>
                {p}
              </p>
            ))}

            {/* table inline if exists */}
            {hasTable ? (
              <div className="mt-6">
                {content.split(/\n{2,}/).map(p => p.trim()).filter(Boolean).filter(p => isMarkdownTable(p)).map((p, ti) => {
                  const table = parseMarkdownTable(p);
                  if (!table) return null;
                  return (
                    <div key={`ov-t-${ti}`} className="overflow-x-auto rounded-[10px] border border-[#e2d8c5] shadow-[0_2px_8px_rgba(30,43,67,0.04)]">
                      <table className="min-w-full border-collapse text-left text-[14px]">
                        <thead className="bg-[#1E2B43]">
                          <tr>{table.headers.map((h, hi) => <th key={`ovt-h-${hi}`} className="border-b border-[#2a3d5c] px-5 py-3.5 text-[12px] font-semibold uppercase tracking-[0.8px] text-white/90">{h}</th>)}</tr>
                        </thead>
                        <tbody>
                          {table.rows.map((row, ri) => (
                            <tr key={`ovt-r-${ri}`} className="transition-colors hover:bg-[#BC9155]/5 even:bg-[#fcfaf6]">
                              {row.map((cell, ci) => (
                                <td key={`ovt-c-${ri}-${ci}`} className={cls("border-b border-[#eee4d4] px-5 py-3.5", ci === 0 ? "font-semibold text-[#1E2B43]" : "text-[#4B5D78]")}>{cell}</td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  );
                })}
              </div>
            ) : null}
          </div>

          {/* image side */}
          {firstImage?.image ? (
            <div className="group overflow-hidden rounded-[14px] border border-[#e2d8c5] shadow-[0_8px_24px_rgba(30,43,67,0.08)]">
              <img
                src={firstImage.image}
                alt={firstImage.alt || "Project overview"}
                className="h-[340px] w-full object-cover transition-transform duration-700 group-hover:scale-[1.02] lg:h-[420px]"
              />
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CHALLENGE / APPROACH / RESULTS — split into distinct visual treatments
   ═══════════════════════════════════════════════════════════════ */

const BLOCK_CONFIG: Record<string, { icon: React.ReactNode; accent: string; eyebrow: string }> = {
  challenge: { icon: <Shield className="h-6 w-6" />, accent: "from-[#1E2B43] to-[#263850]", eyebrow: "Understanding the Problem" },
  approach: { icon: <Lightbulb className="h-6 w-6" />, accent: "from-[#1E2B43] to-[#2a3d5c]", eyebrow: "Our Strategy" },
  results: { icon: <Trophy className="h-6 w-6" />, accent: "from-[#BC9155] to-[#A57D48]", eyebrow: "The Outcome" },
};

function getBlockType(heading: string): string {
  const h = heading.toLowerCase();
  if (h.includes("challenge") || h.includes("problem")) return "challenge";
  if (h.includes("approach") || h.includes("solution") || h.includes("our")) return "approach";
  if (h.includes("result") || h.includes("outcome") || h.includes("completed")) return "results";
  return "default";
}

function StorySection({ blocks }: { blocks: BodyBlock[] }) {
  if (blocks.length === 0) return null;

  return (
    <section className="border-b border-[#1E2B43]/6 bg-[#F5F1E9] px-5 py-20 md:px-10 md:py-[100px]">
      <div className="mx-auto max-w-[1240px]">
        <div className="mb-14 text-center" data-fade-up>
          <span className="mb-4 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[1.5px] text-[#9A7340]">
            <span className="h-[2px] w-[10px] bg-[#BC9155]" />
            The Full Story
          </span>
          <h2 className="font-serif text-[clamp(28px,3.5vw,44px)] font-bold tracking-[-0.5px] text-[#1E2B43]">
            How We <span className="text-[#BC9155]">Got It Done</span>
          </h2>
        </div>

        {/* timeline connector */}
        <div className="relative">
          {/* vertical line on left */}
          <div className="absolute bottom-0 left-[28px] top-0 hidden w-[2px] bg-gradient-to-b from-[#BC9155]/30 via-[#BC9155]/20 to-[#BC9155]/30 md:block" />

          <div className="space-y-8 md:space-y-10">
            {blocks.map((block, bi) => {
              const type = getBlockType(block.heading || "");
              const config = BLOCK_CONFIG[type];
              const isResults = type === "results";

              return (
                <div key={`story-${bi}`} className="relative md:pl-[72px]" data-fade-up>
                  {/* timeline dot */}
                  <div className={cls(
                    "absolute left-[16px] top-[32px] z-10 hidden h-[26px] w-[26px] items-center justify-center rounded-full border-[2.5px] shadow-[0_0_0_4px_rgba(188,145,85,0.12)] md:flex",
                    isResults
                      ? "border-[#BC9155] bg-[#BC9155]"
                      : "border-[#BC9155]/60 bg-white",
                  )}>
                    <div className={cls("h-[8px] w-[8px] rounded-full", isResults ? "bg-white" : "bg-[#BC9155]")} />
                  </div>

                  <article className={cls(
                    "overflow-hidden rounded-[14px] border shadow-[0_2px_12px_rgba(30,43,67,0.06),0_1px_3px_rgba(30,43,67,0.03)] transition-all duration-300 hover:shadow-[0_12px_32px_rgba(30,43,67,0.1)]",
                    isResults
                      ? "border-[#BC9155]/25 bg-white"
                      : "border-[#e2d8c5] bg-white",
                  )}>
                    {/* header bar */}
                    <div className={cls(
                      "flex items-center gap-4 px-8 py-5",
                      isResults
                        ? "bg-gradient-to-r from-[#BC9155] to-[#C9A265] text-white"
                        : "border-b border-[#1E2B43]/6 bg-[#1E2B43] text-white",
                    )}>
                      <div className={cls(
                        "flex h-11 w-11 shrink-0 items-center justify-center rounded-full",
                        isResults ? "bg-white/20" : "bg-[#BC9155]/15",
                      )}>
                        <span className={isResults ? "text-white" : "text-[#BC9155]"}>
                          {config?.icon || <ChevronRight className="h-6 w-6" />}
                        </span>
                      </div>
                      <div>
                        {config?.eyebrow ? (
                          <span className={cls("block text-[10px] font-bold uppercase tracking-[1.5px]", isResults ? "text-white/70" : "text-white/45")}>
                            {config.eyebrow}
                          </span>
                        ) : null}
                        <h3 className="font-serif text-[20px] font-bold md:text-[24px]">{block.heading}</h3>
                      </div>
                    </div>

                    {/* content */}
                    <div className="space-y-5 px-8 py-7 md:px-10 md:py-8">
                      {renderContent(block.content || "", `story-${bi}`)}
                    </div>

                    {/* results accent bottom */}
                    {isResults ? (
                      <div className="h-[3px] bg-gradient-to-r from-transparent via-[#BC9155] to-transparent" />
                    ) : null}
                  </article>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   GALLERY
   ═══════════════════════════════════════════════════════════════ */

function GallerySection({ data }: { data?: GalleryData }) {
  const items = (data?.items || []).filter(i => Boolean(i.image));
  if (items.length === 0) return null;

  const featured = items[0];
  const rest = items.slice(1);

  return (
    <section className="border-b border-[#1E2B43]/6 bg-white px-5 py-20 md:px-10 md:py-[100px]">
      <div className="mx-auto max-w-[1240px]">
        <div className="mb-10 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end" data-fade-up>
          <div>
            <span className="mb-4 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[1.5px] text-[#9A7340]">
              <span className="h-[2px] w-[10px] bg-[#BC9155]" />
              Visual Documentation
            </span>
            <h2 className="font-serif text-[clamp(28px,3.5vw,44px)] font-bold tracking-[-0.5px] text-[#1E2B43]">Project Gallery</h2>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-[#1E2B43]/5 px-4 py-2">
            <Star className="h-[14px] w-[14px] text-[#BC9155]" />
            <span className="text-[13px] font-semibold text-[#5C677D]">{items.length} photos</span>
          </div>
        </div>

        {/* featured large */}
        {featured ? (
          <div className="group mb-6 overflow-hidden rounded-[14px] border border-[#e2d8c5] shadow-[0_4px_16px_rgba(30,43,67,0.07)] transition-all duration-500 hover:shadow-[0_16px_40px_rgba(30,43,67,0.12)]" data-fade-up>
            <div className="relative overflow-hidden">
              <img src={featured.image} alt={featured.alt || "Featured"} className="h-[320px] w-full object-cover transition-transform duration-700 group-hover:scale-[1.02] md:h-[460px]" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[100px] bg-gradient-to-t from-black/30 to-transparent" />
              {featured.alt ? (
                <div className="absolute bottom-4 left-5 right-5">
                  <p className="text-[13px] font-medium text-white/90 [text-shadow:0_1px_4px_rgba(0,0,0,0.5)]">{featured.alt}</p>
                </div>
              ) : null}
            </div>
          </div>
        ) : null}

        {/* grid */}
        {rest.length > 0 ? (
          <div className={cls("grid gap-5", rest.length === 1 ? "grid-cols-1" : rest.length === 2 ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3")} data-fade-up>
            {rest.map((item, index) => (
              <figure key={`g-${index}`} className="group overflow-hidden rounded-[12px] border border-[#e2d8c5] border-b-2 border-b-transparent bg-white shadow-[0_2px_10px_rgba(30,43,67,0.05)] transition-all duration-300 hover:-translate-y-[5px] hover:border-b-[#BC9155] hover:shadow-[0_12px_28px_rgba(30,43,67,0.1)]">
                <div className="relative overflow-hidden">
                  <img src={item.image} alt={item.alt || "Photo"} className="h-[220px] w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                {item.caption || item.alt ? (
                  <figcaption className="border-t border-[#e2d8c5] px-5 py-3 text-[12px] leading-snug text-[#5C677D]">
                    {item.caption || item.alt}
                  </figcaption>
                ) : null}
              </figure>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   TESTIMONIAL
   ═══════════════════════════════════════════════════════════════ */

function TestimonialSection({ data }: { data?: TestimonialsData }) {
  const items = data?.items || [];
  if (items.length === 0) return null;
  const t = items[0];
  if (!t?.quote) return null;

  const quote = cleanQuote(t.quote);
  const rating = t.rating || 5;

  return (
    <section className="relative overflow-hidden border-b border-[#1E2B43]/6 bg-[linear-gradient(135deg,#1E2B43_0%,#151E30_100%)] px-5 py-20 text-white md:px-10 md:py-[88px]">
      <div className="absolute inset-0 bg-[url('/portfolio/builtwell-job-site-aerial-ct.jpg')] bg-cover bg-center opacity-[0.04]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(188,145,85,0.08),transparent_50%)]" />

      <div className="relative mx-auto max-w-[840px] text-center" data-fade-up>
        {/* quote icon */}
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-[#BC9155]/25 bg-[#BC9155]/10 shadow-[0_0_24px_rgba(188,145,85,0.15)]">
          <Quote className="h-7 w-7 text-[#BC9155]" />
        </div>

        <span className="mb-6 inline-flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[1.8px] text-[#C89B5B]">
          <span className="h-[2px] w-3 bg-[#C89B5B]" />
          {data?.title || "Client Testimonial"}
          <span className="h-[2px] w-3 bg-[#C89B5B]" />
        </span>

        {/* stars */}
        <div className="mb-5 flex items-center justify-center gap-1">
          {Array.from({ length: rating }).map((_, i) => (
            <Star key={`star-${i}`} className="h-[18px] w-[18px] fill-[#BC9155] text-[#BC9155]" />
          ))}
        </div>

        <blockquote className="font-serif text-[clamp(19px,2.3vw,26px)] font-medium italic leading-[1.6] text-white [text-shadow:0_2px_12px_rgba(0,0,0,0.15)]">
          &ldquo;{quote}&rdquo;
        </blockquote>

        {t.name ? (
          <div className="mt-8">
            <div className="mx-auto mb-4 h-[2px] w-10 rounded-full bg-[#BC9155]/40" />
            <cite className="text-[16px] font-semibold not-italic text-white">{t.name}</cite>
            {t.location ? <p className="mt-1 text-[13px] font-medium text-white/50">{t.location}, CT</p> : null}
          </div>
        ) : null}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   RELATED CASE STUDIES
   ═══════════════════════════════════════════════════════════════ */

function RelatedSection({ currentSlug }: { currentSlug: string }) {
  const shown = RELATED.filter(cs => !currentSlug.includes(cs.slug.replace("/case-studies/", ""))).slice(0, 3);
  if (shown.length === 0) return null;

  return (
    <section className="border-b border-[#1E2B43]/6 bg-[#F5F1E9] px-5 py-20 md:px-10 md:py-[100px]">
      <div className="mx-auto max-w-[1240px]">
        <div className="mb-12 text-center" data-fade-up>
          <span className="mb-4 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[1.5px] text-[#9A7340]">
            <span className="h-[2px] w-[10px] bg-[#BC9155]" />
            More Projects
          </span>
          <h2 className="font-serif text-[clamp(28px,3.5vw,44px)] font-bold tracking-[-0.5px] text-[#1E2B43]">
            Explore Related <span className="text-[#BC9155]">Case Studies</span>
          </h2>
        </div>

        <div className="grid gap-7 md:grid-cols-3" data-fade-up>
          {shown.map(cs => (
            <Link key={cs.slug} href={cs.slug} className="group flex flex-col overflow-hidden rounded-[14px] border-b-[3px] border-b-transparent bg-white shadow-[0_2px_12px_rgba(30,43,67,0.06),0_1px_3px_rgba(30,43,67,0.04)] transition-all duration-300 hover:-translate-y-[6px] hover:border-b-[#BC9155] hover:shadow-[0_12px_28px_rgba(30,43,67,0.1),0_28px_56px_rgba(30,43,67,0.1)]">
              <div className="relative h-[210px] overflow-hidden">
                <img src={cs.image} alt={cs.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
                <span className="absolute bottom-3.5 left-3.5 rounded-full bg-[rgba(10,18,35,0.65)] px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.8px] text-white backdrop-blur-[8px]">{cs.badge}</span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-serif text-[19px] font-bold text-[#1E2B43]">{cs.title}</h3>
                <div className="mt-1.5 flex items-center gap-1.5 text-[13px] text-[#5C677D]">
                  <MapPin className="h-3.5 w-3.5 text-[#BC9155]" />
                  {cs.location}
                </div>
                <span className="mt-auto inline-flex items-center gap-[6px] pt-5 text-[14px] font-semibold text-[#BC9155] transition-all duration-300 group-hover:gap-3">
                  View Case Study <ArrowRight className="h-[14px] w-[14px]" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center" data-fade-up>
          <Link href="/case-studies" className="inline-flex items-center gap-2.5 rounded-full border border-[#1E2B43]/12 bg-white px-6 py-3 text-[14px] font-semibold text-[#1E2B43] shadow-[0_2px_8px_rgba(30,43,67,0.06)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#BC9155] hover:shadow-[0_8px_20px_rgba(30,43,67,0.1)]">
            <ArrowLeft className="h-4 w-4 text-[#BC9155]" />
            Back to All Case Studies
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CTA
   ═══════════════════════════════════════════════════════════════ */

function CtaSection({ data }: { data?: CtaBlockData }) {
  const phone = data?.subtitle?.match(/\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}/)?.[0];

  return (
    <section className="bg-[#F5F1E9] px-5 py-16 md:px-10 md:py-20">
      <div className="mx-auto max-w-[960px]">
        <div className="overflow-hidden rounded-[18px] border border-[#1E2B43]/10 bg-[#1E2B43] px-8 py-14 text-center shadow-[0_20px_48px_rgba(30,43,67,0.25)] md:px-14 md:py-16">
          <div data-fade-up>
            <span className="mb-5 inline-flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[1.8px] text-[#C89B5B]">
              <span className="h-[2px] w-3 bg-[#C89B5B]" />
              Next Step
              <span className="h-[2px] w-3 bg-[#C89B5B]" />
            </span>

            <h2 className="font-serif text-[clamp(28px,3.5vw,42px)] font-bold leading-[1.15] !text-white">
              {data?.title || <>Ready to Transform Your Home?</>}
            </h2>

            {data?.subtext ? (
              <p className="mx-auto mt-4 max-w-[480px] text-[15px] leading-[1.7] text-white/65">{data.subtext}</p>
            ) : (
              <p className="mx-auto mt-4 max-w-[480px] text-[15px] leading-[1.7] text-white/65">
                Tell us about your project and we&apos;ll help bring it to life.
              </p>
            )}

            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              <Link
                href={data?.button?.url || "/contact"}
                className="inline-flex min-h-[52px] items-center justify-center gap-2.5 rounded-[8px] border border-[#BC9155] bg-[#BC9155] px-8 py-3 text-[15px] font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#D4A95A] hover:shadow-[0_8px_24px_rgba(188,145,85,0.35)]"
              >
                {data?.button?.label || "Schedule a Free Consultation"}
                <ArrowRight className="h-4 w-4" />
              </Link>
              {phone ? (
                <a
                  href={`tel:${phone.replace(/\D/g, "")}`}
                  className="inline-flex min-h-[52px] items-center justify-center gap-2.5 rounded-[8px] border border-white/15 bg-white/8 px-8 py-3 text-[15px] font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/12"
                >
                  <Phone className="h-4 w-4 text-[#BC9155]" />
                  {phone}
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN TEMPLATE
   ═══════════════════════════════════════════════════════════════ */

export function CaseStudyDetailPageTemplate({ page }: { page: CMSPage }) {
  const fadeRef = useFadeUp();

  const header = section<HeaderData>(page, "case_study_header");
  const meta = section<MetaData>(page, "case_study_meta");
  const body = section<BodyData>(page, "case_study_body");
  const gallery = section<GalleryData>(page, "case_study_gallery");
  const testimonials = section<TestimonialsData>(page, "testimonials");
  const ctaBlock = section<CtaBlockData>(page, "cta_block");

  const allBlocks = (body?.blocks || []).filter(b => b.heading || b.content);
  const overviewBlock = allBlocks[0];
  const storyBlocks = allBlocks.slice(1);

  return (
    <div ref={fadeRef} className="bg-white text-[#1E2B43]">
      <main>
        <HeroSection data={header} meta={meta} />
        {overviewBlock ? <OverviewSection block={overviewBlock} gallery={gallery} /> : null}
        <StorySection blocks={storyBlocks} />
        <GallerySection data={gallery} />
        <TestimonialSection data={testimonials} />
        <RelatedSection currentSlug={page.slug} />
        <CtaSection data={ctaBlock} />
      </main>
    </div>
  );
}

export default CaseStudyDetailPageTemplate;

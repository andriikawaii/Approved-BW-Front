"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Components } from "react-markdown";
import type { CMSPage } from "@/types/cms";
import { linkNode, media, parts, section } from "./template-utils";

type HeroData = {
  headline?: string;
  subheadline?: string;
  background_image?: string | null;
  cta_primary?: { label?: string; url?: string } | null;
};

type LegalBlock = {
  content?: string;
  legal_updated?: string;
};

type PhoneItem = {
  label?: string;
  number?: string;
};

function markdownComponents(): Components {
  return {
    h2: ({ children }) => <h2 className="mt-10 font-serif text-[28px] font-bold leading-[1.18] tracking-[-0.02em] text-[#1e2b43] md:text-[34px]">{children}</h2>,
    h3: ({ children }) => <h3 className="mt-8 font-serif text-[22px] font-bold leading-[1.24] tracking-[-0.01em] text-[#1e2b43] md:text-[26px]">{children}</h3>,
    p: ({ children }) => <p className="mt-4 text-[15px] leading-[1.92] text-[#5c677d] md:text-[16px]">{children}</p>,
    ul: ({ children }) => <ul className="mt-4 space-y-3 pl-6 text-[15px] leading-[1.92] text-[#5c677d] md:text-[16px]">{children}</ul>,
    ol: ({ children }) => <ol className="mt-4 space-y-3 pl-6 text-[15px] leading-[1.92] text-[#5c677d] md:text-[16px]">{children}</ol>,
    li: ({ children }) => <li className="list-disc">{children}</li>,
    strong: ({ children }) => <strong className="font-semibold text-[#1e2b43]">{children}</strong>,
    a: ({ href, children }) => {
      const safeHref = typeof href === "string" && href.trim() ? href : "#";
      const isExternal = /^https?:\/\//i.test(safeHref);

      return (
        <a
          href={safeHref}
          className="font-semibold text-[#bc9155] transition-colors hover:text-[#a57d48] hover:underline"
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
        >
          {children}
        </a>
      );
    },
    br: () => <br />,
  };
}

function HeroCta({ label, value, href, primary = false }: { label: string; value: string; href: string; primary?: boolean }) {
  return linkNode(
    href,
    <span
      className={[
        "flex min-w-[180px] flex-col items-center rounded-[8px] border px-6 py-4 text-center shadow-[0_12px_32px_rgba(0,0,0,0.16)] transition-all hover:-translate-y-0.5",
        primary
          ? "border-[#bc9155] bg-[#bc9155] text-white"
          : "border-white/18 bg-[rgba(10,18,35,0.42)] text-white backdrop-blur-[12px]",
      ].join(" ")}
    >
      <span className={primary ? "text-[12px] font-semibold uppercase tracking-[0.16em] text-white/82" : "text-[12px] font-semibold uppercase tracking-[0.16em] text-white/72"}>{label}</span>
      <span className="mt-1 text-[17px] font-bold">{value}</span>
    </span>,
  );
}

export function TermsPageTemplate({ page }: { page: CMSPage }) {
  const hero = section<HeroData>(page, "hero");
  const legal = section<LegalBlock>(page, "rich_text");
  const heroTitle = parts(hero?.headline || "Terms of Service", "Service");
  const phones = (((page as unknown as { phones?: { items?: PhoneItem[] } }).phones?.items) || []) as PhoneItem[];
  const fairfieldPhone = phones.find((item) => (item.label || "").toLowerCase().includes("fairfield"))?.number || "(203) 919-9616";
  const newHavenPhone = phones.find((item) => (item.label || "").toLowerCase().includes("new haven"))?.number || "(203) 466-9148";

  return (
    <div className="bg-white text-[#1e2b43]">
      <section className="relative isolate overflow-hidden bg-[#151e30] px-5 pt-[84px] text-white md:px-10">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${media(hero?.background_image, "/images/headers/kitchen-remodeling-header.jpg")})` }} />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(21,30,48,0.56)_0%,rgba(21,30,48,0.48)_30%,rgba(21,30,48,0.76)_72%,rgba(21,30,48,0.94)_100%)]" />
        <div className="relative z-10 mx-auto flex min-h-[420px] max-w-[1240px] flex-col items-center justify-center pb-14 text-center">
          <ol className="mb-5 flex list-none items-center text-[12px] font-semibold text-white/92">
            <li>{linkNode("/", "Home", "transition-colors hover:text-[#bc9155]")}</li>
            <li className="before:px-2.5 before:text-[#bc9155] before:content-['›']"><span>Terms of Service</span></li>
          </ol>
          <h1 className="font-serif text-[clamp(42px,5vw,68px)] font-bold leading-[1.04] tracking-[-0.03em] text-white">
            {heroTitle.before}
            {heroTitle.accent ? <span className="text-[#bc9155]">{heroTitle.accent}</span> : null}
            {heroTitle.after}
          </h1>
          {hero?.subheadline ? <p className="mt-5 max-w-[760px] text-[16px] leading-[1.7] text-white/88">{hero.subheadline}</p> : null}
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <HeroCta label="Fairfield County" value={fairfieldPhone} href={`tel:${fairfieldPhone.replace(/\D/g, "")}`} />
            <HeroCta label="New Haven County" value={newHavenPhone} href={`tel:${newHavenPhone.replace(/\D/g, "")}`} />
            <HeroCta
              label={hero?.cta_primary?.label || "Free Estimate"}
              value="Schedule Now"
              href={hero?.cta_primary?.url || "/free-consultation/"}
              primary
            />
          </div>
        </div>
      </section>

      <section className="px-5 py-[56px] md:px-8 md:py-[68px] lg:px-10 lg:py-[80px]">
        <div className="mx-auto max-w-[860px]">
          {legal?.legal_updated ? <p className="text-[14px] font-semibold text-[#bc9155]">{legal.legal_updated}</p> : null}
          <div className="mt-1">
            <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents()}>
              {legal?.content || ""}
            </ReactMarkdown>
          </div>
        </div>
      </section>
    </div>
  );
}

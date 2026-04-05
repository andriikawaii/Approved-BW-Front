"use client";

import { useState, useRef, useEffect } from "react";
import { ArrowRight, CheckCircle2, ChevronDown, Upload } from "lucide-react";
import type { CMSPage } from "@/types/cms";
import { FinancingStrip as SharedFinancingStrip, LeadFormSection as SharedLeadFormSection, cls, linkNode, media, opts, parts, section, sections } from "./template-utils";

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
  image?: string | null;
  image_alt?: string | null;
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
  image?: string | null;
  image_alt?: string | null;
};

type TrustLinkItem = {
  label: string;
  url: string;
  icon: React.ReactNode;
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

const CASE_STUDIES_TRUST_LINKS: TrustLinkItem[] = [
  {
    label: "Google Rating 4.9",
    url: "https://www.google.com/search?q=builtwell+ct+reviews",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" stroke="none" aria-hidden="true">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
  },
  {
    label: "Trusted on Houzz",
    url: "https://www.houzz.com/professionals/general-contractors/builtwell-ct",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
  {
    label: "CT HIC License #0668405",
    url: "https://www.elicense.ct.gov/Lookup/LicenseLookup.aspx",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <path d="M8 2v4M16 2v4M3 10h18" />
      </svg>
    ),
  },
  {
    label: "Verified on Angi",
    url: "https://www.angi.com/companylist/us/ct/orange/builtwell-ct-reviews-",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
];

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
    <div ref={ref} className={className}
      style={reducedMotion ? undefined : {
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(30px)",
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}>
      {children}
    </div>
  );
}

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
    image: block.image || null,
    image_alt: block.image_alt || null,
  };
}

function HeroSection({ hero, phones }: { hero?: HeroData; phones: PhoneItem[] }) {
  const titleParts = parts(hero?.headline || "Our Case Studies", "Case Studies");
  const fairfieldPhone = getPhone(phones, "fairfield", "(203) 919-9616");
  const newHavenPhone = getPhone(phones, "new-haven", "(203) 466-9148");
  const primaryHeroLabel = "Get Your Free Estimate";

  return (
    <section className="relative isolate overflow-hidden bg-[#151E30] px-5 pb-14 pt-[130px] text-white md:px-10">
      <div className="absolute inset-0 bg-cover" style={{ backgroundImage: `url(${media(hero?.background_image, "/images/headers/kitchen-remodeling-header.jpg")})`, backgroundPosition: "center 15%", opacity: 0.72 }} />
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(21,30,48,0.45) 0%, rgba(21,30,48,0.25) 35%, rgba(21,30,48,0.50) 65%, rgba(21,30,48,0.95) 100%)" }} />
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 120%, rgba(21,30,48,0.9) 0%, transparent 55%)" }} />
      <div className="relative mx-auto flex min-h-[380px] max-w-[1240px] flex-col items-center justify-center text-center md:min-h-[440px]">
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
        <div className="case-studies-hero-ctas">
          {linkNode(hero?.cta_primary?.url || "#contact", primaryHeroLabel, "case-studies-hero-cta-btn case-studies-hero-cta-btn--primary")}
          {linkNode(toTelHref(fairfieldPhone), `Fairfield: ${fairfieldPhone}`, "case-studies-hero-cta-btn")}
          {linkNode(toTelHref(newHavenPhone), `New Haven: ${newHavenPhone}`, "case-studies-hero-cta-btn")}
        </div>
      </div>
    </section>
  );
}

function StatsBar({ data }: { data?: TrustBarData }) {
  return (
    <section className="border-y border-[rgba(188,145,85,0.2)]" style={{ background: "linear-gradient(135deg, #1E2B43 0%, #151E30 100%)" }}>
      <div className="mx-auto grid max-w-[1280px] grid-cols-2 text-center md:grid-cols-4">
        {(data?.items || []).map((item, index, items) => {
          const isShield = (item.icon || "").toLowerCase() === "shield" || /bonded|insured/i.test(item.label || "");
          const showBorder = index < items.length - 1;
          return (
            <div key={`${item.label}-${index}`} className={`group cursor-default px-5 py-9 transition-all duration-300 hover:-translate-y-[3px] hover:bg-[rgba(188,145,85,0.08)] ${showBorder ? "border-r border-[rgba(188,145,85,0.12)]" : ""}`}>
              <div className="flex h-[42px] items-end justify-center leading-none text-[#BC9155] transition-all duration-300 group-hover:text-[#d4a95a] group-hover:[text-shadow:0_0_20px_rgba(188,145,85,0.3)]" style={{ fontFamily: "'Playfair Display', serif", fontSize: 42, fontWeight: 700 }}>
                {isShield ? (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                ) : (
                  item.value
                )}
              </div>
              <div className="mt-2 text-[13px] font-medium uppercase tracking-[1px] text-white/60 transition-colors duration-300 group-hover:text-white/85">
                {item.label}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function IntroSection({ data }: { data?: RichTextData }) {
  const titleParts = parts(data?.title || "Every Project Tells a Story", data?.highlight_text || "Story");

  return (
    <section className="border-b border-[#1E2B43]/10 bg-white px-5 py-[80px] md:px-10 md:py-[100px]">
      <div className="mx-auto max-w-[1240px]">
        <FadeUp className="mx-auto max-w-[800px] text-center">
          <span className="mb-4 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[1.5px] text-[#9A7340]">
            <span className="h-[2px] w-[10px] bg-[#BC9155]" />
            {data?.eyebrow || "Real Projects, Real Results"}
          </span>
          <h2 className="mx-auto max-w-[780px] font-serif text-[clamp(32px,3.5vw,48px)] font-bold tracking-[-0.5px] text-[#1E2B43]">
            {titleParts.before}
            {titleParts.accent ? <span className="text-[#BC9155]">{titleParts.accent}</span> : null}
            {titleParts.after}
          </h2>
          {data?.content ? <p className="mx-auto mt-5 max-w-[700px] text-[17px] leading-[1.75] text-[#5C677D]">{data.content}</p> : null}
        </FadeUp>
      </div>
    </section>
  );
}

function CaseStudyGrid({ cards }: { cards: CaseStudyCard[] }) {
  return (
    <section className="border-t border-[#1E2B43]/8 bg-[#F5F1E9] px-5 pb-24 pt-0 md:px-10">
      <div className="mx-auto max-w-[1240px]">
        <div className="mx-auto grid max-w-[1200px] gap-8 md:grid-cols-2">
          {cards.map((card, i) => {
            const image = media(card.image, CARD_IMAGE_MAP[card.title] || "/portfolio/builtwell-contractor-client-consultation-ct.jpeg");

            return (
              <FadeUp key={card.title} delay={i % 2 === 0 ? 0 : 120}>
                <article className="group/card flex h-full flex-col rounded-[12px] border-b-[3px] border-b-transparent bg-white p-7 shadow-[0_2px_12px_rgba(30,43,67,0.06),0_1px_3px_rgba(30,43,67,0.04)] transition-all duration-[350ms] [transition-timing-function:cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-1.5 hover:border-b-[#BC9155] hover:shadow-[0_12px_28px_rgba(30,43,67,0.1),0_28px_56px_rgba(30,43,67,0.12)]">
                  <div className="relative mb-5 h-[280px] overflow-hidden rounded-[8px]">
                    <img src={image} alt={card.image_alt || card.title} className="h-full w-full object-cover transition-transform duration-[600ms] ease-out group-hover/card:scale-105" />
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-[76px] bg-[linear-gradient(to_bottom,transparent_0%,rgba(0,0,0,0.92)_55%,rgba(0,0,0,0.96)_100%)]" />
                    <div className="absolute bottom-0 left-0 z-[2] flex h-[76px] w-1/2 items-end px-[14px] pb-[13px]"><span className="text-[13px] font-extrabold uppercase tracking-[2.5px] text-white">Before</span></div>
                    <div className="absolute bottom-0 right-0 z-[2] flex h-[76px] w-1/2 items-end justify-end px-[14px] pb-[13px]"><span className="text-[13px] font-extrabold uppercase tracking-[2.5px] text-white">After</span></div>
                  </div>
                  <div className="flex flex-1 flex-col items-center text-center">
                    <h3 className="mb-3 font-serif text-[22px] font-bold text-[#1E2B43]">{card.title}</h3>
                    <div className="mb-3 flex flex-wrap gap-[10px]">
                      <span className="rounded-full bg-[rgba(188,145,85,0.1)] px-3 py-1 text-[12px] font-semibold tracking-[0.3px] text-[#9A7340]">{card.timeline}</span>
                      <span className="rounded-full bg-[rgba(188,145,85,0.1)] px-3 py-1 text-[12px] font-semibold tracking-[0.3px] text-[#9A7340]">{card.badge}</span>
                    </div>
                    <p className="max-w-[520px] text-[15px] leading-[1.75] text-[#5C677D]">{card.summary}</p>
                    <div className="mt-4 w-full border-l-[3px] border-l-[#BC9155] px-4 italic text-[#1E2B43]">
                      <p className="min-h-[72px] text-[15px] leading-[1.65] text-[#1E2B43]">&quot;{card.quote}&quot;</p>
                      <cite className="mt-2 block text-[12px] font-semibold not-italic text-[#5C677D]">{card.attribution}</cite>
                    </div>
                    {linkNode(CARD_LINK_MAP[card.title] || card.link, <><span>View Case Study</span><ArrowRight className="h-[14px] w-[14px] transition-transform duration-200 group-hover/card:translate-x-1" /></>, "mt-auto inline-flex items-center gap-[6px] pt-4 text-[14px] font-semibold text-[#BC9155] transition-all duration-200 hover:gap-[10px]")}
                  </div>
                </article>
              </FadeUp>
            );
          })}
          <FadeUp delay={cards.length % 2 === 0 ? 0 : 120}>
            <article className="flex h-full flex-col items-center justify-center rounded-[12px] border-b-[2px] border-b-[#BC9155] bg-[linear-gradient(135deg,#1E2B43_0%,#151E30_100%)] px-8 py-12 text-center text-white shadow-[0_2px_12px_rgba(30,43,67,0.06),0_1px_3px_rgba(30,43,67,0.04)]">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[rgba(188,145,85,0.15)]">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#BC9155" strokeWidth="1.5" aria-hidden="true">
                  <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                  <path d="M12 6v6l4 2" />
                </svg>
              </div>
              <h3 className="font-serif text-[22px] font-bold text-white">
                Your Project Could Be <span className="text-[#BC9155]">Next</span>
              </h3>
              <p className="mt-3 max-w-[320px] text-[15px] leading-[1.7] text-white/70">
                Tell us about your remodeling project and get a free, no-obligation estimate within 24 hours.
              </p>
              {linkNode(
                "#contact",
                "Get Your Free Estimate",
                "mt-7 inline-flex items-center justify-center rounded-[8px] bg-[#BC9155] px-10 py-[14px] text-[15px] font-semibold text-white transition-[background] duration-200 hover:bg-[#A57D48]",
              )}
              <p className="mt-[14px] text-[12px] italic text-white/40">On-site or remote via Google Meet</p>
            </article>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

function TrustStrip() {
  return (
    <FadeUp>
      <div className="case-studies-trust-strip" role="region" aria-label="Trust indicators">
        <div className="case-studies-trust-strip-inner">
          {CASE_STUDIES_TRUST_LINKS.map((item, index) => (
            <div key={item.label} className="contents">
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="case-studies-trust-strip-item"
                aria-label={item.label}
              >
                {item.icon}
                <span>{item.label}</span>
              </a>
              {index < CASE_STUDIES_TRUST_LINKS.length - 1 ? <div className="case-studies-trust-strip-divider" /> : null}
            </div>
          ))}
        </div>
      </div>
      <style jsx global>{`
        .case-studies-page .case-studies-trust-strip {
          background: linear-gradient(135deg, #1e2b43 0%, #151e30 100%);
          padding: 56px 40px;
          position: relative;
          overflow: hidden;
        }

        .case-studies-page .case-studies-trust-strip::before {
          content: "";
          position: absolute;
          inset: 0;
          background: url("/hero/builtwell-job-site-aerial-hero-ct.jpg") center / cover no-repeat;
          opacity: 0.06;
        }

        .case-studies-page .case-studies-trust-strip-inner {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0;
          flex-wrap: wrap;
          position: relative;
          z-index: 1;
        }

        .case-studies-page .case-studies-trust-strip-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          font-size: 13px;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.9);
          letter-spacing: 0.4px;
          white-space: nowrap;
          text-decoration: none;
          transition: all 0.3s;
          padding: 20px 32px;
          flex: 1;
          min-width: 180px;
          text-align: center;
        }

        .case-studies-page .case-studies-trust-strip-item:hover {
          color: #bc9155;
          transform: translateY(-2px);
        }

        .case-studies-page .case-studies-trust-strip-item svg {
          color: #bc9155;
          flex-shrink: 0;
          width: 22px;
          height: 22px;
          filter: drop-shadow(0 2px 4px rgba(188, 145, 85, 0.3));
        }

        .case-studies-page .case-studies-trust-strip-divider {
          width: 1px;
          height: 40px;
          background: rgba(255, 255, 255, 0.12);
          flex-shrink: 0;
        }

        @media (max-width: 768px) {
          .case-studies-page .case-studies-trust-strip {
            padding: 32px 20px;
          }

          .case-studies-page .case-studies-trust-strip-inner {
            gap: 0;
            flex-wrap: wrap;
          }

          .case-studies-page .case-studies-trust-strip-item {
            padding: 12px 16px;
            min-width: 50%;
            font-size: 11px;
          }

          .case-studies-page .case-studies-trust-strip-item svg {
            width: 18px;
            height: 18px;
          }

          .case-studies-page .case-studies-trust-strip-divider {
            display: none;
          }
        }
      `}</style>
    </FadeUp>
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
    <section id="contact" className="border-t border-[#1E2B43]/8 bg-[#F5F1E9] px-5 py-16 md:px-10 md:py-[80px]">
      <div className="mx-auto max-w-[1200px]">
        <FadeUp className="mb-8 text-center">
          <span className="mb-4 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[1.5px] text-[#9A7340]">
            <span className="h-[2px] w-[10px] bg-[#BC9155]" />
            {data?.eyebrow || "GET IN TOUCH"}
          </span>
          <h2 className="font-serif text-[clamp(32px,3.5vw,48px)] font-bold tracking-[-0.5px] text-[#1E2B43]">
            {titleParts.before}
            {titleParts.accent ? <span className="text-[#BC9155]">{titleParts.accent}</span> : null}
            {titleParts.after}
          </h2>
          {data?.subtitle ? <p className="mx-auto mt-2 max-w-[600px] text-[16px] leading-[1.7] text-[#5C677D]">{data.subtitle}</p> : null}
        </FadeUp>
        <FadeUp delay={150}>
        <div className="grid items-stretch gap-8 md:grid-cols-[1fr_1.15fr]">
          <div className="hidden flex-col gap-3 md:flex">
            {images.map((image, index) => (
              <div key={`${image.src}-${index}`} className="group relative min-h-0 flex-1 overflow-hidden rounded-[8px]">
                <img src={image.src} alt={image.alt} className="h-full w-full object-cover transition-transform duration-[600ms] ease-out group-hover:scale-105" />
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
        </FadeUp>
      </div>
    </section>
  );
}

function FinancingBand({ data }: { data?: RichTextData }) {
  if (!data) return null;

  return (
    <FadeUp>
      <div className="border-t border-[#1E2B43]/8 bg-white px-5 py-14 md:px-10">
        <div className="mx-auto flex max-w-[1200px] flex-col items-center gap-6 text-center">
          <div className="flex flex-col items-center gap-4 md:flex-row md:text-left">
            <div className="text-[24px] font-bold tracking-[-0.3px]"><span className="text-[#6BBF4E]">Green</span><span className="text-[#1E2B43]">Sky</span></div>
            <p className="max-w-[760px] text-[16px] leading-[1.6] text-[#5C677D]"><strong className="text-[#1E2B43]">{data.title}.</strong> {data.content}</p>
          </div>
          {data.cta?.url ? linkNode(data.cta.url, <><span>{data.cta.label || "Check Financing Options"}</span><ArrowRight className="h-4 w-4" /></>, "inline-flex min-h-[52px] min-w-[280px] items-center justify-center gap-[10px] rounded-[8px] bg-[#BC9155] px-8 py-3 text-[15px] font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-[#A57D48] hover:shadow-[0_4px_12px_rgba(188,145,85,0.3)]") : null}
        </div>
      </div>
    </FadeUp>
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
  const financing = rich.find((item) => item.style_variant === "financing_strip");
  const contentBlocks = rich.filter((item) => item.style_variant !== "financing_strip");
  const intro = contentBlocks[0];
  const cards = contentBlocks.slice(1).map(parseCaseStudy);

  return (
    <div className="case-studies-page bg-white text-[#1E2B43]">
      <main>
        <HeroSection hero={hero} phones={phones} />
        <StatsBar data={statsBar} />
        <IntroSection data={intro} />
        <CaseStudyGrid cards={cards} />
        <TrustStrip />
        <SharedLeadFormSection page={page} data={lead} accent={lead?.title_highlight || "Remodeling Project"} />
        <SharedFinancingStrip data={financing} />
      </main>
      <style jsx global>{`
        .case-studies-page .case-studies-hero-ctas {
          display: flex;
          gap: 14px;
          margin-top: 28px;
          justify-content: center;
          align-items: center;
          flex-wrap: wrap;
        }

        .case-studies-page .case-studies-hero-cta-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 14px 32px;
          border-radius: 8px;
          background: rgba(10, 18, 35, 0.42);
          border: 1px solid rgba(255, 255, 255, 0.22);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          color: #fff;
          text-decoration: none;
          font-size: 15px;
          font-weight: 600;
          letter-spacing: 0.3px;
          transition: background 0.3s, border-color 0.3s, transform 0.3s, box-shadow 0.3s;
          white-space: nowrap;
          transform: translateY(0);
          will-change: transform, box-shadow, background, border-color;
        }

        .case-studies-page .case-studies-hero-cta-btn:hover {
          background: rgba(10, 18, 35, 0.62);
          border-color: rgba(255, 255, 255, 0.35);
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
        }

        .case-studies-page .case-studies-hero-cta-btn--primary {
          background: #bc9155;
          border: 1px solid #bc9155;
          color: #fff;
          backdrop-filter: none;
          -webkit-backdrop-filter: none;
        }

        .case-studies-page .case-studies-hero-cta-btn--primary:hover {
          background: #d4a95a;
          border-color: #d4a95a;
          box-shadow: 0 8px 24px rgba(188, 145, 85, 0.4);
        }

        .case-studies-page .case-studies-hero-cta-btn:focus-visible {
          outline: 2px solid #fff;
          outline-offset: 2px;
          box-shadow: 0 0 0 4px rgba(188, 145, 85, 0.4);
        }

        @media (max-width: 768px) {
          .case-studies-page .case-studies-hero-ctas {
            flex-direction: column;
            align-items: center;
          }

          .case-studies-page .case-studies-hero-cta-btn {
            min-height: 44px;
            width: 100%;
            max-width: 300px;
            justify-content: center;
            font-size: 14px;
            padding: 12px 24px;
          }
        }
      `}</style>
    </div>
  );
}

export default CaseStudiesPageTemplate;

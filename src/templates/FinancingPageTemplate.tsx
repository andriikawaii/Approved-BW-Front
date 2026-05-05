"use client";

import Image from "next/image";
import type { CMSPage } from "@/types/cms";
import { DarkTrustStrip, FinancingStrip, HeroTrustBar, LeadFormSection, cls, label, linkNode, media, parts, section, sections } from "./template-utils";
import { useEffect, useRef } from "react";

/* ── fade-up scroll animation hook ── */
function useFadeUp() {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const els = container.querySelectorAll<HTMLElement>(".fade-up");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).style.opacity = "1";
            (entry.target as HTMLElement).style.transform = "translateY(0)";
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  return containerRef;
}

const fadeUpStyle: React.CSSProperties = {
  opacity: 0,
  transform: "translateY(30px)",
  transition: "opacity 0.7s ease, transform 0.7s ease",
};

/* ── financing option card icons (matching HTML reference exactly) ── */
const financingIcons: Record<string, React.ReactNode> = {
  savings: (
    <svg viewBox="0 0 24 24" fill="none" stroke="#BC9155" strokeWidth="1.5" width="24" height="24">
      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2z"/>
      <path d="M16 3v4M8 3v4M3 9h18"/>
      <circle cx="12" cy="15" r="2"/>
    </svg>
  ),
  heloc: (
    <svg viewBox="0 0 24 24" fill="none" stroke="#BC9155" strokeWidth="1.5" width="24" height="24">
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
      <polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
  ),
  equity: (
    <svg viewBox="0 0 24 24" fill="none" stroke="#BC9155" strokeWidth="1.5" width="24" height="24">
      <rect x="2" y="6" width="20" height="14" rx="2"/>
      <path d="M2 10h20"/>
      <path d="M6 14h4"/>
    </svg>
  ),
  greensky: (
    <svg viewBox="0 0 24 24" fill="none" stroke="#BC9155" strokeWidth="1.5" width="24" height="24">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      <path d="M9 12l2 2 4-4"/>
    </svg>
  ),
};

function pickFinancingIcon(title?: string) {
  if (!title) return financingIcons.savings;
  const lower = title.toLowerCase();
  if (lower.includes("heloc") || lower.includes("line of credit")) return financingIcons.heloc;
  if (lower.includes("equity loan") || lower.includes("home equity loan")) return financingIcons.equity;
  if (lower.includes("greensky") || lower.includes("third")) return financingIcons.greensky;
  return financingIcons.savings;
}

/* ═══════════════════════════════════════════════════════════════════
   STATIC FALLBACK DATA , matches financing.html reference exactly
   ═══════════════════════════════════════════════════════════════════ */

const defaultHeroBadges = [
  { label: "Get Your Free Estimate", value: "", url: "#contact", is_primary: true },
  { label: "Fairfield", value: "(203) 919-9616", url: "tel:2039199616", is_primary: false },
  { label: "New Haven", value: "(203) 466-9148", url: "tel:2034669148", is_primary: false },
];

const defaultTrustBar = [
  { value: "15+", label: "Years of Experience" },
  { value: "100+", label: "Completed Projects" },
  { value: "4.9", label: "Google Rating", url: "https://www.google.com/maps/search/?api=1&query=BuiltWell+CT,+206A+Boston+Post+Road,+Orange,+CT+06477" },
  { value: null, label: "Fully Bonded and Insured" },
];

const defaultTrustStrip = [
  { icon: "star", label: "Google Rating 4.9", url: "https://www.google.com/search?q=builtwell+ct+reviews" },
  { icon: "check-circle", label: "Trusted on Houzz", url: "https://www.houzz.com/professionals/general-contractors/builtwell-ct" },
  { icon: "calendar", label: "CT HIC License #0668405", url: "https://www.elicense.ct.gov/Lookup/LicenseLookup.aspx" },
];

const defaultFinancingCards = [
  {
    title: "Own Savings or Reserves",
    description: "The simplest option. No interest, no approval process, no lender timeline to manage. If you have reserves set aside for home maintenance or improvements, paying out of pocket keeps the transaction clean and the decision entirely in your hands. This approach works well for projects under $25,000 or for homeowners who have designated funds ready.",
  },
  {
    title: "Home Equity Line of Credit (HELOC)",
    description: "A HELOC uses the equity in your home as collateral and gives you a revolving credit line you can draw from as invoices arrive. You only pay interest on what you have drawn, which is well-matched to how remodeling projects work. HELOCs carry a variable interest rate, and approval typically takes 2 to 4 weeks. Well-suited for projects in the $30,000 to $100,000 range.",
    url: "https://www.bankrate.com/home-equity/heloc-rates/",
    cta_label: "Compare HELOC Rates",
  },
  {
    title: "Home Equity Loan",
    description: "A home equity loan is a fixed-rate, lump-sum loan secured by your home, similar in structure to a second mortgage. You borrow a fixed amount and repay it at a fixed monthly payment over a set term. If you want a predictable monthly cost on a known project budget, this option gives you that certainty. Approval timelines are similar to a HELOC, typically 2 to 4 weeks.",
    url: "https://www.bankrate.com/home-equity/home-equity-loan-rates/",
    cta_label: "Compare Home Equity Rates",
  },
  {
    title: "Third-Party Financing (GreenSky)",
    description: "We work with GreenSky to offer flexible financing directly through our office. You can check your eligibility and get approved in about 60 seconds without affecting your credit score. GreenSky offers promotional terms including deferred interest and fixed monthly payment plans, making it a practical option for homeowners who want to start their project without waiting for traditional lender approval.",
    url: "https://www.greensky.com",
    cta_label: "Apply at GreenSky",
  },
];

const defaultIntro = {
  eyebrow: "Planning Ahead",
  title: "Planning Your Remodeling Investment",
  highlight_text: "Investment",
  content: "Connecticut homeowners typically spend between $15,000 and $150,000 on remodeling projects, and choosing the right financing method before work begins can save thousands in interest and prevent mid-project budget surprises. Whether you are paying from savings or financing through a lender, the right approach depends on the size of your project, your timeline, and your financial situation. We work with homeowners across Fairfield and New Haven Counties who fund their projects in different ways, and we are happy to help you think through what makes sense for yours. Connecticut homeowners should also check [Energize CT](https://energizect.com) for available rebates on qualifying energy upgrades, which can reduce overall project costs.",
};

const defaultOptions = {
  eyebrow: "Your Options",
  title: "Remodeling Financing Options for Connecticut Homeowners",
  highlight_text: "Homeowners",
  content: "The four most common ways to finance a Connecticut remodeling project are personal savings for jobs under $25,000, HELOCs for $30,000 to $100,000 projects, fixed-rate home equity loans, and third-party programs like GreenSky with approval in about 60 seconds.",
  cards: defaultFinancingCards,
};

const defaultEstimates = {
  eyebrow: "Your Estimate",
  title: "Detailed Remodeling Estimates Before You Commit",
  highlight_text: "Estimates",
  content: "BuiltWell CT provides a detailed, line-item written estimate before any work begins, breaking down labor and materials by category so you can match your project scope to your financing plan with full cost transparency. Our estimates make it possible to adjust scope thoughtfully if your budget requires it.\n\nWe do not change the scope without discussing it with you first and getting written approval. Cost surprises mid-project are a product of poor planning and poor communication. We address both during the proposal phase.\n\nIf your available financing requires adjusting the scope of work, we work through that at the planning stage. Scope adjustments made before construction begins are straightforward. Scope adjustments made after construction has started are expensive and disruptive for everyone. Learn more about how we work on our [process page](/process/).",
};

const defaultConsult = {
  eyebrow: "Get Started",
  title: "Remodeling Cost Questions and Free Consultations",
  highlight_text: "Free Consultations",
  content: "BuiltWell CT offers free, no-obligation consultations in-person or via Google Meet and Zoom where we discuss your goals, walk through realistic cost ranges for your project, and help you understand financing options before any formal estimate is prepared.\n\nThe consultation is free with no charge and no obligation. It is the most practical first step for any homeowner who wants to understand what a project involves before making financial decisions around it.\n\n**Fairfield County:** (203) 919-9616\n**New Haven County:** (203) 466-9148\n\nOr use the [contact form](/contact/) to request a consultation time, or visit our [free consultation page](/free-consultation/) to learn more about what to expect.",
};

const defaultLeadForm = {
  eyebrow: "Get Started",
  title: "Start Your Remodeling Project With a Free Consultation",
  title_highlight: "Consultation",
  subtitle: "On-site or remote (Google Meet or Zoom). We respond within one business day.",
  submit_label: "Schedule Consultation",
  consent_text: "We respond within 24 hours. No spam, no obligation.",
  images: [
    { image: "/team/builtwell-owner-handshake-client-ct-02.jpg", alt: "BuiltWell CT contractor meeting with a Connecticut homeowner to discuss remodeling financing" },
    { image: "/portfolio/builtwell-job-site-aerial-ct.jpg", alt: "BuiltWell CT owner meeting homeowner for a free consultation" },
  ],
  fields: [
    { name: "name", label: "Name", type: "text", required: true, placeholder: "Your full name" },
    { name: "phone", label: "Phone", type: "tel", required: true, placeholder: "(203) 000-0000" },
    { name: "email", label: "Email", type: "email", required: true, placeholder: "you@email.com" },
    { name: "zip", label: "Zip Code", type: "text", required: true, placeholder: "06477" },
    {
      name: "services", label: "Services Needed", type: "checkbox_group", required: true,
      options: ["Kitchen Remodeling", "Bathroom Remodeling", "Basement Finishing", "Flooring Installation", "Home Additions", "Interior Painting", "Interior Carpentry", "Attic Conversions", "Decks and Porches", "Design and Planning", "Comfort and Accessibility", "Other"],
    },
    {
      name: "best_time", label: "Best Time to Contact", type: "select", required: true,
      options: ["Morning (8am - 12pm)", "Afternoon (12pm - 4pm)", "Evening (4pm - 6pm)", "Anytime"],
    },
    {
      name: "contact_method", label: "Preferred Contact Method", type: "radio_group", required: true,
      options: ["Call", "Text", "Email"],
    },
    { name: "message", label: "Tell Us About Your Project", type: "textarea", required: false, placeholder: "Tell us about your project, what rooms, what changes, any timeline or budget considerations..." },
  ],
};

const defaultFinancingStrip = {
  style_variant: "financing_strip",
  title: "Flexible Financing Available",
  content: "Get approved in about 60 seconds (through GreenSky, subject to credit approval) and start your project today.",
  cta: { label: "Check Financing Options", url: "https://www.greensky.com" },
};

/* ── helper: parse all markdown links in a paragraph ── */
function renderParagraphWithLinks(text: string, index: number, extraClass?: string) {
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match;
  let matchCount = 0;
  while ((match = linkRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    parts.push(
      linkNode(match[2], match[1], "font-semibold text-[#bc9155] transition-colors duration-200 hover:text-[#9a7340]")
    );
    lastIndex = match.index + match[0].length;
    matchCount++;
  }
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }
  return (
    <p key={index} className={cls("fin-prose-p text-[16px] leading-[1.85] text-[#5c677d]", extraClass)}>
      {matchCount > 0 ? parts : text}
    </p>
  );
}

/* ═══════════════════════════════════════════════════
   TEMPLATE
   ═══════════════════════════════════════════════════ */

export function FinancingPageTemplate({ page }: { page: CMSPage }) {
  const hero = section<any>(page, "hero");
  const trust = sections<any>(page, "trust_bar")[0];
  const rich = sections<any>(page, "rich_text");
  const lead = section<any>(page, "lead_form");

  /* rich_text sections by order (excluding financing_strip) */
  const contentBlocks = rich.filter((item) => item.style_variant !== "financing_strip");
  const financing = rich.find((item) => item.style_variant === "financing_strip");

  /* content sections with fallbacks */
  const intro = contentBlocks[0] || defaultIntro;
  const optionsSection = contentBlocks[1] || defaultOptions;
  const estimatesSection = contentBlocks[2] || defaultEstimates;
  const consultSection = contentBlocks[3] || defaultConsult;

  /* trust strip data */
  const trustStripCms = sections<any>(page, "trust_bar")[1];
  const trustStripItems = trustStripCms?.items || defaultTrustStrip;
  const trustBarItems = trust?.items || defaultTrustBar;

  /* financing cards with fallback */
  const cards = (optionsSection?.cards && optionsSection.cards.length > 0) ? optionsSection.cards : defaultFinancingCards;

  /* hero data */
  const heroBadges = (hero?.badges && hero.badges.length > 0) ? hero.badges : defaultHeroBadges;
  const heroHeadline = hero?.headline || "Financing Your Connecticut Remodeling Project";
  const heroHighlight = hero?.highlight_text || "Remodeling Project";
  const heroSubheadline = hero?.subheadline || "Understanding your financing options before the estimate arrives puts you in a better position to make decisions that work for your household and helps us right-size the project scope to match what you want to spend.";
  const heroParts = parts(heroHeadline, heroHighlight);

  /* lead form with fallback */
  const leadData = lead || defaultLeadForm;

  /* financing strip with fallback */
  const financingStripData = financing || defaultFinancingStrip;

  const fadeRef = useFadeUp();

  return (
    <div ref={fadeRef} data-financing-page className="bg-white text-[#1e2b43]">
      <style>{`
        /* ── financing page CSS variables ── */
        [data-financing-page] {
          --fin-fast: 0.2s;
          --fin-mid: 0.35s;
          --fin-ease: cubic-bezier(0.4, 0, 0.2, 1);
          --fin-lift-md: -4px;
          --fin-shadow-card: 0 2px 12px rgba(30,43,67,0.06), 0 1px 3px rgba(30,43,67,0.04);
          --fin-shadow-card-hover: 0 12px 28px rgba(30,43,67,0.10), 0 28px 56px rgba(30,43,67,0.12);
        }

        /* ── prose paragraphs ── */
        [data-financing-page] .fin-prose-p { margin-top: 20px; }
        [data-financing-page] .fin-prose-p:first-of-type { margin-top: 0; }

        /* ── financing option cards ── */
        [data-financing-page] .fin-options-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
        }
        [data-financing-page] .fin-option-card {
          background: #fff;
          border-radius: 12px;
          padding: 32px 24px;
          text-align: center;
          box-shadow: var(--fin-shadow-card);
          transition: transform var(--fin-mid) var(--fin-ease),
                      border-bottom-color var(--fin-mid) var(--fin-ease),
                      box-shadow var(--fin-mid) var(--fin-ease);
          border-bottom: 2px solid transparent;
        }
        [data-financing-page] .fin-option-card:hover {
          transform: translateY(var(--fin-lift-md));
          border-bottom-color: #bc9155;
          box-shadow: var(--fin-shadow-card-hover);
        }
        [data-financing-page] .fin-option-icon {
          width: 56px; height: 56px;
          border-radius: 50%;
          background: rgba(188, 145, 85, 0.10);
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 20px;
          transition: background var(--fin-fast) var(--fin-ease);
        }
        [data-financing-page] .fin-option-card:hover .fin-option-icon {
          background: rgba(188, 145, 85, 0.18);
        }
        [data-financing-page] .fin-option-icon svg { width: 24px; height: 24px; }
        [data-financing-page] .fin-option-card h3 { transition: color var(--fin-fast) var(--fin-ease); }
        [data-financing-page] .fin-option-card:hover h3 { color: #bc9155; }

        /* ── financing card CTA link ── */
        [data-financing-page] .fin-card-link {
          display: inline-flex; align-items: center; gap: 6px;
          margin-top: 12px; min-height: 44px;
          font-size: 13px; font-weight: 600; color: #bc9155;
          text-decoration: none;
          transition: color var(--fin-fast) var(--fin-ease), gap var(--fin-fast) var(--fin-ease);
        }
        [data-financing-page] .fin-card-link:hover { color: #9a7340; gap: 10px; }

        /* ── section padding ── */
        [data-financing-page] .fin-section { padding: 80px 40px; }

        /* ── hero responsive ── */
        @media (max-width: 768px) {
          [data-financing-page] .fin-hero { padding: 100px 20px 36px !important; min-height: 40vh !important; }
          [data-financing-page] .fin-hero h1 { font-size: clamp(30px, 7vw, 42px) !important; }
          [data-financing-page] .fin-hero .fin-hero-sub { font-size: 15px !important; }
          [data-financing-page] .hero-ctas { flex-direction: column; align-items: center; }
          [data-financing-page] .hero-cta-btn {
            min-height: 44px; width: 100%; max-width: 300px;
            justify-content: center; font-size: 14px; padding: 12px 24px;
          }
        }
        @media (max-width: 480px) {
          [data-financing-page] .fin-hero { padding: 90px 16px 32px !important; min-height: 35vh !important; }
          [data-financing-page] .fin-hero h1 { font-size: clamp(26px, 7vw, 36px) !important; }
          [data-financing-page] .fin-hero .fin-hero-sub { font-size: 14px !important; }
          [data-financing-page] .hero-cta-btn { min-width: 0; }
        }

        /* ── section responsive ── */
        @media (max-width: 768px) {
          [data-financing-page] .fin-section { padding: 52px 20px !important; }
          [data-financing-page] .fin-section-header { margin-bottom: 36px !important; }
          [data-financing-page] .fin-section-header h2 { font-size: 24px !important; margin-bottom: 14px !important; }
          [data-financing-page] .fin-section-header p { font-size: 15px !important; }
          [data-financing-page] .fin-options-grid { grid-template-columns: 1fr; gap: 16px; }
          [data-financing-page] .fin-option-card { padding: 24px 18px; }
          [data-financing-page] .fin-prose-p { font-size: 15px !important; }
        }
        @media (max-width: 480px) {
          [data-financing-page] .fin-section { padding: 48px 16px !important; }
          [data-financing-page] .fin-section-header { margin-bottom: 32px !important; }
          [data-financing-page] .fin-section-header h2 { font-size: 26px !important; }
          [data-financing-page] .fin-section-header p { font-size: 14px !important; }
          [data-financing-page] .fin-options-grid { gap: 12px; }
          [data-financing-page] .fin-option-card { padding: 20px 14px; }
          [data-financing-page] .fin-option-card h3 { font-size: 16px; }
          [data-financing-page] .fin-option-card p { font-size: 13px; }
        }

        /* ── reduced motion ── */
        @media (prefers-reduced-motion: reduce) {
          [data-financing-page] .fin-option-card,
          [data-financing-page] .fin-card-link { transition: none; }
          [data-financing-page] .fin-option-card:hover { transform: none; }
        }
        @media (hover: none), (pointer: coarse) {
          [data-financing-page] .fin-option-card:hover { transform: none; }
        }
      `}</style>

      {/* ══════ HERO ══════ */}
      <section className="fin-hero relative isolate flex min-h-[50vh] items-stretch overflow-hidden bg-[#151e30] text-white" style={{ padding: "120px 40px 48px" }}>
        <Image src={media(hero?.background_image, "/portfolio/builtwell-contractor-handshake-arrival-ct-optimized.jpg")} alt="" fill priority fetchPriority="high" sizes="100vw" className="object-cover object-[center_30%] opacity-[0.72]" />
        <div className="absolute inset-0" style={{
          background: [
            "radial-gradient(ellipse at 97% 97%, rgba(21,30,48,1) 0%, rgba(21,30,48,0.9) 8%, transparent 30%)",
            "radial-gradient(ellipse at 3% 97%, rgba(21,30,48,0.9) 0%, transparent 25%)",
            "linear-gradient(180deg, rgba(21,30,48,0.35) 0%, rgba(21,30,48,0.2) 30%, rgba(21,30,48,0.45) 65%, rgba(21,30,48,0.92) 100%)",
          ].join(", "),
        }} />
        <div className="fin-hero-inner relative z-10 mx-auto flex w-full max-w-[1240px] flex-col items-center justify-center text-center">
          {/* Breadcrumb */}
          <ol className="fade-up mb-5 flex list-none items-center gap-0 p-0 text-[13px] font-medium text-white/[0.92] [text-shadow:0_1px_6px_rgba(0,0,0,0.7)]" style={fadeUpStyle}>
            <li className="flex items-center">{linkNode("/", "Home", "text-white/85 transition-colors duration-200 hover:text-[#bc9155]")}</li>
            <li className="flex items-center before:mx-2.5 before:text-[12px] before:text-[#bc9155] before:content-['›']">
              <span className="font-semibold text-white">Financing</span>
            </li>
          </ol>
          <h1 className="fade-up mb-3 max-w-[900px] text-[clamp(40px,4.5vw,56px)] font-bold leading-[1.08] tracking-[-0.5px] text-white [text-shadow:0_2px_20px_rgba(0,0,0,0.5)]" style={{ ...fadeUpStyle, transitionDelay: "0.1s" }}>
            {heroParts.before}
            {heroParts.accent ? <span className="text-[#bc9155]">{heroParts.accent}</span> : null}
            {heroParts.after}
          </h1>
          <p className="fade-up fin-hero-sub mx-auto mt-4 max-w-[560px] text-center text-[17px] font-normal leading-[1.7] text-white/[0.82]" style={{ ...fadeUpStyle, transitionDelay: "0.2s", fontFamily: "'Inter', sans-serif" }}>
            {heroSubheadline}
          </p>
          {/* CTA buttons */}
          <div className="fade-up mt-8 flex flex-col items-center gap-[14px] sm:flex-row sm:justify-center" style={{ ...fadeUpStyle, transitionDelay: "0.3s" }}>
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
        </div>
      </section>

      {/* ══════ TRUST BAR ══════ */}
      <HeroTrustBar items={trustBarItems} />

      {/* ══════ PLANNING YOUR REMODELING INVESTMENT ══════ */}
      <section className="fin-section border-b border-[rgba(30,43,67,0.06)] bg-white">
        <div className="mx-auto max-w-[1240px]">
          <div className="fade-up mx-auto max-w-[800px]" style={fadeUpStyle}>
            {label(intro?.eyebrow || defaultIntro.eyebrow)}
            {(() => { const p = parts(intro?.title || defaultIntro.title, intro?.highlight_text || defaultIntro.highlight_text); return (
              <h2 className="mb-6 font-serif text-[clamp(32px,3.5vw,44px)] font-bold tracking-[-0.5px]">
                {p.before}{p.accent ? <span className="text-[#bc9155]">{p.accent}</span> : null}{p.after}
              </h2>
            ); })()}
            {(intro?.content || defaultIntro.content).split("\n\n").filter(Boolean).map((paragraph: string, index: number) =>
              renderParagraphWithLinks(paragraph, index)
            )}
          </div>
        </div>
      </section>

      {/* ══════ FINANCING OPTIONS CARDS ══════ */}
      <section className="fin-section bg-[#f5f1e9]">
        <div className="mx-auto max-w-[1240px]">
          <div className="fade-up fin-section-header text-center" style={{ ...fadeUpStyle, marginBottom: 48 }}>
            {label(optionsSection?.eyebrow || defaultOptions.eyebrow)}
            {(() => { const p = parts(optionsSection?.title || defaultOptions.title, optionsSection?.highlight_text || defaultOptions.highlight_text); return (
              <h2 className="mx-auto mb-5 max-w-[780px] font-serif text-[clamp(28px,3.5vw,44px)] font-bold tracking-[-0.5px]">
                {p.before}{p.accent ? <span className="text-[#bc9155]">{p.accent}</span> : null}{p.after}
              </h2>
            ); })()}
            <p className="mx-auto max-w-[700px] text-[17px] leading-[1.75] text-[#5c677d]">
              {optionsSection?.content || defaultOptions.content}
            </p>
          </div>
          <div className="fade-up fin-options-grid" style={{ ...fadeUpStyle, transitionDelay: "0.15s" }}>
            {cards.map((card: any, index: number) => (
              <div key={`${card.title || "opt"}-${index}`} className="fin-option-card">
                <div className="fin-option-icon">
                  {pickFinancingIcon(card.title)}
                </div>
                <h3 className="mb-2.5 text-[18px] font-semibold" style={{ fontFamily: "'Inter', sans-serif" }}>{card.title}</h3>
                <p className="text-[14px] leading-[1.65] text-[#5c677d]">{card.description}</p>
                {card.url ? (
                  <a href={card.url} target="_blank" rel="noopener noreferrer" className="fin-card-link">
                    {card.cta_label || card.title}
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                  </a>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ ESTIMATES ══════ */}
      <section className="fin-section border-b border-[rgba(30,43,67,0.06)] bg-white">
        <div className="mx-auto max-w-[1240px]">
          <div className="fade-up mx-auto max-w-[820px]" style={fadeUpStyle}>
            <div className="fin-section-header mb-7 text-center">
              {label(estimatesSection?.eyebrow || defaultEstimates.eyebrow)}
              {(() => { const p = parts(estimatesSection?.title || defaultEstimates.title, estimatesSection?.highlight_text || defaultEstimates.highlight_text); return (
                <h2 className="mb-5 font-serif text-[clamp(28px,3vw,38px)] font-bold tracking-[-0.3px]">
                  {p.before}{p.accent ? <span className="text-[#bc9155]">{p.accent}</span> : null}{p.after}
                </h2>
              ); })()}
            </div>
            {(estimatesSection?.content || defaultEstimates.content).split("\n\n").filter(Boolean).map((paragraph: string, index: number) =>
              renderParagraphWithLinks(paragraph, index)
            )}
          </div>
        </div>
      </section>

      {/* ══════ CONSULTATIONS ══════ */}
      <section className="fin-section bg-[#f5f1e9]">
        <div className="mx-auto max-w-[1240px]">
          <div className="fade-up mx-auto max-w-[820px]" style={fadeUpStyle}>
            <div className="fin-section-header mb-7 text-center">
              {label(consultSection?.eyebrow || defaultConsult.eyebrow)}
              {(() => { const p = parts(consultSection?.title || defaultConsult.title, consultSection?.highlight_text || defaultConsult.highlight_text); return (
                <h2 className="mb-5 font-serif text-[clamp(28px,3vw,38px)] font-bold tracking-[-0.3px]">
                  {p.before}{p.accent ? <span className="text-[#bc9155]">{p.accent}</span> : null}{p.after}
                </h2>
              ); })()}
            </div>
            {(consultSection?.content || defaultConsult.content).split("\n\n").filter(Boolean).map((paragraph: string, index: number) => {
              /* phone number paragraph with bold labels */
              if (paragraph.includes("Fairfield County:") || paragraph.includes("New Haven County:")) {
                return (
                  <p key={index} className="fin-prose-p text-[16px] leading-[1.85] text-[#5c677d]" style={{ marginTop: 8 }} dangerouslySetInnerHTML={{
                    __html: paragraph
                      .replace(/\*\*([^*]+)\*\*/g, '<strong style="color:#1e2b43;font-weight:600">$1</strong>')
                      .replace(/\((\d{3})\)\s*(\d{3})-(\d{4})/g, '<a href="tel:$1$2$3" style="color:#bc9155;font-weight:600;text-decoration:none">($1) $2-$3</a>')
                      .replace(/\n/g, "<br>")
                  }} />
                );
              }
              return renderParagraphWithLinks(paragraph, index);
            })}
          </div>
        </div>
      </section>

      {/* ══════ TRUST STRIP ══════ */}
      <DarkTrustStrip items={trustStripItems} />

      {/* ══════ LEGAL DISCLAIMER ══════ */}
      <div style={{ background: "#f8f6f1", border: "1px solid #e5e0d8", borderRadius: 10, padding: "20px 24px", marginTop: 32, marginBottom: 32, maxWidth: 1200, marginLeft: "auto", marginRight: "auto" }}>
        <p style={{ margin: "0 0 16px", fontSize: 13, fontWeight: 700, color: "#1E2B43", textTransform: "uppercase" as const, letterSpacing: "0.5px" }}>Disclaimer</p>
        <p style={{ margin: 0, fontSize: 13, lineHeight: 1.7, color: "#6b7280" }}>
          BuiltWell CT is a licensed home remodeling contractor, not a lender, bank, or financial advisor. The financing information on this page is provided for general informational purposes only and does not constitute financial advice. All interest rates, terms, approval requirements, and promotional offers are set by the respective lenders and are subject to change without notice. Approval and terms depend on your creditworthiness and the lender&apos;s criteria. We encourage homeowners to consult with a qualified financial professional before making financing decisions. BuiltWell CT does not guarantee approval or specific terms from any lender. Connecticut homeowners should be aware of their rights under the Connecticut Home Improvement Act (CT General Statutes §20-418 et seq.) and may contact the{" "}
          <a href="https://portal.ct.gov/DCP" style={{ color: "#C9A96E" }} target="_blank" rel="noopener noreferrer">Connecticut Department of Consumer Protection</a>
          {" "}with questions about home improvement financing or contractor obligations.
        </p>
      </div>

      {/* ══════ LEAD FORM CTA ══════ */}
      <LeadFormSection page={page} data={leadData} accent={leadData?.title_highlight || "Consultation"} />

      {/* ══════ FINANCING STRIP (GreenSky) ══════ */}
      <FinancingStrip data={financingStripData} />
    </div>
  );
}

"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import type { CMSPage } from "@/types/cms";
import { DarkTrustStrip, FinancingStrip, HeroTrustBar, LeadFormSection, cls, label, linkNode, media, parts, section, sections } from "./template-utils";

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

/* ── trust strip fallback data ── */
const defaultTrustStrip = [
  { icon: "star", label: "Google Rating", value: "4.9", url: "https://www.google.com/search?q=builtwell+ct+reviews" },
  { icon: "check", label: "Trusted on Houzz", url: "https://www.houzz.com/professionals/general-contractors/builtwell-ct" },
  { icon: "calendar", label: "CT HIC License #0668405", url: "https://www.elicense.ct.gov/Lookup/LicenseLookup.aspx" },
  { icon: "check", label: "Verified on Angi", url: "https://www.angi.com/companylist/us/ct/orange/builtwell-ct-reviews-" },
];

const defaultFinancing = {
  title: "Flexible Financing Available",
  content: "Get approved in about 60 seconds and start your project today.",
  cta: { label: "Check Financing Options", url: "https://www.greensky.com" },
};

const stepImageFallbacks = [
  "/portfolio/builtwell-contractor-client-consultation-ct.jpeg",
  "/services/design-planning-project-ct.jpg",
  "/services/kitchen-remodeling-consultation-ct-03.jpg",
  "/services/basement-finishing-framing-ct-01.jpeg",
  "/services/bathroom-remodeling-completed-walkthrough-ct-02.jpg",
];

const relatedFallback = [
  {
    title: "Kitchen Remodeling",
    summary: "Full-service kitchen renovations from cabinet and countertop updates to complete gut remodels with layout changes throughout Connecticut.",
    image: "/services/kitchen-remodeling-ct.jpg",
    url: "/kitchen-remodeling/",
    cta_label: "Learn More",
  },
  {
    title: "Bathroom Remodeling",
    summary: "Complete bathroom renovations including tile, vanities, showers, tubs, and plumbing upgrades throughout Connecticut.",
    image: "/services/bathroom-remodeling-ct.jpg",
    url: "/bathroom-remodeling/",
    cta_label: "Learn More",
  },
  {
    title: "Basement Finishing",
    summary: "Transform your unfinished basement into functional living space with framing, insulation, electrical, flooring, and full finish work.",
    image: "/services/basement-finishing-ct.jpg",
    url: "/basement-finishing/",
    cta_label: "Learn More",
  },
];

const referenceIntro = {
  eyebrow: "How We Work",
  title: "A Process Built on Clear Communication",
  highlight: "Clear Communication",
  content:
    "Every remodeling project follows the same structured five-step process. We show up when we say we will, we complete what we start, and we keep you informed at every stage.",
};

const referenceSteps = [
  {
    title: "Consultation. We Visit Your Home or Meet Via Zoom",
    summary:
      "Every project starts with a conversation. We visit your home to see the space firsthand, or we connect via Zoom or Google Meet if you prefer to start remotely. We listen to what you want to accomplish, assess the existing conditions, and answer your questions honestly.",
    more: [
      "During an in-person visit, we look at the layout, note the electrical and plumbing conditions, check for any structural considerations, and get a clear picture of the scope. For video consultations, we walk through photos and measurements you share, discuss goals and budget ranges, and determine whether an on-site visit is the right next step.",
      "There is no charge for the consultation and no obligation. The goal is simple: understand your project well enough to give you an honest assessment of what it will take. If we're not the right fit, we'll tell you that too.",
    ],
  },
  {
    title: "Planning. Detailed Scope, Timeline, and Proposal",
    summary:
      "After the consultation, we prepare a clear written proposal that covers exactly what's included, how long the project will take, and what it costs. Line items are specific so you understand precisely where the budget is going.",
    more: [
      "The proposal includes a detailed scope of work, a realistic timeline with milestones, and a complete cost breakdown. We account for permit requirements specific to your town, lead times for materials, and any site conditions we identified during the consultation. If there are decisions that will affect cost or schedule, we flag them clearly.",
      "No vague estimates. No hidden fees. No allowances that balloon later. You'll know what you're agreeing to before any work begins, and the proposal becomes the reference point for the entire project. If something changes during construction, it goes through a documented change order process.",
    ],
  },
  {
    title: "Selections. We Help You Choose Materials and Finishes",
    summary:
      "Choosing materials can feel overwhelming when you're looking at hundreds of options for cabinets, countertops, tile, flooring, fixtures, and hardware. We simplify it. We guide you through the choices that matter with options at different price points.",
    more: [
      "For kitchens, that means walking through cabinet lines with clear pricing and lead time differences. For bathrooms, it means tile options, vanity styles, and fixture selections that work together. For any project, we help you understand how material choices affect both budget and timeline.",
      "We communicate lead times clearly and make sure all selections are finalized before construction begins. If a material has a long lead time, we flag that immediately so it doesn't delay your project. The goal is to have every decision made and every material ordered before the first day of construction.",
    ],
  },
  {
    title: "Build. Our Crews Complete With Daily Communication",
    summary:
      "Construction begins on the agreed schedule. Our crews arrive when they say they will, maintain a clean job site at the end of every workday, and provide you with daily updates on progress.",
    more: [
      "We install dust barriers to protect the rest of your home. We coordinate all trades so you're not managing multiple contractors or schedules. Everything runs through our project management process, and you have one point of contact throughout.",
      "If something unexpected comes up behind a wall, we contact you that same day. We explain what we found, present your options with clear costs, and wait for your approval before proceeding. We don't make decisions about your home without your input. Any additional work is documented in a change order with a specific cost and timeline impact.",
    ],
  },
  {
    title: "Walkthrough. Final Review Together",
    summary:
      "When construction is complete, we walk through the finished project together. We check every detail. This is not a formality. It's the step where we confirm that everything meets the standard we agreed to at the start.",
    more: [
      "If anything needs attention, we address it before calling the project complete. We don't consider a job finished until you do.",
      "Your written acceptance at the final walkthrough is the last step. At that point, we also walk you through maintenance recommendations for the materials installed, warranty information for products and workmanship, and how to reach us if anything comes up down the road. The relationship doesn't end when the project does.",
    ],
  },
];

const referenceWhy = {
  eyebrow: "Why BuiltWell",
  title: "What Sets Us Apart",
  highlight: "Apart",
  content: "The process matters, but so does the team behind it. Here's what you can expect when you work with us.",
  cards: [
    { title: "Daily Communication", description: "You'll hear from us every day during construction. What was completed, what's next, and whether we're on schedule. No chasing your contractor for updates.", icon: "message" },
    { title: "We Show Up on Time", description: "When we say we'll be there at 8 AM, we're there at 8 AM. Reliability is a basic expectation that too many contractors fail to meet. We don't.", icon: "clock" },
    { title: "No Surprises", description: "Your proposal is specific and detailed. If something changes during construction, it goes through a documented change order process. You approve every cost before we proceed.", icon: "shield" },
    { title: "Clean Job Site", description: "We clean up at the end of every workday and install dust barriers to protect the rest of your home. You shouldn't have to live in a construction zone any longer than necessary.", icon: "home" },
    { title: "Quality Craftsmanship", description: "Every project is managed by our in-house team, not subcontracted out. We hold CT HIC License #0668405 and carry full liability and workers' compensation insurance.", icon: "check" },
  ],
};

const referenceAreas = {
  eyebrow: "Where We Work",
  title: "Serving Homeowners Across Two Counties",
  highlight: "Two Counties",
  subtitle: "We follow this same process for every project throughout Fairfield and New Haven Counties, with dedicated teams serving both regions.",
  note: "Not sure if we serve your area? Contact our Connecticut remodeling team and we'll let you know.",
  noteLinkText: "Contact our Connecticut remodeling team",
  noteLinkUrl: "/contact/",
  counties: [
    {
      name: "Fairfield County",
      phoneLabel: "Fairfield",
      phone: "(203) 919-9616",
      description: "Serving all of Fairfield County with dedicated local crews. From Greenwich estates to Ridgefield colonials, we know the housing stock and building departments across the county.",
      url: "/fairfield-county/",
      cta_label: "Learn more about Fairfield County",
      towns: ["Greenwich", "Stamford", "Norwalk", "Westport", "Darien", "New Canaan", "Fairfield", "Ridgefield"],
      extra_towns: ["Trumbull", "Bethel", "Bridgeport", "Brookfield", "Danbury", "Easton", "Monroe", "New Fairfield", "Newtown", "Redding", "Shelton", "Sherman", "Stratford", "Weston", "Wilton"],
      town_links: {
        Greenwich: "/fairfield-county/greenwich-ct/",
        Stamford: "/fairfield-county/stamford-ct/",
        Norwalk: "/fairfield-county/norwalk-ct/",
        Westport: "/fairfield-county/westport-ct/",
        Darien: "/fairfield-county/darien-ct/",
        "New Canaan": "/fairfield-county/new-canaan-ct/",
        Fairfield: "/fairfield-county/fairfield-ct/",
        Ridgefield: "/fairfield-county/ridgefield-ct/",
      },
    },
    {
      name: "New Haven County",
      phoneLabel: "New Haven",
      phone: "(203) 466-9148",
      description: "Served from our Orange, CT office. We cover every town in New Haven County from coastal Branford and Madison to inland Woodbridge and Cheshire - delivering expert remodeling across the region.",
      url: "/new-haven-county/",
      cta_label: "Learn more about New Haven County",
      towns: ["Orange", "New Haven", "Hamden", "Branford", "Guilford", "Madison", "Woodbridge", "Milford"],
      extra_towns: ["Cheshire", "Ansonia", "Beacon Falls", "Bethany", "Derby", "East Haven", "Meriden", "Middlebury", "Naugatuck", "North Branford", "North Haven", "Oxford", "Prospect", "Seymour", "Southbury", "Wallingford", "Waterbury", "West Haven", "Wolcott"],
      town_links: {
        Orange: "/new-haven-county/orange-ct/",
        "New Haven": "/new-haven-county/new-haven-ct/",
        Hamden: "/new-haven-county/hamden-ct/",
        Branford: "/new-haven-county/branford-ct/",
        Guilford: "/new-haven-county/guilford-ct/",
        Madison: "/new-haven-county/madison-ct/",
        Woodbridge: "/new-haven-county/woodbridge-ct/",
        Milford: "/new-haven-county/milford-ct/",
      },
    },
  ],
};

const referenceFaq = [
  {
    question: "How long does a consultation take?",
    answer:
      "An in-person consultation typically takes 45 minutes to an hour. We walk through the space, discuss your goals, assess existing conditions, and answer your questions. A video consultation via Zoom or Google Meet usually runs 30 to 45 minutes and is a good option if you want to start the conversation before committing to an on-site visit. Both are free and carry no obligation.",
  },
  {
    question: "Is the estimate free?",
    answer:
      "Yes. The initial consultation and project estimate are completely free. After we assess your space and understand your goals, we prepare a detailed written proposal with specific line items, a realistic timeline, and a complete cost breakdown. There is no charge for this, and no obligation to move forward. If you decide we're not the right fit, that's perfectly fine. You'll still walk away with a clear understanding of what your project would involve.",
  },
  {
    question: "Do you handle permits?",
    answer:
      "Yes. We handle all permit applications and coordinate every required inspection as part of the project. Permitting requirements vary by municipality in Connecticut. Some towns require separate electrical, plumbing, and building permits, each with their own inspections, while others consolidate under a single application. Towns with historic districts may require additional design review. We manage all of this so you don't have to navigate the process yourself. Permit costs are included in your proposal.",
  },
  {
    question: "How long does a typical remodeling project take?",
    answer:
      "Timeline depends on scope. A bathroom remodel typically runs 3 to 5 weeks. A kitchen gut renovation is usually 8 to 12 weeks. Basement finishes range from 4 to 8 weeks depending on complexity. We provide a specific timeline with milestones in your proposal, and we communicate any changes immediately if they come up during construction. Material lead times are the most common factor that affects schedule, which is why we finalize all selections before construction begins.",
  },
  {
    question: "What happens if something unexpected is found during construction?",
    answer:
      "It happens, especially in older Connecticut homes. If we open a wall and find outdated wiring, water damage, or structural conditions that need attention, we contact you that same day. We explain what we found, present your options with clear costs, and wait for your written approval before proceeding. Any additional work is documented in a formal change order with a specific cost and timeline impact. We never make decisions about your home without your input.",
  },
  {
    question: "Can I live in my home during the remodel?",
    answer:
      "In most cases, yes. We install dust barriers and containment systems to separate the work area from the rest of your home. For kitchen remodels, we can often set up a temporary kitchen area so you still have access to a sink and appliances. For bathroom remodels, we plan the work so you always have access to at least one functioning bathroom. We clean up at the end of every workday and keep the job site organized throughout the project.",
  },
  {
    question: "Do you offer financing options?",
    answer:
      "Yes. We partner with GreenSky to offer flexible financing options for qualified homeowners. You can get approved in about 60 seconds and choose from a variety of payment plans. Financing details are available during the proposal stage so you can factor monthly payments into your decision. We are happy to walk you through the options during your consultation.",
  },
  {
    question: "How do you handle material selections and ordering?",
    answer:
      "We guide you through every material decision including cabinets, countertops, tile, flooring, fixtures, and hardware with options at different price points so you can make informed choices without feeling overwhelmed. We visit showrooms with you when needed and provide samples for comparison. Once selections are finalized, we handle all ordering and coordinate delivery timing with the construction schedule. Every selection is confirmed in writing before we place orders, so there are no surprises.",
  },
];

export function ProcessPageTemplate({ page }: { page: CMSPage }) {
  const hero = section<any>(page, "hero");
  const trustBars = sections<any>(page, "trust_bar");
  const rich = sections<any>(page, "rich_text");
  const process = section<any>(page, "process_steps");
  const related = section<any>(page, "services_grid");
  const values = {
    eyebrow: referenceWhy.eyebrow,
    title: referenceWhy.title,
    highlight_text: referenceWhy.highlight,
    content: referenceWhy.content,
    cards: referenceWhy.cards,
  };
  const areas = {
    ...section<any>(page, "areas_served"),
    eyebrow: referenceAreas.eyebrow,
    title: referenceAreas.title,
    highlight_text: referenceAreas.highlight,
    subtitle: referenceAreas.subtitle,
    counties: referenceAreas.counties,
    note: referenceAreas.note,
    note_link_text: referenceAreas.noteLinkText,
    note_link_url: referenceAreas.noteLinkUrl,
  };
  const faq = {
    ...section<any>(page, "faq_list"),
    title: "Process Questions",
    highlight_text: "Questions",
    items: referenceFaq,
  };
  const lead = section<any>(page, "lead_form");
  const financing = rich.find((item) => item.style_variant === "financing_strip");
  const heroParts = parts(hero?.headline, "Connecticut");
  const valuesParts = parts(values?.title, values?.highlight_text);
  const processTitleParts = parts(
    process?.title || referenceIntro.title,
    process?.highlight_text || referenceIntro.highlight,
  );
  const relatedTitleParts = parts(related?.title || "Our Most Popular Services", related?.highlight_text || "Services");
  const [openSteps, setOpenSteps] = useState<Record<number, boolean>>({});
  const [showAllFaq, setShowAllFaq] = useState(false);
  const [countyOpen, setCountyOpen] = useState<Record<number, boolean>>({});
  const [activeValue, setActiveValue] = useState(-1);
  const fadeRef = useFadeUp();

  const trustStripItems = defaultTrustStrip;
  const relatedItems = (related?.items && related.items.length > 0) ? related.items : relatedFallback;
  const stepItems = ((process?.steps || []).length ? process.steps : referenceSteps).map((step: any, index: number) => ({
    ...step,
    image: step?.image || stepImageFallbacks[index] || stepImageFallbacks[0],
    image_alt: step?.image_alt || step?.imageAlt || null,
    summary: step?.summary || step?.description || "",
    more: Array.isArray(step?.more) ? step.more : [],
  }));
  const leadData = {
    ...(lead || {}),
    eyebrow: "GET IN TOUCH",
    title: "Ready to Start Your Remodeling Project?",
    title_highlight: "Remodeling Project",
    subtitle: "Tell us about your project. We respond within one business day. No obligation.",
    submit_label: "Get Your Free Estimate",
    images: [
      { image: "/team/builtwell-owner-handshake-client-ct-02.jpg", alt: "BuiltWell CT owner meeting with a Connecticut homeowner for a remodeling consultation" },
      { image: "/portfolio/builtwell-job-site-aerial-ct.jpg", alt: "BuiltWell CT owner meeting homeowner for a free consultation" },
    ],
  };
  const fairfieldPhone = page.phones?.items?.find((item: any) => String(item?.label || "").toLowerCase().includes("fairfield"))?.number || "(203) 919-9616";
  const newHavenPhone = page.phones?.items?.find((item: any) => String(item?.label || "").toLowerCase().includes("new haven"))?.number || "(203) 466-9148";
  const fairfieldPhoneHref = `tel:${String(fairfieldPhone).replace(/\D/g, "")}`;
  const newHavenPhoneHref = `tel:${String(newHavenPhone).replace(/\D/g, "")}`;

  return (
    <div ref={fadeRef} className="bg-[#f5f1e9] text-[#1e2b43]">

      {/* ══════ HERO ══════ */}
      <section className="relative isolate overflow-hidden bg-[#151e30] px-5 pt-[120px] text-white md:px-10">
        {/* Background image */}
        <div className="absolute inset-0 bg-cover bg-[center_30%] opacity-[0.72]" style={{ backgroundImage: `url(${media(hero?.background_image, "/images/headers/design-planning-header.jpg")})` }} />
        {/* Multi-layer overlay matching reference */}
        <div className="absolute inset-0" style={{
          background: [
            "radial-gradient(ellipse at 97% 97%, rgba(21,30,48,1) 0%, rgba(21,30,48,0.9) 8%, transparent 30%)",
            "radial-gradient(ellipse at 3% 97%, rgba(21,30,48,0.9) 0%, transparent 25%)",
            "linear-gradient(180deg, rgba(21,30,48,0.35) 0%, rgba(21,30,48,0.2) 30%, rgba(21,30,48,0.45) 65%, rgba(21,30,48,0.92) 100%)",
          ].join(", "),
        }} />
        <div className="relative z-10 mx-auto flex min-h-[50vh] max-w-[1240px] flex-col items-center justify-center pb-12 text-center">
          {/* Breadcrumb */}
          <ol className="fade-up mb-5 flex list-none items-center gap-0 text-[13px] font-medium text-white/[0.92] [text-shadow:0_1px_6px_rgba(0,0,0,0.7)]" style={fadeUpStyle}>
            <li>{linkNode("/", "Home", "text-white/85 transition-colors hover:text-[#bc9155]")}</li>
            <li className="before:mx-2.5 before:text-[12px] before:text-[#bc9155] before:content-['›']">
              <span className="font-semibold text-white">Our Process</span>
            </li>
          </ol>
          {/* Title — reference: clamp(40px, 4.5vw, 56px) */}
          <h1 className="fade-up mb-3 max-w-[900px] text-[clamp(40px,4.5vw,56px)] font-bold leading-[1.08] tracking-[-0.5px] text-white [text-shadow:0_2px_20px_rgba(0,0,0,0.5)]" style={{ ...fadeUpStyle, transitionDelay: "0.1s" }}>
            {heroParts.before}
            {heroParts.accent ? <span className="text-[#bc9155]">{heroParts.accent}</span> : null}
            {heroParts.after}
          </h1>
          {/* Subtitle — 17px matching reference */}
          {hero?.subheadline ? (
            <p className="fade-up mx-auto mt-4 max-w-[560px] text-center text-[17px] font-normal leading-[1.7] text-white/[0.82]" style={{ ...fadeUpStyle, transitionDelay: "0.2s" }}>
              {hero.subheadline}
            </p>
          ) : null}
          {/* CTA buttons — reference style */}
          <div className="fade-up mt-8 flex flex-wrap items-stretch justify-center gap-4" style={{ ...fadeUpStyle, transitionDelay: "0.3s" }}>
            {linkNode(
              hero?.cta_primary?.url || "#contact",
              "Get Your Free Estimate",
              "inline-flex min-w-[220px] items-center justify-center rounded-[8px] border border-[#bc9155] bg-[#bc9155] px-7 py-3.5 text-center text-[14px] font-semibold tracking-[0.4px] text-white transition-all duration-300 hover:-translate-y-[2px] hover:border-[#d4a95a] hover:bg-[#d4a95a] hover:shadow-[0_8px_24px_rgba(188,145,85,0.4)]",
            )}
            {linkNode(
              fairfieldPhoneHref,
              `Fairfield: ${fairfieldPhone}`,
              "inline-flex min-w-[220px] items-center justify-center rounded-[8px] border border-white/[0.22] bg-[rgba(10,18,35,0.45)] px-7 py-3.5 text-center text-[14px] font-semibold tracking-[0.4px] text-white backdrop-blur-[10px] transition-all duration-300 hover:-translate-y-[2px] hover:border-white/[0.32] hover:bg-[rgba(10,18,35,0.62)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.3)]",
            )}
            {linkNode(
              newHavenPhoneHref,
              `New Haven: ${newHavenPhone}`,
              "inline-flex min-w-[220px] items-center justify-center rounded-[8px] border border-white/[0.22] bg-[rgba(10,18,35,0.45)] px-7 py-3.5 text-center text-[14px] font-semibold tracking-[0.4px] text-white backdrop-blur-[10px] transition-all duration-300 hover:-translate-y-[2px] hover:border-white/[0.32] hover:bg-[rgba(10,18,35,0.62)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.3)]",
            )}
          </div>
        </div>
      </section>

      {/* ══════ TRUST BAR ══════ */}
      <HeroTrustBar items={trustBars[0]?.items} />

      {/* ══════ PROCESS INTRO ══════ */}
      <section className="w-full bg-white px-5 pb-10 pt-20 md:px-10">
        <div className="mx-auto max-w-[1240px]">
          <div className="fade-up mx-auto max-w-[720px] text-center" style={fadeUpStyle}>
            <div className="mb-7">
              {label(process?.eyebrow || referenceIntro.eyebrow)}
              <h2 className="font-serif text-[clamp(30px,3.5vw,44px)] font-bold tracking-[-0.5px]">
                {processTitleParts.before}
                {processTitleParts.accent ? <span className="text-[#bc9155]">{processTitleParts.accent}</span> : null}
                {processTitleParts.after}
              </h2>
            </div>
            <p className="text-[16px] leading-[1.8] text-[#5c677d]">{process?.subtitle || referenceIntro.content}</p>
          </div>
        </div>
      </section>

      {/* ══════ THE 5-STEP FRAMEWORK ══════ */}
      <section className="bg-white px-5 pb-24 pt-5 md:px-10">
        <div className="mx-auto max-w-[1240px]">
          <div className="process-steps-v2">
            <div className="timeline-spine" aria-hidden="true" />
            {stepItems.map((item: any, index: number) => {
              const open = !!openSteps[index];
              return (
                <article
                  key={`${item.title}-${index}`}
                  className={cls("fade-up step-card-v2", index % 2 === 1 && "even")}
                  style={{ ...fadeUpStyle, transitionDelay: `${index * 0.08}s` }}
                >
                  <div className="step-card-inner">
                    <div className="step-image">
                      <span className="step-number-badge">{`${index + 1}`.padStart(2, "0")}</span>
                    <img
                      src={media(item.image, stepImageFallbacks[index] || stepImageFallbacks[0])}
                      alt={item.image_alt || item.imageAlt || item.title}
                      className="h-full w-full object-cover"
                    />
                    </div>
                    <div className="step-content">
                      <span className="step-label">Step {["One", "Two", "Three", "Four", "Five"][index] || index + 1}</span>
                      <h3 className="step-title">
                        {`${
                          item.title || `Step ${index + 1}`
                        }${item.short ? `. ${item.short}` : ""}`}
                      </h3>
                    <p className="step-desc">{item.summary || item.description}</p>
                    {open ? (
                      <div className="step-desc-more">
                        {(item.more || []).map((paragraph: string, moreIndex: number) => (
                          <p key={moreIndex}>{paragraph}</p>
                        ))}
                      </div>
                    ) : null}
                    <button
                      type="button"
                      onClick={() => setOpenSteps((current) => ({ ...current, [index]: !current[index] }))}
                      className={cls("step-read-more", open && "open")}
                    >
                      {open ? "Read less" : "Read more"}
                      <svg
                        width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                      >
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════ WHY BUILTWELL ══════ */}
      <section className="relative overflow-hidden px-5 py-24 text-white md:px-10">
        {/* Gradient-only background (no image) */}
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(10,18,34,0.92)_0%,rgba(30,43,67,0.88)_100%)]" />
        <div className="relative z-[1] mx-auto max-w-[1240px]">
          <div className="fade-up mb-16 text-center" style={fadeUpStyle}>
            {label(values?.eyebrow || "Why BuiltWell", true)}
            <h2 className="font-serif text-[clamp(28px,3.5vw,44px)] font-bold tracking-[-0.5px]">
              {valuesParts.before}
              {valuesParts.accent ? <span className="text-[#bc9155]">{valuesParts.accent}</span> : null}
              {valuesParts.after}
            </h2>
            {values?.content ? (
              <p className="mx-auto mt-5 max-w-[700px] text-[17px] leading-[1.75] text-white/60">{values.content}</p>
            ) : null}
          </div>
          <div
            className="fade-up relative grid gap-5 sm:mx-auto sm:max-w-[700px] sm:grid-cols-3 sm:gap-6 lg:max-w-none lg:grid-cols-5 lg:gap-0"
            style={{ ...fadeUpStyle, transitionDelay: "0.15s" }}
          >
            <div className="pointer-events-none absolute left-[10%] right-[10%] top-[34px] hidden h-0.5 bg-[rgba(188,145,85,0.25)] lg:block" />
            {(values?.cards || []).map((card: any, index: number) => (
              <button
                type="button"
                key={`${card.title}-${index}`}
                onClick={() => setActiveValue((current) => (current === index ? -1 : index))}
                aria-pressed={activeValue === index}
                className={cls(
                  "group relative flex w-full flex-col items-center rounded-[8px] px-3 py-4 text-center transition-colors duration-300 hover:bg-[rgba(188,145,85,0.1)] sm:px-2 sm:py-4 lg:px-4 lg:py-5",
                  activeValue === index && "bg-[rgba(188,145,85,0.14)]",
                )}
              >
                <div className="relative z-[2] mx-auto mb-5 flex h-[68px] w-[68px] items-center justify-center rounded-full border-[2.5px] border-[#bc9155] bg-[rgba(188,145,85,0.42)] shadow-[0_0_0_4px_rgba(188,145,85,0.12)]">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#f5e0c0]">
                    {index === 0 && <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />}
                    {index === 1 && <><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></>}
                    {index === 2 && <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />}
                    {index === 3 && <><path d="M3 21h18" /><path d="M3 21V8l9-5 9 5v13" /><rect x="9" y="13" width="6" height="8" /></>}
                    {index === 4 && <><circle cx="12" cy="12" r="10" /><path d="M9 12l2 2 4-4" /></>}
                  </svg>
                </div>
                <h3 className="mb-0 text-center font-serif text-[14px] font-bold leading-[1.3] text-white sm:text-[15px] lg:mb-3 lg:text-[18px]">
                  {card.title}
                </h3>
                <p className={cls("hidden text-[14px] leading-[1.65] text-white/70 transition-all duration-300 lg:block lg:max-h-0 lg:overflow-hidden lg:opacity-0", activeValue === index && "lg:mt-2 lg:max-h-[200px] lg:opacity-100")}>{card.description}</p>
              </button>
            ))}
            {linkNode(
              "#contact",
              <div className="group relative flex flex-col items-center rounded-[8px] px-2 py-4 text-center transition-colors duration-300 hover:bg-[rgba(188,145,85,0.1)] lg:hidden">
                <div className="relative z-[2] mx-auto mb-5 flex h-[68px] w-[68px] items-center justify-center rounded-full border-[2.5px] border-[#bc9155] bg-[#bc9155] shadow-[0_0_0_4px_rgba(188,145,85,0.12)]">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <h3 className="mb-0 text-center font-serif text-[14px] font-bold leading-[1.3] text-white sm:text-[15px]">Get Started</h3>
                <p className="hidden text-[14px] leading-[1.65] text-white/70 lg:block">Schedule your free consultation - in person or via video call.</p>
              </div>,
            )}
          </div>
          <p className="mt-4 text-center text-[12px] text-white/60">Click any item to learn more</p>
        </div>
      </section>

      {/* ══════ WHERE WE WORK ══════ */}
      <ProcessAreasSection data={areas} countyOpen={countyOpen} setCountyOpen={setCountyOpen} />

      {/* ══════ FAQ ══════ */}
      <section className="border-t border-[rgba(30,43,67,0.08)] bg-white px-5 py-24 md:px-10">
        <div className="mx-auto max-w-[800px]">
          <div className="fade-up mb-16 text-center" style={fadeUpStyle}>
            {label("FAQ")}
            <h2 className="font-serif text-[clamp(28px,3.5vw,44px)] font-bold tracking-[-0.5px]">
              {(() => { const p = parts(faq?.title, faq?.highlight_text || "Questions"); return <>{p.before}{p.accent ? <span className="text-[#bc9155]">{p.accent}</span> : null}{p.after}</>; })()}
            </h2>
          </div>
          <div className="fade-up flex flex-col gap-3" style={{ ...fadeUpStyle, transitionDelay: "0.15s" }}>
            {(showAllFaq ? faq?.items || [] : (faq?.items || []).slice(0, 5)).map((item: any, index: number) => (
              <details key={`${item.question}-${index}`} className="rounded-[8px] border border-[rgba(30,43,67,0.1)] transition-colors duration-200 open:border-[#bc9155]">
                <summary className="list-none cursor-pointer px-6 py-5 text-[16px] font-semibold text-[#1e2b43] transition-colors hover:bg-[rgba(188,145,85,0.04)] [&::-webkit-details-marker]:hidden">
                  {item.question}
                </summary>
                <div className="px-6 pb-5 text-[15px] leading-[1.75] text-[#5c677d]">{item.answer}</div>
              </details>
            ))}
          </div>
          {(faq?.items || []).length > 5 ? (
            <div className="fade-up mt-8 text-center" style={{ ...fadeUpStyle, transitionDelay: "0.25s" }}>
              <button
                type="button"
                onClick={() => setShowAllFaq((current) => !current)}
                className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#bc9155] transition-colors hover:text-[#9a7340]"
              >
                {showAllFaq ? "Show Less" : "Show More Questions"}
                <svg
                  width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                  className={cls("transition-transform duration-300", showAllFaq ? "rotate-180" : "")}
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
            </div>
          ) : null}
        </div>
      </section>

      {/* ══════ TRUST STRIP ══════ */}
      <DarkTrustStrip items={trustStripItems} />

      {/* ══════ LEAD FORM ══════ */}
      <LeadFormSection page={page} data={leadData} accent="Project" />

      {/* ══════ FINANCING ══════ */}
      <FinancingStrip data={financing || defaultFinancing} />

      {/* ══════ RELATED SERVICES ══════ */}
      <section className="bg-[#f5f1e9] px-5 py-24 md:px-10">
        <div className="mx-auto max-w-[1240px]">
          <div className="fade-up mb-16 text-center" style={fadeUpStyle}>
            {label(related?.eyebrow || "Related Services")}
            <h2 className="font-serif text-[clamp(28px,3.5vw,44px)] font-bold tracking-[-0.5px]">
              {relatedTitleParts.before}
              {relatedTitleParts.accent ? <span className="text-[#bc9155]">{relatedTitleParts.accent}</span> : null}
              {relatedTitleParts.after}
            </h2>
            <p className="mx-auto mt-5 max-w-[700px] text-[17px] leading-[1.75] text-[#5c677d]">
              {related?.subtitle || "This same five-step process applies to every service we offer."}
            </p>
          </div>
          <div className="fade-up grid gap-8 lg:grid-cols-3" style={{ ...fadeUpStyle, transitionDelay: "0.15s" }}>
            {relatedItems.map((item: any, index: number) => (
              <article
                key={`${item.title}-${index}`}
                className="group flex flex-col overflow-hidden rounded-[8px] border-b-2 border-b-transparent bg-white shadow-[0_2px_12px_rgba(30,43,67,0.06),0_1px_3px_rgba(30,43,67,0.04)] transition-all duration-[350ms] [transition-timing-function:cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-1 hover:border-b-[#bc9155] hover:shadow-[0_12px_28px_rgba(30,43,67,0.1),0_28px_56px_rgba(30,43,67,0.12)]"
              >
                <div className="h-[220px] overflow-hidden">
                  <img
                    src={media(item.image, "/services/kitchen-remodeling-ct.jpg")}
                    alt={item.image_alt || item.imageAlt || item.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-7 pb-8">
                  <h3 className="text-[22px] font-bold">
                    {item.url ? linkNode(item.url, item.title, "text-inherit transition-colors hover:text-[#bc9155]") : item.title}
                  </h3>
                  <p className="mt-3 flex-1 text-[15px] leading-[1.7] text-[#5c677d]">{item.summary}</p>
                  {item.url ? (
                    linkNode(
                      item.url,
                      <>
                        <span>{item.cta_label || "Learn More"}</span>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                      </>,
                      "mt-5 inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#bc9155] transition-all duration-300 hover:gap-2.5",
                    )
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <style jsx global>{`
        .process-steps-v2 {
          position: relative;
        }
        .process-steps-v2 .timeline-spine {
          position: absolute;
          left: 50%;
          top: 12px;
          bottom: 12px;
          width: 2px;
          transform: translateX(-50%);
          background: linear-gradient(to bottom, rgba(188, 145, 85, 0.12), rgba(188, 145, 85, 0.65), rgba(188, 145, 85, 0.12));
        }
        .step-card-v2 {
          position: relative;
          padding: 0 24px;
          margin-bottom: 44px;
          transition: transform 0.3s ease;
        }
        .step-card-v2:last-child {
          margin-bottom: 0;
        }
        .step-card-v2::before {
          content: "";
          position: absolute;
          left: 50%;
          top: 50%;
          width: 16px;
          height: 16px;
          border-radius: 999px;
          transform: translate(-50%, -50%);
          background: #bc9155;
          border: 4px solid #fff;
          box-shadow: 0 0 0 2px rgba(188, 145, 85, 0.3);
          z-index: 2;
        }
        .step-card-inner {
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: 420px;
          border-radius: 16px;
          overflow: hidden;
          background: #fff;
          border: 1px solid rgba(30, 43, 67, 0.08);
          box-shadow: 0 4px 18px rgba(30, 43, 67, 0.08);
        }
        .step-card-v2.even .step-card-inner {
          direction: rtl;
        }
        .step-card-v2.even .step-card-inner > * {
          direction: ltr;
        }
        .step-image {
          position: relative;
          min-height: 320px;
          overflow: hidden;
        }
        .step-image img {
          transition: transform 0.55s ease;
        }
        .step-card-v2:hover .step-image img {
          transform: scale(1.03);
        }
        .step-number-badge {
          position: absolute;
          top: 24px;
          left: 24px;
          width: 52px;
          height: 52px;
          border-radius: 14px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 22px;
          font-weight: 700;
          color: #fff;
          background: #bc9155;
          box-shadow: 0 8px 20px rgba(188, 145, 85, 0.35);
          z-index: 1;
        }
        .step-card-v2.even .step-number-badge {
          left: auto;
          right: 24px;
        }
        .step-content {
          position: relative;
          padding: 44px 38px 38px;
        }
        .step-content::before {
          content: "";
          position: absolute;
          top: 50px;
          left: 0;
          width: 4px;
          height: 54px;
          border-radius: 0 4px 4px 0;
          background: linear-gradient(to bottom, #bc9155, transparent);
        }
        .step-card-v2.even .step-content::before {
          left: auto;
          right: 0;
          border-radius: 4px 0 0 4px;
        }
        .step-label {
          display: inline-block;
          margin-bottom: 10px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1.3px;
          text-transform: uppercase;
          color: #bc9155;
        }
        .step-title {
          margin: 0 0 14px;
          color: #1e2b43;
          font: 700 30px/1.2 "Playfair Display", serif;
          letter-spacing: -0.02em;
        }
        .step-desc,
        .step-desc-more p {
          margin: 0;
          font-size: 16px;
          line-height: 1.76;
          color: #5c677d;
        }
        .step-desc-more {
          margin-top: 14px;
          display: grid;
          gap: 12px;
        }
        .step-read-more {
          margin-top: 18px;
          border: 0;
          background: none;
          color: #bc9155;
          font-size: 14px;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          cursor: pointer;
          transition: color 0.25s;
        }
        .step-read-more svg {
          transition: transform 0.3s;
        }
        .step-read-more.open svg {
          transform: rotate(180deg);
        }
        .step-read-more:hover {
          color: #9a7340;
        }
        @media (max-width: 1024px) {
          .process-steps-v2 .timeline-spine,
          .step-card-v2::before {
            display: none;
          }
          .step-card-v2 {
            padding: 0 20px;
            margin-bottom: 40px;
          }
          .step-card-inner {
            grid-template-columns: 1fr;
            min-height: auto;
          }
          .step-card-v2.even .step-card-inner {
            direction: ltr;
          }
          .step-card-v2.even .step-number-badge {
            left: 24px;
            right: auto;
          }
          .step-content::before,
          .step-card-v2.even .step-content::before {
            left: 0;
            right: auto;
            border-radius: 0 4px 4px 0;
          }
        }
        @media (max-width: 768px) {
          .step-image {
            min-height: 220px;
          }
          .step-content {
            padding: 30px 24px 24px;
          }
          .step-title {
            font-size: 23px;
          }
        }
      `}</style>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
   Process-specific AreasSection with reference-matched style
   ──────────────────────────────────────────────────────────── */
function ProcessAreasSection({
  data,
  countyOpen,
  setCountyOpen,
}: {
  data: any;
  countyOpen: Record<number, boolean>;
  setCountyOpen: React.Dispatch<React.SetStateAction<Record<number, boolean>>>;
}) {
  const titleParts = parts(data?.title, data?.highlight_text);
  const areasFadeRef = useFadeUp();

  return (
    <section ref={areasFadeRef} className="bg-[#f5f1e9] px-5 py-24 md:px-10">
      <div className="mx-auto max-w-[1240px]">
        <div className="fade-up mb-16 text-center" style={fadeUpStyle}>
          {label(data?.eyebrow || "Where We Work")}
          <h2 className="mx-auto max-w-[780px] font-serif text-[clamp(28px,3.5vw,44px)] font-bold tracking-[-0.5px]">
            {titleParts.before}
            {titleParts.accent ? <span className="text-[#bc9155]">{titleParts.accent}</span> : null}
            {titleParts.after}
          </h2>
          {data?.subtitle ? (
            <p className="mx-auto mt-5 max-w-[700px] text-[17px] leading-[1.75] text-[#5c677d]">{data.subtitle}</p>
          ) : null}
        </div>

        <div
          className="fade-up mx-auto grid max-w-[640px] grid-cols-1 items-start gap-8 lg:max-w-none lg:grid-cols-2"
          style={{ ...fadeUpStyle, transitionDelay: "0.15s" }}
        >
          {(data?.counties || []).map((county: any, index: number) => {
            const expanded = !!countyOpen[index];
            const allMainTowns = county.towns || [];
            const mainTowns = allMainTowns.slice(0, 8);
            const extraTowns = [...allMainTowns.slice(8), ...(county.extra_towns || [])];
            const towns = expanded ? [...mainTowns, ...extraTowns] : mainTowns;
            const links = county.town_links || {};

            return (
              <article
                key={`${county.name || "county"}-${index}`}
                className="flex w-full self-start flex-col overflow-hidden rounded-[12px] border-b-[3px] border-b-transparent bg-white shadow-[0_2px_12px_rgba(30,43,67,0.06),0_1px_3px_rgba(30,43,67,0.04)] transition-all duration-[350ms] [transition-timing-function:cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-[6px] hover:border-b-[#bc9155] hover:shadow-[0_16px_40px_rgba(30,43,67,0.1),0_32px_64px_rgba(30,43,67,0.08)]"
              >
                {/* Image with gradient overlay + zoom */}
                <div className="group relative h-[220px] overflow-hidden">
                  <img
                    src={media(county.image, index === 0 ? "/images/areas/fairfield-county.jpg" : "/images/areas/new-haven-county.jpg")}
                    alt={county.image_alt || county.name || "BuiltWell CT service area"}
                    className={cls("h-full w-full object-cover transition-transform duration-500 group-hover:scale-105", index === 1 && "object-top")}
                  />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[rgba(30,43,67,0.4)] to-transparent" />
                </div>

                <div className="flex flex-1 flex-col p-7 pb-8 text-center">
                  <h3 className="font-serif text-[24px] font-bold">{county.name}</h3>
                  {county.phone ? (
                    <p className="mt-1 text-[15px] text-[#5c677d]">
                      Call:{" "}
                      <a href={`tel:${county.phone.replace(/\D/g, "")}`} className="font-semibold text-[#bc9155] hover:underline">
                        {`${county.phoneLabel || county.name?.replace(" County", "")}: ${county.phone}`}
                      </a>
                    </p>
                  ) : null}
                  {county.description ? (
                    <p className="mt-4 border-b border-[rgba(30,43,67,0.06)] pb-5 text-[14px] leading-[1.7] text-[#5c677d]">
                      {county.description}
                    </p>
                  ) : null}

                  {/* Town pills — first 2 rows gold hover, rest text-only hover */}
                  <div className="mt-5 grid grid-cols-4 gap-2 max-[767px]:grid-cols-3">
                    {towns.map((town: string, townIndex: number) => {
                      const hasLink = !!links[town];
                      if (hasLink) {
                        return (
                          <div key={`${county.name}-${town}-${townIndex}`}>
                            {linkNode(
                              links[town] || county.url || "#",
                              town,
                              "block rounded-full bg-[#f5f1e9] px-2 py-[7px] text-center text-[11px] font-semibold tracking-[0.2px] text-[#1e2b43] transition-all duration-200 hover:-translate-y-[1px] hover:bg-[#bc9155] hover:text-white",
                            )}
                          </div>
                        );
                      }
                      return (
                        <span
                          key={`${county.name}-${town}-${townIndex}`}
                          className="block rounded-full bg-[#f5f1e9] px-2 py-[7px] text-center text-[11px] font-semibold tracking-[0.2px] text-[#1e2b43] transition-colors duration-200 hover:text-[#9a7340]"
                        >
                          {town}
                        </span>
                      );
                    })}
                  </div>

                  {extraTowns.length ? (
                    <button
                      type="button"
                      onClick={() => setCountyOpen((c) => ({ ...c, [index]: !c[index] }))}
                      className="mt-3 text-center text-[13px] font-semibold text-[#bc9155] transition-colors hover:text-[#9a7340]"
                    >
                      {expanded ? "Show Less -" : "See All Towns +"}
                    </button>
                  ) : null}

                  {county.url
                    ? linkNode(
                        county.url,
                        <>
                          <span>{county.cta_label || `Learn more about ${county.name}`}</span>
                          <ArrowRight className="h-4 w-4" />
                        </>,
                        "mt-5 inline-flex items-center justify-center gap-1.5 text-[14px] font-semibold text-[#bc9155] transition-all duration-300 hover:gap-2.5",
                      )
                    : null}
                </div>
              </article>
            );
          })}
        </div>

        {data?.note ? (
          <p className="fade-up mt-8 text-center text-[14px] text-[#5c677d]" style={{ ...fadeUpStyle, transitionDelay: "0.25s" }}>
            {data.note_link_text && data.note_link_url
              ? (
                <>
                  {String(data.note).split(data.note_link_text)[0]}
                  {linkNode(data.note_link_url, data.note_link_text, "font-semibold text-[#bc9155] underline")}
                  {String(data.note).split(data.note_link_text)[1] || ""}
                </>
              )
              : data.note}
          </p>
        ) : null}
      </div>
    </section>
  );
}




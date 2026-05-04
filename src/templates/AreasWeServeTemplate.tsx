"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  Clock3,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  Menu,
  MessageSquareMore,
  ShieldCheck,
  Star,
  X,
  Youtube,
} from "lucide-react";
import type { CMSPage } from "@/types/cms";

type PhoneItem = {
  label: string;
  number: string;
};

type AreasWeServePage = CMSPage & {
  phones?: {
    items?: PhoneItem[];
  };
};

type HeroBadge = {
  label?: string;
  value?: string;
  url?: string;
  is_primary?: boolean;
};

type HeroData = {
  eyebrow?: string;
  headline?: string;
  subheadline?: string;
  background_image?: string | null;
  badges?: HeroBadge[];
};

type TrustItem = {
  icon?: string;
  label?: string;
  value?: string | null;
  url?: string;
};

type TrustBarData = {
  variant?: string;
  items?: TrustItem[];
};

type CountyData = {
  name?: string;
  image?: string | null;
  url?: string;
  phone?: string;
  description?: string;
  towns?: string[];
  extra_towns?: string[];
  town_links?: Record<string, string>;
  cta_label?: string;
};

type AreasServedData = {
  eyebrow?: string;
  title?: string;
  highlight_text?: string;
  subtitle?: string;
  counties?: CountyData[];
};

type ServiceItem = {
  title?: string;
  summary?: string;
  image?: string | null;
  image_alt?: string | null;
  url?: string;
  cta_label?: string;
  price?: string;
  timeline?: string;
};

type ServicesGridData = {
  eyebrow?: string;
  title?: string;
  highlight_text?: string;
  subtitle?: string;
  initial_visible_count?: number;
  toggle_label?: string;
  toggle_less_label?: string;
  items?: ServiceItem[];
  cta_card?: {
    title?: string;
    body?: string;
    label?: string;
    url?: string;
    subtext?: string;
  };
};

type RichTextData = {
  eyebrow?: string;
  title?: string;
  highlight_text?: string | null;
  content?: string;
  style_variant?: string;
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

const FOOTER_SERVICES = [
  { label: "Additions", href: "/home-additions/" },
  { label: "Basements", href: "/basement-finishing/" },
  { label: "Bathrooms", href: "/bathroom-remodeling/" },
  { label: "Flooring", href: "/flooring/" },
  { label: "Interior Carpentry", href: "/interior-carpentry/" },
  { label: "Kitchens", href: "/kitchen-remodeling/" },
];

const FOOTER_COMPANY = [
  { label: "About Us", href: "/about/" },
  { label: "Contact", href: "/contact/" },
  { label: "FAQ", href: "/faq/" },
  { label: "Our Process", href: "/process/" },
  { label: "Portfolio", href: "/portfolio/" },
  { label: "Pricing", href: "/pricing/" },
  { label: "Reviews", href: "/reviews/" },
];

const FOOTER_AREAS = [
  { label: "Fairfield County", href: "/fairfield-county/" },
  { label: "New Haven County", href: "/new-haven-county/" },
  { label: "See All Areas", href: "/areas-we-serve/" },
];

const FOOTER_LEGAL = [
  { label: "Privacy Policy", href: "/privacy-policy/" },
  { label: "Terms of Service", href: "/terms/" },
  { label: "Warranty", href: "/warranty/" },
];

function firstSection<T>(page: CMSPage, type: string): T | undefined {
  const section = page.sections.find((entry) => entry.is_active && entry.type === type);
  return section?.data as T | undefined;
}

function sectionsByType<T>(page: CMSPage, type: string): T[] {
  return page.sections
    .filter((entry) => entry.is_active && entry.type === type)
    .map((entry) => entry.data as T);
}

function normalizeMediaPath(value?: string | null) {
  if (!value) {
    return "";
  }

  if (value.startsWith("/") && !value.startsWith("//")) {
    return value;
  }

  try {
    const url = new URL(value);
    const storagePrefix = "/storage/";
    const storageIndex = url.pathname.indexOf(storagePrefix);

    if (storageIndex === -1) {
      return url.pathname || value;
    }

    const relativePath = url.pathname.slice(storageIndex + storagePrefix.length);

    if (
      relativePath.startsWith("images/") ||
      relativePath.startsWith("portfolio/") ||
      relativePath.startsWith("logos/") ||
      relativePath.startsWith("videos/")
    ) {
      return `/${relativePath}`;
    }

    return value;
  } catch {
    return value;
  }
}

function toTelHref(number?: string) {
  return `tel:${(number || "").replace(/\D/g, "")}`;
}

function toCountyKey(value?: string) {
  return (value || "").toLowerCase().replace(/[^a-z]+/g, " ").trim();
}

function resolveCountyPhone(phones: PhoneItem[], countyName?: string, fallback?: string) {
  const countyKey = toCountyKey(countyName);
  const matchedPhone = phones.find((phone) => toCountyKey(phone.label).includes(countyKey));
  return matchedPhone?.number || fallback || "";
}

function getHighlightParts(text?: string, highlight?: string | null) {
  const safeText = text || "";
  const accent = highlight || (safeText.includes("Connecticut") ? "Connecticut" : "");

  if (!accent) {
    return { before: safeText, accent: "", after: "" };
  }

  const index = safeText.indexOf(accent);

  if (index === -1) {
    return { before: safeText, accent: "", after: "" };
  }

  return {
    before: safeText.slice(0, index),
    accent,
    after: safeText.slice(index + accent.length),
  };
}

function ExternalOrInternalLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
}) {
  if (/^https?:\/\//i.test(href)) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

function getStatsTrustIcon(icon?: string) {
  const iconClass = "h-7 w-7";

  switch ((icon || "").toLowerCase()) {
    case "shield":
    case "shield-check":
      return (
        <svg viewBox="0 0 24 24" className={iconClass} fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      );
    case "star":
      return <Star className={iconClass} />;
    case "calendar":
      return <CalendarDays className={iconClass} />;
    case "check":
      return (
        <svg viewBox="0 0 24 24" className={iconClass} fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M20 6L9 17l-5-5" />
        </svg>
      );
    case "clock":
      return <Clock3 className={iconClass} />;
    default:
      return <ShieldCheck className={iconClass} />;
  }
}

function getTrustStripIcon(icon?: string) {
  const iconName = (icon || "").toLowerCase();

  if (iconName === "star") {
    return (
      <svg viewBox="0 0 24 24" className="h-[22px] w-[22px]" fill="currentColor" stroke="none" aria-hidden="true">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    );
  }

  if (iconName === "shield" || iconName === "shield-check") {
    return (
      <svg viewBox="0 0 24 24" className="h-[22px] w-[22px]" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    );
  }

  if (iconName === "check") {
    return (
      <svg viewBox="0 0 24 24" className="h-[22px] w-[22px]" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    );
  }

  if (iconName === "calendar") {
    return <CalendarDays className="h-[22px] w-[22px]" />;
  }

  return (
    <svg viewBox="0 0 24 24" className="h-[22px] w-[22px]" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

function AreasHeader({ phones }: { phones: PhoneItem[] }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-[#151e30]/10 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-[1240px] items-center justify-between px-4 md:px-8">
          <Link href="/" className="shrink-0" aria-label="BuiltWell home">
            <img
              src="/logos/builtwell-logo-colored.png"
              alt="BuiltWell CT"
              className="h-9 w-auto"
            />
          </Link>

          <nav className="hidden items-center gap-9 lg:flex">
            <Link href="/services/" className="text-[12px] font-semibold uppercase tracking-[0.12em] text-[#151e30] transition-colors hover:text-[#bc9155]">
              Services
            </Link>
            <Link href="/areas-we-serve/" className="text-[12px] font-semibold uppercase tracking-[0.12em] text-[#151e30] transition-colors hover:text-[#bc9155]">
              Areas We Serve
            </Link>
            <Link href="/about/" className="text-[12px] font-semibold uppercase tracking-[0.12em] text-[#151e30] transition-colors hover:text-[#bc9155]">
              About
            </Link>
            <Link href="/contact/" className="text-[12px] font-semibold uppercase tracking-[0.12em] text-[#151e30] transition-colors hover:text-[#bc9155]">
              Contact
            </Link>
          </nav>

          <div className="hidden items-center gap-4 lg:flex">
            <Link
              href="#contact"
              className="inline-flex items-center justify-center rounded-md bg-[#bc9155] px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-[#a57d48]"
            >
              Free Consultation
            </Link>
          </div>

          <button
            type="button"
            className="rounded-md border border-[#151e30]/15 p-2 text-[#151e30] lg:hidden"
            aria-label="Open menu"
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </header>

      {mobileOpen ? (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-[#151e30]/55"
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
          />
          <div className="relative ml-auto flex h-full w-[88%] max-w-sm flex-col bg-white px-6 py-6 text-[#151e30] shadow-2xl">
            <div className="flex items-center justify-between">
              <img
                src="/logos/builtwell-logo-colored.png"
                alt="BuiltWell CT"
                className="h-9 w-auto"
              />
              <button type="button" aria-label="Close menu" onClick={() => setMobileOpen(false)}>
                <X className="h-6 w-6" />
              </button>
            </div>

            <nav className="mt-10 flex flex-col gap-1">
              {[
                { label: "Services", href: "/services/" },
                { label: "Areas We Serve", href: "/areas-we-serve/" },
                { label: "About", href: "/about/" },
                { label: "Contact", href: "/contact/" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="border-b border-[#151e30]/10 py-4 font-serif text-xl text-[#151e30]"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="#contact"
                className="mt-6 inline-flex items-center justify-center rounded-md bg-[#bc9155] px-4 py-4 text-sm font-semibold uppercase tracking-[0.14em] text-white"
                onClick={() => setMobileOpen(false)}
              >
                Free Consultation
              </Link>
            </nav>

            {phones.length > 0 ? (
              <div className="mt-10 space-y-3 border-t border-[#151e30]/10 pt-6 text-sm text-[#5c677d]">
                {phones.map((phone) => (
                  <a
                    key={`${phone.label}-${phone.number}`}
                    href={toTelHref(phone.number)}
                    className="block"
                    onClick={() => setMobileOpen(false)}
                  >
                    <span className="mr-2 text-[#bc9155]">{phone.label}:</span>
                    {phone.number}
                  </a>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  );
}

function AreasHero({ data, phones }: { data?: HeroData; phones: PhoneItem[] }) {
  const parts = getHighlightParts(data?.headline, "Connecticut");
  const backgroundImage = normalizeMediaPath(data?.background_image) || "/hero/builtwell-job-site-aerial-hero-ct.jpg";
  const fairfieldPhone = resolveCountyPhone(phones, "Fairfield County", "(203) 919-9616");
  const newHavenPhone = resolveCountyPhone(phones, "New Haven County", "(203) 466-9148");

  return (
    <section className="page-hero areas-hero-section">
      <div
        className="areas-hero-image"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      <div className="areas-hero-overlay" />

      <div className="page-hero-inner">
        <ol className="hero-breadcrumb areas-hero-breadcrumb">
          <li>
            <ExternalOrInternalLink href="/" className="areas-hero-breadcrumb-link">
              Home
            </ExternalOrInternalLink>
          </li>
          <li>
            <span className="current">Areas We Serve</span>
          </li>
        </ol>

        <h1 className="areas-hero-title">
          {parts.before}
          {parts.accent ? <span className="gold">{parts.accent}</span> : null}
          {parts.after}
        </h1>

        {data?.subheadline ? (
          <p className="hero-subtitle areas-hero-subtitle">
            {data.subheadline}
          </p>
        ) : null}

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
      </div>
    </section>
  );
}

function StatsBar({ data }: { data?: TrustBarData }) {
  const items = data?.items || [];

  return (
    <section className="trust-bar areas-trust-bar">
        <div className="trust-bar-inner areas-trust-bar-inner">
          {items.map((item, index) => (
            <div
              key={`${item.label}-${index}`}
              className={`trust-item areas-trust-item ${index < items.length - 1 ? "areas-trust-item-with-divider" : ""} ${!item.value ? "areas-trust-item-icon" : ""}`}
            >
              <div className="trust-number areas-trust-number">
                {item.value ? (
                  <span>{item.value}</span>
                ) : (
                  getStatsTrustIcon(item.icon)
                )}
              </div>
              <p className="trust-label areas-trust-label">
                {item.label}
              </p>
            </div>
          ))}
        </div>
    </section>
  );
}

function AreasSection({ data, phones }: { data?: AreasServedData; phones: PhoneItem[] }) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const titleParts = getHighlightParts(data?.title, data?.highlight_text || undefined);
  const counties = data?.counties || [];

  return (
    <section className="section where-we-work areas-where-we-work">
      <div className="section-inner areas-section-inner">
        <div className="section-header areas-section-header">
          {data?.eyebrow ? <span className="section-label">{data.eyebrow}</span> : null}
          <h2>
            {titleParts.before}
            {titleParts.accent ? <span className="gold">{titleParts.accent}</span> : null}
            {titleParts.after}
          </h2>
          {data?.subtitle ? <p>{data.subtitle}</p> : null}
        </div>

        <div className="areas-grid">
          {counties.map((county) => {
            const countyName = county.name || "";
            const isExpanded = Boolean(expanded[countyName]);
            const imageSrc = normalizeMediaPath(county.image) || "/images/areas/fairfield-county.jpg";
            const featuredTowns = county.towns || [];
            const extraTowns = county.extra_towns || [];
            const displayPhone = resolveCountyPhone(phones, countyName, county.phone);

            return (
              <article key={countyName} className="area-card">
                <div className="area-card-img">
                  <img
                    src={imageSrc}
                    alt={countyName}
                    className={countyName.toLowerCase().includes("new haven") ? "show-top" : undefined}
                  />
                </div>

                <div className="area-card-body">
                  <h3>{countyName}</h3>
                  {displayPhone ? (
                    <div className="area-card-phone">
                      Call: <a href={toTelHref(displayPhone)}>{displayPhone}</a>
                    </div>
                  ) : null}

                  {county.description ? <p className="area-card-desc">{county.description}</p> : null}

                  <div className="area-towns">
                    {featuredTowns.map((town) => {
                      const href = county.town_links?.[town];

                      if (href) {
                        return (
                          <Link key={`${countyName}-${town}`} href={href} className="area-town">
                            {town}
                          </Link>
                        );
                      }

                      return (
                        <span key={`${countyName}-${town}`} className="area-town area-town-static">
                          {town}
                        </span>
                      );
                    })}

                    <div className={`area-towns-more${isExpanded ? " show" : ""}`}>
                      {extraTowns.map((town) => (
                        <span key={`${countyName}-${town}`} className="area-town area-town-static">
                          {town}
                        </span>
                      ))}
                    </div>

                    {extraTowns.length > 0 ? (
                      <button
                        type="button"
                        className="area-towns-toggle"
                        aria-expanded={isExpanded}
                        onClick={() =>
                          setExpanded((current) => ({
                            ...current,
                            [countyName]: !current[countyName],
                          }))
                        }
                      >
                        {isExpanded ? "Show Less -" : "See All Towns +"}
                      </button>
                    ) : null}
                  </div>

                  {county.url ? (
                    <Link href={county.url} className="area-link">
                      {county.cta_label || `Learn more about ${countyName}`}
                      <ArrowRight className="h-[14px] w-[14px]" />
                    </Link>
                  ) : null}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
function ServicesSection({ data }: { data?: ServicesGridData }) {
  const [showAll, setShowAll] = useState(false);
  const titleParts = getHighlightParts(data?.title, data?.highlight_text || undefined);
  const items = data?.items || [];
  const initialVisible = data?.initial_visible_count || 6;
  const visibleItems = items.slice(0, initialVisible);
  const hiddenItems = items.slice(initialVisible);

  return (
    <section className="section areas-services-section">
      <div className="section-inner areas-section-inner">
        <div className="section-header areas-section-header">
          {data?.eyebrow ? <span className="section-label">{data.eyebrow}</span> : null}
          <h2>
            {titleParts.before}
            {titleParts.accent ? <span className="gold">{titleParts.accent}</span> : null}
            {titleParts.after}
          </h2>
          {data?.subtitle ? <p>{data.subtitle}</p> : null}
        </div>

        <div className="services-grid areas-services-grid">
          {visibleItems.map((item) => (
            <ServiceCard key={item.title} item={item} />
          ))}
        </div>

        {hiddenItems.length > 0 || data?.cta_card ? (
          <div className="services-toggle-wrap">
            <button
              type="button"
              className={`services-toggle-btn${showAll ? " open" : ""}`}
              onClick={() => setShowAll((current) => !current)}
            >
              {showAll
                ? data?.toggle_less_label || "Show Fewer Services"
                : data?.toggle_label || "Show More Services"}
              <ChevronDown className="h-[14px] w-[14px]" />
            </button>
          </div>
        ) : null}

        {showAll ? (
          <div className="services-more show">
            {hiddenItems.map((item) => (
              <ServiceCard key={item.title} item={item} />
            ))}
          </div>
        ) : null}

      </div>
    </section>
  );
}
function ServiceCard({ item }: { item: ServiceItem }) {
  const imageSrc = normalizeMediaPath(item.image) || "/services/kitchen-remodeling-ct.jpg";

  return (
    <article className="service-card">
      <div className="service-card-img">
        <img src={imageSrc} alt={item.image_alt || item.title || "Service"} />
      </div>

      <div className="service-card-body">
        <h3>
          <Link href={item.url || "#"}>{item.title}</Link>
        </h3>
        <div className="service-card-divider" />

        {item.summary ? <p>{item.summary}</p> : null}
      </div>
    </article>
  );
}
function ServiceCtaCard({
  card,
}: {
  card: NonNullable<ServicesGridData["cta_card"]>;
}) {
  return (
    <article className="service-card service-card-cta">
      <div className="service-card-cta-inner">
        <div className="cta-card-icon">
          <MessageSquareMore className="h-10 w-10" />
        </div>
        <h3>{card.title}</h3>
        {card.body ? <p>{card.body}</p> : null}
        <Link href={card.url || "#contact"} className="cta-card-btn">
          {card.label || "Schedule a Free Consultation"}
        </Link>
        {card.subtext ? <span className="cta-card-sub">{card.subtext}</span> : null}
      </div>
    </article>
  );
}
function ProseSection({ data }: { data?: RichTextData }) {
  const titleParts = getHighlightParts(data?.title, data?.highlight_text || undefined);

  return (
    <section className="section service-overview areas-service-overview">
      <div className="section-inner areas-section-inner">
        <div className="service-overview-content">
          <div className="section-header areas-section-header areas-prose-header">
            {data?.eyebrow ? <span className="section-label">{data.eyebrow}</span> : null}
            <h2>
              {titleParts.before}
              {titleParts.accent ? <span className="gold">{titleParts.accent}</span> : null}
              {titleParts.after}
            </h2>
          </div>

          {data?.content ? (
            <div
              className="areas-prose-content"
              dangerouslySetInnerHTML={{ __html: data.content }}
            />
          ) : null}
        </div>
      </div>
    </section>
  );
}
function TrustLinkStrip({ data }: { data?: TrustBarData }) {
  const items = data?.items || [];

  if (items.length === 0) {
    return null;
  }

  return (
    <div className="trust-strip" role="region" aria-label="Trust indicators">
      <div className="trust-strip-inner">
        {items.map((item, index) => {
          const content = (
            <>
              {getTrustStripIcon(item.icon)}
              <span>{item.label}</span>
            </>
          );

          return (
            <div key={`${item.label}-${index}`} className="trust-strip-item-wrap">
              {item.url ? (
                <ExternalOrInternalLink href={item.url} className="trust-strip-item">
                  {content}
                </ExternalOrInternalLink>
              ) : (
                <div className="trust-strip-item">{content}</div>
              )}
              {index < items.length - 1 ? <div className="trust-strip-divider" /> : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
function ContactSection({ data }: { data?: LeadFormData }) {
  const [submitted, setSubmitted] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [contactMethod, setContactMethod] = useState("call");
  const titleParts = getHighlightParts(data?.title, data?.title_highlight || undefined);
  const images = (data?.images || []).map((item) => ({
    src: normalizeMediaPath(item.image) || "/portfolio/builtwell-contractor-client-consultation-ct.jpeg",
    alt: item.alt || "BuiltWell CT consultation",
  }));

  const fields = data?.fields || [];
  const getField = (name: string) => fields.find((field) => field.name === name);
  const servicesField = getField("services_needed");
  const bestTimeField = getField("best_time");
  const contactMethodField = getField("contact_method");
  const messageField = getField("message");
  const basicFields = ["name", "phone", "email", "zip"]
    .map((name) => getField(name))
    .filter((field): field is LeadFormField => Boolean(field));

  const normalizeOptions = (options?: LeadFormOption[]) =>
    (options || []).map((option) =>
      typeof option === "string" ? { label: option, value: option } : option,
    );

  const serviceOptions = normalizeOptions(servicesField?.options);
  const bestTimeOptions = normalizeOptions(bestTimeField?.options);
  const methodOptions = normalizeOptions(contactMethodField?.options);

  const selectedServicesLabel =
    selectedServices.length === 0
      ? servicesField?.placeholder || "Select services"
      : `${selectedServices.length} service${selectedServices.length === 1 ? "" : "s"} selected`;

  return (
    <section className="cta-section" id="contact">
      <div className="cta-section-inner">
        <div className="cta-header">
          {data?.eyebrow ? <span className="section-label">{data.eyebrow}</span> : null}
          <h2>
            {titleParts.before}
            {titleParts.accent ? <span className="gold">{titleParts.accent}</span> : null}
            {titleParts.after}
          </h2>
          {data?.subtitle ? <p className="sub">{data.subtitle}</p> : null}
        </div>

        <div className="cta-body">
          <div className="cta-left">
            <div className="cta-images">
              {images.map((image, index) => (
                <div key={`${image.src}-${index}`} className="cta-img-wrap">
                  <img src={image.src} alt={image.alt} />
                </div>
              ))}
            </div>
          </div>

          <div className="contact-form-wrap">
            {submitted ? (
              <div className="areas-form-success">
                <CheckCircle2 className="h-12 w-12 text-[#bc9155]" />
                <h3>Thank You</h3>
                <p>We received your request and will reach out within one business day.</p>
              </div>
            ) : (
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  setSubmitted(true);
                }}
              >
                <div className="form-row form-row-4">
                  {basicFields.map((field) => (
                    <div key={field.name} className="form-group">
                      <label htmlFor={`contact-${field.name}`}>
                        {field.label}
                        {field.required ? " *" : ""}
                      </label>
                      <input
                        id={`contact-${field.name}`}
                        type={field.type}
                        name={field.name}
                        required={field.required}
                        placeholder={field.placeholder}
                      />
                    </div>
                  ))}
                </div>

                <div className="form-row form-row-3">
                  {servicesField ? (
                    <div className="form-group">
                      <label>
                        {servicesField.label}
                        {servicesField.required ? " *" : ""}
                      </label>
                      <div className="multi-select-wrap">
                        <button
                          type="button"
                          className="multi-select-toggle"
                          aria-expanded={servicesOpen}
                          onClick={() => setServicesOpen((current) => !current)}
                        >
                          <span className={`multi-select-text${selectedServices.length > 0 ? " has-selection" : ""}`}>
                            {selectedServicesLabel}
                          </span>
                          <ChevronDown className="h-[12px] w-[12px]" />
                        </button>

                        <div className={`multi-select-dropdown${servicesOpen ? " open" : ""}`}>
                          {serviceOptions.map((option) => {
                            const checked = selectedServices.includes(option.value);

                            return (
                              <label key={option.value}>
                                <input
                                  type="checkbox"
                                  checked={checked}
                                  onChange={() =>
                                    setSelectedServices((current) =>
                                      current.includes(option.value)
                                        ? current.filter((value) => value !== option.value)
                                        : [...current, option.value],
                                    )
                                  }
                                />
                                <span>{option.label}</span>
                              </label>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  ) : null}

                  {bestTimeField ? (
                    <div className="form-group">
                      <label htmlFor="contact-time">
                        {bestTimeField.label}
                        {bestTimeField.required ? " *" : ""}
                      </label>
                      <select id="contact-time" name={bestTimeField.name} required={bestTimeField.required} defaultValue="">
                        <option value="" disabled>
                          {bestTimeField.placeholder || "Select a time"}
                        </option>
                        {bestTimeOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  ) : null}

                  {methodOptions.length > 0 ? (
                    <fieldset className="form-group">
                      <legend>Preferred Contact Method *</legend>
                      <div className="form-radio-group">
                        {methodOptions.map((option) => (
                          <label key={option.value}>
                            <input
                              type="radio"
                              name={contactMethodField?.name || "contact_method"}
                              value={option.value}
                              checked={contactMethod === option.value}
                              onChange={() => setContactMethod(option.value)}
                            />
                            <span>{option.label}</span>
                          </label>
                        ))}
                      </div>
                    </fieldset>
                  ) : null}
                </div>

                {messageField ? (
                  <div className="form-group">
                    <label htmlFor="contact-message">{messageField.label}</label>
                    <textarea
                      id="contact-message"
                      name={messageField.name}
                      rows={4}
                      placeholder={messageField.placeholder}
                    />
                  </div>
                ) : null}

                <div className="form-consent">
                  <label>
                    <input type="checkbox" name="consent" required />
                    <span>
                      I agree to the{" "}
                      <ExternalOrInternalLink href="/privacy-policy/" className="form-consent-link">
                        Privacy Policy
                      </ExternalOrInternalLink>{" "}
                      and{" "}
                      <ExternalOrInternalLink href="/terms/" className="form-consent-link">
                        Terms of Service
                      </ExternalOrInternalLink>
                      . I consent to receive calls, texts (SMS), and emails from BuiltWell CT, including automated messages. Msg &amp; data rates may apply. Reply STOP to opt out.
                    </span>
                  </label>
                </div>

                <button type="submit" className="form-submit" aria-label="Send consultation request">
                  {data?.submit_label || "Get Your Free Estimate"}
                </button>

                <p className="form-note">{data?.consent_text || "We respond within 24 hours. No spam, no obligation."}</p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
function FinancingStrip({ data }: { data?: RichTextData }) {
  if (!data) {
    return null;
  }

  return (
    <div className="financing-strip" role="region" aria-label="Financing options">
      <div className="financing-strip-inner">
        <div className="financing-strip-left">
          <span className="greensky-logo">
            <span className="gs-green">Green</span>
            <span className="gs-dark">Sky</span>
          </span>
          <p className="financing-strip-text">
            <strong>{data.title}</strong> {(data.content || "").replace(/<[^>]+>/g, "")}
          </p>
        </div>

        {data.cta?.label && data.cta?.url ? (
          <ExternalOrInternalLink href={data.cta.url} className="financing-strip-cta">
            {data.cta.label}
            <ArrowRight className="h-[14px] w-[14px]" />
          </ExternalOrInternalLink>
        ) : null}
      </div>
    </div>
  );
}
function AreasFooter({ phones }: { phones: PhoneItem[] }) {
  const fairfieldPhone = phones.find((phone) => phone.label.toLowerCase().includes("fairfield"));
  const newHavenPhone = phones.find((phone) => phone.label.toLowerCase().includes("new haven"));
  const year = new Date().getUTCFullYear();
  const supportEmail = "info@builtwellct.com";

  return (
    <footer className="bg-[#151e30] pb-8 pt-16 text-white">
      <div className="mx-auto max-w-[1240px] px-6">
        <div className="grid gap-12 border-b border-white/10 pb-14 lg:grid-cols-[1.35fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="inline-flex" aria-label="BuiltWell home">
              <img
                src="/logos/builtwell-logo-footer-gold.png"
                alt="BuiltWell CT"
                className="h-10 w-auto"
              />
            </Link>

            <div className="mt-6 space-y-4 text-sm text-white/70">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#bc9155]">
                  Headquarters
                </p>
                <p className="mt-1 text-white/88">Headquartered in Orange, CT</p>
              </div>

              {newHavenPhone ? (
                <a href={toTelHref(newHavenPhone.number)} className="block transition-colors hover:text-[#bc9155]">
                  New Haven County: {newHavenPhone.number}
                </a>
              ) : null}
              {fairfieldPhone ? (
                <a href={toTelHref(fairfieldPhone.number)} className="block transition-colors hover:text-[#bc9155]">
                  Fairfield County: {fairfieldPhone.number}
                </a>
              ) : null}

              <a href={`mailto:${supportEmail}`} className="inline-flex min-h-[44px] items-center gap-2 font-semibold text-white transition-colors hover:text-[#bc9155]">
                <Mail className="h-4 w-4 text-[#bc9155]" />
                {supportEmail}
              </a>
            </div>

            <div className="mt-6 flex items-center gap-3 text-white/55">
              <a href="https://instagram.com/builtwellct" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-[#bc9155]" aria-label="Instagram">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="https://linkedin.com/company/builtwellct" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-[#bc9155]" aria-label="LinkedIn">
                <Linkedin className="h-4 w-4" />
              </a>
              <a href="https://youtube.com/@builtwellct" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-[#bc9155]" aria-label="YouTube">
                <Youtube className="h-4 w-4" />
              </a>
              <a href="https://facebook.com/builtwellct" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-[#bc9155]" aria-label="Facebook">
                <Facebook className="h-4 w-4" />
              </a>
            </div>
          </div>

          <FooterColumn title="Services" links={FOOTER_SERVICES} />
          <FooterColumn title="Company" links={FOOTER_COMPANY} />
          <div className="space-y-10">
            <FooterColumn title="Areas We Serve" links={FOOTER_AREAS} />
            <FooterColumn title="Legal" links={FOOTER_LEGAL} />
          </div>
        </div>

        <p className="py-8 text-center font-serif text-xl italic text-[#bc9155]">
          The Last Contractor You&apos;ll <span className="text-white">Hire.</span>
        </p>

        <div className="flex flex-col gap-2 text-xs text-white/45 md:flex-row md:items-center md:justify-between">
          <span>&copy; {year} BuiltWell CT. All rights reserved.</span>
          <span>CT HIC License #0668405 | Serving Fairfield &amp; New Haven Counties, Connecticut</span>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: Array<{ label: string; href: string }>;
}) {
  return (
    <div>
      <h4 className="text-sm font-semibold uppercase tracking-[0.16em] text-white">{title}</h4>
      <ul className="mt-5 space-y-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="inline-flex min-h-[44px] items-center text-sm text-white/65 transition-colors hover:text-[#bc9155]">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function AreasWeServeTemplate({ page }: { page: CMSPage }) {
  const areasPage = page as AreasWeServePage;
  const phones =
    areasPage.phones?.items?.filter((phone) => phone.label && phone.number) || [];
  const hero = firstSection<HeroData>(page, "hero");
  const areas = firstSection<AreasServedData>(page, "areas_served");
  const services = firstSection<ServicesGridData>(page, "services_grid");
  const leadForm = firstSection<LeadFormData>(page, "lead_form");
  const trustBars = sectionsByType<TrustBarData>(page, "trust_bar");
  const statsBar = trustBars.find((item) => item.variant === "stats") || trustBars[0];
  const linkStrip = trustBars.find((item) => item.variant === "link_strip");
  const richTextSections = sectionsByType<RichTextData>(page, "rich_text");
  const prose = richTextSections.find((item) => item.style_variant === "prose") || richTextSections[0];
  const financing = richTextSections.find((item) => item.style_variant === "financing_strip");

  return (
    <div className="areas-page bg-white text-[#151e30]">
      <main>
        <AreasHero data={hero} phones={phones} />
        <StatsBar data={statsBar} />
        <AreasSection data={areas} phones={phones} />
        <ServicesSection data={services} />
        <ProseSection data={prose} />
        <TrustLinkStrip data={linkStrip} />
        <ContactSection data={leadForm} />
        <FinancingStrip data={financing} />
      </main>
      <style jsx global>{`
        .areas-page { --oxford-blue:#1e2b43; --gold:#bc9155; --gold-dark:#9a7340; --slate:#5c677d; --cream:#f5f1e9; --gold-light:rgba(188,145,85,.1); }
        .areas-page .gold { color:var(--gold); }
        .areas-page .section { padding:100px 40px; }
        .areas-page .section-inner { max-width:1240px; margin:0 auto; }
        .areas-page .section-header { text-align:center; margin-bottom:64px; }
        .areas-page .section-header h2 { max-width:780px; margin:0 auto 20px; font:700 clamp(28px,3.5vw,44px)/1.2 "Playfair Display",serif; letter-spacing:-.5px; color:var(--oxford-blue); }
        .areas-page .section-header p { max-width:700px; margin:0 auto; font-size:17px; line-height:1.75; color:var(--slate); }
        .areas-page .section-label { display:inline-block; margin-bottom:16px; padding-left:20px; position:relative; font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:1.5px; color:var(--gold-dark); }
        .areas-page .section-label:before { content:""; position:absolute; left:0; top:50%; width:10px; height:2px; transform:translateY(-50%); background:var(--gold); }

        .areas-page .page-hero { position:relative; overflow:hidden; isolation:isolate; min-height:50vh; padding:120px 40px 48px; display:flex; align-items:stretch; color:#fff; background:#151e30; }
        .areas-page .areas-hero-image { position:absolute; inset:0; background-size:cover; background-position:center 30%; background-repeat:no-repeat; opacity:.72; z-index:0; }
        .areas-page .areas-hero-overlay { position:absolute; inset:0; z-index:1; background:radial-gradient(ellipse at 97% 97%,rgba(21,30,48,1) 0%,rgba(21,30,48,.9) 8%,transparent 30%),radial-gradient(ellipse at 3% 97%,rgba(21,30,48,.9) 0%,transparent 25%),linear-gradient(180deg,rgba(21,30,48,.35) 0%,rgba(21,30,48,.2) 30%,rgba(21,30,48,.45) 65%,rgba(21,30,48,.92) 100%); }
        .areas-page .page-hero-inner { position:relative; z-index:2; width:100%; max-width:1240px; margin:0 auto; display:flex; flex-direction:column; justify-content:center; align-items:center; text-align:center; }
        .areas-page .hero-breadcrumb { display:flex; list-style:none; margin:0 0 20px; padding:0; font-size:13px; font-weight:500; color:rgba(255,255,255,.92); text-shadow:0 1px 6px rgba(0,0,0,.7); }
        .areas-page .hero-breadcrumb li { display:flex; align-items:center; }
        .areas-page .hero-breadcrumb li + li:before { content:"›"; margin:0 10px; color:var(--gold); font-size:12px; }
        .areas-page .areas-hero-breadcrumb-link { color:rgba(255,255,255,.85); transition:color .2s; }
        .areas-page .areas-hero-breadcrumb-link:hover { color:var(--gold); }
        .areas-page .hero-breadcrumb .current { color:#fff; font-weight:600; }
        .areas-page .areas-hero-title { max-width:900px; margin-bottom:12px; font:700 clamp(40px,4.5vw,56px)/1.08 "Playfair Display",serif; letter-spacing:-.5px; text-shadow:0 2px 20px rgba(0,0,0,.5); }
        .areas-page .hero-subtitle { max-width:560px; margin:16px auto 0; color:rgba(255,255,255,.82); font-size:17px; line-height:1.7; }
        .areas-page .hero-ctas { display:flex; flex-wrap:wrap; gap:14px; justify-content:center; align-items:center; margin-top:28px; }
        .areas-page .hero-cta-btn { display:inline-flex; align-items:center; justify-content:center; gap:8px; padding:14px 32px; border-radius:8px; text-decoration:none; color:#fff; background:rgba(10,18,35,.42); border:1px solid rgba(255,255,255,.22); backdrop-filter:blur(12px); font-size:15px; font-weight:600; letter-spacing:.3px; white-space:nowrap; transition:background .3s,border-color .3s,transform .3s,box-shadow .3s; }
        .areas-page .hero-cta-btn:hover { background:rgba(10,18,35,.62); border-color:rgba(255,255,255,.35); transform:translateY(-2px); box-shadow:0 8px 24px rgba(0,0,0,.3); }
        .areas-page .hero-cta-btn.hero-cta-primary { background:var(--gold); border:1px solid var(--gold); backdrop-filter:none; }
        .areas-page .hero-cta-btn.hero-cta-primary:hover { background:#d4a95a; border-color:#d4a95a; box-shadow:0 8px 24px rgba(188,145,85,.4); }

        .areas-page .trust-bar { background:linear-gradient(135deg,#1e2b43 0%,#151e30 100%); border-top:1px solid rgba(188,145,85,.2); border-bottom:1px solid rgba(188,145,85,.2); }
        .areas-page .trust-bar-inner { max-width:1280px; margin:0 auto; display:grid; grid-template-columns:repeat(4,1fr); text-align:center; }
        .areas-page .trust-item { padding:36px 20px; border-right:1px solid rgba(188,145,85,.12); transition:background .3s,transform .3s; }
        .areas-page .trust-item:last-child { border-right:none; }
        .areas-page .trust-item:hover { background:rgba(188,145,85,.08); transform:translateY(-3px); }
        .areas-page .trust-number { display:flex; justify-content:center; align-items:center; color:var(--gold); font:700 42px/1 "Playfair Display",serif; transition:color .3s,text-shadow .3s; }
        .areas-page .trust-number { min-height:42px; }
        .areas-page .trust-item:hover .trust-number { color:#d4a95a; text-shadow:0 0 20px rgba(188,145,85,.3); }
        .areas-page .trust-number svg { width:28px; height:28px; }
        .areas-page .trust-label { margin-top:8px; font-size:13px; text-transform:uppercase; letter-spacing:1px; font-weight:500; color:rgba(255,255,255,.6); transition:color .3s; }
        .areas-page .trust-item:hover .trust-label { color:rgba(255,255,255,.85); }
        .areas-page .areas-trust-item-icon .trust-number svg { width:30px; height:30px; }

        .areas-page .where-we-work, .areas-page .areas-services-section { background:var(--cream); }
        .areas-page .areas-services-section { padding-top:60px; padding-bottom:60px; }
        .areas-page .areas-grid { display:grid; grid-template-columns:1fr 1fr; gap:32px; align-items:stretch; }
        .areas-page .area-card { background:#fff; border-radius:12px; overflow:hidden; border-bottom:3px solid transparent; box-shadow:0 2px 12px rgba(30,43,67,.06),0 1px 3px rgba(30,43,67,.04); transition:.35s cubic-bezier(.4,0,.2,1); position:relative; display:flex; flex-direction:column; height:100%; }
        .areas-page .area-card:hover { transform:translateY(-6px); border-bottom-color:var(--gold); box-shadow:0 16px 40px rgba(30,43,67,.1),0 32px 64px rgba(30,43,67,.08); }
        .areas-page .area-card-img { height:220px; position:relative; overflow:hidden; flex-shrink:0; }
        .areas-page .area-card-img:after { content:""; position:absolute; left:0; right:0; bottom:0; height:80px; background:linear-gradient(to top,rgba(30,43,67,.4),transparent); }
        .areas-page .area-card-img img { width:100%; height:100%; object-fit:cover; transition:transform .5s; }
        .areas-page .area-card:hover .area-card-img img { transform:scale(1.05); }
        .areas-page .area-card-img img.show-top { object-position:top; }
        .areas-page .area-card-body { padding:28px 28px 32px; text-align:center; flex:1; display:flex; flex-direction:column; }
        .areas-page .area-card-body h3 { margin-bottom:6px; font:700 24px/1.2 "Playfair Display",serif; color:var(--oxford-blue); }
        .areas-page .area-card-phone { margin-bottom:14px; font-size:15px; color:var(--slate); }
        .areas-page .area-card-phone a { color:var(--gold); font-weight:600; }
        .areas-page .area-card-desc { margin-bottom:18px; padding-bottom:18px; border-bottom:1px solid rgba(30,43,67,.06); font-size:14px; line-height:1.7; color:var(--slate); }
        .areas-page .area-towns { display:grid; grid-template-columns:repeat(4,1fr); gap:8px; margin-bottom:16px; flex:1; align-content:start; }
        .areas-page .area-link { margin-top:auto; }
        .areas-page .area-town { background:var(--cream); border-radius:50px; padding:7px 10px; text-align:center; font-size:11px; font-weight:600; letter-spacing:.2px; color:var(--oxford-blue); text-decoration:none; white-space:nowrap; transition:.2s; }
        .areas-page .area-town:hover { background:var(--gold-light); color:var(--gold-dark); }
        .areas-page a.area-town:hover { background:var(--gold); color:#fff; }
        .areas-page .area-town-static:hover { background:var(--cream); color:var(--gold-dark); }
        .areas-page .area-towns-more { display:none; grid-template-columns:repeat(4,1fr); gap:8px; grid-column:1 / -1; }
        .areas-page .area-towns-more.show { display:grid; }
        .areas-page .area-towns-toggle { grid-column:1 / -1; margin-top:4px; background:none; border:none; color:var(--gold); font-size:13px; font-weight:600; cursor:pointer; }
        .areas-page .area-towns-toggle:hover { color:var(--gold-dark); }
        .areas-page .area-link { display:flex; width:100%; align-items:center; justify-content:center; gap:6px; margin-top:4px; color:var(--gold); font-size:14px; font-weight:600; text-decoration:none; transition:gap .3s; text-align:center; }
        .areas-page .area-link:hover { gap:10px; }

        .areas-page .services-grid, .areas-page .services-more { display:grid; grid-template-columns:repeat(3,1fr); gap:24px; }
        .areas-page .services-more { display:none; width:100%; margin-top:24px; }
        .areas-page .services-more.show { display:grid; margin-top:32px; }
        .areas-page .services-toggle-wrap { width:100%; display:flex; justify-content:center; margin:40px 0 8px; }
        .areas-page .services-toggle-btn { display:inline-flex; align-items:center; gap:8px; border:2px solid var(--gold); color:var(--gold); background:none; border-radius:6px; padding:12px 32px; font-size:14px; font-weight:600; cursor:pointer; transition:.3s; }
        .areas-page .services-toggle-btn:hover { background:var(--gold); color:#fff; }
        .areas-page .services-toggle-btn svg { transition:transform .3s; }
        .areas-page .services-toggle-btn.open svg { transform:rotate(180deg); }
        .areas-page .service-card { background:#fff; border-radius:8px; overflow:hidden; border-bottom:2px solid transparent; box-shadow:0 2px 12px rgba(30,43,67,.06),0 1px 3px rgba(30,43,67,.04); transition:.35s cubic-bezier(.4,0,.2,1); display:flex; flex-direction:column; }
        .areas-page .service-card:hover { transform:translateY(-4px); border-bottom-color:var(--gold); box-shadow:0 12px 28px rgba(30,43,67,.1),0 28px 56px rgba(30,43,67,.12); }
        .areas-page .service-card-img { height:200px; overflow:hidden; }
        .areas-page .service-card-img img { width:100%; height:100%; object-fit:cover; transition:transform .5s; }
        .areas-page .service-card:hover .service-card-img img { transform:scale(1.05); }
        .areas-page .service-card-body { padding:24px 22px; display:flex; flex-direction:column; flex:1; text-align:center; }
        .areas-page .service-card-body h3 { margin-bottom:0; font:600 18px/1.2 "Inter",sans-serif; }
        .areas-page .service-card-body h3 a { color:inherit; transition:color .2s; text-decoration:none; }
        .areas-page .service-card-body h3 a:hover { color:var(--gold); }
        .areas-page .service-card-divider { width:40px; height:2px; background:var(--gold); margin:10px auto 14px; }
        .areas-page .service-card-body p { flex:1; margin-bottom:0; font-size:14px; line-height:1.65; color:var(--slate); display:-webkit-box; -webkit-line-clamp:3; -webkit-box-orient:vertical; overflow:hidden; }
        .areas-page .service-meta { display:none; }
        .areas-page .service-link { display:none; }
        .areas-page .service-card-cta { background:var(--oxford-blue); border-bottom-color:var(--gold); align-items:center; justify-content:center; }
        .areas-page .service-card-cta:hover { background:#151e30; }
        .areas-page .service-card-cta-inner { height:100%; padding:40px 32px; text-align:center; display:flex; flex-direction:column; align-items:center; justify-content:center; }
        .areas-page .cta-card-icon { width:80px; height:80px; margin-bottom:24px; border-radius:50%; border:2px solid var(--gold); background:rgba(188,145,85,.12); display:flex; align-items:center; justify-content:center; color:var(--gold); }
        .areas-page .service-card-cta h3 { margin-bottom:12px; color:#fff; font:700 22px/1.2 "Playfair Display",serif; }
        .areas-page .service-card-cta p { max-width:280px; margin-bottom:24px; color:rgba(255,255,255,.7); font-size:15px; line-height:1.7; }
        .areas-page .cta-card-btn { display:inline-block; padding:14px 28px; border-radius:4px; background:var(--gold); color:#fff; font-size:14px; font-weight:600; text-decoration:none; transition:.2s; }
        .areas-page .cta-card-btn:hover { background:var(--gold-dark); transform:translateY(-1px); }
        .areas-page .cta-card-sub { margin-top:12px; color:rgba(255,255,255,.5); font-size:12px; }

        .areas-page .service-overview { background:#fff; border-bottom:1px solid rgba(30,43,67,.06); padding-top:80px; padding-bottom:80px; }
        .areas-page .service-overview-content { max-width:820px; margin:0 auto; }
        .areas-page .areas-prose-header { margin-bottom:28px; }
        .areas-page .areas-prose-content p { margin-bottom:20px; color:var(--slate); font-size:16px; line-height:1.85; }
        .areas-page .areas-prose-content p:last-child { margin-bottom:0; }

        .areas-page .trust-strip { position:relative; overflow:hidden; padding:56px 40px; background:linear-gradient(135deg,var(--oxford-blue) 0%,#151e30 100%); }
        .areas-page .trust-strip:before { content:""; position:absolute; inset:0; background:url("/hero/builtwell-job-site-aerial-hero-ct.jpg") center/cover no-repeat; opacity:.12; }
        .areas-page .trust-strip-inner { position:relative; z-index:1; max-width:1200px; margin:0 auto; display:flex; align-items:center; justify-content:center; flex-wrap:wrap; gap:0; }
        .areas-page .trust-strip-item-wrap { display:flex; align-items:center; flex:1; min-width:180px; }
        .areas-page .trust-strip-item { flex:1; text-align:center; padding:20px 32px; display:flex; flex-direction:column; align-items:center; gap:10px; color:rgba(255,255,255,.9); font-size:13px; font-weight:600; letter-spacing:.4px; white-space:nowrap; text-decoration:none; transition:.3s; }
        .areas-page .trust-strip-item:hover { color:var(--gold); transform:translateY(-2px); }
        .areas-page .trust-strip-item svg { width:22px; height:22px; color:var(--gold); filter:drop-shadow(0 2px 4px rgba(188,145,85,.3)); }
        .areas-page .trust-strip-divider { width:1px; height:40px; background:rgba(255,255,255,.1); flex-shrink:0; }

        .areas-page .cta-section { background:var(--cream); border-top:1px solid rgba(30,43,67,.08); padding:64px 40px 72px; }
        .areas-page .cta-section-inner { max-width:1200px; margin:0 auto; }
        .areas-page .cta-header { text-align:center; margin-bottom:32px; }
        .areas-page .cta-header h2 { margin-bottom:8px; font:700 clamp(30px,3vw,42px)/1.2 "Playfair Display",serif; }
        .areas-page .cta-header .sub { max-width:600px; margin:0 auto; font-size:16px; line-height:1.7; color:var(--slate); }
        .areas-page .cta-body { display:grid; grid-template-columns:1fr 1.15fr; gap:32px; align-items:stretch; }
        .areas-page .cta-left { display:flex; flex-direction:column; gap:16px; }
        .areas-page .cta-images { display:flex; flex-direction:column; gap:12px; flex:1; }
        .areas-page .cta-img-wrap { position:relative; flex:1; min-height:0; overflow:hidden; border-radius:8px; }
        .areas-page .cta-img-wrap img { width:100%; height:100%; object-fit:cover; display:block; }
        .areas-page .cta-img-wrap:after { content:""; position:absolute; bottom:0; right:0; width:200px; height:200px; background:radial-gradient(circle at bottom right,rgba(30,43,67,1) 0%,rgba(30,43,67,.9) 25%,rgba(30,43,67,.5) 50%,transparent 75%); pointer-events:none; border-radius:0 0 8px 0; }
        .areas-page .contact-form-wrap { background:#fff; border-radius:10px; padding:32px 36px; border:1px solid rgba(30,43,67,.08); box-shadow:0 16px 48px rgba(30,43,67,.1),0 4px 12px rgba(30,43,67,.04); display:flex; flex-direction:column; }
        .areas-page .contact-form-wrap form { display:flex; flex-direction:column; flex:1; }
        .areas-page .areas-form-success { min-height:420px; display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center; }
        .areas-page .areas-form-success h3 { margin-top:16px; font:700 32px/1.2 "Playfair Display",serif; color:var(--oxford-blue); }
        .areas-page .areas-form-success p { margin-top:12px; max-width:420px; line-height:1.7; color:var(--slate); }
        .areas-page .form-row { display:grid; grid-template-columns:1fr 1fr; gap:16px; }
        .areas-page .form-group { margin-bottom:16px; border:none; padding:0; min-width:0; }
        .areas-page .form-row fieldset.form-group { grid-column:1 / -1; }
        .areas-page .form-group label,.areas-page .form-group legend { display:block; margin-bottom:6px; font-size:13px; font-weight:600; text-transform:uppercase; letter-spacing:.5px; color:var(--oxford-blue); }
        .areas-page .form-group input:not([type="radio"]):not([type="checkbox"]),.areas-page .form-group select,.areas-page .form-group textarea,.areas-page .multi-select-toggle { width:100%; border:1px solid rgba(30,43,67,.15); border-radius:6px; padding:12px 14px; font-size:15px; color:var(--oxford-blue); background:#fff; transition:border-color .2s; }
        .areas-page .form-group textarea { min-height:120px; line-height:1.6; resize:vertical; }
        .areas-page .form-group input:not([type="radio"]):not([type="checkbox"]):focus,.areas-page .form-group select:focus,.areas-page .form-group textarea:focus,.areas-page .multi-select-toggle:focus { outline:none; border-color:var(--gold); }
        .areas-page .form-group select { appearance:none; -webkit-appearance:none; padding-right:40px; background-image:url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%235C677D' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E\"); background-repeat:no-repeat; background-position:right 16px center; }
        .areas-page .multi-select-wrap { position:relative; }
        .areas-page .multi-select-toggle { display:flex; align-items:center; justify-content:space-between; border-radius:4px; cursor:pointer; text-align:left; }
        .areas-page .multi-select-toggle svg { transition:transform .2s; }
        .areas-page .multi-select-toggle[aria-expanded="true"] svg { transform:rotate(180deg); }
        .areas-page .multi-select-text { color:var(--slate); white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
        .areas-page .multi-select-text.has-selection { color:var(--oxford-blue); font-weight:500; }
        .areas-page .multi-select-dropdown { display:none; position:absolute; top:calc(100% + 4px); left:0; right:0; max-height:240px; overflow-y:auto; z-index:20; background:#fff; border:1px solid rgba(30,43,67,.15); border-radius:6px; box-shadow:0 8px 24px rgba(0,0,0,.12); padding:6px 0; }
        .areas-page .multi-select-dropdown.open { display:block; }
        .areas-page .multi-select-dropdown label { display:flex; align-items:center; gap:10px; margin:0; padding:8px 14px; font-size:14px; font-weight:400; letter-spacing:0; text-transform:none; cursor:pointer; }
        .areas-page .multi-select-dropdown label:hover { background:rgba(188,145,85,.06); }
        .areas-page .multi-select-dropdown input[type="checkbox"] { appearance:none; -webkit-appearance:none; width:18px; height:18px; border:2px solid rgba(30,43,67,.25); border-radius:3px; position:relative; cursor:pointer; margin:0; }
        .areas-page .multi-select-dropdown input[type="checkbox"]:checked { background:var(--gold); border-color:var(--gold); }
        .areas-page .multi-select-dropdown input[type="checkbox"]:checked:after { content:""; position:absolute; left:5px; top:2px; width:5px; height:9px; border:solid #fff; border-width:0 2px 2px 0; transform:rotate(45deg); }
        .areas-page .form-radio-group { display:flex; gap:10px; flex-wrap:nowrap; }
        .areas-page .form-radio-group label { flex:1; margin:0; padding:12px 14px; border:2px solid rgba(30,43,67,.12); border-radius:6px; display:flex; justify-content:center; align-items:center; text-transform:none; letter-spacing:0; font-size:13px; font-weight:500; cursor:pointer; transition:.2s; }
        .areas-page .form-radio-group label:hover { border-color:var(--gold); }
        .areas-page .form-radio-group input { display:none!important; opacity:0!important; width:0!important; height:0!important; margin:0!important; padding:0!important; border:0!important; position:absolute!important; pointer-events:none!important; appearance:none!important; -webkit-appearance:none!important; }
        .areas-page .form-radio-group input:checked + span { color:var(--gold); font-weight:600; }
        .areas-page .form-radio-group label:has(input:checked) { border-color:var(--gold); background:rgba(188,145,85,.06); }
        .areas-page .form-consent { margin:10px 0 8px; }
        .areas-page .form-consent label { display:flex; align-items:flex-start; gap:10px; font-size:12px; line-height:1.5; color:#6b7280; cursor:pointer; }
        .areas-page .form-consent input[type="checkbox"] { margin-top:3px; accent-color:var(--gold); min-width:16px; }
        .areas-page .form-consent-link { color:var(--gold); text-decoration:underline; }
        .areas-page .form-submit { width:100%; min-height:52px; padding:14px 20px; border:none; border-radius:8px; background:var(--gold); color:#fff; font-size:15px; font-weight:600; letter-spacing:.3px; cursor:pointer; transition:background .2s,transform .2s,box-shadow .2s; }
        .areas-page .form-submit:hover { background:#a57d48; transform:translateY(-1px); box-shadow:0 4px 12px rgba(188,145,85,.3); }
        .areas-page .form-note { margin-top:16px; text-align:center; font-size:13px; font-style:italic; color:var(--slate); }

        .areas-page .financing-strip { background:#fff; border-top:1px solid rgba(30,43,67,.08); padding:56px 40px; }
        .areas-page .financing-strip-inner { max-width:1200px; margin:0 auto; display:flex; flex-direction:column; align-items:center; gap:24px; text-align:center; }
        .areas-page .financing-strip-left { display:flex; flex-direction:column; align-items:center; gap:16px; }
        .areas-page .greensky-logo { font-size:28px; font-weight:700; letter-spacing:-.3px; }
        .areas-page .gs-green { color:#6bbf4e; }
        .areas-page .gs-dark { color:var(--oxford-blue); }
        .areas-page .financing-strip-text { font-size:16px; line-height:1.6; color:var(--slate); }
        .areas-page .financing-strip-text strong { color:var(--oxford-blue); font-weight:700; }
        .areas-page .financing-strip-cta { min-width:280px; min-height:52px; padding:14px 32px; border-radius:8px; display:inline-flex; align-items:center; justify-content:center; gap:10px; text-decoration:none; background:var(--gold); color:#fff; font-size:15px; font-weight:600; transition:.2s; }
        .areas-page .financing-strip-cta:hover { background:#a57d48; transform:translateY(-1px); box-shadow:0 4px 12px rgba(188,145,85,.3); }

        @media (max-width:1024px) {
          .areas-page .section { padding:80px 32px; }
          .areas-page .areas-grid { grid-template-columns:1fr; max-width:640px; margin:0 auto; }
          .areas-page .services-grid,.areas-page .services-more { grid-template-columns:repeat(2,1fr); }
          .areas-page .trust-strip-divider { display:none; }
          .areas-page .trust-strip-item-wrap { min-width:140px; }
          .areas-page .financing-strip { padding:36px 32px; }
          .areas-page .financing-strip-inner,.areas-page .financing-strip-left { flex-direction:column; text-align:center; gap:16px; }
        }

        @media (max-width:768px) {
          .areas-page .section { padding:52px 20px; }
          .areas-page .section-header { margin-bottom:36px; }
          .areas-page .section-header h2 { font-size:24px; margin-bottom:14px; }
          .areas-page .section-header p { font-size:15px; line-height:1.7; }
          .areas-page .page-hero { padding:88px 20px 36px; min-height:40vh; }
          .areas-page .areas-hero-title { font-size:clamp(30px,7vw,42px); }
          .areas-page .hero-subtitle { font-size:15px; }
          .areas-page .hero-ctas { flex-direction:column; align-items:stretch; }
          .areas-page .trust-bar-inner { grid-template-columns:repeat(2,1fr); }
          .areas-page .trust-item { padding:24px 16px; background:rgba(188,145,85,.08); }
          .areas-page .trust-item:hover { transform:none; }
          .areas-page .services-grid,.areas-page .services-more { grid-template-columns:repeat(2,1fr); gap:24px; }
          .areas-page .trust-strip { padding:32px 20px; }
          .areas-page .trust-strip-item-wrap { min-width:50%; }
          .areas-page .trust-strip-item { padding:12px 16px; font-size:11px; }
          .areas-page .trust-strip-item svg { width:18px; height:18px; }
          .areas-page .cta-section { padding:48px 20px; }
          .areas-page .cta-body { grid-template-columns:1fr; }
          .areas-page .cta-left { order:2; }
          .areas-page .cta-img-wrap + .cta-img-wrap { display:none; }
          .areas-page .cta-images img { max-height:200px; object-fit:cover; border-radius:10px; }
          .areas-page .contact-form-wrap { padding:24px 18px; }
          .areas-page .form-row { grid-template-columns:1fr; }
          .areas-page .form-radio-group { flex-wrap:wrap; }
          .areas-page .form-group input:not([type="radio"]):not([type="checkbox"]),.areas-page .form-group select,.areas-page .form-group textarea { font-size:16px; }
          .areas-page .form-submit { font-size:16px; font-weight:700; }
          .areas-page .financing-strip { padding:28px 20px; }
          .areas-page .financing-strip-text { font-size:14px; }
        }

        @media (max-width:560px) {
          .areas-page .services-grid,.areas-page .services-more { grid-template-columns:1fr; }
          .areas-page .service-card-img { height:200px; }
          .areas-page .service-card-body { padding:20px 18px 22px; }
          .areas-page .service-card-body h3 { font-size:16px; }
          .areas-page .area-towns,.areas-page .area-towns-more { grid-template-columns:repeat(2,1fr); }
        }
      `}</style>
    </div>
  );
}

export default AreasWeServeTemplate;


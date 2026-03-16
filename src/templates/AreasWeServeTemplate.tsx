"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  Clock3,
  DollarSign,
  Facebook,
  Instagram,
  Linkedin,
  MapPin,
  Menu,
  MessageSquareMore,
  ShieldCheck,
  Star,
  Upload,
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

function getTrustIcon(icon?: string) {
  const iconClass = "h-5 w-5";

  switch ((icon || "").toLowerCase()) {
    case "clock":
      return <Clock3 className={iconClass} />;
    case "star":
      return <Star className={iconClass} />;
    case "shield":
    case "shield-check":
      return <ShieldCheck className={iconClass} />;
    case "calendar":
      return <CalendarDays className={iconClass} />;
    case "check":
      return <CheckCircle2 className={iconClass} />;
    default:
      return <CheckCircle2 className={iconClass} />;
  }
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
  const backgroundImage = normalizeMediaPath(data?.background_image) || "/portfolio/builtwell-job-site-aerial-ct.jpg";
  const fairfieldPhone = resolveCountyPhone(phones, "Fairfield County", "(203) 919-9616");
  const newHavenPhone = resolveCountyPhone(phones, "New Haven County", "(203) 466-9148");

  return (
    <section className="relative isolate overflow-hidden bg-[#151e30] px-5 pb-12 pt-[120px] text-white md:px-10 md:pb-14">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})`, backgroundPosition: "center 32%" }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_97%_97%,rgba(21,30,48,1)_0%,rgba(21,30,48,0.9)_8%,transparent_30%),radial-gradient(ellipse_at_3%_97%,rgba(21,30,48,0.9)_0%,transparent_25%),linear-gradient(180deg,rgba(21,30,48,0.35)_0%,rgba(21,30,48,0.2)_30%,rgba(21,30,48,0.45)_65%,rgba(21,30,48,0.92)_100%)]" />

      <div className="relative mx-auto flex min-h-[360px] max-w-[1240px] flex-col items-center justify-center text-center md:min-h-[440px]">
        <ol className="mb-5 flex list-none items-center text-[13px] font-medium text-white/92 [text-shadow:0_1px_6px_rgba(0,0,0,0.7)]">
          <li>
            <ExternalOrInternalLink href="/" className="text-white/85 transition-colors hover:text-[#bc9155]">
              Home
            </ExternalOrInternalLink>
          </li>
          <li className="before:px-2.5 before:text-[#bc9155] before:content-['›']">
            <span className="font-semibold text-white">Areas We Serve</span>
          </li>
        </ol>

        <h1 className="max-w-[900px] font-serif text-[clamp(40px,4.5vw,56px)] font-bold leading-[1.08] tracking-[-0.03em] text-white [text-shadow:0_2px_20px_rgba(0,0,0,0.5)]">
          {parts.before}
          {parts.accent ? <span className="text-[#bc9155]">{parts.accent}</span> : null}
          {parts.after}
        </h1>

        {data?.subheadline ? (
          <p className="mt-4 max-w-[560px] text-[17px] leading-[1.7] text-white/82">
            {data.subheadline}
          </p>
        ) : null}

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <ExternalOrInternalLink
            href={toTelHref(fairfieldPhone)}
            className="flex min-w-[180px] flex-col items-center rounded-[8px] border border-white/18 border-b-2 border-b-[#bc9155] bg-[rgba(10,18,35,0.42)] px-7 py-4 text-center text-white backdrop-blur-[12px] transition-all hover:-translate-y-0.5 hover:bg-[rgba(10,18,35,0.62)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.3)]"
          >
            <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/70">Fairfield County</span>
            <span className="mt-1 font-serif text-[18px] font-semibold">{fairfieldPhone}</span>
          </ExternalOrInternalLink>
          <ExternalOrInternalLink
            href={toTelHref(newHavenPhone)}
            className="flex min-w-[180px] flex-col items-center rounded-[8px] border border-white/18 border-b-2 border-b-[#bc9155] bg-[rgba(10,18,35,0.42)] px-7 py-4 text-center text-white backdrop-blur-[12px] transition-all hover:-translate-y-0.5 hover:bg-[rgba(10,18,35,0.62)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.3)]"
          >
            <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/70">New Haven County</span>
            <span className="mt-1 font-serif text-[18px] font-semibold">{newHavenPhone}</span>
          </ExternalOrInternalLink>
          <ExternalOrInternalLink
            href="#contact"
            className="flex min-w-[180px] flex-col items-center rounded-[8px] border border-[#bc9155] border-b-2 border-b-[#a57d48] bg-[#bc9155] px-7 py-4 text-center text-white transition-all hover:-translate-y-0.5 hover:bg-[#d4a95a] hover:shadow-[0_8px_24px_rgba(188,145,85,0.4)]"
          >
            <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/90">Free Estimate</span>
            <span className="mt-1 font-serif text-[18px] font-semibold">Schedule Now</span>
          </ExternalOrInternalLink>
        </div>
      </div>
    </section>
  );
}

function StatsBar({ data }: { data?: TrustBarData }) {
  const items = data?.items || [];

  return (
    <section className="border-y border-[#bc9155]/20 bg-[linear-gradient(135deg,#1E2B43_0%,#151E30_100%)] text-white">
      <div className="mx-auto max-w-[1280px]">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {items.map((item, index) => (
            <div
              key={`${item.label}-${index}`}
              className={`flex min-h-[124px] flex-col items-center justify-center border-[#bc9155]/12 px-5 py-9 text-center transition-all hover:-translate-y-0.5 hover:bg-[#bc9155]/8 ${index < items.length - 1 ? "border-r" : ""}`}
            >
              <div className="flex items-center gap-2 text-[#bc9155]">
                {item.value ? (
                  <span className="font-serif text-[42px] leading-none font-bold">{item.value}</span>
                ) : (
                  getTrustIcon(item.icon)
                )}
              </div>
              <p className="mt-2 text-[13px] font-medium uppercase tracking-[0.08em] text-white/60">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AreasSection({ data, phones }: { data?: AreasServedData; phones: PhoneItem[] }) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const titleParts = getHighlightParts(data?.title, data?.highlight_text || undefined);
  const counties = data?.counties || [];

  return (
    <section className="bg-[#f5f1e9] py-20 md:py-24">
      <div className="mx-auto max-w-[1240px] px-6">
        <div className="mx-auto max-w-3xl text-center">
          {data?.eyebrow ? (
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#bc9155]">
              {data.eyebrow}
            </p>
          ) : null}
          <h2 className="text-[2.35rem] leading-tight font-bold text-[#151e30] md:text-[3.3rem]">
            {titleParts.before}
            {titleParts.accent ? <span className="text-[#bc9155]">{titleParts.accent}</span> : null}
            {titleParts.after}
          </h2>
          {data?.subtitle ? (
            <p className="mt-5 text-[1.05rem] leading-8 text-[#5c677d]">
              {data.subtitle}
            </p>
          ) : null}
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          {counties.map((county) => {
            const countyName = county.name || "";
            const isExpanded = Boolean(expanded[countyName]);
            const imageSrc = normalizeMediaPath(county.image) || "/images/fairfield-landmark.jpg";
            const featuredTowns = county.towns || [];
            const extraTowns = county.extra_towns || [];
            const displayPhone = resolveCountyPhone(phones, countyName, county.phone);

            return (
              <article
                key={countyName}
                className="overflow-hidden rounded-xl border border-[#e6ddcc] bg-white shadow-[0_18px_40px_rgba(21,30,48,0.08)]"
              >
                <div className="h-[220px] overflow-hidden">
                  <img
                    src={imageSrc}
                    alt={countyName}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="p-6 md:p-7">
                  <h3 className="text-[1.9rem] font-bold text-[#151e30]">{countyName}</h3>
                  {displayPhone ? (
                    <p className="mt-1 text-sm text-[#5c677d]">
                      Call:{" "}
                      <a href={toTelHref(displayPhone)} className="font-semibold text-[#151e30] transition-colors hover:text-[#bc9155]">
                        {displayPhone}
                      </a>
                    </p>
                  ) : null}
                  {county.description ? (
                    <p className="mt-4 text-[0.98rem] leading-7 text-[#5c677d]">
                      {county.description}
                    </p>
                  ) : null}

                  <div className="mt-5 flex flex-wrap gap-2">
                    {featuredTowns.map((town) => {
                      const href = county.town_links?.[town];
                      const content = (
                        <>
                          <MapPin className="h-3.5 w-3.5" />
                          <span>{town}</span>
                        </>
                      );

                      return href ? (
                        <Link
                          key={`${countyName}-${town}`}
                          href={href}
                          className="inline-flex items-center gap-1.5 rounded-full border border-[#e9dfd0] bg-[#fbf8f2] px-3 py-1.5 text-xs font-medium text-[#4d5a6b] transition-colors hover:border-[#bc9155] hover:text-[#151e30]"
                        >
                          {content}
                        </Link>
                      ) : (
                        <span
                          key={`${countyName}-${town}`}
                          className="inline-flex items-center gap-1.5 rounded-full border border-[#e9dfd0] bg-[#fbf8f2] px-3 py-1.5 text-xs font-medium text-[#4d5a6b]"
                        >
                          {content}
                        </span>
                      );
                    })}

                    {isExpanded
                      ? extraTowns.map((town) => (
                          <span
                            key={`${countyName}-${town}`}
                            className="inline-flex items-center rounded-full border border-[#efe6d8] bg-white px-3 py-1.5 text-xs font-medium text-[#6d7684]"
                          >
                            {town}
                          </span>
                        ))
                      : null}
                  </div>

                  {extraTowns.length > 0 ? (
                    <button
                      type="button"
                      className="mt-4 inline-flex items-center text-sm font-medium text-[#bc9155]"
                      onClick={() =>
                        setExpanded((current) => ({
                          ...current,
                          [countyName]: !current[countyName],
                        }))
                      }
                    >
                      {isExpanded ? "Show Less −" : "See All Towns +"}
                    </button>
                  ) : null}

                  {county.url ? (
                    <div className="mt-5">
                      <Link
                        href={county.url}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-[#151e30] transition-colors hover:text-[#bc9155]"
                      >
                        {county.cta_label || `Learn more about ${countyName}`}
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
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
    <section className="bg-[#f5f1e9] py-8 pb-20 md:pb-24">
      <div className="mx-auto max-w-[1240px] px-6">
        <div className="mx-auto max-w-3xl text-center">
          {data?.eyebrow ? (
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#bc9155]">
              {data.eyebrow}
            </p>
          ) : null}
          <h2 className="text-[2.2rem] leading-tight font-bold text-[#151e30] md:text-[3.15rem]">
            {titleParts.before}
            {titleParts.accent ? <span className="text-[#bc9155]">{titleParts.accent}</span> : null}
            {titleParts.after}
          </h2>
          {data?.subtitle ? (
            <p className="mt-5 text-[1.05rem] leading-8 text-[#5c677d]">
              {data.subtitle}
            </p>
          ) : null}
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {visibleItems.map((item) => (
            <ServiceCard key={item.title} item={item} />
          ))}
        </div>

        {(hiddenItems.length > 0 || data?.cta_card) ? (
          <div className="mt-10 text-center">
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-md border border-[#bc9155] bg-white px-5 py-3 text-sm font-semibold text-[#bc9155] transition-colors hover:bg-[#bc9155] hover:text-white"
              onClick={() => setShowAll((current) => !current)}
            >
              {showAll ? data?.toggle_less_label || "Show Fewer Services" : data?.toggle_label || "Show More Services"}
              <ChevronDown className={`h-4 w-4 transition-transform ${showAll ? "rotate-180" : ""}`} />
            </button>
          </div>
        ) : null}

        {showAll ? (
          <div className="mt-8 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {hiddenItems.map((item) => <ServiceCard key={item.title} item={item} />)}
            {data?.cta_card ? <ServiceCtaCard card={data.cta_card} /> : null}
          </div>
        ) : null}
      </div>
    </section>
  );
}

function ServiceCard({ item }: { item: ServiceItem }) {
  const imageSrc = normalizeMediaPath(item.image) || "/images/hero/hero-carousel-final.png";

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-xl border border-[#e6ddcc] bg-white shadow-[0_16px_35px_rgba(21,30,48,0.08)]">
      <div className="h-[210px] overflow-hidden">
        <img
          src={imageSrc}
          alt={item.title || "Service"}
          className="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.03]"
        />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-[1.45rem] font-bold text-[#151e30]">
          <Link href={item.url || "#"} className="transition-colors hover:text-[#bc9155]">
            {item.title}
          </Link>
        </h3>

        {item.summary ? (
          <p className="mt-3 flex-1 text-[0.97rem] leading-7 text-[#5c677d]">
            {item.summary}
          </p>
        ) : null}

        {(item.price || item.timeline) ? (
          <div className="mt-5 flex flex-wrap gap-2">
            {item.price ? (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#eadfce] bg-[#fbf8f2] px-3 py-1.5 text-xs font-medium text-[#6b5d49]">
                <DollarSign className="h-3.5 w-3.5 text-[#bc9155]" />
                {item.price}
              </span>
            ) : null}
            {item.timeline ? (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#eadfce] bg-[#fbf8f2] px-3 py-1.5 text-xs font-medium text-[#6b5d49]">
                <Clock3 className="h-3.5 w-3.5 text-[#bc9155]" />
                {item.timeline}
              </span>
            ) : null}
          </div>
        ) : null}

        <div className="mt-5">
          <Link
            href={item.url || "#"}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#151e30] transition-colors hover:text-[#bc9155]"
          >
            {item.cta_label || "Learn More"}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
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
    <article className="flex h-full flex-col items-center justify-center rounded-xl bg-[#151e30] px-8 py-10 text-center text-white shadow-[0_18px_38px_rgba(21,30,48,0.18)]">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#bc9155]/14 text-[#bc9155]">
        <MessageSquareMore className="h-7 w-7" />
      </div>
      <h3 className="mt-5 text-[1.7rem] font-bold text-white">{card.title}</h3>
      {card.body ? (
        <p className="mt-4 max-w-sm text-[0.98rem] leading-7 text-white/75">
          {card.body}
        </p>
      ) : null}
      <Link
        href={card.url || "#contact"}
        className="mt-6 inline-flex items-center justify-center rounded-md bg-[#bc9155] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#a57d48]"
      >
        {card.label || "Schedule a Free Consultation"}
      </Link>
      {card.subtext ? <p className="mt-3 text-xs tracking-[0.1em] text-white/55">{card.subtext}</p> : null}
    </article>
  );
}

function ProseSection({ data }: { data?: RichTextData }) {
  const titleParts = getHighlightParts(data?.title, data?.highlight_text || undefined);

  return (
    <section className="border-b border-[#1e2b43]/6 bg-white py-20 md:py-24">
      <div className="mx-auto max-w-[1240px] px-6">
        <div className="mx-auto max-w-[820px]">
          <div className="text-center">
            {data?.eyebrow ? (
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#bc9155]">
                {data.eyebrow}
              </p>
            ) : null}
            <h2 className="font-serif text-[clamp(32px,3.5vw,44px)] leading-tight font-bold tracking-[-0.02em] text-[#151e30]">
              {titleParts.before}
              {titleParts.accent ? <span className="text-[#bc9155]">{titleParts.accent}</span> : null}
              {titleParts.after}
            </h2>
          </div>

          {data?.content ? (
            <div
              className="mt-8 text-[16px] leading-[1.85] text-[#5c677d] [&_p]:mb-5 [&_p:last-child]:mb-0"
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
    <section className="relative overflow-hidden bg-[linear-gradient(135deg,#1E2B43_0%,#151E30_100%)] px-5 py-14 text-white md:px-10">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url(/portfolio/builtwell-job-site-aerial-ct.jpg)" }}
      />
      <div className="absolute inset-0 bg-[#151e30]/88" />

      <div className="relative mx-auto max-w-[1200px]">
        <div className="flex flex-wrap items-center justify-center">
          {items.map((item, index) => (
            <div key={`${item.label}-${index}`} className="contents">
              <ExternalOrInternalLink
                href={item.url || "#"}
                className="flex min-w-[180px] flex-1 flex-col items-center gap-3 px-8 py-5 text-center text-[13px] font-semibold tracking-[0.03em] text-white/90 transition-all hover:-translate-y-0.5 hover:text-[#bc9155]"
              >
                <span className="text-[#bc9155]">{getTrustIcon(item.icon)}</span>
                <span>{item.label}</span>
              </ExternalOrInternalLink>
              {index < items.length - 1 ? <div className="hidden h-10 w-px bg-white/10 lg:block" /> : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection({ data }: { data?: LeadFormData }) {
  const [submitted, setSubmitted] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [contactMethod, setContactMethod] = useState("call");
  const [fileNames, setFileNames] = useState<string[]>([]);
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
    <section id="contact" className="bg-[#f5f1e9] py-20 md:py-24">
      <div className="mx-auto max-w-[1240px] px-6">
        <div className="mx-auto max-w-3xl text-center">
          {data?.eyebrow ? (
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#bc9155]">
              {data.eyebrow}
            </p>
          ) : null}
          <h2 className="text-[2.2rem] leading-tight font-bold text-[#151e30] md:text-[3.1rem]">
            {titleParts.before}
            {titleParts.accent ? <span className="text-[#bc9155]">{titleParts.accent}</span> : null}
            {titleParts.after}
          </h2>
          {data?.subtitle ? (
            <p className="mt-4 text-[1.02rem] leading-8 text-[#5c677d]">
              {data.subtitle}
            </p>
          ) : null}
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="grid gap-5">
            {images.map((image, index) => (
              <div key={`${image.src}-${index}`} className="overflow-hidden rounded-xl shadow-[0_16px_35px_rgba(21,30,48,0.08)]">
                <img src={image.src} alt={image.alt} className="h-full w-full object-cover" />
              </div>
            ))}
          </div>

          <div className="rounded-xl border border-[#e6ddcc] bg-white p-6 shadow-[0_18px_42px_rgba(21,30,48,0.10)] md:p-8">
            {submitted ? (
              <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
                <CheckCircle2 className="h-12 w-12 text-[#bc9155]" />
                <h3 className="mt-4 text-[2rem] font-bold text-[#151e30]">Thank You</h3>
                <p className="mt-3 max-w-md text-[1rem] leading-7 text-[#5c677d]">
                  We received your request and will reach out within one business day.
                </p>
              </div>
            ) : (
              <form
                className="space-y-5"
                onSubmit={(event) => {
                  event.preventDefault();
                  setSubmitted(true);
                }}
              >
                <div className="grid gap-4 md:grid-cols-2">
                  {basicFields.map((field) => (
                    <div key={field.name}>
                      <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.16em] text-[#151e30]">
                        {field.label}
                        {field.required ? " *" : ""}
                      </label>
                      <input
                        type={field.type}
                        name={field.name}
                        required={field.required}
                        placeholder={field.placeholder}
                        className="h-12 w-full rounded-md border border-[#e6ddcc] px-3 text-sm text-[#151e30] outline-none transition-colors focus:border-[#bc9155]"
                      />
                    </div>
                  ))}
                </div>

                {servicesField ? (
                  <div className="relative">
                    <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.16em] text-[#151e30]">
                      {servicesField.label}
                      {servicesField.required ? " *" : ""}
                    </label>
                    <button
                      type="button"
                      className="flex h-12 w-full items-center justify-between rounded-md border border-[#e6ddcc] px-3 text-left text-sm text-[#5c677d] transition-colors hover:border-[#bc9155]"
                      onClick={() => setServicesOpen((current) => !current)}
                    >
                      <span>{selectedServicesLabel}</span>
                      <ChevronDown className={`h-4 w-4 transition-transform ${servicesOpen ? "rotate-180" : ""}`} />
                    </button>
                    {servicesOpen ? (
                      <div className="absolute left-0 right-0 top-[calc(100%+0.5rem)] z-20 rounded-md border border-[#e6ddcc] bg-white p-3 shadow-[0_18px_35px_rgba(21,30,48,0.12)]">
                        <div className="grid max-h-60 gap-2 overflow-y-auto pr-1">
                          {serviceOptions.map((option) => {
                            const checked = selectedServices.includes(option.value);
                            return (
                              <label
                                key={option.value}
                                className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm text-[#4f5f72] hover:bg-[#f7f3ec]"
                              >
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
                    ) : null}
                  </div>
                ) : null}

                <div className="grid gap-4 md:grid-cols-[1fr_auto]">
                  {bestTimeField ? (
                    <div>
                      <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.16em] text-[#151e30]">
                        {bestTimeField.label}
                        {bestTimeField.required ? " *" : ""}
                      </label>
                      <select
                        name={bestTimeField.name}
                        required={bestTimeField.required}
                        className="h-12 w-full rounded-md border border-[#e6ddcc] px-3 text-sm text-[#151e30] outline-none transition-colors focus:border-[#bc9155]"
                        defaultValue=""
                      >
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
                    <fieldset className="min-w-0">
                      <legend className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.16em] text-[#151e30]">
                        Preferred Contact Method
                      </legend>
                      <div className="flex flex-wrap gap-2">
                        {methodOptions.map((option) => (
                          <label
                            key={option.value}
                            className={`inline-flex cursor-pointer items-center justify-center rounded-md border px-4 py-3 text-sm font-medium transition-colors ${
                              contactMethod === option.value
                                ? "border-[#bc9155] bg-[#bc9155] text-white"
                                : "border-[#e6ddcc] bg-white text-[#4f5f72]"
                            }`}
                          >
                            <input
                              type="radio"
                              name={contactMethodField?.name || "contact_method"}
                              value={option.value}
                              checked={contactMethod === option.value}
                              onChange={() => setContactMethod(option.value)}
                              className="sr-only"
                            />
                            {option.label}
                          </label>
                        ))}
                      </div>
                    </fieldset>
                  ) : null}
                </div>

                {messageField ? (
                  <div>
                    <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.16em] text-[#151e30]">
                      {messageField.label}
                    </label>
                    <textarea
                      name={messageField.name}
                      rows={5}
                      placeholder={messageField.placeholder}
                      className="w-full rounded-md border border-[#e6ddcc] px-3 py-3 text-sm text-[#151e30] outline-none transition-colors focus:border-[#bc9155]"
                    />
                  </div>
                ) : null}

                <div className="flex flex-col gap-4 border-t border-[#efe6d8] pt-5 md:flex-row md:items-center md:justify-between">
                  <div>
                    <label className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-[#e6ddcc] px-4 py-3 text-sm font-medium text-[#4f5f72] transition-colors hover:border-[#bc9155]">
                      <Upload className="h-4 w-4 text-[#bc9155]" />
                      Upload Photos
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        className="hidden"
                        onChange={(event) =>
                          setFileNames(Array.from(event.target.files || []).map((file) => file.name))
                        }
                      />
                    </label>
                    {fileNames.length > 0 ? (
                      <p className="mt-2 text-xs text-[#5c677d]">{fileNames.join(", ")}</p>
                    ) : null}
                  </div>

                  <button
                    type="submit"
                    className="inline-flex items-center justify-center rounded-md bg-[#bc9155] px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-[#a57d48]"
                  >
                    {data?.submit_label || "Send Request"}
                  </button>
                </div>

                {data?.consent_text ? (
                  <p className="text-xs text-[#6f7988]">{data.consent_text}</p>
                ) : null}
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
    <section className="border-t border-[#1e2b43]/8 bg-white px-5 py-14 md:px-10">
      <div className="mx-auto flex max-w-[1200px] flex-col items-center gap-6 text-center">
        <div className="flex flex-col items-center gap-4 md:flex-row md:text-left">
          <div className="text-[24px] font-semibold">
            <span className="text-[#62b33d]">Green</span>
            <span className="text-[#1e2b43]">Sky</span>
          </div>
          <p className="max-w-[760px] text-[16px] leading-[1.6] text-[#5c677d]">
            <strong className="text-[#151e30]">{data.title}</strong>{" "}
            {(data.content || "").replace(/<[^>]+>/g, "")}
          </p>
        </div>

        {data.cta?.label && data.cta?.url ? (
          <ExternalOrInternalLink
            href={data.cta.url}
            className="inline-flex min-h-[52px] min-w-[280px] items-center justify-center gap-2 rounded-[8px] bg-[#bc9155] px-8 py-3 text-[15px] font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-[#a57d48]"
          >
            {data.cta.label}
            <ArrowRight className="h-4 w-4" />
          </ExternalOrInternalLink>
        ) : null}
      </div>
    </section>
  );
}

function AreasFooter({ phones }: { phones: PhoneItem[] }) {
  const fairfieldPhone = phones.find((phone) => phone.label.toLowerCase().includes("fairfield"));
  const newHavenPhone = phones.find((phone) => phone.label.toLowerCase().includes("new haven"));
  const year = new Date().getUTCFullYear();

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
            <Link href={link.href} className="text-sm text-white/65 transition-colors hover:text-[#bc9155]">
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
    <div className="bg-white text-[#151e30]">
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
    </div>
  );
}

export default AreasWeServeTemplate;

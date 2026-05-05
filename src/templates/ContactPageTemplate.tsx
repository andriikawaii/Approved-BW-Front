"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock3, Home, Mail, MapPin, Monitor, Phone } from "lucide-react";
import type { CMSPage } from "@/types/cms";
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
};

const cls = (...values: Array<string | false | null | undefined>) => values.filter(Boolean).join(" ");
const section = <T,>(page: CMSPage, type: string) => page.sections.find((entry) => entry.is_active && entry.type === type)?.data as T | undefined;
const sections = <T,>(page: CMSPage, type: string) => page.sections.filter((entry) => entry.is_active && entry.type === type).map((entry) => entry.data as T);
const media = (value?: string | null, fallback = "") => FALLBACK_MEDIA[value || ""] || value || fallback;

const IN_PERSON_SLOTS = [
  "8:00 AM - 10:00 AM",
  "10:00 AM - 12:00 PM",
  "12:00 PM - 2:00 PM",
  "2:00 PM - 4:00 PM",
];

const REMOTE_WEEKDAY_SLOTS = [
  "8:00 AM - 9:00 AM",
  "9:00 AM - 10:00 AM",
  "10:00 AM - 11:00 AM",
  "11:00 AM - 12:00 PM",
  "12:00 PM - 1:00 PM",
  "1:00 PM - 2:00 PM",
  "2:00 PM - 3:00 PM",
  "3:00 PM - 4:00 PM",
  "4:00 PM - 5:00 PM",
  "5:00 PM - 6:00 PM",
];

const REMOTE_SATURDAY_SLOTS = [
  "9:00 AM - 10:00 AM",
  "10:00 AM - 11:00 AM",
  "11:00 AM - 12:00 PM",
  "12:00 PM - 1:00 PM",
  "1:00 PM - 2:00 PM",
  "2:00 PM - 3:00 PM",
];

type ContactTrustIcon = "star" | "check" | "license";

const CONTACT_TRUST_ITEMS: Array<{ label: string; url: string; icon: ContactTrustIcon; external?: boolean }> = [
  {
    label: "Google Rating 4.9",
    url: "https://www.google.com/maps/search/?api=1&query=BuiltWell+CT,+206A+Boston+Post+Road,+Orange,+CT+06477",
    icon: "star",
    external: true,
  },
  {
    label: "Trusted on Houzz",
    url: "#houzz",
    icon: "check",
  },
  {
    label: "CT HIC License #0668405",
    url: "https://www.elicense.ct.gov/Lookup/LicenseLookup.aspx",
    icon: "license",
    external: true,
  },
];

function parts(text?: string | null, mark?: string | null) {
  const source = (text || "").trim();
  const accent = (mark || "").trim();
  if (!accent || !source.includes(accent)) return { before: source, accent: "", after: "" };
  const index = source.indexOf(accent);
  return { before: source.slice(0, index), accent, after: source.slice(index + accent.length) };
}

function label(text: React.ReactNode, dark = false) {
  return (
    <span className={cls("mb-4 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em]", dark ? "text-[#c89b5b]" : "text-[#bc9155]")}>
      <span className={cls("h-px w-7", dark ? "bg-[#c89b5b]" : "bg-[#bc9155]")} />
      {text}
    </span>
  );
}

function linkNode(href: string, children: React.ReactNode, className?: string, style?: React.CSSProperties) {
  const isHttp = /^https?:\/\//i.test(href);
  const isAnchorLike = href.startsWith("#") || href.startsWith("tel:") || href.startsWith("mailto:");
  return isHttp || isAnchorLike ? (
    <a href={href} className={className} style={style} target={isHttp ? "_blank" : undefined} rel={isHttp ? "noreferrer" : undefined}>{children}</a>
  ) : (
    <Link href={href} className={className} style={style}>{children}</Link>
  );
}

function staggerStyle(index: number): React.CSSProperties {
  return { ["--contact-stagger-index" as string]: index };
}

function tomorrowISO() {
  const date = new Date();
  date.setDate(date.getDate() + 1);
  return date.toISOString().split("T")[0];
}

function dayFromISO(value: string) {
  if (!value) return null;
  return new Date(`${value}T12:00:00`).getDay();
}

function trustIcon(icon: ContactTrustIcon) {
  if (icon === "star") {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" stroke="none" aria-hidden>
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    );
  }
  if (icon === "license") {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <path d="M8 2v4M16 2v4M3 10h18" />
      </svg>
    );
  }
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <circle cx="12" cy="12" r="10" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

function isOpenNowInEastern() {
  const easternNow = new Date(new Date().toLocaleString("en-US", { timeZone: "America/New_York" }));
  const day = easternNow.getDay();
  const time = easternNow.getHours() + easternNow.getMinutes() / 60;
  if (day >= 1 && day <= 5 && time >= 8 && time < 17) return true;
  if (day === 6 && time >= 8 && time < 15) return true;
  return false;
}

function mapEmbedFromAddress(address?: string | null) {
  const value = (address || "").trim();
  if (!value) return "https://www.google.com/maps?q=Orange%20CT&output=embed";
  return `https://www.google.com/maps?q=${encodeURIComponent(value)}&output=embed`;
}

export function ContactPageTemplate({ page }: { page: CMSPage }) {
  const pageRef = useRef<HTMLDivElement>(null);
  const tomorrow = useMemo(() => tomorrowISO(), []);

  const hero = section<any>(page, "hero") || section<any>(page, "page_hero");
  const lead = section<any>(page, "lead_form");
  const areas = section<any>(page, "areas_served");
  const office = section<any>(page, "office_info");
  const rich = sections<RichTextData>(page, "rich_text");
  const grids = sections<any>(page, "feature_grid");
  const consultIntro = rich.find((item) => item.style_variant !== "financing_strip");
  const expectIntro = rich.filter((item) => item.style_variant !== "financing_strip")[1];
  const financing = rich.find((item) => item.style_variant === "financing_strip");
  const consultCards = grids[0]?.items || [];
  const expectCards = grids[1]?.items || [];
  const [scheduleOpen, setScheduleOpen] = useState(false);
  const [scheduleMode, setScheduleMode] = useState<"in-person" | "remote">("in-person");
  const [scheduleCounty, setScheduleCounty] = useState<"fairfield" | "new-haven" | null>(null);
  const [scheduleDate, setScheduleDate] = useState(tomorrow);
  const [selectedSlot, setSelectedSlot] = useState<string>("");
  const [scheduleValues, setScheduleValues] = useState({ name: "", phone: "", email: "", zip: "" });
  const [officeOpenNow, setOfficeOpenNow] = useState(false);

  const heroParts = parts(hero?.headline || hero?.title, "BuiltWell CT");
  const consultParts = parts(consultIntro?.title, "Consultation");
  const expectParts = parts(expectIntro?.title, "Expect");
  const officeParts = parts(office?.title || "Our Office & Location", "Location");
  const officeMap = office?.map_embed_url || mapEmbedFromAddress(office?.address);
  const fairfieldPhone = page.phones?.items?.find((item: any) => /fairfield/i.test(item?.label || ""))?.number;
  const newHavenPhone = office?.phone || page.phones?.items?.find((item: any) => /new haven/i.test(item?.label || ""))?.number || "";
  const officePhoneText = newHavenPhone || fairfieldPhone || "";
  const officePhoneHref = officePhoneText ? `tel:${String(officePhoneText).replace(/\D/g, "")}` : null;
  const officeEmailText = office?.email || "info@builtwellct.com";
  const officeEmailHref = officeEmailText ? `mailto:${officeEmailText}` : null;
  const businessHours = Array.isArray(office?.business_hours) && office.business_hours.length
    ? office.business_hours
    : ["Monday - Friday: 8:00 AM - 5:00 PM", "Saturday: 8:00 AM - 3:00 PM", "Sunday: Closed"];
  const parsedBusinessHours: Array<{ day: string; time: string }> = businessHours.map((row: string) => {
    const [day, ...rest] = String(row).split(":");
    return {
      day: day.trim(),
      time: rest.join(":").trim(),
    };
  });
  const fairfieldLine = fairfieldPhone
    ? `Dedicated local team serving Greenwich, Westport, Darien, New Canaan, Stamford, Norwalk, Fairfield, Ridgefield, and all surrounding towns.`
    : "Serving homeowners across Greenwich, Stamford, Norwalk, Westport, and nearby Fairfield County towns.";
  const areasWithFallbackNote = useMemo(() => {
    if (!areas) return areas;
    if (areas.note || areas.note_html) return areas;
    return {
      ...areas,
      note_html: "Not sure if we cover your area? <a href=\"/contact/\">Contact our Connecticut remodeling team</a> and we'll let you know.",
    };
  }, [areas]);

  const day = useMemo(() => dayFromISO(scheduleDate), [scheduleDate]);
  const isSaturday = day === 6;
  const isSunday = day === 0;

  const availableSlots = useMemo(() => {
    if (isSunday) return [];
    if (scheduleMode === "in-person") return isSaturday ? [] : IN_PERSON_SLOTS;
    return isSaturday ? REMOTE_SATURDAY_SLOTS : REMOTE_WEEKDAY_SLOTS;
  }, [isSaturday, isSunday, scheduleMode]);

  useEffect(() => {
    if (!scheduleOpen) return;

    const onEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") setScheduleOpen(false);
    };

    document.addEventListener("keydown", onEsc);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onEsc);
      document.body.style.overflow = previousOverflow;
    };
  }, [scheduleOpen]);

  useEffect(() => {
    const root = pageRef.current;
    if (!root) return;

    const elements = Array.from(root.querySelectorAll<HTMLElement>(".contact-fade-up"));
    if (!elements.length) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      elements.forEach((element) => element.classList.add("contact-fade-up-visible"));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("contact-fade-up-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const updateStatus = () => setOfficeOpenNow(isOpenNowInEastern());
    updateStatus();
    const interval = window.setInterval(updateStatus, 60000);
    return () => window.clearInterval(interval);
  }, []);

  const openScheduleModal = (type: "in-person" | "remote") => {
    if (type === "in-person" && isSaturday) {
      setScheduleMode("remote");
      setScheduleCounty(null);
    } else {
      setScheduleMode(type);
    }
    setScheduleOpen(true);
    setSelectedSlot("");
  };

  const onScheduleDateChange = (value: string) => {
    if (!value) {
      setScheduleDate("");
      setSelectedSlot("");
      return;
    }

    const selectedDay = dayFromISO(value);
    if (selectedDay === 0) {
      window.alert("We are closed on Sundays. Please select a weekday or Saturday.");
      return;
    }

    if (selectedDay === 6 && scheduleMode === "in-person") {
      setScheduleMode("remote");
      setScheduleCounty(null);
    }

    setScheduleDate(value);
    setSelectedSlot("");
  };

  const onScheduleSubmit = () => {
    const { name, phone, email, zip } = scheduleValues;

    if (!name || !phone || !email || !zip || !scheduleDate || !selectedSlot) {
      window.alert("Please fill in all fields and select a time slot.");
      return;
    }

    if (scheduleMode === "in-person" && !scheduleCounty) {
      window.alert("Please select your county.");
      return;
    }

    const typeLabel = scheduleMode === "in-person" ? "In-Person Visit" : "Google Meet";
    const countyLabel = scheduleCounty === "fairfield" ? "Fairfield County" : "New Haven County";
    const summary = scheduleMode === "in-person"
      ? `${typeLabel} in ${countyLabel}\n${scheduleDate} at ${selectedSlot}\n\nName: ${name}\nPhone: ${phone}\nEmail: ${email}\nZip: ${zip}`
      : `${typeLabel}\n${scheduleDate} at ${selectedSlot}\n\nName: ${name}\nPhone: ${phone}\nEmail: ${email}\nZip: ${zip}`;

    window.alert(`Thank you! Your consultation request has been submitted.\n\n${summary}\n\nWe'll confirm by email within 24 hours.`);
    setScheduleOpen(false);
  };

  return (
    <div ref={pageRef} data-contact-page className="bg-[#f5f1e9] text-[#1e2b43]">
      <section className="contact-page-hero relative isolate flex min-h-[50vh] items-stretch overflow-hidden bg-[#151e30] px-5 pb-12 pt-[60px] text-white md:px-10">
        <Image src={media(hero?.background_image, "/images/hero/hero-carousel-2.jpg")} alt="" fill priority fetchPriority="high" sizes="100vw" className="object-cover opacity-70" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_97%_97%,rgba(21,30,48,1)_0%,rgba(21,30,48,0.9)_8%,transparent_30%),radial-gradient(ellipse_at_3%_97%,rgba(21,30,48,0.9)_0%,transparent_25%),linear-gradient(180deg,rgba(21,30,48,0.35)_0%,rgba(21,30,48,0.2)_30%,rgba(21,30,48,0.45)_65%,rgba(21,30,48,0.92)_100%)]" />
        <div className="relative z-10 mx-auto flex w-full max-w-[1240px] flex-col items-center justify-center text-center">
          <ol className="mb-5 flex list-none items-center text-[13px] font-medium text-white/90">
            <li className="flex items-center">{linkNode("/", "Home", "transition-colors duration-200 hover:text-[#bc9155]")}</li>
            <li className="flex items-center"><span className="px-2.5 text-[12px] text-[#bc9155]" aria-hidden>{"\u203A"}</span><span className="font-semibold text-white">Contact</span></li>
          </ol>
          <h1 className="max-w-[980px] text-[clamp(40px,4.5vw,56px)] font-bold leading-[1.08] tracking-[-0.02em] text-white [text-shadow:0_2px_20px_rgba(0,0,0,0.5)]">
            {heroParts.before}{heroParts.accent ? <span className="text-[#bc9155]">{heroParts.accent}</span> : null}{heroParts.after}
          </h1>
          {hero?.subheadline || hero?.subtitle ? <p className="mt-3 max-w-[640px] text-[17px] leading-[1.65] text-white/85 [text-shadow:0_1px_8px_rgba(0,0,0,0.4)]">{hero?.subheadline || hero?.subtitle}</p> : null}
        </div>
      </section>

      <div className="contact-fade-up contact-lead-wrap">
        <SharedLeadFormSection
          page={page}
          data={{ ...(lead || {}), title: "Tell Us About Your Project", title_highlight: "Project" }}
          accent="Project"
        />
      </div>

      <section className="contact-fade-up contact-reveal-stagger contact-trust-strip" role="region" aria-label="Trust indicators">
        <div className="contact-trust-strip-inner">
          {CONTACT_TRUST_ITEMS.map((item, index) => (
            <div key={`${item.label}-${index}`} className="contents">
              {linkNode(
                item.url,
                <>
                  <span className="contact-trust-strip-icon">{trustIcon(item.icon)}</span>
                  <span>{item.label}</span>
                </>,
                "contact-stagger-item contact-trust-strip-item",
                staggerStyle(index),
              )}
              {index < CONTACT_TRUST_ITEMS.length - 1 ? <div className="contact-trust-strip-divider" /> : null}
            </div>
          ))}
        </div>
      </section>

      <div className="contact-fade-up contact-areas-wrap">
        <SharedAreasSection data={areasWithFallbackNote} />
      </div>

            {office ? (
        <section className="contact-location-section">
          <div className="contact-location-inner">
            <div className="contact-fade-up contact-location-header text-center">
              {label((office?.eyebrow || "Visit Us").toUpperCase(), true)}
              <h2>{officeParts.before}<span className="text-[#c89b5b]">{officeParts.accent}</span>{officeParts.after}</h2>
            </div>
            <div className="contact-fade-up contact-reveal-stagger contact-location-grid">
              <div className="contact-details-col">
                <div className="contact-stagger-item contact-detail-item" style={staggerStyle(0)}>
                  <div className="contact-detail-icon">
                    <MapPin />
                  </div>
                  <div className="contact-detail-text">
                    <h4>Headquarters</h4>
                    {office?.address ? <p>{office.address}</p> : null}
                  </div>
                </div>

                <div className="contact-stagger-item contact-detail-item" style={staggerStyle(1)}>
                  <div className="contact-detail-icon">
                    <Clock3 />
                  </div>
                  <div className="contact-detail-text">
                    <h4>Business Hours</h4>
                    <div className="hours-table">
                      {parsedBusinessHours.map((item) => (
                        <div key={`${item.day}-${item.time}`} className="hours-row">
                          <span className="day">{item.day}</span>
                          <span>{item.time || "Closed"}</span>
                        </div>
                      ))}
                    </div>
                    <span className={cls("hours-status", officeOpenNow ? "is-open" : "is-closed")}>{officeOpenNow ? "Open Now" : "Closed"}</span>
                  </div>
                </div>

                <div className="contact-stagger-item contact-detail-item" style={staggerStyle(2)}>
                  <div className="contact-detail-icon">
                    <Phone />
                  </div>
                  <div className="contact-detail-text">
                    <h4>Phone</h4>
                    {newHavenPhone ? <p>New Haven County: <a href={`tel:${String(newHavenPhone).replace(/\D/g, "")}`}>{newHavenPhone}</a></p> : null}
                    {fairfieldPhone ? <p>Fairfield County: <a href={`tel:${String(fairfieldPhone).replace(/\D/g, "")}`}>{fairfieldPhone}</a></p> : null}
                    {!newHavenPhone && !fairfieldPhone && officePhoneHref ? <p><a href={officePhoneHref}>{officePhoneText}</a></p> : null}
                  </div>
                </div>

                <div className="contact-stagger-item contact-detail-item" style={staggerStyle(3)}>
                  <div className="contact-detail-icon">
                    <Mail />
                  </div>
                  <div className="contact-detail-text">
                    <h4>Email</h4>
                    {officeEmailHref ? <p><a href={officeEmailHref}>{officeEmailText}</a></p> : <p>{officeEmailText}</p>}
                  </div>
                </div>
              </div>

              <div className="contact-stagger-item contact-map-col" style={staggerStyle(4)}>
                <iframe src={officeMap} title={office?.title || "BuiltWell CT office map"} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
              </div>
            </div>

            <div className="contact-fade-up fairfield-note">
              <p><strong>Fairfield County:</strong> {fairfieldLine}</p>
            </div>
          </div>
        </section>
      ) : null}

      {/* In-Person vs Remote consultation cards section removed — the unified
          ConsultationModal now exposes both paths from a single CTA. */}

      <section className="bg-[#f5f1e9] px-5 pb-16 md:px-10 md:pb-24">
        <div className="mx-auto max-w-[1240px]">
          <div className="contact-fade-up mb-10 text-center">
            {label(expectIntro?.eyebrow || "After You Reach Out")}
            <h2 className="text-[clamp(32px,3.5vw,48px)] font-bold tracking-[-0.02em]">{expectParts.before}{expectParts.accent ? <span className="text-[#bc9155]">{expectParts.accent}</span> : null}{expectParts.after}</h2>
            {expectIntro?.content || expectIntro?.body ? <p className="mx-auto mt-3 max-w-[720px] text-[15px] leading-[1.8] text-[#5c677d]">{expectIntro?.content || expectIntro?.body}</p> : null}
          </div>
          <div className="contact-fade-up contact-reveal-stagger contact-expect-grid">
            {expectCards.map((item: any, index: number) => (
              <article key={`${item.title || "expect"}-${index}`} style={staggerStyle(index)} className="contact-stagger-item contact-expect-step">
                <div className="contact-expect-step-num">{index + 1}</div>
                <h4>{item.title}</h4>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <div className="contact-fade-up contact-greensky-wrap">
        <SharedFinancingStrip data={financing} />
      </div>

            {scheduleOpen ? <div className="contact-schedule-overlay fixed inset-0 z-50 flex items-center justify-center bg-[#151e30]/70 backdrop-blur-sm" onMouseDown={(event) => { if (event.target === event.currentTarget) setScheduleOpen(false); }}><div className="contact-schedule-modal max-h-[90vh] w-[92%] max-w-[640px] overflow-y-auto rounded-[12px] bg-white shadow-[0_24px_80px_rgba(0,0,0,0.3)]"><div className="contact-schedule-header relative rounded-t-[12px] bg-[#1e2b43] px-8 py-7 text-center text-white"><h3 className="contact-schedule-title text-[24px] font-bold">Schedule a <span className="text-[#bc9155]">Free Consultation</span></h3><p className="mt-1 text-[14px] text-white/65">No charge, no obligation. Pick a time that works for you.</p><button type="button" onClick={() => setScheduleOpen(false)} className="contact-schedule-close absolute right-5 top-5 bg-transparent p-1 text-[24px] leading-none text-white/60 transition-colors duration-200 hover:text-white" aria-label="Close schedule modal">&times;</button></div><div className="contact-schedule-body p-8"><div className="contact-schedule-tabs mb-7 grid gap-3 sm:grid-cols-2"><button type="button" onClick={() => { if (!isSaturday) { setScheduleMode("in-person"); setSelectedSlot(""); } }} className={cls("contact-schedule-tab rounded-[8px] border-2 p-4 text-center transition-all duration-200", scheduleMode === "in-person" ? "border-[#bc9155] bg-[#bc91550f]" : "border-[#1e2b431a] bg-white hover:border-[#bc9155]", isSaturday && "cursor-not-allowed opacity-40")}><Home className="mx-auto mb-2 h-7 w-7 text-[#bc9155]" /><h4 className="text-[15px] font-semibold text-[#1e2b43]">In-Person Visit</h4><p className="mt-1 text-[12px] text-[#5c677d]">We come to your home<br />Mon-Fri, 8am - 4pm<br />2-hour windows</p></button><button type="button" onClick={() => { setScheduleMode("remote"); setScheduleCounty(null); setSelectedSlot(""); }} className={cls("contact-schedule-tab rounded-[8px] border-2 p-4 text-center transition-all duration-200", scheduleMode === "remote" ? "border-[#bc9155] bg-[#bc91550f]" : "border-[#1e2b431a] bg-white hover:border-[#bc9155]")}><Monitor className="mx-auto mb-2 h-7 w-7 text-[#bc9155]" /><h4 className="text-[15px] font-semibold text-[#1e2b43]">Google Meet</h4><p className="mt-1 text-[12px] text-[#5c677d]">Video call from anywhere<br />Mon-Fri 8am-6pm, Sat 9am-3pm<br />1-hour windows</p></button></div>

            {scheduleMode === "in-person" ? <div className="mb-6"><label className="mb-2.5 block text-[13px] font-semibold uppercase tracking-[0.04em] text-[#1e2b43]">Which county?</label><div className="contact-schedule-county grid gap-3 sm:grid-cols-2"><button type="button" onClick={() => setScheduleCounty("fairfield")} className={cls("rounded-[6px] border px-3 py-3 text-[14px] font-medium transition-colors duration-200", scheduleCounty === "fairfield" ? "border-[#bc9155] bg-[#bc9155] text-white" : "border-[#1e2b431f] text-[#1e2b43] hover:border-[#bc9155]")}>Fairfield County</button><button type="button" onClick={() => setScheduleCounty("new-haven")} className={cls("rounded-[6px] border px-3 py-3 text-[14px] font-medium transition-colors duration-200", scheduleCounty === "new-haven" ? "border-[#bc9155] bg-[#bc9155] text-white" : "border-[#1e2b431f] text-[#1e2b43] hover:border-[#bc9155]")}>New Haven County</button></div></div> : null}

            <div className="mb-6"><label htmlFor="schedule-date" className="mb-2 block text-[13px] font-semibold uppercase tracking-[0.04em] text-[#1e2b43]">Select a Date</label><input id="schedule-date" type="date" min={tomorrow} value={scheduleDate} onChange={(event) => onScheduleDateChange(event.target.value)} className="w-full rounded-[4px] border border-[#1e2b4326] px-4 py-3 text-[15px] text-[#1e2b43] outline-none transition-colors duration-200 focus:border-[#bc9155]" /></div>

            <div className="mb-6"><label className="mb-2.5 block text-[13px] font-semibold uppercase tracking-[0.04em] text-[#1e2b43]">Available Times</label>{isSunday ? <p className="rounded-[6px] border border-[#1e2b431f] px-4 py-4 text-center text-[14px] text-[#5c677d]">We are closed on Sundays. Please choose a weekday or Saturday.</p> : (scheduleMode === "in-person" && isSaturday) ? <p className="rounded-[6px] border border-[#1e2b431f] px-4 py-4 text-center text-[14px] text-[#5c677d]">In-person visits are not available on Saturdays. Please select a weekday or choose Google Meet.</p> : <div className="contact-schedule-slots grid grid-cols-2 gap-2">{availableSlots.map((slot) => <button key={slot} type="button" onClick={() => setSelectedSlot(slot)} className={cls("rounded-[6px] border px-3 py-3 text-center text-[14px] font-medium transition-all duration-200", selectedSlot === slot ? "border-[#bc9155] bg-[#bc9155] text-white" : "border-[#1e2b431f] text-[#1e2b43] hover:border-[#bc9155] hover:bg-[#bc91550f]")}>{slot}</button>)}</div>}</div>

            <div className="mb-3 grid gap-3 sm:grid-cols-2"><div><label className="mb-1.5 block text-[13px] font-semibold uppercase tracking-[0.04em] text-[#1e2b43]">Your Name</label><input type="text" value={scheduleValues.name} onChange={(event) => setScheduleValues((current) => ({ ...current, name: event.target.value }))} placeholder="Full name" className="w-full rounded-[6px] border border-[#1e2b4326] px-3.5 py-3 text-[15px] text-[#1e2b43] outline-none transition-colors duration-200 focus:border-[#bc9155]" /></div><div><label className="mb-1.5 block text-[13px] font-semibold uppercase tracking-[0.04em] text-[#1e2b43]">Phone Number</label><input type="tel" value={scheduleValues.phone} onChange={(event) => setScheduleValues((current) => ({ ...current, phone: event.target.value }))} placeholder="(203) 000-0000" className="w-full rounded-[6px] border border-[#1e2b4326] px-3.5 py-3 text-[15px] text-[#1e2b43] outline-none transition-colors duration-200 focus:border-[#bc9155]" /></div></div>

            <div className="mb-6 grid gap-3 sm:grid-cols-2"><div><label className="mb-1.5 block text-[13px] font-semibold uppercase tracking-[0.04em] text-[#1e2b43]">Email</label><input type="email" value={scheduleValues.email} onChange={(event) => setScheduleValues((current) => ({ ...current, email: event.target.value }))} placeholder="you@email.com" className="w-full rounded-[6px] border border-[#1e2b4326] px-3.5 py-3 text-[15px] text-[#1e2b43] outline-none transition-colors duration-200 focus:border-[#bc9155]" /></div><div><label className="mb-1.5 block text-[13px] font-semibold uppercase tracking-[0.04em] text-[#1e2b43]">Zip Code</label><input type="text" pattern="[0-9]{5}" maxLength={5} value={scheduleValues.zip} onChange={(event) => setScheduleValues((current) => ({ ...current, zip: event.target.value }))} placeholder="06477" className="w-full rounded-[6px] border border-[#1e2b4326] px-3.5 py-3 text-[15px] text-[#1e2b43] outline-none transition-colors duration-200 focus:border-[#bc9155]" /></div></div>

            <button type="button" onClick={onScheduleSubmit} className="w-full rounded-[4px] bg-[#bc9155] px-4 py-4 text-[16px] font-semibold text-white transition-colors duration-200 hover:bg-[#a57d48]">Confirm Consultation</button>
            <p className="mt-4 text-center text-[13px] italic text-[#5c677d]">We&apos;ll send a confirmation to your email within 24 hours.</p>
          </div></div></div> : null}

      <style jsx global>{`
        [data-contact-page] {
          --contact-hover-fast: 0.22s;
          --contact-hover-mid: 0.35s;
          --contact-hover-ease: cubic-bezier(0.4, 0, 0.2, 1);
          --contact-lift-sm: -2px;
          --contact-lift-md: -4px;
          --contact-lift-lg: -6px;
          --contact-card-shadow-hover: 0 12px 28px rgba(30, 43, 67, 0.1), 0 28px 56px rgba(30, 43, 67, 0.12);
        }

        [data-contact-page] .contact-fade-up {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }

        [data-contact-page] .contact-fade-up.contact-fade-up-visible {
          opacity: 1;
          transform: translateY(0);
        }

        [data-contact-page] .contact-reveal-stagger .contact-stagger-item {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.7s ease, transform 0.7s ease;
          transition-delay: calc(var(--contact-stagger-index, 0) * 90ms + 40ms);
        }

        [data-contact-page] .contact-reveal-stagger.contact-fade-up-visible .contact-stagger-item {
          opacity: 1;
          transform: translateY(0);
        }

        [data-contact-page] .contact-lead-wrap .bw-cta-header,
        [data-contact-page] .contact-lead-wrap .bw-cta-images .bw-cta-img-wrap,
        [data-contact-page] .contact-lead-wrap .bw-contact-form-wrap,
        [data-contact-page] .contact-areas-wrap .bw-area-card,
        [data-contact-page] .contact-greensky-wrap .bw-financing-strip-inner {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }

        [data-contact-page] .contact-lead-wrap.contact-fade-up-visible .bw-cta-header,
        [data-contact-page] .contact-lead-wrap.contact-fade-up-visible .bw-cta-images .bw-cta-img-wrap,
        [data-contact-page] .contact-lead-wrap.contact-fade-up-visible .bw-contact-form-wrap,
        [data-contact-page] .contact-areas-wrap.contact-fade-up-visible .bw-area-card,
        [data-contact-page] .contact-greensky-wrap.contact-fade-up-visible .bw-financing-strip-inner {
          opacity: 1;
          transform: translateY(0);
        }

        [data-contact-page] .contact-lead-wrap.contact-fade-up-visible .bw-cta-images .bw-cta-img-wrap:nth-child(1),
        [data-contact-page] .contact-areas-wrap.contact-fade-up-visible .bw-area-card:nth-child(1) {
          transition-delay: 100ms;
        }

        [data-contact-page] .contact-lead-wrap.contact-fade-up-visible .bw-cta-images .bw-cta-img-wrap:nth-child(2),
        [data-contact-page] .contact-areas-wrap.contact-fade-up-visible .bw-area-card:nth-child(2) {
          transition-delay: 180ms;
        }

        [data-contact-page] .contact-lead-wrap.contact-fade-up-visible .bw-contact-form-wrap {
          transition-delay: 220ms;
        }

        [data-contact-page] .contact-page-hero a,
        [data-contact-page] .contact-page-hero button,
        [data-contact-page] .contact-lead-wrap a,
        [data-contact-page] .contact-lead-wrap button,
        [data-contact-page] .contact-areas-wrap a,
        [data-contact-page] .contact-areas-wrap button,
        [data-contact-page] .contact-location-section a,
        [data-contact-page] .contact-location-section button,
        [data-contact-page] .contact-trust-strip a,
        [data-contact-page] .contact-greensky-wrap a,
        [data-contact-page] .contact-greensky-wrap button,
        [data-contact-page] .contact-consult-card button,
        [data-contact-page] .contact-schedule-modal button {
          transition:
            color var(--contact-hover-fast) ease,
            background-color var(--contact-hover-fast) ease,
            border-color var(--contact-hover-fast) ease,
            box-shadow var(--contact-hover-mid) var(--contact-hover-ease),
            transform var(--contact-hover-mid) var(--contact-hover-ease);
        }

        [data-contact-page] .contact-areas-wrap .bw-areas-note {
          margin-top: 32px;
          text-align: center;
          font-size: 14px;
          color: #5c677d;
        }

        [data-contact-page] .contact-areas-wrap .bw-areas-note a {
          color: #bc9155;
          font-weight: 600;
          text-decoration: underline;
        }

        [data-contact-page] .contact-areas-wrap .bw-areas-note a:hover {
          color: #9a7340;
        }

        [data-contact-page] .contact-location-section {
          background: #1e2b43;
          padding: 56px 40px 0;
          position: relative;
        }

        [data-contact-page] .contact-location-inner {
          max-width: 1200px;
          margin: 0 auto;
        }

        [data-contact-page] .contact-location-header {
          margin-bottom: 64px;
        }

        [data-contact-page] .contact-location-header h2 {
          color: #fff;
          font-family: "Playfair Display", serif;
          font-size: clamp(42px, 3.8vw, 56px);
          line-height: 1.1;
          letter-spacing: -0.02em;
          font-weight: 700;
        }

        [data-contact-page] .contact-location-grid {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 48px;
          align-items: stretch;
        }

        [data-contact-page] .contact-details-col {
          display: flex;
          flex-direction: column;
          gap: 0;
          padding: 0 0 36px;
        }

        [data-contact-page] .contact-detail-item {
          display: grid;
          grid-template-columns: 42px 1fr;
          gap: 16px;
          align-items: start;
          padding: 18px 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.07);
        }

        [data-contact-page] .contact-detail-item:last-of-type {
          border-bottom: none;
        }

        [data-contact-page] .contact-detail-icon {
          width: 42px;
          height: 42px;
          background: rgba(188, 145, 85, 0.1);
          border: 1px solid rgba(188, 145, 85, 0.18);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #bc9155;
          flex-shrink: 0;
          transition: transform var(--contact-hover-mid) var(--contact-hover-ease), border-color var(--contact-hover-fast) ease, background-color var(--contact-hover-fast) ease;
        }

        [data-contact-page] .contact-detail-icon :global(svg) {
          width: 18px;
          height: 18px;
          stroke-width: 1.9;
        }

        [data-contact-page] .contact-detail-text h4 {
          font-family: "Inter", sans-serif;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1.2px;
          margin-bottom: 4px;
          color: #bc9155;
        }

        [data-contact-page] .contact-detail-text p {
          font-size: 15px;
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.6;
          margin: 0;
        }

        [data-contact-page] .contact-detail-text p + p {
          margin-top: 2px;
        }

        [data-contact-page] .contact-detail-text a {
          color: #fff;
          font-weight: 600;
        }

        [data-contact-page] .contact-detail-text a:hover {
          color: #bc9155;
        }

        [data-contact-page] .hours-table {
          display: grid;
          gap: 4px;
        }

        [data-contact-page] .hours-row {
          display: grid;
          grid-template-columns: 140px 1fr;
          font-size: 14px;
          color: rgba(255, 255, 255, 0.55);
          column-gap: 12px;
        }

        [data-contact-page] .hours-row .day {
          font-weight: 600;
          color: rgba(255, 255, 255, 0.86);
        }

        [data-contact-page] .hours-status {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          font-weight: 600;
          margin-top: 8px;
          letter-spacing: 0.3px;
        }

        [data-contact-page] .hours-status::before {
          content: "";
          width: 7px;
          height: 7px;
          border-radius: 50%;
          animation: contact-pulse-dot 2s ease-in-out infinite;
        }

        [data-contact-page] .hours-status.is-open {
          color: #5cb85c;
        }

        [data-contact-page] .hours-status.is-open::before {
          background: #5cb85c;
        }

        [data-contact-page] .hours-status.is-closed {
          color: #e74c3c;
        }

        [data-contact-page] .hours-status.is-closed::before {
          background: #e74c3c;
        }

        @keyframes contact-pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.8); }
        }

        [data-contact-page] .contact-map-col {
          border-radius: 12px;
          overflow: hidden;
          min-height: 400px;
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.25);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        [data-contact-page] .contact-map-col iframe {
          width: 100%;
          height: 100%;
          min-height: 400px;
          display: block;
          border: 0;
        }

        [data-contact-page] .fairfield-note {
          border-top: 1px solid rgba(255, 255, 255, 0.07);
          padding: 20px 0 24px;
        }

        [data-contact-page] .fairfield-note p {
          margin: 0;
          font-size: 15px;
          color: rgba(255, 255, 255, 0.45);
          line-height: 1.7;
        }

        [data-contact-page] .fairfield-note strong {
          color: #bc9155;
          font-weight: 700;
        }

        [data-contact-page] .contact-consult-card {
          background: #fff;
          border-radius: 8px;
          padding: 32px;
          border-bottom: 2px solid transparent;
          box-shadow: 0 2px 12px rgba(30, 43, 67, 0.06), 0 1px 3px rgba(30, 43, 67, 0.04);
          transition: all var(--contact-hover-mid) var(--contact-hover-ease);
          display: flex;
          flex-direction: column;
        }

        [data-contact-page] .contact-consult-card:hover {
          transform: translateY(var(--contact-lift-md));
          border-bottom-color: #bc9155;
          box-shadow: var(--contact-card-shadow-hover);
        }

        [data-contact-page] .contact-reveal-stagger.contact-fade-up-visible .contact-stagger-item.contact-consult-card:hover {
          transform: translateY(var(--contact-lift-md));
        }

        [data-contact-page] .contact-consult-card-icon {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: rgba(188, 145, 85, 0.12);
          border: 2px solid #bc9155;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
          color: #bc9155;
          transition: transform var(--contact-hover-mid) var(--contact-hover-ease), box-shadow var(--contact-hover-mid) var(--contact-hover-ease);
        }

        [data-contact-page] .contact-consult-card:hover .contact-consult-card-icon {
          transform: translateY(var(--contact-lift-sm));
          box-shadow: 0 8px 18px rgba(188, 145, 85, 0.22);
        }

        [data-contact-page] .contact-consult-card h3 {
          font-size: 20px;
          margin-bottom: 12px;
          font-weight: 700;
        }

        [data-contact-page] .contact-consult-card p {
          font-size: 15px;
          color: #5c677d;
          line-height: 1.7;
          margin-bottom: 20px;
        }

        [data-contact-page] .contact-consult-card-btn {
          margin-top: auto;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 200px;
          border: none;
          border-radius: 4px;
          background: #bc9155;
          color: #fff;
          font-size: 14px;
          font-weight: 600;
          padding: 14px 32px;
          transition:
            background-color var(--contact-hover-fast) ease,
            transform var(--contact-hover-mid) var(--contact-hover-ease),
            box-shadow var(--contact-hover-mid) var(--contact-hover-ease);
          cursor: pointer;
        }

        [data-contact-page] .contact-consult-card-btn:hover {
          background: #9a7340;
          transform: translateY(var(--contact-lift-sm));
          box-shadow: 0 4px 12px rgba(188, 145, 85, 0.3);
        }

        [data-contact-page] .contact-expect-step {
          text-align: center;
          padding: 28px 16px 32px;
          background: #fff;
          border-radius: 8px;
          border-bottom: 2px solid transparent;
          box-shadow: 0 2px 12px rgba(30, 43, 67, 0.06);
          transition: all var(--contact-hover-mid) var(--contact-hover-ease);
        }

        [data-contact-page] .contact-expect-step:hover {
          transform: translateY(-6px);
          border-bottom-color: #bc9155;
          box-shadow: 0 12px 28px rgba(30, 43, 67, 0.1), 0 28px 56px rgba(30, 43, 67, 0.08);
        }

        [data-contact-page] .contact-reveal-stagger.contact-fade-up-visible .contact-stagger-item.contact-expect-step:hover {
          transform: translateY(-6px);
        }

        [data-contact-page] .contact-expect-step-num {
          width: 52px;
          height: 52px;
          border-radius: 50%;
          background: rgba(188, 145, 85, 0.12);
          border: 2px solid #bc9155;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 16px;
          font-family: "Playfair Display", serif;
          font-size: 20px;
          font-weight: 700;
          color: #bc9155;
          transition: transform var(--contact-hover-mid) var(--contact-hover-ease), box-shadow var(--contact-hover-mid) var(--contact-hover-ease);
        }

        [data-contact-page] .contact-expect-step:hover .contact-expect-step-num {
          transform: translateY(var(--contact-lift-sm));
          box-shadow: 0 8px 18px rgba(188, 145, 85, 0.22);
        }

        [data-contact-page] .contact-expect-step h4 {
          font-size: 17px;
          margin-bottom: 10px;
          font-family: "Playfair Display", serif;
          font-weight: 700;
          color: #1e2b43;
        }

        [data-contact-page] .contact-expect-step p {
          font-size: 14px;
          color: #5c677d;
          line-height: 1.65;
          margin: 0;
        }

        [data-contact-page] .contact-expect-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
        }

        [data-contact-page] .contact-multiselect-checkbox {
          -webkit-appearance: none;
          appearance: none;
          width: 18px;
          height: 18px;
          min-width: 18px;
          min-height: 18px;
          margin: 0;
          padding: 0;
          border: 2px solid rgba(30, 43, 67, 0.25);
          border-radius: 3px;
          background: #fff;
          position: relative;
          cursor: pointer;
          flex-shrink: 0;
        }

        [data-contact-page] .contact-multiselect-checkbox:checked {
          background: #bc9155;
          border-color: #bc9155;
        }

        [data-contact-page] .contact-multiselect-checkbox:checked::after {
          content: "";
          position: absolute;
          left: 5px;
          top: 2px;
          width: 5px;
          height: 9px;
          border: solid #fff;
          border-width: 0 2px 2px 0;
          transform: rotate(45deg);
        }

        [data-contact-page] .contact-page-hero > div:first-child {
          opacity: 0.72;
        }

        [data-contact-page] .contact-trust-strip {
          background: linear-gradient(135deg, #1e2b43 0%, #151e30 100%);
          padding: 56px 40px;
          position: relative;
          overflow: hidden;
        }

        [data-contact-page] .contact-trust-strip::before {
          content: "";
          position: absolute;
          inset: 0;
          background: url("/hero/builtwell-job-site-aerial-hero-ct.jpg") center/cover no-repeat;
          opacity: 0.06;
        }

        [data-contact-page] .contact-trust-strip-inner {
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

        [data-contact-page] .contact-trust-strip-item {
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
          transition: all var(--contact-hover-mid) var(--contact-hover-ease);
          padding: 20px 32px;
          flex: 1;
          min-width: 180px;
          text-align: center;
        }

        [data-contact-page] .contact-trust-strip-item:hover {
          color: #bc9155;
          transform: translateY(var(--contact-lift-sm));
        }

        [data-contact-page] .contact-reveal-stagger.contact-fade-up-visible .contact-stagger-item.contact-trust-strip-item:hover {
          transform: translateY(var(--contact-lift-sm));
        }

        [data-contact-page] .contact-trust-strip-icon {
          color: #bc9155;
          width: 22px;
          height: 22px;
          filter: drop-shadow(0 2px 4px rgba(188, 145, 85, 0.3));
          display: inline-flex;
          justify-content: center;
          align-items: center;
          transition: transform var(--contact-hover-mid) var(--contact-hover-ease), filter var(--contact-hover-mid) var(--contact-hover-ease);
        }

        [data-contact-page] .contact-trust-strip-icon :global(svg) {
          width: 22px;
          height: 22px;
        }

        [data-contact-page] .contact-trust-strip-divider {
          width: 1px;
          height: 40px;
          background: rgba(255, 255, 255, 0.1);
          flex-shrink: 0;
        }

        [data-contact-page] .contact-trust-strip-item:hover .contact-trust-strip-icon {
          transform: translateY(var(--contact-lift-sm));
          filter: drop-shadow(0 6px 12px rgba(188, 145, 85, 0.36));
        }

        [data-contact-page] .contact-detail-item:hover .contact-detail-icon {
          transform: translateY(var(--contact-lift-sm));
          background: rgba(188, 145, 85, 0.14);
          border-color: rgba(188, 145, 85, 0.3);
        }

        [data-contact-page] .contact-lead-wrap .bw-form-submit:hover,
        [data-contact-page] .contact-greensky-wrap .bw-financing-strip-cta:hover {
          transform: translateY(var(--contact-lift-sm));
        }

        [data-contact-page] .contact-areas-wrap .bw-area-card {
          transition: all var(--contact-hover-mid) var(--contact-hover-ease);
        }

        [data-contact-page] .contact-areas-wrap .bw-area-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 16px 40px rgba(30, 43, 67, 0.1), 0 32px 64px rgba(30, 43, 67, 0.08);
        }

        [data-contact-page] .contact-areas-wrap .bw-area-town,
        [data-contact-page] .contact-areas-wrap .bw-area-towns-toggle,
        [data-contact-page] .contact-areas-wrap .bw-area-link,
        [data-contact-page] .contact-areas-wrap .bw-areas-subtitle-link,
        [data-contact-page] .contact-lead-wrap .bw-form-consent-link {
          transition:
            color var(--contact-hover-fast) ease,
            background-color var(--contact-hover-fast) ease,
            border-color var(--contact-hover-fast) ease,
            gap var(--contact-hover-mid) var(--contact-hover-ease);
        }

        [data-contact-page] .contact-greensky-wrap .bw-financing-strip-cta {
          transition:
            background-color var(--contact-hover-fast) ease,
            transform var(--contact-hover-mid) var(--contact-hover-ease),
            box-shadow var(--contact-hover-mid) var(--contact-hover-ease);
        }

        @media (hover: hover) and (pointer: fine) {
          [data-contact-page] .contact-lead-wrap .bw-form-submit:hover,
          [data-contact-page] .contact-greensky-wrap .bw-financing-strip-cta:hover {
            transform: translateY(var(--contact-lift-sm));
          }
        }

        [data-contact-page] .contact-schedule-title {
          font-family: "Playfair Display", serif;
          line-height: 1.15;
        }

        [data-contact-page] .contact-schedule-close {
          width: 28px;
          height: 28px;
          border: none;
          cursor: pointer;
        }

        @media (max-width: 1024px) {
          [data-contact-page] .contact-expect-grid {
            grid-template-columns: repeat(4, 1fr);
            gap: 20px;
          }

          [data-contact-page] .contact-location-grid {
            grid-template-columns: 1fr;
            gap: 24px;
          }

          [data-contact-page] .contact-location-header {
            margin-bottom: 44px;
          }

          [data-contact-page] .contact-details-col {
            padding-bottom: 12px;
          }
        }

        @media (max-width: 768px) {
          [data-contact-page] .contact-fade-up {
            transform: translateY(20px);
          }

          [data-contact-page] .contact-page-hero {
            min-height: 40vh;
            padding-top: 52px;
            padding-bottom: 36px;
          }

          [data-contact-page] .contact-trust-strip {
            padding: 32px 20px;
          }

          [data-contact-page] .contact-trust-strip-inner {
            gap: 0;
            flex-wrap: wrap;
          }

          [data-contact-page] .contact-trust-strip-item {
            padding: 16px 12px;
            min-width: 33.33%;
            font-size: 11px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
          }

          [data-contact-page] .contact-trust-strip-icon,
          [data-contact-page] .contact-trust-strip-icon :global(svg) {
            width: 18px;
            height: 18px;
          }

          [data-contact-page] .contact-trust-strip-divider {
            display: none;
          }

          [data-contact-page] .contact-expect-grid {
            grid-template-columns: 1fr 1fr;
            gap: 24px;
          }

          [data-contact-page] .contact-location-section {
            padding: 48px 20px 0;
          }

          [data-contact-page] .contact-location-header {
            margin-bottom: 34px;
          }

          [data-contact-page] .contact-location-header h2 {
            font-size: clamp(34px, 8.6vw, 44px);
          }

          [data-contact-page] .contact-map-col,
          [data-contact-page] .contact-map-col iframe {
            min-height: 280px;
          }

          [data-contact-page] .hours-row {
            grid-template-columns: 130px 1fr;
          }

          [data-contact-page] .fairfield-note {
            padding: 14px 0 20px;
          }

          [data-contact-page] .fairfield-note p {
            font-size: 14px;
          }

          [data-contact-page] .contact-schedule-overlay {
            align-items: stretch;
          }

          [data-contact-page] .contact-schedule-modal {
            width: 100%;
            max-width: 100%;
            height: 100%;
            max-height: 100vh;
            border-radius: 0;
            display: flex;
            flex-direction: column;
          }

          [data-contact-page] .contact-schedule-header {
            padding: 20px;
            border-radius: 0;
            flex-shrink: 0;
          }

          [data-contact-page] .contact-schedule-title {
            font-size: 20px;
          }

          [data-contact-page] .contact-schedule-close {
            top: 14px;
            right: 14px;
            width: 44px;
            height: 44px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 28px;
          }

          [data-contact-page] .contact-schedule-body {
            padding: 20px;
            flex: 1;
            overflow-y: auto;
            -webkit-overflow-scrolling: touch;
          }

          [data-contact-page] .contact-schedule-tabs {
            grid-template-columns: 1fr;
            gap: 10px;
            margin-bottom: 20px;
          }

          [data-contact-page] .contact-schedule-tab {
            padding: 14px;
          }

          [data-contact-page] .contact-schedule-tab h4 {
            font-size: 14px;
          }

          [data-contact-page] .contact-schedule-tab p {
            font-size: 11px;
          }

          [data-contact-page] .contact-schedule-county {
            grid-template-columns: 1fr;
            gap: 10px;
          }

          [data-contact-page] .contact-schedule-slots {
            grid-template-columns: 1fr 1fr;
            gap: 8px;
          }

          [data-contact-page] .contact-schedule-slots button {
            min-height: 44px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 13px;
          }
        }

        @media (max-width: 480px) {
          [data-contact-page] .contact-page-hero {
            min-height: 35vh;
            padding-left: 16px;
            padding-right: 16px;
            padding-bottom: 32px;
          }

          [data-contact-page] .contact-expect-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }

          [data-contact-page] .contact-location-section {
            padding: 36px 16px 0;
          }

          [data-contact-page] .contact-location-header {
            margin-bottom: 30px;
          }

          [data-contact-page] .contact-location-header h2 {
            font-size: clamp(32px, 10vw, 40px);
          }

          [data-contact-page] .hours-row {
            grid-template-columns: 1fr;
            gap: 2px;
          }

          [data-contact-page] .contact-schedule-header {
            padding: 20px 16px;
          }

          [data-contact-page] .contact-schedule-title {
            font-size: 18px;
          }

          [data-contact-page] .contact-schedule-body {
            padding: 20px 16px;
          }

          [data-contact-page] .contact-schedule-slots {
            grid-template-columns: 1fr;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          [data-contact-page] .contact-fade-up {
            opacity: 1;
            transform: none;
            transition: none;
          }

          [data-contact-page] .contact-reveal-stagger .contact-stagger-item,
          [data-contact-page] .contact-lead-wrap .bw-cta-header,
          [data-contact-page] .contact-lead-wrap .bw-cta-images .bw-cta-img-wrap,
          [data-contact-page] .contact-lead-wrap .bw-contact-form-wrap,
          [data-contact-page] .contact-areas-wrap .bw-area-card,
          [data-contact-page] .contact-greensky-wrap .bw-financing-strip-inner {
            opacity: 1;
            transform: none;
            transition: none;
          }

          [data-contact-page] .contact-trust-strip-item,
          [data-contact-page] .contact-trust-strip-item:hover {
            transform: none;
            text-shadow: none;
          }

          [data-contact-page] .contact-trust-strip-item:hover .contact-trust-strip-icon,
          [data-contact-page] .contact-trust-strip-icon:hover {
            transform: none;
          }
        }
      `}</style>
    </div>
  );
}



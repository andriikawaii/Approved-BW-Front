"use client";

import Link from "next/link";
import { useEffect, type CSSProperties } from "react";
import type { CMSPage } from "@/types/cms";
import { parts, label, linkNode, media, section, sections, LeadFormSection } from "./template-utils";
import { usePageData } from "@/src/context/PageDataContext";

const fallbackTopTrust = [
  { value: "15+", label: "Years of Experience" },
  { value: "100+", label: "Completed Projects" },
  { value: "4.9", label: "Google Rating", url: "https://www.google.com/maps/search/?api=1&query=BuiltWell+CT,+206A+Boston+Post+Road,+Orange,+CT+06477" },
  { icon: "shield", label: "Fully Bonded and Insured" },
];

const fallbackTrustStrip = [
  { icon: "star", label: "Google Rating 4.9", url: "https://www.google.com/search?q=builtwell+ct+reviews" },
  { icon: "verified", label: "Trusted on Houzz", url: "https://www.houzz.com/professionals/general-contractors/builtwell-ct" },
  { icon: "calendar", label: "CT HIC License #0668405", url: "https://www.elicense.ct.gov/Lookup/LicenseLookup.aspx" },
  { icon: "verified", label: "Verified on Angi", url: "https://www.angi.com/companylist/us/ct/orange/builtwell-ct-reviews-" },
];

const fallbackGalleries = [
  {
    eyebrow: "Before and After",
    title: "Kitchen Remodeling in CT",
    title_highlight: "in CT",
    subtitle:
      "BuiltWell CT has completed 3 kitchen remodeling projects shown here, ranging from $28,000 to $65,000, with timelines of 3 to 6 weeks across Fairfield and New Haven Counties. Our kitchen renovations include cabinet replacement, countertop installation, and complete gut remodels with layout changes.",
    items: [
      { image: "/images/before-after/kitchen-before-after-1.jpg", alt: "BuiltWell CT kitchen remodeling in New Canaan, Connecticut" },
      { image: "/images/before-after/kitchen-before-after-2.jpg", alt: "BuiltWell CT kitchen renovation in Milford, Connecticut" },
      { image: "/images/before-after/kitchen-before-after-3.jpg", alt: "BuiltWell CT luxury kitchen remodel in Westport, Connecticut" },
    ],
  },
  {
    eyebrow: "Before and After",
    title: "Bathroom Remodeling in CT",
    title_highlight: "in CT",
    subtitle:
      "BuiltWell CT has completed 3 bathroom remodeling projects shown here, ranging from $15,000 to $42,000, with timelines of 2 to 4 weeks in towns like Westport, Hamden, and New Canaan. Our bathroom renovations include tile, vanities, showers, tubs, and plumbing upgrades for Connecticut homeowners.",
    items: [
      { image: "/images/before-after/bathroom-renovation-1.jpg", alt: "BuiltWell CT primary bathroom remodel in Westport, Connecticut" },
      { image: "/images/before-after/bathroom-renovation-2.jpg", alt: "BuiltWell CT bathroom renovation in Hamden, Connecticut" },
      { image: "/images/before-after/bathroom-renovation-3.jpg", alt: "BuiltWell CT guest bathroom update in Fairfield, Connecticut" },
    ],
  },
  {
    eyebrow: "Before and After",
    title: "Basement Finishing in CT",
    title_highlight: "in CT",
    subtitle:
      "BuiltWell CT has completed 3 basement finishing projects shown here, ranging from $22,000 to $55,000, with timelines of 4 to 8 weeks in Darien, Orange, and Norwalk, Connecticut. Our basement conversions include framing, insulation, electrical, flooring, egress windows, and full finish work.",
    items: [
      { image: "/images/before-after/basement-renovation-1.jpg", alt: "BuiltWell CT basement finishing into playroom in Darien, Connecticut" },
      { image: "/images/before-after/basement-renovation-2.jpg", alt: "BuiltWell CT basement bedroom conversion in Hamden, Connecticut" },
      { image: "/images/before-after/basement-renovation-3.jpg", alt: "BuiltWell CT basement laundry room finishing in Westport, Connecticut" },
    ],
  },
];

function telHref(number: string) {
  return `tel:${number.replace(/\D/g, "")}`;
}

function trustStripIcon(icon?: string) {
  const value = (icon || "").toLowerCase();

  if (value === "star") {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" stroke="none" aria-hidden="true">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    );
  }

  if (value === "calendar") {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <path d="M8 2v4M16 2v4M3 10h18" />
      </svg>
    );
  }

  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

export function PortfolioPageTemplate({ page }: { page: CMSPage }) {
  const { phones } = usePageData();
  const phoneItems = phones ?? [];
  const fairfieldPhone = phoneItems.find((p) => p.label.toLowerCase().includes("fairfield"));
  const newHavenPhone = phoneItems.find((p) => p.label.toLowerCase().includes("new haven"));

  const hero = section<any>(page, "hero");
  const trustBars = sections<any>(page, "trust_bar");
  const topTrustItems = (trustBars[0]?.items || fallbackTopTrust).slice(0, 4);
  const trustStripItems = (trustBars[1]?.items || fallbackTrustStrip).slice(0, 4);
  const galleries = sections<any>(page, "image_gallery");
  const galleryItems = galleries.length > 0 ? galleries : fallbackGalleries;
  const leadForm = section<any>(page, "lead_form");
  const richTexts = sections<any>(page, "rich_text");
  const financing = richTexts.find((r: any) => r.style_variant === "financing_strip");

  const heroTitle = hero?.title || hero?.headline || "Completed Remodeling Projects";
  const hp = parts(heroTitle, hero?.title_highlight || "Projects");
  const heroSubtitle =
    hero?.subtitle ||
    "Browse our completed Connecticut remodeling projects - kitchens, bathrooms, basements, and more (HIC #0668405).";
  const fairfieldNumber = fairfieldPhone?.number || "(203) 919-9616";
  const newHavenNumber = newHavenPhone?.number || "(203) 466-9148";
  const primaryCtaUrl = hero?.cta_primary?.url || "/free-consultation/";
  const primaryCtaLabel = hero?.cta_primary?.label || "Get Your Free Estimate";

  const financingTitle = (financing?.title || "Flexible Financing Available").replace(/\.+$/, "");
  const financingContent = (typeof financing?.content === "string" ? financing.content : "")
    .replace(/<[^>]+>/g, "")
    .trim() || "Get approved in about 60 seconds and start your project today.";
  const financingCtaLabel = financing?.cta?.label || "Check Financing Options";
  const financingCtaUrl = financing?.cta?.url || "https://www.greensky.com";

  useEffect(() => {
    const root = document.querySelector(".bw-portfolio-page");
    if (!root) return;

    root
      .querySelectorAll<HTMLElement>(".bw-cta-header, .bw-cta-left, .bw-contact-form-wrap")
      .forEach((el) => el.classList.add("fade-up"));

    const animated = root.querySelectorAll<HTMLElement>(".fade-up");
    if (animated.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
    );

    animated.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="bw-portfolio-page">
      <style>{`
        .bw-portfolio-page .gold { color: #bc9155; }
        .bw-portfolio-page .section { padding: 100px 40px; }
        .bw-portfolio-page .section-inner { max-width: 1240px; margin: 0 auto; }
        .bw-portfolio-page .section-label {
          display: inline-block;
          font-size: 11px;
          font-weight: 700;
          color: #9a7340;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          margin-bottom: 16px;
          position: relative;
          padding-left: 20px;
        }
        .bw-portfolio-page .section-label::before {
          content: "";
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 10px;
          height: 2px;
          background: #bc9155;
        }
        .bw-portfolio-page .page-hero {
          background: #151e30;
          padding: 120px 40px 48px;
          color: #fff;
          position: relative;
          overflow: hidden;
          min-height: 50vh;
          display: flex;
          align-items: stretch;
          isolation: isolate;
        }
        .bw-portfolio-page .page-hero::after {
          content: "";
          position: absolute;
          inset: 0;
          background: var(--portfolio-hero-image) center 40% / cover no-repeat;
          opacity: 0.72;
          z-index: 0;
        }
        .bw-portfolio-page .page-hero::before {
          content: "";
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse at 97% 97%, rgba(21, 30, 48, 1) 0%, rgba(21, 30, 48, 0.9) 8%, transparent 30%),
            radial-gradient(ellipse at 3% 97%, rgba(21, 30, 48, 0.9) 0%, transparent 25%),
            linear-gradient(180deg, rgba(21, 30, 48, 0.35) 0%, rgba(21, 30, 48, 0.2) 30%, rgba(21, 30, 48, 0.45) 65%, rgba(21, 30, 48, 0.92) 100%);
          z-index: 1;
        }
        .bw-portfolio-page .page-hero-inner {
          max-width: 1240px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          justify-content: center;
        }
        .bw-portfolio-page .hero-breadcrumb {
          display: flex;
          align-items: center;
          gap: 0;
          font-size: 13px;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.92);
          margin-bottom: 20px;
          padding: 0;
          list-style: none;
          text-shadow: 0 1px 6px rgba(0, 0, 0, 0.7);
        }
        .bw-portfolio-page .hero-breadcrumb li { display: flex; align-items: center; }
        .bw-portfolio-page .hero-breadcrumb li + li::before {
          content: "›";
          color: #bc9155;
          margin: 0 10px;
          font-size: 12px;
        }
        .bw-portfolio-page .hero-breadcrumb a { color: rgba(255, 255, 255, 0.85); text-decoration: none; }
        .bw-portfolio-page .hero-breadcrumb a:hover { color: #bc9155; }
        .bw-portfolio-page .hero-breadcrumb .current { color: #fff; font-weight: 600; }
        .bw-portfolio-page .page-hero h1 {
          font-size: clamp(40px, 4.5vw, 56px);
          line-height: 1.08;
          margin-bottom: 12px;
          letter-spacing: -0.5px;
          text-shadow: 0 2px 20px rgba(0, 0, 0, 0.5);
        }
        .bw-portfolio-page .page-hero h1 .gold { color: #bc9155; }
        .bw-portfolio-page .hero-subtitle {
          font-size: 17px;
          color: rgba(255, 255, 255, 0.82);
          line-height: 1.7;
          max-width: 560px;
          margin: 16px auto 0;
          text-align: center;
          font-weight: 400;
        }
        .bw-portfolio-page .hero-ctas {
          display: flex;
          gap: 14px;
          margin-top: 28px;
          justify-content: center;
          align-items: center;
          flex-wrap: wrap;
        }
        .bw-portfolio-page .hero-cta-btn {
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
        }
        .bw-portfolio-page .hero-cta-btn:hover {
          background: rgba(10, 18, 35, 0.62);
          border-color: rgba(255, 255, 255, 0.35);
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
        }
        .bw-portfolio-page .hero-cta-btn.hero-cta-primary {
          background: #bc9155;
          border: 1px solid #bc9155;
          backdrop-filter: none;
        }
        .bw-portfolio-page .hero-cta-btn.hero-cta-primary:hover {
          background: #d4a95a;
          border-color: #d4a95a;
          box-shadow: 0 8px 24px rgba(188, 145, 85, 0.4);
        }
        .bw-portfolio-page .trust-bar {
          background: linear-gradient(135deg, #1e2b43 0%, #151e30 100%);
          border-top: 1px solid rgba(188, 145, 85, 0.2);
          border-bottom: 1px solid rgba(188, 145, 85, 0.2);
        }
        .bw-portfolio-page .trust-bar-inner {
          max-width: 1280px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          text-align: center;
        }
        .bw-portfolio-page .trust-item {
          padding: 36px 20px;
          border-right: 1px solid rgba(188, 145, 85, 0.12);
          transition: background 0.3s, transform 0.3s;
          cursor: default;
          text-decoration: none;
          color: inherit;
        }
        .bw-portfolio-page .trust-item:hover {
          background: rgba(188, 145, 85, 0.08);
          transform: translateY(-3px);
        }
        .bw-portfolio-page .trust-item:hover .trust-number {
          color: #d4a95a;
          text-shadow: 0 0 20px rgba(188, 145, 85, 0.3);
        }
        .bw-portfolio-page .trust-item:hover .trust-label { color: rgba(255, 255, 255, 0.85); }
        .bw-portfolio-page .trust-item:last-child { border-right: none; }
        .bw-portfolio-page .trust-number {
          font-family: "Playfair Display", serif;
          font-size: 42px;
          font-weight: 700;
          color: #bc9155;
          line-height: 1;
          transition: color 0.3s, text-shadow 0.3s;
          min-height: 42px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .bw-portfolio-page .trust-label {
          font-size: 13px;
          color: rgba(255, 255, 255, 0.6);
          margin-top: 8px;
          text-transform: uppercase;
          letter-spacing: 1px;
          font-weight: 500;
          transition: color 0.3s;
        }
        .bw-portfolio-page .gallery-section { background: #fff; }
        .bw-portfolio-page .gallery-group { margin-bottom: 72px; text-align: center; }
        .bw-portfolio-page .gallery-group:last-child { margin-bottom: 0; }
        .bw-portfolio-page .gallery-group h2 {
          font-size: clamp(28px, 3.5vw, 40px);
          margin-bottom: 16px;
          letter-spacing: -0.3px;
          font-family: "Playfair Display", serif;
          line-height: 1.2;
          font-weight: 700;
        }
        .bw-portfolio-page .gallery-group p {
          margin-left: auto;
          margin-right: auto;
          max-width: 700px;
          font-size: 16px;
          color: #5c677d;
          margin-bottom: 32px;
          line-height: 1.7;
        }
        .bw-portfolio-page .gallery-images {
          max-width: 1000px;
          margin: 0 auto;
        }
        .bw-portfolio-page .gallery-img-wrap {
          position: relative;
          border-radius: 10px;
          overflow: hidden;
          margin-bottom: 24px;
          box-shadow: 0 4px 20px rgba(30, 43, 67, 0.1);
        }
        .bw-portfolio-page .gallery-img-wrap:last-child { margin-bottom: 0; }
        .bw-portfolio-page .gallery-img-clip {
          overflow: hidden;
          position: relative;
          height: 300px;
        }
        .bw-portfolio-page .gallery-img-clip img {
          width: 100%;
          height: 100%;
          display: block;
          object-fit: cover;
          transition: transform 0.35s ease;
        }
        .bw-portfolio-page .gallery-img-wrap:hover .gallery-img-clip img {
          transform: scale(1.02);
        }
        .bw-portfolio-page .gallery-img-clip::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 76px;
          background: linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.92) 55%, rgba(0, 0, 0, 0.96) 100%);
          z-index: 1;
        }
        .bw-portfolio-page .ba-label-before,
        .bw-portfolio-page .ba-label-after {
          position: absolute;
          bottom: 0;
          width: 50%;
          height: 76px;
          display: flex;
          align-items: flex-end;
          padding: 0 14px 13px;
          z-index: 2;
        }
        .bw-portfolio-page .ba-label-before { left: 0; }
        .bw-portfolio-page .ba-label-after { right: 0; justify-content: flex-end; }
        .bw-portfolio-page .ba-label-before span,
        .bw-portfolio-page .ba-label-after span {
          color: #fff;
          font-weight: 800;
          font-size: 13px;
          letter-spacing: 2.5px;
          text-transform: uppercase;
        }
        .bw-portfolio-page .trust-strip {
          background: linear-gradient(135deg, #1e2b43 0%, #151e30 100%);
          padding: 56px 40px;
          position: relative;
          overflow: hidden;
        }
        .bw-portfolio-page .trust-strip::before {
          content: "";
          position: absolute;
          inset: 0;
          background: url("/hero/builtwell-job-site-aerial-hero-ct.jpg") center / cover no-repeat;
          opacity: 0.12;
        }
        .bw-portfolio-page .trust-strip-inner {
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
        .bw-portfolio-page .trust-strip-item {
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
        .bw-portfolio-page .trust-strip-item:hover { color: #bc9155; transform: translateY(-2px); }
        .bw-portfolio-page .trust-strip-item svg {
          color: #bc9155;
          flex-shrink: 0;
          width: 22px;
          height: 22px;
          filter: drop-shadow(0 2px 4px rgba(188, 145, 85, 0.3));
        }
        .bw-portfolio-page .trust-strip-divider {
          width: 1px;
          height: 40px;
          background: rgba(255, 255, 255, 0.1);
          flex-shrink: 0;
        }
        .bw-portfolio-page .financing-strip {
          background: #fff;
          padding: 56px 40px;
          border-top: 1px solid rgba(30, 43, 67, 0.08);
        }
        .bw-portfolio-page .financing-strip-inner {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 24px;
          text-align: center;
        }
        .bw-portfolio-page .financing-strip-left {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
        }
        .bw-portfolio-page .greensky-logo {
          font-weight: 700;
          font-size: 24px;
          letter-spacing: -0.3px;
        }
        .bw-portfolio-page .gs-green { color: #6bbf4e; }
        .bw-portfolio-page .gs-dark { color: #1e2b43; }
        .bw-portfolio-page .financing-strip-text {
          font-size: 16px;
          color: #5c677d;
          line-height: 1.6;
        }
        .bw-portfolio-page .financing-strip-text strong {
          font-weight: 700;
          color: #1e2b43;
        }
        .bw-portfolio-page .financing-strip-cta {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          min-width: 280px;
          min-height: 52px;
          padding: 14px 32px;
          border-radius: 8px;
          font-weight: 600;
          font-size: 15px;
          background: #bc9155;
          color: #fff;
          letter-spacing: 0.3px;
          white-space: nowrap;
          text-decoration: none;
          transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
        }
        .bw-portfolio-page .financing-strip-cta:hover {
          background: #a57d48;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(188, 145, 85, 0.3);
        }
        .bw-portfolio-page .fade-up {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .bw-portfolio-page .fade-up.visible {
          opacity: 1;
          transform: translateY(0);
        }
        @media (max-width: 1024px) {
          .bw-portfolio-page .section { padding: 80px 32px; }
          .bw-portfolio-page .gallery-images { max-width: 100%; }
          .bw-portfolio-page .gallery-img-wrap { margin-left: 0; margin-right: 0; }
          .bw-portfolio-page .trust-strip { padding: 40px 24px; }
          .bw-portfolio-page .trust-strip-item { padding: 16px 20px; min-width: 140px; font-size: 12px; }
          .bw-portfolio-page .trust-strip-divider { display: none; }
          .bw-portfolio-page .financing-strip { padding: 36px 32px; }
          .bw-portfolio-page .financing-strip-inner,
          .bw-portfolio-page .financing-strip-left {
            flex-direction: column;
            text-align: center;
            gap: 16px;
          }
        }
        @media (max-width: 768px) {
          .bw-portfolio-page .fade-up {
            opacity: 1 !important;
            transform: translateY(0) !important;
            transition: none !important;
          }
          .bw-portfolio-page .section-label::before { display: none !important; }
          .bw-portfolio-page .section-label { padding-left: 0 !important; }
          .bw-portfolio-page .page-hero { padding: 80px 20px 36px; min-height: 40vh; }
          .bw-portfolio-page .page-hero h1 { font-size: clamp(30px, 7vw, 42px); }
          .bw-portfolio-page .hero-subtitle { font-size: 15px; }
          .bw-portfolio-page .hero-ctas { flex-direction: column; align-items: center; }
          .bw-portfolio-page .hero-cta-btn { min-height: 44px; width: 100%; max-width: 300px; font-size: 14px; padding: 12px 24px; }
          .bw-portfolio-page .trust-bar-inner { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .bw-portfolio-page .trust-item { padding: 24px 16px; background: rgba(188, 145, 85, 0.08); }
          .bw-portfolio-page .trust-item:hover { transform: none; }
          .bw-portfolio-page .trust-number { font-size: 32px; }
          .bw-portfolio-page .trust-label { font-size: 12px; }
          .bw-portfolio-page .section { padding: 52px 20px; }
          .bw-portfolio-page .gallery-img-wrap { margin-bottom: 20px; margin-left: 0; margin-right: 0; }
          .bw-portfolio-page .gallery-group { margin-bottom: 48px; }
          .bw-portfolio-page .gallery-group h2 { font-size: clamp(24px, 5vw, 32px); }
          .bw-portfolio-page .trust-strip { padding: 32px 20px; }
          .bw-portfolio-page .trust-strip-inner { gap: 0; flex-wrap: wrap; }
          .bw-portfolio-page .trust-strip-item {
            padding: 16px 12px;
            min-width: 33.33%;
            font-size: 11px;
            white-space: normal;
          }
          .bw-portfolio-page .trust-strip-item svg { width: 18px; height: 18px; }
          .bw-portfolio-page .trust-strip-divider { display: none; }
          .bw-portfolio-page .financing-strip { padding: 28px 20px; }
          .bw-portfolio-page .financing-strip-inner,
          .bw-portfolio-page .financing-strip-left {
            flex-direction: column;
            text-align: center;
            gap: 12px;
          }
          .bw-portfolio-page .financing-strip-text { font-size: 14px; }
        }
        @media (max-width: 480px) {
          .bw-portfolio-page .section { padding: 40px 16px; }
          .bw-portfolio-page .page-hero { padding: 72px 16px 28px; }
          .bw-portfolio-page .page-hero h1 { font-size: clamp(26px, 7vw, 36px); }
          .bw-portfolio-page .hero-subtitle { font-size: 14px; max-width: 100%; }
          .bw-portfolio-page .gallery-group h2 { font-size: clamp(22px, 5vw, 28px); }
          .bw-portfolio-page .gallery-img-wrap { margin-bottom: 16px; border-radius: 8px; }
          .bw-portfolio-page .gallery-group { margin-bottom: 40px; }
          .bw-portfolio-page .trust-item { padding: 18px 12px; }
          .bw-portfolio-page .trust-number { font-size: 28px; }
          .bw-portfolio-page .trust-label { font-size: 11px; letter-spacing: 0.5px; }
          .bw-portfolio-page .trust-strip { padding: 24px 12px; }
          .bw-portfolio-page .trust-strip-item { padding: 10px 12px; min-width: 50%; font-size: 10px; }
          .bw-portfolio-page .financing-strip { padding: 24px 16px; }
          .bw-portfolio-page .financing-strip-cta {
            min-width: 0;
            width: 100%;
            font-size: 14px;
            padding: 14px 24px;
          }
          .bw-portfolio-page .financing-strip-text { font-size: 13px; }
        }
      `}</style>

      <section
        className="page-hero"
        style={{ "--portfolio-hero-image": `url('${media(hero?.background_image, "/services/kitchen-remodeling-ct.jpg")}')` } as CSSProperties}
      >
        <div className="page-hero-inner">
          <ol className="hero-breadcrumb" aria-label="Breadcrumb">
            <li><Link href="/">Home</Link></li>
            <li><span className="current">Portfolio</span></li>
          </ol>
          <h1>
            {hp.before}<span className="gold">{hp.accent}</span>{hp.after}
          </h1>
          <p className="hero-subtitle">{heroSubtitle}</p>
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

      <section className="trust-bar">
        <div className="trust-bar-inner">
          {topTrustItems.map((item: any, index: number) => {
            const content = (
              <>
                <div className="trust-number">
                  {item.value ? (
                    item.value
                  ) : (
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                  )}
                </div>
                <div className="trust-label">{item.label}</div>
              </>
            );

            if (item.url) {
              const external = /^https?:\/\//i.test(item.url);
              return (
                <a
                  key={`${item.label || "trust"}-${index}`}
                  href={item.url}
                  className="trust-item"
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                >
                  {content}
                </a>
              );
            }

            return (
              <div key={`${item.label || "trust"}-${index}`} className="trust-item">
                {content}
              </div>
            );
          })}
        </div>
      </section>

      <section className="section gallery-section">
        <div className="section-inner">
          {galleryItems.map((gallery: any, gi: number) => {
            const gp = parts(gallery.title || "", gallery.title_highlight || "in CT");
            const isBeforeAfter = (gallery.eyebrow || "").trim().toLowerCase() === "before and after";
            return (
              <div key={`gallery-${gi}`} className="gallery-group fade-up">
                {gallery.eyebrow ? label(gallery.eyebrow) : null}
                <h2>
                  {gp.before}
                  {gp.accent ? <span className="gold">{gp.accent}</span> : null}
                  {gp.after}
                </h2>
                {gallery.subtitle ? <p>{gallery.subtitle}</p> : null}
                <div className="gallery-images">
                  {(gallery.items || []).map((img: any, ii: number) => (
                    <div key={`gallery-image-${gi}-${ii}`} className="gallery-img-wrap">
                      <div className="gallery-img-clip">
                        <img
                          src={media(img.image)}
                          alt={img.alt || "BuiltWell CT remodeling project"}
                          loading="lazy"
                          decoding="async"
                          width={1000}
                          height={500}
                        />
                        {isBeforeAfter ? (
                          <>
                            <div className="ba-label-before"><span>Before</span></div>
                            <div className="ba-label-after"><span>After</span></div>
                          </>
                        ) : null}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {leadForm ? <LeadFormSection page={page} data={leadForm} accent={leadForm.title_highlight || "Consultation"} /> : null}

      <div className="trust-strip" role="region" aria-label="Trust indicators">
        <div className="trust-strip-inner">
          {trustStripItems.map((item: any, index: number) => (
            <div key={`trust-strip-${item.label || index}`} className="contents">
              {item.url ? (
                linkNode(
                  item.url,
                  <>
                    {trustStripIcon(item.icon)}
                    {[item.label, item.value].filter(Boolean).join(" ")}
                  </>,
                  "trust-strip-item",
                )
              ) : (
                <div className="trust-strip-item">
                  {trustStripIcon(item.icon)}
                  {[item.label, item.value].filter(Boolean).join(" ")}
                </div>
              )}
              {index < trustStripItems.length - 1 ? <div className="trust-strip-divider" /> : null}
            </div>
          ))}
        </div>
      </div>

      <div className="financing-strip" role="region" aria-label="Financing options">
        <div className="financing-strip-inner">
          <div className="financing-strip-left">
            <span className="greensky-logo"><span className="gs-green">Green</span><span className="gs-dark">Sky</span></span>
            <p className="financing-strip-text">
              <strong>{financingTitle}.</strong> {financingContent}
            </p>
          </div>
          <a href={financingCtaUrl} target="_blank" rel="noopener noreferrer" className="financing-strip-cta">
            {financingCtaLabel}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}


"use client";

import Link from "next/link";
import type { CMSPage } from "@/types/cms";
import { parts, section } from "./template-utils";

interface SitemapCard {
  title: string;
  links: Array<{ label: string; href: string }>;
}

export function SitemapPageTemplate({ page }: { page: CMSPage }) {
  const hero = section<any>(page, "hero");
  const richTexts = page.sections.filter((s) => s.is_active && s.type === "rich_text").map((s) => s.data as any);
  const sitemapData = richTexts.find((r: any) => r.style_variant === "sitemap_grid");

  const hp = parts(hero?.title || "Sitemap", hero?.title_highlight);

  const cards: SitemapCard[] = sitemapData?.cards || [
    {
      title: "Core Pages",
      links: [
        { label: "Home", href: "/" },
        { label: "About", href: "/about/" },
        { label: "Contact", href: "/contact/" },
        { label: "Free Consultation", href: "/free-consultation/" },
        { label: "Our Process", href: "/process/" },
        { label: "FAQ", href: "/faq/" },
        { label: "Portfolio", href: "/portfolio/" },
        { label: "Reviews", href: "/reviews/" },
        { label: "Pricing", href: "/pricing/" },
        { label: "Financing", href: "/financing/" },
        { label: "Careers", href: "/careers/" },
      ],
    },
    {
      title: "Services",
      links: [
        { label: "All Services", href: "/services/" },
        { label: "Kitchen Remodeling", href: "/kitchen-remodeling/" },
        { label: "Bathroom Remodeling", href: "/bathroom-remodeling/" },
        { label: "Basement Finishing", href: "/basement-finishing/" },
        { label: "Flooring", href: "/flooring/" },
        { label: "Home Additions", href: "/home-additions/" },
        { label: "Interior Painting", href: "/interior-painting/" },
        { label: "Interior Carpentry", href: "/interior-carpentry/" },
        { label: "Attic Conversions", href: "/attic-conversions/" },
        { label: "Decks and Porches", href: "/decks-porches/" },
        { label: "Design and Planning", href: "/remodeling-design-planning/" },
        { label: "Comfort and Accessibility", href: "/comfort-accessibility-remodeling/" },
        { label: "Insurance Reconstruction", href: "/insurance-restoration/" },
      ],
    },
    {
      title: "Areas We Serve",
      links: [
        { label: "Areas We Serve", href: "/areas-we-serve/" },
        { label: "Fairfield County", href: "/fairfield-county/" },
        { label: "New Haven County", href: "/new-haven-county/" },
        { label: "Orange, CT", href: "/new-haven-county/orange-ct/" },
        { label: "Greenwich, CT", href: "/fairfield-county/greenwich-ct/" },
        { label: "Kitchen Remodeling Stamford", href: "/kitchen-remodeling/stamford-ct/" },
        { label: "Kitchen Remodeling New Haven", href: "/kitchen-remodeling/new-haven-ct/" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Homeowner Hub", href: "/homeowner-hub/" },
        { label: "Warranty", href: "/warranty/" },
        { label: "Case Studies", href: "/case-studies/" },
        { label: "Privacy Policy", href: "/privacy-policy/" },
        { label: "Terms of Service", href: "/terms/" },
      ],
    },
  ];

  return (
    <>
      <style>{`
        .sm-header{padding:120px 40px 48px;background:#fff;text-align:center}
        .sm-header-inner{max-width:1240px;margin:0 auto}
        .sm-breadcrumb{display:flex;align-items:center;gap:0;justify-content:center;font-size:13px;font-weight:500;font-family:Inter,sans-serif;color:#5C677D;margin-bottom:20px;padding:0;list-style:none}
        .sm-breadcrumb li{display:flex;align-items:center}
        .sm-breadcrumb li+li::before{content:'\\203A';color:#BC9155;margin:0 10px;font-size:12px}
        .sm-breadcrumb a{color:#5C677D;transition:color 0.2s}
        .sm-breadcrumb a:hover{color:#BC9155}
        .sm-breadcrumb .current{color:#1E2B43;font-weight:600}
        .sm-header h1{font-size:clamp(36px,4vw,48px);margin-bottom:12px;color:#1E2B43}
        .sm-header .subtitle{font-size:17px;color:#5C677D;line-height:1.7;max-width:520px;margin:0 auto}
        .sm-section{padding:0 40px 100px;background:#fff}
        .sm-inner{max-width:1240px;margin:0 auto}
        .sm-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:28px}
        .sm-card{background:#fff;border-radius:10px;padding:32px 28px;border:1px solid rgba(30,43,67,0.08);box-shadow:0 4px 20px rgba(30,43,67,0.06),0 1px 4px rgba(30,43,67,0.03);transition:box-shadow 0.3s,transform 0.3s}
        .sm-card:hover{box-shadow:0 8px 32px rgba(30,43,67,0.1),0 2px 8px rgba(30,43,67,0.05);transform:translateY(-2px)}
        .sm-card h2{font-size:20px;color:#1E2B43;margin-bottom:20px;padding-bottom:14px;border-bottom:2px solid #BC9155;line-height:1.3}
        .sm-card ul{list-style:none;display:flex;flex-direction:column;gap:0}
        .sm-card a{display:block;padding:8px 0;font-size:15px;color:#1E2B43;font-weight:400;transition:color 0.2s,padding-left 0.2s;border-bottom:1px solid rgba(30,43,67,0.05)}
        .sm-card li:last-child a{border-bottom:none}
        .sm-card a:hover{color:#BC9155;padding-left:6px}
        @media(max-width:1024px){
          .sm-grid{gap:20px}
          .sm-card{padding:28px 24px}
        }
        @media(max-width:768px){
          .sm-header{padding:80px 20px 36px}
          .sm-header h1{font-size:clamp(30px,7vw,42px)}
          .sm-header .subtitle{font-size:15px}
          .sm-section{padding:0 20px 52px}
          .sm-grid{grid-template-columns:repeat(2,1fr);gap:20px}
        }
        @media(max-width:480px){
          .sm-header{padding:72px 16px 28px}
          .sm-header h1{font-size:clamp(26px,7vw,36px)}
          .sm-header .subtitle{font-size:14px;max-width:100%}
          .sm-section{padding:0 16px 40px}
          .sm-grid{grid-template-columns:1fr;gap:16px}
          .sm-card{padding:24px 20px}
          .sm-card h2{font-size:18px;margin-bottom:16px;padding-bottom:12px}
          .sm-card a{font-size:15px;padding:10px 0}
        }
      `}</style>

      {/* PAGE HEADER */}
      <section className="sm-header">
        <div className="sm-header-inner">
          <ol className="sm-breadcrumb" aria-label="Breadcrumb">
            <li><Link href="/" className="hover:text-[#bc9155]">Home</Link></li>
            <li><span className="current">Sitemap</span></li>
          </ol>
          <h1 className="font-serif font-bold">
            {hp.before}{hp.accent ? <span className="text-[#bc9155]">{hp.accent}</span> : null}{hp.after}
          </h1>
          <p className="subtitle">
            {hero?.subtitle || "Every page on buildwellct.com, organized by category."}
          </p>
        </div>
      </section>

      {/* SITEMAP GRID */}
      <section className="sm-section">
        <div className="sm-inner">
          <div className="sm-grid">
            {cards.map((card, i) => (
              <div key={i} className="sm-card">
                <h2 className="font-serif font-bold">{card.title}</h2>
                <ul>
                  {card.links.map((link, li) => (
                    <li key={li}>
                      <Link href={link.href}>{link.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

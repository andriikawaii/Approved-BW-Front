"use client";

import { useEffect } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Briefcase,
  HelpCircle,
  List,
  Star,
  Users,
} from "lucide-react";
import type { CMSPage } from "@/types/cms";
import {
  AreasSection as SharedAreasSection,
  DarkTrustStrip,
  FinancingStrip as SharedFinancingStrip,
  HeroTrustBar,
  LeadFormSection as SharedLeadFormSection,
  cls,
  label,
  linkNode,
  media,
  parts,
  section,
  sections,
} from "./template-utils";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type PhoneItem = { label?: string; number?: string };
type HubPage = CMSPage & { phones?: { items?: PhoneItem[] } };

type RichTextData = {
  eyebrow?: string | null;
  title?: string | null;
  highlight_text?: string | null;
  content?: string | null;
  style_variant?: string | null;
  surface?: string | null;
  container_width?: string | null;
  anchor_id?: string | null;
  align?: string | null;
  tags?: string[] | null;
  blocks?: Array<{ title?: string | null; content_html?: string | null }> | null;
  ctas?: Array<{ label?: string; url?: string }> | null;
  callout?: { title?: string | null; content_html?: string | null } | null;
  intro_paragraphs?: string[] | null;
  image?: string | null;
  image_alt?: string | null;
};

type FeatureGridData = {
  variant?: string | null;
  eyebrow?: string | null;
  title?: string | null;
  highlight_text?: string | null;
  subtitle?: string | null;
  surface?: string | null;
  background_image?: string | null;
  anchor_id?: string | null;
  note_html?: string | null;
  items?: any[] | null;
};

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const DEFAULT_PHONES: PhoneItem[] = [
  { label: "Fairfield County", number: "(203) 919-9616" },
  { label: "New Haven County", number: "(203) 466-9148" },
];

function toTel(v?: string) {
  const d = (v || "").replace(/\D/g, "");
  return d ? `tel:${d}` : "#";
}

/* ------------------------------------------------------------------ */
/*  Embedded CSS from homeowner-hub.css                                */
/* ------------------------------------------------------------------ */

const HUB_CSS = `[data-homeowner-hub-page]{--oxford-blue:#1e2b43;--gold:#bc9155;--gold-dark:#9a7340;--cream:#f5f1e9;--slate-gray:#5c677d;--gold-light:#bc91551a;--blue-dark:#151e30}
[data-homeowner-hub-page] .fade-up{opacity:0;transition:opacity .7s,transform .7s;transform:translateY(30px)}
[data-homeowner-hub-page] .fade-up.visible{opacity:1;transform:translateY(0)}
[data-homeowner-hub-page] .section{padding:100px 40px}
[data-homeowner-hub-page] .section-inner{max-width:1240px;margin:0 auto}
[data-homeowner-hub-page] .section-header{text-align:center;margin-bottom:64px}
[data-homeowner-hub-page] .homeowner-header-tight{margin-bottom:32px}
[data-homeowner-hub-page] .section-header h2{letter-spacing:-.5px;color:var(--oxford-blue);max-width:780px;margin:0 auto;font-family:Playfair Display,serif;font-size:clamp(28px,3.5vw,44px);line-height:1.2}
[data-homeowner-hub-page] .section-header p{color:#ffffffb3;max-width:700px;margin:20px auto 0;font-size:17px;line-height:1.75}
[data-homeowner-hub-page] .gold{color:var(--gold)}
[data-homeowner-hub-page] .page-hero{background:var(--blue-dark);isolation:isolate;color:#fff;align-items:stretch;min-height:50vh;padding:120px 40px 48px;display:flex;position:relative;overflow:hidden}
[data-homeowner-hub-page] .page-hero:after{content:"";background:var(--hub-hero-image)center 30%/cover no-repeat;opacity:.72;z-index:0;position:absolute;inset:0}
[data-homeowner-hub-page] .page-hero:before{content:"";z-index:1;background:radial-gradient(at 97% 97%,#151e30 0%,#151e30e6 8%,#0000 30%),radial-gradient(at 3% 97%,#151e30e6 0%,#0000 25%),linear-gradient(#151e3059 0%,#151e3033 30%,#151e3073 65%,#151e30eb 100%);position:absolute;inset:0}
[data-homeowner-hub-page] .page-hero-inner{z-index:2;text-align:center;flex-direction:column;justify-content:center;align-items:center;width:100%;max-width:1240px;margin:0 auto;display:flex;position:relative}
[data-homeowner-hub-page] .hero-breadcrumb{color:#ffffffeb;text-shadow:0 1px 6px #000000b3;justify-content:center;align-items:center;gap:0;width:100%;margin:0 auto 20px;padding:0;font-size:13px;font-weight:500;list-style:none;display:flex}
[data-homeowner-hub-page] .hero-breadcrumb li{align-items:center;display:flex}
[data-homeowner-hub-page] .hero-breadcrumb li+li:before{content:"\\203A";color:var(--gold);margin:0 10px;font-size:12px}
[data-homeowner-hub-page] .hero-breadcrumb a{color:#ffffffd9;text-decoration:none}
[data-homeowner-hub-page] .hero-breadcrumb a:hover{color:var(--gold)}
[data-homeowner-hub-page] .hero-breadcrumb .current{color:#fff;font-weight:600}
[data-homeowner-hub-page] .page-hero h1{letter-spacing:-.5px;text-shadow:0 2px 20px #00000080;margin:0 0 12px;font-family:Playfair Display,serif;font-size:clamp(40px,4.5vw,56px);line-height:1.08}
[data-homeowner-hub-page] .hero-subtitle{color:#ffffffd1;text-align:center;max-width:560px;margin:16px auto 0;font-size:17px;line-height:1.7}
[data-homeowner-hub-page] .hero-ctas{flex-wrap:wrap;justify-content:center;align-items:center;gap:14px;margin-top:28px;display:flex}
[data-homeowner-hub-page] .hero-cta-btn{-webkit-backdrop-filter:blur(12px);backdrop-filter:blur(12px);color:#fff;letter-spacing:.3px;white-space:nowrap;background:#0a12236b;border:1px solid #ffffff38;border-radius:8px;justify-content:center;align-items:center;gap:8px;padding:14px 32px;font-size:15px;font-weight:600;text-decoration:none;transition:background .3s,border-color .3s,transform .3s,box-shadow .3s;display:inline-flex}
[data-homeowner-hub-page] .hero-cta-btn:hover{background:#0a12239e;border-color:#ffffff59;transform:translateY(-2px);box-shadow:0 8px 24px #0000004d}
[data-homeowner-hub-page] .hero-cta-btn.hero-cta-primary{background:var(--gold);border-color:var(--gold);-webkit-backdrop-filter:none;backdrop-filter:none}
[data-homeowner-hub-page] .hero-cta-btn.hero-cta-primary:hover{background:#d4a95a;border-color:#d4a95a;box-shadow:0 8px 24px #bc915566}
[data-homeowner-hub-page] .service-overview{background:#fff;border-bottom:1px solid #1e2b430f}
[data-homeowner-hub-page] .service-overview-content,[data-homeowner-hub-page] .hub-prose-inner{max-width:800px;margin:0 auto;padding:0 32px}
[data-homeowner-hub-page] .overview-copy p,[data-homeowner-hub-page] .hub-prose-copy p{color:var(--slate-gray);margin:0 0 20px;font-size:16px;line-height:1.85}
[data-homeowner-hub-page] .hub-prose-copy p:last-child{margin-bottom:0}
[data-homeowner-hub-page] .hub-prose-copy a,[data-homeowner-hub-page] .permit-note a,[data-homeowner-hub-page] .hub-callout-copy a{color:var(--gold);font-weight:500;text-decoration:none}
[data-homeowner-hub-page] .hub-prose-copy a:hover,[data-homeowner-hub-page] .permit-note a:hover,[data-homeowner-hub-page] .hub-callout-copy a:hover{color:var(--gold-dark)}
[data-homeowner-hub-page] .hub-tags{flex-wrap:wrap;justify-content:center;gap:10px;margin-top:20px;display:flex}
[data-homeowner-hub-page] .hub-tag{background:var(--gold-light);color:var(--oxford-blue);border-radius:999px;padding:8px 20px;font-size:13px;font-weight:600;transition:background .3s,color .3s,transform .3s;display:inline-block}
[data-homeowner-hub-page] .hub-tag:hover{background:var(--oxford-blue);color:#fff;transform:translateY(-1px)}
[data-homeowner-hub-page] .hub-section-light{background:var(--cream)}
[data-homeowner-hub-page] .hub-section-white{background:#fff}
[data-homeowner-hub-page] .hub-prose-block{margin-top:36px}
[data-homeowner-hub-page] .hub-prose-block h3,[data-homeowner-hub-page] .hub-callout h3{color:var(--oxford-blue);margin:0 0 20px;padding-bottom:12px;font-family:Playfair Display,serif;font-size:22px;text-align:center;position:relative}
[data-homeowner-hub-page] .hub-prose-block h3::after{content:"";display:block;width:40px;height:2px;background:var(--gold);margin:10px auto 0;border-radius:2px}
[data-homeowner-hub-page] .hub-cta-row{flex-wrap:wrap;justify-content:center;gap:12px;margin-top:32px;display:flex}
[data-homeowner-hub-page] .hub-cta-btn{width:280px;color:var(--oxford-blue);background:#fff;border-radius:8px;justify-content:center;align-items:center;padding:14px 32px;font-size:15px;font-weight:600;text-decoration:none;transition:all .35s cubic-bezier(.4,0,.2,1);display:inline-flex;box-shadow:0 2px 8px #1e2b430f}
[data-homeowner-hub-page] .hub-cta-btn:hover{color:#fff;background:var(--gold);transform:translateY(-3px);box-shadow:0 12px 24px rgba(188,145,85,0.25)}
[data-homeowner-hub-page] .hub-callout{background:var(--cream);border-left:3px solid var(--gold);border-radius:8px;margin-top:40px;padding:28px 32px}
[data-homeowner-hub-page] .hub-callout-copy p{margin-bottom:0;font-size:14px;line-height:1.85}
[data-homeowner-hub-page] .hub-dark-section{background:linear-gradient(135deg,var(--oxford-blue)0%,#151e30 100%);color:#fff;position:relative;overflow:hidden}
[data-homeowner-hub-page] .hub-dark-bg{opacity:.12;z-index:0;background-position:50%;background-size:cover;position:absolute;inset:0}
[data-homeowner-hub-page] .hub-dark-bg-soft{opacity:.08}
[data-homeowner-hub-page] .hub-dark-inner{z-index:1;position:relative}
[data-homeowner-hub-page] .hub-dark-section .section-header h2{color:#fff}
[data-homeowner-hub-page] .permit-grid{grid-template-columns:1fr 1fr;gap:32px;max-width:800px;margin:0 auto;display:grid}
[data-homeowner-hub-page] .permit-card{background:#ffffff0f;border:1px solid #ffffff1a;border-radius:8px;flex-direction:column;padding:32px;display:flex}
[data-homeowner-hub-page] .permit-card h3{color:var(--gold);margin:0 0 16px;padding-bottom:12px;border-bottom:2px solid rgba(255,255,255,0.45);font-family:Playfair Display,serif;font-size:20px;font-weight:700;text-align:center}
[data-homeowner-hub-page] .permit-card ul{margin:0;padding:0;list-style:none}
[data-homeowner-hub-page] .permit-card li{color:#ffffffd9;margin-bottom:16px;padding-left:24px;font-size:14px;line-height:1.7;position:relative}
[data-homeowner-hub-page] .permit-card li:before{content:"\\2713";color:var(--gold);position:absolute;left:0}
[data-homeowner-hub-page] .permit-note{color:#fffc;max-width:800px;margin:32px auto 0;font-size:14px;line-height:1.8}
[data-homeowner-hub-page] .permit-note strong{color:var(--gold)}
[data-homeowner-hub-page] .hub-checklist-intro{text-align:center;max-width:800px;margin:0 auto 48px;padding:0 32px}
[data-homeowner-hub-page] .hub-checklist-intro p{color:var(--slate-gray);margin:0;font-size:16px;line-height:1.85}
[data-homeowner-hub-page] .hub-checklist{max-width:800px;margin:0 auto}
[data-homeowner-hub-page] .checklist-item{border:1px solid #1e2b430a;border-left:3px solid var(--gold);border-radius:10px;align-items:flex-start;gap:24px;padding:28px 24px;margin-bottom:12px;background:#fff;box-shadow:0 2px 12px rgba(30,43,67,0.04);transition:all .35s cubic-bezier(.4,0,.2,1);display:flex}
[data-homeowner-hub-page] .checklist-item:last-child{margin-bottom:0}
[data-homeowner-hub-page] .checklist-item:hover{transform:translateY(-2px);box-shadow:0 12px 28px rgba(30,43,67,0.08);border-left-color:var(--gold)}
[data-homeowner-hub-page] .checklist-item:hover .checklist-num{background:var(--gold);color:#fff;border-color:var(--gold);box-shadow:0 4px 12px rgba(188,145,85,0.3)}
[data-homeowner-hub-page] .checklist-num{border:2px solid var(--gold);width:52px;height:52px;color:var(--gold);background:#bc91551a;border-radius:50%;flex-shrink:0;justify-content:center;align-items:center;font-family:Playfair Display,serif;font-size:22px;font-weight:700;transition:all .3s;display:flex}
[data-homeowner-hub-page] .checklist-content h3{color:var(--oxford-blue);margin:0 0 8px;font-family:Playfair Display,serif;font-size:20px;font-weight:700}
[data-homeowner-hub-page] .checklist-content p{color:var(--slate-gray);margin:0;font-size:15px;line-height:1.8}
[data-homeowner-hub-page] .hub-room-inner{max-width:800px;margin:0 auto;padding:0 32px}
[data-homeowner-hub-page] .aip-room-grid{grid-template-columns:1fr 1fr;gap:24px;margin:32px 0;display:grid}
[data-homeowner-hub-page] .aip-room-card{background:#fff;border-left:3px solid transparent;border-bottom:2px solid transparent;border-radius:10px;padding:28px;transition:all .35s cubic-bezier(.4,0,.2,1);box-shadow:0 2px 12px #1e2b430f}
[data-homeowner-hub-page] .aip-room-card:hover{border-left-color:var(--gold);border-bottom-color:var(--gold);transform:translateY(-4px);box-shadow:0 12px 28px #1e2b431a,0 0 0 1px rgba(188,145,85,0.1)}
[data-homeowner-hub-page] .aip-room-card h4{color:var(--oxford-blue);margin:0 0 12px;padding-bottom:10px;border-bottom:1px solid rgba(188,145,85,0.15);font-family:Playfair Display,serif;font-size:20px;font-weight:700;text-align:center}
[data-homeowner-hub-page] .aip-room-card ul{margin:0;padding:0;list-style:none}
[data-homeowner-hub-page] .aip-room-card li{color:var(--slate-gray);margin-bottom:12px;padding-left:22px;font-size:14px;line-height:1.8;position:relative}
[data-homeowner-hub-page] .aip-room-card li:before{content:"\\2713";color:var(--gold);position:absolute;left:0}
[data-homeowner-hub-page] .hub-access-image-wrap{max-width:800px;margin:0 auto;padding:0 32px}
[data-homeowner-hub-page] .hub-access-image-card{border-radius:12px;margin-top:48px;overflow:hidden;box-shadow:0 8px 32px #1e2b431a}
[data-homeowner-hub-page] .hub-access-image-card img{object-fit:cover;width:100%;height:320px;display:block}
[data-homeowner-hub-page] .aip-funding-grid{grid-template-columns:1fr 1fr;gap:24px;max-width:900px;margin:0 auto;display:grid}
[data-homeowner-hub-page] .aip-funding-card{background:#ffffff0f;border:1px solid #ffffff14;border-radius:8px;padding:28px;transition:background .3s,transform .3s}
[data-homeowner-hub-page] .aip-funding-card:hover{background:#ffffff1a;transform:translateY(-2px)}
[data-homeowner-hub-page] .aip-funding-card h4,[data-homeowner-hub-page] .aip-funding-link{color:var(--gold);text-underline-offset:3px;font-family:Playfair Display,serif;font-size:20px;font-weight:700;text-decoration:none;display:block;padding-bottom:10px;margin-bottom:12px;text-align:center;position:relative}
[data-homeowner-hub-page] .aip-funding-card h4::after,[data-homeowner-hub-page] .aip-funding-link::after{content:"";display:block;width:60px;height:2px;background:#FFFFFF;margin:10px auto 0}
[data-homeowner-hub-page] .aip-funding-card p{color:#ffffffcc;margin:0;font-size:14px;line-height:1.8}
[data-homeowner-hub-page] .resource-grid{grid-template-columns:repeat(5,1fr);gap:20px;display:grid}
[data-homeowner-hub-page] .resource-card{text-align:center;background:#fff;border-bottom:3px solid #0000;border-radius:12px;flex-direction:column;align-items:center;gap:14px;padding:32px 20px 28px;text-decoration:none;transition:all .35s cubic-bezier(.4,0,.2,1);display:flex;box-shadow:0 2px 12px #1e2b430f}
[data-homeowner-hub-page] .resource-card:hover{border-bottom-color:var(--gold);transform:translateY(-6px);box-shadow:0 12px 28px #1e2b431a}
[data-homeowner-hub-page] .resource-card-icon{background:var(--gold-light);width:58px;height:58px;color:var(--gold);border-radius:50%;justify-content:center;align-items:center;display:flex}
[data-homeowner-hub-page] .resource-card-icon svg{width:22px;height:22px}
[data-homeowner-hub-page] .resource-card h3{color:var(--oxford-blue);margin:0;font-family:Playfair Display,serif;font-size:20px}
[data-homeowner-hub-page] .resource-card-desc{color:var(--slate-gray);margin:0;font-size:14px;line-height:1.75}
[data-homeowner-hub-page] .resource-arrow{color:var(--gold);align-items:center;gap:6px;font-size:14px;font-weight:600;display:inline-flex}
[data-homeowner-hub-page] .resource-arrow svg{width:14px;height:14px}
[data-homeowner-hub-page] .trust-strip{background:linear-gradient(135deg,var(--oxford-blue)0%,#151e30 100%);padding:56px 40px;position:relative;overflow:hidden}
[data-homeowner-hub-page] .trust-strip:before{content:"";opacity:.12;background:url(/hero/builtwell-job-site-aerial-hero-ct.jpg) 50%/cover no-repeat;position:absolute;inset:0}
[data-homeowner-hub-page] .trust-strip-inner{z-index:1;flex-wrap:wrap;justify-content:center;align-items:center;gap:0;max-width:1200px;margin:0 auto;display:flex;position:relative}
[data-homeowner-hub-page] .trust-strip-fragment{display:contents}
[data-homeowner-hub-page] .trust-strip-item{text-align:center;color:#ffffffe6;letter-spacing:.4px;white-space:nowrap;flex-direction:column;flex:1;align-items:center;gap:10px;min-width:180px;padding:20px 32px;font-size:13px;font-weight:600;text-decoration:none;transition:all .3s;display:flex}
[data-homeowner-hub-page] .trust-strip-item:hover{color:var(--gold);transform:translateY(-2px)}
[data-homeowner-hub-page] .trust-strip-item svg{width:22px;height:22px;color:var(--gold);filter:drop-shadow(0 2px 4px #bc91554d);flex-shrink:0}
[data-homeowner-hub-page] .trust-strip-divider{background:#ffffff1a;flex-shrink:0;width:1px;height:40px}
@media (max-width:1024px){[data-homeowner-hub-page] .resource-grid{grid-template-columns:repeat(3,1fr)}
[data-homeowner-hub-page] .trust-strip{padding:40px 24px}
[data-homeowner-hub-page] .trust-strip-inner{gap:0}
[data-homeowner-hub-page] .trust-strip-item{min-width:140px;padding:16px 20px;font-size:12px}
[data-homeowner-hub-page] .trust-strip-divider{display:none}}
@media (max-width:768px){[data-homeowner-hub-page] .fade-up{opacity:1!important;transform:none!important}
[data-homeowner-hub-page] .page-hero{min-height:40vh;padding:100px 20px 36px}
[data-homeowner-hub-page] .page-hero h1{font-size:clamp(30px,7vw,42px)}
[data-homeowner-hub-page] .hero-subtitle{font-size:15px}
[data-homeowner-hub-page] .hero-ctas{flex-direction:column;align-items:center}
[data-homeowner-hub-page] .hero-cta-btn{width:100%;max-width:300px;padding:12px 24px;font-size:14px}
[data-homeowner-hub-page] .section{padding:52px 20px}
[data-homeowner-hub-page] .section-header{margin-bottom:36px}
[data-homeowner-hub-page] .service-overview-content,[data-homeowner-hub-page] .hub-prose-inner,[data-homeowner-hub-page] .hub-room-inner,[data-homeowner-hub-page] .hub-access-image-wrap,[data-homeowner-hub-page] .hub-checklist-intro{padding:0}
[data-homeowner-hub-page] .permit-grid,[data-homeowner-hub-page] .aip-room-grid,[data-homeowner-hub-page] .aip-funding-grid{grid-template-columns:1fr}
[data-homeowner-hub-page] .resource-grid{grid-template-columns:repeat(2,1fr)}
[data-homeowner-hub-page] .hub-tags{gap:8px}
[data-homeowner-hub-page] .hub-tag{padding:6px 16px;font-size:12px}
[data-homeowner-hub-page] .hub-cta-row{flex-direction:column!important;align-items:stretch!important}
[data-homeowner-hub-page] .hub-cta-btn{width:100%!important;min-width:0!important}
[data-homeowner-hub-page] .trust-strip{padding:32px 20px}
[data-homeowner-hub-page] .trust-strip-inner{flex-wrap:wrap;gap:0}
[data-homeowner-hub-page] .trust-strip-item{text-align:center;flex-direction:column;justify-content:center;align-items:center;min-width:33.33%;padding:16px 12px;font-size:11px;display:flex}
[data-homeowner-hub-page] .trust-strip-item svg{width:18px;height:18px}
[data-homeowner-hub-page] .trust-strip-divider{display:none}}
@media (max-width:480px){[data-homeowner-hub-page] .page-hero{min-height:35vh;padding:90px 16px 32px}
[data-homeowner-hub-page] .page-hero h1{font-size:clamp(26px,7vw,36px)}
[data-homeowner-hub-page] .hero-subtitle{font-size:14px}
[data-homeowner-hub-page] .section{padding:48px 16px}
[data-homeowner-hub-page] .resource-grid{grid-template-columns:1fr}
[data-homeowner-hub-page] .resource-card{gap:8px;padding:20px 14px 18px}
[data-homeowner-hub-page] .resource-card h3{font-size:14px}
[data-homeowner-hub-page] .resource-card-desc{font-size:11px}
[data-homeowner-hub-page] .resource-card-icon{width:40px;height:40px}
[data-homeowner-hub-page] .resource-card-icon svg{width:16px;height:16px}}
@media (prefers-reduced-motion:reduce){[data-homeowner-hub-page] .fade-up,[data-homeowner-hub-page] .hub-tag,[data-homeowner-hub-page] .hero-cta-btn,[data-homeowner-hub-page] .hub-cta-btn,[data-homeowner-hub-page] .permit-card,[data-homeowner-hub-page] .checklist-item,[data-homeowner-hub-page] .aip-room-card,[data-homeowner-hub-page] .aip-funding-card,[data-homeowner-hub-page] .resource-card,[data-homeowner-hub-page] .trust-strip-item{transition:none!important;transform:none!important}}`;

/* ------------------------------------------------------------------ */
/*  Eyebrow label helper (light + dark variants)                       */
/* ------------------------------------------------------------------ */

function hubLabel(text?: string | null, dark?: boolean) {
  if (!text) return null;
  const color = dark ? "#c89b5b" : "#9a7340";
  const barColor = dark ? "#c89b5b" : "#bc9155";
  return (
    <span
      className="mb-4 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em]"
      style={{ color }}
    >
      <span className="h-0.5 w-[10px]" style={{ background: barColor }} />
      {text}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Resource icon helper                                               */
/* ------------------------------------------------------------------ */

function resourceIcon(icon?: string | null) {
  const cls = "lucide";
  switch ((icon || "").toLowerCase()) {
    case "list":
      return <List className={cls} aria-hidden="true" />;
    case "help-circle":
      return <HelpCircle className={cls} aria-hidden="true" />;
    case "star":
      return <Star className={cls} aria-hidden="true" />;
    case "users":
      return <Users className={cls} aria-hidden="true" />;
    case "briefcase":
      return <Briefcase className={cls} aria-hidden="true" />;
    default:
      return <ArrowRight className={cls} aria-hidden="true" />;
  }
}

/* ------------------------------------------------------------------ */
/*  Main Export                                                        */
/* ------------------------------------------------------------------ */

export function HomeownerHubPageTemplate({ page }: { page: CMSPage }) {
  const hubPage = page as HubPage;
  const phones = hubPage.phones?.items?.length ? hubPage.phones.items : DEFAULT_PHONES;

  /* ---------- extract CMS sections ---------- */
  const hero = section<any>(page, "hero");
  const trustBars = sections<any>(page, "trust_bar");
  const richTexts = sections<RichTextData>(page, "rich_text");
  const featureGrids = sections<FeatureGridData>(page, "feature_grid");
  const areas = section<any>(page, "areas_served");
  const lead = section<any>(page, "lead_form");

  /* ---------- map rich_text sections ---------- */
  const overview = richTexts.find((r) => r.style_variant === "homeowner_hub_overview");
  const planProject = richTexts.find((r) => r.anchor_id === "planning" || r.title?.includes("Plan Your Project"));
  const costs = richTexts.find((r) => r.anchor_id === "budgeting" || r.title?.includes("Remodeling Costs"));
  const agingInPlace = richTexts.find((r) => r.anchor_id === "accessibility" || r.title?.includes("Aging in Place"));
  const financing = richTexts.find((r) => r.style_variant === "financing_strip");

  /* ---------- map feature_grid sections ---------- */
  const permits = featureGrids.find((f) => f.variant === "homeowner_hub_permits" || f.title?.includes("Permits"));
  const checklist = featureGrids.find((f) => f.variant === "homeowner_hub_checklist" || f.title?.includes("Choose a Remodeling Contractor"));
  const roomCards = featureGrids.find((f) => f.variant === "homeowner_hub_room_cards" || f.title?.includes("Room-by-Room"));
  const funding = featureGrids.find((f) => f.variant === "homeowner_hub_funding_cards" || f.title?.includes("Programs for Accessibility"));
  const resources = featureGrids.find((f) => f.variant === "homeowner_hub_resources" || f.title?.includes("Learn More"));

  /* ---------- trust bars ---------- */
  const heroTrust = trustBars.find((t) => t.variant === "stats");
  const linksTrust = trustBars.find((t) => t.variant === "links");

  /* ---------- hero image ---------- */
  const heroImage = media(hero?.background_image, "/portfolio/builtwell-team-client-arrival-ct.jpeg");

  /* ---------- fade-up observer ---------- */
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-homeowner-hub-page] .fade-up"));
    if (!nodes.length) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      nodes.forEach((n) => n.classList.add("visible"));
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.classList.add("visible");
          obs.unobserve(e.target);
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
    );
    nodes.forEach((n) => obs.observe(n));
    return () => obs.disconnect();
  }, []);

  /* ---------- CMS data extraction helpers ---------- */
  const heroTitle = hero?.headline || "Homeowner Hub: Your";
  const heroHighlight = hero?.highlight_text || "Connecticut Remodeling Guide";
  const heroSubtitle = hero?.subheadline || "Practical information on planning, costs, permits, and how to evaluate a contractor so you go into your remodel informed.";

  const overviewTitle = overview?.title || "What Every Connecticut Homeowner";
  const overviewHighlight = overview?.highlight_text || "Should Know";
  const overviewTags = overview?.tags || ["Planning", "Budgeting", "Permits", "Contractor", "Aging in Place"];
  const overviewContent = overview?.content || "Connecticut remodeling projects typically cost between $15,000 and $250,000 depending on scope, require permits for any structural, electrical, or plumbing work, and take 2 to 16 weeks to complete. This page covers what you need to know before starting. We have put together practical information on planning, costs, permits, and how to evaluate a contractor. None of it is a sales pitch. If you read through this and decide another contractor is a better fit, that is fine. What matters is that you go into a remodel informed.";

  const tagAnchors: Record<string, string> = {
    "Planning": "#planning",
    "Budgeting": "#budgeting",
    "Permits": "#permits",
    "Contractor": "#contractor",
    "Aging in Place": "#accessibility",
  };

  return (
    <div
      data-homeowner-hub-page="true"
      data-template="homeowner-hub"
      data-page-slug={page.slug}
      style={{ "--hub-hero-image": `url("${heroImage}")` } as React.CSSProperties}
    >
      {/* Embedded scoped CSS */}
      <style dangerouslySetInnerHTML={{ __html: HUB_CSS }} />

      {/* ============================================================ */}
      {/*  HERO                                                        */}
      {/* ============================================================ */}
      <section className="page-hero">
        <div className="page-hero-inner">
          <div className="fade-up visible">
            <ol className="hero-breadcrumb" aria-label="Breadcrumb">
              <li><a href="/">Home</a></li>
              <li><span className="current">Homeowner Hub</span></li>
            </ol>
            <h1>
              {heroTitle} <span className="gold">{heroHighlight}</span>
            </h1>
            <p className="hero-subtitle">{heroSubtitle}</p>
            <div className="hero-ctas">
              <a href="#contact" className="hero-cta-btn hero-cta-primary">
                Get Your Free Estimate
              </a>
              {phones.map((p) => (
                <a key={p.number} href={toTel(p.number)} className="hero-cta-btn">
                  {(p.label || "").replace(/ County$/, "")}: {p.number}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  HERO TRUST BAR (shared component - uses Tailwind)           */}
      {/* ============================================================ */}
      <HeroTrustBar items={heroTrust?.items} />

      {/* ============================================================ */}
      {/*  SERVICE OVERVIEW                                            */}
      {/* ============================================================ */}
      <section className="service-overview section">
        <div className="section-inner service-overview-content">
          <div className="section-header fade-up homeowner-header-tight">
            {hubLabel(overview?.eyebrow || "Homeowner Hub")}
            <h2>
              {overviewTitle} <span className="gold">{overviewHighlight}</span>
            </h2>
            <div className="hub-tags">
              {overviewTags.map((tag) => (
                <a key={tag} href={tagAnchors[tag] || `#${tag.toLowerCase().replace(/\s+/g, "-")}`} className="hub-tag">
                  {tag}
                </a>
              ))}
            </div>
          </div>
          <div className="fade-up overview-copy">
            <p>{overviewContent}</p>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  PLAN YOUR PROJECT (prose section - light)                   */}
      {/* ============================================================ */}
      <ProseSectionHub data={planProject} fallback={{
        id: "planning",
        eyebrow: "Getting Started",
        title: "Plan Your",
        highlight: "Project",
        surface: "light",
        content: "Planning a Connecticut remodel requires defining the scope of work, setting a realistic budget, scheduling around 8 to 12 week cabinet lead times, and confirming which permits your town requires before construction begins.",
        blocks: [
          { title: "Scoping the Work", html: "<p>Scoping a project well starts with separating what you want from what the space actually needs. A <a href=\"/kitchen-remodeling/\">kitchen</a> that looks dated may only need new countertops, paint, and hardware - a cosmetic refresh. Or the layout may not work for how you use it, the electrical panel may be undersized for modern appliances, and the subfloor may need attention before any finish materials go in. Those are two very different projects with very different costs. A contractor who looks at your space carefully before writing a proposal can tell you which situation you are in. A contractor who quotes from a photo cannot.</p>" },
          { title: "Cosmetic vs. Structural", html: "<p>Cosmetic work such as painting, hardware, light fixtures, and some flooring can often be planned and started quickly. Structural work such as moving walls, adding or relocating plumbing, upgrading electrical, or adding square footage involves permits, licensed trade subcontractors, and longer timelines. It is worth knowing early which category your project falls into, because it affects your budget, your timeline, and your planning.</p>" },
          { title: "Lead Times and Timing", html: "<p>Timing is a real factor in Connecticut remodeling. Custom cabinet lead times run 8 to 12 weeks from order to delivery. Semi-custom options take 4 to 6 weeks. Stock cabinets are available faster but limit your design choices. If your project needs custom cabinets, that lead time has to be built into the schedule before construction begins.</p><p>Tile, countertop fabrication, and specialty fixtures also carry lead times that vary by supplier and demand. Quartz countertops typically require 2 to 3 weeks for templating and fabrication after cabinets are installed. Imported tile can take 4 to 8 weeks depending on the source.</p><p>Projects planned in the fall for spring starts need to account for these windows. We finalize all selections and place orders during the planning phase so lead times run concurrently with pre-construction preparation, not during active construction. For more on how we manage timelines, see our <a href=\"/kitchen-remodeling/\">kitchen remodeling</a> page or read about our <a href=\"/process/\">five-step process</a>.</p>" },
        ],
        ctas: [
          { label: "See our process", url: "/process/" },
          { label: "Read the FAQ", url: "/faq/" },
        ],
      }} />

      {/* ============================================================ */}
      {/*  BUDGETING (prose section - white)                           */}
      {/* ============================================================ */}
      <ProseSectionHub data={costs} fallback={{
        id: "budgeting",
        eyebrow: "Budgeting",
        title: "What Drives Remodeling Costs in",
        highlight: "Connecticut",
        surface: "white",
        content: "Remodeling costs in Connecticut are driven by five factors: scope of work (cosmetic vs. structural), material selections (30 to 40 percent of budget), local labor rates, your home\u2019s age and condition, and geographic location within the state. Here is what actually moves the price.",
        blocks: [
          { title: "Scope: Cosmetic vs. Structural", html: "<p>The single biggest cost driver is the scope of work. A cosmetic refresh - new countertops, cabinet hardware, paint, and a backsplash - is a fundamentally different project than a gut renovation that moves plumbing, upgrades the electrical panel, and opens up a load-bearing wall. Cosmetic work typically stays in the lower third of any price range. Once you start touching structure, plumbing, or electrical, you cross into a different category of cost, timeline, and permit requirements.</p>" },
          { title: "Material Selections", html: "<p>Materials account for 30 to 40 percent of most remodeling budgets. The gap between stock cabinets and custom cabinets can be $15,000 to $40,000 on the same kitchen. Quartz and granite countertops range from $50 to $150 per square foot installed. Tile can run $8 per square foot or $35 per square foot depending on what you choose. These are not upsells - they are choices that affect how the finished space looks, feels, and holds up over time. A good contractor helps you understand where to invest and where to save based on how you use the space.</p>" },
          { title: "Labor Market in Connecticut", html: "<p>Connecticut has some of the highest labor costs in the country for skilled trades. Licensed electricians, plumbers, and HVAC technicians are in demand and command rates that reflect that. Learn more about how we manage trade coordination on our <a href=\"/process/\">process page</a>. This is not something a contractor controls. It is a market reality. Any quote that seems dramatically lower than others should prompt the question: who is actually doing the work, and are they licensed?</p>" },
          { title: "Age and Condition of Your Home", html: "<p>This is the factor that surprises homeowners the most. A home built in 1960 is not the same as a home built in 2005. Older Connecticut homes frequently have undersized electrical panels, galvanized or copper plumbing that needs replacement, knob-and-tube wiring in walls, asbestos-containing <a href=\"/flooring/\">floor tile</a>, and subfloor damage from decades of minor water intrusion. None of these are visible from the surface. A thorough pre-construction assessment catches many of them, but some conditions only become visible once demolition starts. Written change orders before any additional work proceeds are the honest way to handle this.</p>" },
          { title: "Geographic Variation Within Connecticut", html: "<p>The same kitchen remodel costs differently in Greenwich than it does in New Haven. This is driven by local labor rates, material expectations, the age and style of the housing stock, and what neighboring properties look like. <a href=\"/fairfield-county/\">Fairfield County</a> coastal towns tend to run higher across the board. <a href=\"/new-haven-county/\">New Haven County</a> projects often involve older housing stock with more remediation work but lower finish expectations. Neither is better or worse - they are different markets with different cost structures.</p>" },
          { title: null, html: "<p>One cost-saving resource many Connecticut homeowners overlook: <a href=\"https://energizect.com\" target=\"_blank\" rel=\"noopener noreferrer\">Energize CT</a> offers rebates on qualifying insulation, HVAC, and appliance upgrades. Eversource Home Energy Solutions also provides free home energy audits that can identify efficiency improvements before your remodel begins. If your project touches insulation, windows, heating, or cooling, it is worth checking what programs are currently available.</p>" },
        ],
        callout: {
          title: "How to Use This Information",
          html: "<p>Understanding what drives costs helps you have a more productive first conversation with any contractor. Instead of asking \"how much does a kitchen cost,\" you can ask about your specific scope, your specific home, and your specific material preferences. That conversation leads to a real number - not a range pulled from a website. For detailed pricing by service type, visit our <a href=\"/services/\">services page</a>.</p>",
        },
      }} />

      {/* ============================================================ */}
      {/*  PERMITS (dark section)                                      */}
      {/* ============================================================ */}
      <PermitsSectionHub data={permits} />

      {/* ============================================================ */}
      {/*  CONTRACTOR CHECKLIST (light section)                        */}
      {/* ============================================================ */}
      <ChecklistSectionHub data={checklist} />

      {/* ============================================================ */}
      {/*  AGING IN PLACE (white section with room cards + image)      */}
      {/* ============================================================ */}
      <AgingInPlaceSectionHub data={agingInPlace} roomCards={roomCards} />

      {/* ============================================================ */}
      {/*  FUNDING (dark section)                                      */}
      {/* ============================================================ */}
      <FundingSectionHub data={funding} />

      {/* ============================================================ */}
      {/*  AREAS SERVED (shared component)                             */}
      {/* ============================================================ */}
      <SharedAreasSection data={areas} />

      {/* ============================================================ */}
      {/*  RESOURCES / LEARN MORE                                      */}
      {/* ============================================================ */}
      <ResourcesSectionHub data={resources} />

      {/* ============================================================ */}
      {/*  LEAD FORM (shared component)                                */}
      {/* ============================================================ */}
      <SharedLeadFormSection
        page={page}
        data={lead}
        accent="Remodeling Project"
      />

      {/* ============================================================ */}
      {/*  TRUST STRIP (shared component)                              */}
      {/* ============================================================ */}
      {linksTrust && <DarkTrustStrip items={linksTrust.items} />}

      {/* ============================================================ */}
      {/*  FINANCING STRIP (shared component)                          */}
      {/* ============================================================ */}
      <SharedFinancingStrip data={financing} />
    </div>
  );
}

/* ================================================================== */
/*  PROSE SECTION (Planning, Budgeting, etc.)                          */
/* ================================================================== */

type ProseFallback = {
  id: string;
  eyebrow: string;
  title: string;
  highlight: string;
  surface: "light" | "white";
  content: string;
  blocks: Array<{ title: string | null; html: string }>;
  ctas?: Array<{ label: string; url: string }>;
  callout?: { title: string; html: string };
};

function ProseSectionHub({ data, fallback }: { data?: RichTextData; fallback: ProseFallback }) {
  const eyebrow = data?.eyebrow || fallback.eyebrow;
  const tp = data ? parts(data.title, data.highlight_text) : { before: fallback.title + " ", accent: fallback.highlight, after: "" };
  const surface = (data?.surface || fallback.surface) as string;
  const sectionClass = surface === "light" ? "hub-section-light" : "hub-section-white";
  const anchorId = data?.anchor_id || fallback.id;

  const contentParagraph = data?.content || fallback.content;
  const cmsBlocks = data?.blocks || [];
  const fallbackBlocks = fallback.blocks;
  const ctas = data?.ctas || fallback.ctas || [];
  const callout = data?.callout || fallback.callout;

  return (
    <section id={anchorId} className={`section hub-prose-section ${sectionClass}`}>
      <div className="section-inner hub-prose-inner">
        <div className="section-header fade-up">
          {hubLabel(eyebrow)}
          <h2>
            {tp.before}
            <span className="gold">{tp.accent}</span>
            {tp.after}
          </h2>
        </div>
        <article className="fade-up hub-prose-article">
          <div className="hub-prose-copy">
            <p>{contentParagraph}</p>
          </div>

          {/* Content blocks from CMS or fallback */}
          {(cmsBlocks.length > 0 ? cmsBlocks : fallbackBlocks).map((block, i) => {
            const blockTitle = "title" in block ? block.title : null;
            const blockHtml = "content_html" in block ? block.content_html : (block as any).html;
            if (blockTitle) {
              return (
                <div key={i} className="hub-prose-block">
                  <h3>{blockTitle}</h3>
                  <div className="hub-prose-copy" dangerouslySetInnerHTML={{ __html: blockHtml || "" }} />
                </div>
              );
            }
            return (
              <div key={i} className="hub-prose-block">
                <div className="hub-prose-copy" dangerouslySetInnerHTML={{ __html: blockHtml || "" }} />
              </div>
            );
          })}

          {/* CTA row */}
          {ctas.length > 0 && (
            <div className="hub-cta-row">
              {ctas.map((cta) => (
                <span key={cta.url} className="contents">
                  {linkNode(
                    cta.url || "#",
                    <span>{cta.label}</span>,
                    "hub-card-link hub-cta-btn"
                  )}
                </span>
              ))}
            </div>
          )}

          {/* Callout box */}
          {callout && (
            <div className="hub-callout">
              <h3>{callout.title}</h3>
              <div
                className="hub-prose-copy hub-callout-copy"
                dangerouslySetInnerHTML={{ __html: ("content_html" in callout ? (callout as any).content_html : (callout as any).html) || "" }}
              />
            </div>
          )}
        </article>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  PERMITS SECTION (dark)                                             */
/* ================================================================== */

const DEFAULT_PERMIT_ITEMS = [
  {
    title: "What Requires a Permit",
    bullets: [
      "Structural changes (removing or adding walls)",
      "Electrical work beyond simple fixture swaps",
      "Plumbing beyond fixture replacements",
      "HVAC additions or modifications",
      "Egress window installations",
      "Basement finishing creating habitable space",
      "Roofing replacement or repair",
      "New window or door openings",
      "Deck or porch construction",
    ],
  },
  {
    title: "What Does NOT Require a Permit",
    bullets: [
      "Painting interior or exterior surfaces",
      "Flooring over existing subfloor",
      "Cabinet replacement (same layout)",
      "Countertop replacement",
      "Hardware and fixture swaps",
      "Landscaping and grading",
      "Trim and molding replacement",
      "Wallpaper installation or removal",
      "Appliance swaps in existing hookups",
      "Shelving and closet organization systems",
    ],
  },
];

const DEFAULT_PERMIT_NOTE = `<p>We handle all permits for you. We prepare and submit all permit applications, account for review timelines, and manage every inspection. You do not need to interact with the building department.</p><p>Unpermitted work creates legal and financial risk. If you sell your home, a title search or buyer inspection can flag unpermitted improvements. The town can require you to remove or redo the work. Always verify that your contractor pulls the proper permits. <strong>Verify any contractor at the <a href="https://www.elicense.ct.gov/Lookup/LicenseLookup.aspx" target="_blank" rel="noopener noreferrer">CT DCP online license lookup</a>. Our license: CT HIC #0668405.</strong></p>`;

function PermitsSectionHub({ data }: { data?: FeatureGridData }) {
  const tp = data ? parts(data.title, data.highlight_text) : { before: "Permits and Building Codes in ", accent: "Connecticut", after: "" };
  const subtitle = data?.subtitle || "Connecticut requires building permits for any remodeling work involving structural changes, electrical, plumbing, or HVAC modifications, with separate permits often needed for each trade and inspections required at multiple stages.";
  const items = data?.items?.length ? data.items : DEFAULT_PERMIT_ITEMS;
  const noteHtml = data?.note_html || DEFAULT_PERMIT_NOTE;
  const bgImage = media(data?.background_image, "/hero/builtwell-job-site-aerial-hero-ct.webp");

  return (
    <section id={data?.anchor_id || "permits"} className="section hub-dark-section">
      <div className="hub-dark-bg" style={{ backgroundImage: `url('${bgImage}')` }} />
      <div className="section-inner hub-dark-inner">
        <div className="section-header fade-up">
          {hubLabel(data?.eyebrow || "Permits and Codes", true)}
          <h2>
            {tp.before}
            <span className="gold">{tp.accent}</span>
            {tp.after}
          </h2>
          <p>{subtitle}</p>
        </div>
        <div className="permit-grid fade-up">
          {items.map((item: any, i: number) => (
            <div key={item.title || i} className="permit-card">
              <h3>{item.title}</h3>
              <ul>
                {(item.bullets || []).map((bullet: string, j: number) => (
                  <li key={j}>{bullet}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div
          className="permit-card permit-note fade-up"
          dangerouslySetInnerHTML={{ __html: noteHtml }}
        />
      </div>
    </section>
  );
}

/* ================================================================== */
/*  CONTRACTOR CHECKLIST SECTION (light)                               */
/* ================================================================== */

const DEFAULT_CHECKLIST_ITEMS = [
  { step: 1, title: "Verify CT HIC License", description: "Ask for the number. Look it up at CT Department of Consumer Protection. A current license means traceable legal identity and state requirements met." },
  { step: 2, title: "Confirm Insurance", description: "Ask for general liability and workers comp certificates. If a worker is injured and the contractor has no workers comp, you can be exposed to a liability claim." },
  { step: 3, title: "Written Line-Item Proposal", description: "A single number is not a proposal. A real proposal describes full scope, timeline, permits, payment schedule. Vague language becomes disagreements later." },
  { step: 4, title: "Check Reviews", description: "Look at volume and recency, not just star rating. Read the 1 and 2 star reviews. Pay attention to how the contractor responds to negative reviews." },
  { step: 5, title: "Ask About Communication", description: "Who is your point of contact? How often will you hear from them? How are change orders handled? Daily updates should be the standard." },
  { step: 6, title: "Understand Payment Terms", description: "Be cautious of anyone asking more than 30-40% upfront or final payment before the walkthrough is complete." },
  { step: 7, title: "Ask Who Does the Work", description: "Some companies subcontract everything. Others maintain consistent crews. Consistent crews produce more consistent work." },
];

function ChecklistSectionHub({ data }: { data?: FeatureGridData }) {
  const tp = data ? parts(data.title, data.highlight_text) : { before: "How to Choose a Remodeling ", accent: "Contractor", after: "" };
  const subtitle = data?.subtitle || "Choosing a Connecticut remodeling contractor requires verifying their CT HIC license at the Department of Consumer Protection, confirming general liability and workers comp insurance, and reviewing a written line-item proposal before signing any agreement.";
  const items = data?.items?.length ? data.items : DEFAULT_CHECKLIST_ITEMS;

  return (
    <section id={data?.anchor_id || "contractor"} className="section hub-section-light">
      <div className="section-inner hub-prose-inner">
        <div className="section-header fade-up">
          {hubLabel(data?.eyebrow || "Contractor Checklist")}
          <h2>
            {tp.before}
            <span className="gold">{tp.accent}</span>
            {tp.after}
          </h2>
        </div>
        <div className="fade-up hub-checklist-intro">
          <p>{subtitle}</p>
        </div>
        <div className="hub-checklist fade-up">
          {items.map((item: any, i: number) => (
            <div key={item.title || i} className="checklist-item">
              <div className="checklist-num">{item.step_number || item.step || i + 1}</div>
              <div className="checklist-content">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  AGING IN PLACE SECTION (white, with room cards + image + prose)    */
/* ================================================================== */

const DEFAULT_AIP_INTRO = [
  "Aging in place remodeling in Connecticut costs between $5,000 and $50,000 and typically includes wider doorways, curbless showers, grab bar blocking, and first-floor accessibility modifications for homes built before current ADA standards. Connecticut has one of the highest concentrations of residents over 50 in the country. Many of them live in homes built decades ago - homes designed without a single thought toward accessibility. Narrow doorways, raised thresholds, steep staircases, bathtubs with high sides, and second-floor-only bedrooms are standard in the housing stock across Fairfield and New Haven Counties. These are not design flaws. They are features of an era that did not anticipate the reality: most people want to stay in their homes as they age, and most homes are not set up for that.",
  "Aging in place remodeling is the practice of modifying a home so it remains safe, functional, and comfortable as the homeowner\u2019s mobility changes. It is one of the fastest-growing segments of residential construction nationally, a $5.3 billion market projected to exceed $9 billion by 2032. But the best time to do this work is before you need it.",
];

const DEFAULT_AIP_BLOCKS_TOP = [
  { title: "Universal Design vs. Medical Retrofits", html: "<p>There is a meaningful difference between universal design and medical retrofit. A medical retrofit is reactive - installing grab bars, ramps, and stair lifts after an injury or diagnosis. Universal design is proactive. It builds accessibility into the home in a way that looks and feels like thoughtful design, not accommodation. A curbless shower is universal design. A teak fold-down bench in that shower is universal design. A 36-inch doorway is universal design. None of these look clinical. All of them make the home work better for everyone - not just someone recovering from surgery.</p>" },
];

const DEFAULT_AIP_ROOMS = [
  { title: "Bathrooms", bullets: ["Curbless (zero-threshold) shower entry", "Built-in shower bench or teak fold-down seat", "Grab bars integrated into tile design", "Comfort-height toilet (17-19 inches)", "Non-slip tile flooring throughout", "Handheld showerhead on adjustable slide bar", "Lever-handle faucets instead of knobs"] },
  { title: "Kitchens", bullets: ["Varied counter heights (30\" and 36\") for seated use", "Pull-out shelving in lower cabinets", "D-shaped cabinet pulls (easier grip than knobs)", "Side-opening wall oven at counter height", "Touch-activated or lever faucets", "Task lighting under every cabinet run", "Anti-fatigue flooring in work zones"] },
  { title: "Entryways and Hallways", bullets: ["No-step entry (flush threshold or ramp)", "36-inch minimum doorway widths", "Lever door handles throughout", "Motion-sensor exterior and interior lighting", "Covered entry for weather protection", "Smooth flooring transitions (no raised thresholds)"] },
  { title: "Stairs and Floor Transitions", bullets: ["First-floor bedroom and full bathroom", "Stair treads with contrast nosing", "Continuous handrails on both sides", "Pre-wired for future stair lift installation", "Adequate lighting at top and bottom landings", "Laundry relocated to main level if feasible"] },
];

const DEFAULT_AIP_BLOCKS_BOTTOM = [
  { title: "Connecticut's Older Housing Stock", html: "<p>Connecticut\u2019s housing stock makes aging in place remodeling both more necessary and more complex than in newer-construction states. The median home age across our service area is well above the national average. <a href=\"/fairfield-county/\">Fairfield County</a> colonials from the 1950s and 1960s commonly have 28-inch doorways, steep <a href=\"/basement-finishing/\">basement</a> stairs, second-floor-only bathrooms, and electrical panels that cannot support modern accessibility additions without upgrades. New Haven County cape-style homes present similar challenges - bedrooms accessed only by narrow staircases, bathrooms too small for turning radius, and load-bearing walls between the rooms that need to be connected.</p><p>This is not a reason to avoid the work. It is a reason to hire a contractor who understands structural modification, not just finish carpentry. Widening a doorway in a load-bearing wall requires a properly sized header, proper support during construction, and a building permit. It is straightforward work for a crew that does it regularly.</p>" },
  { title: "When to Start Planning", html: "<p>The best answer is: before you need to. If you are already planning a <a href=\"/kitchen-remodeling/\">kitchen</a> or <a href=\"/bathroom-remodeling/\">bathroom</a> remodel, incorporating universal design features at that point costs a fraction of what it would cost to retrofit later. Adding blocking behind drywall for future grab bars during a bathroom renovation is nearly free. Widening a doorway during a room reconfiguration adds marginal cost. Installing a curbless shower instead of a tub-shower combo during a bathroom gut is a design choice, not an upcharge.</p><p>The expensive version is doing all of this work reactively, after a fall, after a diagnosis, after the need is urgent. Reactive work happens on compressed timelines with fewer design options and higher costs. Planning ahead gives you better outcomes at lower cost.</p>" },
];

const DEFAULT_AIP_CALLOUT = {
  title: "Getting Started",
  html: "<p>If you are considering aging in place modifications - whether as part of a larger remodel or as a standalone project - the first step is an in-home assessment. We walk through your home, identify the highest-impact modifications for your situation, and provide a clear scope and cost. No charge, no obligation. <a href=\"/contact/\">Schedule a free consultation</a> or call us directly.</p>",
};

function AgingInPlaceSectionHub({ data, roomCards }: { data?: RichTextData; roomCards?: FeatureGridData }) {
  const tp = data ? parts(data.title, data.highlight_text) : { before: "Aging in Place Remodeling in ", accent: "Connecticut", after: "" };
  const introParagraphs = data?.intro_paragraphs || DEFAULT_AIP_INTRO;
  const topBlocks = data?.blocks?.length ? data.blocks.filter((_, i) => i === 0) : DEFAULT_AIP_BLOCKS_TOP;
  const bottomBlocks = data?.blocks?.length ? data.blocks.filter((_, i) => i > 0) : DEFAULT_AIP_BLOCKS_BOTTOM;
  const rooms = roomCards?.items?.length ? roomCards.items : DEFAULT_AIP_ROOMS;
  const aipImage = data?.image || "https://builtwell-api.petararsic.rs/storage/media/jClbRU3g9ETRmCHYYb6VE8MJR0EvMzfGIG7Sr9U1.webp";
  const aipImageAlt = data?.image_alt || "Accessible home remodeling in Connecticut with curbless shower, wider doorways, and universal design by BuiltWell CT";
  const callout = data?.callout || DEFAULT_AIP_CALLOUT;

  return (
    <section id={data?.anchor_id || "accessibility"} className="section hub-section-white">
      {/* Top prose: intro + universal design block */}
      <div className="section-inner hub-prose-inner">
        <div className="section-header fade-up">
          {hubLabel(data?.eyebrow || "Accessibility")}
          <h2>
            {tp.before}
            <span className="gold">{tp.accent}</span>
            {tp.after}
          </h2>
        </div>
        <article className="fade-up hub-prose-article">
          {introParagraphs.map((p, i) => (
            <div key={i} className="hub-prose-copy">
              <p>{p}</p>
            </div>
          ))}
          {topBlocks.map((block, i) => {
            const blockTitle = "title" in block ? block.title : null;
            const blockHtml = "content_html" in block ? block.content_html : (block as any).html;
            return (
              <div key={i} className="hub-prose-block">
                {blockTitle && <h3>{blockTitle}</h3>}
                <div className="hub-prose-copy" dangerouslySetInnerHTML={{ __html: blockHtml || "" }} />
              </div>
            );
          })}
        </article>
      </div>

      {/* Room-by-room cards */}
      <div className="section-inner fade-up hub-room-inner">
        <div className="aip-room-grid">
          {rooms.map((room: any, i: number) => (
            <div key={room.title || i} className="aip-room-card">
              <h4>{room.title}</h4>
              <ul>
                {(room.bullets || []).map((bullet: string, j: number) => (
                  <li key={j}>{bullet}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Accessibility image */}
      <div className="section-inner fade-up hub-access-image-wrap">
        <div className="hub-access-image-card">
          <img src={media(aipImage)} alt={aipImageAlt} />
        </div>
      </div>

      {/* Bottom prose: housing stock + when to start + callout */}
      <div className="section-inner fade-up hub-prose-inner">
        <article className="hub-prose-article">
          {bottomBlocks.map((block, i) => {
            const blockTitle = "title" in block ? block.title : null;
            const blockHtml = "content_html" in block ? block.content_html : (block as any).html;
            return (
              <div key={i} className="hub-prose-block">
                {blockTitle && <h3>{blockTitle}</h3>}
                <div className="hub-prose-copy" dangerouslySetInnerHTML={{ __html: blockHtml || "" }} />
              </div>
            );
          })}
          {callout && (
            <div className="hub-callout">
              <h3>{callout.title}</h3>
              <div
                className="hub-prose-copy hub-callout-copy"
                dangerouslySetInnerHTML={{ __html: ("content_html" in callout ? (callout as any).content_html : (callout as any).html) || "" }}
              />
            </div>
          )}
        </article>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  FUNDING SECTION (dark)                                             */
/* ================================================================== */

const DEFAULT_FUNDING_ITEMS = [
  { title: "CT Home Care Program", url: "https://portal.ct.gov/dss/health-and-home-care/connecticut-home-care-program-for-elders/connecticut-home-care-program-for-elders-chcpe", description: "Administered by the CT Department of Social Services, this Medicaid waiver program covers home modifications for eligible seniors and adults with disabilities. Covered modifications include ramps, grab bars, walk-in tub conversions, and widened doorways. Eligibility is based on income and level of care need." },
  { title: "USDA Section 504 Grants", url: "https://www.rd.usda.gov/programs-services/single-family-housing-programs/single-family-housing-repair-loans-grants", description: "Available to very-low-income homeowners age 62 and older. Grants up to $10,000 for removing health and safety hazards including accessibility modifications. Repair loans up to $40,000 at 1% fixed interest are also available. Eligible in qualifying rural CT areas." },
  { title: "VA SAH / SHA Grants", url: "https://www.va.gov/housing-assistance/disability-housing-grants/", description: "Veterans with service-connected disabilities may qualify for SAH grants up to $109,986 or SHA grants up to $44,299. Covers wheelchair ramps, roll-in showers, widened doorways, lowered countertops, and accessible kitchen layouts. Requires a qualifying VA disability rating." },
  { title: "Area Agencies on Aging", url: "https://portal.ct.gov/aginganddisability/content-pages/topics-a-z/area-agencies-on-aging", description: "Connecticut's five Area Agencies on Aging administer local programs for home modification assistance. Common covered modifications include grab bars, threshold ramps, handrails, and bathroom safety improvements. Contact your local AAA for current availability in your county." },
  { title: "Medical Expense Deduction", url: "https://www.irs.gov/taxtopics/tc502", description: "Home modifications prescribed by a physician as medically necessary may qualify as deductible medical expenses on federal taxes. Qualifying modifications include grab bars, ramps, widened doorways, stair lifts, and curbless showers. Total medical expenses must exceed 7.5% of your adjusted gross income. Consult a CPA before your project begins." },
  { title: "GreenSky Financing", url: "https://www.greensky.com/", description: "Flexible financing for homeowners who do not qualify for assistance programs. Get approved in about 60 seconds with competitive rates and manageable monthly payments. Available for all BuiltWell projects. Multiple loan terms, no prepayment penalty, and you can apply online or during your consultation." },
  { title: "Energize CT Rebates", url: "https://energizect.com/", description: "Administered by Eversource and United Illuminating, Energize CT offers rebates on insulation, HVAC upgrades, heat pumps, and energy-efficient appliances. The Home Energy Solutions program provides energy assessments and instant rebates on air sealing and insulation. Check eligibility before construction begins." },
  { title: "FHA 203(k) Rehab Loan", url: "https://www.hud.gov/program_offices/housing/sfh/203k", description: "Finance both a home purchase or refinance and renovation costs in a single mortgage. The Standard 203(k) covers major remodeling over $5,000 with no max limit. The Limited 203(k) covers improvements up to $35,000. Requires an FHA-approved lender and licensed contractor." },
];

function FundingSectionHub({ data }: { data?: FeatureGridData }) {
  const tp = data ? parts(data.title, data.highlight_text) : { before: "Connecticut Programs for ", accent: "Accessibility", after: " Modifications" };
  const subtitle = data?.subtitle || "Connecticut homeowners can access multiple funding sources for accessibility modifications and remodeling projects, including the CT Home Care Program, USDA Section 504 grants, VA housing grants, IRS medical expense deductions, GreenSky financing, Energize CT rebates, and FHA 203(k) rehabilitation loans.";
  const items = DEFAULT_FUNDING_ITEMS;
  const bgImage = media(data?.background_image, "/hero/builtwell-job-site-aerial-hero-ct.webp");

  return (
    <section className="section hub-dark-section">
      <div className="hub-dark-bg hub-dark-bg-soft" style={{ backgroundImage: `url('${bgImage}')` }} />
      <div className="section-inner hub-dark-inner">
        <div className="section-header fade-up">
          {hubLabel(data?.eyebrow || "Funding and Assistance", true)}
          <h2>
            {tp.before}
            <span className="gold">{tp.accent}</span>
            {tp.after}
          </h2>
          <p>{subtitle}</p>
        </div>
        <div className="aip-funding-grid fade-up">
          {items.map((item: any, i: number) => (
            <div key={item.title || i} className="aip-funding-card">
              {item.url ? (
                <a href={item.url} className="aip-funding-link" target="_blank" rel="noreferrer">
                  {item.title}
                </a>
              ) : (
                <h4>{item.title}</h4>
              )}
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  RESOURCES / LEARN MORE SECTION (light)                             */
/* ================================================================== */

const DEFAULT_RESOURCE_ITEMS = [
  { icon: "list", title: "Our Process", description: "Five clear steps from consultation to walkthrough.", url: "/process/" },
  { icon: "help-circle", title: "FAQ", description: "Answers to the most common remodeling questions.", url: "/faq/" },
  { icon: "star", title: "Reviews", description: "What our clients say about working with BuiltWell.", url: "/reviews/" },
  { icon: "users", title: "About Us", description: "Our team, our standards, and why we do this.", url: "/about/" },
  { icon: "briefcase", title: "Case Studies", description: "Real projects with scope, timeline, and results.", url: "/case-studies/" },
];

function ResourcesSectionHub({ data }: { data?: FeatureGridData }) {
  const tp = data ? parts(data.title, data.highlight_text) : { before: "Learn ", accent: "More", after: "" };
  const items = data?.items?.length ? data.items : DEFAULT_RESOURCE_ITEMS;

  return (
    <section className="section hub-section-light">
      <div className="section-inner">
        <div className="section-header fade-up">
          {hubLabel(data?.eyebrow || "Additional Resources")}
          <h2>
            {tp.before}
            <span className="gold">{tp.accent}</span>
            {tp.after}
          </h2>
        </div>
        <div className="resource-grid fade-up">
          {items.map((item: any, i: number) => (
            <Link key={item.url || i} href={item.url || "#"} className="resource-card">
              <div className="resource-card-icon">
                {resourceIcon(item.icon)}
              </div>
              <h3>{item.title}</h3>
              <p className="resource-card-desc">{item.description}</p>
              <span className="resource-arrow">
                View <ArrowRight aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

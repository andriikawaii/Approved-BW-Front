"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import type { CMSPage } from "@/types/cms";
import { parts, section, sections, LeadFormSection } from "./template-utils";
import { usePageData } from "@/src/context/PageDataContext";

interface PolicySection {
  eyebrow: string;
  title: string;
  title_highlight: string;
  content: string; // raw HTML
  bg: "white" | "cream";
}

interface StepCard {
  number: string;
  icon: string;
  title: string;
  description: string;
}

interface TrustItem {
  icon?: string;
  label: string;
  value?: string | null;
  url?: string;
}

function stripIcon(icon?: string): React.JSX.Element {
  switch ((icon || "").toLowerCase()) {
    case "star":
      return <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>;
    case "calendar":
    case "license":
      return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M8 2v4M16 2v4M3 10h18" /></svg>;
    case "verified":
    case "check":
      return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M9 12l2 2 4-4" /></svg>;
    default:
      return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M9 12l2 2 4-4" /></svg>;
  }
}

export function WarrantyPageTemplate({ page }: { page: CMSPage }) {
  const { phones } = usePageData();
  const phoneItems = phones ?? [];
  const fairfieldPhone = phoneItems.find((p) => p.label.toLowerCase().includes("fairfield"));
  const newHavenPhone = phoneItems.find((p) => p.label.toLowerCase().includes("new haven"));
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = wrapRef.current;
    if (!root) return;
    const els = root.querySelectorAll<HTMLElement>(".fade-up");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { (e.target as HTMLElement).classList.add("visible"); io.unobserve(e.target); } }),
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const hero = section<any>(page, "hero");
  const trustBars = sections<any>(page, "trust_bar");
  const heroTrust = trustBars[0];
  const darkTrust = trustBars[1];
  const richTexts = page.sections.filter((s) => s.is_active && s.type === "rich_text").map((s) => s.data as any);
  const policySections: PolicySection[] = richTexts.filter((r: any) => r.style_variant === "policy") || [];
  const requestData = richTexts.find((r: any) => r.style_variant === "request_steps");
  const financingData = richTexts.find((r: any) => r.style_variant === "financing_strip");
  const leadForm = section<any>(page, "lead_form");

  const heroTitle = hero?.title || hero?.headline || "Warranty Policy for Connecticut Remodeling";
  const heroHighlight = hero?.title_highlight || hero?.highlight_text || "Connecticut";
  const hp = parts(heroTitle, heroHighlight);

  const defaultPolicySections: PolicySection[] = [
    {
      eyebrow: "Our Commitment", title: "2-Year Workmanship Warranty", title_highlight: "Warranty", bg: "white",
      content: `<p>BuiltWell CT provides a 2-year workmanship warranty on all labor performed on every remodeling project in Fairfield and New Haven Counties, Connecticut, covering defects in installation at no charge to the homeowner.</p>
<p>If something we installed fails because of how it was installed, we come back and correct it at no charge. This warranty is provided by BuiltWell CT, a Connecticut licensed Home Improvement Contractor (CT HIC License #0668405), and is governed by the laws of the State of Connecticut.</p>
<p>This warranty is straightforward. If something we built or installed doesn't hold up because of how it was done, we return and make it right. No charge, no argument about whether it qualifies.</p>
<p><strong>What the workmanship warranty covers:</strong></p>
<ul><li>Defects in installation: tile that lifts, trim that separates, fixtures that fail because of how they were set, framing issues, or any other condition that traces back to how the work was performed</li><li>Any labor-related failure on your project within 2 years of project completion</li><li>All work performed by our subcontractors under your project contract</li></ul>
<p><strong>What the workmanship warranty does not cover:</strong></p>
<ul><li>Normal wear over time, including floors, painted finishes, and grout that show age through regular use</li><li>Damage caused by the homeowner, other contractors, or third parties after the project is complete</li><li>Water intrusion from homeowner-controlled sources such as a roof leak, HVAC failure, or exterior drainage issue that the homeowner is responsible for maintaining</li><li>Modifications made to the completed work by anyone other than BuiltWell</li><li>Pre-existing conditions that were identified and disclosed at the time of the project, such as a moisture issue, foundation concern, or existing structural condition noted in the proposal</li><li>Materials or work supplied by the homeowner or the homeowner's separate contractors</li><li>Cosmetic changes in materials that are considered normal behavior, including minor wood movement, hairline concrete or stucco cracking, and natural variations in grout color over time</li></ul>
<p>The warranty applies to the original project location and the original homeowner. This warranty is non-transferable to subsequent property owners unless BuiltWell provides written consent.</p>`,
    },
    {
      eyebrow: "Product Coverage", title: "Manufacturer and Product Warranties", title_highlight: "Warranties", bg: "cream",
      content: `<p>All materials installed by BuiltWell CT carry separate manufacturer warranties in addition to our 2-year workmanship warranty, giving Connecticut homeowners dual protection on every product and installation.</p>
<p>Cabinets, countertops, flooring, fixtures, and appliances each carry warranties that vary by manufacturer and product line. These warranties are provided directly by the manufacturer and cover product defects rather than installation issues. For any product-related defect, the manufacturer's warranty governs coverage, duration, and remedy. We assist in processing manufacturer warranty claims on your behalf, but our liability for product defects is limited to the manufacturer's warranty terms.</p>
<p>All products are installed according to manufacturer specifications. If a product fails due to a manufacturing defect, the manufacturer's warranty applies. If the same product fails due to how we installed it, our workmanship warranty applies.</p>
<p>At project completion, we provide documentation for all applicable product warranties. Where a manufacturer requires product registration to activate warranty coverage, we register the product on your behalf.</p>`,
    },
    {
      eyebrow: "Full Transparency", title: "What Is Not Covered", title_highlight: "Not Covered", bg: "white",
      content: `<p>The BuiltWell CT workmanship warranty covers installation defects only and does not extend to normal wear, homeowner-caused damage, pre-existing conditions, deferred maintenance, or force majeure events.</p>
<p>This section is written plainly so there is no confusion later.</p>
<p><strong>The following are not covered:</strong></p>
<ul><li><strong>Normal wear over time.</strong> Floors get scratched, finishes fade, grout discolors with years of use. That is expected maintenance, not a defect.</li><li><strong>Damage from misuse or outside causes.</strong> If a fixture is damaged by impact, a floor is damaged by a water leak unrelated to the project, or any part of the finished work is altered by someone other than our team, that falls outside the warranty.</li><li><strong>Pre-existing conditions.</strong> If a condition was present before construction began and was disclosed to you in writing at the time of the project, we are not responsible for how that condition affects the finished work over time. We document pre-existing conditions in the project proposal precisely to avoid this ambiguity.</li><li><strong>Deferred maintenance.</strong> If a home system that affects the project area is not maintained after completion, any resulting damage to our work is not covered. See the Homeowner Maintenance Obligations section below for details.</li><li><strong>Force majeure events.</strong> Damage caused by floods, storms, fire, earthquakes, or other events beyond anyone's control. See the Force Majeure Exclusions section below.</li><li><strong>Consequential or incidental damages.</strong> Our liability is limited to the repair or replacement of the defective work. See the Limitation of Liability section below.</li></ul>
<p>If you're not sure whether something qualifies, contact us and we'll give you a direct answer.</p>`,
    },
    {
      eyebrow: "Required Notice", title: "Notice Requirements and Right to Cure", title_highlight: "Right to Cure", bg: "cream",
      content: `<p>Connecticut homeowners must provide written notice within 30 days of discovering a defect, after which BuiltWell CT has 15 business days to inspect and the right to repair before any legal remedy is pursued.</p>
<p>Connecticut does not have a statutory right-to-cure law for construction defects (unlike some other states), which makes this contractual provision essential to the warranty process.</p>
<p><strong>Written notice within 30 days.</strong> If you discover a condition you believe is a workmanship defect, you must provide written notice to BuiltWell within 30 days of discovering the issue. Notice may be sent by email to the address provided in your project contract, or by certified mail to our office at 206A Boston Post Road, Orange, CT 06477. The notice should describe the issue and its location within the project area.</p>
<p><strong>Our right to inspect.</strong> Upon receiving your written notice, BuiltWell has 15 business days to schedule and conduct an on-site inspection of the reported condition. You agree to provide reasonable access to the project area for this inspection.</p>
<p><strong>Our right to cure.</strong> If the inspection confirms a workmanship defect covered by this warranty, BuiltWell has the right to repair or correct the defect before any other remedy is pursued. We will provide you with a written scope of the corrective work and a timeline for completion.</p>
<p><strong>Failure to provide notice or access.</strong> If written notice is not provided within 30 days of discovery, or if reasonable access for inspection is not granted, the warranty claim for that specific defect may be voided.</p>`,
    },
    {
      eyebrow: "Acts of God", title: "Force Majeure Exclusions", title_highlight: "Exclusions", bg: "white",
      content: `<p>The BuiltWell CT warranty excludes damage from floods, hurricanes, earthquakes, fire, ice storms, government actions, and other events beyond the control of either party.</p>
<p>These events include but are not limited to:</p>
<ul><li>Floods, hurricanes, tropical storms, tornadoes, or other severe weather events</li><li>Earthquakes, lightning strikes, or ice storms</li><li>Fire, whether caused by natural or external sources</li><li>Government actions, condemnation, or changes in building codes enacted after project completion</li><li>Pandemic, civil unrest, or other extraordinary circumstances beyond reasonable control</li></ul>
<p>Damage from these events should be addressed through your homeowner's insurance policy.</p>`,
    },
    {
      eyebrow: "Your Responsibility", title: "Homeowner Maintenance Obligations", title_highlight: "Obligations", bg: "cream",
      content: `<p>The BuiltWell CT warranty requires homeowners to perform reasonable maintenance including caulk upkeep, gutter clearing, ventilation management, and HVAC filter replacement to maintain coverage.</p>
<p>Failure to maintain the project area and related home systems may void warranty coverage for defects caused by or related to that lack of maintenance.</p>
<p><strong>Maintenance responsibilities include but are not limited to:</strong></p>
<ul><li>Maintaining caulk and grout seals in wet areas such as bathrooms, kitchens, and around windows</li><li>Keeping gutters and exterior drainage systems clear and functional</li><li>Maintaining proper indoor ventilation and humidity levels to prevent moisture-related damage</li><li>Replacing HVAC filters on a regular schedule</li><li>Addressing minor maintenance items such as touch-up painting, re-caulking, and hardware tightening as needed</li><li>Reporting potential defects promptly rather than allowing conditions to worsen</li></ul>
<p>At your final walkthrough, we provide specific maintenance recommendations for the materials and systems installed in your project. Following those recommendations preserves both your warranty coverage and the longevity of the work.</p>`,
    },
    {
      eyebrow: "Resolution Process", title: "Dispute Resolution", title_highlight: "Resolution", bg: "white",
      content: `<p>BuiltWell CT uses a three-step dispute resolution process for warranty claims in Connecticut: direct resolution first, then mediation, then binding arbitration under AAA construction industry rules.</p>
<p>We believe most warranty issues can be resolved through direct communication. In the rare event that a dispute cannot be resolved through our standard inspection and repair process, the following steps apply.</p>
<p><strong>Step 1: Direct resolution.</strong> Contact us to discuss the issue. The majority of concerns are resolved at this stage through inspection and corrective work at no charge.</p>
<p><strong>Step 2: Mediation.</strong> If direct resolution is not successful, either party may request mediation. Mediation will be conducted by a mutually agreed-upon mediator in the State of Connecticut. The cost of mediation is shared equally between both parties.</p>
<p><strong>Step 3: Binding arbitration.</strong> If mediation does not resolve the dispute, either party may initiate binding arbitration in accordance with the construction industry rules of the American Arbitration Association. Arbitration will be conducted in the State of Connecticut. The arbitrator's decision is final and binding. This provision is enforceable under Connecticut law, including for claims under the Connecticut Unfair Trade Practices Act (CUTPA).</p>
<p>This tiered approach protects both parties. It gives us the opportunity to make things right before legal proceedings, and it gives you a clear, enforceable path to resolution if we fail to do so.</p>`,
    },
    {
      eyebrow: "Liability", title: "Limitation of Liability", title_highlight: "Liability", bg: "cream",
      content: `<p>BuiltWell CT's warranty liability is limited to the cost of repairing or replacing defective workmanship, excluding consequential, incidental, or special damages to the fullest extent permitted under Connecticut law.</p>
<p>Excluded damages include but are not limited to: temporary housing or relocation costs, loss of use of any portion of the home, lost income or profits, damage to personal property not caused directly by our repair work, or any other indirect costs.</p>
<p>Nothing in this warranty limits your rights under the Connecticut Home Improvement Act (CGS Chapter 400) or the Connecticut Unfair Trade Practices Act (CGS 42-110a et seq.). This warranty is provided in addition to any implied warranties required by Connecticut law and does not replace or limit those protections.</p>
<p>No oral representations, promises, or agreements made by any BuiltWell representative modify the terms of this written warranty. Any modifications to this warranty must be in writing and signed by both parties.</p>`,
    },
    {
      eyebrow: "Legal Framework", title: "Connecticut Law and Homeowner Rights", title_highlight: "Homeowner Rights", bg: "white",
      content: `<p>This warranty is governed by Connecticut law, including the Home Improvement Act (CGS 20-418 through 20-432), the 6-year statute of limitations on contract claims, and the Connecticut Unfair Trade Practices Act.</p>
<p>The following statutes may be relevant to your rights as a homeowner:</p>
<ul><li><strong>Connecticut Home Improvement Act (CGS 20-418 through 20-432):</strong> Establishes requirements for home improvement contracts, contractor registration, and homeowner protections, including the right to cancel within three business days of signing.</li><li><strong>Statute of Limitations (CGS 52-576):</strong> Written contract claims must be brought within 6 years of when the cause of action accrues.</li><li><strong>Connecticut Unfair Trade Practices Act (CGS 42-110a et seq.):</strong> Provides additional consumer protections. Any violation of the Home Improvement Act is also a violation of CUTPA.</li><li><strong>CT Department of Consumer Protection:</strong> Homeowners may file complaints with the DCP and may be eligible for recovery through the Home Improvement Guaranty Fund (up to $25,000) after obtaining a court judgment.</li></ul>
<p>BuiltWell CT is registered with the Connecticut Department of Consumer Protection as a Home Improvement Contractor under License #0668405. You can verify our license status at the <a href="https://www.elicense.ct.gov/Lookup/LicenseLookup.aspx" target="_blank" rel="noopener noreferrer">CT DCP License Lookup</a>.</p>
<p><strong>Severability.</strong> If any provision of this warranty is found to be unenforceable by a court of competent jurisdiction, the remaining provisions remain in full force and effect.</p>`,
    },
  ];

  const activePolicies = policySections.length > 0 ? policySections : defaultPolicySections;

  const defaultHeroTrustItems: TrustItem[] = [
    { label: "Years of Experience", value: "15+" },
    { label: "Completed Projects", value: "100+" },
    { label: "Google Rating", value: "4.9", url: "https://www.google.com/maps/search/?api=1&query=BuiltWell+CT,+206A+Boston+Post+Road,+Orange,+CT+06477" },
    { icon: "shield", label: "Fully Bonded & Insured", value: null },
  ];
  const defaultTrustStripItems: TrustItem[] = [
    { icon: "star", label: "Google Rating 4.9", url: "https://www.google.com/search?q=builtwell+ct+reviews" },
    { icon: "verified", label: "Trusted on Houzz", url: "https://www.houzz.com/professionals/general-contractors/builtwell-ct" },
    { icon: "calendar", label: "CT HIC License #0668405", url: "https://www.elicense.ct.gov/Lookup/LicenseLookup.aspx" },
  ];
  const heroTrustItems: TrustItem[] = heroTrust?.items?.length ? heroTrust.items : defaultHeroTrustItems;
  const trustStripItems: TrustItem[] = darkTrust?.items?.length ? darkTrust.items : defaultTrustStripItems;

  const defaultSteps: StepCard[] = [
    { number: "1", icon: "phone", title: "Contact Us", description: 'Call us, text us, or use the <a href="/contact/">contact form</a>. Describe what you\'re seeing and where in the project area.' },
    { number: "2", icon: "clock", title: "We Schedule a Visit", description: "We confirm receipt and schedule an on-site inspection within 15 business days to assess the condition firsthand." },
    { number: "3", icon: "check", title: "Covered? We Fix It", description: "If the issue falls within workmanship warranty coverage, we schedule the repair and complete it at no cost to you." },
    { number: "4", icon: "chat", title: "Clear Communication", description: "If the issue is not covered, we tell you clearly why, and we can discuss repair options if you'd like to proceed." },
  ];

  const steps = requestData?.cards || defaultSteps;
  const heroSubtitle = hero?.subtitle || hero?.subheadline || "We stand behind the work we complete. This page explains exactly what is covered, for how long, and what to do if something needs attention after your project is done.";
  const heroPrimaryLabel = hero?.cta_primary?.label || "Get Your Free Estimate";
  const heroPrimaryUrl = hero?.cta_primary?.url || "/free-consultation/";
  const financingTitle = financingData?.title || "Flexible Financing Available";
  const financingText = typeof financingData?.content === "string"
    ? financingData.content.replace(/<[^>]+>/g, "")
    : "Get approved in about 60 seconds (through GreenSky, subject to credit approval) and start your project today.";
  const financingCtaLabel = financingData?.cta?.label || "Check Financing Options";
  const financingCtaUrl = financingData?.cta?.url || "https://www.greensky.com";

  const stepIcons: Record<string, React.JSX.Element> = {
    phone: <svg viewBox="0 0 24 24" fill="none" stroke="#BC9155" strokeWidth="1.5" width="28" height="28"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>,
    clock: <svg viewBox="0 0 24 24" fill="none" stroke="#BC9155" strokeWidth="1.5" width="28" height="28"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
    check: <svg viewBox="0 0 24 24" fill="none" stroke="#BC9155" strokeWidth="1.5" width="28" height="28"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>,
    chat: <svg viewBox="0 0 24 24" fill="none" stroke="#BC9155" strokeWidth="1.5" width="28" height="28"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
  };

  return (
    <div ref={wrapRef}>
      <style>{`
        .fade-up{opacity:0;transform:translateY(30px);transition:opacity 0.7s ease,transform 0.7s ease}
        .fade-up.visible{opacity:1;transform:translateY(0)}

        /* HERO */
        .wt-hero{background:#151E30;padding:0 40px 48px;padding-top:120px;color:#fff;position:relative;overflow:hidden;min-height:50vh;display:flex;align-items:stretch;isolation:isolate}
        .wt-hero::after{content:'';position:absolute;inset:0;background:url('/images/headers/design-planning-header.jpg') center 30%/cover no-repeat;opacity:0.72;z-index:0}
        .wt-hero::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse at 97% 97%,rgba(21,30,48,1) 0%,rgba(21,30,48,0.9) 8%,transparent 30%),radial-gradient(ellipse at 3% 97%,rgba(21,30,48,0.9) 0%,transparent 25%),linear-gradient(180deg,rgba(21,30,48,0.35) 0%,rgba(21,30,48,0.2) 30%,rgba(21,30,48,0.45) 65%,rgba(21,30,48,0.92) 100%);z-index:1}
        .wt-hero-inner{max-width:1240px;margin:0 auto;position:relative;z-index:2;width:100%;display:flex;flex-direction:column;align-items:center;text-align:center;justify-content:center}
        .wt-breadcrumb{display:flex;align-items:center;gap:0;font-size:13px;font-weight:500;font-family:Inter,sans-serif;color:rgba(255,255,255,0.92);margin-bottom:20px;padding:0;list-style:none;text-shadow:0 1px 6px rgba(0,0,0,0.7)}
        .wt-breadcrumb li{display:flex;align-items:center}
        .wt-breadcrumb li+li::before{content:'\\203A';color:#BC9155;margin:0 10px;font-size:12px}
        .wt-breadcrumb a{color:rgba(255,255,255,0.85);transition:color 0.2s}
        .wt-breadcrumb a:hover{color:#BC9155}
        .wt-breadcrumb .current{color:#fff;font-weight:600}
        .wt-hero h1{font-size:clamp(40px,4.5vw,56px);line-height:1.08;margin-bottom:12px;letter-spacing:-0.5px;text-shadow:0 2px 20px rgba(0,0,0,0.5)}
        .wt-hero .subtitle{font-size:17px;color:rgba(255,255,255,0.82);line-height:1.7;max-width:560px;margin:16px auto 0;font-family:Inter,sans-serif;font-weight:400}
        .wt-hero-ctas{display:flex;gap:16px;margin-top:32px;flex-wrap:wrap;justify-content:center}
        .wt-cta-btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;padding:14px 32px;border-radius:8px;background:rgba(10,18,35,0.42);border:1px solid rgba(255,255,255,0.22);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);color:#fff;text-decoration:none;font-size:15px;font-weight:600;letter-spacing:0.3px;white-space:nowrap;transition:background 0.3s,border-color 0.3s,transform 0.3s,box-shadow 0.3s}
        .wt-cta-btn:hover{background:rgba(10,18,35,0.62);border-color:rgba(255,255,255,0.35);transform:translateY(-2px);box-shadow:0 8px 24px rgba(0,0,0,0.3)}
        .wt-cta-btn.wt-cta-primary{background:#BC9155;border:1px solid #BC9155;backdrop-filter:none}
        .wt-cta-btn.wt-cta-primary:hover{background:#d4a95a;border-color:#d4a95a;box-shadow:0 8px 24px rgba(188,145,85,0.4)}

        /* TRUST BAR */
        .wt-trust-bar{background:linear-gradient(135deg,#1E2B43 0%,#151E30 100%);border-top:1px solid rgba(188,145,85,0.2);border-bottom:1px solid rgba(188,145,85,0.2)}
        .wt-trust-bar-inner{max-width:1280px;margin:0 auto;display:grid;grid-template-columns:repeat(4,1fr);text-align:center}
        .wt-trust-item{padding:36px 20px;border-right:1px solid rgba(188,145,85,0.12);transition:background 0.3s,transform 0.3s;cursor:default}
        .wt-trust-item:hover{background:rgba(188,145,85,0.08);transform:translateY(-3px)}
        .wt-trust-item:hover .wt-trust-number{color:#d4a95a;text-shadow:0 0 20px rgba(188,145,85,0.3)}
        .wt-trust-item:hover .wt-trust-label{color:rgba(255,255,255,0.85)}
        .wt-trust-item:last-child{border-right:none}
        .wt-trust-number{font-family:'Playfair Display',serif;font-size:42px;font-weight:700;color:#BC9155;line-height:1;min-height:42px;display:flex;align-items:center;justify-content:center;transition:color 0.3s,text-shadow 0.3s}
        .wt-trust-label{font-size:13px;color:rgba(255,255,255,0.6);margin-top:8px;text-transform:uppercase;letter-spacing:1px;font-weight:500;transition:color 0.3s}

        /* DARK TRUST STRIP */
        .wt-trust-strip{background:linear-gradient(135deg,#1E2B43 0%,#151E30 100%);padding:56px 40px;position:relative;overflow:hidden}
        .wt-trust-strip::before{content:'';position:absolute;inset:0;background:url('/hero/builtwell-job-site-aerial-hero-ct.jpg') center/cover no-repeat;opacity:0.12}
        .wt-trust-strip-inner{max-width:1200px;margin:0 auto;display:flex;align-items:center;justify-content:center;gap:0;flex-wrap:wrap;position:relative;z-index:1}
        .wt-trust-strip-item{display:flex;flex-direction:column;align-items:center;gap:10px;font-size:13px;font-weight:600;color:rgba(255,255,255,0.9);letter-spacing:0.4px;white-space:nowrap;text-decoration:none;transition:all 0.3s;padding:20px 32px;flex:1;min-width:180px;text-align:center}
        .wt-trust-strip-item:hover{color:#BC9155;transform:translateY(-2px)}
        .wt-trust-strip-item svg{color:#BC9155;flex-shrink:0;width:22px;height:22px;filter:drop-shadow(0 2px 4px rgba(188,145,85,0.3))}
        .wt-trust-divider{width:1px;height:40px;background:rgba(255,255,255,0.1);flex-shrink:0}

        /* FINANCING STRIP */
        .wt-financing-strip{background:#fff;padding:56px 40px;border-top:1px solid rgba(30,43,67,0.08)}
        .wt-financing-inner{max-width:1200px;margin:0 auto;display:flex;flex-direction:column;align-items:center;gap:24px;text-align:center}
        .wt-financing-left{display:flex;flex-direction:column;align-items:center;gap:16px}
        .wt-greensky-logo{font-weight:700;font-size:24px;letter-spacing:-0.3px;flex-shrink:0}
        .wt-gs-green{color:#6BBF4E}
        .wt-gs-dark{color:#1E2B43}
        .wt-financing-text{font-size:16px;color:#5C677D;line-height:1.6}
        .wt-financing-text strong{font-weight:700;color:#1E2B43}
        .wt-financing-cta{display:inline-flex;align-items:center;justify-content:center;gap:10px;min-width:280px;min-height:52px;padding:14px 32px;border-radius:8px;font-family:Inter,sans-serif;font-weight:600;font-size:15px;background:#BC9155;color:#fff;letter-spacing:0.3px;white-space:nowrap;text-decoration:none;transition:background 0.2s,transform 0.2s,box-shadow 0.2s;cursor:pointer;border:none}
        .wt-financing-cta:hover{background:#a57d48;transform:translateY(-1px);box-shadow:0 4px 12px rgba(188,145,85,0.3)}

        /* POLICY SECTIONS */
        .wt-policy{padding:80px 40px}
        .wt-policy-white{background:#fff;border-bottom:1px solid rgba(30,43,67,0.06)}
        .wt-policy-cream{background:#F5F1E9}
        .wt-policy-inner{max-width:1240px;margin:0 auto}
        .wt-content{max-width:820px;margin:0 auto}
        .wt-content h2{font-size:clamp(28px,3vw,38px);margin-bottom:20px;letter-spacing:-0.3px}
        .wt-content p{font-size:16px;color:#5C677D;line-height:1.85;margin-bottom:20px}
        .wt-content p:last-child{margin-bottom:0}
        .wt-content ul{list-style:none;padding:0;margin:0 0 24px}
        .wt-content ul li{position:relative;padding-left:24px;font-size:15px;color:#5C677D;line-height:1.8;margin-bottom:10px}
        .wt-content ul li::before{content:'';position:absolute;left:0;top:12px;width:8px;height:8px;border-radius:50%;background:#BC9155}
        .wt-content ul li:last-child{margin-bottom:0}
        .wt-content strong{color:#1E2B43;font-weight:600}
        .wt-content a{color:#BC9155;font-weight:600}
        .wt-label{display:inline-block;font-size:11px;font-weight:700;color:#9A7340;text-transform:uppercase;letter-spacing:1.5px;margin-bottom:16px;position:relative;padding-left:20px}
        .wt-label::before{content:'';position:absolute;left:0;top:50%;transform:translateY(-50%);width:10px;height:2px;background:#BC9155}
        .wt-section-header{text-align:center;margin-bottom:28px}

        /* REQUEST STEPS */
        .wt-request{padding:100px 40px;background:#F5F1E9}
        .wt-request-inner{max-width:1240px;margin:0 auto}
        .wt-request .wt-section-header{margin-bottom:64px}
        .wt-request .wt-section-header h2{font-size:clamp(28px,3.5vw,44px);margin-bottom:20px;letter-spacing:-0.5px}
        .wt-request .wt-section-header p{font-size:17px;color:#5C677D;max-width:700px;margin:0 auto;line-height:1.75}
        .wt-steps-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:24px}
        .wt-step-card{background:#fff;border-radius:12px;padding:36px 24px 32px;text-align:center;position:relative;border:1px solid rgba(30,43,67,0.07);box-shadow:0 2px 12px rgba(30,43,67,0.06),0 1px 3px rgba(30,43,67,0.04);transition:all 0.35s cubic-bezier(0.4,0,0.2,1);border-bottom:2px solid transparent}
        .wt-step-card:hover{transform:translateY(-4px);border-bottom-color:#BC9155;box-shadow:0 12px 28px rgba(30,43,67,0.1),0 28px 56px rgba(30,43,67,0.08)}
        .wt-step-num{position:absolute;top:-14px;left:50%;transform:translateX(-50%);width:28px;height:28px;border-radius:50%;background:#BC9155;color:#fff;font-family:'Playfair Display',serif;font-size:14px;font-weight:700;display:flex;align-items:center;justify-content:center;box-shadow:0 2px 8px rgba(188,145,85,0.3)}
        .wt-step-icon{width:56px;height:56px;border-radius:50%;background:rgba(188,145,85,0.1);display:flex;align-items:center;justify-content:center;margin:0 auto 20px}
        .wt-step-card h3{font-size:18px;margin-bottom:10px;font-family:Inter,sans-serif;font-weight:600;color:#1E2B43}
        .wt-step-card p{font-size:14px;color:#5C677D;line-height:1.65}
        .wt-step-card a{color:#BC9155;font-weight:600}
        .wt-bottom-text{text-align:center;color:#5C677D;font-size:16px;margin-top:48px;line-height:1.7}
        .wt-phone-pills{display:flex;gap:32px;justify-content:center;margin-top:20px;flex-wrap:wrap}
        .wt-phone-pill{display:inline-flex;align-items:center;gap:10px;background:#fff;border:1px solid rgba(30,43,67,0.08);border-radius:999px;padding:12px 24px;font-size:15px;color:#1E2B43;font-family:Inter,sans-serif;transition:all 0.25s;box-shadow:0 2px 8px rgba(30,43,67,0.05)}
        .wt-phone-pill:hover{border-color:#BC9155;box-shadow:0 4px 16px rgba(188,145,85,0.15);transform:translateY(-2px)}
        .wt-phone-pill svg{stroke:#BC9155;flex-shrink:0}
        .wt-phone-pill strong{color:#9A7340}

        @media(max-width:900px){
          .wt-steps-grid{grid-template-columns:repeat(2,1fr)}
          .wt-step-card{padding:32px 20px 28px}
        }
        @media(max-width:1024px){
          .wt-financing-strip{padding:36px 32px}
          .wt-financing-inner{gap:20px}
          .wt-financing-left{gap:16px}
          .wt-trust-strip{padding:40px 24px}
          .wt-trust-strip-item{padding:16px 20px;min-width:140px;font-size:12px}
          .wt-trust-divider{display:none}
        }
        @media(max-width:768px){
          .wt-hero{padding:110px 20px 40px;min-height:auto}
          .wt-hero h1{font-size:clamp(32px,7vw,44px)}
          .wt-hero .subtitle{font-size:15px}
          .wt-hero-ctas{flex-direction:column;align-items:center}
          .wt-cta-btn{width:100%;max-width:320px}
          .wt-trust-bar-inner{grid-template-columns:repeat(2,1fr)}
          .wt-trust-item{padding:24px 12px;border-bottom:1px solid rgba(188,145,85,0.12)}
          .wt-trust-item:nth-child(2n){border-right:none}
          .wt-trust-item:nth-last-child(-n+2){border-bottom:none}
          .wt-trust-number{font-size:30px;min-height:34px}
          .wt-trust-label{font-size:11px;margin-top:6px;letter-spacing:0.8px}
          .wt-trust-strip{padding:32px 20px}
          .wt-trust-strip-item{padding:16px 12px;min-width:33.33%;font-size:11px}
          .wt-trust-strip-item svg{width:18px;height:18px}
          .wt-financing-strip{padding:28px 20px}
          .wt-financing-inner{gap:16px}
          .wt-financing-left{gap:12px}
          .wt-financing-text{font-size:14px}
          .wt-policy{padding:60px 20px}
          .wt-request{padding:60px 20px}
        }
        @media(max-width:600px){
          .wt-steps-grid{grid-template-columns:1fr}
          .wt-phone-pill{width:100%;justify-content:center}
        }
        @media(max-width:480px){
          .wt-hero{padding:100px 16px 32px}
          .wt-hero h1{font-size:clamp(28px,7vw,36px)}
          .wt-policy{padding:48px 16px}
          .wt-request{padding:48px 16px}
        }
      `}</style>

      {/* HERO */}
      <section className="wt-hero">
        <div className="wt-hero-inner">
          <ol className="wt-breadcrumb" aria-label="Breadcrumb">
            <li><Link href="/">Home</Link></li>
            <li><span className="current">Warranty</span></li>
          </ol>
          <h1 className="font-serif font-bold">
            {hp.before}<span className="text-[#bc9155]">{hp.accent}</span>{hp.after}
          </h1>
          <p className="subtitle">
            {heroSubtitle}
          </p>
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

      {/* TRUST BAR */}
      <section className="wt-trust-bar">
        <div className="wt-trust-bar-inner">
          {heroTrustItems.map((item, index) => {
            const node = (
              <>
                <div className="wt-trust-number">
                  {item.value ? (
                    item.value
                  ) : (
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                  )}
                </div>
                <div className="wt-trust-label">{item.label}</div>
              </>
            );

            return item.url ? (
              <a key={`${item.label}-${index}`} href={item.url} target="_blank" rel="noopener noreferrer" className="wt-trust-item" style={{ textDecoration: "none", color: "inherit", cursor: "pointer" }}>
                {node}
              </a>
            ) : (
              <div key={`${item.label}-${index}`} className="wt-trust-item">
                {node}
              </div>
            );
          })}
        </div>
      </section>

      {/* POLICY SECTIONS */}
      {activePolicies.map((ps, i) => {
        const pp = parts(ps.title, ps.title_highlight);
        return (
          <section key={i} className={`wt-policy ${ps.bg === "cream" ? "wt-policy-cream" : "wt-policy-white"}`}>
            <div className="wt-policy-inner">
              <div className="wt-content fade-up">
                <div className="wt-section-header">
                  <span className="wt-label">{ps.eyebrow}</span>
                  <h2 className="font-serif font-bold">{pp.before}<span className="text-[#bc9155]">{pp.accent}</span>{pp.after}</h2>
                </div>
                <div dangerouslySetInnerHTML={{ __html: ps.content }} />
              </div>
            </div>
          </section>
        );
      })}

      {/* HOW TO REQUEST WARRANTY SERVICE */}
      <section className="wt-request">
        <div className="wt-request-inner">
          <div className="wt-section-header fade-up">
            <span className="wt-label">{requestData?.eyebrow || "Warranty Service"}</span>
            {(() => {
              const rp = parts(requestData?.title || "How to Request Warranty Service", requestData?.title_highlight || "Warranty Service");
              return <h2 className="font-serif font-bold">{rp.before}<span className="text-[#bc9155]">{rp.accent}</span>{rp.after}</h2>;
            })()}
            <p>{requestData?.subtitle || "If you believe something we installed needs attention under warranty, contact us directly. We respond within one business day."}</p>
          </div>
          <div className="wt-steps-grid fade-up">
            {steps.map((step: any, i: number) => (
              <div key={i} className="wt-step-card">
                <div className="wt-step-num">{step.number || i + 1}</div>
                <div className="wt-step-icon">
                  {stepIcons[step.icon] || stepIcons.phone}
                </div>
                <h3>{step.title}</h3>
                <p dangerouslySetInnerHTML={{ __html: step.description }} />
              </div>
            ))}
          </div>
          <p className="wt-bottom-text fade-up">{requestData?.bottom_text || "There's no complicated claim process. You call or write, we look at it, and we handle it if it's ours to handle."}</p>
          <div className="wt-phone-pills fade-up">
            {fairfieldPhone && (
              <a href={`tel:${fairfieldPhone.number.replace(/\D/g, "")}`} className="wt-phone-pill">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                <span><strong>Fairfield County:</strong> {fairfieldPhone.number}</span>
              </a>
            )}
            {newHavenPhone && (
              <a href={`tel:${newHavenPhone.number.replace(/\D/g, "")}`} className="wt-phone-pill">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                <span><strong>New Haven County:</strong> {newHavenPhone.number}</span>
              </a>
            )}
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <div className="wt-trust-strip" role="region" aria-label="Trust indicators">
        <div className="wt-trust-strip-inner">
          {trustStripItems.map((item, index) => {
            const label = [item.label, item.value].filter(Boolean).join(" ");
            return (
              <div key={`${item.label}-${index}`} style={{ display: "contents" }}>
                {item.url ? (
                  <a href={item.url} target="_blank" rel="noopener noreferrer" className="wt-trust-strip-item">
                    {stripIcon(item.icon)}
                    {label}
                  </a>
                ) : (
                  <div className="wt-trust-strip-item">
                    {stripIcon(item.icon)}
                    {label}
                  </div>
                )}
                {index < trustStripItems.length - 1 ? <div className="wt-trust-divider" /> : null}
              </div>
            );
          })}
        </div>
      </div>

      {/* LEAD FORM */}
      <LeadFormSection page={page} data={leadForm} accent="Warranty Service" />

      {/* FINANCING STRIP */}
      <div className="wt-financing-strip" role="region" aria-label="Financing options">
        <div className="wt-financing-inner">
          <div className="wt-financing-left">
            <span className="wt-greensky-logo">
              <span className="wt-gs-green">Green</span>
              <span className="wt-gs-dark">Sky</span>
            </span>
            <p className="wt-financing-text"><strong>{financingTitle}.</strong> {financingText}</p>
          </div>
          <a href={financingCtaUrl} target="_blank" rel="noopener noreferrer" className="wt-financing-cta">
            {financingCtaLabel}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
        </div>
      </div>
    </div>
  );
}

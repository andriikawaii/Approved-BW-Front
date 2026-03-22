"use client";

import Link from "next/link";
import type { CMSPage } from "@/types/cms";
import { parts, section } from "./template-utils";
import { usePageData } from "@/src/context/PageDataContext";

export function ThankYouPageTemplate({ page }: { page: CMSPage }) {
  const { phones } = usePageData();
  const phoneItems = phones ?? [];
  const fairfieldPhone = phoneItems.find((p) => p.label.toLowerCase().includes("fairfield"));
  const newHavenPhone = phoneItems.find((p) => p.label.toLowerCase().includes("new haven"));

  const hero = section<any>(page, "hero");
  const steps = section<any>(page, "rich_text");
  const explore = page.sections.filter((s) => s.is_active && s.type === "rich_text").map((s) => s.data as any);
  const stepsData = explore.find((d: any) => d.style_variant === "steps");
  const exploreData = explore.find((d: any) => d.style_variant === "cards");

  const hp = parts(hero?.title || "Thank You", hero?.title_highlight || "You");

  return (
    <>
      <style>{`
        /* Confirmation */
        .ty-confirmation{padding:140px 40px 80px;text-align:center;background:linear-gradient(135deg,#1E2B43 0%,#151E30 100%);position:relative;overflow:hidden}
        .ty-confirmation::before{content:'';position:absolute;inset:0;background:url('/portfolio/builtwell-team-van-exterior-ct-01.jpg') center/cover no-repeat;opacity:0.08}
        @keyframes tyFadeUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}
        .ty-confirmation-inner{max-width:720px;margin:0 auto;position:relative;z-index:1;animation:tyFadeUp 0.7s ease both}
        .ty-step-card,.ty-explore-card{opacity:0;animation:tyFadeUp 0.7s ease both}
        .ty-step-card:nth-child(1){animation-delay:0.1s}.ty-step-card:nth-child(2){animation-delay:0.2s}.ty-step-card:nth-child(3){animation-delay:0.3s}
        .ty-explore-card:nth-child(1){animation-delay:0.1s}.ty-explore-card:nth-child(2){animation-delay:0.15s}.ty-explore-card:nth-child(3){animation-delay:0.2s}.ty-explore-card:nth-child(4){animation-delay:0.25s}
        .ty-checkmark{width:96px;height:96px;margin:0 auto 36px;background:rgba(188,145,85,0.15);border-radius:50%;display:flex;align-items:center;justify-content:center;border:2px solid rgba(188,145,85,0.3)}
        .ty-confirmation h1{font-size:clamp(40px,5vw,56px);margin-bottom:20px;letter-spacing:-0.5px;color:#fff}
        .ty-subtitle{font-size:17px;color:rgba(255,255,255,0.78);line-height:1.8;max-width:600px;margin:0 auto 48px}
        .ty-phone-cards{display:flex;gap:20px;justify-content:center;margin-bottom:28px}
        .ty-phone-card{background:rgba(255,255,255,0.06);backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,0.12);border-bottom:2px solid #BC9155;border-radius:10px;padding:24px 36px;text-align:center;transition:transform 0.3s,background 0.3s,box-shadow 0.3s;flex:1;max-width:260px}
        .ty-phone-card:hover{transform:translateY(-3px);background:rgba(255,255,255,0.1);box-shadow:0 12px 32px rgba(0,0,0,0.2)}
        .ty-phone-label{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1.2px;color:rgba(255,255,255,0.5);margin-bottom:6px}
        .ty-phone-number{font-family:'Playfair Display',serif;font-size:22px;font-weight:700}
        .ty-phone-number a{color:#fff;transition:color 0.2s}
        .ty-phone-number a:hover{color:#BC9155}
        .ty-email{font-size:15px;color:rgba(255,255,255,0.7);margin-bottom:16px}
        .ty-email a{color:#BC9155;font-weight:600;transition:color 0.2s}
        .ty-email a:hover{color:#d4a95a}
        .ty-note{font-size:14px;color:rgba(255,255,255,0.5);font-style:italic}

        /* Steps */
        .ty-steps{padding:80px 40px;background:#F5F1E9;border-top:1px solid rgba(30,43,67,0.06)}
        .ty-steps-inner{max-width:1100px;margin:0 auto;text-align:center}
        .ty-steps-inner h2{font-size:clamp(28px,3vw,38px);margin-bottom:48px}
        .ty-steps-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:28px}
        .ty-step-card{background:#fff;border-radius:10px;padding:36px 28px;border:1px solid rgba(30,43,67,0.06);box-shadow:0 4px 16px rgba(30,43,67,0.06);text-align:center;transition:transform 0.2s,box-shadow 0.2s}
        .ty-step-card:hover{transform:translateY(-3px);box-shadow:0 8px 28px rgba(30,43,67,0.1)}
        .ty-step-num{display:inline-flex;align-items:center;justify-content:center;width:44px;height:44px;border-radius:50%;background:#BC9155;color:#fff;font-family:'Playfair Display',serif;font-size:20px;font-weight:700;margin-bottom:20px}
        .ty-step-card h3{font-size:20px;margin-bottom:12px;color:#1E2B43}
        .ty-step-card p{font-size:15px;color:#5C677D;line-height:1.7}

        /* Explore */
        .ty-explore{padding:80px 40px;background:#fff;border-top:1px solid rgba(30,43,67,0.06)}
        .ty-explore-inner{max-width:1100px;margin:0 auto;text-align:center}
        .ty-explore-inner h2{font-size:clamp(26px,3vw,34px);margin-bottom:8px}
        .ty-explore-sub{font-size:16px;color:#5C677D;margin-bottom:40px}
        .ty-explore-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:24px}
        .ty-explore-card{display:flex;flex-direction:column;align-items:center;padding:32px 20px;border-radius:10px;border:1px solid rgba(30,43,67,0.08);background:#fff;transition:transform 0.2s,box-shadow 0.2s,border-color 0.2s;text-decoration:none;color:inherit}
        .ty-explore-card:hover{transform:translateY(-3px);box-shadow:0 8px 24px rgba(30,43,67,0.1);border-color:#BC9155}
        .ty-explore-card svg.ty-card-icon{width:48px;height:48px;margin-bottom:16px;color:#BC9155}
        .ty-explore-card h3{font-size:18px;margin-bottom:8px;color:#1E2B43}
        .ty-explore-card p{font-size:14px;color:#5C677D;line-height:1.6;margin-bottom:12px}
        .ty-card-link{font-size:13px;font-weight:600;color:#BC9155;display:inline-flex;align-items:center;gap:4px;transition:color 0.2s}
        .ty-explore-card:hover .ty-card-link{color:#a57d48}

        @media(max-width:1024px){
          .ty-explore-grid{gap:20px}
          .ty-explore-card{padding:24px 16px}
        }
        @media(max-width:768px){
          .ty-confirmation{padding:110px 20px 60px}
          .ty-subtitle{font-size:15px}
          .ty-phone-cards{flex-direction:column;align-items:center}
          .ty-phone-card{max-width:100%;width:100%}
          .ty-steps{padding:60px 20px}
          .ty-steps-grid{grid-template-columns:1fr;gap:20px}
          .ty-explore{padding:60px 20px}
          .ty-explore-grid{grid-template-columns:repeat(2,1fr);gap:16px}
        }
        @media(max-width:480px){
          .ty-confirmation{padding:100px 16px 48px}
          .ty-confirmation h1{font-size:clamp(30px,7vw,40px)}
          .ty-subtitle{font-size:14px}
          .ty-checkmark{width:64px;height:64px;margin-bottom:24px}
          .ty-phone-card{padding:20px 24px}
          .ty-phone-number{font-size:18px}
          .ty-steps{padding:48px 16px}
          .ty-steps-inner h2{font-size:24px;margin-bottom:32px}
          .ty-step-card{padding:28px 20px}
          .ty-explore{padding:48px 16px}
          .ty-explore-grid{grid-template-columns:1fr}
          .ty-explore-card{padding:24px 20px}
          .ty-explore-inner h2{font-size:24px}
        }
      `}</style>

      {/* CONFIRMATION */}
      <section className="ty-confirmation">
        <div className="ty-confirmation-inner">
          <div className="ty-checkmark">
            <svg viewBox="0 0 80 80" fill="none" width="96" height="96">
              <circle cx="40" cy="40" r="38" stroke="#BC9155" strokeWidth="3" fill="rgba(188,145,85,0.08)"/>
              <path d="M24 41L34 51L56 29" stroke="#BC9155" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h1>
            {hp.before}<span className="text-[#bc9155]">{hp.accent}</span>{hp.after}
          </h1>
          <p className="ty-subtitle">
            {hero?.subtitle || "Your consultation request has been received. We will be in touch within one business day to confirm your appointment details and the name of the team member who will be visiting."}
          </p>
          <div className="ty-phone-cards">
            {fairfieldPhone && (
              <div className="ty-phone-card">
                <div className="ty-phone-label">Fairfield County</div>
                <div className="ty-phone-number">
                  <a href={`tel:${fairfieldPhone.number.replace(/\D/g, "")}`}>{fairfieldPhone.number}</a>
                </div>
              </div>
            )}
            {newHavenPhone && (
              <div className="ty-phone-card">
                <div className="ty-phone-label">New Haven County</div>
                <div className="ty-phone-number">
                  <a href={`tel:${newHavenPhone.number.replace(/\D/g, "")}`}>{newHavenPhone.number}</a>
                </div>
              </div>
            )}
          </div>
          <p className="ty-email">Email: <a href="mailto:info@buildwellct.com">info@buildwellct.com</a></p>
          <p className="ty-note">If you need to reach us sooner, call or text either number above.</p>
        </div>
      </section>

      {/* WHAT HAPPENS NEXT */}
      <section className="ty-steps">
        <div className="ty-steps-inner">
          <h2>
            {(() => {
              const sp = parts(stepsData?.title || "What Happens Next", stepsData?.title_highlight || "Next");
              return <>{sp.before}<span className="text-[#bc9155]">{sp.accent}</span>{sp.after}</>;
            })()}
          </h2>
          <div className="ty-steps-grid">
            {(stepsData?.cards || [
              { number: "1", title: "Confirmation", description: "We review your request and confirm your consultation within one business day via your preferred contact method." },
              { number: "2", title: "Consultation", description: "We visit your home or meet via Google Meet or Zoom to assess the space, discuss your goals, and answer every question." },
              { number: "3", title: "Written Estimate", description: "You receive a detailed written estimate covering scope, materials, timeline, and cost within 3 to 5 business days." },
            ]).map((step: any, i: number) => (
              <div key={i} className="ty-step-card">
                <div className="ty-step-num">{step.number || i + 1}</div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EXPLORE BUILTWELL */}
      <section className="ty-explore">
        <div className="ty-explore-inner">
          <h2>
            {(() => {
              const ep = parts(exploreData?.title || "Explore BuiltWell", exploreData?.title_highlight || "BuiltWell");
              return <>{ep.before}<span className="text-[#bc9155]">{ep.accent}</span>{ep.after}</>;
            })()}
          </h2>
          <p className="ty-explore-sub">{exploreData?.subtitle || "While you wait, explore what we do:"}</p>
          <div className="ty-explore-grid">
            {(exploreData?.cards || [
              { title: "Our Services", description: "Kitchens, bathrooms, basements, additions, and more.", link_text: "View Services", link_url: "/services/", icon: "wrench" },
              { title: "Our Process", description: "A clear, structured approach from first call to final walkthrough.", link_text: "Learn More", link_url: "/process/", icon: "clipboard" },
              { title: "Portfolio", description: "Before-and-after photos from real Connecticut projects.", link_text: "View Work", link_url: "/portfolio/", icon: "image" },
              { title: "FAQ", description: "Answers to common questions about remodeling in Connecticut.", link_text: "Read FAQ", link_url: "/faq/", icon: "question" },
            ]).map((card: any, i: number) => (
              <Link key={i} href={card.link_url || "#"} className="ty-explore-card">
                <svg className="ty-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  {card.icon === "wrench" && <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>}
                  {card.icon === "clipboard" && <><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="1"/><path d="M9 12l2 2 4-4"/></>}
                  {card.icon === "image" && <><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></>}
                  {card.icon === "question" && <><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></>}
                </svg>
                <h3>{card.title}</h3>
                <p>{card.description}</p>
                <span className="ty-card-link">
                  {card.link_text}
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

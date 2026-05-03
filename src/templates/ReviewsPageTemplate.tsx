"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import type { CMSPage } from "@/types/cms";
import { parts, label, linkNode, section, sections, HeroTrustBar, DarkTrustStrip, FinancingStrip, LeadFormSection } from "./template-utils";
import { usePageData } from "@/src/context/PageDataContext";

export function ReviewsPageTemplate({ page }: { page: CMSPage }) {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = wrapRef.current;
    if (!root) return;
    root
      .querySelectorAll<HTMLElement>(".bw-cta-header, .bw-cta-left, .bw-contact-form-wrap")
      .forEach((el) => el.classList.add("fade-up"));
    const els = root.querySelectorAll<HTMLElement>(".fade-up");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { (e.target as HTMLElement).classList.add("visible"); io.unobserve(e.target); } }),
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  const { phones } = usePageData();
  const phoneItems = phones ?? [];
  const fairfieldPhone = phoneItems.find((p) => p.label.toLowerCase().includes("fairfield"));
  const newHavenPhone = phoneItems.find((p) => p.label.toLowerCase().includes("new haven"));
  const fairfieldNumber = fairfieldPhone?.number || "(203) 919-9616";
  const newHavenNumber = newHavenPhone?.number || "(203) 466-9148";

  const hero = section<any>(page, "hero");
  const trustBars = sections<any>(page, "trust_bar");
  const heroTrust = trustBars.find((entry: any) => String(entry?.variant || "").toLowerCase() === "stats") || trustBars[0];
  const darkTrust = trustBars.find((entry: any) => String(entry?.variant || "").toLowerCase() === "links") || trustBars[1];
  const richTexts = page.sections.filter((s) => s.is_active && s.type === "rich_text").map((s) => s.data as any);
  const introData = richTexts.find((r: any) => r.style_variant === "intro");
  const testimonialsData = richTexts.find((r: any) => r.style_variant === "testimonials");
  const leaveReviewData = richTexts.find((r: any) => r.style_variant === "leave_review");
  const feedbackData = richTexts.find((r: any) => r.style_variant === "feedback");
  const financingData = richTexts.find((r: any) => r.style_variant === "financing_strip");
  const leadForm = section<any>(page, "lead_form");

  const heroTitle = hero?.title || hero?.headline || "Customer Reviews for BuiltWell CT";
  const hp = parts(heroTitle, hero?.title_highlight || "CT");
  const heroSubtitle = hero?.subtitle || hero?.subheadline || "Real projects, real feedback from homeowners across Fairfield and New Haven County.";

  const testimonials = testimonialsData?.cards || [];

  const feedbackSections = feedbackData?.subsections || [
    { title: "Showing Up on Schedule", content: "Showing up on schedule is a basic commitment, but it is also one that a significant portion of the industry does not keep. When a crew does not arrive when expected, it is not just an inconvenience; it creates uncertainty about the whole project, including the finish date. We keep a schedule because we respect that you have made plans around it. That consistency is part of how we work, not a special effort we make for some customers and not others." },
    { title: "Clear Communication", content: "Clear communication is the other thing that comes up repeatedly. Customers mention that they knew what was happening each day, that questions got answered, and that problems were addressed before they became surprises. That is deliberate. We give daily updates during construction because a project moving through your home should never leave you guessing. If something changes, you hear about it from us directly, not after the fact. That is what we mean when we say we communicate, and it is why the feedback we receive tends to reflect it." },
    { title: "Clean Job Sites", content: "We also hear consistently that job sites were kept clean. That one matters to us because a clean job site is a sign of an organized crew, and an organized crew finishes on time. Respect for your home during construction is built into how we train and expect our crews to work. It is not courtesy; it is professionalism." },
  ];

  return (
    <div ref={wrapRef}>
      <style>{`
        /* FADE-UP */
        .fade-up{opacity:0;transform:translateY(30px);transition:opacity 0.7s ease,transform 0.7s ease}
        .fade-up.visible{opacity:1;transform:translateY(0)}

        /* HERO */
        .rv-hero{background:#151E30;padding:0 40px 48px;padding-top:120px;color:#fff;position:relative;overflow:hidden;min-height:50vh;display:flex;align-items:stretch;isolation:isolate}
        .rv-hero::after{content:'';position:absolute;inset:0;background:url('/hero/builtwell-team-van-consultation-hero-ct.jpg') center 30%/cover no-repeat;opacity:0.72;z-index:0}
        .rv-hero::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse at 97% 97%,rgba(21,30,48,1) 0%,rgba(21,30,48,0.9) 8%,transparent 30%),radial-gradient(ellipse at 3% 97%,rgba(21,30,48,0.9) 0%,transparent 25%),linear-gradient(180deg,rgba(21,30,48,0.35) 0%,rgba(21,30,48,0.2) 30%,rgba(21,30,48,0.45) 65%,rgba(21,30,48,0.92) 100%);z-index:1}
        .rv-hero-inner{max-width:1240px;margin:0 auto;position:relative;z-index:2;width:100%;display:flex;flex-direction:column;align-items:center;text-align:center;justify-content:center}
        .rv-breadcrumb{display:flex;align-items:center;gap:0;font-size:13px;font-weight:500;font-family:Inter,sans-serif;color:rgba(255,255,255,0.92);margin-bottom:20px;padding:0;list-style:none;text-shadow:0 1px 6px rgba(0,0,0,0.7)}
        .rv-breadcrumb li{display:flex;align-items:center}
        .rv-breadcrumb li+li::before{content:'\\203A';color:#BC9155;margin:0 10px;font-size:12px}
        .rv-breadcrumb a{color:rgba(255,255,255,0.85);transition:color 0.2s}
        .rv-breadcrumb a:hover{color:#BC9155}
        .rv-breadcrumb .current{color:#fff;font-weight:600}
        .rv-hero h1{font-size:clamp(40px,4.5vw,56px);line-height:1.08;margin-bottom:12px;letter-spacing:-0.5px;text-shadow:0 2px 20px rgba(0,0,0,0.5)}
        .rv-hero .subtitle{font-size:17px;color:rgba(255,255,255,0.82);line-height:1.7;max-width:560px;margin:16px auto 0;font-family:Inter,sans-serif;font-weight:400}
        .rv-hero-ctas{display:flex;gap:14px;margin-top:28px;justify-content:center;align-items:center;flex-wrap:wrap}
        .rv-cta-btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;padding:14px 32px;border-radius:8px;background:rgba(10,18,35,0.42);border:1px solid rgba(255,255,255,0.22);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);color:#fff;text-decoration:none;font-size:15px;font-weight:600;letter-spacing:.3px;transition:background .3s,border-color .3s,transform .3s,box-shadow .3s;white-space:nowrap}
        .rv-cta-btn:hover{background:rgba(10,18,35,0.62);border-color:rgba(255,255,255,0.35);transform:translateY(-2px);box-shadow:0 8px 24px rgba(0,0,0,.3)}
        .rv-cta-btn.rv-cta-primary{background:#BC9155;border:1px solid #BC9155;backdrop-filter:none}
        .rv-cta-btn.rv-cta-primary:hover{background:#d4a95a;border-color:#d4a95a;box-shadow:0 8px 24px rgba(188,145,85,.4)}

        /* INTRO */
        .rv-intro{padding:80px 0;background:#fff;border-bottom:1px solid rgba(30,43,67,0.06)}
        .rv-intro-inner{max-width:800px;margin:0 auto;padding:0 32px}
        .rv-intro .rv-section-header{text-align:center;margin-bottom:32px}
        .rv-intro .rv-section-header h2{font-size:clamp(32px,3.5vw,48px);margin-bottom:20px;letter-spacing:-0.5px}
        .rv-intro p{font-size:16px;line-height:1.85;color:#5C677D;margin-bottom:20px}
        .rv-intro p:last-child{margin-bottom:0}

        /* TESTIMONIALS */
        .rv-testimonials{padding:100px 40px;background:#F5F1E9}
        .rv-testimonials-inner{max-width:800px;margin:0 auto;padding:0}
        .rv-section-header{text-align:center;margin-bottom:64px}
        .rv-section-header h2{font-size:clamp(28px,3.5vw,44px);margin-bottom:20px;letter-spacing:-0.5px;max-width:780px;margin-left:auto;margin-right:auto}
        .rv-section-header p{font-size:17px;color:#5C677D;max-width:700px;margin:0 auto;line-height:1.75}
        .rv-label{display:inline-block;font-size:11px;font-weight:700;color:#9A7340;text-transform:uppercase;letter-spacing:1.5px;margin-bottom:16px;position:relative;padding-left:20px}
        .rv-label::before{content:'';position:absolute;left:0;top:50%;transform:translateY(-50%);width:10px;height:2px;background:#BC9155}

        .rv-card{background:#fff;border-radius:8px;padding:0;margin-bottom:32px;box-shadow:0 2px 12px rgba(30,43,67,0.06),0 1px 3px rgba(30,43,67,0.04);border-bottom:2px solid transparent;transition:all 0.35s cubic-bezier(0.4,0,0.2,1);overflow:hidden}
        .rv-card:hover{transform:translateY(-4px);border-bottom-color:#BC9155;box-shadow:0 12px 28px rgba(30,43,67,0.1),0 28px 56px rgba(30,43,67,0.12)}
        .rv-card-quote{background:linear-gradient(135deg,#1E2B43 0%,#151E30 100%);padding:32px 32px 28px;position:relative}
        .rv-quote-icon{position:absolute;top:24px;right:28px;opacity:0.25}
        .rv-card-quote blockquote{margin:0}
        .rv-card-quote blockquote p{font-family:'Playfair Display',serif;font-size:clamp(18px,2vw,22px);font-style:italic;color:#fff;line-height:1.5;margin-bottom:12px}
        .rv-card-quote cite{display:block;font-style:normal;font-size:14px;font-weight:600;color:#BC9155;font-family:Inter,sans-serif}
        .rv-card-details{padding:28px 32px 32px}
        .rv-card-meta{display:flex;align-items:center;gap:12px;margin-bottom:16px;flex-wrap:wrap}
        .rv-badge{display:inline-block;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1.2px;color:#fff;background:#BC9155;padding:5px 14px;border-radius:4px}
        .rv-location{font-size:13px;font-weight:500;color:#5C677D}
        .rv-card-details>p{font-size:15px;line-height:1.8;color:#5C677D;margin-bottom:0}
        .rv-card-details a{color:#BC9155;font-weight:500;text-decoration:none}
        .rv-card-details a:hover{text-decoration:underline}

        /* LEAVE A REVIEW */
        .rv-leave{padding:80px 0;background:#fff}
        .rv-leave-inner{max-width:800px;margin:0 auto;padding:0 32px}
        .rv-leave p{font-size:16px;line-height:1.85;color:#5C677D;margin-bottom:24px}
        .rv-leave p:last-child{margin-bottom:0}
        .rv-leave-btn{display:inline-flex;align-items:center;gap:10px;background:#BC9155;color:#fff;padding:16px 32px;border-radius:4px;font-weight:600;font-size:15px;letter-spacing:0.3px;transition:all 0.25s;border:none;cursor:pointer}
        .rv-leave-btn:hover{background:#a57d48;transform:translateY(-1px)}

        /* FEEDBACK */
        .rv-feedback{padding:100px 40px;background:#F5F1E9}
        .rv-feedback-inner{max-width:800px;margin:0 auto;padding:0}
        .rv-feedback article p{font-size:16px;line-height:1.85;color:#5C677D;margin-bottom:24px}
        .rv-feedback article h3{font-size:22px;font-family:'Playfair Display',serif;margin:36px 0 12px;color:#1E2B43}
        .rv-feedback article p:last-child{margin-bottom:0}
        .rv-feedback article a{color:#BC9155;font-weight:500}

        @media(max-width:768px){
          .fade-up{opacity:1!important;transform:translateY(0)!important;transition:none!important}
          .rv-hero{padding:110px 20px 40px;min-height:auto}
          .rv-hero h1{font-size:clamp(32px,7vw,44px)}
          .rv-hero .subtitle{font-size:15px}
          .rv-hero-ctas{flex-direction:column;align-items:center}
          .rv-cta-btn{min-height:44px;width:100%;max-width:300px;justify-content:center;font-size:14px;padding:12px 24px}
          .rv-testimonials{padding:60px 20px}
          .rv-section-header{margin-bottom:40px}
          .rv-card-quote{padding:24px 20px 20px}
          .rv-card-quote blockquote p{font-size:17px}
          .rv-card-details{padding:20px 20px 24px}
          .rv-quote-icon{top:16px;right:16px;width:24px;height:24px}
          .rv-feedback{padding:60px 20px}
        }
        @media(max-width:480px){
          .rv-hero{padding:100px 16px 32px}
          .rv-hero h1{font-size:clamp(28px,7vw,36px)}
          .rv-intro{padding:60px 0}
          .rv-intro-inner{padding:0 16px}
          .rv-testimonials{padding:48px 16px}
          .rv-leave{padding:60px 0}
          .rv-leave-inner{padding:0 16px}
          .rv-feedback{padding:48px 16px}
        }
      `}</style>

      {/* HERO */}
      <section className="rv-hero">
        <div className="rv-hero-inner">
          <ol className="rv-breadcrumb" aria-label="Breadcrumb">
            <li><Link href="/">Home</Link></li>
            <li><span className="current">Reviews</span></li>
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
      <HeroTrustBar items={heroTrust?.items} />

      {/* INTRO */}
      <section className="rv-intro">
        <div className="rv-intro-inner">
          <div className="rv-section-header fade-up">
            <span className="rv-label">{introData?.eyebrow || "Reviews"}</span>
            {(() => {
              const ip = parts(introData?.title || "Why Connecticut Homeowners Trust BuiltWell", introData?.title_highlight || "Trust BuiltWell");
              return <h2 className="font-serif font-bold">{ip.before}<span className="text-[#bc9155]">{ip.accent}</span>{ip.after}</h2>;
            })()}
          </div>
          <div className="fade-up">
            <p>{introData?.paragraphs?.[0] || "BuiltWell CT operates with a 4.9 Google rating and a track record of 100+ restoration projects led by our founder across Fairfield and New Haven County, with consistent feedback on punctuality, communication, and quality."}</p>
            <p>{introData?.paragraphs?.[1] || "A remodeling contractor's reputation is built project by project, on whether we showed up when we said we would, communicated clearly when something changed, and handed over work that matched what was agreed on. Project testimonials are added here as each Connecticut remodeling project completes."}</p>
          </div>
        </div>
      </section>

      {/* PROJECT TESTIMONIALS */}
      <section className="rv-testimonials">
        <div className="rv-testimonials-inner">
          <div className="rv-section-header fade-up">
            <span className="rv-label">{testimonialsData?.eyebrow || "Real Projects"}</span>
            {(() => {
              const tp = parts(testimonialsData?.title || "Project Testimonials", testimonialsData?.title_highlight || "Testimonials");
              return <h2 className="font-serif font-bold">{tp.before}<span className="text-[#bc9155]">{tp.accent}</span>{tp.after}</h2>;
            })()}
            <p>{testimonialsData?.subtitle || "Detailed project testimonials will be published here as each project completes. BuiltWell CT brings 15+ years of remodeling and restoration experience to every project across Fairfield and New Haven Counties."}</p>
          </div>

          {testimonials.length > 0 ? (
            testimonials.map((t: any, i: number) => (
              <div key={i} className="rv-card fade-up">
                <div className="rv-card-quote">
                  <svg className="rv-quote-icon" width="32" height="32" viewBox="0 0 24 24" fill="#BC9155" aria-hidden="true"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/></svg>
                  <blockquote>
                    <p>{t.quote}</p>
                    <cite>{t.author || "Homeowner"}, {t.location}</cite>
                  </blockquote>
                </div>
                <div className="rv-card-details">
                  <div className="rv-card-meta">
                    <span className="rv-badge">{t.badge}</span>
                    <span className="rv-location">{t.location}</span>
                  </div>
                  <p dangerouslySetInnerHTML={{ __html: t.description }} />
                </div>
              </div>
            ))
          ) : null}
        </div>
      </section>

      {/* LEAVE A REVIEW */}
      <section className="rv-leave">
        <div className="rv-leave-inner">
          <div className="rv-section-header fade-up">
            <span className="rv-label">{leaveReviewData?.eyebrow || "Share Your Experience"}</span>
            {(() => {
              const lp = parts(leaveReviewData?.title || "Leave a Review", leaveReviewData?.title_highlight || "Review");
              return <h2 className="font-serif font-bold">{lp.before}<span className="text-[#bc9155]">{lp.accent}</span>{lp.after}</h2>;
            })()}
          </div>
          <div className="fade-up">
            <p>{leaveReviewData?.paragraphs?.[0] || "Past BuiltWell customers can leave a review on Google to help other Connecticut homeowners find a licensed, reliable remodeling contractor in Fairfield or New Haven County. Honest reviews from real customers are how a company like ours builds its reputation over time."}</p>
            <p style={{ marginTop: "16px" }}>{leaveReviewData?.paragraphs?.[1] || "We read every review. We take the feedback seriously. And we are grateful to the customers who take the time to write one."}</p>
            <div style={{ textAlign: "center", margin: "32px 0 0" }}>
              <a href={leaveReviewData?.cta?.url || "https://www.google.com/search?q=builtwell+ct+reviews"} target="_blank" rel="noopener noreferrer" className="rv-leave-btn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                {leaveReviewData?.cta?.label || "Leave a Google Review"}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT CONSISTENT FEEDBACK LOOKS LIKE */}
      <section className="bg-white px-5 py-20 md:px-10">
        <div className="mx-auto max-w-[1240px]">
          <div className="mb-12 text-center">
            <span className="mb-4 inline-block pl-5 text-[11px] font-bold uppercase tracking-[1.5px] text-[#9A7340] before:relative before:-left-5 before:top-[-3px] before:inline-block before:h-[2px] before:w-[10px] before:bg-[#BC9155]">{feedbackData?.eyebrow || "Our Standards"}</span>
            {(() => {
              const fp = parts(feedbackData?.title || "What Consistent Feedback Looks Like", feedbackData?.title_highlight || "Looks Like");
              return <h2 className="font-serif text-[clamp(28px,3.5vw,44px)] font-bold tracking-[-0.5px] text-[#1E2B43]">{fp.before}<span className="text-[#bc9155]">{fp.accent}</span>{fp.after}</h2>;
            })()}
            <p className="mx-auto mt-4 max-w-[720px] text-[17px] leading-[1.75] text-[#5C677D]">
              {feedbackData?.intro_paragraphs?.[0] || "Across 100+ insurance restoration projects led by our founder, three themes have appeared consistently in homeowner feedback: on-time arrival, daily communication, and clean job sites throughout construction — the same standards we carry into every Connecticut remodeling project."}
            </p>
          </div>
          <div className="grid gap-8 lg:grid-cols-3">
            {(feedbackSections.length > 0 ? feedbackSections : [
              { title: "Showing Up on Schedule", content: "Showing up on schedule is a basic commitment, but it is also one that a significant portion of the industry does not keep. When a crew does not arrive when expected, it creates uncertainty about the whole project. We keep a schedule because we respect that you have made plans around it." },
              { title: "Clear Communication", content: "Customers mention that they knew what was happening each day, that questions got answered, and that problems were addressed before they became surprises. We give daily updates during construction because a project moving through your home should never leave you guessing." },
              { title: "Clean Job Sites", content: "A clean job site is a sign of an organized crew, and an organized crew finishes on time. Respect for your home during construction is built into how we train and expect our crews to work. It is not courtesy; it is professionalism. We install dust barriers, protect floors and finishes in adjacent rooms, and clean up at the end of every workday so your home stays livable throughout the project." },
            ]).map((sub: any, i: number) => (
              <article
                key={i}
                className="group relative overflow-hidden rounded-[14px] border border-[#1e2b430a] bg-[#f5f1e9] p-8 transition-all duration-[400ms] hover:-translate-y-1 hover:shadow-[0_20px_48px_rgba(30,43,67,0.12)]"
              >
                <div className="absolute left-0 top-0 h-full w-[4px] bg-[#BC9155] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#BC9155]/10 transition-all duration-300 group-hover:bg-[#BC9155]/20">
                  <svg className="h-6 w-6 text-[#BC9155]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    {i === 0 ? <><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></> :
                     i === 1 ? <><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></> :
                     <><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></>}
                  </svg>
                </div>
                <h3 className="mb-3 font-serif text-[22px] font-bold text-[#1E2B43]">{sub.title}</h3>
                <p className="text-[15px] leading-[1.8] text-[#5C677D]">{sub.content}</p>
              </article>
            ))}
          </div>
          <div className="mt-12 text-center">
            <a
              href="#contact"
              className="inline-block w-[280px] rounded-[8px] border border-[#BC9155] bg-[#BC9155] px-8 py-[14px] text-center text-[15px] font-semibold text-white transition-[background,border-color,transform,box-shadow] duration-300 hover:-translate-y-[2px] hover:border-[#D4A95A] hover:bg-[#D4A95A] hover:shadow-[0_8px_24px_rgba(188,145,85,0.4)]"
            >
              Get Your Free Estimate
            </a>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-3 text-[14px]">
              {linkNode("/case-studies/", "Case Studies", "text-[#5C677D] underline decoration-[#BC9155]/30 underline-offset-2 transition-colors hover:text-[#BC9155]")}
              <span className="text-[#5C677D]/30">|</span>
              {linkNode("/process/", "Our Process", "text-[#5C677D] underline decoration-[#BC9155]/30 underline-offset-2 transition-colors hover:text-[#BC9155]")}
              <span className="text-[#5C677D]/30">|</span>
              {linkNode("/free-consultation/", "Free Consultation", "text-[#5C677D] underline decoration-[#BC9155]/30 underline-offset-2 transition-colors hover:text-[#BC9155]")}
            </div>
          </div>
        </div>
      </section>

      {/* LEAD FORM */}
      <LeadFormSection page={page} data={leadForm} accent="Consultation" phones={{ fairfield: fairfieldNumber, newHaven: newHavenNumber }} />

      {/* TRUST STRIP */}
      <DarkTrustStrip items={darkTrust?.items} />

      {/* FINANCING STRIP */}
      <FinancingStrip data={financingData} />
    </div>
  );
}

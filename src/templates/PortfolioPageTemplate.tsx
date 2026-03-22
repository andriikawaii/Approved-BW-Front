"use client";

import Link from "next/link";
import type { CMSPage } from "@/types/cms";
import { parts, label, media, section, sections, HeroTrustBar, DarkTrustStrip, FinancingStrip, LeadFormSection } from "./template-utils";
import { usePageData } from "@/src/context/PageDataContext";

/* ── component ── */
export function PortfolioPageTemplate({ page }: { page: CMSPage }) {
  const { phones } = usePageData();
  const phoneItems = phones ?? [];
  const fairfieldPhone = phoneItems.find((p) => p.label.toLowerCase().includes("fairfield"));
  const newHavenPhone = phoneItems.find((p) => p.label.toLowerCase().includes("new haven"));

  const hero = section<any>(page, "hero");
  const trustBars = sections<any>(page, "trust_bar");
  const trustBarItems = trustBars[0]?.items;
  const trustStripItems = trustBars[1]?.items;
  const galleries = sections<any>(page, "image_gallery");
  const leadForm = section<any>(page, "lead_form");
  const richTexts = sections<any>(page, "rich_text");
  const financing = richTexts.find((r: any) => r.style_variant === "financing_strip");

  const hp = parts(hero?.title || "Completed Remodeling Projects", hero?.title_highlight || "Projects");

  return (
    <>
      <style>{`
        .bw-gallery-group{margin-bottom:72px;text-align:center}
        .bw-gallery-group:last-child{margin-bottom:0}
        .bw-gallery-images{max-width:1000px;margin:0 auto}
        .bw-gallery-img-wrap{position:relative;border-radius:10px;overflow:hidden;margin-bottom:24px;box-shadow:0 4px 20px rgba(30,43,67,0.1)}
        .bw-gallery-img-wrap:last-child{margin-bottom:0}
        .bw-gallery-img-clip{overflow:hidden}
        .bw-gallery-img-clip img{width:100%;display:block;margin-bottom:-12%}
        .bw-gallery-caption{padding:12px 16px;background:#fff;font-size:14px;font-weight:500;color:#1E2B43;text-align:center;font-family:Inter,sans-serif}
        .bw-gallery-caption span{color:#5C677D;font-weight:400}
        .bw-hero-ctas{display:flex;gap:16px;margin-top:32px;justify-content:center;flex-wrap:wrap}
        .bw-hero-cta-btn{display:flex;flex-direction:column;align-items:center;padding:16px 28px;border-radius:8px;background:rgba(10,18,35,0.42);border:1px solid rgba(255,255,255,0.18);border-bottom:2px solid #BC9155;backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);color:#fff;text-decoration:none;transition:background 0.3s,border-color 0.3s,transform 0.3s,box-shadow 0.3s;min-width:180px;text-align:center}
        .bw-hero-cta-btn:hover{background:rgba(10,18,35,0.62);border-color:rgba(255,255,255,0.28);border-bottom-color:#BC9155;transform:translateY(-2px);box-shadow:0 8px 24px rgba(0,0,0,0.3),0 0 0 1px rgba(188,145,85,0.2)}
        .bw-hero-cta-btn.bw-primary{background:#BC9155;border:1px solid #BC9155;border-bottom:2px solid #a57d48;backdrop-filter:none}
        .bw-hero-cta-btn.bw-primary:hover{background:#d4a95a;border-color:#d4a95a;border-bottom-color:#a57d48;box-shadow:0 8px 24px rgba(188,145,85,0.4)}
        .bw-hero-cta-label{font-size:11px;text-transform:uppercase;letter-spacing:1.2px;opacity:0.7;margin-bottom:4px}
        .bw-primary .bw-hero-cta-label{opacity:0.9}
        .bw-hero-cta-phone{font-size:18px;font-weight:600;font-family:'Playfair Display',serif}
        @media(max-width:768px){
          .bw-hero-ctas{flex-direction:column;align-items:stretch}
          .bw-hero-cta-btn{min-width:0;width:100%;min-height:44px}
          .bw-gallery-img-wrap{margin-bottom:20px}
          .bw-gallery-img-clip img{margin-bottom:-8%}
          .bw-gallery-caption{font-size:13px;padding:10px 12px}
          .bw-gallery-group{margin-bottom:48px}
        }
        @media(max-width:480px){
          .bw-gallery-img-wrap{margin-bottom:16px;border-radius:8px}
          .bw-gallery-img-clip img{margin-bottom:-6%}
          .bw-gallery-caption{font-size:12px;padding:8px 10px}
          .bw-gallery-group{margin-bottom:40px}
        }
      `}</style>

      {/* HERO */}
      <section
        className="relative isolate flex min-h-[50vh] items-stretch overflow-hidden text-white"
        style={{ background: "#151E30", padding: "120px 40px 48px" }}
      >
        <div
          className="absolute inset-0 z-0"
          style={{
            background: `url('${media(hero?.background_image, "/services/kitchen-remodeling-ct.jpg")}') center 40%/cover no-repeat`,
            opacity: 0.72,
          }}
        />
        <div
          className="absolute inset-0 z-[1]"
          style={{
            background: `
              radial-gradient(ellipse at 97% 97%, rgba(21,30,48,1) 0%, rgba(21,30,48,0.9) 8%, transparent 30%),
              radial-gradient(ellipse at 3% 97%, rgba(21,30,48,0.9) 0%, transparent 25%),
              linear-gradient(180deg, rgba(21,30,48,0.35) 0%, rgba(21,30,48,0.2) 30%, rgba(21,30,48,0.45) 65%, rgba(21,30,48,0.92) 100%)
            `,
          }}
        />
        <div className="relative z-[2] mx-auto flex w-full max-w-[1240px] flex-col items-center justify-center text-center">
          <ol className="mb-5 flex items-center gap-0 text-[13px] font-medium" style={{ textShadow: "0 1px 6px rgba(0,0,0,0.7)" }}>
            <li className="flex items-center">
              <Link href="/" className="text-white/85 hover:text-[#bc9155]">Home</Link>
            </li>
            <li className="flex items-center">
              <span className="mx-2.5 text-[12px] text-[#bc9155]">&rsaquo;</span>
              <span className="font-semibold text-white">Portfolio</span>
            </li>
          </ol>
          <h1 className="mb-3 font-serif text-[clamp(40px,4.5vw,56px)] font-bold leading-[1.08] tracking-[-0.5px]" style={{ textShadow: "0 2px 20px rgba(0,0,0,0.5)" }}>
            {hp.before}<span className="text-[#bc9155]">{hp.accent}</span>{hp.after}
          </h1>
          <p className="mx-auto mt-4 max-w-[560px] text-center text-[17px] leading-[1.7] text-white/82">
            {hero?.subtitle || "Every photo is from a real Connecticut home remodeled by BuiltWell CT (HIC #0668405). No stock photography, no renderings."}
          </p>
          <div className="bw-hero-ctas">
            {fairfieldPhone && (
              <a href={`tel:${fairfieldPhone.number.replace(/\D/g, "")}`} className="bw-hero-cta-btn">
                <span className="bw-hero-cta-label">Fairfield County</span>
                <span className="bw-hero-cta-phone">{fairfieldPhone.number}</span>
              </a>
            )}
            {newHavenPhone && (
              <a href={`tel:${newHavenPhone.number.replace(/\D/g, "")}`} className="bw-hero-cta-btn">
                <span className="bw-hero-cta-label">New Haven County</span>
                <span className="bw-hero-cta-phone">{newHavenPhone.number}</span>
              </a>
            )}
            <a href="#contact" className="bw-hero-cta-btn bw-primary">
              <span className="bw-hero-cta-label">Get Started</span>
              <span className="bw-hero-cta-phone">Get a Free Estimate</span>
            </a>
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <HeroTrustBar items={trustBarItems} />

      {/* GALLERY SECTION */}
      <section className="bg-white px-5 py-[100px] md:px-10">
        <div className="mx-auto max-w-[1240px]">
          {galleries.map((gallery: any, gi: number) => {
            const gp = parts(gallery.title, gallery.title_highlight);
            return (
              <div key={gi} className="bw-gallery-group">
                {label(gallery.eyebrow || "Before and After")}
                <h2 className="mb-4 font-serif text-[clamp(28px,3.5vw,40px)] font-bold tracking-[-0.3px]">
                  {gp.before}<span className="text-[#bc9155]">{gp.accent}</span>{gp.after}
                </h2>
                {gallery.subtitle && (
                  <p className="mx-auto mb-8 max-w-[700px] text-base leading-[1.7] text-[#5c677d]">{gallery.subtitle}</p>
                )}
                <div className="bw-gallery-images">
                  {(gallery.items || []).map((img: any, ii: number) => {
                    const caption = img.caption || "";
                    const dashIdx = caption.indexOf(" — ");
                    const city = dashIdx >= 0 ? caption.slice(0, dashIdx) : caption;
                    const detail = dashIdx >= 0 ? caption.slice(dashIdx + 3) : "";
                    return (
                      <div key={ii} className="bw-gallery-img-wrap">
                        <div className="bw-gallery-img-clip">
                          <img
                            src={media(img.image)}
                            alt={img.alt || "BuiltWell CT remodeling before and after"}
                            loading="lazy"
                            decoding="async"
                            width={1000}
                            height={500}
                          />
                        </div>
                        {caption && (
                          <p className="bw-gallery-caption">
                            {city}{detail && <span> — {detail}</span>}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA / LEAD FORM */}
      {leadForm && <LeadFormSection page={page} data={leadForm} accent={leadForm.title_highlight || "Consultation"} />}

      {/* TRUST STRIP */}
      <DarkTrustStrip items={trustStripItems} />

      {/* FINANCING STRIP */}
      {financing && <FinancingStrip data={financing} />}
    </>
  );
}

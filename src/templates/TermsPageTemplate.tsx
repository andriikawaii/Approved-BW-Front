"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { CMSPage } from "@/types/cms";
import { linkNode, media, parts, section } from "./template-utils";

type HeroData = {
  headline?: string;
  subheadline?: string;
  background_image?: string | null;
  cta_primary?: { label?: string; url?: string } | null;
};

type LegalBlock = {
  content?: string;
  legal_updated?: string;
};

type PhoneItem = { label?: string; number?: string };

export function TermsPageTemplate({ page }: { page: CMSPage }) {
  const hero = section<HeroData>(page, "hero");
  const legal = section<LegalBlock>(page, "rich_text");
  const heroTitle = parts(hero?.headline || "Terms of Service", "Service");
  const phones = (((page as unknown as { phones?: { items?: PhoneItem[] } }).phones?.items) || []) as PhoneItem[];
  const fairfieldPhone = phones.find((item) => (item.label || "").toLowerCase().includes("fairfield"))?.number || "(203) 919-9616";
  const newHavenPhone = phones.find((item) => (item.label || "").toLowerCase().includes("new haven"))?.number || "(203) 466-9148";
  const heroPrimaryLabel = "Get Your Free Estimate";
  const heroPrimaryUrl = hero?.cta_primary?.url || "/free-consultation/";

  return (
    <div className="terms-page bg-white text-[#1e2b43]">
      <section className="terms-hero relative isolate flex min-h-[50vh] items-stretch overflow-hidden bg-[#151e30] px-5 pb-12 pt-[120px] text-white md:px-10">
        <div
          className="absolute inset-0 bg-cover bg-[center_30%]"
          style={{
            backgroundImage: `url(${media(hero?.background_image, "/hero/builtwell-team-van-consultation-hero-ct.jpg")})`,
            opacity: 0.72,
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_97%_97%,rgba(21,30,48,1)_0%,rgba(21,30,48,0.9)_8%,transparent_30%),radial-gradient(ellipse_at_3%_97%,rgba(21,30,48,0.9)_0%,transparent_25%),linear-gradient(180deg,rgba(21,30,48,0.35)_0%,rgba(21,30,48,0.2)_30%,rgba(21,30,48,0.45)_65%,rgba(21,30,48,0.92)_100%)]" />

        <div className="relative z-10 mx-auto flex w-full max-w-[1240px] flex-col items-center justify-center text-center">
          <ol className="terms-breadcrumb mb-5 flex list-none items-center p-0 text-[13px] font-medium text-white/92">
            <li>{linkNode("/", "Home", "transition-colors hover:text-[#bc9155]")}</li>
            <li>
              <span className="current">Terms of Service</span>
            </li>
          </ol>

          <h1 className="terms-title font-serif text-[clamp(40px,4.5vw,56px)] font-bold text-white">
            {heroTitle.before}
            {heroTitle.accent ? <span className="text-[#bc9155]">{heroTitle.accent}</span> : null}
            {heroTitle.after}
          </h1>

          {hero?.subheadline ? <p className="terms-subtitle">{hero.subheadline}</p> : null}

          <div className="terms-hero-ctas">
            {linkNode(heroPrimaryUrl, heroPrimaryLabel, "terms-hero-cta-btn terms-hero-cta-btn--primary")}
            {linkNode(`tel:${fairfieldPhone.replace(/\D/g, "")}`, `Fairfield: ${fairfieldPhone}`, "terms-hero-cta-btn")}
            {linkNode(`tel:${newHavenPhone.replace(/\D/g, "")}`, `New Haven: ${newHavenPhone}`, "terms-hero-cta-btn")}
          </div>
        </div>
      </section>

      <section className="terms-legal-section">
        <div className="terms-legal-content">
          {legal?.legal_updated ? <p className="terms-legal-updated">{legal.legal_updated}</p> : null}
          <div className="terms-legal-markdown">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {legal?.content || ""}
            </ReactMarkdown>
          </div>
        </div>
      </section>

      <style jsx global>{`
        .terms-page .terms-breadcrumb {
          text-shadow: 0 1px 6px rgba(0, 0, 0, 0.7);
        }
        .terms-page .terms-breadcrumb li {
          display: flex;
          align-items: center;
        }
        .terms-page .terms-breadcrumb li + li::before {
          content: "›";
          color: #bc9155;
          margin: 0 10px;
          font-size: 12px;
        }
        .terms-page .terms-breadcrumb a {
          color: rgba(255, 255, 255, 0.85);
          text-decoration: none;
        }
        .terms-page .terms-breadcrumb a:hover {
          color: #bc9155;
        }
        .terms-page .terms-breadcrumb .current {
          color: #fff;
          font-weight: 600;
        }
        .terms-page .terms-title {
          line-height: 1.08;
          margin-bottom: 12px;
          letter-spacing: -0.5px;
          text-shadow: 0 2px 20px rgba(0, 0, 0, 0.5);
        }
        .terms-page .terms-subtitle {
          font-size: 17px;
          color: rgba(255, 255, 255, 0.82);
          line-height: 1.7;
          max-width: 560px;
          margin: 16px auto 0;
          text-align: center;
          font-weight: 400;
        }
        .terms-page .terms-hero-ctas {
          display: flex;
          gap: 14px;
          margin-top: 28px;
          justify-content: center;
          align-items: center;
          flex-wrap: wrap;
        }
        .terms-page .terms-hero-cta-btn {
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
          white-space: nowrap;
          transition: background 0.3s, border-color 0.3s, transform 0.3s, box-shadow 0.3s;
        }
        .terms-page .terms-hero-cta-btn:hover {
          background: rgba(10, 18, 35, 0.62);
          border-color: rgba(255, 255, 255, 0.35);
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
        }
        .terms-page .terms-hero-cta-btn--primary {
          background: #bc9155;
          border: 1px solid #bc9155;
          backdrop-filter: none;
          -webkit-backdrop-filter: none;
        }
        .terms-page .terms-hero-cta-btn--primary:hover {
          background: #d4a95a;
          border-color: #d4a95a;
          box-shadow: 0 8px 24px rgba(188, 145, 85, 0.4);
        }
        .terms-page .terms-legal-section {
          padding: 80px 40px 100px;
          background: #fff;
        }
        .terms-page .terms-legal-content {
          max-width: 800px;
          margin: 0 auto;
          padding: 0 20px;
        }
        .terms-page .terms-legal-updated {
          font-size: 14px;
          color: #5c677d;
          margin-bottom: 32px;
        }
        .terms-page .terms-legal-markdown h2 {
          font-size: 22px;
          margin: 40px 0 16px;
          color: #1e2b43;
          font-family: var(--font-playfair), "Playfair Display", Georgia, serif;
          line-height: 1.2;
          font-weight: 700;
        }
        .terms-page .terms-legal-markdown h3 {
          font-size: 18px;
          margin: 28px 0 12px;
          color: #1e2b43;
          font-family: var(--font-playfair), "Playfair Display", Georgia, serif;
          line-height: 1.2;
          font-weight: 700;
        }
        .terms-page .terms-legal-markdown p {
          font-size: 15px;
          line-height: 1.8;
          color: #5c677d;
          margin-bottom: 16px;
        }
        .terms-page .terms-legal-markdown ul {
          margin: 12px 0 20px 24px;
          color: #5c677d;
        }
        .terms-page .terms-legal-markdown ul li {
          font-size: 15px;
          line-height: 1.8;
          margin-bottom: 8px;
          list-style: disc;
        }
        .terms-page .terms-legal-markdown a {
          color: #bc9155;
          font-weight: 600;
          text-decoration: none;
          transition: color 0.2s, text-decoration-color 0.2s;
        }
        .terms-page .terms-legal-markdown a:hover {
          text-decoration: underline;
          text-decoration-thickness: 1px;
          text-underline-offset: 2px;
        }
        .terms-page .terms-legal-markdown strong {
          color: #1e2b43;
          font-weight: 700;
        }
        @media (max-width: 768px) {
          .terms-page .terms-hero {
            padding: 52px 20px 36px;
            min-height: 40vh;
            max-height: none;
          }
          .terms-page .terms-title {
            font-size: clamp(30px, 7vw, 42px);
          }
          .terms-page .terms-hero-ctas {
            flex-direction: column;
            align-items: center;
          }
          .terms-page .terms-hero-cta-btn {
            min-height: 44px;
            width: 100%;
            max-width: 300px;
            justify-content: center;
            font-size: 14px;
            padding: 12px 24px;
          }
          .terms-page .terms-legal-section {
            padding: 60px 32px 80px;
          }
          .terms-page .terms-legal-content {
            padding: 0;
          }
          .terms-page .terms-legal-markdown h2 {
            font-size: 20px;
            margin: 32px 0 14px;
          }
          .terms-page .terms-legal-markdown h3 {
            font-size: 16px;
          }
          .terms-page .terms-legal-markdown p,
          .terms-page .terms-legal-markdown ul li {
            font-size: 14px;
          }
        }
        @media (max-width: 480px) {
          .terms-page .terms-breadcrumb {
            font-size: 12px;
          }
          .terms-page .terms-hero {
            padding: 52px 16px 32px;
            min-height: 35vh;
            max-height: none;
          }
          .terms-page .terms-title {
            font-size: clamp(26px, 7vw, 36px);
          }
          .terms-page .terms-hero-cta-btn {
            min-width: 0;
          }
          .terms-page .terms-legal-section {
            padding: 40px 16px 56px;
          }
          .terms-page .terms-legal-markdown h2 {
            font-size: 18px;
            margin: 28px 0 12px;
          }
          .terms-page .terms-legal-content {
            padding: 0;
          }
        }
      `}</style>
    </div>
  );
}

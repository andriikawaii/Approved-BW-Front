"use client";

import { Fragment, type ReactNode } from "react";
import type { CMSPage } from "@/types/cms";
import { linkNode, media, parts, section, sections } from "./template-utils";

type PrivacySubsection = {
  title?: string;
  paragraphs?: string[];
  bullets?: string[];
};

type PrivacyLink = {
  label?: string;
  url?: string;
};

type PrivacyBlock = {
  legal_updated?: string;
  title?: string;
  paragraphs?: string[];
  bullets?: string[];
  subsections?: PrivacySubsection[];
  links?: PrivacyLink[];
};

type HeroData = {
  headline?: string;
  subheadline?: string;
  background_image?: string | null;
};

const INLINE_LINK_PATTERN =
  /(https?:\/\/buildwellct\.com\/contact\/|buildwellct\.com\/contact\/|info@buildwellct\.com|\(203\)\s*466-9148|203[\s.-]?466[\s.-]?9148)/gi;

function linkifyInline(text: string, keyPrefix: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let lastIndex = 0;
  let index = 0;

  for (const match of text.matchAll(INLINE_LINK_PATTERN)) {
    const token = match[0];
    const start = match.index ?? 0;

    if (start > lastIndex) {
      nodes.push(text.slice(lastIndex, start));
    }

    const normalized = token.toLowerCase();
    if (normalized.includes("info@builtwellct.com")) {
      nodes.push(
        <a key={`${keyPrefix}-mail-${index}`} href="mailto:info@builtwellct.com">
          info@builtwellct.com
        </a>,
      );
    } else if (normalized.includes("contact/")) {
      nodes.push(
        <a key={`${keyPrefix}-contact-${index}`} href="https://builtwellct.com/contact/" target="_blank" rel="noreferrer">
          {token.replace(/^https?:\/\//i, "")}
        </a>,
      );
    } else {
      nodes.push(
        <a key={`${keyPrefix}-phone-${index}`} href="tel:2034669148">
          {token}
        </a>,
      );
    }

    lastIndex = start + token.length;
    index += 1;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes.length ? nodes : [text];
}

function renderTextWithBreaks(text: string, keyPrefix: string): ReactNode {
  const parts = text.split(/<br\s*\/?>|\n/gi);
  return parts.map((part, index) => (
    <Fragment key={`${keyPrefix}-line-${index}`}>
      {linkifyInline(part, `${keyPrefix}-${index}`)}
      {index < parts.length - 1 ? <br /> : null}
    </Fragment>
  ));
}

export function PrivacyPolicyPageTemplate({ page }: { page: CMSPage }) {
  const hero = section<HeroData>(page, "hero");
  const blocks = sections<PrivacyBlock>(page, "rich_text");
  const heroTitle = parts(hero?.headline || "Privacy Policy", "Policy");

  return (
    <div className="privacy-policy-page bg-white text-[#1e2b43]">
      <section className="privacy-hero relative isolate flex min-h-[50vh] items-stretch overflow-hidden bg-[#151e30] px-5 pb-12 pt-[120px] text-white md:px-10">
        <div
          className="absolute inset-0 bg-cover bg-[center_30%]"
          style={{
            backgroundImage: `url(${media(hero?.background_image, "/images/headers/kitchen-remodeling-header.jpg")})`,
            opacity: 0.72,
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_97%_97%,rgba(21,30,48,1)_0%,rgba(21,30,48,0.9)_8%,transparent_30%),radial-gradient(ellipse_at_3%_97%,rgba(21,30,48,0.9)_0%,transparent_25%),linear-gradient(180deg,rgba(21,30,48,0.35)_0%,rgba(21,30,48,0.2)_30%,rgba(21,30,48,0.45)_65%,rgba(21,30,48,0.92)_100%)]" />

        <div className="page-hero-inner relative z-10 mx-auto flex w-full max-w-[1240px] flex-col items-center justify-center text-center">
          <ol className="privacy-breadcrumb mb-5 flex list-none items-center p-0 text-[13px] font-medium text-white/92">
            <li>{linkNode("/", "Home", "transition-colors hover:text-[#bc9155]")}</li>
            <li>
              <span className="current">Privacy Policy</span>
            </li>
          </ol>

          <h1 className="privacy-title font-serif text-[clamp(40px,4.5vw,56px)] font-bold text-white">
            {heroTitle.before}
            {heroTitle.accent ? <span className="text-[#bc9155]">{heroTitle.accent}</span> : null}
            {heroTitle.after}
          </h1>

        </div>
      </section>

      <section className="bg-white px-5 py-[76px] md:px-10 md:py-[100px]">
        <div className="privacy-legal-content mx-auto max-w-[800px]">
          {blocks[0]?.legal_updated ? <p className="privacy-legal-updated">{blocks[0].legal_updated}</p> : null}

          <div>
            {blocks.map((block: PrivacyBlock, index: number) => (
              <article key={`${block.title}-${index}`} className="privacy-legal-block">
                <h2>{block.title}</h2>

                {(block.paragraphs || []).map((paragraph: string, pIndex: number) => (
                  <p key={pIndex}>{renderTextWithBreaks(paragraph, `p-${index}-${pIndex}`)}</p>
                ))}

                {(block.bullets || []).length ? (
                  <ul>
                    {(block.bullets || []).map((bullet: string, bulletIndex: number) => (
                      <li key={bulletIndex}>{renderTextWithBreaks(bullet, `b-${index}-${bulletIndex}`)}</li>
                    ))}
                  </ul>
                ) : null}

                {(block.subsections || []).map((subsection: PrivacySubsection, subIndex: number) => (
                  <div key={`${subsection.title}-${subIndex}`}>
                    <h3>{subsection.title}</h3>
                    {(subsection.paragraphs || []).map((paragraph: string, pIndex: number) => (
                      <p key={pIndex}>{renderTextWithBreaks(paragraph, `sp-${index}-${subIndex}-${pIndex}`)}</p>
                    ))}
                    {(subsection.bullets || []).length ? (
                      <ul>
                        {(subsection.bullets || []).map((bullet: string, bulletIndex: number) => (
                          <li key={bulletIndex}>{renderTextWithBreaks(bullet, `sb-${index}-${subIndex}-${bulletIndex}`)}</li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                ))}

                {(block.links || []).length ? (
                  <p>
                    {(block.links || []).map((item: PrivacyLink, linkIndex: number) => (
                      <a key={linkIndex} href={item.url} target="_blank" rel="noreferrer" className="mr-2 inline-block">
                        {item.label}
                      </a>
                    ))}
                  </p>
                ) : null}
              </article>
            ))}
          </div>
        </div>
      </section>

      <style jsx global>{`
        .privacy-policy-page .privacy-breadcrumb {
          text-shadow: 0 1px 6px rgba(0, 0, 0, 0.7);
        }
        .privacy-policy-page .privacy-breadcrumb li {
          display: flex;
          align-items: center;
        }
        .privacy-policy-page .privacy-breadcrumb li + li::before {
          content: "›";
          color: #bc9155;
          margin: 0 10px;
          font-size: 12px;
        }
        .privacy-policy-page .privacy-breadcrumb a {
          color: rgba(255, 255, 255, 0.85);
          text-decoration: none;
        }
        .privacy-policy-page .privacy-breadcrumb a:hover {
          color: #bc9155;
        }
        .privacy-policy-page .privacy-breadcrumb .current {
          color: #fff;
          font-weight: 600;
        }
        .privacy-policy-page .privacy-title {
          line-height: 1.08;
          margin-bottom: 12px;
          letter-spacing: -0.5px;
          text-shadow: 0 2px 20px rgba(0, 0, 0, 0.5);
        }
        .privacy-policy-page .privacy-legal-content {
          padding: 0 20px;
          color: #5c677d;
        }
        .privacy-policy-page .privacy-legal-updated {
          font-size: 14px;
          color: #5c677d;
          margin-bottom: 32px;
        }
        .privacy-policy-page .privacy-legal-block h2 {
          font-size: 22px;
          margin: 40px 0 16px;
          color: #1e2b43;
          font-family: var(--font-playfair), "Playfair Display", Georgia, serif;
          font-weight: 700;
          line-height: 1.2;
        }
        .privacy-policy-page .privacy-legal-block h3 {
          font-size: 18px;
          margin: 28px 0 12px;
          color: #1e2b43;
          font-family: var(--font-playfair), "Playfair Display", Georgia, serif;
          font-weight: 700;
          line-height: 1.2;
        }
        .privacy-policy-page .privacy-legal-block p {
          font-size: 15px;
          line-height: 1.8;
          color: #5c677d;
          margin-bottom: 16px;
        }
        .privacy-policy-page .privacy-legal-block ul {
          margin: 12px 0 20px 24px;
          color: #5c677d;
        }
        .privacy-policy-page .privacy-legal-block ul li {
          list-style: disc;
          font-size: 15px;
          line-height: 1.8;
          margin-bottom: 8px;
        }
        .privacy-policy-page .privacy-legal-block a {
          color: #bc9155;
          font-weight: 600;
          transition: color 0.2s, text-decoration-color 0.2s;
          text-decoration: none;
        }
        .privacy-policy-page .privacy-legal-block a:hover {
          text-decoration: underline;
          text-decoration-thickness: 1px;
          text-underline-offset: 2px;
        }
        @media (max-width: 768px) {
          .privacy-policy-page .privacy-hero {
            padding: 52px 20px 36px;
            min-height: 40vh;
            max-height: none;
          }
          .privacy-policy-page .privacy-title {
            font-size: clamp(30px, 7vw, 42px);
          }
        }
        @media (max-width: 480px) {
          .privacy-policy-page .privacy-hero {
            padding: 52px 16px 32px;
            min-height: 35vh;
            max-height: none;
          }
          .privacy-policy-page .privacy-legal-content {
            padding: 0 10px;
          }
          .privacy-policy-page .privacy-title {
            font-size: clamp(26px, 7vw, 36px);
          }
          .privacy-policy-page .privacy-breadcrumb {
            font-size: 12px;
          }
        }
      `}</style>
    </div>
  );
}

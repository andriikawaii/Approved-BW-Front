import type { CMSSection } from "../../types/cms";

type SectionRendererProps = {
  sections: CMSSection[];
};

type SectionComponentProps = {
  section: CMSSection;
};

type SectionComponent = (props: SectionComponentProps) => JSX.Element | null;

function readString(data: Record<string, unknown>, key: string): string | null {
  const value = data[key];
  return typeof value === "string" && value.trim().length > 0 ? value : null;
}

function readItems(data: Record<string, unknown>, key: string): Array<Record<string, unknown>> {
  const value = data[key];
  if (!Array.isArray(value)) {
    return [];
  }
  return value.filter((item): item is Record<string, unknown> => Boolean(item) && typeof item === "object");
}

const HeroSection: SectionComponent = ({ section }) => {
  const title = readString(section.data, "title");
  const subtitle = readString(section.data, "subtitle");
  const body = readString(section.data, "body");
  const ctaLabel = readString(section.data, "cta_label");
  const ctaUrl = readString(section.data, "cta_url");

  return (
    <section id={`section-${section.id}`} data-section-type={section.type}>
      {title ? <h2>{title}</h2> : null}
      {subtitle ? <p>{subtitle}</p> : null}
      {body ? <p>{body}</p> : null}
      {ctaLabel && ctaUrl ? <a href={ctaUrl}>{ctaLabel}</a> : null}
    </section>
  );
};

const RichTextSection: SectionComponent = ({ section }) => {
  const html = readString(section.data, "html");

  if (!html) {
    return null;
  }

  return (
    <section
      id={`section-${section.id}`}
      data-section-type={section.type}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

const FeatureGridSection: SectionComponent = ({ section }) => {
  const title = readString(section.data, "title");
  const items = readItems(section.data, "items");

  return (
    <section id={`section-${section.id}`} data-section-type={section.type}>
      {title ? <h2>{title}</h2> : null}
      <ul>
        {items.map((item, index) => {
          const itemTitle = readString(item, "title");
          const itemDescription = readString(item, "description");
          const key = `${section.id}-${index}`;

          return (
            <li key={key}>
              {itemTitle ? <h3>{itemTitle}</h3> : null}
              {itemDescription ? <p>{itemDescription}</p> : null}
            </li>
          );
        })}
      </ul>
    </section>
  );
};

const CtaSection: SectionComponent = ({ section }) => {
  const title = readString(section.data, "title");
  const body = readString(section.data, "body");
  const buttonLabel = readString(section.data, "button_label");
  const buttonUrl = readString(section.data, "button_url");

  return (
    <section id={`section-${section.id}`} data-section-type={section.type}>
      {title ? <h2>{title}</h2> : null}
      {body ? <p>{body}</p> : null}
      {buttonLabel && buttonUrl ? <a href={buttonUrl}>{buttonLabel}</a> : null}
    </section>
  );
};

const FaqSection: SectionComponent = ({ section }) => {
  const title = readString(section.data, "title");
  const items = readItems(section.data, "items");

  return (
    <section id={`section-${section.id}`} data-section-type={section.type}>
      {title ? <h2>{title}</h2> : null}
      <dl>
        {items.map((item, index) => {
          const question = readString(item, "question");
          const answer = readString(item, "answer");
          const key = `${section.id}-${index}`;

          if (!question && !answer) {
            return null;
          }

          return (
            <div key={key}>
              {question ? <dt>{question}</dt> : null}
              {answer ? <dd>{answer}</dd> : null}
            </div>
          );
        })}
      </dl>
    </section>
  );
};

const SECTION_COMPONENTS: Record<string, SectionComponent> = {
  hero: HeroSection,
  rich_text: RichTextSection,
  feature_grid: FeatureGridSection,
  cta: CtaSection,
  faq: FaqSection,
};

export default async function SectionRenderer({ sections }: SectionRendererProps) {
  return (
    <>
      {sections.map((section) => {
        if (!section.is_active) {
          return null;
        }

        const Component = SECTION_COMPONENTS[section.type];

        if (!Component) {
          return null;
        }

        return <Component key={section.id} section={section} />;
      })}
    </>
  );
}

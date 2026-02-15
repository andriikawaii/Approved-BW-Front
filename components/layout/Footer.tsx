import Link from "next/link";
import { resolveFooterVariant, type FooterVariant } from "../../lib/footer";
import { resolvePhone } from "../../lib/phones";

type FooterProps = {
  template: string;
  slugPath?: string;
};

type FooterContent = {
  heading: string;
  copy: string;
  links: Array<{ label: string; href: string }>;
};

const FOOTER_CONTENT: Record<FooterVariant, FooterContent> = {
  A: {
    heading: "Builtwell",
    copy: "Trusted teams, predictable outcomes, measurable delivery.",
    links: [
      { label: "Company", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact" },
    ],
  },
  B: {
    heading: "Builtwell Services",
    copy: "Service-led execution with local expertise and fast turnaround.",
    links: [
      { label: "All Services", href: "/services" },
      { label: "Industries", href: "/industries" },
      { label: "Case Studies", href: "/case-studies" },
    ],
  },
  C: {
    heading: "Builtwell Locations",
    copy: "Regional teams serving multi-site programs across the U.S.",
    links: [
      { label: "Locations", href: "/locations" },
      { label: "Service Areas", href: "/service-areas" },
      { label: "Request Quote", href: "/contact" },
    ],
  },
  D: {
    heading: "Builtwell Insights",
    copy: "Field notes, guides, and practical insights from active projects.",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "Resources", href: "/resources" },
      { label: "Newsletter", href: "/newsletter" },
    ],
  },
};

export default async function Footer({ template, slugPath }: FooterProps) {
  const variant = resolveFooterVariant(template);
  const content = FOOTER_CONTENT[variant];
  const phone = resolvePhone({ template, slugPath });

  return (
    <footer data-variant={variant}>
      <section>
        <h2>{content.heading}</h2>
        <p>{content.copy}</p>
        <p>
          <a href={`tel:${phone.replace(/[^\d]/g, "")}`}>{phone}</a>
        </p>
      </section>
      <nav aria-label="Footer">
        <ul>
          {content.links.map((link) => (
            <li key={link.href}>
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </footer>
  );
}

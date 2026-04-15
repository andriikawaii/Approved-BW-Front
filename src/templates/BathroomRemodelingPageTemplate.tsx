"use client";

import type { CMSPage, CMSSection } from "@/types/cms";
import { KitchenRemodelingPageTemplate } from "./KitchenRemodelingPageTemplate";

/* ───────── DEFAULT BATHROOM SECTIONS ───────── */

const defaultSections: CMSSection[] = [
  /* ── HERO ── */
  {
    id: 9000,
    type: "service_hero",
    is_active: true,
    data: {
      title: "Bathroom Remodeling in Connecticut",
      title_highlight: "Connecticut",
      subtitle:
        "Bathroom remodeling in Connecticut ranges from $15,000 to $120,000+, typically completed in 4 to 8 weeks. Walk-in showers, custom tile, vanities, and fixtures, fully managed from demolition to final walkthrough.",
      background_image: "/images/headers/bathroom-remodeling-header.jpg",
      primary_cta: { label: "Get Your Free Estimate", url: "#contact" },
    },
  },

  /* ── TRUST BAR (hero stats) ── */
  {
    id: 9001,
    type: "trust_bar",
    is_active: true,
    data: {
      items: [
        { value: "15+", label: "Years of Experience" },
        { value: "100+", label: "Completed Projects" },
        {
          value: "4.9",
          label: "Google Rating",
          url: "https://www.google.com/maps/search/?api=1&query=BuiltWell+CT,+206A+Boston+Post+Road,+Orange,+CT+06477",
        },
        { value: null, label: "Fully Bonded & Insured", icon: "shield" },
      ],
    },
  },

  /* ── OVERVIEW (rich_text) ── */
  {
    id: 9002,
    type: "rich_text",
    is_active: true,
    data: {
      eyebrow: "Connecticut's Bathroom Remodeling Contractor",
      title: "Full-Service Bathroom Remodeling Across Connecticut",
      highlight_text: "Across Connecticut",
      style_variant: "overview",
      content:
        "We handle bathroom renovations across Fairfield County and New Haven County, from straightforward tub-to-shower conversions to complete gut renovations with custom tile, walk-in showers, and heated floors. Every project is managed by our in-house team, not subcontracted out. We hold a Connecticut Home Improvement Contractor license (#0668405) and carry full liability and workers' compensation insurance.\n\nBathroom remodeling in Connecticut ranges from $15,000 for a fixture and vanity update to $120,000 or more for a full renovation with layout changes, high-end tile, and an addition. Most bathroom remodels complete in three to six weeks of active construction; projects involving layout changes or room additions extend that timeline.",
    },
  },

  /* ── WHAT'S INCLUDED (service_intro_split) ── */
  {
    id: 9003,
    type: "service_intro_split",
    is_active: true,
    data: {
      title: "What Is Included in a Bathroom Remodel",
      highlight_text: "Bathroom Remodel",
      image_main: "/services/bathroom-remodeling-luxury-master-ct-01.jpeg",
      image_secondary: "/services/bathroom-remodeling-master-suite-ct-02.jpeg",
      content:
        "A complete bathroom remodel covers demolition, waterproofing, tile, plumbing fixtures, vanity, electrical, ventilation, and all required permits, managed as a single coordinated project from start to final walkthrough.\n\nWe begin with full demolition of existing tile, fixtures, vanity, and flooring. Before any new materials go in, we inspect the subfloor, wall framing, and plumbing lines. Connecticut homes built before 1990 frequently turn up galvanized drain lines that have corroded, inadequate subfloor support for heavy tile, or plumbing venting that does not meet current code.\n\nWaterproofing is installed behind all shower and tub tile using membrane systems. We use cement board in wet areas as a standard practice. New work includes tile installation on floors and walls, vanity and countertop installation, all plumbing fixture connections, electrical updates for lighting and outlets, and exhaust fan installation or replacement.\n\nEvery project includes permit coordination, daily cleanup, dust barriers to protect adjacent rooms, and a final walkthrough where we review every detail together.",
      bullet_points: [
        { text: "Demolition" },
        { text: "Waterproofing" },
        { text: "Tile Work" },
        { text: "Plumbing", description: "All fixture connections, drain lines, supply lines, and shower valve installation. Relocated lines as needed." },
        { text: "Electrical", description: "Updated lighting, GFCI outlets, exhaust fan installation, and new circuits as required by code." },
        { text: "Vanity & Countertop" },
        { text: "Ventilation" },
        { text: "Permits & Finish" },
      ],
    },
  },

  /* ── CASE STUDIES (before_after_grid) ── */
  {
    id: 9004,
    type: "before_after_grid",
    is_active: true,
    data: {
      title: "Recent Bathroom Remodeling Projects",
      title_highlight: "Remodeling Projects",
      subtitle:
        "The projects below give you a sense of what we've completed in Connecticut recently.",
      projects: [
        {
          location: "Primary Bathroom in Westport",
          description:
            "Full gut renovation with walk-in shower, frameless glass, floor-to-ceiling tile, and 48-inch vanity with stone countertop. Completed in four weeks.",
          image: "/images/before-after/bathroom-renovation-1.jpg",
          testimonial_quote:
            "Four weeks of construction, and now I have the bathroom I have been wanting for years. - Westport Homeowner",
        },
        {
          location: "Hall Bathroom in Hamden",
          description:
            "Tub-to-shower conversion with custom tile, new vanity, GFCI outlets, and properly ducted exhaust fan. Subfloor repairs addressed during demo.",
          image: "/images/before-after/bathroom-renovation-2.jpg",
          testimonial_quote:
            "They found issues behind the walls and fixed them properly before finishing. That is what a professional contractor does. - Hamden Homeowner",
        },
        {
          location: "Guest Bathroom in Fairfield",
          description:
            "Complete refresh with new tile floors, updated vanity, modern lighting, and fresh paint. Clean, straightforward three-week project.",
          image: "/images/before-after/bathroom-renovation-3.jpg",
          testimonial_quote:
            "Clean work site every day, finished ahead of schedule. Exactly what we were looking for. - Fairfield Homeowner",
        },
      ],
    },
  },

  /* ── PRICING TABLE ── */
  {
    id: 9005,
    type: "pricing_table",
    is_active: true,
    data: {
      title: "Bathroom Remodeling Cost in Connecticut",
      title_highlight: "Connecticut",
      subtitle:
        "Bathroom remodeling in Connecticut costs $15,000 to $120,000 or more depending on the bathroom's size, the quality of fixtures and tile selected, and whether the project involves any layout changes or room expansion.",
      columns: ["Scope", "Cost Range", "What's Typically Included"],
      rows: [
        {
          label: "Basic",
          price: "$15,000 – $25,000",
          notes: "New fixtures, vanity, flooring, tile, paint",
        },
        {
          label: "Mid-Range",
          price: "$25,000 – $55,000",
          notes:
            "Full gut renovation, new tile, shower or tub, vanity, lighting",
        },
        {
          label: "High-End",
          price: "$55,000 – $80,000",
          notes:
            "Custom tile, walk-in shower, premium fixtures, heated floors",
        },
        {
          label: "Expansion / Layout Change",
          price: "$80,000 – $120,000+",
          notes:
            "Layout changes, bathroom addition, high-end finishes throughout",
        },
      ],
    },
  },

  /* ── MID-PAGE CTA ── */
  {
    id: 9006,
    type: "cta_block",
    is_active: true,
    data: {
      title: "Ready to Begin Your Bathroom Remodel?",
      title_highlight: "Bathroom Remodel",
      subtitle: "Great bathroom remodeling starts with the right team.",
      button: { label: "Get Your Free Estimate", url: "#contact" },
      subtext:
        "On-site or remote via Google Meet. No charge, no obligation.",
    },
  },

  /* ── LOCAL EXPERTISE (rich_text) ── */
  {
    id: 9007,
    type: "rich_text",
    is_active: true,
    data: {
      eyebrow: "Local Knowledge",
      title:
        "Why Connecticut Bathroom Remodeling Requires Local Expertise",
      highlight_text: "Local Expertise",
      style_variant: "local_expertise",
      content:
        "Connecticut homes present bathroom-specific construction conditions that contractors without local experience often miss.\n\nConnecticut homes present bathroom-specific construction conditions that contractors without local experience often miss until they're already into the project, and by then, those surprises cost time and money.\n\nPre-1970 homes throughout both counties frequently have cast iron tubs that can weigh 300 to 400 pounds. Extracting them without damaging the surrounding structure, flooring, or plumbing requires care and experience. Plaster walls, which are common in older New Haven, Greenwich, and Guilford homes, require different preparation behind tile than modern drywall does. The substrate needs to be correct before any tile adhesive goes down, or the tile will fail.\n\nCoastal towns along Long Island Sound, including Westport, Milford, Branford, Guilford, and Madison, deal with elevated ambient humidity and salt air that affect how tile adhesives cure and how grout holds up over time. We account for those conditions in our material recommendations and installation methods.\n\nWalk-in shower installations and tub-to-shower conversions typically require a building permit in Connecticut. Electrical work in bathrooms, including new lighting circuits and GFCI outlets, requires an electrical permit in most towns. Some towns issue these as a single permit; others require separate filings. Towns like Greenwich, New Canaan, and Darien have strict zoning oversight, and projects in historic districts in towns like Guilford and Ridgefield may involve additional review for certain types of work. We handle all permit applications and inspections as a standard part of every project.",
    },
  },

  /* ── PROCESS STEPS ── */
  {
    id: 9008,
    type: "process_steps",
    is_active: true,
    data: {
      eyebrow: "Our Process",
      title: "Our Bathroom Remodeling Process",
      title_highlight: "Remodeling Process",
      subtitle:
        "Every bathroom remodel follows the same five-step process. This consistency is how we keep projects on schedule, communicate clearly throughout, and deliver finished results that hold up.",
      steps: [
        {
          title: "Consultation",
          description:
            "We visit your home or connect via Google Meet or Zoom to discuss your goals, assess the space, and answer your questions. No charge. No obligation.",
        },
        {
          title: "Planning",
          description:
            "You receive a clear written proposal covering exactly what's included, how long it will take, and what it costs. Line items are specific and broken out separately. No surprises mid-project.",
        },
        {
          title: "Selections",
          description:
            "We guide you through material choices including tile, vanity, countertop, fixtures, shower enclosure, and lighting, with options at different price points and clear lead time communication.",
        },
        {
          title: "Build",
          description:
            "Construction begins on the agreed schedule. You receive daily updates on progress, a clean job site at the end of every workday, and crews who arrive when scheduled.",
        },
        {
          title: "Walkthrough",
          description:
            "We walk through the finished project together. We check every grout line, every fixture connection, every light, every drawer. Your written acceptance at the final walkthrough is the last step.",
        },
      ],
    },
  },

  /* ── PROJECT TIMELINE (feature_grid) ── */
  {
    id: 9009,
    type: "feature_grid",
    is_active: true,
    data: {
      title: "Project Timeline",
      title_highlight: "Timeline",
      subtitle:
        "Most full bathroom remodels complete in five to twelve weeks from signed proposal to final walkthrough.",
      items: [
        {
          title: "Planning & Design",
          description: "1–2 Weeks. Consultation, measurements, material selections, and detailed proposal.",
        },
        {
          title: "Material Lead Time",
          description: "2–4 Weeks. Specialty tile, custom vanities, and premium fixtures ordered and delivered.",
        },
        {
          title: "Construction",
          description: "3–6 Weeks. Demo, plumbing, electrical, waterproofing, tile, vanity, and fixtures.",
        },
        {
          title: "Final Touches",
          description: "3–5 Days. Grouting, hardware, final connections, and walkthrough.",
        },
      ],
    },
  },

  /* ── WHERE WE WORK (areas_served) ── */
  {
    id: 9010,
    type: "areas_served",
    is_active: true,
    data: {
      eyebrow: "Where We Work",
      title: "Bathroom Remodeling Across Two Counties",
      highlight_text: "Two Counties",
      subtitle:
        "We provide bathroom remodeling throughout Fairfield and New Haven Counties, with dedicated teams serving both regions.",
      subtitle_link_text: "",
      subtitle_link_url: "",
      counties: [
        {
          name: "Fairfield County",
          image: "/images/areas/fairfield-county.jpg",
          phone: "(203) 919-9616",
          description:
            "Bathroom remodeling across Fairfield County, from full master bath renovations in Greenwich and Westport to practical updates in Norwalk and Stamford. We handle tile, plumbing, and fixtures in house.",
          featured_towns: [
            "Greenwich",
            "Stamford",
            "Norwalk",
            "Westport",
            "Darien",
            "New Canaan",
            "Fairfield",
            "Ridgefield",
            "Trumbull",
          ],
          town_links: [
            { name: "Greenwich", url: "/fairfield-county/greenwich-ct/" },
            { name: "Westport", url: "/fairfield-county/westport-ct/" },
          ],
          all_towns: [
            "Bethel", "Bridgeport", "Brookfield", "Danbury", "Easton",
            "Monroe", "New Fairfield", "Newtown", "Redding", "Shelton",
            "Sherman", "Stratford", "Weston", "Wilton",
          ],
          url: "/fairfield-county/",
        },
        {
          name: "New Haven County",
          image: "/images/areas/new-haven-county.jpg",
          phone: "(203) 466-9148",
          description:
            "Bathroom remodeling across New Haven County, from our Orange, CT office. We upgrade outdated layouts, replace fixtures, and deliver complete bath renovations tailored to the local housing stock.",
          featured_towns: [
            "Orange",
            "New Haven",
            "Hamden",
            "Branford",
            "Guilford",
            "Madison",
            "Woodbridge",
            "Milford",
            "Cheshire",
          ],
          town_links: [
            { name: "Orange", url: "/new-haven-county/orange-ct/" },
            { name: "New Haven", url: "/new-haven-county/new-haven-ct/" },
            { name: "Madison", url: "/new-haven-county/madison-ct/" },
          ],
          all_towns: [
            "Ansonia", "Beacon Falls", "Bethany", "Derby", "East Haven",
            "Meriden", "Middlebury", "Naugatuck", "North Branford",
            "North Haven", "Oxford", "Prospect", "Seymour", "Southbury",
            "Wallingford", "Waterbury", "West Haven", "Wolcott",
          ],
          url: "/new-haven-county/",
        },
      ],
      note: "Not sure if we cover your area? [Contact our Connecticut remodeling team](/contact/) and we'll let you know.",
    },
  },

  /* ── FAQ ── */
  {
    id: 9011,
    type: "faq_list",
    is_active: true,
    data: {
      title: "Bathroom Remodeling Questions",
      title_highlight: "Questions",
      items: [
        {
          question:
            "Do I need a permit for a bathroom remodel in Connecticut?",
          answer:
            "Yes. Bathroom remodeling work that involves plumbing, electrical, or structural modifications requires permits in all Connecticut towns. Replacing a tub with a walk-in shower almost always requires a building permit, and the electrical work involved in updating bathroom lighting and installing GFCI outlets requires an electrical permit in most municipalities. Even renovations that appear cosmetic can trigger permit requirements if they involve any licensed trade work. Some towns issue a single permit covering all trades; others require separate filings for building, electrical, and plumbing, each with their own inspections. We handle all permit applications and inspection coordination as part of the project; you don't need to manage that process separately.",
        },
        {
          question:
            "How long does a bathroom remodel take in CT?",
          answer:
            "Most full bathroom renovations in Connecticut complete in three to six weeks of active construction. Basic updates such as a new vanity, fixtures, flooring, and paint without major structural or plumbing changes run two to three weeks. Full gut renovations with custom tile, a new shower enclosure, and relocated plumbing typically take five to six weeks. Projects that involve layout changes, plumbing relocation, or expanding the footprint of the bathroom extend beyond that. We provide a specific project schedule in your written proposal so you know your expected start date, key milestones, and projected completion before work begins.",
        },
        {
          question:
            "Can I use the bathroom during a remodel?",
          answer:
            "Not the bathroom being renovated. We seal off the work area with dust barriers for safety and dust control, and the space won't be functional until the project is complete. If you have a second bathroom in your home, you'll be able to use that throughout the project. If the bathroom being renovated is your only bathroom, we'll discuss that with you during the planning phase and work through a realistic approach, whether that means sequencing the work to restore basic function as quickly as possible or identifying alternatives. We make sure you understand exactly what access looks like before construction begins.",
        },
        {
          question:
            "What's the difference between a bathroom refresh and a full remodel?",
          answer:
            "A bathroom refresh updates surfaces and fixtures without opening walls or changing the layout. It typically includes a new vanity and countertop, updated faucets and fixtures, new flooring, paint, and sometimes new lighting. The plumbing supply and drain lines stay in place, and nothing structural changes. A full remodel involves gutting the space to the studs, which allows for layout changes, proper waterproofing behind tile, subfloor repairs, plumbing relocation, and a complete redesign of the space. Refreshes generally start around $15,000. Full gut renovations start around $25,000 and go up from there based on scope and material selections. The right choice depends on the condition of your current bathroom and what you're trying to accomplish.",
        },
        {
          question:
            "Can you install a walk-in shower in place of a bathtub?",
          answer:
            "Yes. Tub-to-shower conversions are one of our most commonly requested projects, and we handle every aspect: plumbing reconfiguration, drain installation with proper slope for barrier-free entry, waterproofing membrane, tile, and the shower enclosure itself. We'll assess whether the existing floor framing needs reinforcement for the new drain location and whether the subfloor can support the tile system you want. Walk-in shower installations require a building permit in Connecticut, which we handle as part of the project. If the bathroom currently has only one tub and you're replacing it with a shower, we'll discuss that during the consultation, particularly if resale value is a consideration, since some buyers prefer at least one tub in the home.",
        },
        {
          question:
            "Does a bathroom remodel increase home value in Connecticut?",
          answer:
            "Yes. Bathroom remodeling consistently ranks among the highest-ROI home improvements in Connecticut. A mid-range bathroom renovation typically returns 60 to 70 percent of the investment at resale, and in competitive Fairfield County markets like Greenwich, Westport, and Darien, updated bathrooms are often expected by buyers rather than viewed as a bonus. The return depends on the scope of the project, the quality of materials used, and how the finished bathroom compares to other homes in your neighborhood. Over-improving relative to neighboring homes can reduce the percentage return. We can help you make material and scope decisions that balance what you want to live with and what makes sense for your home's market position.",
        },
        {
          question:
            "What happens if you find unexpected issues behind the walls during demolition?",
          answer:
            "It happens regularly in Connecticut homes, especially those built before 1990. Common findings include deteriorated plumbing behind tile, water damage to wall framing or subfloor, inadequate waterproofing, galvanized drain lines that have corroded, and occasionally asbestos in old floor tiles or lead paint on existing surfaces. When we discover something unexpected, we contact you that same day, explain what we found, present your options with clear costs, and wait for your approval before proceeding. We do not make decisions about your home without your input. Any additional work is documented in a change order with a specific cost and timeline impact so there are no surprises on the final invoice.",
        },
        {
          question:
            "Do you offer financing for bathroom remodeling projects?",
          answer:
            "Yes. We offer flexible financing through GreenSky, which allows you to get approved in about 60 seconds and start your project right away. Financing options include low monthly payments and promotional periods depending on the plan you choose. Many homeowners use financing to move forward with higher-quality materials or a broader scope of work than they would with cash alone. We can walk you through the options during your consultation so you have a clear picture of both the project cost and the monthly payment before you commit to anything.",
        },
      ],
    },
  },

  /* ── TRUST STRIP (second trust_bar) ── */
  {
    id: 9012,
    type: "trust_bar",
    is_active: true,
    data: {
      items: [
        {
          icon: "star",
          label: "Google Rating",
          value: "4.9",
          url: "https://www.google.com/search?q=builtwell+ct+reviews",
        },
        {
          icon: "check",
          label: "Houzz",
          value: "Trusted on Houzz",
          url: "https://www.houzz.com/professionals/general-contractors/builtwell-ct",
        },
        {
          icon: "calendar",
          label: "CT HIC License",
          value: "#0668405",
          url: "https://www.elicense.ct.gov/Lookup/LicenseLookup.aspx",
        },
        {
          icon: "check",
          label: "Angi",
          value: "Verified on Angi",
          url: "https://www.angi.com/companylist/us/ct/orange/builtwell-ct-reviews-",
        },
      ],
    },
  },

  /* ── BRAND CAROUSEL (logo_strip) ── */
  {
    id: 9013,
    type: "logo_strip",
    is_active: true,
    data: {
      subtitle:
        "We work exclusively with proven brands trusted by contractors and homeowners across Connecticut.",
      items: [
        { name: "Kohler", logo: "/images/brands/kohler.svg", url: "https://www.kohler.com" },
        { name: "Moen", logo: "/images/brands/moen.svg", url: "https://www.moen.com" },
        { name: "Delta", logo: "/images/brands/delta.svg", url: "https://www.deltafaucet.com" },
        { name: "TOTO", logo: "/images/brands/toto.svg", url: "https://www.totousa.com" },
        { name: "American Standard", logo: "/images/brands/american-standard.svg", url: "https://www.americanstandard.com" },
        { name: "Schluter", logo: "/images/brands/schluter.svg", url: "https://www.schluter.com" },
        { name: "Daltile", logo: "/images/brands/daltile.svg", url: "https://www.daltile.com" },
        { name: "GROHE", logo: "/images/brands/grohe.svg", url: "https://www.grohe.com" },
        { name: "hansgrohe", logo: "/images/brands/hansgrohe.svg", url: "https://www.hansgrohe-usa.com" },
        { name: "Brizo", logo: "/images/brands/brizo.svg", url: "https://www.brizo.com" },
      ],
    },
  },

  /* ── LEAD FORM ── */
  {
    id: 9014,
    type: "lead_form",
    is_active: true,
    data: {
      eyebrow: "GET IN TOUCH",
      title: "Ready to Start Your Bathroom Remodeling Project?",
      title_highlight: "Remodeling Project",
      subtitle:
        "Tell us about your project. We respond within one business day. No obligation.",
      fields: [
        { name: "name", label: "Name", type: "text", placeholder: "Your full name", required: true },
        { name: "phone", label: "Phone", type: "tel", placeholder: "(203) 000-0000", required: true },
        { name: "email", label: "Email", type: "email", placeholder: "you@email.com", required: true },
        { name: "zip", label: "Zip Code", type: "text", placeholder: "06477", required: true },
        {
          name: "services",
          label: "Services Needed",
          type: "checkbox_group",
          required: true,
          options: [
            "Kitchen Remodeling",
            "Bathroom Remodeling",
            "Basement Finishing",
            "Flooring Installation",
            "Home Additions",
            "Interior Painting",
            "Interior Carpentry",
            "Attic Conversions",
            "Decks & Porches",
            "Design & Planning",
            "Comfort & Accessibility",
            "Other",
          ],
        },
        {
          name: "best_time",
          label: "Best Time to Contact",
          type: "select",
          required: true,
          options: [
            "Morning (8am - 12pm)",
            "Afternoon (12pm - 4pm)",
            "Evening (4pm - 6pm)",
            "Anytime",
          ],
        },
        {
          name: "message",
          label: "Tell Us About Your Project",
          type: "textarea",
          placeholder:
            "Describe your project, timeline, budget range, or any questions...",
        },
      ],
    },
  },

  /* ── FINANCING STRIP (rich_text) ── */
  {
    id: 9015,
    type: "rich_text",
    is_active: true,
    data: {
      style_variant: "financing_strip",
    },
  },

  /* ── RELATED SERVICES (project_highlights) ── */
  {
    id: 9016,
    type: "project_highlights",
    is_active: true,
    data: {
      eyebrow: "Related Services",
      items: [
        {
          title: "Kitchen Remodeling",
          description:
            "Complete kitchen renovations including cabinetry, countertops, islands, appliances, tile, lighting, and plumbing across Fairfield and New Haven Counties.",
          image: "/services/kitchen-remodeling-ct.jpg",
          url: "/kitchen-remodeling/",
        },
        {
          title: "Flooring",
          description:
            "Hardwood, luxury vinyl plank, tile, and engineered wood flooring installation with expert subfloor preparation.",
          image: "/services/flooring-installation-ct.jpg",
          url: "/flooring/",
        },
        {
          title: "Comfort & Accessibility",
          description:
            "Aging-in-place renovations including curbless showers, grab bars, wider doorways, and barrier-free design for safe, comfortable living.",
          image: "/services/comfort-accessibility-ct.jpg",
          url: "/comfort-accessibility-remodeling/",
        },
      ],
    },
  },
];

/* ───────── COMPONENT ───────── */

export function BathroomRemodelingPageTemplate({ page }: { page: CMSPage }) {
  // Check if CMS provided real sections (not empty)
  const hasCMSSections =
    page.sections.length > 0 &&
    page.sections.some((s) => s.is_active);

  // If CMS data is present, use it; otherwise use defaults
  const enhancedPage: CMSPage = hasCMSSections
    ? page
    : {
        ...page,
        slug: page.slug || "bathroom-remodeling",
        sections: defaultSections,
      };

  return <KitchenRemodelingPageTemplate page={enhancedPage} />;
}

'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import type { CMSPage } from '@/types/cms';
import { AreasSection as SharedAreasSection, FinancingStrip as SharedFinancingStrip, LeadFormSection as SharedLeadFormSection } from './template-utils';

// ─── FadeUp ───────────────────────────────────────────────────────────────────
function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(28px)',
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// ─── SectionLabel ──────────────────────────────────────────────────────────────
function SectionLabel({ text, dark = false }: { text: string; dark?: boolean }) {
  return (
    <span className={`gwch-label${dark ? ' gwch-label-dark' : ''}`}>
      <span className="gwch-label-line" />
      {text}
    </span>
  );
}

// ─── Main Template ─────────────────────────────────────────────────────────────
export function WestportCTPageTemplate({ page: _page }: { page: CMSPage }) {
  const [servicesOpen, setServicesOpen] = useState(false);

  const primaryServices = [
    {
      title: 'Kitchen Remodeling',
      href: '/kitchen-remodeling/westport-ct/',
      img: '/images/services/service-kitchen.jpg',
      desc: 'Full kitchen renovations in Westport including cabinetry, countertops, tile, electrical, plumbing, and permits. Custom cabinet lead times run 8 to 12 weeks in this market.',
      price: '$40K–$250K+',
      time: '6–12 weeks',
    },
    {
      title: 'Bathroom Remodeling',
      href: '/bathroom-remodeling/westport-ct/',
      img: '/images/services/bathroom-remodel-new.jpg',
      desc: 'Primary suite renovations, hall bath updates, and full gut remodels for Westport homeowners.',
      price: '$25K–$120K+',
      time: '3–6 weeks',
    },
    {
      title: 'Basement Finishing',
      href: '/basement-finishing/westport-ct/',
      img: '/images/services/basement-finish-real.jpeg',
      desc: 'Flood zone awareness before anything else. In Westport, we confirm existing floor elevation relative to Base Flood Elevation before framing begins.',
      price: '$25K–$100K+',
      time: '4–8 weeks',
    },
    {
      title: 'Flooring Installation',
      href: '/flooring/westport-ct/',
      img: '/images/services/service-flooring.png',
      desc: 'Hardwood, LVP, tile, and engineered wood. Original hardwood in Westport\'s 1950s colonials is often intact under carpet and worth refinishing.',
      price: '$6–$25/sqft',
      time: '2–5 days',
    },
    {
      title: 'Home Additions',
      href: '/home-additions/',
      img: '/images/services/living-room-real.jpeg',
      desc: 'Single-story and second-story additions, sunrooms, and bump-outs with full structural work for Westport homeowners.',
      price: '$150–$400/sqft',
      time: '8–16 weeks',
    },
    {
      title: 'Interior Painting',
      href: '/interior-painting/',
      img: '/images/services/interior-painting-new.jpg',
      desc: 'Walls, ceilings, trim, doors, and built-ins with professional-grade paints and proper prep for Westport homes.',
      price: '$3–$6/sqft',
      time: '2–5 days',
    },
  ];

  const moreServices = [
    {
      title: 'Interior Carpentry',
      href: '/interior-carpentry/',
      img: '/images/services/service-kitchen.jpg',
      desc: 'Custom millwork, built-in cabinetry, wainscoting, crown molding, coffered ceilings, closet systems, and finish trim for Westport residences.',
      price: '$75–$150/hr',
      time: 'Varies',
    },
    {
      title: 'Attic Conversions',
      href: '/attic-conversions/',
      img: '/images/services/basement-finish-real.jpeg',
      desc: 'Converting unfinished attics into bedrooms, offices, or playrooms with full structural assessment in Westport.',
      price: '$50K–$150K',
      time: '6–12 weeks',
    },
    {
      title: 'Decks & Porches',
      href: '/decks-porches/',
      img: '/images/services/living-room-real.jpeg',
      desc: 'Pressure-treated lumber, composite, and hardwood. Covered porches, screened-in structures, pergolas, and multi-level decks built for Westport properties.',
      price: '$15K–$75K',
      time: '2–4 weeks',
    },
    {
      title: 'Design & Planning',
      href: '/remodeling-design-planning/',
      img: '/images/services/service-kitchen.jpg',
      desc: 'Space planning, material selection, finish coordination, and project documentation before construction begins on your Westport remodel.',
      price: '$2.5K–$15K',
      time: '2–6 weeks',
    },
    {
      title: 'Comfort & Accessibility',
      href: '/comfort-accessibility-remodeling/',
      img: '/images/services/bathroom-remodel-new.jpg',
      desc: 'Grab bars, roll-in showers, wider doorways, ramp installation, and first-floor adaptations for Westport homeowners of all ages and abilities.',
      price: '$5K–$50K',
      time: '1–4 weeks',
    },
    {
      title: 'Insurance Reconstruction',
      href: '/insurance-restoration/',
      img: '/images/services/living-room-real.jpeg',
      desc: 'Rebuilding Westport homes after fire, water, and storm damage. Full reconstruction once cleanup is complete, working directly with your insurance carrier.',
      price: '$25K–$250K+',
      time: '4–16 weeks',
    },
  ];

  const neighborhoods = [
    {
      name: 'Compo and Compo Beach',
      body: "Compo is the most coastal section of Westport, directly adjacent to Compo Beach on Long Island Sound. The lots here are compact, often a quarter-acre or less near the water, which is why the renovation pattern has shifted from horizontal additions to teardowns and vertical rebuilding. Many of the original seasonal bungalows that characterized the neighborhood have been replaced entirely. FEMA flood zone AE and VE designations apply to a significant number of waterfront parcels here, which affects everything from foundation design to what constitutes a \"substantial improvement\" under federal floodplain regulations. If your project cost exceeds 50 percent of the pre-improvement market value of the structure, you are subject to full code compliance requirements including elevation to or above Base Flood Elevation. On a modest older beach cottage, that threshold is easier to hit than most homeowners expect.",
    },
    {
      name: 'Saugatuck',
      body: "Saugatuck is the oldest developed neighborhood in Westport, built up around the Saugatuck River and the railroad from the post-Civil War era through the mid-20th century. It is Westport's most practical entry point: Cape Cods, modest Colonials, smaller footprints, and homes that in many cases have not had a full mechanical, electrical, or plumbing update since they were built. The Saugatuck River flooded significantly in 1992 and 1996, and current floodplain regulations apply to parcels in the river corridor. Projects in this area require the same flood zone diligence as coastal Compo, and we approach them the same way: assessing flood map status before scope discussions, not after.",
    },
    {
      name: 'Greens Farms',
      body: "Greens Farms is one of the most architecturally consistent neighborhoods in all of Fairfield County. Two-acre zoning, pre-war Colonials with white clapboard and green shutters, stone walls, open meadows: Greens Farms has the New England character that draws buyers to Westport even when the rest of the town is dominated by 1960s construction. Renovation here is not about updating a dated floor plan. It is about period-appropriate restoration and additions that respect the existing character: matching original millwork profiles, sourcing materials that align with what was there, and making sure any addition does not visually undermine a home that has architectural coherence to begin with.",
    },
    {
      name: 'Coleytown',
      body: "Coleytown is the northernmost section of Westport, bordering Weston, and it developed almost entirely during the 1950s through 1970s suburban expansion. The colonials here sit on half-acre to one-acre lots, and the terrain reflects Westport's inland geology: ledge rock sits close to grade throughout much of this neighborhood. That matters for any project that breaks ground. Pools, basement additions, utility trenching, and new footings can all encounter solid ledge, which requires blasting or pneumatic hammer excavation. We build that contingency into scope discussions for Coleytown projects. It is not hypothetical.",
    },
    {
      name: 'Long Lots',
      body: "Long Lots takes its name from the original colonial land grant pattern that divided the area, and its character reflects that history. Long Lots Road is lined with antique colonials of genuine historical significance. The neighborhood has a rural, equestrian feel with the Fairfield County Hunt Club nearby, larger wooded lots, and mid-century homes on generous parcels alongside genuinely old construction. Renovation here can range from sensitive restoration of an 18th-century colonial to a full update of a solid 1970s home on a half-acre lot.",
    },
    {
      name: 'Old Hill and Poplar Plains',
      body: "Old Hill and Poplar Plains represent a significant share of Westport's owner-occupied housing stock without getting the attention that Compo or Greens Farms command. These are interior neighborhoods with a mix of post-war and mid-century homes: Colonial Revivals, split-levels, and capes from the 1950s and 1960s. The construction is typical for the era: well-built but aging, with electrical and plumbing systems that frequently need attention when a kitchen or bathroom project opens the walls.",
    },
  ];

  const faqItems = [
    {
      q: 'Do I need a permit for kitchen remodeling in Westport, CT?',
      a: 'Yes. Nearly all interior remodeling work in Westport requires a building permit, including kitchen renovations, wall removals, electrical upgrades, and plumbing modifications. Westport\'s code takes a default-permit approach: it lists only the work that does not require a permit, which means almost everything requires one. The building permit fee is $10 per $1,000 of renovation budget. We pull all permits as part of every project we take on; it is not optional and we do not treat it as one. Contact the Westport Building Department at 203-341-5025 for permit-specific questions.',
    },
    {
      q: 'How much does a kitchen remodel cost in Westport?',
      a: 'Kitchen remodeling in Westport typically starts at $40,000 for a minor refresh (countertops, appliances, cabinet fronts) and runs to $80,000 for that scope done well. A mid-range gut renovation with new cabinets, countertops, flooring, and appliances runs $80,000 to $140,000. High-end projects involving custom cabinetry, structural changes, and imported stone run $140,000 to $250,000 and higher. Custom cabinetry alone commonly runs $50,000 to $70,000 in this market. Several factors push costs above the range that applies in lower-cost Connecticut towns: the permit fee, the expectation level for finish work and materials, and the subcontractor network that is calibrated to work at this level. Call (203) 919-9616 to discuss your specific kitchen.',
    },
    {
      q: 'Does my Westport home\'s flood zone affect a renovation project?',
      a: 'Yes, if your home falls within FEMA\'s Special Flood Hazard Area. In AE flood zones, which cover most of Westport\'s developed floodplain areas including parts of Compo, Saugatuck, and Saugatuck Shores, the lowest floor of a new or substantially improved structure must be elevated to or above Base Flood Elevation. The "substantially improved" rule is the one that most often catches homeowners off guard: if your renovation cost exceeds 50 percent of the pre-improvement market value of the structure, the entire project must meet current flood zone compliance requirements, including elevation. On older beach cottages with a low structure value relative to land value, that threshold is reachable on a renovation that the homeowner thinks of as moderate in scope. We check flood map status for every Westport project before scope and pricing discussions begin. For projects in coastal Westport (Compo, Saugatuck Shores, and Greens Farms waterfront areas), CT DEEP Coastal Area Management review may also be required.',
    },
    {
      q: 'How long does a bathroom remodel take in Westport?',
      a: 'A typical bathroom remodel in Westport takes 3 to 6 weeks of active construction once permits are in hand and materials are on-site. A straightforward hall bath update (new vanity, toilet, tile, and fixtures without moving plumbing) falls toward the shorter end. A fully gutted primary suite with a walk-in shower, double vanity, heated floor, specialty tile, and reconfigured plumbing runs 6 to 8 weeks. The most common source of schedule extension in older Westport homes is what we find inside the walls after demolition: original plumbing supply lines, deteriorated drain stacks, or electrical wiring that needs replacement before finish work can begin. We communicate directly and immediately when we encounter those conditions.',
    },
    {
      q: 'Is my 1960s colonial in Coleytown or Saugatuck harder to remodel than a newer home?',
      a: 'Yes, in specific and predictable ways that we account for before a project starts. Homes built in the 1950s through 1970s in Westport frequently have original electrical panels, often 100-amp single-panel systems that are not adequate for modern kitchen or bathroom loads and need upgrading when a remodel opens the walls. Floor tiles from before 1980 may contain asbestos, which requires proper testing and abatement before any demolition proceeds. Basement moisture in homes of this era tends to be a product of aging foundation drainage and original waterproofing that was never designed for finished habitable space. We assess that before framing. In Coleytown specifically, ledge rock conditions mean that any project breaking ground may encounter solid ledge that requires blasting or pneumatic hammer excavation. None of these challenges make a project impossible. They make experience, honesty, and scope accuracy matter more.',
    },
    {
      q: 'How does insurance reconstruction work after storm damage in Westport, CT?',
      a: 'Insurance reconstruction after storm damage in Westport starts with filing your claim and having an adjuster assess the damage to your property. We then work directly with your insurance carrier to document the full scope of damage, agree on pricing, and manage the rebuild from start to finish. Westport\'s coastal exposure means storm damage claims are common, particularly in Compo, Saugatuck Shores, and Greens Farms. We coordinate with carriers including State Farm, Liberty Mutual, Travelers, and USAA. We handle all supplemental documentation when the initial adjuster estimate does not cover the full scope of required work. You do not need to manage payments between us and your carrier. We bill the insurance company directly and handle all inspection coordination. We hold CT HIC License #0668405.',
    },
    {
      q: 'Does a kitchen remodel increase home value in Westport, CT?',
      a: 'Yes, a kitchen remodel is one of the highest-ROI improvements you can make to a Westport home, typically returning 60% to 80% of the investment at resale. In Westport\'s market, where median home values are well above the state average, buyers expect updated kitchens with quality finishes. A mid-range kitchen renovation in the $80,000 to $140,000 range brings the most consistent return because it brings the kitchen up to current buyer expectations without over-improving relative to the neighborhood. High-end custom kitchens at $200,000 and above also add significant value in neighborhoods like Greens Farms and Long Lots where comparable sales support that level of finish.',
    },
  ];

  const primaryTowns = [
    { name: 'Greenwich', href: '/fairfield-county/greenwich-ct/' },
    { name: 'Westport', href: null, highlight: true },
    { name: 'Darien', href: '/fairfield-county/' },
    { name: 'New Canaan', href: '/fairfield-county/' },
    { name: 'Stamford', href: '/fairfield-county/' },
    { name: 'Norwalk', href: '/fairfield-county/' },
    { name: 'Fairfield', href: '/fairfield-county/' },
    { name: 'Ridgefield', href: '/fairfield-county/' },
    { name: 'Trumbull', href: '/fairfield-county/' },
  ];

  const moreTowns = [
    'Bethel', 'Bridgeport', 'Brookfield', 'Danbury', 'Easton',
    'Monroe', 'New Fairfield', 'Newtown', 'Redding', 'Shelton',
    'Sherman', 'Stratford', 'Weston', 'Wilton',
  ];

  return (
    <div className="gwch-page">
      <main id="main">

        {/* ── 1. HERO ─────────────────────────────────────────────────── */}
        <section className="gwch-page-hero gwch-page-hero-westport">
          <div className="gwch-hero-bg gwch-hero-bg-westport" />
          <div className="gwch-hero-gradient" />
          <div className="gwch-hero-inner">
            <ol className="gwch-breadcrumb">
              <li><Link href="/">Home</Link></li>
              <li aria-hidden="true" className="gwch-bc-sep">›</li>
              <li><Link href="/areas-we-serve/">Areas We Serve</Link></li>
              <li aria-hidden="true" className="gwch-bc-sep">›</li>
              <li><Link href="/fairfield-county/">Fairfield County</Link></li>
              <li aria-hidden="true" className="gwch-bc-sep">›</li>
              <li><span className="gwch-bc-current">Westport, CT</span></li>
            </ol>
            <h1 className="gwch-hero-h1">
              Home Remodeling in <span className="gwch-gold">Westport, CT</span>
            </h1>
            <p className="gwch-hero-sub">
              Home remodeling in Westport, CT including kitchens, bathrooms, basements, and additions. Licensed Fairfield County contractor serving Westport homeowners from our Orange office.
            </p>
            <div className="mt-8 flex flex-col items-center gap-[14px] sm:flex-row sm:justify-center">
              <a href="#contact" className="w-[280px] rounded-[8px] border border-[#BC9155] bg-[#BC9155] px-8 py-[14px] text-center text-[15px] font-semibold text-white transition-[background,border-color,transform,box-shadow] duration-300 hover:-translate-y-[2px] hover:border-[#D4A95A] hover:bg-[#D4A95A] hover:shadow-[0_8px_24px_rgba(188,145,85,0.4)]">
                Get Your Free Estimate
              </a>
              <a href="tel:2039199616" className="w-[280px] rounded-[8px] border border-white/[0.22] bg-[rgba(10,18,35,0.42)] px-8 py-[14px] text-center backdrop-blur-[12px] transition-[background,border-color,transform,box-shadow] duration-300 hover:-translate-y-[2px] hover:border-white/[0.35] hover:bg-[rgba(10,18,35,0.62)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.3)]">
                <span className="text-[15px] font-semibold tracking-[0.1px] text-white">Fairfield: (203) 919-9616</span>
              </a>
            </div>
          </div>
        </section>

        {/* ── 2. TRUST BAR ──────────────────────────────────────────── */}
        <section className="gwch-trust-bar">
          <div className="gwch-trust-bar-inner">
            {[
              { value: '15+', label: 'Years of Experience' },
              { value: '100+', label: 'Completed Projects' },
              { value: '4.9', label: 'Google Rating' },
              { icon: true, label: 'Fully Bonded and Insured' },
            ].map((item, i) => (
              <div key={i} className="gwch-trust-item">
                <div className="gwch-trust-val">
                  {item.icon ? (
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                  ) : (
                    item.value
                  )}
                </div>
                <div className="gwch-trust-lbl">{item.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── 3. INTRO + INLINE CTA ────────────────────────────────── */}
        <section className="gwch-intro-section">
          <div className="gwch-intro-inner">
            <FadeUp>
              <div className="gwch-intro-header">
                <SectionLabel text="Westport Remodeling" />
                <h2 className="gwch-h2">
                  Professional Home Remodeling in <strong>Westport, CT</strong>
                </h2>
              </div>
              <p className="gwch-intro-body">
                Home remodeling in Westport, CT typically costs $40,000 to $250,000 or more depending on scope and service. Westport's housing stock is predominantly 1950s through 1970s colonials and Cape Cods, not the antique New England homes many expect, and the town's flood zone regulations, ledge rock terrain, and strict permitting environment make contractor selection one of the most consequential decisions you will make. We serve Westport as part of our{' '}
                <Link href="/fairfield-county/" className="gwch-inline-link">Fairfield County Service Area Team</Link>.
              </p>
            </FadeUp>

            <FadeUp delay={100}>
              <div style={{ marginTop: 36, padding: 28, background: 'rgba(188,145,85,0.06)', borderRadius: 10, textAlign: 'center' }}>
                <p style={{ fontSize: 17, fontWeight: 600, color: '#1E2B43', margin: '0 0 8px' }}>Ready to discuss your Westport renovation?</p>
                <p style={{ fontSize: 14, color: '#5C677D', margin: '0 0 16px' }}>In-home visit or remote via Google Meet or Zoom. No obligation.</p>
                <Link href="#contact" className="gwch-cta-btn gwch-cta-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 32px', fontSize: 15 }}>Get Your Free Estimate</Link>
                <p style={{ fontSize: 13, color: '#5C677D', margin: '12px 0 0' }}>Or call Fairfield County: <a href="tel:2039199616" className="gwch-inline-link">(203) 919-9616</a></p>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* ── 4. HOUSING STOCK BANNER ───────────────────────────────── */}
        <section className="gwch-housing-banner gwch-housing-banner-westport">
          <div className="gwch-housing-bg gwch-housing-bg-westport" />
          <div className="gwch-housing-gradient" />
          <div className="gwch-housing-inner">
            <FadeUp>
              <SectionLabel text="Housing Stock" dark />
              <h2 className="gwch-h2 gwch-text-white">
                Westport Homes: What the Housing Stock <strong>Actually Looks Like</strong>
              </h2>
              <p className="gwch-housing-body">
                The median construction year for a Westport home is 1967, which means most of what we work on was built during the postwar suburbanization wave of the 1950s through the 1970s. The pre-war New England colonials that Westport's reputation sometimes suggests represent roughly 18 to 19 percent of the housing stock.
              </p>
            </FadeUp>
          </div>
        </section>

        {/* ── 5. ALTERNATING IMAGE-TEXT BLOCKS ─────────────────────── */}
        <section className="gwch-alt-section">
          <div className="gwch-alt-container">

            {/* Block 1 – img left */}
            <FadeUp>
              <div className="gwch-alt-block">
                <div className="gwch-alt-img">
                  <img src="/images/areas/westport-ct-colonial-home.jpg" alt="Postwar Cape Cod style home in Westport CT typical of 1940s-1970s housing stock" />
                </div>
                <div className="gwch-alt-content">
                  <h3 className="gwch-h3">Postwar Colonials, Cape Cods, and Ranches</h3>
                  <p className="gwch-body-text">
                    The dominant housing types in Westport are Colonial Revivals, Cape Cods, and ranch homes. The largest single cohort, approximately 35 percent of all homes, was built between 1940 and 1969. These homes share a common set of renovation challenges: electrical panels that were undersized for modern loads even when installed, plumbing systems that have never been touched, and mechanical infrastructure that was designed for a way of life that no longer matches how families actually use a home.
                  </p>
                  <p className="gwch-body-text">
                    They also have bones. The framing is solid, the lots are established, and the neighborhood character is exactly what draws buyers to Westport in the first place.
                  </p>
                </div>
              </div>
            </FadeUp>

            {/* Block 2 – text left */}
            <FadeUp delay={60}>
              <div className="gwch-alt-block">
                <div className="gwch-alt-content">
                  <h3 className="gwch-h3">Flood Zones and Coastal Rebuilding</h3>
                  <p className="gwch-body-text">
                    Approximately 26 percent of Westport residents live within the 100-year floodplain. FEMA flood zone AE and VE designations apply to a significant number of waterfront parcels in Compo and Saugatuck. If your renovation cost exceeds 50 percent of the pre-improvement market value of the structure, the entire project must meet current flood zone compliance requirements, including elevation to or above Base Flood Elevation.
                  </p>
                  <p className="gwch-body-text">
                    Newer construction (roughly 23 percent of the housing stock built since 2000) reflects an active teardown and rebuild culture in coastal and near-coastal neighborhoods, where land values far exceed the value of the structure.
                  </p>
                </div>
                <div className="gwch-alt-img">
                  <img src="/images/areas/westport-ct-coastal-waterfront.jpg" alt="Waterfront homes along the Saugatuck River in Westport CT flood zone" />
                </div>
              </div>
            </FadeUp>

            {/* Block 3 – img left */}
            <FadeUp delay={120}>
              <div className="gwch-alt-block">
                <div className="gwch-alt-img">
                  <img src="/images/areas/westport-ct-rock-ledge.jpg" alt="Rock ledge excavation for residential construction similar to Westport CT inland geology" />
                </div>
                <div className="gwch-alt-content">
                  <h3 className="gwch-h3">Ledge Rock and Inland Geology</h3>
                  <p className="gwch-body-text">
                    Westport's inland geology presents a separate challenge. Ledge rock sits close to grade throughout much of Coleytown and parts of Long Lots and Old Hill. That matters for any project that breaks ground: pools, basement additions, utility trenching, and new footings can all encounter solid ledge, which requires blasting or pneumatic hammer excavation.
                  </p>
                  <p className="gwch-body-text">
                    Understanding what type of home you have, when it was built, and where it sits in Westport tells us most of what we need to know before we ever arrive on-site.
                  </p>
                </div>
              </div>
            </FadeUp>

          </div>
        </section>

        {/* ── 6. NEIGHBORHOODS ──────────────────────────────────────── */}
        <section className="gwch-neighborhoods-section">
          <div className="gwch-section-inner">
            <FadeUp>
              <div className="gwch-section-header">
                <SectionLabel text="Neighborhoods" />
                <h2 className="gwch-h2">
                  Westport Neighborhoods and What They Mean for <strong>Your Remodeling Project</strong>
                </h2>
                <p className="gwch-section-subtitle">
                  Westport's neighborhoods each carry distinct construction realities. Where your home sits shapes the scope, the permitting process, and the contingencies that belong in any realistic project plan.
                </p>
              </div>
            </FadeUp>
            <div className="gwch-neighborhoods-grid">
              {neighborhoods.map((n, i) => (
                <FadeUp key={n.name} delay={i * 40}>
                  <details className="gwch-neighborhood-card">
                    <summary className="gwch-neighborhood-summary">
                      <span>{n.name}</span>
                      <span className="gwch-summary-icon">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <line x1="12" y1="5" x2="12" y2="19" />
                          <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                      </span>
                    </summary>
                    <p className="gwch-neighborhood-body">{n.body}</p>
                  </details>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* ── 7. PERMITTING ──────────────────────────────────────────── */}
        <section className="gwch-permitting-section">
          <div className="gwch-section-inner gwch-section-narrow">
            <FadeUp>
              <div className="gwch-section-header">
                <SectionLabel text="Permits and Approvals" />
                <h2 className="gwch-h2">
                  Permits, Flood Zones, and Local Approvals in <strong>Westport, CT</strong>
                </h2>
              </div>
              <p className="gwch-body-text">
                Nearly all remodeling work in Westport requires a building permit, including moving interior walls, replacing windows, and finishing basement space. The town's code lists only what does not require a permit, not what does, making it more restrictive by default than most surrounding municipalities.
              </p>
              <p className="gwch-body-text">
                The permit fee is $10 per $1,000 of project budget, assessed at the time of application. That is predictable, but it means a $150,000 kitchen project carries a $1,500 permit fee before any inspections begin. We pull all required permits as part of every project. It is not a line item we skip.
              </p>
              <h3 className="gwch-h3" style={{ marginTop: 32 }}>Historic District Commission</h3>
              <p className="gwch-body-text">
                Westport maintains a Local Historic District. If your home falls within it, full HDC approval is required before any exterior changes: windows, doors, skylights, gutters, porches, walkways, siding materials. The HDC meets on the second Tuesday of each month, with a 12-business-day submission deadline before each meeting. For properties subject to HDC review, we build that timeline into the project schedule and strongly recommend a pre-application meeting before submitting. Skipping it adds risk of revision requests that delay the project.
              </p>
              <h3 className="gwch-h3" style={{ marginTop: 32 }}>Flood Zone Rules</h3>
              <p className="gwch-body-text">
                Approximately 26 percent of Westport residents live within the 100-year floodplain. In AE flood zones, which cover most of Westport's developed flood-prone areas, the lowest floor of any new or substantially improved residential structure must be elevated to or above Base Flood Elevation. The "substantially improved" threshold is the one that surprises homeowners most: if your renovation cost exceeds 50 percent of the pre-improvement market value of the structure, your project is classified as a substantial improvement and must comply with full elevation requirements. On a 1,200-square-foot beach cottage with a low assessed structure value, a $60,000 renovation can cross that line. We check flood map status for every Westport project before we write a proposal.
              </p>
              <h3 className="gwch-h3" style={{ marginTop: 32 }}>CT DEEP Coastal Permits</h3>
              <p className="gwch-body-text">
                Properties in Compo, Saugatuck Shores, and Greens Farms waterfront areas sit within Connecticut's Coastal Area Management jurisdiction. The CT DEEP Coastal Area Management permit, required under the CT Coastal Management Act, adds a state-level review layer on top of local zoning and building permits for any construction within the coastal boundary. We account for that review timeline in the project schedule.
              </p>
              <p className="gwch-body-text">
                Understanding this environment is part of what makes contractor selection matter in Westport. The permitting process here is multi-layered, and experience navigating it is the difference between a project that proceeds smoothly and one that gets stuck waiting on approvals for months.
              </p>
            </FadeUp>
          </div>
        </section>

        {/* ── 8. COSTS ───────────────────────────────────────────────── */}
        <section className="gwch-costs-section" id="costs">
          <div className="gwch-section-inner">
            <FadeUp>
              <div className="gwch-section-header">
                <SectionLabel text="Investment" />
                <h2 className="gwch-h2">
                  What Remodeling Costs in <strong>Westport, CT</strong>
                </h2>
              </div>
              <p className="gwch-body-text">
                Remodeling costs in Westport range from $40,000 for a minor kitchen refresh to $250,000 or more for a fully custom kitchen with structural changes. Bathroom, basement, and flooring projects each carry their own ranges driven by scope, materials, and site-specific conditions.
              </p>
              <p className="gwch-body-text">
                Westport is consistently one of the higher-cost remodeling markets in Connecticut, and understanding why helps set realistic expectations before a project starts.
              </p>
            </FadeUp>

            {/* Kitchen Costs */}
            <FadeUp delay={60}>
              <h3 className="gwch-cost-h3">Kitchen Remodeling Costs in Westport, CT</h3>
              <div className="gwch-cost-table-wrap"><table className="gwch-cost-table">
                <thead>
                  <tr><th>Tier</th><th>Scope</th><th>Typical Range</th></tr>
                </thead>
                <tbody>
                  <tr><td>Minor Refresh</td><td>Countertops, appliances, cabinet fronts</td><td className="gwch-td-price">$40,000 – $80,000</td></tr>
                  <tr><td>Mid-Range Gut</td><td>New cabinets, counters, flooring, appliances</td><td className="gwch-td-price">$80,000 – $140,000</td></tr>
                  <tr><td>High-End</td><td>Custom cabinetry, structural changes, imported stone</td><td className="gwch-td-price">$140,000 – $250,000+</td></tr>
                </tbody>
              </table></div>
              <p className="gwch-cost-note">
                Custom cabinetry alone in this market commonly runs $50,000 to $70,000. Subcontractors who work in this market regularly understand close-tolerance finish work, and their pricing reflects it.
              </p>
            </FadeUp>

            {/* Bathroom Costs */}
            <FadeUp delay={80}>
              <h3 className="gwch-cost-h3">Bathroom Remodeling Costs in Westport, CT</h3>
              <div className="gwch-cost-table-wrap"><table className="gwch-cost-table">
                <thead>
                  <tr><th>Tier</th><th>Scope</th><th>Typical Range</th></tr>
                </thead>
                <tbody>
                  <tr><td>Hall Bath Update</td><td>New vanity, toilet, tile, fixtures</td><td className="gwch-td-price">$25,000 – $45,000</td></tr>
                  <tr><td>Primary Suite Gut</td><td>Full gut, walk-in shower, double vanity</td><td className="gwch-td-price">$45,000 – $65,000</td></tr>
                  <tr><td>Full Custom Primary</td><td>Walk-in shower, heated floors, specialty tile</td><td className="gwch-td-price">$80,000 – $120,000+</td></tr>
                </tbody>
              </table></div>
            </FadeUp>

            {/* Basement Costs */}
            <FadeUp delay={100}>
              <h3 className="gwch-cost-h3">Basement Finishing Costs in Westport, CT</h3>
              <p className="gwch-body-text">
                For homes in or near flood zones, we address drainage and moisture management before framing begins. That work adds to overall project cost but is not optional if you want a finished basement that holds up.
              </p>
              <div className="gwch-cost-table-wrap"><table className="gwch-cost-table">
                <thead>
                  <tr><th>Tier</th><th>Scope</th><th>Typical Range</th></tr>
                </thead>
                <tbody>
                  <tr><td>Basic</td><td>Framing, drywall, basic flooring, lighting</td><td className="gwch-td-price">$25,000 – $45,000</td></tr>
                  <tr><td>Mid-Range</td><td>Multiple rooms, upgraded flooring, bathroom rough-in</td><td className="gwch-td-price">$45,000 – $70,000</td></tr>
                  <tr><td>High-End</td><td>Full bathroom, wet bar, custom built-ins</td><td className="gwch-td-price">$70,000 – $100,000+</td></tr>
                </tbody>
              </table></div>
            </FadeUp>

            {/* Flooring Costs */}
            <FadeUp delay={120}>
              <h3 className="gwch-cost-h3">Flooring Costs in Westport, CT</h3>
              <p className="gwch-body-text">
                Many 1960s Westport colonials have original hardwood floors under carpet or vinyl that are worth refinishing. We assess what is there and give you a straight answer on whether to refinish or replace.
              </p>
              <div className="gwch-cost-table-wrap"><table className="gwch-cost-table">
                <thead>
                  <tr><th>Material</th><th>Best For</th><th>Installed Cost/sq ft</th></tr>
                </thead>
                <tbody>
                  <tr><td>Solid Hardwood</td><td>Living rooms, dining rooms, bedrooms</td><td className="gwch-td-price">$12 – $25</td></tr>
                  <tr><td>Engineered Hardwood</td><td>Basements, moisture-prone areas</td><td className="gwch-td-price">$8 – $18</td></tr>
                  <tr><td>Luxury Vinyl Plank</td><td>Basements, kitchens, high-traffic</td><td className="gwch-td-price">$6 – $14</td></tr>
                  <tr><td>Tile</td><td>Bathrooms, kitchens, entryways</td><td className="gwch-td-price">$12 – $25</td></tr>
                  <tr><td>Carpet</td><td>Bedrooms, basement rec rooms</td><td className="gwch-td-price">$4 – $12</td></tr>
                </tbody>
              </table></div>
            </FadeUp>

            {/* Home Additions */}
            <FadeUp delay={140}>
              <h3 className="gwch-cost-h3">Home Additions Costs in Westport, CT</h3>
              <p className="gwch-body-text">
                Westport additions in coastal and flood zone areas may require elevation to Base Flood Elevation, adding to project scope and cost.
              </p>
              <div className="gwch-cost-table-wrap"><table className="gwch-cost-table">
                <thead>
                  <tr><th>Type</th><th>Scope</th><th>Typical Range</th></tr>
                </thead>
                <tbody>
                  <tr><td>Bump-Out</td><td>Single-room expansion, 100–200 sq ft</td><td className="gwch-td-price">$150 – $400/sq ft</td></tr>
                  <tr><td>Single-Story</td><td>Family room, sunroom, or garage conversion</td><td className="gwch-td-price">$150 – $400/sq ft</td></tr>
                  <tr><td>Second-Story</td><td>Full second floor with structural support</td><td className="gwch-td-price">$200 – $400/sq ft</td></tr>
                </tbody>
              </table></div>
            </FadeUp>

            {/* Interior Painting */}
            <FadeUp delay={160}>
              <h3 className="gwch-cost-h3">Interior Painting Costs in Westport, CT</h3>
              <div className="gwch-cost-table-wrap"><table className="gwch-cost-table">
                <thead>
                  <tr><th>Scope</th><th>Details</th><th>Typical Range</th></tr>
                </thead>
                <tbody>
                  <tr><td>Per Square Foot</td><td>Walls, ceilings, trim, proper surface prep</td><td className="gwch-td-price">$3 – $6/sq ft</td></tr>
                  <tr><td>Single Room</td><td>Average bedroom or living room</td><td className="gwch-td-price">$800 – $2,500</td></tr>
                  <tr><td>Whole Home</td><td>Full interior, all rooms, trim, doors</td><td className="gwch-td-price">$8,000 – $25,000+</td></tr>
                </tbody>
              </table></div>
            </FadeUp>

            {/* Interior Carpentry */}
            <FadeUp delay={180}>
              <h3 className="gwch-cost-h3">Interior Carpentry Costs in Westport, CT</h3>
              <p className="gwch-body-text">
                Postwar Westport colonials and Cape Cods often have original trim profiles and built-in cabinetry that homeowners want preserved or matched during renovation. Custom millwork to replicate these details adds both material cost and lead time compared to standard stock profiles.
              </p>
              <div className="gwch-cost-table-wrap"><table className="gwch-cost-table">
                <thead>
                  <tr><th>Scope</th><th>Details</th><th>Typical Range</th></tr>
                </thead>
                <tbody>
                  <tr><td>Hourly Rate</td><td>Custom trim, built-ins, shelving, wainscoting</td><td className="gwch-td-price">$75 – $150/hour</td></tr>
                  <tr><td>Crown Molding</td><td>Per linear foot, installed</td><td className="gwch-td-price">$8 – $25/LF</td></tr>
                  <tr><td>Custom Built-Ins</td><td>Bookcases, window seats, mudroom storage</td><td className="gwch-td-price">$3,000 – $15,000+</td></tr>
                </tbody>
              </table></div>
            </FadeUp>

            {/* Additional Services */}
            <FadeUp delay={200}>
              <h3 className="gwch-cost-h3">Additional Service Costs in Westport, CT</h3>
              <div className="gwch-cost-table-wrap"><table className="gwch-cost-table">
                <thead>
                  <tr><th>Service</th><th>Details</th><th>Typical Range</th></tr>
                </thead>
                <tbody>
                  <tr><td>Attic Conversions</td><td>Framing, insulation, electrical, flooring, egress</td><td className="gwch-td-price">$50,000 – $150,000</td></tr>
                  <tr><td>Decks and Porches</td><td>Wood, composite, or PVC with railings and permits</td><td className="gwch-td-price">$15,000 – $75,000</td></tr>
                  <tr><td>Design and Planning</td><td>Layout, material selection, 3D rendering, permit drawings</td><td className="gwch-td-price">$2,500 – $15,000</td></tr>
                  <tr><td>Comfort and Accessibility</td><td>Grab bars, walk-in showers, widened doorways, ramps</td><td className="gwch-td-price">$5,000 – $50,000</td></tr>
                  <tr><td>Insurance Reconstruction</td><td>Fire, water, storm damage rebuilds with carrier coordination</td><td className="gwch-td-price">$25,000 – $250,000+</td></tr>
                </tbody>
              </table></div>
              <p className="gwch-cost-note">
                Westport's permit fee is $10 per $1,000 of renovation budget. Flood zone compliance, when it applies, adds engineering and material costs. Ledge rock in Coleytown and other interior neighborhoods creates excavation contingencies that less experienced contractors either miss or do not disclose.
              </p>
            </FadeUp>

          </div>
        </section>

        {/* ── 9. SERVICES ─────────────────────────────────────────────── */}
        <section className="gwch-services-section">
          <div className="gwch-section-inner">
            <FadeUp>
              <div className="gwch-section-header">
                <SectionLabel text="Our Services" />
                <h2 className="gwch-h2">
                  Our Remodeling Services in <strong>Westport, CT</strong>
                </h2>
                <p className="gwch-section-subtitle">
                  BuiltWell CT provides a full range of remodeling services in Westport including kitchen renovation, bathroom remodeling, basement finishing, flooring, home additions, interior painting, carpentry, attic conversions, decks, design, and accessibility modifications, all permitted and backed by CT HIC License #0668405. Westport's 1940s-1970s colonials, coastal properties, and flood zone considerations shape how we approach every project.
                </p>
              </div>
            </FadeUp>

            <div className="gwch-services-grid">
              {primaryServices.map((svc, i) => (
                <FadeUp key={svc.title} delay={i * 40}>
                  <article className="gwch-service-card">
                    <div className="gwch-service-img">
                      <img src={svc.img} alt={svc.title} />
                    </div>
                    <div className="gwch-service-body">
                      <h3 className="gwch-service-title">
                        <Link href={svc.href}>{svc.title}</Link>
                      </h3>
                      <p className="gwch-service-desc">{svc.desc}</p>
                      <div className="gwch-service-badges">
                        <span className="gwch-badge"><svg viewBox="0 0 24 24"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" /></svg>{svc.price}</span>
                        <span className="gwch-badge"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>{svc.time}</span>
                      </div>
                      <Link href={svc.href} className="gwch-learn-more">
                        Get Started
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </article>
                </FadeUp>
              ))}
            </div>

            <div className={`gwch-services-more${servicesOpen ? ' show' : ''}`}>
              <div className="gwch-services-grid">
                {moreServices.map((svc, i) => (
                  <FadeUp key={svc.title} delay={i * 40}>
                    <article className="gwch-service-card">
                      <div className="gwch-service-img">
                        <img src={svc.img} alt={svc.title} />
                      </div>
                      <div className="gwch-service-body">
                        <h3 className="gwch-service-title">
                          <Link href={svc.href}>{svc.title}</Link>
                        </h3>
                        <p className="gwch-service-desc">{svc.desc}</p>
                        <div className="gwch-service-badges">
                          <span className="gwch-badge">{svc.price}</span>
                          <span className="gwch-badge">{svc.time}</span>
                        </div>
                        <Link href={svc.href} className="gwch-learn-more">
                          Get Started
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                          </svg>
                        </Link>
                      </div>
                    </article>
                  </FadeUp>
                ))}
              </div>
            </div>

            <div className="gwch-services-toggle-wrap">
              <button
                type="button"
                className="gwch-services-toggle"
                onClick={() => setServicesOpen((v) => !v)}
              >
                {servicesOpen ? 'Show Less' : 'Show 6 More Services'}
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  style={{ transform: servicesOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }}
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
            </div>
          </div>
        </section>

        {/* ── 10. MID-PAGE CTA ──────────────────────────────────────── */}
        <div style={{ position: 'relative', overflow: 'hidden', padding: '64px 0' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #1E2B43 0%, #151E30 100%)' }} />
          <div style={{ position: 'absolute', inset: 0, backgroundImage: "url('/portfolio/builtwell-contractor-client-consultation-ct.jpeg')", backgroundPosition: 'center 15%', backgroundSize: 'cover', opacity: 0.25 }} />
          <div style={{ position: 'relative', zIndex: 1, maxWidth: 700, margin: '0 auto', textAlign: 'center', padding: '0 32px' }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px, 3.5vw, 40px)', color: '#fff', marginBottom: 12 }}>
              Ready to Remodel in <span style={{ color: '#BC9155' }}>Westport</span>?
            </h2>
            <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.7)', marginBottom: 28 }}>From Compo Beach colonials to Greens Farms estates — Westport remodeling that respects the character of your home.</p>
            <Link href="#contact" className="gwch-mid-cta-btn">Get Your Free Estimate</Link>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', marginTop: 16, fontStyle: 'italic' }}>On-site or remote via Google Meet. No charge, no obligation.</p>
          </div>
        </div>

        {/* ── 11. WHAT TO EXPECT ──────────────────────────────────────── */}
        <section className="gwch-expect-section">
          <div className="gwch-section-inner gwch-section-narrow">
            <FadeUp>
              <div className="gwch-section-header">
                <SectionLabel text="Working With Us" />
                <h2 className="gwch-h2">
                  What to Expect <strong>Working With BuiltWell</strong>
                </h2>
              </div>
              <p className="gwch-body-text">
                We handle all Westport permits, flood zone assessments, inspection scheduling, and subcontractor coordination under CT HIC License #0668405, with daily progress updates and a five-step process covering consultation through final walkthrough. We carry full liability insurance and workers' compensation, and we do not start a project until permits are pulled and the scope is in writing with a clear timeline attached.
              </p>
              <p className="gwch-body-text">
                Our five-step process covers every project regardless of scale: Consultation, Planning, Selections, Build, and Walkthrough. You can read through the full process at <Link href="/process/" className="gwch-inline-link">/process/</Link>. In practice, what this means for a Westport project is that the planning phase accounts for flood zone assessment, HDC review where applicable, and any ledge contingency work that needs to happen before the main renovation can proceed. The schedule you see in your proposal is the schedule we intend to hit.
              </p>
              <p className="gwch-body-text">
                During active construction, you receive daily updates on progress and a clean job site at the end of every workday. If something unexpected turns up inside a wall, and in 1960s Westport homes something unexpected turns up regularly, you hear from us that day with an explanation of what we found and your options before we proceed.
              </p>
              <p className="gwch-body-text">
                Westport projects are served by our <Link href="/fairfield-county/" className="gwch-inline-link">Fairfield County Service Area Team</Link>. For county-level context on the full scope of what we do in this market, visit <Link href="/fairfield-county/" className="gwch-inline-link">/fairfield-county/</Link>.
              </p>
            </FadeUp>
          </div>
        </section>

        {/* ── 12. FAQ ─────────────────────────────────────────────────── */}
        <section className="gwch-faq-section">
          <div className="gwch-section-inner gwch-section-narrow">
            <FadeUp>
              <div className="gwch-section-header">
                <SectionLabel text="Common Questions" />
                <h2 className="gwch-h2">
                  Frequently Asked Questions: <strong>Westport Remodeling</strong>
                </h2>
                <p className="gwch-section-subtitle">
                  Westport homeowners most commonly ask about permit requirements, remodeling costs, flood zone impact, project timelines, and what makes renovation in 1960s colonials different from newer construction.
                </p>
              </div>
            </FadeUp>
            <div className="gwch-faq-list">
              {faqItems.map((item, i) => (
                <FadeUp key={i} delay={i * 40}>
                  <details className="gwch-faq-item">
                    <summary className="gwch-faq-summary">
                      <span>{item.q}</span>
                      <span className="gwch-faq-icon">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </span>
                    </summary>
                    <p className="gwch-faq-answer">{item.a}</p>
                  </details>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* ── 13. NEARBY AREAS ────────────────────────────────────────── */}
        <div className="gwch-areas-center">
          <SharedAreasSection data={{
            eyebrow: "Nearby Towns",
            title: "Fairfield County Towns We Also Serve",
            highlight_text: "We Also Serve",
            subtitle: "Beyond Westport, we serve homeowners throughout Fairfield County. Our team handles remodeling projects in Darien, Fairfield, Norwalk, Ridgefield, New Canaan, Stamford, and Greenwich, as well as additional towns across the county.",
            counties: [{
              name: "Fairfield County",
              phone: "(203) 919-9616",
              image: "/images/areas/fairfield-county.jpg",
              description: "Served by our Fairfield County Service Area Team. We cover every town in the county with dedicated local crews who know the housing stock and building departments.",
              towns: primaryTowns.map((t) => t.name),
              extra_towns: moreTowns,
              town_links: Object.fromEntries(primaryTowns.filter((t) => t.href).map((t) => [t.name, t.href as string])),
              url: "/fairfield-county/",
              cta_label: "Learn more about Fairfield County",
            }],
          }} />
        </div>

        {/* ── 14. TRUST STRIP ─────────────────────────────────────────── */}
        <section className="gwch-trust-strip">
          <div className="gwch-trust-strip-bg" />
          <div className="gwch-trust-strip-inner">
            {[
              {
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ),
                label: 'Google Rating',
                value: '4.9',
                url: 'https://www.google.com/maps/place/BuiltWell',
              },
              {
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                ),
                label: 'Trusted on',
                value: 'Houzz',
                url: 'https://www.houzz.com/professionals/general-contractors/builtwell-ct-pfvwus-pf~820498730',
              },
              {
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                ),
                label: 'CT HIC License',
                value: '#0668405',
                url: 'https://www.elicense.ct.gov/Lookup/LicenseLookup.aspx',
              },
              {
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                ),
                label: 'Verified on',
                value: 'Angi',
                url: 'https://www.angi.com/companylist/us/ct/fairfield/builtwell-ct-reviews-10768',
              },
            ].map((item, i, arr) => (
              <div key={i} className="gwch-trust-strip-item-wrap">
                <a href={item.url} target="_blank" rel="noopener noreferrer" className="gwch-trust-strip-item">
                  <span className="gwch-trust-strip-icon">{item.icon}</span>
                  <span className="gwch-trust-strip-text">
                    <span className="gwch-trust-strip-label">{item.label}</span>
                    <span className="gwch-trust-strip-value">{item.value}</span>
                  </span>
                </a>
                {i < arr.length - 1 && <div className="gwch-trust-divider" />}
              </div>
            ))}
          </div>
        </section>

        {/* ── 15. CTA FORM ────────────────────────────────────────────── */}
        <SharedLeadFormSection page={_page} data={{
          eyebrow: "Get Started",
          title: "Schedule Your Free Consultation",
          title_highlight: "Consultation",
          subtitle: "On-site or remote (Google Meet or Zoom). Call (203) 919-9616 or fill out the form below.",
          subtitle2: "We will confirm your appointment details and the name of your team member within one business day.",
          images: [
            { src: "/team/builtwell-owner-handshake-client-ct-02.jpg", alt: "BuiltWell CT meeting with a Westport homeowner for a remodeling consultation" },
            { src: "/portfolio/builtwell-job-site-aerial-ct.jpg", alt: "BuiltWell CT owner meeting homeowner for a free consultation" },
          ],
          fields: [
            { name: "full_name", label: "Name", type: "text", required: true, placeholder: "Full Name" },
            { name: "phone", label: "Phone", type: "tel", required: true, placeholder: "(203) 000-0000" },
            { name: "email", label: "Email", type: "email", required: true, placeholder: "you@email.com" },
            { name: "zip", label: "Zip Code", type: "text", required: true, placeholder: "06880" },
            { name: "services_needed", label: "Services Needed", type: "checkbox_group", required: true, options: [
              { label: "Kitchen Remodeling", value: "Kitchen Remodeling" },
              { label: "Bathroom Remodeling", value: "Bathroom Remodeling" },
              { label: "Basement Finishing", value: "Basement Finishing" },
              { label: "Flooring", value: "Flooring" },
              { label: "Interior Painting", value: "Interior Painting" },
              { label: "Exterior Painting", value: "Exterior Painting" },
              { label: "Roofing", value: "Roofing" },
              { label: "Siding", value: "Siding" },
              { label: "Windows & Doors", value: "Windows & Doors" },
              { label: "Decks & Patios", value: "Decks & Patios" },
              { label: "Additions", value: "Additions" },
              { label: "Other", value: "Other" },
            ]},
            { name: "best_time", label: "Best Time to Contact", type: "select", required: true, options: [
              { label: "Morning (8am - 12pm)", value: "Morning (8am - 12pm)" },
              { label: "Afternoon (12pm - 4pm)", value: "Afternoon (12pm - 4pm)" },
              { label: "Evening (4pm - 6pm)", value: "Evening (4pm - 6pm)" },
              { label: "Anytime", value: "Anytime" },
            ]},
            { name: "contact_method", label: "Preferred Contact Method", type: "radio_group", required: true, options: [
              { label: "Call", value: "call" },
              { label: "Text", value: "text" },
              { label: "Email", value: "email" },
            ]},
            { name: "project_details", label: "Tell Us About Your Project", type: "textarea", required: false, placeholder: "Describe your project..." },
            { name: "photos", label: "Upload Photos", type: "file", required: false },
          ],
          submit_label: "Get Your Free Estimate",
          consent_text: "We respond within 24 hours. No spam, no obligation.",
        }} accent="Consultation" />

        {/* ── 16. FINANCING STRIP ─────────────────────────────────────── */}
        <SharedFinancingStrip data={{ title: "Flexible Financing Available", content: "Get approved in about 60 seconds and start your project today.", cta: { url: "/financing/", label: "Check Financing Options" } }} />

      </main>

      <style jsx global>{`
        /* ── Variables ── */
        :root {
          --gwch-gold: #bc9155;
          --gwch-gold-dark: #a57d48;
          --gwch-gold-light: #d4a95a;
          --gwch-navy: #1e2b43;
          --gwch-oxford: #151e30;
          --gwch-muted: #5c677d;
          --gwch-cream: #f5f1e9;
          --gwch-border: rgba(30,43,67,0.09);
        }
        .gwch-page { background: #fff; color: var(--gwch-navy); font-family: "Inter", sans-serif; }
        .gwch-label { display: inline-flex; align-items: center; gap: 8px; font-size: 11px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: #9a7340; margin-bottom: 12px; }
        .gwch-label-dark { color: #c89b5b; }
        .gwch-label-line { display: inline-block; width: 10px; height: 2px; background: var(--gwch-gold); }
        .gwch-label-dark .gwch-label-line { background: #c89b5b; }
        .gwch-h2 { font-family: "Playfair Display", serif; font-size: clamp(28px, 3.5vw, 44px); font-weight: 700; line-height: 1.2; letter-spacing: -0.5px; color: var(--gwch-navy); margin: 0 0 20px; }
        .gwch-h2 strong { font-weight: 700; color: var(--gwch-gold); font-style: normal; }
        .gwch-text-white { color: #fff !important; }
        .gwch-text-white strong { color: var(--gwch-gold-light) !important; }
        .gwch-h3 { font-family: "Playfair Display", serif; font-size: 22px; font-weight: 700; line-height: 1.25; color: var(--gwch-navy); margin: 0 0 14px; }
        .gwch-h3 strong { color: var(--gwch-gold); }
        .gwch-body-text { font-size: 16px; line-height: 1.85; color: var(--gwch-muted); margin: 0 0 16px; }
        .gwch-section-header { text-align: center; margin-bottom: 64px; }
        .gwch-section-header .gwch-h2 { margin-bottom: 16px; }
        .gwch-section-subtitle { font-size: 17px; line-height: 1.75; color: var(--gwch-muted); max-width: 700px; margin: 0 auto; }
        .gwch-section-inner { max-width: 1240px; margin: 0 auto; padding: 100px 40px; }
        .gwch-section-narrow { max-width: 820px; }
        @media (max-width: 768px) { .gwch-section-inner { padding: 72px 20px; } .gwch-section-header { margin-bottom: 48px; } }

        /* ── HERO ── */
        .gwch-page-hero { position: relative; isolation: isolate; overflow: hidden; background: var(--gwch-oxford); padding: 0 40px 48px; padding-top: 120px; color: #fff; min-height: 50vh; display: flex; align-items: stretch; }
        .gwch-hero-bg { position: absolute; inset: 0; background-image: url('/images/areas/greenwich-ct-avenue.jpg'); background-size: cover; background-position: center 30%; opacity: 0.72; z-index: -2; }
        .gwch-hero-bg-westport { background-image: url('/images/areas/westport-ct-downtown.jpg') !important; background-position: center 40% !important; }
        .gwch-hero-gradient { position: absolute; inset: 0; background: radial-gradient(ellipse at 97% 97%, rgba(21,30,48,1) 0%, rgba(21,30,48,0.9) 8%, transparent 30%), radial-gradient(ellipse at 3% 97%, rgba(21,30,48,0.9) 0%, transparent 25%), linear-gradient(180deg, rgba(21,30,48,0.35) 0%, rgba(21,30,48,0.2) 30%, rgba(21,30,48,0.45) 65%, rgba(21,30,48,0.92) 100%); z-index: -1; }
        .gwch-hero-inner { position: relative; max-width: 1240px; margin: 0 auto; width: 100%; display: flex; flex-direction: column; align-items: center; text-align: center; justify-content: center; }
        .gwch-breadcrumb { list-style: none; margin: 0 0 20px; padding: 0; display: flex; flex-wrap: wrap; align-items: center; gap: 0; font-size: 13px; font-weight: 500; color: rgba(255,255,255,0.92); text-shadow: 0 1px 6px rgba(0,0,0,0.7); }
        .gwch-breadcrumb li { display: flex; align-items: center; }
        .gwch-bc-sep { color: var(--gwch-gold); margin: 0 10px; font-size: 14px; line-height: 1; user-select: none; }
        .gwch-breadcrumb a { color: rgba(255,255,255,0.85); text-decoration: none; transition: color 0.2s; }
        .gwch-breadcrumb a:hover { color: var(--gwch-gold); }
        .gwch-bc-current { color: #fff; font-weight: 600; }
        .gwch-hero-h1 { font-family: "Playfair Display", serif; font-size: clamp(40px, 4.5vw, 56px); font-weight: 700; line-height: 1.08; letter-spacing: -0.5px; color: #fff; max-width: 920px; margin: 0 0 12px; text-shadow: 0 2px 20px rgba(0,0,0,0.5); }
        .gwch-gold { color: var(--gwch-gold); }
        .gwch-hero-sub { max-width: 560px; font-size: 17px; line-height: 1.7; color: rgba(255,255,255,0.82); margin: 16px auto 0; font-family: "Inter", sans-serif; font-weight: 400; }
        .gwch-hero-ctas { display: flex; flex-wrap: wrap; gap: 16px; margin-top: 32px; justify-content: center; }
        .gwch-cta-btn { display: inline-flex; align-items: center; justify-content: center; padding: 15px 32px; border-radius: 8px; background: rgba(10,18,35,0.42); border: 1px solid rgba(255,255,255,0.18); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); color: #fff; text-decoration: none; text-align: center; font-size: 15px; font-weight: 600; transition: background 0.3s, border-color 0.3s, transform 0.3s, box-shadow 0.3s; }
        .gwch-cta-btn:hover { background: rgba(10,18,35,0.62); border-color: rgba(255,255,255,0.28); transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.3), 0 0 0 1px rgba(188,145,85,0.2); }
        .gwch-cta-btn.gwch-cta-primary { background: var(--gwch-gold); border: 1px solid var(--gwch-gold); color: #fff; backdrop-filter: none; }
        .gwch-cta-btn.gwch-cta-primary:hover { background: #d4a95a; border-color: #d4a95a; box-shadow: 0 8px 24px rgba(188,145,85,0.4); }
        @media (max-width: 768px) { .gwch-page-hero { padding: 88px 20px 36px; min-height: 40vh; max-height: none; } .gwch-hero-h1 { font-size: clamp(30px, 7vw, 42px); } .gwch-hero-sub { font-size: 15px; } .gwch-hero-ctas { flex-direction: column; align-items: stretch; } .gwch-cta-btn { min-height: 48px; } .gwch-breadcrumb { font-size: 12px; } }

        /* ── TRUST BAR ── */
        .gwch-trust-bar { border-top: 1px solid rgba(188,145,85,0.2); border-bottom: 1px solid rgba(188,145,85,0.2); background: linear-gradient(135deg, #1e2b43 0%, #151e30 100%); }
        .gwch-trust-bar-inner { max-width: 1280px; margin: 0 auto; display: grid; grid-template-columns: repeat(2, 1fr); }
        @media (min-width: 1024px) { .gwch-trust-bar-inner { grid-template-columns: repeat(4, 1fr); } }
        .gwch-trust-item { padding: 36px 20px; text-align: center; cursor: default; border-right: 1px solid rgba(188,145,85,0.12); transition: background 0.3s, transform 0.3s; }
        .gwch-trust-item:last-child { border-right: none; }
        .gwch-trust-item:hover { background: rgba(188,145,85,0.08); transform: translateY(-3px); }
        .gwch-trust-val { font-family: "Playfair Display", serif; font-size: 42px; font-weight: 700; line-height: 1; color: var(--gwch-gold); min-height: 52px; display: flex; align-items: center; justify-content: center; transition: color 0.3s, text-shadow 0.3s; }
        .gwch-trust-item:hover .gwch-trust-val { color: var(--gwch-gold-light); text-shadow: 0 0 20px rgba(188,145,85,0.3); }
        .gwch-trust-lbl { margin-top: 8px; font-size: 13px; font-weight: 500; letter-spacing: 1px; text-transform: uppercase; color: rgba(255,255,255,0.6); transition: color 0.3s; }
        .gwch-trust-item:hover .gwch-trust-lbl { color: rgba(255,255,255,0.85); }

        /* ── INTRO ── */
        .gwch-intro-section { background: #fff; border-bottom: 1px solid var(--gwch-border); }
        .gwch-intro-inner { max-width: 820px; margin: 0 auto; padding: 80px 40px; }
        @media (max-width: 768px) { .gwch-intro-inner { padding: 60px 20px; } }
        .gwch-intro-header { text-align: center; margin-bottom: 24px; }
        .gwch-intro-body { font-size: 16px; color: var(--gwch-muted); line-height: 1.85; margin-bottom: 0; }
        .gwch-inline-link { color: var(--gwch-gold); text-decoration: none; font-weight: 600; }
        .gwch-inline-link:hover { text-decoration: underline; }

        /* ── HOUSING BANNER ── */
        .gwch-housing-banner { position: relative; overflow: hidden; background: #0d1a2e; padding: 80px 40px; color: #fff; text-align: center; }
        .gwch-housing-bg { position: absolute; inset: 0; background-size: cover; background-position: center; opacity: 0.3; }
        .gwch-housing-bg-westport { background-image: url('/images/areas/westport-ct-saugatuck-river.jpg') !important; background-position: center 40% !important; }
        .gwch-housing-gradient { position: absolute; inset: 0; background: linear-gradient(180deg, rgba(13,26,46,0.6) 0%, rgba(13,26,46,0.4) 40%, rgba(13,26,46,0.7) 100%); }
        .gwch-housing-inner { position: relative; z-index: 1; max-width: 860px; margin: 0 auto; }
        .gwch-housing-body { font-size: 17px; line-height: 1.8; color: rgba(255,255,255,0.82); margin: 0; }

        /* ── ALT BLOCKS ── */
        .gwch-alt-section { background: #fff; padding: 0; }
        .gwch-alt-container { max-width: 1240px; margin: 0 auto; padding: 80px 40px; display: flex; flex-direction: column; gap: 80px; }
        @media (max-width: 768px) { .gwch-alt-container { padding: 60px 20px; gap: 60px; } }
        .gwch-alt-block { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center; }
        @media (max-width: 900px) { .gwch-alt-block { grid-template-columns: 1fr; gap: 32px; } .gwch-alt-block .gwch-alt-content { order: 1; } .gwch-alt-block .gwch-alt-img { order: 0; } }
        .gwch-alt-img { border-radius: 10px; overflow: hidden; aspect-ratio: 4/3; }
        .gwch-alt-img img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .gwch-alt-content .gwch-body-text:last-child { margin-bottom: 0; }

        /* ── NEIGHBORHOODS ── */
        .gwch-neighborhoods-section { background: #fff; }
        .gwch-neighborhoods-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; max-width: 900px; margin: 0 auto; }
        @media (max-width: 768px) { .gwch-neighborhoods-grid { grid-template-columns: 1fr; } }
        .gwch-neighborhood-card { background: #fff; border-radius: 12px; padding: 0; box-shadow: 0 2px 12px rgba(30,43,67,0.06), 0 1px 3px rgba(30,43,67,0.04); border: none; border-bottom: 2px solid transparent; overflow: hidden; transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1); }
        .gwch-neighborhood-card:hover { transform: translateY(-4px); border-bottom-color: var(--gwch-gold); box-shadow: 0 12px 28px rgba(30,43,67,0.1), 0 28px 56px rgba(30,43,67,0.12); }
        .gwch-neighborhood-card[open] { border-bottom-color: var(--gwch-gold); }
        .gwch-neighborhood-summary { display: flex; align-items: center; justify-content: space-between; padding: 24px 28px; font-size: 20px; font-weight: 700; font-family: "Playfair Display", serif; color: var(--gwch-navy); cursor: pointer; list-style: none; user-select: none; transition: background 0.2s; }
        .gwch-neighborhood-summary::-webkit-details-marker { display: none; }
        .gwch-neighborhood-summary:hover { background: rgba(188,145,85,0.04); }
        .gwch-summary-icon { color: var(--gwch-gold); flex-shrink: 0; transition: transform 0.2s; }
        .gwch-neighborhood-card[open] .gwch-summary-icon { transform: rotate(45deg); }
        .gwch-neighborhood-body { padding: 0 28px 24px; font-size: 15px; line-height: 1.75; color: var(--gwch-muted); margin: 0; }

        /* ── PERMITTING ── */
        .gwch-permitting-section { background: var(--gwch-cream); }

        /* ── COSTS ── */
        .gwch-costs-section { background: #fff; }
        .gwch-cost-h3 { font-family: "Playfair Display", serif; font-size: 22px; font-weight: 700; color: var(--gwch-navy); margin: 48px 0 16px; padding-top: 32px; border-top: 1px solid var(--gwch-border); }
        .gwch-cost-h3:first-of-type { border-top: none; padding-top: 0; margin-top: 32px; }
        .gwch-cost-table-wrap { width: 100%; overflow-x: auto; -webkit-overflow-scrolling: touch; }
        .gwch-cost-table { width: 100%; border-collapse: collapse; font-size: 15px; margin-bottom: 0; border-radius: 10px; overflow: hidden; box-shadow: 0 2px 8px rgba(30,43,67,0.06); table-layout: fixed; }
        .gwch-cost-table th { background: var(--gwch-navy); text-align: left; padding: 16px 24px; font-size: 13px; font-weight: 600; letter-spacing: 0.04em; text-transform: uppercase; color: #fff; }
        .gwch-cost-table td { padding: 16px 24px; border-bottom: 1px solid var(--gwch-border); color: var(--gwch-muted); transition: background 0.15s; }
        .gwch-cost-table tbody tr:nth-child(even) td { background: rgba(30,43,67,0.02); }
        .gwch-cost-table tbody tr:hover td { background: rgba(188,145,85,0.06); }
        .gwch-cost-table tr:last-child td { border-bottom: none; }
        .gwch-cost-table td:first-child { font-weight: 600; color: var(--gwch-navy); }
        .gwch-td-price { color: var(--gwch-gold) !important; font-weight: 600; white-space: nowrap; font-family: "Playfair Display", serif; font-size: 16px; }
        .gwch-cost-note { font-size: 14px; line-height: 1.7; color: var(--gwch-muted); background: var(--gwch-cream); border-left: 3px solid var(--gwch-gold); padding: 12px 16px; border-radius: 0 6px 6px 0; margin: 12px 0 0; }
        @media (max-width: 900px) { .gwch-cost-table { min-width: 640px; } }
        @media (max-width: 600px) { .gwch-cost-table { font-size: 13px; } .gwch-cost-table th, .gwch-cost-table td { padding: 10px 12px; } }

        /* ── SERVICES ── */
        .gwch-services-section { background: var(--gwch-cream); }
        .gwch-services-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px; margin-bottom: 24px; }
        @media (max-width: 900px) { .gwch-services-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 600px) { .gwch-services-grid { grid-template-columns: 1fr; } }
        .gwch-services-more { display: none; }
        .gwch-services-more.show { display: block; }
        .gwch-services-toggle-wrap { text-align: center; margin-top: 48px; }
        .gwch-services-toggle { display: inline-flex; align-items: center; gap: 8px; padding: 12px 32px; border: 2px solid var(--gwch-gold); border-radius: 6px; background: transparent; color: var(--gwch-gold); font-size: 14px; font-weight: 600; cursor: pointer; transition: all 0.3s; letter-spacing: 0.3px; }
        .gwch-services-toggle:hover { background: var(--gwch-gold); color: #fff; }
        .gwch-service-card { display: flex; height: 100%; flex-direction: column; background: #fff; border-radius: 8px; overflow: hidden; border-bottom: 2px solid transparent; box-shadow: 0 2px 12px rgba(30,43,67,0.06), 0 1px 3px rgba(30,43,67,0.04); transition: all 0.35s cubic-bezier(0.4,0,0.2,1); }
        .gwch-service-card:hover { transform: translateY(-4px); border-bottom-color: var(--gwch-gold); box-shadow: 0 12px 28px rgba(30,43,67,0.1), 0 28px 56px rgba(30,43,67,0.12); }
        .gwch-service-img { height: 180px; overflow: hidden; }
        .gwch-service-img img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease; }
        .gwch-service-card:hover .gwch-service-img img { transform: scale(1.05); }
        .gwch-service-body { flex: 1; display: flex; flex-direction: column; align-items: center; text-align: center; padding: 28px 28px 32px; }
        .gwch-service-title { font-size: 22px; font-weight: 700; color: var(--gwch-navy); margin: 0 0 12px; font-family: "Playfair Display", serif; }
        .gwch-service-title a { color: inherit; text-decoration: none; transition: color 0.2s; }
        .gwch-service-title a:hover { color: var(--gwch-gold); }
        .gwch-service-card:hover .gwch-service-title a { color: var(--gwch-gold); }
        .gwch-service-desc { font-size: 15px; line-height: 1.7; color: var(--gwch-muted); flex: 1; margin: 0 0 20px; }
        .gwch-service-badges { display: flex; gap: 12px; margin-bottom: 20px; flex-wrap: wrap; justify-content: center; }
        .gwch-badge { display: inline-flex; align-items: center; gap: 6px; padding: 6px 14px; border-radius: 999px; background: rgba(188,145,85,0.1); font-size: 12px; font-weight: 600; color: #9a7340; letter-spacing: 0.3px; }
        .gwch-badge svg { width: 14px; height: 14px; stroke: var(--gwch-gold); fill: none; stroke-width: 2; flex-shrink: 0; }
        .gwch-learn-more { display: inline-flex; align-items: center; justify-content: center; gap: 6px; font-size: 14px; font-weight: 600; color: var(--gwch-gold); text-decoration: none; transition: gap 0.3s; margin-top: auto; }
        .gwch-learn-more:hover { gap: 10px; }

        /* ── MID CTA ── */
        .gwch-mid-cta-btn {
          display: inline-block;
          background: #bc9155;
          color: #fff;
          padding: 16px 48px;
          border-radius: 8px;
          font-family: "Inter", sans-serif;
          font-weight: 600;
          font-size: 16px;
          text-decoration: none;
          transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
        }
        .gwch-mid-cta-btn:hover {
          background: #a57d48;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(188,145,85,0.3);
        }

        /* ── WHAT TO EXPECT / FAQ ── */
        .gwch-expect-section { background: #fff; border-top: 1px solid var(--gwch-border); }
        .gwch-faq-section { background: #fff; border-top: 1px solid var(--gwch-border); }
        .gwch-faq-list { display: flex; flex-direction: column; gap: 10px; }
        .gwch-faq-item { border: 1px solid rgba(30,43,67,0.1); border-radius: 8px; overflow: hidden; transition: border-color 0.2s; }
        .gwch-faq-item[open] { border-color: var(--gwch-gold); }
        .gwch-faq-summary { display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 18px 24px; font-size: 16px; font-weight: 600; color: var(--gwch-navy); cursor: pointer; list-style: none; }
        .gwch-faq-summary::-webkit-details-marker { display: none; }
        .gwch-faq-summary:hover { background: rgba(188,145,85,0.04); }
        .gwch-faq-icon { color: var(--gwch-gold); flex-shrink: 0; transition: transform 0.3s; }
        .gwch-faq-item[open] .gwch-faq-icon { transform: rotate(180deg); }
        .gwch-faq-answer { padding: 0 24px 18px; font-size: 15px; line-height: 1.78; color: var(--gwch-muted); margin: 0; }

        /* ── AREAS CENTER ── */
        .gwch-areas-center [class*="areas"] [class*="grid"],
        .gwch-areas-center [class*="areas"] [class*="cards"],
        .gwch-areas-center [class*="county-card"] { max-width: 820px; margin-left: auto; margin-right: auto; }

        /* ── TRUST STRIP ── */
        .gwch-trust-strip { position: relative; overflow: hidden; background: linear-gradient(135deg, #1e2b43 0%, #151e30 100%); padding: 56px 40px; }
        .gwch-trust-strip-bg { position: absolute; inset: 0; background: url('/hero/builtwell-job-site-aerial-hero-ct.jpg') center/cover; opacity: 0.12; }
        .gwch-trust-strip-inner { position: relative; z-index: 1; max-width: 1200px; margin: 0 auto; display: flex; flex-wrap: wrap; align-items: center; justify-content: center; gap: 0; }
        .gwch-trust-strip-item-wrap { display: contents; }
        .gwch-trust-strip-item { display: flex; align-items: center; gap: 10px; padding: 20px 32px; min-width: 180px; flex: 1; flex-direction: column; text-align: center; color: rgba(255,255,255,0.9); transition: all 0.3s; cursor: pointer; text-decoration: none; }
        .gwch-trust-strip-item:hover { transform: translateY(-2px); color: var(--gwch-gold); }
        .gwch-trust-strip-icon { color: var(--gwch-gold); }
        .gwch-trust-strip-text { display: flex; flex-direction: column; gap: 2px; }
        .gwch-trust-strip-label { font-size: 11px; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; color: rgba(255,255,255,0.6); }
        .gwch-trust-strip-value { font-size: 14px; font-weight: 700; }
        .gwch-trust-divider { width: 1px; height: 40px; background: rgba(255,255,255,0.1); display: none; }
        @media (min-width: 1024px) { .gwch-trust-divider { display: block; } }
        @media (max-width: 768px) { .gwch-trust-strip { padding: 40px 20px; } }
      `}</style>
    </div>
  );
}

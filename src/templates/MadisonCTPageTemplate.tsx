'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import type { CMSPage } from '@/types/cms';
import { FinancingStrip as SharedFinancingStrip } from './template-utils';

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
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(28px)', transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms` }}>
      {children}
    </div>
  );
}

function SectionLabel({ text, dark = false }: { text: string; dark?: boolean }) {
  return (
    <span className={`gwch-label${dark ? ' gwch-label-dark' : ''}`}>
      <span className="gwch-label-line" />
      {text}
    </span>
  );
}

function NearbyAreasSection({ primaryTowns, moreTowns }: { primaryTowns: { name: string; href: string | null; highlight?: boolean }[]; moreTowns: string[] }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <section className="nh-nearby-section">
      <div className="nh-nearby-inner">
        <FadeUp>
          <div className="nh-nearby-header">
            <span className="gwch-label"><span className="gwch-label-line" />Nearby Towns</span>
            <h2 className="gwch-h2">New Haven County Towns <strong>We Also Serve</strong></h2>
            <p className="nh-nearby-subtitle">We serve all of New Haven County from our Orange, CT office. Orange is our home base and the town where we know the roads, the housing stock, and the Building Department best.</p>
          </div>
        </FadeUp>
        <FadeUp delay={40}>
          <div className="nh-nearby-card-wrap">
            <div className="nh-nearby-card">
              <div className="nh-nearby-card-img">
                <img src="/images/areas/new-haven-county.jpg" alt="New Haven County Connecticut towns served by BuiltWell CT" loading="lazy" decoding="async" />
              </div>
              <div className="nh-nearby-card-body">
                <h3>New Haven County</h3>
                <p className="nh-nearby-phone">Call <a href="tel:2034669148">New Haven: (203) 466-9148</a></p>
                <p className="nh-nearby-desc">Served from our Orange, CT office. We cover every town in the county with dedicated local crews who know the housing stock and building departments.</p>
                <div className="nh-nearby-towns">
                  {primaryTowns.map((t) =>
                    t.highlight
                      ? <span key={t.name} className="nh-nearby-town nh-nearby-town-active">{t.name}</span>
                      : t.href
                        ? <Link key={t.name} href={t.href} className="nh-nearby-town nh-nearby-town-link">{t.name}</Link>
                        : <span key={t.name} className="nh-nearby-town">{t.name}</span>
                  )}
                  <div className={`nh-nearby-towns-more${expanded ? ' show' : ''}`}>
                    {moreTowns.map((t) => <span key={t} className="nh-nearby-town">{t}</span>)}
                  </div>
                  <button type="button" className="nh-nearby-toggle" aria-expanded={expanded} onClick={() => setExpanded((v) => !v)}>
                    {expanded ? 'Show Less −' : 'See All Towns +'}
                  </button>
                </div>
                <Link href="/new-haven-county/" className="nh-nearby-link">
                  Learn more about New Haven County <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                </Link>
              </div>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

export function MadisonCTPageTemplate({ page: _page }: { page: CMSPage }) { // eslint-disable-line @typescript-eslint/no-unused-vars
  const [servicesOpen, setServicesOpen] = useState(false);

  const primaryServices = [
    { title: 'Kitchen Remodeling in Madison, CT', href: '/kitchen-remodeling/madison-ct/', img: '/services/kitchen-remodeling-ct.jpg', desc: "Full kitchen renovations in Madison's coastal homes, from early 1900s beach cottages to 1990s colonials — cabinetry, countertops, tile, electrical, and moisture-resistant material selections.", price: '$25K-$150K+', time: '6-12 weeks' },
    { title: 'Bathroom Remodeling in Madison, CT', href: '/bathroom-remodeling/madison-ct/', img: '/services/bathroom-remodeling-ct.jpg', desc: 'Complete bathroom renovations in Madison with coastal moisture management: cement board, porcelain tile, proper ventilation, vanities, showers, tubs, and plumbing upgrades.', price: '$15K-$80K+', time: '3-6 weeks' },
    { title: 'Basement Finishing in Madison, CT', href: '/basement-finishing/madison-ct/', img: '/services/basement-finishing-ct.jpg', desc: "Convert unfinished basements in Madison's coastal homes into living space with full waterproofing assessment, interior drainage, vapor barriers, and sump pump installation where needed.", price: '$25K-$100K+', time: '4-8 weeks' },
    { title: 'Flooring in Madison, CT', href: '/flooring/madison-ct/', img: '/services/flooring-installation-ct.jpg', desc: "Engineered hardwood, LVP, solid hardwood, and tile for Madison homes. Engineered and LVP are strong choices for ground-level and below-grade spaces where coastal humidity is a factor.", price: '$6-$25/sq ft', time: '2-5 days' },
    { title: 'Home Additions in Madison, CT', href: '/home-additions/', img: '/services/home-additions-ct.jpg', desc: "Single-story and second-story additions, bump-outs, and sunrooms for Madison properties. Coastal compliance, setback verification, and coastal site plan review coordination where applicable.", price: '$150-$400/sq ft', time: '8-16 weeks' },
    { title: 'Interior Painting in Madison, CT', href: '/interior-painting/', img: '/services/interior-painting-ct.jpg', desc: 'Walls, ceilings, trim, and doors with proper surface prep for Madison homes. Coastal conditions require moisture-resistant primers and coatings that hold up in shoreline humidity.', price: '$3-$6/sq ft', time: '2-5 days' },
  ];

  const moreServices = [
    { title: 'Interior Carpentry in Madison, CT', href: '/interior-carpentry/', img: '/services/interior-carpentry-ct.jpg', desc: "Custom built-ins, window seats with Sound views, wainscoting, crown molding, mudroom storage, and detailed trim work for Madison's coastal homes.", price: '$75-$150/hr', time: 'Varies' },
    { title: 'Attic Conversions in Madison, CT', href: '/attic-conversions/', img: '/services/attic-conversions-ct.jpg', desc: "Converting unfinished attics in Madison colonials and Capes into bedrooms, offices, or bonus rooms — structural assessment, insulation, electrical, egress, and full finish.", price: '$50K-$150K', time: '6-12 weeks' },
    { title: 'Decks and Porches in Madison, CT', href: '/decks-porches/', img: '/services/decks-porches-ct.jpg', desc: "Composite decking, PVC trim, and stainless steel hardware for Madison's shoreline properties. Screened porches, covered dining areas, and outdoor kitchens built for coastal exposure.", price: '$15K-$75K', time: '2-4 weeks' },
    { title: 'Design and Planning in Madison, CT', href: '/remodeling-design-planning/', img: '/services/design-planning-ct.jpg', desc: 'Space planning, coastal material selection, finish coordination, and permit documentation for Madison remodeling projects before construction begins.', price: '$2.5K-$15K', time: '2-6 weeks' },
    { title: 'Comfort and Accessibility in Madison, CT', href: '/comfort-accessibility-remodeling/', img: '/services/comfort-accessibility-ct.jpg', desc: 'Grab bars, roll-in showers, wider doorways, ramp installation, and first-floor adaptations for Madison homeowners of all ages and abilities.', price: '$5K-$50K', time: '1-4 weeks' },
    { title: 'Insurance Reconstruction in Madison, CT', href: '/insurance-restoration/', img: '/portfolio/builtwell-contractor-handshake-arrival-ct-optimized.jpg', desc: 'Rebuilding Madison homes after fire, water, and storm damage. Full reconstruction coordinating directly with your insurance carrier. Licensed CT HIC #0668405.', price: '$25K-$250K+', time: '4-16 weeks' },
  ];

  const neighborhoods = [
    { name: 'Madison Beach and Surf Club Area', body: "The waterfront strip along Middle Beach Road, West Wharf Road, and the Surf Club area contains Madison's most exposed coastal properties. These homes range from compact 1920s beach cottages to larger contemporary builds from the 2000s. Salt air corrosion, wind-driven rain, and flood zone requirements define every renovation here. Homes closest to the water sit in FEMA VE and AE flood zones, which affect foundation work, mechanical system placement, and insurance. Material specifications for this area require stainless steel or hot-dipped galvanized fasteners, marine-grade exterior finishes, and enhanced moisture management throughout. Renovation costs in this zone typically run 10 to 20 percent higher than inland Madison due to material upgrades and coastal compliance requirements." },
    { name: 'Madison Center and Town Green', body: "The town center along the Boston Post Road and surrounding streets near the Town Green contains Madison's oldest housing stock, including homes dating to the 1700s and early 1800s. These are Colonial, Federal, and Greek Revival structures with original plaster walls, wide-plank floors, stone foundations, and construction methods that predate modern building codes. Renovation work here requires careful structural assessment before any interior changes begin. The Madison Historical Society maintains records on many of these properties, and while Madison does not have a mandatory local historic district commission, homeowners in this area often choose to preserve original architectural character during renovation." },
    { name: 'East River and Route 79 Corridor', body: "The East River area and neighborhoods along Route 79 heading north contain a mix of mid-century colonials, split-levels, and ranches built from the 1950s through the 1970s. These homes represent Madison's most straightforward renovation candidates: conventional framing, standard electrical systems, and layouts that respond well to kitchen and bathroom updates, open floor plan conversions, and basement finishing. Many homes in this area have original builder-grade kitchens and bathrooms that are prime candidates for full renovation. The lower coastal exposure compared to waterfront properties means standard materials perform well here." },
    { name: 'North Madison', body: "North Madison above Interstate 95 is more rural and wooded, with larger lots, newer construction from the 1980s through 2000s, and a mix of Colonials, Capes, and contemporary homes. Properties here face different challenges than the shoreline: ledge rock that complicates foundation work and additions, private wells and septic systems that constrain bathroom and kitchen expansion, and longer driveways that affect material delivery logistics. Renovation projects in North Madison tend toward home additions, kitchen expansions, and attic conversions that take advantage of the larger lot sizes." },
    { name: 'Hammonasset and West End', body: "The western end of Madison near Hammonasset Beach State Park includes a mix of seasonal cottages that have been converted to year-round use and newer homes built on subdivided lots. Converted cottages present specific renovation challenges: inadequate insulation, undersized electrical panels, plumbing designed for seasonal use, and foundations that may not meet current code for year-round habitation. Full-time conversion projects here typically involve insulation upgrades, electrical panel replacement, plumbing system overhaul, and foundation assessment before any cosmetic work begins." },
    { name: 'Neck Road and Copse Road Area', body: "The Neck Road and Copse Road area south of the Post Road represents some of Madison's highest-value residential properties. These homes are typically larger Colonials and custom builds on generous lots with water views or direct shore access. Renovation projects here tend toward premium finishes: custom cabinetry, imported tile, professional-grade appliances, and outdoor living spaces designed for entertaining. The coastal exposure is moderate to high depending on proximity to the water, and material specifications need to account for salt air and humidity. Homeowner expectations in this area are high, and finish quality is the primary driver of project cost." },
  ];

  const faqItems = [
    { q: 'How much does a bathroom remodel cost in Madison, CT?', a: "A standard hall bathroom remodel in Madison costs $15,000 to $30,000. A primary bathroom renovation runs $35,000 to $75,000. High-end suite renovations with custom tile, premium fixtures, and layout changes cost $75,000 to $120,000 or more. Madison's coastal location means we recommend moisture-resistant materials throughout: cement board substrate, porcelain tile, proper exhaust ventilation, and waterproof membranes behind shower walls. We provide detailed pricing during your free consultation so the estimate reflects your specific bathroom and material selections." },
    { q: 'How does salt air affect home renovations in Madison, CT?', a: "Salt air from Long Island Sound accelerates corrosion on metal fasteners, degrades standard exterior paint faster than inland locations, and drives humidity into wall cavities, crawl spaces, and basements. For exterior work, we specify stainless steel or hot-dipped galvanized fasteners, marine-grade hardware, and coastal-rated coatings. For interior work, we use enhanced ventilation, cement board substrate in wet areas, mold-resistant drywall, and waterproof membranes where moisture exposure is elevated. Homes closest to the water require full reassessment of every material choice. Exterior paint on coastal Madison properties typically needs recoating every 5 to 7 years versus 8 to 12 years inland." },
    { q: 'How much does a deck or porch cost in Madison, CT?', a: "A standard wood deck in Madison costs $15,000 to $35,000 for 300 to 400 square feet. Composite decking runs $30,000 to $60,000 for the same footprint but carries 25-year warranties and performs significantly better in salt air. Screened porches cost $25,000 to $55,000 depending on size and finish level. We recommend composite or PVC over pressure-treated lumber for any shoreline property in Madison. The increased upfront cost is offset by lower maintenance and longer lifespan. Deck projects near the water also require zoning setback verification and may require coastal site plan review." },
    { q: 'How long does a kitchen remodel take in Madison, CT?', a: "A kitchen remodel in Madison takes 6 to 10 weeks of active construction under normal conditions. A cosmetic update — new cabinets, countertops, and appliances without moving plumbing or electrical — takes 4 to 6 weeks. A full gut renovation with layout changes, plumbing relocation, and electrical upgrades takes 8 to 12 weeks. Custom cabinets add 6 to 10 weeks of lead time before construction begins. Permit turnaround from the Madison Building Department typically runs 2 to 4 weeks for residential projects. We build all lead times into the project schedule during planning so your start date is realistic." },
    { q: 'Does insurance cover mold damage reconstruction in Madison, CT?', a: "Whether insurance covers mold damage depends on the cause and your specific policy. Many homeowner policies cover mold remediation when it results from a covered peril such as a burst pipe or storm damage, but mold from long-term maintenance issues or gradual water infiltration is typically excluded. We work with State Farm, Liberty Mutual, Travelers, The Hartford, and other carriers common in New Haven County. We document the full scope of damage, coordinate directly with your carrier, and handle supplemental documentation when the initial adjuster estimate does not cover the full rebuild. We hold CT HIC License #0668405." },
    { q: 'How do you handle moisture issues in Madison, CT basements?', a: "Basement moisture in Madison is common due to higher water tables in many areas and the persistent coastal humidity. Before finishing any basement, we assess exterior grading, foundation condition, and moisture sources. Where moisture infiltration is present, we install interior perimeter drainage systems with a sump pump, apply vapor barriers on foundation walls, and specify properly sized dehumidification for the finished space. These steps happen before any framing or drywall begins — not after a problem appears. Standard basement finishing in Madison costs $25,000 to $50,000, with moisture mitigation adding $3,000 to $8,000 depending on the scope of waterproofing required." },
    { q: 'What roofing and siding materials work best near the shoreline in Madison, CT?', a: "For roofing in Madison's coastal environment, architectural asphalt shingles with 130-mph wind ratings provide the best value, costing $8,000 to $15,000 for a typical home. Standing seam metal roofing at $15,000 to $30,000 offers the longest lifespan in coastal conditions. Cedar shakes are authentic to some Madison homes but require intensive maintenance in salt air. For siding, fiber cement (James Hardie) is the strong recommendation for coastal Madison properties — it does not absorb moisture, resists salt air degradation, and lasts 30 to 50 years with proper paint maintenance. Standard vinyl siding becomes brittle in prolonged salt air exposure and is not the right choice for shoreline properties." },
  ];

  const primaryTowns = [
    { name: 'Orange', href: '/new-haven-county/orange-ct/' },
    { name: 'New Haven', href: '/new-haven-county/new-haven-ct/' },
    { name: 'Hamden', href: '/new-haven-county/' },
    { name: 'Branford', href: '/new-haven-county/' },
    { name: 'Guilford', href: '/new-haven-county/' },
    { name: 'Madison', href: null, highlight: true },
    { name: 'Woodbridge', href: '/new-haven-county/' },
    { name: 'Milford', href: '/new-haven-county/' },
    { name: 'Cheshire', href: null },
  ];

  const moreTowns = ['Ansonia', 'Beacon Falls', 'Bethany', 'Derby', 'East Haven', 'Meriden', 'Middlebury', 'Naugatuck', 'North Branford', 'North Haven', 'Oxford', 'Prospect', 'Seymour', 'Southbury', 'Wallingford', 'Waterbury', 'West Haven', 'Wolcott'];

  return (
    <div className="gwch-page">
      <main id="main">

        {/* ── 1. HERO ── */}
        <section className="gwch-page-hero gwch-page-hero-madison">
          <div className="gwch-hero-bg gwch-hero-bg-madison" />
          <div className="gwch-hero-gradient" />
          <div className="gwch-hero-inner gwch-hero-inner-center">
            <ol className="gwch-breadcrumb gwch-breadcrumb-center">
              <li><Link href="/">Home</Link></li>
              <li aria-hidden="true" className="gwch-bc-sep">›</li>
              <li><Link href="/areas-we-serve/">Areas We Serve</Link></li>
              <li aria-hidden="true" className="gwch-bc-sep">›</li>
              <li><Link href="/new-haven-county/">New Haven County</Link></li>
              <li aria-hidden="true" className="gwch-bc-sep">›</li>
              <li><span className="gwch-bc-current">Madison, CT</span></li>
            </ol>
            <h1 className="gwch-hero-h1">
              Home Remodeling in <span className="gwch-gold">Madison, CT</span>
            </h1>
            <p className="gwch-hero-sub">
              Home remodeling in Madison, CT from shoreline kitchens to full renovations. Licensed New Haven County contractor with experience building for coastal Connecticut conditions.
            </p>
            <div className="gwch-hero-ctas gwch-hero-ctas-center">
              <Link href="#contact" className="gwch-cta-btn gwch-cta-primary">Get Your Free Estimate</Link>
              <a href="tel:2034669148" className="gwch-cta-btn">Call (203) 466-9148</a>
            </div>
          </div>
        </section>

        {/* ── 2. TRUST BAR ── */}
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
                  ) : item.value}
                </div>
                <div className="gwch-trust-lbl">{item.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── 3. INTRO ── */}
        <section className="gwch-intro-section">
          <div className="gwch-intro-inner">
            <FadeUp>
              <div className="gwch-intro-header">
                <SectionLabel text="Madison Remodeling" />
                <h2 className="gwch-h2">Professional Home Remodeling in <strong>Madison, CT</strong></h2>
              </div>
              <p className="gwch-intro-body">
                Home remodeling in Madison, CT costs $25,000 to $150,000 or more depending on scope and which part of town your home is in. Madison sits along Long Island Sound, and that coastal location defines every material choice, moisture strategy, and construction timeline. The housing stock ranges from early 1900s beach cottages near the water to mid-century colonials inland to newer construction from the 1990s and 2000s, each with its own renovation demands. We hold CT HIC License #0668405 and serve Madison from our Orange, CT office.
              </p>
              <div className="gwch-intro-cta-box">
                <p className="gwch-intro-cta-title">Ready to discuss your Madison renovation?</p>
                <p className="gwch-intro-cta-sub">In-home visit or remote via Google Meet or Zoom. No obligation.</p>
                <Link href="#contact" className="gwch-cta-btn gwch-cta-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 32px', fontSize: 15 }}>Get Your Free Estimate</Link>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* ── 4. HOUSING STOCK BANNER ── */}
        <section className="gwch-housing-banner gwch-housing-banner-madison">
          <div className="gwch-housing-bg gwch-housing-bg-madison" />
          <div className="gwch-housing-gradient" />
          <div className="gwch-housing-inner gwch-housing-inner-center">
            <FadeUp>
              <SectionLabel text="Housing Stock" dark />
              <h2 className="gwch-h2 gwch-text-white">
                Madison Homes and What <strong>They Require</strong>
              </h2>
              <p className="gwch-housing-body gwch-housing-body-center">
                Madison&apos;s housing stock reflects its identity as a Connecticut shoreline town, with beach cottages from the early 1900s, mid-century colonials throughout the inland neighborhoods, and newer construction from the 1990s and 2000s. The coastal environment creates specific material and moisture challenges that affect every renovation project in town.
              </p>
            </FadeUp>
          </div>
        </section>

        {/* ── 5. ALTERNATING BLOCKS ── */}
        <section className="gwch-alt-section">
          <div className="gwch-alt-container">
            <FadeUp>
              <div className="gwch-alt-block">
                <div className="gwch-alt-img gwch-alt-img-shadow">
                  <img src="/images/areas/madison-ct-coastal-home.jpg" alt="Coastal home in Madison CT showing salt air renovation considerations" />
                </div>
                <div className="gwch-alt-content">
                  <h3 className="gwch-h3">Coastal Homes and Salt Air Considerations</h3>
                  <p className="gwch-body-text">
                    Long Island Sound creates a persistent coastal environment in Madison that directly affects building materials, exterior finishes, and moisture management. Salt air accelerates corrosion on metal fasteners, degrades standard exterior paints faster than inland locations, and drives humidity into wall cavities, crawl spaces, and basements. Every material selection on a Madison project needs to account for this exposure.
                  </p>
                  <p className="gwch-body-text">
                    Homes closest to the water face the most aggressive conditions. We specify stainless steel or hot-dipped galvanized fasteners, marine-grade exterior finishes, and vapor management systems designed for the sustained humidity levels that shoreline properties experience year-round. Basement moisture is common in Madison, and proper waterproofing assessment is the first step before any below-grade finish work begins.
                  </p>
                </div>
              </div>
            </FadeUp>
            <FadeUp delay={60}>
              <div className="gwch-alt-block gwch-alt-block-reverse">
                <div className="gwch-alt-content">
                  <h3 className="gwch-h3">Historic Homes and Newer Construction</h3>
                  <p className="gwch-body-text">
                    Madison has homes dating from the 1700s near the town center alongside subdivisions built in the 1990s and 2000s. These two categories of housing stock require different renovation strategies. Older homes often have original plaster walls, outdated electrical systems, single-pane windows, and foundations that need assessment before interior work begins. The character of these homes is worth preserving, and renovation work should respect their architectural integrity.
                  </p>
                  <p className="gwch-body-text">
                    Newer homes in Madison present a different set of opportunities. Builder-grade kitchens and bathrooms from the 1990s are prime candidates for full renovation. Open floor plan conversions, updated lighting, and modern finishes can significantly change how these homes feel and function without the structural complexity of working on a 200-year-old building.
                  </p>
                </div>
                <div className="gwch-alt-img gwch-alt-img-shadow">
                  <img src="/images/areas/madison-ct-historic-home.jpg" alt="Classic colonial home in Madison CT representing the town's historic housing stock" />
                </div>
              </div>
            </FadeUp>
            <FadeUp delay={120}>
              <div className="gwch-alt-block">
                <div className="gwch-alt-img gwch-alt-img-shadow">
                  <img src="/images/areas/madison-ct-outdoor-living.jpg" alt="Coastal deck and outdoor living space in Madison CT" />
                </div>
                <div className="gwch-alt-content">
                  <h3 className="gwch-h3">Outdoor Living on the Shoreline</h3>
                  <p className="gwch-body-text">
                    Madison homeowners use their outdoor spaces more than most Connecticut towns. Decks, screened porches, outdoor kitchens, and covered dining areas are popular projects here because the shoreline setting makes outdoor living a central part of daily life from spring through fall. The demand for these spaces is high, and so are the performance requirements for the materials involved.
                  </p>
                  <p className="gwch-body-text">
                    Standard pressure-treated lumber deteriorates faster in Madison&apos;s salt air environment. We recommend composite decking, PVC trim, and stainless steel hardware for shoreline properties. Screened porches with retractable screens extend the usable season and keep out the insects that come with coastal living. Every outdoor project in Madison needs to be built with weather resistance as a primary design constraint, not an afterthought.
                  </p>
                </div>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* ── 6. NEIGHBORHOODS ── */}
        <section className="gwch-neighborhoods-section">
          <div className="gwch-section-inner">
            <FadeUp>
              <div className="gwch-section-header">
                <SectionLabel text="Neighborhoods" />
                <h2 className="gwch-h2">Madison Neighborhoods: What They Mean for <strong>Your Remodeling Project</strong></h2>
                <p className="gwch-section-subtitle">
                  Madison&apos;s neighborhoods vary from exposed waterfront zones to rural North Madison, each with its own renovation conditions and material requirements.
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
                          <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
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

        {/* ── 7. PERMITTING ── */}
        <section className="gwch-permitting-section">
          <div className="gwch-section-inner gwch-section-narrow">
            <FadeUp>
              <div className="gwch-section-header">
                <SectionLabel text="Permits and Approvals" />
                <h2 className="gwch-h2">Permitting and Approvals in <strong>Madison, CT</strong></h2>
              </div>
              <p className="gwch-body-text">
                All building permits in Madison are issued through the Madison Building Department at the Town Campus on Campus Drive. Madison uses a traditional paper and in-person process for most residential permit applications. Standard permit review for residential remodeling projects runs two to four weeks depending on scope and season.
              </p>
              <p className="gwch-body-text">
                Any project involving structural changes, electrical work, plumbing modifications, or mechanical system alterations requires a permit. Kitchen and bathroom remodels that move plumbing or add circuits require separate trade permits for electrical and plumbing in addition to the building permit. We handle all permit applications, plan submissions, and inspection coordination as part of every project.
              </p>
              <h3 className="gwch-h3" style={{ marginTop: 32 }}>Coastal Area Management</h3>
              <p className="gwch-body-text">
                Properties within Madison&apos;s coastal area management zone are subject to additional review under the Connecticut Coastal Management Act. Projects involving new construction, substantial renovation, or changes to the building footprint near the shoreline may require a Coastal Site Plan Review through the Madison Planning and Zoning Commission. CT DEEP also reviews projects within their coastal jurisdiction. We coordinate both municipal and state-level coastal reviews when applicable.
              </p>
              <h3 className="gwch-h3" style={{ marginTop: 32 }}>Flood Zone Requirements</h3>
              <p className="gwch-body-text">
                Madison has significant FEMA-designated flood zones along the shoreline, including both AE and VE zones. Substantial improvement thresholds apply: if renovation costs exceed 50% of the structure&apos;s market value, the entire building must be brought into compliance with current flood regulations, which may include elevation requirements. We assess flood zone status during the consultation and factor compliance costs into the project scope from the start.
              </p>
              <h3 className="gwch-h3" style={{ marginTop: 32 }}>Zoning and Setbacks</h3>
              <p className="gwch-body-text">
                Madison&apos;s zoning regulations include setback requirements, lot coverage limits, and height restrictions that affect home additions, deck construction, and exterior modifications. Properties in the R-1 through R-4 residential zones have different dimensional requirements. A zoning permit is required in addition to the building permit for projects that change the building footprint. We verify all zoning compliance before submitting permit applications.
              </p>
            </FadeUp>
          </div>
        </section>

        {/* ── 8. COSTS ── */}
        <section className="gwch-costs-section" id="costs">
          <div className="gwch-section-inner gwch-section-narrow">
            <FadeUp>
              <div className="gwch-section-header">
                <SectionLabel text="Investment" />
                <h2 className="gwch-h2">What Remodeling Costs in <strong>Madison, CT</strong></h2>
              </div>
              <p className="gwch-body-text">
                Home remodeling in Madison, CT costs $25,000 to $150,000 or more for a primary service project. Madison&apos;s shoreline location and the quality expectations of homeowners in this market tend to push projects toward premium materials and custom finishes. Coastal conditions also require material upgrades that are not necessary in inland towns.
              </p>
              <p className="gwch-body-text">
                Outdoor living projects are a larger share of the remodeling market in Madison than in most New Haven County towns. Decks, porches, and outdoor kitchens built with weather-resistant materials add meaningful cost compared to standard construction, but they last significantly longer in the salt air environment and require less maintenance over time.
              </p>
            </FadeUp>
            <FadeUp delay={40}>
              <h3 className="gwch-cost-h3">Kitchen Remodeling Costs in Madison, CT</h3>
              <div className="gwch-cost-table-wrap"><table className="gwch-cost-table"><thead><tr><th>Tier</th><th>Scope</th><th>Typical Range</th></tr></thead><tbody>
                <tr><td>Basic Refresh</td><td>Cabinet refacing, countertops, appliances, paint</td><td className="gwch-td-price">$25,000 – $50,000</td></tr>
                <tr><td>Mid-Range</td><td>New cabinets, countertops, flooring, appliances, lighting</td><td className="gwch-td-price">$50,000 – $90,000</td></tr>
                <tr><td>High-End</td><td>Full custom, layout changes, premium materials</td><td className="gwch-td-price">$90,000 – $150,000+</td></tr>
              </tbody></table></div>
            </FadeUp>
            <FadeUp delay={60}>
              <h3 className="gwch-cost-h3">Bathroom Remodeling Costs in Madison, CT</h3>
              <div className="gwch-cost-table-wrap"><table className="gwch-cost-table"><thead><tr><th>Tier</th><th>Scope</th><th>Typical Range</th></tr></thead><tbody>
                <tr><td>Basic</td><td>New fixtures, vanity, flooring, paint</td><td className="gwch-td-price">$15,000 – $25,000</td></tr>
                <tr><td>Mid-Range</td><td>Full gut, new tile, shower/tub, vanity, lighting</td><td className="gwch-td-price">$25,000 – $55,000</td></tr>
                <tr><td>High-End</td><td>Layout changes, premium fixtures, custom tile</td><td className="gwch-td-price">$55,000 – $80,000+</td></tr>
              </tbody></table></div>
            </FadeUp>
            <FadeUp delay={80}>
              <h3 className="gwch-cost-h3">Basement Finishing Costs in Madison, CT</h3>
              <p className="gwch-body-text" style={{ marginBottom: 12 }}>Coastal moisture is a significant factor. Waterproofing assessment and vapor barriers are standard before finishing begins in Madison basements.</p>
              <div className="gwch-cost-table-wrap"><table className="gwch-cost-table"><thead><tr><th>Tier</th><th>Scope</th><th>Typical Range</th></tr></thead><tbody>
                <tr><td>Basic</td><td>Framing, drywall, flooring, lighting, paint</td><td className="gwch-td-price">$25,000 – $45,000</td></tr>
                <tr><td>Mid-Range</td><td>Multiple rooms, upgraded flooring, bathroom rough-in</td><td className="gwch-td-price">$45,000 – $70,000</td></tr>
                <tr><td>High-End</td><td>Full bathroom, wet bar, custom built-ins</td><td className="gwch-td-price">$70,000 – $100,000+</td></tr>
              </tbody></table></div>
            </FadeUp>
            <FadeUp delay={100}>
              <h3 className="gwch-cost-h3">Flooring Costs in Madison, CT</h3>
              <p className="gwch-body-text" style={{ marginBottom: 12 }}>Engineered hardwood and LVP are strong choices for ground-level and below-grade spaces where coastal humidity is a factor. Solid hardwood is best for upper floors.</p>
              <div className="gwch-cost-table-wrap"><table className="gwch-cost-table"><thead><tr><th>Material</th><th>Best For</th><th>Installed Cost/sq ft</th></tr></thead><tbody>
                <tr><td>Solid Hardwood</td><td>Living rooms, dining rooms, bedrooms</td><td className="gwch-td-price">$12 – $25</td></tr>
                <tr><td>Engineered Hardwood</td><td>Basements, moisture-prone areas</td><td className="gwch-td-price">$8 – $18</td></tr>
                <tr><td>Luxury Vinyl Plank</td><td>Basements, kitchens, high-traffic</td><td className="gwch-td-price">$6 – $14</td></tr>
                <tr><td>Tile</td><td>Bathrooms, kitchens, entryways</td><td className="gwch-td-price">$12 – $25</td></tr>
              </tbody></table></div>
            </FadeUp>
            <FadeUp delay={120}>
              <h3 className="gwch-cost-h3">Home Additions Costs in Madison, CT</h3>
              <div className="gwch-cost-table-wrap"><table className="gwch-cost-table"><thead><tr><th>Type</th><th>Scope</th><th>Typical Range</th></tr></thead><tbody>
                <tr><td>Bump-Out</td><td>Single-room expansion, 100–200 sq ft</td><td className="gwch-td-price">$150 – $400/sq ft</td></tr>
                <tr><td>Single-Story</td><td>Family room, sunroom, or garage conversion</td><td className="gwch-td-price">$150 – $400/sq ft</td></tr>
                <tr><td>Second-Story</td><td>Full second floor with structural support</td><td className="gwch-td-price">$200 – $400/sq ft</td></tr>
              </tbody></table></div>
            </FadeUp>
            <FadeUp delay={140}>
              <h3 className="gwch-cost-h3">Interior Painting Costs in Madison, CT</h3>
              <div className="gwch-cost-table-wrap"><table className="gwch-cost-table"><thead><tr><th>Scope</th><th>Details</th><th>Typical Range</th></tr></thead><tbody>
                <tr><td>Per Square Foot</td><td>Walls, ceilings, trim, proper surface prep</td><td className="gwch-td-price">$3 – $6/sq ft</td></tr>
                <tr><td>Single Room</td><td>Average bedroom or living room</td><td className="gwch-td-price">$800 – $2,500</td></tr>
                <tr><td>Whole Home</td><td>Full interior, all rooms, trim, doors</td><td className="gwch-td-price">$8,000 – $25,000+</td></tr>
              </tbody></table></div>
            </FadeUp>
            <FadeUp delay={160}>
              <h3 className="gwch-cost-h3">Interior Carpentry Costs in Madison, CT</h3>
              <p className="gwch-body-text" style={{ marginBottom: 12 }}>Madison homes feature custom built-ins, window seats with Sound views, and detailed trim work that reflects the quality expectations of shoreline homeowners.</p>
              <div className="gwch-cost-table-wrap"><table className="gwch-cost-table"><thead><tr><th>Scope</th><th>Details</th><th>Typical Range</th></tr></thead><tbody>
                <tr><td>Hourly Rate</td><td>Custom trim, built-ins, shelving, wainscoting</td><td className="gwch-td-price">$75 – $150/hour</td></tr>
                <tr><td>Crown Molding</td><td>Per linear foot, installed</td><td className="gwch-td-price">$8 – $25/LF</td></tr>
                <tr><td>Custom Built-Ins</td><td>Bookcases, window seats, mudroom storage</td><td className="gwch-td-price">$3,000 – $15,000+</td></tr>
              </tbody></table></div>
            </FadeUp>
            <FadeUp delay={180}>
              <h3 className="gwch-cost-h3">Additional Service Costs in Madison, CT</h3>
              <div className="gwch-cost-table-wrap"><table className="gwch-cost-table"><thead><tr><th>Service</th><th>Details</th><th>Typical Range</th></tr></thead><tbody>
                <tr><td>Attic Conversions</td><td>Framing, insulation, electrical, flooring, egress</td><td className="gwch-td-price">$50,000 – $150,000</td></tr>
                <tr><td>Decks and Porches</td><td>Composite/PVC for coastal exposure, permits included</td><td className="gwch-td-price">$15,000 – $75,000</td></tr>
                <tr><td>Design and Planning</td><td>Layout, material selection, 3D rendering, permit drawings</td><td className="gwch-td-price">$2,500 – $15,000</td></tr>
                <tr><td>Comfort and Accessibility</td><td>Grab bars, walk-in showers, widened doorways, ramps</td><td className="gwch-td-price">$5,000 – $50,000</td></tr>
                <tr><td>Insurance Reconstruction</td><td>Fire, water, storm damage rebuilds with carrier coordination</td><td className="gwch-td-price">$25,000 – $250,000+</td></tr>
              </tbody></table></div>
            </FadeUp>
            <FadeUp delay={200}>
              <h3 className="gwch-h3" style={{ marginTop: 48 }}>What Drives Cost in Madison</h3>
              <p className="gwch-body-text">Madison&apos;s coastal location is the primary cost driver compared to inland Connecticut towns. Salt air requires stainless steel or hot-dipped galvanized fasteners, marine-grade finishes, and moisture management systems that add cost relative to standard inland specifications. Flood zone compliance in FEMA VE and AE zones adds engineering and potential elevation requirements to any project near the water. Outdoor living — decks, porches, screened structures — requires composite or PVC materials rated for coastal exposure rather than standard pressure-treated lumber. Quality expectations of Madison homeowners push toward premium finishes and custom work across all project categories.</p>
            </FadeUp>
          </div>
        </section>

        {/* ── 9. SERVICES ── */}
        <section className="nh-services-section">
          <div className="nh-services-inner">
            <FadeUp>
              <div className="nh-services-header">
                <SectionLabel text="Our Services" />
                <h2 className="gwch-h2">Our Remodeling Services in <span className="gwch-gold">Madison, CT</span></h2>
                <p className="gwch-section-subtitle">
                  BuiltWell CT provides a full range of remodeling services in Madison including kitchen renovation, bathroom remodeling, basement finishing, flooring, home additions, interior painting, carpentry, attic conversions, decks and porches, design, and accessibility modifications. Madison&apos;s shoreline location, coastal material requirements, and outdoor living culture shape how we approach every project here.
                </p>
              </div>
            </FadeUp>
            <FadeUp delay={80}>
              <div className="nh-services-grid">
                {primaryServices.map((svc) => (
                  <div key={svc.title} className="nh-service-card">
                    <div className="nh-service-card-img">
                      <img src={svc.img} alt={svc.title} loading="lazy" />
                    </div>
                    <div className="nh-service-card-body">
                      <h3><Link href={svc.href}>{svc.title}</Link></h3>
                      <p>{svc.desc}</p>
                      <div className="nh-service-meta">
                        <span className="nh-service-badge">
                          <svg viewBox="0 0 24 24"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
                          {svc.price}
                        </span>
                        <span className="nh-service-badge">
                          <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                          {svc.time}
                        </span>
                      </div>
                      <Link href={svc.href} className="nh-service-link">
                        Get Started <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </FadeUp>

            <div className="nh-services-toggle-wrap">
              <button
                type="button"
                className={`nh-services-toggle-btn${servicesOpen ? ' open' : ''}`}
                onClick={() => setServicesOpen((v) => !v)}
              >
                {servicesOpen ? 'Show Less' : 'Show 6 More Services'}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 9l6 6 6-6"/></svg>
              </button>
            </div>

            <div className={`nh-services-more${servicesOpen ? ' show' : ''}`}>
              <div className="nh-services-grid">
                {moreServices.map((svc) => (
                  <div key={svc.title} className="nh-service-card">
                    <div className="nh-service-card-img">
                      <img src={svc.img} alt={svc.title} loading="lazy" />
                    </div>
                    <div className="nh-service-card-body">
                      <h3><Link href={svc.href}>{svc.title}</Link></h3>
                      <p>{svc.desc}</p>
                      <div className="nh-service-meta">
                        <span className="nh-service-badge">
                          <svg viewBox="0 0 24 24"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
                          {svc.price}
                        </span>
                        <span className="nh-service-badge">
                          <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                          {svc.time}
                        </span>
                      </div>
                      <Link href={svc.href} className="nh-service-link">
                        Get Started <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── 10. MID-PAGE CTA ── */}
        <div style={{ position: 'relative', overflow: 'hidden', padding: '64px 0' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #1E2B43 0%, #151E30 100%)' }} />
          <div style={{ position: 'absolute', inset: 0, backgroundImage: "url('/portfolio/builtwell-contractor-client-consultation-ct.jpeg')", backgroundPosition: 'center 15%', backgroundSize: 'cover', opacity: 0.25 }} />
          <div style={{ position: 'relative', zIndex: 1, maxWidth: 700, margin: '0 auto', textAlign: 'center', padding: '0 32px' }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px, 3.5vw, 40px)', color: '#fff', marginBottom: 12 }}>
              Ready to Remodel in <span style={{ color: '#BC9155' }}>Madison</span>?
            </h2>
            <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.7)', marginBottom: 28 }}>From our Orange headquarters — 30 minutes from Madison — we bring local coastal expertise and a straightforward process to every project on the shoreline.</p>
            <Link href="#contact" style={{ display: 'inline-block', background: '#BC9155', color: '#fff', padding: '16px 48px', borderRadius: 8, fontWeight: 600, fontSize: 16, textDecoration: 'none' }}>Get Your Free Estimate</Link>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', marginTop: 16, fontStyle: 'italic' }}>On-site or remote via Google Meet. No charge, no obligation.</p>
          </div>
        </div>

        {/* ── 11. WHAT TO EXPECT ── */}
        <section className="gwch-expect-section">
          <div className="gwch-section-inner gwch-section-narrow">
            <FadeUp>
              <div className="gwch-section-header" style={{ textAlign: 'left' }}>
                <SectionLabel text="Working With Us" />
                <h2 className="gwch-h2">What to Expect <strong>Working With BuiltWell</strong></h2>
              </div>
              <p className="gwch-body-text">
                We handle all Madison permits, Building Department submissions, coastal area management coordination where applicable, inspection scheduling, and subcontractor management under CT HIC License #0668405, with daily progress updates and a five-step process covering consultation through final walkthrough. We carry full liability insurance and workers&apos; compensation, and we do not start a project until permits are pulled and the scope is in writing with a clear timeline attached.
              </p>
              <p className="gwch-body-text">
                Our five-step process covers every project regardless of scale: Consultation, Planning, Selections, Build, and Walkthrough. You can read through the full process at{' '}
                <Link href="/process/" className="gwch-inline-link">/process/</Link>. In practice, what this means for a Madison project is that the planning phase accounts for coastal material specifications, flood zone compliance where applicable, and the seasonal timing considerations that come with shoreline construction.
              </p>
              <p className="gwch-body-text">
                During active construction, you receive daily updates on progress and a clean job site at the end of every workday. If something unexpected turns up inside a wall, you hear from us that day with an explanation of what we found and your options before we proceed.
              </p>
              <h3 className="gwch-h3" style={{ marginTop: 32 }}>New Haven County Project Reference</h3>
              <p className="gwch-body-text">
                Our work in New Haven County includes a whole-home restoration in nearby Hamden, where the project involved flooring, interior painting, bathroom remodeling, and drywall throughout a home that had sustained significant damage. &ldquo;We were devastated when we saw the damage. BuiltWell took everything off our plate,&rdquo; said the Martins, Hamden. You can read the full case study at{' '}
                <Link href="/case-studies/whole-home-restoration-hamden/" className="gwch-inline-link">/case-studies/whole-home-restoration-hamden/</Link>.
              </p>
              <p className="gwch-body-text">
                Madison projects are served from our <Link href="/new-haven-county/orange-ct/" className="gwch-inline-link">Orange, CT office</Link>. For county-level context on the full scope of what we do in this market, visit{' '}
                <Link href="/new-haven-county/" className="gwch-inline-link">/new-haven-county/</Link>.
              </p>
            </FadeUp>
          </div>
        </section>

        {/* ── 12. FAQ ── */}
        <section className="gwch-faq-section">
          <div className="gwch-section-inner gwch-section-narrow">
            <FadeUp>
              <div className="gwch-section-header">
                <SectionLabel text="Common Questions" />
                <h2 className="gwch-h2">Frequently Asked Questions: <strong>Madison Remodeling</strong></h2>
                <p className="gwch-section-subtitle">
                  Madison homeowners most commonly ask about coastal material requirements, remodeling costs, project timelines, and what makes shoreline renovation different from inland construction.
                </p>
              </div>
            </FadeUp>
            <div className="gwch-faq-list">
              {faqItems.map((item, i) => (
                <FadeUp key={i} delay={i * 40}>
                  <details className="gwch-faq-item">
                    <summary className="gwch-faq-summary">
                      <span>{item.q}</span>
                      <span className="gwch-faq-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="6 9 12 15 18 9" /></svg></span>
                    </summary>
                    <p className="gwch-faq-answer">{item.a}</p>
                  </details>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* ── 13. NEARBY AREAS ── */}
        <NearbyAreasSection primaryTowns={primaryTowns} moreTowns={moreTowns} />

        {/* ── 14. TRUST STRIP ── */}
        <section className="gwch-trust-strip">
          <div className="gwch-trust-strip-bg" />
          <div className="gwch-trust-strip-inner">
            {[
              { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>, label: 'Google Rating', value: '4.9' },
              { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M9 12l2 2 4-4" /></svg>, label: 'Trusted on', value: 'Houzz' },
              { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M8 2v4M16 2v4M3 10h18" /></svg>, label: 'CT HIC License', value: '#0668405' },
              { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M9 12l2 2 4-4" /></svg>, label: 'Verified on', value: 'Angi' },
            ].map((item, i, arr) => (
              <div key={i} className="gwch-trust-strip-item-wrap">
                <div className="gwch-trust-strip-item">
                  <span className="gwch-trust-strip-icon">{item.icon}</span>
                  <span className="gwch-trust-strip-text">
                    <span className="gwch-trust-strip-label">{item.label}</span>
                    <span className="gwch-trust-strip-value">{item.value}</span>
                  </span>
                </div>
                {i < arr.length - 1 && <div className="gwch-trust-divider" />}
              </div>
            ))}
          </div>
        </section>

        {/* ── 15. CTA FORM ── */}
        <section className="gwch-cta-section" id="contact">
          <div className="gwch-cta-section-inner">
            <FadeUp>
              <div className="gwch-cta-header">
                <SectionLabel text="Get Started" />
                <h2 className="gwch-h2">Schedule Your Free <strong>Consultation</strong></h2>
                <p className="gwch-cta-sub">On-site or remote (Google Meet or Zoom). Call <a href="tel:2034669148" className="gwch-inline-link">(203) 466-9148</a> or fill out the form below.</p>
              </div>
            </FadeUp>
            <div className="gwch-cta-body">
              <FadeUp>
                <div className="gwch-cta-left">
                  <div className="gwch-cta-images">
                    <div className="gwch-cta-img-wrap">
                      <img src="/portfolio/builtwell-contractor-handshake-arrival-ct-optimized.jpg" alt="BuiltWell CT contractor arriving for consultation in Madison" />
                    </div>
                    <div className="gwch-cta-img-wrap">
                      <img src="/portfolio/builtwell-contractor-client-consultation-ct.jpeg" alt="BuiltWell CT project consultation in a Madison home" />
                    </div>
                  </div>
                </div>
              </FadeUp>
              <FadeUp delay={60}>
                <div className="gwch-contact-form-wrap">
                  <form
                    action="https://formspree.io/f/mwkgjobw"
                    method="POST"
                    encType="multipart/form-data"
                  >
                    <input type="hidden" name="_subject" value="New Lead: Madison CT Remodeling Inquiry" />
                    <input type="hidden" name="page_source" value="/new-haven-county/madison-ct/" />
                    <div className="gwch-form-row gwch-form-row-4">
                      <div className="gwch-form-group">
                        <label htmlFor="madison-name">Name *</label>
                        <input id="madison-name" type="text" name="name" required placeholder="Your name" />
                      </div>
                      <div className="gwch-form-group">
                        <label htmlFor="madison-phone">Phone *</label>
                        <input id="madison-phone" type="tel" name="phone" required placeholder="(203) 555-0100" />
                      </div>
                    </div>
                    <div className="gwch-form-row gwch-form-row-4">
                      <div className="gwch-form-group">
                        <label htmlFor="madison-email">Email *</label>
                        <input id="madison-email" type="email" name="email" required placeholder="you@example.com" />
                      </div>
                      <div className="gwch-form-group">
                        <label htmlFor="madison-zip">Zip Code *</label>
                        <input id="madison-zip" type="text" name="zip" required placeholder="06443" pattern="[0-9]{5}" />
                      </div>
                    </div>
                    <div className="gwch-form-group">
                      <label htmlFor="madison-services">Services Needed</label>
                      <select id="madison-services" name="services" multiple style={{ height: 120 }}>
                        <option value="Kitchen Remodeling">Kitchen Remodeling</option>
                        <option value="Bathroom Remodeling">Bathroom Remodeling</option>
                        <option value="Basement Finishing">Basement Finishing</option>
                        <option value="Flooring">Flooring</option>
                        <option value="Home Additions">Home Additions</option>
                        <option value="Interior Painting">Interior Painting</option>
                        <option value="Interior Carpentry">Interior Carpentry</option>
                        <option value="Attic Conversions">Attic Conversions</option>
                        <option value="Decks and Porches">Decks and Porches</option>
                        <option value="Design and Planning">Design and Planning</option>
                        <option value="Comfort and Accessibility">Comfort and Accessibility</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div className="gwch-form-row gwch-form-row-3">
                      <div className="gwch-form-group">
                        <label htmlFor="madison-time">Best Time to Contact</label>
                        <select id="madison-time" name="best_time">
                          <option value="">Select a time</option>
                          <option value="Morning (8am-12pm)">Morning (8am–12pm)</option>
                          <option value="Afternoon (12pm-4pm)">Afternoon (12pm–4pm)</option>
                          <option value="Evening (4pm-6pm)">Evening (4pm–6pm)</option>
                          <option value="Anytime">Anytime</option>
                        </select>
                      </div>
                      <div className="gwch-form-group">
                        <fieldset style={{ border: 'none', padding: 0, margin: 0 }}>
                          <legend className="gwch-form-legend">Preferred Contact</legend>
                          <div className="gwch-form-radio-group">
                            <label><input type="radio" name="contact_method" value="Call" defaultChecked /> Call</label>
                            <label><input type="radio" name="contact_method" value="Text" /> Text</label>
                            <label><input type="radio" name="contact_method" value="Email" /> Email</label>
                          </div>
                        </fieldset>
                      </div>
                    </div>
                    <div className="gwch-form-group">
                      <label htmlFor="madison-message">Tell Us About Your Project</label>
                      <textarea id="madison-message" name="message" rows={4} placeholder="What are you looking to do? Location in Madison, rough timeline, any specific concerns..." />
                    </div>
                    <div className="gwch-form-group">
                      <label htmlFor="madison-photos">Upload Photos (optional)</label>
                      <input id="madison-photos" type="file" name="photos" accept="image/*" multiple />
                    </div>
                    <div className="gwch-form-consent">
                      <label>
                        <input type="checkbox" required />
                        I agree to the <Link href="/privacy-policy/" className="gwch-inline-link">Privacy Policy</Link> and <Link href="/terms/" className="gwch-inline-link">Terms</Link>.
                      </label>
                    </div>
                    <button type="submit" className="gwch-form-submit">Get Your Free Estimate</button>
                    <p className="gwch-form-note">We serve Madison from our Orange, CT office. We will confirm your appointment within one business day.</p>
                  </form>
                </div>
              </FadeUp>
            </div>
          </div>
        </section>

        {/* ── 16. OFFICE ── */}
        <section className="gwch-office-section">
          <div className="gwch-office-inner">
            <div className="gwch-section-header gwch-office-section">
              <SectionLabel text="Our Office" dark />
              <h2 className="gwch-h2 gwch-text-white">Serving Madison from <strong>Orange, CT</strong></h2>
            </div>
            <div className="gwch-office-grid">
              <FadeUp>
                <div className="gwch-office-details">
                  <div className="gwch-office-detail-item">
                    <div className="gwch-office-detail-icon">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                    </div>
                    <div className="gwch-office-detail-text">
                      <h4>Address</h4>
                      <p>206A Boston Post Road<br />Orange, CT 06477</p>
                    </div>
                  </div>
                  <div className="gwch-office-detail-item">
                    <div className="gwch-office-detail-icon">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                    </div>
                    <div className="gwch-office-detail-text">
                      <h4>Business Hours</h4>
                      <div className="gwch-hours-table">
                        <div className="gwch-hours-row"><span className="gwch-hours-day">Monday – Friday</span><span>8:00 AM – 5:00 PM</span></div>
                        <div className="gwch-hours-row"><span className="gwch-hours-day">Saturday</span><span>8:00 AM – 3:00 PM</span></div>
                        <div className="gwch-hours-row"><span className="gwch-hours-day">Sunday</span><span>Closed</span></div>
                      </div>
                    </div>
                  </div>
                  <div className="gwch-office-detail-item">
                    <div className="gwch-office-detail-icon">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                    </div>
                    <div className="gwch-office-detail-text">
                      <h4>Phone</h4>
                      <p>New Haven County: <a href="tel:2034669148">(203) 466-9148</a></p>
                    </div>
                  </div>
                  <div className="gwch-office-detail-item">
                    <div className="gwch-office-detail-icon">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                    </div>
                    <div className="gwch-office-detail-text">
                      <h4>Email</h4>
                      <p><a href="mailto:info@buildwellct.com">info@buildwellct.com</a></p>
                    </div>
                  </div>
                </div>
              </FadeUp>
              <FadeUp delay={80}>
                <div className="gwch-office-map">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2999.8!2d-73.0401!3d41.2784!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e87d3a7c1e1b3f%3A0x1234567890abcdef!2s206A+Boston+Post+Rd%2C+Orange%2C+CT+06477!5e0!3m2!1sen!2sus!4v1"
                    width="100%" height="380" style={{ border: 0, display: 'block' }}
                    allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                    title="BuiltWell CT - 206A Boston Post Road, Orange, CT 06477"
                  />
                </div>
              </FadeUp>
            </div>
          </div>
        </section>

        {/* ── 17. FINANCING ── */}
        <SharedFinancingStrip data={{ title: 'Flexible Financing Available', content: 'Get approved in about 60 seconds and start your project today.', cta: { url: '/financing/', label: 'Check Financing Options' } }} />

      </main>

      <style jsx global>{`
        :root { --gwch-gold: #bc9155; --gwch-gold-dark: #a57d48; --gwch-gold-light: #d4a95a; --gwch-navy: #1e2b43; --gwch-oxford: #151e30; --gwch-muted: #5c677d; --gwch-cream: #f5f1e9; --gwch-border: rgba(30,43,67,0.09); }
        .gwch-page { background: #fff; color: var(--gwch-navy); }
        .gwch-label { display: inline-flex; align-items: center; gap: 8px; font-size: 11px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: #9a7340; margin-bottom: 12px; }
        .gwch-label-dark { color: #c89b5b; }
        .gwch-label-line { display: inline-block; width: 10px; height: 2px; background: var(--gwch-gold); }
        .gwch-label-dark .gwch-label-line { background: #c89b5b; }
        .gwch-h2 { font-family: Georgia, serif; font-size: clamp(30px, 3.6vw, 46px); font-weight: 700; line-height: 1.15; letter-spacing: -0.02em; color: var(--gwch-navy); margin: 0 0 16px; }
        .gwch-h2 strong { font-weight: 700; color: var(--gwch-gold); font-style: normal; }
        .gwch-text-white { color: #fff !important; }
        .gwch-text-white strong { color: var(--gwch-gold) !important; }
        .gwch-gold { color: var(--gwch-gold); }
        .gwch-h3 { font-family: Georgia, serif; font-size: clamp(20px, 2vw, 26px); font-weight: 700; color: var(--gwch-navy); margin: 0 0 12px; }
        .gwch-body-text { font-size: 16px; line-height: 1.8; color: var(--gwch-muted); margin: 0 0 16px; }
        .gwch-intro-body { font-size: 17px; line-height: 1.82; color: var(--gwch-muted); margin: 0 0 16px; }
        .gwch-inline-link { color: var(--gwch-gold); font-weight: 600; text-decoration: none; }
        .gwch-inline-link:hover { text-decoration: underline; }
        .gwch-section-subtitle { font-size: 17px; line-height: 1.75; color: var(--gwch-muted); max-width: 720px; margin: 0 auto; }
        .gwch-section-inner { max-width: 1200px; margin: 0 auto; padding: 72px 40px; }
        .gwch-section-narrow { max-width: 820px; }
        .gwch-section-header { text-align: center; margin-bottom: 48px; }
        @media (max-width: 768px) { .gwch-section-inner { padding: 48px 20px; } }

        /* ─── HERO ─── */
        .gwch-page-hero { position: relative; min-height: 50vh; display: flex; align-items: stretch; overflow: hidden; background: #151e30; }
        .gwch-hero-bg { position: absolute; inset: 0; background-size: cover; background-position: center 40%; opacity: 0.72; z-index: 0; }
        .gwch-hero-bg-madison { background-image: url('/images/areas/madison-ct-town.jpg'); }
        .gwch-hero-gradient { position: absolute; inset: 0; background: radial-gradient(ellipse at 97% 97%, rgba(21,30,48,1) 0%, rgba(21,30,48,0.9) 8%, transparent 30%), radial-gradient(ellipse at 3% 97%, rgba(21,30,48,0.9) 0%, transparent 25%), linear-gradient(180deg, rgba(21,30,48,0.35) 0%, rgba(21,30,48,0.2) 30%, rgba(21,30,48,0.45) 65%, rgba(21,30,48,0.92) 100%); z-index: 1; }
        .gwch-hero-inner { position: relative; z-index: 2; max-width: 1240px; margin: 0 auto; padding: 120px 40px 48px; width: 100%; display: flex; flex-direction: column; align-items: center; text-align: center; justify-content: center; }
        .gwch-hero-inner-center { align-items: center; text-align: center; }
        .gwch-breadcrumb { display: flex; flex-wrap: wrap; gap: 4px; list-style: none; padding: 0; margin: 0 0 24px; justify-content: center; }
        .gwch-breadcrumb-center { justify-content: center; }
        .gwch-breadcrumb li { font-size: 13px; }
        .gwch-breadcrumb a { color: rgba(255,255,255,0.65); text-decoration: none; transition: color 0.2s; }
        .gwch-breadcrumb a:hover { color: var(--gwch-gold); }
        .gwch-bc-sep { color: rgba(255,255,255,0.35); }
        .gwch-bc-current { color: rgba(255,255,255,0.85); font-weight: 500; }
        .gwch-hero-h1 { font-family: 'Playfair Display', Georgia, serif; font-size: clamp(40px, 4.5vw, 56px); font-weight: 700; color: #fff; line-height: 1.08; letter-spacing: -0.5px; margin: 0 0 12px; text-shadow: 0 2px 20px rgba(0,0,0,0.5); }
        .gwch-hero-sub { font-size: clamp(15px, 1.4vw, 18px); color: rgba(255,255,255,0.82); line-height: 1.65; max-width: 620px; margin: 0 0 32px; }
        .gwch-hero-ctas { display: flex; flex-wrap: wrap; gap: 12px; }
        .gwch-hero-ctas-center { justify-content: center; }
        .gwch-cta-btn { display: inline-flex; align-items: center; padding: 14px 28px; border-radius: 8px; font-size: 15px; font-weight: 600; text-decoration: none; border: 2px solid rgba(255,255,255,0.35); color: #fff; background: rgba(255,255,255,0.08); backdrop-filter: blur(4px); transition: all 0.25s; letter-spacing: 0.2px; }
        .gwch-cta-btn:hover { border-color: rgba(255,255,255,0.6); background: rgba(255,255,255,0.15); }
        .gwch-cta-primary { background: var(--gwch-gold); border-color: var(--gwch-gold); color: #fff; }
        .gwch-cta-primary:hover { background: var(--gwch-gold-dark); border-color: var(--gwch-gold-dark); transform: translateY(-1px); box-shadow: 0 4px 16px rgba(188,145,85,0.4); }
        @media (max-width: 768px) { .gwch-hero-inner { padding: 100px 20px 40px; } }

        /* ─── TRUST BAR ─── */
        .gwch-trust-bar { background: linear-gradient(135deg, #1e2b43 0%, #151e30 100%); border-top: 1px solid rgba(188,145,85,0.2); border-bottom: 1px solid rgba(188,145,85,0.2); }
        .gwch-trust-bar-inner { max-width: 1280px; margin: 0 auto; display: grid; grid-template-columns: repeat(4, 1fr); text-align: center; }
        .gwch-trust-item { padding: 36px 20px; border-right: 1px solid rgba(188,145,85,0.12); transition: background 0.3s, transform 0.3s; cursor: default; display: flex; flex-direction: column; align-items: center; justify-content: center; }
        .gwch-trust-item:last-child { border-right: none; }
        .gwch-trust-item:hover { background: rgba(188,145,85,0.08); transform: translateY(-3px); }
        .gwch-trust-val { font-family: 'Playfair Display', serif; font-size: 42px; font-weight: 700; color: var(--gwch-gold); line-height: 1; display: flex; align-items: center; justify-content: center; min-height: 50px; }
        .gwch-trust-lbl { font-size: 13px; color: rgba(255,255,255,0.6); margin-top: 8px; text-transform: uppercase; letter-spacing: 1px; font-weight: 500; }
        @media (max-width: 640px) { .gwch-trust-bar-inner { grid-template-columns: repeat(2, 1fr); } .gwch-trust-item { border-bottom: 1px solid rgba(188,145,85,0.12); } .gwch-trust-val { font-size: 32px; } }

        /* ─── INTRO ─── */
        .gwch-intro-section { background: #fff; border-bottom: 1px solid rgba(30,43,67,0.06); }
        .gwch-intro-inner { max-width: 820px; margin: 0 auto; padding: 80px 40px; text-align: center; }
        .gwch-intro-header { margin-bottom: 28px; }
        .gwch-intro-body { font-size: 16px; line-height: 1.85; color: var(--gwch-muted); margin: 0 0 20px; }
        .gwch-intro-cta-box { margin-top: 36px; padding: 28px; background: rgba(188,145,85,0.06); border-radius: 10px; text-align: center; }
        .gwch-intro-cta-title { font-size: 17px; font-weight: 600; color: var(--gwch-navy); margin: 0 0 8px; font-family: Georgia, serif; }
        .gwch-intro-cta-sub { font-size: 14px; color: var(--gwch-muted); margin: 0 0 16px; }
        @media (max-width: 768px) { .gwch-intro-inner { padding: 48px 20px; } }

        /* ─── HOUSING STOCK BANNER ─── */
        .gwch-housing-banner { position: relative; padding: 80px 40px; overflow: hidden; background: var(--gwch-navy); }
        .gwch-housing-bg { position: absolute; inset: 0; background-size: cover; background-position: center 40%; opacity: 0.3; }
        .gwch-housing-bg-madison { background-image: url('/images/areas/madison-ct-town.jpg'); }
        .gwch-housing-gradient { position: absolute; inset: 0; background: linear-gradient(180deg, rgba(21,30,48,0.5) 0%, rgba(21,30,48,0.4) 50%, rgba(21,30,48,0.7) 100%); }
        .gwch-housing-inner { position: relative; z-index: 1; max-width: 820px; margin: 0 auto; }
        .gwch-housing-inner-center { text-align: center; }
        .gwch-housing-inner-center .gwch-label { justify-content: center; }
        .gwch-housing-body { font-size: 17px; line-height: 1.75; color: rgba(255,255,255,0.88); margin: 0; }
        .gwch-housing-body-center { max-width: 700px; margin: 0 auto; }
        @media (max-width: 768px) { .gwch-housing-banner { padding: 56px 20px; } .gwch-housing-body { font-size: 16px; } }

        /* ─── ALTERNATING BLOCKS ─── */
        .gwch-alt-section { background: #fff; padding: 80px 40px; }
        .gwch-alt-container { max-width: 1200px; margin: 0 auto; display: flex; flex-direction: column; gap: 72px; }
        .gwch-alt-block { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: start; }
        .gwch-alt-block-reverse .gwch-alt-img { order: 2; }
        .gwch-alt-img { border-radius: 10px; overflow: hidden; }
        .gwch-alt-img-shadow { box-shadow: 0 12px 40px rgba(30,43,67,0.12); }
        .gwch-alt-img img { width: 100%; height: 360px; object-fit: cover; display: block; }
        .gwch-alt-content { padding-top: 8px; }
        @media (max-width: 900px) { .gwch-alt-section { padding: 48px 20px; } .gwch-alt-block { grid-template-columns: 1fr; gap: 24px; } .gwch-alt-block-reverse .gwch-alt-img { order: -1; } .gwch-alt-img img { height: 240px; } .gwch-alt-container { gap: 48px; } }

        /* ─── NEIGHBORHOODS ─── */
        .gwch-neighborhoods-section { background: #fff; border-top: 1px solid var(--gwch-border); }
        .gwch-neighborhoods-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; max-width: 900px; margin: 40px auto 0; }
        .gwch-neighborhood-card { background: #fff; border-radius: 12px; overflow: hidden; border-bottom: 2px solid transparent; box-shadow: 0 2px 12px rgba(30,43,67,0.06); transition: all 0.3s; }
        .gwch-neighborhood-card[open] { border-bottom-color: var(--gwch-gold); }
        .gwch-neighborhood-summary { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 18px 22px; font-size: 16px; font-weight: 700; color: var(--gwch-navy); cursor: pointer; list-style: none; font-family: Georgia, serif; }
        .gwch-neighborhood-summary::-webkit-details-marker { display: none; }
        .gwch-neighborhood-summary:hover { background: rgba(188,145,85,0.04); }
        .gwch-summary-icon { color: var(--gwch-gold); flex-shrink: 0; transition: transform 0.3s; }
        .gwch-neighborhood-card[open] .gwch-summary-icon { transform: rotate(45deg); }
        .gwch-neighborhood-body { padding: 0 22px 20px; font-size: 15px; line-height: 1.78; color: var(--gwch-muted); margin: 0; }
        @media (max-width: 768px) { .gwch-neighborhoods-grid { grid-template-columns: 1fr; } }

        /* ─── PERMITTING ─── */
        .gwch-permitting-section { background: var(--gwch-cream); border-top: 1px solid var(--gwch-border); }

        /* ─── COSTS ─── */
        .gwch-costs-section { background: #fff; border-top: 1px solid var(--gwch-border); }
        .gwch-cost-h3 { font-family: Georgia, serif; font-size: 22px; font-weight: 700; color: var(--gwch-navy); margin: 40px 0 12px; }
        .gwch-cost-h3:first-of-type { margin-top: 32px; }
        .gwch-cost-table-wrap { overflow-x: auto; border-radius: 10px; box-shadow: 0 2px 8px rgba(30,43,67,0.06); }
        .gwch-cost-table { width: 100%; border-collapse: collapse; font-size: 15px; background: #fff; table-layout: fixed; border-radius: 10px; overflow: hidden; }
        .gwch-cost-table th { background: var(--gwch-navy); color: #fff; padding: 16px 24px; text-align: left; font-size: 13px; font-weight: 600; letter-spacing: 0.3px; }
        .gwch-cost-table td { padding: 14px 24px; border-bottom: 1px solid rgba(30,43,67,0.06); color: var(--gwch-muted); }
        .gwch-cost-table tr:last-child td { border-bottom: none; }
        .gwch-cost-table tr:nth-child(even) td { background: rgba(30,43,67,0.02); }
        .gwch-cost-table tr:hover td { background: rgba(188,145,85,0.06); }
        .gwch-td-price { font-family: 'Playfair Display', Georgia, serif; font-size: 16px; font-weight: 600; color: var(--gwch-gold); white-space: nowrap; }

        /* ─── SERVICES ─── */
        .nh-services-section { background: var(--gwch-cream); border-top: 1px solid var(--gwch-border); }
        .nh-services-inner { max-width: 1240px; margin: 0 auto; padding: 72px 40px; }
        .nh-services-header { text-align: center; margin-bottom: 48px; }
        @media (max-width: 768px) { .nh-services-inner { padding: 48px 20px; } }
        .nh-services-grid { display: flex; flex-wrap: wrap; gap: 32px; justify-content: center; }
        .nh-service-card { background: #fff; border-radius: 8px; overflow: hidden; border-bottom: 2px solid transparent; box-shadow: 0 2px 12px rgba(30,43,67,0.06), 0 1px 3px rgba(30,43,67,0.04); transition: all 0.35s cubic-bezier(0.4,0,0.2,1); display: flex; flex-direction: column; flex: 0 0 calc(33.333% - 22px); max-width: calc(33.333% - 22px); }
        .nh-service-card:hover { transform: translateY(-4px); border-bottom-color: var(--gwch-gold); box-shadow: 0 12px 28px rgba(30,43,67,0.1), 0 28px 56px rgba(30,43,67,0.12); }
        @media (max-width: 1024px) { .nh-service-card { flex: 0 0 calc(50% - 16px); max-width: calc(50% - 16px); } }
        @media (max-width: 600px) { .nh-service-card { flex: 0 0 100%; max-width: 100%; } }
        .nh-service-card-img { width: 100%; height: 180px; overflow: hidden; }
        .nh-service-card-img img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s; display: block; }
        .nh-service-card:hover .nh-service-card-img img { transform: scale(1.05); }
        .nh-service-card-body { padding: 28px 28px 32px; flex: 1; display: flex; flex-direction: column; text-align: center; }
        .nh-service-card-body h3 { font-family: 'Playfair Display', Georgia, serif; font-size: 22px; margin-bottom: 12px; color: var(--gwch-navy); font-weight: 700; line-height: 1.25; }
        .nh-service-card-body h3 a { color: inherit; text-decoration: none; }
        .nh-service-card-body h3 a:hover { color: var(--gwch-gold); }
        .nh-service-card-body p { font-size: 15px; color: var(--gwch-muted); line-height: 1.7; flex: 1; margin-bottom: 20px; }
        .nh-service-meta { display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 20px; justify-content: center; }
        .nh-service-badge { display: inline-flex; align-items: center; gap: 6px; font-size: 12px; font-weight: 600; color: var(--gwch-gold-dark); background: rgba(188,145,85,0.1); padding: 6px 14px; border-radius: 999px; letter-spacing: 0.3px; }
        .nh-service-badge svg { width: 14px; height: 14px; stroke: var(--gwch-gold); fill: none; stroke-width: 2; }
        .nh-service-link { display: inline-flex; align-items: center; justify-content: center; gap: 6px; font-size: 14px; font-weight: 600; color: var(--gwch-gold); text-decoration: none; transition: gap 0.3s; margin-top: auto; }
        .nh-service-link:hover { gap: 10px; }
        .nh-service-link svg { width: 14px; height: 14px; }
        .nh-services-toggle-wrap { width: 100%; text-align: center; margin-top: 48px; }
        .nh-services-toggle-btn { display: inline-flex; align-items: center; gap: 8px; background: none; border: 2px solid var(--gwch-gold); color: var(--gwch-gold); padding: 12px 32px; border-radius: 6px; font-size: 14px; font-weight: 600; cursor: pointer; transition: all 0.3s; letter-spacing: 0.3px; }
        .nh-services-toggle-btn:hover { background: var(--gwch-gold); color: #fff; }
        .nh-services-toggle-btn svg { transition: transform 0.3s; }
        .nh-services-toggle-btn.open svg { transform: rotate(180deg); }
        .nh-services-more { display: none; margin-top: 32px; }
        .nh-services-more.show { display: block; }

        /* ─── EXPECT / WORKING WITH US ─── */
        .gwch-expect-section { background: #fff; border-top: 1px solid var(--gwch-border); }

        /* ─── FAQ ─── */
        .gwch-faq-section { background: #fff; border-top: 1px solid var(--gwch-border); }
        .gwch-faq-list { display: flex; flex-direction: column; gap: 12px; max-width: 800px; margin: 0 auto; }
        .gwch-faq-item { border: 1px solid rgba(30,43,67,0.1); border-radius: 8px; overflow: hidden; transition: border-color 0.2s; }
        .gwch-faq-item[open] { border-color: var(--gwch-gold); }
        .gwch-faq-summary { display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 18px 24px; font-size: 16px; font-weight: 600; color: var(--gwch-navy); cursor: pointer; list-style: none; }
        .gwch-faq-summary::-webkit-details-marker { display: none; }
        .gwch-faq-summary:hover { background: rgba(188,145,85,0.04); }
        .gwch-faq-icon { color: var(--gwch-gold); flex-shrink: 0; transition: transform 0.3s; }
        .gwch-faq-item[open] .gwch-faq-icon { transform: rotate(180deg); }
        .gwch-faq-answer { padding: 0 24px 18px; font-size: 15px; line-height: 1.78; color: var(--gwch-muted); margin: 0; }

        /* ─── NEARBY AREAS ─── */
        .nh-nearby-section { background: #fff; padding: 80px 40px; border-top: 1px solid var(--gwch-border); }
        .nh-nearby-inner { max-width: 1200px; margin: 0 auto; }
        .nh-nearby-header { text-align: center; margin-bottom: 48px; }
        .nh-nearby-header .gwch-h2 strong { color: var(--gwch-gold); font-style: italic; }
        .nh-nearby-subtitle { font-size: 16px; color: var(--gwch-muted); line-height: 1.8; max-width: 640px; margin: 0 auto; }
        .nh-nearby-card-wrap { max-width: 820px; margin: 0 auto; }
        .nh-nearby-card { background: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 12px rgba(30,43,67,0.06), 0 1px 3px rgba(30,43,67,0.04); }
        .nh-nearby-card-img { width: 100%; height: 220px; overflow: hidden; }
        .nh-nearby-card-img img { width: 100%; height: 100%; object-fit: cover; object-position: top; display: block; }
        .nh-nearby-card-body { padding: 28px 28px 32px; text-align: center; }
        .nh-nearby-card-body h3 { font-family: 'Playfair Display', Georgia, serif; font-size: 24px; font-weight: 700; color: var(--gwch-navy); margin: 0 0 6px; }
        .nh-nearby-phone { font-size: 15px; color: var(--gwch-muted); margin-bottom: 14px; }
        .nh-nearby-phone a { color: var(--gwch-gold); font-weight: 600; text-decoration: none; }
        .nh-nearby-phone a:hover { text-decoration: underline; }
        .nh-nearby-desc { font-size: 14px; line-height: 1.7; color: var(--gwch-muted); margin-bottom: 18px; padding-bottom: 18px; border-bottom: 1px solid rgba(30,43,67,0.06); }
        .nh-nearby-towns { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; margin-bottom: 16px; }
        .nh-nearby-town { font-size: 11px; font-weight: 600; color: var(--gwch-navy); background: var(--gwch-cream); padding: 7px 10px; border-radius: 50px; text-align: center; letter-spacing: 0.2px; white-space: nowrap; text-decoration: none; display: block; }
        .nh-nearby-town-link { transition: background 0.2s, color 0.2s; }
        .nh-nearby-town-link:hover { background: var(--gwch-gold); color: #fff; }
        .nh-nearby-town-active { background: rgba(188,145,85,0.15); color: var(--gwch-gold-dark); }
        .nh-nearby-towns-more { display: none; grid-template-columns: repeat(4, 1fr); gap: 8px; grid-column: 1 / -1; }
        .nh-nearby-towns-more.show { display: grid; }
        .nh-nearby-toggle { grid-column: 1 / -1; margin-top: 4px; background: none; border: none; color: var(--gwch-gold); font-size: 13px; font-weight: 600; cursor: pointer; padding: 4px 0; transition: color 0.2s; text-align: center; }
        .nh-nearby-toggle:hover { color: var(--gwch-gold-dark); }
        .nh-nearby-link { display: inline-flex; align-items: center; gap: 6px; margin-top: 4px; color: var(--gwch-gold); font-size: 14px; font-weight: 600; text-decoration: none; transition: gap 0.3s; justify-content: center; }
        .nh-nearby-link:hover { gap: 10px; }
        @media (max-width: 768px) { .nh-nearby-section { padding: 48px 20px; } .nh-nearby-towns, .nh-nearby-towns-more { grid-template-columns: repeat(3, 1fr); } .nh-nearby-card-body { padding: 20px 20px 24px; } }

        /* ─── TRUST STRIP ─── */
        .gwch-trust-strip { position: relative; overflow: hidden; background: linear-gradient(135deg, #1e2b43 0%, #151e30 100%); padding: 56px 40px; }
        .gwch-trust-strip-bg { position: absolute; inset: 0; background: url('/hero/builtwell-job-site-aerial-hero-ct.jpg') center/cover; opacity: 0.12; }
        .gwch-trust-strip-inner { position: relative; z-index: 1; max-width: 1200px; margin: 0 auto; display: flex; flex-wrap: wrap; align-items: center; justify-content: center; gap: 0; }
        .gwch-trust-strip-item-wrap { display: contents; }
        .gwch-trust-strip-item { display: flex; align-items: center; gap: 10px; padding: 20px 32px; min-width: 180px; flex: 1; flex-direction: column; text-align: center; color: rgba(255,255,255,0.9); transition: all 0.3s; cursor: default; }
        .gwch-trust-strip-item:hover { transform: translateY(-2px); color: var(--gwch-gold); }
        .gwch-trust-strip-icon { color: var(--gwch-gold); }
        .gwch-trust-strip-text { display: flex; flex-direction: column; gap: 2px; }
        .gwch-trust-strip-label { font-size: 11px; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; color: rgba(255,255,255,0.6); }
        .gwch-trust-strip-value { font-size: 14px; font-weight: 700; }
        .gwch-trust-divider { width: 1px; height: 40px; background: rgba(255,255,255,0.1); display: none; }
        @media (min-width: 1024px) { .gwch-trust-divider { display: block; } }
        @media (max-width: 768px) { .gwch-trust-strip { padding: 40px 20px; } }

        /* ─── OFFICE ─── */
        .gwch-office-section { background: var(--gwch-oxford); padding: 72px 40px 0; position: relative; }
        .gwch-office-inner { max-width: 1200px; margin: 0 auto; }
        .gwch-office-grid { display: grid; grid-template-columns: 1fr 1.2fr; gap: 48px; align-items: start; padding-bottom: 72px; }
        @media (max-width: 900px) { .gwch-office-grid { grid-template-columns: 1fr; gap: 24px; padding-bottom: 48px; } }
        .gwch-office-details { display: flex; flex-direction: column; gap: 0; }
        .gwch-office-detail-item { display: grid; grid-template-columns: 42px 1fr; gap: 16px; align-items: start; padding: 18px 0; border-bottom: 1px solid rgba(255,255,255,0.07); }
        .gwch-office-detail-item:last-of-type { border-bottom: none; }
        .gwch-office-detail-icon { width: 42px; height: 42px; background: rgba(188,145,85,0.1); border: 1px solid rgba(188,145,85,0.18); border-radius: 10px; display: flex; align-items: center; justify-content: center; color: var(--gwch-gold); flex-shrink: 0; }
        .gwch-office-detail-text h4 { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.2px; margin-bottom: 4px; color: var(--gwch-gold); }
        .gwch-office-detail-text p { font-size: 15px; color: rgba(255,255,255,0.7); line-height: 1.6; margin: 0 0 2px; }
        .gwch-office-detail-text a { color: #fff; font-weight: 600; transition: color 0.2s; }
        .gwch-office-detail-text a:hover { color: var(--gwch-gold); }
        .gwch-hours-table { display: grid; gap: 4px; }
        .gwch-hours-row { display: grid; grid-template-columns: 140px 1fr; font-size: 14px; color: rgba(255,255,255,0.55); }
        .gwch-hours-day { font-weight: 600; color: rgba(255,255,255,0.85); }
        .gwch-office-map { border-radius: 12px; overflow: hidden; min-height: 380px; box-shadow: 0 12px 40px rgba(0,0,0,0.25); }
        @media (max-width: 768px) { .gwch-office-section { padding: 48px 20px 0; } .gwch-office-map { min-height: 280px; } .gwch-hours-row { grid-template-columns: 110px 1fr; } }

        /* ─── CTA / FORM ─── */
        .gwch-cta-section { background: var(--gwch-cream); padding: 64px 40px 72px; border-top: 1px solid var(--gwch-border); }
        .gwch-cta-section-inner { max-width: 1200px; margin: 0 auto; }
        .gwch-cta-header { margin-bottom: 32px; text-align: center; }
        .gwch-cta-header .gwch-h2 { margin-bottom: 8px; }
        .gwch-cta-sub { font-size: 16px; color: var(--gwch-muted); line-height: 1.7; max-width: 600px; margin: 0 auto; }
        .gwch-cta-body { display: grid; grid-template-columns: 1fr 1.15fr; gap: 32px; align-items: stretch; }
        @media (max-width: 900px) { .gwch-cta-body { grid-template-columns: 1fr; } .gwch-cta-section { padding: 48px 20px 56px; } }
        .gwch-cta-left { display: flex; flex-direction: column; gap: 16px; }
        .gwch-cta-images { display: flex; flex-direction: column; gap: 12px; flex: 1; }
        .gwch-cta-img-wrap { position: relative; border-radius: 8px; overflow: hidden; flex: 1; min-height: 180px; }
        .gwch-cta-img-wrap img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .gwch-contact-form-wrap { background: #fff; border-radius: 10px; padding: 32px 36px; border: 1px solid var(--gwch-border); box-shadow: 0 16px 48px rgba(30,43,67,0.1), 0 4px 12px rgba(30,43,67,0.04); display: flex; flex-direction: column; }
        @media (max-width: 768px) { .gwch-contact-form-wrap { padding: 24px 18px; } }
        .gwch-form-group { margin-bottom: 16px; }
        .gwch-form-group label, .gwch-form-legend { display: block; font-size: 13px; font-weight: 600; color: var(--gwch-navy); margin-bottom: 6px; text-transform: uppercase; letter-spacing: 0.5px; }
        .gwch-form-group input, .gwch-form-group select, .gwch-form-group textarea { width: 100%; padding: 12px 14px; border: 1px solid rgba(30,43,67,0.15); border-radius: 6px; font-size: 15px; color: var(--gwch-navy); background: #fff; transition: border-color 0.2s; -webkit-appearance: none; appearance: none; box-sizing: border-box; }
        .gwch-form-group textarea { resize: vertical; min-height: 120px; line-height: 1.6; }
        .gwch-form-group input:focus, .gwch-form-group select:focus, .gwch-form-group textarea:focus { outline: none; border-color: var(--gwch-gold); }
        .gwch-form-row { display: grid; gap: 16px; margin-bottom: 0; }
        .gwch-form-row-4 { grid-template-columns: repeat(2, 1fr); }
        .gwch-form-row-3 { grid-template-columns: repeat(2, 1fr); }
        @media (max-width: 768px) { .gwch-form-row-4, .gwch-form-row-3 { grid-template-columns: 1fr; } }
        .gwch-form-radio-group { display: flex; gap: 10px; flex-wrap: nowrap; }
        .gwch-form-radio-group label { display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 500; text-transform: none; letter-spacing: 0; cursor: pointer; padding: 12px 14px; border-radius: 6px; border: 2px solid rgba(30,43,67,0.12); background: #fff; transition: border-color 0.2s, background 0.2s; flex: 1; text-align: center; }
        .gwch-form-radio-group label:hover { border-color: var(--gwch-gold); }
        .gwch-form-radio-group input[type="radio"] { display: none !important; }
        .gwch-form-radio-group label:has(input:checked) { border-color: var(--gwch-gold); background: rgba(188,145,85,0.06); }
        .gwch-form-consent { margin: 12px 0 16px; }
        .gwch-form-consent label { display: flex; align-items: flex-start; gap: 10px; font-size: 13px; line-height: 1.5; color: #6b7280; cursor: pointer; }
        .gwch-form-consent input[type="checkbox"] { margin-top: 3px; accent-color: var(--gwch-gold); min-width: 16px; }
        .gwch-form-submit { width: 100%; min-height: 52px; padding: 14px 20px; background: var(--gwch-gold); color: #fff; border: none; border-radius: 8px; font-size: 15px; font-weight: 600; cursor: pointer; transition: background 0.2s; }
        .gwch-form-submit:hover { background: var(--gwch-gold-dark); transform: translateY(-1px); box-shadow: 0 4px 12px rgba(188,145,85,0.3); }
        .gwch-form-note { font-size: 13px; color: var(--gwch-muted); text-align: center; margin-top: 16px; font-style: italic; }
      `}</style>
    </div>
  );
}

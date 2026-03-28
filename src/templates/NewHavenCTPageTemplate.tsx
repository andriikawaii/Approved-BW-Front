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

export function NewHavenCTPageTemplate({ page: _page }: { page: CMSPage }) { // eslint-disable-line @typescript-eslint/no-unused-vars
  const [servicesOpen, setServicesOpen] = useState(false);

  const primaryServices = [
    { title: 'Kitchen Remodeling in New Haven, CT', href: '/kitchen-remodeling/new-haven-ct/', img: '/services/kitchen-remodeling-ct.jpg', desc: "Full kitchen renovations in New Haven's pre-war housing stock, including structural assessment for load-bearing walls, cabinetry, countertops, and electrical upgrades.", price: '$25K-$150K+', time: '6-12 weeks' },
    { title: 'Bathroom Remodeling in New Haven, CT', href: '/bathroom-remodeling/new-haven-ct/', img: '/services/bathroom-remodeling-ct.jpg', desc: 'Complete bathroom renovations in New Haven including tile, vanities, showers, tubs, plumbing upgrades, and steam system coordination where needed.', price: '$15K-$80K+', time: '3-6 weeks' },
    { title: 'Basement Finishing in New Haven, CT', href: '/basement-finishing/new-haven-ct/', img: '/services/basement-finishing-ct.jpg', desc: 'Convert unfinished basements into living space in New Haven with proper moisture assessment, stone foundation work, and egress windows as required.', price: '$25K-$100K+', time: '4-8 weeks' },
    { title: 'Flooring in New Haven, CT', href: '/flooring/new-haven-ct/', img: '/services/flooring-installation-ct.jpg', desc: 'Hardwood, LVP, tile, and engineered wood for New Haven homes. We assess original floors before recommending replacement and refinish where the wood is worth keeping.', price: '$6-$25/sq ft', time: '2-5 days' },
    { title: 'Home Additions in New Haven, CT', href: '/home-additions/', img: '/services/home-additions-ct.jpg', desc: 'Single-story and second-story additions, sunrooms, and bump-outs with full structural work for New Haven properties.', price: '$150-$400/sq ft', time: '8-16 weeks' },
    { title: 'Interior Painting in New Haven, CT', href: '/interior-painting/', img: '/services/interior-painting-ct.jpg', desc: 'Walls, ceilings, trim, doors, and built-ins with professional-grade paints and proper prep for New Haven homes.', price: '$3-$6/sq ft', time: '2-5 days' },
  ];

  const moreServices = [
    { title: 'Interior Carpentry in New Haven, CT', href: '/interior-carpentry/', img: '/services/interior-carpentry-ct.jpg', desc: 'Custom millwork, built-in cabinetry, wainscoting, crown molding, coffered ceilings, closet systems, and finish trim for New Haven residences.', price: '$75-$150/hr', time: 'Varies' },
    { title: 'Attic Conversions in New Haven, CT', href: '/attic-conversions/', img: '/services/attic-conversions-ct.jpg', desc: 'Converting unfinished attics in New Haven into bedrooms, offices, or playrooms with structural assessment through final finish.', price: '$50K-$150K', time: '6-12 weeks' },
    { title: 'Decks and Porches in New Haven, CT', href: '/decks-porches/', img: '/services/decks-porches-ct.jpg', desc: 'Pressure-treated lumber, composite, and hardwood for New Haven outdoor spaces. Covered porches, screened-in structures, pergolas, and multi-level decks.', price: '$15K-$75K', time: '2-4 weeks' },
    { title: 'Design and Planning in New Haven, CT', href: '/remodeling-design-planning/', img: '/services/design-planning-ct.jpg', desc: 'Space planning, material selection, finish coordination, and project documentation for New Haven remodeling projects before construction begins.', price: '$2.5K-$15K', time: '2-6 weeks' },
    { title: 'Comfort and Accessibility in New Haven, CT', href: '/comfort-accessibility-remodeling/', img: '/services/comfort-accessibility-ct.jpg', desc: 'Grab bars, roll-in showers, wider doorways, ramp installation, and first-floor adaptations for New Haven homeowners of all ages and abilities.', price: '$5K-$50K', time: '1-4 weeks' },
    { title: 'Insurance Reconstruction in New Haven, CT', href: '/insurance-restoration/', img: '/portfolio/builtwell-contractor-handshake-arrival-ct-optimized.jpg', desc: 'Rebuilding New Haven homes after fire, water, and storm damage. Full reconstruction working directly with your insurance carrier.', price: '$25K-$250K+', time: '4-16 weeks' },
  ];

  const neighborhoods = [
    { name: 'East Rock', body: "East Rock is one of New Haven's most architecturally rich neighborhoods, with a dense mix of Victorian-era homes, Craftsman bungalows, and early 20th-century colonials on narrow lots. Homes here frequently have original plaster walls, hardwood floors in excellent condition, and exterior details worth preserving — decorative trim, front porches, bay windows, and period millwork. Renovation in East Rock often focuses on kitchen and bathroom updates that modernize function while respecting the home's original character. Lead paint and knob-and-tube wiring are common in this neighborhood's construction era and require proper assessment before work begins." },
    { name: 'Westville', body: "Westville has a strong inventory of early to mid-20th century Tudors, colonials, and bungalows with mature landscaping and well-maintained character. Kitchens and bathrooms in these homes were typically last updated in the 1970s and 1980s and are common renovation candidates. The homes in Westville were built with better materials than postwar suburban construction — solid wood framing, plaster walls, and original hardwood throughout — and renovations here often prioritize preserving those qualities while bringing systems up to current standards. Electrical upgrades from original 60-amp or 100-amp service are standard in major renovation projects in this area." },
    { name: 'Wooster Square', body: "Wooster Square contains some of New Haven's oldest residential housing stock, including Federal and Italianate-style homes from the 1800s alongside later colonial and triple-decker construction. The historic character of the neighborhood and proximity to the Wooster Square Historic District means some exterior modifications may require review. Interior renovations here tend to involve careful work around original features — wide-plank floors, plaster medallions, original door hardware, and detailed millwork that homeowners want to preserve. Balloon framing, common in pre-1940 construction, requires different approach to structural work than platform framing found in postwar homes." },
    { name: 'Edgewood', body: "Edgewood offers a mix of early 20th-century housing types including colonials, Capes, and triple-deckers, with a neighborhood character distinct from both the Yale-area historic districts and the postwar suburban stock. Renovation projects in Edgewood frequently involve basement finishing, kitchen remodeling, and exterior work including porch repair and restoration. The mix of owner-occupied homes and rental properties in the neighborhood means condition varies significantly from one property to the next. Structural and systems assessment during the consultation phase is particularly important in Edgewood to scope projects accurately." },
    { name: 'Beaver Hills', body: "Beaver Hills features a tight collection of 1920s and 1930s colonials and Tudors with arched doorways, coved ceilings, and distinctive architectural details characteristic of that period. Kitchens in these homes are typically the original galley layouts with limited cabinet space and original tile that homeowners want replaced. The Tudor and colonial construction in Beaver Hills is generally solid and well-suited for renovation — the framing, masonry, and original windows are typically in good condition even in homes that have not been updated in decades. Electrical panels from this era are frequently 60-amp service that requires full replacement during major renovation." },
    { name: 'Fair Haven', body: "Fair Haven contains a mix of multi-family housing and single-family homes ranging from late 19th-century through mid-20th century construction. The neighborhood's housing density and mix of property types means renovation scopes vary widely, from single-unit bathroom and kitchen updates in single-family homes to multi-unit capital improvements. Older construction in Fair Haven commonly includes original balloon framing, masonry foundations, and original plumbing that predates modern supply materials. Projects here require careful assessment of what is behind the walls before scoping, as conditions in similarly aged homes can vary significantly based on maintenance history and previous renovation work." },
  ];

  const faqItems = [
    { q: 'How much does a kitchen remodel cost in New Haven, CT?', a: "A kitchen remodel in New Haven, CT typically costs $30,000 to $55,000 for a mid-range renovation with new cabinets, countertops, and flooring. High-end custom kitchens with layout changes run $80,000 to $150,000+. New Haven's older housing stock — particularly Victorian-era and early 20th-century homes — often involves additional scope: upgrading original 60-amp or 100-amp electrical service, replacing galvanized supply lines, and addressing lead paint or knob-and-tube wiring during demolition. These are standard scope items in New Haven renovation, not surprises, and belong in the original estimate. We provide detailed pricing during your free consultation so the number reflects your actual home and kitchen." },
    { q: 'What are common renovation challenges in older New Haven homes?', a: "New Haven's pre-1940 housing stock presents specific renovation challenges that newer homes do not. Balloon framing — used in homes built before the 1940s — differs structurally from modern platform framing, which affects how structural work is planned and executed. Plaster walls are more difficult to open and repair than drywall. Knob-and-tube wiring is not compatible with modern electrical loads and requires full replacement during major renovation. Original galvanized steel supply lines have a finite lifespan and commonly need replacement in kitchen and bathroom projects. Lead paint is present in virtually all pre-1978 construction and requires lead-safe work practices under EPA RRP rules. None of these conditions prevent renovation — they are simply conditions that an experienced contractor anticipates and accounts for in the project scope from the start." },
    { q: 'Can I finish the basement in my New Haven home?', a: "Most basements in New Haven homes can be finished, though ceiling height and moisture conditions will determine what the space can realistically become. Basement finishing in New Haven typically costs $25,000 to $50,000 for a standard 400 to 600 square foot space. Older homes in New Haven frequently have stone or block foundations rather than poured concrete, which affects moisture management options. We assess the foundation type, moisture conditions, and ceiling height during the consultation and recommend whether interior drainage, waterproofing membrane, or vapor barrier systems are needed before framing begins. We can typically work within ceiling heights of 7 feet or more to create usable living space." },
    { q: 'How long does a renovation project take in New Haven, CT?', a: "A kitchen or bathroom renovation in New Haven typically takes 4 to 10 weeks of active construction depending on scope. Projects involving structural changes, plumbing reconfiguration, or full electrical upgrades take longer than cosmetic updates. Full home renovations run 3 to 6 months. Permit turnaround from the New Haven Building Department is typically 3 to 6 weeks for residential projects. We build the permit timeline into the project schedule during planning so your start date is realistic. Projects in historic districts may require additional review, which we account for during the planning phase." },
    { q: 'Does BuiltWell handle permits for remodeling in New Haven, CT?', a: "Yes, we handle all permit applications and inspection coordination for every remodeling project we take on in New Haven. The New Haven Building Department requires permits for any work involving structural changes, electrical modifications, plumbing, or mechanical systems. We prepare and submit all required documentation, schedule inspections at each phase of the project, and ensure the work passes inspection before moving to the next stage. For properties in or near historic districts, we identify review requirements during the consultation and coordinate with the appropriate approval bodies. You do not need to visit the Building Department or manage inspections yourself. We hold CT HIC License #0668405, which is required for residential construction in Connecticut." },
    { q: 'How do I start an insurance reconstruction project in New Haven, CT?', a: "Starting an insurance reconstruction project in New Haven begins with filing your claim with your homeowner's insurance carrier and having an adjuster assess the damage. Once your claim is open, we document the full scope of damage, provide detailed rebuild estimates, and coordinate directly with your carrier. We work with State Farm, Liberty Mutual, Travelers, The Hartford, and other carriers common in New Haven County. We handle supplemental documentation when the initial adjuster estimate does not cover the full rebuild scope — which is common on fire and water damage projects in older homes where hidden damage is discovered during demolition. We bill your insurance company directly. Our office is in Orange, a short drive from New Haven, and we hold CT HIC License #0668405." },
    { q: 'What should I know about renovating a Victorian-era home in New Haven?', a: "Renovating a Victorian-era home in New Haven involves specific considerations that do not apply to postwar construction. These homes were built with balloon framing, plaster walls, original hardwood floors (often in excellent condition under carpet), and decorative millwork that adds significant character. Lead paint is present in virtually all pre-1940 homes and requires EPA RRP-compliant lead-safe work practices during renovation. Knob-and-tube wiring must be replaced before walls are closed. Original plumbing in cast iron drain lines and galvanized supply lines is often worth replacing rather than repairing during a major renovation. Exterior details — decorative trim, bay windows, front porches — are costly to repair but worth preserving. We assess all of these conditions during the consultation and build them into the project scope so the budget reflects the actual work the home requires." },
  ];

  const primaryTowns = [
    { name: 'Orange', href: '/new-haven-county/orange-ct/' },
    { name: 'New Haven', href: null, highlight: true },
    { name: 'Hamden', href: '/new-haven-county/' },
    { name: 'Branford', href: '/new-haven-county/' },
    { name: 'Guilford', href: '/new-haven-county/' },
    { name: 'Madison', href: '/new-haven-county/madison-ct/' },
    { name: 'Woodbridge', href: '/new-haven-county/' },
    { name: 'Milford', href: '/new-haven-county/' },
    { name: 'Cheshire', href: null },
  ];

  const moreTowns = ['Ansonia', 'Beacon Falls', 'Bethany', 'Derby', 'East Haven', 'Meriden', 'Middlebury', 'Naugatuck', 'North Branford', 'North Haven', 'Oxford', 'Prospect', 'Seymour', 'Southbury', 'Wallingford', 'Waterbury', 'West Haven', 'Wolcott'];

  return (
    <div className="gwch-page">
      <main id="main">

        {/* ── 1. HERO ── */}
        <section className="gwch-page-hero gwch-page-hero-nh">
          <div className="gwch-hero-bg gwch-hero-bg-nh" />
          <div className="gwch-hero-gradient" />
          <div className="gwch-hero-inner">
            <ol className="gwch-breadcrumb">
              <li><Link href="/">Home</Link></li>
              <li aria-hidden="true" className="gwch-bc-sep">›</li>
              <li><Link href="/areas-we-serve/">Areas We Serve</Link></li>
              <li aria-hidden="true" className="gwch-bc-sep">›</li>
              <li><Link href="/new-haven-county/">New Haven County</Link></li>
              <li aria-hidden="true" className="gwch-bc-sep">›</li>
              <li><span className="gwch-bc-current">New Haven, CT</span></li>
            </ol>
            <h1 className="gwch-hero-h1">
              Home Remodeling in New Haven, <span className="gwch-gold">CT</span>
            </h1>
            <p className="gwch-hero-sub">
              Kitchens, bathrooms, basements, and full renovations for New Haven homes. Licensed and insured, serving from our Orange headquarters.
            </p>
            <div className="gwch-hero-ctas">
              <Link href="#contact" className="gwch-cta-btn gwch-cta-primary">Get Your Free Estimate</Link>
              <a href="tel:2034669148" className="gwch-cta-btn">New Haven: (203) 466-9148</a>
              <a href="tel:2039199616" className="gwch-cta-btn">Fairfield: (203) 919-9616</a>
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
                <SectionLabel text="New Haven Remodeling" />
                <h2 className="gwch-h2">Professional Home Remodeling in <strong>New Haven, CT</strong></h2>
              </div>
              <p className="gwch-intro-body">
                New Haven has one of the most diverse and historically significant housing stocks in Connecticut. Over 40% of homes in the city were built before 1940, including Victorian-era residences, Federal and Italianate colonials, Craftsman bungalows, early 20th-century Tudors, and multi-family properties across a wide range of neighborhoods. Each building era brings specific construction patterns — balloon framing, plaster walls, knob-and-tube wiring, galvanized plumbing — that require a contractor who knows what to anticipate before a wall is opened.
              </p>
              <p className="gwch-intro-body" style={{ marginTop: 16 }}>
                BuiltWell CT provides full-scope home remodeling in New Haven including kitchens, bathrooms, basements, flooring, additions, interior carpentry, painting, decks, attic conversions, and accessibility modifications. We operate from our office at 206A Boston Post Road in Orange — about 15 minutes from New Haven — and handle every project with our in-house team. We hold CT HIC License #0668405 and serve New Haven as part of our work across{' '}
                <Link href="/new-haven-county/" className="gwch-inline-link">New Haven County</Link>.
              </p>
            </FadeUp>
            <FadeUp delay={100}>
              <div style={{ margin: '32px 0', borderRadius: 10, overflow: 'hidden', boxShadow: '0 12px 40px rgba(30,43,67,0.12)' }}>
                <img src="/images/areas/new-haven-ct-neighborhood.jpg" alt="Historic residential street in New Haven CT with Victorian homes served by BuiltWell" loading="lazy" style={{ width: '100%', height: 360, objectFit: 'cover', display: 'block' }} />
              </div>
              <p className="gwch-intro-body">
                New Haven homeowners deal with renovation conditions that are different from what you encounter in postwar suburban towns. The homes are older, the construction methods are different, and the character of the architecture is worth preserving — not something to be stripped out and replaced with builder-grade materials. We understand the difference between a home that deserves careful restoration and one that needs a full system upgrade.
              </p>
              <p className="gwch-intro-body" style={{ marginTop: 16 }}>
                Whether you are updating a kitchen in an East Rock Victorian, finishing a basement in a Westville colonial, or doing a full renovation in a Wooster Square triple-decker, we bring the same approach: honest assessment up front, clear scope in writing, and work that holds up.
              </p>
            </FadeUp>
          </div>
        </section>

        {/* ── 4. HOUSING STOCK BANNER ── */}
        <section className="gwch-housing-banner gwch-housing-banner-nh">
          <div className="gwch-housing-bg gwch-housing-bg-nh" />
          <div className="gwch-housing-gradient" />
          <div className="gwch-housing-inner">
            <FadeUp>
              <SectionLabel text="Housing Stock" dark />
              <h2 className="gwch-h2 gwch-text-white">
                New Haven Homes and What <strong>They Require</strong>
              </h2>
              <p className="gwch-housing-body">
                New Haven&apos;s housing stock is older, denser, and more architecturally varied than most Connecticut towns. Victorian-era and early 20th-century homes are the majority in established neighborhoods like East Rock, Westville, and Wooster Square. These homes were built well for their era but require an experienced contractor who knows what conditions to expect — and how to handle them properly.
              </p>
            </FadeUp>
          </div>
        </section>

        {/* ── 5. ALTERNATING BLOCKS ── */}
        <section className="gwch-alt-section">
          <div className="gwch-alt-container">
            <FadeUp>
              <div className="gwch-alt-block">
                <div className="gwch-alt-img">
                  <img src="/images/areas/new-haven-ct-victorian-home.jpg" alt="Victorian-era home in New Haven CT typical of East Rock and Wooster Square neighborhoods" />
                </div>
                <div className="gwch-alt-content">
                  <h3 className="gwch-h3">Victorian, Colonial, and Pre-War Housing Stock</h3>
                  <p className="gwch-body-text">
                    The majority of New Haven&apos;s residential neighborhoods were developed from the mid-1800s through the 1930s. This means the housing stock is defined by Victorian-era residences, Federal and Italianate colonials, early 20th-century Craftsman bungalows, and Tudors with arched doorways and coved ceilings. These homes have real character — original hardwood floors, plaster walls, decorative millwork, and architectural details that postwar construction does not replicate.
                  </p>
                  <p className="gwch-body-text">
                    Renovating these homes requires more than replacing surfaces. The systems — electrical, plumbing, and insulation — predate modern standards and typically need full replacement during major renovation. The construction methods — balloon framing, plaster over lath, knob-and-tube wiring — require different techniques than what works in newer construction. We renovate pre-war homes regularly and know what to expect when we open these walls.
                  </p>
                </div>
              </div>
            </FadeUp>
            <FadeUp delay={60}>
              <div className="gwch-alt-block">
                <div className="gwch-alt-content">
                  <h3 className="gwch-h3">What We Find When We Open the Walls</h3>
                  <p className="gwch-body-text">
                    Homes built in New Haven before 1940 commonly contain knob-and-tube wiring, galvanized steel supply lines, cast iron drain lines, 9x9 floor tiles that may contain asbestos, and in some cases, lead paint on virtually every surface. None of this prevents renovation. It simply requires a contractor who assesses these conditions before scoping the project and builds them into the estimate from the start — not as change orders discovered after demolition begins.
                  </p>
                  <p className="gwch-body-text">
                    We conduct a thorough assessment during the initial consultation so you understand exactly what the project involves before any contract is signed. If abatement is required, we coordinate with certified environmental firms. If the electrical panel needs full replacement, it is in the original scope. If galvanized plumbing needs to come out, we plan for it upfront.
                  </p>
                </div>
                <div className="gwch-alt-img">
                  <img src="/images/areas/basement-finishing-framing-ct-01.jpeg" alt="Basement framing and structural work in a Connecticut home renovation" />
                </div>
              </div>
            </FadeUp>
            <FadeUp delay={120}>
              <div className="gwch-alt-block">
                <div className="gwch-alt-img">
                  <img src="/portfolio/builtwell-team-office-exterior-ct.jpg" alt="BuiltWell CT headquarters at 206A Boston Post Road Orange CT" />
                </div>
                <div className="gwch-alt-content">
                  <h3 className="gwch-h3">Local Team, Familiar Territory</h3>
                  <p className="gwch-body-text">
                    Our office is in Orange at 206A Boston Post Road — about 15 minutes from New Haven. We work in New Haven regularly and know the building department&apos;s permit process, the neighborhood conditions, and the construction patterns of the housing stock across the city&apos;s different areas. East Rock Victorians, Westville colonials, Fair Haven multi-families, and Wooster Square historic district properties each have their own renovation context, and we bring that knowledge to every project.
                  </p>
                  <p className="gwch-body-text">
                    That proximity matters for project management and accountability. When something comes up during construction, you are not waiting for a contractor who is an hour away. We are a short drive from your property, our crew is in New Haven regularly, and our phone is answered by the same people managing your project.
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
                <h2 className="gwch-h2">New Haven Neighborhoods: What They Mean for <strong>Your Remodeling Project</strong></h2>
                <p className="gwch-section-subtitle">
                  New Haven&apos;s neighborhoods were developed across different periods and in different architectural styles, and each area has specific construction patterns that shape what renovation work involves.
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
              <div className="gwch-section-header" style={{ textAlign: 'left' }}>
                <SectionLabel text="Permits and Approvals" />
                <h2 className="gwch-h2">Permitting and Approvals in <strong>New Haven, CT</strong></h2>
              </div>
              <p className="gwch-body-text">
                All building permits in New Haven are issued through the New Haven Building Department at City Hall. Permit turnaround for residential remodeling projects typically runs three to six weeks depending on scope and project volume. Required documentation includes scaled drawings, a scope of work description, contractor license verification, and property information. Any project involving structural changes, electrical work, plumbing modifications, or mechanical system alterations requires a permit. Kitchen and bathroom remodels that move plumbing or add circuits require separate trade permits for electrical and plumbing in addition to the building permit. We handle all permit applications, plan submissions, and inspection coordination as part of every project in New Haven.
              </p>
              <h3 className="gwch-h3" style={{ marginTop: 32 }}>Historic Districts</h3>
              <p className="gwch-body-text">
                New Haven has several designated historic districts, including portions of Wooster Square, East Rock, and the area surrounding the Green. Properties within or adjacent to these districts may require review by the New Haven Historic District Commission for exterior modifications, additions, and work that affects the character of the building or streetscape. We identify historic district status and applicable review requirements during the consultation phase and coordinate any required applications before construction begins.
              </p>
              <h3 className="gwch-h3" style={{ marginTop: 32 }}>Zoning and Multi-Family Properties</h3>
              <p className="gwch-body-text">
                New Haven&apos;s zoning ordinance governs setbacks, lot coverage, building height, and permitted uses across the city&apos;s residential zones. Multi-family properties — common in New Haven — may have additional requirements for egress, fire separation, and habitability that affect renovation scope. We verify zoning compliance and building code requirements for the specific property type before submitting permit applications to avoid delays and ensure the work is fully compliant.
              </p>
            </FadeUp>
          </div>
        </section>

        {/* ── 8. COSTS ── */}
        <section className="gwch-costs-section" id="costs">
          <div className="gwch-section-inner">
            <FadeUp>
              <div className="gwch-section-header">
                <SectionLabel text="Investment" />
                <h2 className="gwch-h2">What Remodeling Costs in <strong>New Haven, CT</strong></h2>
              </div>
              <p className="gwch-body-text">
                Home remodeling in New Haven, CT costs $25,000 to $150,000+ for kitchens, $15,000 to $80,000+ for bathrooms, and $25,000 to $100,000+ for basements. Older New Haven homes frequently require additional scope — electrical upgrades, plumbing replacement, lead-safe practices, and structural work — that adds cost but is necessary for a renovation that holds up.
              </p>
            </FadeUp>
            <FadeUp delay={40}>
              <h3 className="gwch-cost-h3">Kitchen Remodeling Costs in New Haven, CT</h3>
              <div className="gwch-cost-table-wrap"><table className="gwch-cost-table"><thead><tr><th>Tier</th><th>Scope</th><th>Typical Range</th></tr></thead><tbody>
                <tr><td>Basic</td><td>Cabinet refacing, new counters, appliances, paint</td><td className="gwch-td-price">$25,000 – $50,000</td></tr>
                <tr><td>Mid-Range</td><td>New cabinets, countertops, flooring, appliances, lighting</td><td className="gwch-td-price">$50,000 – $90,000</td></tr>
                <tr><td>High-End</td><td>Custom cabinets, layout changes, premium appliances, structural work</td><td className="gwch-td-price">$90,000 – $150,000+</td></tr>
              </tbody></table></div>
              <p className="gwch-body-text" style={{ marginTop: 12 }}>New Haven&apos;s older housing stock means kitchen renovations frequently involve replacing original galvanized plumbing, upgrading 60- or 100-amp electrical panels to 200-amp service, and addressing lead paint and asbestos-containing materials. These are standard scope items for pre-1940 construction, not surprises.</p>
            </FadeUp>
            <FadeUp delay={60}>
              <h3 className="gwch-cost-h3">Bathroom Remodeling Costs in New Haven, CT</h3>
              <div className="gwch-cost-table-wrap"><table className="gwch-cost-table"><thead><tr><th>Tier</th><th>Scope</th><th>Typical Range</th></tr></thead><tbody>
                <tr><td>Basic</td><td>Fixtures, vanity, flooring, paint</td><td className="gwch-td-price">$15,000 – $25,000</td></tr>
                <tr><td>Mid-Range</td><td>Full gut, new tile, shower or tub, vanity, lighting, plumbing</td><td className="gwch-td-price">$25,000 – $55,000</td></tr>
                <tr><td>High-End</td><td>Walk-in shower, premium fixtures, layout changes, heated floors</td><td className="gwch-td-price">$55,000 – $80,000+</td></tr>
              </tbody></table></div>
            </FadeUp>
            <FadeUp delay={80}>
              <h3 className="gwch-cost-h3">Basement Finishing Costs in New Haven, CT</h3>
              <p className="gwch-body-text" style={{ marginBottom: 12 }}>Many New Haven homes have stone or block foundations rather than poured concrete. Moisture assessment and appropriate waterproofing are standard before framing begins in basements with masonry foundations.</p>
              <div className="gwch-cost-table-wrap"><table className="gwch-cost-table"><thead><tr><th>Tier</th><th>Scope</th><th>Typical Range</th></tr></thead><tbody>
                <tr><td>Basic</td><td>Framing, drywall, basic flooring, lighting, paint</td><td className="gwch-td-price">$25,000 – $45,000</td></tr>
                <tr><td>Mid-Range</td><td>Multiple rooms, upgraded flooring, bathroom rough-in</td><td className="gwch-td-price">$45,000 – $70,000</td></tr>
                <tr><td>High-End</td><td>Full bathroom, wet bar, custom built-ins, egress window</td><td className="gwch-td-price">$70,000 – $100,000+</td></tr>
              </tbody></table></div>
            </FadeUp>
            <FadeUp delay={100}>
              <h3 className="gwch-cost-h3">Flooring Costs in New Haven, CT</h3>
              <p className="gwch-body-text" style={{ marginBottom: 12 }}>Many New Haven homes have original hardwood floors under carpet that are worth refinishing rather than replacing. We assess what is there and give you an honest recommendation on refinish vs. replace.</p>
              <div className="gwch-cost-table-wrap"><table className="gwch-cost-table"><thead><tr><th>Material</th><th>Best For</th><th>Installed Cost/sq ft</th></tr></thead><tbody>
                <tr><td>Solid Hardwood Refinish</td><td>Original floors in good condition</td><td className="gwch-td-price">$3 – $8</td></tr>
                <tr><td>Solid Hardwood Install</td><td>Living rooms, dining rooms, bedrooms</td><td className="gwch-td-price">$12 – $25</td></tr>
                <tr><td>Engineered Hardwood</td><td>Basements, moisture-prone areas</td><td className="gwch-td-price">$8 – $18</td></tr>
                <tr><td>Luxury Vinyl Plank</td><td>Basements, kitchens, high-traffic areas</td><td className="gwch-td-price">$6 – $14</td></tr>
                <tr><td>Tile</td><td>Bathrooms, kitchens, entryways</td><td className="gwch-td-price">$12 – $25</td></tr>
              </tbody></table></div>
            </FadeUp>
            <FadeUp delay={120}>
              <h3 className="gwch-cost-h3">Home Additions Costs in New Haven, CT</h3>
              <div className="gwch-cost-table-wrap"><table className="gwch-cost-table"><thead><tr><th>Type</th><th>Scope</th><th>Typical Range</th></tr></thead><tbody>
                <tr><td>Bump-Out</td><td>Single-room expansion, 100–200 sq ft</td><td className="gwch-td-price">$150 – $400/sq ft</td></tr>
                <tr><td>Single-Story</td><td>Family room, sunroom, or accessory structure</td><td className="gwch-td-price">$150 – $400/sq ft</td></tr>
                <tr><td>Second-Story</td><td>Full second floor addition with structural support</td><td className="gwch-td-price">$200 – $400/sq ft</td></tr>
              </tbody></table></div>
            </FadeUp>
            <FadeUp delay={140}>
              <h3 className="gwch-cost-h3">Interior Painting Costs in New Haven, CT</h3>
              <div className="gwch-cost-table-wrap"><table className="gwch-cost-table"><thead><tr><th>Scope</th><th>Details</th><th>Typical Range</th></tr></thead><tbody>
                <tr><td>Per Square Foot</td><td>Walls, ceilings, trim, proper surface prep</td><td className="gwch-td-price">$3 – $6/sq ft</td></tr>
                <tr><td>Single Room</td><td>Average bedroom or living room</td><td className="gwch-td-price">$800 – $2,500</td></tr>
                <tr><td>Whole Home</td><td>Full interior, all rooms, trim, doors</td><td className="gwch-td-price">$8,000 – $25,000+</td></tr>
              </tbody></table></div>
            </FadeUp>
            <FadeUp delay={160}>
              <h3 className="gwch-cost-h3">Additional Service Costs in New Haven, CT</h3>
              <div className="gwch-cost-table-wrap"><table className="gwch-cost-table"><thead><tr><th>Service</th><th>Details</th><th>Typical Range</th></tr></thead><tbody>
                <tr><td>Interior Carpentry</td><td>Custom trim, built-ins, period millwork restoration</td><td className="gwch-td-price">$75 – $150/hr</td></tr>
                <tr><td>Attic Conversions</td><td>Framing, insulation, electrical, flooring, egress</td><td className="gwch-td-price">$50,000 – $150,000</td></tr>
                <tr><td>Decks and Porches</td><td>Wood, composite, or PVC with railings and permits</td><td className="gwch-td-price">$15,000 – $75,000</td></tr>
                <tr><td>Design and Planning</td><td>Layout, material selection, 3D rendering, permit drawings</td><td className="gwch-td-price">$2,500 – $15,000</td></tr>
                <tr><td>Comfort and Accessibility</td><td>Grab bars, walk-in showers, widened doorways, ramps</td><td className="gwch-td-price">$5,000 – $50,000</td></tr>
                <tr><td>Insurance Reconstruction</td><td>Fire, water, storm damage rebuilds with carrier coordination</td><td className="gwch-td-price">$25,000 – $250,000+</td></tr>
              </tbody></table></div>
            </FadeUp>
            <FadeUp delay={180}>
              <h3 className="gwch-h3" style={{ marginTop: 48 }}>What Drives Cost in New Haven</h3>
              <p className="gwch-body-text">New Haven&apos;s pre-war housing stock creates specific cost drivers that homeowners should understand before budgeting a renovation. Knob-and-tube wiring requires full replacement in any home where walls are opened — it cannot be extended or added to under current electrical code. Original 60-amp electrical service is common in Victorian and early 20th-century homes and needs upgrading to 200-amp service during major renovation. Galvanized supply lines corrode from the inside out and typically need full replacement in kitchens and bathrooms once walls are opened. Lead paint in pre-1978 homes (virtually all New Haven homes predate 1978) requires EPA RRP-compliant lead-safe work practices, adding cost to any project that disturbs painted surfaces. Balloon framing in pre-1940 homes requires different structural approach than platform framing for wall removal and addition work. These are not surprises for a contractor who knows this market — they are standard scope items that belong in the original estimate.</p>
            </FadeUp>
          </div>
        </section>

        {/* ── 9. SERVICES ── */}
        <section className="nh-services-section">
          <div className="nh-services-inner">
            <FadeUp>
              <div className="nh-services-header">
                <SectionLabel text="Our Services" />
                <h2 className="gwch-h2">Our Remodeling Services in <span className="gwch-gold">New Haven, CT</span></h2>
                <p className="gwch-section-subtitle">
                  BuiltWell CT provides a full range of remodeling services in New Haven including kitchen renovation, bathroom remodeling, basement finishing, flooring, home additions, interior painting, carpentry, attic conversions, decks, design, and accessibility modifications, all permitted and backed by CT HIC License #0668405. New Haven&apos;s Victorians, multi-family properties, pre-war housing in East Rock and Westville, and historic district requirements shape how we approach every project.
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
              Ready to Remodel in <span style={{ color: '#BC9155' }}>New Haven</span>?
            </h2>
            <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.7)', marginBottom: 28 }}>From our Orange headquarters — 15 minutes from New Haven — we bring local expertise and a straightforward process to every project in the city.</p>
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
                We handle all New Haven permits, Building Department submissions, zoning verification, historic district coordination where applicable, inspection scheduling, and subcontractor management under CT HIC License #0668405. Every project includes daily progress updates, a five-step process from consultation through final walkthrough, and a clean job site at the end of every workday. We do not start construction until permits are pulled and the full scope is in writing with a clear timeline attached.
              </p>
              <p className="gwch-body-text">
                Our five-step process — Consultation, Planning, Selections, Build, and Walkthrough — applies to every project regardless of scale. For New Haven projects, the planning phase accounts for the specific construction conditions of the home&apos;s era, any historic district requirements, the permit process at the New Haven Building Department, and the materials and system conditions that are standard in pre-war housing stock. You can read the full process at{' '}
                <Link href="/process/" className="gwch-inline-link">/process/</Link>.
              </p>
              <p className="gwch-body-text">
                During active construction, if something unexpected is found inside a wall — original knob-and-tube wiring, a structural condition, or evidence of prior water damage — you hear from us that day with an explanation of what was found and your options before we proceed.
              </p>
              <h3 className="gwch-h3" style={{ marginTop: 32 }}>New Haven County Project Reference</h3>
              <p className="gwch-body-text">
                Our work in New Haven County includes projects in Hamden, Milford, Branford, and Orange. A recent whole-home renovation in Hamden involved kitchen, bathroom, flooring, and basement work throughout a 1960s split-level. For county-level context on the full scope of what we do in this market, visit{' '}
                <Link href="/new-haven-county/" className="gwch-inline-link">/new-haven-county/</Link>. New Haven projects are served from our <Link href="/new-haven-county/orange-ct/" className="gwch-inline-link">Orange, CT headquarters</Link> at 206A Boston Post Road.
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
                <h2 className="gwch-h2">Frequently Asked Questions: <strong>New Haven Remodeling</strong></h2>
                <p className="gwch-section-subtitle">
                  New Haven homeowners most commonly ask about remodeling costs in older homes, how to handle pre-war construction conditions, permitting, and what to expect when renovating a Victorian or early 20th-century property.
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
                <p className="gwch-cta-sub" style={{ fontSize: 14, marginTop: 8 }}>We will confirm your appointment details and the name of the team member visiting within one business day.</p>
              </div>
            </FadeUp>
            <div className="gwch-cta-body">
              <FadeUp>
                <div className="gwch-cta-left"><div className="gwch-cta-images">
                  <div className="gwch-cta-img-wrap">
                    <img src="/team/builtwell-owner-handshake-client-ct-02.jpg" alt="BuiltWell CT owner meeting with a Connecticut homeowner for a remodeling consultation" loading="lazy" />
                  </div>
                  <div className="gwch-cta-img-wrap">
                    <img src="/portfolio/builtwell-job-site-aerial-ct.jpg" alt="BuiltWell CT job site with two vans at a Connecticut home renovation" loading="lazy" />
                  </div>
                </div></div>
              </FadeUp>
              <FadeUp delay={80}><div className="gwch-contact-form-wrap">
                <form action="/contact/" method="POST" aria-label="Schedule a free consultation">
                  <fieldset className="gwch-form-group" style={{ border: 'none', padding: 0, margin: '0 0 16px' }}>
                    <legend className="gwch-form-legend">Consultation Type *</legend>
                    <div className="gwch-form-radio-group">
                      <label><input type="radio" name="consultation_type" value="in-home" defaultChecked /><span>In-Home Visit</span></label>
                      <label><input type="radio" name="consultation_type" value="remote" /><span>Remote (Zoom/Meet)</span></label>
                    </div>
                  </fieldset>
                  <div className="gwch-form-row gwch-form-row-4">
                    <div className="gwch-form-group">
                      <label htmlFor="nh-name">Name *</label>
                      <input type="text" id="nh-name" name="name" placeholder="Your full name" required />
                    </div>
                    <div className="gwch-form-group">
                      <label htmlFor="nh-phone">Phone *</label>
                      <input type="tel" id="nh-phone" name="phone" placeholder="(203) 000-0000" required />
                    </div>
                    <div className="gwch-form-group">
                      <label htmlFor="nh-email">Email *</label>
                      <input type="email" id="nh-email" name="email" placeholder="you@email.com" required />
                    </div>
                    <div className="gwch-form-group">
                      <label htmlFor="nh-zip">Zip Code *</label>
                      <input type="text" id="nh-zip" name="zip" placeholder="06511" maxLength={5} required />
                    </div>
                  </div>
                  <div className="gwch-form-row gwch-form-row-3">
                    <div className="gwch-form-group">
                      <label htmlFor="nh-services">Services Needed *</label>
                      <select id="nh-services" name="services">
                        <option value="">Select a service</option>
                        <option value="Kitchen Remodeling">Kitchen Remodeling</option>
                        <option value="Bathroom Remodeling">Bathroom Remodeling</option>
                        <option value="Basement Finishing">Basement Finishing</option>
                        <option value="Flooring">Flooring Installation</option>
                        <option value="Home Addition">Home Additions</option>
                        <option value="Interior Painting">Interior Painting</option>
                        <option value="Interior Carpentry">Interior Carpentry</option>
                        <option value="Attic Conversion">Attic Conversions</option>
                        <option value="Decks and Porches">Decks and Porches</option>
                        <option value="Design and Planning">Design and Planning</option>
                        <option value="Comfort and Accessibility">Comfort and Accessibility</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div className="gwch-form-group">
                      <label htmlFor="nh-time">Best Time to Contact *</label>
                      <select id="nh-time" name="best_time" required>
                        <option value="" disabled>Select a time</option>
                        <option value="Morning (8am - 12pm)">Morning (8am – 12pm)</option>
                        <option value="Afternoon (12pm - 4pm)">Afternoon (12pm – 4pm)</option>
                        <option value="Evening (4pm - 6pm)">Evening (4pm – 6pm)</option>
                        <option value="Anytime">Anytime</option>
                      </select>
                    </div>
                    <fieldset className="gwch-form-group" style={{ border: 'none', padding: 0, margin: '0 0 16px' }}>
                      <legend className="gwch-form-legend">Preferred Contact Method *</legend>
                      <div className="gwch-form-radio-group">
                        <label><input type="radio" name="contact_method" value="call" defaultChecked /><span>Call</span></label>
                        <label><input type="radio" name="contact_method" value="text" /><span>Text</span></label>
                        <label><input type="radio" name="contact_method" value="email" /><span>Email</span></label>
                      </div>
                    </fieldset>
                  </div>
                  <div className="gwch-form-group">
                    <label htmlFor="nh-message">Tell Us About Your Project</label>
                    <textarea id="nh-message" name="message" rows={4} placeholder="Tell us about your project, what rooms, what changes, any timeline or budget considerations..." />
                  </div>
                  <div className="gwch-form-consent">
                    <label>
                      <input type="checkbox" name="consent" required />
                      <span>I agree to the <Link href="/privacy-policy/" className="gwch-inline-link">Privacy Policy</Link> and <Link href="/terms/" className="gwch-inline-link">Terms of Service</Link>. I consent to receive calls, texts (SMS), and emails from BuiltWell CT, including automated messages. Msg &amp; data rates may apply. Reply STOP to opt out.</span>
                    </label>
                  </div>
                  <button type="submit" className="gwch-form-submit">Get Your Free Estimate</button>
                  <p className="gwch-form-note">We respond within 24 hours. No spam, no obligation.</p>
                </form>
              </div></FadeUp>
            </div>
          </div>
        </section>

        {/* ── 16. OFFICE / LOCATION ── */}
        <section className="gwch-office-section" id="location">
          <div className="gwch-office-inner">
            <FadeUp>
              <div className="gwch-section-header">
                <SectionLabel text="Our Office" dark />
                <h2 className="gwch-h2 gwch-text-white">Orange, CT <strong>Headquarters</strong></h2>
              </div>
            </FadeUp>
            <div className="gwch-office-grid">
              <div className="gwch-office-details">
                <FadeUp>
                  <div className="gwch-office-detail-item">
                    <div className="gwch-office-detail-icon">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                    </div>
                    <div className="gwch-office-detail-text">
                      <h4>Address</h4>
                      <p>206A Boston Post Road, Orange, CT 06477</p>
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
                      <p>Fairfield County: <a href="tel:2039199616">(203) 919-9616)</a></p>
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
                </FadeUp>
              </div>
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
            <FadeUp delay={40}>
              <div className="gwch-fairfield-note">
                <p><strong><Link href="/fairfield-county/" className="gwch-fairfield-note-link">Fairfield County:</Link></strong> Dedicated local team serving Greenwich, Westport, Darien, New Canaan, Stamford, Norwalk, Fairfield, Ridgefield, and all surrounding towns.</p>
              </div>
            </FadeUp>
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
        .gwch-text-white strong { color: var(--gwch-gold-light) !important; }
        .gwch-h3 { font-family: Georgia, serif; font-size: clamp(20px, 2.2vw, 26px); font-weight: 700; line-height: 1.25; color: var(--gwch-navy); margin: 0 0 12px; }
        .gwch-body-text { font-size: 16px; line-height: 1.85; color: var(--gwch-muted); margin: 0 0 16px; }
        .gwch-section-header { text-align: center; margin-bottom: 48px; }
        .gwch-section-subtitle { font-size: 17px; line-height: 1.75; color: var(--gwch-muted); max-width: 760px; margin: 0 auto; }
        .gwch-section-inner { max-width: 1240px; margin: 0 auto; padding: 80px 40px; }
        .gwch-section-narrow { max-width: 860px; }
        @media (max-width: 768px) { .gwch-section-inner { padding: 60px 20px; } }
        .gwch-page-hero { position: relative; isolation: isolate; overflow: hidden; background: var(--gwch-oxford); padding: 0 40px 48px; padding-top: 120px; color: #fff; min-height: 50vh; display: flex; align-items: stretch; }
        .gwch-hero-bg { position: absolute; inset: 0; background-size: cover; background-position: center 30%; opacity: 0.72; z-index: -2; }
        .gwch-hero-bg-nh { background-image: url('/images/areas/new-haven-ct-neighborhood.jpg') !important; background-position: center 35% !important; }
        .gwch-hero-gradient { position: absolute; inset: 0; background: radial-gradient(ellipse at 97% 97%, rgba(21,30,48,1) 0%, rgba(21,30,48,0.9) 8%, transparent 30%), radial-gradient(ellipse at 3% 97%, rgba(21,30,48,0.9) 0%, transparent 25%), linear-gradient(180deg, rgba(21,30,48,0.35) 0%, rgba(21,30,48,0.2) 30%, rgba(21,30,48,0.45) 65%, rgba(21,30,48,0.92) 100%); z-index: -1; }
        .gwch-hero-inner { position: relative; max-width: 1240px; margin: 0 auto; width: 100%; display: flex; flex-direction: column; align-items: center; text-align: center; justify-content: center; }
        .gwch-breadcrumb { list-style: none; margin: 0 0 20px; padding: 0; display: flex; flex-wrap: wrap; align-items: center; gap: 0; font-size: 13px; font-weight: 500; color: rgba(255,255,255,0.92); text-shadow: 0 1px 6px rgba(0,0,0,0.7); }
        .gwch-breadcrumb li { display: flex; align-items: center; }
        .gwch-bc-sep { color: var(--gwch-gold); margin: 0 10px; font-size: 14px; line-height: 1; user-select: none; }
        .gwch-breadcrumb a { color: rgba(255,255,255,0.85); text-decoration: none; transition: color 0.2s; }
        .gwch-breadcrumb a:hover { color: var(--gwch-gold); }
        .gwch-bc-current { color: #fff; font-weight: 600; }
        .gwch-hero-h1 { font-family: Georgia, serif; font-size: clamp(40px, 4.5vw, 56px); font-weight: 700; line-height: 1.08; letter-spacing: -0.5px; color: #fff; max-width: 920px; margin: 0 0 12px; text-shadow: 0 2px 20px rgba(0,0,0,0.5); }
        .gwch-gold { color: var(--gwch-gold); }
        .gwch-hero-sub { max-width: 560px; font-size: 17px; line-height: 1.7; color: rgba(255,255,255,0.82); margin: 16px auto 0; }
        .gwch-hero-ctas { display: flex; flex-wrap: wrap; gap: 16px; margin-top: 32px; justify-content: center; }
        .gwch-cta-btn { display: inline-flex; align-items: center; justify-content: center; padding: 15px 32px; border-radius: 8px; background: rgba(10,18,35,0.42); border: 1px solid rgba(255,255,255,0.18); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); color: #fff; text-decoration: none; text-align: center; font-size: 15px; font-weight: 600; transition: background 0.3s, border-color 0.3s, transform 0.3s, box-shadow 0.3s; }
        .gwch-cta-btn:hover { background: rgba(10,18,35,0.62); border-color: rgba(255,255,255,0.28); transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.3), 0 0 0 1px rgba(188,145,85,0.2); }
        .gwch-cta-btn.gwch-cta-primary { background: var(--gwch-gold); border: 1px solid var(--gwch-gold); color: #fff; backdrop-filter: none; }
        .gwch-cta-btn.gwch-cta-primary:hover { background: #d4a95a; border-color: #d4a95a; box-shadow: 0 8px 24px rgba(188,145,85,0.4); }
        @media (max-width: 768px) { .gwch-page-hero { padding: 88px 20px 36px; min-height: 40vh; } .gwch-hero-h1 { font-size: clamp(30px, 7vw, 42px); } .gwch-hero-sub { font-size: 15px; } .gwch-hero-ctas { flex-direction: column; align-items: stretch; } .gwch-cta-btn { min-height: 48px; } .gwch-breadcrumb { font-size: 12px; } }
        .gwch-trust-bar { border-top: 1px solid rgba(188,145,85,0.2); border-bottom: 1px solid rgba(188,145,85,0.2); background: linear-gradient(135deg, #1e2b43 0%, #151e30 100%); }
        .gwch-trust-bar-inner { max-width: 1280px; margin: 0 auto; display: grid; grid-template-columns: repeat(2, 1fr); }
        @media (min-width: 1024px) { .gwch-trust-bar-inner { grid-template-columns: repeat(4, 1fr); } }
        .gwch-trust-item { padding: 36px 20px; text-align: center; cursor: default; border-right: 1px solid rgba(188,145,85,0.12); transition: background 0.3s, transform 0.3s; }
        .gwch-trust-item:last-child { border-right: none; }
        .gwch-trust-item:hover { background: rgba(188,145,85,0.08); transform: translateY(-3px); }
        .gwch-trust-val { font-family: Georgia, serif; font-size: 42px; font-weight: 700; line-height: 1; color: var(--gwch-gold); min-height: 52px; display: flex; align-items: center; justify-content: center; }
        .gwch-trust-lbl { margin-top: 8px; font-size: 13px; font-weight: 500; letter-spacing: 1px; text-transform: uppercase; color: rgba(255,255,255,0.6); }
        .gwch-intro-section { background: #fff; border-bottom: 1px solid var(--gwch-border); }
        .gwch-intro-inner { max-width: 820px; margin: 0 auto; padding: 80px 40px; }
        @media (max-width: 768px) { .gwch-intro-inner { padding: 60px 20px; } }
        .gwch-intro-header { text-align: center; margin-bottom: 24px; }
        .gwch-intro-body { font-size: 16px; color: var(--gwch-muted); line-height: 1.85; margin-bottom: 0; }
        .gwch-inline-link { color: var(--gwch-gold); text-decoration: none; font-weight: 600; }
        .gwch-inline-link:hover { text-decoration: underline; }
        .gwch-housing-banner { position: relative; overflow: hidden; background: #0d1a2e; padding: 80px 40px; color: #fff; text-align: center; }
        .gwch-housing-bg { position: absolute; inset: 0; background-size: cover; background-position: center; opacity: 0.3; }
        .gwch-housing-bg-nh { background-image: url('/images/areas/new-haven-ct-victorian-home.jpg') !important; background-position: center 40% !important; }
        .gwch-housing-gradient { position: absolute; inset: 0; background: linear-gradient(180deg, rgba(13,26,46,0.6) 0%, rgba(13,26,46,0.4) 40%, rgba(13,26,46,0.7) 100%); }
        .gwch-housing-inner { position: relative; z-index: 1; max-width: 860px; margin: 0 auto; }
        .gwch-housing-body { font-size: 17px; line-height: 1.8; color: rgba(255,255,255,0.82); margin: 0; }
        .gwch-alt-section { background: #fff; }
        .gwch-alt-container { max-width: 1240px; margin: 0 auto; padding: 80px 40px; display: flex; flex-direction: column; gap: 80px; }
        @media (max-width: 768px) { .gwch-alt-container { padding: 60px 20px; gap: 60px; } }
        .gwch-alt-block { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center; }
        @media (max-width: 900px) { .gwch-alt-block { grid-template-columns: 1fr; gap: 32px; } .gwch-alt-block .gwch-alt-content { order: 1; } .gwch-alt-block .gwch-alt-img { order: 0; } }
        .gwch-alt-img { border-radius: 10px; overflow: hidden; aspect-ratio: 4/3; }
        .gwch-alt-img img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .gwch-neighborhoods-section { background: #fff; }
        .gwch-neighborhoods-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        @media (max-width: 768px) { .gwch-neighborhoods-grid { grid-template-columns: 1fr; } }
        .gwch-neighborhood-card { border: 1px solid var(--gwch-border); border-radius: 8px; overflow: hidden; transition: box-shadow 0.2s, transform 0.2s; background: #fff; }
        .gwch-neighborhood-card:hover { box-shadow: 0 4px 16px rgba(30,43,67,0.08); transform: translateY(-2px); }
        .gwch-neighborhood-card[open] { border-color: var(--gwch-gold); }
        .gwch-neighborhood-summary { display: flex; align-items: center; justify-content: space-between; padding: 18px 20px; font-size: 15px; font-weight: 600; color: var(--gwch-navy); cursor: pointer; list-style: none; user-select: none; }
        .gwch-neighborhood-summary::-webkit-details-marker { display: none; }
        .gwch-summary-icon { color: var(--gwch-gold); flex-shrink: 0; transition: transform 0.2s; }
        .gwch-neighborhood-card[open] .gwch-summary-icon { transform: rotate(45deg); }
        .gwch-neighborhood-body { padding: 0 20px 20px; font-size: 15px; line-height: 1.78; color: var(--gwch-muted); margin: 0; }
        .gwch-permitting-section { background: var(--gwch-cream); }
        .gwch-costs-section { background: #fff; }
        .gwch-cost-h3 { font-family: Georgia, serif; font-size: 22px; font-weight: 700; color: var(--gwch-navy); margin: 48px 0 16px; padding-top: 32px; border-top: 1px solid var(--gwch-border); }
        .gwch-cost-h3:first-of-type { border-top: none; padding-top: 0; margin-top: 32px; }
        .gwch-cost-table-wrap { width: 100%; overflow-x: auto; -webkit-overflow-scrolling: touch; }
        .gwch-cost-table { width: 100%; border-collapse: separate; border-spacing: 0; font-size: 15px; margin-bottom: 12px; border-radius: 10px; overflow: hidden; box-shadow: 0 2px 12px rgba(30,43,67,0.07); border: 1px solid var(--gwch-border); }
        .gwch-cost-table th { background: var(--gwch-navy); text-align: left; padding: 13px 20px; font-size: 11px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #fff; }
        .gwch-cost-table td { padding: 14px 20px; border-bottom: 1px solid var(--gwch-border); color: var(--gwch-muted); }
        .gwch-cost-table tr:last-child td { border-bottom: none; }
        .gwch-cost-table td:first-child { font-weight: 600; color: var(--gwch-navy); }
        .gwch-td-price { color: var(--gwch-gold) !important; font-weight: 600; white-space: nowrap; }
        @media (max-width: 900px) { .gwch-cost-table { min-width: 640px; } }
        .nh-services-section { background: var(--gwch-cream); }
        .nh-services-inner { max-width: 1240px; margin: 0 auto; padding: 80px 40px; }
        @media (max-width: 768px) { .nh-services-inner { padding: 60px 20px; } }
        .nh-services-header { text-align: center; margin-bottom: 48px; }
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
        .gwch-office-section { background: var(--gwch-oxford); padding: 72px 40px 0; position: relative; }
        .gwch-office-inner { max-width: 1200px; margin: 0 auto; }
        .gwch-office-section .gwch-section-header { margin-bottom: 48px; }
        .gwch-office-section .gwch-label { color: var(--gwch-gold); }
        .gwch-office-grid { display: grid; grid-template-columns: 1fr 1.2fr; gap: 48px; align-items: start; }
        @media (max-width: 900px) { .gwch-office-grid { grid-template-columns: 1fr; gap: 24px; } }
        .gwch-office-details { display: flex; flex-direction: column; gap: 0; padding-bottom: 36px; }
        .gwch-office-detail-item { display: grid; grid-template-columns: 42px 1fr; gap: 16px; align-items: start; padding: 18px 0; border-bottom: 1px solid rgba(255,255,255,0.07); }
        .gwch-office-detail-item:last-of-type { border-bottom: none; }
        .gwch-office-detail-icon { width: 42px; height: 42px; background: rgba(188,145,85,0.1); border: 1px solid rgba(188,145,85,0.18); border-radius: 10px; display: flex; align-items: center; justify-content: center; color: var(--gwch-gold); flex-shrink: 0; }
        .gwch-office-detail-text h4 { font-family: 'Inter', sans-serif; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.2px; margin-bottom: 4px; color: var(--gwch-gold); }
        .gwch-office-detail-text p { font-size: 15px; color: rgba(255,255,255,0.7); line-height: 1.6; margin: 0 0 2px; }
        .gwch-office-detail-text a { color: #fff; font-weight: 600; transition: color 0.2s; }
        .gwch-office-detail-text a:hover { color: var(--gwch-gold); }
        .gwch-hours-table { display: grid; gap: 4px; }
        .gwch-hours-row { display: grid; grid-template-columns: 140px 1fr; font-size: 14px; color: rgba(255,255,255,0.55); }
        .gwch-hours-day { font-weight: 600; color: rgba(255,255,255,0.85); }
        .gwch-office-map { border-radius: 12px; overflow: hidden; min-height: 380px; box-shadow: 0 12px 40px rgba(0,0,0,0.25); }
        .gwch-fairfield-note { border-top: 1px solid rgba(255,255,255,0.07); padding: 20px 0 24px; }
        .gwch-fairfield-note p { margin: 0; font-size: 15px; color: rgba(255,255,255,0.45); line-height: 1.7; }
        .gwch-fairfield-note-link { color: var(--gwch-gold) !important; text-decoration: none; font-weight: 700; }
        .gwch-fairfield-note-link:hover { text-decoration: underline; }
        @media (max-width: 768px) { .gwch-office-section { padding: 48px 20px 0; } .gwch-office-map { min-height: 280px; } .gwch-hours-row { grid-template-columns: 110px 1fr; } }
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
        .gwch-form-group input, .gwch-form-group select, .gwch-form-group textarea { width: 100%; padding: 12px 14px; border: 1px solid rgba(30,43,67,0.15); border-radius: 6px; font-family: 'Inter', sans-serif; font-size: 15px; color: var(--gwch-navy); background: #fff; transition: border-color 0.2s; -webkit-appearance: none; appearance: none; }
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
        .gwch-form-submit { width: 100%; min-height: 52px; padding: 14px 20px; background: var(--gwch-gold); color: #fff; border: none; border-radius: 8px; font-family: 'Inter', sans-serif; font-size: 15px; font-weight: 600; cursor: pointer; transition: background 0.2s; }
        .gwch-form-submit:hover { background: var(--gwch-gold-dark); transform: translateY(-1px); box-shadow: 0 4px 12px rgba(188,145,85,0.3); }
        .gwch-form-note { font-size: 13px; color: var(--gwch-muted); text-align: center; margin-top: 16px; font-style: italic; }
        .nh-nearby-section { background: var(--gwch-cream); padding: 80px 40px; }
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
      `}</style>
    </div>
  );
}

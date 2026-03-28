'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import type { CMSPage } from '@/types/cms';
import { AreasSection as SharedAreasSection, FinancingStrip as SharedFinancingStrip } from './template-utils';

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

export function OrangeCTPageTemplate({ page: _page }: { page: CMSPage }) { // eslint-disable-line @typescript-eslint/no-unused-vars
  const [servicesOpen, setServicesOpen] = useState(false);

  const primaryServices = [
    { title: 'Kitchen Remodeling in Orange, CT', href: '/kitchen-remodeling/orange-ct/', img: '/services/kitchen-remodeling-ct.jpg', desc: 'Full kitchen renovations for Orange homes, including cabinetry, countertops, tile, electrical, plumbing, and permits.', price: '$25K-$150K+', time: '6-12 weeks' },
    { title: 'Bathroom Remodeling in Orange, CT', href: '/bathroom-remodeling/orange-ct/', img: '/services/bathroom-remodeling-ct.jpg', desc: 'Complete bathroom renovations for Orange colonials and split-levels — tile, vanities, showers, tubs, and plumbing upgrades.', price: '$15K-$80K+', time: '3-6 weeks' },
    { title: 'Basement Finishing in Orange, CT', href: '/basement-finishing/orange-ct/', img: '/services/basement-finishing-ct.jpg', desc: 'Convert unfinished basements in Orange\'s 1950s-1980s homes into living space with proper waterproofing and egress.', price: '$25K-$100K+', time: '4-8 weeks' },
    { title: 'Flooring in Orange, CT', href: '/flooring/orange-ct/', img: '/services/flooring-installation-ct.jpg', desc: 'Hardwood, LVP, tile, and engineered wood with expert subfloor preparation for Orange homes.', price: '$6-$25/sq ft', time: '2-5 days' },
    { title: 'Home Additions in Orange, CT', href: '/home-additions/', img: '/services/home-additions-ct.jpg', desc: 'Single-story and second-story additions, sunrooms, and bump-outs for Orange split-levels and colonials with full structural work.', price: '$150-$400/sq ft', time: '8-16 weeks' },
    { title: 'Interior Painting in Orange, CT', href: '/interior-painting/', img: '/services/interior-painting-ct.jpg', desc: 'Walls, ceilings, trim, doors, and built-ins in Orange homes with professional-grade paints and proper prep.', price: '$3-$6/sq ft', time: '2-5 days' },
  ];

  const moreServices = [
    { title: 'Interior Carpentry in Orange, CT', href: '/interior-carpentry/', img: '/services/interior-carpentry-ct.jpg', desc: 'Custom millwork, built-in cabinetry, wainscoting, crown molding, coffered ceilings, closet systems, and finish trim for Orange residences.', price: '$75-$150/hr', time: 'Varies' },
    { title: 'Attic Conversions in Orange, CT', href: '/attic-conversions/', img: '/services/attic-conversions-ct.jpg', desc: 'Converting unfinished attics in Orange into bedrooms, offices, or playrooms with structural assessment through final finish.', price: '$50K-$150K', time: '6-12 weeks' },
    { title: 'Decks and Porches in Orange, CT', href: '/decks-porches/', img: '/services/decks-porches-ct.jpg', desc: 'Pressure-treated lumber, composite, and hardwood for Orange outdoor spaces. Covered porches, screened-in structures, and multi-level decks.', price: '$15K-$75K', time: '2-4 weeks' },
    { title: 'Design and Planning in Orange, CT', href: '/remodeling-design-planning/', img: '/services/design-planning-ct.jpg', desc: 'Space planning, material selection, finish coordination, and project documentation for Orange remodeling projects before construction begins.', price: '$2.5K-$15K', time: '2-6 weeks' },
    { title: 'Comfort and Accessibility in Orange, CT', href: '/comfort-accessibility-remodeling/', img: '/services/comfort-accessibility-ct.jpg', desc: 'Grab bars, roll-in showers, wider doorways, ramp installation, and first-floor adaptations for Orange homeowners of all ages and abilities.', price: '$5K-$50K', time: '1-4 weeks' },
    { title: 'Insurance Reconstruction in Orange, CT', href: '/insurance-restoration/', img: '/portfolio/builtwell-contractor-handshake-arrival-ct-optimized.jpg', desc: 'Rebuilding Orange homes after fire, water, and storm damage. Full reconstruction working directly with your insurance carrier.', price: '$25K-$250K+', time: '4-16 weeks' },
  ];

  const neighborhoods = [
    { name: 'Race Brook Road and Turkey Hill', body: 'Race Brook Road and Turkey Hill feature 1960s and 1970s colonials and raised ranches on wooded lots with larger properties. These homes are common renovation candidates for kitchen and bathroom updates, with original builder-grade interiors that have served their purpose but are ready for modernization. The larger lot sizes also make these properties strong candidates for additions and outdoor living projects. Construction in this area is typical of the era: solid framing, but original electrical, plumbing, and insulation that predate current standards.' },
    { name: 'Grassy Hill', body: 'Grassy Hill contains a mix of split-levels and colonials from the 1950s through 1970s. This is a mature neighborhood with original builder-grade interiors that are ready for renovation. Kitchens, bathrooms, and basements in these homes tend to have their original finishes and systems. The split-level floor plans in this area often prompt homeowners to request open floor plan conversions that remove the wall between the kitchen and adjacent living space, which requires structural beam work to maintain load paths.' },
    { name: 'Orange Center Road', body: 'Orange Center Road has some of the town\'s older housing stock near the town center, with some homes dating to the early 1900s. The mix of colonials and capes here carries architectural character worth preserving during renovation. Older homes in this area may have original plaster walls, knob-and-tube wiring remnants, and stone or block foundations that require assessment before major interior work begins. Renovation projects here often balance modernization with preservation of the home\'s original character.' },
    { name: 'Racebrook Farms', body: 'Racebrook Farms is a newer development from the 1990s and 2000s, consisting of colonials and contemporaries built with builder-grade materials that are now reaching end of life. Kitchens with original laminate countertops, stock cabinetry, and basic fixtures are prime candidates for mid-range to high-end renovation. These homes have modern framing and systems, which typically makes renovation less complex than in older Orange neighborhoods, but the builder-grade materials were selected for cost rather than longevity and are showing their age.' },
    { name: 'Peck Lane and Dogwood Road Area', body: 'The Peck Lane and Dogwood Road area contains 1960s and 1970s split-levels and bi-levels typical of Orange\'s suburban buildout during that period. These homes are common candidates for basement finishing and open floor plan conversions. The split-level and bi-level layouts have compartmentalized rooms that homeowners frequently want opened up, and the lower levels offer usable square footage that can be finished into living space. Electrical panels in these homes are often the original 100-amp service that needs upgrading during renovation.' },
    { name: 'Indian River Road and Route 34 Corridor', body: 'Indian River Road and the Route 34 corridor contain a mix of housing from different periods, with some properties retaining a more rural character on larger lots. These properties frequently benefit from additions and outdoor living projects that take advantage of the extra land. The variety of construction periods means renovation work here requires careful assessment of what is behind the walls before scoping a project. Properties near watercourses in this area may require Inland Wetlands Commission review for exterior work and additions.' },
  ];

  const faqItems = [
    { q: 'How much does a kitchen remodel cost in Orange, CT?', a: 'A kitchen remodel in Orange, CT typically costs $30,000 to $50,000 for a minor refresh and $60,000 to $120,000 for a mid-range gut renovation with new cabinets, countertops, and flooring. High-end custom kitchens with structural changes run $120,000 to $200,000. Many Orange homes are split-levels or raised ranches built in the 1960s and 1970s, and kitchen renovations in these layouts often involve opening the wall between the kitchen and adjacent family room to create an open floor plan. That structural modification adds $8,000 to $15,000 for beam work and finishing. We provide detailed pricing during your free consultation so the number reflects your actual kitchen, not an average.' },
    { q: 'What are common renovation challenges in Orange, CT split-level homes?', a: 'Split-level homes in Orange present specific renovation challenges including half-level transitions, load-bearing walls between levels, and small compartmentalized rooms that homeowners want to open up. The staggered floor plates mean that structural modifications require careful engineering because walls that appear non-structural often carry loads from the level above. Electrical panels in 1960s and 1970s split-levels are frequently 100-amp systems that need upgrading during a major renovation. Basement levels in Orange split-levels tend to have 7-foot ceilings, which limits finishing options but can still work for rec rooms, home offices, or laundry areas. We have renovated dozens of split-levels in Orange and neighboring Woodbridge and know exactly where the common structural and mechanical issues occur in these floor plans.' },
    { q: 'Can I finish the basement in my Orange, CT split-level?', a: 'Yes, most basements in Orange split-level homes can be finished, though ceiling height and moisture conditions will determine what the space can realistically become. Basement finishing in Orange typically costs $25,000 to $50,000 for a standard 400 to 600 square foot space. Lower-level basements in split-levels often have 7-foot ceilings, which meets Connecticut code for habitable space but feels tight with a dropped ceiling, so we typically use drywall ceilings or exposed-and-painted options to preserve height. Before framing, we assess moisture conditions and install any necessary drainage or vapor barrier systems. Orange sits on mostly well-drained soil, but homes near the Wepawaug River or in lower elevations may need interior drainage before finishing.' },
    { q: 'How long does a full home renovation take in Orange, CT?', a: 'A full home renovation in Orange typically takes 3 to 6 months of active construction depending on the scope and whether structural changes are involved. A whole-house renovation that includes kitchen, bathrooms, flooring, and paint without structural work runs closer to 3 to 4 months. Projects that involve additions, removing walls, or reconfiguring the layout run 5 to 6 months or longer. Permit turnaround in Orange is generally faster than larger municipalities, usually 2 to 4 weeks for residential projects. We build the permit timeline into the project schedule during planning so your start date reflects what is actually achievable.' },
    { q: 'How do I start an insurance reconstruction project in Orange, CT?', a: 'Starting an insurance reconstruction project in Orange begins with filing your claim with your homeowner\'s insurance carrier and having an adjuster assess the damage to your property. Once your claim is open, we can step in to document the full scope of damage, provide detailed rebuild estimates, and coordinate directly with your carrier. We work with State Farm, Liberty Mutual, Travelers, The Hartford, and other carriers that commonly insure Orange homes. We handle supplemental documentation when the adjuster\'s initial estimate does not cover the full rebuild scope, which is common on fire and water damage projects where hidden damage becomes apparent during demolition. We bill your insurance company directly, so you are not managing payments between us and your carrier. Our office is in Orange, so we can respond quickly to emergency situations. We hold CT HIC License #0668405 and carry the liability and workers\' comp coverage that insurance carriers require from reconstruction contractors.' },
    { q: 'Does BuiltWell handle permits for remodeling in Orange, CT?', a: 'Yes, we handle all permit applications and inspection coordination for every remodeling project we take on in Orange, CT. Orange\'s Building Department at Town Hall requires permits for any work involving structural changes, electrical modifications, plumbing, or mechanical systems. We prepare and submit all required documentation, schedule inspections at each phase of the project, and ensure the work passes inspection before moving to the next stage. Permit fees in Orange are based on project value and are included in our project timeline during planning. You do not need to visit the Building Department or coordinate inspections yourself. We hold CT HIC License #0668405, which is required for any contractor performing residential construction in Connecticut.' },
    { q: 'Why should I hire a local Orange, CT contractor instead of one from out of town?', a: 'Hiring a local Orange contractor means working with a team that knows the town\'s housing stock, building department, and inspection process firsthand. Our office is in Orange, and most of the homes we work on are within 20 minutes of our shop. That proximity matters for project management, response time, and accountability. We know that most of Orange\'s residential construction dates to the 1960s and 1970s, which means split-level and raised ranch floor plans with specific structural, electrical, and plumbing characteristics that a contractor from outside the area may not anticipate. We also have established relationships with Orange\'s Building Department and know the local inspection expectations. If something comes up after your project is complete, we are a local phone call away, not an out-of-area contractor who has moved on to a different market.' },
  ];

  const primaryTowns = [
    { name: 'Orange', href: null, highlight: true },
    { name: 'New Haven', href: '/new-haven-county/new-haven-ct/' },
    { name: 'Hamden', href: '/new-haven-county/' },
    { name: 'Branford', href: '/new-haven-county/' },
    { name: 'Guilford', href: '/new-haven-county/' },
    { name: 'Madison', href: '/new-haven-county/madison-ct/' },
    { name: 'Woodbridge', href: '/new-haven-county/' },
    { name: 'Milford', href: '/new-haven-county/' },
    { name: 'Cheshire', href: null },
  ];

  const moreTowns = ['Ansonia', 'Beacon Falls', 'Bethany', 'Derby', 'East Haven', 'Meriden', 'Middlebury', 'Naugatuck', 'North Branford', 'North Haven', 'Oxford', 'Prospect', 'Seymour', 'Southbury', 'Wallingford', 'Waterbury', 'West Haven', 'Wolcott'];

  const fairfieldPrimaryTowns = [
    { name: 'Greenwich', href: '/fairfield-county/greenwich-ct/' },
    { name: 'Stamford', href: '/fairfield-county/' },
    { name: 'Norwalk', href: '/fairfield-county/' },
    { name: 'Westport', href: '/fairfield-county/westport-ct/' },
    { name: 'Darien', href: '/fairfield-county/' },
    { name: 'New Canaan', href: '/fairfield-county/' },
    { name: 'Fairfield', href: '/fairfield-county/' },
    { name: 'Ridgefield', href: '/fairfield-county/' },
    { name: 'Trumbull', href: null },
  ];

  const fairfieldMoreTowns = ['Bethel', 'Bridgeport', 'Brookfield', 'Danbury', 'Easton', 'Monroe', 'New Fairfield', 'Newtown', 'Redding', 'Shelton', 'Sherman', 'Stratford', 'Weston', 'Wilton'];

  return (
    <div className="gwch-page">
      <main id="main">

        {/* ── 1. HERO ── */}
        <section className="gwch-page-hero gwch-page-hero-orange">
          <div className="gwch-hero-bg gwch-hero-bg-orange" />
          <div className="gwch-hero-gradient" />
          <div className="gwch-hero-inner">
            <ol className="gwch-breadcrumb">
              <li><Link href="/">Home</Link></li>
              <li aria-hidden="true" className="gwch-bc-sep">›</li>
              <li><Link href="/areas-we-serve/">Areas We Serve</Link></li>
              <li aria-hidden="true" className="gwch-bc-sep">›</li>
              <li><Link href="/new-haven-county/">New Haven County</Link></li>
              <li aria-hidden="true" className="gwch-bc-sep">›</li>
              <li><span className="gwch-bc-current">Orange, CT</span></li>
            </ol>
            <h1 className="gwch-hero-h1">
              Home Remodeling in Orange, <span className="gwch-gold">CT</span>
            </h1>
            <p className="gwch-hero-sub">
              Home remodeling in Orange, CT from our headquarters at 206A Boston Post Road. Kitchens, bathrooms, basements, and additions for your neighborhood. Licensed and insured.
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
                <SectionLabel text="Orange Remodeling" />
                <h2 className="gwch-h2">Professional Home Remodeling in <strong>Orange, CT</strong></h2>
              </div>
              <p className="gwch-intro-body">
                Home remodeling in Orange, CT costs $25,000 to $150,000+ for kitchens, $15,000 to $80,000+ for bathrooms, and $25,000 to $100,000+ for basements, with all work handled from our office at 206A Boston Post Road. Orange's housing stock was built primarily between the 1950s and 1980s, including split-levels, colonials, and raised ranches. We know the construction patterns, permit requirements, and building department process here because this is where we work every day. We hold CT HIC License #0668405 and serve Orange and the rest of{' '}
                <Link href="/new-haven-county/" className="gwch-inline-link">New Haven County</Link>.
              </p>
              <p className="gwch-intro-body" style={{ marginTop: 16 }}>
                We have worked in nearly every neighborhood in town. We know what to expect when we open up a wall in a 1965 split-level on Race Brook Road. We know the Orange building department's permit process and how to move through it without unnecessary delays. That is not something a contractor coming in from outside the area can offer.
              </p>
            </FadeUp>
            <FadeUp delay={100}>
              <div style={{ margin: '32px 0', borderRadius: 10, overflow: 'hidden', boxShadow: '0 12px 40px rgba(30,43,67,0.12)' }}>
                <img src="/images/areas/orange-ct-neighborhood.jpg" alt="Residential street in Orange CT with colonial homes served by BuiltWell" loading="lazy" style={{ width: '100%', height: 360, objectFit: 'cover', display: 'block' }} />
              </div>
              <p className="gwch-intro-body">
                Orange homeowners tend to be practical and direct. They have lived in their homes for years and they take care of them. When they decide it is time to redo a kitchen or finish a basement they have been using for storage since 1998, they want a contractor who shows up when they say they will, communicates clearly throughout the project, and delivers work that holds up. That is what we are here to do.
              </p>
              <p className="gwch-intro-body" style={{ marginTop: 16 }}>
                Whether you are updating a bathroom that has been the same since the original owner, refinishing hardwood floors throughout the main level, or finally finishing that basement, we know your house and we know your town, because it is our town too.
              </p>
            </FadeUp>
          </div>
        </section>

        {/* ── 4. HOUSING STOCK BANNER ── */}
        <section className="gwch-housing-banner gwch-housing-banner-orange">
          <div className="gwch-housing-bg gwch-housing-bg-orange" />
          <div className="gwch-housing-gradient" />
          <div className="gwch-housing-inner">
            <FadeUp>
              <SectionLabel text="Housing Stock" dark />
              <h2 className="gwch-h2 gwch-text-white">
                Orange Homes and What <strong>They Require</strong>
              </h2>
              <p className="gwch-housing-body">
                Orange's housing stock consists primarily of split-levels, colonials, and raised ranches built between the 1950s and 1980s. These homes were solidly constructed for their era, but most still have original kitchens, bathrooms, electrical panels, and plumbing that predate modern standards. Knowing what is behind the walls before work begins is what separates a smooth project from one full of surprises.
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
                  <img src="/images/areas/orange-ct-split-level.jpg" alt="1960s split-level home in Orange CT typical of postwar housing stock" />
                </div>
                <div className="gwch-alt-content">
                  <h3 className="gwch-h3">1950s to 1980s Split-Levels and Colonials</h3>
                  <p className="gwch-body-text">
                    The majority of Orange's housing stock consists of split-levels and colonials built during the postwar boom through the early 1980s. These homes were built well for their era, but most still have their original kitchens and bathrooms, wiring that predates modern electrical loads, and layouts designed for a different way of living. Galley kitchens, small bathrooms, and closed-off floor plans are standard.
                  </p>
                  <p className="gwch-body-text">
                    When homeowners are ready to update, the work typically goes beyond cosmetics. We regularly open up load-bearing walls between kitchens and dining areas, upgrade 100-amp panels to 200-amp service, and reconfigure plumbing that has not been touched since the Johnson administration. These are the projects we handle every week in Orange.
                  </p>
                </div>
              </div>
            </FadeUp>
            <FadeUp delay={60}>
              <div className="gwch-alt-block">
                <div className="gwch-alt-content">
                  <h3 className="gwch-h3">What We Find When We Open the Walls</h3>
                  <p className="gwch-body-text">
                    Homes built in Orange during the 1960s and 1970s commonly contain original copper or galvanized plumbing, undersized electrical panels with fuse boxes instead of breakers, and in some cases, 9x9 vinyl floor tiles that may contain asbestos. None of this is unusual, and none of it is a reason to avoid renovation. It just requires a contractor who knows what to look for and how to handle it properly.
                  </p>
                  <p className="gwch-body-text">
                    We assess these conditions during the initial consultation so you know exactly what the project involves before any work begins. If abatement is required, we coordinate with certified environmental firms. If the panel needs upgrading, we plan for it in the original scope, not as a surprise change order after demolition starts.
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
                  <h3 className="gwch-h3">Your Neighborhood, Our Neighborhood</h3>
                  <p className="gwch-body-text">
                    We are headquartered right here in Orange on Boston Post Road. That means we are not commuting an hour to get to your house. When you call our office, you are reaching people who drive the same roads you do, who know the building inspector by name, and who understand how the town operates.
                  </p>
                  <p className="gwch-body-text">
                    That proximity shows up in faster response times, smoother permitting, and a level of familiarity with the area that out-of-town contractors simply do not have. We have worked on Race Brook Road, on Racebrook Farms, on Grassy Hill, and in the neighborhoods off of Orange Center Road. When a homeowner two streets from our office calls about a project, it is personal. This is our community, and the quality of our work here is our most visible calling card.
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
                <h2 className="gwch-h2">Orange Neighborhoods: What They Mean for <strong>Your Remodeling Project</strong></h2>
                <p className="gwch-section-subtitle">
                  Orange's neighborhoods were built across different decades and in different styles, and each area has specific construction patterns that shape what renovation work involves.
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
                <h2 className="gwch-h2">Permitting and Approvals in <strong>Orange, CT</strong></h2>
              </div>
              <p className="gwch-body-text">
                All building permits in Orange are issued through the Orange Building Department at the Town Hall on Orange Center Road. The permit process for residential remodeling projects is straightforward but thorough. Standard permit review for residential projects typically runs two to four weeks depending on scope and the time of year. Required documentation includes scaled drawings, a scope of work description, contractor license verification, and property survey information for projects that affect the building footprint. Any project involving structural changes, electrical work, plumbing modifications, or mechanical system alterations requires a permit. Kitchen and bathroom remodels that move plumbing or add circuits require separate trade permits for electrical and plumbing in addition to the building permit. We handle all permit applications, plan submissions, and inspection coordination as part of every project in Orange.
              </p>
              <h3 className="gwch-h3" style={{ marginTop: 32 }}>Zoning and Setbacks</h3>
              <p className="gwch-body-text">
                Orange's zoning regulations include setback requirements, lot coverage limits, and height restrictions that affect home additions, deck construction, and exterior modifications. Properties in Orange's residential zones have specific dimensional requirements that must be verified before construction begins. A zoning permit is required in addition to the building permit for any project that changes the building footprint. We verify all zoning compliance and setback dimensions before submitting permit applications to avoid delays.
              </p>
              <h3 className="gwch-h3" style={{ marginTop: 32 }}>Inland Wetlands</h3>
              <p className="gwch-body-text">
                Orange has an active Inland Wetlands Commission that reviews projects on properties near watercourses, wetlands, and regulated areas. Properties along the Indian River, the Wepawaug River, and other drainage corridors may require Inland Wetlands review for exterior work, additions, grading changes, and any activity within regulated setback areas. We check wetlands status during the consultation phase and coordinate any required applications before construction begins.
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
                <h2 className="gwch-h2">What Remodeling Costs in <strong>Orange, CT</strong></h2>
              </div>
              <p className="gwch-body-text">
                Home remodeling in Orange, CT costs $25,000 to $150,000+ for kitchens, $15,000 to $80,000+ for bathrooms, and $25,000 to $100,000+ for basements. As our home base, we know the local permit costs and building department requirements here better than anywhere.
              </p>
            </FadeUp>
            <FadeUp delay={40}><h3 className="gwch-cost-h3">Kitchen Remodeling Costs in Orange, CT</h3>
              <div className="gwch-cost-table-wrap"><table className="gwch-cost-table"><thead><tr><th>Tier</th><th>Scope</th><th>Typical Range</th></tr></thead><tbody>
                <tr><td>Basic</td><td>Cabinet refacing, new counters, appliances, paint</td><td className="gwch-td-price">$25,000 – $50,000</td></tr>
                <tr><td>Mid-Range</td><td>New cabinets, countertops, flooring, appliances, lighting</td><td className="gwch-td-price">$50,000 – $90,000</td></tr>
                <tr><td>High-End</td><td>Custom cabinets, layout changes, premium appliances</td><td className="gwch-td-price">$90,000 – $150,000+</td></tr>
              </tbody></table></div>
              <p className="gwch-body-text" style={{ marginTop: 12 }}>Orange's 1960s–1980s housing stock means kitchen renovations frequently involve updating original electrical panels from 100 to 200 amps, replacing galvanized supply lines, and addressing asbestos-containing floor tiles — costs that are part of the scope, not surprises.</p>
            </FadeUp>
            <FadeUp delay={60}><h3 className="gwch-cost-h3">Bathroom Remodeling Costs in Orange, CT</h3>
              <div className="gwch-cost-table-wrap"><table className="gwch-cost-table"><thead><tr><th>Tier</th><th>Scope</th><th>Typical Range</th></tr></thead><tbody>
                <tr><td>Basic</td><td>Fixtures, vanity, flooring, paint</td><td className="gwch-td-price">$15,000 – $25,000</td></tr>
                <tr><td>Mid-Range</td><td>Full gut, new tile, shower or tub, vanity, lighting</td><td className="gwch-td-price">$25,000 – $55,000</td></tr>
                <tr><td>High-End</td><td>Walk-in shower, premium fixtures, layout changes</td><td className="gwch-td-price">$55,000 – $80,000+</td></tr>
              </tbody></table></div>
            </FadeUp>
            <FadeUp delay={80}><h3 className="gwch-cost-h3">Basement Finishing Costs in Orange, CT</h3>
              <p className="gwch-body-text" style={{ marginBottom: 12 }}>Orange split-levels often have partially finished lower levels that make excellent candidates for full finishing. Moisture assessment is standard before framing begins.</p>
              <div className="gwch-cost-table-wrap"><table className="gwch-cost-table"><thead><tr><th>Tier</th><th>Scope</th><th>Typical Range</th></tr></thead><tbody>
                <tr><td>Basic</td><td>Framing, drywall, basic flooring, lighting, paint</td><td className="gwch-td-price">$25,000 – $45,000</td></tr>
                <tr><td>Mid-Range</td><td>Multiple rooms, upgraded flooring, bathroom rough-in</td><td className="gwch-td-price">$45,000 – $70,000</td></tr>
                <tr><td>High-End</td><td>Full bathroom, wet bar, custom built-ins</td><td className="gwch-td-price">$70,000 – $100,000+</td></tr>
              </tbody></table></div>
            </FadeUp>
            <FadeUp delay={100}><h3 className="gwch-cost-h3">Flooring Costs in Orange, CT</h3>
              <p className="gwch-body-text" style={{ marginBottom: 12 }}>Many Orange homes have original hardwood floors under carpet that are worth refinishing rather than replacing. We assess what is there and give you an honest recommendation.</p>
              <div className="gwch-cost-table-wrap"><table className="gwch-cost-table"><thead><tr><th>Material</th><th>Best For</th><th>Installed Cost/sq ft</th></tr></thead><tbody>
                <tr><td>Solid Hardwood</td><td>Living rooms, dining rooms, bedrooms</td><td className="gwch-td-price">$12 – $25</td></tr>
                <tr><td>Engineered Hardwood</td><td>Basements, moisture-prone areas</td><td className="gwch-td-price">$8 – $18</td></tr>
                <tr><td>Luxury Vinyl Plank</td><td>Basements, kitchens, high-traffic</td><td className="gwch-td-price">$6 – $14</td></tr>
                <tr><td>Tile</td><td>Bathrooms, kitchens, entryways</td><td className="gwch-td-price">$12 – $25</td></tr>
                <tr><td>Carpet</td><td>Bedrooms, basement rec rooms</td><td className="gwch-td-price">$4 – $12</td></tr>
              </tbody></table></div>
            </FadeUp>
            <FadeUp delay={120}><h3 className="gwch-cost-h3">Home Additions Costs in Orange, CT</h3>
              <div className="gwch-cost-table-wrap"><table className="gwch-cost-table"><thead><tr><th>Type</th><th>Scope</th><th>Typical Range</th></tr></thead><tbody>
                <tr><td>Bump-Out</td><td>Single-room expansion, 100-200 sq ft</td><td className="gwch-td-price">$150 – $400/sq ft</td></tr>
                <tr><td>Single-Story</td><td>Family room, sunroom, or garage conversion</td><td className="gwch-td-price">$150 – $400/sq ft</td></tr>
                <tr><td>Second-Story</td><td>Full second floor with structural support</td><td className="gwch-td-price">$200 – $400/sq ft</td></tr>
              </tbody></table></div>
            </FadeUp>
            <FadeUp delay={140}><h3 className="gwch-cost-h3">Interior Painting Costs in Orange, CT</h3>
              <div className="gwch-cost-table-wrap"><table className="gwch-cost-table"><thead><tr><th>Scope</th><th>Details</th><th>Typical Range</th></tr></thead><tbody>
                <tr><td>Per Square Foot</td><td>Walls, ceilings, trim, proper surface prep</td><td className="gwch-td-price">$3 – $6/sq ft</td></tr>
                <tr><td>Single Room</td><td>Average bedroom or living room</td><td className="gwch-td-price">$800 – $2,500</td></tr>
                <tr><td>Whole Home</td><td>Full interior, all rooms, trim, doors</td><td className="gwch-td-price">$8,000 – $25,000+</td></tr>
              </tbody></table></div>
            </FadeUp>
            <FadeUp delay={160}><h3 className="gwch-cost-h3">Interior Carpentry Costs in Orange, CT</h3>
              <p className="gwch-body-text" style={{ marginBottom: 12 }}>Orange colonials and split-levels often have original trim and built-in cabinetry that homeowners want preserved or updated during renovation. Custom millwork matching these mid-century profiles adds both material cost and lead time.</p>
              <div className="gwch-cost-table-wrap"><table className="gwch-cost-table"><thead><tr><th>Scope</th><th>Details</th><th>Typical Range</th></tr></thead><tbody>
                <tr><td>Hourly Rate</td><td>Custom trim, built-ins, shelving, wainscoting</td><td className="gwch-td-price">$75 – $150/hour</td></tr>
                <tr><td>Crown Molding</td><td>Per linear foot, installed</td><td className="gwch-td-price">$8 – $25/LF</td></tr>
                <tr><td>Custom Built-Ins</td><td>Bookcases, window seats, mudroom storage</td><td className="gwch-td-price">$3,000 – $15,000+</td></tr>
              </tbody></table></div>
            </FadeUp>
            <FadeUp delay={180}><h3 className="gwch-cost-h3">Additional Service Costs in Orange, CT</h3>
              <div className="gwch-cost-table-wrap"><table className="gwch-cost-table"><thead><tr><th>Service</th><th>Details</th><th>Typical Range</th></tr></thead><tbody>
                <tr><td>Attic Conversions</td><td>Framing, insulation, electrical, flooring, egress</td><td className="gwch-td-price">$50,000 – $150,000</td></tr>
                <tr><td>Decks and Porches</td><td>Wood, composite, or PVC with railings and permits</td><td className="gwch-td-price">$15,000 – $75,000</td></tr>
                <tr><td>Design and Planning</td><td>Layout, material selection, 3D rendering, permit drawings</td><td className="gwch-td-price">$2,500 – $15,000</td></tr>
                <tr><td>Comfort and Accessibility</td><td>Grab bars, walk-in showers, widened doorways, ramps</td><td className="gwch-td-price">$5,000 – $50,000</td></tr>
                <tr><td>Insurance Reconstruction</td><td>Fire, water, storm damage rebuilds with carrier coordination</td><td className="gwch-td-price">$25,000 – $250,000+</td></tr>
              </tbody></table></div>
            </FadeUp>
            <FadeUp delay={200}>
              <h3 className="gwch-h3" style={{ marginTop: 48 }}>What Drives Cost in This Market</h3>
              <p className="gwch-body-text">Orange's housing stock creates specific cost drivers that homeowners should understand before budgeting a renovation. Split-level construction adds complexity to structural work because the staggered floor plates create load paths that require careful engineering when walls are opened or removed. Homes built in the 1960s frequently have original systems — 100-amp electrical panels, galvanized plumbing, and outdated HVAC — that require full replacement rather than repair during a major renovation. Asbestos in 9x9 vinyl floor tiles and pipe insulation is common in this era of construction and requires professional abatement when disturbed, adding $2,000 to $8,000 depending on scope. Basement moisture in low-lying areas near the Wepawaug River and other drainage corridors requires waterproofing assessment and mitigation before finishing work can begin. These are not surprises if your contractor knows the area — they are standard scope items that belong in the original estimate.</p>
            </FadeUp>
          </div>
        </section>

        {/* ── 9. SERVICES ── */}
        <section className="gwch-services-section">
          <div className="gwch-section-inner">
            <FadeUp>
              <div className="gwch-section-header">
                <SectionLabel text="Our Services" />
                <h2 className="gwch-h2">Our Remodeling Services in <strong>Orange, CT</strong></h2>
                <p className="gwch-section-subtitle">
                  BuiltWell CT provides a full range of remodeling services in Orange including kitchen renovation, bathroom remodeling, basement finishing, flooring, home additions, interior painting, carpentry, attic conversions, decks, design, and accessibility modifications, all permitted and backed by CT HIC License #0668405. Orange's split-levels, colonials, and 1950s–1980s housing stock shape how we approach every project.
                </p>
              </div>
            </FadeUp>
            <div className="gwch-services-grid">
              {primaryServices.map((svc, i) => (
                <FadeUp key={svc.title} delay={i * 40}>
                  <article className="gwch-service-card">
                    <div className="gwch-service-img"><img src={svc.img} alt={svc.title} /></div>
                    <div className="gwch-service-body">
                      <h3 className="gwch-service-title"><Link href={svc.href}>{svc.title}</Link></h3>
                      <p className="gwch-service-desc">{svc.desc}</p>
                      <div className="gwch-service-badges">
                        <span className="gwch-badge">{svc.price}</span>
                        <span className="gwch-badge">{svc.time}</span>
                      </div>
                      <Link href={svc.href} className="gwch-learn-more">Get Started <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg></Link>
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
                      <div className="gwch-service-img"><img src={svc.img} alt={svc.title} /></div>
                      <div className="gwch-service-body">
                        <h3 className="gwch-service-title"><Link href={svc.href}>{svc.title}</Link></h3>
                        <p className="gwch-service-desc">{svc.desc}</p>
                        <div className="gwch-service-badges">
                          <span className="gwch-badge">{svc.price}</span>
                          <span className="gwch-badge">{svc.time}</span>
                        </div>
                        <Link href={svc.href} className="gwch-learn-more">Get Started <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg></Link>
                      </div>
                    </article>
                  </FadeUp>
                ))}
              </div>
            </div>
            <div className="gwch-services-toggle-wrap">
              <button type="button" className="gwch-services-toggle" onClick={() => setServicesOpen((v) => !v)}>
                {servicesOpen ? 'Show Less' : 'Show 6 More Services'}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ transform: servicesOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }}><polyline points="6 9 12 15 18 9" /></svg>
              </button>
            </div>
          </div>
        </section>

        {/* ── 10. MID-PAGE CTA ── */}
        <div style={{ position: 'relative', overflow: 'hidden', padding: '64px 0' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #1E2B43 0%, #151E30 100%)' }} />
          <div style={{ position: 'absolute', inset: 0, backgroundImage: "url('/portfolio/builtwell-contractor-client-consultation-ct.jpeg')", backgroundPosition: 'center 15%', backgroundSize: 'cover', opacity: 0.25 }} />
          <div style={{ position: 'relative', zIndex: 1, maxWidth: 700, margin: '0 auto', textAlign: 'center', padding: '0 32px' }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px, 3.5vw, 40px)', color: '#fff', marginBottom: 12 }}>
              Ready to Remodel in <span style={{ color: '#BC9155' }}>Orange</span>?
            </h2>
            <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.7)', marginBottom: 28 }}>Right from our headquarters on Boston Post Road — your neighbors trust us with their homes. We know Orange inside and out.</p>
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
                We handle all Orange permits, Building Department submissions, zoning verification, Inland Wetlands coordination where applicable, inspection scheduling, and subcontractor management under CT HIC License #0668405, with daily progress updates and a five-step process covering consultation through final walkthrough. We carry full liability insurance and workers' compensation, and we do not start a project until permits are pulled and the scope is in writing with a clear timeline attached.
              </p>
              <p className="gwch-body-text">
                Our five-step process covers every project regardless of scale: Consultation, Planning, Selections, Build, and Walkthrough. You can read through the full process at <Link href="/process/" className="gwch-inline-link">/process/</Link>. In practice, what this means for an Orange project is that the planning phase accounts for the specific construction patterns of the home's era, the permit requirements of the Orange Building Department, and the material and system conditions that are standard in housing stock from the 1950s through 1980s.
              </p>
              <p className="gwch-body-text">
                During active construction, you receive daily updates on progress and a clean job site at the end of every workday. If something unexpected turns up inside a wall, you hear from us that day with an explanation of what we found and your options before we proceed.
              </p>
              <h3 className="gwch-h3" style={{ marginTop: 32 }}>New Haven County Project Reference</h3>
              <p className="gwch-body-text">
                Our work in New Haven County includes a whole-home restoration in nearby Hamden, where the project involved flooring, interior painting, bathroom remodeling, and drywall throughout a home that had sustained significant damage. "We were devastated when we saw the damage. BuiltWell took everything off our plate," said the Martins, Hamden. You can read the full case study at <Link href="/case-studies/whole-home-restoration-hamden/" className="gwch-inline-link">/case-studies/whole-home-restoration-hamden/</Link>.
              </p>
              <p className="gwch-body-text">
                Orange projects are served from our <Link href="/new-haven-county/orange-ct/" className="gwch-inline-link">Orange, CT office</Link> at 206A Boston Post Road. For county-level context on the full scope of what we do in this market, visit <Link href="/new-haven-county/" className="gwch-inline-link">/new-haven-county/</Link>.
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
                <h2 className="gwch-h2">Frequently Asked Questions: <strong>Orange Remodeling</strong></h2>
                <p className="gwch-section-subtitle">
                  Orange homeowners most commonly ask about remodeling costs, split-level renovation challenges, project timelines, and what to expect when working with a local contractor.
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
        <SharedAreasSection data={{
          eyebrow: 'Nearby Towns',
          title: 'New Haven County and Fairfield County Towns We Also Serve',
          highlight_text: 'We Also Serve',
          subtitle: 'We serve all of New Haven County and Fairfield County from our headquarters in Orange, CT. Orange is our home base — the town where we know the roads, the housing stock, and the Building Department best.',
          counties: [
            {
              name: 'New Haven County',
              phone: '(203) 466-9148',
              image: '/images/areas/new-haven-county.jpg',
              description: 'Served from our Orange, CT headquarters. We cover every town in the county with dedicated local crews who know the housing stock and building departments.',
              towns: primaryTowns.map((t) => t.name),
              extra_towns: moreTowns,
              town_links: Object.fromEntries(primaryTowns.filter((t) => t.href).map((t) => [t.name, t.href as string])),
              url: '/new-haven-county/',
              cta_label: 'Learn more about New Haven County',
            },
            {
              name: 'Fairfield County',
              phone: '(203) 919-9616',
              image: '/images/areas/fairfield-county.jpg',
              description: 'Served from our Orange, CT office. We cover Fairfield County towns with the same local expertise.',
              towns: fairfieldPrimaryTowns.map((t) => t.name),
              extra_towns: fairfieldMoreTowns,
              town_links: Object.fromEntries(fairfieldPrimaryTowns.filter((t) => t.href).map((t) => [t.name, t.href as string])),
              url: '/fairfield-county/',
              cta_label: 'Learn more about Fairfield County',
            },
          ],
        }} />

        {/* ── 14. TRUST STRIP ── */ /* ORDER: TrustStrip → CTAForm → Office → Financing */}
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
                      <label htmlFor="o-name">Name *</label>
                      <input type="text" id="o-name" name="name" placeholder="Your full name" required />
                    </div>
                    <div className="gwch-form-group">
                      <label htmlFor="o-phone">Phone *</label>
                      <input type="tel" id="o-phone" name="phone" placeholder="(203) 000-0000" required />
                    </div>
                    <div className="gwch-form-group">
                      <label htmlFor="o-email">Email *</label>
                      <input type="email" id="o-email" name="email" placeholder="you@email.com" required />
                    </div>
                    <div className="gwch-form-group">
                      <label htmlFor="o-zip">Zip Code *</label>
                      <input type="text" id="o-zip" name="zip" placeholder="06477" maxLength={5} required />
                    </div>
                  </div>
                  <div className="gwch-form-row gwch-form-row-3">
                    <div className="gwch-form-group">
                      <label htmlFor="o-services">Services Needed *</label>
                      <select id="o-services" name="services">
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
                      <label htmlFor="o-time">Best Time to Contact *</label>
                      <select id="o-time" name="best_time" required>
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
                    <label htmlFor="o-message">Tell Us About Your Project</label>
                    <textarea id="o-message" name="message" rows={4} placeholder="Tell us about your project, what rooms, what changes, any timeline or budget considerations..." />
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
                      <p>Fairfield County: <a href="tel:2039199616">(203) 919-9616</a></p>
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
        .gwch-hero-bg-orange { background-image: url('/portfolio/builtwell-team-office-exterior-ct.jpg') !important; background-position: center 35% !important; }
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
        .gwch-housing-bg-orange { background-image: url('/images/areas/orange-ct-split-level.jpg') !important; background-position: center 40% !important; }
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
        .gwch-services-section { background: var(--gwch-cream); }
        .gwch-services-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin-bottom: 24px; }
        @media (max-width: 900px) { .gwch-services-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 600px) { .gwch-services-grid { grid-template-columns: 1fr; } }
        .gwch-services-more { display: none; }
        .gwch-services-more.show { display: block; }
        .gwch-services-toggle-wrap { text-align: center; margin-top: 24px; }
        .gwch-services-toggle { display: inline-flex; align-items: center; gap: 8px; padding: 12px 28px; border: 2px solid var(--gwch-gold); border-radius: 8px; background: transparent; color: var(--gwch-gold); font-size: 15px; font-weight: 600; cursor: pointer; transition: all 0.25s; }
        .gwch-services-toggle:hover { background: var(--gwch-gold); color: #fff; }
        .gwch-service-card { display: flex; flex-direction: column; background: #fff; border-radius: 12px; overflow: hidden; border-bottom: 2px solid transparent; box-shadow: 0 2px 12px rgba(30,43,67,0.06); transition: all 0.35s cubic-bezier(0.4,0,0.2,1); }
        .gwch-service-card:hover { transform: translateY(-4px); border-bottom-color: var(--gwch-gold); box-shadow: 0 12px 28px rgba(30,43,67,0.1); }
        .gwch-service-img { height: 200px; overflow: hidden; }
        .gwch-service-img img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease; }
        .gwch-service-card:hover .gwch-service-img img { transform: scale(1.05); }
        .gwch-service-body { flex: 1; display: flex; flex-direction: column; padding: 24px; }
        .gwch-service-title { font-size: 18px; font-weight: 700; color: var(--gwch-navy); margin: 0 0 8px; }
        .gwch-service-title a { color: inherit; text-decoration: none; transition: color 0.2s; }
        .gwch-service-title a:hover { color: var(--gwch-gold); }
        .gwch-service-desc { font-size: 14px; line-height: 1.7; color: var(--gwch-muted); flex: 1; margin: 0 0 16px; }
        .gwch-service-badges { display: flex; gap: 8px; margin-bottom: 16px; flex-wrap: wrap; }
        .gwch-badge { display: inline-block; padding: 4px 10px; border-radius: 20px; background: var(--gwch-cream); font-size: 12px; font-weight: 600; color: var(--gwch-navy); border: 1px solid var(--gwch-border); }
        .gwch-learn-more { display: inline-flex; align-items: center; gap: 6px; font-size: 14px; font-weight: 600; color: var(--gwch-gold); text-decoration: none; transition: gap 0.3s; margin-top: auto; }
        .gwch-learn-more:hover { gap: 10px; }
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
      `}</style>
    </div>
  );
}

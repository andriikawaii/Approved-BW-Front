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

// ─── LeadForm ─────────────────────────────────────────────────────────────────
const SERVICE_OPTIONS = [
  'Kitchen Remodeling',
  'Bathroom Remodeling',
  'Basement Finishing',
  'Flooring',
  'Home Addition',
  'Interior Painting',
  'Interior Carpentry',
  'Attic Conversion',
  'Deck / Porch',
  'Design & Planning',
  'Accessibility Modifications',
  'Not Sure Yet',
];

const TIME_OPTIONS = [
  'Morning (8am – 12pm)',
  'Afternoon (12pm – 4pm)',
  'Evening (4pm – 6pm)',
  'Anytime',
];

const CONTACT_OPTIONS = [
  { label: 'Call', value: 'call' },
  { label: 'Text', value: 'text' },
  { label: 'Email', value: 'email' },
];

function LeadForm({
  showConsultationType = false,
  formId,
  submitLabel = 'Schedule Free Consultation',
}: {
  showConsultationType?: boolean;
  formId: string;
  submitLabel?: string;
}) {
  const [consultType, setConsultType] = useState<'in-home' | 'remote'>('in-home');
  const [services, setServices] = useState<string[]>([]);
  const [svcOpen, setSvcOpen] = useState(false);
  const [bestTime, setBestTime] = useState('');
  const [contactMethod, setContactMethod] = useState('call');
  const [message, setMessage] = useState('');
  const [fileNames, setFileNames] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [zip, setZip] = useState('');
  const svcRef = useRef<HTMLDivElement>(null);

  const toggleService = (svc: string) =>
    setServices((prev) => prev.includes(svc) ? prev.filter((s) => s !== svc) : [...prev, svc]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (svcRef.current && !svcRef.current.contains(e.target as Node)) setSvcOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const svcLabel = services.length === 0
    ? 'Select services'
    : services.length === 1
      ? services[0]
      : `${services.length} services selected`;

  if (submitted) {
    return (
      <div className="gwch-form-card">
        <div className="gwch-form-thanks">
          <h3>Thank You!</h3>
          <p>We received your request and will confirm your appointment within one business day.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="gwch-form-card">
      <form
        className="gwch-form"
        onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
      >
        {showConsultationType && (
          <div className="gwch-field">
            <span className="gwch-field-label">Consultation Type *</span>
            <div className="gwch-radio-row">
              {(['in-home', 'remote'] as const).map((val) => (
                <label
                  key={val}
                  className={`gwch-radio-btn${consultType === val ? ' gwch-radio-active' : ''}`}
                >
                  <input
                    type="radio"
                    name={`${formId}-consult`}
                    value={val}
                    checked={consultType === val}
                    onChange={() => setConsultType(val)}
                  />
                  {val === 'in-home' ? 'In-Home Visit' : 'Remote (Zoom/Meet)'}
                </label>
              ))}
            </div>
          </div>
        )}

        <div className="gwch-form-2col">
          <div className="gwch-field">
            <label className="gwch-field-label" htmlFor={`${formId}-name`}>Name *</label>
            <input id={`${formId}-name`} type="text" required value={name}
              onChange={(e) => setName(e.target.value)} placeholder="Your full name" />
          </div>
          <div className="gwch-field">
            <label className="gwch-field-label" htmlFor={`${formId}-phone`}>Phone *</label>
            <input id={`${formId}-phone`} type="tel" required value={phone}
              onChange={(e) => setPhone(e.target.value)} placeholder="(203) 000-0000" />
          </div>
          <div className="gwch-field">
            <label className="gwch-field-label" htmlFor={`${formId}-email`}>Email *</label>
            <input id={`${formId}-email`} type="email" required value={email}
              onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com" />
          </div>
          <div className="gwch-field">
            <label className="gwch-field-label" htmlFor={`${formId}-zip`}>Zip Code *</label>
            <input id={`${formId}-zip`} type="text" required value={zip}
              onChange={(e) => setZip(e.target.value)} placeholder="06830"
              pattern="[0-9]{5}" maxLength={5} />
          </div>
        </div>

        <div className="gwch-form-2col">
          <div className="gwch-field" ref={svcRef} style={{ position: 'relative' }}>
            <span className="gwch-field-label">Services Needed *</span>
            <button
              type="button"
              className={`gwch-svc-toggle${svcOpen ? ' gwch-svc-open' : ''}`}
              onClick={() => setSvcOpen((o) => !o)}
              aria-expanded={svcOpen}
            >
              <span className={services.length > 0 ? 'gwch-svc-selected' : ''}>{svcLabel}</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            {svcOpen && (
              <div className="gwch-svc-dropdown">
                {SERVICE_OPTIONS.map((svc) => (
                  <label key={svc} className="gwch-svc-option">
                    <input
                      type="checkbox"
                      checked={services.includes(svc)}
                      onChange={() => toggleService(svc)}
                    />
                    {svc}
                  </label>
                ))}
              </div>
            )}
          </div>
          <div className="gwch-field">
            <label className="gwch-field-label" htmlFor={`${formId}-time`}>Best Time to Contact *</label>
            <select id={`${formId}-time`} value={bestTime} onChange={(e) => setBestTime(e.target.value)}>
              <option value="" disabled>Select a time</option>
              {TIME_OPTIONS.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
        </div>

        <div className="gwch-field">
          <span className="gwch-field-label">Preferred Contact Method *</span>
          <div className="gwch-radio-row">
            {CONTACT_OPTIONS.map((opt) => (
              <label key={opt.value} className={`gwch-radio-btn${contactMethod === opt.value ? ' gwch-radio-active' : ''}`}>
                <input
                  type="radio"
                  name={`${formId}-contact`}
                  value={opt.value}
                  checked={contactMethod === opt.value}
                  onChange={() => setContactMethod(opt.value)}
                />
                {opt.label}
              </label>
            ))}
          </div>
        </div>

        <div className="gwch-field">
          <label className="gwch-field-label" htmlFor={`${formId}-message`}>Tell Us About Your Project</label>
          <textarea
            id={`${formId}-message`}
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="What rooms, what changes, any timeline or budget considerations..."
          />
        </div>

        <div className="gwch-form-bottom">
          <div>
            <label className="gwch-upload-btn" htmlFor={`${formId}-files`}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
              Upload Photos
            </label>
            <input id={`${formId}-files`} type="file" multiple
              accept="image/jpeg,image/png,image/heic,.heic"
              style={{ display: 'none' }}
              onChange={(e) => setFileNames(Array.from(e.target.files || []).map((f) => f.name))}
            />
            {fileNames.length > 0 && <p className="gwch-file-names">{fileNames.join(', ')}</p>}
          </div>
          <button type="submit" className="gwch-submit-btn">{submitLabel}</button>
        </div>

        <p className="gwch-form-note">We respond within 24 hours. No spam, no obligation.</p>
      </form>
    </div>
  );
}

// ─── Main Template ─────────────────────────────────────────────────────────────
export function GreenwichCTPageTemplate({ page: _page }: { page: CMSPage }) {
  const [servicesOpen, setServicesOpen] = useState(false);
  const [townsExpanded, setTownsExpanded] = useState(false);

  const primaryServices = [
    {
      title: 'Kitchen Remodeling',
      href: '/kitchen-remodeling/greenwich-ct/',
      img: '/images/services/service-kitchen.jpg',
      desc: 'Full kitchen renovations in Greenwich including cabinetry, countertops, tile, electrical, plumbing, and permits.',
      price: '$40K-$400K+',
      time: '6-12 weeks',
    },
    {
      title: 'Bathroom Remodeling',
      href: '/bathroom-remodeling/greenwich-ct/',
      img: '/images/services/bathroom-remodel-new.jpg',
      desc: 'Complete bathroom renovations in Greenwich — tile, vanities, showers, tubs, and plumbing upgrades.',
      price: '$15K-$120K+',
      time: '3-6 weeks',
    },
    {
      title: 'Basement Finishing',
      href: '/basement-finishing/greenwich-ct/',
      img: '/images/services/basement-finish-real.jpeg',
      desc: 'Convert unfinished basements into living space in Greenwich with proper waterproofing and egress.',
      price: '$25K-$100K+',
      time: '4-8 weeks',
    },
    {
      title: 'Flooring',
      href: '/flooring/greenwich-ct/',
      img: '/images/services/service-flooring.png',
      desc: 'Hardwood, LVP, tile, and engineered wood flooring for Greenwich homes with expert subfloor preparation.',
      price: '$6-$25/sq ft',
      time: '2-5 days',
    },
    {
      title: 'Home Additions',
      href: '/home-additions/',
      img: '/images/services/living-room-real.jpeg',
      desc: 'Single-story and second-story additions, sunrooms, and bump-outs for Greenwich homeowners with full structural work.',
      price: '$150-$400/sq ft',
      time: '8-16 weeks',
    },
    {
      title: 'Interior Painting',
      href: '/interior-painting/',
      img: '/images/services/interior-painting-new.jpg',
      desc: 'Walls, ceilings, trim, doors, and built-ins for Greenwich homes with professional-grade paints and proper prep.',
      price: '$3-$6/sq ft',
      time: '2-5 days',
    },
  ];

  const moreServices = [
    {
      title: 'Interior Carpentry',
      href: '/interior-carpentry/',
      img: '/images/services/service-kitchen.jpg',
      desc: 'Custom millwork, built-in cabinetry, wainscoting, crown molding, coffered ceilings, closet systems, and finish trim for Greenwich properties.',
      price: '$75-$150/hr',
      time: 'Varies',
    },
    {
      title: 'Attic Conversions',
      href: '/attic-conversions/',
      img: '/images/services/basement-finish-real.jpeg',
      desc: 'Converting unfinished attics in Greenwich into bedrooms, offices, or playrooms — structural assessment through final finish.',
      price: '$50K-$150K',
      time: '6-12 weeks',
    },
    {
      title: 'Decks & Porches',
      href: '/decks-porches/',
      img: '/images/services/living-room-real.jpeg',
      desc: 'Pressure-treated lumber, composite, and hardwood decks for Greenwich homes. Covered porches, screened-in structures, pergolas, and multi-level decks.',
      price: '$15K-$75K',
      time: '2-4 weeks',
    },
    {
      title: 'Design & Planning',
      href: '/remodeling-design-planning/',
      img: '/images/services/service-kitchen.jpg',
      desc: 'Space planning, material selection, finish coordination, and project documentation for Greenwich remodels before construction begins.',
      price: '$2.5K-$15K',
      time: '2-6 weeks',
    },
    {
      title: 'Comfort & Accessibility',
      href: '/comfort-accessibility-remodeling/',
      img: '/images/services/bathroom-remodel-new.jpg',
      desc: 'Grab bars, roll-in showers, wider doorways, ramp installation, and first-floor adaptations for Greenwich residents of all ages and abilities.',
      price: '$5K-$50K',
      time: '1-4 weeks',
    },
    {
      title: 'Insurance Reconstruction',
      href: '/insurance-restoration/',
      img: '/portfolio/builtwell-contractor-handshake-arrival-ct-optimized.jpg',
      desc: 'Rebuilding Greenwich homes after fire, water, and storm damage. Full reconstruction once cleanup is complete, working directly with your insurance carrier.',
      price: '$25K-$250K+',
      time: '4-16 weeks',
    },
  ];

  const neighborhoods = [
    {
      name: 'Back Country, Greenwich',
      body: "Back Country sits north of the Merritt Parkway in the RA-4 zone, where minimum lot sizes run four acres. The housing stock here is the estate belt: French Provincial manors, Georgian colonials, and English manor houses built primarily in the 1920s through the 1940s for New York financiers. Primary residences here routinely run 10,000 to 25,000 square feet, and projects in Back Country often involve multiple structures simultaneously: main house, guest house, pool house, carriage house. Gated enclaves like Conyers Farm define the character of this neighborhood. Projects at this scale require careful scheduling, multiple permit applications running in parallel, and crews who can work at the finish level these homes demand. Material quality is not negotiable here; it is the starting point.",
    },
    {
      name: 'Mid-Country, Greenwich',
      body: "Mid-Country occupies the band between the Merritt Parkway and the Post Road, with one- to four-acre properties and a housing stock that runs from 1950s colonials through 1980s split-levels and ranches. Neighborhoods like Khakum Wood represent the character of this zone. Since the early 2000s, Mid-Country has seen sustained gut-renovation and replacement activity as buyers absorb older properties and rebuild or fully renovate them to current expectations. The structural conditions here are more varied than in Back Country. You can encounter anything from a conventional 1960s ranch with standard platform framing to a 1930s colonial that has been partially updated three times by three different owners, each with different standards.",
    },
    {
      name: 'Old Greenwich, CT',
      body: "Old Greenwich is the original settlement, established in 1640, and the housing stock reflects that history: pre-Revolutionary colonials, 1920s Tudor revivals, and post-war capes clustered around Sound Beach Avenue near the shops and train station. The Indian Harbor and Field Club neighborhoods carry premiums that reflect both location and architectural quality. Renovation work in Old Greenwich frequently involves historic materials, original woodwork, and footprints that were laid out before modern concepts of kitchen or bathroom function existed. Layout changes here require structural evaluation and often HDC review for any work that touches the exterior.",
    },
    {
      name: 'Cos Cob, Greenwich',
      body: "Cos Cob grew as a fishing and mill community along the Mianus River, and its housing stock is the oldest and densest in Greenwich outside of Old Greenwich proper. Late Victorian cottages, New England colonials from the 1880s through the 1920s, and post-war ranches characterize the neighborhood. The Bush-Holley House, built circa 1730 and now a National Historic Landmark, sits here and speaks to the age of the built environment. The Mianus River corridor creates elevated water table conditions throughout Cos Cob, and basement work in this neighborhood consistently requires perimeter drainage and sump systems as a baseline measure. Younger buyers who enter the market at Cos Cob's relatively lower price points have been investing heavily in renovation here, making it one of the most active sections of Greenwich for remodeling activity.",
    },
    {
      name: 'Riverside, Greenwich',
      body: "Riverside is characterized by shingle-style homes and New England colonial revivals built from the 1890s through the 1930s, with post-war colonial revival construction filling in the later decades. Streets like Hendrie Avenue and Sound Beach Avenue carry price tags in the $3 million to $8 million range, which sets the baseline for what finish quality means in this neighborhood. Coastal proximity brings moisture considerations for any project that touches the lower level or exterior envelope. When we work in Riverside, the finish level and material quality need to be consistent with what these homes already represent.",
    },
    {
      name: 'Glenville, Greenwich',
      body: "Glenville grew as a mill town along the Byram River and holds Greenwich's most attainable entry-level price points. The housing stock runs to ranches, bi-levels, and cape cods, with some larger colonials mixed in. Glenville has been experiencing teardown activity as buyers seek a Greenwich address at a lower acquisition cost, which means the neighborhood is in the middle of a generational shift in its building stock. For renovation projects on existing homes, the 1950s through 1970s construction here is generally straightforward from a structural standpoint, though below-grade work should still carry a ledge contingency given the geology of the area.",
    },
    {
      name: 'Byram, Greenwich',
      body: "Byram occupies Greenwich's southwesternmost corner, bordering Port Chester, New York, and has the most urban character of any Greenwich neighborhood. Multi-family housing, older worker cottages, and small colonials define the stock. It is Greenwich's most affordable entry point. Renovation projects in Byram tend to be practical and value-driven, but the older housing stock (much of it from the late 19th and early 20th century) brings the same plaster walls, balloon framing, and stone foundation conditions found elsewhere in pre-war Greenwich.",
    },
    {
      name: 'Belle Haven, Greenwich',
      body: "Belle Haven is a private, gated peninsula community situated between Old Greenwich and Riverside along Greenwich Harbor. The housing stock consists primarily of estate-scale residences built from the late 1800s through the early 1900s, with significant modern rebuilds on the same lots. Properties here sit on the waterfront or have direct harbor views, which means salt air exposure, elevated water tables, and coastal building code requirements factor into every project. Interior renovations in Belle Haven routinely involve premium finishes, custom millwork, and material specifications that reflect the character of the neighborhood. Exterior modifications require approval through the Belle Haven Land Trust in addition to standard Greenwich permitting. Projects here demand crews who understand both the structural realities of coastal construction and the finish-level expectations of this community.",
    },
  ];

  const faqItems = [
    {
      q: 'Do I need a permit for kitchen remodeling in Greenwich, CT?',
      a: 'Yes. Nearly all kitchen remodeling projects in Greenwich require permits, and the process involves multiple town departments. The building permit fee is $13.26 per $1,000 of renovation budget. Electrical and plumbing permits each carry a separate fee of $12 per $1,000. If your home was built before 1940, a 5% surcharge applies. Before the building permit is issued, sign-offs are required from Zoning, Health, the Fire Marshal, and DPW independently. On interior projects, the review may take a few weeks. On projects involving structural changes, new square footage, or exterior modifications, it can take several months. We handle all permit applications and inspection coordination as part of every project. If your home is within a Historic Overlay or Historic Residential Overlay district, HDC Certificate of Appropriateness review is an additional required step for exterior changes.',
    },
    {
      q: 'How much does a kitchen remodel cost in Greenwich, CT?',
      a: 'Kitchen remodeling in Greenwich ranges from $40,000 to $400,000 or more depending on scope. A minor refresh (new cabinet doors, countertops, appliances, and paint) runs $40,000 to $80,000. A major mid-range project with new cabinets, updated floors, and a layout change runs $90,000 to $140,000. A full-custom renovation with structural changes and premium materials typically runs $200,000 to $400,000. What drives costs above statewide averages: material expectations start higher, permit fees and multi-department processing add to the budget, custom millwork to match original profiles in pre-war homes adds both cost and lead time, and any below-grade or addition work should carry a ledge contingency of $20,000 to $80,000 depending on rock conditions.',
    },
    {
      q: 'How long does a kitchen remodel take in Greenwich?',
      a: 'Active construction on a kitchen remodel in Greenwich typically takes 6 to 12 weeks depending on the scope of work. Custom cabinet orders, which are standard for high-end Greenwich projects, add 8 to 12 weeks of lead time before construction begins. Semi-custom cabinets reduce that window to 4 to 6 weeks. The permit process in Greenwich adds additional time before construction can start: a straightforward interior project may clear in a few weeks, while a project requiring structural review or Historic District Commission approval can take several months. We build all of these lead times into the project schedule during the planning phase so your start date reflects what is actually achievable.',
    },
    {
      q: 'What makes Greenwich homes more complex to remodel than other CT towns?',
      a: 'Several factors combine to make Greenwich remodeling more technically demanding than most Connecticut markets. Approximately 35% of Greenwich housing units predate 1940, which means a large share of projects involve plaster-on-lath walls, balloon framing without fire blocking at floor lines, and stone foundations without modern footings. Rock ledge is present throughout elevated areas north and west of the Post Road, and hydraulic hammering rather than blasting is required, adding $20,000 to $80,000 or more to any excavation project. High water tables in Cos Cob, Byram, and coastal areas near Old Greenwich and Riverside require drainage solutions as a baseline for basement work. Original trim profiles in pre-war homes require custom millwork to match. And the permitting environment requires multi-department sign-offs from Zoning, Health, the Fire Marshal, and DPW, with HDC review adding a further step for properties in historic overlay zones.',
    },
    {
      q: 'Does BuiltWell serve both Fairfield County and New Haven County?',
      a: 'Yes. We serve all of Fairfield County through our Fairfield County Service Area Team, and all of New Haven County through our team based in Orange, CT. Greenwich and the other Fairfield County towns (Westport, Darien, New Canaan, Stamford, Norwalk, Fairfield, and Ridgefield) are served by the Fairfield County team at (203) 919-9616. New Haven County towns including Orange, New Haven, Hamden, Branford, Guilford, Madison, Woodbridge, and Milford are served by the New Haven County team. For the full list of towns we serve across both counties, visit /areas-we-serve/.',
    },
    {
      q: "Does homeowner's insurance cover reconstruction after fire or water damage in Greenwich, CT?",
      a: "Yes, most homeowner's insurance policies cover reconstruction after fire or water damage, though the scope of coverage depends on your specific policy and the cause of the loss. We work directly with carriers including State Farm, Liberty Mutual, Travelers, Aetna, and others that commonly insure Greenwich properties. The process starts with filing your claim and getting an adjuster assigned. From there, we coordinate directly with your insurance company on scope documentation, pricing, and supplemental requests. We handle the rebuild from demo through final inspection, and we bill the carrier directly so you are not managing payments between us and your insurer. On fire damage projects in Greenwich, reconstruction timelines typically run 3 to 6 months depending on the extent of structural damage. We hold CT HIC License #0668405 and carry the insurance requirements that carriers expect from reconstruction contractors.",
    },
    {
      q: 'What is the best flooring for homes in Greenwich, CT?',
      a: 'The best flooring for Greenwich homes depends on the age of the house, the room, and how you use the space. Hardwood remains the most popular choice in Greenwich and typically runs $12 to $25 per square foot installed for solid oak or maple, and $15 to $35 for wider plank white oak or walnut. In pre-war homes with existing hardwood, refinishing the original floors costs $4 to $8 per square foot and preserves the character of the home. For kitchens, mudrooms, and bathrooms, large-format porcelain tile or luxury vinyl plank offers better moisture resistance than hardwood. In below-grade spaces like finished basements, we recommend engineered hardwood or luxury vinyl plank because solid hardwood can warp with the moisture conditions common in Greenwich\'s high water table areas near Cos Cob and Old Greenwich.',
    },
  ];

  const primaryTowns = [
    { name: 'Greenwich', href: null, highlight: true },
    { name: 'Westport', href: '/fairfield-county/westport-ct/' },
    { name: 'Darien', href: '/fairfield-county/' },
    { name: 'New Canaan', href: '/fairfield-county/' },
    { name: 'Stamford', href: '/fairfield-county/' },
    { name: 'Norwalk', href: '/fairfield-county/' },
    { name: 'Fairfield', href: '/fairfield-county/' },
    { name: 'Ridgefield', href: '/fairfield-county/' },
  ];

  const moreTowns = [
    'Bethel', 'Bridgeport', 'Brookfield', 'Danbury', 'Easton',
    'Monroe', 'New Fairfield', 'Newtown', 'Redding', 'Shelton',
    'Sherman', 'Stratford', 'Trumbull', 'Weston', 'Wilton',
  ];

  return (
    <div className="gwch-page">
      <main id="main">

        {/* ── 1. HERO ─────────────────────────────────────────────────── */}
        <section className="gwch-page-hero">
          <div className="gwch-hero-bg" />
          <div className="gwch-hero-gradient" />
          <div className="gwch-hero-inner">
            <ol className="gwch-breadcrumb">
              <li><Link href="/">Home</Link></li>
              <li aria-hidden="true" className="gwch-bc-sep">›</li>
              <li><Link href="/areas-we-serve/">Areas We Serve</Link></li>
              <li aria-hidden="true" className="gwch-bc-sep">›</li>
              <li><Link href="/fairfield-county/">Fairfield County</Link></li>
              <li aria-hidden="true" className="gwch-bc-sep">›</li>
              <li><span className="gwch-bc-current">Greenwich, CT</span></li>
            </ol>
            <h1 className="gwch-hero-h1">
              Home Remodeling in <span className="gwch-gold">Greenwich, CT</span>
            </h1>
            <p className="gwch-hero-sub">
              Home remodeling in Greenwich, CT from kitchens and bathrooms to full renovations. Licensed Fairfield County contractor with 15+ years experience serving Greenwich homeowners.
            </p>
            <div className="gwch-hero-ctas">
              <Link href="#contact" className="gwch-cta-btn gwch-cta-primary">Get Your Free Estimate</Link>
              <a href="tel:2039199616" className="gwch-cta-btn">Call (203) 919-9616</a>
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

        {/* ── 3. INTRO + INLINE FORM ────────────────────────────────── */}
        <section className="gwch-intro-section">
          <div className="gwch-intro-inner">
            <FadeUp>
              <div className="gwch-intro-header">
                <SectionLabel text="Greenwich Remodeling" />
                <h2 className="gwch-h2">
                  Professional Home Remodeling in <strong>Greenwich, CT</strong>
                </h2>
              </div>
              <p className="gwch-intro-body">
                Home remodeling in Greenwich, CT starts around $40,000 for a minor kitchen refresh and reaches $400,000 or more for a full custom renovation in Back Country. The housing stock here spans pre-Revolutionary colonials in Old Greenwich, 1920s Georgian estates in Back Country, and post-war ranches in Glenville and Byram, each with its own structural demands, permitting requirements, and finish expectations. We hold CT HIC License #0668405 and serve Greenwich through our{' '}
                <Link href="/fairfield-county/" className="gwch-inline-link">Fairfield County Service Area Team</Link>.
              </p>
            </FadeUp>

            <FadeUp delay={100}>
              <div style={{ marginTop: 36, padding: 28, background: 'rgba(188,145,85,0.06)', borderRadius: 10, textAlign: 'center' }}>
                <p style={{ fontSize: 17, fontWeight: 600, color: '#1E2B43', margin: '0 0 8px' }}>Ready to discuss your Greenwich renovation?</p>
                <p style={{ fontSize: 14, color: '#5C677D', margin: '0 0 16px' }}>In-home visit or remote via Google Meet or Zoom. No obligation.</p>
                <Link href="#contact" className="gwch-cta-btn gwch-cta-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 32px', fontSize: 15 }}>Get Your Free Estimate</Link>
                <p style={{ fontSize: 13, color: '#5C677D', margin: '12px 0 0' }}>Or call Fairfield County: <a href="tel:2039199616" className="gwch-inline-link">(203) 919-9616</a></p>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* ── 4. HOUSING STOCK BANNER ───────────────────────────────── */}
        <section className="gwch-housing-banner">
          <div className="gwch-housing-bg" />
          <div className="gwch-housing-gradient" />
          <div className="gwch-housing-inner">
            <FadeUp>
              <SectionLabel text="Housing Stock" dark />
              <h2 className="gwch-h2 gwch-text-white">
                Greenwich Homes and What <strong>They Require</strong>
              </h2>
              <p className="gwch-housing-body">
                Approximately 35% of Greenwich housing units predate 1940, featuring balloon framing, plaster-on-lath walls, stone foundations, and custom millwork that require specialized remodeling approaches distinct from modern construction. Greenwich housing spans nearly four centuries, from 1640-era colonial-period structures in Old Greenwich to 1920s French Provincial estates in Back Country to post-war ranches in Glenville and Byram.
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
                  <img src="/images/areas/greenwich-colonial-home.jpg" alt="Greenwich colonial home with balloon framing" />
                </div>
                <div className="gwch-alt-content">
                  <h3 className="gwch-h3">Pre-War Construction and What It Means for Your Renovation</h3>
                  <p className="gwch-body-text">
                    Approximately 35 percent of Greenwich's housing stock predates 1940, concentrated in neighborhoods like Old Greenwich, Cos Cob, and central Greenwich. These homes were built with construction methods that predate modern building code, including wall framing that lacks the horizontal fire stops now required between floors. Any renovation that opens a wall in these homes triggers code-mandated upgrades before the wall is closed again.
                  </p>
                  <p className="gwch-body-text">
                    The interior finish in most pre-war Greenwich homes is three-coat lime plaster over wood lath, not drywall. Matching existing plaster in a partial renovation is a skilled trade that most general contractors outsource or skip. We handle it in-house because in Greenwich, the details are what the homeowner notices first.
                  </p>
                </div>
              </div>
            </FadeUp>

            {/* Block 2 – text left */}
            <FadeUp delay={60}>
              <div className="gwch-alt-block">
                <div className="gwch-alt-content">
                  <h3 className="gwch-h3">Fieldstone Foundations and Coastal Moisture</h3>
                  <p className="gwch-body-text">
                    Greenwich sits on a mix of bedrock and glacial till, and homes built before 1920 typically rest on fieldstone and cut granite foundations that predate modern footing standards. Along the Mianus River corridor in Cos Cob and the shoreline in Old Greenwich and Riverside, elevated water tables create hydrostatic pressure that pushes moisture through these porous walls year-round.
                  </p>
                  <p className="gwch-body-text">
                    Before we frame a single wall in a Greenwich basement, we complete a moisture assessment and address drainage. Interior perimeter systems, vapor barriers, and sump installations are standard scope here, not optional add-ons. The foundation dictates the project plan, not the other way around.
                  </p>
                </div>
                <div className="gwch-alt-img">
                  <img src="/images/areas/greenwich-stone-foundation.jpg" alt="Stone foundation in a pre-war Greenwich home" />
                </div>
              </div>
            </FadeUp>

            {/* Block 3 – img left */}
            <FadeUp delay={120}>
              <div className="gwch-alt-block">
                <div className="gwch-alt-img">
                  <img src="/images/areas/greenwich-millwork-interior.jpg" alt="Custom millwork in Greenwich historic home" />
                </div>
                <div className="gwch-alt-content">
                  <h3 className="gwch-h3">Custom Millwork and Rock Ledge</h3>
                  <p className="gwch-body-text">
                    Trim profiles in pre-war Greenwich homes present a separate challenge. Ovolo, ogee, and beaded molding profiles from the 1890s through the 1930s cannot be matched from any lumber yard shelf in Connecticut. When a project calls for replicating original millwork, we source custom profiles.
                  </p>
                  <p className="gwch-body-text">
                    Rock ledge is present throughout elevated areas north and west of the Post Road. The fractured granite must be hydraulically hammered, which is slower and more expensive. Any excavation project should carry a ledge contingency of $20,000 to $80,000 or more. We discuss this with every client before any below-grade work begins.
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
                  Greenwich Neighborhoods: What Matters for <strong>Your Remodeling Project</strong>
                </h2>
                <p className="gwch-section-subtitle">
                  Greenwich contains eight distinct neighborhoods for remodeling purposes, including Back Country estates on four-acre lots, pre-Revolutionary colonials in Old Greenwich, and entry-level ranches in Glenville and Byram, each with different structural conditions, permitting requirements, and finish expectations.
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
                  Permitting and Approvals in <strong>Greenwich, CT</strong>
                </h2>
              </div>
              <p className="gwch-body-text">
                Greenwich building permits cost $13.26 per $1,000 of renovation budget, with separate electrical and plumbing fees of $12 per $1,000 each, and require sign-offs from Zoning, Health, the Fire Marshal, and DPW before issuance.
              </p>
              <p className="gwch-body-text">
                The building permit fee in Greenwich is $13.26 per $1,000 of renovation budget. Electrical and plumbing permits each carry a separate fee of $12 per $1,000. If your home was built before 1940, a 5% surcharge applies to the permit fee. On a $200,000 kitchen renovation in a 1930s Old Greenwich colonial, those numbers add up to a meaningful line item that needs to be accounted for in the project budget from the start.
              </p>
              <p className="gwch-body-text">
                Floor Area Ratio, or FAR, is one of the most frequently misunderstood aspects of Greenwich zoning. FAR governs total buildable square footage relative to lot size, and every structure on the property counts toward it: the main house, any garages, covered porches, and above-grade basement area. Homeowners planning additions or scope expansions often discover that FAR limits constrain what they can build before they ever get to the permit application. A Class A-2 Survey Map is required to determine setbacks, which adds cost and lead time to every project involving exterior work or changes to the building footprint.
              </p>
              <p className="gwch-body-text">
                Before a building permit is issued, sign-offs are required from multiple departments: Zoning, Health, the Fire Marshal, and the Department of Public Works each review independently. This is not a formality. Each department has its own review cycle and its own timeline. On a simple interior renovation the process may take a few weeks. On a project involving structural changes, new square footage, or exterior modifications, the multi-department review can run several months. Building this timeline into your project schedule is not optional; it is the difference between a project that starts on the planned date and one that sits waiting for approvals.
              </p>
              <p className="gwch-body-text">
                Properties within Greenwich's Historic Overlay (HO) or Historic Residential Overlay (HRO) districts require a Certificate of Appropriateness from the Historic District Commission before any exterior change can be made. This applies to windows, siding, doors, and in some cases paint color. Greenwich has six HRO properties and 16 HO structures town-wide, plus six designated historic districts. If your home falls within one of these zones, the HDC review is an additional step before the building permit application can proceed.
              </p>
              <p className="gwch-body-text">
                Inspection scheduling in Greenwich is managed through the City Squared portal, which has been the town's platform since February 2025. All required inspections (framing, electrical rough-in, plumbing rough-in, and final) are scheduled through this system.
              </p>
              <p className="gwch-body-text">
                We handle all permit applications, department coordination, HDC submissions where applicable, and inspection scheduling as part of every project. You should not have to navigate this process yourself, and working with a contractor who knows the Greenwich permitting environment means your project schedule is built around realistic approval timelines rather than optimistic assumptions.
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
                  What Remodeling Costs in <strong>Greenwich, CT</strong>
                </h2>
              </div>
              <p className="gwch-body-text">
                Home remodeling in Greenwich, CT costs $40,000 to $400,000+ for kitchens, $15,000 to $120,000+ for bathrooms, and $25,000 to $100,000+ for basements, with costs running 20-40% above Connecticut statewide averages due to premium material expectations, permit complexity, and custom millwork requirements.
              </p>
              <p className="gwch-body-text">
                Several factors push Greenwich costs above statewide averages. Material expectations here start at a level that would represent an upgrade in most other markets. The reference points are Sub-Zero, Wolf, and Waterworks, not builder-grade appliances and stock cabinetry. Permit complexity and multi-department fees add a meaningful amount to every project budget. Custom millwork to match original profiles in pre-war homes adds both material cost and lead time. And any project involving excavation must carry a ledge contingency that can run $20,000 to $80,000 depending on what the rock conditions turn out to be.
              </p>
            </FadeUp>

            {/* Kitchen Costs */}
            <FadeUp delay={60}>
              <h3 className="gwch-cost-h3">Kitchen Remodeling Costs in Greenwich</h3>
              <div className="gwch-cost-table-wrap"><table className="gwch-cost-table">
                <thead>
                  <tr><th>Tier</th><th>Scope</th><th>Typical Range</th></tr>
                </thead>
                <tbody>
                  <tr><td>Minor Refresh</td><td>Cabinet doors, countertops, appliances, paint</td><td className="gwch-td-price">$40,000 – $80,000</td></tr>
                  <tr><td>Major Mid-Range</td><td>New cabinets, floors, all appliances, layout update</td><td className="gwch-td-price">$90,000 – $140,000</td></tr>
                  <tr><td>Full Custom</td><td>Full custom, structural changes, premium materials</td><td className="gwch-td-price">$200,000 – $400,000</td></tr>
                </tbody>
              </table></div>
            </FadeUp>

            {/* Bathroom Costs */}
            <FadeUp delay={80}>
              <h3 className="gwch-cost-h3">Bathroom Remodeling Costs in Greenwich</h3>
              <div className="gwch-cost-table-wrap"><table className="gwch-cost-table">
                <thead>
                  <tr><th>Tier</th><th>Scope</th><th>Typical Range</th></tr>
                </thead>
                <tbody>
                  <tr><td>Basic</td><td>Fixtures, vanity, flooring, paint</td><td className="gwch-td-price">$15,000 – $25,000</td></tr>
                  <tr><td>Mid-Range</td><td>Full gut, new tile, walk-in shower or tub, vanity</td><td className="gwch-td-price">$25,000 – $55,000</td></tr>
                  <tr><td>High-End</td><td>Layout changes, premium fixtures, spa features</td><td className="gwch-td-price">$55,000 – $120,000+</td></tr>
                </tbody>
              </table></div>
            </FadeUp>

            {/* Basement Costs */}
            <FadeUp delay={100}>
              <h3 className="gwch-cost-h3">Basement Finishing Costs</h3>
              <div className="gwch-cost-table-wrap"><table className="gwch-cost-table">
                <thead>
                  <tr><th>Tier</th><th>Scope</th><th>Typical Range</th></tr>
                </thead>
                <tbody>
                  <tr><td>Basic</td><td>Framing, drywall, basic flooring, lighting, paint</td><td className="gwch-td-price">$25,000 – $45,000</td></tr>
                  <tr><td>Mid-Range</td><td>Multiple rooms, upgraded flooring, bathroom rough-in</td><td className="gwch-td-price">$45,000 – $70,000</td></tr>
                  <tr><td>High-End</td><td>Full bathroom, wet bar, custom built-ins, home theater</td><td className="gwch-td-price">$70,000 – $100,000+</td></tr>
                </tbody>
              </table></div>
              <p className="gwch-cost-note">
                Moisture management (drainage systems, sump installation, or waterproofing membrane) is often required before framing begins, particularly in Cos Cob, Byram, Riverside, and Old Greenwich, and that work is priced separately from the finish scope.
              </p>
            </FadeUp>

            {/* Flooring Costs */}
            <FadeUp delay={120}>
              <h3 className="gwch-cost-h3">Flooring Costs</h3>
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
              <p className="gwch-cost-note">
                Pre-war homes with original hardwood floors under carpet or vinyl are often worth refinishing rather than replacing. We assess what is actually there and give you an honest recommendation before any material is ordered.
              </p>
            </FadeUp>

            {/* Home Additions */}
            <FadeUp delay={140}>
              <h3 className="gwch-cost-h3">Home Additions Costs</h3>
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
              <p className="gwch-cost-note">
                Any addition in Greenwich should carry a ledge contingency of $20,000 to $80,000 depending on rock conditions encountered during excavation. FAR limits may also constrain buildable square footage.
              </p>
            </FadeUp>

            {/* Interior Painting */}
            <FadeUp delay={160}>
              <h3 className="gwch-cost-h3">Interior Painting Costs</h3>
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
              <h3 className="gwch-cost-h3">Interior Carpentry Costs</h3>
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
              <p className="gwch-cost-note">
                Custom millwork to match original profiles in pre-war Greenwich homes adds both material cost and lead time. Ovolo, ogee, and beaded molding profiles from the 1890s through the 1930s cannot be matched from any lumber yard shelf in Connecticut.
              </p>
            </FadeUp>

            {/* Additional Services */}
            <FadeUp delay={200}>
              <h3 className="gwch-cost-h3">Additional Services</h3>
              <div className="gwch-cost-table-wrap"><table className="gwch-cost-table">
                <thead>
                  <tr><th>Service</th><th>Details</th><th>Typical Range</th></tr>
                </thead>
                <tbody>
                  <tr><td>Attic Conversions</td><td>Framing, insulation, electrical, flooring, egress</td><td className="gwch-td-price">$50,000 – $150,000</td></tr>
                  <tr><td>Decks and Porches</td><td>Wood, composite, or PVC with railings and permits</td><td className="gwch-td-price">$15,000 – $75,000</td></tr>
                  <tr><td>Design and Planning</td><td>Layout, material selection, 3D rendering, permit drawings</td><td className="gwch-td-price">$2,500 – $15,000</td></tr>
                  <tr><td>Comfort and Accessibility</td><td>Grab bars, walk-in showers, widened doorways, ramps</td><td className="gwch-td-price">$5,000 – $50,000</td></tr>
                </tbody>
              </table></div>
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
                  Our Remodeling Services in <strong>Greenwich, CT</strong>
                </h2>
                <p className="gwch-section-subtitle">
                  BuiltWell CT provides 11 remodeling services in Greenwich including kitchen renovation, bathroom remodeling, basement finishing, flooring, home additions, interior painting, carpentry, attic conversions, decks, design, and accessibility modifications, all permitted and backed by CT HIC License #0668405.
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
              Ready to Remodel in <span style={{ color: '#BC9155' }}>Greenwich</span>?
            </h2>
            <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.7)', marginBottom: 28 }}>Greenwich homes demand precision — from Belle Haven estates to downtown condos, we deliver craftsmanship that matches the standard.</p>
            <Link href="#contact" style={{ display: 'inline-block', background: '#BC9155', color: '#fff', padding: '16px 48px', borderRadius: 8, fontWeight: 600, fontSize: 16, textDecoration: 'none' }}>Get Your Free Estimate</Link>
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
                BuiltWell CT handles all Greenwich permits, multi-department sign-offs, inspection scheduling, and subcontractor coordination under CT HIC License #0668405, with daily progress updates and a five-step process covering consultation through final walkthrough. We carry full liability insurance and workers' compensation, and we do not start a project until permits are pulled and the scope is in writing with a clear timeline attached.
              </p>
              <p className="gwch-body-text">
                Our five-step process covers every project regardless of scale: Consultation, Planning, Selections, Build, and Walkthrough. You can read through the full process at <Link href="/process/" className="gwch-inline-link">/process/</Link>. In practice, what this means for a Greenwich project is that the planning phase accounts for multi-department permit review timelines, custom millwork or material lead times where applicable, and any ledge contingency work that needs to happen before the main renovation can proceed. The schedule you see in your proposal is the schedule we intend to hit.
              </p>
              <p className="gwch-body-text">
                During active construction, you receive daily updates on progress and a clean job site at the end of every workday. If something unexpected turns up inside a wall (and in pre-war Greenwich homes something unexpected turns up regularly), you hear from us that day with an explanation of what we found and your options before we proceed.
              </p>
              <p className="gwch-body-text">
                Greenwich projects are served by our Fairfield County Service Area Team. For county-level context on the full scope of what we do in this market, visit <Link href="/fairfield-county/" className="gwch-inline-link">/fairfield-county/</Link>.
              </p>
            </FadeUp>
          </div>
        </section>

        {/* ── 11. FAQ ─────────────────────────────────────────────────── */}
        <section className="gwch-faq-section">
          <div className="gwch-section-inner gwch-section-narrow">
            <FadeUp>
              <div className="gwch-section-header">
                <SectionLabel text="Common Questions" />
                <h2 className="gwch-h2">
                  Frequently Asked Questions: <strong>Greenwich Remodeling</strong>
                </h2>
                <p className="gwch-section-subtitle">
                  Greenwich homeowners most commonly ask about permit requirements, remodeling costs, project timelines, and what makes renovation more complex in pre-war homes with balloon framing, stone foundations, and custom millwork.
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

        {/* ── 12. NEARBY AREAS ────────────────────────────────────────── */}
        <SharedAreasSection data={{
          eyebrow: "Nearby Towns",
          title: "Fairfield County Towns We Also Serve",
          highlight_text: "We Also Serve",
          subtitle: "BuiltWell CT serves all 23 towns in Fairfield County through our dedicated Fairfield County Service Area Team, including Westport, Darien, New Canaan, Stamford, Norwalk, Fairfield, and Ridgefield, reachable at (203) 919-9616.",
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

        {/* ── 13. TRUST STRIP ─────────────────────────────────────────── */}
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
              },
              {
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <path d="M3 9h18" />
                    <path d="M9 21V9" />
                  </svg>
                ),
                label: 'BBB',
                value: 'A+ Accredited',
              },
              {
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                  </svg>
                ),
                label: 'Trusted on',
                value: 'Houzz',
              },
              {
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                ),
                label: 'CT HIC License',
                value: '#0668405',
              },
              {
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                ),
                label: 'Verified on',
                value: 'Angi & Thumbtack',
              },
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

        {/* ── 14. CTA FORM ────────────────────────────────────────────── */}
        <SharedLeadFormSection page={_page} data={{ eyebrow: "Get Started", title: "Schedule Your Free Consultation", title_highlight: "Consultation", subtitle: "On-site or remote (Google Meet or Zoom). Call (203) 919-9616 or fill out the form below.", subtitle2: "We'll confirm your appointment details and the name of the team member visiting within one business day.", images: [{ src: "/hero/builtwell-team-van-consultation-hero-ct.jpg", alt: "BuiltWell team van arriving for consultation" }, { src: "/team/builtwell-owner-handshake-client-ct-02.jpg", alt: "BuiltWell owner handshake with client" }] }} accent="Consultation" />

        {/* ── 15. FINANCING STRIP ─────────────────────────────────────── */}
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

        /* ── Page wrapper ── */
        .gwch-page { background: #fff; color: var(--gwch-navy); }

        /* ── Label ── */
        .gwch-label {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #9a7340;
          margin-bottom: 12px;
        }
        .gwch-label-dark { color: #c89b5b; }
        .gwch-label-line {
          display: inline-block;
          width: 10px;
          height: 2px;
          background: var(--gwch-gold);
        }
        .gwch-label-dark .gwch-label-line { background: #c89b5b; }

        /* ── Headings ── */
        .gwch-h2 {
          font-family: Georgia, serif;
          font-size: clamp(30px, 3.6vw, 46px);
          font-weight: 700;
          line-height: 1.15;
          letter-spacing: -0.02em;
          color: var(--gwch-navy);
          margin: 0 0 16px;
        }
        .gwch-h2 strong { font-weight: 700; color: var(--gwch-gold); font-style: normal; }
        .gwch-text-white { color: #fff !important; }
        .gwch-text-white strong { color: var(--gwch-gold-light) !important; }

        .gwch-h3 {
          font-family: Georgia, serif;
          font-size: clamp(20px, 2.2vw, 26px);
          font-weight: 700;
          line-height: 1.25;
          color: var(--gwch-navy);
          margin: 0 0 12px;
        }
        .gwch-h3 strong { color: var(--gwch-gold); }

        .gwch-body-text {
          font-size: 16px;
          line-height: 1.85;
          color: var(--gwch-muted);
          margin: 0 0 16px;
        }

        .gwch-section-header {
          text-align: center;
          margin-bottom: 48px;
        }
        .gwch-section-header .gwch-h2 { margin-bottom: 16px; }
        .gwch-section-subtitle {
          font-size: 17px;
          line-height: 1.75;
          color: var(--gwch-muted);
          max-width: 760px;
          margin: 0 auto;
        }

        .gwch-section-inner {
          max-width: 1240px;
          margin: 0 auto;
          padding: 80px 40px;
        }
        .gwch-section-narrow { max-width: 860px; }

        @media (max-width: 768px) {
          .gwch-section-inner { padding: 60px 20px; }
        }

        /* ── HERO ── */
        .gwch-page-hero {
          position: relative;
          isolation: isolate;
          overflow: hidden;
          background: var(--gwch-oxford);
          padding: 0 40px 48px;
          padding-top: 120px;
          color: #fff;
          min-height: 50vh;
          display: flex;
          align-items: stretch;
        }
        .gwch-hero-bg {
          position: absolute;
          inset: 0;
          background-image: url('/images/areas/greenwich-ct-avenue.jpg');
          background-size: cover;
          background-position: center 30%;
          opacity: 0.72;
          z-index: -2;
        }
        .gwch-hero-gradient {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at 97% 97%, rgba(21,30,48,1) 0%, rgba(21,30,48,0.9) 8%, transparent 30%),
                      radial-gradient(ellipse at 3% 97%, rgba(21,30,48,0.9) 0%, transparent 25%),
                      linear-gradient(180deg, rgba(21,30,48,0.35) 0%, rgba(21,30,48,0.2) 30%, rgba(21,30,48,0.45) 65%, rgba(21,30,48,0.92) 100%);
          z-index: -1;
        }
        .gwch-hero-inner {
          position: relative;
          max-width: 1240px;
          margin: 0 auto;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          justify-content: center;
        }
        .gwch-breadcrumb {
          list-style: none;
          margin: 0 0 20px;
          padding: 0;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 0;
          font-size: 13px;
          font-weight: 500;
          color: rgba(255,255,255,0.92);
          text-shadow: 0 1px 6px rgba(0,0,0,0.7);
        }
        .gwch-breadcrumb li { display: flex; align-items: center; }
        .gwch-bc-sep {
          color: var(--gwch-gold);
          margin: 0 10px;
          font-size: 14px;
          line-height: 1;
          user-select: none;
        }
        .gwch-breadcrumb a { color: rgba(255,255,255,0.85); text-decoration: none; transition: color 0.2s; }
        .gwch-breadcrumb a:hover { color: var(--gwch-gold); }
        .gwch-bc-current { color: #fff; font-weight: 600; }

        .gwch-hero-h1 {
          font-family: Georgia, serif;
          font-size: clamp(40px, 4.5vw, 56px);
          font-weight: 700;
          line-height: 1.08;
          letter-spacing: -0.5px;
          color: #fff;
          max-width: 920px;
          margin: 0 0 12px;
          text-shadow: 0 2px 20px rgba(0,0,0,0.5);
        }
        .gwch-gold { color: var(--gwch-gold); }
        .gwch-hero-sub {
          max-width: 560px;
          font-size: 17px;
          line-height: 1.7;
          color: rgba(255,255,255,0.82);
          margin: 16px auto 0;
        }
        .gwch-hero-ctas {
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
          margin-top: 32px;
          justify-content: center;
        }
        .gwch-cta-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 15px 32px;
          border-radius: 8px;
          background: rgba(10,18,35,0.42);
          border: 1px solid rgba(255,255,255,0.18);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          color: #fff;
          text-decoration: none;
          text-align: center;
          font-size: 15px;
          font-weight: 600;
          transition: background 0.3s, border-color 0.3s, transform 0.3s, box-shadow 0.3s;
        }
        .gwch-cta-btn:hover {
          background: rgba(10,18,35,0.62);
          border-color: rgba(255,255,255,0.28);
          border-bottom-color: var(--gwch-gold);
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.3), 0 0 0 1px rgba(188,145,85,0.2);
        }
        .gwch-cta-btn.gwch-cta-primary {
          background: var(--gwch-gold);
          border: 1px solid var(--gwch-gold);
          color: #fff;
          backdrop-filter: none;
        }
        .gwch-cta-btn.gwch-cta-primary:hover {
          background: #d4a95a;
          border-color: #d4a95a;
          box-shadow: 0 8px 24px rgba(188,145,85,0.4);
        }

        @media (max-width: 768px) {
          .gwch-page-hero { padding: 88px 20px 36px; min-height: 40vh; max-height: none; }
          .gwch-hero-h1 { font-size: clamp(30px, 7vw, 42px); }
          .gwch-hero-sub { font-size: 15px; }
          .gwch-hero-ctas { flex-direction: column; align-items: stretch; }
          .gwch-cta-btn { min-height: 48px; }
          .gwch-breadcrumb { font-size: 12px; }
        }
        @media (max-width: 480px) {
          .gwch-page-hero { padding: 84px 16px 32px; min-height: 35vh; }
          .gwch-hero-h1 { font-size: clamp(26px, 7vw, 36px); }
        }

        /* ── TRUST BAR ── */
        .gwch-trust-bar {
          border-top: 1px solid rgba(188,145,85,0.2);
          border-bottom: 1px solid rgba(188,145,85,0.2);
          background: linear-gradient(135deg, #1e2b43 0%, #151e30 100%);
        }
        .gwch-trust-bar-inner {
          max-width: 1280px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
        }
        @media (min-width: 1024px) {
          .gwch-trust-bar-inner { grid-template-columns: repeat(4, 1fr); }
        }
        .gwch-trust-item {
          padding: 36px 20px;
          text-align: center;
          cursor: default;
          border-right: 1px solid rgba(188,145,85,0.12);
          transition: background 0.3s, transform 0.3s;
        }
        .gwch-trust-item:last-child { border-right: none; }
        .gwch-trust-item:hover { background: rgba(188,145,85,0.08); transform: translateY(-3px); }
        .gwch-trust-val {
          font-family: Georgia, serif;
          font-size: 42px;
          font-weight: 700;
          line-height: 1;
          color: var(--gwch-gold);
          min-height: 52px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: color 0.3s, text-shadow 0.3s;
        }
        .gwch-trust-item:hover .gwch-trust-val {
          color: var(--gwch-gold-light);
          text-shadow: 0 0 20px rgba(188,145,85,0.3);
        }
        .gwch-trust-lbl {
          margin-top: 8px;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: rgba(255,255,255,0.6);
          transition: color 0.3s;
        }
        .gwch-trust-item:hover .gwch-trust-lbl { color: rgba(255,255,255,0.85); }

        /* ── INTRO + INLINE FORM ── */
        .gwch-intro-section {
          background: #fff;
          border-bottom: 1px solid var(--gwch-border);
        }
        .gwch-intro-inner {
          max-width: 820px;
          margin: 0 auto;
          padding: 80px 40px;
        }
        @media (max-width: 768px) {
          .gwch-intro-inner { padding: 60px 20px; }
        }
        .gwch-intro-header {
          text-align: center;
          margin-bottom: 24px;
        }
        .gwch-intro-body {
          font-size: 16px;
          color: var(--gwch-muted);
          line-height: 1.85;
          margin-bottom: 0;
        }
        .gwch-form-block {
          max-width: 680px;
          margin: 48px auto 0;
        }
        .gwch-form-block-header {
          text-align: center;
          margin-bottom: 28px;
        }
        .gwch-form-h3 {
          font-family: Georgia, serif;
          font-size: clamp(26px, 3vw, 36px);
          font-weight: 700;
          color: var(--gwch-navy);
          margin: 8px 0 0;
          line-height: 1.2;
        }
        .gwch-form-h3 strong { color: var(--gwch-gold); font-style: normal; }
        .gwch-form-subtext {
          font-size: 15px;
          color: var(--gwch-muted);
          margin-top: 8px;
          line-height: 1.6;
        }

        /* ── HOUSING BANNER ── */
        .gwch-housing-banner {
          position: relative;
          overflow: hidden;
          background: #0d1a2e;
          padding: 80px 40px;
          color: #fff;
          text-align: center;
        }
        .gwch-housing-bg {
          position: absolute;
          inset: 0;
          background-image: url('/images/areas/greenwich-ct-skyline.jpg');
          background-size: cover;
          background-position: center;
          opacity: 0.3;
        }
        .gwch-housing-gradient {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(13,26,46,0.6) 0%, rgba(13,26,46,0.4) 40%, rgba(13,26,46,0.7) 100%);
        }
        .gwch-housing-inner {
          position: relative;
          z-index: 1;
          max-width: 860px;
          margin: 0 auto;
        }
        .gwch-housing-body {
          font-size: 17px;
          line-height: 1.8;
          color: rgba(255,255,255,0.82);
          margin: 0;
        }

        /* ── ALT BLOCKS ── */
        .gwch-alt-section { background: #fff; padding: 0; }
        .gwch-alt-container {
          max-width: 1240px;
          margin: 0 auto;
          padding: 80px 40px;
          display: flex;
          flex-direction: column;
          gap: 80px;
        }
        @media (max-width: 768px) { .gwch-alt-container { padding: 60px 20px; gap: 60px; } }
        .gwch-alt-block {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 64px;
          align-items: center;
        }
        @media (max-width: 900px) {
          .gwch-alt-block { grid-template-columns: 1fr; gap: 32px; }
          .gwch-alt-block .gwch-alt-content { order: 1; }
          .gwch-alt-block .gwch-alt-img { order: 0; }
        }
        .gwch-alt-img {
          border-radius: 10px;
          overflow: hidden;
          aspect-ratio: 4/3;
        }
        .gwch-alt-img img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .gwch-alt-content .gwch-body-text:last-child { margin-bottom: 0; }

        /* ── NEIGHBORHOODS ── */
        .gwch-neighborhoods-section { background: #fff; }
        .gwch-neighborhoods-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
        @media (max-width: 768px) { .gwch-neighborhoods-grid { grid-template-columns: 1fr; } }
        .gwch-neighborhood-card {
          border: 1px solid var(--gwch-border);
          border-radius: 8px;
          overflow: hidden;
          transition: box-shadow 0.2s, transform 0.2s;
          background: #fff;
        }
        .gwch-neighborhood-card:hover {
          box-shadow: 0 4px 16px rgba(30,43,67,0.08);
          transform: translateY(-2px);
        }
        .gwch-neighborhood-card[open] {
          border-color: var(--gwch-gold);
        }
        .gwch-neighborhood-summary {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 18px 20px;
          font-size: 15px;
          font-weight: 600;
          color: var(--gwch-navy);
          cursor: pointer;
          list-style: none;
          user-select: none;
        }
        .gwch-neighborhood-summary::-webkit-details-marker { display: none; }
        .gwch-summary-icon { color: var(--gwch-gold); flex-shrink: 0; transition: transform 0.2s; }
        .gwch-neighborhood-card[open] .gwch-summary-icon { transform: rotate(45deg); }
        .gwch-neighborhood-body {
          padding: 0 20px 20px;
          font-size: 15px;
          line-height: 1.78;
          color: var(--gwch-muted);
          margin: 0;
        }

        /* ── PERMITTING ── */
        .gwch-permitting-section { background: var(--gwch-cream); }

        /* ── COSTS ── */
        .gwch-costs-section { background: #fff; }
        .gwch-cost-h3 {
          font-family: Georgia, serif;
          font-size: 22px;
          font-weight: 700;
          color: var(--gwch-navy);
          margin: 48px 0 16px;
          padding-top: 32px;
          border-top: 1px solid var(--gwch-border);
        }
        .gwch-cost-h3:first-of-type { border-top: none; padding-top: 0; margin-top: 32px; }
        .gwch-cost-table-wrap {
          width: 100%;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
        }
        .gwch-cost-table {
          width: 100%;
          border-collapse: separate;
          border-spacing: 0;
          font-size: 15px;
          margin-bottom: 12px;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 2px 12px rgba(30,43,67,0.07);
          border: 1px solid var(--gwch-border);
        }
        .gwch-cost-table th {
          background: var(--gwch-navy);
          text-align: left;
          padding: 13px 20px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #fff;
        }
        .gwch-cost-table td {
          padding: 14px 20px;
          border-bottom: 1px solid var(--gwch-border);
          color: var(--gwch-muted);
          transition: background 0.15s;
        }
        .gwch-cost-table tbody tr:hover td { background: rgba(188,145,85,0.05); }
        .gwch-cost-table tr:last-child td { border-bottom: none; }
        .gwch-cost-table td:first-child { font-weight: 600; color: var(--gwch-navy); }
        .gwch-td-price { color: var(--gwch-gold) !important; font-weight: 600; white-space: nowrap; }
        .gwch-cost-note {
          font-size: 14px;
          line-height: 1.7;
          color: var(--gwch-muted);
          background: var(--gwch-cream);
          border-left: 3px solid var(--gwch-gold);
          padding: 12px 16px;
          border-radius: 0 6px 6px 0;
          margin: 12px 0 0;
        }
        @media (max-width: 900px) {
          .gwch-cost-table { min-width: 640px; }
        }
        @media (max-width: 600px) {
          .gwch-cost-table { font-size: 13px; }
          .gwch-cost-table th, .gwch-cost-table td { padding: 10px 12px; }
        }

        /* ── SERVICES ── */
        .gwch-services-section { background: var(--gwch-cream); }
        .gwch-services-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          margin-bottom: 24px;
        }
        @media (max-width: 900px) { .gwch-services-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 600px) { .gwch-services-grid { grid-template-columns: 1fr; } }

        .gwch-services-more { display: none; }
        .gwch-services-more.show { display: block; }

        .gwch-services-toggle-wrap { text-align: center; margin-top: 24px; }
        .gwch-services-toggle {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 28px;
          border: 2px solid var(--gwch-gold);
          border-radius: 8px;
          background: transparent;
          color: var(--gwch-gold);
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.25s;
        }
        .gwch-services-toggle:hover {
          background: var(--gwch-gold);
          color: #fff;
        }

        .gwch-service-card {
          display: flex;
          flex-direction: column;
          background: #fff;
          border-radius: 12px;
          overflow: hidden;
          border-bottom: 2px solid transparent;
          box-shadow: 0 2px 12px rgba(30,43,67,0.06), 0 1px 3px rgba(30,43,67,0.04);
          transition: all 0.35s cubic-bezier(0.4,0,0.2,1);
        }
        .gwch-service-card:hover {
          transform: translateY(-4px);
          border-bottom-color: var(--gwch-gold);
          box-shadow: 0 12px 28px rgba(30,43,67,0.1), 0 28px 56px rgba(30,43,67,0.12);
        }
        .gwch-service-img {
          height: 200px;
          overflow: hidden;
        }
        .gwch-service-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        .gwch-service-card:hover .gwch-service-img img { transform: scale(1.05); }
        .gwch-service-body {
          flex: 1;
          display: flex;
          flex-direction: column;
          padding: 24px;
        }
        .gwch-service-title {
          font-size: 20px;
          font-weight: 700;
          color: var(--gwch-navy);
          margin: 0 0 8px;
        }
        .gwch-service-title a {
          color: inherit;
          text-decoration: none;
          transition: color 0.2s;
        }
        .gwch-service-title a:hover { color: var(--gwch-gold); }
        .gwch-service-desc {
          font-size: 14px;
          line-height: 1.7;
          color: var(--gwch-muted);
          flex: 1;
          margin: 0 0 16px;
        }
        .gwch-service-badges {
          display: flex;
          gap: 8px;
          margin-bottom: 16px;
          flex-wrap: wrap;
        }
        .gwch-badge {
          display: inline-block;
          padding: 4px 10px;
          border-radius: 20px;
          background: var(--gwch-cream);
          font-size: 12px;
          font-weight: 600;
          color: var(--gwch-navy);
          border: 1px solid var(--gwch-border);
        }
        .gwch-learn-more {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 14px;
          font-weight: 600;
          color: var(--gwch-gold);
          text-decoration: none;
          transition: gap 0.3s;
          margin-top: auto;
        }
        .gwch-learn-more:hover { gap: 10px; }

        /* ── WHAT TO EXPECT ── */
        .gwch-expect-section {
          background: #fff;
          border-top: 1px solid var(--gwch-border);
        }
        .gwch-inline-link {
          color: var(--gwch-gold);
          text-decoration: none;
          font-weight: 600;
        }
        .gwch-inline-link:hover { text-decoration: underline; }

        /* ── FAQ ── */
        .gwch-faq-section {
          background: #fff;
          border-top: 1px solid var(--gwch-border);
        }
        .gwch-faq-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .gwch-faq-item {
          border: 1px solid rgba(30,43,67,0.1);
          border-radius: 8px;
          overflow: hidden;
          transition: border-color 0.2s;
        }
        .gwch-faq-item[open] { border-color: var(--gwch-gold); }
        .gwch-faq-summary {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          padding: 18px 24px;
          font-size: 16px;
          font-weight: 600;
          color: var(--gwch-navy);
          cursor: pointer;
          list-style: none;
        }
        .gwch-faq-summary::-webkit-details-marker { display: none; }
        .gwch-faq-summary:hover { background: rgba(188,145,85,0.04); }
        .gwch-faq-icon {
          color: var(--gwch-gold);
          flex-shrink: 0;
          transition: transform 0.3s;
        }
        .gwch-faq-item[open] .gwch-faq-icon { transform: rotate(180deg); }
        .gwch-faq-answer {
          padding: 0 24px 18px;
          font-size: 15px;
          line-height: 1.78;
          color: var(--gwch-muted);
          margin: 0;
        }

        /* ── NEARBY AREAS ── */
        .gwch-nearby-section { background: var(--gwch-cream); }
        .gwch-area-card {
          display: grid;
          grid-template-columns: 300px 1fr;
          background: #fff;
          border-radius: 12px;
          overflow: hidden;
          border-bottom: 2px solid transparent;
          box-shadow: 0 2px 12px rgba(30,43,67,0.06);
          transition: all 0.35s cubic-bezier(0.4,0,0.2,1);
        }
        .gwch-area-card:hover {
          transform: translateY(-2px);
          border-bottom-color: var(--gwch-gold);
          box-shadow: 0 12px 28px rgba(30,43,67,0.1);
        }
        @media (max-width: 768px) { .gwch-area-card { grid-template-columns: 1fr; } }
        .gwch-area-img { overflow: hidden; }
        .gwch-area-img img { width: 100%; height: 100%; object-fit: cover; min-height: 200px; display: block; }
        .gwch-area-body { padding: 28px 32px; }
        @media (max-width: 768px) { .gwch-area-body { padding: 24px 20px; } }
        .gwch-area-name {
          font-family: Georgia, serif;
          font-size: 24px;
          font-weight: 700;
          color: var(--gwch-navy);
          margin: 0 0 6px;
        }
        .gwch-area-phone {
          font-size: 15px;
          color: var(--gwch-muted);
          margin: 0 0 12px;
        }
        .gwch-area-phone-link {
          font-weight: 600;
          color: var(--gwch-gold);
          text-decoration: none;
        }
        .gwch-area-phone-link:hover { text-decoration: underline; }
        .gwch-area-desc {
          font-size: 14px;
          line-height: 1.7;
          color: var(--gwch-muted);
          margin: 0 0 16px;
          padding-bottom: 16px;
          border-bottom: 1px solid var(--gwch-border);
        }
        .gwch-area-towns-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 8px;
          margin-bottom: 12px;
        }
        @media (max-width: 600px) { .gwch-area-towns-grid { grid-template-columns: repeat(2, 1fr); } }
        .gwch-town-pill {
          display: block;
          text-align: center;
          padding: 6px 10px;
          border-radius: 20px;
          background: var(--gwch-cream);
          font-size: 12px;
          font-weight: 600;
          color: var(--gwch-navy);
          text-decoration: none;
          transition: all 0.2s;
        }
        a.gwch-town-pill:hover {
          background: var(--gwch-gold);
          color: #fff;
        }
        .gwch-town-highlight {
          background: var(--gwch-gold);
          color: #fff;
        }
        .gwch-area-towns-more { display: none; }
        .gwch-area-towns-more.show { display: block; }
        .gwch-area-towns-extra {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 8px;
          margin-top: 8px;
          margin-bottom: 12px;
        }
        @media (max-width: 600px) { .gwch-area-towns-extra { grid-template-columns: repeat(2, 1fr); } }
        .gwch-towns-expand {
          background: none;
          border: none;
          color: var(--gwch-gold);
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          padding: 0;
          margin-bottom: 16px;
          display: block;
          transition: color 0.2s;
        }
        .gwch-towns-expand:hover { color: var(--gwch-gold-dark); }
        .gwch-area-cta {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 14px;
          font-weight: 600;
          color: var(--gwch-gold);
          text-decoration: none;
          transition: gap 0.3s;
        }
        .gwch-area-cta:hover { gap: 10px; }

        /* ── TRUST STRIP ── */
        .gwch-trust-strip {
          position: relative;
          overflow: hidden;
          background: linear-gradient(135deg, #1e2b43 0%, #151e30 100%);
          padding: 56px 40px;
        }
        .gwch-trust-strip-bg {
          position: absolute;
          inset: 0;
          background: url('/hero/builtwell-job-site-aerial-hero-ct.jpg') center/cover;
          opacity: 0.12;
        }
        .gwch-trust-strip-inner {
          position: relative;
          z-index: 1;
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
          gap: 0;
        }
        .gwch-trust-strip-item-wrap {
          display: contents;
        }
        .gwch-trust-strip-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 20px 32px;
          min-width: 180px;
          flex: 1;
          flex-direction: column;
          text-align: center;
          color: rgba(255,255,255,0.9);
          transition: all 0.3s;
          cursor: default;
        }
        .gwch-trust-strip-item:hover {
          transform: translateY(-2px);
          color: var(--gwch-gold);
        }
        .gwch-trust-strip-icon { color: var(--gwch-gold); }
        .gwch-trust-strip-text {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .gwch-trust-strip-label {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.6);
        }
        .gwch-trust-strip-value {
          font-size: 14px;
          font-weight: 700;
        }
        .gwch-trust-divider {
          width: 1px;
          height: 40px;
          background: rgba(255,255,255,0.1);
          display: none;
        }
        @media (min-width: 1024px) { .gwch-trust-divider { display: block; } }
        @media (max-width: 768px) { .gwch-trust-strip { padding: 40px 20px; } }

        /* ── CTA FORM ── */
        .gwch-cta-section { background: var(--gwch-cream); }
        .gwch-cta-subline {
          font-size: 16px;
          color: var(--gwch-muted);
          margin: 4px 0 0;
        }
        .gwch-cta-body {
          display: grid;
          grid-template-columns: 1fr 1.1fr;
          gap: 48px;
          align-items: start;
          margin-top: 48px;
        }
        @media (max-width: 900px) {
          .gwch-cta-body { grid-template-columns: 1fr; }
          .gwch-cta-left { display: none; }
        }
        .gwch-cta-left { }
        .gwch-cta-img-stack {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .gwch-cta-img {
          width: 100%;
          border-radius: 10px;
          object-fit: cover;
          height: 240px;
          display: block;
          box-shadow: 0 16px 38px rgba(30,43,67,0.1);
        }
        .gwch-cta-right { }
        .gwch-cta-form-wrap {
          background: #fff;
          border-radius: 12px;
          padding: 36px;
          border: 1px solid #e4dac9;
          box-shadow: 0 20px 46px rgba(30,43,67,0.1);
        }

        /* ── FINANCING STRIP ── */
        .gwch-financing-strip {
          background: #fff;
          border-top: 1px solid var(--gwch-border);
          padding: 48px 40px;
        }
        .gwch-financing-inner {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 24px;
          text-align: center;
        }
        @media (min-width: 768px) {
          .gwch-financing-inner {
            flex-direction: row;
            justify-content: space-between;
            text-align: left;
          }
        }
        .gwch-financing-left {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        @media (min-width: 768px) { .gwch-financing-left { flex-direction: row; align-items: center; gap: 20px; } }
        .gwch-greensky-logo {
          font-size: 24px;
          font-weight: 700;
          letter-spacing: -0.02em;
          flex-shrink: 0;
        }
        .gwch-gs-green { color: #6bbf4e; }
        .gwch-gs-dark { color: var(--gwch-navy); }
        .gwch-financing-text {
          font-size: 15px;
          line-height: 1.6;
          color: var(--gwch-muted);
          max-width: 600px;
          margin: 0;
        }
        .gwch-financing-cta {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 52px;
          min-width: 240px;
          padding: 14px 32px;
          border-radius: 8px;
          background: var(--gwch-gold);
          color: #fff;
          font-size: 15px;
          font-weight: 600;
          text-decoration: none;
          white-space: nowrap;
          flex-shrink: 0;
          transition: all 0.25s;
        }
        .gwch-financing-cta:hover {
          background: var(--gwch-gold-dark);
          transform: translateY(-2px);
        }

        /* ── FORM STYLES ── */
        /* ── FORM CARD ── */
        .gwch-form-card {
          background: #fff;
          border-radius: 12px;
          border: 1px solid rgba(30,43,67,0.08);
          box-shadow: 0 16px 48px rgba(30,43,67,0.1), 0 4px 12px rgba(30,43,67,0.04);
          padding: 32px 36px;
        }
        @media (max-width: 600px) { .gwch-form-card { padding: 24px 18px; } }

        .gwch-form { display: flex; flex-direction: column; gap: 16px; }

        /* ── 2-COL GRID ── */
        .gwch-form-2col {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        @media (max-width: 540px) { .gwch-form-2col { grid-template-columns: 1fr; } }

        /* ── FIELD ── */
        .gwch-field { display: flex; flex-direction: column; gap: 6px; }
        .gwch-field-label {
          font-size: 13px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: var(--gwch-navy);
        }
        .gwch-field input,
        .gwch-field select,
        .gwch-field textarea {
          width: 100%;
          border: 1px solid rgba(30,43,67,0.15);
          border-radius: 6px;
          padding: 12px 14px;
          font-size: 15px;
          color: var(--gwch-navy);
          background: #fff;
          outline: none;
          transition: border-color 0.2s;
          box-sizing: border-box;
          font-family: inherit;
          -webkit-appearance: none;
          appearance: none;
        }
        .gwch-field select {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%235C677D' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 14px center;
          padding-right: 38px;
        }
        .gwch-field input:focus,
        .gwch-field select:focus,
        .gwch-field textarea:focus { border-color: var(--gwch-gold); }
        .gwch-field textarea { resize: vertical; line-height: 1.6; min-height: 120px; }

        /* ── RADIO BUTTONS (consultation type + contact method) ── */
        .gwch-radio-row { display: flex; gap: 10px; }
        .gwch-radio-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          flex: 1;
          padding: 12px 14px;
          border: 2px solid rgba(30,43,67,0.12);
          border-radius: 6px;
          font-size: 14px;
          font-weight: 500;
          color: var(--gwch-navy);
          cursor: pointer;
          transition: border-color 0.2s, background 0.2s, color 0.2s;
          background: #fff;
          user-select: none;
          text-align: center;
        }
        .gwch-radio-btn input { display: none; }
        .gwch-radio-btn:hover { border-color: var(--gwch-gold); }
        .gwch-radio-active {
          border-color: var(--gwch-gold) !important;
          background: rgba(188,145,85,0.06);
          color: var(--gwch-gold);
        }

        /* ── SERVICES MULTI-SELECT DROPDOWN ── */
        .gwch-svc-toggle {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 14px;
          border: 1px solid rgba(30,43,67,0.15);
          border-radius: 6px;
          background: #fff;
          font-size: 15px;
          font-family: inherit;
          color: var(--gwch-muted);
          cursor: pointer;
          transition: border-color 0.2s;
          text-align: left;
        }
        .gwch-svc-toggle:hover,
        .gwch-svc-open { border-color: var(--gwch-gold); }
        .gwch-svc-toggle svg { flex-shrink: 0; transition: transform 0.2s; }
        .gwch-svc-open svg { transform: rotate(180deg); }
        .gwch-svc-selected { color: var(--gwch-navy); font-weight: 500; }
        .gwch-svc-dropdown {
          position: absolute;
          top: calc(100% + 4px);
          left: 0; right: 0;
          background: #fff;
          border: 1px solid rgba(30,43,67,0.15);
          border-radius: 6px;
          box-shadow: 0 8px 24px rgba(0,0,0,0.12);
          z-index: 20;
          max-height: 240px;
          overflow-y: auto;
          padding: 6px 0;
        }
        .gwch-svc-option {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 9px 14px;
          font-size: 14px;
          color: var(--gwch-navy);
          cursor: pointer;
          transition: background 0.15s;
        }
        .gwch-svc-option:hover { background: rgba(188,145,85,0.06); }
        .gwch-svc-option input[type="checkbox"] {
          width: 16px; height: 16px; min-width: 16px;
          accent-color: var(--gwch-gold);
          cursor: pointer;
          flex-shrink: 0;
        }

        /* ── BOTTOM ROW (upload + submit) ── */
        .gwch-form-bottom {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          align-items: stretch;
          margin-top: 4px;
        }
        @media (max-width: 540px) { .gwch-form-bottom { grid-template-columns: 1fr; } }
        .gwch-upload-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          min-height: 52px;
          height: 100%;
          border: 1px solid rgba(30,43,67,0.15);
          border-radius: 8px;
          padding: 14px 20px;
          font-size: 15px;
          font-weight: 600;
          color: var(--gwch-navy);
          cursor: pointer;
          transition: border-color 0.2s, box-shadow 0.2s;
          background: #fff;
        }
        .gwch-upload-btn:hover {
          border-color: var(--gwch-gold);
          box-shadow: 0 0 0 3px rgba(188,145,85,0.08);
        }
        .gwch-file-names { font-size: 12px; color: var(--gwch-muted); margin-top: 6px; word-break: break-all; }
        .gwch-submit-btn {
          min-height: 52px;
          border: none;
          border-radius: 8px;
          background: var(--gwch-gold);
          color: #fff;
          font-size: 15px;
          font-weight: 600;
          letter-spacing: 0.3px;
          cursor: pointer;
          transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
          padding: 14px 20px;
          font-family: inherit;
        }
        .gwch-submit-btn:hover {
          background: #a57d48;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(188,145,85,0.3);
        }
        .gwch-form-note {
          font-size: 13px;
          color: var(--gwch-muted);
          text-align: center;
          margin-top: 4px;
          font-style: italic;
        }
        .gwch-form-thanks { text-align: center; padding: 40px 20px; }
        .gwch-form-thanks h3 {
          font-family: Georgia, serif;
          font-size: 28px;
          color: var(--gwch-navy);
          margin: 0 0 12px;
        }
        .gwch-form-thanks p { font-size: 15px; line-height: 1.7; color: var(--gwch-muted); }
      `}</style>
    </div>
  );
}


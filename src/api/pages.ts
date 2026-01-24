import { Page } from '../types/page';

export async function getPageBySlug(slug: string): Promise<Page | null> {
  if (slug !== '/' && slug !== 'about') return null;

  return {
    id: 1,
    slug,
    template: 'default',
    seo: {
      title: "BuiltWell – The Last Contractor You’ll Hire",
      description: 'Reliable home remodeling in Connecticut',
    },
    sections: [
      // HERO SLIDER (LOCKED TEXT, ONLY IMAGES)
      {
        id: 1,
        type: 'hero_slider',
        data: {
          headline: 'The Last Contractor You’ll Hire',
          subheadline:
            'From custom kitchens to full home additions, we rebuild with precision, transparency, and craftsmanship that lasts a lifetime.',
          cta_primary: {
            label: 'BOOK A FREE CONSULTATION',
            url: '/contact',
          },
          cta_secondary: {
            label: 'CALL NOW',
            url: 'tel:+12039199616',
          },
          images: [
            '/images/hero/hero-carousel-1.jpg',
            '/images/hero/hero-carousel-2.jpg',
            '/images/hero/hero-carousel-3.jpg',
            '/images/hero/hero-carousel-4.png',
            '/images/hero/hero-carousel-final.png',
          ],
        },
      },
      {
        id: 2,
        type: 'trust_bar',
        data: {
          license: 'CT HIC License #HIC.0652847',
          rating: '5-Star Rated Contractor',
          experience: '15+ Years Experience',
          areas: 'Fairfield & New Haven Counties',
        },
      },
      {
        id: 3,
        type: 'problem',
        data: {
          eyebrow: 'The Problem We Solve',
          title: 'Tired of Contractors Who',
          highlight: 'Disappear?',
          paragraphs: [
            `You've heard the promises before. "We'll start Monday." "Should take two weeks." "I'll call you back."`,
            `Then Monday comes and goes. Two weeks turns into two months. And that callback? Still waiting.`,
            `You're not looking for the cheapest contractor. You're looking for one who actually does what they say. One who shows up. Communicates. Finishes the job. And stands behind their work.`,
            `That's what Built Well CT does. For over 15 years, we've served homeowners across Fairfield and New Haven Counties — not by being the loudest, but by being the most reliable.`,
            `We don't overpromise. We don't disappear. We do the work, we do it right, and we're not done until you are.`,
          ],
          cta_label: 'See How We Work',
          cta_url: '/how-we-work',
        },
      },
      {
        id: 4,
        type: 'services',
        data: {
          title: 'Our Services',
          subtitle:
            'We specialize in high-end interior renovations and additions. Every project is managed with strict attention to detail and communication.',
          cta: {
            label: 'BOOK A FREE CONSULTATION',
            url: '/contact',
          },
          items: [
            {
              title: 'Kitchen Remodeling',
              description:
                'Custom cabinetry, islands, and high-end finishes designed for the way you cook and live.',
              image: '/images/services/service-kitchen.jpg',
            },
            {
              title: 'Bathroom Remodeling',
              description:
                'Spa-inspired master baths, powder rooms, and guest bathrooms with premium tile and fixtures.',
              image: '/images/services/bathroom-remodel-new.jpg',
            },
            {
              title: 'Flooring',
              description:
                'Expert installation of hardwood, luxury vinyl plank, tile, and refinishing services.',
              image: '/images/services/service-flooring.png',
            },
            {
              title: 'Basement Finishing',
              description:
                'Transform your lower level into a home theater, gym, office, or guest suite.',
              image: '/images/services/basement-finish-real.jpeg',
            },
            {
              title: 'Home Additions',
              description:
                'Seamlessly expand your square footage with sunrooms, second stories, or master suites.',
              image: '/images/services/hero-carousel-1.jpg',
            },
            {
              title: 'Living Room Remodeling',
              description:
                'Elegant updates including crown molding, built-ins, and refinished hardwood floors.',
              image: '/images/services/living-room-real.jpeg',
            },
            {
              title: 'Interior Painting',
              description:
                'Flawless wall and trim painting, wallpaper installation, and color consultation.',
              image: '/images/services/interior-painting-new.jpg',
            },
            {
              title: 'Interior Carpentry',
              description:
                'Custom built-ins, crown molding, wainscoting, and architectural trim work.',
              image: '/images/services/interior-carpentry-final.jpeg',
            },
            {
              title: 'Attic Conversions',
              description:
                "Maximize your home's potential by turning your attic into a functional living space.",
              image: '/images/services/attic-empty.jpg',
            },
            {
              title: 'Decks & Porches',
              description:
                'Beautiful outdoor living spaces, including composite decking and screened-in porches.',
              image: '/images/services/deck-real.jpg',
            },
            {
              title: 'Remodeling & Design Planning',
              description:
                'Comprehensive design services to visualize your dream space before construction begins.',
              image: '/images/services/remodeling-design.png',
            },
            {
              title: 'Comfort Accessibility Remodeling',
              description:
                'ADA-compliant modifications including roll-in showers and accessible layouts.',
              image: '/images/services/comfort-accessibility.jpg',
            },
          ],
        },
      },
      {
        id: 5,
        type: 'stats_counter',
        data: {
          items: [
            { value: 24, suffix: '+', label: 'Bathroom Remodels' },
            { value: 19, suffix: '+', label: 'Kitchen Renovations' },
            { value: 16, suffix: '+', label: 'Basement Finishes' },
            { value: 100, suffix: '%', label: 'Happy Clients' }
          ]
        }
      },
      {
        id:6,
        type: 'story_split',
        data: {
          badge: 'Our Origins',
          title: {
            normal: 'Built on Reconstruction',
            highlight: 'Discipline'
          },
          image: '/images/founder-sprinter.png',
          paragraphs: [
            'True craftsmanship isn’t just about aesthetics; it’s about structural integrity and precision. Our foundation was forged in the demanding world of restoration and insurance reconstruction—where rebuilding from the ground down requires absolute adherence to strict codes and regulations.',
            'This background instilled a level of discipline that sets us apart in the luxury market. We don’t just renovate; we engineer solutions that stand the test of time. Whether it’s a complex home addition or a custom kitchen, we bring the same rigorous standards and technical expertise to every detail.',
            'Today, BuiltWell combines this technical mastery with high-end design to deliver superior remodeling experiences. We build with the precision of a restoration expert and the eye of a luxury craftsman.'
          ],
          quote: 'We don’t just make it look beautiful. We build it correctly, from the structure out, ensuring it lasts a lifetime.'
        }
      },
      {
        id:7,
        type: 'warranty',
        data: {
          badge: {
            label: 'Peace of Mind Guarantee'
          },

          title: 'Our Solid Warranty Promise',
          highlight: 'Solid Warranty',

          description: 'We don\'t just build it right; we stand behind it. Every project comes with our comprehensive workmanship guarantee, ensuring your investment is protected long after we leave the job site.',

          features: [
            {
              title: 'Superior Craftsmanship',
              text: 'Built to code and beyond, using only premium materials.',
              icon: 'hammer'
            },
            {
              title: 'Long-Term Protection',
              text: 'Issues related to our work? We fix them. No questions asked.',
              icon: 'clock'
            }
          ],

          included: [
            'Structural Integrity Guarantee',
            'Material Defect Coverage Assistance',
            'Workmanship Quality Assurance',
            'Post-Completion Support',
            'Transparent Warranty Documentation',
            'Annual Maintenance Check-ins',
            'Priority Service Scheduling'
          ],

          footer_quote: 'We build it like it\'s our own home. That\'s the BuiltWell standard.'
        }
      },
      {
        id:7,
        type: "faq",
        data: {
        title: "...",
        items: [
            { "q": "...", "a": "..." }
          ]
        }
      },
      {
        id: 8,
        type: 'service_areas',
        data: {
          title: 'Areas We Serve',
          subtitle:
            'Proudly serving homeowners throughout Fairfield County and New Haven County, Connecticut.',
          counties: [
            {
              title: 'Fairfield County',
              image: '/images/fairfield-landmark.jpg',
              towns: [
                { name: 'Bethel' },
                { name: 'Bridgeport' },
                { name: 'Brookfield' },
                { name: 'Byram' },
                { name: 'Cos Cob' },
                { name: 'Danbury' },
                { name: 'Darien', highlight: true },
                { name: 'Easton' },
                { name: 'Fairfield', highlight: true },
                { name: 'Greenwich', highlight: true },
                { name: 'Monroe' },
                { name: 'New Canaan', highlight: true },
                { name: 'New Fairfield' },
                { name: 'Newtown' },
                { name: 'Norwalk', highlight: true },
                { name: 'Old Greenwich' },
                { name: 'Redding' },
                { name: 'Ridgefield', highlight: true },
                { name: 'Riverside' },
                { name: 'Shelton' },
                { name: 'Sherman' },
                { name: 'Stamford', highlight: true },
                { name: 'Stratford' },
                { name: 'Trumbull' },
                { name: 'Weston' },
                { name: 'Westport', highlight: true },
                { name: 'Wilton' },
              ],
            },
            {
              title: 'New Haven County',
              image: '/images/new-haven-landmark.jpg',
              towns: [
                { name: 'Ansonia' },
                { name: 'Beacon Falls' },
                { name: 'Bethany' },
                { name: 'Branford', highlight: true },
                { name: 'Cheshire' },
                { name: 'Derby' },
                { name: 'East Haven' },
                { name: 'Guilford', highlight: true },
                { name: 'Hamden', highlight: true },
                { name: 'Madison', highlight: true },
                { name: 'Meriden' },
                { name: 'Middlebury' },
                { name: 'Milford', highlight: true },
                { name: 'Naugatuck' },
                { name: 'New Haven', highlight: true },
                { name: 'North Branford' },
                { name: 'North Haven' },
                { name: 'Orange', highlight: true },
                { name: 'Oxford' },
                { name: 'Prospect' },
                { name: 'Seymour' },
                { name: 'Southbury' },
                { name: 'Wallingford' },
                { name: 'Waterbury' },
                { name: 'West Haven' },
                { name: 'Wolcott' },
                { name: 'Woodbridge', highlight: true },
              ],
            },
          ],

          map_image: '/images/ct-map-final-labeled.png',

          // privremeno dok ne povežeš Google map:
          show_google_map: false,
        },
      }



    ],
  };
}

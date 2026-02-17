// TODO: Replace mockHomePage with fetch from Laravel API
import type { CMSPage } from '@/types/cms';

export const mockHomePage: CMSPage = {
  id: 1,
  slug: 'home',
  template: 'home',
  seo: {
    title: "BuiltWell Construction — The Last Contractor You'll Hire",
    description:
      'Premium home remodeling in Fairfield & New Haven Counties. Kitchen, bathroom, basement finishing & home additions. CT licensed, insured, 5-star rated.',
  },
  sections: [
    {
      id: 1,
      type: 'hero_slider',
      is_active: true,
      data: {
        headline: "The Last Contractor You'll Hire",
        subheadline:
          'We communicate. We arrive on time. We complete what we start.',
        cta_primary: {
          label: 'Book Free Consultation',
          url: '/contact',
        },
        cta_secondary: {
          label: 'Call Now',
          url: 'tel:+12035551234',
        },
        slides: [
          {
            image: '/images/hero-kitchen.jpg',
            alt: 'Modern kitchen remodel by BuiltWell',
          },
          {
            image: '/images/hero-bathroom.jpg',
            alt: 'Luxury bathroom renovation',
          },
          {
            image: '/images/hero-addition.jpg',
            alt: 'Custom home addition',
          },
        ],
        badges: [
          { label: 'Years Experience', value: '15+' },
          { label: 'Google Rating', value: '5.0' },
          { label: 'Projects Completed', value: '500+' },
        ],
      },
    },
    {
      id: 2,
      type: 'trust_bar',
      is_active: true,
      data: {
        license: 'CT Licensed & Insured',
        rating: '5-Star Google Rating',
        experience: '15+ Years Experience',
        areas: 'Serving Fairfield & New Haven Counties',
      },
    },
    {
      id: 3,
      type: 'rich_text',
      is_active: true,
      data: {
        content: `
          <h2>Built on Reliability. Driven by Craftsmanship.</h2>
          <p>
            Most homeowners have a contractor horror story — missed deadlines, disappearing crews,
            surprise costs. At BuiltWell, we built our reputation by doing the opposite.
            Every project begins with a detailed scope of work, transparent pricing, and a dedicated
            project manager who keeps you informed at every stage.
          </p>
          <p>
            We hold ourselves to the standard that your home deserves: meticulous planning,
            skilled tradespeople, and a relentless commitment to finishing on time and on budget.
            That is not a promise — it is how we operate, every single day.
          </p>
        `,
      },
    },
    {
      id: 4,
      type: 'services',
      is_active: true,
      data: {
        title: 'Our Services',
        subtitle:
          'From concept to completion, we deliver expert craftsmanship across every area of your home.',
        cta: {
          label: 'View All Services',
          url: '/services',
        },
        items: [
          {
            title: 'Kitchen Remodeling',
            description:
              'Custom cabinetry, premium countertops, and thoughtful layouts that transform your kitchen into the heart of your home.',
            image: '/images/service-kitchen.jpg',
          },
          {
            title: 'Bathroom Remodeling',
            description:
              'Spa-inspired bathrooms with quality tilework, modern fixtures, and designs that maximize both style and function.',
            image: '/images/service-bathroom.jpg',
          },
          {
            title: 'Basement Finishing',
            description:
              'Turn unused square footage into livable space — home offices, entertainment rooms, or guest suites built to code.',
            image: '/images/service-basement.jpg',
          },
          {
            title: 'Home Additions',
            description:
              'Seamless additions that expand your living space while matching the architectural character of your existing home.',
            image: '/images/service-addition.jpg',
          },
        ],
      },
    },
    {
      id: 5,
      type: 'call_to_action',
      is_active: true,
      data: {
        title: 'Ready to Start Your Project?',
        subtitle:
          'Schedule a free, no-obligation consultation and let us show you what reliable remodeling looks like.',
        button_label: 'Schedule Free Consultation',
        button_url: '/contact',
      },
    },
  ],
};

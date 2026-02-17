'use client';

import ServiceHero from './ServiceHero';

type Cta = {
  label: string;
  url: string;
};

type Props = {
  data: {
    headline: string;
    subheadline?: string;
    background_image?: string | null;
    primary_cta?: Cta | null;
    secondary_cta?: Cta | null;
  };
};

export default function HeroServiceLocation({ data }: Props) {
  return (
    <ServiceHero
      data={{
        title: data.headline,
        subtitle: data.subheadline,
        background_image: data.background_image,
        primary_cta: data.primary_cta,
        secondary_cta: data.secondary_cta,
      }}
    />
  );
}

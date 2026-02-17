import Link from 'next/link';
import { MapPin } from 'lucide-react';

type TownValue = string | { name: string; highlight?: boolean; url?: string };

type County = {
  name?: string;
  county_name?: string;
  title?: string;
  image?: string | null;
  url?: string;
  towns?: TownValue[];
  cities?: TownValue[];
};

type Props = {
  data: {
    title: string;
    subtitle?: string;
    counties: County[];
    show_map?: boolean;
    map_image?: string | null;
    map_embed?: string | null;
    map_embed_url?: string | null;
    google_map_embed?: string | null;
    map_iframe_src?: string | null;
  };
};

function countyImageFallback(countyName: string) {
  if (/new haven/i.test(countyName)) {
    return '/images/new-haven-landmark.jpg';
  }
  return '/images/fairfield-landmark.jpg';
}

function resolveMapEmbedUrl(data: Props['data']) {
  return (
    data.map_embed ||
    data.map_embed_url ||
    data.google_map_embed ||
    data.map_iframe_src ||
    'https://www.google.com/maps?q=Fairfield%20County%20CT&output=embed'
  );
}

function normalizeTowns(county: County): TownValue[] {
  return county.towns || county.cities || [];
}

export default function ServiceAreas({ data }: Props) {
  const showMap = data.show_map ?? true;
  const mapImage = data.map_image || '/images/ct-map-final-labeled.png';
  const embedUrl = resolveMapEmbedUrl(data);

  return (
    <section id="areas" className="bg-[#f3f3f2] py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <h2 className="text-[44px] font-semibold text-[#1E2F4A] md:text-[50px]">{data.title}</h2>
          {data.subtitle ? <p className="mt-3 text-base text-[#4f5f78] md:text-lg">{data.subtitle}</p> : null}
        </div>

        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2">
          {data.counties.map((county) => {
            const countyName = county.name || county.county_name || county.title || '';
            const imageSrc = county.image || countyImageFallback(countyName);
            const towns = normalizeTowns(county);

            return (
              <article
                key={countyName}
                className="overflow-hidden rounded-lg border border-[#e5ddd0] bg-white shadow-[0_10px_24px_rgba(30,47,74,0.1)]"
              >
                <div className="relative h-44">
                  <img src={imageSrc} alt={countyName} className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />
                  <h3 className="absolute bottom-3 left-4 text-[28px] font-semibold text-white">{countyName}</h3>
                </div>

                <div className="p-5">
                  <div className="grid grid-cols-2 gap-x-6 gap-y-2.5">
                    {towns.map((town) => {
                      const townName = typeof town === 'string' ? town : town.name;
                      const townUrl = typeof town === 'object' ? town.url : undefined;
                      const highlight = typeof town === 'object' ? Boolean(town.highlight) : false;

                      const content = (
                        <span
                          className={`inline-flex items-center text-[14px] ${highlight ? 'font-semibold text-[#C89B5B]' : 'text-[#5b6b84]'}`}
                        >
                          <MapPin className={`mr-1.5 h-3.5 w-3.5 ${highlight ? 'text-[#C89B5B]' : 'text-[#cfd5df]'}`} />
                          <span className="truncate">{townName}</span>
                        </span>
                      );

                      return townUrl ? (
                        <Link key={`${countyName}-${townName}`} href={townUrl} className="hover:underline">
                          {content}
                        </Link>
                      ) : (
                        <div key={`${countyName}-${townName}`}>{content}</div>
                      );
                    })}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {showMap ? (
          <div className="mx-auto mt-10 grid max-w-4xl gap-7 md:grid-cols-2">
            <div className="overflow-hidden rounded-lg border border-[#e5ddd0] bg-white shadow-[0_10px_24px_rgba(30,47,74,0.1)]">
              <img src={mapImage} alt="Connecticut service map" className="h-[250px] w-full object-cover" />
            </div>

            <div className="overflow-hidden rounded-lg border border-[#e5ddd0] bg-white shadow-[0_10px_24px_rgba(30,47,74,0.1)]">
              <iframe
                src={embedUrl}
                title="Service area map"
                loading="lazy"
                className="h-[250px] w-full border-0"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}

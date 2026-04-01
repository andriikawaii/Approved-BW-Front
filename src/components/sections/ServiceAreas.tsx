import Link from 'next/link'
import { MapPin } from 'lucide-react'

type TownValue = string | { name: string; highlight?: boolean; url?: string }

type County = {
  name?: string
  county_name?: string
  title?: string
  image?: string | null
  image_alt?: string | null
  url?: string
  towns?: TownValue[]
  cities?: TownValue[]
}

type Props = {
  data: {
    title?: string
    headline?: string
    subtitle?: string
    subheadline?: string
    counties?: County[]
    show_map?: boolean
    map_image?: string | null
    map_embed?: string | null
    map_embed_url?: string | null
    google_map_embed?: string | null
    map_iframe_src?: string | null
  }
}

function countyImageFallback(countyName: string) {
  if (/new haven/i.test(countyName)) {
    return '/images/new-haven-landmark.jpg'
  }
  return '/images/fairfield-landmark.jpg'
}

function resolveMapEmbedUrl(data: Props['data']) {
  return (
    data.map_embed ||
    data.map_embed_url ||
    data.google_map_embed ||
    data.map_iframe_src ||
    'https://www.google.com/maps?q=Fairfield%20County%20CT&output=embed'
  )
}

function normalizeTowns(county: County): TownValue[] {
  return county.towns || county.cities || []
}

export default function ServiceAreas({ data }: Props) {
  const title = data.title || data.headline || 'Areas We Serve'
  const subtitle =
    data.subtitle ||
    data.subheadline ||
    'Proudly serving homeowners throughout Connecticut.'

  const counties = data.counties || []
  const showMap = data.show_map ?? true
  const mapImage = data.map_image || '/images/ct-map-final-labeled.png'
  const embedUrl = resolveMapEmbedUrl(data)

  const countiesGridClass =
    counties.length > 1 ? 'md:grid-cols-2' : 'md:grid-cols-1'

  return (
    <section id="areas" className="py-24 bg-white">
      <div className="container mx-auto px-6">

        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#1A2B45] mb-6">
            {title}
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* COUNTIES GRID */}
        <div
          className={`grid ${countiesGridClass} gap-12 max-w-6xl mx-auto mb-20`}
        >
          {counties.map((county) => {
            const countyName =
              county.name || county.county_name || county.title || ''
            const imageSrc =
              county.image || countyImageFallback(countyName)
            const towns = normalizeTowns(county)

            return (
              <article
                key={countyName}
                className="flex flex-col h-full shadow-xl rounded-xl overflow-hidden bg-white transition hover:shadow-2xl"
              >
                {/* IMAGE HEADER */}
                <div className="relative h-64 w-full overflow-hidden">
                  <img
                    src={imageSrc}
                    alt={county.image_alt || countyName}
                    className="absolute inset-0 h-full w-full object-cover"
                  />

                  {/* tamni sloj preko slike */}
                  <div className="absolute inset-0 z-[1] bg-black/45" />

                  {/* dodatni gradient (bolja čitljivost) */}
                  <div className="absolute inset-0 z-[2] bg-gradient-to-b from-black/10 via-black/20 to-black/60" />

                  {/* naslov */}
                  <h3
                    className="absolute bottom-6 left-6 z-[3] font-serif text-4xl font-extrabold !text-white
                              drop-shadow-[0_6px_18px_rgba(0,0,0,0.95)]"
                    style={{ color: "#fff" }} // fallback ako neki global CSS ipak gazi Tailwind
                  >
                    {countyName}
                  </h3>
                </div>

                {/* TOWNS */}
                <div className="bg-white p-8 flex-grow">
                  <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                    {towns.map((town) => {
                      const townName =
                        typeof town === 'string' ? town : town.name
                      const townUrl =
                        typeof town === 'object' ? town.url : undefined
                      const highlight =
                        typeof town === 'object'
                          ? Boolean(town.highlight)
                          : false

                      const baseClasses =
                        'flex items-center text-[15px] transition'

                      const normalClasses =
                        'text-gray-500 hover:text-[#1A2B45]'

                      const highlightClasses =
                        'font-bold text-[#1A2B45] underline decoration-[#C68E4D] decoration-2 underline-offset-4'

                      const iconClasses = highlight
                        ? 'text-[#C68E4D]'
                        : 'text-gray-300'

                      const content = (
                        <>
                          <MapPin
                            className={`w-3.5 h-3.5 mr-2 shrink-0 ${iconClasses}`}
                          />
                          <span className="truncate">
                            {townName}
                          </span>
                        </>
                      )

                      return townUrl ? (
                        <Link
                          key={`${countyName}-${townName}`}
                          href={townUrl}
                          className={`${baseClasses} ${
                            highlight
                              ? highlightClasses
                              : normalClasses
                          }`}
                        >
                          {content}
                        </Link>
                      ) : (
                        <div
                          key={`${countyName}-${townName}`}
                          className={`${baseClasses} ${
                            highlight
                              ? highlightClasses
                              : normalClasses
                          }`}
                        >
                          {content}
                        </div>
                      )
                    })}
                  </div>
                </div>
              </article>
            )
          })}
        </div>

        {/* MAP SECTION */}
        {showMap && (
          <div className="max-w-6xl mx-auto mt-12 grid lg:grid-cols-2 gap-8">

            {/* STATIC MAP IMAGE */}
            <div className="relative w-full h-[500px] rounded-xl overflow-hidden shadow-2xl border border-gray-100 hover:scale-[1.01] transition-transform duration-500 bg-white flex items-center justify-center">
              <img
                src={mapImage}
                alt="Map of Connecticut counties served"
                className="w-full h-full object-contain p-4"
              />
            </div>

            {/* EMBED MAP */}
            <div className="relative w-full h-[500px] rounded-xl overflow-hidden shadow-2xl border border-gray-100 hover:scale-[1.01] transition-transform duration-500">
              <iframe
                src={embedUrl}
                title="Service Area Map"
                loading="lazy"
                className="w-full h-full border-0"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

          </div>
        )}
      </div>
    </section>
  )
}
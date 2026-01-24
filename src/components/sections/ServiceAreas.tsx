import { MapPin } from "lucide-react";
import { SERVICE_AREAS } from "@/src/data/service-areas";

export default function ServiceAreas() {
  return (
    <section id="areas" className="bg-white py-24">
      <div className="flex justify-center">
        <div className="container w-full px-4 sm:px-6">
          
          {/* Header */}
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <h2 className="mb-6 font-serif text-4xl font-bold text-[#1A2B45] md:text-5xl">
              Areas We Serve
            </h2>
            <p className="text-lg text-gray-600">
              Proudly serving homeowners throughout Fairfield County and New Haven County, Connecticut.
            </p>
          </div>

          {/* Counties */}
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 md:grid-cols-2">
            {SERVICE_AREAS.map((county) => (
              <div
                key={county.title}
                className="flex flex-col overflow-hidden rounded-xl shadow-lg"
              >
                {/* Image */}
                <div className="relative h-64">
                  <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#1A2B45]/90 via-[#1A2B45]/30 to-transparent" />
                  <img
                    src={county.image}
                    alt={county.title}
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <h3 className="absolute bottom-0 left-0 z-20 p-8 font-serif text-3xl font-bold text-white">
                    {county.title}
                  </h3>
                </div>

                {/* Towns */}
                <div className="bg-white p-8">
                  <div
                    className="
                      grid 
                      grid-cols-2 
                      grid-flow-col 
                      grid-rows-[repeat(14,minmax(0,1fr))] 
                      gap-x-6 
                      gap-y-3
                    "
                  >
                    {county.towns.map((town) => (
                      <div
                        key={`${county.title}-${town.name}`}
                        className={`flex items-center text-[15px] ${
                          town.highlight
                            ? "font-bold text-[#1A2B45] underline decoration-[#C68E4D] decoration-2 underline-offset-4"
                            : "text-gray-500"
                        }`}
                      >
                        <MapPin
                          className={`mr-2 h-3.5 w-3.5 shrink-0 ${
                            town.highlight ? "text-[#C68E4D]" : "text-gray-300"
                          }`}
                        />
                        <span className="truncate">{town.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Maps */}
          <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-8 lg:grid-cols-2">
            <div className="flex h-[400px] items-center justify-center rounded-xl border bg-white shadow-2xl">
              <img
                src="/images/ct-map-final-labeled.png"
                alt="Connecticut Service Areas"
                className="h-full w-full object-contain p-4"
              />
            </div>

            <div className="h-[400px] overflow-hidden rounded-xl border bg-white shadow-2xl">
              {/* <ServiceMap /> */}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

type Props = {
  data: {
    headline?: string;
    title?: string;
    description?: string;
    zoom?: number;
    center?: {
      lat?: number;
      lng?: number;
    };
    placeholder?: boolean;
  };
};

function buildEmbedUrl(lat: number, lng: number, zoom: number) {
  return `https://www.google.com/maps?q=${lat},${lng}&z=${zoom}&output=embed`;
}

export default function MapEmbedSection({ data }: Props) {
  const title = data.headline || data.title || 'Our Service Area';
  const lat = data.center?.lat ?? 41.18;
  const lng = data.center?.lng ?? -73.19;
  const zoom = data.zoom ?? 10;

  return (
    <section className="bg-[#f3f3f2] py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-10 text-center">
          <h2 className="text-4xl font-semibold text-[#1E2F4A] md:text-[44px]">{title}</h2>
          {data.description ? (
            <p className="mx-auto mt-4 max-w-3xl text-base text-[#5e6f87] md:text-lg">{data.description}</p>
          ) : null}
        </div>

        <div className="overflow-hidden rounded-2xl border border-[#e1d8c8] bg-white shadow-[0_14px_28px_rgba(30,47,74,0.09)]">
          {data.placeholder ? (
            <div className="relative h-[340px] bg-[linear-gradient(135deg,#f8f4eb_0%,#eee5d3_40%,#f7f3e9_100%)]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(30,47,74,0.12),transparent_35%)]" />
              <div className="absolute inset-0 bg-[linear-gradient(rgba(30,47,74,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(30,47,74,0.06)_1px,transparent_1px)] bg-[size:40px_40px]" />
              <div className="relative flex h-full items-center justify-center p-8 text-center">
                <div className="max-w-lg rounded-xl border border-[#dbcfb7] bg-white/85 p-6 backdrop-blur-[2px]">
                  <p className="text-sm uppercase tracking-[0.08em] text-[#7f6f54]">Map Placeholder</p>
                  <p className="mt-3 text-sm leading-relaxed text-[#4f5f78]">
                    Interactive map can be connected here. Current center: {lat}, {lng} (zoom {zoom}).
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <iframe
              src={buildEmbedUrl(lat, lng, zoom)}
              title={title}
              className="h-[340px] w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          )}
        </div>
      </div>
    </section>
  );
}


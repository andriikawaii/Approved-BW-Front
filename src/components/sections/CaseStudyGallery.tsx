type GalleryItem = {
  image?: string;
  alt?: string;
  caption?: string | null;
};

type Props = {
  data: {
    items?: GalleryItem[];
  };
};

export default function CaseStudyGallery({ data }: Props) {
  const items = (data.items || []).filter((item) => Boolean(item.image));
  if (items.length === 0) {
    return null;
  }

  return (
    <section className="bg-[#F5F3EF] py-14 md:py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-8 flex items-end justify-between gap-4">
          <h2 className="text-3xl font-semibold text-[#1E2F4A] md:text-4xl">Project Gallery</h2>
          <p className="text-sm text-[#667892]">{items.length} photos</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => (
            <figure
              key={`${item.image}-${index}`}
              className="group overflow-hidden rounded-xl border border-[#e5dccb] bg-white shadow-[0_8px_22px_rgba(30,47,74,0.08)]"
            >
              <img
                src={item.image}
                alt={item.alt || 'Case study project image'}
                className="h-64 w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
              />
              {item.caption ? (
                <figcaption className="border-t border-[#efe6d7] px-4 py-3 text-sm text-[#4b5d78]">
                  {item.caption}
                </figcaption>
              ) : null}
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

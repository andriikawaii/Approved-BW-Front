export const CallToAction = ({ data }: { data: any }) => (
  <section className="bg-gray-100 py-20 text-center">
    <h2 className="text-3xl font-serif mb-6">{data.title}</h2>
    <a href={data.button_url} className="bg-[#1E2B43] text-white px-8 py-4">
      {data.button_label}
    </a>
  </section>
);

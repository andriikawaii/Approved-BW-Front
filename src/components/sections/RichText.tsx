export const RichText = ({ data }: { data: { content: string } }) => (
  <section className="py-16">
    <div
      className="container mx-auto prose max-w-4xl"
      dangerouslySetInnerHTML={{ __html: data.content }}
    />
  </section>
);

type JsonLdProps = {
  schemas: Record<string, any>[];
};

export function JsonLd({ schemas }: JsonLdProps) {
  if (!schemas || schemas.length === 0) return null;

  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}

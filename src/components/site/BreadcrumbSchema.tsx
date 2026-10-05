export function BreadcrumbSchema({
  name,
  path,
}: {
  name: string;
  path: string;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "OpsKnight",
        item: "https://opsknight.com/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name,
        item: `https://opsknight.com${path}`,
      },
    ],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema).replaceAll("<", "\\u003c"),
      }}
    />
  );
}

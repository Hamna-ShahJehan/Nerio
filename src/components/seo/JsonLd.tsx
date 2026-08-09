export function ItemPageJsonLd({ name, description, image, url, author, datePublished, dateModified }: { name: string; description: string; image: string; url: string; author: string; datePublished: string; dateModified: string }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "Article", name, description, image, url, author: { "@type": "Person", name: author }, datePublished, dateModified }) }} />
}

export function BreadcrumbJsonLd({ items }: { items: { name: string; url: string }[] }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: items.map((item, i) => ({ "@type": "ListItem", position: i + 1, name: item.name, item: item.url })) }) }} />
}

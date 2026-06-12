/**
 * JsonLd — injects a JSON-LD structured data script tag.
 * Works in both server and client components.
 * Pass the raw JSON string from page.content.schema.
 */
export function JsonLd({ schema }) {
  if (!schema || typeof schema !== 'string' || !schema.trim()) return null
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: schema }}
    />
  )
}

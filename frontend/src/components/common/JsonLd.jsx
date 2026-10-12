import { toJsonLdBlocks } from '@/lib/jsonLd'

/**
 * JsonLd — injects JSON-LD structured data script tags.
 * Works in both server and client components.
 * Pass the raw JSON string from page.content.schema (a pasted
 * <script type="application/ld+json"> wrapper is accepted too).
 */
export function JsonLd({ schema }) {
  return toJsonLdBlocks(schema).map((json, i) => (
    <script
      key={i}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  ))
}

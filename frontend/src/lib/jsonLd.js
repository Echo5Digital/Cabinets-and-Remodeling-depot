/**
 * Turn a stored JSON-LD value (page.content.schema / blog.schema) into the list of
 * JSON strings to render, one per <script type="application/ld+json"> tag.
 *
 * - Line endings are normalised to LF. The HTML parser rewrites CRLF to LF, so a
 *   string stored with \r\n (the admin textarea on Windows does this) never matches
 *   the DOM and React reports a hydration mismatch.
 * - Editors often paste the whole <script type="application/ld+json"> tag. We render
 *   our own wrapper, so unwrap pasted tags (each one becomes its own block) instead
 *   of nesting a script inside a script, which is invalid JSON-LD.
 */
export function toJsonLdBlocks(schema) {
  if (!schema || typeof schema !== 'string') return []
  const text = schema.replace(/\r\n?/g, '\n')
  const wrapped = [...text.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/gi)]
  const blocks = wrapped.length ? wrapped.map((m) => m[1]) : [text]
  return blocks.map((block) => block.trim()).filter(Boolean)
}

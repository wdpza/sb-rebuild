function parseJson(raw?: string | null): unknown {
  if (!raw || !raw.trim()) return null;
  try {
    const data: unknown = JSON.parse(raw);
    const isObject = (value: unknown): value is Record<string, unknown> =>
      typeof value === "object" && value !== null && !Array.isArray(value);

    // JSON-LD must contain an object or a non-empty array of objects.
    if (isObject(data)) return data;
    if (Array.isArray(data) && data.length > 0 && data.every(isObject)) return data;
    return null;
  } catch {
    return null;
  }
}

function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function JsonLd({ raw }: { raw?: string | null }) {
  const data = parseJson(raw);
  if (!data) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
    />
  );
}

export default JsonLd;

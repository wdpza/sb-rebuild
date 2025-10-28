export function makeSectionId(title: string | null | undefined, i: number) {
  const base =
    (title ?? "section")
      .toLowerCase()
      .trim()
      .replace(/&/g, "and")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "") || "section";
  return `section-${i}-${base}`;
}

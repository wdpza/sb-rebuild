// components/case-study/CaseStudySidebar.tsx
import Link from "next/link";
import { makeSectionId } from "@/lib/utils/section-id";

type Section = {
  sectionTitle?: string | null;
};

export default function CaseStudySidebar({ item }: { item: any }) {
  const sections: Section[] = item?.caseStudies?.pageSection ?? [];

  return (
    <aside className="category-sidebar sticky top-24 lg:top-28">
      <ul className="space-y-3 text-xl font-light">
        {sections.map((s, i) => {
          const id = makeSectionId(s.sectionTitle, i);
          return (
            <li key={id} className="mb-6">
              <Link
                href={`#${id}`}
                className="text-neutral-softest/50 hover:text-neutral-softest transition"
              >
                {s.sectionTitle || `Section ${i + 1}`}
              </Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}

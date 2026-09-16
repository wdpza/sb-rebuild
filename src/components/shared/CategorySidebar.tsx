import Link from "next/link";

export default function CategorySidebar({ categories }: any) {
  if (!categories || !Array.isArray(categories) || categories.length === 0)
    return null;

  return (
    <aside className="category-sidebar">
      <h2 className="mb-5 text-[18px] font-semibold text-neutral-softest">View Topics</h2>
      <ul className="space-y-3">
        {categories.map((category: any) => (
          <li key={category.uri}>
            <Link
              href={category.uri}
              className="
                text-center
                w-full
                bg-neutral-strongest
                gradient-border
                inline-block px-8 py-3 
                text-neutral-softest font-semibold 
                rounded-lg shadow-md 
                transition-all duration-300 
                hover:bg-gradient-starbright
              "
            >
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}

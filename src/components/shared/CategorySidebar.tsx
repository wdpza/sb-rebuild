"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

type Category = { name: string; slug?: string | null; uri?: string | null };

export default function CategorySidebar({ categories }: { categories: Category[] }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (!Array.isArray(categories) || categories.length === 0) return null;

  return (
    <aside className="category-sidebar">
      <form action={pathname} className="mb-8">
        <label htmlFor="blog-search" className="sr-only">Search blog articles</label>
        <input
          id="blog-search"
          name="s"
          type="search"
          defaultValue={searchParams.get("s") ?? ""}
          placeholder="Search..."
          className="h-14 w-full rounded-sm border border-white/15 bg-[#202020] px-5 text-[16px] text-white outline-none transition-colors placeholder:text-white/80 focus:border-[#4389f5]"
        />
      </form>

      <nav aria-label="Blog categories">
        <ul className="space-y-3">
          {categories.map((category) => {
            const href = category.slug ? `/articles/${category.slug}` : category.uri || "/articles";
            const isActive = pathname === href;

            return (
              <li key={category.slug || category.uri || category.name}>
                <Link
                  href={href}
                  className={`gradient-border block w-full rounded-sm text-center text-[14px] font-normal text-neutral-softest ${isActive ? "active" : ""}`}
                >
                  {category.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}

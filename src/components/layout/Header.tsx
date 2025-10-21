"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

type MenuItem = {
  id?: string | null;
  label?: string | null;
  url?: string | null;
  uri?: string | null;
  target?: "_blank" | null;
  cssClasses?: string[] | null;
  parentId?: string | null;
  order?: number | null;
  connectedObject?: { slug?: string | null } | null;
};

type MenuNode = MenuItem & { children: MenuItem[] };

export default function Header({
  menu,
  logo,
}: {
  menu: any;
  logo: any;
}) {
  // Always call hooks before the early return
  const flatItems: MenuItem[] = menu?.menuItems?.nodes ?? [];

  // Build a one-level tree: roots are items with no parentId; children are items matching parentId
  const tree: MenuNode[] = useMemo(() => {
    const byParent: Record<string, MenuItem[]> = {};
    for (const item of flatItems) {
      const pid = item.parentId ?? "";
      if (!byParent[pid]) byParent[pid] = [];
      byParent[pid].push(item);
    }
    // Sort each group by "order" if present
    Object.values(byParent).forEach(group =>
      group.sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    );
    const roots = byParent[""] || byParent["null"] || [];
    const nodes: MenuNode[] = roots.map(r => ({
      ...r,
      children: byParent[r.id ?? ""] ?? [],
    }));
    return nodes;
  }, [flatItems]);

  // Dropdown state and refs for click-outside & Esc handling
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const navRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenIndex(null);
    };
    const onClick = (e: MouseEvent) => {
      if (!navRef.current) return;
      if (!navRef.current.contains(e.target as Node)) setOpenIndex(null);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("click", onClick);
    };
  }, []);

  // Early return for when `menu` is falsy, placed at the end of the component
  if (!menu) return null;

  const buildHref = (item: MenuItem) => {
    // Prefer connectedObject.slug if present, else uri, else url, else '#'
    if (item?.connectedObject?.slug) return `/${item.connectedObject.slug}`;
    if (item?.uri) return item.uri;
    return item?.url || "#";
  };

  const isExternal = (u: string) =>
    /^https?:\/\//i.test(u) && !u.startsWith(`${typeof window !== "undefined" ? window.location.origin : ""}`);

  return (
    <header className="absolute top-0 left-0 right-0 z-50 py-12">
      <div className="max-w-[1600px] mx-auto flex flex-col justify-between p-4 bg-transparent">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-start justify-start">
            {logo?.mediaItemUrl ? (
              <Image
                src={logo.mediaItemUrl}
                alt={logo.altText || "Company Logo"}
                className="h-10 w-auto ml-4 object-contain"
                width={logo?.width ?? 206}
                height={logo?.height ?? 82}
                priority
              />
            ) : null}
          </div>

          {/* Primary Nav */}
          <nav ref={navRef} aria-label="Main">
            <ul className="flex gap-6">
              {tree.map((item, index) => {
                const key = item.id ?? `root-${index}`;
                const href = buildHref(item);
                const hasChildren = Array.isArray(item.children) && item.children.length > 0;

                if (!hasChildren || href !== "#") {
                  // Normal link (no children OR has a real href)
                  const external = isExternal(href);
                  return (
                    <li key={key} className="relative">
                      <Link
                        href={href}
                        className="hover:underline text-neutral-softest text-lg transition"
                        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      >
                        {item.label ?? "Item"}
                      </Link>
                    </li>
                  );
                }

                // Parent with children; use button to toggle dropdown
                const isOpen = openIndex === index;

                return (
                  <li
                    key={key}
                    className="relative"
                    onMouseEnter={() => setOpenIndex(index)}
                    onMouseLeave={() => setOpenIndex(prev => (prev === index ? null : prev))}
                  >
                    <button
                      type="button"
                      className="text-neutral-softest text-lg transition inline-flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-300 rounded-md px-1"
                      aria-haspopup="menu"
                      aria-expanded={isOpen}
                      aria-controls={`submenu-${index}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenIndex(prev => (prev === index ? null : index));
                      }}
                    >
                      {item.label ?? "Menu"}
                      <svg
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
                        aria-hidden="true"
                      >
                        <path d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" />
                      </svg>
                    </button>

                    {/* Dropdown */}
                    <div
                      id={`submenu-${index}`}
                      role="menu"
                      aria-label={item.label ?? "Submenu"}
                      className={`absolute left-0 min-w-56 rounded-2xl shadow-xl ring-1 ring-black/5 bg-white/95 backdrop-blur-md p-2
                        ${isOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-1 pointer-events-none"}
                        transition-all duration-150 ease-out`}
                    >
                      <ul className="flex flex-col gap-1">
                        {item.children.map((child, cidx) => {
                          const ckey = child.id ?? `child-${index}-${cidx}`;
                          const chref = buildHref(child);
                          const external = isExternal(chref);
                          return (
                            <li key={ckey}>
                              <Link
                                href={chref}
                                className="block rounded-xl px-3 py-2 text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900 text-base"
                                role="menuitem"
                                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                                onClick={() => setOpenIndex(null)}
                              >
                                {child.label ?? "Item"}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
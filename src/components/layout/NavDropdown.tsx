"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import MegaMenuPortal from "./MegaMenuPortal";
import type { MenuNode } from "./Header";

type ChildNode = MenuNode & {
  mainMenuFields?: {
    backgroundImage?: { node?: { altText?: string; mediaItemUrl?: string } };
    categoryGrouping?: { nodes?: Array<{ name: string; databaseId: number }> };
  };
};

export default function NavDropdown({
  item,
  index,
  isOpen,
  setOpenIndex,
  buildHref,
  isExternal,
  navRef,
}: {
  item: MenuNode;
  index: number;
  isOpen: boolean;
  setOpenIndex: React.Dispatch<React.SetStateAction<number | null>>;
  buildHref: (item: any) => string;
  isExternal: (url: string) => boolean;
  navRef: React.RefObject<HTMLElement>;
}) {
  const children = (item.children as ChildNode[]) ?? [];
  const [panelTop, setPanelTop] = useState(0);

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const isActive = (i: number) => i === activeIndex;

  // Build categories in first-seen order (NO "All")
  const categories = useMemo(() => {
    const seen = new Map<string, number>();
    let i = 0;
    for (const child of children) {
      for (const c of child?.mainMenuFields?.categoryGrouping?.nodes ?? []) {
        if (!seen.has(c.name)) seen.set(c.name, i++);
      }
    }
    return Array.from(seen.keys()).sort((a, b) => (seen.get(a)! - seen.get(b)!));
  }, [children]);

  // Default to FIRST category when menu opens
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  useEffect(() => {
    if (isOpen) setActiveCategory(categories[0] ?? null);
  }, [isOpen, categories]);

  // Position panel full width under header/nav
  useEffect(() => {
    const calc = () => {
      const el = navRef?.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      setPanelTop(r.bottom + window.scrollY + 22);
    };
    calc();
    window.addEventListener("resize", calc);
    window.addEventListener("scroll", calc, { passive: true });
    return () => {
      window.removeEventListener("resize", calc);
      window.removeEventListener("scroll", calc);
    };
  }, [navRef]);

  // Close on URL change only (path/query/hash)
  const pathname = usePathname();
  const searchParams = useSearchParams();
  useEffect(() => {
    if (!isOpen) return;
    setOpenIndex(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, searchParams?.toString()]);
  useEffect(() => {
    if (!isOpen) return;
    const onHash = () => setOpenIndex(null);
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, [isOpen, setOpenIndex]);

  // Visible children for the active category; if no categories exist, show all
  const visibleChildren = useMemo(() => {
    if (!categories.length || !activeCategory) return children;
    return children.filter(c =>
      (c?.mainMenuFields?.categoryGrouping?.nodes ?? []).some(
        n => n.name === activeCategory
      )
    );
  }, [children, categories.length, activeCategory]);

  return (
    <li className="relative">
      {/* Trigger — toggle on pointerdown for reliability */}
      <a
        className="cursor-pointer text-neutral-softest text-lg transition inline-flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-300 rounded-md px-1"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-controls={`megamenu-${index}`}
        onPointerDown={() => {
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
      </a>

      {/* Full-width mega panel */}
      {isOpen && (
        <MegaMenuPortal top={panelTop}>
          <div
            id={`megamenu-${index}`}
            role="menu"
            aria-label={item.label ?? "Submenu"}
            className="w-screen bg-[#171717] backdrop-blur-md ring-1 ring-black/5 shadow-2xl z-[60]"
            // Stop events in BUBBLE phase so child clicks work, but page listeners don't see them
            onPointerDown={e => e.stopPropagation()}
            onClick={e => e.stopPropagation()}
            onMouseDown={e => e.stopPropagation()}
            onMouseUp={e => e.stopPropagation()}
          >
            <div className="mx-auto max-w-[1600px] px-6">
              <div className="grid grid-cols-12 gap-8">
                {/* Left: categories (hide if none) */}
                {categories.length > 0 && (
                  <div className="col-span-12 md:col-span-3">
                    <nav aria-label="Service categories" className="mt-6 mb-6">
                      <ul className="space-y-2">
                        {categories.map(name => (
                          <li key={name}>
                            <button
                              type="button"
                              className={`cursor-pointer w-full text-left rounded-lg px-3 py-4 transition ${
                                activeCategory === name
                                  ? "bg-white text-base"
                                  : "bg-transparent hover:bg-white text-white hover:text-base"
                              }`}
                              onClick={() => setActiveCategory(name)}
                            >
                              {name}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </nav>
                  </div>
                )}

                {/* Right: image tiles */}
                <div className={`gradient-border-left col-span-12 ${categories.length ? "md:col-span-9" : ""}`}>
                  <ul
                    className="flex gap-3 h-full sm:h-72 lg:h-full megamenu-navigation"
                  >
                    {visibleChildren.map((child, i) => {
                      const chref = buildHref(child);
                      const external = isExternal(chref);
                      const img = child?.mainMenuFields?.backgroundImage?.node?.mediaItemUrl;
                      const alt = child?.mainMenuFields?.backgroundImage?.node?.altText || child?.label || "Image";
                      const active = isActive(i);

                      return (
                        <li
                          key={child.id ?? chref}
                          className={[
                            "relative overflow-hidden shadow-sm h-full transition-all duration-600 max-w-[360px]",
                            // Expanded tile fills remaining space; others are slim slices
                            active
                              ? "flex-[1_1_0%]" // expands to use available width
                              : "flex-[0_0_5.5rem] sm:flex-[0_0_6.5rem] lg:flex-[0_0_7.5rem]" // collapsed width
                          ].join(" ")}
                          // Persist selection until another hover/focus occurs
                          onMouseEnter={() => setActiveIndex(i)}
                          onFocus={() => setActiveIndex(i)}
                        >
                          <Link
                            href={chref}
                            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                            className="block w-full h-full focus:outline-none"
                          >
                            {/* Image fits container: no min-w/min-h tricks, no scale */}
                            <div className="absolute inset-0">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              {img ? (
                                <img
                                  src={img}
                                  alt={alt}
                                  className={[
                                    "absolute inset-0 w-full h-full transition-[object-fit] duration-300",
                                    active ? "object-contain" : "object-cover"
                                  ].join(" ")}
                                  // Make sure it’s always centered
                                  style={{ objectPosition: "center center" }}
                                  loading="lazy"
                                  decoding="async"
                                />
                              ) : (
                                <div className="absolute inset-0 grid place-items-center text-neutral-400">
                                  <span className="text-sm">No image</span>
                                </div>
                              )}
                            </div>

                            <div
                              className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-[1]"
                              aria-hidden="true"
                            />

                            <div
                              className={[
                                "absolute bottom-4 left-2 right-2 text-center uppercase font-bold transition-all duration-300 z-[2]",
                                active ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                              ].join(" ")}
                            >
                              <span className="text-white drop-shadow">{child.label ?? "Item"}</span>
                            </div>

                            {/* Optional edge gradient hint for collapsed slices */}
                            {!active && (
                              <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-black/20 to-transparent" />
                            )}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </MegaMenuPortal>
      )}
    </li>
  );
}
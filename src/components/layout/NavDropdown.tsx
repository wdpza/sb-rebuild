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
  navRef: React.RefObject<HTMLElement | null>;
}) {
  const children = (item.children as ChildNode[]) ?? [];
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [panelTop, setPanelTop] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  /** --------------------------
   *  Categories
   * -------------------------- */
  const categories = useMemo(() => {
    const seen = new Map<string, number>();
    let i = 0;
    for (const child of children) {
      for (const c of child?.mainMenuFields?.categoryGrouping?.nodes ?? []) {
        if (!seen.has(c.name)) seen.set(c.name, i++);
      }
    }
    return Array.from(seen.keys()).sort((a, b) => seen.get(a)! - seen.get(b)!);
  }, [children]);

  useEffect(() => {
    if (isOpen) setActiveCategory(categories[0] ?? null);
  }, [isOpen, categories]);

  /** --------------------------
   *  Position under nav
   * -------------------------- */
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

  /** --------------------------
   *  Close on URL / hash / scroll
   * -------------------------- */
  useEffect(() => {
    if (!isOpen) return;
    setOpenIndex(null);
  }, [pathname, searchParams?.toString()]);

  useEffect(() => {
    if (!isOpen) return;
    const onHash = () => setOpenIndex(null);
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, [isOpen, setOpenIndex]);

  // ✅ Close on ANY scroll
  useEffect(() => {
    if (!isOpen) return;
    const onScroll = () => setOpenIndex(null);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isOpen, setOpenIndex]);

  /** --------------------------
   *  Animation states
   * -------------------------- */
  const [shouldRender, setShouldRender] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Mount hidden first
      setShouldRender(true);
      setIsVisible(false);
      // Animate in after mount
      const frame = requestAnimationFrame(() => {
        requestAnimationFrame(() => setIsVisible(true));
      });
      return () => cancelAnimationFrame(frame);
    } else {
      // Animate out, then unmount
      setIsVisible(false);
      const timeout = setTimeout(() => setShouldRender(false), 400);
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  /** --------------------------
   *  Filtered children
   * -------------------------- */
  const visibleChildren = useMemo(() => {
    if (!categories.length || !activeCategory) return children;
    return children.filter(c =>
      (c?.mainMenuFields?.categoryGrouping?.nodes ?? []).some(
        n => n.name === activeCategory
      )
    );
  }, [children, categories.length, activeCategory]);

  /** --------------------------
   *  Render
   * -------------------------- */
  return (
    <li className="relative">
      {/* Trigger */}
      <a
        className="cursor-pointer text-neutral-softest text-lg transition inline-flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-300 rounded-md px-1"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-controls={`megamenu-${index}`}
        onPointerDown={() => setOpenIndex(prev => (prev === index ? null : index))}
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

      {/* Animated Mega Menu */}
      {shouldRender && (
        <MegaMenuPortal top={panelTop}>
          <div
            id={`megamenu-${index}`}
            role="menu"
            aria-label={item.label ?? "Submenu"}
            className={`w-screen backdrop-blur-md ring-1 ring-black/5 z-[60] transform transition-all duration-500 ease-out origin-top ${
              isVisible
                ? "opacity-100 translate-y-0 scale-100"
                : "opacity-0 -translate-y-4 scale-95 pointer-events-none"
            }`}
            onPointerDown={e => e.stopPropagation()}
            onClick={e => e.stopPropagation()}
          >
            <div className="mx-auto max-w-[1600px] px-6 bg-[#171717] shadow-2xl">
              <div className="grid grid-cols-12 gap-8">
                {/* Left: categories */}
                {categories.length > 0 && (
                  <div className="col-span-12 md:col-span-3">
                    <nav aria-label="Service categories" className="mt-6 mb-6">
                      <ul className="space-y-2">
                        {categories.map(name => (
                          <li key={name}>
                            <button
                              type="button"
                              className={`w-full text-left rounded-lg px-3 py-4 transition ${
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
                <div
                  className={`gradient-border-left col-span-12 ${
                    categories.length ? "md:col-span-9" : ""
                  }`}
                >
                  <ul className="flex gap-3 h-full sm:h-72 lg:h-full megamenu-navigation">
                    {visibleChildren.map((child, i) => {
                      const chref = buildHref(child);
                      const external = isExternal(chref);
                      const img =
                        child?.mainMenuFields?.backgroundImage?.node?.mediaItemUrl;
                      const alt =
                        child?.mainMenuFields?.backgroundImage?.node?.altText ||
                        child?.label ||
                        "Image";
                      const active = i === activeIndex;

                      return (
                        <li
                          key={child.id ?? chref}
                          className={`relative overflow-hidden shadow-sm h-full transition-all duration-600 max-w-[360px]
                            ${active ? "flex-[1_1_0%]" : "flex-[0_0_6rem]"}`}
                          onMouseEnter={() => setActiveIndex(i)}
                          onFocus={() => setActiveIndex(i)}
                        >
                          <Link
                            href={chref}
                            {...(external
                              ? { target: "_blank", rel: "noopener noreferrer" }
                              : {})}
                            className="block w-full h-full focus:outline-none"
                          >
                            {img ? (
                              <img
                                src={img}
                                alt={alt}
                                className={`absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out ${
                                  active ? "scale-105" : "scale-100"
                                }`}
                                style={{ objectPosition: "center center" }}
                                loading="lazy"
                                decoding="async"
                              />
                            ) : (
                              <div className="absolute inset-0 grid place-items-center text-neutral-400">
                                <span className="text-sm">No image</span>
                              </div>
                            )}

                            <div
                              className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-[1]"
                              aria-hidden="true"
                            />
                            <div
                              className={`absolute bottom-4 left-2 right-2 text-center uppercase font-bold transition-all duration-300 z-[2] ${
                                active
                                  ? "opacity-100 translate-y-0"
                                  : "opacity-0 translate-y-2"
                              }`}
                            >
                              <span className="text-white drop-shadow">
                                {child.label ?? "Item"}
                              </span>
                            </div>
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
"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

import NavMenu from "./NavMenu";
import NavMenuMobile from "./NavMenuMobile";
import type { MenuItem, MenuNode } from "../../types/menuTypes";

type HeaderProps = {
  menu?: {
    menuItems?: {
      nodes?: MenuItem[] | null;
    } | null;
  } | null;
  logo?: {
    mediaItemUrl?: string;
    altText?: string | null;
    width?: number | null;
    height?: number | null;
  } | null;
};

export default function Header({ menu, logo }: HeaderProps) {
  const flatItems: MenuItem[] = useMemo(
    () => menu?.menuItems?.nodes ?? [],
    [menu]
  );

  // Build parent–child structure
  const tree: MenuNode[] = useMemo(() => {
    const byParent: Record<string, MenuItem[]> = {};

    for (const item of flatItems) {
      const parentKey = String(item.parentId ?? "");
      if (!byParent[parentKey]) byParent[parentKey] = [];
      byParent[parentKey].push(item);
    }

    // Sort each group by order
    Object.values(byParent).forEach(group =>
      group.sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    );

    // Root items are those with no parentId
    const roots = byParent[""] ?? [];

    return roots.map<MenuNode>(root => {
      const idKey = String(root.id ?? "");
      return {
        ...root,
        children: byParent[idKey] ?? [],
      };
    });
  }, [flatItems]);

  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const navRef = useRef<HTMLElement | null>(null);

  // Global event listeners for closing dropdowns
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenIndex(null);
    };

    const onClick = (e: MouseEvent) => {
      if (!navRef.current) return;
      if (!navRef.current.contains(e.target as Node)) {
        setOpenIndex(null);
      }
    };

    window.addEventListener("keydown", onKey);
    window.addEventListener("click", onClick);

    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("click", onClick);
    };
  }, []);

  if (!menu) return null;

  return (
    <header className="absolute top-0 left-0 right-0 z-50 py-4 lg:py-12">
      <div className="layout-wrapper bg-transparent">
        <div className="flex items-center justify-between">
          {logo?.mediaItemUrl && (
            <div className="flex items-start justify-start">
              <Link href="/home">
                <Image
                  src={logo.mediaItemUrl}
                  alt={logo.altText || "Company Logo"}
                  className="h-10 w-auto object-contain"
                  width={logo.width ?? 206}
                  height={logo.height ?? 82}
                  priority
                />
              </Link>
            </div>
          )}

          <NavMenu
            tree={tree}
            navRef={navRef}
            openIndex={openIndex}
            setOpenIndex={setOpenIndex}
          />

          <NavMenuMobile tree={tree} flatItems={flatItems} />
        </div>
      </div>
    </header>
  );
}

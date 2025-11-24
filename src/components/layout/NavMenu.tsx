"use client";

import Link from "next/link";
import {
  Suspense,
  type RefObject,
  type Dispatch,
  type SetStateAction,
} from "react";
import type { MenuNode } from "../../types/menuTypes";
import NavDropdown from "./NavDropdown";

export type NavMenuProps = {
  tree: MenuNode[];
  navRef: RefObject<HTMLElement | null>;
  openIndex: number | null;
  setOpenIndex: Dispatch<SetStateAction<number | null>>;
};

export default function NavMenu({
  tree,
  navRef,
  openIndex,
  setOpenIndex,
}: NavMenuProps) {
  const buildHref = (item: MenuNode): string => {
    if (item?.connectedObject?.slug) return `/${item.connectedObject.slug}`;
    if (item?.uri) return item.uri;
    return item?.url ?? "#";
  };

  const isExternal = (u: string): boolean => {
    if (!u) return false;

    const isHttp = /^https?:\/\//i.test(u);
    if (!isHttp) return false;

    // On the server we default to treating it as external
    if (typeof window === "undefined") return true;

    return !u.startsWith(window.location.origin);
  };

  return (
    <nav ref={navRef} aria-label="Main" className="ml-auto">
      <ul className="hidden md:flex gap-6 relative">
        {(tree ?? []).map((item, index) => {
          const href = buildHref(item);
          const hasChildren =
            Array.isArray(item.children) && item.children.length > 0;

          // Normal link
          if (!hasChildren || href !== "#") {
            const external = isExternal(href);

            return (
              <li key={item.id ?? index} className="relative">
                <Link
                  href={href}
                  className="hover:underline text-neutral-softest text-xl transition font-extralight"
                  scroll
                  {...(external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  {item.label ?? "Item"}
                </Link>
              </li>
            );
          }

          // Dropdown
          return (
            <Suspense key={item.id ?? index} fallback={null}>
              <NavDropdown
                item={item}
                index={index}
                isOpen={openIndex === index}
                setOpenIndex={setOpenIndex}
              />
            </Suspense>
          );
        })}
      </ul>
    </nav>
  );
}

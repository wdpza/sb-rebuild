"use client";

import Link from "next/link";
import { MenuNode } from "./Header";
import NavDropdown from "./NavDropdown"

export default function NavMenu({
  tree,
  navRef,
  openIndex,
  setOpenIndex,
}: {
  tree: MenuNode[];
  navRef: React.RefObject<HTMLElement | null>;
  openIndex: number | null;
  setOpenIndex: React.Dispatch<React.SetStateAction<number | null>>;
}) {
  const buildHref = (item: any) => {
    if (item?.connectedObject?.slug) return `/${item.connectedObject.slug}`;
    if (item?.uri) return item.uri;
    return item?.url || "#";
  };

  const isExternal = (u: string) =>
    /^https?:\/\//i.test(u) &&
    !u.startsWith(
      typeof window !== "undefined" ? window.location.origin : ""
    );

  return (
    <nav ref={navRef} aria-label="Main">
      <ul className="flex gap-6">
        {tree.map((item, index) => {
          const href = buildHref(item);
          const hasChildren =
            Array.isArray(item.children) && item.children.length > 0;

          if (!hasChildren || href !== "#") {
            const external = isExternal(href);
            return (
              <li key={item.id ?? index} className="relative">
                <Link
                  href={href}
                  className="hover:underline text-neutral-softest text-lg transition"
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

          return (
            <NavDropdown
              key={item.id ?? index}
              item={item}
              index={index}
              isOpen={openIndex === index}
              setOpenIndex={setOpenIndex}
              buildHref={buildHref}
              isExternal={isExternal}
            />
          );
        })}
      </ul>
    </nav>
  );
}

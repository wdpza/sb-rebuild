"use client";

import Link from "next/link";
import { MenuNode } from "./Header";

export default function NavDropdown({
  item,
  index,
  isOpen,
  setOpenIndex,
  buildHref,
  isExternal,
}: {
  item: MenuNode;
  index: number;
  isOpen: boolean;
  setOpenIndex: React.Dispatch<React.SetStateAction<number | null>>;
  buildHref: (item: any) => string;
  isExternal: (url: string) => boolean;
}) {
  return (
    <li
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
        onClick={e => {
          e.stopPropagation();
          setOpenIndex(prev => (prev === index ? null : index));
        }}
      >
        {item.label ?? "Menu"}
        <svg
          viewBox="0 0 20 20"
          fill="currentColor"
          className={`h-4 w-4 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          aria-hidden="true"
        >
          <path d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" />
        </svg>
      </button>

      <div
        id={`submenu-${index}`}
        role="menu"
        aria-label={item.label ?? "Submenu"}
        className={`absolute left-0 min-w-56 rounded-2xl shadow-xl ring-1 ring-black/5 bg-white/95 backdrop-blur-md p-2
          ${
            isOpen
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 -translate-y-1 pointer-events-none"
          }
          transition-all duration-150 ease-out`}
      >
        <ul className="flex flex-col gap-1">
          {item.children.map((child, cidx) => {
            const chref = buildHref(child);
            const external = isExternal(chref);
            return (
              <li key={child.id ?? `child-${index}-${cidx}`}>
                <Link
                  href={chref}
                  className="block rounded-xl px-3 py-2 text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900 text-base"
                  role="menuitem"
                  {...(external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
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
}

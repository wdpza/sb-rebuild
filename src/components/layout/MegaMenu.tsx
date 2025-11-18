"use client";

import { useEffect } from "react";
import Link from "next/link";
import type { MenuNode, MegaMenuChild } from "../../types/menuTypes";

type MegaMenuProps = {
  item: MenuNode;
  onClose?: () => void;
};

type Column = {
  name: string;
  items: MegaMenuChild[];
};

export default function MegaMenu({ item, onClose }: MegaMenuProps) {
  const children = (item.children ?? []) as MegaMenuChild[];

  // Always call hooks, guard inside the effect instead
  useEffect(() => {
    if (!onClose) return;

    const handleScroll = () => {
      onClose();
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [onClose]);

  if (children.length === 0) return null;

  const columns: Record<number, Column> = {};

  children.forEach(child => {
    const groups = child.mainMenuFields?.categoryGrouping?.nodes ?? [];

    groups.forEach(group => {
      const id = group.databaseId;

      if (!columns[id]) {
        columns[id] = {
          name: group.name,
          items: [],
        };
      }

      columns[id].items.push(child);
    });
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl">
      {Object.values(columns).map(col => (
        <div key={col.name} className="flex flex-col space-y-4">
          <h3 className="text-gradient-starbright text-lg font-bold text-neutral-soft">
            {col.name}
          </h3>

          <ul className="space-y-2">
            {col.items.map(link => (
              <li key={String(link.id ?? link.label ?? col.name)}>
                <Link
                  href={link.uri ?? link.url ?? "#"}
                  onClick={onClose}
                  className="text-neutral-softer text-sm hover:text-accent-soft transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

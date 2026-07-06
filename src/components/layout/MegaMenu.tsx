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
    <div className="flex flex-wrap gap-8 max-w-8xl">
      {Object.values(columns).map((col, index) => (
        <div key={col.name} className="flex flex-col space-y-4 px-5">
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

          {/*
          {index < Object.values(columns).length - 1 && (
            <div className="mx-8 hidden md:block absolute right-0 top-0 bottom-0 w-px bg-neutral-soft/10" />
          )}
            */}
        </div>
      ))}
    </div>
  );
}

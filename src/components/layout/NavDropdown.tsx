"use client";

import type { Dispatch, SetStateAction } from "react";
import { AnimatePresence, motion } from "framer-motion";
import MegaMenu from "./MegaMenu";
import type { MenuNode } from "../../types/menuTypes";

type NavDropdownProps = {
  item: MenuNode;
  index: number;
  isOpen: boolean;
  setOpenIndex: Dispatch<SetStateAction<number | null>>;
};

export default function NavDropdown({
  item,
  index,
  isOpen,
  setOpenIndex,
}: NavDropdownProps) {
  return (
    <li>
      {/* Trigger */}
      <button
        type="button"
        className="cursor-pointer text-neutral-softest text-xl transition inline-flex items-center gap-2 px-1 font-light"
        onClick={() =>
          setOpenIndex(prev => (prev === index ? null : index))
        }
        aria-haspopup="true"
        aria-expanded={isOpen}
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

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mega-menu"
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.98 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute right-0 mt-4 z-50 bg-[#171717] p-10 shadow-xl rounded-xl w-4xl"
          >
            <MegaMenu
              item={item}
              onClose={() => setOpenIndex(null)} // close menu after click / scroll
            />
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}

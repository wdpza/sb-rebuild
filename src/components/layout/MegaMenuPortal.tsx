"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function MegaMenuPortal({
  children,
  top,
}: {
  children: React.ReactNode;
  top: number; // absolute page Y for the panel top
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return createPortal(
    <div
      className="fixed left-0 right-0 z-[60]"
      style={{ top }}
      aria-live="polite"
    >
      {children}
    </div>,
    document.body
  );
}

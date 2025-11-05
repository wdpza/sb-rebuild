"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function ScrollToTopOnEnter() {
  const pathname = usePathname();
  const prevPathRef = useRef<string | null>(null);

  useEffect(() => {
    const prevPath = prevPathRef.current;
    const isEnteringPortfolio =
      pathname.startsWith("/portfolio") &&
      (prevPath === null || !prevPath.startsWith("/portfolio"));

    if (isEnteringPortfolio) {
      window.scrollTo({ top: 0, behavior: "instant" });
    }

    prevPathRef.current = pathname;
  }, [pathname]);

  return null;
}

"use client";

import { useLayoutEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function ScrollToTopOnEnter({ pathPrefix = "/portfolio" }: { pathPrefix?: string }) {
  const pathname = usePathname();
  const prevPathRef = useRef<string | null>(null);

  useLayoutEffect(() => {
    const prevPath = prevPathRef.current;
    const isEnteringSection =
      pathname.startsWith(pathPrefix) &&
      (prevPath === null || !prevPath.startsWith(pathPrefix));

    if (isEnteringSection) {
      window.scrollTo({ top: 0, behavior: "instant" });
    }

    prevPathRef.current = pathname;
  }, [pathname, pathPrefix]);

  return null;
}

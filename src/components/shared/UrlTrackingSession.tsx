"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { captureUrlTrackingOnce } from "@/lib/utils/urltracking";

export default function UrlTrackingSession() {
  const searchParams = useSearchParams();

  useEffect(() => {
    captureUrlTrackingOnce(searchParams);
  }, [searchParams]);

  return null;
}

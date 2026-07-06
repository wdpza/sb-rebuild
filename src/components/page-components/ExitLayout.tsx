'use client'

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ANIMATION_PRESETS } from "@/lib/constants/animations";
import type { ExitLayoutProps } from "@/types/common";

export default function ExitLayout({ title, backgroundImage, ctaLink, backgroundOverlay }: ExitLayoutProps) {
  const bgUrl = backgroundImage?.node?.mediaItemUrl ?? null;

  const cleanUrl = ctaLink?.url
    ? ctaLink.url.replace(/^https?:\/\/[^/]+/, "")
    : null;

  return (
    <div className="relative py-24">
      {/* Optimized background image using Next.js Image */}
      {bgUrl && (
        <Image
          src={bgUrl}
          alt="Background"
          fill
          className="object-cover object-center"
          quality={90}
          sizes="100vw"
        />
      )}
      {backgroundOverlay && (
        <>
          <div className="absolute backdrop-grayscale w-full h-full left-0 top-0"></div>
          <div className="absolute inset-0 bg-[#28262C]/80"></div>
        </>
      )}
      <div className="relative z-10 layout-wrapper flex flex-col items-center justify-center text-center text-neutral-softest">
        <motion.h2
          className="exit-title uppercase font-bold mb-8 text-balance"
          {...ANIMATION_PRESETS.fadeInUp}
          viewport={{ once: false, amount: 0.2 }}
        >
          {title ?? null}
        </motion.h2>
        {cleanUrl && (
          <Link
            href={cleanUrl}
            target={ctaLink?.target ?? "_self"}
            className="inline-flex items-center justify-center rounded-md px-8 py-3 font-semibold text-neutral-softest gradient-border mt-4"
          >
            {ctaLink?.title ?? "Learn More"}
          </Link>
        )}
      </div>
    </div>
  );
}

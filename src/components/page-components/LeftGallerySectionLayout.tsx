"use client";

import { useMemo, useState } from "react";
import Slider, { Settings } from "react-slick";
import Image from "next/image";
import DOMPurify from "isomorphic-dompurify";

type GalleryImage = {
  id?: string | number;
  mediaItemUrl?: string | null;
  altText?: string | null;
};

type Gallery = {
  nodes?: GalleryImage[] | null;
  edges?: { node: GalleryImage }[] | null;
};

type MediaNode = {
  mediaItemUrl?: string | null;
  altText?: string | null;
};

interface LeftGallerySectionLayoutProps {
  title?: string | null;
  description?: string | null;
  gallery?: Gallery | null;
  backgroundImage?: { node?: MediaNode | null } | null;
}

export default function LeftGallerySectionLayout({
  description,
  gallery,
  title,
  backgroundImage,
}: LeftGallerySectionLayoutProps) {
  // Normalize images from nodes or edges
  const images: GalleryImage[] = useMemo(() => {
    if (gallery?.nodes) return gallery.nodes;
    if (gallery?.edges) return gallery.edges.map((e) => e.node);
    return [];
  }, [gallery]);

  const [current, setCurrent] = useState(0);
  const visibleCount = 3;

  const bgUrl = backgroundImage?.node?.mediaItemUrl ?? "";

  // Compute each slide's position within the current window
  const windowPlacement = useMemo(() => {
    const n = images.length || 1;
    const maxVisible = Math.min(visibleCount, n);
    return images.map((_, i) => {
      const orderWithinWindow = ((i - current + n) % n);
      const isVisible = orderWithinWindow < maxVisible;
      return { isVisible, orderWithinWindow: isVisible ? orderWithinWindow : -1 };
    });
  }, [images, current]);

  // Slick settings (typed)
  const settings: Settings = {
    infinite: images.length > visibleCount,
    slidesToShow: Math.min(visibleCount, images.length || 1),
    slidesToScroll: 1,
    speed: 400,
    arrows: false,
    dots: false,
    swipe: true,
    autoplay: true,
    autoplaySpeed: 5000,
    beforeChange: (_old: number, next: number) => setCurrent(next),
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: Math.min(2, images.length || 1) } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <section 
        className="py-20 bg-[#171717] px-8 bg-cover bg-bottom bg-no-repeat"
        style={{
            backgroundImage: bgUrl ? `url(${bgUrl})` : undefined,
        }}
    >
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-[1600px] mx-auto">
      {/* Left: gallery */}
      <div className="-ml-8">
        <Slider {...settings} className="!overflow-visible">
            {images.map((img, i) => {
                const place = windowPlacement[i];
                const isInWindow = place.isVisible;
                const order = place.orderWithinWindow; // 0 = left, 1 = middle, 2 = right
                const maxIndex = Math.min(visibleCount, images.length) - 1;
                const isFocused = isInWindow && order === maxIndex;

                // Overlap amount in px (adjust to taste)
                // Smaller on mobile, larger on desktop
                const overlapPx = order > 0 ? 48 : 0;          // base overlap (px)
                const overlapPxLg = order > 0 ? 96 : 0;        // lg screens

                // Scale map: left < middle < right
                const scale =
                order === 0 ? 0.7 :
                order === 1 ? 0.9 :
                order === 2 ? 1.3 : 1.0;

                const zIndex = isInWindow ? 10 + order : 0;

                return (
                <div key={String(img.id ?? i)} className="pr-6">
                    <div
                    className="relative w-full"
                    style={{
                        // overlap to the left for middle/right
                        marginLeft: `-${overlapPx}px`,
                    }}
                    >
                    <div
                        className={`relative w-full aspect-[4/3] rounded-xl overflow-hidden transition
                        ${isFocused ? "" : "grayscale"}
                        `}
                        style={{
                        zIndex,
                        transform: `scale(${scale})`,
                        transition: "transform 200ms ease, filter 200ms ease",
                        }}
                    >
                        {img.mediaItemUrl ? (
                        <Image
                            src={img.mediaItemUrl}
                            alt={img.altText ?? ""}
                            fill
                            sizes="(min-width:1024px) 40vw, 90vw"
                            className="object-cover"
                            priority={false}
                        />
                        ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-white/60 text-sm bg-black/20">
                            No image
                        </div>
                        )}
                        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/30 to-transparent" />
                    </div>
                    </div>

                    {/* Responsive overlap bump for lg screens */}
                    <style jsx>{`
                    @media (min-width: 1024px) {
                        div[style*="margin-left"] {
                        margin-left: -${overlapPxLg}px !important;
                        }
                    }
                    `}</style>
                </div>
                );
            })}
        </Slider>

        <style>{`
            .stacking-slick .slick-list { overflow: visible; }
            .stacking-slick .slick-track { display: flex; }
            .stacking-slick .slick-slide > div { height: 100%; }
            .slick-list { padding-block: calc(var(--spacing) * 16); }
        `}</style>
      </div>

      {/* Right: title + content */}
      <RightText title={title} description={description} />
      </div>
    </section>
  );
}

// Split out for clarity and reuse
function RightText({
  title,
  description,
}: {
  title?: string | null;
  description?: string | null;
}) {
  return (
    <div>
      {title ? (
        <h2 className="text-[40px] font-bold">
          <span className="bg-gradient-to-r from-[#6EE7F9] via-[#A855F7] to-[#F59E0B] bg-clip-text text-transparent">
            {title}
          </span>
        </h2>
      ) : null}
      <div
        className="mt-6 text-lg text-white prose prose-invert max-w-none right-text-section"
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(description ?? ""),
        }}
      />
      <style jsx>{`
        .right-text-section :global(h3) {
          font-weight: 700;
          margin-top: 1rem;
          margin-bottom: 1rem;
          background: linear-gradient(90deg, #6ee7f9, #a855f7, #f59e0b);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        .right-text-section :global(p) {
          margin-top: 1rem;
          margin-bottom: 1rem;
        }
      `}</style>
    </div>
  );
}
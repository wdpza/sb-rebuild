"use client";
import * as React from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import type { Settings } from "react-slick";

// Load Slick only on the client to avoid SSR "window is not defined" issues
const Slider = dynamic(() => import("react-slick"), { ssr: false });

// Be sure to import slick styles once globally (e.g., in app/layout.tsx or globals.css):
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

type EmployeePhoto = {
  mediaItemUrl: string;
  altText?: string | null;
  title?: string | null;
};

type Props = {
  title: string;
  description?: string;
  employeePhotos: { nodes: EmployeePhoto[] };
  /** number of visible cards; must be odd; default 5 */
  visible?: 5 | 7 | 9;
};

export default function EmployeeCarouselLayout({
  description,
  employeePhotos,
  title,
  visible = 5,
}: Props) {
  const images = employeePhotos?.nodes ?? [];
  if (!images.length) return null;

  // visible must be odd, min 3, and cannot exceed images length
  const slots = Math.min(Math.max(3, visible | 1), images.length);
  const [active, setActive] = React.useState(0);
  const total = images.length;

  // Circular distance so the scaling/greyscale works with infinite wrap
    const circDist = (a: number, b: number, total: number) => {
    const diff = Math.abs(a - b);
    return Math.min(diff, total - diff);
    };

    const getStackedStyles = (index: number, active: number, total: number) => {
    const d = circDist(index, active, total); // distance from center
    const isCenter = d === 0;

    // visual tuning
    const scale = Math.max(0.64, 1 - d * 0.12);     // 1, .88, .76…
    const drop = d * 28;                             // push non-center downward
    const opacity = Math.max(0.45, 1 - d * 0.15);   // fade further slides
    const z = 100 - d;                               // center on top

    return {
        style: {
        transform: `translateY(${drop}px) scale(${scale})`,
        opacity,
        filter: isCenter ? "none" : "grayscale(100%)",
        zIndex: z,
        transition: "transform 220ms ease, opacity 220ms ease, filter 220ms ease",
        } as React.CSSProperties,
        isCenter,
    };
    };

    const settings: Settings = {
        slidesToShow: 5,          // 5 visible on desktop
        centerMode: true,
        centerPadding: "0px",
        infinite: true,
        swipeToSlide: true,
        cssEase: "ease",
        speed: 350,
        arrows: false,
        dots: false,
        focusOnSelect: true,
        beforeChange: (_current, next) => setActive(next % images.length),
        afterChange: (current) => setActive(current % images.length),
        responsive: [
            { breakpoint: 1280, settings: { slidesToShow: 5 } },
            { breakpoint: 1024, settings: { slidesToShow: 5 } },
            { breakpoint: 768, settings: { slidesToShow: 3 } },
            { breakpoint: 640, settings: { slidesToShow: 1 } },
        ],
    };

  return (
    <section className="py-20 bg-[#171717] px-8 text-center">
      <h2 className="text-[40px] font-bold text-white">
        <span className="bg-gradient-to-r from-[#6EE7F9] via-[#A855F7] to-[#F59E0B] bg-clip-text text-transparent">
          {title}
        </span>
      </h2>
      {description ? (
        <p className="text-white/90 mt-8 max-w-3xl mx-auto">{description}</p>
      ) : null}

        <div className="relative flex-1 flex items-center justify-center overflow-visible">
            <div className="w-full max-w-[1600px] mx-auto overflow-visible stacked-slick">
            <Slider {...settings}>
                {images.map((item, index) => {
                const { style, isCenter } = getStackedStyles(index, active, images.length);

                return (
                    <div key={index}>
                    {/* negative/overlap handled via CSS class 'stacked-slick' below */}
                    <div
                        className="mx-auto flex flex-col items-center justify-center"
                        style={style}
                        onClick={() => setActive(index)}
                    >
                        <div className="rounded-3xl border border-white/10 bg-white/10 p-2 shadow-2xl backdrop-blur">
                        {/* Fixed-size RELATIVE wrapper so next/image fill works and cards are uniform */}
                        <div className="relative h-[500px] w-[400px] overflow-hidden rounded-2xl ring-1 ring-white/10">
                            <Image
                            src={item.mediaItemUrl}
                            alt={item.altText || item.title || `Employee ${index + 1}`}
                            fill
                            className="object-cover"
                            sizes="(max-width: 640px) 90vw, (max-width: 1024px) 60vw, 400px"
                            priority={isCenter}
                            />
                        </div>

                        {isCenter ? (
                            <figcaption className="mt-3 text-sm font-medium text-white/95">
                            {item.title || item.altText || ""}
                            </figcaption>
                        ) : null}
                        </div>
                    </div>
                    </div>
                );
                })}
            </Slider>
            </div>
        </div>
        <style jsx global>{`
        /* Let the stage show overflow so side slides can peek out */
        .stacked-slick .slick-list {
            overflow: visible;
        }

        /* Overlap slides by giving them negative horizontal margin.
            Tune -140px to increase/decrease overlap depending on your card width. */
        .stacked-slick .slick-slide > div {
            margin: 0 -140px;
        }

        /* Optional: improve click targeting so only visible/nearby slides catch clicks */
        .stacked-slick .slick-slide {
            pointer-events: none;
        }
        .stacked-slick .slick-slide.slick-active {
            pointer-events: auto;
        }
        `}</style>
    </section>
  );
}

function CardLike({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <figure className="relative">
      <div>
        <div className="rounded-2xl">{children}</div>
      </div>
      <div className="pointer-events-none absolute inset-0" />
    </figure>
  );
}

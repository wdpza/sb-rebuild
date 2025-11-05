"use client";
import * as React from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import type { Settings } from "react-slick";

// Load Slick only on the client to avoid SSR "window is not defined" issues
const Slider = dynamic(() => import("react-slick"), { ssr: false });

type MediaNode = {
  mediaItemUrl?: string | null;
  altText?: string | null;
};

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
  backgroundImage?: { node?: MediaNode | null } | null;
};

export default function EmployeeCarouselLayout({
  description,
  employeePhotos,
  title,
  visible = 5,
  backgroundImage
}: Props) {
  // Hooks must be declared before any early returns
  const [active, setActive] = React.useState(0);

  const bgUrl = backgroundImage?.node?.mediaItemUrl ?? "";

  const images = employeePhotos?.nodes ?? [];
  if (!images.length) return null;

  // visible must be odd, min 3, and cannot exceed images length
  const slots = Math.min(Math.max(3, visible | 1), images.length);

  // Circular distance so the scaling/greyscale works with infinite wrap
  const circDist = (a: number, b: number, total: number) => {
    const diff = Math.abs(a - b);
    return Math.min(diff, total - diff);
  };

    const CARD_H = 600;
    const CAPTION_H = 26;
    const STAGE_H = CARD_H + CAPTION_H + 16;

    const getStackedStyles = (index: number, activeIndex: number, total: number) => {
        const d = circDist(index, activeIndex, total);
        const isCenter = d === 0;

        // visual tuning
        const scale = Math.max(0.64, 1 - d * 0.12);   // 1, .88, .76…
        const opacity = Math.max(0.45, 1 - d * 0.15);
        const z = 100 - d;

        return {
            style: {
            transform: `scale(${scale})`,
            opacity,
            filter: isCenter ? "none" : "grayscale(100%)",
            zIndex: z,
            transition: "transform 220ms ease, opacity 220ms ease, filter 220ms ease",
            willChange: "transform, opacity, filter",
            } as React.CSSProperties,
            isCenter,
        };
    };

  const settings: Settings = {
    slidesToShow: slots,         // use computed slots
    centerMode: true,
    centerPadding: "0px",
    infinite: true,
    swipeToSlide: false,
    swipe: false,
    draggable: false,
    cssEase: "ease",
    speed: 350,
    arrows: false,
    dots: false,
    focusOnSelect: true,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: false,
    pauseOnFocus: false, 
    beforeChange: (_current, next) => setActive(next % images.length),
    afterChange: (current) => setActive(current % images.length),
    responsive: [
      // keep desktop using slots, then step down
      { breakpoint: 1280, settings: { slidesToShow: Math.min(slots, 5) } },
      { breakpoint: 1024, settings: { slidesToShow: Math.min(slots, 5) } },
      { breakpoint: 768, settings: { slidesToShow: Math.min(slots, 3) } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <section 
      className="py-20 bg-[#171717] px-8 text-center"
      style={{
          backgroundImage: bgUrl ? `url(${bgUrl})` : undefined,
          backgroundSize: "auto 100%",
          backgroundPosition: "bottom right",
      }}
    >
      <h2 className="text-[60px] font-bold text-white">
        <span className="text-gradient-starbright bg-clip-text text-transparent">
          {title}
        </span>
      </h2>
      {description ? (
        <p className="text-white/90 mt-8 max-w-3xl mx-auto whitespace-pre-line">{description}</p>
      ) : null}

      <div className="relative flex-1 flex items-center justify-center overflow-visible mt-12 -mx-8">
        <div className="w-full mx-auto overflow-visible stacked-slick">
          <Slider {...settings}>
            {images.map((item, index) => {
              const { style, isCenter } = getStackedStyles(index, active, images.length);
              return (
                <div key={index}>
                  {/* negative/overlap handled via CSS class 'stacked-slick' below */}
                <div
                    className="mx-auto"
                    style={{
                        height: STAGE_H,
                        display: "grid",
                        placeItems: "center",
                    }}
                >
                  <div
                    className="mx-auto flex flex-col items-center justify-center"
                    style={style}
                    onClick={() => setActive(index)}
                  >
                    <div className="rounded-3xl">
                      {/* Fixed-size RELATIVE wrapper so next/image fill works and cards are uniform */}
                      <div className="relative h-[600px] w-[500px] overflow-hidden rounded-2xl ring-1 ring-white/10">
                        <Image
                          src={item.mediaItemUrl}
                          alt={item.altText || item.title || `Employee ${index + 1}`}
                          fill
                          className="object-cover gradient-border"
                          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 60vw, 400px"
                          priority={isCenter}
                        />
                      </div>
                    </div>
                  </div>
                  </div>
                </div>
              );
            })}
          </Slider>
        </div>
      </div>

      <style jsx global>{`
        .stacked-slick .slick-list {
          overflow: hidden;
        }

        .stacked-slick .slick-slide > div {
            display: flex;
            justify-content: center;
            align-items: center; /* vertical centering */
            margin: 0 -140px;
        }

        .stacked-slick .slick-slide {
          pointer-events: none;
        }
        .stacked-slick .slick-slide.slick-active {
          pointer-events: auto;
        }
        .stacked-slick .slick-slide.slick-current {
            z-index: 999 !important;
            position: relative;
        }
      `}</style>
    </section>
  );
}
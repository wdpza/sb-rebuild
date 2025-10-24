"use client";

import Slider from "react-slick";
import { useMemo } from "react";

type Item = {
  title: string;
  description: string;
};

function ArrowBase({
  onClick,
  side,
}: {
  onClick?: () => void;
  side: "left" | "right";
}) {

const isLeft = side === "left";
const label = isLeft ? "Previous" : "Next";
const iconSrc = isLeft
  ? "/slider-navigation-right.svg"
  : "/slider-navigation-left.svg";

  return (
    <button
      aria-label={side === "left" ? "Previous" : "Next"}
      onClick={onClick}
      className={`absolute top-1/2 -translate-y-1/2 z-20 cursor-pointer w-18 h-18 flex items-center justify-center cursor-pointer gradient-border rounded-full ${
        side === "left" ? "hidden" : "right-3"
      }`}
    >
      <img src={iconSrc} alt={label} />
    </button>
  );
}

function PrevArrow(props: any) {
  const { onClick } = props;
  return <ArrowBase onClick={onClick} side="left" />;
}

function NextArrow(props: any) {
  const { onClick } = props;
  return <ArrowBase onClick={onClick} side="right" />;
}

export default function ServiceAccordion({ introTitle, item }: any) {

    const settings = useMemo(
        () => ({
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: true,
        prevArrow: <PrevArrow />,
        nextArrow: <NextArrow />,
        responsive: [
            { breakpoint: 1280, settings: { slidesToShow: 3 } },
            { breakpoint: 1024, settings: { slidesToShow: 2 } },
            { breakpoint: 640, settings: { slidesToShow: 1 } },
        ],
        }),
        []
    );

	return (
		<section className="relative py-12 flex w-full items-center bg-[#28262C] overflow-hidden">
            <div className="max-w-[1600px] mx-auto w-full">
                <h2 className="text-[45px] font-bold mb-8 text-white text-center">{introTitle}</h2>
                <div className="relative rounded-2xl p-6">
                    <div className="absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-[#28262C] to-transparent z-10" />
                    <Slider {...settings}>
                    {item.map((item: Item, idx: number) => (
                        <div key={idx} className="px-3">
                        <div className="rounded group relative h-70 bg-[#38363C] overflow-hidden">
                          <div className="gradient-border-left h-70 relative">
                            {/* Title */}
                            <div className="absolute inset-x-0 bottom-0 top-0 px-12 bg-[#38363C]">
                            <h3 className="text-[30px] text-white text-lg font-semibold h-full w-full flex items-center justify-center">
                                {item.title}
                            </h3>
                            </div>

                            {/* Hover overlay with description */}
                            <div className="absolute inset-0 bg-[#38363C] opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            <div className="h-full w-full flex items-center justify-center px-12">
                                <p className="text-white text-sm leading-relaxed text-center">
                                {item.description}
                                </p>
                            </div>
                            </div>
                          </div>
                        </div>
                        </div>
                    ))}
                    </Slider>
                </div>		
            </div>
		</section>
	)
}

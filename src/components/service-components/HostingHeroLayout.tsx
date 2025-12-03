"use client";

import DOMPurify from 'isomorphic-dompurify';
import Link from "next/link";
import Image from "next/image";
import WhoisLayout from "./WhoisLayout"
import Slider from "react-slick";
import { useMemo, useEffect, useState } from "react";

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
      <Image src={iconSrc} alt={label} width={24} height={24} />
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

type Item = {
  title: string;
  description: string;
};

export default function HostingHeroLayout({ hostingPageHero, hostingPageServices }: any) {

    console.log(hostingPageHero);
    console.log(hostingPageServices);

	const bgUrl = hostingPageHero.background?.node?.mediaItemUrl ?? null
	const imageUrl = hostingPageHero.image?.node?.mediaItemUrl ?? null

    const cleanUrl = hostingPageHero.ctaLink?.url
        ? hostingPageHero.ctaLink.url.replace(/^https?:\/\/[^/]+/, "")
        : null;

        const [slidesToShowCurrent, setSlidesToShowCurrent] = useState(3);

        useEffect(() => {
        const updateSlidesToShow = () => {
            const width = window.innerWidth;
            let value = 3;
            if (width < 640) {
            value = 1;
            } else if (width < 1024) {
            value = 2;
            } else {
            value = 3;
            }
            setSlidesToShowCurrent(value);
        };

        updateSlidesToShow();
        window.addEventListener("resize", updateSlidesToShow);
        return () => window.removeEventListener("resize", updateSlidesToShow);
        }, []);

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

    const itemsCount = Array.isArray(hostingPageServices.item) ? hostingPageServices.item.length : 0;
    const isCarouselScrollable = itemsCount > slidesToShowCurrent;
    const showRightGradient = isCarouselScrollable && slidesToShowCurrent > 1 && itemsCount > 0;

	return (
		<section
			className="relative flex min-h-screen w-full items-center bg-cover bg-bottom bg-no-repeat overflow-hidden"
			style={{
				backgroundImage: bgUrl ? `url(${bgUrl})` : undefined,
			}}
		>
			<div className="relative z-10 grid w-full max-w-[1600px] mx-auto grid-cols-1 md:grid-cols-24 gap-2 px-12 py-24 pt-60">
				<div className="col-span-24 flex flex-col justify-center text-center gap-4">
					<h1 className="font-archivo uppercase hero-title font-black drop-shadow-lg text-gradient-starbright">
						{hostingPageHero.title}
					</h1>

					{hostingPageHero.subTitle && (
						<h2 className="leading-snug font-bold mt-4 hero-subtitle text-neutral-softest drop-shadow-md tracking-wide">
							{hostingPageHero.subTitle}
						</h2>
					)}

					{hostingPageHero.description && (
						<div
							className="mt-6 text-lg text-gray-100"
							dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(hostingPageHero.description) }}
						/>
					)}

					{hostingPageHero.ctaLink && (
						<div className="mt-8">
							<Link
								href={cleanUrl}
								className="
									bg-neutral-strongest
									gradient-border
									inline-block px-8 py-3 
									text-neutral-softest font-semibold uppercase 
									rounded-lg shadow-md 
									transition-all duration-300 
									hover:bg-gradient-starbright
								"
							>
								{hostingPageHero.ctaLink.title}
							</Link>
						</div>
					)}

                    <WhoisLayout />

                    <div className="relative rounded-2xl mt-16">
                        {showRightGradient && (
                        <div className="absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-[#28262C] to-transparent z-10" />
                        )}
                        <Slider {...settings}>
                        {hostingPageServices.item.map((item: Item, idx: number) => (
                            <div key={idx} className="px-3">
                            <div className="rounded group relative h-70 bg-[#38363C] overflow-hidden">
                            <div className="h-70 relative">
                                {/* Title */}
                                <div className="absolute inset-x-0 bottom-0 top-0 px-12 bg-[#38363C]">
                                <h3 className="text-[30px] text-neutral-softest text-lg font-semibold h-full w-full flex items-center justify-center text-center">
                                    {item.title}
                                </h3>
                                </div>

                                {/* Hover overlay with description */}
                                <div className="absolute inset-0 bg-[#38363C] opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                <div className="h-full w-full flex items-center justify-center px-12">
                                    <p className="text-neutral-softest text-sm md:text-base leading-relaxed text-center">
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

				{imageUrl && (
					<div className="col-span-11 flex justify-center items-center">
						<Image
							src={imageUrl}
							alt={hostingPageHero.title ?? "Hosting hero image"}
							width={800}
							height={600}
							className="absolute max-h-[80vh] object-contain"
							style={{ bottom: "2px" }}
							priority
						/>
					</div>
				)}
			</div>
		</section>
	)
}

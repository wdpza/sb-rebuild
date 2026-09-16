"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import type { Settings } from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Slider = dynamic(() => import("react-slick"), { ssr: false }) as any;

type Category = { name: string; slug: string };
type CaseStudy = {
    title: string;
    slug: string;
    caseStudyCategories?: { nodes?: Category[] } | null;
};
type PortfolioItem = {
    title: string;
    slug: string;
    portfolioFields?: {
        sliderImageMain?: {
            node?: { mediaItemUrl?: string | null; altText?: string | null } | null;
        } | null;
        relatedCaseStudy?: { nodes?: CaseStudy[] } | null;
    } | null;
};

export default function PortfolioSlider({
    items,
    title,
    backgroundImage,
}: {
    items: PortfolioItem[];
    title: string;
    backgroundImage?: { node?: { mediaItemUrl?: string | null } } | null;
}) {
    const bgUrl = backgroundImage?.node?.mediaItemUrl ?? null;

    const settings: Settings = {
        arrows: false,
        dots: false,
        infinite: items.length > 1,
        speed: 800,
        autoplay: items.length > 1,
        autoplaySpeed: 10000,
        pauseOnHover: true,
        pauseOnFocus: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: items.length > 1,
        centerPadding: "16%",
        swipeToSlide: true,
        accessibility: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: { centerPadding: "10%" },
            },
            {
                breakpoint: 640,
                settings: { centerMode: false, centerPadding: "0px" },
            },
        ],
    };

    if (!items.length) return null;

    return (
        <section
            className="portfolio-work-slider relative w-full overflow-hidden bg-[#171717] bg-cover bg-center py-14 text-white md:py-20"
            style={{ backgroundImage: bgUrl ? `url(${bgUrl})` : undefined }}
        >
            <h2 className="mb-10 px-5 text-center text-[30px] font-bold leading-tight md:mb-14 md:text-[38px]">
                {title}
            </h2>

            <Slider {...settings}>
                {items.map((item) => {
                    const image = item.portfolioFields?.sliderImageMain?.node;
                    const caseStudy = item.portfolioFields?.relatedCaseStudy?.nodes?.[0];
                    const categories = caseStudy?.caseStudyCategories?.nodes ?? [];

                    if (!image?.mediaItemUrl || !caseStudy) return null;

                    return (
                        <article key={item.slug} className="px-2 md:px-3">
                            <div className="portfolio-slide-image relative aspect-video cursor-pointer overflow-hidden rounded-[5px] bg-[#e8e8e8]">
                                <Image
                                    src={image.mediaItemUrl}
                                    alt={image.altText || `${caseStudy.title} portfolio work`}
                                    fill
                                    sizes="(max-width: 640px) 100vw, 68vw"
                                    className="object-cover"
                                />
                            </div>

                            <div className="portfolio-slide-content flex min-h-[190px] flex-col items-center px-4 pt-7 text-center">
                                <h3 className="text-[48px] font-normal leading-tight">
                                    {caseStudy.title}
                                </h3>
                                {categories.length > 0 && (
                                    <p className="mt-1 text-[34px] font-bold leading-tight">
                                        {categories.map((category) => category.name).join(" | ")}
                                    </p>
                                )}
                                <Link
                                    href={`/case-study/${caseStudy.slug}`}
                                    className="mt-6 inline-flex cursor-pointer items-center justify-center rounded-sm bg-[#e5a900] px-6 py-2 text-[16px] font-semibold text-[#171717] transition-colors duration-200 hover:bg-[#f2bd21]"
                                >
                                    Read Case Study
                                </Link>
                            </div>
                        </article>
                    );
                })}
            </Slider>

            <style jsx global>{`
                .portfolio-work-slider .slick-list {
                    overflow: visible;
                }
                .portfolio-work-slider .slick-slide {
                    opacity: 0.72;
                    transition: opacity 300ms ease;
                }
                .portfolio-work-slider .slick-slide .portfolio-slide-image {
                    transform: scale(0.96, 0.9);
                    transform-origin: center;
                    transition: transform 800ms cubic-bezier(0.22, 1, 0.36, 1),
                        border-radius 800ms ease;
                    will-change: transform;
                }
                .portfolio-work-slider .slick-slide .portfolio-slide-content {
                    opacity: 0;
                    pointer-events: none;
                    transition: opacity 300ms ease;
                }
                .portfolio-work-slider .slick-slide.slick-center,
                .portfolio-work-slider .slick-slide:only-child {
                    opacity: 1;
                }
                .portfolio-work-slider .slick-slide.slick-center .portfolio-slide-image,
                .portfolio-work-slider .slick-slide:only-child .portfolio-slide-image {
                    transform: scale(1);
                }
                .portfolio-work-slider .slick-slide.slick-center .portfolio-slide-content,
                .portfolio-work-slider .slick-slide:only-child .portfolio-slide-content {
                    opacity: 1;
                    pointer-events: auto;
                }
                @media (max-width: 639px) {
                    .portfolio-work-slider .slick-list {
                        overflow: hidden;
                    }
                    .portfolio-work-slider .slick-slide {
                        opacity: 1;
                    }
                    .portfolio-work-slider .slick-slide .portfolio-slide-image {
                        transform: none;
                    }
                    .portfolio-work-slider .slick-slide .portfolio-slide-content {
                        opacity: 1;
                        pointer-events: auto;
                    }
                }
            `}</style>
        </section>
    );
}

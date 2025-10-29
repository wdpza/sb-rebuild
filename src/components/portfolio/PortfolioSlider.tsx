"use client";

import Slider from "react-slick";
import Image from "next/image";
import { useRef } from "react";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function PortfolioSlider({ items, title, backgroundImage }: any) {

    const sliderRef = useRef<Slider | null>(null);
    const bgUrl = backgroundImage?.node?.mediaItemUrl ?? null;

    const settings = {
        arrows: false,
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight: true,
    };

    return (
        <section
            className="w-full relative bg-cover bg-center"
            style={{
                backgroundImage: bgUrl ? `url(${bgUrl})` : undefined,
            }}
        >
            {/* Custom controls */}
            <div className="flex absolute top-8 w-1/2 ml-18 z-9">
                <div className="flex mx-auto w-full justify-between items-center py-10">
                    <button
                        onClick={() => sliderRef.current?.slickPrev()}
                        className="w-18 h-18 flex items-center justify-center cursor-pointer gradient-border rounded-full transition-transform duration-300 ease-in-out"
                    >
                        <img
                            src="/slider-navigation-right.svg"
                            alt="Previous slide"
                        />
                    </button>

                    <h2 className="text-4xl font-bold text-gradient-starbright">
                        {title}
                    </h2>

                    <button
                        onClick={() => sliderRef.current?.slickNext()}
                        className="w-18 h-18 flex items-center justify-center cursor-pointer gradient-border rounded-full transition-transform duration-300 ease-in-out"
                    >
                        <img
                            src="/slider-navigation-left.svg"
                            alt="Next slide"
                        />
                    </button>
                </div>
            </div>

            <Slider ref={sliderRef} {...settings}>
                {items.map((item: any) => {
                    const logo = item.portfolioFields?.logo?.node?.mediaItemUrl || null;
                    const altText = item.portfolioFields?.logo?.node?.altText || '';
                    const mainImage =
                        item.portfolioFields?.sliderImageMain?.node?.mediaItemUrl || null;
                    const sideImage1 =
                        item.portfolioFields?.sliderImageSlide1?.node?.mediaItemUrl || null;
                    const sideImage2 =
                        item.portfolioFields?.sliderImageSlide2?.node?.mediaItemUrl || null;

                    return (
                        <div
                            key={item.slug}
                            className="flex w-full h-screen"
                        >
                            <div className="flex flex-col md:flex-row w-full h-full">
                                {/* Left side: text + logo */}
                                <div className="flex flex-col justify-center md:w-2/3 p-12 pt-24  bg-gradient-vignette">
                                    {logo && (
                                        <Image
                                            src={logo}
                                            alt={`${altText}`}
                                            width={300}
                                            height={80}
                                            className="object-contain mb-6 self-center py-8"
                                        />
                                    )}
                                </div>

                                {/* Right side: images */}
                                <div className="flex md:w-1/2 gap-3">
                                    {/* Main image */}
                                    {mainImage ? (
                                        <div className="flex-1">
                                            <Image
                                                src={mainImage}
                                                alt={`${item.title} main image`}
                                                width={1960}
                                                height={1080}
                                                className="w-full h-[400px] object-cover h-full"
                                            />
                                        </div>
                                    ) : (
                                        <div className="flex-1 bg-neutral-stronger rounded-lg flex items-center justify-center text-neutral-regular">
                                            <span>No image available</span>
                                        </div>
                                    )}

                                    {/* Side images stacked vertically */}
                                    {(sideImage1 || sideImage2) && (
                                        <div className="hidden md:flex flex-col w-1/3 h-full gap-3">
                                            {sideImage1 && (
                                                <div className="flex-1">
                                                    <Image
                                                        src={sideImage1}
                                                        alt={`${item.title} side image 1`}
                                                        width={400}
                                                        height={200}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                            )}
                                            {sideImage2 && (
                                                <div className="flex-1">
                                                    <Image
                                                        src={sideImage2}
                                                        alt={`${item.title} side image 2`}
                                                        width={400}
                                                        height={200}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </Slider>

        </section>
    );
}

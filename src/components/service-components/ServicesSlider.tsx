"use client";

import dynamic from "next/dynamic";
import type { Settings } from "react-slick";
import Image from "next/image";

const Slider = dynamic(() => import("react-slick"), { ssr: false });

export default function ServicesSlider({ slide }: any) {

    const base_url = process.env.NEXT_PUBLIC_WP_BASE_URL || '';

    /*
    [
        {
            clientName: 'PG Bison',
            service: 'Social Media Designs',
            image: { node: [Object] }
        },
        {
            clientName: 'Demo Client',
            service: 'Marketing Posters',
            image: { node: [Object] }
        },
        {
            clientName: 'Hyper Auto',
            service: 'Email Marketing Designs',
            image: { node: [Object] }
        }
    ]
    */

    return (
        <div className="services-slider my-12 py-6">
            <style jsx global>{`
                .services-slider .slick-list {
                    overflow: hidden;
                }
                .services-slider .slick-track {
                    display: flex !important;
                    align-items: center;
                }
                .services-slider .slick-slide {
                    transition: all 300ms ease;
                    opacity: 0.5;
                    transform: scale(0.95);
                }
                .services-slider .slick-slide .slide-content {
                    opacity:0;
                }
                .services-slider .slick-slide.slick-center {
                    opacity: 1;
                    transform: scale(1);
                    z-index: 10;
                }
                .services-slider .slick-slide.slick-center .slide-content {
                    opacity:1;
                }
                @media (max-width: 600px) {
                    .services-slider .slick-slide {
                        opacity: 1;
                        transform: scale(1);
                    }
                    .services-slider .slick-slide .slide-content {
                        opacity: 1;
                    }
                }
                .services-slider .slick-dots li button:before {
                    width: 12px !important;
                    height: 12px !important;
                    border-radius: 50% !important;
                    content: '' !important;
                    background: var(--color-neutral-stronger, #d1d5db) !important;
                    opacity: 1 !important;
                }
                .services-slider .slick-dots li.slick-active button:before {
                    background: linear-gradient(
                        99deg,
                        var(--color-blue-softer, #36aefa) 0%,
                        var(--color-purple-regular, #bd208b) 37.5%,
                        var(--color-orange-regular, #f15d22) 87.02%,
                        var(--color-yellow-regular, #eeb42c) 99.99%
                    ) !important;
                    opacity: 1 !important;
                }
            `}</style>
            <Slider
                dots={true}
                infinite={true}
                speed={500}
                centerMode={true}
                centerPadding="25%"
                slidesToShow={1}
                slidesToScroll={1}
                responsive={[
                    {
                        breakpoint: 1024,
                        settings: {
                            slidesToShow: 1,
                            centerPadding: "20%",
                        }
                    },
                    {
                        breakpoint: 600,
                        settings: {
                            slidesToShow: 1,
                            centerMode: false,
                            centerPadding: "0px",
                        }
                    }
                ]}
            >
                {slide.map((item: any, index: number) => {

                    return (
                        <div key={index} className="px-4 sm:px-0">
                            <div className="overflow-hidden">
                                <Image
                                    src={item.image?.node?.filePath ? `${base_url}${item.image.node.filePath}` : '/placeholder.png'}
                                    alt={item.image?.node?.altText || item.clientName || 'Service Image'}
                                    width={1024}
                                    height={768}
                                    className="w-full h-auto object-cover rounded"
                                />
                                <div className="p-4 text-center slide-content">
                                    <h3 className="text-xl md:text-3xl font-bold mb-2 text-neutral-softest">{item.clientName}</h3>
                                    <p className="text-lg md:text-2xl text-gray-600 font-regular text-neutral-softer">{item.service}</p>
                                </div>
                            </div>
                        </div>
                    )
                })}
            
            </Slider>
        </div>
    )
}
"use client";

import { useState } from "react";
import Image from "next/image";

export default function BusinessSolutions({ items, title }: any) {
    const [activeIndex, setActiveIndex] = useState(0);

    const activeItem = items[activeIndex];
    const activeDescription = activeItem?.content || "";
    const activeLink = activeItem?.businessSolutionFields.ctaLink.url || "#";
    const activeLinkTarget = activeItem?.businessSolutionFields.ctaLink.target || "";

    return (
        <section className="bg-white">
            <div className="layout-wrapper">
                <div className="relative z-10 grid grid-cols-1 gap-6 text-center md:text-left lg:gap-12 xl:gap-36 lg:grid-cols-5 py-12 md:py-24">
                    {/* LEFT: Info panel */}
                    <div className="col-span-1 lg:col-span-2 flex flex-col justify-center space-y-6">
                        <h2 className="subtitle font-bold text-gradient-starbright">
                            {title ?? "Business Solutions"}
                        </h2>

                        <p className="text-base md:text-lg text-neutral-strongest mb-6 md:mb-12 text-neutral-regular">
                            Simplify, streamline and supercharge your business
                            operations. We provide the business tools you need to
                            work smarter, collaborate together and grow faster.
                        </p>

                        {/* Mobile: Show all items non-interactively */}
                        <div className="flex flex-col gap-8 md:hidden">
                            {items.map((item: any, index: number) => {
                                const itemDescription = item?.content || "";
                                const itemLink = item?.businessSolutionFields.ctaLink.url || "#";
                                const itemLinkTarget = item?.businessSolutionFields.ctaLink.target || "";
                                
                                return (
                                    <div key={item.slug || index} className="space-y-4">
                                        <h3 className="text-2xl font-archivo font-semibold text-neutral-strongest capitalize">
                                            {item.slug.replace(/-/g, " ")}
                                        </h3>

                                        <div
                                            className="text-base text-balance text-neutral-strongest whitespace-pre-line leading-relaxed"
                                            dangerouslySetInnerHTML={{
                                                __html: itemDescription,
                                            }}
                                        />

                                        {itemLink && (
                                            <a
                                                href={itemLink}
                                                className="inline-flex items-center justify-center rounded-md px-8 py-3 font-semibold text-white gradient-border"
                                                target={itemLinkTarget}
                                            >
                                                View Solution
                                            </a>
                                        )}
                                    </div>
                                );
                            })}
                        </div>

                        {/* Desktop: Interactive with active item */}
                        <div className="transition-all duration-300 ease-in-out hidden md:block">

                            <h3 className="font-archivo subtitle font-semibold text-neutral-strongest mb-4 capitalize">
                                {activeItem.slug.replace(/-/g, " ")}
                            </h3>

                            <div
                                className="text-base md:text-lg text-neutral-strongest whitespace-pre-line leading-relaxed"
                                dangerouslySetInnerHTML={{
                                    __html: activeDescription,
                                }}
                            />

                            {activeLink && (
                                <a
                                    href={activeLink}
                                    className="inline-flex items-center justify-center rounded-md px-8 py-3 font-semibold text-white gradient-border mt-8"
                                    target={activeLinkTarget}
                                >
                                    View Solution
                                </a>
                            )}
                        </div>
                    </div>

                    {/* RIGHT: Logo grid (2 columns) */}
                    {/* <div className="col-span-1 lg:col-span-3 grid grid-cols-2 gap-8"></div> */}
                    <div className="col-span-1 lg:col-span-3 hidden md:block">
                        <div className="grid grid-cols-2 gap-4 md:gap-8">
                            {items.map((item: any, index: number) => {
                                const logo =
                                    item.businessSolutionFields?.logo?.node
                                        ?.mediaItemUrl || "";

                                return (
                                    <button
                                        key={item.slug || index}
                                        onClick={() => setActiveIndex(index)}
                                        className="bg-[#F8F8F8] cursor-pointer relative flex items-center justify-center aspect-4/3 w-full rounded-lg transition-all duration-300 ease-in-out"
                                    >
                                        {logo ? (
                                            <div className="relative w-32 h-32 md:w-64 md:h-64 transform hover:scale-110 transition-transform duration-300 ease-in-out">
                                                <Image
                                                    src={logo}
                                                    alt={item.slug}
                                                    fill
                                                    className="p-4 object-contain"
                                                />
                                            </div>
                                        ) : (
                                            <div className="text-neutral-regular text-sm">
                                                No logo
                                            </div>
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

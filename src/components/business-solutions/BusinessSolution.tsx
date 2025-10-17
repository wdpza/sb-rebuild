"use client";

import { useState } from "react";
import Image from "next/image";

export default function BusinessSolutions({ items, title }: any) {
    const [activeIndex, setActiveIndex] = useState(0);

    const activeItem = items[activeIndex];
    const activeDescription = activeItem?.content || "";
    const activeLink = activeItem?.uri || "#";

    return (
        <section className="bg-white">
            <div className="relative z-10 grid w-full max-w-[1800px] mx-auto grid-cols-1 md:grid-cols-5 gap-36 px-12 py-24">
                {/* LEFT: Info panel */}
                <div className="col-span-2 flex flex-col justify-center space-y-6">
                    <h2 className="text-[40px] font-bold text-gradient-starbright">
                        {title ?? "Business Solutions"}
                    </h2>

                    <p className="text-lg text-neutral-strongest mb-12 text-neutral-regular">
                        Simplify, streamline and supercharge your business
                        operations. We provide the business tools you need to
                        work smarter, collaborate together and grow faster.
                    </p>

                    <div className="transition-all duration-300 ease-in-out">

                        <h3 className="font-archivo text-[40px] font-semibold text-neutral-strongest mb-4 capitalize">
                            {activeItem.slug.replace(/-/g, " ")}
                        </h3>

                        <div
                            className="text-lg text-neutral-strongest whitespace-pre-line leading-relaxed"
                            dangerouslySetInnerHTML={{
                                __html: activeDescription,
                            }}
                        />

                        {activeLink && (
                            <a
                                href={activeLink}
                                className="inline-flex items-center justify-center rounded-md px-8 py-3 font-semibold text-white gradient-border mt-8"
                            >
                                View Solution
                            </a>
                        )}
                    </div>
                </div>

                {/* RIGHT: Logo grid (2 columns) */}
                <div className="col-span-3 grid grid-cols-2 gap-8">
                    {items.map((item: any, index: number) => {
                        const logo =
                            item.businessSolutionFields?.logo?.node
                                ?.mediaItemUrl || "";

                        return (
                            <button
                                key={item.slug || index}
                                onClick={() => setActiveIndex(index)}
                                className={`relative flex items-center justify-center aspect-4/3 w-full rounded-lg transition-all duration-300 ease-in-out ${
                                    index === activeIndex
                                        ? "bg-neutral-softest"
                                        : "bg-neutral-softest hover:bg-neutral-softest opacity-60"
                                }`}
                            >
                                {logo ? (
                                    <div className="relative w-64 h-64">
                                        <Image
                                            src={logo}
                                            alt={item.slug}
                                            fill
                                            className="object-contain"
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
        </section>
    );
}

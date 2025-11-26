"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

export default function PortfolioTabsLayout({ categories, backgroundImage }: any) {

    const backgroundImageUrl = backgroundImage?.node?.filePath || null;

    const items = Array.isArray(categories)
        ? categories
        : categories?.nodes ?? [];

    const firstId = items[0]?.id ?? null;
    const [active, setActive] = useState(firstId);

    const activeCategory = items.find((c: any) => c.id === active);
    const images = activeCategory?.portfolioCategoryFields?.categoryImages || [];

    const baseUrl = process.env.NEXT_PUBLIC_WP_BASE_URL;

    console.log(baseUrl + backgroundImageUrl);

    // ----------------------------
    // OVERLAY STATE
    // ----------------------------
    const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

    // Close on ESC
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") setLightboxSrc(null);
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, []);

    return (
        <div 
            className={`w-full`}
            style={{
                backgroundImage: backgroundImageUrl ? `url(${baseUrl}${backgroundImageUrl})` : undefined,
                backgroundPosition: "center",
                backgroundSize: "100% auto",
            }}
        >
            <div className="layout-wrapper py-24">

                {/* TAB BUTTONS */}
                <div className="flex gap-8 justify-center mb-24">
                    {items.map((cat: any) => {
                        const isActive = active === cat.id;

                        return (
                            <button
                                key={cat.id}
                                onClick={() => setActive(cat.id)}
                                className={`px-8 py-3 font-semibold text-neutral-softest transition-colors gradient-border rounded
                                    ${isActive ? "active" : ""}`}
                            >
                                {cat.name}
                            </button>
                        );
                    })}
                </div>

                {/* CONTENT */}
                <div className="w-full">
                    {!images?.length && (
                        <div className="py-12 text-center text-neutral-softest/60">
                            No images available for this category.
                        </div>
                    )}

                    {images?.length > 0 && (
                        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
                            {images.map((item: any, index: number) => {
                                const node = item?.image?.node;
                                if (!node) return null;

                                const src = `${baseUrl}${node.filePath}`;
                                const alt = node.altText || "";

                                return (
                                    <div
                                        key={index}
                                        className="break-inside-avoid-column cursor-pointer"
                                        onClick={() => setLightboxSrc(src)}
                                    >
                                        <Image
                                            src={src}
                                            alt={alt}
                                            width={800}
                                            height={800}
                                            className="w-full h-auto rounded-lg shadow-sm"
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>

            {/* ----------------------------------- */}
            {/* LIGHTBOX OVERLAY */}
            {/* ----------------------------------- */}
            {lightboxSrc && (
                <div
                    onClick={() => setLightboxSrc(null)}
                    className="fixed inset-0 z-[9999] bg-black/85 backdrop-blur-sm flex items-center justify-center p-6 cursor-pointer transition-opacity"
                >
                    <div className="relative max-w-5xl w-full">
                        <Image
                            src={lightboxSrc}
                            alt=""
                            width={1600}
                            height={1600}
                            className="w-full h-auto rounded-lg pointer-events-none"
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

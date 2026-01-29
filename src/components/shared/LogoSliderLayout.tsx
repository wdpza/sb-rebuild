"use client"

import Marquee from "react-fast-marquee"
import Image from "next/image"

export default function LogoSliderLayout({ logo, logos, style }: any) {
    const logosData = logos || logo
    if (!logosData || !Array.isArray(logosData) || logosData.length === 0) return null

    const sectionClassName = style && style[0] === "style_2"
        ? "bg-sb-black py-6 md:py-4"
        : "bg-gradient-starbright py-6 md:py-4"

    return (
        <section id="logo-slider" className={sectionClassName}>
            <Marquee gradient={false} speed={100} autoFill={true}>
                {logosData.map((item: any, index: number) => {
                    const node = item.logo?.node
                    if (!node?.mediaItemUrl) return null

                    return (
                        <div
                            key={index}
                            className="flex items-center justify-center mx-6"
                            style={{ width: "auto", height: "80px" }}
                        >
                            <Image
                                src={node.mediaItemUrl}
                                alt={node.altText?.trim() || `Logo ${index + 1}`}
                                width={120}
                                height={60}
                                className="object-contain max-h-[80px] w-auto"
                                priority={false}
                            />
                        </div>
                    )
                })}
            </Marquee>
        </section>
    )
}
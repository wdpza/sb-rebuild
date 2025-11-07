"use client"

import Marquee from "react-fast-marquee"
import Image from "next/image"

export default function LogoSliderLayout({ logo: logos }: any) {
    if (!logos || !Array.isArray(logos) || logos.length === 0) return null

    return (
        <section className="bg-gradient-starbright py-12">
            <Marquee gradient={false} speed={100} autoFill={true}>
                {logos.map((item: any, index: number) => {
                    const node = item.logo?.node
                    if (!node?.mediaItemUrl) return null

                    return (
                        <div
                            key={index}
                            className="flex items-center justify-center mx-6" // reduced from mx-12
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
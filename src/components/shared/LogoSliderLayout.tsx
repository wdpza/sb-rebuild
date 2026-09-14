"use client"

import Marquee from "react-fast-marquee"
import Image from "next/image"
import type { MediaItem } from "@/types/common"
import styles from "./LogoSliderLayout.module.css"

type LogoSliderProps = {
    logo?: { logo?: MediaItem | null }[] | null
    logos?: { logo?: MediaItem | null }[] | null
    style?: string[] | null
}

export default function LogoSliderLayout({ logo, logos }: LogoSliderProps) {
    const logosData = (logos ?? logo ?? []).filter(item => item.logo?.node?.mediaItemUrl)
    if (logosData.length === 0) return null

    return (
        <section id="logo-slider" className={styles.slider} aria-label="Our clients">
            <div className={styles.track}>
                <Marquee gradient={false} speed={35} autoFill pauseOnHover pauseOnClick>
                    {logosData.map((item, index) => {
                        const node = item.logo!.node!

                        return (
                            <div key={`${node.mediaItemUrl}-${index}`} className={styles.item}>
                                <Image
                                    src={node.mediaItemUrl!}
                                    alt={node.altText?.trim() || `Client logo ${index + 1}`}
                                    width={120}
                                    height={60}
                                    sizes="100px"
                                    className={styles.logo}
                                />
                            </div>
                        )
                    })}
                </Marquee>
            </div>
        </section>
    )
}

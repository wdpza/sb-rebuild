"use client"

import Marquee from "react-fast-marquee"
import Image from "next/image"

/*
{
    "__typename": "ServicePageFieldsServicePageBuilderLogoSliderLayout",
    "fieldGroupName": "ServicePageFieldsServicePageBuilderLogoSliderLayout",
    "logos": [
        {
            "logo": {
                "node": {
                    "altText": "",
                    "filePath": "/wp-content/uploads/2025/10/son_sound03-1.png"
                }
            }
        },
        {
            "logo": {
                "node": {
                    "altText": "",
                    "filePath": "/wp-content/uploads/2025/10/restack03.png"
                }
            }
        },
        {
            "logo": {
                "node": {
                    "altText": "",
                    "filePath": "/wp-content/uploads/2025/10/dotcom03.png"
                }
            }
        },
        {
            "logo": {
                "node": {
                    "altText": "",
                    "filePath": "/wp-content/uploads/2025/10/stargas03.png"
                }
            }
        },
        {
            "logo": {
                "node": {
                    "altText": "",
                    "filePath": "/wp-content/uploads/2025/10/nlhs03.png"
                }
            }
        },
        {
            "logo": {
                "node": {
                    "altText": "",
                    "filePath": "/wp-content/uploads/2025/10/rvc_inc03.png"
                }
            }
        },
        {
            "logo": {
                "node": {
                    "altText": "",
                    "filePath": "/wp-content/uploads/2025/10/bamdiy03.png"
                }
            }
        },
        {
            "logo": {
                "node": {
                    "altText": "",
                    "filePath": "/wp-content/uploads/2025/10/agreenco03.png"
                }
            }
        },
        {
            "logo": {
                "node": {
                    "altText": "",
                    "filePath": "/wp-content/uploads/2025/10/bic03.png"
                }
            }
        },
        {
            "logo": {
                "node": {
                    "altText": "",
                    "filePath": "/wp-content/uploads/2025/10/son_sound03.png"
                }
            }
        },
        {
            "logo": {
                "node": {
                    "altText": "",
                    "filePath": "/wp-content/uploads/2025/10/fisher_dugmore03.png"
                }
            }
        }
    ]
}
    */
export default function LogoSliderLayout({ logo, logos }: any) {
    const logosData = logos || logo
    if (!logosData || !Array.isArray(logosData) || logosData.length === 0) return null

    return (
        <section id="logo-slider" className="bg-gradient-starbright py-12">
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
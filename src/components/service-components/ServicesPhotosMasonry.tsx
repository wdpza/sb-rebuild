"use client";

import Image from "next/image";

export default function ServicesPhotosMasonry({ slide, backgroundImage }: any) {
    const base_url = process.env.NEXT_PUBLIC_WP_BASE_URL || '';

    const backgroundImageUrl = backgroundImage?.node?.mediaItemUrl || '';
    console.log(backgroundImage)

    /*
    {
    "node": {
        "altText": "",
        "filePath": "/wp-content/uploads/2025/10/bg.jpg",
        "mediaItemUrl": "https://cms.starbright.co.za/wp-content/uploads/2025/10/bg.jpg"
    }
}
    */

    return (
        <div className="services-photos-masonry py-12"
            style={{
                backgroundImage: backgroundImageUrl ? `url(${backgroundImageUrl})` : undefined,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <style jsx>{`
                .masonry-grid {
                    column-count: 1;
                    column-gap: 1rem;
                }
                @media (min-width: 640px) {
                    .masonry-grid {
                        column-count: 2;
                        column-gap: 1.5rem;
                    }
                }
                @media (min-width: 1024px) {
                    .masonry-grid {
                        column-count: 5;
                        column-gap: 2rem;
                    }
                }
                .masonry-item {
                    break-inside: avoid;
                    page-break-inside: avoid;
                    margin-bottom: 1rem;
                }
                @media (min-width: 640px) {
                    .masonry-item {
                        margin-bottom: 1.5rem;
                    }
                }
                @media (min-width: 1024px) {
                    .masonry-item {
                        margin-bottom: 2rem;
                    }
                }
            `}</style>
            <div className="layout-wrapper">
                <div className="masonry-grid">
                    {slide.map((item: any, index: number) => (
                        <div key={index} className="masonry-item">
                            <div className="relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                                <Image
                                    src={item.image?.node?.filePath ? `${base_url}${item.image.node.filePath}` : '/placeholder.png'}
                                    alt={item.image?.node?.altText || `Image ${index + 1}`}
                                    width={800}
                                    height={600}
                                    className="w-full h-auto object-cover"
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
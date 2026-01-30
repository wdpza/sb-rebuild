import Image from "next/image";
import Link from "next/link";

export default function SocialMediaPlatforms({ introTitle, platform, backgroundImage }: any) {

    const bgUrl = backgroundImage?.node?.mediaItemUrl ?? null;

    return (
        <div
            className="relative bg-cover bg-center shadow"
            style={{
                backgroundImage: bgUrl ? `url(${bgUrl})` : undefined,
            }}
        >
            <div className="layout-wrapper mx-auto w-full">
                {introTitle && <h2 className="subtitle font-bold mb-12 text-neutral-softest text-center">{introTitle}</h2>}
                <div className="flex justify-between items-center gap-16">
                    {platform.map((platform: any, index: number) => {
                        const imageElement = (
                            <Image
                                src={platform.platformImage.node.mediaItemUrl}
                                alt={platform.platformImage.node.altText || `Platform ${index + 1}`}
                                width={200}
                                height={200}
                                className="w-auto max-w-[200px] h-auto max-h-[60px] hover:scale-110 transition-transform duration-300 ease-in-out"
                                loading="lazy"
                            />
                        );

                        return platform.platformLink ? (
                            <Link
                                key={index}
                                href={platform.platformLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex justify-center items-center transition-transform duration-300 ease-in-out hover:scale-105 flex-shrink-0"
                            >
                                {imageElement}
                            </Link>
                        ) : (
                            <div
                                key={index}
                                className="flex justify-center py-12 items-center flex-shrink-0"
                            >
                                {imageElement}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

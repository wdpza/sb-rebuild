import Image from "next/image";
import Link from "next/link";

export default function SocialMediaPlatforms({ introTitle, platform, backgroundImage }: any) {

    const bgUrl = backgroundImage?.node?.mediaItemUrl ?? null;

    return (
        <div
            className="relative py-20 bg-cover bg-center"
            style={{
                backgroundImage: bgUrl ? `url(${bgUrl})` : undefined,
            }}
        >
            <div className="layout-wrapper mx-auto w-full">
                <h2 className="subtitle font-bold mb-12 text-neutral-softest text-center">{introTitle}</h2>
                <div className="flex justify-center items-center gap-16 max-w-[1200px] mx-auto">
                    {platform.map((platform: any, index: number) => {
                        const imageElement = (
                            <Image
                                src={platform.platformImage.node.mediaItemUrl}
                                alt={platform.platformImage.node.altText || `Platform ${index + 1}`}
                                width={200}
                                height={200}
                                className="max-w-[200px] h-auto"
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
                                className="flex justify-center items-center flex-shrink-0"
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

export default function SocialMediaPlatforms({ introTitle, platform, backgroundImage }: any) {

    const bgUrl = backgroundImage?.node?.mediaItemUrl ?? null;

    return (
        <div
            className="relative py-24 bg-cover bg-center"
            style={{
                backgroundImage: bgUrl ? `url(${bgUrl})` : undefined,
            }}
        >
            <div className="max-w-[1600px] mx-auto w-full">
                <h2 className="text-[45px] font-bold mb-8 text-white text-center">{introTitle}</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 max-w-[1200px] mx-auto">
                    {platform.map((platform: any, index: number) => (
                    <a
                        key={index}
                        href={platform.platformLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex justify-center items-center bg-[#1B1B1C] p-8 rounded-lg shadow-lg transition-transform duration-300 ease-in-out hover:scale-105"
                    >
                        <img
                        src={platform.platformImage.node.mediaItemUrl}
                        alt={platform.platformImage.node.altText || `Platform ${index + 1}`}
                        className="w-full mx-200"
                        />
                    </a>
                    ))}
                </div>
            </div>
        </div>
    );
}

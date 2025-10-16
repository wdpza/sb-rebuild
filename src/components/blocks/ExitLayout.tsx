export default function ExitLayout({ title, backgroundImage, ctaLink }: any) {

    console.log(title);
    console.log(backgroundImage);
    console.log(ctaLink);
    const bgUrl = backgroundImage?.node?.mediaItemUrl ?? null;

    return (
        <div
            className="relative py-24 bg-cover bg-center"
            style={{
                backgroundImage: bgUrl ? `url(${bgUrl})` : undefined,
            }}
        >
            <div className="absolute inset-0 bg-[#28262C]/80"></div>
            <div className="relative z-10 w-full max-w-[1200px] mx-auto flex flex-col items-center justify-center text-center text-white px-6">
                <h2 className="uppercase text-5xl md:text-6xl font-bold mb-8">
                    {title}
                </h2>
                <a href="{ ctaLink.url }" target="{ ctaLink.target }" className="inline-flex items-center justify-center rounded-md px-8 py-3 font-semibold text-white gradient-border mt-4">
                    { ctaLink.title }
                </a>
            </div>
        </div>
    );
}

export default function TermsConditionsExit(options : any) {

    const termsConditionsExit = options.options.termsConditionsOptions.termsConditionsOptionsFields.termsConditionsExit;

    const cleanUrl = termsConditionsExit.ctaLink?.url
        ? termsConditionsExit.ctaLink?.url.replace(/^https?:\/\/[^/]+/, "")
        : null;

    return (
        <div
            className="relative py-24 bg-cover bg-center"
            style={{
                backgroundImage: termsConditionsExit.backgroundImage.node.mediaItemUrl ? `url(${termsConditionsExit.backgroundImage.node.mediaItemUrl})` : undefined,
            }}
        >
            <div className="absolute backdrop-grayscale w-full h-full left-0 top-0"></div>
            <div className="absolute inset-0 bg-[#28262C]/80"></div>
            <div className="relative z-10 w-full max-w-[1200px] mx-auto flex flex-col items-center justify-center text-center text-neutral-softest px-6">
                <h2 className="uppercase exit-title font-bold mb-8">
                    {termsConditionsExit.title ?? null}
                </h2>
                <a href={` ${cleanUrl ?? null} `} target={` ${termsConditionsExit.ctaLink?.target ?? null} `} className="inline-flex items-center justify-center rounded-md px-8 py-3 font-semibold text-neutral-softest gradient-border mt-4">
                    { termsConditionsExit.ctaLink?.title ?? null }
                </a>
            </div>
        </div>
    );

}

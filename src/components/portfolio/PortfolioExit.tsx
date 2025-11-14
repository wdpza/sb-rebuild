export default function PortfolioExit(portfolioOptions : any) {

    if (!portfolioOptions) {
        return null; // Return null safely if there's no data
    }

    const portfolioExit = portfolioOptions.portfolioOptions.portfolioOptions.portfolioOptionsFields.exitSection;
    const cleanUrl = portfolioExit.ctaLink?.url
        ? portfolioExit.ctaLink?.url.replace(/^https?:\/\/[^/]+/, "")
        : null;


    return (
        <div
            className="relative py-24 bg-cover bg-center"
            style={{
                backgroundImage: portfolioExit.backgroundImage.node.mediaItemUrl ? `url(${portfolioExit.backgroundImage.node.mediaItemUrl})` : undefined,
            }}
        >
            <div className="absolute inset-0 bg-[#28262C]"></div>
            <div className="relative z-10 w-full max-w-[1200px] mx-auto flex flex-col items-center justify-center text-center text-white px-6">
                <h2 className="uppercase text-5xl md:text-6xl font-bold mb-8">
                    {portfolioExit.title ?? null}
                </h2>
                <a href={` ${cleanUrl ?? null} `} target={` ${portfolioExit.ctaLink?.target ?? null} `} className="inline-flex items-center justify-center rounded-md px-8 py-3 font-semibold text-white gradient-border mt-4">
                    { portfolioExit.ctaLink?.title ?? null }
                </a>
            </div>
        </div>
    );
}

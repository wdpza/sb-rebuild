import Link from "next/link";
import DOMPurify from "isomorphic-dompurify";

export default function PortfolioHero(portfolioOptions : any) {

    if (!portfolioOptions) {
        return null; // Return null safely if there's no data
    }

    const portfolioHero = portfolioOptions.portfolioOptions.portfolioOptions.portfolioOptionsFields.portfolioHero;

    const bgUrl = portfolioHero?.backgroundImage?.node?.mediaItemUrl ?? null;
    const mainImgUrl = portfolioHero?.mainImage?.node?.mediaItemUrl ?? null;
    const mainImgAlt = portfolioHero?.mainImage?.node?.mediaItemalt ?? null;
    const title = portfolioHero?.title ?? "Our Blog";
    const subHeading = portfolioHero?.subHeading ?? "";
    const description = portfolioHero?.description ?? "";
    const anchor = portfolioHero?.anchor ?? "";

    return (
        <section
            className="relative flex min-h-screen h-screen w-full items-center bg-cover bg-bottom bg-no-repeat overflow-hidden"
            style={{
                backgroundImage: bgUrl ? `url(${bgUrl})` : undefined,
            }}
        >
            <div className="h-screen relative z-10 grid w-full max-w-[1600px] mx-auto grid-cols-1 md:grid-cols-24 gap-2 px-12 py-24 mt-12">
                <div className="col-span-13 flex flex-col justify-center text-left gap-4">
                    <h1 className="font-archivo uppercase hero-title text-center md:text-left font-black drop-shadow-lg text-gradient-starbright">
                        {title}
                    </h1>

                    {subHeading && (
                        <h2 className="font-bold mt-4 hero-subtitle text-center md:text-left text-neutral-softest drop-shadow-md tracking-wide">
                            {subHeading}
                        </h2>
                    )}

                    {description && (
                        <div
                            className="mt-4 text-[24px] text-gray-100 max-w-3xl text-center md:text-left"
                            dangerouslySetInnerHTML={{
                                __html: DOMPurify.sanitize(description),
                            }}
                        />
                    )}

                    {anchor && (
                        <div className="mt-10 text-center md:text-left">
                            <Link
                                href={anchor}
                                className="
                                    bg-neutral-strongest
                                    gradient-border
                                    inline-block px-8 py-3 
                                    text-neutral-softest font-semibold uppercase 
                                    rounded-lg shadow-md 
                                    transition-all duration-300 
                                    hover:bg-gradient-starbright
                                "
                            >
                                View Our Work
                            </Link>
                        </div>
                    )}
                </div>

                {mainImgUrl && (
                    <div className={`z-[-1] opacity-60 md:opacity-100 col-span-11 flex justify-center items-center`}>
                        <img
                            src={mainImgUrl}
                            alt={mainImgAlt ?? ""}
                            className="absolute max-h-[80vh] object-contain"
                            style={{ bottom: "2px" }}
                        />
                    </div>
                )}
            </div>
        </section>
    );
}

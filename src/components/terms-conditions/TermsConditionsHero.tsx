import Link from "next/link";
import DOMPurify from "isomorphic-dompurify";

export default function TermsConditionsHero({ options }: any) {
    const termsConditionsHero = options.termsConditionsOptions.termsConditionsOptionsFields.termsConditionsHero;

    const background = termsConditionsHero?.backgroundImage?.node?.mediaItemUrl ?? null;
    const mainImg = termsConditionsHero?.mainImage?.node?.mediaItemUrl ?? null;
    const title = termsConditionsHero?.title ?? "Our Blog";
    const subHeading = termsConditionsHero?.subHeading ?? "";
    const description = termsConditionsHero?.description ?? "";
    const anchor = termsConditionsHero?.anchor ?? "";

    return (
        <section
            className="relative flex min-h-screen h-screen w-full items-center bg-cover bg-bottom bg-no-repeat overflow-hidden"
            style={{
                backgroundImage: background ? `url(${background})` : undefined,
            }}
        >
            <div className="h-screen relative z-10 grid w-full max-w-[1600px] mx-auto grid-cols-1 md:grid-cols-24 gap-2 px-12 py-24">
                {/* Left column: title, subtitle, description, anchor */}
                <div className="col-span-13 flex flex-col justify-center text-left gap-4 z-4">
                    <h1 className="font-archivo uppercase text-[75px]/20 font-black drop-shadow-lg text-gradient-starbright">
                        {title}
                    </h1>

                    {subHeading && (
                        <h2 className="font-bold mt-4 text-[45px] text-neutral-softest drop-shadow-md tracking-wide">
                            {subHeading}
                        </h2>
                    )}

                    {description && (
                        <div
                            className="mt-6 text-lg text-gray-100 max-w-3xl"
                            dangerouslySetInnerHTML={{
                                __html: DOMPurify.sanitize(description),
                            }}
                        />
                    )}

                    {anchor && (
                        <div className="mt-10">
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
                                Read Terms & Conditions
                            </Link>
                        </div>
                    )}
                </div>

                {/* Right column: hero image */}
                {mainImg && (
                    <div className="col-span-11 flex justify-center items-center">
                        <img
                            src={mainImg}
                            alt={title ?? ""}
                            className="absolute max-h-[80vh] object-contain"
                            style={{ bottom: "2px" }}
                        />
                    </div>
                )}
            </div>
        </section>
    );

}

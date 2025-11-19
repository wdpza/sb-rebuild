import Link from "next/link";
import DOMPurify from "isomorphic-dompurify";

export default function BlogblogHero({ blogOptions }: any) {
    const { blogHero } = blogOptions ?? {};

    const background =
        blogHero?.backgroundImage?.node?.mediaDetails?.filePath ?? null;
    const mainImg = blogHero?.mainImage?.node?.mediaDetails?.filePath ?? null;
    const title = blogHero?.title ?? "Our Blog";
    const subHeading = blogHero?.subHeading ?? "";
    const description = blogHero?.description ?? "";
    const anchor = blogHero?.anchor ?? "";

    const bgUrl = background
        ? `${process.env.NEXT_PUBLIC_WP_BASE_URL}${background}`
        : undefined;

    const mainImgUrl = mainImg
        ? `${process.env.NEXT_PUBLIC_WP_BASE_URL}${mainImg}`
        : undefined;

    return (
        <section
            className="relative flex min-h-screen h-screen w-full items-center bg-cover bg-bottom bg-no-repeat overflow-hidden"
            style={{
                backgroundImage: bgUrl ? `url(${bgUrl})` : undefined,
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
                                I want some knowledge
                            </Link>
                        </div>
                    )}
                </div>

                {/* Right column: hero image */}
                {mainImgUrl && (
                    <div className="col-span-11 flex justify-center items-center">
                        <img
                            src={mainImgUrl}
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

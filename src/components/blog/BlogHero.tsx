import Link from "next/link";
import Image from "next/image";
import DOMPurify from "isomorphic-dompurify";

export default function BlogblogHero({ blogOptions }: any) {
    const { blogHero } = blogOptions ?? {};

    const background =
        blogHero?.backgroundImage?.node?.mediaItemUrl ?? 
        blogHero?.backgroundImage?.node?.mediaDetails?.filePath ?? null;
    const mainImg = 
        blogHero?.mainImage?.node?.mediaItemUrl ?? 
        blogHero?.mainImage?.node?.mediaDetails?.filePath ?? null;
    const title = blogHero?.title ?? "Our Blog";
    const subHeading = blogHero?.subHeading ?? "";
    const description = blogHero?.description ?? "";
    const anchor = blogHero?.anchor ?? "";

    const bgUrl = background?.startsWith('http')
        ? background
        : background
        ? `${process.env.NEXT_PUBLIC_WP_BASE_URL}${background}`
        : undefined;

    const mainImgUrl = mainImg?.startsWith('http')
        ? mainImg
        : mainImg
        ? `${process.env.NEXT_PUBLIC_WP_BASE_URL}${mainImg}`
        : undefined;

    return (
        <section
            className="relative flex min-h-screen h-screen w-full items-center bg-cover bg-bottom bg-no-repeat overflow-hidden"
            style={{
                backgroundImage: bgUrl ? `url(${bgUrl})` : undefined,
            }}
        >
            <div className="layout-wrapper h-screen flex relative z-10">
                {/* Left column: title, subtitle, description, anchor */}
                <div className="col-span-8 flex flex-col justify-center text-left gap-4 z-40">
                    <span className="w-full md:w-3/4 font-archivo uppercase hero-title font-black drop-shadow-lg text-gradient-starbright text-center md:text-left">
                        {title}
                    </span>

                    {subHeading && (
                        <h2 className="font-bold mt-4 hero-subtitle text-neutral-softest drop-shadow-md tracking-wide text-center md:text-left">
                            {subHeading}
                        </h2>
                    )}

                    {description && (
                        <div
                            className="mt-6 text-lg text-gray-100 max-w-3xl text-center md:text-left"
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
                                I want some knowledge
                            </Link>
                        </div>
                    )}
                </div>

                {/* Right column: hero image */}
                {mainImgUrl && (
                    <div className="flex justify-center items-center">
                        <Image
                            src={mainImgUrl}
                            alt={title ?? "Blog hero image"}
                            width={800}
                            height={600}
                            className="absolute max-h-[80vh] object-contain right-[-10px]"
                            style={{ bottom: "2px" }}
                            priority
                        />
                    </div>
                )}
            </div>
        </section>
    );
}

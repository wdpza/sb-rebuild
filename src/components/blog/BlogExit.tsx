export default function BlogExit(blogOptions : any) {

    if (!blogOptions) {
        return null; // Return null safely if there's no data
    }

    const blogExit = blogOptions.blogOptions.exitSection;
    const cleanUrl = blogExit.ctaLink?.url
        ? blogExit.ctaLink?.url.replace(/^https?:\/\/[^/]+/, "")
        : null;

    return (
        <div
            className="relative py-24 bg-cover bg-center"
            style={{
                backgroundImage: blogExit.backgroundImage.node.mediaItemUrl ? `url(${blogExit.backgroundImage.node.mediaItemUrl})` : undefined,
            }}
        >
            <div className="absolute inset-0 bg-[#28262C]/80"></div>
            <div className="relative z-10 w-full max-w-[1200px] mx-auto flex flex-col items-center justify-center text-center text-neutral-softest px-6">
                <h2 className="uppercase exit-title font-bold mb-8">
                    {blogExit.title ?? null}
                </h2>
                <a href={` ${cleanUrl ?? null} `} target={` ${blogExit.ctaLink?.target ?? null} `} className="inline-flex items-center justify-center rounded-md px-8 py-3 font-semibold text-neutral-softest gradient-border mt-4">
                    { blogExit.ctaLink?.title ?? null }
                </a>
            </div>
        </div>
    );
}

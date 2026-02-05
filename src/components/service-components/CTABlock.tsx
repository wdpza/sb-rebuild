import Link from "next/link";

export default function CTABlock({heading, buttonGroup, slug}: any) {
    const {ctaLabel, ctaLink} = buttonGroup || {};
    
    return (
        <section className="bg-neutral-strongest py-14">
            <div className="layout-wrapper mx-auto text-center">
                {heading && (
                    <h2 className="text-3xl md:text-4xl font-archivo font-semibold text-neutral-softest mb-8 drop-shadow-lg">
                        {heading}
                    </h2>
                )}

                {ctaLink && ctaLink.nodes && ctaLink.nodes.length > 0 && (
                    <Link
                        href={`${ctaLink.nodes[0].uri}${slug ? `?service=${slug}` : ''}`}
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
                        {ctaLabel}
                    </Link>
                )}
            </div>
        </section>
    )
}
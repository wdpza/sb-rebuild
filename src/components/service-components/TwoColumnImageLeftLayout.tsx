import Image from "next/image";

export default function TwoColumnImageLeftLayout({image, rightColumn, backgroundImage}: any) {

    const base_url = process.env.NEXT_PUBLIC_WP_BASE_URL || '';
    const backgroundUrl = backgroundImage?.node?.filePath || null;

    return (
        <div className="bg-sb-black" style={{
            backgroundImage: backgroundUrl ? `url(${base_url}${backgroundUrl})` : undefined,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        }}>
            <div className="layout-wrapper">
                {/* Two column image left layout */}
                <div className="grid grid-cols-1 md:grid-cols-16 gap-6 md:gap-12 py-12 md:py-24 items-center">
                    {/* Left: Image */}
                    <div className="col-span-1 md:col-span-9">
                        {image?.node?.filePath && (
                            <Image
                                src={`${base_url}${image.node.filePath}`}
                                alt={image.node.altText || "Two Column Image Left"}
                                width={900}
                                height={700}
                                className="w-full h-auto rounded-lg object-cover"
                            />
                        )}
                    </div>

                    {/* Right: Text Content */}
                    <div className="col-span-1 md:col-span-7 space-y-6">
                        {rightColumn?.heading && (
                            <h2 className="subtitle font-bold text-neutral-softest">
                                {rightColumn.heading}
                            </h2>
                        )}

                        {rightColumn?.subHeading && (
                            <h3 className="text-2xl font-semibold text-neutral-soft">
                                {rightColumn.subHeading}
                            </h3>
                        )}

                        {rightColumn?.content && (
                            <div
                                className="text-neutral-softer"
                                dangerouslySetInnerHTML={{ __html: rightColumn.content }}
                            />
                        )}
                    </div>
                </div>

            </div>
        </div>
    )
}
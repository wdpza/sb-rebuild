import Image from "next/image";

export default function TwoColumnImageRightLayout({image, leftColumn}: any) {

    const base_url = process.env.NEXT_PUBLIC_WP_BASE_URL || '';

    return (
        <div className="bg-sb-black">
            <div className="layout-wrapper">

                <div className="grid grid-cols-1 md:grid-cols-16 gap-6 md:gap-12 py-12 md:py-24 items-center">

                    <div className="col-span-1 md:col-span-7 space-y-6">
                        {leftColumn?.heading && (
                            <h2 className="text-4xl font-bold text-neutral-softest">
                                {leftColumn.heading}
                            </h2>
                        )}

                        {leftColumn?.subHeading && (
                            <h3 className="text-2xl font-semibold text-neutral-soft">
                                {leftColumn.subHeading}
                            </h3>
                        )}

                        {leftColumn?.content && (
                            <div
                                className="text-neutral-softest"
                                dangerouslySetInnerHTML={{ __html: leftColumn.content }}
                            />
                        )}
                    </div>

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
                </div>

            </div>
        </div>
    )
}
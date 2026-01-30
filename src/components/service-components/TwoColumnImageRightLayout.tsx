"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function TwoColumnImageRightLayout({image, leftColumn, backgroundImage}: any) {
    
    const base_url = process.env.NEXT_PUBLIC_WP_BASE_URL || '';
    const backgroundUrl = backgroundImage?.node?.filePath || null;

    return (
        <div className="bg-sb-black" style={{
            backgroundImage: backgroundUrl ? `url(${base_url}${backgroundUrl})` : undefined,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        }}>
            <div className="layout-wrapper">

                <div className="grid grid-cols-1 md:grid-cols-16 gap-6 md:gap-12 py-12 md:py-24 items-center">

                    <div className="col-span-1 md:col-span-7 space-y-6 order-2 md:order-1">
                        {leftColumn?.heading && (
                            <h2 className="subtitle font-bold text-neutral-softest">
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

                    <motion.div 
                        className="col-span-1 md:col-span-9 order-1 md:order-2"
                        initial={{ opacity: 0, x: 100 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        {image?.node?.filePath && (
                            <Image
                                src={`${base_url}${image.node.filePath}`}
                                alt={image.node.altText || "Two Column Image Left"}
                                width={900}
                                height={700}
                                className="w-full h-auto rounded-lg object-cover"
                            />
                        )}
                    </motion.div>
                </div>

            </div>
        </div>
    )
}
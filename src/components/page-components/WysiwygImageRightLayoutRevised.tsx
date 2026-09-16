"use client";

import DOMPurify from "isomorphic-dompurify";
import { motion } from "framer-motion";
import Image from "next/image";

type MediaNode = { mediaItemUrl?: string | null; altText?: string | null };
type Media = { node?: MediaNode | null };

type Props = {
    title?: string | null;
    description?: string | null;
    backgroundImage?: Media | null;
    image?: Media | null;
};

export default function WysiwygImageRightLayoutRevised({ title, description, backgroundImage, image }: Props) {
    const backgroundSrc = backgroundImage?.node?.mediaItemUrl;
    const imageSrc = image?.node?.mediaItemUrl;

    return (
        <section className="relative min-h-[500px] overflow-hidden bg-[#171717] text-white">
            {backgroundSrc && (
                <Image src={backgroundSrc} alt="" fill priority sizes="100vw" className="pointer-events-none object-cover object-center" aria-hidden="true" />
            )}

            <div className="relative mx-auto grid min-h-[500px] w-full max-w-[1400px] grid-cols-1 lg:grid-cols-2">
                <motion.div
                    className="z-10 flex items-center px-5 py-14 sm:px-8 lg:px-0 lg:pr-14"
                    initial={{ opacity: 0, x: -32 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ duration: 0.65, ease: "easeOut" }}
                >
                    <div className="w-full">
                        {title && (
                            <div
                                className="mb-8 text-[28px] font-bold leading-[1.18] text-white md:text-[34px] [&_p]:m-0 [&_b]:bg-[linear-gradient(90deg,#4389f5_0%,#7657dc_48%,#c02aa0_100%)] [&_b]:bg-clip-text [&_b]:text-transparent [&_b]:[-webkit-text-fill-color:transparent] [&_strong]:bg-[linear-gradient(90deg,#4389f5_0%,#7657dc_48%,#c02aa0_100%)] [&_strong]:bg-clip-text [&_strong]:text-transparent [&_strong]:[-webkit-text-fill-color:transparent]"
                                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(title) }}
                            />
                        )}

                        {description && (
                            <div
                                className="prose prose-invert max-w-none text-[16px] leading-[1.55] text-white prose-p:mb-5 prose-p:text-[16px] prose-p:leading-[1.55] prose-p:text-white"
                                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(description) }}
                            />
                        )}
                    </div>
                </motion.div>

                {imageSrc && (
                    <motion.div
                        className="relative hidden min-h-[500px] lg:block"
                        initial={{ opacity: 0, x: 55 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.75, ease: "easeOut" }}
                    >
                        <Image
                            src={imageSrc}
                            alt={image?.node?.altText || ""}
                            fill
                            priority
                            sizes="(max-width: 1023px) 100vw, 528px"
                            className="object-cover object-center"
                        />
                    </motion.div>
                )}
            </div>
        </section>
    );
}

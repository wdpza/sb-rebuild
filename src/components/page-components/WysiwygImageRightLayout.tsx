"use client";

import Link from "next/link";
import Image from "next/image";
import DOMPurify from "isomorphic-dompurify";
import { motion } from "framer-motion";

type MediaNode = {
	mediaItemUrl?: string | null;
	altText?: string | null;
};

type CTA = {
  url?: string;
  title?: string;
  target?: string; // '_blank' | '_self' | etc.
};

interface WysiwygImageRightLayoutProps {
	editorContent?: string | null; // may contain HTML
	image?: { node?: MediaNode | null } | null;
	ctaOptional?: CTA | null;
}

export default function WysiwygImageRightLayout({
	editorContent,
	image,
	ctaOptional,
}: WysiwygImageRightLayoutProps) {
	const src = image?.node?.mediaItemUrl ?? "";
	const alt = image?.node?.altText ?? "Image";

    const cleanUrl = ctaOptional?.url
        ? ctaOptional.url.replace(/^https?:\/\/[^/]+/, "")
        : null;

	return (
		<section className="relative py-20 bg-[#171717]">
            <div className="flex flex-col layout-wrapper mx-auto">
                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-6 layout-wrapper ml-auto">
                    <div>
                        <div
                            className="wysiwyg-image-content text-lg text-neutral-softest prose prose-invert max-w-none"
                            dangerouslySetInnerHTML={{
                                __html: DOMPurify.sanitize(editorContent ?? ""),
                            }}
                        />
                        {cleanUrl && (
                            <Link
                                href={cleanUrl}
                                target={ctaOptional?.target ?? "_self"}
                                className="inline-flex items-center justify-center rounded-md px-8 py-3 font-semibold text-neutral-softest gradient-border mt-8"
                                >
                                {ctaOptional?.title ?? "Learn More"}
                            </Link>
                        )}
                    </div>
                    <div className="self-start lg:sticky lg:top-32">
						<motion.div 
							className="col-span-1 md:col-span-9 order-1 md:order-2"
							initial={{ opacity: 0, x: 100 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true, amount: 0.3 }}
							transition={{ duration: 0.8, ease: "easeOut" }}
						>
							<Image
								src={src}
								alt={alt}
								width={900}
								height={700}
								className="w-full h-auto rounded-lg object-cover"
							/>
						</motion.div>
                    </div>
                </div>
            </div>
		</section>
	);
}

"use client";

import Image from "next/image";
import DOMPurify from "isomorphic-dompurify";

type MediaNode = {
  mediaItemUrl?: string | null;
  altText?: string | null;
};

interface PortfolioTabsLayoutProps {
  title?: string | null;
  description?: string | null; // may contain HTML
  image?: { node?: MediaNode | null } | null;
  backgroundImage?: { node?: MediaNode | null } | null;
}

export default function PortfolioTabsLayout({
  description,
  image,
  title,
  backgroundImage,
}: PortfolioTabsLayoutProps) {
  const src = image?.node?.mediaItemUrl ?? "";
  const alt = image?.node?.altText ?? title ?? "Image";

  const bgUrl = backgroundImage?.node?.mediaItemUrl ?? "";

  return (
    <section
        className="py-20 bg-[#171717] bg-no-repeat px-8"
        style={{
            backgroundImage: bgUrl ? `url(${bgUrl})` : undefined,
            backgroundSize: "auto 100%",
            backgroundPosition: "bottom right",
        }}
    >
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-[1600px] ml-auto items-center">
      {/* Left: text */}
      <div>
        {title ? (
          <h2 className="uppercase text-[55px]/15 lg:text-[55px]/20 font-bold">
            <span className="text-gradient-starbright">
              {title}
            </span>
          </h2>
        ) : null}

        <div
          className="right-text-section mt-6 text-lg text-neutral-softest prose prose-invert max-w-none"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(description ?? ""),
          }}
        />
      </div>

      {/* Right: image */}
      <div className="-mr-8 -mb-25">
        <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden">
          {src ? (
            <Image
              src={src}
              alt={alt}
              fill
              sizes="(min-width:1024px) 40vw, 90vw"
              className="object-cover"
              priority={false}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-neutral-softest/60 text-sm bg-black/20">
              No image
            </div>
          )}
        </div>
      </div>

      {/* Styled-JSX: style headings inside the rich-text block */}
      <style jsx>{`
        .right-text-section :global(h3) {
          font-weight: 700;
          margin-top: 1rem;
          margin-bottom: 1rem;
          background: linear-gradient(90deg, #6ee7f9, #a855f7, #f59e0b);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        .right-text-section :global(p) {
          margin-top: 1rem;
          margin-bottom: 1rem;
        }
      `}</style>
      </div>
    </section>
  );
}

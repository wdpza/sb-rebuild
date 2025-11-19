"use client";
import { useEffect, useState } from "react";
import DOMPurify from "isomorphic-dompurify";

export default function RightImageSectionVideo({ description, title, video, image }: any) {
  const [showVideo, setShowVideo] = useState(false);
  const [safeVideoHTML, setSafeVideoHTML] = useState("");

useEffect(() => {
  if (video) {
    // Add autoplay to the YouTube src if it's not already there
    const autoPlayVideo = video.replace(
      /src="([^"]+)"/,
      (match: any, src: any) =>
        `src="${
          src.includes("?") ? `${src}&autoplay=1` : `${src}?autoplay=1`
        }"`
    );

    const clean = DOMPurify.sanitize(autoPlayVideo, {
      ADD_TAGS: ["iframe"],
      ADD_ATTR: [
        "allow",
        "allowfullscreen",
        "frameborder",
        "referrerpolicy",
        "src",
        "title",
        "width",
        "height",
      ],
    });

    setSafeVideoHTML(clean);
  }
}, [video]);

  return (
    <section className="relative py-12 flex w-full items-center bg-[#28262C] overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-[1600px] mx-auto w-full items-center">
        {/* Left Section */}
        <div className="flex flex-col justify-center items-center lg:items-start text-center lg:text-left px-6">
          <h2 className="text-[40px] font-bold text-neutral-softest mb-4">{title}</h2>
          <div className="whitespace-pre-wrap text-neutral-softest">{description}</div>
        </div>

        {/* Right Section */}
        <div className="flex justify-center items-center relative px-6 w-full">
          {!showVideo && (
            <img
              src={image?.node?.mediaItemUrl}
              alt={image?.node?.altText || ""}
              className="cursor-pointer max-w-full rounded-lg shadow-lg transition-all duration-300 hover:opacity-90"
              onClick={() => setShowVideo(true)}
            />
          )}

          {showVideo && safeVideoHTML && (
            <div
              className="w-full max-w-[800px] aspect-video"
              dangerouslySetInnerHTML={{ __html: safeVideoHTML }}
            />
          )}
        </div>
      </div>
    </section>
  );
}

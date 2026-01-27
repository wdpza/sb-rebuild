"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown, ChevronUp } from "lucide-react"; // Importing Lucide React icons

type Item = {
  title: string;
  description: string;
};

export default function FaqLayout({ introTitle, image, item, backgroundImage, layout }: any) {
  const bgUrl = backgroundImage?.node?.mediaItemUrl ?? null;
  const img = image?.node?.mediaItemUrl ?? null;
  const alt = image?.node?.altText ?? null;
  const layoutType = layout[0] ?? "center"; {/* Possible values: "center" (no image), "left" (with image) */}

  // Set the first item to be open by default
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const toggleItem = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div
      className="relative py-20 bg-cover bg-center"
      style={{
        backgroundImage: bgUrl ? `url(${bgUrl})` : undefined,
      }}
    >
      <div className={`grid grid-cols-1 gap-12 layout-wrapper mx-auto ${layoutType === "center" ? "justify-center" : "md:grid-cols-2"}`}>
        {/* FAQ Items */}
        <div className={`flex flex-col justify-center ${layoutType === "center" ? "items-center text-center" : "items-start text-left" }`}>
          <h2 className="text-neutral-softest subtitle font-bold mb-8 leading-snug text-center md:text-left">{introTitle}</h2>
          <div className={`relative z-1 space-y-2 ${layoutType === "center" ? "md:w-2/3" : "" }`}>
            {item.map((item: Item, index: number) => (
              <div key={index} className="rounded space-y-2">
                <button
                    className={`cursor-pointer bg-[#252328] text-[#5F5F5F] w-full text-left px-6 py-4 text-lg font-semibold rounded focus:outline-none focus:ring-2 focus:ring-blue-500 flex justify-between items-center ${
                        activeIndex === index ? "text-neutral-softest-important" : ""
                    }`}
                    onClick={() => toggleItem(index)}
                >
                  <span>{item.title}</span>
                  <span className="text-xl text-neutral-softest">
                    {activeIndex === index ? (
                      <ChevronUp size={20} />
                    ) : (
                      <ChevronDown size={20} />
                    )}
                  </span>
                </button>
                {/* Smooth Transition for Description */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    activeIndex === index ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-6 py-4 text-neutral-softest bg-[#49474D] rounded text-left">
                    {item.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column - Image */}
        {layoutType === "left" && img && (
          <div className={`hidden md:block absolute right-[30px] bottom-0 z-0 ${layoutType === "center" ? "hidden" : ""}`}>
            <Image
              src={img}
              alt={alt}
              width={700}
              height={700}
              className="w-full max-w-[700px] max-h-[700px] h-auto object-contain"
              loading="lazy"
            />
          </div>
        )}
      </div>
    </div>
  );
}

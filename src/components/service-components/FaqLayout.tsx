"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown, ChevronUp } from "lucide-react"; // Importing Lucide React icons

type Item = {
  title: string;
  description: string;
};

export default function FaqLayout({ introTitle, image, item, backgroundImage }: any) {
  const bgUrl = backgroundImage?.node?.mediaItemUrl ?? null;
  const img = image?.node?.mediaItemUrl ?? null;
  const alt = image?.node?.altText ?? null;

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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 layout-wrapper mx-auto">
        {/* Left Column - FAQ Items */}
        <div className="flex flex-col justify-center z-4">
          <h2 className="text-neutral-softest subtitle font-bold mb-8 leading-snug text-center md:text-left">{introTitle}</h2>
          <div className="space-y-2">
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
                  <div className="px-6 py-4 text-neutral-softest bg-[#49474D] rounded">
                    {item.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column - Image */}
        <div className="relative flex justify-center items-end min-h-[380px] -mb-24">
          <Image
            src={img}
            alt={alt}
            width={700}
            height={700}
            className="absolute left-0 bottom-0 w-full max-w-[700px] max-h-[700px] h-auto object-contain"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
}

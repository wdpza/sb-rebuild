"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react"; // Importing Lucide React icons

type Item = {
  title: string;
  description: string;
};

export default function FaqLayout({ introTitle, image, item, backgroundImage }: any) {
  const bgUrl = backgroundImage?.node?.mediaItemUrl ?? null;
  const img = image?.node?.mediaItemUrl ?? null;
  const alt = image?.node?.altText ?? null;

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div
      className="relative py-24 bg-cover bg-center"
      style={{
        backgroundImage: bgUrl ? `url(${bgUrl})` : undefined,
      }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[1200px] mx-auto">
        {/* Left Column - FAQ Items */}
        <div className="flex flex-col justify-center">
          <h2 className="text-white text-[45px] font-bold mb-8">{introTitle}</h2>
          <div className="space-y-2">
            {item.map((item: Item, index: number) => (
              <div key={index} className="rounded space-y-2">
                <button
                    className={`bg-[#252328] text-[#5F5F5F] w-full text-left px-6 py-4 text-lg font-semibold rounded focus:outline-none focus:ring-2 focus:ring-blue-500 flex justify-between items-center ${
                        activeIndex === index ? "text-white-important" : ""
                    }`}
                    onClick={() => toggleItem(index)}
                >
                  <span>{item.title}</span>
                  <span className="text-xl text-white">
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
                  <div className="px-6 py-4 text-white bg-[#49474D] rounded">
                    {item.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column - Image */}
        <div className="flex justify-center items-center -mb-24">
          <img
            src={img}
            alt={alt}
            className="rounded-lg shadow-lg object-cover w-full h-auto max-w-md self-end"
          />
        </div>
      </div>
    </div>
  );
}

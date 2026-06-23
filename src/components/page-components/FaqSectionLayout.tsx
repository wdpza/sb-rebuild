"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

type FaqItem = {
  title?: string | null;
  description?: string | null;
};

type Props = {
  introTitle?: string | null;
  item?: FaqItem[] | null;
};

export default function FaqSectionLayout({ introTitle, item }: Props) {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const toggleItem = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  if (!item?.length) return null;

  return (
    <div className="relative">
      <div className="flex flex-col items-center text-center layout-wrapper py-12 md:py-24 mx-auto">
        {introTitle && (
          <h2 className="text-neutral-softest subtitle font-bold mb-8 leading-snug">
            {introTitle}
          </h2>
        )}

        <div className="w-full md:w-2/3 space-y-2">
          {item.map((faq, index) => (
            <div key={index} className="rounded space-y-2">
              <button
                className={`text-neutral-softer cursor-pointer bg-sb-black/80 w-full text-left px-6 py-4 text-lg font-semibold rounded focus:outline-none focus:ring-2 focus:ring-blue-500 flex justify-between items-center ${activeIndex === index ? "text-neutral-softest-important" : ""}`}
                onClick={() => toggleItem(index)}
              >
                <span>{faq.title}</span>
                <span className="text-xl text-neutral-softest">
                  {activeIndex === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </span>
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${activeIndex === index ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"}`}
              >
                <div className="px-6 py-4 text-neutral-softest bg-[#49474D] rounded text-left">
                  {faq.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

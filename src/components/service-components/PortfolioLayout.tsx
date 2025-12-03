"use client";

import { useState } from 'react';
import Image from "next/image";

export default function PortfolioLayout({ title, portfolioItems }: any) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState<string | null>(null);

  const handleImageClick = (url: string) => {
    setCurrentImage(url);
    setIsOpen(true);
  };

  const handleClosePopup = () => {
    setIsOpen(false);
    setCurrentImage(null);
  };

  return (
    <div className="relative py-20 bg-cover bg-center bg-[#28262C]">
      <div className="layout-wrapper mx-auto w-full">
      <h2 className="subtitle font-bold mb-12 text-neutral-softest text-center">
        {title ?? null}
      </h2>

      {/* Masonry-like layout using CSS columns */}
      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6">
        {portfolioItems?.nodes?.map((item: any, index: number) => (
          <div
            key={index}
            className="relative group mb-6 cursor-pointer"
            onClick={() => handleImageClick(item.mediaItemUrl)}
          >
            <Image
              src={item.mediaItemUrl}
              alt={item.altText || `Portfolio Item ${index + 1}`}
              width={600}
              height={400}
              className="w-full h-auto object-cover rounded-lg shadow-lg transition-transform duration-300 ease-in-out transform group-hover:scale-105"
              loading="lazy"
            />
          </div>
        ))}
      </div>

      {/* Popup Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-popup bg-opacity-50 flex justify-center items-center z-50">
          <div className="relative p-6 bg-[#171717] rounded-lg">
            <button
              onClick={handleClosePopup}
              className="absolute top-0 right-0 m-4 text-2xl text-neutral-softest hover:text-neutral-softest cursor-pointer"
            >
              ×  
            </button>
            <Image
              src={currentImage ?? ''}
              alt="Large View"
              width={1200}
              height={800}
              className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
            />
          </div>
        </div>
      )}
      </div>
    </div>
  );
}

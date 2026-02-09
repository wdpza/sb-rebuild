"use client";

import { useState } from "react";
import Image from "next/image";

export default function PortfolioMasonry({ items }: any) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<any>(null);

  const handleImageClick = (item: any) => {
    setCurrentItem(item);
    setIsOpen(true);
  };

  const handleClosePopup = () => {
    setIsOpen(false);
    setCurrentItem(null);
  };

  return (
    <div>
      {/* Masonry-like layout */}
      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6 px-8">
        {items?.map((item: any, index: number) => (
          <div
            key={index}
            className="relative group mb-6 cursor-pointer"
            onClick={() => handleImageClick(item)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleImageClick(item);
              }
            }}
            role="button"
            tabIndex={0}
            aria-label={`View ${item.portfolioFields.sliderImageMain.node.altText || `portfolio item ${index + 1}`} in full size`}
          >
            <Image
              src={item.portfolioFields.sliderImageMain.node.mediaItemUrl}
              alt={
                item.portfolioFields.sliderImageMain.node.altText ||
                `Portfolio Item ${index + 1}`
              }
              width={600}
              height={400}
              className="w-full h-auto object-cover rounded-lg shadow-lg transition-transform duration-300 ease-in-out transform group-hover:scale-105"
              loading="lazy"
            />
          </div>
        ))}
      </div>

      {/* Popup Modal */}
      {isOpen && currentItem && (
        <div className="fixed inset-0 bg-popup flex justify-center items-center z-50 p-4">
          <div
            className="
              relative
              flex
              bg-[#171717]
              rounded-lg
              overflow-hidden
              shadow-2xl
              max-h-[90vh]
              max-w-fit
              p-3
            "
          >
            <button
              onClick={handleClosePopup}
              className="absolute top-2 right-4 text-3xl text-neutral-softest hover:text-neutral-softest z-10 cursor-pointer"
            >
              ×
            </button>

            {/* Main + Side Images */}
            <div className="flex gap-3 items-stretch justify-center">
              {/* Main Image */}
              {currentItem.portfolioFields?.sliderImageMain?.node
                ?.mediaItemUrl && (
                <div className="rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={
                      currentItem.portfolioFields.sliderImageMain.node
                        .mediaItemUrl
                    }
                    alt={`${currentItem.title} main image`}
                    width={800}
                    height={600}
                    className="h-auto max-h-[90vh] w-auto object-cover rounded-lg"
                  />
                </div>
              )}

              {/* Side Images */}
              {(currentItem.portfolioFields?.sliderImageSlide1?.node
                ?.mediaItemUrl ||
                currentItem.portfolioFields?.sliderImageSlide2?.node
                  ?.mediaItemUrl) && (
                <div className="hidden md:flex flex-col gap-3 rounded-lg overflow-hidden h-full justify-stretch">
                  {currentItem.portfolioFields.sliderImageSlide1?.node
                    ?.mediaItemUrl && (
                    <div className="flex-1 rounded-lg overflow-hidden">
                      <Image
                        src={
                          currentItem.portfolioFields.sliderImageSlide1.node
                            .mediaItemUrl
                        }
                        alt={`${currentItem.title} side image 1`}
                        width={250}
                        height={200}
                        className="object-cover w-full h-full max-h-[44vh] rounded-lg"
                      />
                    </div>
                  )}
                  {currentItem.portfolioFields.sliderImageSlide2?.node
                    ?.mediaItemUrl && (
                    <div className="flex-1 rounded-lg overflow-hidden">
                      <Image
                        src={
                          currentItem.portfolioFields.sliderImageSlide2.node
                            .mediaItemUrl
                        }
                        alt={`${currentItem.title} side image 2`}
                        width={250}
                        height={200}
                        className="object-cover w-full h-full max-h-[44vh] rounded-lg"
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

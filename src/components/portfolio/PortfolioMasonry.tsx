"use client";

import { useState } from 'react';

export default function PortfolioMasonry({ items }: any) {

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
            <div>
                {/* Masonry-like layout using CSS columns */}
                <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6 px-8">
                    {items?.map((item: any, index: number) => (
                    <div
                        key={index}
                        className="relative group mb-6 cursor-pointer"
                        onClick={() => handleImageClick(item.portfolioFields.sliderImageMain.node.mediaItemUrl)}
                    >
                        <img
                        src={item.portfolioFields.sliderImageMain.node.mediaItemUrl}
                        alt={item.portfolioFields.sliderImageMain.node.altText || `Portfolio Item ${index + 1}`}
                        className="w-full h-auto object-cover rounded-lg shadow-lg transition-transform duration-300 ease-in-out transform group-hover:scale-105"
                        />
                    </div>
                    ))}
                </div>

                {/* Popup Modal */}
                {isOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="relative max-w-4xl w-full p-6 bg-white rounded-lg">
                        <button
                        onClick={handleClosePopup}
                        className="absolute top-0 right-0 m-4 text-2xl text-gray-600 hover:text-black cursor-pointer"
                        >
                        ×
                        </button>
                        <img
                        src={currentImage ?? ''}
                        alt="Large View"
                        className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
                        />
                    </div>
                    </div>
                )}
            </div>
    );

}
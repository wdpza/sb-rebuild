import React from 'react';

export default function GoogleReviewBoosterLayout({ features, image }: any) {

    // Basic check to prevent errors if props are missing or incomplete
    if (!features || features.length < 4 || !image || !image.node) {
        console.error("Incomplete props for GoogleReviewBoosterLayout");
        // On a real component, you might return null or a loading state
        return null; 
    }

    return (
        <section className="relative py-12 flex w-full items-center bg-[#28262C] overflow-hidden text-white">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-[1600px] mx-auto w-full items-center px-4 md:px-8">

                {/* --- Column 1: Left Features (Items 1 & 2) --- */}
                <div className="flex flex-col gap-y-8 lg:text-left">
                    {/* Feature 1 */}
                    <div>
                        <h3 className="text-[30px] font-semibold text-white">{features[0].title}</h3>
                        <p className="mt-1 text-gray-300 mb-4">{features[0].description}</p>
                    </div>
                    {/* Feature 2 */}
                    <div>
                        <h3 className="text-[30px] font-semibold text-white mt-4">{features[1].title}</h3>
                        <p className="mt-1 text-gray-300">{features[1].description}</p>
                    </div>
                </div>

                {/* --- Column 2: Middle Image --- */}
                <div className="flex justify-center py-8 lg:py-0"> {/* Added padding for stacked mobile view */}
                    <img
                        src={image.node.mediaItemUrl}
                        alt={image.node.altText || 'Google Review Booster Feature'}
                        className="w-full max-w-xs md:max-w-sm h-auto object-contain" // Constrained image size
                    />
                </div>

                {/* --- Column 3: Right Features (Items 3 & 4) --- */}
                <div className="flex flex-col gap-y-8 lg:text-left">
                    {/* Feature 3 */}
                    <div>
                        <h3 className="text-[30px] font-semibold text-white">{features[2].title}</h3>
                        <p className="mt-1 text-gray-300 mb-4">{features[2].description}</p>
                    </div>
                    {/* Feature 4 */}
                    <div>
                        <h3 className="text-[30px] font-semibold text-white mt-4">{features[3].title}</h3>
                        <p className="mt-1 text-gray-300">{features[3].description}</p>
                    </div>
                </div>

            </div>
        </section>
    );
}
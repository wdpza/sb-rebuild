import React from "react";
import CaseStudiesCard from "./CaseStudiesCard";

const shuffleArray = (array: any[]) => {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

export default function CaseStudiesMore({ items, current }: { items: any, current: any }) {

  const shuffledItems = shuffleArray(items)
    .filter((item: any) => item.slug !== current.slug)
    .slice(0, 4); 

  return (
    <div className="bg-[#28262C]">
        <div className="layout-wrapper py-12">
            <h2 className="subtitle font-bold text-gradient-starbright mb-8 inline-block">More Case Studies</h2>
            <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 text-center">
            {shuffledItems?.map((item) => (
                <CaseStudiesCard key={item.slug} item={item} />
            ))}
            </section>
        </div>
    </div>
  );
}

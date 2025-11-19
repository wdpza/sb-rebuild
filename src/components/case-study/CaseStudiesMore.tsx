import React from "react";
import Image from "next/image";
import Link from "next/link";

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
    .slice(0, 5); 

  return (
    <div className="bg-[#28262C]">
        <div className="w-full max-w-[1600px] mx-auto px-12 py-16">
            <h2 className="text-[32px] text-neutral-softest mb-4">More Case Studies</h2>
            <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 text-center">
            {shuffledItems?.map((item) => {
                const logoUrl = item.caseStudies?.headerLogo?.node?.mediaItemUrl ?? item.caseStudies?.headerImage?.node?.mediaItemUrl;
                const logoAlt = item.caseStudies?.headerLogo?.node?.altText || item.caseStudies?.headerImage?.node?.altText || `${item.title} logo`;

                return (
                <article
                    key={item.slug}
                    className="relative flex min-h-[500px] flex-col items-center justify-center rounded-2xl bg-[#1D1D1D] p-8 shadow-sm transition hover:shadow-md"
                >
                    <div className="mb-6 flex items-center justify-center">
                        <Link
                        href={`/case-study/${item.slug}`}
                        aria-label={`View case study: ${item.title}`}
                        >
                            <Image
                            src={logoUrl}
                            alt={logoAlt}
                            width={220}
                            height={80}
                            className="h-auto w-auto max-h-20 object-contain"
                            />
                        </Link>
                    </div>
                    {/* Subtle frame accent */}
                    <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/5" />
                </article>
                );
            })}
            </section>
        </div>
    </div>
  );
}

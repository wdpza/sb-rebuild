import Image from "next/image";
import Link from "next/link";
import { getCaseStudyItems } from "@/lib/graphql/queries/getCaseStudyItems";

type CaseStudyItem = {
  title: string;
  slug: string;
  caseStudies?: {
    headerLogo?: { node?: { altText?: string; mediaItemUrl: string } } | null;
    headerImage?: { node?: { altText?: string; mediaItemUrl: string } } | null;
  };
  terms?: { nodes?: { name: string; id: string }[] };
};

export default async function CaseStudiesLayout({
  numberOfItems,
  title,
}: {
  numberOfItems?: number;
  title?: string;
}) {
  const items: CaseStudyItem[] = await getCaseStudyItems(numberOfItems);

  return (
    <div className="w-full bg-[#171717]">
      <div className={`mx-auto max-w-[1600px] py-12 px-6 ${title}`}>

        {/* 4 columns on large screens, graceful fallbacks below */}
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 text-center">
          {items?.map((item) => {
            const logoUrl =
              item.caseStudies?.headerLogo?.node?.mediaItemUrl ??
              item.caseStudies?.headerImage?.node?.mediaItemUrl;

            const logoAlt =
              item.caseStudies?.headerLogo?.node?.altText ||
              item.caseStudies?.headerImage?.node?.altText ||
              `${item.title} logo`;

            const categories =
              item.terms?.nodes?.map((n) => n.name).join(" | ") ||
              "Uncategorised";

            return (
              <article
                key={item.slug}
                className="relative flex min-h-[500px] flex-col items-center justify-center rounded-2xl bg-[#1D1D1D] p-8 shadow-sm transition hover:shadow-md"
              >
                {/* Logo */}
                <div className="mb-6 flex items-center justify-center">
                  {logoUrl ? (
                    <Image
                      src={logoUrl}
                      alt={logoAlt}
                      width={220}
                      height={80}
                      className="h-auto w-auto max-h-20 object-contain"
                    />
                  ) : (
                    <div className="flex h-20 w-52 items-center justify-center rounded-lg bg-white/5 text-white/60">
                      <span className="px-2 text-sm">{item.title}</span>
                    </div>
                  )}
                </div>

                {/* Categories */}
                <p className="mb-8 text-sm font-medium tracking-wide text-white">
                  {categories}
                </p>

                {/* Button */}
                <Link
                  href={`/case-study/${item.slug}`}
                  aria-label={`View case study: ${item.title}`}
                  className="inline-flex items-center justify-center rounded-md px-8 py-3 font-semibold text-white gradient-border mt-0"
                >
                  View Case Study
                </Link>

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
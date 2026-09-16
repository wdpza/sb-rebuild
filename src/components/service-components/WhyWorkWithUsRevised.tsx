"use client";

import DOMPurify from "isomorphic-dompurify";
import Link from "next/link";

type CtaLink = { title?: string | null; target?: string | null; url?: string | null };
type Item = { title?: string | null; description?: string | null; ctaLink?: CtaLink | null };
type Props = {
    introTitle?: string | null;
    introText?: string | null;
    item?: Item[] | null;
    columns?: number | string | null;
};

const columnClasses: Record<number, string> = {
    1: "lg:grid-cols-1",
    2: "lg:grid-cols-2",
    3: "lg:grid-cols-3",
    4: "lg:grid-cols-4",
};

function localiseUrl(url: string) {
    return url.replace(/^https?:\/\/[^/]+/, "") || "/";
}

export default function WhyWorkWithUsRevised({ introTitle, introText, item = [], columns = 4 }: Props) {
    const columnCount = Math.min(Math.max(Number.parseInt(String(columns), 10) || 4, 1), 4);

    return (
        <section className="w-full bg-[#28272d] px-5 py-16 text-white lg:py-[70px]">
            <div className="mx-auto w-full max-w-[1400px]">
                {(introTitle || introText) && (
                    <header className="mb-9">
                        {introTitle && (
                            <div
                                className="mb-6 text-[28px] font-bold leading-[1.15] text-white md:text-[32px] [&_p]:m-0 [&_b]:bg-[linear-gradient(90deg,#4389f5_0%,#7657dc_48%,#c02aa0_100%)] [&_b]:bg-clip-text [&_b]:text-transparent [&_b]:[-webkit-text-fill-color:transparent] [&_strong]:bg-[linear-gradient(90deg,#4389f5_0%,#7657dc_48%,#c02aa0_100%)] [&_strong]:bg-clip-text [&_strong]:text-transparent [&_strong]:[-webkit-text-fill-color:transparent]"
                                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(introTitle) }}
                            />
                        )}
                        {introText && (
                            <div
                                className="text-[20px] leading-6 text-white [&_p]:m-0"
                                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(introText) }}
                            />
                        )}
                    </header>
                )}

                {!!item?.length && (
                    <div className={`grid grid-cols-1 gap-6 sm:grid-cols-2 ${columnClasses[columnCount]}`}>
                        {item.map((service, index) => {
                            const url = service.ctaLink?.url;
                            return (
                                <article
                                    key={`${service.title || "service"}-${index}`}
                                    className="flex min-h-[248px] flex-col items-start rounded-[5px] bg-[#4a494f] px-6 py-7 transition duration-200 hover:-translate-y-1 hover:bg-[#535258]"
                                >
                                    <div className="flex-1">
                                        {service.title && <h3 className="mb-4 text-[24px] font-bold leading-[1.25] text-white">{service.title}</h3>}
                                        {service.description && (
                                            <div
                                                className="text-[16px] leading-[1.55] text-white [&_p]:mb-3 [&_p:last-child]:mb-0"
                                                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(service.description) }}
                                            />
                                        )}
                                    </div>

                                    {url && (
                                        <Link
                                            href={localiseUrl(url)}
                                            target={service.ctaLink?.target || "_self"}
                                            rel={service.ctaLink?.target === "_blank" ? "noopener noreferrer" : undefined}
                                            className="mt-5 inline-flex min-h-6 items-center justify-center rounded-[2px] border border-[#c7922d] px-5 py-2 text-[16px] font-medium leading-none text-white no-underline transition-colors hover:bg-[#c7922d]"
                                        >
                                            Explore
                                        </Link>
                                    )}
                                </article>
                            );
                        })}
                    </div>
                )}
            </div>
        </section>
    );
}

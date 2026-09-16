"use client";

import DOMPurify from "isomorphic-dompurify";
import { ArrowLeft, ArrowRight, ExternalLink, Star } from "lucide-react";
import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

type Review = { name: string; displayName: string; profilePhotoUrl: string; rating: number; relativeTime: string; text: string };
type ReviewsData = { reviews: Review[]; averageRating: number; totalCount: number };
type Props = { title?: string | null };

function Stars({ rating, size = 21 }: { rating: number; size?: number }) {
    return (
        <div className="flex items-center gap-1" aria-label={`${rating} out of 5 stars`}>
            {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} size={size} className={star <= Math.round(rating) ? "fill-[#f5ad16] text-[#f5ad16]" : "fill-white text-white"} />
            ))}
        </div>
    );
}

export default function TestimonialsLayoutSection({ title }: Props) {
    const [data, setData] = useState<ReviewsData | null>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [expanded, setExpanded] = useState(false);
    const [canExpand, setCanExpand] = useState(false);
    const reviewTextRef = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        const controller = new AbortController();
        fetch("/api/google-reviews", { signal: controller.signal })
            .then((response) => {
                if (!response.ok) throw new Error("Unable to load testimonials");
                return response.json();
            })
            .then((reviews: ReviewsData) => setData(reviews))
            .catch((error) => {
                if (error instanceof Error && error.name !== "AbortError") setData(null);
            });
        return () => controller.abort();
    }, []);

    const reviews = data?.reviews ?? [];
    const review = reviews[activeIndex];
    const reviewCopy = review
        ? review.text.trim() || `${review.displayName} gave us ${review.rating} stars.`
        : "";

    useLayoutEffect(() => {
        const reviewText = reviewTextRef.current;
        if (!reviewText || expanded) return;

        const checkOverflow = () => {
            setCanExpand(reviewText.scrollHeight > reviewText.clientHeight + 1);
        };

        checkOverflow();
        const resizeObserver = new ResizeObserver(checkOverflow);
        resizeObserver.observe(reviewText);
        return () => resizeObserver.disconnect();
    }, [reviewCopy, expanded]);

    function move(direction: number) {
        if (!reviews.length) return;
        setActiveIndex((current) => (current + direction + reviews.length) % reviews.length);
        setExpanded(false);
    }

    return (
        <section className="bg-[#28272d] px-5 py-16 text-white lg:py-20">
            <div className="mx-auto w-full max-w-[1090px]">
                <div className="mb-10 flex items-center justify-between gap-6">
                    {title && (
                        <div className="text-[32px] font-bold leading-tight text-white md:text-[38px] [&_p]:m-0 [&_b]:text-[#f15d40] [&_strong]:text-[#f15d40]" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(title) }} />
                    )}
                    <div className="flex shrink-0 gap-3">
                        <button type="button" onClick={() => move(-1)} disabled={!review} aria-label="Previous testimonial" className="flex size-12 cursor-pointer items-center justify-center rounded-full border border-white/80 transition-all duration-300 ease-out hover:-translate-x-0.5 hover:scale-105 hover:bg-white hover:text-[#28272d] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-x-0 disabled:hover:scale-100"><ArrowLeft size={24} /></button>
                        <button type="button" onClick={() => move(1)} disabled={!review} aria-label="Next testimonial" className="flex size-12 cursor-pointer items-center justify-center rounded-full border border-white/80 transition-all duration-300 ease-out hover:translate-x-0.5 hover:scale-105 hover:bg-white hover:text-[#28272d] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-x-0 disabled:hover:scale-100"><ArrowRight size={24} /></button>
                    </div>
                </div>

                <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-9">
                    <aside className="flex min-h-[255px] flex-col justify-center rounded-md bg-[#504e53] px-8 py-9 md:px-11">
                        <h3 className="mb-1 text-[27px] font-semibold">Starbright IT Solutions</h3>
                        <div className="mb-5 flex items-center gap-3 text-[22px]"><span aria-hidden="true" className="bg-[conic-gradient(from_-45deg,#4285f4_0_25%,#34a853_0_43%,#fbbc05_0_68%,#ea4335_0_84%,#4285f4_0)] bg-clip-text text-[30px] font-bold leading-none text-transparent">G</span><span>{data ? data.averageRating.toFixed(1) : "4.9"} Google Rating</span></div>
                        <div className="mb-5 flex flex-wrap items-center gap-5">
                            <div className="flex pl-2">
                                {reviews.slice(0, 4).map((item) => item.profilePhotoUrl ? (
                                    <Image key={item.name} src={item.profilePhotoUrl} alt="" width={42} height={42} unoptimized className="-ml-2 size-[42px] rounded-full border-2 border-[#504e53] object-cover" />
                                ) : <span key={item.name} className="-ml-2 flex size-[42px] items-center justify-center rounded-full border-2 border-[#504e53] bg-[#77747b] text-sm">{item.displayName.charAt(0)}</span>)}
                            </div>
                            <Stars rating={data?.averageRating ?? 5} />
                        </div>
                        <a href="https://www.google.com/maps/place/Starbright+Solutions/@-25.8620919,28.2548587,17z/data=!4m8!3m7!1s0x1e9567b2038ef8b5:0x33cb256256ff63c5!8m2!3d-25.8620919!4d28.257439!9m1!1b1!16s%2Fg%2F11_v1dbm0?entry=ttu&amp;g_ep=EgoyMDI2MDkxNC4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noopener noreferrer" className="flex w-fit items-center gap-2 border-b border-white/70 pb-1 text-[14px] text-white">Leave a Review <ExternalLink size={13} /></a>
                    </aside>

                    <article className="flex min-h-[255px] flex-col rounded-md bg-[linear-gradient(120deg,#3ba8f4_0%,#d51f92_52%,#ff781b_88%,#ffc51d_100%)] px-8 py-8 md:px-10">
                        {review ? (
                            <>
                                <div className="mb-5 flex items-center gap-4">
                                    {review.profilePhotoUrl ? <Image src={review.profilePhotoUrl} alt={`${review.displayName}'s profile photo`} width={58} height={58} unoptimized className="size-[58px] rounded-full border-2 border-white object-cover" /> : <span className="flex size-[58px] items-center justify-center rounded-full border-2 border-white bg-[#504e53] text-xl font-bold">{review.displayName.charAt(0)}</span>}
                                    <div className="min-w-0 flex-1">
                                        <h3 className="truncate text-[23px] font-medium">{review.displayName}</h3>
                                        <div className="mt-1 flex items-center justify-between gap-4">
                                            <Stars rating={review.rating} size={16} />
                                            <p className="shrink-0 text-[14px] text-white/80">{review.relativeTime}</p>
                                        </div>
                                    </div>
                                </div>
                                <p ref={reviewTextRef} className={`text-[15px] leading-[1.45] ${expanded ? "" : "line-clamp-3"}`}>{reviewCopy}</p>
                                {(canExpand || expanded) && <button type="button" onClick={() => setExpanded((value) => !value)} className="mt-5 w-fit cursor-pointer rounded-sm bg-[#282034] px-6 py-2 text-[12px] font-medium text-white transition-colors duration-200 hover:bg-[#3a304b]">{expanded ? "Show Less" : "Read More"}</button>}
                            </>
                        ) : <div className="flex h-full flex-1 items-center justify-center text-lg">Loading client testimonials…</div>}
                    </article>
                </div>
            </div>
        </section>
    );
}

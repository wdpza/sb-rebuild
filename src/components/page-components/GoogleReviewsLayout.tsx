"use client"

import { useEffect, useState } from "react"
import { motion } from "motion/react"
import { Star } from "lucide-react"

interface Review {
  author_name: string
  author_url: string
  profile_photo_url: string
  rating: number
  relative_time_description: string
  text: string
  time: number
}

interface ReviewsData {
  reviews: Review[]
  averageRating: number
  totalCount: number
}

const MAX_TEXT_LENGTH = 150

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={16}
          className={star <= rating ? "fill-[#FBBC04] text-[#FBBC04]" : "text-neutral-600"}
        />
      ))}
    </div>
  )
}

function ReviewCard({ review, index }: { review: Review; index: number }) {
  const [expanded, setExpanded] = useState(false)
  const isLong = review.text.length > MAX_TEXT_LENGTH

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
      className="flex flex-col gap-3 rounded-xl bg-neutral-strongest p-5 border border-neutral-700/50"
    >
      <div className="flex items-center gap-3">
        <a
          href={review.author_url}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0"
        >
          <img
            src={review.profile_photo_url}
            alt={`${review.author_name}'s profile photo`}
            className="size-10 rounded-full object-cover"
            loading="lazy"
          />
        </a>
        <div className="flex flex-col gap-0.5 min-w-0">
          <a
            href={review.author_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-md font-semibold text-gradient-starbright truncate hover:underline"
          >
            {review.author_name}
          </a>
          <StarRating rating={review.rating} />
        </div>
        <span className="ml-auto shrink-0 text-xs text-neutral-regular">
          {review.relative_time_description}
        </span>
      </div>

      <div className="text-sm text-neutral-soft leading-relaxed">
        {isLong && !expanded ? (
          <>
            <div className="google-review-item mb-3 text-base">
              {review.text.slice(0, MAX_TEXT_LENGTH)}...
            </div>
            <button
              onClick={() => setExpanded(true)}
              className="bg-neutral-strongest gradient-border inline-block px-2 py-1 text-neutral-softest font-semibold rounded-md shadow-md transition-all duration-300 text-sm hover:bg-gradient-starbright"
            >
              Read more
            </button>
          </>
        ) : (
          <>
            <div className="google-review-item mb-3">
              {review.text}
            </div>
            {isLong && expanded && (
              <button
                onClick={() => setExpanded(false)}
                className="bg-neutral-strongest gradient-border inline-block px-2 py-1 text-neutral-softest font-semibold rounded-md shadow-md transition-all duration-300 text-sm hover:bg-gradient-starbright"
              >
                Show less
              </button>
            )}
          </>
        )}
      </div>
    </motion.div>
  )
}

function SkeletonCard() {
  return (
    <div className="flex flex-col gap-3 rounded-xl bg-neutral-strongest/60 p-5 border border-neutral-700/50 animate-pulse">
      <div className="flex items-center gap-3">
        <div className="size-10 rounded-full bg-neutral-700" />
        <div className="flex flex-col gap-2 flex-1">
          <div className="h-3 w-28 rounded bg-neutral-700" />
          <div className="h-3 w-20 rounded bg-neutral-700" />
        </div>
      </div>
      <div className="space-y-2">
        <div className="h-3 w-full rounded bg-neutral-700" />
        <div className="h-3 w-3/4 rounded bg-neutral-700" />
      </div>
    </div>
  )
}

export default function GoogleReviewsLayout() {
  const [data, setData] = useState<ReviewsData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        const res = await fetch("/api/google-reviews")
        if (!res.ok) throw new Error("Failed to fetch")
        const json = await res.json()
        if (!cancelled) setData(json)
      } catch {
        if (!cancelled) setData(null)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()
    return () => { cancelled = true }
  }, [])

  if (loading) {
    return (
      <section className="bg-sb-black py-16">
        <div className="layout-wrapper">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: 3 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (!data || data.reviews.length === 0) return null

  return (
    <section id="google-reviews" className="bg-sb-black py-16">
      <div className="layout-wrapper">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          viewport={{ once: true }}
          className="mb-10 text-center"
        >
          <h2 className="text-3xl font-semibold text-neutral-softest">
            Rated {data.averageRating.toFixed(1)} — {data.totalCount} review{data.totalCount !== 1 ? "s" : ""} on Google
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {data.reviews.map((review, index) => (
            <ReviewCard key={review.time} review={review} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

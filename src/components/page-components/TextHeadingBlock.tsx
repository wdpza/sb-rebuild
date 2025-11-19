"use client";

import DOMPurify from 'isomorphic-dompurify';
import React from 'react';

type CTA = {
  url?: string;
  title?: string;
  target?: string; // '_blank' | '_self' | etc.
};

type BgImage = {
  node?: {
    mediaItemUrl?: string;
  };
};

type Props = {
  title?: string | null;
  description?: string | null;
  ctaLink?: CTA | null;
  backgroundImage?: BgImage | null;
};

export default function TextHeadingBlock({
  description,
  title,
  ctaLink,
  backgroundImage,
}: Props) {
  const bgUrl = backgroundImage?.node?.mediaItemUrl || '';

  const sanitizedHtml = DOMPurify.sanitize(description || '');

  // Normalize target and rel for safety
  const target = ctaLink?.target === '_blank' ? '_blank' : '_self';
  const rel = target === '_blank' ? 'noopener noreferrer' : undefined;

  return (
    <div
      className={`relative py-12 bg-center ${bgUrl ? 'bg-cover' : ''}`}
      style={bgUrl ? { backgroundImage: `url(${bgUrl})` } : undefined}
    >
      {/* Optional overlay if you plan to add one later */}
      {/* <div className="absolute inset-0 bg-black/40" /> */}

      <div className="relative z-10 w-full max-w-[1600px] mx-auto flex flex-col text-neutral-softest px-6">
        {title ? (
          <h2 className="text-[45px] font-bold mb-12 text-gradient-starbright">
            {title}
          </h2>
        ) : null}

        {sanitizedHtml ? (
          <div
            className="prose w-full text-neutral-softest mb-8 max-w-none"
            dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
          />
        ) : null}

        {ctaLink?.url && ctaLink?.title ? (
          <div className="flex flex-col items-start text-center">
            <a
                href={ctaLink.url}
                target={target}
                rel={rel}
                className="inline-flex items-center justify-center rounded-md px-8 py-3 font-semibold text-neutral-softest gradient-border mt-4"
            >
                {ctaLink.title}
            </a>
          </div>
        ) : null}
      </div>
    </div>
  );
}
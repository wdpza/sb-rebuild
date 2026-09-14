import Image from "next/image";
import Link from "next/link";
import DOMPurify from "isomorphic-dompurify";
import type { CtaLink, MediaItem } from "@/types/common";
import styles from "./HeroLayoutRevised.module.css";

type HeroLayoutRevisedProps = {
  description?: string | null;
  subTitle?: string | null;
  background?: MediaItem | null;
  ctaFirstLink?: CtaLink | null;
  ctaSecondLink?: CtaLink | null;
};

export default function HeroLayoutRevised({
  description,
  subTitle,
  background,
  ctaFirstLink,
  ctaSecondLink,
}: HeroLayoutRevisedProps) {
  // The revised CMS block stores its rich-text headline in description.
  // Preserve inline emphasis and line breaks while keeping valid h1 markup.
  const headline = description ? DOMPurify.sanitize(description, {
    ALLOWED_TAGS: ["strong", "b", "em", "span", "br"],
    ALLOWED_ATTR: [],
  }) : null;
  const backgroundUrl = background?.node?.mediaItemUrl;

  return (
    <section className={styles.hero}>
      {backgroundUrl ? (
        <Image
          src={backgroundUrl}
          alt=""
          fill
          priority
          sizes="100vw"
          className={styles.background}
        />
      ) : (
        <div className={styles.pattern} aria-hidden="true">
          {Array.from({ length: 14 }, (_, index) => (
            <div key={index}>STARBRIGHTSTARBRIGHT</div>
          ))}
        </div>
      )}
      <div className={styles.content}>
        {headline && (
          <h1 className={styles.title} dangerouslySetInnerHTML={{ __html: headline }} />
        )}
        {subTitle && <p className={styles.subtitle}>{subTitle}</p>}
        {(ctaFirstLink?.url || ctaSecondLink?.url) && (
          <div className={styles.actions}>
            {[ctaFirstLink, ctaSecondLink].map((link, index) => link?.url && (
              <Link
                key={index}
                href={link.url}
                target={link.target || undefined}
                rel={link.target === "_blank" ? "noopener noreferrer" : undefined}
                className={`${styles.button} ${index === 0 ? styles.primary : styles.secondary}`}
              >
                {link.title}
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

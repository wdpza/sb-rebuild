import Link from "next/link";

export default function ExitLayout({ title, backgroundImage, ctaLink, backgroundOverlay }: any) {
  const bgUrl = backgroundImage?.node?.mediaItemUrl ?? null;

  const cleanUrl = ctaLink?.url
    ? ctaLink.url.replace(/^https?:\/\/[^/]+/, "")
    : null;

  return (
    <div
      className="relative py-24 bg-cover bg-center"
      style={{
        backgroundImage: bgUrl ? `url(${bgUrl})` : undefined,
      }}
    >
      {backgroundOverlay && (
        <div className="absolute inset-0 bg-[#28262C]/80"></div>
      )}
      <div className="relative z-10 layout-wrapper flex flex-col items-center justify-center text-center text-neutral-softest">
        <h2 className="exit-title uppercase font-bold mb-8 text-balance">
          {title ?? null}
        </h2>
        {cleanUrl && (
          <Link
            href={cleanUrl}
            target={ctaLink?.target ?? "_self"}
            className="inline-flex items-center justify-center rounded-md px-8 py-3 font-semibold text-neutral-softest gradient-border mt-4"
          >
            {ctaLink?.title ?? "Learn More"}
          </Link>
        )}
      </div>
    </div>
  );
}

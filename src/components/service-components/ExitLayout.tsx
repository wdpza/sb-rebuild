export default function ExitLayout({ title, backgroundImage, ctaLink }: any) {
  const bgUrl = backgroundImage?.node?.mediaItemUrl ?? null;

  const cleanUrl = ctaLink?.url
    ? ctaLink.url.replace(/^https?:\/\/[^/]+/, "")
    : null;

  return (
    <div
      className="relative py-24 bg-cover bg-center bg-[#28262C]"
      style={{
        backgroundImage: bgUrl ? `url(${bgUrl})` : undefined,
      }}
    >
      <div className="relative z-10 w-full layout-wrapper mx-auto flex flex-col items-center justify-center text-center text-neutral-softest px-6">
        <h2 className="uppercase exit-title font-bold mb-8">
          {title ?? null}
        </h2>
        {cleanUrl && (
          <a
            href={cleanUrl}
            target={ctaLink?.target ?? "_self"}
            className="inline-flex items-center justify-center rounded-md px-8 py-3 font-semibold text-neutral-softest gradient-border mt-4"
          >
            {ctaLink?.title ?? "Learn More"}
          </a>
        )}
      </div>
    </div>
  );
}
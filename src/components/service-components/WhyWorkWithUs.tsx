type Item = {
  title: string;
  description: string;
};

export default function WhyWorkWithUs({
  introTitle,
  item,
  backgroundImage,
}: any) {
  const bgUrl = backgroundImage?.node?.mediaItemUrl ?? null;

  return (
    <div
      className="relative py-16 md:py-32 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: bgUrl ? `url(${bgUrl})` : undefined,
      }}
    >

      <div className="relative z-10 w-full layout-wrapper mx-auto flex flex-col items-center justify-center text-center text-neutral-softest px-4 md:px-6">
        {/* Title */}
        {introTitle && (
          <h2 className="subtitle font-bold mb-10 text-neutral-softest">
            {introTitle}
          </h2>
        )}

        {/* Cards Container */}
        <div
          className="
            grid 
            grid-cols-1 
            sm:grid-cols-2 
            lg:grid-cols-3 
            gap-6 
            md:gap-8 
            w-full 
            justify-items-center
          "
        >
          {item.map((card: Item, index: number) => (
            <div
              key={index}
              className="
                bg-neutral-stronger
                p-6
                md:p-8 
                md:py-12
                rounded-lg 
                shadow-lg 
                flex 
                flex-col 
                justify-center 
                items-center 
                text-center 
                w-full 
                h-full 
                transition-transform 
                hover:scale-105 
                duration-300
              "
            >
              <h3 className="text-lg md:text-2xl font-semibold mb-3 text-neutral-softest">
                {card.title}
              </h3>
              <p className="font-extralight text-sm md:text-base text-neutral-softest leading-relaxed">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
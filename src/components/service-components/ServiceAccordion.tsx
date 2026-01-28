"use client";

type Item = {
  title: string;
  description: string;
};

export default function ServiceAccordion({ introTitle, item, backgroundImage }: any) {
  const bgUrl = backgroundImage?.node?.mediaItemUrl ?? null;

  return (
    <section className="relative flex w-full items-center bg-[#28262C] overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage: bgUrl ? `url(${bgUrl})` : undefined,
      }}
    >
      <div className="mx-auto w-full">
        {introTitle && (
          <h2 className="subtitle font-bold mb-8 text-neutral-softest text-center">{introTitle}</h2>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {item.map((item: Item, idx: number) => (
            <div key={idx} className={`h-120 overflow-hidden px-12 py-8 flex flex-col items-start justify-center ${idx % 2 === 0 ? 'bg-neutral-strongest' : 'bg-neutral-stronger'}`}>
              <h3 className="inner-subtitle text-neutral-softest text-lg font-semibold mb-4">
                {item.title}
              </h3>
              <p className="text-neutral-softer text-sm md:text-base leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

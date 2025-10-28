import Image from "next/image";

type CaseStudy = {
  title?: string;
  caseStudies?: {
    headerText?: string | null;
    headerBackgroundImage?: { node?: { mediaItemUrl?: string; altText?: string } | null } | null;
    headerImage?: { node?: { mediaItemUrl?: string; altText?: string } | null } | null;
    headerLogo?: { node?: { mediaItemUrl?: string; altText?: string } | null } | null;
  };
};

export default function CaseStudyHero({ item }: { item: CaseStudy }) {
  const cs = item?.caseStudies;

  const background = cs?.headerBackgroundImage?.node?.mediaItemUrl;
  const mainImg = cs?.headerImage?.node?.mediaItemUrl;
  const mainAlt = cs?.headerImage?.node?.altText || item?.title || "Case study visual";

  const logoImg = cs?.headerLogo?.node?.mediaItemUrl;
  const logoAlt = cs?.headerLogo?.node?.altText || item?.title || "Client logo";

  const title = cs?.headerText || item?.title || "Case Study";

  return (
    <section
      className="relative flex min-h-screen h-screen w-full items-center bg-cover bg-bottom bg-no-repeat overflow-hidden"
      style={background ? { backgroundImage: `url('${background}')` } : undefined}
    >
      <div className="h-screen relative z-10 grid w-full max-w-[1600px] mx-auto grid-cols-1 md:grid-cols-24 gap-2 px-12 py-24">
        {/* Left Column */}
        <div className="col-span-13 flex flex-col justify-center text-left gap-4">
          <h1 className="font-archivo uppercase text-[75px]/[1.2] font-black drop-shadow-lg text-gradient-starbright">
            {logoImg ? (
              <Image
                className="mb-8 h-auto w-auto max-h-20 object-contain"
                src={logoImg}
                alt={logoAlt}
                width={320}
                height={80}
                priority
              />
            ) : null}
            {title}
          </h1>
        </div>

        {/* Right Column */}
        <div className="col-span-11 relative flex items-center justify-center -mb-24">
          {mainImg ? (
            <Image
              src={mainImg}
              alt={mainAlt}
              width={1200}
              height={1200}
              className="absolute max-h-[80vh] object-contain"
              style={{ bottom: "2px" }}
              priority
            />
          ) : null}
        </div>
      </div>
    </section>
  );
}

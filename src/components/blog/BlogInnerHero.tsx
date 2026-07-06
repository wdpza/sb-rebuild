import Image from "next/image";
import Link from "next/link";

export default function BlogInnerHero({ background, title } : any) {

  return (
    <section
        className="relative flex min-h-screen w-full items-center bg-cover bg-bottom bg-no-repeat overflow-hidden"
        style={{
            backgroundImage:
            "url('https://cms.starbright.co.za/wp-content/uploads/2025/10/hero.png')",
        }}
    >
      <div className="layout-wrapper flex flex-col justify-center items-center h-screen relative z-10">
        {/* Left Column */}
        <div className="col-span-24 flex flex-col justify-center gap-4 z-4 text-center">
          <h1 className="font-archivo uppercase hero-title font-black drop-shadow-lg text-gradient-starbright mb-12">
            {title}
          </h1>
        </div>

        <Link
            href={`#article`}
            className="
                bg-neutral-strongest
                gradient-border
                inline-block px-8 py-3 
                text-neutral-softest font-semibold 
                rounded-lg shadow-md 
                transition-all duration-300 
                hover:bg-gradient-starbright
                no-underline
            "
        >
            Read Article
        </Link>

        {/* Right Column
        <div className="col-span-11 relative flex items-center justify-center -mb-24">
          {background ? (
            <Image
              src={background}
              alt={title}
              width={1200}
              height={1200}
              className="absolute max-h-[80vh] object-contain"
              style={{ bottom: "2px" }}
              priority
            />
          ) : null}
        </div>
        */}
      </div>
    </section>
  );
}

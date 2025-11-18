import Image from "next/image";

export default function BlogInnerHero({ background, title } : any) {

  return (
    <section
        className="relative flex min-h-screen h-screen w-full items-center bg-cover bg-bottom bg-no-repeat overflow-hidden"
        style={{
            backgroundImage:
            "url('https://cms.starbright.co.za/wp-content/uploads/2025/10/hero.png')",
        }}
    >
      <div className="h-screen relative z-10 grid w-full max-w-[1600px] mx-auto grid-cols-1 md:grid-cols-24 gap-2 px-12 py-24">
        {/* Left Column */}
        <div className="col-span-13 flex flex-col justify-center text-left gap-4 z-4">
          <h1 className="font-archivo uppercase text-[75px]/[1.2] font-black drop-shadow-lg text-gradient-starbright">
            {title}
          </h1>
        </div>

        {/* Right Column */}
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
      </div>
    </section>
  );
}

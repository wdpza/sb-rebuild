
export default function BlogInnerHero({ background, title } : any) {

    return (
        <section
            className="relative flex min-h-screen h-screen w-full items-center bg-cover bg-bottom bg-no-repeat overflow-hidden"
            style={{
                backgroundImage: background ? `url(${background})` : undefined,
            }}
        >
            <div className="absolute inset-0 bg-black/60 z-0"></div>
            <div className="h-screen relative z-10 grid w-full max-w-[1600px] mx-auto grid-cols-1 md:grid-cols-24 gap-2 px-12 py-24">
                {/* Left column: title, subtitle, description, anchor */}
                <div className="col-span-24 flex flex-col justify-center text-center gap-4">
                    <h1 className="font-archivo uppercase text-[75px]/20 font-black drop-shadow-lg text-gradient-starbright">
                        {title}
                    </h1>
                </div>

            </div>
        </section>
    );
}
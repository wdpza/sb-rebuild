export default function StatsLayout({
    statsFirst,
    statsSecond,
    statsThird,
}: any) {
    return (
        <div className="bg-neutral-strongest w-full">
            <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 py-8 px-6 text-center">
                {/* Stat 1 */}
                <div
                    className="flex flex-col items-center justify-center p-12 py-24 bg-cover bg-center rounded-2xl"
                    style={{ backgroundImage: "url('/bragCard.svg')" }}
                >
                    <h3 className="text-4xl font-bold text-neutral-softest">{statsFirst}</h3>
                </div>

                {/* Stat 2 */}
                <div
                    className="flex flex-col items-center justify-center p-12 py-24 bg-cover bg-center rounded-2xl"
                    style={{ backgroundImage: "url('/bragCard.svg')" }}
                >
                    <h3 className="text-4xl font-bold text-neutral-softest">{statsSecond}</h3>
                </div>

                {/* Stat 3 */}
                <div
                    className="flex flex-col items-center justify-center p-12 py-24 bg-cover bg-center rounded-2xl"
                    style={{ backgroundImage: "url('/bragCard.svg')" }}
                >
                    <h3 className="text-4xl font-bold text-neutral-softest">{statsThird}</h3>
                </div>
            </div>
        </div>
    );
}

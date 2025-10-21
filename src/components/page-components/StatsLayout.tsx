export default function StatsLayout({
    statsFirst,
    statsSecond,
    statsThird,
}: any) {
    return (
        <div className="bg-neutral-strongest w-full">
            <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 py-12 px-6 text-center">
                {/* Stat 1 */}
                <div
                    className="flex flex-col items-center justify-center p-24 bg-[url('/stats-pattern.png')] bg-cover bg-center rounded-2xl"
                >
                    <h3 className="text-4xl font-bold text-white">{statsFirst}</h3>
                </div>

                {/* Stat 2 */}
                <div
                    className="flex flex-col items-center justify-center p-24 bg-[url('/stats-pattern.png')] bg-cover bg-center rounded-2xl"
                >
                    <h3 className="text-4xl font-bold text-white">{statsSecond}</h3>
                </div>

                {/* Stat 3 */}
                <div
                    className="flex flex-col items-center justify-center p-24 bg-[url('/stats-pattern.png')] bg-cover bg-center rounded-2xl"
                >
                    <h3 className="text-4xl font-bold text-white">{statsThird}</h3>
                </div>
            </div>
        </div>
    );
}

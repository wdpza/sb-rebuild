type Item = {
  title: string;
  description: string;
};

export default function WhyWorkWithUs({ introTitle, item, backgroundImage }: any) {

    const bgUrl = backgroundImage?.node?.mediaItemUrl ?? null;

    return (
        <div
            className="relative py-24 bg-cover bg-center"
            style={{
                backgroundImage: bgUrl ? `url(${bgUrl})` : undefined,
            }}
        >
            <div className="absolute inset-0"></div>
            <div className="relative z-10 w-full max-w-[1200px] mx-auto flex flex-col items-center justify-center text-center text-white px-6">
                <h2 className="uppercase text-5xl md:text-6xl font-bold mb-8">
                    {introTitle ?? null}
                </h2>
            </div>
            <div className="flex justify-center gap-6 p-8">
                {item.map((item: Item, index: number) => (
                    <div
                    key={index}
                    className="bg-[#1B1B1C] bg-opacity-50 p-6 rounded-lg shadow-lg flex flex-col justify-center items-center w-72 h-72"
                    >
                        <h3 className="text-white text-xl font-semibold mb-4">{item.title}</h3>
                        <p className="text-white text-center">{item.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

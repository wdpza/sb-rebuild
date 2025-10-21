
export default function SocialMediaPackages({ introTitle, spackages }: any) {

    return (
        <div className="bg-[#28262C] relative py-24 bg-cover bg-center">
            <div className="max-w-[1600px] mx-auto w-full">
                <h2 className="text-[45px] font-bold mb-8 text-gradient-starbright text-center">{introTitle}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-center">
                    {spackages.map((pkg: any, index: number) => (
                        <div
                            key={index}
                            className={`bg-[#38363C] rounded-lg shadow-lg p-6 flex flex-col justify-between transition-all duration-300 ease-in-out ${
                            index === 1 ? "h-[500px]" : "h-[400px] mt-[50px]" // Middle item has more height
                            }`}
                        >
                            {/* Title */}
                            <h3 className="text-2xl font-semibold mb-8 text-center text-white">{pkg.title}</h3>

                            {/* Horizontal Line */}
                            <hr className="border-t-1 border-white mb-8" />

                            {/* Description */}
                            <p className="text-sm text-white mb-4 flex-1 text-center whitespace-pre-line">
                            {pkg.description}
                            </p>

                            {/* Button with Link */}
                            <a
                            href={pkg.ctaLink.url}
                            target={pkg.ctaLink.target ? pkg.ctaLink.target : "_blank"}
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center rounded-md px-8 py-3 font-semibold text-white gradient-border mt-4"
                            >
                            {pkg.ctaLink.title}
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

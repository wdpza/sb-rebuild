export default function SocialMediaPackages({ introTitle, spackages }: any) {

  return (
    <div className="bg-[#28262C] relative py-20 bg-cover bg-center">
      <div className="layout-wrapper mx-auto w-full">
        {introTitle && (
          <h2 className="subtitle font-bold mb-12 text-gradient-starbright text-center">
            {introTitle}
          </h2>
        )}

        <div
          className="
            grid 
            gap-6 
            text-center 
            items-stretch 
            grid-cols-[repeat(auto-fit,minmax(300px,1fr))]
          "
        >
          {spackages.map((pkg: any, index: number) => {
            // Handle missing or invalid data gracefully
            if (!pkg || typeof pkg !== "object") return null;

            // Check if package is marked as popular
            const isPopular = Array.isArray(pkg.popular) && pkg.popular.length > 0;

          const cleanUrl = pkg?.ctaLink?.url
            ? pkg?.ctaLink?.url.replace(/^https?:\/\/[^/]+/, "")
            : null;

            return (
              <div
                key={index}
                className={`
                  ${isPopular ? "popular-background-gradient scale-[1.05]" : "bg-[#38363C]"} 
                  rounded-lg 
                  shadow-lg 
                  p-6 
                  flex 
                  flex-col
                  pricing-item 
                  justify-between 
                  transition-all 
                  duration-300 
                  ease-in-out
                `}
              >
                {/* Title */}
                <h3 className="text-2xl font-semibold mb-8 text-center text-neutral-softest">
                  {pkg.title}
                </h3>

                {/* Horizontal Line */}
                <hr className="border-t border-white mb-8" />

                {/* Description */}
                <p className="text-sm text-neutral-softest mb-4 flex-1 text-center whitespace-pre-line leading-loose">
                  {pkg.description}
                </p>

                {/* Button with Link */}
                {pkg.ctaLink && typeof pkg.ctaLink === "object" && (
                  <div className="flex justify-center w-full mt-4">
                    <a
                      href={cleanUrl}
                      target={pkg.ctaLink.target ? pkg.ctaLink.target : "_blank"}
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center rounded-md px-8 py-3 font-semibold text-neutral-softest gradient-border"
                    >
                      {pkg.ctaLink.title}
                    </a>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
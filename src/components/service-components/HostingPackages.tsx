import he from 'he';
import Link from "next/link";

export default function HostingPackages({ title, hpackages, ctaLink }: any) {

  const cleanUrl = ctaLink?.url
    ? ctaLink.url.replace(/^https?:\/\/[^/]+/, "")
    : null;

    return (
        <div className="bg-[#28262C] relative py-24 bg-cover bg-center">
            <div className="layout-wrapper mx-auto w-full">
                <h2 className="text-[45px] font-bold mb-8 text-white text-center">{title}</h2>
                <div>
                    <div className="mx-auto">
                        <div className="overflow-hidden rounded-lg gradient-border-bottom">
                        {/* Table Header */}
                        <div className="flex bg-gradient-starbright text-white p-4">
                            <div className="flex-1 font-semibold">Service</div>
                            <div className="flex-1 font-semibold">Fee</div>
                            <div className="flex-1 font-semibold">Note</div>
                        </div>

                        {/* Table Body */}
                        {hpackages.map((pkg: any, index: number) => (
                            <div
                            key={index}
                            className={`flex p-4 ${index % 2 === 0 ? 'bg-[#28262C]' : 'bg-[#49474D]'}`}
                            >
                            <div className="flex-1 text-sm text-white">{pkg.service}</div>
                            <div className="flex-1 text-sm text-white">{pkg.fee}</div>
                            <div className="flex-1 text-sm text-white">{pkg.notes}</div>
                            </div>
                        ))}
                        </div>
                    </div>
                </div>
                <div className="flex justify-center items-center mt-8">
                <Link
                    href={cleanUrl}
                    target={ctaLink.target}
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-md px-8 py-3 font-semibold text-white gradient-border mt-4"
                >
                    {he.decode(ctaLink.title)}
                </Link>
                </div>
            </div>
        </div>
    );
}

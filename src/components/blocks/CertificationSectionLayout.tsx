import Image from "next/image";

type MediaNode = {
  altText?: string | null;
  mediaItemUrl?: string | null;
};

type Certificate = {
  id?: string | number;       // optional if you have a real id
  title: string;
  description?: string | null;
  logo?: { node?: MediaNode | null };
};

interface CertificationSectionLayoutProps {
  certificates?: Certificate[] | null;
}

export default function CertificationSectionLayout({
  certificates = [],
}: CertificationSectionLayoutProps) {
  if (!certificates || certificates.length === 0) return null;

  return (
    <section className="py-20 bg-white px-8">
      <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-6 max-w-[1600px] mx-auto">
        {certificates.map((certificate) => {
          const src = certificate.logo?.node?.mediaItemUrl ?? "";
          const alt =
            certificate.logo?.node?.altText || certificate.title || "Certificate";

          return (
            <div
              key={String(certificate.id ?? certificate.title)}
              className="relative w-full overflow-hidden rounded-xl text-center"
            >
              {/* Image area with a fixed aspect ratio */}
                  <img
                    className="block mx-auto"
                    src={src}
                    alt={alt}
                  />

              {/* Text block */}
              <div className="p-4">
                <h2 className="text-[30px] font-bold">
                  <span className="bg-gradient-to-r from-[#6EE7F9] via-[#A855F7] to-[#F59E0B] bg-clip-text text-transparent">
                    {certificate.title}
                  </span>
                </h2>
                {certificate.description ? (
                  <p className="mt-2 text-neutral-700 text-sm">
                    {certificate.description}
                  </p>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

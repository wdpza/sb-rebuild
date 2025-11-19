import { getTeamMembers } from "@/lib/graphql/queries/getTeamMembers";
import Image from "next/image";

type MediaNode = {
  altText?: string | null;
  mediaItemUrl?: string | null;
};

type TeamMember = {
  slug: string;
  title: string;
  content?: string | null;
  teamMemberFields?: {
    profileNormal?: { node?: MediaNode | null } | null;
    profileHover?: { node?: MediaNode | null } | null;
  } | null;
};

function stripHtml(html?: string | null) {
  if (!html) return "";
  return html.replace(/<[^>]*>/g, "").trim();
}

export default async function TeamsSectionLayout({ description, subTitle, title, backgroundImage }: any) {
  const TeamMember = await getTeamMembers();
  const bgUrl = backgroundImage?.node?.mediaItemUrl ?? "";

  return (
    <section
      className="py-20 bg-[#171717] px-8 text-center"
      style={{
        backgroundImage: bgUrl ? `url(${bgUrl})` : undefined,
        backgroundPosition: "center",
      }}
    >
      <h2 className="text-[40px] font-bold text-neutral-softest">
        <span className="text-gradient-starbright bg-clip-text text-transparent">
          {title}
        </span>
      </h2>

      {subTitle && (
        <p className="bold text-[30px] text-neutral-softest/90 max-w-3xl mx-auto whitespace-pre-line">
          {subTitle}
        </p>
      )}

      {description && (
        <p className="text-neutral-softest/90 mt-8 max-w-3xl text-[20px] mx-auto whitespace-pre-line">
          {description}
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12 max-w-[1600px] mx-auto">
        {TeamMember.map((m: TeamMember) => {
          const normalImg = m.teamMemberFields?.profileNormal?.node;
          const hoverImg = m.teamMemberFields?.profileHover?.node;
          const imgSrc = normalImg?.mediaItemUrl || "";
          const hoverSrc = hoverImg?.mediaItemUrl || "";
          const alt = normalImg?.altText || m.title || "Team member";
          const blurb = stripHtml(m.content);

          return (
            <article
              key={m.slug}
              className="group relative rounded-xl overflow-hidden bg-neutral-100"
            >
              {/* Main image */}
              <div className="relative w-full aspect-[4/5]">
                {imgSrc ? (
                  <>
                    <Image
                      src={imgSrc}
                      alt={alt}
                      fill
                      sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw"
                      className="object-cover transition-opacity duration-500 ease-out"
                    />
                    {hoverSrc && (
                      <Image
                        src={hoverSrc}
                        alt={`${alt} hover`}
                        fill
                        sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw"
                        className="object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out"
                      />
                    )}
                  </>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-sm text-neutral-500">
                    No image
                  </div>
                )}
              </div>

              {/* Bottom gradient overlay with fade-in text */}
              <div
                className="
                  absolute inset-0 
                  flex flex-col justify-end 
                  opacity-0 group-hover:opacity-100 
                  transition-opacity duration-500 ease-out
                  pointer-events-none
                "
              >
                <div
                  className="
                    w-full p-8 pt-24 text-left
                    bg-gradient-to-t from-black/90 via-black/80
                    text-neutral-softest
                  "
                >
                  <h3 className="text-[30px] font-semibold leading-tight">{m.title}</h3>
                  {blurb && (
                    <p className="mt-1 text-sm leading-snug line-clamp-2 overflow-hidden">
                      {blurb}
                    </p>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

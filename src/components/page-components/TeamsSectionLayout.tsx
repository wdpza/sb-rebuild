import { getTeamMembers } from "@/lib/graphql/queries/getTeamMembers";
import Image from "next/image";

type MediaNode = {
  altText?: string | null;
  mediaItemUrl?: string | null;
};

type TeamMember = {
  slug: string;
  title: string;
  content?: string | null; // WP often returns HTML here
  teamMemberFields?: {
    profileRightSide?: { node?: MediaNode | null } | null;
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
                backgroundSize: "auto 100%",
                backgroundPosition: "bottom right",
            }}
        >
            <h2 className="text-[40px] font-bold text-white">
                <span className="bg-gradient-to-r from-[#6EE7F9] via-[#A855F7] to-[#F59E0B] bg-clip-text text-transparent">
                {title}
                </span>
            </h2>
            {subTitle ? (
                <p className="bold text-[30px] text-white/90 max-w-3xl mx-auto whitespace-pre-line">{subTitle}</p>
            ) : null}
            {description ? (
                <p className="text-white/90 mt-8 max-w-3xl mx-auto whitespace-pre-line">{description}</p>
            ) : null}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8 max-w-[1600px] mx-auto">
                {TeamMember.map((m: TeamMember) => {
                    const media = m.teamMemberFields?.profileRightSide?.node;
                    const imgSrc = media?.mediaItemUrl || "";
                    const alt = media?.altText || m.title || "Team member";
                    const blurb = stripHtml(m.content);

                    return (
                    <article
                        key={m.slug}
                        className="group relative rounded-xl overflow-hidden bg-neutral-100"
                    >
                        {/* Image */}
                        <div className="relative w-full aspect-[4/5]">
                        {imgSrc ? (
                            <Image
                            src={imgSrc}
                            alt={alt}
                            fill
                            sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw"
                            className="object-cover"
                            priority={false}
                            />
                        ) : (
                            <div className="absolute inset-0 flex items-center justify-center text-sm text-neutral-500">
                            No image
                            </div>
                        )}
                        </div>

                        {/* Bottom overlay on hover */}
                        <div
                        className="
                            pointer-events-none
                            absolute inset-x-0 bottom-0
                            translate-y-full group-hover:translate-y-0
                            transition-transform duration-200 ease-out
                        "
                        >
                        <div className="bg-black/60 text-white px-4 py-4 text-left">
                            <h3 className="text-sm font-semibold leading-tight bold text-[20px]">{m.title}</h3>
                            {blurb ? (
                            <p className="mt-0.5 text-xs leading-snug line-clamp-2 overflow-hidden">
                                {blurb}
                            </p>
                            ) : null}
                        </div>
                        </div>
                    </article>
                    );
                })}
            </div>
        </section>
    );
}

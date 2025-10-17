import Link from "next/link";
import { format } from "date-fns";

interface PostItemProps {
  item: any;
}

export default function PostItem({ item }: PostItemProps) {

  const postDate = new Date(); 
  const formattedDate = format(postDate, "MMMM d, yyyy");

  const plainText = item.content
    .replace(/<[^>]+>/g, "") // remove HTML tags
    .replace(/&[^;\s]+;/g, "") // remove HTML entities
    .replace(/\s+/g, " ") // collapse multiple spaces
    .trim();

  const trimmedContent =
    plainText.length > 200
      ? plainText.substring(0, plainText.lastIndexOf(" ", 200)) + "..."
      : plainText;

  return (
    <div className="flex flex-wrap -mx-4 rounded overflow-hidden mb-4">
      {/* Left Column: 5/12 */}
      <div
        className="w-full md:w-4/12 px-4 h-64 md:h-auto bg-cover bg-center"
        style={{
          backgroundImage: `url(${item.featuredImage?.node?.mediaItemUrl})`,
        }}
      ></div>

      {/* Right Column: 7/12 */}
      <div className="w-full md:w-8/12 px-8 py-20 flex flex-col justify-between">
        <div>
          <p className="text-white text-sm mb-2">{formattedDate}</p>
          <h2 className="text-[30px] font-bold text-gradient-starbright">{item.title}</h2>
          <p className="text-white mb-4">{trimmedContent}</p>
        </div>

        <div>
          <Link
            href={`/blog/${item.slug}`}
            className="inline-flex items-center justify-center rounded-md px-8 py-3 font-semibold text-white gradient-border mt-4"
          >
            Read More →
          </Link>
        </div>
      </div>
    </div>
  );
}
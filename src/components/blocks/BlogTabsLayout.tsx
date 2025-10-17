import { getPostItems } from "@/lib/graphql/queries/getPostItems";
import PostItem from "../post/PostItem";

export default async function BlogTabsLayout({ perPage, categories }: any) {

    console.log(categories);

    const items = await getPostItems(perPage);

    return (
        <div className="py-20 bg-[#171717]">
            <div className="flex flex-wrap -mx-4 max-w-[1690px] mx-auto">
                <div className="w-full md:w-3/12 px-8">
                    <div className="bg-gray-800 p-4 rounded">
                        Left Column (Sidebar)
                    </div>
                </div>

                <div className="w-full md:w-9/12 px-4 mt-6 md:mt-0">
                    {items.map((item: any) => (
                        <PostItem key={item.id} item={item} />
                    ))}
                </div>
            </div>
        </div>
    );
}
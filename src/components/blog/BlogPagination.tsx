import Link from "next/link";

type Props = {
    pathname: string;
    currentPage: number;
    totalPages: number;
    search?: string | null;
    sort?: "newest" | "oldest";
};

export default function BlogPagination({ pathname, currentPage, totalPages, search, sort = "newest" }: Props) {
    if (totalPages <= 1) return null;

    const hrefFor = (page: number) => {
        const params = new URLSearchParams();
        if (page > 1) params.set("page", String(page));
        if (search) params.set("s", search);
        if (sort === "oldest") params.set("sort", "oldest");
        const query = params.toString();
        return query ? `${pathname}?${query}` : pathname;
    };

    const pageNumbers: Array<number | string> = totalPages <= 8
        ? Array.from({ length: totalPages }, (_, index) => index + 1)
        : currentPage <= 5
          ? [...Array.from({ length: 8 }, (_, index) => index + 1), "end-ellipsis"]
          : currentPage >= totalPages - 4
            ? ["start-ellipsis", ...Array.from({ length: 8 }, (_, index) => totalPages - 7 + index)]
            : [1, "start-ellipsis", currentPage - 2, currentPage - 1, currentPage, currentPage + 1, currentPage + 2, "end-ellipsis", totalPages];

    return (
        <nav aria-label="Blog pagination" className="mt-14 flex flex-wrap items-center gap-x-5 gap-y-3 text-[20px] text-white">
            {pageNumbers.map((page) => typeof page === "number" ? (
                    <Link
                        key={page}
                        href={hrefFor(page)}
                        aria-current={page === currentPage ? "page" : undefined}
                        className={`blog-pagination-link transition-all ${page === currentPage ? "is-active font-semibold" : ""}`}
                    >
                        {page}
                    </Link>
                ) : (
                    <span key={page} aria-hidden="true" className="tracking-[0.3em]">...</span>
                ))}
            {currentPage < totalPages && (
                <Link href={hrefFor(currentPage + 1)} className="blog-pagination-link ml-3 font-semibold transition-all">
                    Next
                </Link>
            )}
        </nav>
    );
}

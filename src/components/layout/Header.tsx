"use client";

import Image from "next/image";
import Link from "next/link";

export default function Header({
    menu,
    logo,
}: {
    menu: any;
    logo: any;
}) {
    if (!menu) return null;

    const items = menu.menuItems?.nodes ?? [];

    return (
        <header className="absolute top-0 left-0 right-0 z-50 py-12">
            {/* constrain width */}
            <div className="max-w-[1690px] mx-auto flex flex-col justify-between p-4 bg-transparent">
                {/* Logo + Menu */}
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-start justify-start">
                        {logo?.mediaItemUrl ? (
                            <Image
                                src={logo.mediaItemUrl}
                                alt={logo.altText || "Company Logo"}
                                className="h-12 w-auto ml-4 object-contain"
                                width={logo?.width ?? 206}
                                height={logo?.height ?? 82}
                                priority
                            />
                        ) : null}
                    </div>

                    <nav>
                        <ul className="flex gap-6">
                            {Array.isArray(items) &&
                                items.map((item: any, index: number) => {
                                    const key = item.id ?? index;
                                    const label = item.label ?? `Item ${index + 1}`;
                                    const href =
                                        item.connectedObject?.slug
                                            ? `/${item.connectedObject.slug}`
                                            : item.url ?? "#";

                                    return (
                                        <li key={key}>
                                            <Link
                                                href={href}
                                                className="hover:underline text-neutral-softest text-lg transition"
                                            >
                                                {label}
                                            </Link>
                                        </li>
                                    );
                                })}
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    );
}

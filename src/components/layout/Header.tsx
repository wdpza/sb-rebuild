"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import Image from "next/image";
import NavMenu from "./NavMenu";
import NavMenuMobile from "./NavMenuMobile";
import Link from 'next/link';

export type MenuItem = {
	id?: string | null;
	label?: string | null;
	url?: string | null;
	uri?: string | null;
	target?: "_blank" | null;
	cssClasses?: string[] | null;
	parentId?: string | null;
	order?: number | null;
	connectedObject?: { slug?: string | null } | null;
};

export type MenuNode = MenuItem & { children: MenuItem[] };

export default function Header({ menu, logo }: { menu: any; logo: any }) {
	const flatItems: MenuItem[] = useMemo(
		() => menu?.menuItems?.nodes ?? [],
		[menu]
	);

	// Build parent–child structure
	const tree: MenuNode[] = useMemo(() => {
		const byParent: Record<string, MenuItem[]> = {};
		for (const item of flatItems) {
			const pid = item.parentId ?? "";
			if (!byParent[pid]) byParent[pid] = [];
			byParent[pid].push(item);
		}
		Object.values(byParent).forEach(group =>
			group.sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
		);
		const roots = byParent[""] || byParent["null"] || [];
		return roots.map(r => ({
			...r,
			children: byParent[r.id ?? ""] ?? [],
		}));
	}, [flatItems]);

	const [openIndex, setOpenIndex] = useState<number | null>(null);
	const navRef = useRef<HTMLElement | null>(null);

	// Global event listeners for closing dropdowns
	useEffect(() => {
		const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenIndex(null);
		const onClick = (e: MouseEvent) => {
			if (!navRef.current) return;
			if (!navRef.current.contains(e.target as Node)) setOpenIndex(null);
		};
		window.addEventListener("keydown", onKey);
		window.addEventListener("click", onClick);
		return () => {
			window.removeEventListener("keydown", onKey);
			window.removeEventListener("click", onClick);
		};
	}, []);

	if (!menu) return null;

	return (
		<header className="absolute top-0 left-0 right-0 z-50 py-4 lg:py-12">
			<div className="max-w-[1600px] mx-auto flex flex-col justify-between p-4 bg-transparent">
				<div className="flex items-center justify-between">
					{/* Logo */}
					{logo?.mediaItemUrl && (
						<div className="flex items-start justify-start">
							<Link href="/home">
								<Image
									src={logo.mediaItemUrl}
									alt={logo.altText || "Company Logo"}
									className="h-10 w-auto ml-4 object-contain"
									width={logo?.width ?? 206}
									height={logo?.height ?? 82}
									priority
								/>
							</Link>
						</div>
					)}

					{/* Navigation */}
					<NavMenu
						tree={tree}
						navRef={navRef}
						openIndex={openIndex}
						setOpenIndex={setOpenIndex}
					/>
					<NavMenuMobile
						tree={tree}
						flatItems={flatItems}
					/>
				</div>
			</div>
		</header>
	);
}

"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

import NavMenu from "./NavMenu";
import NavMenuMobile from "./NavMenuMobile";
import type { MenuItem, MenuNode } from "../../types/menuTypes";

type HeaderProps = {
	menu?: {
		menuItems?: {
			nodes?: MenuItem[] | null;
		} | null;
	} | null;
	logo?: {
		mediaItemUrl?: string;
		altText?: string | null;
		width?: number | null;
		height?: number | null;
	} | null;
};

export default function Header({ menu, logo }: HeaderProps) {
	const flatItems: MenuItem[] = useMemo(
		() => menu?.menuItems?.nodes ?? [],
		[menu]
	);

	// Build parent–child structure
	const tree: MenuNode[] = useMemo(() => {
		const byParent: Record<string, MenuItem[]> = {};

		for (const item of flatItems) {
			const parentKey = String(item.parentId ?? "");
			if (!byParent[parentKey]) byParent[parentKey] = [];
			byParent[parentKey].push(item);
		}

		// Sort each group by order
		Object.values(byParent).forEach(group =>
			group.sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
		);

		// Root items are those with no parentId
		const roots = byParent[""] ?? [];

		return roots.map<MenuNode>(root => {
			const idKey = String(root.id ?? "");
			return {
				...root,
				children: byParent[idKey] ?? [],
			};
		});
	}, [flatItems]);

	const [openIndex, setOpenIndex] = useState<number | null>(null);
	const [isScrolled, setIsScrolled] = useState(false);
	const navRef = useRef<HTMLElement | null>(null);

	// Scroll detection
	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 0);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	// Global event listeners for closing dropdowns
	useEffect(() => {
		const onKey = (e: KeyboardEvent) => {
			if (e.key === "Escape") setOpenIndex(null);
		};

		const onClick = (e: MouseEvent) => {
			if (!navRef.current) return;
			if (!navRef.current.contains(e.target as Node)) {
				setOpenIndex(null);
			}
		};

		window.addEventListener("keydown", onKey);
		window.addEventListener("click", onClick);

		return () => {
			window.removeEventListener("keydown", onKey);
			window.removeEventListener("click", onClick);
		};
	}, []);

	if (!menu) return null;

	const brand = (
		<Link href="/home" aria-label="Starbright home" className="header-brand">
			<Image
				src="/logo.png"
				alt={logo?.altText || "Starbright"}
				className="h-auto w-full object-contain"
				width={291}
				height={56}
				priority
			/>
		</Link>
	);

	return (
		<header className={`site-header fixed inset-x-0 top-0 z-50 transition-all duration-300 ${isScrolled ? "is-scrolled bg-sb-black/95 shadow-lg" : "bg-transparent"}`}>
			<div className="header-navigation">
				<NavMenu
					tree={tree}
					navRef={navRef}
					openIndex={openIndex}
					setOpenIndex={setOpenIndex}
					brand={brand}
				/>
				<div className="flex w-full items-center justify-between xl:hidden">
					{brand}
					<NavMenuMobile tree={tree} flatItems={flatItems} />
				</div>
			</div>
		</header>
	);
}

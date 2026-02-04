"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import type { MenuItem, MenuNode, MegaMenuChild } from "../../types/menuTypes";

import { IoCloseOutline } from "react-icons/io5";
import { TbArrowBackUp } from "react-icons/tb";
import { RxHamburgerMenu } from "react-icons/rx";

// Local recursive node used just for the mobile menu
type LocalMenuNode = MegaMenuChild & {
	children: LocalMenuNode[];
};

type NavMenuMobileProps = {
	tree: MenuNode[];          // passed from Header, currently not used but kept for API consistency
	flatItems: MenuItem[];
};

export default function NavMenuMobile({ tree: _tree, flatItems }: NavMenuMobileProps) {
	const buildHref = (item: MenuItem): string => {
		if (item?.connectedObject?.slug) return `/${item.connectedObject.slug}`;
		if (item?.uri) return item.uri ?? "#";
		return item?.url ?? "#";
	};

	// Build a nested tree from flat items
	const menuTree = useMemo(() => {
		const childrenByParent: Record<string, MegaMenuChild[]> = {};

		flatItems.forEach(item => {
			const parentKey = String(item.parentId ?? "");
			if (!childrenByParent[parentKey]) childrenByParent[parentKey] = [];
			childrenByParent[parentKey].push(item as MegaMenuChild);
		});

		// Sort each group by order
		Object.values(childrenByParent).forEach(group =>
			group.sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
		);

		const buildNodeWithChildren = (item: MegaMenuChild): LocalMenuNode => {
			const idKey = String(item.id ?? "");
			const directChildren = childrenByParent[idKey] ?? [];
			return {
				...item,
				children: directChildren.map(buildNodeWithChildren),
			};
		};

		const rootItems =
			childrenByParent[""] ?? childrenByParent["null"] ?? [];

		return rootItems.map(buildNodeWithChildren);
	}, [flatItems]);

	const [openstate, setOpenstate] = useState(false);
	const [navigationStack, setNavigationStack] = useState<LocalMenuNode[][]>([]);
	const [currentItems, setCurrentItems] = useState<LocalMenuNode[]>(menuTree);

	const handleCloseMenu = () => {
		setOpenstate(false);
		setNavigationStack([]);
		setCurrentItems(menuTree);
	};

	const handleNavigateToSubmenu = (item: LocalMenuNode) => {
		if (item.children && item.children.length > 0) {
			setNavigationStack(prev => [...prev, currentItems]);
			setCurrentItems(item.children);
		}
	};

	const handleNavigateBack = () => {
		if (navigationStack.length > 0) {
			const previousItems = navigationStack[navigationStack.length - 1];
			setNavigationStack(prev => prev.slice(0, -1));
			setCurrentItems(previousItems);
		}
	};

	const isAtRootLevel = navigationStack.length === 0;

	// Lock/unlock body scroll when menu opens/closes
	useEffect(() => {
		if (openstate) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "";
		}

		return () => {
			document.body.style.overflow = "";
		};
	}, [openstate]);

	// Reset current items when menuTree changes
	useEffect(() => {
		setCurrentItems(menuTree);
		setNavigationStack([]);
	}, [menuTree]);

	return (
		<div>
			{/* Hamburger button */}
			<button
				className="mobile-open-btn group hover:cursor-pointer md:hidden py-2 rounded-lg hover:bg-white/10 transition-all duration-300 text-white hover:text-neutral-softest hover:scale-110 active:scale-95"
				onClick={() => setOpenstate(prev => !prev)}
				aria-label="Toggle menu"
			>
				<RxHamburgerMenu size={28} />
			</button>

			{/* Backdrop overlay */}
			<div
				className={`fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 z-40 ${
					openstate ? "opacity-100" : "opacity-0 pointer-events-none"
				}`}
				onClick={handleCloseMenu}
			/>

			{/* Mobile nav overlay */}
			<nav
				className={`fixed top-0 right-0 w-full sm:w-[400px] h-screen bg-gradient-to-br from-neutral-strongest via-neutral-strongest to-neutral-strongest/95 flex flex-col shadow-2xl transition-transform duration-300 ease-out z-50 ${
					openstate ? "translate-x-0" : "translate-x-full"
				}`}
			>
				{/* Close / Back button */}
				<div className="layout-wrapper relative flex justify-center z-[99] gradient-border-bottom flex-shrink-0 py-3 border-b border-white/10 bg-white/5">
					<button
						className="mb-0 text-neutral-softest hover:text-white transition-all duration-200 hover:scale-110 active:scale-95 rounded-full hover:bg-white/10"
						onClick={isAtRootLevel ? handleCloseMenu : handleNavigateBack}
						aria-label={isAtRootLevel ? "Close menu" : "Go back"}
					>
						{isAtRootLevel ? (
							<IoCloseOutline size={32} />
						) : (
							<TbArrowBackUp size={32} />
						)}
					</button>
				</div>

				{/* Scrollable content */}
				<div className="flex-1 layout-wrapper overflow-y-auto pb-8">
					{(() => {
						// Group items by databaseId (same logic as desktop MegaMenu)
						type GroupedItems = {
							databaseId: number;
							name: string;
							items: LocalMenuNode[];
						};

						const groupsMap: Record<number, GroupedItems> = {};
						const ungroupedItems: LocalMenuNode[] = [];

						currentItems.forEach(item => {
							const groups = item.mainMenuFields?.categoryGrouping?.nodes ?? [];
							
							if (groups.length > 0) {
								groups.forEach(group => {
									const id = group.databaseId;
									if (!groupsMap[id]) {
										groupsMap[id] = {
											databaseId: id,
											name: group.name,
											items: [],
										};
									}
									groupsMap[id].items.push(item);
								});
							} else {
								ungroupedItems.push(item);
							}
						});

						// Convert to array and sort by databaseId for consistent ordering
						const orderedGroups = Object.values(groupsMap).sort(
							(a, b) => a.databaseId - b.databaseId
						);

						return (
							<div className="space-y-6 pt-6">
								{/* Ungrouped items first */}
								{ungroupedItems.length > 0 && (
									<ul className="space-y-2">
										{ungroupedItems.map((item, index) => {
											const href = buildHref(item);
											const hasChildren = item.children && item.children.length > 0;

											return (
												<li key={`ungrouped-${index}`}>
													{hasChildren ? (
														<button
															className="group block w-full text-left py-3 text-neutral-softest text-lg font-medium rounded-lg hover:bg-white/10 transition-all duration-200 hover:translate-x-1 active:scale-[0.98] border border-transparent hover:border-white/20"
															onClick={() => handleNavigateToSubmenu(item)}
														>
															<span className="flex items-center justify-between">
																<span>{item.label ?? "Item"}</span>
																<svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
																	<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
																</svg>
															</span>
														</button>
													) : (
														<Link
															className="block py-3 text-neutral-softest text-lg font-medium rounded-lg hover:bg-white/10 transition-all duration-200 hover:translate-x-1 active:scale-[0.98] border border-transparent hover:border-white/20"
															href={href}
															onClick={handleCloseMenu}
														>
															{item.label ?? "Item"}
														</Link>
													)}
												</li>
											);
										})}
									</ul>
								)}

								{/* Grouped items ordered by databaseId */}
								{orderedGroups.map((group) => (
									<div key={group.databaseId} className="space-y-3">
										<h3 className="text-gradient-starbright text-lg font-bold pb-2 uppercase tracking-wider">
											{group.name}
										</h3>
										<ul className="space-y-2">
											{group.items.map((item, index) => {
												const href = buildHref(item);
												const hasChildren = item.children && item.children.length > 0;

												return (
													<li key={`${group.databaseId}-${index}`}>
														{hasChildren ? (
															<button
																className="group block w-full text-left py-3 text-neutral-softest text-lg font-medium rounded-lg hover:bg-white/10 transition-all duration-200 hover:translate-x-1 active:scale-[0.98] border border-transparent hover:border-white/20"
																onClick={() => handleNavigateToSubmenu(item)}
															>
																<span className="flex items-center justify-between">
																	<span>{item.label ?? "Item"}</span>
																	<svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
																		<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
																	</svg>
																</span>
															</button>
														) : (
															<Link
																className="block py-1 text-neutral-softest font-regular rounded-lg hover:bg-white/10 transition-all duration-200 hover:translate-x-1 active:scale-[0.98] border border-transparent hover:border-white/20"
																href={href}
																onClick={handleCloseMenu}
															>
																{item.label ?? "Item"}
															</Link>
														)}
													</li>
												);
											})}
										</ul>
									</div>
								))}
							</div>
						);
					})()}
				</div>
			</nav>
		</div>
	);
}
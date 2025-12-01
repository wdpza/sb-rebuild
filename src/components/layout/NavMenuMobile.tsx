"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import type { MenuItem, MenuNode, MegaMenuChild } from "../../types/menuTypes";

import { IoCloseOutline } from "react-icons/io5";
import { TbArrowBackUp } from "react-icons/tb";

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

	// Group items by mainMenuFields.categoryGrouping.nodes[0].name
	const groupItemsByCategory = (items: LocalMenuNode[]) => {
		const grouped: Record<string, LocalMenuNode[]> = {};
		const ungrouped: LocalMenuNode[] = [];

		items.forEach(item => {
			const groupName =
				item.mainMenuFields?.categoryGrouping?.nodes?.[0]?.name;

			if (groupName) {
				if (!grouped[groupName]) grouped[groupName] = [];
				grouped[groupName].push(item);
			} else {
				ungrouped.push(item);
			}
		});

		return { grouped, ungrouped };
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
			<div
				className="mobile-open-btn group hover:cursor-pointer md:hidden w-[35px]"
				onMouseDown={() => setOpenstate(prev => !prev)}
			>
				<div className="ml-auto w-full border-white border-t-2 mb-2 transition-[width] duration-400 ease-in-out"></div>
				<div className="ml-auto w-full group-hover:w-[80%] border-white border-t-2 mb-2 transition-[width] duration-400 ease-in-out"></div>
				<div className="ml-auto w-full group-hover:w-[50%] border-white border-t-2 transition-[width] duration-400 ease-in-out"></div>
			</div>

			{/* Mobile nav overlay */}
			<nav
				className={`fixed top-0 left-0 w-full h-screen bg-neutral-strongest text-center flex flex-col ${openstate ? "block" : "hidden"
					}`}
			>
				{/* Close / Back button */}
				<div className="flex-shrink-0 py-8">
					<button
						className="mb-0 text-neutral-softest"
						onClick={isAtRootLevel ? handleCloseMenu : handleNavigateBack}
					>
						{isAtRootLevel ? (
							<IoCloseOutline size={30} />
						) : (
							<TbArrowBackUp size={30} />
						)}
					</button>
				</div>

				{/* Scrollable content */}
				<div className="flex-1 overflow-y-auto px-4 pb-8">
					{(() => {
						const { grouped, ungrouped } = groupItemsByCategory(currentItems);

						return (
							<div>
								{/* Ungrouped items */}
								{ungrouped.length > 0 && (
									<ul className="mb-6">
										{ungrouped.map((item, index) => {
											const href = buildHref(item);
											const hasChildren =
												item.children && item.children.length > 0;

											return (
												<li className="mb-3" key={`ungrouped-${index}`}>
													{hasChildren ? (
														<button
															className="block w-full text-center text-neutral-softest text-2xl"
															onClick={() => handleNavigateToSubmenu(item)}
														>
															{item.label ?? "Item"}
														</button>
													) : (
														<Link
															className="block text-neutral-softest text-2xl"
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

								{/* Grouped items */}
								{Object.entries(grouped).map(([groupName, groupItems]) => (
									<div key={groupName} className="mb-6">
										<h3 className="text-neutral-softest text-lg font-bold mb-3 border-b border-white/20 pb-2">
											{groupName}
										</h3>
										<ul>
											{groupItems.map((item, index) => {
												const href = buildHref(item);
												const hasChildren =
													item.children && item.children.length > 0;

												return (
													<li
														className="mb-3"
														key={`${groupName}-${index}`}
													>
														{hasChildren ? (
															<button
																className="block w-full text-center text-neutral-softest text-2xl"
																onClick={() => handleNavigateToSubmenu(item)}
															>
																{item.label ?? "Item"}
															</button>
														) : (
															<Link
																className="block text-neutral-softest text-2xl"
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
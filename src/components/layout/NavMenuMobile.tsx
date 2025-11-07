"use client";

import { useState, useEffect, useMemo } from "react";

import Link from "next/link";
import { MenuItem, MenuNode } from "./Header";

import { IoCloseOutline } from "react-icons/io5";
import { TbArrowBackUp } from "react-icons/tb";

// Local type for proper recursive structure
type LocalMenuNode = MenuItem & { 
    children: LocalMenuNode[];
    mainMenuFields?: {
        categoryGrouping?: {
            nodes?: Array<{
                name?: string;
            }>;
        };
    };
};

export default function NavMenuMobile({
    tree,
    flatItems,
}: {
    tree: MenuNode[];
    flatItems: MenuItem[];
}) {

    const buildHref = (item: any) => {
        if (item?.connectedObject?.slug) return `/${item.connectedObject.slug}`;
        if (item?.uri) return item.uri;
        return item?.url || "#";
    };

    // Function to group items by their category grouping
    const groupItemsByCategory = (items: LocalMenuNode[]) => {
        const grouped: { [key: string]: LocalMenuNode[] } = {};
        const ungrouped: LocalMenuNode[] = [];

        items.forEach(item => {
            const groupName = item.mainMenuFields?.categoryGrouping?.nodes?.[0]?.name;
            if (groupName) {
                if (!grouped[groupName]) {
                    grouped[groupName] = [];
                }
                grouped[groupName].push(item);
            } else {
                ungrouped.push(item);
            }
        });

        return { grouped, ungrouped };
    };

    // Build tree structure from flat items
    const menuTree = useMemo(() => {
        const buildTree = (items: MenuItem[]): LocalMenuNode[] => {
            const itemsById: Record<string, MenuItem> = {};
            const children: Record<string, MenuItem[]> = {};
            
            // Index items by ID and group by parentId
            items.forEach(item => {
                if (item.id) {
                    itemsById[item.id] = item;
                }
                const parentId = item.parentId || '';
                if (!children[parentId]) {
                    children[parentId] = [];
                }
                children[parentId].push(item);
            });

            // Sort children by order
            Object.values(children).forEach(group =>
                group.sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
            );

            // Recursive function to build node with ONLY direct children
            const buildNodeWithChildren = (item: MenuItem): LocalMenuNode => {
                const directChildren = item.id ? (children[item.id] || []) : [];
                return {
                    ...item,
                    children: directChildren.map(buildNodeWithChildren)
                };
            };

            // Build tree starting from root items (no parent or null parent)
            const rootItems = children[''] || children['null'] || [];
            return rootItems.map(buildNodeWithChildren);
        };

        return buildTree(flatItems);
    }, [flatItems]);

    const [openstate, setOpenstate] = useState<boolean>(false);
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
            // Temporary debugging
            console.log('Navigating to submenu:', item.label);
            console.log('Children count:', item.children.length);
            console.log('Children items:', item.children.map(child => ({ label: child.label, hasChildren: child.children?.length > 0 })));
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
    
    // Lock/unlock body scroll when mobile menu opens/closes
    useEffect(() => {
        if (openstate) {
            // Prevent body scroll when menu is open
            document.body.style.overflow = 'hidden';
        } else {
            // Restore body scroll when menu is closed
            document.body.style.overflow = '';
        }
        
        // Cleanup function to restore scroll on unmount
        return () => {
            document.body.style.overflow = '';
        };
    }, [openstate]);

    // Reset current items when menuTree changes
    useEffect(() => {
        setCurrentItems(menuTree);
        setNavigationStack([]);
    }, [menuTree]);
    
    return(
        <div>
            <div 
                className='mobile-open-btn group hover:cursor-pointer md:hidden w-[35px]'
                onMouseDown = {() => setOpenstate(!openstate)}
            >
                <div className='ml-auto w-full border-white border-t-2 mb-2 transition-[width] duration-400 ease-in-out'></div>
                <div className='ml-auto w-full group-hover:w-[80%] border-white border-t-2 mb-2 transition-[width] duration-400 ease-in-out'></div>
                <div className='ml-auto w-full group-hover:w-[50%] border-white border-t-2 transition-[width] duration-400 ease-in-out'></div>
            </div>
            <nav className={`fixed top-0 left-0 w-full h-screen bg-neutral-strongest text-center flex flex-col ${openstate ? "block" : "hidden"}`}>
                <div className="flex-shrink-0 py-8">
                    <button 
                        className="mb-0 text-white" 
                        onClick={isAtRootLevel ? handleCloseMenu : handleNavigateBack}
                    >
                        {isAtRootLevel ? <IoCloseOutline size={30} /> : <TbArrowBackUp size={30} />}
                    </button>
                </div>
                <div className="flex-1 overflow-y-auto px-4 pb-8">
                    {(() => {
                        const { grouped, ungrouped } = groupItemsByCategory(currentItems);
                        
                        return (
                            <div>
                                {/* Render ungrouped items first */}
                                {ungrouped.length > 0 && (
                                    <ul className="mb-6">
                                        {ungrouped.map((item, index) => {
                                            const href = buildHref(item);
                                            const hasChildren = item.children && item.children.length > 0;
                                            
                                            return (
                                                <li className='mb-3' key={`ungrouped-${index}`}>
                                                    {hasChildren ? (
                                                        <button 
                                                            className='block w-full text-center text-white text-2xl'
                                                            onClick={() => handleNavigateToSubmenu(item)}
                                                        >
                                                            {item.label ?? "Item"}
                                                        </button>
                                                    ) : (
                                                        <Link 
                                                            className='block text-white text-2xl' 
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
                                
                                {/* Render grouped items */}
                                {Object.entries(grouped).map(([groupName, groupItems]) => (
                                    <div key={groupName} className="mb-6">
                                        <h3 className="text-white text-lg font-bold mb-3 border-b border-white/20 pb-2">
                                            {groupName}
                                        </h3>
                                        <ul>
                                            {groupItems.map((item, index) => {
                                                const href = buildHref(item);
                                                const hasChildren = item.children && item.children.length > 0;
                                                
                                                return (
                                                    <li className='mb-3' key={`${groupName}-${index}`}>
                                                        {hasChildren ? (
                                                            <button 
                                                                className='block w-full text-center text-white text-2xl'
                                                                onClick={() => handleNavigateToSubmenu(item)}
                                                            >
                                                                {item.label ?? "Item"}
                                                            </button>
                                                        ) : (
                                                            <Link 
                                                                className='block text-white text-2xl' 
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

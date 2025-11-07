"use client";

import { useState } from "react";

import Link from "next/link";
import { MenuNode } from "./Header";
import NavDropdown from "./NavDropdown";
import { Suspense } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { TbArrowBackUp } from "react-icons/tb";


export default function NavMenuMobile({
    tree,
}: {
    tree: MenuNode[];
}) {

    const buildHref = (item: any) => {
        if (item?.connectedObject?.slug) return `/${item.connectedObject.slug}`;
        if (item?.uri) return item.uri;
        return item?.url || "#";
    };

    const [openstate, setOpenstate] = useState<boolean>(false);
    const [currentLevel, setCurrentLevel] = useState<'main' | 'submenu'>('main');
    const [selectedParent, setSelectedParent] = useState<MenuNode | null>(null);
    
    const handleCloseMenu = () => {
        setOpenstate(false);
        setCurrentLevel('main');
        setSelectedParent(null);
    };
    
    console.log(tree);
    
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
                {currentLevel === 'main' ? (
                    // Main menu level
                    <>
                        <div className="flex-shrink-0 py-8">
                            <button className="mb-7" onClick={handleCloseMenu}>
                                <IoCloseOutline size={30} />
                            </button>
                        </div>
                        <div className="flex-1 overflow-y-auto px-4 pb-8">
                            <ul>
                                {tree.map((item, index) => {
                                    const href = buildHref(item);
                                    const hasChildren = item.children && item.children.length > 0;
                                    
                                    return (
                                        <li className='mb-3' key={index}>
                                            {hasChildren ? (
                                                <button 
                                                    className='block w-full text-center'
                                                    onClick={() => {
                                                        setSelectedParent(item);
                                                        setCurrentLevel('submenu');
                                                    }}
                                                >
                                                    {item.label ?? "Item"}
                                                </button>
                                            ) : (
                                                <Link className='block' href={href}>
                                                    {item.label ?? "Item"}
                                                </Link>
                                            )}
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </>
                ) : (
                    // Submenu level
                    <>
                        <div className="flex-shrink-0 py-8">
                            <button 
                                className="mb-7"
                                onClick={() => {
                                    setCurrentLevel('main');
                                    setSelectedParent(null);
                                }}
                            >
                                <TbArrowBackUp size={30} />
                            </button>
                        </div>
                        <div className="flex-1 overflow-y-auto px-4 pb-8">
                            <ul>
                                {selectedParent?.children?.map((child, index) => {
                                    const href = buildHref(child);
                                    return (
                                        <li className='mb-3' key={index}>
                                            <Link className='block' href={href}>
                                                {child.label ?? "Item"}
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </>
                )}
            </nav>
        </div>
    );


}

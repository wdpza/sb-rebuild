import React from 'react';
import Link from "next/link";

export default function Copyright({ footer }: { footer?: any }) {

    const currentYear = new Date().getFullYear();
    const menuNodes = footer?.policiesMenu?.menuItems?.nodes ?? [];

    return (
        <div className="bg-[#49474D] w-full">
            <div className="max-w-[1600px] mx-auto p-4 flex justify-between flex-row flex-wrap">
                <div className="text-white">Starbright © 2005 - {currentYear}  - All Rights Reserved.</div>
                <div className="flex space-x-3 text-neutral-600">
                    {menuNodes.map((item: any, index: number) => (
                        <React.Fragment key={item?.id ?? index}>
                        <Link href={item?.uri ?? '#'} className="text-white">
                            {item?.label ?? ''}
                        </Link>
                        {index < menuNodes.length - 1 && (
                            <span className="text-white">|</span>
                        )}
                        </React.Fragment>
                    ))}
                </div>      
            </div>
        </div>
    );
}

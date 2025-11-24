import React from 'react';
import Link from "next/link";

export default function Copyright({ footer }: { footer?: any }) {

    const currentYear = new Date().getFullYear();
    const menuNodes = footer?.policiesMenu?.menuItems?.nodes ?? [];

    return (
        <div className="bg-[#49474D] w-full">
            <div className="footer-wrapper font-extralight text-neutral-softest py-4 flex justify-center md:justify-between flex-row flex-wrap text-center gap-2">
                <div className=" text-sm md:text-base">Starbright © 2005 - {currentYear}  - All Rights Reserved.</div>
                <div className="flex space-x-3 text-sm md:text-base">
                    {menuNodes.map((item: any, index: number) => (
                        <React.Fragment key={item?.id ?? index}>
                        <Link href={item?.uri ?? '#'}>
                            {item?.label ?? ''}
                        </Link>
                        {index < menuNodes.length - 1 && (
                            <span>|</span>
                        )}
                        </React.Fragment>
                    ))}
                </div>      
            </div>
        </div>
    );
}

import React from 'react';

export default function Copyright( footer: any) {

    const currentYear = new Date().getFullYear();

    return (
        <div className="bg-[#49474D] w-full">
            <div className="max-w-[1600px] mx-auto p-4 flex justify-between">
                <div className="text-white">Starbright © 2005 - {currentYear}  - All Rights Reserved.</div>
                <div className="flex space-x-3 text-neutral-600">
                    {footer.footer.policiesMenu.menuItems.nodes.map((item: any, index: number) => (
                        <React.Fragment key={item.id}>
                        <a href={item.url} className="text-white">
                            {item.label}
                        </a>
                        {index < footer.footer.policiesMenu.menuItems.nodes.length - 1 && (
                            <span className="text-white">|</span>
                        )}
                        </React.Fragment>
                    ))}
                </div>      
            </div>
        </div>
    );
}

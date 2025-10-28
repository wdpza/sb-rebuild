import React from 'react';

export default function Copyright( footer: any) {

    const currentYear = new Date().getFullYear();
    console.log(footer);

    return (
        <div className="bg-[#49474D] w-full">
            <div className="max-w-[1600px] mx-auto p-4 flex justify-between">
                <div className="text-white">Starbright © 2005 - {currentYear}  - All Rights Reserved.</div>
            
            </div>
        </div>
    );
}

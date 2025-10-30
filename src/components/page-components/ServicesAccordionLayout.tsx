"use client"

import { useState } from "react"

export default function ServicesAccordionLayout({ content }: any) {
	// WordPress provides: [{ title, description }, ...]
	const [activeIndex, setActiveIndex] = useState(0)

	return (
			<div className="md:flex items-stretch md:min-h-[350px]">
				{content?.map((item: any, index: number) => {
					const isActive = index === activeIndex

					return (
						<div
							key={index}
							onMouseEnter={() => setActiveIndex(index)}
							className={`relative cursor-pointer overflow-hidden transition-all duration-500 ease-in-out lg:flex bg-cover bg-center ${isActive
									? "xl:flex-grow-[2] xl:flex-shrink xl:basis-0"
									: "xl:flex-1"
								}`}
							style={{ backgroundImage: isActive ? "url('/card-bg.png')" : "none" }}
						>
							<div
								className={`relative z-10 p-8 px-12 flex flex-col justify-center w-full items-center text-center ${isActive
										? "xl:items-start xl:text-left"
										: "xl:items-center xl:text-center"
									}`}
							>
								<h3
									className={`text-white text-4xl mb-4 transition-all duration-300 ${isActive ? "font-semibold" : "font-extralight"}`}
								>
									{item.title}
								</h3>

								<p 
									className={`text-white text-lg leading-relaxed transition-opacity duration-500 font-thin ${isActive ? "xl:block" : "xl:hidden"}`}>
									{item.description}
								</p>
							</div>
						</div>
					)
				})}
			</div>
	)
}

"use client"

import { useState } from "react"

export default function ServicesAccordionLayout({ content }: any) {
	// WordPress provides: [{ title, description }, ...]
	const [activeIndex, setActiveIndex] = useState(0)

	return (
			<div className="flex items-stretch min-h-[350px]">
				{content?.map((item: any, index: number) => {
					const isActive = index === activeIndex

					return (
						<div
							key={index}
							onMouseEnter={() => setActiveIndex(index)}
							className={`relative cursor-pointer overflow-hidden transition-all duration-500 ease-in-out flex`}
							style={{
								flex: isActive ? "2 1 0%" : "1 1 0%",
								backgroundImage: isActive
									? "url('/card-bg.png')"
									: "none",
								backgroundSize: "cover",
								backgroundPosition: "center",
							}}
						>
							<div
								className={`relative z-10 p-8 px-12 flex flex-col justify-center w-full ${isActive
										? "items-start text-left"
										: "items-center text-center"
									}`}
							>
								<h3
									className={`text-4xl mb-4 transition-all duration-300 ${isActive ? "font-semibold" : "font-extralight"
										}`}
								>
									{item.title}
								</h3>

								{isActive && (
									<p className="text-white text-lg leading-relaxed transition-opacity duration-500 font-thin">
										{item.description}
									</p>
								)}
							</div>

							{/* Optional overlay gradient for contrast */}
							<div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent"></div>
						</div>
					)
				})}
			</div>
	)
}

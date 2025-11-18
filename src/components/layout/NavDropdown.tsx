"use client";

import MegaMenu from "./MegaMenu";

export default function NavDropdown({
	item,
	index,
	isOpen,
	setOpenIndex,
}) {
	return (
		<li>
			{/* Trigger */}
			<button
				type="button"
				className="cursor-pointer text-neutral-softest text-lg transition inline-flex items-center gap-2 px-1"
				onClick={() => setOpenIndex(prev => (prev === index ? null : index))}
			>
				{item.label ?? "Menu"}

				<svg
					viewBox="0 0 20 20"
					fill="currentColor"
					className={`h-4 w-4 transition-transform ${
						isOpen ? "rotate-180" : ""
					}`}
				>
					<path d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" />
				</svg>
			</button>

			{/* Dropdown */}
			{isOpen && (
				<div className="absolute right-0 w-4xl mt-4 z-50 bg-[#171717] p-10 shadow-xl rounded-xl">
					<MegaMenu item={item} />
				</div>
			)}
		</li>
	);
}

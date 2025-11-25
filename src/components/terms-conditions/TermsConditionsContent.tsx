"use client";
import { useState, useEffect } from "react";

type TermItem = {
	id: string;
	title: string;
	content: string;
};

type TermsConditionsProps = {
	options: {
		termsConditions: {
			nodes: TermItem[];
		};
	};
};

export default function TermsConditionsContent({ options }: TermsConditionsProps) {
	const termsConditions = options.termsConditions.nodes;

	// Default selection = 1st item
	const [selected, setSelected] = useState<TermItem>(termsConditions[0]);

	// On mount: read hash (#id) and set selected item accordingly
	useEffect(() => {
		if (typeof window === "undefined") return;

		const hash = window.location.hash?.replace("#", "");

		if (!hash) return;

		const found = termsConditions.find((item) => item.id === hash);

		if (found) {
			setSelected(found);

			// Also scroll to the selected item (optional)
			const el = document.getElementById(hash);
			if (el) {
				el.scrollIntoView({ behavior: "smooth", block: "start" });
			}
		}
	}, [termsConditions]);

	return (
		<div
			id="terms_conditions"
			className="grid w-full max-w-[1600px] mx-auto grid-cols-1 lg:grid-cols-8 gap-8 px-4 sm:px-8 lg:px-12 py-10 sm:py-16"
		>
			{/* Sidebar */}
			<div className="lg:col-span-2">
				<aside className="terms-conditions-sidebar">
					<ul className="space-y-3">
						{termsConditions.map((item) => (
							<li key={item.id} id={item.id}>
								<button
									onClick={() => setSelected(item)}
									className={`cursor-pointer text-center w-full inline-block px-8 py-3 rounded-lg shadow-md font-semibold transition-all duration-300 
										${
											selected.id === item.id
												? "bg-gradient-starbright text-neutral-softest"
												: "bg-neutral-strongest gradient-border text-neutral-softest hover:bg-gradient-starbright"
										}
									`}
								>
									{item.title}
								</button>
							</li>
						))}
					</ul>
				</aside>
			</div>

			{/* Content */}
			<div className="lg:col-span-6 prose max-w-none">
				<h2 className="mb-4 font-bold text-2xl sm:text-3xl text-neutral-softest">
					{selected.title}
				</h2>

				<div
					className="text-neutral-softest terms-conditions-single-page-inner text-base"
					dangerouslySetInnerHTML={{ __html: selected.content }}
				/>
			</div>
		</div>
	);
}

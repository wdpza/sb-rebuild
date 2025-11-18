"use client";

import Link from "next/link";

export default function MegaMenu({ item }) {
	if (!item?.children) return null;

	// Group children by their category group
	const columns = {};

	item.children.forEach(child => {
		const groups =
			child?.mainMenuFields?.categoryGrouping?.nodes ?? [];

		groups.forEach(group => {
			const id = group.databaseId;
			if (!columns[id]) {
				columns[id] = {
					name: group.name,
					items: [],
				};
			}
			columns[id].items.push(child);
		});
	});

	return (
		<div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl">
			{Object.values(columns).map(col => (
				<div key={col.name} className="flex flex-col space-y-4">
					<h3 className="text-gradient-starbright text-lg font-bold text-neutral-soft">
						{col.name}
					</h3>

					<ul className="space-y-2">
						{col.items.map(link => (
							<li key={link.id}>
								<Link
									href={link.uri || link.url}
									className="text-neutral-softer text-sm hover:text-accent-soft transition-colors"
								>
									{link.label}
								</Link>
							</li>
						))}
					</ul>
				</div>
			))}
		</div>
	);
}

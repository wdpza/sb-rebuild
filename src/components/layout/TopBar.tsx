"use client";

import Divider from "./Divider"

import { FiPhone } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

export default function TopBar() {
	const { data: topbar, isLoading, isError } = useTopbar();

	if (isLoading) return <div />;
	if (isError || !topbar) return <div />;

	// Direct access since Topbar is a single type
	const logo = topbar.Logo;
	const logoUrl = logo?.url ? String(logo.url) : null;
	const menuItems = topbar.TopMenu ?? [];
	const tel = topbar.Tel ?? null;
	const whatsapp = topbar.Whatsapp ?? null;

	return (
		<header className="absolute top-0 left-0 right-0 z-50">
			{/* constrain width */}
			<div className="max-w-screen-xl mx-auto flex flex-col justify-between p-4 bg-transparent">
				<div className="flex flex-row justify-between">
					<div className="flex flex-row px-4 text-sm">
						<div className="flex flex-row items-center">
							<FiPhone className="mr-2" /> {tel}
						</div>
						<span className="mx-2">|</span>
						<div className="flex flex-row items-center">
							<FaWhatsapp className="mr-2" /> {whatsapp}
						</div>
					</div>
				</div>
				<Divider />
				<div className="flex items-center justify-between">
					<div className="flex items-start justify-start">
						{logoUrl ? (
							<img
								src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${logoUrl}`}
								alt={logo?.alternativeText || "Logo"}
								className="h-10 object-contain w-auto ml-4"
								width={logo?.width ?? 206}
								height={logo?.height ?? 82}
							/>
						) : null}
					</div>
					<nav>
						<ul className="flex gap-6">
							{Array.isArray(menuItems) &&
								menuItems.map((item: any, index: number) => {
									const key = item.id ?? index;
									const label = item.Label ?? `Item ${index + 1}`;
									const href = item.Url ?? "#";

									return (
										<li key={key}>
											<a
												href={String(href)}
												className="hover:underline text-neutral-softest"
											>
												{String(label)}
											</a>
										</li>
									);
								})}
						</ul>
					</nav>
				</div>
			</div>
		</header>
	);
}

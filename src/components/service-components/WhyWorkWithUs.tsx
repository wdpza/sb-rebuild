'use client';

import { useParams } from "next/navigation";

import WhyWorkWithUsBreath from "../shared/WhyWorkWithUsBreath";
import WhyWorkWithUsDivider from "../shared/WhyWorkWithUsDivider";

type Item = {
	title: string;
	description: string;
};

export default function WhyWorkWithUs({
	introTitle,
	introText,
	item,
	backgroundImage,
	ctaButtonGroup,
	style,
	columns
}: any) {
	console.log(introText)
	const params = useParams<{ slug: string; }>()
	const {slug} = params;

	const layoutStyle = style[0] || "style_2";

	if (layoutStyle === "style_1") {
		return <WhyWorkWithUsBreath
			introTitle={introTitle}
			introText={introText}
			item={item}
			backgroundImage={backgroundImage}
			ctaButtonGroup={ctaButtonGroup}
			slug={slug}
			columns={columns}
		/>
	}

	if (layoutStyle === "style_2") {
		return <WhyWorkWithUsDivider
			introTitle={introTitle}
			introText={introText}
			item={item}
			backgroundImage={backgroundImage}
			ctaButtonGroup={ctaButtonGroup}
			slug={slug}
			columns={columns}
		/>
	}

	return null;

}
import WhyWorkWithUsBreath from "../shared/WhyWorkWithUsBreath";
import WhyWorkWithUsDivider from "../shared/WhyWorkWithUsDivider";

type Item = {
	title: string;
	description: string;
};

export default function WhyWorkWithUs({
	introTitle,
	item,
	backgroundImage,
	ctaButtonGroup,
	style,
	slug
}: any) {

	const layoutStyle = style[0] || "style_2";

	if (layoutStyle === "style_1") {
		return <WhyWorkWithUsBreath
			introTitle={introTitle}
			item={item}
			backgroundImage={backgroundImage}
			ctaButtonGroup={ctaButtonGroup}
			slug={slug}
		/>
	}

	if (layoutStyle === "style_2") {
		return <WhyWorkWithUsDivider
			introTitle={introTitle}
			item={item}
			backgroundImage={backgroundImage}
			ctaButtonGroup={ctaButtonGroup}
			slug={slug}
		/>
	}

	return null;

}
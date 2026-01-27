import WhyWorkWithUsBreath from "./WhyWorkWithUsBreath";
import WhyWorkWithUsDivider from "./WhyWorkWithUsDivider";

type Item = {
	title: string;
	description: string;
};

export default function WhyWorkWithUs({
	introTitle,
	item,
	backgroundImage,
	ctaButtonGroup,
	style
}: any) {

	const layoutStyle = style[0] || "style_2";

	console.log(layoutStyle)
	/*
	If style = style_1 return <WhyWorkWithUsBreath ... />
	Otherwise, return null
	*/

	if (layoutStyle === "style_1") {
		return <WhyWorkWithUsBreath
			introTitle={introTitle}
			item={item}
			backgroundImage={backgroundImage}
			ctaButtonGroup={ctaButtonGroup}
		/>
	}

	if (layoutStyle === "style_2") {
		return <WhyWorkWithUsDivider
			introTitle={introTitle}
			item={item}
			backgroundImage={backgroundImage}
			ctaButtonGroup={ctaButtonGroup}
		/>
	}

	return null;

}
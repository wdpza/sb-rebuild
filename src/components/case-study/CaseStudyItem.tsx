
import DOMPurify from 'isomorphic-dompurify';
import Link from "next/link";
import { makeSectionId } from "@/lib/utils/section-id";

type Section = {
	sectionTitle?: string | null;
	sectionDescription?: string | null;
	sectionCtaLink?: { title?: string; url?: string; target?: string } | null;
};

export default function CaseStudyItem({ item }: { item: any }) {
	const sections: Section[] = item?.caseStudies?.pageSection ?? [];

	return (
		<article className="scroll-smooth case-study">
			<div className="inline-block bg-white rounded-md mb-6 px-4 py-2 uppercase font-semibold"><span className="text-gradient-starbright">{item?.caseStudies.howLongRead}</span></div>

			{sections.map((s, i) => {
				const id = makeSectionId(s.sectionTitle, i);
				return (
					<section
						id={id}
						key={id}
						className="scroll-mt-6 rounded-xl mb-8"
					>
						{s.sectionTitle ? (
							<h2 className="subtitle font-bold mb-8 text-neutral-softest">{s.sectionTitle}</h2>
						) : null}

						{s.sectionDescription ? (
							<div
								className="text-lg prose prose-invert max-w-none mb-16"
								dangerouslySetInnerHTML={{ __html: s.sectionDescription }}
							/>
						) : null}

						{s.sectionCtaLink?.url ? (
							<Link
								href={s.sectionCtaLink.url}
								target={s.sectionCtaLink.target || "_blank"}
								rel="noopener"
								className="inline-flex items-center justify-center rounded-md px-8 py-3 font-semibold text-neutral-softest gradient-border mt-8"
							>
								{s.sectionCtaLink.title || "Learn more"}
							</Link>
						) : null}
					</section>
				);
			})}
			{item?.caseStudies.factCheckedB ? (
				<div className="inline-block bg-white rounded-xl p-4 mb-8"><span className="text-gradient-starbright">Fact Checked By: {item?.caseStudies.factCheckedBy}</span></div>
			) : null}
			{item.caseStudies.clientFeedbackClient ? (
				<section
					className="scroll-mt-6 rounded-xl bg-white/5 p-6"
				>
					<h2 className="subtitle font-bold mb-8 text-neutral-softest">Client Feedback</h2>
					<div
						className="mt-6 text-neutral-softest"
						dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item.caseStudies.clientFeedback) }}
					/>
					<p className="text-gradient-starbright mt-6">{item.caseStudies.clientFeedbackClient}</p>
				</section>
			) : null}
		</article>
	);
}

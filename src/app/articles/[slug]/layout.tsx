export default async function ArticleLayout({
	children,
}: {
	children: React.ReactNode;
}) {

	return (
		<div className="article-layout">
			{children}
		</div>
	);
}

import { headers } from "next/headers";
import Forms from "../shared/Forms";

async function getGravityForm(id: number) {
	if (!id) return null;

	const auth = Buffer.from(
		`${process.env.GF_API_KEY}:${process.env.GF_API_SECRET}`
	).toString("base64");

	const url = `${process.env.NEXT_PUBLIC_WP_BASE_URL}/wp-json/gf/v2/forms/${id}`;

	const res = await fetch(url, {
		next: { revalidate: false, tags: ["wordpress"] },
		headers: {
			Authorization: `Basic ${auth}`,
		},
	});

	if (!res.ok) {
		console.error("Gravity Forms fetch failed:", await res.text());
		return null;
	}

	return res.json();
}

export default async function FormLayout({ title, formId, backgroundImage, sourceId, titleAlign, padding }: any) {

    const base_url  = process.env.NEXT_PUBLIC_WP_BASE_URL;
    const backgroundImageUrl = backgroundImage?.node?.filePath ? `${base_url}${backgroundImage.node.filePath}` : null;

    const form = formId ? await getGravityForm(formId) : null;

    const headersList = await headers();
    const hasContactData = headersList.has("x-everlytic-contact");
    const displayTitle = hasContactData ? "Confirm Details & Win a Free Domain with Hosting" : title;

    return (
        <div style={{
            backgroundImage: backgroundImageUrl ? `url(${backgroundImageUrl})` : undefined,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        }}
        >
            <div className={`layout-wrapper py-12`} style={{ padding: padding ? `${padding}` : undefined }}>
                {displayTitle && (
                    <h2 className={`uppercase hero-title text-balance font-extrabold text-gradient-starbright ${titleAlign === "center" ? "text-center" : titleAlign === "right" ? "text-right" : "text-left"}`}>
                        {displayTitle}
                    </h2>
                )}
                {form && (
                    <Forms form={form} formId={formId} sourceId={sourceId} />
                )}
            </div>
        </div>
    )
}
"use client";

type GFChoice = {
	text: string;
	value: string;
	isSelected?: boolean;
};

type GFInput = {
	id: string;
	label?: string;
	name?: string;
	isHidden?: boolean;
};

type GFField = {
	id: number;
	type: string;
	label?: string;
	adminLabel?: string;
	isRequired?: boolean;
	placeholder?: string;
	description?: string;
	descriptionPlacement?: "above" | "below" | "";
	cssClass?: string;
	content?: string;
	choices?: GFChoice[];
	inputs?: GFInput[] | null;

	layoutGridColumnSpan?: number;

	checkboxLabel?: string;
	descriptionPlaceholder?: string;
	checked_indicator_url?: string;
	checked_indicator_markup?: string;

	multipleFiles?: boolean;
	allowedExtensions?: string;
	maxFiles?: string | number;
	maxFileSize?: string | number;

	[key: string]: any;
};

type GravityForm = {
	id: number;
	title?: string;
	description?: string;
	fields: GFField[];
};

export default function Forms({ form, formId }: { form: GravityForm, formId: number }) {
	if (!form) return null;

    const colSpanMap: Record<number, string> = {
        1: "col-span-1",
        2: "col-span-2",
        3: "col-span-3",
        4: "col-span-4",
        5: "col-span-5",
        6: "col-span-6",
        7: "col-span-7",
        8: "col-span-8",
        9: "col-span-9",
        10: "col-span-10",
        11: "col-span-11",
        12: "col-span-12",
    };

    function colClass(field: GFField) {
        const span = field.layoutGridColumnSpan ?? 12;
        return colSpanMap[span] || "col-span-12";
    }

	function renderInput(field: GFField) {
		const baseId = `input_${field.id}`;
		const common =
			"bg-[#1F1F1F96] placeholder-white text-neutral-softest border border-[#353536] p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500";

		switch (field.type) {
			case "text":
			case "email":
			case "phone":
			case "number":
			case "website":
				return (
					<input
						id={baseId}
						name={baseId}
						type={
							field.type === "phone"
								? "tel"
								: field.type === "website"
								? "url"
								: field.type
						}
						placeholder={field.placeholder}
						required={field.isRequired}
						className={common}
					/>
				);

			case "textarea":
				return (
					<textarea
						id={baseId}
						name={baseId}
						rows={5}
						placeholder={field.placeholder}
						required={field.isRequired}
						className={common}
					/>
				);

			case "select":
				return (
					<select
						id={baseId}
						name={baseId}
						required={field.isRequired}
						className={common}
						defaultValue=""
					>
						<option value="" disabled>
							Select…
						</option>
						{field.choices?.map((c, i) => (
							<option key={i} value={c.value}>
								{c.text}
							</option>
						))}
					</select>
				);

			case "fileupload":
				return (
					<input
						type="file"
						id={baseId}
						name={baseId}
						required={field.isRequired}
						className={common}
					/>
				);

			case "consent":
				return (
					<label className="flex items-start gap-3">
						<input
							type="checkbox"
							id={baseId}
							name={baseId}
							required={field.isRequired}
							className="mt-1"
						/>
						<span>{field.checkboxLabel || field.label}</span>
					</label>
				);

			case "html":
			case "section":
				return (
					<div
						className="my-4"
						dangerouslySetInnerHTML={{ __html: field.content || "" }}
					/>
				);

			default:
				console.warn("Unsupported GF field:", field.type, field);
				return null;
		}
	}

	function renderField(field: GFField) {
		// HTML-only fields
		if (field.type === "html" || field.type === "section") {
			return (
				<div
					key={field.id}
					className={colClass(field)}
					dangerouslySetInnerHTML={{ __html: field.content || "" }}
				/>
			);
		}

		const descriptionAbove = field.description && field.descriptionPlacement === "above";
		const descriptionBelow =
			field.description && field.descriptionPlacement !== "above";

		return (
			<div
				key={field.id}
				className={`${colClass(field)} flex flex-col gap-2 ${field.cssClass || ""}`}
			>
				{/* Label */}
				{field.label && (
					<label htmlFor={`input_${field.id}`} className="font-semibold text-neutral-softest">
						{field.label}
						{field.isRequired && <span className="text-red-500 ml-1">*</span>}
					</label>
				)}

				{/* Description above */}
				{descriptionAbove && (
					<p className="text-sm text-neutral-softest/80">{field.description}</p>
				)}

				{/* Input */}
				{renderInput(field)}

				{/* Description below */}
				{descriptionBelow && (
					<p className="text-sm text-neutral-softest/80">{field.description}</p>
				)}
			</div>
		);
	}

	return (
		<div className="mt-10 w-full">
			{/* Description */}
			{form.description && (
				<div
					className="mb-6 text-neutral-softest/90"
					dangerouslySetInnerHTML={{ __html: form.description }}
				/>
			)}

			{/* GRID LAYOUT */}
			<div className="grid grid-cols-12 gap-6">
				{form.fields.map((field) => renderField(field))}
			</div>
		</div>
	);
}

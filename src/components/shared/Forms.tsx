"use client";

import { useState, useRef } from "react";

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
    const formRef = useRef<HTMLFormElement>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

    if (!form) return null;

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus("idle");

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch("/api/submit-form", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    formId,
                    data,
                }),
            });

            if (response.ok) {
                setSubmitStatus("success");
                formRef.current?.reset();
            } else {
                setSubmitStatus("error");
            }
        } catch (error) {
            console.error("Form submission error:", error);
            setSubmitStatus("error");
        } finally {
            setIsSubmitting(false);
        }
    }

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
                        <span className="text-neutral-soft">{field.checkboxLabel || field.label}</span>
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
        <form ref={formRef} onSubmit={handleSubmit} className="mt-10 w-full">
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

            {/* Submit Button */}
            <div className="mt-8">
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-500 disabled:cursor-not-allowed text-white font-semibold py-3 px-8 rounded transition-colors duration-200"
                >
                    {isSubmitting ? "Submitting..." : "Submit"}
                </button>
            </div>

            {/* Status Messages */}
            {submitStatus === "success" && (
                <div className="mt-4 p-4 bg-green-600/20 border border-green-600 rounded text-green-400">
                    Thank you! Your form has been submitted successfully.
                </div>
            )}
            {submitStatus === "error" && (
                <div className="mt-4 p-4 bg-red-600/20 border border-red-600 rounded text-red-400">
                    There was an error submitting your form. Please try again.
                </div>
            )}
        </form>
    );
}
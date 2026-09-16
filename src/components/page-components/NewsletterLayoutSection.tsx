"use client";

import DOMPurify from "isomorphic-dompurify";
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { useState } from "react";

type Props = { title?: string | null; description?: string | null };

function NewsletterForm() {
    const { executeRecaptcha } = useGoogleReCaptcha();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [honeypot, setHoneypot] = useState("");
    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

    async function submit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (!executeRecaptcha) return;
        setStatus("submitting");

        try {
            const recaptchaToken = await executeRecaptcha("newsletter_submit");
            const response = await fetch("/api/submit-form", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ formId: 4, data: { name, email, _hp: honeypot }, recaptchaToken }),
            });
            const result = await response.json();
            if (!response.ok || !result.success) throw new Error("Subscription failed");
            setName("");
            setEmail("");
            setStatus("success");
        } catch {
            setStatus("error");
        }
    }

    return (
        <form onSubmit={submit} className="mx-auto mt-8 grid w-full max-w-[760px] gap-3 sm:grid-cols-[1fr_1fr_auto]">
            <input aria-hidden="true" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(event) => setHoneypot(event.target.value)} className="absolute left-[-9999px] size-px" />
            <label className="sr-only" htmlFor="newsletter-name">First name</label>
            <input id="newsletter-name" type="text" required autoComplete="given-name" placeholder="Enter your first name" value={name} onChange={(event) => setName(event.target.value)} className="min-h-12 rounded-sm border border-white/10 bg-[#49474d] px-5 text-[16px] text-white placeholder:text-[#cecdcf] focus:border-[#eeb42c] focus:outline-none" />
            <label className="sr-only" htmlFor="newsletter-email">Email address</label>
            <input id="newsletter-email" type="email" required autoComplete="email" placeholder="Enter your email address" value={email} onChange={(event) => setEmail(event.target.value)} className="min-h-12 rounded-sm border border-white/10 bg-[#49474d] px-5 text-[16px] text-white placeholder:text-[#cecdcf] focus:border-[#eeb42c] focus:outline-none" />
            <button type="submit" disabled={status === "submitting"} className="min-h-12 cursor-pointer rounded-sm bg-[#eeb42c] px-8 text-[16px] font-semibold text-[#171717] transition hover:bg-[#f3c951] disabled:cursor-not-allowed disabled:opacity-60">{status === "submitting" ? "Subscribing…" : "Subscribe"}</button>
            <div aria-live="polite" className="sm:col-span-3">
                {status === "success" && <p className="text-center text-sm text-green-400">Thank you for subscribing.</p>}
                {status === "error" && <p className="text-center text-sm text-red-400">Subscription failed. Please try again.</p>}
            </div>
        </form>
    );
}

export default function NewsletterLayoutSection({ title, description }: Props) {
    return (
        <section className="bg-[#171717] px-5 py-20 text-center text-white">
            <div className="mx-auto w-full max-w-[1400px]">
                {title && <div className="text-[32px] font-bold leading-tight md:text-[38px] [&_p]:m-0 [&_b]:bg-[linear-gradient(90deg,#bd208b_0%,#f15d22_75%,#eeb42c_100%)] [&_b]:bg-clip-text [&_b]:text-transparent [&_b]:[-webkit-text-fill-color:transparent] [&_strong]:bg-[linear-gradient(90deg,#bd208b_0%,#f15d22_75%,#eeb42c_100%)] [&_strong]:bg-clip-text [&_strong]:text-transparent [&_strong]:[-webkit-text-fill-color:transparent]" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(title) }} />}
                {description && <div className="mx-auto mt-5 max-w-[760px] text-[18px] leading-7 text-white [&_p]:m-0" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(description) }} />}
                <GoogleReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}><NewsletterForm /></GoogleReCaptchaProvider>
            </div>
        </section>
    );
}

"use client";

import { useState } from "react";
//import { getDomains } from "@/lib/graphql/queries/getDomains"

const TLD_LIST = [
    ".com", ".co.za", ".net", ".org", ".org.za", ".info", ".biz",
    ".co.uk", ".de", ".eu", ".mobi", ".co", ".cc", ".tv",
    ".capetown", ".durban", ".joburg", ".africa", ".xyz",
    ".online", ".top", ".shop", ".site", ".me", ".net.za",
    ".travel", ".agency", ".digital", ".tech", ".global", ".app"
];

export default function WhoisLayout() {
    const [domain, setDomain] = useState("");
    const [result, setResult] = useState<any>(null);
    const [availableDomains, setAvailableDomains] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const hasSearched = result !== null;

    //const domains = getDomains()
    //console.log(domains)

    async function handleLookup() {
        if (!domain.trim()) return;

        setLoading(true);
        setResult(null);
        setAvailableDomains([]);

        // Primary WHOIS check
        const res = await fetch("/api/whois", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ domain }),
        });

        const data = await res.json();
        setResult(data);

        const isTaken = data?.data?.domainName;

        // If taken, now check suggested TLDs
        if (isTaken) {
            const base = domain.includes(".") ? domain.split(".")[0] : domain;

            const suggestions: string[] = [];

            // Run each lookup sequentially to avoid hammering your API
            for (const tld of TLD_LIST) {
                const altDomain = `${base}${tld}`;

                try {
                    const resp = await fetch("/api/whois", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ domain: altDomain }),
                    });

                    const altData = await resp.json();
                    const taken = altData?.data?.domainName;

                    if (!taken) {
                        suggestions.push(altDomain);
                    }
                } catch (e) {
                    // fail silently, continue
                }
            }

            setAvailableDomains(suggestions);
        }

        setLoading(false);
    }

    function handleChange(e: any) {
        setDomain(e.target.value);
        setResult(null);
        setAvailableDomains([]);
    }

    const isTaken = result?.data?.domainName;
    const isAvailable = hasSearched && !isTaken;

    return (
        <div className="flex flex-col justify-center max-w-[1600px] mx-auto w-full">

            <div className="input-wrapper flex justify-between max-w-xl mx-auto w-full border border-[#353536] px-4 py-2 mt-16 rounded gap-4 bg-[#1F1F1F96]">
                <input
                    className="outline-hidden w-full text-white"
                    value={domain}
                    onChange={handleChange}
                    placeholder="example.com"
                />

                {!hasSearched ? (
                    <button
                        className="gradient-border rounded py-2 px-6 cursor-pointer text-white"
                        onClick={handleLookup}
                        disabled={loading}
                    >
                        Search
                    </button>
                ) : isTaken ? (
                    <button
                        className="gradient-border rounded py-2 px-6 cursor-pointer text-white"
                        onClick={handleLookup}
                        disabled={loading}
                    >
                        Search
                    </button>
                ) : (
                    <button className="gradient-border rounded py-2 px-6 cursor-pointer text-white">
                        Register
                    </button>
                )}
            </div>

            {loading && <p className="text-center mt-4 text-white">Loading...</p>}

            {hasSearched && (
                <>
                    {isTaken ? (
                        <div className="text-red-400 text-center mt-4">Domain is taken.</div>
                    ) : (
                        <div className="text-green-400 text-center mt-4">

                        </div>
                    )}
                </>
            )}

            {isTaken && availableDomains.length > 0 && (
                <div className="mt-6 mx-auto max-w-xl border border-neutral-stronger rounded p-4">
                    <h3 className="text-neutral-softer mb-2">Suggested available domains</h3>
                    <ul className="space-y-1">
                        {availableDomains.map((d) => (
                            <li key={d} className="text-green-400">{d}</li>
                        ))}
                    </ul>
                </div>
            )}

            {result && (
                <pre className="text-xs whitespace-pre-wrap mt-6 text-white">
                    {JSON.stringify(result, null, 2)}
                </pre>
            )}
        </div>
    );
}


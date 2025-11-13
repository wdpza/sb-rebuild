"use client";

import { useState } from "react";

export default function WhoisLookup() {
    const [domain, setDomain] = useState("");
    const [result, setResult] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    async function handleLookup() {
        if (!domain.trim()) return;

        setLoading(true);
        setResult(null);

        const res = await fetch("/api/whois", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ domain }),
        });

        const data = await res.json();
        setResult(data);
        setLoading(false);
    }

    return (
        <div>
            <input
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                placeholder="example.com"
            />

            <button onClick={handleLookup} disabled={loading}>
                Lookup
            </button>

            {loading && <p>Loading...</p>}

            {result && (
                <pre className="text-xs whitespace-pre-wrap">
                    {JSON.stringify(result, null, 2)}
                </pre>
            )}
        </div>
    );
}

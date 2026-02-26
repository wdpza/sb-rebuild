import type { NextConfig } from "next";

import { fetchRankMathRedirections } from "./src/lib/graphql/queries/getRedirections";

const nextConfig: NextConfig = {
    /* config options here */
    images: {
        remotePatterns: [
            { protocol: "https", hostname: "cms.starbright.co.za" },
        ],
        formats: ['image/avif', 'image/webp'],
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
        minimumCacheTTL: 60 * 60 * 24 * 365, // Cache for 1 year
        qualities: [75, 85, 90, 100], // Configure quality presets
    },
    async redirects() {
        try {
            const rd = await fetchRankMathRedirections();
            return rd.map((r) => {
                // use the first source pattern; more complex rules may be necessary
                const source = r.sources?.[0]?.pattern || '/';
                const permanent = r.status === '301';
                return {
                    source,
                    destination: r.redirectToUrl,
                    permanent,
                };
            });
        } catch (err) {
            console.error('Failed to load Rank Math redirects:', err);
            return [];
        }
    },
};

export default nextConfig;
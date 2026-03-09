import type { NextConfig } from "next";

async function fetchRedirections() {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_WP_BASE_URL}/wp-json/custom/v1/redirections`
        );
        if (!res.ok) return [];
        return res.json() as Promise<{ source: string; destination: string; status: string }[]>;
    } catch {
        return [];
    }
}

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
        const items = await fetchRedirections();
        return items
            .filter((item) => item.source && item.destination)
            .map((item) => {
                // source is a full URL — extract just the pathname
                let source: string;
                try {
                    source = new URL(item.source).pathname;
                } catch {
                    source = item.source.startsWith('/') ? item.source : `/${item.source}`;
                }
                return {
                    source,
                    destination: item.destination,
                    permanent: item.status === '301',
                };
            });
    },
};

export default nextConfig;
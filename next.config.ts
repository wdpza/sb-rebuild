import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
   images: {
    remotePatterns: [
      { protocol: "https", hostname: "cms.starbright.co.za" },
    ]
  }
};

export default nextConfig;

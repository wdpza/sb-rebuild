import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
   images: {
    remotePatterns: [
      { protocol: "http", hostname: "z-starbright-rb.co.za.dedi1011.jnb2.host-h.net" },
    ],
  },
};

export default nextConfig;

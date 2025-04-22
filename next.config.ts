import type { NextConfig } from "next";
import { hostname } from "os";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
      protocol: 'https',
      hostname: '*',
      }
    ]
  },
  experimental: {
    ppr: 'incremental',
  },
  devIndicators: {
    position: 'bottom-left',
  }
};

export default nextConfig;

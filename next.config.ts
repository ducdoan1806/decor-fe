import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["placehold.co", "localhost"], // add the hostname you’re using
    // OR, if you need more granular control:
    // remotePatterns: [
    //   {
    //     protocol: 'https',
    //     hostname: 'placehold.co',
    //     port: '',
    //     pathname: '/**',
    //   },
    // ],
  },
};

export default nextConfig;

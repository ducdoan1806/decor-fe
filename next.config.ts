import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // domains: [
    //   "placehold.co",
    //   "localhost",
    //   "a.ankidecor.com.vn",
    //   "ankidecor.com.vn",
    // ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "a.ankidecor.com.vn",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "ankidecor.com.vn",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;

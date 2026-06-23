import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  async redirects() {
    return [
      {
        source: "/our-plan",
        destination: "/our-process",
        permanent: true,
      },
      {
        source: "/our-customer-journey",
        destination: "/our-process",
        permanent: true,
      },
      {
        source: "/values",
        destination: "/about-us",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "armstrong-cap.com",
        pathname: "/wp-content/uploads/**",
      },
    ],
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
};

export default nextConfig;

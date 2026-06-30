import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  async redirects() {
    return [
      {
        source: "/our-plan",
        destination: "/about-us#our-process",
        permanent: true,
      },
      {
        source: "/our-customer-journey",
        destination: "/about-us#our-process",
        permanent: true,
      },
      {
        source: "/values",
        destination: "/about-us#about",
        permanent: true,
      },
      {
        source: "/our-team",
        destination: "/about-us#our-team",
        permanent: true,
      },
      {
        source: "/our-process",
        destination: "/about-us#our-process",
        permanent: true,
      },
      {
        source: "/our-research",
        destination: "/about-us#our-research",
        permanent: true,
      },
      {
        source: "/our-accolade",
        destination: "/about-us",
        permanent: true,
      },
      {
        source: "/beginning-to-invest",
        destination: "/who-we-help#beginning-to-invest",
        permanent: true,
      },
      {
        source: "/women-investors",
        destination: "/who-we-help#women-investors",
        permanent: true,
      },
      {
        source: "/high-net-worth-individuals-hnis",
        destination: "/who-we-help#high-net-worth-individuals-hnis",
        permanent: true,
      },
      {
        source: "/non-resident-indians-nri",
        destination: "/who-we-help#non-resident-indians-nri",
        permanent: true,
      },
      {
        source: "/pre-retirement-planning",
        destination: "/who-we-help#pre-retirement-planning",
        permanent: true,
      },
      {
        source: "/career-transition",
        destination: "/who-we-help#career-transition",
        permanent: true,
      },
      {
        source: "/career-send-resume",
        destination: "/career",
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

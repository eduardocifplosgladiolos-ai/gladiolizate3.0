import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["three", "@react-three/fiber", "lenis"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
    ],
  },
};

export default nextConfig;

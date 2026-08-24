import type { NextConfig } from "next";

const nextConfig: NextConfig = {
 images: {
    remotePatterns: [
       {
        protocol: "https",
        hostname: "authjs.dev",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
  reactCompiler: true,
};

export default nextConfig;

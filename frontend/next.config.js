
import("./src/env.mjs");

/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone', 
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "avatars.githubusercontent.com",
            },
            {
                protocol: "https",
                hostname: "lh3.googleusercontent.com",
            },
            {
                protocol: "https",
                hostname: "randomuser.me",
            },
        ],
    },
    experimental: {
        serverComponentsExternalPackages: ["@prisma/client"],
    },
};

module.exports = nextConfig;

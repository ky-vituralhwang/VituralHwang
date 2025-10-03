
/** @type {import('next').NextConfig} */

import { NextConfig } from "next";

const nextConfig:NextConfig = async () => {
    return {
        reactStrictMode: false,
        experimental: {
          scrollRestoration: true,
        },
        sassOptions: {
            modules: true,
            additionalData: `
                @use "@styles/mixins.scss" as *;
                @use "@styles/colors.scss" as *;
            `,
        },
        images: {
            remotePatterns: [
                {
                    hostname: "images.prismic.io",
                    protocol: "https",
                },
                {
                    hostname: "images.unsplash.com",
                    protocol: "https",
                }
            ],
            formats: ["image/avif", "image/webp"],
        },
        compiler: {
            removeConsole: process.env.NODE_ENV === 'production' ? {
                exclude: ['error', 'warn'],
            } : false,
        },
    }
};

export default nextConfig;
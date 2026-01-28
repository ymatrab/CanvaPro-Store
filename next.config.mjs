import { setupDevPlatform } from '@cloudflare/next-on-pages/next-dev';

/** @type {import('next').NextConfig} */
if (process.env.NODE_ENV === 'development') {
    await setupDevPlatform();
}

const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
    },
    images: { unoptimized: true }
};

export default nextConfig;

/** @type {import('next').NextConfig} */

if (process.env.NODE_ENV === 'development') {
    const { setupDevPlatform } = await import('@cloudflare/next-on-pages/next-dev');
    await setupDevPlatform();
}

const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
    },
    images: { unoptimized: true }
};

export default nextConfig;

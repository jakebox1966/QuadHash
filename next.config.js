// 다국어 설정을 위한 next config
const withNextIntl = require('next-intl/plugin')('./i18n.ts')

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    async rewrites() {
        return [
            {
                source: '/api/v1/:path*',
                destination: `${process.env.NEXT_PUBLIC_API_HOST_URL}/api/v1/:path*`,
            },
            // {
            //     source: '/:path*',
            //     destination: `${process.env.NEXT_PUBLIC_HOST_URL}/about`,
            // },
        ]
    },
    images: {
        minimumCacheTTL: 600,
        remotePatterns: [{ protocol: 'https', hostname: '**' }],
    },
    logging: {
        fetches: {
            fullUrl: true,
        },
    },
}

module.exports = withNextIntl(nextConfig)

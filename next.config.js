// 다국어 설정을 위한 next config
const withNextIntl = require('next-intl/plugin')('./i18n.ts')

/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/api/v1/:path*',
                destination: `${process.env.NEXT_PUBLIC_API_HOST_URL}/api/v1/:path*`,
            },
        ]
    },
    logging: {
        fetches: {
            fullUrl: true,
        },
    },
    reactStrictMode: false,
}

module.exports = withNextIntl(nextConfig)

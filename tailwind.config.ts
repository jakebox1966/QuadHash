import type { Config } from 'tailwindcss'
const withMT = require('@material-tailwind/react/utils/withMT')

const config: Config = withMT({
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
        './node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx,mdx}',
        './node_modules/@material-tailwind/react/theme/components**/*.{js,ts,jsx,tsx,mdx}',
    ],
    // darkMode: ['class'],
    theme: {
        extend: {
            // backgroundImage: {
            //     'header-section': "gurl('https://d1fv2z2t2pz1fy.cloudfront.net/images/0.png')",
            // },
        },
    },
    plugins: [],
})
export default config

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
    future: {
        hoverOnlyWhenSupported: true,
    },
    // darkMode: ['class'],
    theme: {
        fontFamily: {
            NeuePlak: ['NeuePlak'],
            NanumSquare: ['NanumSquare'],
            PlusJakartaSans: ['PlusJakartaSans'],
        },
        extend: {
            screens: {
                sm: '640px',
                // => @media (min-width: 640px) { ... }

                md: '768px',
                // => @media (min-width: 768px) { ... }

                lg: '1215px',
                // => @media (min-width: 1024px) { ... }

                xl: '1280px',
                // => @media (min-width: 1280px) { ... }

                '2xl': '1536px',
                // => @media (min-width: 1536px) { ... }
            },
        },
    },

    plugins: [],
})
export default config

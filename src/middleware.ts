import createIntlMiddleware from 'next-intl/middleware'
import { defaultLocale, locales } from './i18nconfig'
import { NextRequestWithAuth, withAuth } from 'next-auth/middleware'
import { NextRequest, NextResponse } from 'next/server'
import { decode, getToken } from 'next-auth/jwt'
import { createAlchemyWeb3 } from '@alch/alchemy-web3'
import { Alchemy, Network } from 'alchemy-sdk'

const web3 = createAlchemyWeb3(process.env.NEXT_PUBLIC_ALCHEMY_API_KEY)
const alchemyConfig = {
    apiKey: process.env.NEXT_PUBLIC_ALCHEMY_RAW_API_KEY, // Replace with your API key
    network: Network.ETH_SEPOLIA, // Replace with your network
    // network: Network.ETH_MAINNET, // Replace with your network
}

const alchemy = new Alchemy(alchemyConfig)

const publicPages = [
    '/',
    '/about',
    '/saza_gaza',
    '/terms_of_use',
    '/contact',
    '/collection',
    '/signIn',
    '/white_paper',
    '/notFound',
]

const privatePages = ['/admin', '/dynamicNFT']

const intlMiddleware = createIntlMiddleware({
    locales,
    defaultLocale,
    localePrefix: 'always',
})
const secret = process.env.NEXTAUTH_SECRET

const authMiddleware = withAuth(
    async function onSuccess(req: NextRequestWithAuth) {
        const session = await getToken({ req })

        // if (req.nextUrl.pathname.includes('/collector') && !session.wallet_address) {
        //     NextResponse.rewrite(new URL('/signIn', req.nextUrl))
        // }

        if (!session) {
            return NextResponse.rewrite(new URL('/signIn', req.nextUrl))
        }

        /**
         * 관리자 페이지 권한 체크
         *
         * is_admin 이 0이라면 (관리자가 아니라면) access-denied 페이지로 이동
         */
        // if (request.nextUrl.pathname.includes('/admin') && request.nextauth.token?.is_admin === 0) {
        //     return NextResponse.redirect(new URL('/access-denied', request.nextUrl))
        // }
        return intlMiddleware(req)
    },
    {
        callbacks: {
            authorized: ({ token }) => {
                return !!token
            },
        },
        pages: {
            signIn: '/signIn',
        },
    },
)

export default async function middleware(req: NextRequestWithAuth) {
    console.log('A')
    const session = await getToken({ req })
    console.log(req.nextUrl.pathname)
    console.log(session)

    console.log('checkcheck')
    if (req.nextUrl.pathname.includes('/collector')) {
        console.log('checkcheck=> collector')
        const lastSlashIndex = req.nextUrl.href.lastIndexOf('/')

        const walletAddress = req.nextUrl.href.slice(lastSlashIndex + 1)

        console.log('walletAddress')
        if (!web3.utils.isAddress(walletAddress)) {
            console.log('error')
            // return NextResponse.error()
            return NextResponse.rewrite(new URL('/notFound', req.nextUrl))
        }
    }

    const publicPathnameRegex = RegExp(
        `^(/(${locales.join('|')}))?(${publicPages
            .flatMap((p) => (p === '/' ? ['', '/'] : p))
            .join('|')})/?$`,
        'i',
    )

    const privatePathnameRegex = RegExp(
        `^(/(${locales.join('|')}))?(${privatePages
            .flatMap((p) => (p === '/' ? ['', '/'] : p))
            .join('|')})/?$`,
        'i',
    )

    console.log('publicPathnameRegex', publicPathnameRegex)
    console.log('privatePathnameRegex', privatePathnameRegex)

    const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname)

    const IsPrivatePages = privatePathnameRegex.test(req.nextUrl.pathname)

    if (isPublicPage) {
        console.log('public')
        return intlMiddleware(req)
    } else if (IsPrivatePages) {
        console.log('private')
        // return intlMiddleware(request)
        return (authMiddleware as any)(req)
    } else {
        console.log('nothing')
        return intlMiddleware(req)
    }
}

export const config = {
    // Skip all paths that should not be internationalized.
    // This skips the folders "api", "_next" and all files
    // with an extension (e.g. favicon.ico)
    matcher: ['/((?!api|_next|.*\\..*).*)'],
}

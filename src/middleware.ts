import createIntlMiddleware from 'next-intl/middleware'
import { defaultLocale, locales } from './i18nconfig'
import { NextRequestWithAuth, withAuth } from 'next-auth/middleware'
import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

const publicPages = [
    '/',
    '/about',
    '/saza_gaza',
    '/terms_of_use',
    '/contact',
    '/collectables',
    '/signIn',
    '/white_paper',
    '/notFound',
]

const privatePages = ['/admin', '/dynamicNFT', '/report']

const intlMiddleware = createIntlMiddleware({
    locales,
    defaultLocale,
    localePrefix: 'always',
})
const secret = process.env.NEXTAUTH_SECRET

const authMiddleware = withAuth(
    async function onSuccess(req: NextRequestWithAuth) {
        const session = await getToken({ req })

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

    const publicPathnameRegex = RegExp(
        `^(/(${locales.join('|')}))?(${publicPages
            .flatMap((p) => (p === '/' ? ['', '/'] : p))
            .join('|')})/?$`,
        'i',
    )

    const privatePathnameRegex = RegExp(
        `^(/(${locales.join('|')}))?(${privatePages
            .flatMap((p) => (p === '/' ? ['', '/'] : p))
            .join('|')})(?:\/(?:list|[a-zA-Z]+\/\d+))?$`,
        'i',
    )

    const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname)

    const isPrivatePages = privatePathnameRegex.test(req.nextUrl.pathname)
    console.log(privatePathnameRegex)

    if (isPublicPage) {
        console.log('public')
        return intlMiddleware(req)
    } else if (isPrivatePages) {
        console.log('private')
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

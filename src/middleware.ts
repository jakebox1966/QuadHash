import createIntlMiddleware from 'next-intl/middleware'
import { defaultLocale, locales } from './i18nconfig'
import { NextRequestWithAuth, withAuth } from 'next-auth/middleware'
import { NextRequest, NextResponse } from 'next/server'
import { decode, getToken } from 'next-auth/jwt'

const publicPages = [
    '/',
    '/about',
    '/collector',
    '/saza_gaza',
    '/terms_of_use',
    '/contact',
    '/collection',
    '/signIn',
    '/white_paper',
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

export default async function middleware(request: NextRequestWithAuth) {
    console.log('A')
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

    const isPublicPage = publicPathnameRegex.test(request.nextUrl.pathname)

    const IsPrivatePages = privatePathnameRegex.test(request.nextUrl.pathname)

    if (isPublicPage) {
        console.log('public')
        return intlMiddleware(request)
    } else if (IsPrivatePages) {
        console.log('private')
        // return intlMiddleware(request)
        return (authMiddleware as any)(request)
    } else {
        console.log('nothing')
        return intlMiddleware(request)
    }
}

export const config = {
    // Skip all paths that should not be internationalized.
    // This skips the folders "api", "_next" and all files
    // with an extension (e.g. favicon.ico)
    matcher: ['/((?!api|_next|.*\\..*).*)'],
}

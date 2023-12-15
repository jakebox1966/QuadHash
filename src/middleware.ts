import createIntlMiddleware from 'next-intl/middleware'
import { defaultLocale, locales } from './i18nconfig'
import { NextRequestWithAuth, withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

const publicPages = ['/', '/about', '/gallery', '/sns', '/signIn', 'admin']

const privatePages = [
    '/crew',
    // '/admin',
    '/buy',
]

const intlMiddleware = createIntlMiddleware({
    locales,
    defaultLocale,
    localePrefix: 'always',
})

const authMiddleware = withAuth(
    function onSuccess(request: NextRequestWithAuth) {
        console.log('B')

        // if (request.nextUrl.pathname.includes('/crew')) {
        //     console.log('sdafasdfasdfasdfasfdd')
        //     return NextResponse.rewrite(new URL('/signIn', request.nextUrl))
        // }

        /**
         * 관리자 페이지 권한 체크
         *
         * is_admin 이 0이라면 (관리자가 아니라면) access-denied 페이지로 이동
         */
        // if (request.nextUrl.pathname.includes('/admin') && request.nextauth.token?.is_admin === 0) {
        //     return NextResponse.redirect(new URL('/access-denied', request.nextUrl))
        // }
        return intlMiddleware(request)
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

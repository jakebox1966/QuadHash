import createMiddleware from 'next-intl/middleware'
import createIntlMiddleware from 'next-intl/middleware'
import { defaultLocale, locales } from './i18nconfig'
import { withAuth } from 'next-auth/middleware'
import { NextRequest, NextResponse } from 'next/server'
import { decode, getToken } from 'next-auth/jwt'

export default createMiddleware({
    // Our app's supported locales. We can have
    // as many as we want.
    // locales: ['en', 'ko'],
    locales,

    // If this locale is matched, pathnames work without
    // a prefix (e.g. `/about`)
    defaultLocale,

    localeDetection: true,

    localePrefix: 'always',
})

// const secret = process.env.NEXTAUTH_SECRET

// const publicPages = ['/', '/about']

// const intlMiddleware = createIntlMiddleware({
//     locales,
//     defaultLocale,
//     localeDetection: true,
//     localePrefix: 'as-needed',
// })

// const authMiddleware = withAuth(
//     async function onSuccess(req) {
//         return intlMiddleware(req)
//     },
//     {
//         callbacks: {
//             authorized: ({ token }) => token != null,
//         },
//         // pages: {
//         //     signIn: '/login',
//         // },
//     },
// )

// export default async function middleware(req: NextRequest) {
//     const session = await getToken({ req, secret, raw: true })
//     const { pathname } = req.nextUrl

//     if (pathname.startsWith('/about')) {

//         console.log('어드민 유뮤ㅜ')

//         console.log(session)
//         if (!session) {
//             console.log(123123)
//             return NextResponse.redirect(new URL('/', req.url))
//         }
//         if (session.is_admin === 0) {
//             console.log('걸렸다')
//             alert('not admin')
//             return NextResponse.redirect(new URL('/', req.url))
//             // throw new Error('you dont have any authority')
//         }
//     }

//     const publicPathnameRegex = RegExp(
//         `^(/(${locales.join('|')}))?(${publicPages
//             .flatMap((p) => (p === '/' ? ['', '/'] : p))
//             .join('|')})/?$`,
//         'i',
//     )

//     const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname)

//     if (isPublicPage) {
//         console.log('public')
//         return intlMiddleware(req)
//     } else {
//         console.log('private')
//         return (authMiddleware as any)(req)
//     }
// }

export const config = {
    matcher: ['/((?!api|_next|.*\\..*).*)'],
}

// export const config = {
//     // Skip all paths that should not be internationalized.
//     // This skips the folders "api", "_next" and all files
//     // with an extension (e.g. favicon.ico)
//     matcher: ['/((?!api|_next|.*\\..*).*)'],
// }

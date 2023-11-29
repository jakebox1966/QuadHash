import createMiddleware from 'next-intl/middleware'
import { defaultLocale, locales } from './i18nconfig'

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

export const config = {
    // Skip all paths that should not be internationalized.
    // This skips the folders "api", "_next" and all files
    // with an extension (e.g. favicon.ico)
    matcher: ['/((?!api|_next|.*\\..*).*)'],
}

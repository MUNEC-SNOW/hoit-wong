import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import Negotiator from 'negotiator'
import { i18n } from '@/i18n-config'
import { match as matchLocale } from '@formatjs/intl-localematcher'
import { SKIP_URL_REGEX, matchUrl } from '@/helpers'

function getLocale(request: NextRequest): string | undefined {
    const negotiatorHeaders: Record<string, string> = {}
    request.headers.forEach((value, key) => (negotiatorHeaders[key] = value))

    // @ts-ignore locales are readonly
    const locales: string[] = i18n.locales

    const languages = new Negotiator({ headers: negotiatorHeaders }).languages(
        locales
    )

    return matchLocale(languages, locales, i18n.defaultLocale)
}

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname

    /** @description skip files in folder public */
    if (
        [
            '/manifest.json',
            '/favicon.ico',
        ].includes(pathname)
    ) {
        return
    }

    const pathnameIsMissingLocale = i18n.locales.every(
        (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
    )

    const locale = getLocale(request)
    if(!SKIP_URL_REGEX.test(pathname)) {    
        return NextResponse.redirect(
            new URL(
                matchUrl(pathname, locale!, pathnameIsMissingLocale),
                request.url
            )
        )
    }
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}

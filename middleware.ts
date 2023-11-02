import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { i18n } from '@/i18n-config'
import { match as matchLocale } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'
import { SKIP_URLS, URLS } from '@/helpers'

function getLocale(request: NextRequest): string | undefined {
    const negotiatorHeaders: Record<string, string> = {}
    request.headers.forEach((value, key) => (negotiatorHeaders[key] = value))

    // @ts-ignore locales are readonly
    const locales: string[] = i18n.locales

    const languages = new Negotiator({ headers: negotiatorHeaders }).languages(
        locales
    )

    const locale = matchLocale(languages, locales, i18n.defaultLocale)

    return locale
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

    let originLocale = ''

    if(!pathnameIsMissingLocale) {
        originLocale = pathname.split('/')[1]
    }

    if(!SKIP_URLS.includes(pathname) && !pathname.includes('not-found')) {
        const locale = getLocale(request)
        const nextUrl = URLS.includes(pathname) 
            ? `/${pathnameIsMissingLocale ? locale : ''}${pathname.startsWith('/') ? '' : '/'}${pathname}`
            : `/${pathnameIsMissingLocale ? locale : originLocale}/not-found`

        return NextResponse.redirect(
            new URL(
                nextUrl,
                request.url
            )
        )
    }
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}

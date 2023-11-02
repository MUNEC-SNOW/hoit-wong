export const URLS: ReadonlyArray<string> = [
    '/home',
    '/profile'
]

export const SKIP_URLS: ReadonlyArray<string> = [
    '/en',
    '/cn',
    '/de',
    '/en/not-found',
    '/cn/not-found',
    '/de/not-found',
]

export const LOCALES: ReadonlyArray<string> = ['/en', '/cn', '/de']

export const SKIP_URL_REGEX = /^(\/(en|cn|de))(\/(not-found|profile|home))?/g

/**
 * @description get new url to redirect
 * @param url origin url
 * @param locale language to choose
 * @param pathnameIsMissingLocale check origin url has locale prefix
 * @returns url to redirect
 */
export function matchUrl(url: string, locale: string, pathnameIsMissingLocale: boolean) {
    let redirectUrl = `/${locale}/not-found`

    for (let index = 0; index < URLS.length; index++) {
        const element = URLS[index]
        if(url === '/' || LOCALES.includes(url) || url.includes(element)) {
            redirectUrl = pathnameIsMissingLocale 
                ? `/${locale}${url}`
                : url
            return redirectUrl
        }
    }
    return redirectUrl
}
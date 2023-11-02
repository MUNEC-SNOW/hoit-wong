import { getDictionary } from '@/get-dictionary'
import { Locale } from '@/i18n-config'

export default async function NotFound({
    params: { lang },
}: {
    params: { lang: Locale }
}) {
    const { notFound } = await getDictionary(lang)
    
    return (
        <div>
            {notFound.subTitle}
            <span>456464645</span>
        </div>
    )
}
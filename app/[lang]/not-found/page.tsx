import { getDictionary } from '../../../get-dictionary'
import { Locale } from '@/i18n-config'
import Image from 'next/image'
import notFoundCss from '@/styles/not-found.module.css'
import svg404 from '@/public/svg/img/404.svg'

export default async function NotFound({
    params: { lang },
}: {
    params: { lang: Locale }
}) {
    const { notFound } = await getDictionary(lang)
    
    return (
        <div className={notFoundCss.errorPage}>
            <div>
                <Image 
                    src={svg404} 
                    alt='' 
                    width={300} 
                    height={300}
                    priority={true} 
                />
            </div>
            <p className={notFoundCss.errorPageTitle}>{ notFound.title }</p>
            <div className={notFoundCss.errorPageSubTitle}>
                <p>{ notFound.subTitle }</p>
                <p>{ notFound.text1 } <a href="/en">{ notFound.text2 }</a>{ notFound.text3 }</p>
            </div>
        </div>
    )
}
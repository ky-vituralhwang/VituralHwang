

import TypoDisplay from '@/components/Typo/Display';
import style from './style.module.scss';
import ImagePlaceholder from '@/base/Image';
import Link from 'next/link';
import { isEmpty } from 'lodash';


const LandingHeroModule = ({ data }: any) => {
    const { label_big_text, image_under_title, profile_link_url } = data || {};
    const { url } = profile_link_url || {};


    const title = (!isEmpty(url)) ? (
        <Link
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={style.landingHero__title}
        >
            <TypoDisplay
                tag="h1"
                size={90}
                className={style.landingHero__title}
            >
                {label_big_text}
            </TypoDisplay>
        </Link>
    ) : (
        <TypoDisplay
            tag="h1"
            size={90}
            className={style.landingHero__title}
        >
            {label_big_text}
        </TypoDisplay>
    )

    return (
        <section className={style.landingHero}>
            <div className="container grid">
                {title}
                <div className={style.landingHero__image}>
                    <ImagePlaceholder
                        src={image_under_title?.url}
                        alt={image_under_title?.alt}
                        dimensions={image_under_title?.dimensions}
                        optimized={false}
                    />
                </div>
            </div>
        </section>
    )
}


export default LandingHeroModule;
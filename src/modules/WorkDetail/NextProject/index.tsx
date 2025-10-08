

import style from './style.module.scss';
import cn from 'clsx';
import TypoHeading from '@/components/Typo/Heading';
import ImagePlaceholder from '@/base/Image';
import Link from 'next/link';
import TypoDisplay from '@/components/Typo/Display';

const NextProjectModule = ( { data }: any) => {
    const { url } = data || {};
    const { title, work_detail_image, thumbnail } = data.data || {};
    const image = work_detail_image || thumbnail;

    return (
        <section
            className={style.nextProject}
        >
            <div className="container">
                <TypoHeading
                    tag="div"
                    className={style.nextProject__label}
                >
                    Next Project
                </TypoHeading>
            </div>
            <Link
                className={style.nextProject__link}
                href={url}
            >
                <div className={cn(style.nextProject__title, 'container')}>
                    <TypoDisplay
                        tag="p"
                        size={90}
                        className={style.nextProject__title__text}
                    >
                        {title}
                    </TypoDisplay>
                </div>
                <ImagePlaceholder
                    src={image?.url}
                    alt={image?.alt}
                    dimensions={image?.dimensions}
                    optimized={false}
                    className={style.nextProject__img}
                />
            </Link>
        </section>
    )
}

export default NextProjectModule;
'use client'

import TypoHeading from '@/components/Typo/Heading';
import style from './style.module.scss'

const WorkdetailModule = ({ children, data }: { children: React.ReactNode, data: any }) => {
    const { detail_title, detail_scope, year } = data.data || {};

    return (
        <>
            <section className={style.workDetail}>
                <div className="container">
                    <TypoHeading
                        size={2}
                        tag="h1"
                        className={style.workDetail__title}
                    >
                        {detail_title}
                    </TypoHeading>
                    <TypoHeading
                        size={4}
                        tag="div"
                        className={style.workDetail__scope}
                    >
                        {detail_scope}
                    </TypoHeading>
                    <TypoHeading
                        size={5}
                        tag="div"
                        className={style.workDetail__year}
                    >
                        {year}
                    </TypoHeading>
                    {/* <div className={style.workDetail__image}>
                        {!isEmpty(thumbnail.url) && (
                            <div className={style.workDetail__thumbnail}>
                                <ImagePlaceholder
                                    src={thumbnail.url}
                                    alt={thumbnail.alt}
                                    dimensions={thumbnail.dimensions}
                                    className={style.workDetail__img}
                                />
                            </div>
                        )}
                        {!isEmpty(feature_media.url) && (
                            <div className={style.workDetail__thumbnail}>
                                <video
                                    playsInline loop autoPlay muted
                                    className={style.workDetail__video}
                                    ref={videoRef}
                                >
                                    <source src={feature_media.url} type="video/mp4" />
                                </video>
                            </div>
                        )}
                        </div> */}
                    {children}
                </div>
            </section>
        </>
    )
}

export default WorkdetailModule
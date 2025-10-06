'use client';   

import RichText from '@/components/PrismicHelper/RichText';
import style from './style.module.scss';
import cn from 'clsx';
import { isEmpty } from 'lodash';
import useVideoRenderer from '@/components/Video';

const VirtualLightGridLayoutModule = ({ data }: any) => {
    const { description, list_media } = data.primary || {};

    console.log(list_media)

    return (
        <section className={style.VLGL}>
            <div className="container">
                <div className={style.VLGL__description}>
                    <RichText
                        content={description}
                        isRichText={true}
                    />
                </div>
                
                <div className={style.VLGL__list}>
                    {!isEmpty(list_media) && <ListVideoModule data={list_media} />}
                </div>
            </div>
        </section>
    )
}

const ListVideoModule = ({ data }: any) => {
    return (
        <div className={cn(style.list__item, style.list__video)}>
            {data.map((item: any, index: number) => (
                <VideoModule key={index} data={item} />
            ))}
        </div>
    )
}

const VideoModule = ({ data }: any) => {
    const { videoRef } = useVideoRenderer({
        url: data.media.url,
        type: 'video/mp4',
        playsInline: true,
        loop: true,
        autoPlay: true,
        muted: true,
    })

    return (
        <div className={style.list__video__item}>
            <video ref={videoRef} className={style.list__video__item__video} />
        </div>
    )
}


export default VirtualLightGridLayoutModule;
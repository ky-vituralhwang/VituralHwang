'use client';   

import style from './style.module.scss';
import cn from 'clsx';
import RichText from '@/components/PrismicHelper/RichText';
import { isEmpty } from 'lodash';
import ImagePlaceholder from '@/base/Image';
import useVideoRenderer from '@/components/Video';

const VirtualLightCompModule = ({ data }: any) => {
    const { description, list_image, list_internal_media, list_embed_media } = data.primary || {};

    return (
        <section className={style.VLDf}>
            <div className="container">
                <div className={style.VLDf__description}>
                    <RichText
                        content={description}
                        isRichText={true}
                    />
                </div>
                <div className={style.VLDf__list}>
                    {!isEmpty(list_image) && <ListImageModule data={list_image} />}
                    {!isEmpty(list_internal_media) && <ListVideoModule data={list_internal_media} />}
                    {!isEmpty(list_embed_media) && <EmbedModule data={list_embed_media} />}
                </div>
            </div>
        </section>
    )
}


const ListImageModule = ({ data }: any) => {
    return (
        <div className={cn(style.list__item, style.list__image)}>
            {data.map((item: any, index: number) => (
                <div
                    key={index}
                    className={style.list__image__item}
                >
                    <ImagePlaceholder
                        src={item?.image?.url}
                        alt={item?.image?.alt}
                        dimensions={item?.image?.dimensions}
                    />
                </div>
            ))}
        </div>
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
    const { videoRef} = useVideoRenderer({
        url: data?.media?.url,
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


const EmbedModule = ({ data }: any) => {
    return (
        <div className={cn(style.list__item, style.list__embed)}>
            {data.map((item: any, index: number) => {
                const aspectRatio = item.media.width / item.media.height;
                return (
                    <div
                        key={index}
                        style={{ aspectRatio }}
                        dangerouslySetInnerHTML={{ __html: item.media.html }}
                        className={style.list__embed__item}
                    />
                )
            })}
        </div>
    )
}


export default VirtualLightCompModule;
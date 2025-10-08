'use client';


import ImagePlaceholder from '@/base/Image';
import style from './style.module.scss'
import useVideoRenderer from '@/components/Video';

const WorkDetailSliceGridMediaModule = ({ slice }: any) => {
    const { columns, list_video } = slice?.primary || {};
    const realColumns = columns || 2;
    return (
        <div
            className={style.detailGridMedia}
            data-slice-type={slice.slice_type}
            data-slice-variation={slice.variation}
            style={{
                '--grid-columns': realColumns,
            } as any}
        >
            {list_video.map((item: any, idx: number) => {
                const type = item?.media?.kind;

                switch (type) {
                    case 'image':
                        return (
                            <ImagePlaceholder
                                key={idx}
                                src={item?.media?.url}
                                alt={item?.media?.alt}
                                dimensions={{
                                    width: item?.media?.width,
                                    height: item?.media?.height
                                }}
                                className={style.detailGridMedia__img}
                            />
                        )
                    case 'file':
                        return (
                            <VideoModule key={idx} data={item} />
                        )
                    default:
                        return null;
                }
            })}
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
        <video
            ref={videoRef}
            className={style.detailGridMedia__video}
        />
    )
}

export default WorkDetailSliceGridMediaModule;
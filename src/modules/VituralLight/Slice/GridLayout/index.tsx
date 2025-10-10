'use client';

import useVideoRenderer from '@/components/Video';
import style from './style.module.scss';
import ImagePlaceholder from '@/base/Image';

const VituralightGridLayout = ({ slice }: any) => {
    const { number_of_columns, list_media } = slice?.primary || {};
    const realColumns = number_of_columns || 2;
    return (
        <div
            className={style.gridLayout}
            data-slice-type={slice.slice_type}
            data-slice-variation={slice.variation}
            style={{
                '--rf-grid-columns': realColumns,
            } as any}
        >
            {list_media.map((item: any, idx: number) => {
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
                                className={style.gridLayout__img}
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
            className={style.gridLayout__video}
        />
    )
}

export default VituralightGridLayout;
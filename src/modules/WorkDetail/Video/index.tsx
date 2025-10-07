"use client"

import useVideoRenderer from '@/components/Video';
import style from './style.module.scss'

const WorkDetailSliceVideoModule = ({ slice }: any) => {
    const { video } = slice?.primary || {};

    const { videoRef} = useVideoRenderer({
        url: video.url,
        type: 'video/mp4',
        playsInline: true,
        loop: true,
        autoPlay: true,
        muted: true,
    })

    return (
        <div
            className={style.detailVideo}
            data-slice-type={slice.slice_type}
            data-slice-variation={slice.variation}
        >
            <video ref={videoRef} className={style.video} />
        </div>
    )
}


export default WorkDetailSliceVideoModule;
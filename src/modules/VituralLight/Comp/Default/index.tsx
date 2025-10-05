'use client';   

import style from './style.module.scss';
import cn from 'clsx';
import RichText from '@/components/PrismicHelper/RichText';
import { isEmpty } from 'lodash';
import ImagePlaceholder from '@/base/Image';
import { useVideoCache } from '@/hooks/useVideoCache';
import { useEffect, useRef } from 'react';

const VirtualLightCompModule = ({ data }: any) => {
    const { description, list_image, list_internal_media, list_embed_media } = data.primary || {};

    // console.log(list_image)

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
    const { getOrCreateVideo } = useVideoCache();
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!data?.media?.url || !containerRef.current) return;

        const container = containerRef.current;
        
        // Get cached video element
        const cachedVideo = getOrCreateVideo(data.media.url, {
            playsInline: true,
            loop: true,
            autoplay: true,
            muted: true,
            type: 'video/mp4'
        });

        if (cachedVideo) {
            // Clear container
            container.innerHTML = '';
            
            // Clone the cached video to avoid conflicts if it's used elsewhere
            const videoClone = cachedVideo.cloneNode(true) as HTMLVideoElement;
            
            // Apply styles and properties
            videoClone.playsInline = true;
            videoClone.loop = true;
            videoClone.muted = true;
            videoClone.autoplay = true;
            
            // Set the source explicitly
            videoClone.src = data.media.url;
            
            // Append to container
            container.appendChild(videoClone);
            
            // Load and play
            videoClone.load();
            
            const handleCanPlay = () => {
                videoClone.play().catch(error => {
                    console.log('Autoplay prevented:', error);
                });
            };
            
            if (videoClone.readyState >= 3) {
                handleCanPlay();
            } else {
                videoClone.addEventListener('canplay', handleCanPlay, { once: true });
            }
        }

        // Cleanup function
        return () => {
            if (container) {
                container.innerHTML = '';
            }
        };
    }, [data?.media?.url, getOrCreateVideo]);

    if (!data?.media?.url) {
        return null;
    }

    return (
        <div className={style.list__video__item}>
            <div ref={containerRef} style={{ width: '100%', height: '100%' }} />
        </div>
    )
}


const EmbedModule = ({ data }: any) => {
    return (
        <div className={cn(style.list__item, style.list__embed)}>
            {data.map((item: any, index: number) => (
                <div
                    key={index}
                    dangerouslySetInnerHTML={{ __html: item.media.html }}
                    className={style.list__embed__item}
                />
            ))}
        </div>
    )
}


export default VirtualLightCompModule;
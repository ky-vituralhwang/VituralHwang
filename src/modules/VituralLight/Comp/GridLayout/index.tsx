'use client';   

import RichText from '@/components/PrismicHelper/RichText';
import style from './style.module.scss';
import cn from 'clsx';
import { useEffect, useRef } from 'react';
import { useVideoCache } from '@/hooks/useVideoCache';
import { isEmpty } from 'lodash';

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


export default VirtualLightGridLayoutModule;
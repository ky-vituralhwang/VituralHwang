'use client';

import Link from 'next/link';
import style from './style.module.scss'
import cn from 'clsx';
import ImagePlaceholder from '@/base/Image';
import TypoHeading from '@/components/Typo/Heading';
import { forwardRef, ReactEventHandler, use, useImperativeHandle, useRef, useState, useCallback } from 'react';
import { useIsomorphicLayoutEffect } from 'react-haiku';

// Video cache to store preloaded videos
const videoCache = new Map<string, HTMLVideoElement>();

interface ProjectItemRef {
    item: HTMLAnchorElement | null;
    image: HTMLImageElement | null;
    video: HTMLVideoElement | null;
    title: HTMLDivElement| null;
}

const ProjectItem = forwardRef<ProjectItemRef, { data: any; className?: string, restProps?: any }>((
    props, ref
) => {
    const { data, className, ...restProps } = props;
    const { url } = data?.project || {};
    const { title, feature_media, thumbnail } = data?.project?.data || {};

    const itemRef = useRef<HTMLAnchorElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);
    
    const [isVideoLoaded, setIsVideoLoaded] = useState(false);
    const [isVideoLoading, setIsVideoLoading] = useState(false);

    const preloadVideo = useCallback(async (videoUrl: string) => {
        if (!videoUrl || videoCache.has(videoUrl)) {
            const cachedVideo = videoCache.get(videoUrl);
            if (cachedVideo && videoRef.current) {
                videoRef.current.src = cachedVideo.src;
                setIsVideoLoaded(true);
            }
            return;
        }

        setIsVideoLoading(true);
        
        try {
            const video = document.createElement('video');
            video.preload = 'metadata';
            video.muted = true;
            video.playsInline = true;
            
            await new Promise<void>((resolve, reject) => {
                video.onloadedmetadata = () => {
                    videoCache.set(videoUrl, video);
                    resolve();
                };
                video.onerror = () => reject(new Error('Failed to load video'));
                video.src = videoUrl;
            });

            // Apply the preloaded video to the current video element
            if (videoRef.current) {
                videoRef.current.src = videoUrl;
                setIsVideoLoaded(true);
            }
        } catch (error) {
            console.error('Error preloading video:', error);
        } finally {
            setIsVideoLoading(false);
        }
    }, []);

    useImperativeHandle(ref, () => ({
        item: itemRef.current,
        image: imageRef.current,
        video: videoRef.current,
        title: titleRef.current,
    }));

    useIsomorphicLayoutEffect(() => {
        if (videoRef.current && feature_media?.url) {
            preloadVideo(feature_media.url);
        }
    }, [feature_media?.url, preloadVideo]);

    return (
        <Link
            href={url}
            className={cn(style.projectItem, className)}
            ref={itemRef}
            {...restProps}
        >
            <div className={style.projectItem__bg} >
                <ImagePlaceholder
                    src={thumbnail?.url}
                    alt={thumbnail?.alt}
                    dimensions={thumbnail?.dimensions}
                    className={style.projectItem__img}
                    ref={imageRef}
                />
                <video
                    playsInline muted loop
                    className={cn(style.projectItem__video, {
                        [style.projectItem__video_loaded]: isVideoLoaded,
                        [style.projectItem__video_loading]: isVideoLoading
                    })}
                    ref={videoRef}
                    style={{ 
                        opacity: isVideoLoaded ? 1 : 0,
                        transition: 'opacity 0.3s ease'
                    }}
                >
                    {isVideoLoaded && <source src={feature_media?.url} type="video/mp4" />}
                </video>
            </div>

            <div className={style.projectItem__content} >
                <TypoHeading
                    tag="div"
                    className={style.projectItem__content__title}
                    ref={titleRef}
                >
                    {title}
                </TypoHeading>
            </div>
        </Link>
    )
})

export default ProjectItem;
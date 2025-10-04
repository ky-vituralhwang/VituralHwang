'use client';

import Link from 'next/link';
import style from './style.module.scss'
import cn from 'clsx';
import ImagePlaceholder from '@/base/Image';
import TypoHeading from '@/components/Typo/Heading';
import { forwardRef, useImperativeHandle, useRef, useEffect } from 'react';
import { useVideoCache } from '@/hooks/useVideoCache';

interface ProjectItemRef {
    item: HTMLAnchorElement | null;
    image: HTMLImageElement | null;
    video: HTMLVideoElement | null;
    title: HTMLDivElement| null;
}

interface ProjectItemProps {
    data: any;
    className?: string;
    onMouseEnter?: React.EventHandler<React.MouseEvent<HTMLAnchorElement>>;
    onMouseLeave?: React.EventHandler<React.MouseEvent<HTMLAnchorElement>>;
    restProps?: any;
}

const ProjectItem = forwardRef<ProjectItemRef, ProjectItemProps> ((
    props, ref
) => {
    const { data, className, onMouseEnter, onMouseLeave, ...restProps } = props;
    const { url } = data?.project || {};
    const { title, feature_media, thumbnail } = data?.project?.data || {};

    const itemRef = useRef<HTMLAnchorElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);
    
    const { getOrCreateVideo, preloadVideo } = useVideoCache();
    
    useImperativeHandle(ref, () => ({
        item: itemRef.current,
        image: imageRef.current,
        video: videoRef.current,
        title: titleRef.current,
    }));

    // Cache and setup video when component mounts or feature_media changes
    useEffect(() => {
        if (feature_media?.url && videoRef.current) {
            const cachedVideo = getOrCreateVideo(feature_media.url, {
                playsInline: true,
                muted: true,
                loop: true,
                type: 'video/mp4'
            });
            
            // Replace the video element's source with the cached version
            if (cachedVideo && cachedVideo !== videoRef.current) {
                const parentElement = videoRef.current.parentElement;
                if (parentElement) {
                    // Copy classes and other attributes
                    cachedVideo.className = videoRef.current.className;
                    
                    // Replace the video element
                    parentElement.replaceChild(cachedVideo, videoRef.current);
                    videoRef.current = cachedVideo;
                }
            }
        }
    }, [feature_media?.url, getOrCreateVideo]);

    // Preload video on mount for better performance
    useEffect(() => {
        if (feature_media?.url) {
            preloadVideo(feature_media.url, {
                playsInline: true,
                muted: true,
                loop: true,
                type: 'video/mp4'
            });
        }
    }, [feature_media?.url, preloadVideo]);

    return (
        <Link
            href={url}
            className={cn(style.projectItem, className)}
            ref={itemRef}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
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
                    className={style.projectItem__video}
                    ref={videoRef}
                >
                    <source src={feature_media?.url} type="video/mp4" />
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

ProjectItem.displayName = 'ProjectItem';

export default ProjectItem;
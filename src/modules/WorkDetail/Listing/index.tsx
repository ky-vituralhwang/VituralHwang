'use client';

import style from './style.module.scss'
import cn from 'clsx';
import { forwardRef, useImperativeHandle, useRef, useEffect, useState, useCallback } from 'react';
import { useVideoCache } from '@/hooks/useVideoCache';
import ImagePlaceholder from '@/base/Image';
import { useIsomorphicLayoutEffect, useUpdateEffect } from 'react-haiku';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const WorkdetailListingModule = ({ data } :any) => {
    const { slices } = data.data || {};

    const itemRefs = useRef<Array<any>>([]);

    return (
        <div className={style.listing}>
            {slices.map((slice: any, index: number) => {
                const { variation } = slice;

                switch(variation) {
                    case 'default':
                        return <VideoModule
                            key={index}
                            data={slice}
                            ref={el => { itemRefs.current[index] = el; }}
                        />;
                    case 'singleImage':
                        return <SingleImageModule
                            key={index}
                            data={slice}
                            ref={el => { itemRefs.current[index] = el; }}
                        />;
                    case 'listImage':
                        return <ListImageModule
                            key={index}
                            data={slice}
                            ref={el => { itemRefs.current[index] = el; }}
                        />;
                    default:
                        return null;
                }
            })}
        </div>
    )
}

const VideoModule = forwardRef(( props: any, ref) => {
    const { data } = props;
    const { video } = data.primary || {};

    const videoRef = useRef<HTMLVideoElement>(null);
    const { getOrCreateVideo, preloadVideo } = useVideoCache();

    useImperativeHandle(ref, () => ({
        video: videoRef.current,
        isVideo: true,
    }));

    // Cache and setup video when component mounts or video.url changes
    useEffect(() => {
        if (video?.url && videoRef.current) {
            const cachedVideo = getOrCreateVideo(video.url, {
                playsInline: true,
                loop: true,
                autoplay: true,
                muted: true
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
    }, [video?.url, getOrCreateVideo]);

    // Preload video on mount for better performance
    useEffect(() => {
        if (video?.url) {
            preloadVideo(video.url, {
                playsInline: true,
                loop: true,
                autoplay: true,
                muted: true
            });
        }
    }, [video?.url, preloadVideo]);

    return (
        <div className={style.listing__item}>
            <video
                ref={videoRef}
                playsInline loop autoPlay muted
                className={style.video}
            >
                <source src={video.url} type="video/mp4" />
            </video>
        </div>
    )
})

VideoModule.displayName = 'VideoModule';

const SingleImageModule = forwardRef(( props: any, ref) => {
    const { data } = props;
    const { image } = data.primary || {};

    useImperativeHandle(ref, () => ({
        image: image,
        isVideo: false,
    }));
    return (
        <div className={style.listing__item}>
            <ImagePlaceholder 
                src={image?.url}
                alt={image?.alt}
                dimensions={image?.dimensions}
                className={style.image}
            />
        </div>
    )
})

SingleImageModule.displayName = 'SingleImageModule';

const ListImageModule = forwardRef(( props: any, ref) => {
    const { data } = props;
    const { list_images } = data.primary || {};

    const containerRef = useRef<HTMLDivElement>(null);
    const listRef = useRef<HTMLDivElement>(null);
    const immageRefs = useRef<Array<any>>([]);
    const isNext = useRef<boolean | null>(null);

    const easing = "power4.out";
    const duration = .8;

    useImperativeHandle(ref, () => ({
        isVideo: false,
    }));

    const handleClickLeft = useCallback(() => {
        isNext.current = false;
        setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    }, []);

    const handleClickRight = useCallback(() => {
        isNext.current = true;
        setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, list_images.length - 1));
    }, [list_images]);

    const [currentIndex, setCurrentIndex] = useState(0);

    const { contextSafe } = useGSAP({ scope: containerRef, dependencies: [currentIndex, isNext] });

    const handleChangeSlice = contextSafe((index: number, isNext: boolean | null) => {
        const cloner = immageRefs.current[index].cloneNode(true);

        cloner.classList.add(style.clone);

        if (listRef.current) {
            listRef.current.appendChild(cloner);
        }

        gsap.set(cloner, {
            clipPath: isNext ? 'inset(0% 100% 0% 0%)' : 'inset(0% 0% 0% 100%)'
        })

        gsap.set(cloner.querySelector('img'), {
            x: isNext ? '-10%' : '10%',
            scale: 1.1,
        })

        const tl = gsap.timeline({
            onComplete: () => {
                const prevElement = cloner.previousElementSibling;
                if (prevElement && prevElement.classList.contains(style.clone)) {
                    prevElement.parentNode?.removeChild(prevElement);
                }
            }
        })

        tl
            .to(cloner, {
                clipPath: 'inset(0% 0% 0% 0%)',
                duration: duration,
                ease: easing,
            }, 0)
            .to(cloner.querySelector('img'), {
                x: 0,
                scale: 1,
                duration: duration,
                ease: easing,
            }, 0)
        
        const prevElement = cloner.previousElementSibling;
        if (prevElement && prevElement.classList.contains(style.clone)) {
            tl
                .to(prevElement, {
                    clipPath: isNext ? 'inset(0% 0% 0% 100%)' : 'inset(0% 100% 0% 0%)',
                    duration: duration,
                    ease: easing,
                    overwrite: true,
                }, 0)
                .to(prevElement.querySelector('img'), {
                    x: isNext ? '10%' : '-10%',
                    scale: 1.1,
                    duration: duration,
                    ease: easing,
                    overwrite: true,
                }, 0)
        }
    }) 

    useUpdateEffect(() => {
        handleChangeSlice(currentIndex, isNext.current)
    }, [currentIndex])

    return (
        <div className={style.listing__item} ref={containerRef}>
            <button className={cn(style.listImg__arrow, style.left)} onClick={handleClickLeft}>
                <Arrow className={style.listImg__arrow__icon} rotate={true} />
            </button>

            <button className={cn(style.listImg__arrow, style.right)} onClick={handleClickRight}>
                <Arrow className={style.listImg__arrow__icon} rotate={false} />
            </button>

            <div className={style.listImg} ref={listRef}>
                {list_images.map((image: any, index: number) => (
                    <ImagePlaceholder 
                        key={index}
                        src={image?.image.url}
                        alt={image?.image.alt}
                        dimensions={image?.image.dimensions}
                        className={style.listImg__img}
                        ref={el => { immageRefs.current[index] = el; }}
                    />
                ))}
            </div>
        </div>
    )
})

ListImageModule.displayName = 'ListImageModule';


const Arrow = ({ className, rotate }: { className: string, rotate: boolean }) => {
    return (
        <div className={className}>
            <svg width="100%" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" style={{transform: rotate ? 'rotate(180deg)' : 'none'}}>
                <path d="M5.96669 11.0327L10 7.01665L5.96669 3" stroke="currentColor" strokeLinecap="square"/>
            </svg>
        </div>
    )
}
Arrow.displayName = 'Arrow';

export default WorkdetailListingModule;
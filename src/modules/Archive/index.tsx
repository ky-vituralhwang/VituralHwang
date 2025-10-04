'use client';

import { forwardRef, useRef, useEffect, useState, useImperativeHandle } from 'react';
import style from './style.module.scss';
import cn from 'clsx';
import { useGSAP } from '@gsap/react';
import { useVideoCache } from '@/hooks/useVideoCache';
import ImagePlaceholder from '@/base/Image';
import { useTempus } from 'tempus/react';
import gsap from 'gsap';
import { Observer } from 'gsap/Observer';

// Helper function to convert readyState to readable text
const getReadyStateText = (readyState: number): string => {
    switch (readyState) {
        case 0: return 'HAVE_NOTHING';
        case 1: return 'HAVE_METADATA';
        case 2: return 'HAVE_CURRENT_DATA';
        case 3: return 'HAVE_FUTURE_DATA';
        case 4: return 'HAVE_ENOUGH_DATA';
        default: return 'UNKNOWN';
    }
};

const ArchiveModule = ({ data, columns }: { data: any[]; columns: number }) => {
    const container = useRef<HTMLDivElement>(null);
    const innerRef = useRef<HTMLDivElement>(null);
    const itemRefs = useRef<HTMLDivElement[]>([]);
    const colRefs = useRef<HTMLDivElement[]>([]);

    const isColsInterger = Number.isInteger(columns) && columns > 0;

    console.log("isColsInterger:", isColsInterger, columns);

    const [isReady, setIsReady] = useState<Boolean>(false);

    useTempus(() => {
        if (isReady) return;

        // Check readyState of all videos in itemRefs
        const videoStates = itemRefs.current
            .filter(Boolean) // Remove null/undefined refs
            .map((itemRef, index) => {
                const videoElement = itemRef?.querySelector('video');
                if (videoElement) {
                    return {
                        index,
                        readyState: videoElement.readyState,
                        readyStateText: getReadyStateText(videoElement.readyState),
                        src: videoElement.src,
                        paused: videoElement.paused,
                        currentTime: videoElement.currentTime
                    };
                }
                return null;
            })
            .filter(Boolean); // Remove non-video items
        
        // console.log('Video readyState check:', videoStates);

        // Check if all videos have readyState === 4 (HAVE_ENOUGH_DATA)
        const allVideosReady = videoStates.length > 0 && videoStates.every((state: any) => state.readyState === 4);
        
        if (allVideosReady && !isReady) {
            console.log('All videos are ready! Setting isReady to true');
            setIsReady(true);
        }
    }, {
        priority: 2,
    })
    
    useGSAP(() => {
        if (!isReady) return;

        console.log('Total items:', data.flat().length);
        console.log('Refs array length:', itemRefs.current.length);
        console.log('Actual refs count:', itemRefs.current.filter(Boolean).length);

        const xTo: any[] = [];
        const yTo: any[] = [];
        const allColsWrap: any[] = [];
        const allItemsWrap: any[] = [];

        const containerReact = innerRef.current?.getBoundingClientRect();
        if (!containerReact) return;

        colRefs.current.forEach((col, idx) => {
            const min = containerReact.left - col.getBoundingClientRect().left - col.getBoundingClientRect().width / 2;
            const max = containerReact.width + min;
    
            const wrap = gsap.utils.wrap(min, max);
            const quickToItem = gsap.quickTo(col, 'x',{
                duration: 2,
                ease: 'power4.out',
                modifiers: {
                    x: gsap.utils.unitize(wrap)
                }
            })
    
            allColsWrap.push(wrap)
            xTo.push(quickToItem);
        })

        itemRefs.current.forEach((item, idx) => {
            const parent = item.parentElement;
            if (!parent) return;
            
            const listReact = parent.getBoundingClientRect();
            const itemReact = item.getBoundingClientRect();

            const min = -itemReact.top - itemReact.height;
            const max = listReact.height + min;
    
            const wrap = gsap.utils.wrap(min, max);
    
            const quickToItem = gsap.quickTo(item, 'y',{
                duration: 2,
                ease: 'power4.out',
                modifiers: {
                    y: gsap.utils.unitize(wrap)
                }
            })
            allItemsWrap.push(wrap)
            yTo.push(quickToItem);
        })

        let increment = {
            x: 0,
            y: 0
        }

        Observer.create({
            target: innerRef.current,
            type: "wheel, touch, pointer",
            wheelSpeed: 4,
            tolerance: 10,
            // debounce: true,
            onStopDelay: 0.25,
            onPress: ({ target }) => {
                (target as HTMLElement).style.cursor = "grabbing";
            },
            onRelease: ({ target }) => {
                (target as HTMLElement).style.cursor = "grab";
            },
            onChangeX: ({ deltaX, velocityX, event }) => {
                if (deltaX === 0) return;
    
                const isWheel = event.type === "wheel";
    
                increment.x += isWheel ? -deltaX : deltaX;
    
                colRefs.current.forEach((item:any, idx:number) => {
                    xTo[idx](increment.x);
                })
            },
            onChangeY: ({ deltaY, velocityY, event }) => {
                if (deltaY === 0) return;
    
                const isWheel = event.type === "wheel";
    
                increment.y += isWheel ? -deltaY : deltaY;

                itemRefs.current.forEach((item:any, idx:number) => {
                    const parentCol = item.parentElement;
                    const parentIndex = parentCol ? colRefs.current.indexOf(parentCol) : 0;
    
                    yTo[idx](increment.y * (1 + .1 * parentIndex));
                })
            },
        })
    }, {
        scope: container,
        revertOnUpdate: true,
        dependencies: [isReady]
    })

    return (
        <section className={style.archive} ref={container} style={{ '--columns': columns } as React.CSSProperties}>
            <div className={style.archive__container} ref={innerRef}>
                {data.map((col: any, index: number) => (
                    <div
                        key={index}
                        className={style.archive__col}
                        ref={el => { if (el) colRefs.current[index] = el; }}
                    >
                        {col.map((item: any, idx: number) => {
                            const { kind} = item?.media || {};
                            const flatIndex = data.slice(0, index).reduce((sum: number, c: any) => sum + c.length, 0) + idx;

                            switch (kind) {
                                case 'file':
                                    return <VideoModule
                                        key={idx}
                                        data={item}
                                        ref={el => { if (el?.item) itemRefs.current[flatIndex] = el.item; }}
                                    />;
                                case 'image':
                                    return <ImageModule
                                        key={idx}
                                        data={item}
                                        ref={el => { if (el?.item) itemRefs.current[flatIndex] = el.item; }}
                                    />;
                                default:
                                    return null;
                            }
                        })}
                    </div>
                ))}
            </div>
        </section>
    )
}

const VideoModule = forwardRef<{ item: HTMLDivElement | null; isVideo: boolean }, any>((props, ref) => {
    const { data } = props;
    const { getOrCreateVideo } = useVideoCache();
    const containerRef = useRef<HTMLDivElement>(null);
    const itemRef = useRef<HTMLDivElement>(null);
    const [videoElement, setVideoElement] = useState<HTMLVideoElement | null>(null);

    useImperativeHandle(ref, () => ({
        item: itemRef.current,
        isVideo: true
    }));

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
            videoClone.className = style.video;
            videoClone.playsInline = true;
            videoClone.loop = true;
            videoClone.muted = true;
            videoClone.autoplay = true;
            
            // Set the source explicitly
            videoClone.src = data.media.url;
            
            // Append to container
            container.appendChild(videoClone);
            setVideoElement(videoClone);
            
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
            setVideoElement(null);
        };
    }, [data?.media?.url, getOrCreateVideo]);

    if (!data?.media?.url) {
        return null;
    }

    return (
        <div className={style.item} ref={itemRef}>
            <div ref={containerRef} style={{ width: '100%', height: '100%' }} />
        </div>
    )
})

VideoModule.displayName = 'VideoModule';


const ImageModule = forwardRef<{ item: HTMLDivElement | null; isVideo: boolean }, any>((props, ref) => {
    const { data } = props;

    const itemRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(ref, () => ({
        item: itemRef.current,
        isVideo: false
    }));

    return (
        <div className={style.item} ref={itemRef}>
            <ImagePlaceholder
                src={data?.media?.url}
                alt={data?.media?.alt}
                dimensions={{
                    width: data?.media?.width,
                    height: data?.media?.height,
                }}
                className={style.image}
            />
        </div>
    )
})


ImageModule.displayName = 'ImageModule';


export default ArchiveModule;
'use client';

import { forwardRef, useRef, useState, useImperativeHandle, useMemo } from 'react';
import style from './style.module.scss';
import { useGSAP } from '@gsap/react';
import ImagePlaceholder from '@/base/Image';
import { useTempus } from 'tempus/react';
import gsap from 'gsap';
import { Observer } from 'gsap/Observer';
import useVideoRenderer from '@/components/Video';

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


        if (videoStates.length === 0) {
            // If there are no videos, consider it ready
            setIsReady(true);
            return;
        }
        
        // Check if all videos have readyState === 4 (HAVE_ENOUGH_DATA)
        const allVideosReady = videoStates.length > 0 && videoStates.every((state: any) => state.readyState >= 4);
        
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

        const multiplier = 2.5

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
                const isTouch = event.type === "touchmove";

    
                increment.x += (isWheel ? -deltaX : deltaX) * (isTouch ? multiplier : 1);
    
                colRefs.current.forEach((item:any, idx:number) => {
                    xTo[idx](increment.x);
                })
            },
            onChangeY: ({ deltaY, deltaX, velocityY, event }) => {
                if (deltaY === 0) return;
    
                const isWheel = event.type === "wheel";
                const isTouch = event.type === "touchmove";

                if (isWheel) {
                    increment.x += -Math.abs(deltaY);
                    colRefs.current.forEach((item:any, idx:number) => {
                        xTo[idx](increment.x);
                    })
                }

                increment.y += (isWheel ? -deltaY : deltaY) * (isTouch ? multiplier : 1);
                
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


    // const ItemRender = useMemo(() => {
    //     return (
    //         data.map((col: any, index: number) => (
    //             <div
    //                 key={index}
    //                 className={style.archive__col}
    //                 ref={el => { if (el) colRefs.current[index] = el; }}
    //             >
    //                 {col.map((item: any, idx: number) => {
    //                     const { kind} = item?.media || {};
    //                     const flatIndex = data.slice(0, index).reduce((sum: number, c: any) => sum + c.length, 0) + idx;

    //                     switch (kind) {
    //                         case 'file':
    //                             return <VideoModule
    //                                 key={idx}
    //                                 data={item}
    //                                 ref={el => { if (el?.item) itemRefs.current[flatIndex] = el.item; }}
    //                             />;
    //                         case 'image':
    //                             return <ImageModule
    //                                 key={idx}
    //                                 data={item}
    //                                 ref={el => { if (el?.item) itemRefs.current[flatIndex] = el.item; }}
    //                             />;
    //                         default:
    //                             return null;
    //                     }
    //                 })}
    //             </div>
    //         ))
    //     )
    // }, [data]);

    return (
        <section className={style.archive} ref={container} style={{ '--columns': columns } as React.CSSProperties}>
            <div className={style.archive__container} ref={innerRef}>
                {/* {ItemRender} */}
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
    const itemRef = useRef<HTMLDivElement>(null);

    const { videoRef } = useVideoRenderer({
        url: props?.data?.media?.url,
        type: 'video/mp4',
        autoPlay: true,
        loop: true,
        muted: true,
        playsInline: true,
    })

    useImperativeHandle(ref, () => ({
        item: itemRef.current,
        isVideo: true
    }));

    return (
        <div className={style.item} ref={itemRef}>
            <video ref={videoRef} className={style.video}/>
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
'use client';
import ImagePlaceholder from '@/base/Image';
import style from './style.module.scss'
import cn from 'clsx';
import gsap from 'gsap';
import { useUpdateEffect } from 'react-haiku';
import { useGSAP } from '@gsap/react';
import { useCallback, useRef, useState } from 'react';

const WorkDetailSlideSlideModule = ({ slice }: any) => {
    const { list_images } = slice?.primary || {};

    const containerRef = useRef<HTMLDivElement>(null);
    const listRef = useRef<HTMLDivElement>(null);
    const immageRefs = useRef<Array<any>>([]);
    const isNext = useRef<boolean | null>(null);

    const easing = "power4.out";
    const duration = .8;

    const handleClickLeft = useCallback(() => {
        isNext.current = false;
        setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    }, []);

    const handleClickRight = useCallback(() => {
        isNext.current = true;
        setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, list_images.length - 1));
    }, [list_images]);

    const [currentIndex, setCurrentIndex] = useState<number>(0);

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
        <div
            ref={containerRef}
            className={style.detailSlide}
            data-slice-type={slice.slice_type}
            data-slice-variation={slice.variation}
        >
            <button
                className={cn(style.detailSlide__arrow, style.left, currentIndex === 0 && style.disabled)}
                onClick={handleClickLeft}
            >
                <Arrow className={style.detailSlide__arrow__icon} rotate={true} />
            </button>

            <button
                className={cn(style.detailSlide__arrow, style.right, currentIndex === list_images.length -1 && style.disabled)}
                onClick={handleClickRight}
            >
                <Arrow className={style.detailSlide__arrow__icon} rotate={false} />
            </button>

            <div className={style.detailSlide__list} ref={listRef}>
                {list_images.map((image: any, index: number) => (
                    <ImagePlaceholder 
                        key={index}
                        src={image?.image.url}
                        alt={image?.image.alt}
                        dimensions={image?.image.dimensions}
                        className={style.detailSlide__img}
                        ref={el => { immageRefs.current[index] = el; }}
                    />
                ))}
            </div>
        </div>
    )
}

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

export default WorkDetailSlideSlideModule;
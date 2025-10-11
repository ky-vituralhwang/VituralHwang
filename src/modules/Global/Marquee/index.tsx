'use client'

import TypoDisplay from '@/components/Typo/Display';
import style from './style.module.scss';
import cn from 'clsx';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useLenis } from 'lenis/react';


const MarqueeModule = ({ slice }: any) => {
    const { text } = slice.primary || {};

    const container = useRef<HTMLDivElement>(null);
    const itemDefaultRef = useRef<HTMLDivElement>(null);

    const tlRef = useRef<gsap.core.Timeline | null>(null);
    const itemCloneRef = useRef<HTMLDivElement[]>([]);

    // const lenis = useLenis();

    // useLenis(({ direction }) => {
    //     if (tlRef.current) {
    //         console.log('qq', direction)
    //         gsap.to(tlRef.current, {
    //             timeScale: direction ? 1 : -1,
    //             overwrite: true,
    //         })
    //     }
    // })

    useGSAP(() => {
        if (!container.current || !itemDefaultRef.current) return;

        const containerReact = container.current.getBoundingClientRect();
        const itemReact = itemDefaultRef.current.getBoundingClientRect();

        const minWidth = containerReact.width + itemReact.width;

        const ratio = Math.ceil(minWidth / itemReact.width);

        for (let i = 0; i < ratio - 1; i++) {
            const clone = itemDefaultRef.current.cloneNode(true) as HTMLDivElement;
            container.current.appendChild(clone);
            itemCloneRef.current[i] = clone;
        }

        tlRef.current = gsap.timeline({
            defaults: {
                ease: 'none',
                repeat: -1,
                duration: 10,
            }
        })

        tlRef.current.fromTo([...itemCloneRef.current, itemDefaultRef.current], {
            xPercent: 0
        }, {
            xPercent: -100,
        }).progress(1).progress(0); 


        return () => {
            itemCloneRef.current.forEach(item => {
                if (container.current && item) {
                    container.current.removeChild(item);
                }
            });

            itemCloneRef.current = [];
        }
    }, {
        scope: container,
        revertOnUpdate: true,
        dependencies: []
    })

    return (
        <section
            ref={container}
            className={style.marquee}
            data-slice-type={slice.slice_type}
            data-slice-variation={slice.variation}
        >
            <div
                ref={itemDefaultRef}
                className={style.marquee__content}
            >
                <TypoDisplay
                    className={cn(style.marquee__text, 'txt-up')}
                >
                    {text}
                </TypoDisplay>
            </div>
        </section>
    )
}

export default MarqueeModule
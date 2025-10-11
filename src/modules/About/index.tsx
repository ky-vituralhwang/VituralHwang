'use client';


import TypoDisplay from '@/components/Typo/Display';
import style from './style.module.scss';
import cn from 'clsx';
import TypoHeading from '@/components/Typo/Heading';
import { isEmpty } from 'lodash';
import TypoBody from '@/components/Typo/Body';
import RichText from '@/components/PrismicHelper/RichText';
import { useGSAP } from '@gsap/react';
import { useCallback, useRef } from 'react';
import { useDesktopMatch } from '@/hooks/useMediaQuery';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLenis } from 'lenis/react';
import gsap from 'gsap';


const AboutModule = ({ children, data }: { children: React.ReactNode; data: any }) => {
    const { label_big_text, name, nickname, feature_skill, scroll_down_text } = data?.data || {};
    
    const container = useRef<HTMLElement>(null);
    const wrapper = useRef<HTMLDivElement>(null);
    const bigLabel = useRef<HTMLDivElement>(null);
    const contentHead = useRef<HTMLDivElement>(null);
    const scrollBtn = useRef<HTMLButtonElement>(null);

    const isDesktop = useDesktopMatch();

    const lenis = useLenis();

    useGSAP(() => {
         ScrollTrigger.create({
            trigger: container.current,
            start: 'top top',
            end: 'bottom-=10% bottom',
            onLeave: () => {
                gsap.to(scrollBtn.current, {
                    autoAlpha: 0,
                    y: 20,
                    duration: .3,
                })
            },
            onEnterBack: () => {
                gsap.to(scrollBtn.current, {
                    autoAlpha: 1,
                    y: 0,
                    duration: .3,
                })
            }
        })
    }, {
        scope: container,
        revertOnUpdate: true,
    })

    useGSAP(() => {
        if (!isDesktop) return;

        const scrollTriggerProps = {
            trigger: container.current,
            start: 'top top',
            end: 'bottom bottom',
            pinSpacing: false,
            pinReparent: true,
            // markers: true,
        }

        ScrollTrigger.create({
            ...scrollTriggerProps,
            pin: bigLabel.current,
        })

        ScrollTrigger.create({
            ...scrollTriggerProps,
            pin: contentHead.current,
        })

    }, {
        scope: container,
        revertOnUpdate: true,
        dependencies: [isDesktop],
    })

    const handleScrollDown = useCallback(() => {
        if (!lenis) return;
        lenis.scrollTo(wrapper.current?.clientHeight || 0, { duration: 1.5 });
    }, [lenis])

    return (
        <section
            ref={container}
            className={style.about}
        >
            <div className="container grid" ref={wrapper}>
                <div
                    className={style.about__label}
                    ref={bigLabel}
                >
                    <TypoDisplay
                        tag="span"
                        size={90}
                        className={style.about__label__text}
                    >
                        {label_big_text}
                    </TypoDisplay>
                </div>
                <div className={style.about__content} ref={contentHead}>
                    <TypoHeading
                        tag="h3"
                        size={1}
                        className={style.about__name}
                    >
                        {name}
                    </TypoHeading>
                    <TypoHeading
                        tag="div"
                        size={1}
                        className={style.about__nickname}
                    >
                        {nickname}
                    </TypoHeading>
                    {!isEmpty(feature_skill) && (
                        <div className={style.about__skill}>
                            {feature_skill.map((skill: any, index: number) => (
                                <TypoBody
                                    key={index}
                                    size={20}
                                    className={style.about__skill__item}
                                >
                                    {skill?.skill}
                                </TypoBody>
                            ))}
                        </div>
                    )}
                </div>
                <div className={style.about__slices}>
                    {children}
                    <button
                        className={style.about__scroll}
                        onClick={handleScrollDown}
                        ref={scrollBtn}
                    >
                        <ChevronDown className={style.about__scroll__icon}/>
                        {scroll_down_text}
                    </button>
                </div>
            </div>
        </section>
    )
}


const ChevronDown = ({ className }: { className?: string }) => {
    return (
        <svg
            className={className}
            width="100%"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 640 640"
        >
            <path
                d="M297.4 470.6C309.9 483.1 330.2 483.1 342.7 470.6L534.7 278.6C547.2 266.1 547.2 245.8 534.7 233.3C522.2 220.8 501.9 220.8 489.4 233.3L320 402.7L150.6 233.4C138.1 220.9 117.8 220.9 105.3 233.4C92.8 245.9 92.8 266.2 105.3 278.7L297.3 470.7z"
                fill="currentColor"
            />
        </svg>
    )
}


export default AboutModule;
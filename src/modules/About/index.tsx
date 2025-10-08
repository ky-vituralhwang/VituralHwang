'use client';


import TypoDisplay from '@/components/Typo/Display';
import style from './style.module.scss';
import cn from 'clsx';
import TypoHeading from '@/components/Typo/Heading';
import { isEmpty } from 'lodash';
import TypoBody from '@/components/Typo/Body';
import RichText from '@/components/PrismicHelper/RichText';
import { useGSAP } from '@gsap/react';
import { useRef } from 'react';
import { useDesktopMatch } from '@/hooks/useMediaQuery';
import { ScrollTrigger } from 'gsap/ScrollTrigger';


const AboutModule = ({ data }: any) => {
    const { label_big_text, name, nickname, feature_skill, slices } = data?.data || {};

    
    const skillSlice = slices.filter((slice: any) => slice?.slice_type === 'about_skill');
    
    const container = useRef<HTMLElement>(null);
    const wrapper = useRef<HTMLDivElement>(null);
    const bigLabel = useRef<HTMLDivElement>(null);
    const contentHead = useRef<HTMLDivElement>(null);

    const isDesktop = useDesktopMatch();

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

    return (
        <section
            ref={container}
            className={style.about}
        >
            <div className="container grid" ref={wrapper}>
                <div className={style.about__label} ref={bigLabel}>
                    <TypoDisplay
                        tag="span"
                        size={90}
                        className={style.about__label__text}
                    >
                        {label_big_text}
                    </TypoDisplay>
                </div>
                <div className={style.about__content} ref={contentHead}>
                    <TypoDisplay
                        tag="h3"
                        size={78}
                        className={style.about__name}
                    >
                        {name}
                    </TypoDisplay>
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
                    {slices.map((slice: any, index: number) => {
                        const type = slice?.slice_type;
                        switch (type) {
                            case 'about_richtext':
                                return <RichtextModule key={index} data={slice} />
                            default:
                                break;
                        }
                    })}
                    <SkillModuleWrapper>
                        {skillSlice.map((slice: any, index: number) => (
                            <SkillModule key={index} data={slice} />
                        ))}
                    </SkillModuleWrapper>
                </div>
            </div>
        </section>
    )
}


const RichtextModule = ({ data }: any) => {
    const { title, description } = data?.primary || {};

    return (
        <div className={cn(style.richtext, "grid")}>
            <TypoHeading
                size={32}
                className={style.richtext__text}
            >
                {title}
            </TypoHeading>
            <RichText
                content={description}
                className={style.richtext__desc}
            />
        </div>
    )
}

const SkillModuleWrapper = ({ children }: React.PropsWithChildren) => {
    return (
        <div className={cn(style.skill__wrapper, "grid")}>
            <TypoHeading
                size={32}
                className={style.richtext__text}
            >
                Skills
            </TypoHeading>
            <div className={style.skill__list}>
                {children}
            </div>
        </div>
    )
}

const SkillModule = ({ data }: any) => {
    const { variation } = data || {};

    const { title, skill_list, skill_list_left, skill_list_right } = data?.primary || {};

    return (
        <div className={style.skill}>
            <TypoBody
                size={26}
                className={style.skill__label}
            >
                {title}
            </TypoBody>
            <div className={style.skill__content}>
                {(() => {
                    switch (variation) {
                        case 'default':
                            return (
                                <div className={style.skill__single}>
                                    {skill_list?.map((item: any, index: number) => (
                                        <TypoBody
                                            key={index}
                                            size={16}
                                            className={style.skill__item}
                                        >
                                            {item?.skill}
                                        </TypoBody>
                                    ))}
                                </div>
                            );
                        case '2Columns':
                            return (
                                <div className={style.skill__columns}>
                                    <div className={style.skill__single}>
                                        {skill_list_left?.map((item: any, index: number) => (
                                            <TypoBody
                                                key={index}
                                                className={style.skill__item}
                                            >
                                                {item?.skill}
                                            </TypoBody>
                                        ))}
                                    </div>
                                    <div className={style.skill__single}>
                                        {skill_list_right?.map((item: any, index: number) => (
                                            <TypoBody
                                                key={index}
                                                className={style.skill__item}
                                            >
                                                {item?.skill}
                                            </TypoBody>
                                        ))}
                                    </div>
                                </div>
                            );
                        default:
                            return null;
                    }
                })()}
            </div>
        </div>
    )
}


export default AboutModule;
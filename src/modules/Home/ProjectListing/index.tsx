
'use client';

import { isEmpty } from 'lodash';
import style from './style.module.scss'
import ProjectItem from './Item';
import { useMemo, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useDesktopMatch } from '@/hooks/useMediaQuery';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const ProjectListing = ({ slice }: any) => {
    const { feature_projects } = slice?.primary || {};

    const container = useRef<HTMLElement>(null);
    const itemRefs = useRef<Array<any>>([])
    
    const isDesktop = useDesktopMatch();

    const { contextSafe } = useGSAP({
        scope: container,
        dependencies: [isDesktop]
    });

    const handleMouseHover = contextSafe((e: React.MouseEvent<HTMLAnchorElement>) => {
        if (!isDesktop) return;

        const target = e.currentTarget;

        const index = itemRefs.current.findIndex(({ item }) => item === target)

        gsap.to(itemRefs.current[index]?.image, {
            opacity: 0,
            overwrite: true,
            onStart: () => {
                itemRefs.current[index].video.currentTime = 0;
                itemRefs.current[index].video?.play();
            }
        });
    })

    const handleMouseLeave = contextSafe((e: React.MouseEvent<HTMLAnchorElement>) => {
        if (!isDesktop) return;

        const target = e.currentTarget;
        const index = itemRefs.current.findIndex(({ item }) => item === target)

        gsap.to(itemRefs.current[index]?.image, {
            opacity: 1,
            overwrite: true,
            onComplete: () => {
                itemRefs.current[index].video.currentTime = 0;
                itemRefs.current[index].video?.pause();
            }
        });
    })

    const handleEnter = contextSafe((index: number) => {
        gsap.to(itemRefs.current[index]?.image, {
            opacity: 0,
            duration: 0.5,
            overwrite: true,
            onStart: () => {
                itemRefs.current[index].video.currentTime = 0;
                itemRefs.current[index].video?.play();
            }
        });
    })


    const handleLeave = contextSafe((index: number) => {
        gsap.to(itemRefs.current[index]?.image, {
            opacity: 1,
            duration: 0.5,
            overwrite: true,
            onComplete: () => {
                itemRefs.current[index].video.currentTime = 0;
                itemRefs.current[index].video?.pause();
            }
        });
    })

    useGSAP(() => {
        if (isDesktop) return;

        itemRefs.current.forEach(({ item }, idx) => {
            ScrollTrigger.create({
                trigger: item,
                start: 'top center+=10%',
                end: 'bottom center-=10%',
                // markers: true,
                onEnter: () => handleEnter(idx),
                onEnterBack: () => handleEnter(idx),
                onLeave: () => handleLeave(idx),
                onLeaveBack: () => handleLeave(idx),
            })
        })
    }, {
        scope: container,
        revertOnUpdate: true,
        dependencies: [isDesktop]
    })

    const ProjectListingMemo = useMemo(() => {
        return !isEmpty(feature_projects) && (
            feature_projects.map((project: any, idx: number) => (
                <ProjectItem
                    key={idx}
                    data={project}
                    onMouseEnter={handleMouseHover}
                    onMouseLeave={handleMouseLeave}
                    ref={el => { itemRefs.current[idx] = el }}
                />
            ))
        );
    }, [feature_projects, handleMouseHover, handleMouseLeave]);

    return (
        <section
            className={style.projectList}
            data-slice-type={slice.slice_type}
            data-slice-variation={slice.variation}
            ref={container}
        >
            {ProjectListingMemo}
        </section>
    )

}

export default ProjectListing
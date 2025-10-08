'use client';

import Link from 'next/link';
import style from './style.module.scss'
import cn from 'clsx';
import ImagePlaceholder from '@/base/Image';
import TypoHeading from '@/components/Typo/Heading';
import { forwardRef, useImperativeHandle, useRef } from 'react';
import useVideoRenderer from '@/components/Video';

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

    const aspectRatio = data?.aspect_ratio || undefined;

    const itemRef = useRef<HTMLAnchorElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);

    const { videoRef } = useVideoRenderer({
        url: feature_media?.url,
        type: 'video/mp4',
        autoPlay: true,
        playsInline: true,
        muted: true,
        loop: true
    });
    
    useImperativeHandle(ref, () => ({
        item: itemRef.current,
        image: imageRef.current,
        video: videoRef.current,
        title: titleRef.current,
    }));

    return (
        <Link
            href={url}
            className={cn(style.projectItem, className)}
            ref={itemRef}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            style={{ aspectRatio }}
            {...restProps}
        >
            <div className={style.projectItem__bg} >
                <ImagePlaceholder
                    src={thumbnail?.url}
                    alt={thumbnail?.alt}
                    dimensions={thumbnail?.dimensions}
                    optimized={false}
                    className={style.projectItem__img}
                    ref={imageRef}
                />
                <video ref={videoRef} className={style.projectItem__video}/>
            </div>

            <div className={style.projectItem__content} >
                <TypoHeading
                    tag="div"
                    size={4}
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
'use client';


import ImagePlaceholder from '@/base/Image';
import style from './style.module.scss'
import useVideoRenderer from '@/components/Video';
import { isEmpty } from 'lodash';
import { isFilled } from '@prismicio/client';
import Link from 'next/link';

const VideoModule = ({ data }: any) => {
    const { videoRef } = useVideoRenderer({
        url: data.asset.url,
        type: 'video/mp4',
        playsInline: true,
        loop: true,
        autoPlay: true,
        muted: true,
    })

    return (
        <video
            ref={videoRef}
            className={style.landingBody__video}
        />
    )
}

const ImageModule = ({ data }: any) => {
    const { url, alt, width, height } = data || {};
    return (
        <ImagePlaceholder
            src={url}
            alt={alt}
            dimensions={{
                width,
                height
            }}
        />
    )
}

interface LandingBodyModuleProps {
    slice: any;
}

const LandingBodyModule = ({ slice }: LandingBodyModuleProps) => {
    const { number_of_columns, list } = slice?.primary || {};

    const realColumns = number_of_columns || 2;

    return (
        <section
            className={style.landingBody}
            data-slice-type={slice.slice_type}
            data-slice-variation={slice.variation}
            style={{
                '--grid-columns': realColumns,
            } as any}
        >
            {list?.map((item: any, idx: number) => {
                const { asset, link_url } = item || {};
                const type = asset?.kind;
                
                const isLinkValid = isFilled.link(link_url);
                
                if (!isLinkValid) {
                    switch (type) {
                        case 'image':
                            return (
                                <ImageModule key={idx} data={asset} />
                            )
                        case 'file':
                            return (
                                <VideoModule key={idx} data={item} />
                            )
                        default:
                            return null;
                    }
                } else {
                    const linkType = link_url?.link_type;
                    const isInternalLink = linkType === 'Document';

                    switch (type) {
                        case 'image':
                            return (
                                <Link
                                    href={link_url?.url || '#'}
                                    target={!isInternalLink ? '_blank' : undefined}
                                    rel={!isInternalLink ? 'noopener noreferrer nofollow' : undefined}
                                    key={idx}
                                >
                                    <ImageModule data={asset} />
                                </Link>
                            )
                        case 'file':
                            return (
                                <Link
                                    href={link_url?.url || '#'}
                                    target={!isInternalLink ? '_blank' : undefined}
                                    rel={!isInternalLink ? 'noopener noreferrer nofollow' : undefined}
                                    key={idx}
                                >
                                    <VideoModule data={item} />
                                </Link>
                            )
                        default:
                            return null;
                    }
                }
            })}
        </section>
    )
}

export default LandingBodyModule;
'use client'

import TypoHeading from '@/components/Typo/Heading';
import style from './style.module.scss'
import cn from 'clsx';
import TypoDisplay from '@/components/Typo/Display';
import { isEmpty } from 'lodash';
import Link from 'next/link';
import TypoBody from '@/components/Typo/Body';
import RichText from '@/components/PrismicHelper/RichText';
import ImagePlaceholder from '@/base/Image';

const WorkdetailModule = ({ data }: {data: any }) => {
    const { title, subtitle, live_url, role, responsibilities, challenge, work_detail_image } = data.data || {};

    return (
        <>
            <section className={style.workDetail}>
                <div className={cn(style.workDetail__container, "container")}>
                    <TypoHeading
                        size={60}
                        tag="h1"
                        className={style.workDetail__title}
                    >
                        {title}
                    </TypoHeading>
                    <TypoHeading
                        tag="div"
                        size={32}
                        className={style.workDetail__subtitle}
                    >
                        {subtitle}
                    </TypoHeading>
                    {!isEmpty(live_url.url) && (
                        <Link
                            href={live_url.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={cn(style.workDetail__liveLink, 'txt-underline')}
                        >
                            <TypoHeading
                                size={4}
                                tag="span"
                            >
                                {live_url?.text}
                            </TypoHeading>
                        </Link>
                    )}
                    {!isEmpty(work_detail_image?.url) && (
                        <ImagePlaceholder
                            src={work_detail_image?.url}
                            alt={work_detail_image?.alt}
                            dimensions={work_detail_image?.dimensions}
                            className={cn(style.workDetail__image, style.sm)}
                        />
                    )}
                    <div
                        className={cn(style.workDetail__list, 'grid')}
                    >
                        {!isEmpty(role) && (
                            <ContentWrapper
                                label="Role"
                                className={style.role}
                            >
                                <RichText
                                    content={role}
                                    overwrite={{
                                        paragraph: ({ children }: { children: React.ReactNode }) => (
                                            <TypoBody
                                                size={16}
                                                tag="p"
                                                className={style.workDetail__list__text}
                                            >
                                                {children}<br />
                                            </TypoBody>
                                        ),
                                    }}
                                />
                            </ContentWrapper>
                        )}
                        {!isEmpty(challenge) && (
                            <ContentWrapper
                                label="Challenge"
                                className={style.challenge}
                            >
                                <RichText
                                    content={challenge}
                                    overwrite={{
                                        paragraph: ({ children }: { children: React.ReactNode }) => (
                                            <TypoBody
                                                size={16}
                                                tag="p"
                                                className={style.workDetail__list__text}
                                            >
                                                {children}<br />
                                            </TypoBody>
                                        ),
                                    }}
                                />
                            </ContentWrapper>
                        )}
                        {!isEmpty(responsibilities) && (
                            <ContentWrapper
                                label="Responsibilities"
                                className={style.responsibilities}
                            >
                                <RichText
                                    content={responsibilities}
                                    overwrite={{
                                        paragraph: ({ children }: { children: React.ReactNode }) => (
                                            <TypoBody
                                                size={16}
                                                tag="p"
                                                className={style.workDetail__list__text}
                                            >
                                                {children}<br />
                                            </TypoBody>
                                        ),
                                    }}
                                />
                            </ContentWrapper>
                        )}
                    </div>
                </div>
                {!isEmpty(work_detail_image?.url) && (
                    <ImagePlaceholder
                        src={work_detail_image?.url}
                        alt={work_detail_image?.alt}
                        dimensions={work_detail_image?.dimensions}
                        optimized={false}
                        className={style.workDetail__image}
                    />
                )}
            </section>
        </>
    )
}

const ContentWrapper = ({
    children,
    label,
    className
}: {
    children: React.ReactNode,
    label: string,
    className?: string
}) => {
    return (
        <div className={cn(style.contentWrapper, className)}>
            <TypoBody
                tag="div"
                size={16}
                className={style.contentWrapper__label}
            >
                {label}
            </TypoBody>
            <div className={style.contentWrapper__content}>
                {children}
            </div>
        </div>
    )
}

export default WorkdetailModule
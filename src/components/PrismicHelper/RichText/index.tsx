import style from './style.module.scss';
import cn from "clsx";

import TypoBody from "@/components/Typo/Body";
import TypoHeading from "@/components/Typo/Heading";
import { PrismicRichText, PrismicRichTextProps } from "@prismicio/react";
import React, { forwardRef, Ref } from 'react';
import Link from 'next/link';
import ImagePlaceholder from '@/base/Image';
import { isEmpty } from 'lodash';
import TypoLabel from '@/components/Typo/Label';

interface RichTextProps {
    content: PrismicRichTextProps; // You can replace 'any' with a more specific type if you have one for Prismic rich text fields
    overwrite?: Record<string, any>;
    className?: string;
    isRichText?: boolean;
    [key: string]: any;
}

type NodeType = any; // Replace with a more specific type if available

type HyperlinkProps = {
    node: any;
    children: React.ReactNode;
};

const RichText = forwardRef<HTMLDivElement, RichTextProps>((props, ref: Ref<HTMLDivElement>) => {
    const { content, overwrite = {}, className, isRichText = false, ...restProps } = props;

    const styleRichText = {
        heading1: ({ children }: { children: React.ReactNode }) => (
            <TypoHeading size={48} tag="h2" className={style.heading1}>
                {children}<br />
            </TypoHeading>
        ),
        heading5: ({ children }: { children: React.ReactNode }) => (
            <TypoHeading size={24} tag="h4" className={style.heading5}>
                {children}<br />
            </TypoHeading>
        ),
        heading6: ({ children }: { children: React.ReactNode }) => (
            <TypoHeading size={20} tag="h5" className={style.heading6}>
                {children}<br />
            </TypoHeading>
        ),
    };

    const styleComp = {
        paragraph: ({ children }: { children: React.ReactNode }) => (
            <TypoBody size={16} tag="p" className={style.paragraph}>
                {children}<br />
            </TypoBody>
        ),
        heading1: ({ children }: { children: React.ReactNode }) => (
            <TypoHeading size={1} tag="h1">
                {children}<br />
            </TypoHeading>
        ),
        heading2: ({ children }: { children: React.ReactNode }) => (
            <TypoHeading size={2} tag="h2">
                {children}<br />
            </TypoHeading>
        ),
        heading3: ({ children }: { children: React.ReactNode }) => (
            <TypoHeading size={3} tag="h3">
                {children}<br />
            </TypoHeading>
        ),
        heading4: ({ children }: { children: React.ReactNode }) => (
            <TypoHeading size={4} tag="h4">
                {children}<br />
            </TypoHeading>
        ),
        heading5: ({ children }: { children: React.ReactNode }) => (
            <TypoHeading size={5} tag="h5">
                {children}<br />
            </TypoHeading>
        ),
        heading6: ({ children }: { children: React.ReactNode }) => (
            <TypoHeading size={6} tag="h6">
                {children}<br />
            </TypoHeading>
        ),
        image: ({ node }: { node: NodeType }) => {
            const { url, alt, dimensions, copyright } = node || {};

            return (
                <div className={style.img}>
                    <figure>
                        <ImagePlaceholder
                            src={url}
                            alt={alt}
                            dimensions={dimensions}
                            className={style.img__main}
                        />
                        {!isEmpty(copyright) && (
                            <TypoLabel
                                tag="figcaption"
                                className={style.img__caption}
                            >
                                {copyright}
                            </TypoLabel>
                        )}
                    </figure>
                </div>
            );
        },
        strong: ({ children }: { children: React.ReactNode }) => (
            <span className='txt-med'>{children}</span>
        ),
        em: ({ children }: { children: React.ReactNode }) => (
            <span className='txt-italic'>{children}</span>
        ),
        hyperlink: ({ node, children }: HyperlinkProps) => {
            const { data } = node || {};
            const { url, target, link_type } = data || {};

            return (
                <Link
                    href={url}
                    target={target || '_blank'}
                    rel={target === '_blank' ? 'noopener noreferrer' : undefined}
                    className='txt-med txt-underline'
                    prefetch={link_type === 'Document' ? false : true}
                >
                    {children}
                </Link>
            );
        },
        list: ({ children }: { children: React.ReactNode }) => (
            <ul className={style.ul}>{children}</ul>
        ),
        listItem: ({ children }: { children: React.ReactNode }) => (
            // <li className={style.ul__item}>{children}</li>
            <TypoBody size={16} tag="li" className={style.ul__item}>
                {children}
            </TypoBody>
        ),
        oList: ({ children }: { children: React.ReactNode }) => (
            <ol className={style.ol}>{children}</ol>
        ),
        oListItem: ({ children }: { children: React.ReactNode }) => (
            // <li className={style.ol__item}>{children}</li>
            <TypoBody size={16} tag="li" className={style.ol__item}>
                {children}
            </TypoBody>
        ),
        ...(isRichText ? styleRichText : {}),
        ...overwrite
    };

    return (
        <div
            ref={ref}
            className={cn(style.richtext, isRichText && style.activeStyle, className)}
        >
            <PrismicRichText
                field={content}
                components={styleComp}
            />
        </div>
    );
});

RichText.displayName = 'RichText';

export default RichText;
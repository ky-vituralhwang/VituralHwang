import style from './style.module.scss';
import cn from 'clsx';
import React, { forwardRef } from 'react';

interface TypoHeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
    children?: React.ReactNode;
    color?: string;
    size?: 64 | number;
    tag?: React.ElementType;
    className?: string;
    [key: string]: any;
}

const TypoHeading = forwardRef<HTMLHeadingElement, TypoHeadingProps>(
    ({ children,
        color = 'text-100',
        size = 64,
        tag = 'h1',
        className,
        ...restProps
    }, ref) => {

    let Tag = tag as React.ElementType;

    const defineRender = () => {
        switch (size) {
            case 60:
            case 1:
                if (!Tag) Tag = 'h1';
                return 1;
            case 36:
            case 2:
                if (!Tag) Tag = 'h2';
                return 2;
            case 32:
            case 3:
                if (!Tag) Tag = 'h3';
                return 3;
            case 28:
            case 4:
                if (!Tag) Tag = 'h4';
                return 4;
            case 24:
            case 5:
                if (!Tag) Tag = 'h5';
                return 5;
            case 20:
            case 6:
                if (!Tag) Tag = 'h6';
                return 6;
            default:
                if (!Tag) Tag = 'h1';
                return 1;
        }
    }

    const actualSize = defineRender();

    return React.createElement(
        Tag,
        {
            ref,
            className: cn(
                style.heading,
                style[`heading_${actualSize}`],
                color,
                className
            ),
            ...restProps
        },
        children
    );
});

TypoHeading.displayName = 'TypoHeading';
export default TypoHeading;
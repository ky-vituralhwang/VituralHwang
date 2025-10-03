import style from './style.module.scss';
import cn from 'clsx';
import React, { forwardRef } from 'react';

interface TypoBodyProps extends React.HTMLAttributes<HTMLElement> {
    children?: React.ReactNode;
    color?: string;
    size?: 14 | 16 | 32 | number;
    tag?: React.ElementType;
    className?: string;
    [key: string]: any;
}

const TypoBody = forwardRef<HTMLElement, TypoBodyProps>(
    ({ children,
        size = 16,
        tag = 'p',
        className,
        ...restProps
    }, ref) => {

    let Tag = tag as React.ElementType;

    const defineRender = () => {
        switch (size) {
            case 16:
                return 16;
            case 20:
                return 20;
            case 26:
                return 26;
            default:
                return 16;
        }
    }

    const actualSize = defineRender();
    return React.createElement(
        Tag,
        {
            ref,
            className: cn(
                style.body,
                style[`body_${actualSize}`],
                className
            ),
            ...restProps
        },
        children
    );
});

TypoBody.displayName = 'TypoBody';
export default TypoBody;
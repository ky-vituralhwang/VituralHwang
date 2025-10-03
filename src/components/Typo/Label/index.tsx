import style from './style.module.scss';
import cn from 'clsx';
import React, { forwardRef, ReactNode, ElementType } from 'react';

interface TypoLabelProps extends React.HTMLAttributes<HTMLElement> {
    children: ReactNode;
    color?: string;
    size?: 14 | number;
    tag?: ElementType;
    className?: string;
    [key: string]: any;
}

const TypoLabel = forwardRef<HTMLElement, TypoLabelProps>(
    ({ children, color = 'text-100',
        size = 14,
        tag = 'p',
        className,
        ...restProps
    }, ref) => {

    let Tag = tag as React.ElementType;

    const defineRender = () => {
        switch (size) {
            case 14:
                return 14;
            default:
                return 14;
        }
    };

    const actualSize = defineRender();

    return React.createElement(
        Tag,
        {
            ref,
            className: cn(
                style.label,
                style[`label_${actualSize}`],
                color,
                className
            ),
            ...restProps
        },
        children
    )
});

TypoLabel.displayName = 'TypoLabel';
export default TypoLabel;
import style from './style.module.scss';
import cn from 'clsx';
import React, { forwardRef } from 'react';

export interface TypoDisplayProps extends React.HTMLAttributes<HTMLElement> {
    children?: React.ReactNode;
    color?: string;
    size?: 48 | number;
    tag?: React.ElementType;
    className?: string;
    [key: string]: any;
}

const TypoDisplay = forwardRef<HTMLElement, TypoDisplayProps>(
    ({ children,
        color = 'text-100',
        size = 48,
        tag = 'div',
        className,
        ...restProps
    }, ref) => {
        let Tag = tag as React.ElementType;

        const defineRender = () => {
            switch (size) {
                case 48:
                    return 48;
                case 90:
                    return 90;
                case 78:
                    return 78;
                default:
                    return 48;
            }
        };

        const actualSize = defineRender();

        return React.createElement(
            Tag,
            {
                ref,
                className: cn(
                    style.display,
                    style[`display_${actualSize}`],
                    color,
                    className
                ),
                ...restProps
            },
            children
        );
    }
);

TypoDisplay.displayName = 'TypoDisplay';
export default TypoDisplay;
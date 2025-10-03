import style from './style.module.scss';
import cn from 'clsx';
import React, { forwardRef } from 'react';

const TypoLink = forwardRef(({ children, ...props }, ref) => {
    const {
        color = 'text-100',
        family= "mono",
        size = 14,
        tag= 'p',
        className,
        ...restProps
    } = props;

    let Tag = tag;

    const defineRender = () => {
        switch (size) {
            case 14:
                return 14;
        }
    }

    const actualSize = defineRender();

    return (
        <Tag
            ref={ref}
            className={
                cn(
                    style.link,
                    style[`link_${actualSize}`],
                    family,
                    color,
                    className
                )
            }
            {...restProps}
        >
            {children}
        </Tag>
    )
});

TypoLink.displayName = 'TypoLink';
export default TypoLink;
'use client';

import style from './style.module.scss';
import cn from 'clsx';

import { useDesktopMatch, useTabletMatch, useMobileMatch } from '@hooks/useMediaQuery';
import { useState } from 'react';
import { useIsomorphicLayoutEffect, useLocalStorage } from 'react-haiku';
import useKeyPress from '@/hooks/useKeyPress';
import TypoBody from "@/components/Typo/Body";


const GridDebugger = () => {
    const [columns, setColumns] = useState<number>()
    const [isHide, setIsHide] = useState(true)
    const [value, setValue] = useLocalStorage('isHideGridDebugger', { isHideGridDebugger: true });

    const isDesktop = useDesktopMatch();
    const isTablet = useTabletMatch();
    const isMobile = useMobileMatch();
    
    useIsomorphicLayoutEffect(() => {
        if (isDesktop) setColumns(12);
        if (isTablet) setColumns(12);
        if (isMobile) setColumns(4);
    }, [isDesktop, isTablet, isMobile]);

    useKeyPress(['shift', 'g'], () => {
        setValue({
            isHideGridDebugger: !value?.isHideGridDebugger || !isHide
        })
    })

    useIsomorphicLayoutEffect(() => {
        if (value) {
            setIsHide(value.isHideGridDebugger)
        }
    }, [value]);


    return (
        <div className={cn(style.gridDebugger, isHide && style.hidden)}>
            <div className={cn(style.gridDebugger__grid , 'container grid')}>
                {Array.from({ length: columns as number }, (_, i) => (
                    <TypoBody
                        key={i}
                        className={cn(style.gridDebugger__item, style[`col-${i + 1}`])}
                    >
                        <span className={style.gridDebugger__label}>
                            {i + 2}
                        </span>
                    </TypoBody>
                ))}
            </div>
        </div>
    )
}


export default GridDebugger;
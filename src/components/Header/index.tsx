'use client';

import style from './style.module.scss';
import cn from 'clsx';

import ImagePlaceholder from '@/base/Image';

import Link from 'next/link';
import { useGSAP } from '@gsap/react';
import { useCallback, useRef, useState } from 'react';
import { useIsomorphicLayoutEffect, useUpdateEffect } from 'react-haiku';
import gsap from 'gsap';
import { useMobileMatch } from '@/hooks/useMediaQuery';
import { stopOverscroll } from '@/scripts/stopOverscroll';

const Header = (
    {
        data
    } : {
        data: any
    }) => {

    const container = useRef<HTMLElement>(null);
    const navRef = useRef<HTMLElement>(null);
    const navItemsRef = useRef<Array<HTMLAnchorElement>>([]);

    const isMobile = useMobileMatch();

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const { contextSafe } = useGSAP({ scope: container, revertOnUpdate: true });

    useIsomorphicLayoutEffect(() => {
        stopOverscroll("");
    }, [])

    useUpdateEffect(() => {
        if (!isMobile) {
            setIsMenuOpen(false);
            gsap.set(navRef.current, { clearProps: "all" });
            gsap.set(navItemsRef.current, { clearProps: "all" });
        }
    }, [isMobile])

    const handleClickMenu = useCallback(() => {
        if (isMobile) setIsMenuOpen(!isMenuOpen);
    }, [isMenuOpen, isMobile]);

    const handleOpenMenu = contextSafe(() => {
        gsap.to(navRef.current, {
            height: "auto",
            duration: 0.7,
            overwrite: true,
        })
        gsap.to(navItemsRef.current, {
            yPercent: 0,
            autoAlpha: 1,
            duration: 0.6,
            stagger: -0.1,
            overwrite: true,
        })
    });

    const handleCloseMenu = contextSafe(() => {
        gsap.to(navRef.current, {
            height: "0px",
            duration: 0.7,
            overwrite: true,
        })

        gsap.to(navItemsRef.current, {
            yPercent: -100,
            autoAlpha: 0,
            duration: 0.2,
            stagger: 0.05,
            ease: "expo.in",
            overwrite: true,
        })
    });

    useUpdateEffect(() => {
        if (!isMobile) return

        if (isMenuOpen) {
            handleOpenMenu();
        } else {
            handleCloseMenu();
        }
    }, [isMenuOpen])

    return (
        <header className={style.header} ref={container}>
            <div className={cn("container", "grid", style.header__container)}>
                <Link href="/" className={style.header__logo}>
                    <ImagePlaceholder
                        src={data.logo.url}
                        alt={data.logo.alt}
                        className={style.header__logo__img}
                        dimensions={data.logo.dimensions}
                    />
                </Link>

                <nav className={style.header__nav} ref={navRef}>
                    {data.navigation.map((link: any, idx:number) => (
                        <Link
                            key={idx}
                            href={idx === 0 ? `${link?.page?.url}#summary` : link?.page?.url}
                            className={cn(style.header__nav__link, "txt-underline", "txt-18", "txt-medium")}
                            ref={el => { navItemsRef.current[idx] = el! }}
                        >
                            {link?.page?.text}
                        </Link>
                    ))}
                </nav>

                <button
                    className={style.header__menu}
                    onClick={handleClickMenu}
                >
                    <span className={style.header__menu__icon}/>
                    <span className={style.header__menu__icon}/>
                    <span className={style.header__menu__icon}/>
                </button>
            </div>
        </header>
    )
}

export default Header;
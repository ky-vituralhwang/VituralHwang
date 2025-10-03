

import style from './style.module.scss';
import cn from 'clsx';

import ImagePlaceholder from '@/base/Image';

import Link from 'next/link';

const Header = (
    {
        data
    } : {
        data: any
    }) => {

    return (
        <header className={style.header}>
            <div className={cn("container", "grid", style.header__container)}>
                <Link href="/" className={style.header__logo}>
                    <ImagePlaceholder
                        src={data.logo.url}
                        alt={data.logo.alt}
                        className={style.header__logo__img}
                        dimensions={data.logo.dimensions}
                    />
                </Link>

                <nav className={style.header__nav}>
                    {data.navigation.map((link: any, idx:number) => (
                        <Link
                            key={idx}
                            href={link?.page?.url}
                            className={cn(style.header__nav__link, "txt-underline", "txt-18", "txt-medium")}
                        >
                            {link?.page?.text}
                        </Link>
                    ))}
                </nav>

                <button
                    className={style.header__menu}
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
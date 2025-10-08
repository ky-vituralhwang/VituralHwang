'use client'

import { useLenis } from '@/base/Lenis';
import style from './style.module.scss'
import RichText from '@/components/PrismicHelper/RichText';
import TypoBody from '@/components/Typo/Body';
import { useUpdateEffect } from 'react-haiku';
import { useRef } from 'react';


const Richtext = ({ slice }:any) => {
    const { richtext } = slice?.primary || {};


    const container = useRef<HTMLElement>(null);

    const lenis = useLenis();

    useUpdateEffect(() => {
        const url = new URL(window.location.href);
        const hash = url.hash;

        if (hash === '#summary') {
            if (container.current) {
                lenis?.scrollTo(container.current, { offset: 0 });
            }
        }

    }, [lenis])

    return (
        <section
            className={style.richtext}
            data-slice-type={slice.slice_type}
            id="summary"
            data-slice-variation={slice.variation}
            ref={container}
        >
            <div className="container">
                <RichText
                    content={richtext}
                    isRichText={false}
                    overwrite={{
                        paragraph: ({ children }: { children: React.ReactNode }) => (
                            <TypoBody size={26} tag="p" className={style.richtext__paragraph}>
                                {children}<br />
                            </TypoBody>
                        ),
                    }}
                />
            </div>
        </section>
    )
}

export default Richtext
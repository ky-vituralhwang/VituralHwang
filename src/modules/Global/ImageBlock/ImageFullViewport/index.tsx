'use client';


import clsx from "clsx";
import style from  './style.module.scss';

import ImagePlaceholder from "@/base/Image";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import gsap from "gsap";

const ImageFullViewport = ({ slice }: any) => {
    const { image } = slice.primary || {};

    const container = useRef<HTMLElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);

    useGSAP(() => {
        gsap.fromTo(imageRef.current, {
            yPercent: 0,
        }, {
            yPercent: 25,
            ease: "none",
            scrollTrigger: {
                trigger: container.current,
                start: "top top",
                end: "bottom top",
                scrub: true,
            }
        })
    }, {
        scope: container,
    })

    return (
        <section
            ref={container}
            className={style.imageFVP}
            data-slice-type={slice.slice_type}
            data-slice-variation={slice.variation}
        >
            <div
                className={style.imageFVP__img}
                ref={imageRef}
            >
                <ImagePlaceholder
                    src={image?.url}
                    alt={image?.alt}
                    dimensions={image?.dimensions}
                />
            </div>
        </section>
    )
}

export default ImageFullViewport;
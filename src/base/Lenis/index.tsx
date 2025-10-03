"use client";

import "lenis/dist/lenis.css";

import gsap from "gsap";
import { ReactLenis, useLenis } from "lenis/react";
import { useTempus } from "tempus/react";

import { useRef } from "react";
import type { ReactNode } from "react";
import type { LenisOptions } from "lenis";

type LenisProviderProps = {
    option?: LenisOptions;
    children?: ReactNode;
    [key: string]: any;
};

const LenisProvider = ({ option, ...restProps }: LenisProviderProps) => {
    const lenisRef = useRef<any>(null);

    useTempus((time: number) => {
        if (lenisRef.current?.lenis) {
            lenisRef.current.lenis.raf(time);
            gsap.updateRoot(time / 1000);
        }
    });

    return (
        <ReactLenis
            ref={lenisRef}
            options={{
                lerp: 0.11,
                autoRaf: false,
                // syncTouch: true,
                touchMultiplier: 0,
                ...option,
            }}
            {...restProps}
        />
    );
};

export { LenisProvider, useLenis };
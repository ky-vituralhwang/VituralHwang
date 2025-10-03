"use client";

import { useIsomorphicLayoutEffect } from "react-haiku";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";
import { useLenis } from "../Lenis";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import { Draggable } from "gsap/Draggable";
import { SplitText } from "gsap/SplitText";
import { Flip } from "gsap/Flip";
import { GSDevTools } from "gsap/GSDevTools";

gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase, useGSAP, InertiaPlugin, Draggable, Flip, GSDevTools);

const GsapConfig = () => {
    const lenis = useLenis();

    useIsomorphicLayoutEffect(() => {
        gsap.ticker.remove(gsap.updateRoot)

        gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase, useGSAP, InertiaPlugin, Draggable, Flip, GSDevTools);

        CustomEase.create("custom", "0.36,0,0.12,1");
        CustomEase.create("cursorRotate", "M0,0 C0,0.148 0.093,0.582 0.498,0.87 0.68,1 0.85,1 1,1 ");

        gsap.defaults({
            ease: "custom",
            duration: 1,
        })
    }, [])

    useIsomorphicLayoutEffect(() => {
        ScrollTrigger.refresh(true);
        lenis?.on('scroll', ScrollTrigger.update);
    }, [lenis]);

    return null;
}

export default GsapConfig;
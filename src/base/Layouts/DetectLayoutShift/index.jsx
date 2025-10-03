'use client';
import { useSize, useDebounce, useIsomorphicLayoutEffect } from "react-haiku";
import { useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { useLayoutShift } from "@/hooks/useLayoutShift";

const DetectLayoutShift = ({ children }) => {
    const ref = useRef();
    const { width, height } = useSize(ref);

    // const { changeIsLayoutShift } = useLayoutShift();

    const debounceLayoutShiftWidth = useDebounce(width, 250);
    const debounceLayoutShiftHeight = useDebounce(height, 250);

    useIsomorphicLayoutEffect(() => {
        // changeIsLayoutShift()
        ScrollTrigger?.refresh(true)
    }, [debounceLayoutShiftWidth, debounceLayoutShiftHeight])

    return (
        <main ref={ref}>
            {children}
        </main>
    )
}

export default DetectLayoutShift;
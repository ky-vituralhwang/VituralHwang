'use client';

import { useIsomorphicLayoutEffect } from "react-haiku";
import { usePathname } from "next/navigation";
import { useLenis } from "@/base/Lenis";

const ResetScroll = () => {
    const pathname = usePathname();
    const lenis = useLenis();

    useIsomorphicLayoutEffect(() => {
        lenis?.scrollTo(0, {
            immediate: true,
            force: true,
            lock: true,
        });
        window.scrollTo(0, 0);
    }, [pathname, lenis])

    return null
}

export default ResetScroll
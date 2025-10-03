import { useMediaQuery } from "react-haiku";
import breakpoints from "@constants/breakpointsValues";


export function useDesktopMatch() {
    return useMediaQuery(`(min-width: ${breakpoints.tablet + 1}px)`, null);
}

export function useTabletMatch() {
    return useMediaQuery(`(min-width: ${breakpoints.mobile + 1}px) and (max-width: ${breakpoints.tablet}px)`, null);
}

export function useTabletDownMatch() {
    return useMediaQuery(`(max-width: ${breakpoints.tablet}px)`, null);
}

export function useMobileMatch() {
    return useMediaQuery(`(max-width: ${breakpoints.mobile}px)`, null);
}

export function useMobileUpMatch() {
    return useMediaQuery(`(min-width: ${breakpoints.mobile + 1}px)`, null);
}
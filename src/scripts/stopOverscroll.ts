type ScrollableElement = Element | Window;

const stopOverscroll = (element: ScrollableElement | string | ""): void => {
    // Handle GSAP utils toArray - assuming it returns an array of elements
    const elementsArray = (window as any).gsap?.utils?.toArray(element) || [element];
    let targetElement: ScrollableElement = elementsArray[0] || window;
    
    if (targetElement === document.body || targetElement === document.documentElement) {
        targetElement = window;
    }

    let lastScroll: number = 0;
    let lastTouch: number | undefined;
    let forcing: boolean | undefined;
    let forward: boolean = true;
    
    const isRoot: boolean = targetElement === window;
    const scroller: Element = isRoot ? document.scrollingElement! : (targetElement as Element);
    const ua: string = window.navigator.userAgent + "";
    
    const getMax = (): number => 
        isRoot
            ? scroller.scrollHeight - window.innerHeight
            : scroller.scrollHeight - scroller.clientHeight;

    const addListener = (type: string, func: EventListener): void =>
        targetElement.addEventListener(type, func, { passive: false });

    const revert = (): void => {
        (scroller as HTMLElement).style.overflowY = "auto";
        forcing = false;
    };

    const kill = (): void => {
        forcing = true;
        (scroller as HTMLElement).style.overflowY = "hidden";
        
        if (!forward && scroller.scrollTop < 1) {
            scroller.scrollTop = 1;
        } else {
            scroller.scrollTop = getMax() - 1;
        }
        
        setTimeout(revert, 1);
    };

    const handleTouch = (e: TouchEvent | Event): void => {
        const evt: Touch | Event = (e as TouchEvent).changedTouches 
            ? (e as TouchEvent).changedTouches[0] 
            : e;
        
        const touchForward: boolean = (evt as Touch).pageY <= (lastTouch || 0);
        
        if (
            ((!touchForward && scroller.scrollTop <= 1) ||
                (touchForward && scroller.scrollTop >= getMax() - 1)) &&
            e.type === "touchmove"
        ) {
            e.preventDefault();
        } else {
            lastTouch = (evt as Touch).pageY;
        }
    };

    const handleScroll = (e: Event): void => {
        if (!forcing) {
            const scrollTop: number = scroller.scrollTop;
            forward = scrollTop > lastScroll;
            
            if (
                (!forward && scrollTop < 1) ||
                (forward && scrollTop >= getMax() - 1)
            ) {
                e.preventDefault();
                kill();
            }
            
            lastScroll = scrollTop;
        }
    };

    if ("ontouchend" in document && !!ua.match(/Version\/[\d\.]+.*Safari/)) {
        addListener("scroll", handleScroll);
        addListener("touchstart", handleTouch);
        addListener("touchmove", handleTouch);
    }
    
    (scroller as HTMLElement).style.overscrollBehavior = "none";
}

export { stopOverscroll };
import { useState } from "react";
import { useIsomorphicLayoutEffect } from "react-haiku";

const useIsInIframe = () => {
    const [isInIframe, setIsInIframe] = useState(false)

    const checkIsInIframe = () => {
        try {
            return window.self !== window.top;
        } catch (e) {
            return true;
        }
    };

    useIsomorphicLayoutEffect(() => {
        setIsInIframe(checkIsInIframe());
    }, [])
    
    return isInIframe;
}

export default useIsInIframe;
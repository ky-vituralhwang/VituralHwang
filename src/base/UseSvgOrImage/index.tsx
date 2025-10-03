import { useState } from "react";
import { IconDangerouslyWrapper, IconDangerouslyWrapperProps } from "../Icons";
import ImagePlaceholder from "../Image";
import { useIsomorphicLayoutEffect } from "react-haiku";
import useIsInIframe from "@/hooks/useIsInIframe";

interface UseSvgOrImageProps {
    src: string;
    alt?: string;
    className?: string;
    isFormatColor?: boolean;
}

const UseSvgOrImage = ({ src, alt, className, isFormatColor = true }: UseSvgOrImageProps) => {
    const isInIframe = useIsInIframe();
    const [svgContent, setSvgContent] = useState<string | null>(null);
    
    const isSvg = src.endsWith('.svg');

    useIsomorphicLayoutEffect(() => {
        if (isSvg) {
            fetch(src, { cache: 'force-cache' })
                .then(res => res.text())
                .then((text: string) => setSvgContent(text))
                .catch(() => setSvgContent(null));
        }
    }, [src, isSvg]);

    if (!src) return null;
    
    if (isInIframe) {
        return <ImagePlaceholder src={src} alt={alt} className={className} />;
    }

    if (isSvg) {
        return (
            <IconDangerouslyWrapper
                {...({
                    className,
                    svgText: svgContent || '',
                    isFormatColor,
                } as IconDangerouslyWrapperProps)}
            />
        );
    }

    return <ImagePlaceholder src={src} alt={alt} className={className} />;
};

export default UseSvgOrImage;
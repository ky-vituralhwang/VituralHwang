"use client";

import style from './style.module.scss';
import cn from 'clsx';
import Image, { ImageProps } from 'next/image';
import React, { useState, forwardRef } from 'react';
import { useFirstRender, useIsomorphicLayoutEffect } from 'react-haiku';
// import { useImageLoad } from '@/hooks/useImageLoad';

const timeout = 100;

const stylesImage: React.CSSProperties = {
    display: 'block',
    width: '100%',
    height: '100%',
    objectFit: 'cover',
}

const stylesPlaceholder: React.CSSProperties = {
    position: 'relative',
    display: 'block',
    objectFit: 'cover',
    width: '100%',
    height: '100%',
    transitionDuration: `${timeout}ms`,
}

interface Dimensions {
    width: number;
    height: number;
}

interface ImagePlaceholderProps extends Omit<ImageProps, 'src' | 'alt'> {
    src?: string;
    alt?: string;
    className?: string;
    dimensions?: Dimensions;
}

const ImagePlaceholder = forwardRef<HTMLDivElement, ImagePlaceholderProps>((props, ref) => {
    const { src = "/images/placeholder.svg", alt = "VituralHwang Image", className, dimensions, ...restProps } = props;

    const aspectRatio = dimensions ? dimensions.width / dimensions.height : undefined;

    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);
    const [removePlaceholder, setRemovePlaceholder] = useState<boolean>(false);
    // const { addImageLoader, removeImageLoader, addImageLoaded } = useImageLoad();
    const isFirstRender = useFirstRender();

    const handleMainImageLoad = () => {
        // addImageLoaded();
        setIsLoaded(true);
        setTimeout(() => setRemovePlaceholder(true), timeout);
    };

    const handleMainImageError = () => {
        setIsError(true);
        // removeImageLoader();
    }

    useIsomorphicLayoutEffect(() => {
        // if (isFirstRender) {
        //     addImageLoader();
        // }
    }, [isFirstRender])

    useIsomorphicLayoutEffect(() => {
        const img = new window.Image();
        img.src = src;
        img.onload = handleMainImageLoad;
        img.onerror = handleMainImageError;
    }, []);

    return (
        <div
            ref={ref}
            className={cn(className, style.img)}
            style={{
                aspectRatio
            }}
        >
            <Image
                className={style.img__main}
                src={src}
                alt={alt}
                fill
                sizes='99.9vw'
                // priority={true}
                loading="lazy"
                onLoad={handleMainImageLoad}
                onError={handleMainImageError}
                style={stylesImage}
                {...restProps}
            />
            {!removePlaceholder && (
                <Image
                    className={cn(style.img__placeholder, isLoaded && style.loaded)}
                    src={src}
                    alt={alt}
                    width={100}
                    height={100}
                    priority={true}
                    loading="eager"
                    style={stylesPlaceholder}
                    {...restProps}
                />
            )}
        </div>
    )
})

ImagePlaceholder.displayName = 'ImagePlaceholder';

export default ImagePlaceholder;
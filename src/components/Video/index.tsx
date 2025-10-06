
import { useEffect, useRef, useState, useCallback } from "react";
import { useVideoCache } from "../../hooks/useVideoCache";

interface UseVideoRendererProps {
    url: string;
    type?: string;
    autoPlay?: boolean;
    loop?: boolean;
    muted?: boolean;
    controls?: boolean;
    playsInline?: boolean;
    className?: string;
}

const useVideoRenderer = ({ 
    url, 
    type = 'video/mp4',
    autoPlay = false,
    loop = false,
    muted = true,
    controls = false,
    playsInline = true,
    className = ''
}: UseVideoRendererProps) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const { getOrCreateVideo, preloadVideo } = useVideoCache();
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    console.log('Video URL:', url);

    useEffect(() => {
        if (!url || !videoRef.current) {
            setIsError(!!url); // Only set error if URL exists but ref doesn't
            setIsLoading(false);
            return;
        }

        // Reset states
        setIsLoading(true);
        setIsError(false);

        // Get or create a cached video element
        const cachedVideo = getOrCreateVideo(url, { type });

        // Copy properties from cached video to our React video element
        const currentVideo = videoRef.current;
        
        // Clear existing sources first
        while (currentVideo.firstChild) {
            currentVideo.removeChild(currentVideo.firstChild);
        }

        // Create a fresh source element with the URL
        const sourceElement = document.createElement('source');
        sourceElement.src = url;
        sourceElement.type = type;
        currentVideo.appendChild(sourceElement);

        // Also set the video src as fallback
        currentVideo.src = url;

        // Apply video properties
        currentVideo.autoplay = autoPlay;
        currentVideo.loop = loop;
        currentVideo.muted = muted;
        currentVideo.controls = controls;
        currentVideo.playsInline = playsInline;
        currentVideo.preload = 'metadata';
        
        if (className) {
            currentVideo.className = className;
        }

        // Add event listeners for loading states with detailed error info
        const handleLoadedData = () => {
            setIsLoading(false);
            console.log('Video loaded successfully:', url);
        };

        const handleError = (event: Event) => {
            setIsError(true);
            setIsLoading(false);
            const target = event.target as HTMLVideoElement;
            console.error('Error loading video:', url);
            console.error('Video error details:', {
                error: target.error,
                networkState: target.networkState,
                readyState: target.readyState,
                currentSrc: target.currentSrc
            });
            
            // Try to get more specific error information
            if (target.error) {
                switch (target.error.code) {
                    case target.error.MEDIA_ERR_ABORTED:
                        console.error('Video loading aborted by user');
                        break;
                    case target.error.MEDIA_ERR_NETWORK:
                        console.error('Network error while loading video');
                        break;
                    case target.error.MEDIA_ERR_DECODE:
                        console.error('Error decoding video');
                        break;
                    case target.error.MEDIA_ERR_SRC_NOT_SUPPORTED:
                        console.error('Video format not supported');
                        break;
                    default:
                        console.error('Unknown video error');
                        break;
                }
            }
        };

        currentVideo.addEventListener('loadeddata', handleLoadedData);
        currentVideo.addEventListener('error', handleError);

        // Add additional event listeners for debugging
        const handleLoadStart = () => console.log('Video load started:', url);
        const handleProgress = () => console.log('Video loading progress:', url);
        const handleCanPlay = () => console.log('Video can start playing:', url);
        
        currentVideo.addEventListener('loadstart', handleLoadStart);
        currentVideo.addEventListener('progress', handleProgress);
        currentVideo.addEventListener('canplay', handleCanPlay);

        // Load the video directly - no need for URL accessibility check
        // CDN resources often block HEAD requests but allow video loading
        currentVideo.load();

        // Preload in cache for future use
        preloadVideo(url, { type });

        // Check if already loaded
        if (currentVideo.readyState >= 2) {
            setIsLoading(false);
        }

        // Cleanup function
        return () => {
            currentVideo.removeEventListener('loadeddata', handleLoadedData);
            currentVideo.removeEventListener('error', handleError);
            currentVideo.removeEventListener('loadstart', handleLoadStart);
            currentVideo.removeEventListener('progress', handleProgress);
            currentVideo.removeEventListener('canplay', handleCanPlay);
        };
    }, [url, type, autoPlay, loop, muted, controls, className, playsInline, getOrCreateVideo, preloadVideo]);

    const play = useCallback(() => {
        if (videoRef.current) {
            return videoRef.current.play();
        }
    }, []);

    const pause = useCallback(() => {
        if (videoRef.current) {
            videoRef.current.pause();
        }
    }, []);

    const reset = useCallback(() => {
        if (videoRef.current) {
            videoRef.current.currentTime = 0;
        }
    }, []);

    return { 
        videoRef, 
        isLoading, 
        isError,
        play,
        pause,
        reset
    }
}

export default useVideoRenderer;
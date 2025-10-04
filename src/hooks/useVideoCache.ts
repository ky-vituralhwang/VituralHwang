import { create } from 'zustand';

declare global {
	interface Window {
		__videoCache?: Map<string, HTMLVideoElement>;
	}
}

interface VideoOptions extends Partial<HTMLVideoElement> {
	type?: string;
}

interface VideoCacheState {
	getOrCreateVideo: (src: string, options?: VideoOptions) => HTMLVideoElement;
	preloadVideo: (src: string, options?: VideoOptions) => HTMLVideoElement;
	getCache: () => Map<string, HTMLVideoElement>;
}

export const useVideoCache = create((set, get): VideoCacheState => {
	const videoCache = new Map();

	// Initialize the cache
	if (typeof window !== 'undefined') {
		// Add window method for debugging
		window.__videoCache = videoCache;
	}

	return {
		// Function to get or create a cached video
		getOrCreateVideo: (src, options = {}) => {
			try {
				// If we already have this video in the cache, return it
				if (videoCache.has(src)) {
					console.log(`Using cached video: ${src}`);
					return videoCache.get(src);
				}

				// Otherwise create a new video element
				console.log(`Creating new video: ${src}`);
				const video = document.createElement('video');
				
				// Create and append source element
				const source = document.createElement('source');
				source.src = src;
				source.type = options.type || 'video/mp4';

				// Extract type from options before applying to video element
				const { type, ...videoOptions } = options;
				Object.keys(videoOptions).forEach((key: string) => {
					(video as any)[key] = (videoOptions as any)[key];
				});
				video.appendChild(source);
				
				// Add error handling
				video.addEventListener('error', (e) => {
					console.error(`Error loading video: ${src}`, e);
				});
				
				// Add to cache
				videoCache.set(src, video);
				
				// Return the video
				return video;
			} catch (error) {
				console.error(`Failed to create video for ${src}:`, error);
				// Return a placeholder video element so the app doesn't crash
				return document.createElement('video');
			}
		},

		// Function to preload a video
		preloadVideo: (src, options = {}) => {
			try {
				if (videoCache.has(src)) {
					return videoCache.get(src);
				}
				const video = get().getOrCreateVideo(src, options);
				// Load the video data
				if (video.readyState < 2) { // HAVE_CURRENT_DATA or less
					console.log(`Preloading video: ${src}`);
					video.load();
					
					// Add a load event to track when preloading is complete
					video.addEventListener('loadeddata', () => {
						console.log(`Video preloaded successfully: ${src}`);
					});
				}
				
				return video;
			} catch (error) {
				console.error(`Failed to preload video ${src}:`, error);
				return document.createElement('video');
			}
		},

		// Return the entire cache for debugging purposes
		getCache: () => videoCache
	};
});

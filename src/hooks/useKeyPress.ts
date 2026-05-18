import { useEffect, useCallback } from 'react';

type KeyPressCallback = (event: KeyboardEvent) => void;

const normalizeKey = (key: string | undefined | null): string => {
  if (!key || typeof key !== 'string') {
    return '';
  }
  return key.toLowerCase();
};

const useKeyPress = (
  targetKeys: string | string[],
  callback: KeyPressCallback,
  options: {
    preventDefault?: boolean;
    stopPropagation?: boolean;
  } = {}
) => {
  const { preventDefault = false, stopPropagation = false } = options;

  const handleKeyDown = useCallback(
    (event: KeyboardEvent | Event) => {
      // Type guard to ensure we have a KeyboardEvent
      if (!event || !('key' in event) || typeof event.key !== 'string') {
        return;
      }

      const keyboardEvent = event as KeyboardEvent;
      const normalizedKey = normalizeKey(keyboardEvent.key);
      
      if (!normalizedKey) {
        return;
      }

      const keys = Array.isArray(targetKeys) ? targetKeys : [targetKeys];
      const normalizedTargetKeys = keys.map(key => normalizeKey(key)).filter(Boolean);

      if (normalizedTargetKeys.length === 0) {
        return;
      }

      // Check for key combinations (like Shift + G)
      if (keys.length > 1) {
        const pressedKeys: string[] = [];
        
        // Add modifier keys
        if (keyboardEvent.shiftKey) pressedKeys.push('shift');
        if (keyboardEvent.ctrlKey) pressedKeys.push('control');
        if (keyboardEvent.altKey) pressedKeys.push('alt');
        if (keyboardEvent.metaKey) pressedKeys.push('meta');
        
        // Add the main key
        if (normalizedKey) {
          pressedKeys.push(normalizedKey);
        }

        // Check if all target keys are pressed
        const allKeysPressed = normalizedTargetKeys.every(targetKey => 
          pressedKeys.includes(targetKey)
        );

        if (allKeysPressed) {
          if (preventDefault) keyboardEvent.preventDefault();
          if (stopPropagation) keyboardEvent.stopPropagation();
          callback(keyboardEvent);
        }
      } else {
        // Single key press
        if (normalizedTargetKeys.includes(normalizedKey)) {
          if (preventDefault) keyboardEvent.preventDefault();
          if (stopPropagation) keyboardEvent.stopPropagation();
          callback(keyboardEvent);
        }
      }
    },
    [targetKeys, callback, preventDefault, stopPropagation]
  );

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const eventHandler = (event: Event) => {
      handleKeyDown(event);
    };

    document.addEventListener('keydown', eventHandler);

    return () => {
      document.removeEventListener('keydown', eventHandler);
    };
  }, [handleKeyDown]);
};

export default useKeyPress;
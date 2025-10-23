import { useEffect, useRef, useState } from 'react';

interface MousePosition {
  x: number;
  y: number;
}

interface UseMouseParallaxOptions {
  multiplier?: number;
}

/**
 * Custom hook for mouse parallax effect
 * @param options Configuration options for the parallax effect
 * @returns Object containing the ref to attach to the element and the current mouse position
 */
export const useMouseParallax = (options: UseMouseParallaxOptions = {}) => {
  const { multiplier = 50 } = options;
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (elementRef.current) {
        const rect = elementRef.current.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width;
        const y = (event.clientY - rect.top) / rect.height;

        const normalizedX = (x - 0.5) * 2;
        const normalizedY = (y - 0.5) * 2;

        setMousePosition({
          x: normalizedX * multiplier,
          y: normalizedY * multiplier
        });
      }
    };

    const element = elementRef.current;
    if (element) {
      element.addEventListener('mousemove', handleMouseMove);

      return () => {
        element.removeEventListener('mousemove', handleMouseMove);
      };
    }
  }, [multiplier]);

  return {
    elementRef,
    mousePosition
  };
};

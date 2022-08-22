import { useEffect, useRef } from 'react';

interface UseWindow {
  width: number;
  height: number;
  vMin: number;
  vMax: number;
}

/**
 * Get window dimensions
 * @return dimensions
 */
function useWindow(): UseWindow {
  const windowRef = useRef<Window & typeof globalThis>(window);

  useEffect(() => {
    function update() {
      windowRef.current = window;
    }

    window.addEventListener('resize', update);

    return () => {
      window.removeEventListener('resize', update);
    };
  });

  const { innerWidth, innerHeight } = windowRef.current;
  const vMin = innerWidth < innerHeight ? innerWidth : innerHeight;
  const vMax = innerWidth >= innerHeight ? innerWidth : innerHeight;

  return {
    width: innerWidth,
    height: innerHeight,
    vMin,
    vMax,
  };
}
export default useWindow;

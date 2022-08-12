import { useEffect, useRef } from 'react';

/**
 * Use in React Components for prevProps
 * @param {any} value - Value to reference
 * @return {any} Reference to value
 */
/* eslint-disable */
function usePrevious(value: any) {
  const ref = useRef<any>(value);
  /* eslint-enable */

  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
}
export default usePrevious;

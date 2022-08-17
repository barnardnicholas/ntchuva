import React from 'react';
import { useSpring, config, animated } from 'react-spring';
import usePrevious from '../hooks/usePrevious';

interface CounterProps {
  top: string;
  left: string;
}

function Counter({ top, left }: CounterProps) {
  const prevProps = usePrevious({ top, left });
  const styles = useSpring({
    config: { ...config.wobbly },
    from: prevProps,
    to: {
      top,
      left,
    },
  });

  return <animated.div className="counter" style={styles} />;
}

export default Counter;

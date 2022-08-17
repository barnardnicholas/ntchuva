import React from 'react';
import { useSpring, config, animated } from 'react-spring';

interface CounterProps {
  top: string;
  left: string;
}

function Counter({ top, left }: CounterProps) {
  const styles = useSpring({
    config: { ...config.wobbly },
    from: { top: `${40}%`, left: `${40}%` },
    to: {
      top,
      left,
    },
  });

  return <animated.div className="counter" style={styles} />;
}

export default Counter;

import React, { useEffect, useState } from 'react';
import usePrevious from '../hooks/usePrevious';
import { PathSquare } from '../types/board';
import { getColumnFromPathSquare } from '../utils/utils';

interface HandWidgetProps {
  visible: boolean;
  activeSquare: PathSquare | -1;
  hand: number;
  moveInProgress: boolean;
}
/* eslint-disable */
function HandWidget({ visible, activeSquare, hand, moveInProgress }: HandWidgetProps) {
  /* eslint-enable */

  const prevProps = usePrevious({ moveInProgress });

  const [extraClasses, setExtraClasses] = useState<string>('');

  useEffect(() => {
    if (moveInProgress !== prevProps.moveInProgress)
      setTimeout(() => {
        setExtraClasses(moveInProgress ? 'with-transition' : '');
      }, 100);
  }, [moveInProgress, prevProps.moveInProgress]);

  const squareWidth = 100 / 8;

  const defaultStyles = {
    opacity: visible ? 1 : 0,
    top: 'calc(50% - 1rem)',
    left: 'calc(50% - 1rem)',
  };

  const styles = {
    opacity: visible ? 1 : 0,
    top: `calc(${(activeSquare > 7 ? 50 : 0) + squareWidth / 2}% - 1rem )`,
    left: `calc(${getColumnFromPathSquare(activeSquare as PathSquare) * squareWidth}% - 1rem + ${
      squareWidth / 2
    }%)`,
  };

  return (
    <div
      className={`anim-hand-widget ${extraClasses}`}
      style={moveInProgress ? styles : defaultStyles}
    >
      <h4>{hand}</h4>
    </div>
  );
}

export default HandWidget;

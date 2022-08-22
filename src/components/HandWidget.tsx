import React, { useEffect, useState } from 'react';
import usePrevious from '../hooks/usePrevious';
import useWindow from '../hooks/useWindow';
import { PathSquare } from '../types/board';
import { getColumnFromPathSquare } from '../utils/utils';
import HandCounter from './HandCounter';

interface HandWidgetProps {
  visible: boolean;
  activeSquare: PathSquare | -1;
  hand: number;
  moveInProgress: boolean;
}
function HandWidget({ visible, activeSquare, hand, moveInProgress }: HandWidgetProps) {
  const prevProps = usePrevious({ moveInProgress });
  const { vMin } = useWindow();

  const [extraClasses, setExtraClasses] = useState<string>('');

  useEffect(() => {
    if (moveInProgress !== prevProps.moveInProgress)
      setTimeout(() => {
        setExtraClasses(moveInProgress ? 'with-transition' : '');
      }, 100);
  }, [moveInProgress, prevProps.moveInProgress]);

  const squareWidth = 100 / 8;
  const counterWidthPx = (vMin - 32) / 8 / 5;

  const defaultStyles = {
    opacity: visible ? 1 : 0,
    top: 'calc(50% - 1rem)',
    left: 'calc(50% - 1rem)',
  };

  const styles = {
    opacity: visible ? 1 : 0,
    top: `calc(${(activeSquare > 7 ? 50 : 0) + squareWidth / 2 - 10}% )`,
    left: `calc(${getColumnFromPathSquare(activeSquare as PathSquare) * squareWidth}% - ${
      squareWidth / 10
    }% + ${squareWidth / 2}%)`,
  };

  const intHand: number[] = new Array(hand).fill(0).map((_: number, i: number) => i);

  return (
    <div
      className={`anim-hand-widget ${extraClasses}`}
      style={moveInProgress ? styles : defaultStyles}
    >
      {intHand.map((n: number) => {
        return <HandCounter key={`${n}`} top={`${0 - n * counterWidthPx - 4}px`} />;
      })}
    </div>
  );
}

export default HandWidget;

import React from 'react';
import { BoardSquare, PathSquare } from '../types/board';
import { dummyKeyDown } from '../utils/utils';
import SquareCounters from './SquareCounters';

interface BoardSquareProps {
  square: BoardSquare;
  isActive: boolean;
  handleMove: (pathSquare: PathSquare, isInitialEvent?: boolean) => void;
  disabled: boolean;
  moveInProgress: boolean;
}
function BoardSquareComponent({
  square,
  isActive,
  handleMove,
  disabled,
  moveInProgress,
}: BoardSquareProps) {
  const { i, player, pathOrder, value } = square;

  function handleClick() {
    if (moveInProgress) return;
    handleMove(pathOrder, true);
  }

  return (
    <div
      key={`${i}-${player}`}
      className={`board-square ${isActive ? 'active' : ''} ${disabled ? 'disabled' : ''}`}
      onClick={handleClick}
      onKeyDown={dummyKeyDown}
      role="button"
      tabIndex={0}
    >
      <SquareCounters value={value} />
    </div>
  );
}

export default BoardSquareComponent;

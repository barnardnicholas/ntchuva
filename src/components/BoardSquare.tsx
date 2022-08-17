import React from 'react';
import { BoardSquare, PathSquare } from '../types/board';
import { dummyKeyDown } from '../utils/utils';
import SquareCounters from './SquareCounters';

interface BoardSquareProps {
  square: BoardSquare;
  isActive: boolean;
  handleMove: (pathSquare: PathSquare) => void;
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
    handleMove(pathOrder);
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

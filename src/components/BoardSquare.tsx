import React from 'react';
import { BoardSquare, PathSquare } from '../types/board';
import { dummyKeyDown } from '../utils/utils';
import Counter from './Counter';

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
  const counters: number[] = new Array(value).fill(0).map((_: number, j: number) => j);

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
      {counters.map((j: number) => (
        <Counter key={j} />
      ))}
    </div>
  );
}

export default BoardSquareComponent;

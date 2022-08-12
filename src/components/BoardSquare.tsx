import React from 'react';
import { BoardSquare, PathSquare } from '../types/board';
import { dummyKeyDown } from '../utils/utils';
import Counter from './Counter';

interface BoardSquareProps {
  square: BoardSquare;
  isActive: boolean;
  handleMove: (pathSquare: PathSquare) => void;
  hand: number;
  disabled: boolean;
  moveInProgress: boolean;
}
function BoardSquareComponent({
  square,
  isActive,
  handleMove,
  hand,
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
      {/* <div>{`Index ${i}`}</div>
      <div>{`Player ${player}`}</div>
      <div>{`Column ${column}`}</div>
      <div>{`Path ${pathOrder}`}</div> */}

      {counters.map((j: number) => (
        <Counter key={j} />
      ))}
      {isActive && hand > 0 && (
        <div className="hand-widget">
          <h4>{hand}</h4>
        </div>
      )}
    </div>
  );
}

export default BoardSquareComponent;

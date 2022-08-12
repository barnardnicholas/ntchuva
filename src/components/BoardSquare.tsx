import React from 'react';
import { BoardSquare, PathSquare } from '../types/board';
import { dummyKeyDown } from '../utils/utils';

interface BoardSquareProps {
  square: BoardSquare;
  isActive: boolean;
  handleMove: (pathSquare: PathSquare) => void;
  hand: number;
  disabled: boolean;
}
function BoardSquareComponent({ square, isActive, handleMove, hand, disabled }: BoardSquareProps) {
  const { i, player, pathOrder, column, value } = square;
  return (
    <div
      key={`${i}-${player}`}
      className={`board-square ${isActive ? 'active' : ''} ${disabled ? 'disabled' : ''}`}
      onClick={() => handleMove(pathOrder)}
      onKeyDown={dummyKeyDown}
      role="button"
      tabIndex={0}
    >
      <div>{`Index ${i}`}</div>
      <div>{`Player ${player}`}</div>
      <div>{`Column ${column}`}</div>
      <div>{`Path ${pathOrder}`}</div>

      <h3>{value}</h3>
      {isActive && hand > 0 && (
        <div className="hand-widget">
          <h4>{hand}</h4>
        </div>
      )}
    </div>
  );
}

export default BoardSquareComponent;

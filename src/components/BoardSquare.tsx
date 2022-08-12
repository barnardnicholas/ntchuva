import React from 'react';
import { BoardSquare } from '../types/board';

interface BoardSquareProps {
  square: BoardSquare;
}
function BoardSquareComponent({ square }: BoardSquareProps) {
  const { i, player, pathOrder } = square;
  return (
    <div key={`${i}-${player}`} className="board-square">
      <div>{`Index ${i}`}</div>
      {/* <div>{`Player ${player}`}</div>
            <div>{`Column ${column}`}</div> */}
      <h3>{pathOrder}</h3>
    </div>
  );
}

export default BoardSquareComponent;

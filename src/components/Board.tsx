import React from 'react';
import { boardSquares } from '../constants/board';
import { BoardSquare } from '../types/board';

function Board() {
  return (
    <div className="board-container">
      <div className="board">
        {boardSquares.map(({ i, player, pathOrder }: BoardSquare) => (
          <div key={`${i}-${player}`} className="board-square">
            <div>{`Index ${i}`}</div>
            {/* <div>{`Player ${player}`}</div>
            <div>{`Column ${column}`}</div> */}
            <h3>{pathOrder}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Board;

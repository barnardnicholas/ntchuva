import React from 'react';
import { boardSquares } from '../constants/board';
import { BoardSquare } from '../types/board';
import BoardSquareComponent from './BoardSquare';

function Board() {
  return (
    <div className="board-container">
      <div className="board">
        {boardSquares.map((square: BoardSquare) => (
          <BoardSquareComponent key={`${square.i}-${square.player}`} square={square} />
        ))}
      </div>
    </div>
  );
}

export default Board;

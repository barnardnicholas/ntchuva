import React from 'react';
import useGame from '../hooks/useGame';
import { BoardSquare } from '../types/board';
import BoardSquareComponent from './BoardSquare';

function Board() {
  const {
    board0,
    board1,
    activePlayer,
    activeSquare0,
    activeSquare1,
    hand,
    tick,
    handleMove,
    buttonDisabled,
  } = useGame();
  return (
    <>
      <div>
        Active Player: {activePlayer} Hand: {hand} activeSquare0: {activeSquare0}
      </div>
      <div className="board-container">
        <div className="board">
          {board1.map((square: BoardSquare) => (
            <BoardSquareComponent
              key={`${square.i}-${square.player}`}
              square={square}
              isActive={activeSquare1 === square.pathOrder && activePlayer === square.player}
              handleMove={handleMove}
              hand={hand}
              disabled={activePlayer !== 1}
            />
          ))}
        </div>
        <div style={{ height: '1rem' }} />
        <div className="board">
          {board0.map((square: BoardSquare) => (
            <BoardSquareComponent
              key={`${square.i}-${square.player}`}
              square={square}
              isActive={activeSquare0 === square.pathOrder && activePlayer === square.player}
              handleMove={handleMove}
              hand={hand}
              disabled={activePlayer !== 0}
            />
          ))}
        </div>
      </div>
      <div style={{ height: '1rem' }} />
      <button className="button" type="button" onClick={tick} disabled={buttonDisabled}>
        Tick
      </button>
    </>
  );
}

export default Board;

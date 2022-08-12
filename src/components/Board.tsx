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
    board0EndGame,
    board1EndGame,
    score0,
    score1,
    moveInProgress,
  } = useGame();
  return (
    <>
      <div>{`Player ${activePlayer + 1}'s turn`}</div>
      <div style={{ height: '1rem' }} />
      <div className="board-container">
        <div className={`board ${activePlayer === 1 ? 'active' : ''}`}>
          {board1.map((square: BoardSquare) => (
            <BoardSquareComponent
              key={`${square.i}-${square.player}`}
              square={square}
              isActive={activeSquare1 === square.pathOrder && activePlayer === square.player}
              handleMove={handleMove}
              hand={hand}
              disabled={activePlayer !== 1 || (square.value < 2 && !board1EndGame)}
              moveInProgress={moveInProgress}
            />
          ))}
        </div>
        <div style={{ height: '1rem' }} />
        <div className={`board ${activePlayer === 0 ? 'active' : ''}`}>
          {board0.map((square: BoardSquare) => (
            <BoardSquareComponent
              key={`${square.i}-${square.player}`}
              square={square}
              isActive={activeSquare0 === square.pathOrder && activePlayer === square.player}
              handleMove={handleMove}
              hand={hand}
              disabled={activePlayer !== 0 || (square.value < 2 && !board0EndGame)}
              moveInProgress={moveInProgress}
            />
          ))}
        </div>
      </div>
      <div style={{ height: '1rem' }} />
      <div className="button-container">
        <span>P1: {score0}</span>
        <button className="button" type="button" onClick={tick} disabled={buttonDisabled}>
          Tick
        </button>
        <span>P2: {score1}</span>
      </div>
    </>
  );
}

export default Board;

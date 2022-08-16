import React from 'react';
import ModalBody from './ModalBody';
import ModalOuter from './ModalOuter';

interface GameOverModalProps {
  score0: number;
  score1: number;
  closeModal: () => void;
  resetGame: () => void;
}
/* eslint-disable */
const GameOverModal: React.FC<GameOverModalProps> = ({ closeModal, resetGame, score0, score1 }) => {
  /* eslint-enable */

  const isDraw = score0 === score1;
  const winner = score0 > score1 ? 1 : 2;
  return (
    <ModalOuter>
      <ModalBody title="Game Over" closeModal={closeModal}>
        <div className="score-container">
          <div>
            <h3>{score0}</h3>
            <div>Player 1</div>
          </div>
          <h3>-</h3>
          <div>
            <h3>{score1}</h3>
            <div>Player 2</div>
          </div>
        </div>
        {isDraw ? <div>It&apos;s a draw!</div> : <div>{`Player ${winner} wins!`}</div>}
        <div style={{ minHeight: '1rem' }} />
        <div className="button-container">
          <button className="button" onClick={closeModal} type="button">
            Close
          </button>
          <button className="button" onClick={resetGame} type="button">
            New Game
          </button>
        </div>
      </ModalBody>
    </ModalOuter>
  );
};

export default GameOverModal;

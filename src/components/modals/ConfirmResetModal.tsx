import React from 'react';
import ModalBody from './ModalBody';
import ModalOuter from './ModalOuter';

interface ConfirmResetModalProps {
  closeModal: () => void;
  resetGame: () => void;
}

function ConfirmResetModal({ closeModal, resetGame }: ConfirmResetModalProps) {
  return (
    <ModalOuter>
      <ModalBody title="Reset Game?" closeModal={closeModal}>
        <div style={{ minHeight: '1rem' }} />
        <div>Are you sure you want to reset the game? All progress will be lost!</div>
        <div style={{ minHeight: '1rem' }} />
        <div className="button-container">
          <button className="button" onClick={closeModal} type="button">
            Cancel
          </button>
          <button className="button" onClick={resetGame} type="button">
            Reset
          </button>
        </div>
      </ModalBody>
    </ModalOuter>
  );
}

export default ConfirmResetModal;

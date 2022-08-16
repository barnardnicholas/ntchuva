import React, { ReactNode } from 'react';
import { dummyKeyDown } from '../../utils/utils';

interface ModalBodyProps {
  title: string;
  closeModal: () => void;
  children: ReactNode;
}

/* eslint-disable */
const ModalBody: React.FC<ModalBodyProps> = ({ title, closeModal, children }) => {
  /* eslint-enable */
  return (
    <div className="modal-body">
      <h2>{title}</h2>
      <button
        className="close-modal-button"
        type="button"
        onClick={closeModal}
        tabIndex={0}
        onKeyDown={dummyKeyDown}
      >
        <i className="fal fa-times" />
      </button>
      <div className="modal-body-content">{children}</div>
    </div>
  );
};

export default ModalBody;

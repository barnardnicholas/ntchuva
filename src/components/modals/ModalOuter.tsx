import React, { ReactNode } from 'react';

interface ModalOuterProps {
  children: ReactNode;
}
/* eslint-disable */
const ModalOuter: React.FC<ModalOuterProps> = ({ children }) => {
  /* eslint-enable */
  return (
    <>
      <div className="modal-overlay" />
      <div className="modal-container">{children}</div>
    </>
  );
};

export default ModalOuter;

import React from 'react';
import { dummyKeyDown } from '../../utils/utils';

interface ResetButtonProps {
  handleReset: () => void;
}

function ResetButton({ handleReset }: ResetButtonProps) {
  return (
    <button
      className="reset-button"
      onClick={() => handleReset}
      type="button"
      onKeyDown={dummyKeyDown}
    >
      <i className="fa fa-undo" />
    </button>
  );
}

export default ResetButton;

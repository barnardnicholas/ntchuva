import React, { Dispatch, SetStateAction } from 'react';
import { dummyKeyDown } from '../../utils/utils';

interface ResetButtonProps {
  setResetFlag: Dispatch<SetStateAction<boolean>>;
}

function ResetButton({ setResetFlag }: ResetButtonProps) {
  const handleClick = () => {
    setResetFlag(true);
    setTimeout(() => setResetFlag(false), 5);
  };

  return (
    <button className="reset-button" onClick={handleClick} type="button" onKeyDown={dummyKeyDown}>
      <i className="fa fa-undo" />
    </button>
  );
}

export default ResetButton;

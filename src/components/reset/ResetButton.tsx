import React from 'react';
import { useDispatch } from 'react-redux';
import { toggleResetFlag } from '../../redux/actions/settings';
import { dummyKeyDown } from '../../utils/utils';

function ResetButton() {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(toggleResetFlag(true));
    setTimeout(() => dispatch(toggleResetFlag(false)), 5);
  };

  return (
    <button className="reset-button" onClick={handleClick} type="button" onKeyDown={dummyKeyDown}>
      <i className="fa fa-undo" />
    </button>
  );
}

export default ResetButton;

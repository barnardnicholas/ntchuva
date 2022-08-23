import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSettings } from '../redux/actions/settings';
import { getShowSettings } from '../redux/selectors/settings';

/* eslint-disable */
function BackgroundBlocker() {
  const dispatch = useDispatch();
  const showSettings = useSelector(getShowSettings);

  return (
    <div
      className={`background-blocker ${showSettings ? 'semi-hidden' : 'hidden'}`}
      onClick={() => dispatch(toggleSettings(false))}
      role="button"
      tabIndex={0}
    />
  );
}
/* eslint-enable */

export default BackgroundBlocker;

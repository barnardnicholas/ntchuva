import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleSettings } from '../../redux/actions/settings';
import { getShowSettings } from '../../redux/selectors/settings';
import { dummyKeyDown } from '../../utils/utils';

function SettingsButton() {
  const dispatch = useDispatch();
  const showSettings = useSelector(getShowSettings);

  return (
    <button
      className={`settings-button ${showSettings ? 'active' : ''}`}
      onClick={() => dispatch(toggleSettings(!showSettings))}
      type="button"
      onKeyDown={dummyKeyDown}
    >
      <i className="fa fa-cog" />
    </button>
  );
}

export default SettingsButton;

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleDarkMode } from '../../redux/actions/darkMode';
import { toggleAutoMove, toggleShowAbout } from '../../redux/actions/settings';
import { getDarkMode } from '../../redux/selectors/darkMode';
import { getAutoMove, getShowSettings } from '../../redux/selectors/settings';
import { dummyKeyDown } from '../../utils/utils';
import Divider from '../Divider';
import ToggleSwitch from '../form/ToggleSwitch';

function Settings() {
  const dispatch = useDispatch();
  const showSettings = useSelector(getShowSettings);
  const darkMode = useSelector(getDarkMode);
  const autoMove = useSelector(getAutoMove);

  return (
    <div className={`settings-container ${showSettings ? 'expanded' : ''}`}>
      <div className="settings">
        <h3>Settings</h3>
        <Divider />
        <ToggleSwitch
          label="Dark theme"
          value={darkMode}
          name="darkMode"
          onChange={(_: string, value) => dispatch(toggleDarkMode(value))}
        />
        <Divider />
        <ToggleSwitch
          label="Auto-move"
          value={autoMove}
          name="darkMode"
          onChange={(_: string, value) => {
            dispatch(toggleAutoMove(value));
          }}
        />
        <Divider />
        <div
          className="link-button"
          role="button"
          tabIndex={0}
          onClick={() => dispatch(toggleShowAbout(true))}
          onKeyDown={dummyKeyDown}
        >
          About Ntchuva
        </div>
        <Divider />
      </div>
    </div>
  );
}

export default Settings;

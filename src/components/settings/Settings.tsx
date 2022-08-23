import React, { Dispatch, SetStateAction } from 'react';
import Divider from '../Divider';
import ToggleSwitch from '../form/ToggleSwitch';

interface SettingsProps {
  showSettings: boolean;
  isDarkMode: boolean;
  setIsDarkMode: Dispatch<SetStateAction<boolean>>;
  autoMove: boolean;
  setAutoMove: Dispatch<SetStateAction<boolean>>;
}

function Settings({
  showSettings,
  isDarkMode,
  setIsDarkMode,
  autoMove,
  setAutoMove,
}: SettingsProps) {
  return (
    <div className={`settings-container ${showSettings ? 'expanded' : ''}`}>
      <div className="settings">
        <h3>Settings</h3>
        <Divider />
        <ToggleSwitch
          label="Dark theme"
          value={isDarkMode}
          name="darkMode"
          onChange={(_: string, value) => {
            setIsDarkMode(value);
          }}
        />
        <Divider />
        <ToggleSwitch
          label="Auto-move"
          value={autoMove}
          name="darkMode"
          onChange={(_: string, value) => {
            setAutoMove(value);
          }}
        />
        <Divider />
      </div>
    </div>
  );
}

export default Settings;

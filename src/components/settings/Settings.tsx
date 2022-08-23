import React, { Dispatch, SetStateAction } from 'react';
import Divider from '../Divider';
import ToggleSwitch from '../form/ToggleSwitch';

interface SettingsProps {
  showSettings: boolean;
  isDarkMode: boolean;
  setIsDarkMode: Dispatch<SetStateAction<boolean>>;
}

function Settings({ showSettings, isDarkMode, setIsDarkMode }: SettingsProps) {
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
      </div>
    </div>
  );
}

export default Settings;

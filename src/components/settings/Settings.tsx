import React from 'react';
import Divider from '../Divider';
import ToggleSwitch from '../form/ToggleSwitch';

interface SettingsProps {
  showSettings: boolean;
}

function Settings({ showSettings }: SettingsProps) {
  const handleChange = () => {
    console.log('');
  };

  return (
    <div className={`settings-container ${showSettings ? 'expanded' : ''}`}>
      <div className="settings">
        <h3>Settings</h3>
        <Divider />
        <ToggleSwitch label="Dark theme" value={false} name="darkMode" onChange={handleChange} />
        <Divider />
      </div>
    </div>
  );
}

export default Settings;

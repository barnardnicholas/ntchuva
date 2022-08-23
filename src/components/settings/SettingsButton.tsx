import React, { Dispatch, SetStateAction } from 'react';
import { dummyKeyDown } from '../../utils/utils';

interface SettingsButtonProps {
  showSettings: boolean;
  setShowSettings: Dispatch<SetStateAction<boolean>>;
}

function SettingsButton({ showSettings, setShowSettings }: SettingsButtonProps) {
  return (
    <button
      className={`settings-button ${showSettings ? 'active' : ''}`}
      onClick={() => setShowSettings(!showSettings)}
      type="button"
      onKeyDown={dummyKeyDown}
    >
      <i className="fa fa-cog" />
    </button>
  );
}

export default SettingsButton;

import React, { Dispatch, SetStateAction } from 'react';
import ResetButton from '../reset/ResetButton';
import SettingsButton from '../settings/SettingsButton';

interface HeaderProps {
  showSettings: boolean;
  setShowSettings: Dispatch<SetStateAction<boolean>>;
}

function Header({ showSettings, setShowSettings }: HeaderProps) {
  return (
    <header>
      <ResetButton handleReset={() => {}} />
      <div className={`title-container ${showSettings ? 'semi-hidden' : ''}`}>
        <h1>Ntchuva</h1>
        <div>Bao la Kujifunza/Bao for Beginners/Mbili-mbili</div>
      </div>
      <SettingsButton showSettings={showSettings} setShowSettings={setShowSettings} />
    </header>
  );
}

export default Header;
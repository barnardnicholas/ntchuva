import React from 'react';
import { useSelector } from 'react-redux';
import { getShowSettings } from '../../redux/selectors/settings';
import ResetButton from '../reset/ResetButton';
import SettingsButton from '../settings/SettingsButton';

function Header() {
  const showSettings = useSelector(getShowSettings);
  return (
    <header>
      <ResetButton />
      <div className={`title-container ${showSettings ? 'semi-hidden' : ''}`}>
        <h1>Ntchuva</h1>
        <div>Bao la Kujifunza/Bao for Beginners/Mbili-mbili</div>
      </div>
      <SettingsButton />
    </header>
  );
}

export default Header;

import React, { useState } from 'react';
import Game from './components/Game';
import Settings from './components/settings/Settings';
import Header from './components/header/Header';
import './_styles/App.scss';
import BackgroundBlocker from './components/BackgroundBlocker';

function App() {
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [resetFlag, setResetFlag] = useState<boolean>(false);

  return (
    <div className={`App ${isDarkMode ? '' : 'theme-light'}`}>
      <Game resetFlag={resetFlag} />
      <BackgroundBlocker showSettings={showSettings} handleClick={() => setShowSettings(false)} />
      <Settings showSettings={showSettings} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      <Header
        showSettings={showSettings}
        setShowSettings={setShowSettings}
        setResetFlag={setResetFlag}
      />
    </div>
  );
}

export default App;

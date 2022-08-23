import React, { useState } from 'react';
import Game from './components/Game';
import Settings from './components/settings/Settings';
import Header from './components/header/Header';
import './_styles/App.scss';
import BackgroundBlocker from './components/BackgroundBlocker';

function App() {
  const [showSettings, setShowSettings] = useState<boolean>(false);

  return (
    <div className="App">
      <Game />
      <BackgroundBlocker showSettings={showSettings} handleClick={() => setShowSettings(false)} />
      <Settings showSettings={showSettings} />
      <Header showSettings={showSettings} setShowSettings={setShowSettings} />
    </div>
  );
}

export default App;

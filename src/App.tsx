import React from 'react';
import Game from './components/Game';
import './_styles/App.scss';

function App() {
  return (
    <div className="App">
      <div className="app-content">
        <h1>Ntchuva</h1>
        <Game />
      </div>
    </div>
  );
}

export default App;

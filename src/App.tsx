import React from 'react';
import Game from './components/Game';
import './_styles/App.scss';

function App() {
  return (
    <div className="App">
      <div className="app-content">
        <div className="title-container">
          <h1>Ntchuva</h1>
          <div>Bao la Kujifunza/Bao for Beginners/Mbili-mbili</div>
        </div>
        <Game />
        <div />
      </div>
    </div>
  );
}

export default App;

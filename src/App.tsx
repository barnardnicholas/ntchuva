import React from 'react';
import Game from './components/Game';
import './_styles/App.scss';

function App() {
  return (
    <div className="App">
      <div className="app-content">
        <header>
          <h1>Ntchuva</h1>
          <div>Bao la Kujifunza/Bao for Beginners/Mbili-mbili</div>
        </header>
        <Game />
        <footer />
      </div>
    </div>
  );
}

export default App;

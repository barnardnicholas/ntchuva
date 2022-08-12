import React from 'react';
import Board from './components/Board';
import './_styles/App.scss';

function App() {
  return (
    <div className="App">
      <div className="app-content">
        <h1>Ntchuva</h1>
        <Board />
      </div>
    </div>
  );
}

export default App;

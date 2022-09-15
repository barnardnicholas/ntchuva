import React from 'react';
import useCreateJoinGames from '../hooks/useCreateJoinGames';
import Button from './form/Button';

function Home() {
  const {
    handleCreateLocalGame,
    handleCreateOnlineGame,
    handleJoinOnlineGame,
    isCreating,
    isJoining,
    error,
  } = useCreateJoinGames();

  return (
    <main>
      <h2>Main Menu</h2>
      {isCreating && <div>Creating game...</div>}
      {isJoining && <div>Joining game...</div>}
      {error && <div>{error}</div>}
      <div>
        <Button text="Create local game" onClick={handleCreateLocalGame} />
      </div>
      <div>
        <Button text="Create online game" onClick={handleCreateOnlineGame} />
      </div>
      <div>
        <Button text="Join Online Game" onClick={handleJoinOnlineGame} />
      </div>
    </main>
  );
}

export default Home;

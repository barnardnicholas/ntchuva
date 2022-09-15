import { doc, getFirestore, setDoc } from 'firebase/firestore';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import initialGameState from '../constants/game';
import app from '../firebase/config';

const firestore = getFirestore(app);

const useCreateJoinGames = () => {
  const navigate = useNavigate();
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [isJoining, setIsJoining] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  function handleCreateLocalGame() {
    navigate('/game');
  }

  async function handleCreateOnlineGame() {
    setIsCreating(true);
    setError(null);
    try {
      const id: string = uuid();
      await setDoc(doc(firestore, 'games', id), initialGameState);
      setIsCreating(false);
      navigate(`/game/${id}/0`);
    } catch (e) {
      console.error(e);
      setIsCreating(false);
      setError('Failed to create game on server');
    }
  }

  async function handleJoinOnlineGame() {
    setIsJoining(true);
    setIsJoining(false);
  }

  return {
    handleCreateLocalGame,
    handleCreateOnlineGame,
    handleJoinOnlineGame,
    isCreating,
    isJoining,
    error,
  };
};

export default useCreateJoinGames;

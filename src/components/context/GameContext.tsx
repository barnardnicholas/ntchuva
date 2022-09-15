import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { doc, getFirestore, onSnapshot } from 'firebase/firestore';
import { v4 as uuid } from 'uuid';
import initialGameState from '../../constants/game';
import { createGameDocument, getGameDocument, writeGameDocument } from '../../firebase/games';
import { GameState } from '../../types/board';
import app from '../../firebase/config';
import usePrevious from '../../hooks/usePrevious';

export const firestore = getFirestore(app);

export interface GameContextProps {
  isFetching: boolean;
  isPosting: boolean;
  fetchError: string | null;
  postError: string | null;
  inheritedGameState: GameState;
  currentGameId: string;
  setInheritedGameState: Dispatch<SetStateAction<GameState>>;
  syncToServer: (gameState: GameState) => void;
  syncFromServer: () => void;
  createGameOnServer: () => void;
}
export const GameContext = createContext<GameContextProps>({
  isFetching: false,
  isPosting: false,
  fetchError: null,
  postError: null,
  inheritedGameState: initialGameState,
  currentGameId: '',
  /* eslint-disable */
  setInheritedGameState: () => {},
  syncToServer: () => {},
  syncFromServer: () => {},
  createGameOnServer: () => {},
  /* eslint-enable */
});

interface GameContextProviderProps {
  children: ReactNode;
}

function GameContextProvider({ children }: GameContextProviderProps) {
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [isPosting, setIsPosting] = useState<boolean>(false);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [postError, setPostError] = useState<string | null>(null);
  const [currentGameId, setCurrentGameId] = useState<string>('');
  const [inheritedGameState, setInheritedGameState] = useState<GameState>(initialGameState);

  const prevProps = usePrevious({ currentGameId });

  const createGameOnServer = async () => {
    try {
      setIsPosting(true);
      setPostError(null);
      const id: string = uuid();
      await createGameDocument(id, initialGameState);
      setCurrentGameId(id);
      setIsPosting(false);
    } catch (e) {
      setIsPosting(false);
    }
  };

  const syncToServer = async (gameState: GameState) => {
    setIsPosting(true);
    setPostError(null);
    const data = await writeGameDocument(currentGameId, gameState);
    console.log(data);
  };

  const syncFromServer = async () => {
    setIsFetching(true);
    setFetchError(null);
    const data = await getGameDocument(currentGameId);
    if (data) {
      setInheritedGameState(data as GameState);
      setIsFetching(false);
    } else {
      setFetchError('Failed to fetch game');
      setIsFetching(false);
    }
  };

  useEffect(() => {
    if (!prevProps.currentGameId && currentGameId) {
      setIsFetching(true);
      setFetchError(null);
      console.log(currentGameId);
      const docRef = doc(firestore, 'games', currentGameId || '');
      const unsubscribe = onSnapshot(
        docRef,
        snapshot => {
          if (snapshot.exists()) {
            setIsFetching(false);
            setFetchError(null);
            setInheritedGameState(snapshot.data() as GameState);
          }
        },
        error => {
          setIsFetching(false);
          setFetchError(error.message);
          console.error(`Failed to fetch snapshot for uid ${currentGameId}`, error);
        },
      );
      return () => unsubscribe();
    }

    /* eslint-disable */
    return () => {};
  }, [currentGameId, prevProps.currentGameId]);
  /* eslint-enable */

  const providerValue: GameContextProps = useMemo(
    () => ({
      isFetching,
      isPosting,
      fetchError,
      postError,
      inheritedGameState,
      currentGameId,
      setInheritedGameState,
      syncToServer,
      syncFromServer,
      createGameOnServer,
    }),
    /* eslint-disable */
    [isFetching, isPosting, fetchError, postError, inheritedGameState, currentGameId],
    /* eslint-enable */
  );

  return <GameContext.Provider value={providerValue}>{children}</GameContext.Provider>;
}

export default GameContextProvider;

import { doc, getDoc, getFirestore, onSnapshot, setDoc } from 'firebase/firestore';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { maxMoveLength } from '../constants/board';
import initialGameState from '../constants/game';
import { RootState } from '../redux/store';
import { BoardColumn, BoardSquare, GameState, PathSquare, PlayerIndex } from '../types/board';
import {
  getAutoMovePathSquare,
  getIndexOfPathSquare,
  getNextPathSquare,
  isSquareInFrontRow,
} from '../utils/utils';
import BoardSquareComponent from './BoardSquare';
import Button from './form/Button';
import HandWidget from './HandWidget';
import ConfirmResetModal from './modals/ConfirmResetModal';
import GameOverModal from './modals/GameOverModal';
import app from '../firebase/config';

/* eslint-disable */
let masterTimer: ReturnType<typeof setInterval> = setInterval(() => {}, 1);
/* eslint-enable */

const firestore = getFirestore(app);

interface GameClassState {
  game: GameState;
  isFetching: boolean;
  fetchError: string | null;
  isPosting: boolean;
  postError: string | null;
}

class Game extends Component<{
  resetFlag: boolean;
  autoMove: boolean;
  params: { uid?: string; player?: string };
}> {
  /* eslint-disable */
  state: GameClassState;
  unsubscribe: ReturnType<typeof onSnapshot>;
  /* eslint-enable */

  constructor(
    props: Readonly<{
      resetFlag: boolean;
      autoMove: boolean;
      params: { uid?: string; player?: string };
    }>,
  ) {
    super(props);
    this.state = {
      game: initialGameState,
      isFetching: true,
      fetchError: null,
      isPosting: false,
      postError: null,
    };
    /* eslint-disable */
    this.unsubscribe = () => {};
    /* eslint-enable */
  }

  componentDidMount() {
    const { params } = this.props;
    const { game } = this.state;
    const { board0, board1, moveInProgress } = game;
    clearInterval(masterTimer); // Clear out timer on mount
    const newGameState: Partial<GameState> = {
      score0: board0.reduce((acc: number, curr: BoardSquare) => acc + curr.value, 0),
      score1: board1.reduce((acc: number, curr: BoardSquare) => acc + curr.value, 0),
    }; // Initialise scores
    this.setGameStateWithTimestamp(newGameState); // Update state
    if (params.uid) {
      const docRef = doc(firestore, 'games', params.uid || '');
      this.unsubscribe = onSnapshot(
        docRef,
        snapshot => {
          console.log('onSnapshot');
          if (snapshot.exists() && !moveInProgress) {
            const lastUpdated: number = new Date().valueOf();
            this.setState({
              isFetching: false,
              fetchError: null,
              game: { ...snapshot.data(), lastUpdated },
            });
          }
        },
        error => {
          console.error(`Failed to fetch snapshot for uid ${params.uid}`, error);
          this.setState({ isFetching: false, fetchError: error.message });
        },
      );
    }
  }

  componentDidUpdate(
    prevProps: {
      resetFlag: boolean;
      params: { uid?: string; player?: string };
    },
    prevState: GameClassState,
  ) {
    const { resetFlag, autoMove } = this.props;
    const { game } = this.state;
    const { game: prevGame } = prevState;
    const { activePlayer, moveInProgress, board0, board1, activeSquare0, activeSquare1 } = game;
    const prevActiveSquare = [prevGame.activeSquare0, prevGame.activeSquare1][
      prevGame.activePlayer
    ];
    const activeSquare = [activeSquare0, activeSquare1][activePlayer];

    if (
      !prevGame.moveInProgress &&
      moveInProgress &&
      prevActiveSquare !== activeSquare &&
      activeSquare !== -1
    ) {
      this.handleMove(activeSquare, true);
    }

    if (prevGame.moveInProgress && !moveInProgress) {
      console.log('END OF TURN');
      clearInterval(masterTimer); // Clear out timer at the end of each turn

      let newState = {}; // Establish new state & update scores & flags as necessary
      const isBoard0EndGame = board0.every((square: BoardSquare) => square.value < 2);
      const isBoard1EndGame = board1.every((square: BoardSquare) => square.value < 2);
      const score0 = board0.reduce((acc: number, curr: BoardSquare) => acc + curr.value, 0);
      const score1 = board1.reduce((acc: number, curr: BoardSquare) => acc + curr.value, 0);
      if (prevGame.isBoard0EndGame !== isBoard0EndGame) newState = { ...newState, isBoard0EndGame };
      if (prevGame.isBoard1EndGame !== isBoard1EndGame) newState = { ...newState, isBoard1EndGame };
      if (prevGame.score0 !== score0) newState = { ...newState, score0 };
      if (prevGame.score1 !== score1) newState = { ...newState, score1 };
      if ((prevGame.score0 > 0 && score0 <= 0) || (prevGame.score1 > 0 && score1 <= 0))
        newState = { ...newState, showGameOverModal: true };

      if (Object.keys(newState).length) this.setGameStateWithTimestamp(newState); // Only update state if there are any differences

      if (autoMove) {
        const board = [board0, board1][activePlayer];
        const autoMovePathSquare = getAutoMovePathSquare(board);
        if (autoMovePathSquare !== -1) this.handleMove(autoMovePathSquare); // If auto move is possible and enabled, do it
      }
    }

    if (resetFlag && !prevProps.resetFlag)
      this.setGameStateWithTimestamp({ showConfirmResetModal: true }); // Handle reset button
  }

  componentWillUnmount() {
    clearInterval(masterTimer); // Clear out timer on unmount
    this.unsubscribe();
  }

  setGameStateWithTimestamp = (newGameState: Partial<GameState>, cb?: () => void) => {
    const lastUpdated: number = new Date().valueOf();
    this.setState((prevState: GameClassState) => {
      const { game } = prevState;
      return {
        ...prevState,
        game: { ...game, ...newGameState, lastUpdated },
      };
    }, cb);
  };

  resetGameState = () => {
    clearInterval(masterTimer);
    this.setGameStateWithTimestamp(initialGameState);
  };

  syncToServer = async (gameState?: GameState) => {
    console.log('Syncing to server');
    const { game } = this.state;
    const { params } = this.props;
    if (!params.uid) {
      console.log('No ID provided');
      return;
    }
    this.setState({ isPosting: true, postError: null });
    try {
      await setDoc(doc(firestore, 'games', params.uid), gameState || game);
      this.setState({ isPosting: false });
    } catch (e) {
      this.setState({ isPosting: false, postError: 'Error syncing to server' });
      console.error(e);
    }
  };

  syncFromServer = async () => {
    console.log('Syncing from server');
    const { params } = this.props;
    if (!params.uid) {
      console.log('No ID provided');
      return;
    }
    this.setState({ isFetching: true, fetchError: null });
    try {
      const docRef = doc(firestore, 'games', params.uid);
      const docSnap = await getDoc(docRef);
      this.setState({ isFetching: false, game: docSnap.data() });
    } catch (e) {
      this.setState({ isFetching: false, fetchError: 'Error syncing from server' });
      console.error(e);
    }
  };

  handleMove = (pathSquare: PathSquare, isInitialEvent?: boolean): void => {
    const { game } = this.state;
    const { board0, board1, activePlayer } = game;
    clearInterval(masterTimer);
    const board = [...[board0, board1][activePlayer]];

    // set chosen square value to 0
    const newSquare = board[getIndexOfPathSquare(pathSquare, board)];
    board[newSquare.i] = { ...newSquare, value: 0 }; // Increase value of active square by 1

    // Assemble new State
    const newState = {
      [`board${activePlayer}`]: board,
      hand: newSquare.value,
    };
    if (isInitialEvent) newState.currentMoveLength = 0;
    this.setGameStateWithTimestamp(newState);
    masterTimer = setInterval(this.tick, 333);
  };

  handleChooseSquare = (pathSquare: PathSquare) => {
    const { game } = this.state;
    const { activePlayer } = game;

    const newState = {
      moveInProgress: true,
      buttonDisabled: true,
      [`activeSquare${activePlayer}`]: pathSquare,
    };
    // this.setState((prevState: GameClassState) => {
    //   return { ...prevState, game: { ...game, ...newState } };
    // });
    this.syncToServer({ ...game, ...newState });
  };

  killColumn = (column: BoardColumn, player: PlayerIndex): void => {
    // Capture pieces based on players final square
    const { game } = this.state;
    const { board0, board1 } = game;
    const board = [...[board0, board1][player]].map((square: BoardSquare) => {
      if (square.column === column) return { ...square, value: 0 };
      return square;
    });
    // this.setGameStateWithTimestamp({
    //   [`board${player}`]: board,
    // });
    this.syncToServer({ ...game, [`board${player}`]: board });
  };

  tick = () => {
    const { game } = this.state;
    const { hand, board0, board1, activePlayer, activeSquare0, activeSquare1, currentMoveLength } =
      game;

    const board = [...[board0, board1][activePlayer]]; // Select correct board based on activePlayer and make a copy for private use
    const activeSquare: PathSquare = [activeSquare0, activeSquare1][activePlayer] as PathSquare; // Select correct activeSquare based on activePlayer

    if (activeSquare < 0) return; // Precaution in case activesquare is -1

    if (hand > 0) {
      // There are counters in hand, so move

      const newActiveSquare = getNextPathSquare(activeSquare); // Get next square number in sequence

      const newSquare = board[getIndexOfPathSquare(newActiveSquare, board)]; // Get next square in sequence
      board[newSquare.i] = { ...newSquare, value: newSquare.value + 1 }; // Increase value of active square by 1

      const newState: Record<string, number | boolean | BoardSquare[]> = {
        hand: hand - 1,
        currentMoveLength: currentMoveLength + 1,
      }; // Establish new state

      if (activeSquare !== newActiveSquare) {
        newState[`activeSquare${activePlayer}`] = newActiveSquare;
        newState[`board${activePlayer}`] = board;
      } // Mutate state if necessary

      this.setGameStateWithTimestamp(newState); // Update state
    } else if (
      hand <= 0 &&
      board[getIndexOfPathSquare(activeSquare, board)].value > 1 &&
      currentMoveLength <= maxMoveLength
    ) {
      // There are no more counters in hand, but the final square has more than one, so move again
      this.handleMove(activeSquare);
    } else {
      // This turn is over, so handle capturing of opponent's pieces
      if (isSquareInFrontRow(activeSquare, activePlayer)) {
        const newSquare = board[getIndexOfPathSquare(activeSquare, board)];
        this.killColumn(newSquare.column, activePlayer === 0 ? 1 : 0);
      }

      // this.setGameStateWithTimestamp(
      //   {
      //     activeSquare0: -1,
      //     activeSquare1: -1,
      //     activePlayer: !activePlayer ? 1 : 0,
      //     moveInProgress: false,
      //     score0: board0.reduce((acc: number, curr: BoardSquare) => acc + curr.value, 0),
      //     score1: board1.reduce((acc: number, curr: BoardSquare) => acc + curr.value, 0),
      //     currentMoveLength: 0,
      //     lastUpdated: new Date().valueOf()
      //   }
      // ); // Update state and end turn
      this.syncToServer({
        ...game,
        activeSquare0: -1,
        activeSquare1: -1,
        activePlayer: !activePlayer ? 1 : 0,
        moveInProgress: false,
        score0: board0.reduce((acc: number, curr: BoardSquare) => acc + curr.value, 0),
        score1: board1.reduce((acc: number, curr: BoardSquare) => acc + curr.value, 0),
        currentMoveLength: 0,
        lastUpdated: new Date().valueOf(),
      });
    }
  };

  handleCloseGameOverModal = () => {
    this.setGameStateWithTimestamp({ showGameOverModal: false });
  };

  handleCloseConfirmResetModal = () => {
    this.setGameStateWithTimestamp({ showConfirmResetModal: false });
  };

  render() {
    const { game } = this.state;
    const {
      hand,
      board0,
      board1,
      activePlayer,
      activeSquare0,
      activeSquare1,
      isBoard1EndGame,
      isBoard0EndGame,
      moveInProgress,
      score0,
      score1,
      showGameOverModal,
      showConfirmResetModal,
    } = game;
    const { params } = this.props;
    const { uid, player } = params;
    return (
      <main>
        <div>Current Game ID: {uid || ''}</div>
        <div>Enforced Player: {player || ''}</div>
        <div>
          {score0 <= 0 || score1 <= 0
            ? `Player ${score0 <= 0 ? '2' : '1'} wins!`
            : `Player ${activePlayer + 1}'s turn`}
        </div>
        <div style={{ height: '1rem' }} />
        <div className="board-container">
          <div id="board1" className={`board ${activePlayer === 1 ? 'active' : ''}`}>
            {board1.map((square: BoardSquare) => (
              <BoardSquareComponent
                key={`${square.i}-${square.player}`}
                square={square}
                isActive={activeSquare1 === square.pathOrder && activePlayer === square.player}
                handleMove={this.handleChooseSquare}
                disabled={activePlayer !== 1 || (square.value < 2 && !isBoard1EndGame)}
                moveInProgress={moveInProgress}
              />
            ))}
            <HandWidget
              visible={moveInProgress && activePlayer === 1}
              activeSquare={[activeSquare0, activeSquare1][activePlayer]}
              hand={hand}
              moveInProgress={moveInProgress}
            />
          </div>
          <div style={{ height: '1rem' }} />
          <div id="board0" className={`board ${activePlayer === 0 ? 'active' : ''}`}>
            {board0.map((square: BoardSquare) => (
              <BoardSquareComponent
                key={`${square.i}-${square.player}`}
                square={square}
                isActive={activeSquare0 === square.pathOrder && activePlayer === square.player}
                handleMove={this.handleChooseSquare}
                disabled={activePlayer !== 0 || (square.value < 2 && !isBoard0EndGame)}
                moveInProgress={moveInProgress}
              />
            ))}
            <HandWidget
              visible={moveInProgress && activePlayer === 0}
              activeSquare={[activeSquare0, activeSquare1][activePlayer]}
              hand={hand}
              moveInProgress={moveInProgress}
            />
          </div>
        </div>
        <div style={{ height: '1rem' }} />
        <div className="button-container">
          <span>P1: {score0}</span>
          <span>P2: {score1}</span>
        </div>
        <Button text="Sync To Server" onClick={() => this.syncToServer()} />
        <Button text="Sync From Server" onClick={() => this.syncFromServer()} />
        {showGameOverModal && (
          <GameOverModal
            score0={score0}
            score1={score1}
            closeModal={this.handleCloseGameOverModal}
            resetGame={this.resetGameState}
          />
        )}
        {showConfirmResetModal && (
          <ConfirmResetModal
            closeModal={this.handleCloseConfirmResetModal}
            resetGame={this.resetGameState}
          />
        )}
      </main>
    );
  }
}

interface GameContainerProps {
  autoMove: boolean;
  resetFlag: boolean;
}

function GameContainer({ resetFlag, autoMove }: GameContainerProps) {
  const params = useParams();
  return <Game autoMove={autoMove} resetFlag={resetFlag} params={params} />;
}

const mapStateToProps = ({ settingsReducer: { autoMove, resetFlag } }: RootState) => ({
  autoMove,
  resetFlag,
});

export default connect(mapStateToProps)(GameContainer);

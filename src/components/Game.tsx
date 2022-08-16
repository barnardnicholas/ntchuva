import React, { Component } from 'react';
import BoardSquareComponent from './BoardSquare';
import { BoardColumn, BoardSquare, PathSquare, PlayerIndex } from '../types/board';
import {
  buildBoardSquares,
  getIndexOfPathSquare,
  getNextPathSquare,
  isSquareInFrontRow,
} from '../utils/utils';

/* eslint-disable */
let masterTimer: ReturnType<typeof setInterval> = setInterval(() => {}, 1);
/* eslint-enable */

interface GameState {
  board0: BoardSquare[]; // Player 0's squares
  board1: BoardSquare[]; // Player 1's squares
  activeSquare0: PathSquare | -1; // Player 1
  activeSquare1: PathSquare | -1; // Player 2
  hand: number; // Number of counters in hand
  activePlayer: PlayerIndex; // Player whose move it is
  moveInProgress: boolean; // Is a move happening right now?
  isBoard0EndGame: boolean;
  isBoard1EndGame: boolean;
  score0: number;
  score1: number;
}

class Game<P> extends Component<P> {
  /* eslint-disable */
  state: GameState;
  /* eslint-enable */

  constructor(props: Readonly<P>) {
    super(props);

    this.state = {
      board0: buildBoardSquares(0),
      board1: buildBoardSquares(1),
      activeSquare0: -1,
      activeSquare1: -1,
      hand: 0,
      activePlayer: 0,
      moveInProgress: false,
      isBoard0EndGame: false,
      isBoard1EndGame: false,
      score0: 0,
      score1: 0,
    };
  }

  componentDidMount() {
    const { board0, board1 } = this.state;
    clearInterval(masterTimer); // Clear out timer on mount
    const newState = {
      score0: board0.reduce((acc: number, curr: BoardSquare) => acc + curr.value, 0),
      score1: board1.reduce((acc: number, curr: BoardSquare) => acc + curr.value, 0),
    }; // Initialise scores
    this.setState(newState); // Update state
  }

  componentDidUpdate(_: unknown, prevState: GameState) {
    const { moveInProgress, board0, board1 } = this.state;
    if (prevState.moveInProgress && !moveInProgress) {
      console.log('END OF TURN');
      clearInterval(masterTimer); // Clear out timer at the end of each turn

      let newState = {}; // Establish new state & update scores & flags as necessary
      const isBoard0EndGame = board0.every((square: BoardSquare) => square.value < 2);
      const isBoard1EndGame = board1.every((square: BoardSquare) => square.value < 2);
      const score0 = board0.reduce((acc: number, curr: BoardSquare) => acc + curr.value, 0);
      const score1 = board1.reduce((acc: number, curr: BoardSquare) => acc + curr.value, 0);
      if (prevState.isBoard0EndGame !== isBoard0EndGame)
        newState = { ...newState, isBoard0EndGame };
      if (prevState.isBoard1EndGame !== isBoard1EndGame)
        newState = { ...newState, isBoard1EndGame };
      if (prevState.score0 !== score0) newState = { ...newState, score0 };
      if (prevState.score1 !== score1) newState = { ...newState, score1 };

      if (Object.keys(newState).length) this.setState(newState); // Only update state if there are any differences
    }
  }

  componentWillUnmount() {
    clearInterval(masterTimer); // Clear out timer on unmount
  }

  handleMove = (pathSquare: PathSquare): void => {
    const { board0, board1, activePlayer } = this.state;
    clearInterval(masterTimer);
    const board = [...[board0, board1][activePlayer]];

    // set chosen square value to 0
    const newSquare = board[getIndexOfPathSquare(pathSquare, board)];
    board[newSquare.i] = { ...newSquare, value: 0 }; // Increase value of active square by 1

    // Assemble new State
    const newState = {
      moveInProgress: true,
      buttonDisabled: true,
      [`board${activePlayer}`]: board,
      [`activeSquare${activePlayer}`]: pathSquare,
      hand: newSquare.value,
    };
    this.setState(newState);
    masterTimer = setInterval(this.tick, 333);
  };

  killColumn = (column: BoardColumn, player: PlayerIndex): void => {
    // Capture pieces based on players final square
    const { board0, board1 } = this.state;
    const board = [...[board0, board1][player]].map((square: BoardSquare) => {
      if (square.column === column) return { ...square, value: 0 };
      return square;
    });
    this.setState({ [`board${player}`]: board });
  };

  tick = () => {
    const { hand, board0, board1, activePlayer, activeSquare0, activeSquare1 } = this.state;

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
      }; // Establish new state

      if (activeSquare !== newActiveSquare) {
        newState[`activeSquare${activePlayer}`] = newActiveSquare;
        newState[`board${activePlayer}`] = board;
      } // Mutate state if necessary

      this.setState(newState); // Update state
    } else if (hand <= 0 && board[getIndexOfPathSquare(activeSquare, board)].value > 1) {
      // There are no more counters in hand, but the final square has more than one, so move again
      this.handleMove(activeSquare);
    } else {
      // This turn is over, so handle capturing of opponent's pieces
      if (isSquareInFrontRow(activeSquare, activePlayer)) {
        const newSquare = board[getIndexOfPathSquare(activeSquare, board)];
        this.killColumn(newSquare.column, activePlayer === 0 ? 1 : 0);
      }

      this.setState({
        activeSquare0: -1,
        activeSquare1: -1,
        activePlayer: !activePlayer ? 1 : 0,
        moveInProgress: false,
      }); // Update state and end turn
    }
  };

  render() {
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
    } = this.state;
    return (
      <>
        <div>{`Player ${activePlayer + 1}'s turn`}</div>
        <div style={{ height: '1rem' }} />
        <div className="board-container">
          <div className={`board ${activePlayer === 1 ? 'active' : ''}`}>
            {board1.map((square: BoardSquare) => (
              <BoardSquareComponent
                key={`${square.i}-${square.player}`}
                square={square}
                isActive={activeSquare1 === square.pathOrder && activePlayer === square.player}
                handleMove={this.handleMove}
                hand={hand}
                disabled={activePlayer !== 1 || (square.value < 2 && !isBoard1EndGame)}
                moveInProgress={moveInProgress}
              />
            ))}
          </div>
          <div style={{ height: '1rem' }} />
          <div className={`board ${activePlayer === 0 ? 'active' : ''}`}>
            {board0.map((square: BoardSquare) => (
              <BoardSquareComponent
                key={`${square.i}-${square.player}`}
                square={square}
                isActive={activeSquare0 === square.pathOrder && activePlayer === square.player}
                handleMove={this.handleMove}
                hand={hand}
                disabled={activePlayer !== 0 || (square.value < 2 && !isBoard0EndGame)}
                moveInProgress={moveInProgress}
              />
            ))}
          </div>
        </div>
        <div style={{ height: '1rem' }} />
        <div className="button-container">
          <span>P1: {score0}</span>
          {/* <button
            className="button"
            type="button"
            onClick={this.tick}
            disabled={this.state.buttonDisabled}
          >
            Tick
          </button> */}
          <span>P2: {score1}</span>
        </div>
      </>
    );
  }
}

export default Game;
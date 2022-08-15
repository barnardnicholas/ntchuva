import { BoardColumn, BoardSquare, PathSquare, PlayerIndex } from '../types/board';
import {
  buildBoardSquares,
  getIndexOfPathSquare,
  getNextPathSquare,
  isSquareInFrontRow,
} from '../utils/utils';

class Game {
  board0: BoardSquare[]; // Player 0's squares
  board1: BoardSquare[]; // Player 1's squares
  activeSquare0: PathSquare | -1; // Player 1
  activeSquare1: PathSquare | -1; // Player 2
  buttonDisabled: boolean; // Is tick button disabled?
  hand: number; // Number of counters in hand
  activePlayer: PlayerIndex; // Player whose move it is
  moveInProgress: boolean; // Is a move happening right now?
  isBoard0EndGame: boolean;
  isBoard1EndGame: boolean;
  score0: number;
  score1: number;

  constructor() {
    this.board0 = buildBoardSquares(0);
    this.board1 = buildBoardSquares(1);
    this.activeSquare0 = -1;
    this.activeSquare1 = -1;
    this.buttonDisabled = false;
    this.hand = 0;
    this.activePlayer = 0;
    this.moveInProgress = false;
    this.isBoard0EndGame = false;
    this.isBoard1EndGame = false;
    this.score0 = 0;
    this.score1 = 0;
  }

  killColumn(column: BoardColumn, player: PlayerIndex): void {
    const board = [...[this.board0, this.board1][player]].map((square: BoardSquare) => {
      if (square.column === column) return { ...square, value: 0 };
      return square;
    });
    if (player === 0) this.board0 = board;
    else this.board1 = board;
  }

  handleMove(pathSquare: PathSquare): void {
    this.moveInProgress = true;

    const board = [...[this.board0, this.board1][this.activePlayer]];

    const newSquare = board[getIndexOfPathSquare(pathSquare, board)];
    // set hand to chosen square value
    const newHand = newSquare.value;
    // set chosen square value to 0
    board[newSquare.i] = { ...newSquare, value: 0 }; // Increase value of active square by 1
    // set active square to chosen square

    this.hand = newHand;
    if (this.activePlayer === 0) this.activeSquare0 = pathSquare;
    else this.activeSquare1 = pathSquare;

    if (this.activePlayer === 0) this.board0 = board;
    else this.board1 = board;

    this.buttonDisabled = true;
    setTimeout(() => {
      this.buttonDisabled = false;
    }, 200);
  }

  tick() {
    if (this.buttonDisabled) return;
    const board = [...[this.board0, this.board1][this.activePlayer]];
    const activeSquare: PathSquare = [this.activeSquare0, this.activeSquare1][
      this.activePlayer
    ] as PathSquare;

    if (activeSquare < 0) return;

    if (this.hand > 0) {
      const newActiveSquare =
        board[getIndexOfPathSquare(activeSquare, board)].value > 1
          ? getNextPathSquare(activeSquare)
          : getNextPathSquare(activeSquare); // Only advance active square if value > 1

      const newSquare = board[getIndexOfPathSquare(newActiveSquare, board)];
      board[newSquare.i] = { ...newSquare, value: newSquare.value + 1 }; // Increase value of active square by 1

      this.hand -= 1; // Decrease hand by 1
      if (activeSquare !== newActiveSquare) {
        if (this.activePlayer === 0) {
          this.activeSquare0 = newActiveSquare;
          this.board0 = board;
        } else {
          this.activeSquare1 = newActiveSquare;
          this.board1 = board;
        }
      } // Update board
    } else if (this.hand <= 0 && board[getIndexOfPathSquare(activeSquare, board)].value > 1) {
      /* eslint-disable */
      this.handleMove(activeSquare);
      /* eslint-enable */
    } else {
      // handle capturing of opponents pieces
      if (isSquareInFrontRow(activeSquare, this.activePlayer)) {
        const newSquare = board[getIndexOfPathSquare(activeSquare, board)];
        this.killColumn(newSquare.column, this.activePlayer === 0 ? 1 : 0);
      }
      this.activeSquare0 = -1;
      this.activeSquare1 = -1;
      this.activePlayer = !this.activePlayer ? 1 : 0;
      this.moveInProgress = false;
    }
  }
}

export default Game;

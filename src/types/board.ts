export type BoardColumn = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7; // Zero-indexed
export type PathSquare = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15; // Zero-indexed
export type PlayerIndex = 0 | 1;
export interface BoardSquare {
  i: number;
  pathOrder: PathSquare;
  player: number;
  value: number;
  column: BoardColumn;
}

export interface GameState {
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
  showGameOverModal: boolean;
  showConfirmResetModal: boolean;
  currentMoveLength: number;
  lastUpdated: number;
}

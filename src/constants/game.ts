import { GameState } from '../types/board';
import { buildBoardSquares } from '../utils/utils';

const initialGameState: GameState = {
  board0: buildBoardSquares(0),
  board1: buildBoardSquares(1),
  activeSquare0: -1,
  activeSquare1: -1,
  hand: 0,
  activePlayer: 0,
  moveInProgress: false,
  isBoard0EndGame: false,
  isBoard1EndGame: false,
  score0: 32,
  score1: 32,
  showGameOverModal: false,
  showConfirmResetModal: false,
  currentMoveLength: 0,
  lastUpdated: 0,
};

export default initialGameState;

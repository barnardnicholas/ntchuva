import { boardIndexes } from '../constants/board';
import { BoardColumn, BoardSquare, PathSquare, PlayerIndex } from '../types/board';

/**
 * Calculate a board square's column given its index
 * @param i - Index (0-31) (zero-indexed)
 * @return Column number (0-7) (zero-indexed)
 */
export const getColumnFromIndex = (i: number): BoardColumn => {
  return (i % 8) as BoardColumn;
};

/**
 * Calculate a board square's path order - 0-15 for each player in a clockwise circle
 * @param i - Index (0-31) (zero-indexed)
 * @return Column number (0-15) (zero-indexed)
 */
export const getPathOrderFromIndex = (i: number): PathSquare => {
  let intI: number = i;
  if (i >= 16) intI -= 16;

  if (intI < 8) return intI as PathSquare;
  return (16 - (intI - 7)) as PathSquare;
};

/**
 * Build 16 squares in a circle for one player
 * @param player - 0 or 1 (2 players)
 * @return Array of 16 square objects
 */
export const buildBoardSquares = (player: 0 | 1): BoardSquare[] => {
  return boardIndexes.map((i: number) => {
    return {
      i,
      pathOrder: getPathOrderFromIndex(i),
      player,
      value: 2,
      column: getColumnFromIndex(i),
    };
  });
};

/**
 * Dummy function for linting
 * @return Nothing
 */
export function dummyKeyDown() {
  console.log('keydown');
}

/**
 * Given the pathSquare and player, determine of that square in in the front row
 * @param pathSquare - the pathsquare of the square
 * @param player - 0 or 1 (2 players)
 * @return True if front row, false if back row
 */
export function isSquareInFrontRow(pathSquare: PathSquare, player: PlayerIndex) {
  if (player === 0) return pathSquare < 8;
  return pathSquare > 7;
}

/**
 * Get the next pathSquare in the sequence. wraps back to 0 if on last square
 * @param pathSquare - must be between 0 and 15
 * @return next pathsquare -  - must be between 0 and 15
 */
export function getNextPathSquare(pathSquare: PathSquare): PathSquare {
  if (pathSquare === 15) return 0;
  return (pathSquare + 1) as PathSquare;
}

/**
 * Given a pathsquare and the board, get the array index
 * @param pathSquare - must be between 0 and 15
 * @param board - board in question
 * @return board index
 */
export function getIndexOfPathSquare(pathSquare: PathSquare, board: BoardSquare[]): number {
  // given a pathSquare, get the index
  const result = board.find((square: BoardSquare) => square.pathOrder === pathSquare);
  if (result && !Number.isNaN(result.i)) return result.i;
  return -1;
}

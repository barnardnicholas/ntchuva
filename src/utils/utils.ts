import { boardIndexes, ringNumbers } from '../constants/board';
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
 * Calculate a board square's column given its path number
 * @param pathSquare - Number of path square (0-31) (zero-indexed)
 * @return Column number (0-7) (zero-indexed)
 */
export const getColumnFromPathSquare = (pathSquare: PathSquare): BoardColumn => {
  let intI: PathSquare = pathSquare;
  if (intI > 7) intI = (16 - (intI - 7)) as PathSquare;
  return (intI % 8) as BoardColumn;
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

/**
 * Rotate an XY point around a center XY by a certain angle
 * @param cx - centerX
 * @param cy - centerY
 * @param x - startX
 * @param y - startY
 * @param angle - angle to rotate in degrees
 * @return {{x, y}} resulting coords
 */
export function rotate(
  cx: number,
  cy: number,
  x: number,
  y: number,
  angle: number,
): { x: number; y: number } {
  const radians = (Math.PI / 180) * (angle * -1);
  const cos = Math.cos(radians);
  const sin = Math.sin(radians);
  const nx = cos * (x - cx) + sin * (y - cy) + cx;
  const ny = cos * (y - cy) - sin * (x - cx) + cy;
  return { x: nx, y: ny };
}

/**
 * Get arrangement of concentric ring numbers from value
 * @param value - value of square
 * @return array of ring numbers
 */
export function getRingNumbers(value: number): number[] {
  if (value > 14) return [5, value - 5];
  return ringNumbers[value - 1];
}

/**
 * Get possible auto-move square from board
 * @param board - players boardsquares
 * @return pathsquare number of auto-move square or -1 if impossible
 */
export function getAutoMovePathSquare(board: BoardSquare[]): PathSquare | -1 {
  const scores = board.map((curr: BoardSquare) => curr.value);

  // every square but 1 is empty = true
  const scoresWithValue = scores.filter((score: number) => score > 0);
  const squareWithValue = board.find((square: BoardSquare) => square.value > 0);
  if (scoresWithValue.length === 1 && !!squareWithValue) return squareWithValue.pathOrder;

  // only one square has score of more than 1 = true
  const scoresWithValueMoreThanOne = scores.filter((score: number) => score > 1);
  const squareWithValueMoreThanOne = board.find((square: BoardSquare) => square.value > 1);
  if (scoresWithValueMoreThanOne.length === 1 && !!squareWithValueMoreThanOne)
    return squareWithValueMoreThanOne.pathOrder;

  return -1;
}

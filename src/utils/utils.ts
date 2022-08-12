import { boardIndexes } from '../constants/board';
import { BoardColumn, BoardSquare, PathSquare } from '../types/board';

/**
 * Calculate a board square's column given its index
 * @param {number} index - Index (0-31) (zero-indexed)
 * @return {number} Column number (0-7) (zero-indexed)
 */
export const getColumnFromIndex = (i: number): BoardColumn => {
  return (i % 8) as BoardColumn;
};

/**
 * Calculate a board square's path order - 0-15 for each player in a clockwise circle
 * @param {number} index - Index (0-31) (zero-indexed)
 * @return {number} Column number (0-15) (zero-indexed)
 */
export const getPathOrderFromIndex = (i: number): PathSquare => {
  let intI: number = i;
  if (i >= 16) intI -= 16;

  if (intI < 8) return intI as PathSquare;
  return (16 - (intI - 7)) as PathSquare;
};

/**
 * Build 16 squares in a circle for one player
 * @param {0 | 1} player - 0 or 1 (2 players)
 * @return {BoardSquare[]} Array of 16 square objects
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

export function dummyKeyDown() {
  console.log('keydown');
}

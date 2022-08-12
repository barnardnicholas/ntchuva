import { BoardColumn } from '../types/board';

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
export const getPathOrderFromIndex = (i: number): number => {
  let intI: number = i;
  if (i >= 16) intI -= 16;

  if (intI < 8) return intI;
  return 16 - (intI - 7);
};

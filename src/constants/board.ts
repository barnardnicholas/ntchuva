import { BoardSquare } from '../types/board';
import { getColumnFromIndex, getPathOrderFromIndex } from '../utils/utils';

export const boardIndexes: number[] = new Array(32).fill(0).map((_: unknown, i: number) => i);
/* eslint-disable */
export const boardSquares: BoardSquare[] = boardIndexes.map((i: number) => {
  return {
    i,
    pathOrder: getPathOrderFromIndex(i),
    player: i < 16 ? 1 : 2,
    value: 2,
    column: getColumnFromIndex(i),
  }; // Initial board value for new games
});
/* eslint-enable */

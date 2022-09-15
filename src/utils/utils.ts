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

/**
 * Helper for detecting objects (not arrays or null)
 * @param obj - Obj to examine
 * @return True if object, false if not object
 */
export function isObj(obj: Record<string, unknown>): boolean {
  return typeof obj === 'object' && !Array.isArray(obj) && obj !== null;
}

/**
 * Helper for detecting empty objects
 * @param obj - Obj to examine
 * @return True if empty, false if not empty
 */
export function isObjEmpty(obj: Record<string, unknown>): boolean {
  const keys = Object.keys(obj);
  for (let i = 0; i < keys.length; i += 1) {
    if (Object.prototype.hasOwnProperty.call(obj, keys[i])) return false;
  }
  return true;
}

/**
 * General helper for measuring emptiness of variables - can mean empty or falsy, depending on type
 * @param {any} item - variable to examine
 * @return {boolean} True
 */
export function isEmpty(item: unknown): boolean {
  if (Array.isArray(item)) return !item.length;
  if (typeof item === 'string') return !item.trim().length;
  if (item instanceof Date) return Number.isNaN(item.valueOf());
  if (typeof item === 'object') return isObjEmpty(item as Record<string, unknown>);
  if (typeof item === 'number') return false;

  return !item;
}

/**
 * General helper to compre two arrays to a set depth of nesting
 * @param arr1 - first array to compare
 * @param arr2 - second array to compare
 * @param [depth] - level of nesting (optional)
 * @return True if equal, false if not equal
 */
export function areArraysEqual(arr1: unknown[], arr2: unknown[], depth?: number) {
  if (arr1.length !== arr2.length) return false;
  let intDepth = 1;
  /* eslint-disable */
  if (!!depth) intDepth = depth;
  const check = (arr1: unknown[], arr2: unknown[], depth: number): boolean => {
    /* eslint-enable */
    return arr1.reduce((acc: boolean, curr: unknown, index: number) => {
      if (typeof arr2[index] !== typeof curr) return false;
      if (depth <= 1 && arr2[index] !== curr) return false;
      if (depth > 1 && Array.isArray(arr2[index]) && Array.isArray(curr)) {
        return check(arr2[index] as unknown[], curr as unknown[], depth - 1);
      }
      return acc;
    }, true);
  };

  return check(arr1, arr2, intDepth);
}

/**
 * General helper to compre two objects to a set depth of nesting
 * @param obj1 - first array to compare
 * @param obj2 - second array to compare
 * @param [depth] - level of nesting (optional)
 * @return True if equal, false if not equal
 */
export function areObjectsEqual(
  obj1: Record<string | number | symbol, unknown>,
  obj2: Record<string | number | symbol, unknown>,
  depth?: number,
) {
  if (Object.keys(obj1).length !== Object.keys(obj2).length) return false;
  if (!areArraysEqual(Object.keys(obj1), Object.keys(obj2))) return false;

  let intDepth = 1;
  /* eslint-disable */
  if (!!depth) intDepth = depth;

  const check = (
    obj1: Record<string | number | symbol, unknown>,
    obj2: Record<string | number | symbol, unknown>,
    depth: number,
  ): boolean => {
    /* eslint-enable */
    return Object.keys(obj1).reduce((acc: boolean, curr: string) => {
      if (typeof obj2[curr] !== typeof obj1[curr]) return false;
      if (depth <= 1 && obj2[curr] !== obj1[curr]) return false;
      if (
        depth > 1 &&
        isObj(obj2[curr] as Record<string | number | symbol, unknown>) &&
        isObj(obj1[curr] as Record<string | number | symbol, unknown>)
      ) {
        return check(
          obj2[curr] as Record<string | number | symbol, unknown>,
          obj1[curr] as Record<string | number | symbol, unknown>,
          depth - 1,
        );
      }
      return acc;
    }, true);
  };

  return check(obj1, obj2, intDepth);
}

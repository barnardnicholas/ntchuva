import { boardIndexes } from '../constants/board';
import { BoardSquare, PathSquare, PlayerIndex } from '../types/board';
import {
  areArraysEqual,
  areObjectsEqual,
  buildBoardSquares,
  getAutoMovePathSquare,
  getColumnFromIndex,
  getColumnFromPathSquare,
  getIndexOfPathSquare,
  getNextPathSquare,
  getPathOrderFromIndex,
  getRingNumbers,
  isEmpty,
  isObjEmpty,
  isSquareInFrontRow,
  rotate,
} from './utils';

// ------------------------------------------------------------------------

describe('getColumnFromIndex', () => {
  test('Returns a number', () => {
    boardIndexes.forEach((i: number) => {
      expect(Number.isNaN(getColumnFromIndex(i))).toEqual(false);
    });
  });
  test('Returns a number between 0 and 7', () => {
    boardIndexes.forEach((i: number) => {
      expect(getColumnFromIndex(i)).toBeGreaterThanOrEqual(0);
      expect(getColumnFromIndex(i)).toBeLessThanOrEqual(7);
    });
  });
  test('Returns 0 for indexes 0, 8, 16 and 24', () => {
    expect(getColumnFromIndex(0)).toEqual(0);
    expect(getColumnFromIndex(8)).toEqual(0);
    expect(getColumnFromIndex(16)).toEqual(0);
    expect(getColumnFromIndex(24)).toEqual(0);
  });
  test('Returns 1 for indexes 1, 9, 17 and 25', () => {
    expect(getColumnFromIndex(1)).toEqual(1);
    expect(getColumnFromIndex(9)).toEqual(1);
    expect(getColumnFromIndex(17)).toEqual(1);
    expect(getColumnFromIndex(25)).toEqual(1);
  });
  test('Returns 3 for indexes 3, 11, 19 and 27', () => {
    expect(getColumnFromIndex(3)).toEqual(3);
    expect(getColumnFromIndex(11)).toEqual(3);
    expect(getColumnFromIndex(19)).toEqual(3);
    expect(getColumnFromIndex(27)).toEqual(3);
  });
  test('Returns 6 for indexes 6, 14, 22 and 30', () => {
    expect(getColumnFromIndex(6)).toEqual(6);
    expect(getColumnFromIndex(14)).toEqual(6);
    expect(getColumnFromIndex(22)).toEqual(6);
    expect(getColumnFromIndex(30)).toEqual(6);
  });
  test('Returns 7 for indexes 7, 15, 23 and 31', () => {
    expect(getColumnFromIndex(7)).toEqual(7);
    expect(getColumnFromIndex(15)).toEqual(7);
    expect(getColumnFromIndex(23)).toEqual(7);
    expect(getColumnFromIndex(31)).toEqual(7);
  });
});

// ------------------------------------------------------------------------

describe('getColumnFromPathSquare', () => {
  test('Returns a number', () => {
    boardIndexes.forEach((i: number) => {
      expect(Number.isNaN(getColumnFromPathSquare(i as PathSquare))).toEqual(false);
    });
  });
  test('Returns a number between 0 and 7', () => {
    boardIndexes.forEach((i: number) => {
      expect(getColumnFromPathSquare(i as PathSquare)).toBeGreaterThanOrEqual(0);
      expect(getColumnFromPathSquare(i as PathSquare)).toBeLessThanOrEqual(7);
    });
  });
  test('Returns 0 for indexes 0, 15', () => {
    expect(getColumnFromPathSquare(0)).toEqual(0);
    expect(getColumnFromPathSquare(15)).toEqual(0);
  });
  test('Returns 1 for indexes 1, 14', () => {
    expect(getColumnFromPathSquare(1)).toEqual(1);
    expect(getColumnFromPathSquare(14)).toEqual(1);
  });
  test('Returns 3 for indexes 3, 12', () => {
    expect(getColumnFromPathSquare(3)).toEqual(3);
    expect(getColumnFromPathSquare(12)).toEqual(3);
  });
  test('Returns 6 for indexes 6, 9', () => {
    expect(getColumnFromPathSquare(6)).toEqual(6);
    expect(getColumnFromPathSquare(9)).toEqual(6);
  });
  test('Returns 7 for indexes 7, 8', () => {
    expect(getColumnFromPathSquare(7)).toEqual(7);
    expect(getColumnFromPathSquare(8)).toEqual(7);
  });
});

// ------------------------------------------------------------------------

describe('getPathOrderFromIndex', () => {
  test('Returns a number between 0 and 15', () => {
    boardIndexes.forEach((i: number) => {
      expect(Number.isNaN(getPathOrderFromIndex(i))).toEqual(false);
      expect(getPathOrderFromIndex(i)).toBeGreaterThanOrEqual(0);
      expect(getPathOrderFromIndex(i)).toBeLessThanOrEqual(15);
    });
  });
  test('Returns numbers in original order between 0 and 7', () => {
    [0, 1, 2, 3, 4, 5, 6, 7].forEach((i: number) => {
      expect(getPathOrderFromIndex(i)).toEqual(i);
    });
  });
  test('Returns numbers in reverse order between 8 and 15', () => {
    [8, 9, 10, 11, 12, 13, 14, 15].forEach((i: number) => {
      expect(getPathOrderFromIndex(8)).toEqual(15);
      expect(getPathOrderFromIndex(9)).toEqual(14);
      expect(getPathOrderFromIndex(10)).toEqual(13);
      expect(getPathOrderFromIndex(11)).toEqual(12);
      expect(getPathOrderFromIndex(12)).toEqual(11);
      expect(getPathOrderFromIndex(13)).toEqual(10);
      expect(getPathOrderFromIndex(14)).toEqual(9);
      expect(getPathOrderFromIndex(15)).toEqual(8);
    });
  });
});

// ------------------------------------------------------------------------

describe('buildBoardSquares', () => {
  const player: PlayerIndex = 0;
  const result = buildBoardSquares(player);

  test('Returns an array of valid objects', () => {
    expect(Array.isArray(result)).toEqual(true);

    Object.values(result).forEach((item: BoardSquare) => {
      expect(item).toHaveProperty('i');
      expect(item).toHaveProperty('pathOrder');
      expect(item).toHaveProperty('player');
      expect(item).toHaveProperty('value');
      expect(item).toHaveProperty('column');
    });
  });

  test('Returns the indexes correctly', () => {
    result.forEach((item: BoardSquare, index: number) => {
      expect(item.i).toEqual(index);
    });
  });

  test('Returns correct path orders', () => {
    [0, 1, 2, 3, 4, 5, 6, 7].forEach((i: number) => {
      expect(result[i].pathOrder).toEqual(i);
    });
    expect(result[8].pathOrder).toEqual(15);
    expect(result[9].pathOrder).toEqual(14);
    expect(result[10].pathOrder).toEqual(13);
    expect(result[11].pathOrder).toEqual(12);
    expect(result[12].pathOrder).toEqual(11);
    expect(result[13].pathOrder).toEqual(10);
    expect(result[14].pathOrder).toEqual(9);
    expect(result[15].pathOrder).toEqual(8);
  });

  test('Returns the correct columns', () => {
    expect(result[0].column).toEqual(0);
    expect(result[1].column).toEqual(1);
    expect(result[2].column).toEqual(2);
    expect(result[3].column).toEqual(3);
    expect(result[4].column).toEqual(4);
    expect(result[5].column).toEqual(5);
    expect(result[6].column).toEqual(6);
    expect(result[7].column).toEqual(7);
    expect(result[8].column).toEqual(0);
    expect(result[9].column).toEqual(1);
    expect(result[10].column).toEqual(2);
    expect(result[11].column).toEqual(3);
    expect(result[12].column).toEqual(4);
    expect(result[13].column).toEqual(5);
    expect(result[14].column).toEqual(6);
    expect(result[15].column).toEqual(7);
  });

  test('Returns correct player values', () => {
    result.forEach((item: BoardSquare) => {
      expect(item.player).toEqual(player);
    });

    const player1Results = buildBoardSquares(1);
    player1Results.forEach((item: BoardSquare) => {
      expect(item.player).toEqual(1);
    });
  });

  test('Returns the correct values', () => {
    result.forEach((item: BoardSquare) => {
      expect(item.value).toEqual(2);
    });
  });
});

// ------------------------------------------------------------------------

describe('isSquareInFrontRow', () => {
  const pathIndexes: PathSquare[] = [0, 1, 2, 3, 4, 5, 6, 7, 15, 14, 13, 12, 11, 10, 9, 8]; // Correct path order
  const player0: PlayerIndex = 0;
  const player1: PlayerIndex = 1;

  test('Returns a boolean', () => {
    expect([true, false]).toContain(isSquareInFrontRow(0, 0));
  });

  test('Returns correct answers from various values', () => {
    expect(isSquareInFrontRow(0, 0)).toEqual(true);
    expect(isSquareInFrontRow(7, 0)).toEqual(true);
    expect(isSquareInFrontRow(15, 0)).toEqual(false);
    expect(isSquareInFrontRow(8, 0)).toEqual(false);
    expect(isSquareInFrontRow(0, 1)).toEqual(false);
    expect(isSquareInFrontRow(7, 1)).toEqual(false);
    expect(isSquareInFrontRow(15, 1)).toEqual(true);
    expect(isSquareInFrontRow(8, 1)).toEqual(true);
  });
});

// ------------------------------------------------------------------------

describe('getNextPathSquare', () => {
  test('Returns correct path square from values 0-14', () => {
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].forEach((square: number) => {
      expect(getNextPathSquare(square as PathSquare)).toEqual(square + 1);
    });
  });
  test('Returns correct path square from values 0-14', () => {
    expect(getNextPathSquare(15 as PathSquare)).toEqual(0);
  });
});

// ------------------------------------------------------------------------

describe('getIndexOfPathSquare', () => {
  test('Returns correct path square from values 0-14', () => {
    const pathSquares = [0, 1, 2, 3, 4, 5, 6, 7, 15, 14, 13, 12, 11, 10, 9, 8];
    const board = new Array(16)
      .fill(0)
      .map((_: number, index: number) => ({ i: index, pathOrder: pathSquares[index] }));

    board.forEach((boardSquare: Record<string, number>) => {
      expect(
        getIndexOfPathSquare(boardSquare.pathOrder as PathSquare, board as BoardSquare[]),
      ).toEqual(boardSquare.i);
    });
  });
});

// ------------------------------------------------------------------------

describe('rotate', () => {
  test('Returns correct angles for 90 degree increements', () => {
    expect(Number(rotate(50, 50, 50, 0, 90).x).toFixed(3)).toEqual(Number(100).toFixed(3));
    expect(Number(rotate(50, 50, 50, 0, 90).y).toFixed(3)).toEqual(Number(50).toFixed(3));
    expect(Number(rotate(50, 50, 50, 0, 180).x).toFixed(3)).toEqual(Number(50).toFixed(3));
    expect(Number(rotate(50, 50, 50, 0, 180).y).toFixed(3)).toEqual(Number(100).toFixed(3));
    expect(Number(rotate(50, 50, 50, 0, 270).x).toFixed(3)).toEqual(Number(0).toFixed(3));
    expect(Number(rotate(50, 50, 50, 0, 270).y).toFixed(3)).toEqual(Number(50).toFixed(3));
  });
});

// ------------------------------------------------------------------------

describe('getRingNumbers', () => {
  test('returns a valid array of numbers', () => {
    expect(getRingNumbers(1)).toEqual([1]);
    expect(getRingNumbers(4)).toEqual([4]);
    expect(getRingNumbers(5)).toEqual([1, 4]);
    expect(getRingNumbers(7)).toEqual([1, 6]);
    expect(getRingNumbers(8)).toEqual([2, 6]);
    expect(getRingNumbers(9)).toEqual([3, 6]);
    expect(getRingNumbers(11)).toEqual([4, 7]);
    expect(getRingNumbers(14)).toEqual([4, 10]);
    expect(getRingNumbers(15)).toEqual([5, 10]);
    expect(getRingNumbers(40)).toEqual([5, 35]);
  });
});

// ------------------------------------------------------------------------

describe('getAutoMovePathSquare', () => {
  const board: BoardSquare[] = buildBoardSquares(0);
  const boardWithSingleValue = board.map((square: BoardSquare, i: number) => ({
    ...square,
    value: i === 0 ? 1 : 0,
  }));
  const boardWithSingleValueAbove1 = board.map((square: BoardSquare, i: number) => {
    let value = 0;
    if (i > board.length / 2) value = 1;
    if (i === 0) value = 2;
    return {
      ...square,
      value,
    };
  });

  test('returns false for normal board', () => {
    expect(getAutoMovePathSquare(board)).toEqual(-1);
  });
  test('returns true for single square with score', () => {
    expect(getAutoMovePathSquare(boardWithSingleValue)).toEqual(0);
  });
  test('returns true for single square with score above 1', () => {
    expect(getAutoMovePathSquare(boardWithSingleValueAbove1)).toEqual(0);
  });
});

// ------------------------------------------------------------------------

describe('isObjEmpty', () => {
  const emptyObj = {};
  const singleKeyObj = { testKey: 'testValue' };
  const multiKeyObj = { testKey: 'testValue', anotherKey: 'anotherValue' };

  test('Returns a boolean', () => {
    expect([true, false]).toContain(isObjEmpty(emptyObj));
    expect([true, false]).toContain(isObjEmpty(singleKeyObj));
    expect([true, false]).toContain(isObjEmpty(multiKeyObj));
  });

  test('Returns true for an empty object', () => {
    expect(isObjEmpty(emptyObj)).toBeTruthy();
    expect(isObjEmpty(emptyObj)).toBe(true);
  });

  test('Returns false for an non-empty object', () => {
    expect(isObjEmpty(singleKeyObj)).toBeFalsy();
    expect(isObjEmpty(singleKeyObj)).toBe(false);
    expect(isObjEmpty(multiKeyObj)).toBeFalsy();
    expect(isObjEmpty(multiKeyObj)).toBe(false);
  });
});

// ------------------------------------------------------------------------

describe('isEmpty', () => {
  const emptyObj = {};
  const singleKeyObj: Record<string, string> = { testKey: 'testValue' };
  const multiKeyObj: Record<string, string> = { testKey: 'testValue', anotherKey: 'anotherValue' };
  const emptyArray: unknown[] = [];
  const numberArray: number[] = [1, 2, 3];
  const stringArray: string[] = ['a', 'b', 'c'];
  const emptyString: string = '';
  const string: string = 'abc';
  const validDate: Date = new Date();
  const invalidDate: Date = new Date('nothing');

  test('Returns a boolean', () => {
    expect([true, false]).toContain(isEmpty(emptyObj));
    expect([true, false]).toContain(isEmpty(multiKeyObj));
  });

  test('Returns true for empty object', () => {
    expect(isEmpty(emptyObj)).toEqual(true);
  });

  test('Returns false for non-empty object', () => {
    expect(isEmpty(singleKeyObj)).toEqual(false);
    expect(isEmpty(multiKeyObj)).toEqual(false);
  });

  test('Returns true for empty array', () => {
    expect(isEmpty(emptyArray)).toEqual(true);
  });

  test('Returns false for non-empty array', () => {
    expect(isEmpty(stringArray)).toEqual(false);
    expect(isEmpty(numberArray)).toEqual(false);
  });

  test('Returns true for an invalid Date', () => {
    expect(isEmpty(invalidDate)).toEqual(true);
  });

  test('Returns false for valid Date', () => {
    expect(isEmpty(validDate)).toEqual(false);
  });

  test('Returns true for an empty string', () => {
    expect(isEmpty(emptyString)).toEqual(true);
  });

  test('Returns false for string', () => {
    expect(isEmpty(string)).toEqual(false);
  });

  test('Returns false for any number', () => {
    expect(isEmpty(0)).toEqual(false);
    expect(isEmpty(10)).toEqual(false);
    expect(isEmpty(-10)).toEqual(false);
  });
});

// ------------------------------------------------------------------------

describe('areArraysEqual', () => {
  const nonNested1 = [1, 2, 3];
  const nonNested2 = ['a', 'b', 'c'];
  const nonNested3 = [1, 2, 3];
  const nonNested4 = ['1', '2', '3'];

  test('Returns true for 2 empty arrays', () => {
    expect(areArraysEqual([], [])).toEqual(true);
  });
  test('Returns false for different Array lengths', () => {
    expect(areArraysEqual([1, 2, 3], [1, 2])).toEqual(false);
  });
  test('Returns false for same Array lengths but different values', () => {
    expect(areArraysEqual(nonNested1, nonNested2)).toEqual(false);
  });
  test('Returns true for equal, non-nested arrays', () => {
    expect(areArraysEqual(nonNested1, nonNested3)).toEqual(true);
  });
  test('Returns false for equal, non-nested arrays with same values but different types', () => {
    expect(areArraysEqual(nonNested1, nonNested4)).toEqual(false);
  });
  test('Returns true for equal, nested arrays', () => {
    expect(
      areArraysEqual([[...nonNested2], [...nonNested2]], [[...nonNested2], [...nonNested2]], 2),
    ).toEqual(true);
  });
  test('Returns false for non-equal, nested arrays', () => {
    expect(
      areArraysEqual([[...nonNested2], [...nonNested2]], [[...nonNested1], [...nonNested1]], 2),
    ).toEqual(false);
  });
  test('Returns false for non-equal, nested arrays with same values but different types (depth of 2)', () => {
    expect(
      areArraysEqual([[...nonNested1, nonNested4]], [[...nonNested1], [...nonNested1]], 2),
    ).toEqual(false);
  });
  test('Returns true for equal, nested arrays (depth of 3)', () => {
    expect(
      areArraysEqual(
        [
          [[...nonNested1], [...nonNested1]],
          [[...nonNested1], [...nonNested3]],
        ],
        [
          [[...nonNested1], [...nonNested1]],
          [[...nonNested1], [...nonNested3]],
        ],
        3,
      ),
    ).toEqual(true);
  });
});

// ------------------------------------------------------------------------

describe('areObjectsEqual', () => {
  const nonNested1 = { key1: 'value1', key2: 'value2' };
  const nonNested2 = { keyA: 1, keyB: 2 };

  test('Returns true for 2 empty objects', () => {
    expect(areObjectsEqual({}, {})).toEqual(true);
  });
  test('Returns true for 2 identical objects', () => {
    expect(areObjectsEqual({ ...nonNested1 }, { ...nonNested1 })).toEqual(true);
  });
  test('Returns false for 2 different objects', () => {
    expect(areObjectsEqual({ ...nonNested1 }, { ...nonNested2 })).toEqual(false);
  });
  test('Returns true for 2 different nested objects', () => {
    expect(
      areObjectsEqual(
        { first: { ...nonNested1 }, second: { ...nonNested2 } },
        { first: { ...nonNested1 }, second: { ...nonNested2 } },
        2,
      ),
    ).toEqual(true);
  });
  test('Returns false for 2 different nested objects', () => {
    expect(
      areObjectsEqual(
        { first: { ...nonNested1 }, second: { ...nonNested2 } },
        { first: { ...nonNested1 }, second: { ...nonNested1 } },
        2,
      ),
    ).toEqual(false);
  });
});

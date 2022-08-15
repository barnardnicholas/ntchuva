import { resourceLimits } from 'worker_threads';
import { boardIndexes } from '../constants/board';
import { BoardSquare, PlayerIndex } from '../types/board';
import { buildBoardSquares, getColumnFromIndex, getPathOrderFromIndex } from './utils';

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
  const dummyBoardSquare = {
    i: 0,
    pathOrder: 0,
    player: 0,
    value: 2,
    column: 0,
  };

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

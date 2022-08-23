import { BoardSquare } from '../types/board';

export const boardIndexes: number[] = new Array(16).fill(0).map((_: number, i: number) => i);

export const ringNumbers: number[][] = [
  [1], // 1
  [2], // 2
  [3], // 3
  [4], // 4
  [1, 4], // 5
  [1, 5], // 6
  [1, 6], // 7
  [2, 6], // 8
  [3, 6], // 9
  [3, 7], // 10
  [4, 7], // 11
  [4, 8], // 12
  [4, 9], // 13
  [4, 10], // 14
]; // numbers of counters in concentric rings

export const maxMoveLength = 64;

export const brokenBoard1: BoardSquare[] = [
  {
    i: 0,
    pathOrder: 0,
    player: 0,
    value: 0,
    column: 0,
  },
  {
    i: 1,
    pathOrder: 1,
    player: 0,
    value: 1,
    column: 1,
  },
  {
    i: 2,
    pathOrder: 2,
    player: 0,
    value: 0,
    column: 2,
  },
  {
    i: 3,
    pathOrder: 3,
    player: 0,
    value: 3,
    column: 3,
  },
  {
    i: 4,
    pathOrder: 4,
    player: 0,
    value: 0,
    column: 4,
  },
  {
    i: 5,
    pathOrder: 5,
    player: 0,
    value: 1,
    column: 5,
  },
  {
    i: 6,
    pathOrder: 6,
    player: 0,
    value: 0,
    column: 6,
  },
  {
    i: 7,
    pathOrder: 7,
    player: 0,
    value: 1,
    column: 7,
  },
  {
    i: 8,
    pathOrder: 15,
    player: 0,
    value: 1,
    column: 0,
  },
  {
    i: 9,
    pathOrder: 14,
    player: 0,
    value: 2,
    column: 1,
  },
  {
    i: 10,
    pathOrder: 13,
    player: 0,
    value: 0,
    column: 2,
  },
  {
    i: 11,
    pathOrder: 12,
    player: 0,
    value: 2,
    column: 3,
  },
  {
    i: 12,
    pathOrder: 11,
    player: 0,
    value: 1,
    column: 4,
  },
  {
    i: 13,
    pathOrder: 10,
    player: 0,
    value: 0,
    column: 5,
  },
  {
    i: 14,
    pathOrder: 9,
    player: 0,
    value: 1,
    column: 6,
  },
  {
    i: 15,
    pathOrder: 8,
    player: 0,
    value: 0,
    column: 7,
  },
];

export const brokenBoard2: BoardSquare[] = [
  {
    i: 0,
    pathOrder: 0,
    player: 0,
    value: 0,
    column: 0,
  },
  {
    i: 1,
    pathOrder: 1,
    player: 0,
    value: 2,
    column: 1,
  },
  {
    i: 2,
    pathOrder: 2,
    player: 0,
    value: 1,
    column: 2,
  },
  {
    i: 3,
    pathOrder: 3,
    player: 0,
    value: 0,
    column: 3,
  },
  {
    i: 4,
    pathOrder: 4,
    player: 0,
    value: 1,
    column: 4,
  },
  {
    i: 5,
    pathOrder: 5,
    player: 0,
    value: 0,
    column: 5,
  },
  {
    i: 6,
    pathOrder: 6,
    player: 0,
    value: 1,
    column: 6,
  },
  {
    i: 7,
    pathOrder: 7,
    player: 0,
    value: 0,
    column: 7,
  },
  {
    i: 8,
    pathOrder: 15,
    player: 0,
    value: 1,
    column: 0,
  },
  {
    i: 9,
    pathOrder: 14,
    player: 0,
    value: 0,
    column: 1,
  },
  {
    i: 10,
    pathOrder: 13,
    player: 0,
    value: 2,
    column: 2,
  },
  {
    i: 11,
    pathOrder: 12,
    player: 0,
    value: 1,
    column: 3,
  },
  {
    i: 12,
    pathOrder: 11,
    player: 0,
    value: 0,
    column: 4,
  },
  {
    i: 13,
    pathOrder: 10,
    player: 0,
    value: 1,
    column: 5,
  },
  {
    i: 14,
    pathOrder: 9,
    player: 0,
    value: 0,
    column: 6,
  },
  {
    i: 15,
    pathOrder: 8,
    player: 0,
    value: 1,
    column: 7,
  },
];

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

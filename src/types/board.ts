export interface BoardSquare {
  i: number;
  pathOrder: number;
  player: number;
  value: number;
  column: BoardColumn;
}

export type BoardColumn = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7; // Zero-indexed

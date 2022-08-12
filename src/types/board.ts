export type BoardColumn = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7; // Zero-indexed
export type PathSquare = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15; // Zero-indexed
export type PlayerIndex = 0 | 1;
export interface BoardSquare {
  i: number;
  pathOrder: PathSquare;
  player: number;
  value: number;
  column: BoardColumn;
}

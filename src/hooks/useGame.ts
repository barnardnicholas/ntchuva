import { useCallback, useState } from 'react';
import { BoardColumn, BoardSquare, PathSquare, PlayerIndex } from '../types/board';
import { buildBoardSquares } from '../utils/utils';

interface UseGame {
  board0: BoardSquare[];
  board1: BoardSquare[];
  tick: () => void;
  activePlayer: PlayerIndex;
  activeSquare0: PathSquare | -1;
  activeSquare1: PathSquare | -1;
  hand: number;
  handleMove: (pathSquare: PathSquare) => void;
  buttonDisabled: boolean;
}

const useGame = (): UseGame => {
  const [board0, setBoard0] = useState<BoardSquare[]>(buildBoardSquares(0)); // Player 1
  const [board1, setBoard1] = useState<BoardSquare[]>(buildBoardSquares(1)); // Player 2
  const [activeSquare0, setActiveSquare0] = useState<PathSquare | -1>(-1); // Player 1
  const [activeSquare1, setActiveSquare1] = useState<PathSquare | -1>(-1); // Player 2
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);
  const [hand, setHand] = useState<number>(0); // Number of counters in hand
  const [activePlayer, setActivePlayer] = useState<PlayerIndex>(0);

  function isSquareInFrontRow(pathSquare: PathSquare, player: PlayerIndex) {
    if (player === 0) return pathSquare < 8;
    return pathSquare > 7;
  }

  function getNextPathSquare(pathSquare: PathSquare): PathSquare {
    if (pathSquare === 15) return 0;
    return (pathSquare + 1) as PathSquare;
  }

  function getIndexOfPathSquare(pathSquare: PathSquare): number {
    // given a pathSquare and player, get the index
    const activeBoard = [...[board0, board1][activePlayer]];
    const result = activeBoard.find((square: BoardSquare) => square.pathOrder === pathSquare);
    if (result && !Number.isNaN(result.i)) return result.i;
    return -1;
  }

  function killColumn(column: BoardColumn, player: PlayerIndex): void {
    const board = [...[board0, board1][player]].map((square: BoardSquare) => {
      if (square.column === column) return { ...square, value: 0 };
      return square;
    });
    const setBoard = [setBoard0, setBoard1][player];
    setBoard(board);
  }

  const tick = useCallback(() => {
    if (buttonDisabled) return;
    const board = [...[board0, board1][activePlayer]];
    const setBoard = [setBoard0, setBoard1][activePlayer];
    const activeSquare: PathSquare = [activeSquare0, activeSquare1][activePlayer] as PathSquare;
    const setActiveSquare = [setActiveSquare0, setActiveSquare1][activePlayer];

    if (activeSquare < 0) return;

    if (hand > 0) {
      const newActiveSquare =
        board[getIndexOfPathSquare(activeSquare)].value > 1
          ? getNextPathSquare(activeSquare)
          : getNextPathSquare(activeSquare); // Only advance active square if value > 1

      const newSquare = board[getIndexOfPathSquare(newActiveSquare)];
      board[newSquare.i] = { ...newSquare, value: newSquare.value + 1 }; // Increase value of active square by 1

      setHand((prevHand: number) => prevHand - 1); // Decrease hand by 1
      if (activeSquare !== newActiveSquare) setActiveSquare(newActiveSquare); // Update active square if necessary
      setBoard(board); // Update board
    } else if (hand <= 0 && board[getIndexOfPathSquare(activeSquare)].value > 1) {
      /* eslint-disable */
      handleMove(activeSquare);
      /* eslint-enable */
    } else {
      // handle capturing of opponents pieces
      if (isSquareInFrontRow(activeSquare, activePlayer)) {
        const newSquare = board[getIndexOfPathSquare(activeSquare)];
        killColumn(newSquare.column, activePlayer === 0 ? 1 : 0);
      }
      setActiveSquare(-1);
      setActivePlayer((prevActivePlayer: PlayerIndex) => (!prevActivePlayer ? 1 : 0));
    }
  }, [
    board0,
    board1,
    activeSquare0,
    activeSquare1,
    activePlayer,
    buttonDisabled,
    getIndexOfPathSquare,
    hand,
    handleMove,
  ]);

  /* eslint-disable */
  function handleMove(pathSquare: PathSquare) {
    const board = [...[board0, board1][activePlayer]];
    const setBoard = [setBoard0, setBoard1][activePlayer];
    const setActiveSquare = [setActiveSquare0, setActiveSquare1][activePlayer];
    const newSquare = board[getIndexOfPathSquare(pathSquare)];
    // set hand to chosen square value
    const newHand = newSquare.value;
    // set chosen square value to 0
    board[newSquare.i] = { ...newSquare, value: 0 }; // Increase value of active square by 1
    // set active square to chosen square
    setHand(newHand);
    setActiveSquare(pathSquare);
    setBoard(board);
    setButtonDisabled(true);
    setTimeout(() => setButtonDisabled(false), 500);
  }
  /* eslint-enable */

  return {
    board0,
    board1,
    activePlayer,
    activeSquare0,
    activeSquare1,
    hand,
    tick,
    handleMove,
    buttonDisabled,
  };
};

export default useGame;

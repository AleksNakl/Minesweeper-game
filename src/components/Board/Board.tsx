import React, { useMemo, useState, useEffect } from 'react';

import {
  setGameIndicator,
  getMinesweeperState,
  setGameModal,
  setBombCount,
  setTimerIndicator,
} from '../../store/minesweeperSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  getClassByNumber,
  initialGameBoard,
  openEmtyCells,
  getClassByGameIndicator,
} from '../../assets/utils/util';
import Cell from '../Cell/Cell';
import { ICell } from '../../assets/types/types';

import classes from './Board.module.scss';

const Board: React.FC = () => {
  const dispatch = useAppDispatch();
  const { settingsValue, settingsModal, gameIndicator } = useAppSelector(getMinesweeperState);
  const board = useMemo(
    () => initialGameBoard(settingsValue.width, settingsValue.height, settingsValue.mins),
    [settingsValue]
  );
  const [boardData, setBoardData] = useState(board);

  const cellSize = boardData.length > 15 ? 770 / boardData.length : 50;
  const boardStyle = {
    width: `${settingsValue.width * cellSize}px`,
  };

  const onClickLButton = (x: number, y: number, cell: ICell) => {
    // if the cell is not open
    if (cell.mask !== -1) {
      dispatch(setTimerIndicator(true)); // start timer when cell is open
      setBoardData((actualBoardData) => {
        const NewBoard = JSON.parse(JSON.stringify(actualBoardData));
        NewBoard[y][x].mask = -1; // open the cell
        // if the cell is open and it is empty
        if (NewBoard[y][x].mask === -1 && NewBoard[y][x].backing === 0) {
          openEmtyCells(x, y, NewBoard); // open empty cells
        }
        // if the cell is open and there is a bomb
        if (NewBoard[y][x].mask === -1 && NewBoard[y][x].backing === -1) {
          NewBoard[y][x].backing = -2; // detonate the bomb
          NewBoard.forEach((row: ICell[]) => {
            row.forEach((cell: ICell) => {
              if (cell.backing === -1) {
                cell.mask = -1; // show all bombs
              }
            });
          });
        }
        return NewBoard;
      });
    }
  };

  const onClickRButton = (x: number, y: number, cell: ICell) => {
    // if the cell is not open
    if (cell.mask !== -1 && gameIndicator === 'New game') {
      // dispatch(setTimerIndicator(true));  // start timer when cell is marked by "flag" or "?"
      setBoardData((actualBoardData) => {
        const NewBoard = JSON.parse(JSON.stringify(actualBoardData));

        switch (cell.mask) {
          case 0:
            NewBoard[y][x].mask = 1; // put mark "flag"
            break;
          case 1:
            NewBoard[y][x].mask = 2; // put mark "?"
            break;
          case 2:
            NewBoard[y][x].mask = 0; // without marks
            break;
          default:
            NewBoard[y][x].mask = 0; // without marks
        }

        return NewBoard;
      });
    }
  };

  useEffect(() => {
    setBoardData(board);
  }, [settingsValue, setBoardData]);

  useEffect(() => {
    let winIndicator = true;
    let bombCount = settingsValue.mins;

    boardData.forEach((row: ICell[]) => {
      row.forEach((cell: ICell) => {
        // check that there are only closed bombs on the field - Victory!
        if (cell.mask !== -1 && cell.backing !== -1 && winIndicator) {
          winIndicator = false;
        }
        // checking that the bomb is detonated - Game over!
        if (cell.backing === -2) {
          dispatch(setGameIndicator('Game over'));
          dispatch(setGameModal());
          dispatch(setTimerIndicator(false));
        }
        // Remaining bombs counter
        if (cell.mask === 1) {
          bombCount -= 1;
        }
      });
    });
    if (winIndicator) {
      dispatch(setGameIndicator('Win'));
      dispatch(setGameModal());
      dispatch(setTimerIndicator(false));
    }
    dispatch(setBombCount(bombCount));
  }, [boardData]);

  return (
    <div className={classes[getClassByGameIndicator(gameIndicator)]} style={boardStyle}>
      {boardData.map((row: { mask: number; backing: number }[], y: number) =>
        row.map((cell: { mask: number; backing: number }, x: number) => (
          <Cell
            key={`${x}${y}`}
            classAdd={getClassByNumber(cell)}
            cellSize={cellSize}
            onClickLButton={() => onClickLButton(x, y, cell)}
            onClickRButton={(e: React.MouseEvent<HTMLButtonElement>): void => {
              e.preventDefault();
              onClickRButton(x, y, cell);
            }}
            disabled={cell.mask > 0 || settingsModal || gameIndicator !== 'New game'}
          />
        ))
      )}
    </div>
  );
};

export default Board;

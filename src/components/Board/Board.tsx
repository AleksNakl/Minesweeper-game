/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useMemo, useState, useEffect } from 'react';

import { getMinesweeperState } from '../../store/minesweeperSlice';
import { useAppSelector } from '../../hooks';
import {
  getClassByNumber,
  initialGameBoard,
  getClassByGameIndicator,
} from '../../assets/utils/util';
import Cell from '../Cell/Cell';

import classes from './Board.module.scss';

const Board: React.FC = () => {
  const { settingsValue, gameIndicator } = useAppSelector(getMinesweeperState);
  const board = useMemo(
    () => initialGameBoard(settingsValue.width, settingsValue.height, settingsValue.mins),
    [settingsValue]
  );
  const [boardData, setBoardData] = useState(board);

  const cellSize = boardData.length > 15 ? 770 / boardData.length : 50;
  const boardStyle = {
    width: `${settingsValue.width * cellSize}px`,
  };

  useEffect(() => {
    setBoardData(board);
  }, [settingsValue, setBoardData]);

  return (
    <div className={classes[getClassByGameIndicator(gameIndicator)]} style={boardStyle}>
      {boardData.map((row: { mask: number; backing: number }[], y: number) =>
        row.map((cell: { mask: number; backing: number }, x: number) => (
          <Cell
            key={`${x}${y}`}
            classAdd={getClassByNumber(cell)}
            cellSize={cellSize}
            onClickLButton={() => {}}
            onClickRButton={(): void => {}}
            disabled={cell.mask > 0 || gameIndicator !== 'New game'}
          />
        ))
      )}
    </div>
  );
};

export default Board;

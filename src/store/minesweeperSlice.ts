import { createSlice } from '@reduxjs/toolkit';

import { IinitialState } from './typeMinesweeperSlice';

import { RootState } from './index';

const initialState: IinitialState = {
  gameIndicator: 'New game',
  settingsValue: {
    level: 'Beginner: field 9x9 cells, 10 mins',
    width: 9,
    height: 9,
    mins: 10,
  },
};

export const getMinesweeperState = (state: RootState) => state.minesweeper;

const minesweeper = createSlice({
  name: 'minesweeper',
  initialState,
  reducers: {},
});

export default minesweeper.reducer;

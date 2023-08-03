import { configureStore } from '@reduxjs/toolkit';

import minesweeperReducer from './minesweeperSlice';

export const store = configureStore({
  reducer: {
    minesweeper: minesweeperReducer,
  },
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware({
      serializableCheck: false,
    });
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

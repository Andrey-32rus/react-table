// slices/gameSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ScoreTableModel } from '../../models/ScoreTableModel';

// Типы данных для стейта
export type GameState = {
  data: ScoreTableModel | null;
};

export const defaultGameState: GameState = {
  data: {
    players :[],
    rows : [],
    removedRows: [],
    savedRows: [],
  }
}

const initialState: GameState = {
  data: null,
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setGameData: (state, action: PayloadAction<ScoreTableModel>) => {
      state.data = action.payload;
    },
  },
});

export const { setGameData } = gameSlice.actions;
export default gameSlice.reducer;
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ScoreTableModel } from '../../models/ScoreTableModel';

interface GameState {
  data: ScoreTableModel | null;
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
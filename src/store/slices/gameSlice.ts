
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ScoreTableModel } from '../../models/ScoreTableModel';
import saveGameToServer from '../../pages/api/save-game';
import loadGameFromServer from '../../pages/api/load-game';

// Типы данных для стейта
type GameState = {
  data: ScoreTableModel | null;
  loading: boolean;
  error: string | null;
};

const initialState: GameState = {
  data: null,
  loading: false,
  error: null,
};

// Асинхронные экшены
export const saveGame = createAsyncThunk(
  'game/saveGame',
  async (gameData: ScoreTableModel, { rejectWithValue }) => {
    try {
      await saveGameToServer(gameData);  // Сохранение на сервер
      return gameData;
    } catch (error) {
      return rejectWithValue('Error saving game');
    }
  }
);

export const loadGame = createAsyncThunk(
  'game/loadGame',
  async (gameName: string, { rejectWithValue }) => {
    try {
      const gameData = await loadGameFromServer(gameName);  // Загрузка с сервера
      return gameData;
    } catch (error) {
      return rejectWithValue('Error loading game');
    }
  }
);

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setGameData: (state, action) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // saveGame
      .addCase(saveGame.pending, (state) => {
        state.loading = true;
      })
      .addCase(saveGame.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(saveGame.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // loadGame
      .addCase(loadGame.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadGame.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(loadGame.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setGameData } = gameSlice.actions;
export default gameSlice.reducer;
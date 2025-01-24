import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ScoreTableModel } from '../../models/ScoreTableModel';

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
      const response = await fetch('/api/save-game', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(gameData),
      });

      if (!response.ok) {
        throw new Error('Failed to save game');
      }

      const data = await response.json();
      return gameData;  // Возвращаем данные, которые были сохранены
    } catch (error) {
      return rejectWithValue('Error saving game');
    }
  }
);

export const loadGame = createAsyncThunk(
  'game/loadGame',
  async (gameName: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/load-game?name=${gameName}`, {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error('Failed to load game');
      }

      const gameData = await response.json();
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
        state.error = null;  // Сбрасываем ошибку при начале запроса
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
        state.error = null;  // Сбрасываем ошибку при начале запроса
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
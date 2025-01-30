// store.ts
import { configureStore } from '@reduxjs/toolkit';
import gameSliceReducer, {defaultGameState, GameState} from './slices/gameSlice';

// Middleware для сохранения состояния в localStorage
const localStorageMiddleware =
  (store: any) => (next: any) => (action: any) => {
    const result = next(action); // Пропускаем действие через редюсер
    if (typeof window !== 'undefined') {
      // Сохраняем состояние в localStorage только в браузере
      localStorage.setItem('appState', JSON.stringify(store.getState()));
    }
    return result;
  };

// Функция для загрузки состояния из localStorage
const loadStateFromLocalStorage = () : GameState => {
  try {
    if (typeof window !== 'undefined') {
      const serializedState = localStorage.getItem('appState');
      if (serializedState === null) {
        return defaultGameState; // Если данных нет, возвращаем undefined
      }
      return JSON.parse(serializedState);
    }
  } catch (err) {
    console.error('Ошибка при загрузке состояния из localStorage:', err);
  }
  return defaultGameState;
};

// Загружаем состояние из localStorage
const preloadedState = loadStateFromLocalStorage();

// Создаем store
const store = configureStore({
  reducer: {
    game: gameSliceReducer,
  },
  preloadedState, // Используем сохраненное состояние
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
});

export default store;
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import gameReducer from './slices/gameSlice';

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
const loadStateFromLocalStorage = () => {
  try {
    if (typeof window !== 'undefined') {
      const serializedState = localStorage.getItem('appState');
      if (serializedState === null) {
        return undefined; // Если данных нет, возвращаем undefined
      }
      return JSON.parse(serializedState);
    }
  } catch (err) {
    console.error('Ошибка при загрузке состояния из localStorage:', err);
  }
  return undefined;
};

// Загружаем состояние из localStorage или используем дефолтное
const preloadedState = loadStateFromLocalStorage();

// Объединяем редюсеры с помощью combineReducers
const rootReducer = combineReducers({
  game: gameReducer,
});

// Создаем store
const store = configureStore({
  reducer: rootReducer, // Передаем корневой редюсер
  preloadedState, // Используем сохраненное состояние или дефолтное
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
});

// Типизация RootState и AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
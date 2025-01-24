import { configureStore } from '@reduxjs/toolkit'
import gameSliceReducer from "./slices/gameSlice";

const store =  configureStore({
  reducer: {
    game: gameSliceReducer
  }
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
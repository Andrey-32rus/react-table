import { configureStore } from '@reduxjs/toolkit'
import changeScoreTableReducer from './changeScoreTable/changeScoreTableSlice'

const store =  configureStore({
  reducer: {
    changeScoreTable: changeScoreTableReducer
  }
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
import { configureStore } from '@reduxjs/toolkit'
import changeScoreTableReducer from './changeScoreTable/changeScoreTableSlice'

export default configureStore({
  reducer: {
    changeScoreTable: changeScoreTableReducer
  }
})
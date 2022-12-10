import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ScoreTableModel } from '../../models/ScoreTableModel'

type ChangeScoreTableData = ScoreTableModel | null

interface ChangeScoreTableState{
  data: ChangeScoreTableData
}

const initialState: ChangeScoreTableState = {data: null}

export const changeScoreTableSlice = createSlice({
  name: 'changeScoreTable',
  initialState,
  reducers: {
    setChangedData: (state, action: PayloadAction<ChangeScoreTableData>) => {
      state.data = action.payload
    },
  }
})

// Action creators are generated for each case reducer function
export const { setChangedData } = changeScoreTableSlice.actions

export default changeScoreTableSlice.reducer
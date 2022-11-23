import { createSlice } from '@reduxjs/toolkit'

export const changeScoreTableSlice = createSlice({
  name: 'changeScoreTable',
  initialState: {
    data: null,
  },
  reducers: {
      setChangedData: (state, action) => {
      state.data = action.payload
    },
  }
})

// Action creators are generated for each case reducer function
export const { setChangedData, } = changeScoreTableSlice.actions

export default changeScoreTableSlice.reducer
import { createSlice } from '@reduxjs/toolkit'

export const infoPersonalSlice = createSlice({
  name: 'infoPersonal',
  initialState: {
    currentData: null
  },
  reducers: {
    update: (state, action) => {
      state.currentData = action.payload
    }
  }
})

export const { update } = infoPersonalSlice.actions
export default infoPersonalSlice.reducer
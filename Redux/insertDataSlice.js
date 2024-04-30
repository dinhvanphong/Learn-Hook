import { createSlice } from '@reduxjs/toolkit'

export const insertDataSlice = createSlice({
  name: 'insertData',
  initialState: {
    insertData: {
      isFetching: false,
      success: false,
      error: false
    }
  },
  reducers: {
    insertDataStart: (state) => {
      state.insertData.isFetching = true
    },
    insertDataSuccess: (state) => {
      state.insertData.isFetching = false
      state.insertData.success = true
    },
    insertDataError: (state) => {
      state.insertData.isFetching = false
      state.insertData.success = false
      state.insertData.error = true
    }
  }
})

export const {
  insertDataError,
  insertDataStart,
  insertDataSuccess
} = insertDataSlice.actions
export default insertDataSlice.reducer
import { configureStore } from '@reduxjs/toolkit'
import infoPointReducer from './infoPointSlice'
import insertDataReducer from './insertDataSlice'

export default configureStore({
  reducer: {
    infoPoint: infoPointReducer,
    insertData: insertDataReducer
  }
})
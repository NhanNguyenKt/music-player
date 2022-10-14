import { configureStore } from '@reduxjs/toolkit'
import songReducer from '../features/chooseSong/songSlice'
import controlReducer from '../features/playButton/controlSlice'

export default configureStore({
  reducer: {songPlaying: songReducer,  control: controlReducer},
})
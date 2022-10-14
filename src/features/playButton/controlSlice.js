import { createSlice } from '@reduxjs/toolkit';

export const controlSlice = createSlice({
  name: 'control',
  initialState: {
    value: true,
    percent: 0,
  },
  reducers: {
    showPlay: (state, action) => {
      //action.payload.pause();

      state.value = true;
    },
    showPause: (state, action) => {
      //action.payload.play();
      state.value = false;
    },
    setPercent: (state, action) => {
      state.percent = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { showPlay, showPause, setPercent } = controlSlice.actions;

export default controlSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

export const songSlice = createSlice({
  name: 'songPlaying',
  initialState: {
    value: 0,
  },
  reducers: {
    next: (state) => {
      state.value += 1;
    },
    pre: (state) => {
      state.value -= 1;
    },
    choosing: (state, action) => {
      //console.log(action.payload)
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { next, pre, choosing } = songSlice.actions;

export default songSlice.reducer;

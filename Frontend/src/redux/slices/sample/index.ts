import { createSlice } from "@reduxjs/toolkit";

export const sampleSlice = createSlice({
  initialState: 0,
  name: "Sample",
  reducers: {
    increment: (state) => {
      return state + 1;
    },
    decrement: (state) => {
      return state - 1;
    },
  },
});

export const { increment, decrement } = sampleSlice.actions;
export default sampleSlice.reducer;

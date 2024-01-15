import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: boolean = false;

export const loadingSpinnerSlice = createSlice({
  initialState,
  name: "Loading Spinner",
  reducers: {
    switchState: (_state, action: PayloadAction<boolean>) => {
      return action.payload;
    },
  },
});

export const { switchState } = loadingSpinnerSlice.actions;
export default loadingSpinnerSlice.reducer;

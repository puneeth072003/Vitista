import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: string = "soorya";

export const usernameSlice = createSlice({
  initialState,
  name: "Username",
  reducers: {
    setUsername: (_state, action: PayloadAction<string>) => {
      return action.payload;
    },
  },
});

export const { setUsername } = usernameSlice.actions;
export default usernameSlice.reducer;

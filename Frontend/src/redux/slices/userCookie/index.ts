import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICookie } from "@/interface";

const initialState: ICookie = {
  username: "",
  fullName: "",
  dateOfJoin: "",
  googleAuthToken: "",
};

export const userCookieSlice = createSlice({
  initialState,
  name: "User Cookie",
  reducers: {
    setCookie: (_state, action: PayloadAction<ICookie>) => {
      return action.payload;
    },
  },
});

export const { setCookie } = userCookieSlice.actions;
export default userCookieSlice.reducer;

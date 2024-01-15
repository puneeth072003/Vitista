import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUserStorage, IConnectRegister } from "@/interface";

const initialState: IUserStorage = {
  username: "",
  firstName: "",
  dateOfJoin: "",
  googleAuthToken: "",
};

export const userStorageSlice = createSlice({
  initialState,
  name: "User Storage",
  reducers: {
    setToLocalStorage: (state) => {
      localStorage.setItem("User_username", state.username);
      localStorage.setItem("User_firstName", state.firstName);
      localStorage.setItem("User_dateOfJoin", state.dateOfJoin);
      localStorage.setItem("User_googleAuthToken", state.googleAuthToken);
      return state;
    },
    getFromLocalStorage: () => {
      const username = localStorage.getItem("User_username") || "";
      const firstName = localStorage.getItem("User_firstName") || "";
      const dateOfJoin = localStorage.getItem("User_dateOfJoin") || "";
      const googleAuthToken =
        localStorage.getItem("User_googleAuthToken") || "";

      const data: IUserStorage = {
        username,
        firstName,
        dateOfJoin,
        googleAuthToken,
      };

      return data;
    },

    setUserStorageFromConnect: (
      state: IUserStorage,
      action: PayloadAction<IConnectRegister>
    ) => {
      const data: IUserStorage = {
        username: action.payload.username,
        firstName: action.payload.firstName,
        dateOfJoin: action.payload.dateOfJoin,
        googleAuthToken: state.googleAuthToken,
      };

      return data;
    },

    setUsernameFromConnect: (
      state: IUserStorage,
      action: PayloadAction<string>
    ) => {
      const data: IUserStorage = {
        username: action.payload,
        firstName: state.firstName,
        dateOfJoin: state.dateOfJoin,
        googleAuthToken: state.googleAuthToken,
      };

      return data;
    },

    setUserStorageFromFit: (
      state: IUserStorage,
      action: PayloadAction<string>
    ) => {
      const data: IUserStorage = {
        username: state.username,
        firstName: state.firstName,
        dateOfJoin: state.dateOfJoin,
        googleAuthToken: action.payload,
      };

      return data;
    },
  },
});

export const {
  setToLocalStorage,
  getFromLocalStorage,
  setUserStorageFromConnect,
  setUsernameFromConnect,
  setUserStorageFromFit,
} = userStorageSlice.actions;

export default userStorageSlice.reducer;

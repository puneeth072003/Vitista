import { configureStore } from "@reduxjs/toolkit";
import formPayloadSlice from "./slices/formPayload";
import userStorageSlice from "./slices/userStorage";
import loadingSpinnerSlice from "./slices/loadingSpinner";

export const store = configureStore({
  reducer: {
    formPayload: formPayloadSlice,
    userStorage: userStorageSlice,
    loadingSpinner: loadingSpinnerSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

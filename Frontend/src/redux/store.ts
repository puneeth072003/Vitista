import { configureStore } from "@reduxjs/toolkit";
import formPayloadSlice from "./slices/formPayload";
import userStorageSlice from "./slices/userStorage";

export const store = configureStore({
  reducer: {
    formPayload: formPayloadSlice,
    userStorage: userStorageSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

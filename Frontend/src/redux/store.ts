import { configureStore } from "@reduxjs/toolkit";
import formPayloadSlice from "./slices/formPayload";
import usernameSlice from "./slices/username";

export const store = configureStore({
  reducer: {
    formPayload: formPayloadSlice,
    username: usernameSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

import { configureStore } from "@reduxjs/toolkit";
import formPayloadSlice from "./slices/formPayload";
import userCookieSlice from "./slices/userCookie";

export const store = configureStore({
  reducer: {
    formPayload: formPayloadSlice,
    userCookie: userCookieSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

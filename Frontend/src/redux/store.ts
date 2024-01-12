import { configureStore } from "@reduxjs/toolkit";
import formPayloadSlice from "./slices/formPayload";
export const store = configureStore({
  reducer: {
    formPayload: formPayloadSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

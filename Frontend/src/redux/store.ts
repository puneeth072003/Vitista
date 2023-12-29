import { configureStore } from "@reduxjs/toolkit";
import sampleSlice from "./slices/sample";
export const store = configureStore({
  reducer: {
    sample: sampleSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

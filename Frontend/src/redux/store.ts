import { configureStore } from "@reduxjs/toolkit";
import sampleSlice from "./slices/sample";
import formPayloadSlice from "./slices/formPayload";
export const store = configureStore({
  reducer: {
    sample: sampleSlice,
    formPayload: formPayloadSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

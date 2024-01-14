import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPayload } from "@/interface";

const initialState: IPayload[] = [];

export const formPayloadSlice = createSlice({
  initialState,
  name: "Form Payload",
  reducers: {
    dataFetch: (_state, action: PayloadAction<IPayload[]>) => {
      return action.payload;
    },
    addedData: (state, action: PayloadAction<IPayload>) => {
      state.push(action.payload);
      return state;
    },
    reset: () => {
      return [];
    },
  },
});

export const { dataFetch, addedData, reset } = formPayloadSlice.actions;
export default formPayloadSlice.reducer;

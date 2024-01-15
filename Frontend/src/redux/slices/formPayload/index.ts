import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPayload, IBackendData } from "@/interface";

const initialState: IPayload[] = [];

export const formPayloadSlice = createSlice({
  initialState,
  name: "Form Payload",
  reducers: {
    dataFetch: (_state, action: PayloadAction<IBackendData>) => {
      const returnItem: IPayload[] = [];
      console.log(action.payload.schedules);
      action.payload.schedules.map((elem) => {
        const data: IPayload = {
          Date_range: {
            From: elem.Date_range.From,
            To: elem.Date_range.To,
          },
          Period: elem.Period,
          Tablet: elem.Tablet,
          Time: elem.Time,
        };
        returnItem.push(data);
      });
      return returnItem;
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

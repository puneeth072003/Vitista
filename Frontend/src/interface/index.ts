import { DateRange } from "react-day-picker";

export interface IPayload {
  Tablet: string | undefined;
  DateRange: {
    From: string | undefined;
    To: string | undefined;
  };
  Period: string;
  Time: string | undefined;
}

export interface IProps {
  time: Date | undefined;
  setTime: React.Dispatch<React.SetStateAction<Date | undefined>>;
  tablet: string | undefined;
  setTablet: React.Dispatch<React.SetStateAction<string | undefined>>;
  period: string;
  setPeriod: React.Dispatch<React.SetStateAction<string>>;
  date: DateRange | undefined;
  setDate: React.Dispatch<React.SetStateAction<DateRange | undefined>>;
}

export interface IBackendData {
  schedules: IPayload[];
}

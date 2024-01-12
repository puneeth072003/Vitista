import { DateRange } from "react-day-picker";

export interface IPayload {
  tablet: string | undefined;
  date_range: {
    from: string | undefined;
    to: string | undefined;
  };
  period: string;
  time: string | undefined;
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

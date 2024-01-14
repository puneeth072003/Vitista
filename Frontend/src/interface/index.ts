import { DateRange } from "react-day-picker";

export type IPayload = {
  tablet: string | undefined;
  date_range: {
    from: string | undefined;
    to: string | undefined;
  };
  period: string;
  time: string | undefined;
};

export type IProps = {
  time: Date | undefined;
  setTime: React.Dispatch<React.SetStateAction<Date | undefined>>;
  tablet: string | undefined;
  setTablet: React.Dispatch<React.SetStateAction<string | undefined>>;
  period: string;
  setPeriod: React.Dispatch<React.SetStateAction<string>>;
  date: DateRange | undefined;
  setDate: React.Dispatch<React.SetStateAction<DateRange | undefined>>;
};

type IConnectSuccess = {
  message: string;
  username: string;
};

type IConnectError = {
  error: string;
};

export type IConnect = IConnectSuccess | IConnectError;

import { useEffect, useState } from "react";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

import { addDays } from "date-fns";
import { DateRange } from "react-day-picker";

import TabletForm from "@/components/custom/TabletForm";
import axios from "axios";

import "./style.css";

const BACKEND_URL = import.meta.env.BACKEND_URL;

interface IPayload {
  tablet: string | undefined;
  date_range: {
    from: {
      date: number | undefined;
      month: number | undefined;
      year: number | undefined;
    };
    to: {
      date: number | undefined;
      month: number | undefined;
      year: number | undefined;
    };
  };
  period: string;
  time: {
    hour: number | undefined;
    min: number | undefined;
  };
}

function Form() {
  const [time, setTime] = useState<Date>();
  const [tablet, setTablet] = useState<string>();
  const [period, setPeriod] = useState("");
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 0),
  });

  const tabletFormProps = {
    time,
    setTime,
    tablet,
    setTablet,
    period,
    setPeriod,
    date,
    setDate,
  };

  useEffect(() => {
    async () => {
      await axios
        .get<IPayload[]>(`${BACKEND_URL}/api/v1/randomShit2`)
        .then((res) => setPayload(res.data));
    };
  }, []);

  const [payload, setPayload] = useState<IPayload[]>([]);

  return (
    <>
      <div
        data-place="form"
        className="flex justify-center items-center gap-[5rem] py-[1.5rem] px-6 lg:px-8"
      >
        <TabletForm tabletFormProps={tabletFormProps} />
        <section data-place="form" className="w-[30%] self-start">
          <ScrollArea className="h-full w-full rounded-md border shadow shadow-[#00000017] bg-[#00000005]">
            <div className="p-4">
              <h4 className="mb-4 text-sm font-medium leading-none text-center">
                Registered Tablets
              </h4>
              {payload.map((elem) => (
                <>
                  <div
                    key={elem.tablet}
                    className="text-sm flex justify-between items-center"
                  >
                    <h5>{elem.tablet}</h5>
                    <h5>{`${elem.date_range.from.date}/${elem.date_range.from.month}/${elem.date_range.from.year}`}</h5>
                    <h5>{`${elem.date_range.to.date}/${elem.date_range.to.month}/${elem.date_range.to.year}`}</h5>
                  </div>
                  <Separator className="my-2" />
                </>
              ))}
            </div>
          </ScrollArea>
        </section>
      </div>
    </>
  );
}

export default Form;

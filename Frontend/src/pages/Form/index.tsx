import { useEffect, useState } from "react";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

import { addDays } from "date-fns";
import { DateRange } from "react-day-picker";

import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { dataFetch, reset } from "@/redux/slices/formPayload";

import { IBackendData } from "@/interface";

import TabletForm from "@/components/custom/TabletForm";
import "./style.css";

const BACKEND_URL = import.meta.env.BACKEND_URL;

function Form() {
  const [time, setTime] = useState<Date>();
  const [tablet, setTablet] = useState<string>();
  const [period, setPeriod] = useState("Morning");
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

  const dispatch = useDispatch();

  const payload = useSelector((state: RootState) => state.formPayload);

  useEffect(() => {
    async () => {
      await axios
        .get<IBackendData>(`${BACKEND_URL}/v1/getall`)
        .then((res) => dispatch(dataFetch(res.data.schedules)))
        .then((res) => console.log(res.payload));
    };

    return () => {
      if (reset) {
        dispatch(reset());
      }
    };
  }, [dispatch]);
  return (
    <>
      <main
        data-place="form"
        className="flex justify-center items-center gap-[5rem] py-[1.5rem] px-6 lg:px-8"
      >
        <TabletForm tabletFormProps={tabletFormProps} />
        <section data-place="form" className="w-[30%] self-start">
          <ScrollArea className="h-full w-full rounded-md border shadow shadow-[#00000017] bg-[#00000005]">
            <div className="p-4">
              <h4 className="mb-5 text-sm font-bold text-[1rem] leading-none text-center font-[Ubuntu]">
                Registered Tablets
              </h4>
              <Separator className="my-2" />
              {payload.length === 0 ? (
                <>
                  <div className="text-sm flex justify-between items-center">
                    <h3 className="font-semibold px-2 text-center font-[Poppins]">
                      No Registered Medicine
                    </h3>
                  </div>
                </>
              ) : (
                <>
                  <div className="text-sm flex justify-between items-center">
                    <h3 className="font-semibold px-2 text-center font-[Poppins]">
                      Name
                    </h3>
                    <h3 className="font-semibold px-2 text-center font-[Poppins]">
                      Start Date
                    </h3>
                    <h3 className="font-semibold px-2 text-center font-[Poppins]">
                      End Date
                    </h3>
                  </div>
                  {payload.map((elem) => {
                    if (
                      elem.DateRange.From === undefined ||
                      elem.DateRange.To === undefined
                    )
                      return;

                    const fromDate = new Date(elem.DateRange.From);
                    const toDate = new Date(elem.DateRange.To);

                    return (
                      <>
                        <div
                          key={elem.Tablet}
                          className="text-sm flex justify-between items-center"
                        >
                          <h3 className="px-2 text-center font-[Poppins]">
                            {elem.Tablet}
                          </h3>
                          <h3 className="px-2 text-center font-[Poppins]">
                            {fromDate.toLocaleString("default", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })}
                          </h3>
                          <h3 className="px-2 text-center font-[Poppins]">
                            {toDate.toLocaleString("default", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })}
                          </h3>
                        </div>
                        <Separator className="my-2" />
                      </>
                    );
                  })}
                </>
              )}
            </div>
          </ScrollArea>
        </section>
      </main>
    </>
  );
}

export default Form;

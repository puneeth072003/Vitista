import { useEffect, useState } from "react";

import axios from "axios";

import { Calendar } from "@/components/ui/calendar";
import { IPayload, IBackendData } from "@/interface";

import RecordTable from "@/components/custom/RecordTable";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function Record() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const [backendData, setBackendData] = useState<IPayload[]>([]);

  // const [tabletDays, setTabletDays] = useState<Date[]>([]);
  // const tabletDaysStyle = {
  //   backgroundColor: "lightgrey",
  //   borderRadius: "15px",
  // };

  // const bookedDays1 = [new Date(2024, 0, 8), new Date(2024, 0, 9)];
  // const bookedStyle1 = { border: "2px solid black" };

  // const bookedDays2 = [new Date(2024, 0, 20), new Date(2024, 0, 21)];
  // const bookedStyle2 = { border: "2px solid red" };

  useEffect(() => {
    axios
      .get<IBackendData>(`${BACKEND_URL}/v1/getall`)
      .then((res) => setBackendData(res.data.schedules));
  }, []);

  // useEffect(() => {
  //   setTabletDays(
  //     backendData.flatMap((schedule) => [
  //       new Date(schedule.Date_range.From || ""),
  //       new Date(schedule.Date_range.To || ""),
  //     ])
  //   );
  // }, [backendData]);

  // console.log(tabletDays);

  return (
    <>
      <main
        data-place="record"
        className="flex flex-col justify-center items-center gap-[5rem] py-[3rem] px-6 lg:px-8 w-full h-full"
      >
        <section className="flex justify-center items-center gap-[5rem] px-6 lg:px-8 w-full h-full flex-wrap">
          <div className="flex flex-col justify-center items-center">
            <h1 className="font-[Poppins] text-[3rem] text-center">
              {selectedDate.toLocaleString("default", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </h1>
            <h1 className="font-[Rubik] text-[3rem] text-center">
              {selectedDate.toLocaleDateString("default", { weekday: "long" })}
            </h1>
          </div>
          <section>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(data) => setSelectedDate(data ?? new Date())}
              modifiers={
                {
                  // tabletDays,
                  // booked1: bookedDays1,
                  // booked2: bookedDays2,
                }
              }
              modifiersStyles={
                {
                  // tabletDays: tabletDaysStyle,
                  // booked1: bookedStyle1,
                  // booked2: bookedStyle2,
                }
              }
              className="rounded-md border shadow bg-[#00000005] shadow-[#00000017]"
            />
          </section>
        </section>
        <section className="flex justify-center items-center gap-[3.5rem] flex-wrap">
          {["Morning", "Noon", "Night"].map((period, idx) => {
            return (
              <div key={idx}>
                <h2 className="font-[Ubuntu] text-[2rem] text-center">
                  {period}
                </h2>
                {backendData.filter((data) => {
                  if (data.Period !== period) return false;
                  if (
                    data.Date_range.From === undefined ||
                    data.Date_range.To === undefined ||
                    data.Time === undefined
                  )
                    return false;
                  if (data.Period === period) {
                    const fromDate = new Date(data.Date_range.From);
                    const toDate = new Date(data.Date_range.To);
                    if (
                      !(
                        fromDate.getTime() <= selectedDate.getTime() &&
                        selectedDate.getTime() <= toDate.getTime()
                      )
                    )
                      return false;
                    return true;
                  }
                }).length === 0 ? (
                  <>
                    <h3 className="font-[Poppins] text-[1.5rem]">
                      No {period} Course
                    </h3>
                  </>
                ) : (
                  <>
                    <RecordTable
                      backendData={backendData}
                      selectedDate={selectedDate}
                      period={period}
                    />
                  </>
                )}
              </div>
            );
          })}
        </section>
      </main>
    </>
  );
}

export default Record;

import { useEffect, useState } from "react";

import axios from "axios";

import { Calendar } from "@/components/ui/calendar";
import { IPayload } from "@/interface";

import RecordTable from "@/components/custom/RecordTable";

const BACKEND_URL = import.meta.env.BACKEND_URL;

function Record() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const [backendData, setBackendData] = useState<IPayload[]>([
    {
      tablet: "Crosin",
      date_range: {
        from: new Date(2024, 0, 11).toString(),
        to: new Date(2024, 0, 21).toString(),
      },
      period: "Morning",
      time: new Date().toString(),
    },
    {
      tablet: "Crosin",
      date_range: {
        from: new Date(2024, 0, 20).toString(),
        to: new Date(2024, 0, 30).toString(),
      },
      period: "Noon",
      time: new Date().toString(),
    },
    {
      tablet: "Crosin",
      date_range: {
        from: new Date(2024, 0, 1).toString(),
        to: new Date(2024, 0, 30).toString(),
      },
      period: "Night",
      time: new Date().toString(),
    },
  ]);

  const bookedDays1 = [new Date(2024, 0, 8), new Date(2024, 0, 9)];
  const bookedStyle1 = { border: "2px solid black" };

  const bookedDays2 = [new Date(2024, 0, 20), new Date(2024, 0, 21)];
  const bookedStyle2 = { border: "2px solid red" };

  useEffect(() => {
    async () => {
      axios
        .get<IPayload[]>(`${BACKEND_URL}/api/v1/randomBullshit3`)
        .then((res) => setBackendData(res.data));
    };
  });

  return (
    <>
      <main
        data-place="record"
        className="flex flex-col justify-center items-center gap-[5rem] py-[3rem] px-6 lg:px-8 w-full h-full"
      >
        <section className="flex justify-center items-center gap-[5rem] px-6 lg:px-8 w-full h-full flex-wrap">
          <div className="flex flex-col justify-center items-start">
            <h1 className="font-[Poppins] text-[3rem]">
              {selectedDate.toLocaleString("default", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </h1>
            <h1 className="font-[Rubik] text-[3rem]">
              {selectedDate.toLocaleDateString("default", { weekday: "long" })}
            </h1>
          </div>
          <section>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(data) => setSelectedDate(data ?? new Date())}
              modifiers={{
                booked1: bookedDays1,
                booked2: bookedDays2,
              }}
              modifiersStyles={{
                booked1: bookedStyle1,
                booked2: bookedStyle2,
              }}
              className="rounded-md border shadow bg-[#00000005] shadow-[#00000017]"
            />
          </section>
        </section>
        <section className="flex justify-center items-center gap-[3.5rem] flex-wrap">
          {["Morning", "Noon", "Night"].map((period) => {
            return (
              <div>
                <h2 className="font-[Ubuntu] text-[2rem] text-center">
                  {period}
                </h2>
                {backendData.filter((data) => {
                  if (data.period !== period) return false;
                  if (
                    data.date_range.from === undefined ||
                    data.date_range.to === undefined ||
                    data.time === undefined
                  )
                    return false;
                  if (data.period === period) {
                    const fromDate = new Date(data.date_range.from);
                    const toDate = new Date(data.date_range.to);
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

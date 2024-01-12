import { useEffect, useState } from "react";

import axios from "axios";

import { Calendar } from "@/components/ui/calendar";
import { IPayload } from "@/interface";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const BACKEND_URL = import.meta.env.BACKEND_URL;

function Record() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const [backendData, setBackendData] = useState<IPayload[]>([
    {
      tablet: "Crosin",
      date_range: {
        from: new Date().toString(),
        to: new Date().toString(),
      },
      period: "Noon",
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
      <div className="flex justify-center gap-[3rem] items-center w-full">
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
      <main
        data-place="record"
        className="flex justify-center items-center gap-[5rem] py-[1.5rem] px-6 lg:px-8 w-full h-full"
      >
        <section className="self-start">
          <div>
            <h2 className="font-[Ubuntu] text-[2rem]">Morning</h2>
            {backendData.filter((data) => data.period === "Morning").length ===
            0 ? (
              <>
                <h3 className="font-[Poppins] text-[1.5rem]">
                  No Morning Course
                </h3>
              </>
            ) : (
              <>
                <Table className="rounded-md border shadow">
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">Tablet</TableHead>
                      <TableHead>Start Date</TableHead>
                      <TableHead>End Date</TableHead>
                      <TableHead className="text-right">Time</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {backendData.map((data) => {
                      if (
                        data.date_range.from === undefined ||
                        data.date_range.to === undefined ||
                        data.time === undefined
                      )
                        return;
                      if (data.period === "Morning") {
                        const fromDate = new Date(data.date_range.from);
                        const toDate = new Date(data.date_range.to);
                        const time = new Date(data.time);
                        return (
                          <TableRow>
                            <TableCell className="font-medium">
                              {data.tablet}
                            </TableCell>
                            <TableCell>
                              {fromDate.toLocaleString("default", {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              })}
                            </TableCell>
                            <TableCell>
                              {toDate.toLocaleString("default", {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              })}
                            </TableCell>
                            <TableCell className="text-right">
                              {time.toLocaleString("en-US", {
                                hour: "numeric",
                                minute: "numeric",
                                hour12: true,
                              })}
                            </TableCell>
                          </TableRow>
                        );
                      }
                    })}
                  </TableBody>
                </Table>
              </>
            )}
          </div>
        </section>
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
            className="rounded-md border shadow"
          />
        </section>
      </main>
    </>
  );
}

export default Record;

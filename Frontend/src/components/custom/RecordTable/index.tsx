import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

import { IPayload } from "@/interface";
import { useEffect, useState } from "react";

function RecordTable({
  backendData,
  period,
  selectedDate,
}: {
  backendData: IPayload[];
  period: string;
  selectedDate: Date;
}) {
  const [taken, setTaken] = useState<boolean[]>([]);

  useEffect(() => {
    const initialTakenState = backendData.map(() => false);

    setTaken(initialTakenState);
  }, [backendData]);

  function handleBadge(idx: number) {
    const newTaken = [...taken];
    newTaken[idx] = !newTaken[idx];
    setTaken(newTaken);
  }

  return (
    <>
      <Table className="rounded-md border shadow bg-[#00000005] shadow-[#00000017]">
        <TableHeader>
          <TableRow>
            <TableHead className="text-[#000] w-[100px]">Tablet</TableHead>
            <TableHead className="text-[#000]">Start Date</TableHead>
            <TableHead className="text-[#000]">End Date</TableHead>
            <TableHead className="text-[#000]">Time</TableHead>
            <TableHead className="text-[#000] text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {backendData.map((data, idx) => {
            if (
              data.date_range.from === undefined ||
              data.date_range.to === undefined ||
              data.time === undefined
            )
              return;
            if (data.period === period) {
              const fromDate = new Date(data.date_range.from);
              const toDate = new Date(data.date_range.to);
              const time = new Date(data.time);

              if (
                !(
                  fromDate.getTime() <= selectedDate.getTime() &&
                  selectedDate.getTime() <= toDate.getTime()
                )
              )
                return;
              return (
                <TableRow>
                  <TableCell
                    className={
                      taken[idx]
                        ? "text-[grey] font-medium font-[Poppins]"
                        : "font-medium font-[Poppins]"
                    }
                  >
                    {data.tablet}
                  </TableCell>
                  <TableCell
                    className={
                      taken[idx]
                        ? "text-[grey] font-[Poppins]"
                        : "font-[Poppins]"
                    }
                  >
                    {fromDate.toLocaleString("default", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </TableCell>
                  <TableCell
                    className={
                      taken[idx]
                        ? "text-[grey] font-[Poppins]"
                        : "font-[Poppins]"
                    }
                  >
                    {toDate.toLocaleString("default", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </TableCell>
                  <TableCell
                    className={
                      taken[idx]
                        ? "text-[grey] font-[Poppins]"
                        : "font-[Poppins]"
                    }
                  >
                    {time.toLocaleString("en-US", {
                      hour: "numeric",
                      minute: "numeric",
                      hour12: true,
                    })}
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge
                      variant={taken[idx] ? "outline" : "default"}
                      onClick={() => handleBadge(idx)}
                      className={
                        taken[idx]
                          ? "bg-[#d3d3d35f] cursor-pointer"
                          : "bg-[#000] text-[#fff] hover:bg-[#000] hover:text-[#ff6262] cursor-pointer"
                      }
                    >
                      Taken
                    </Badge>
                  </TableCell>
                </TableRow>
              );
            }
          })}
        </TableBody>
      </Table>
    </>
  );
}

export default RecordTable;

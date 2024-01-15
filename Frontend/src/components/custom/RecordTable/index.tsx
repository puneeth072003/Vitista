import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
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
              data.Date_range.From === undefined ||
              data.Date_range.To === undefined ||
              data.Time === undefined
            )
              return;
            if (data.Period === period) {
              const fromDate = new Date(data.Date_range.From);
              const toDate = new Date(data.Date_range.To);
              const time = new Date(data.Time);

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
                    {data.Tablet}
                  </TableCell>
                  <TableCell
                    className={
                      taken[idx]
                        ? "text-[grey] font-[Poppins] text-center"
                        : "font-[Poppins] text-center"
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
                        ? "text-[grey] font-[Poppins] text-center"
                        : "font-[Poppins] text-center"
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
                        ? "text-[grey] font-[Poppins] text-center"
                        : "font-[Poppins] text-center"
                    }
                  >
                    {time.toLocaleString("en-US", {
                      hour: "numeric",
                      minute: "numeric",
                      hour12: true,
                    })}
                  </TableCell>
                  <TableCell className="text-right">
                    {taken[idx] ? (
                      <>
                        <Badge
                          variant={taken[idx] ? "outline" : "default"}
                          className="bg-[#d3d3d35f] cursor-pointer bg-fixed"
                          onClick={() => handleBadge(idx)}
                        >
                          Taken
                        </Badge>
                      </>
                    ) : (
                      <>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Badge
                              variant={taken[idx] ? "outline" : "default"}
                              className="bg-[#000] text-[#fff] hover:bg-[#000] hover:text-[#ff6262] cursor-pointer  bg-fixed"
                            >
                              Taken
                            </Badge>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Are you absolutely sure?
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you Sure you have taken the Tablets?
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel className="bg-[transparent] flex justify-center items-center gap-[0.5rem] hover-button border border-[#00000031] hover:shadow">
                                Cancel
                              </AlertDialogCancel>
                              <AlertDialogAction
                                className="bg-[#212121] hover:bg-[#000] hover:text-[#ff1515] hover:font-bold"
                                onClick={() => handleBadge(idx)}
                              >
                                Continue
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </>
                    )}
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

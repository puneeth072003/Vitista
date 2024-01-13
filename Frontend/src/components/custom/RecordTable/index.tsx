import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { IPayload } from "@/interface";

function RecordTable({
  backendData,
  period,
  selectedDate,
}: {
  backendData: IPayload[];
  period: string;
  selectedDate: Date;
}) {
  return (
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
                  <TableCell className="font-medium">{data.tablet}</TableCell>
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
  );
}

export default RecordTable;

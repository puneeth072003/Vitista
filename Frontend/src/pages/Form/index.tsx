import { FormEvent, useState } from "react";

import axios from "axios";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { addDays } from "date-fns";
import { DateRange } from "react-day-picker";

import { toast } from "sonner";

import FormDateRange from "@/components/custom/FormDateRange";
import FormSelect from "@/components/custom/FormSelect";
import FormTimePicker from "@/components/custom/FormTimePicker";

import logo from "@/assets/icon.png";
import { Button } from "@/components/ui/button";

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

function customToast(payload: IPayload) {
  const startDateObject = payload?.date_range?.from;
  const endDateObject = payload?.date_range?.to;

  if (
    startDateObject.date !== undefined &&
    startDateObject.month !== undefined &&
    startDateObject.year !== undefined &&
    endDateObject.date !== undefined &&
    endDateObject.month !== undefined &&
    endDateObject.year !== undefined
  ) {
    const startDate = new Date(
      startDateObject.year,
      startDateObject.month,
      startDateObject.date
    );
    const endDate = new Date(
      endDateObject.year,
      endDateObject.month,
      endDateObject.date
    );

    toast("Your Tablet Course has been Registered", {
      description: `Tablet Course from ${startDate.toLocaleString("default", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })} to ${endDate.toLocaleString("default", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })}`,
    });
  }
}

function Form() {
  const [time, setTime] = useState<Date>();
  const [tablet, setTablet] = useState<string>();
  const [period, setPeriod] = useState("");
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 0),
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const payload = {
      tablet,
      date_range: {
        from: {
          date: date?.from?.getDate(),
          month: date?.from?.getMonth(),
          year: date?.from?.getFullYear(),
        },
        to: {
          date: date?.to?.getDate(),
          month: date?.to?.getMonth(),
          year: date?.to?.getFullYear(),
        },
      },
      period,
      time: {
        hour: time?.getHours(),
        min: time?.getMinutes(),
      },
    };

    await axios
      .post(`${BACKEND_URL}/api/v1/randomShit`, payload)
      .then(() => customToast(payload));
  };

  return (
    <>
      <div className="flex h-[85vh] flex-col justify-center items-center px-6 lg:px-8">
        <div className="shadow shadow-[#00000017] bg-[#00000005] w-[50%] p-7">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img className="mx-auto h-10 w-auto" src={logo} alt="Logo" />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Enter the Tablet Details
            </h2>
          </div>

          <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid max-w-sm items-center gap-1.5">
                <Label htmlFor="tablet">Tablet Name</Label>
                <Input
                  defaultValue={tablet}
                  onChange={(e) => setTablet(e.target.value)}
                  type="tablet"
                  id="email"
                  placeholder="Tablet Name"
                />
              </div>
              <div className="grid max-w-sm items-center gap-1.5">
                <Label htmlFor="email">Course</Label>
                <FormDateRange className="" date={date} setDate={setDate} />
              </div>
              <div className="grid max-w-sm items-center gap-1.5">
                <Label htmlFor="email">Timings</Label>
                <FormTimePicker setDate={setTime} date={time} />
              </div>
              <div className="grid max-w-sm items-center gap-1.5">
                <Label htmlFor="email">Period</Label>
                <FormSelect period={period} setPeriod={setPeriod} />
              </div>
              <div className="grid max-w-sm items-center gap-1.5">
                <Button className="bg-[#212121] hover:bg-[#000] hover:text-[#44D9E6] hover:text-[0.95rem] transition-[font-size]">
                  Create Register
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Form;

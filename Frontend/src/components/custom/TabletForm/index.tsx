import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import axios from "axios";

import { FormEvent } from "react";

import { toast } from "sonner";

import { DateRange } from "react-day-picker";

import FormDateRange from "@/components/custom/FormDateRange";
import FormSelect from "@/components/custom/FormSelect";
import FormTimePicker from "@/components/custom/FormTimePicker";

import logo from "@/assets/icon.png";
import './style.css'

interface IProps {
  time: Date | undefined;
  setTime: React.Dispatch<React.SetStateAction<Date | undefined>>;
  tablet: string | undefined;
  setTablet: React.Dispatch<React.SetStateAction<string | undefined>>;
  period: string;
  setPeriod: React.Dispatch<React.SetStateAction<string>>;
  date: DateRange | undefined;
  setDate: React.Dispatch<React.SetStateAction<DateRange | undefined>>;
}

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

function TabletForm({ tabletFormProps }: { tabletFormProps: IProps }) {
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const payload = {
      tablet: tabletFormProps.tablet,
      date_range: {
        from: {
          date: tabletFormProps.date?.from?.getDate(),
          month: tabletFormProps.date?.from?.getMonth(),
          year: tabletFormProps.date?.from?.getFullYear(),
        },
        to: {
          date: tabletFormProps.date?.to?.getDate(),
          month: tabletFormProps.date?.to?.getMonth(),
          year: tabletFormProps.date?.to?.getFullYear(),
        },
      },
      period: tabletFormProps.period,
      time: {
        hour: tabletFormProps.time?.getHours(),
        min: tabletFormProps.time?.getMinutes(),
      },
    };

    await axios
      .post(`${BACKEND_URL}/api/v1/randomShit`, payload)
      .then(() => customToast(payload));
  };
  return (
    <>
      <section
        data-place="tabletForm"
        className="shadow shadow-[#00000017] bg-[#00000005] w-[45%] p-7"
      >
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
                defaultValue={tabletFormProps.tablet}
                onChange={(e) => tabletFormProps.setTablet(e.target.value)}
                type="tablet"
                id="email"
                placeholder="Tablet Name"
              />
            </div>
            <div className="grid max-w-sm items-center gap-1.5">
              <Label htmlFor="email">Course</Label>
              <FormDateRange
                className=""
                date={tabletFormProps.date}
                setDate={tabletFormProps.setDate}
              />
            </div>
            <div className="grid max-w-sm items-center gap-1.5">
              <Label htmlFor="email">Timings</Label>
              <FormTimePicker
                setDate={tabletFormProps.setTime}
                date={tabletFormProps.time}
              />
            </div>
            <div className="grid max-w-sm items-center gap-1.5">
              <Label htmlFor="email">Period</Label>
              <FormSelect
                period={tabletFormProps.period}
                setPeriod={tabletFormProps.setPeriod}
              />
            </div>
            <div className="grid max-w-sm items-center gap-1.5">
              <Button className="bg-[#212121] hover:bg-[#000] hover:text-[#44D9E6] hover:text-[0.95rem] transition-[font-size]">
                Create Register
              </Button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

export default TabletForm;

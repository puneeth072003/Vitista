import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import axios from "axios";

import { FormEvent } from "react";

import { toast } from "sonner";

import { IPayload, IProps } from "@/interface";

import { useDispatch } from "react-redux";

import { addedData } from "@/redux/slices/formPayload";

import logo from "@/assets/icon.png";
import FormDateRange from "@/components/custom/FormDateRange";
import FormSelect from "@/components/custom/FormSelect";
import FormTimePicker from "@/components/custom/FormTimePicker";
import "./style.css";



const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function customToast(payload: IPayload) {
  if (
    payload.DateRange.From === undefined ||
    payload.DateRange.To === undefined
  )
    return;

  const startDate = new Date(payload.DateRange.From);
  const endDate = new Date(payload.DateRange.To);

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

function TabletForm({ tabletFormProps }: { tabletFormProps: IProps }) {
  const dispatch = useDispatch();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const payload: IPayload = {
      Tablet: tabletFormProps.tablet,
      DateRange: {
        From: tabletFormProps.date?.from?.toString(),
        To: tabletFormProps.date?.to?.toString(),
      },
      Period: tabletFormProps.period,
      Time: tabletFormProps.time?.toString(),
    };

    await axios
      .post(`${BACKEND_URL}/v1/savePayload`, payload)
      .then(() => dispatch(addedData(payload)))
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
                type="text"
                id="tablet"
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

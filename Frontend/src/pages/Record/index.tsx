import { Calendar } from "@/components/ui/calendar";
import { useEffect, useState } from "react";

function Record() {
  const [initDays, setInitDays] = useState<Date[]>([]);

  const bookedDays1 = [new Date(2024, 0, 8), new Date(2024, 0, 9)];
  const bookedStyle1 = { border: "2px solid black" };

  const bookedDays2 = [new Date(2024, 0, 20), new Date(2024, 0, 21)];
  const bookedStyle2 = { border: "2px solid red" };

  useEffect(() => {
    console.log(initDays);
  }, [initDays]);
  return (
    <>
      <main
        data-place="record"
        className="flex justify-center items-center gap-[5rem] py-[1.5rem] px-6 lg:px-8"
      >
        <section></section>
        <section>
          <Calendar
            mode="multiple"
            selected={initDays}
            onSelect={(data) => setInitDays(data || [])}
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

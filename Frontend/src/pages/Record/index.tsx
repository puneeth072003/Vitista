import { Calendar } from "@/components/ui/calendar";

function Record() {
  return (
    <>
      <main
        data-place="record"
        className="flex justify-center items-center gap-[5rem] py-[1.5rem] px-6 lg:px-8"
      >
        <section>

        </section>
        <section>
          <Calendar selected={}  className="rounded-md border shadow" />
        </section>
      </main>
    </>
  );
}

export default Record;

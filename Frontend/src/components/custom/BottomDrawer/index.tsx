import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { Button } from "@/components/ui/button";

import { Calendar } from "@/components/ui/calendar";

function BottomDrawer({ children }: { children: React.ReactNode }) {
  const today = new Date();
  return (
    <>
      <Drawer>
        <DrawerTrigger asChild>{children}</DrawerTrigger>
        <DrawerContent>
          <div className="mx-auto">
            <DrawerHeader>
              <DrawerTitle className="text-[3rem] font-[Ubuntu] text-center m-auto">
                Today's Checklist
              </DrawerTitle>
              <DrawerDescription className="text-[1.25rem] font-[Poppins] text-center m-auto">
                Some Random Bullshit Go!!
              </DrawerDescription>
            </DrawerHeader>
            <div className="p-4 pb-0 w-[100vw] flex justify-around items-center">
              <section>Hello</section>
              <section>
                <Calendar
                  mode={"single"}
                  defaultMonth={today}
                  selected={today}
                  disableNavigation
                  className="rounded-md border shadow"
                />
              </section>
            </div>
            <DrawerFooter>
              <DrawerClose asChild>
                <Button className="bg-[#212121] hover:bg-[#000] hover:text-[#44D9E6] font-[Poppins] hover:text-[0.95rem] transition-[font-size] w-[5rem] m-auto">
                  Okay
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default BottomDrawer;

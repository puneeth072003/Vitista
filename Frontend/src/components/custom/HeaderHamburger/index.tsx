import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

import { NavLink, useLocation } from "react-router-dom";
import HeaderHamburgerConnect from "../HeaderHamburgerConnect";

function HeaderHamburger() {
  const location = useLocation();
  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <FontAwesomeIcon className="w-10 text-[#000]" icon={faBars} />
        </SheetTrigger>
        <SheetContent className="w-[75%]">
          <div className="grid gap-4 py-4 mt-10">
            <Button className="text-[#000] shadow-none bg-[transparent] flex justify-center items-center gap-[0.5rem] font-[Poppins] hover-button font-bold">
              <NavLink
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("fa-close")?.click();
                }}
                to={"/"}
                className="underline-effect"
              >
                Home
              </NavLink>
            </Button>
            <Button className="text-[#000] shadow-none bg-[transparent] flex justify-center items-center gap-[0.5rem] font-[Poppins] hover-button font-bold">
              <NavLink
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("fa-close")?.click();
                }}
                to={"/algorithms"}
                className="underline-effect"
              >
                Risk Assessment
              </NavLink>
            </Button>
            {location.pathname !== "/connect" && <HeaderHamburgerConnect />}
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}

export default HeaderHamburger;
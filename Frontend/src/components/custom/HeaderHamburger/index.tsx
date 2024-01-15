import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

import { NavLink, useLocation, useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

import { IHeaderRoutes } from "@/interface";
import HeaderHamburgerConnect from "../HeaderHamburgerConnect";

function HeaderHamburger() {
  const location = useLocation();
  const navigate = useNavigate();

  const username = useSelector(
    (state: RootState) => state.userStorage.username
  );

  const headerRoutes: IHeaderRoutes[] = [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Risk Assessment",
      href: "/algorithms",
    },
    {
      title: "Activity Monitor",
      href: "/fit",
    },
    {
      title: "NutriGuide",
      href: username !== "" ? "/track" : "/connect",
    },
    {
      title: "Weight Index Tracker",
      href: username !== "" ? "/track" : "/connect",
    },
  ];

  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <FontAwesomeIcon className="w-10 text-[#000]" icon={faBars} />
        </SheetTrigger>
        <SheetContent className="w-[75%]">
          <div className="grid gap-4 py-4 mt-10">
            {headerRoutes.map((page, idx) => (
              <Button
                key={idx}
                className="text-[#000] shadow-none bg-[transparent] flex justify-center items-center gap-[0.5rem] font-[Poppins] hover-button font-bold"
              >
                <NavLink end
                  key={idx}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(page.href);
                    document.getElementById("fa-close")?.click();
                  }}
                  to={page.href}
                  className="underline-effect"
                >
                  {page.title}
                </NavLink>
              </Button>
            ))}
            {location.pathname !== "/connect" && <HeaderHamburgerConnect />}
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}

export default HeaderHamburger;

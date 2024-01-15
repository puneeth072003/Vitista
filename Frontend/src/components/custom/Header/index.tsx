import {
  NavigationMenu,
  NavigationMenuContent,
  //   NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  //   NavigationMenuViewport,
} from "@/components/ui/navigation-menu";

import { NavLink, useLocation } from "react-router-dom";

import { useEffect } from "react";

import { useDispatch } from "react-redux";

import { getFromLocalStorage } from "@/redux/slices/userStorage";

import { IHeaderRoutes } from "@/interface";

import HeaderConnect from "../HeaderConnect";
import HeaderHamburger from "../HeaderHamburger";

import icon from "@/assets/icon.png";
import "./style.css";

const headerRoutes: IHeaderRoutes[] = [
  {
    title: "Risk Assessment",
    href: "/algorithms",
    description: "Track your BMI using our BMI Tracker",
  },
  {
    title: "Fitness Tracker",
    href: "/fit",
    description: "Track your BMI using our BMI Tracker",
  },
  {
    title: "Diet Planner",
    href: "/diet",
    description: "Track your BMI using our BMI Tracker",
  },
  {
    title: "BMI Tracker",
    href: "/bmi",
    description: "Track your BMI using our BMI Tracker",
  },
];

function Header() {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFromLocalStorage());
  }, [dispatch]);

  return (
    <>
      <header className="flex justify-between items-center pt-[1rem] px-[7vw] pb-[1rem]">
        <div>
          <a
            className="flex justify-center items-center gap-[0.5rem]"
            href="https://github.com/puneeth072003/GfG-hackthon-project"
          >
            <img src={icon} alt="logo" className="w-[1.5rem]" />
            <h1 className="text-[1.7rem] text-[#44D9E6] tracking-[0.20rem] font-extrabold font-overlock">
              Vitista
            </h1>
          </a>
        </div>
        <div data-visible="large">
          <NavigationMenu>
            <NavigationMenuList className="gap-[3rem]">
              <NavigationMenuItem>
                <NavigationMenuLink className="font-medium">
                  <NavLink to={"/"} className="underline-effect">
                    Home
                  </NavLink>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="underline-effect hover:bg-transparent data-[state=closed]:bg-transparent data-[state=open]:bg-transparent">
                  Features
                </NavigationMenuTrigger>
                <NavigationMenuContent className="shadow shadow-[#00000017] bg-[#00000005]">
                  <ul className="grid gap-1 p-4 md:w-[350px] md:grid-cols-2 lg:w-[350px] shadow shadow-[#00000017] bg-[#00000005]">
                    {headerRoutes.map((page, idx: number) => (
                      <li className="flex flex-col justify-start items-start p-2">
                        <NavLink
                          className="font-[Ubuntu] text-[1rem]"
                          key={idx}
                          title={page.title}
                          to={page.href}
                        >
                          {page.title}
                        </NavLink>
                        <p className="font-[Poppins] text-[0.7rem]">
                          {page.description}
                        </p>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {location.pathname !== "/connect" && (
                <>
                  <HeaderConnect />
                </>
              )}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div data-visible="hamburger">
          <HeaderHamburger />
        </div>
      </header>
    </>
  );
}

export default Header;

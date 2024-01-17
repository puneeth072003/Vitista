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

import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

import HeaderConnect from "../HeaderConnect";
import HeaderHamburger from "../HeaderHamburger";

import icon from "@/assets/icon.png";
import "./style.css";

function Header() {
  const location = useLocation();
  const dispatch = useDispatch();

  const isLoading = useSelector((state: RootState) => state.loadingSpinner);

  useEffect(() => {
    dispatch(getFromLocalStorage());
  }, [dispatch]);

  const username = useSelector(
    (state: RootState) => state.userStorage.username
  );

  const headerRoutes: IHeaderRoutes[] = [
    {
      title: "Risk Assessment",
      href: "/risk-assessment",
      description: "Check out our Risk Predictor to predict Breast Cancer",
    },
    {
      title: "Activity Monitor",
      href: "/track/fit",
      description:
        "Track your Sleep Cycle with out Integrated Activity Monitor",
    },
    {
      title: "NutriGuide",
      href: username !== "" ? "/track" : "/connect",
      description: "Plan a suitable Lifestyle with our Diet NutriGuide",
    },
    {
      title: "Body Shape Index",
      href: username !== "" ? "/track" : "/connect",
      description: "Track your BMI using our Body Shape Index",
    },
  ];

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
                  {isLoading ? (
                    <span className="cursor-default">Home</span>
                  ) : (
                    <NavLink end to={"/"} className="underline-effect">
                      Home
                    </NavLink>
                  )}
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                {isLoading ? (
                  <NavigationMenuTrigger
                    disabled
                    className="underline-effect hover:bg-transparent data-[state=closed]:bg-transparent data-[state=open]:bg-transparent"
                    style={{ opacity: 1 }}
                  >
                    Features
                  </NavigationMenuTrigger>
                ) : (
                  <>
                    <NavigationMenuTrigger className="underline-effect hover:bg-transparent data-[state=closed]:bg-transparent data-[state=open]:bg-transparent">
                      Features
                    </NavigationMenuTrigger>
                  </>
                )}
                <NavigationMenuContent className="shadow shadow-[#00000017] bg-[#00000005]">
                  <ul className="grid gap-1 p-1 md:w-[350px] md:grid-cols-2 lg:w-[350px] shadow shadow-[#00000017] bg-[#00000005]">
                    {headerRoutes.map((page, idx: number) => (
                      <li
                        key={idx}
                        className="flex flex-col justify-start items-start p-2"
                      >
                        <NavLink
                          end
                          className="font-[Ubuntu] text-[1rem] underline-effect"
                          key={idx}
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

              <HeaderConnect visibility={location.pathname !== "/connect"} />
              
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

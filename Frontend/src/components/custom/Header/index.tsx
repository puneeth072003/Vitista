import {
  NavigationMenu,
  // NavigationMenuContent,
  //   NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  // NavigationMenuTrigger,
  //   NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";

import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

import icon from "@/assets/icon.png";

import "./style.css";

function Header() {
  return (
    <>
      <header className="flex justify-between items-center pt-[1rem] px-[7vw] pb-[1rem]">
        <div className="max-[630px]:hidden">
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
        <div className="max-[630px]:w-full max-[630px]:flex max-[630px]:justify-evenly">
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
                <NavigationMenuLink className="font-medium">
                  <NavLink
                    to={"/algorithms"}
                    className="underline-effect text-center"
                  >
                    Risk Assessments
                  </NavLink>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink className="font-medium">
                  <Button className="bg-[#212121] hover:bg-[#000] hover:text-[#44D9E6]">
                    <Link
                      className="flex justify-center items-center gap-[0.5rem] font-[Poppins]"
                      to={"/connect"}
                    >
                      Login
                      <FontAwesomeIcon icon={faUser} />
                    </Link>
                  </Button>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </header>
    </>
  );
}

export default Header;

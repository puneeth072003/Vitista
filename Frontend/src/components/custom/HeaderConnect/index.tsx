import {
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "@radix-ui/react-icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

import { Link } from "react-router-dom";

import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

import profile from "@/assets/default_profile_pic.png";

function HeaderConnect() {
  const userInfo = useSelector((state: RootState) => state.userStorage);
  const joinedDate = new Date(userInfo.dateOfJoin);

  return (
    <>
      <NavigationMenuItem>
        <NavigationMenuLink className="font-medium">
          {userInfo.username === "" ? (
            <Button className="bg-[#212121] hover:bg-[#000] hover:text-[#44D9E6]">
              <Link
                className="flex justify-center items-center gap-[0.5rem] font-[Poppins]"
                to={"/connect"}
              >
                Connect
                <FontAwesomeIcon icon={faUser} />
              </Link>
            </Button>
          ) : (
            <>
              <HoverCard>
                <HoverCardTrigger asChild>
                  <Button variant="link" className="text-[#000] font-medium">
                    @{userInfo.username}
                  </Button>
                </HoverCardTrigger>
                <HoverCardContent className="w-60 shadow shadow-[#00000017] bg-[#00000005]">
                  <div className="flex justify-center items-center space-x-4">
                    <Avatar>
                      <AvatarImage src={profile} />
                      <AvatarFallback>{userInfo.username}</AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <h4 className="text-sm font-semibold">
                        {userInfo.firstName}
                      </h4>
                      <div className="flex items-center pt-2">
                        <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />
                        <span className="text-xs text-muted-foreground">
                          Joined{" "}
                          {joinedDate.toLocaleString("default", {
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
            </>
          )}
        </NavigationMenuLink>
      </NavigationMenuItem>
    </>
  );
}

export default HeaderConnect;

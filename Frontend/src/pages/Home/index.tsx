import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightLong } from "@fortawesome/free-solid-svg-icons";

import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import BottomDrawer from "@/components/custom/BottomDrawer";
import HomeCarousel from "@/components/custom/HomeCarousel";

import "./style.css";

function Home() {
  const DrawerButton = (
    <Button
      className="bg-[transparent] flex justify-center items-center gap-[0.5rem] font-[Poppins] hover-button font-bold border border-[#00000031] hover:shadow"
      variant="secondary"
    >
      Check Today's Medicine Course{" "}
      <FontAwesomeIcon className="hover-icon" icon={faRightLong} />
    </Button>
  );

  return (
    <>
      <main
        data-place="home"
        className="mt-[7rem] flex px-[7vw] justify-between flex-wrap"
      >
        <section
          data-place="home"
          className="flex flex-col gap-[2rem] w-[38vw]"
        >
          <h3 className="text-[1.8rem] font-[Rubik] tracking-[-0.07rem] font-[1000]">
            By the Team <span className="text-[#44D9E6] italic">Dev-Den</span>
          </h3>
          <h1 className="text-[4.5rem] font-[800] font-[Ubuntu] leading-[1.2]">
            A Healthy <span className="text-[#44D9E6]">Future</span> begins Now.
          </h1>
          <p className="text-[1.3rem] font-[Poppins]">
            Welcome to our Vitista, your trusted companion on your journey to
            well-being. A user-friendly platform to maintain a balanced
            lifestyle.
          </p>
          <div className="flex gap-[1rem] justify-start items-center">
            <Button className="bg-[#212121] hover:bg-[#000] hover:text-[#44D9E6]">
              <Link
                className="flex justify-center items-center gap-[0.5rem] font-[Poppins] hover-button"
                to={"/form"}
              >
                Add your Medicine Schedule
                <FontAwesomeIcon className="hover-icon" icon={faRightLong} />
              </Link>
            </Button>
            <BottomDrawer children={DrawerButton} />
          </div>
        </section>
        <section className="flex justify-center items-center w-[35vw] min-w-[35vw]">
          <div>
            <HomeCarousel />
          </div>
        </section>
      </main>
    </>
  );
}

export default Home;

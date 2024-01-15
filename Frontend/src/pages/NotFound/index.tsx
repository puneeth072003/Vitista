import { NavLink } from "react-router-dom";

function NotFound() {
  return (
    <>
      <main className="h-[85vh] flex flex-col justify-center items-center gap-[10rem]">
        <div className=" flex flex-col justify-center items-center gap-[4rem]">
          <h1 className="text-5xl font-[Ubuntu]">Error 404: Page Not Found</h1>
          <h1 className="text-5xl font-[Ubuntu]">
            <span>(╯°□°）╯︵ ┻━┻</span>
          </h1>
        </div>
        <NavLink className="text-3xl italic underline font-[Poppins]" to="/">
          Go back
        </NavLink>
      </main>
    </>
  );
}

export default NotFound;

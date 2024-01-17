import { useEffect } from "react";

import { useDispatch } from "react-redux";
import { switchState } from "@/redux/slices/loadingSpinner";

import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function Fit() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(switchState(true));

    const fetchData = async () => {
      await axios
        .get(`${BACKEND_URL}/v1/fit`)
        .then((res) => console.log(res.data))
        .finally(() => dispatch(switchState(false)));
    };
    fetchData();
  }, [dispatch]);

  return (
    <>
      <main className="h-[80vh] flex flex-col justify-center items-center gap-[2rem] py-[1.5rem] px-6 lg:px-8">
        <h1 className="text-4xl font-[Ubuntu] text-center">
          This Feature is Under Development due to the Strict App Authorization
          Of Google.
        </h1>
        <h1 className="text-4xl font-[Ubuntu] text-center">
          Right Now, this is only Available for Testers
        </h1>
      </main>
    </>
  );
}

export default Fit;

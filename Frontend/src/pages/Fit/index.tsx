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
        .finally(() => dispatch(switchState(true)));
    };
    fetchData();
  }, []);

  return (
    <>
      <main></main>
    </>
  );
}

export default Fit;

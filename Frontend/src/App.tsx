import "./App.css";

import { Route, Routes } from "react-router-dom";
import { Radio } from "react-loader-spinner";

import { Toaster } from "@/components/ui/sonner";

import { useSelector } from "react-redux";
import { RootState } from "./redux/store";

import Header from "@/components/custom/Header";
import Home from "@/pages/Home";
import Form from "@/pages/Form";
import Record from "@/pages/Record";
import Connect from "@/pages/Connect";
import Fit from "@/pages/Fit";
import PersonalTracker from "@/pages/PersonalTracker";
import Diet from "@/pages/Diet";
import Bmi from "@/pages/BMI";
import RiskAssessment from "@/pages/RiskAssessment";
import { useEffect } from "react";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function App() {
  const loadingSpinner = useSelector(
    (state: RootState) => state.loadingSpinner
  );

  useEffect(() => {
    const fetchData = async () => {
      await axios.get(`${BACKEND_URL}/v1/home`);
    };
    fetchData();
  }, []);

  return (
    <>
      <div
        className={
          loadingSpinner
            ? "fixed w-full h-full grid place-items-center bg-[#00000043]"
            : "hidden"
        }
      >
        <Radio
          visible={true}
          height="80"
          width="80"
          colors={["#000", "#000", "#000"]}
          ariaLabel="radio-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/record" element={<Record />} />
        <Route path="/form" element={<Form />} />
        <Route path="/connect" element={<Connect />} />
        <Route path="/risk-assessment" element={<RiskAssessment />} />
        <Route path="/track">
          <Route index element={<PersonalTracker />} />
          <Route path="diet" element={<Diet />} />
          <Route path="bmi" element={<Bmi />} />
          <Route path="fit" element={<Fit />} />
        </Route>
      </Routes>
      <Toaster />
    </>
  );
}

export default App;

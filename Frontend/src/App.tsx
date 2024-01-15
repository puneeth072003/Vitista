import "./App.css";

import { Route, Routes } from "react-router-dom";

import { Toaster } from "@/components/ui/sonner";

import Header from "@/components/custom/Header";
import Home from "@/pages/Home";
import Form from "@/pages/Form";
import Record from "@/pages/Record";
import Connect from "@/pages/Connect";
import Fit from "@/pages/Fit";
import Diet from "@/pages/Diet";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/record" element={<Record />} />
        <Route path="/form" element={<Form />} />
        <Route path="/connect" element={<Connect />} />
        <Route path="/fit" element={<Fit />} />
        <Route path="/diet" element={<Diet />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;

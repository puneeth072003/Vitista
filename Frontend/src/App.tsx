import "./App.css";

import { Route, Routes } from "react-router-dom";

import { Toaster } from "@/components/ui/sonner";

import Header from "@/components/custom/Header";
import Home from "@/pages/Home";
import Form from "@/pages/Form";
import Record from "@/pages/Record";
import Test from "@/pages/Test";
import Connect from "@/pages/Connect";

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/record" element={<Record />} />
        <Route path="/form" element={<Form />} />
        <Route path="/test" element={<Test />} />
        <Route path="/connect" element={<Connect />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;

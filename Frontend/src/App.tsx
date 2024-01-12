import "./App.css";

import { Route, Routes } from "react-router-dom";

import { Toaster } from "@/components/ui/sonner";

import Header from "@/components/custom/Header";
import Home from "@/pages/Home";
import Form from "@/pages/Form";
import Record from "@/pages/Record";
import Test from "@/pages/Test";

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/record" element={<Record />} />
        <Route path="/test" element={<Test />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;

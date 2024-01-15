import { useLocation } from "react-router-dom";

import { Progress } from "@/components/ui/progress";

import { IBMIResult } from "@/interface";

import { useEffect, useState } from "react";

function Bmi() {
  const location = useLocation();

  const res: IBMIResult = location.state;

  const [progress, setProgress] = useState(0);

  const [style, setStyle] = useState({
    backgroundColor: "",
    color: "",
  });

  useEffect(() => {
    let bmi = res.bmi;
    if (bmi > 45) {
      bmi = 40;
    }

    const bmiPercent = bmi * (10 / 4);

    setTimeout(() => setProgress(bmiPercent), bmiPercent * 7);

    switch (res.category) {
      case "Underweight":
        setStyle({
          backgroundColor: "bg-[#FADA5E]",
          color: "text-[#FADA5E]",
        });
        break;

      case "Normal weight":
        setStyle({
          backgroundColor: "bg-[#86DC3D]",
          color: "text-[#86DC3D]",
        });
        break;

      case "Overweight":
        setStyle({
          backgroundColor: "bg-[#FFBD31]",
          color: "text-[#FFBD31]",
        });
        break;

      case "Obese":
        setStyle({
          backgroundColor: "bg-[#D30000]",
          color: "text-[#D30000]",
        });
        break;
    }
  }, [res]);

  return (
    <>
      {location.state ? (
        <>
          <main className="flex flex-col justify-center items-center gap-[5rem] py-[1.5rem] px-6 lg:px-8">
            <section className="flex flex-col justify-center items-center gap-6 pt-16">
              <h1 className="text-5xl font-[Ubuntu]">Weight Index Tracker</h1>
              <p className="text-lg font-[Rubik]">
                Body Mass Index (BMI) is a person's weight in kilograms (or
                pounds) divided by the square of height in meters (or feet). A
                high BMI can indicate high body fatness. BMI screens for weight
                categories that may lead to health problems, but it does not
                diagnose the body fatness or health of an individual.
              </p>
            </section>
            <section className="w-[60vw] flex flex-col items-center justify-center gap-4">
              <h3 className="text-3xl font-[Ubuntu]">
                According to your BMI, you are{" "}
                <span className={style.color}>{res.category}</span>
              </h3>
              <Progress value={progress} className={style.backgroundColor} />
            </section>
          </main>
        </>
      ) : (
        <>
          <main className="flex justify-center items-center h-[85vh]">
            <h1 className="text-5xl font-[Poppins] text-cyan-400">
              Page Not Found
            </h1>
          </main>
        </>
      )}
    </>
  );
}

export default Bmi;

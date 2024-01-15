import { useLocation } from "react-router-dom";

import { Progress } from "@/components/ui/progress";

import { IBMIResult } from "@/interface";

import { useEffect, useState } from "react";

function Bmi() {
  const location = useLocation();

  const res: IBMIResult = location.state;

  const [progress, setProgress] = useState(0);
  const [heading, setHeading] = useState("");
  const [points, setPoints] = useState<string[]>([]);

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
        setHeading("Risks Associated with being Underweight");
        setPoints([
          "Malnutrition, vitamin deficiencies, anemia (lowered ability to carry blood vessels)",
          "Osteoporosis, a disease that causes bone weakness, increasing the risk of breaking a bone.",
          "A decrease in immune  function",
          "Growth and development issues, particularly in children and teenagers",
        ]);
        break;

      case "Normal weight":
        setStyle({
          backgroundColor: "bg-[#86DC3D]",
          color: "text-[#86DC3D]",
        });
        setHeading("Good, Keep following a Healthy Diet");
        break;

      case "Overweight":
        setStyle({
          backgroundColor: "bg-[#FFBD31]",
          color: "text-[#FFBD31]",
        });
        setHeading("Risks Associated with being Overweight");
        setPoints([
          "Higher levels of LDL cholesterol, which is widely considered bad cholesterol, lower levels of HDL cholesterol, considered to be good cholesterol in moderation, and high levels of triglycerides",
          "Osteoarthritis, a type of joint disease caused by breakdown of joint cartilage",
          "Sleep apnea and breathing problems",
          "Certain cancers (endometrial, breast, colon, kidney, gallbladder, liver)",
          "Body pains and difficulty with certain physical functions",
        ]);
        break;

      case "Obese":
        setStyle({
          backgroundColor: "bg-[#D30000]",
          color: "text-[#D30000]",
        });
        setHeading("Risks Associated with being Overweight");
        setPoints([
          "High blood pressure",
          "Type II diabetes",
          "An increased risk of mortality compared to those with a  healthy BMI",
          "Low quality of life",
          "Mental illnesses such as clinical depression, anxiety, and others",
        ]);
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
              <div className="mt-8">
                <h3 className="text-lg font-[Rubik]">{heading}</h3>
                <ul>
                  {points.map((point, idx) => (
                    <>
                      <li
                        className="ml-5 text-sm font-[Rubik] list-disc"
                        key={idx}
                      >
                        {point}
                      </li>
                    </>
                  ))}
                </ul>
              </div>
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

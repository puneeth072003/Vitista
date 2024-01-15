import { useLocation } from "react-router-dom";

import { IDietResult } from "@/interface";

import { useEffect } from "react";

import './style.css'

function Bmi() {
  const location = useLocation();

  const res: IDietResult = location.state;

  useEffect(() => {
    console.log(res);
  }, [res]);

  return (
    <>
      {location.state ? (
        <>
          <main className="flex flex-col justify-center items-center gap-[5rem] py-[1.5rem] px-6 lg:px-8">
            <section className="flex flex-col justify-center items-center gap-6 pt-16">
              <h1 className="text-5xl font-[Ubuntu]">NutriGuide</h1>
              <p className="text-lg font-[Rubik]">
                A diet containing adequate energy should be consumed to protect
                the appropriate combination of weight and body composition.
              </p>
            </section>
            <section className="w-[85vw] flex flex-col items-center justify-center gap-8">
              <h3 className="text-3xl font-[Ubuntu] text-center">
                You'll be following a diet that comprises of
              </h3>
              <div data-style="flex-col" className="flex w-full justify-around items-start gap-8">
                <div className="flex flex-col justify-center w-full">
                  <h4 className="text-2xl font-[Poppins]">
                    {res.DailyrequiredValues.Carbohydrates} Calories of
                    <span className="text-red-300"> Carbohydrates</span>
                  </h4>
                  <h5 className="text-lg font-[Rubik]">
                    Foods that Provide you high Carbs are:{" "}
                  </h5>
                  <ul>
                    <li className="ml-5 text-sm font-[Rubik] list-disc">Rice</li>
                    <li className="ml-5 text-sm font-[Rubik] list-disc">Canned Fruit</li>
                    <li className="ml-5 text-sm font-[Rubik] list-disc">Donuts</li>
                    <li className="ml-5 text-sm font-[Rubik] list-disc">Apples</li>
                    <li className="ml-5 text-sm font-[Rubik] list-disc">Cereals</li>
                  </ul>
                </div>
                <div className="flex flex-col justify-center w-full">
                  <h4 className="text-2xl font-[Poppins]">
                    {res.DailyrequiredValues.Fats} Calories of{" "}
                    <span className="text-green-300">Fats</span>
                  </h4>
                  <h5 className="text-lg font-[Rubik]">
                    Healthiest High Fat Foods are:{" "}
                  </h5>
                  <ul>
                    <li className="ml-5 text-sm font-[Rubik] list-disc">Fatty Fish</li>
                    <li className="ml-5 text-sm font-[Rubik] list-disc">Chia Seeds</li>
                    <li className="ml-5 text-sm font-[Rubik] list-disc">Dark Chocolate</li>
                    <li className="ml-5 text-sm font-[Rubik] list-disc">Avocado</li>
                    <li className="ml-5 text-sm font-[Rubik] list-disc">Flax Seeds</li>
                  </ul>
                </div>
                <div className="flex flex-col justify-center w-full">
                  <h4 className="text-2xl font-[Poppins]">
                    {res.DailyrequiredValues.Proteins} Calories of{" "}
                    <span className="text-yellow-300">Proteins</span>
                  </h4>
                  <h5 className="text-lg font-[Rubik]">
                    Some high Protein Foods that you can consume are:{" "}
                  </h5>
                  <ul>
                    <li className="ml-5 text-sm font-[Rubik] list-disc">Eggs</li>
                    <li className="ml-5 text-sm font-[Rubik] list-disc">Almond</li>
                    <li className="ml-5 text-sm font-[Rubik] list-disc">Yogurt</li>
                    <li className="ml-5 text-sm font-[Rubik] list-disc">Fish</li>
                    <li className="ml-5 text-sm font-[Rubik] list-disc">Lentils</li>
                  </ul>
                </div>
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

import { useState, FormEvent } from "react";

import axios from "axios";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import { IDietResult } from "@/interface";

import LevelSelector from "@/components/custom/LevelSelector";
import logo from "@/assets/icon.png";
import "./style.css";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function PersonalTracker() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [activityLevel, setActivityLevel] = useState("low");

  const [result, setResult] = useState<IDietResult | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await axios
      .get<IDietResult>(`${BACKEND_URL}/v1/suggest_meal_plan`, {
        params: { name, age, weight, height, activity_level: activityLevel },
      })
      .then((res) => setResult(res.data))
      .then(() => {
        setName("");
        setAge("");
        setHeight("");
        setWeight("");
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <main className="flex justify-center items-center">
        {result ? (
          <section
            data-place="diet"
            className="shadow shadow-[#00000017] bg-[#00000005] w-[35%] p-7"
          >
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <img className="mx-auto h-10 w-auto" src={logo} alt="Logo" />
              <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Enter your Details For Diet Plans
              </h2>
            </div>

            <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid max-w-sm items-center gap-1.5">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    defaultValue={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    id="firstName"
                    placeholder="Enter your First Name..."
                  />
                </div>
                <div className="grid max-w-sm items-center gap-1.5">
                  <Label htmlFor="age">Age</Label>
                  <Input
                    defaultValue={age}
                    onChange={(e) => setAge(e.target.value)}
                    type="number"
                    id="age"
                    placeholder="Enter your Age..."
                  />
                </div>
                <div className="grid max-w-sm items-center gap-1.5">
                  <Label htmlFor="height">Height</Label>
                  <Input
                    defaultValue={height}
                    onChange={(e) => setHeight(e.target.value)}
                    type="number"
                    id="height"
                    placeholder="Enter your Height..."
                  />
                </div>
                <div className="grid max-w-sm items-center gap-1.5">
                  <Label htmlFor="weight">Weight</Label>
                  <Input
                    defaultValue={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    type="number"
                    id="weight"
                    placeholder="Enter your Name..."
                  />
                </div>
                <div className="grid max-w-sm items-center gap-1.5">
                  <Label htmlFor="age">Activity Level</Label>
                  <LevelSelector
                    activityLevel={activityLevel}
                    setActivityLevel={setActivityLevel}
                  />
                </div>
                <div className="grid max-w-sm items-center gap-1.5">
                  <Button className="bg-[#212121] hover:bg-[#000] hover:text-[#44D9E6] hover:text-[0.95rem] transition-[font-size]">
                    Create Register
                  </Button>
                </div>
              </form>
            </div>
          </section>
        ) : (
          <section></section>
        )}
      </main>
    </>
  );
}

export default PersonalTracker;

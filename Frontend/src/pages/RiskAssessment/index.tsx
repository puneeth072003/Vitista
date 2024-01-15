import { ChangeEvent, useState } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import { useDispatch } from "react-redux";
import { switchState } from "@/redux/slices/loadingSpinner";

import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function RiskAssessment() {
  const [image, setImage] = useState<File | null>(null);

  const dispatch = useDispatch();

  const handleUpload = async () => {
    if (!image) {
      console.error("Please select an image.");
      return;
    }

    dispatch(switchState(true));

    const formData = new FormData();
    formData.append("image", image);

    await axios
      .post(`${BACKEND_URL}/v1/upload`, formData, {
      })
      .then((res) => console.log(res.data))
      .catch((err) => console.error("Error uploading image:", err))
      .finally(() => dispatch(switchState(false)));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  return (
    <>
      <main className="flex flex-col justify-center items-center gap-[5rem] py-[1.5rem] px-6 lg:px-8">
        <section className="flex flex-col justify-center items-center gap-6 pt-16">
          <h1 className="text-5xl font-[Ubuntu]">Risk Assessment</h1>
          <p className="text-lg font-[Rubik]">
            Body Mass Index (BMI) is a person's weight in kilograms (or pounds)
            divided by the square of height in meters (or feet). A high BMI can
            indicate high body fatness. BMI screens for weight categories that
            may lead to health problems, but it does not diagnose the body
            fatness or health of an individual.
          </p>
        </section>
        <section className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="picture">Picture</Label>
          <Input
            id="picture"
            type="file"
            accept="image/png"
            onChange={handleImageChange}
          />
          <Button onClick={handleUpload}>Submit</Button>
        </section>
      </main>
    </>
  );
}

export default RiskAssessment;

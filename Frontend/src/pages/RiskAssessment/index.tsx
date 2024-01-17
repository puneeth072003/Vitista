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

  // const [result, setResult] = useState("");

  const handleUpload = async () => {
    if (!image) {
      console.error("Please select an image.");
      return;
    }

    dispatch(switchState(true));

    const formData = new FormData();
    formData.append("image", image);

    await axios
      .post(`${BACKEND_URL}/v1/upload`, formData)
      .then(async () => {
        await axios
          .get(`${BACKEND_URL}/v1/modelProcessing1`)
          .then((res) => console.log(res.data));
      })
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
          <h1 className="text-5xl font-[Ubuntu] text-center w-full">
            Risk Assessment
          </h1>
          <p className="text-lg font-[Rubik] w-4/5">
            Our cutting-edge Risk Assessment Algorithm for detecting brain
            tumors represents a significant advancement in medical technology.
            Leveraging sophisticated machine learning techniques, the algorithm
            analyzes intricate patterns within medical imaging data, such as MRI
            scans, to identify potential indicators of brain tumors with
            remarkable accuracy.
          </p>
        </section>
        <section className="grid w-full max-w-sm items-center gap-3">
          <Label htmlFor="picture">Enter the Image of your MRI Scanning</Label>
          <Input
            id="picture"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
          <Button
            className="bg-[#212121] hover:bg-[#000] hover:text-[#44D9E6] hover:text-[0.95rem] transition-[font-size]"
            onClick={handleUpload}
          >
            Submit
          </Button>
        </section>
      </main>
    </>
  );
}

export default RiskAssessment;

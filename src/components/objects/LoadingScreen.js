import React from "react";
import Lottie from "react-lottie";
import { loadingAnimationObjects } from "../animation/animation";

export default function Loadingpage() {
  return (
    <div className="flex justify-center">
      <Lottie
        style={{
          marginTop: "30px",
        }}
        options={loadingAnimationObjects}
        height={500}
        width={500}
      />
    </div>
  );
}

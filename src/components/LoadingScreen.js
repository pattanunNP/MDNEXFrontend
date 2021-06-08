import React from "react";
import Lottie from "react-lottie";
import loadingAnimation from "./animation/loading2.json";

export default function LoadingScreen() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loadingAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const Loadingpage = (
    <div className="flex justify-center">
      <Lottie
        style={{
          marginTop: "30px",
        }}
        options={defaultOptions}
        height={500}
        width={500}
      />
    </div>
  );
  return <div>{Loadingpage}</div>;
}

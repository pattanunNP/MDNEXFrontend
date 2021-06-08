import React from "react";
import Lottie from "react-lottie";
import loadingAnimation from "../components/animation/notfround.json";

export default function LoadingScreen() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loadingAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const NotFroundpage = (
    <div>
      <diV>
        <Lottie
          style={{
            marginTop: "30px",
          }}
          options={defaultOptions}
          height={500}
          width={500}
        />
      </diV>
    </div>
  );
  return <div className="flex justify-center">{NotFroundpage}</div>;
}

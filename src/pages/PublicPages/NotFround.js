import React from "react";
import Lottie from "react-lottie";
import loadingAnimation from "../../components/animation/notfround.json";

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
      <div className="p-10 flex justify-center ">
        <h1 className="text-3xl">404 NOT FROUND PAGE</h1>
      </div>
      <diV className="flex justify-center">
        <Lottie
          style={{
            marginTop: "30px",
          }}
          options={defaultOptions}
          height={500}
          width={500}
        />
      </diV>
      <div className="p-10 flex justify-center ">
        <button
          className="text-3xl text-white p-2 bg-red-400 rounded-xl hover:bg-red-500"
          onClick={() => {
            window.history.back();
          }}
        >
          GO BACK TO LASTPAGE ?
        </button>
      </div>
    </div>
  );
  return <div className="flex justify-center">{NotFroundpage}</div>;
}

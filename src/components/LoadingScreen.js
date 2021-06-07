import React, { useState, useEffect } from "react";
import Lottie from "react-lottie";
import loadingAnimation from "./animation/loading.json";

export default function LoadingScreen(props) {
  const [loading, setLoading] = useState(true);
  const defaultOptions = {
    loop: props.isloop,
    autoplay: props.isautoplay,
    animationData: loadingAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, props.delay);
  }, []);

  const Loadingpage = (
    <Lottie
      style={{
        marginTop: "30px",
      }}
      options={defaultOptions}
      height={500}
      width={500}
    />
  );
  return (
    <div>{loading ? <div>{Loadingpage}</div> : <div>{props.content}</div>}</div>
  );
}

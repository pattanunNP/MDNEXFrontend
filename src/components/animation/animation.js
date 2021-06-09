import loadingAnimation from "./loading2.json";
import successAnimation from "./confirm.json";
import failedAnimation from "./failed.json";
import submitingAnimation from "./confirm.json";
import notfroundAnimation from "./notfround.json";
import loadingringAnimation from "./loadingring.json";

export const successAnimationObjects = {
  loop: false,
  autoplay: true,
  animationData: successAnimation,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

export const notfroundAnimationObjects = {
  loop: true,
  autoplay: true,
  animationData: notfroundAnimation,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

export const loadingringAnimationObjects = {
  loop: true,
  autoplay: true,
  animationData: loadingringAnimation,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

export const loadingAnimationObjects = {
  loop: true,
  autoplay: true,
  animationData: loadingAnimation,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

export const submitingAnimationObjects = {
  loop: false,
  autoplay: true,
  animationData: submitingAnimation,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

export const failedAnimationObjects = {
  loop: false,
  autoplay: true,
  animationData: failedAnimation,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

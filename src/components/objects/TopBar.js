import { IconButton } from "@material-ui/core";
import React, { useContext, useState } from "react";
import { StoreContext } from "../../context/store";
import FadeIn from "react-fade-in";
import Slider from "@material-ui/core/Slider";
export default function TopBar(props) {
  const {
    filter_brightness,
    filter_contrast,
    opacity,
    setContrast,
    setBrightness,
    setOpacity,
    setToolMode
  } = useContext(StoreContext);

  const [openFilterTab, setOpenFilterTab] = useState(false);

  const handleChange = (event, newValue) => {
    event.preventDefault();
    setBrightness(newValue);
  };
  const handleChange2 = (event, newValue) => {
    event.preventDefault();

    setContrast(newValue);
  };
  const handleChange3 = (event, newValue) => {
    event.preventDefault();

    setOpacity(newValue);
  };
  return (
    <header className="z-30 absolute h-16 w-screen  bg-gray-800">
      <div className="w-full h-16 flex justify-center">
        <div className=" grid grid-rows-1 gap-5">
          <div className="fixed">
            <IconButton onClick={
              () => {
                setToolMode("eraser")
              }
            }>
              <i className="fas fa-eraser text-white w-8 h-8"></i>
            </IconButton>
            <IconButton
              className="my-5"
              onClick={() => {
                setOpenFilterTab(!openFilterTab);
              }}
            >
              <i className="fas fa-sun text-white w-8 h-8"></i>{" "}
            </IconButton>
            {openFilterTab ? (
              <FadeIn>
                <div
                  className="my-10 w-72 h-full p-5 rounded-xl"
                  style={{
                    backgroundColor: "rgba(20, 20, 20, 0.4 )",
                    backdropFilter: "blur( 5.0px )",
                  }}
                >
                  <div className="grid grid-rows-1 grap-2">
                    <div className="flex justify-between">
                      <i className="fas fa-sun text-white  w-4 h-4 mx-3"></i>
                      <Slider
                        style={{
                          color: "#10B981",
                        }}
                        defaultValue={100}
                        valueLabelDisplay="auto"
                        value={filter_brightness}
                        onChange={handleChange}
                        min={0}
                        step={2}
                        max={200}
                      />
                      <i className="fas fa-sun text-white w-10 h-10 mx-3"></i>
                    </div>
                    <div className="flex justify-between">
                      <i className="fas fa-adjust text-white w-4 h-4 mx-3"></i>
                      <Slider
                        style={{
                          color: "#10B981",
                        }}
                        defaultValue={100}
                        valueLabelDisplay="auto"
                        value={filter_contrast}
                        onChange={handleChange2}
                        min={0}
                        step={2}
                        max={200}
                      />
                      <i className="fas fa-adjust text-white w-10 h-10 mx-3"></i>
                    </div>
                    <div className="flex justify-between">
                      <i className="fas fa-eye text-gray-500 w-4 h-4 mx-3"></i>
                      <Slider
                        style={{
                          color: "#10B981",
                        }}
                        defaultValue={100}
                        valueLabelDisplay="auto"
                        value={opacity}
                        onChange={handleChange3}
                        min={0}
                        step={2}
                        max={200}
                      />
                      <i className="fas fa-eye text-white w-10 h-10 mx-3"></i>
                    </div>
                  </div>
                  <div>
                    <button
                      style={{
                        color: "#10B981",
                      }}
                      className=" p-1 rounded-2xl"
                      onClick={() => {
                        setContrast(100);
                        setBrightness(100);
                        setOpacity(100);
                      }}
                    >
                      Reset
                    </button>
                  </div>
                </div>
              </FadeIn>
            ) : null}
          </div>
        </div>
      </div>
    </header>
  );
}

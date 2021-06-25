import { IconButton, Tooltip } from "@material-ui/core";
import React, { useContext, useState } from "react";
import { StoreContext } from "../../context/store";
import FadeIn from "react-fade-in";
import Slider from "@material-ui/core/Slider";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import EditIcon from "@material-ui/icons/Edit";
import TimelineIcon from "@material-ui/icons/Timeline";
import { TwitterPicker } from 'react-color';
export default function TopBar(props) {
  const {
    filter_brightness,
    filter_contrast,
    opacity,
    toolmode,
    setContrast,
    setBrightness,
    setOpacity,
    setToolMode,
    setToolColor
  } = useContext(StoreContext);

  const [openFilterTab, setOpenFilterTab] = useState(false);
  const [openColorPicker, setOpenColorPicker] = useState(false);
  const [openToolTab, setOpenToolTab] = useState(false);
  const [color, setColor] = useState({ r: 255, g: 255, b: 255, a: 0.5 });

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

  const Tools = [
    {
      id: 1,
      toolname: "freehand",
      color: "white",
      icon: (
        <EditIcon
          style={{
            color: "white",
          }}
        />
      ),
    },
    {
      id: 2,
      toolname: "bbox",
      icon: (
        <CheckBoxOutlineBlankIcon
          style={{
            color: "white",
          }}
        />
      ),
    },
    {
      id: 3,
      toolname: "polygon",
      icon: (
        <TimelineIcon
          style={{
            color: "white",
          }}
        />
      ),
    },
    {
      id: 4,
      toolname: "mask",

      icon: (
        <i className="fas fa-highlighter" style={{
          color: "white",
        }}></i>
      ),
    },
    {
      id: 5,
      toolname: "eraser",
      icon: (
        <i className="fas fa-eraser" style={{
          color: "white",
        }}></i>
      ),
    },
    {
      id: 6,
      toolname: "selection",

      icon: (

        <i className="far fa-object-ungroup" style={{
          color: "white",
        }}></i>
      ),
    },
  ];
  const handleChangeComplete = (color, event) => {
    event.preventDefault();
    setColor(color.rgb)
    setToolColor(color.rgb)
  };

  const handleChangeColor = (color, event) => {
    event.preventDefault();

  };
  return (
    <header className="z-30 absolute h-16 w-screen  bg-gray-800">
      <div className="w-full h-16 flex justify-center">
        <div className=" grid grid-rows-1 gap-5">
          <div className="fixed">

            <Tooltip title="Toolbar">
              <IconButton className="my-5" onClick={
                () => {
                  setOpenToolTab(!openToolTab)
                }
              }>
                <i className="fas fa-wrench text-white w-8 h-8"></i>
              </IconButton>
            </Tooltip>
            <Tooltip title="Light Adjustment">
              <IconButton
                className="my-5"
                onClick={() => {
                  setOpenFilterTab(!openFilterTab);
                }}
              >
                <i className="fas fa-sun text-white w-8 h-8"></i>{" "}
              </IconButton>
            </Tooltip>
            <Tooltip title="Color Picker">
              <IconButton onClick={() => {
                setOpenColorPicker(!openColorPicker)
              }}>
                <i style={{
                  color: `rgba(${color['r']},${color['g']},${color['b']},${color['a']})`
                }} className="fas fa-palette e w-8 h-8"></i>



              </IconButton>
            </Tooltip>

            {openFilterTab ? (
              <FadeIn>
                <div
                  className="my-10 w-72 h-full p-5 rounded-xl"
                  style={{
                    backgroundColor: "rgba(20, 20, 20, 0.4 )",
                    backdropFilter: "blur( 5.0px )",
                  }}
                > <h1 className="text-white my-5"> Light Adjustment</h1>
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
            {openToolTab ? (
              <FadeIn>
                <div
                  className="my-10 w-72 h-full p-5 rounded-xl"
                  style={{
                    backgroundColor: "rgba(20, 20, 20, 0.4 )",
                    backdropFilter: "blur( 5.0px )",
                  }}
                >
                  <h1 className="text-white my-5"> Toolbar</h1>
                  <div className="grid grid-cols-3 grap-1">
                    {Tools.map((Tool) => (
                      <div key={Tool.id}>
                        <button className={toolmode === Tool.toolname ? `p-2 w-20 h-20  bg-green-300` : `p-2 w-20 h-20 border-none`} onClick={() => {
                          setToolMode(Tool.toolname)


                        }}>
                          <div className="grid-cols-1 grap-1">

                            <div className="my-2"> {Tool.icon}</div>
                            <div className="text-white">{Tool.toolname}</div>

                          </div>

                        </button>


                      </div>
                    ))}


                  </div>

                </div>
              </FadeIn>
            ) : null}
            {openColorPicker ? <FadeIn>
              <TwitterPicker
                color={color}
                onChangeComplete={handleChangeComplete} triangle="hide" />    </FadeIn> : null}
          </div>
        </div>
      </div>
    </header>
  );
}

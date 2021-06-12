import React from "react";
import { IconButton } from "@material-ui/core";
import LabelBrowser from "../../components/objects/LabelBrowser";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";

import EditIcon from "@material-ui/icons/Edit";

import Panel from "../../components/objects/Panel/Panel";
import TimelineIcon from "@material-ui/icons/Timeline";

export default function Labeltool() {
  const mocktool = [
    {
      id: "1",
      name: "bone",
      toolname: "freehand",
      useAutoLabel: false,
      color: "#FF470D",
      icon: (
        <EditIcon
          style={{
            color: "#FF470D",
          }}
        />
      ),
    },
    {
      id: "2",
      name: "void",
      toolname: "bbox",
      useAutoLabel: true,
      color: "#8A72E7",
      icon: (
        <CheckBoxOutlineBlankIcon
          style={{
            color: "#8A72E7",
          }}
        />
      ),
    },
    {
      id: "3",
      name: "x-ray_tag",
      toolname: "polygon",
      useAutoLabel: false,
      color: "#FFCB6B",
      icon: (
        <TimelineIcon
          style={{
            color: "#FFCB6B",
          }}
        />
      ),
    },
    {
      id: "3",
      name: "x-ray_tag",
      toolname: "polygon",
      useAutoLabel: false,
      color: "#FFCB6B",
      icon: (
        <TimelineIcon
          style={{
            color: "#FFCB6B",
          }}
        />
      ),
    },
    {
      id: "3",
      name: "x-ray_tag",
      toolname: "polygon",
      useAutoLabel: false,
      color: "#FFCB6B",
      icon: (
        <TimelineIcon
          style={{
            color: "#FFCB6B",
          }}
        />
      ),
    },
  ];

  return (
    <div>
      <div className="z-20 flex justify-start">
        <LabelBrowser />
        <aside className="z-20 w-96 bg-gray-800 h-screen shadow-xl">
          <header className="h-12">
            <div className="w-screen bg-gray-800 h-16  flex justify-center">
              <div className="my-2 grid grid-cols-4 gap-10">
                <div>
                  <button>
                    <i className="fas fa-search-plus text-white w-8 h-5"></i>
                    <p className="text-white">53%</p>
                  </button>{" "}
                </div>

                <div>
                  <button>
                    <i className="fas fa-sun text-white w-8 h-5"></i>{" "}
                    <p className="text-white">23</p>
                  </button>
                </div>
              </div>
            </div>
          </header>
          <div className="flex flex-col overflow-y-auto w-96">
            <div className="flex justify-start">
              <h1 className="mt-4 p-3 title text-green-400">Tools</h1>
            </div>
            <div className="mb-2 bg-gray-700 h-64 overflow-y-auto">
              {mocktool.map((tool, id) => (
                <button
                  key={id}
                  className="z-20 mt-1 shadow-xl p-3 bg-gray-800 w-full h-16 text-white hover:bg-gray-700"
                >
                  <div className="grid grid-cols-4 gap-1">
                    <div className=""> {tool.icon}</div>

                    <div className="">
                      {tool.name}
                      <h1 className="text-gray-400">{tool.toolname}</h1>
                    </div>
                    <div className=" rounded-xl">
                      <svg width="30" height="30">
                        <rect
                          width="30"
                          height="30"
                          style={{
                            fill: tool.color,
                            borderRadius: "40px",
                          }}
                        />
                      </svg>
                    </div>
                    <div className="">
                      <IconButton
                        style={{
                          color: tool.useAutoLabel ? "#20ACD2" : "#727272",
                        }}
                      >
                        <i className="fas fa-robot"></i>
                      </IconButton>
                    </div>
                  </div>
                </button>
              ))}
            </div>
            <div className="flex justify-start">
              <h1 className="mt-4 p-3 title text-green-400">Object</h1>
            </div>
            <div className="my-1 bg-gray-700 h-64">
              <div></div>
            </div>
          </div>
        </aside>
        <div>
          <Panel>
            {/* <canvas></canvas> */}
            <img
              alt="img"
              src="https://res.cloudinary.com/image-chatbot/image/upload/v1623427934/MD_NEX/image1_howum6.png"
            />
          </Panel>
        </div>
      </div>
    </div>
  );
}

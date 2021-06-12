import React from "react";
import { IconButton } from "@material-ui/core";
import LabelBrowser from "../../components/objects/LabelBrowser";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";

import EditIcon from "@material-ui/icons/Edit";
import DrawableArea from "../../components/objects/DrawableArea";
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
  const mockObject = [
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
  ];
  const image_url =
    "https://res.cloudinary.com/image-chatbot/image/upload/v1623427911/MD_NEX/image2_htrtd9.png";

  return (
    <div>
      <div className="z-20 flex justify-start ">
        <LabelBrowser />
        <aside className="z-20 w-72 bg-gray-800 h-screen shadow-xl">
          <header className="h-12 w-screen">
            <div className="w-full bg-gray-800 h-16 flex justify-center">
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
          <div className="flex flex-col w-96">
            <div className="flex justify-start">
              <h1 className="mt-4 p-3 title text-green-400">Tools</h1>
            </div>
            <div className="mb-2 overflow-y-auto">
              {mocktool.map((tool, id) => (
                <button
                  key={id}
                  className="z-20 mt-1 shadow-xl p-3 bg-gray-800 w-72 h-16 text-white hover:bg-gray-700"
                >
                  <div className="grid grid-cols-4 gap-1">
                    <div className=""> {tool.icon}</div>

                    <div className="text-sm">
                      {tool.name}
                      <h1 className="text-gray-400 text-sm">{tool.toolname}</h1>
                    </div>
                    <div className=" rounded-xl">
                      <svg width="20" height="20">
                        <rect
                          width="15"
                          height="15"
                          style={{
                            fill: tool.color,
                          }}
                        />
                      </svg>
                    </div>

                    <div className="w-8 h-8">
                      <IconButton>
                        <i
                          c
                          className={`fas fa-robot ${
                            tool.useAutoLabel === true
                              ? "text-blue-400"
                              : "text-grey-800"
                          }`}
                        ></i>
                      </IconButton>
                    </div>
                  </div>
                </button>
              ))}
            </div>
            <div className="flex justify-start ">
              <h1 className="mt-4 p-3 title text-green-400">Object</h1>
            </div>
            <div className="mb-2 overflow-y-auto">
              {mockObject.map((object, id) => (
                <button
                  key={id}
                  className="z-20 mt-1 shadow-xl p-3 bg-gray-800 w-72 h-16 text-white hover:bg-gray-700"
                >
                  <div className="grid grid-cols-4 gap-1">
                    <div className=""> {object.icon}</div>

                    <div className="text-sm">
                      {object.name}
                      <h1 className="text-gray-400 text-sm">
                        {object.toolname}
                      </h1>
                    </div>
                    <div className=" rounded-xl">
                      <svg width="20" height="20">
                        <rect
                          width="15"
                          height="15"
                          style={{
                            fill: object.color,
                          }}
                        />
                      </svg>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </aside>
        <div>
          <Panel>
            <DrawableArea className="block" LabelImage={image_url} />
          </Panel>
        </div>
      </div>
    </div>
  );
}

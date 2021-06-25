import React, { useContext, Fragment } from "react"
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import EditIcon from "@material-ui/icons/Edit";
import TimelineIcon from "@material-ui/icons/Timeline";
import { StoreContext } from "../../context/store";


export default function ToolBar(props) {
  const { toolmode, setToolMode, setLines } = useContext(StoreContext)

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
  return (
    <>
      <aside className="z-40 w-48 bg-gray-800  shadow-xl">
        <div className="flex flex-col ">
          <div className="mt-20 mb-5 ">
            <div className="flex justify-center">
              <div className="grid grid-cols-1">
                <button className="w-8 h-8" > <i className="fas fa-arrow-circle-up text-white text-2xl hover:text-green-400 "></i></button>
              </div>
            </div>
            <div className="mt-2 flex justify-center">
              <div className="grid grid-cols-2">
                <button className="mx-5 w-8 h-8" > <i className="fas fa-arrow-circle-left text-white text-2xl hover:text-green-400 "></i></button>
                <button className="mx-5 w-8 h-8" > <i className="fas fa-arrow-circle-right text-white text-2xl hover:text-green-400 "></i></button>
              </div>
            </div>
            <div className="mt-2 flex justify-center">
              <div className="grid grid-cols-1">
                <button className="w-8 h-8" > <i className="fas fa-arrow-circle-down text-white text-2xl hover:text-green-400 "></i></button>
              </div>
            </div>
          </div>
          <div className="flex justify-start ">
            <h1 className="mt-4 p-3 title text-green-400">Object</h1>
          </div>
          <div className="mb-2 overflow-y-auto">
            {mockObject.map((object, id) => (
              <button
                key={id}

                className="shadow-xl p-3 bg-gray-800 w-72 h-14 text-white hover:bg-gray-700"
              >
                <div className="grid grid-cols-4 gap-1">
                  <div> {object.icon}</div>

                  <div style={{
                    fontSize: "10px"
                  }} className="text-sm">
                    {object.name}
                    <h1 style={{
                      fontSize: "10px"
                    }} className="text-gray-400 text-sm">{object.toolname}</h1>
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
          <div className="m-10 grid grid-rows-1 gap-5">
            <button className="m-2 p-2 text-white bg-red-400 ring-2 ring-red-300 w-24 rounded-2xl hover:bg-red-500"
              onClick={
                () => {
                  setLines([])

                }
              }>RESET</button>
            <button className="m-2 p-2 text-white bg-green-400 ring-2 ring-green-300 w-24 rounded-2xl hover:bg-green-500">SUBMIT</button>
          </div>

        </div>
      </aside>
    </>
  );
}

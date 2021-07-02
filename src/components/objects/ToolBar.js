import React, { useContext, Fragment } from "react"
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import EditIcon from "@material-ui/icons/Edit";
// import TimelineIcon from "@material-ui/icons/Timeline";
import { StoreContext } from "../../context/store";
import DeleteIcon from "@material-ui/icons/Delete";
import { IconButton, Tooltip } from "@material-ui/core";
export default function ToolBar(props) {
  const { elements, setElements, selectedElement, setSelectedElement } = useContext(StoreContext)


  return (
    <>
      <aside className="z-40 w-64 bg-gray-800 shadow-xl ">
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
            <h1 className="mt-4 p-3 title text-green-400">Annotation&nbsp;&nbsp;{elements.length}&nbsp;objects</h1>
          </div>
          <div className="mb-2 overflow-y-auto h-64 bg-gray-700 overflow-x-hidden">
            {elements.length > 0 ? elements.map((object) => (
              <button
                key={object.uuid_key}
                onClick={
                  () => {
                    setSelectedElement(object.uuid_key)
                  }
                }
                className={selectedElement === object.uuid_key ? `shadow-xl p-2 bg-gray-800 w-72 h-14 text-white hover:bg-gray-700` : `shadow-xl p-2 bg-green-800 w-72 h-14 text-white hover:bg-green-700 border-2 border-green-700`}

              >
                <div className="grid grid-cols-6 gap-5">
                  <div>
                    {!selectedElement === object.uuid_key ? <CheckBoxOutlineBlankIcon /> : <CheckBoxIcon />}
                  </div>
                  <div>
                    <svg width="25" height="25">
                      <rect
                        width="25"
                        height="25"
                        style={{
                          fill: `rgba(${object.toolColor['r']},
                          ${object.toolColor['g']},
                          ${object.toolColor['b']},
                          ${1})`
                        }}
                      />
                    </svg>
                  </div>
                  <div className="truncate">
                    {object.objectname}
                    <div style={{
                      fontSize: "10px"
                    }} className="text-sm truncate">
                      Mode:&nbsp;{object.toolmode}

                    </div>
                  </div>
                  <div>
                    <Tooltip title="Edit">
                      <IconButton onClick={
                        () => {


                        }}><EditIcon className="text-blue-500" /></IconButton>
                    </Tooltip>
                  </div>
                  <div>
                    <Tooltip title="Delete">
                      <IconButton onClick={
                        () => {
                          var index = object.uuid_key
                          console.log(index)
                          if (elements.length !== 0) {
                            elements.splice(index, 1);
                          }

                        }}><DeleteIcon className="text-red-500" /></IconButton>
                    </Tooltip>
                  </div>
                </div>
              </button>
            )) : null}

          </div>
          <div className="m-10 grid grid-rows-1 gap-5">
            <button className="m-2 p-2 text-white bg-red-400 ring-2 ring-red-300 w-24 rounded-2xl hover:bg-red-500"
              onClick={
                () => {
                  setElements([])

                }
              }>RESET</button>
            <button className="m-2 p-2 text-white bg-green-400 ring-2 ring-green-300 w-24 rounded-2xl hover:bg-green-500">SUBMIT</button>
          </div>

        </div>
      </aside>
    </>
  );
}

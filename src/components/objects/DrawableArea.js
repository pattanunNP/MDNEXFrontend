import React, {
  useState,
  useRef,
  useContext,
} from "react";
// import { Paper, Typography, TextField } from "@material-ui/core";
import { StoreContext } from "../../context/store";
import { Stage, Layer, Image, Rect, Text, Group } from 'react-konva';
import useImage from "use-image";
// import { Html } from "react-konva-utils"

function CreateElement(id, clientX1, clientY1, clientX2, clientY2, toolmode, toolColor, opacity) {
  let objectname = `${toolmode}#${id}`


  return {
    id,
    clientX1,
    clientY1,
    clientX2,
    clientY2,
    toolmode,
    objectname,
    toolColor,
    opacity
  }



}


// const useHistory = initialState => {
//   const [index, setIndex] = useState(0);
//   const [history, setHistory] = useState([initialState]);

//   const setState = (action, overwrite = false) => {
//     const newState = typeof action === "function" ? action(history[index]) : action;
//     if (overwrite) {
//       const historyCopy = [...history];
//       historyCopy[index] = newState;
//       setHistory(historyCopy);
//     } else {
//       const updatedState = [...history].slice(0, index + 1);
//       setHistory([...updatedState, newState]);
//       setIndex(prevState => prevState + 1);
//     }
//   };

// const undo = () => index > 0 && setIndex(prevState => prevState - 1);
// const redo = () => index < history.length - 1 && setIndex(prevState => prevState + 1);

// // return [history[index], setState, undo, redo];
// // };

export default function DrawableArea(props) {

  // const { lines, setLines } = useContext(StoreContext)
  const isDrawing = useRef(false);
  const [elements, setElements] = useState([]);
  // const [selectedElement, setSelectedElement] = useState(null);

  const [image] = useImage(props.image_url)

  const { filter_brightness, filter_contrast, opacity, toolmode, toolColor } = useContext(StoreContext);




  const updateElement = (id, x1, y1, x2, y2, toolmode) => {
    const updatedElement = CreateElement(id, x1, y1, x2, y2, toolmode, toolColor, opacity);

    const elementsCopy = [...elements];
    elementsCopy[id] = updatedElement;
    setElements(elementsCopy, true);
  };


  const handleMouseEnter = (event) => {
    const container = event.target.getStage().container();

    if (toolmode === "bbox") {
      container.style.cursor = "crosshair";
    }
    else if (toolmode === "selection") {
      container.style.cursor = "pointer";
    }
  }
  const handleMouseDown = (event) => {

    isDrawing.current = true;
    const id = elements.length;
    const pos = event.target.getStage().getPointerPosition();
    if (toolmode === "selection") {

    }
    const element = CreateElement(id, pos.x, pos.y, pos.x, pos.y, toolmode, toolColor, opacity)
    setElements(prevState => [...prevState, element])

  };

  const handleMouseMove = (e) => {
    const pos = e.target.getStage().getPointerPosition();

    if (!isDrawing.current === true) return;
    const index = elements.length - 1;
    // console.log(elements[index])
    const { clientX1, clientY1 } = elements[index];
    updateElement(index, clientX1, clientY1, pos.x, pos.y, toolmode, opacity);




  };

  const handleMouseUp = (e) => {
    isDrawing.current = false;



  };

  // const checkDeselect = (e) => {
  //   // deselect when clicked on empty area
  //   const clickedOnEmpty = e.target === e.target.getStage();
  //   if (clickedOnEmpty) {
  //     setSelectedElement(null);
  //   }
  // };


  //  console.log(toolmode)

  return (

    <Stage

      width={props.img_width}
      height={props.img_height}
      onMouseEnter={handleMouseEnter}
      onMouseDown={handleMouseDown}
      onMousemove={handleMouseMove}
      onMouseup={handleMouseUp}
      onTouchMove={handleMouseMove}
      onTouchStart={handleMouseDown}
      onTouchEnd={handleMouseUp}
      style={{
        filter: `brightness(${filter_brightness}%) contrast(${filter_contrast}%)`
      }}
    >


      <Layer>
        <Image image={image} />
      </Layer>



      <Layer>

        {elements.map(element => {
          const tool_mode = element.toolmode
          if (tool_mode === "bbox") {
            return (
              <Group key={element.id}>
                {/* {selectedElement === element.id ? <Html>
                  <div className="m-5 p-2 bg-white rounded-4xl">
                    <Paper className="">
                      <Typography>
                        <h1>Name Class</h1>
                      </Typography>
                      <TextField></TextField>
                    </Paper>
                  </div>
                </Html> : null} */}

                <Text
                  text={`${element.objectname}`}
                  x={element.clientX1 - 20}
                  y={element.clientY1 - 20}
                  fill={
                    `rgba(${element.toolColor['r']},
                    ${element.toolColor['g']},
                    ${element.toolColor['b']},
                    ${1})`} />

                <Rect

                  x={element.clientX1}
                  y={element.clientY1}
                  width={element.clientX2 - element.clientX1}
                  height={element.clientY2 - element.clientY1}
                  scaleX={1}
                  scaleY={1}
                  fill={`rgba(${element.toolColor['r']},
                      ${element.toolColor['g']},
                      ${element.toolColor['b']},
                      ${element.opacity / 200})`}
                  stroke={`rgba(${element.toolColor['r']},
                        ${element.toolColor['g']},
                        ${element.toolColor['b']},
                        ${element.opacity / 200})`}
                  strokeWidth={4}

                />

              </Group>


            )
          } else {
            return null;
          }
        }
        )
        }

      </Layer>
    </Stage >
  );
}

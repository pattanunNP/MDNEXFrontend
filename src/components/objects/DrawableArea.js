import React, {
  useState,
  useRef,
  useContext,
} from "react";

import { StoreContext } from "../../context/store";
import { Stage, Layer, Image, Rect, Text, Circle } from 'react-konva';
import useImage from "use-image";
import Rectangle from "../objects/AnnotationTool/Rectangle/Rectangle"


function CreateElement(id, clientX1, clientY1, clientX2, clientY2, toolmode, toolColor, opacity) {
  let objectname = `${toolmode}#${id}`
  if (toolmode === "bbox") {

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

}


const useHistory = initialState => {
  const [index, setIndex] = useState(0);
  const [history, setHistory] = useState([initialState]);

  const setState = (action, overwrite = false) => {
    const newState = typeof action === "function" ? action(history[index]) : action;
    if (overwrite) {
      const historyCopy = [...history];
      historyCopy[index] = newState;
      setHistory(historyCopy);
    } else {
      const updatedState = [...history].slice(0, index + 1);
      setHistory([...updatedState, newState]);
      setIndex(prevState => prevState + 1);
    }
  };

  const undo = () => index > 0 && setIndex(prevState => prevState - 1);
  const redo = () => index < history.length - 1 && setIndex(prevState => prevState + 1);

  return [history[index], setState, undo, redo];
};

export default function DrawableArea(props) {

  // const { lines, setLines } = useContext(StoreContext)
  const isDrawing = useRef(false);
  const [elements, setElements] = useState([]);
  const [selectedElement, setSelectedElement] = useState(null);

  const [image] = useImage(props.image_url)

  const { filter_brightness, filter_contrast, opacity, toolmode, toolColor, setToolMode } = useContext(StoreContext);




  const updateElement = (id, x1, y1, x2, y2, toolmode) => {
    const updatedElement = CreateElement(id, x1, y1, x2, y2, toolmode);

    const elementsCopy = [...elements];
    elementsCopy[id] = updatedElement;
    setElements(elementsCopy, true);
  };

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
    updateElement(index, clientX1, clientY1, pos.x, pos.y, toolmode);



  };

  const handleMouseUp = (e) => {
    isDrawing.current = false;


  };

  const checkDeselect = (e) => {
    // deselect when clicked on empty area
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      setSelectedElement(null);
    }
  };


  console.log(toolmode)

  return (

    <Stage

      width={props.img_width}
      height={props.img_height}
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
        {elements.length > 0 ? (
          elements.map((element) => {

            if (element.toolmode === "bbox") {
              // console.log(element.objectname, element.clientX1, element.clientY1, element.clientX2 - element.clientX1, element.clientY2 - element.clientY1, element.toolColor)
              return (

                <Rectangle

                  objectname={element.objectname}
                  clientX1={element.clientX1}
                  clientY1={element.clientY1}
                  clientX2={element.clientX2}
                  clientY2={element.clientY2}
                  toolColor={element.toolColor}
                  opacity={element.opacity}

                />
              )
            }
          })
        ) : null}




      </Layer>
    </Stage>
  );
}

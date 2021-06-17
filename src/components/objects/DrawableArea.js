import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useContext,
} from "react";
import { StoreContext } from "../../context/store";
export default function DrawableArea(props) {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isPressing, setIsPressing] = useState(false);
  const { filter_brightness, filter_contrast } = useContext(StoreContext);
  // const [strokeHistory, setStrokeHistory] = useState([]);

  // const [isInteface, setIsInteface] = useState(false);

  // const drawInterface = useCallback(
  //   (pointer, brush) => {
  //     if (props.hideInterface) return;

  //     setIsInteface(true);
  //     // Draw brush preview
  //     contextRef.current.beginPath();
  //     contextRef.current.fillStyle = "#2941E5";
  //     contextRef.current.arc(brush.x, brush.y, 2, 0, Math.PI * 2, true);
  //     contextRef.current.fill();

  //     // Draw mouse point (the one directly at the cursor)
  //     contextRef.current.beginPath();
  //     contextRef.current.fillStyle = "#FFCA28";
  //     contextRef.current.arc(pointer.x, pointer.y, 4, 0, Math.PI * 2, true);
  //     contextRef.current.fill();
  //   },
  //   [props.hideInterface]
  // );

  // const FiltersImage = useCallback((canvas)=>{
  //   return canvas.getImageData(0,0,canvas.width,canvas.height);

  // },[])

  const drawImg = useCallback(() => {
    if (!props.LabelImage) {
      return;
    }
    const Label = new Image();

    Label.onload = () => {
      var canvas = canvasRef.current;
      var hRatio = canvas.width / Label.width;
      var vRatio = canvas.height / Label.height;
      var ratio = Math.min(hRatio, vRatio);
      var centerShift_x = (canvas.width - Label.width * ratio) / 2;
      var centerShift_y = (canvas.height - Label.height * ratio) / 2;
      contextRef.current.clearRect(0, 0, canvas.width, canvas.height);
      console.log(canvas.height);
      contextRef.current.drawImage(
        Label,
        0,
        0,
        Label.width,
        Label.height,
        centerShift_x,
        centerShift_y,
        Label.width * ratio,
        Label.height * ratio
      );
    };
    Label.src = props.LabelImage;
  }, [props.LabelImage]);

  useEffect(() => {
    const canvas = canvasRef.current;

    canvas.width = 400;
    canvas.height = 500;

    canvas.style.width = `${400}px`;
    canvas.style.height = `${500}px`;

    const context = canvas.getContext("2d");

    context.lineCap = "round";
    context.strokeStyle = "#FFCA28";
    context.lineWidth = 2;
    contextRef.current = context;
    // drawInterface();
    drawImg();
  }, [drawImg]);

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;

    console.log(`X: ${offsetX}, Y:${offsetY}`);

    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
    setIsPressing(true);
  };

  const finishDrawing = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
    setIsPressing(false);
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) {
      return;
    }
    if (!isPressing) {
      return;
    }

    const { offsetX, offsetY } = nativeEvent;
    console.log(`X: ${offsetX}, Y:${offsetY}`);

    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
  };

  // const undoDraw = () => {
  //   var canvas = canvasRef.current;
  //   contextRef.current.clearRect(0, 0, canvas.width, canvas.height);
  //   strokeHistory.map((stroke) => {
  //     if (strokeHistory.length === 0) {
  //       return;
  //     }
  //     contextRef.current.beginPath();
  //     let strokePath = [];
  //     stroke.map((point) => {
  //       strokePath.push(point);
  //       console.log(point);
  //     });
  //   });
  // };
  return (
    <canvas
      onMouseDown={startDrawing}
      onMouseUp={finishDrawing}
      onMouseMove={draw}
      onTouchStart={startDrawing}
      onTouchMove={draw}
      onTouchEnd={finishDrawing}
      ref={canvasRef}
      style={{
        filter: `brightness(${filter_brightness}%) contrast(${filter_contrast}%)`,
      }}
    />
  );
}

import React, {


  useRef,

  useContext,
} from "react";

import { StoreContext } from "../../context/store";

import { Stage, Layer, Line, Image } from 'react-konva';
import useImage from 'use-image';


export default function DrawableArea(props) {
  // const canvasRef = useRef(null);
  // const contextRef = useRef(null);
  const { lines, setLines } = useContext(StoreContext)
  const isDrawing = useRef(false);


  const image_url =
    "https://res.cloudinary.com/image-chatbot/image/upload/v1623427911/MD_NEX/image2_htrtd9.png";


  const [image] = useImage(image_url);

  // const [isPressing, setIsPressing] = useState(false);
  const { opacity, toolmode } = useContext(StoreContext);

  // const { filter_brightness, filter_contrast, opacity, toolmode } = useContext(StoreContext);





  const handleMouseDown = (e) => {
    isDrawing.current = true;
    ;
    const pos = e.target.getStage().getPointerPosition();

    setLines([...lines, { toolmode, points: [pos.x, pos.y] }]);
    // console.log(lines)
  };

  const handleMouseMove = (e) => {
    // no drawing - skipping
    if (!isDrawing.current) {
      return;
    }

    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    let lastLine = lines[lines.length - 1];
    // add point
    lastLine.points = lastLine.points.concat([point.x, point.y]);

    // replace last
    lines.splice(lines.length - 1, 1, lastLine);
    setLines(lines.concat());

  };

  const handleMouseUp = () => {

    isDrawing.current = false;


  };

  return (

    <Stage
      width={window.innerWidth}
      height={window.innerHeight}
      onMouseDown={handleMouseDown}
      onMousemove={handleMouseMove}
      onMouseup={handleMouseUp}
      onTouchMove={handleMouseMove}
      onTouchStart={handleMouseDown}
      onTouchEnd={handleMouseUp}
    >
      <Layer>
        <Image image={image} />

        {lines.map((line, i) => (
          <Line
            key={i}
            points={line.points}
            stroke={`rgba(255,25,255,${(opacity / 200) + 0.1})`}
            strokeWidth={3}
            tension={0.1}

            lineCap="round"
            fill={`rgba(255,25,255,${opacity / 200})`}
            globalCompositeOperation={
              line.toolmode === 'eraser' ? 'destination-out' : 'source-over'
            }
          />
        ))}
      </Layer>
    </Stage>
  );
}

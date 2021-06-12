import React, { useState, useEffect, useRef, useCallback } from "react";

export default function DrawableArea(props) {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isPressing, setIsPressing] = useState(false);

  const drawImg = useCallback(() => {
    if (!props.LabelImage) {
      return;
    }
    const Label = new Image();

    Label.src = props.LabelImage;
    Label.onload = () => contextRef.current.drawImage(Label, 400, 40);
  }, [props.LabelImage]);

  useEffect(() => {
    const canvas = canvasRef.current;

    canvas.width = window.innerWidth * 2;
    canvas.height = window.innerHeight * 2;

    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;

    const context = canvas.getContext("2d");
    context.scale(2, 2);
    context.lineCap = "round";
    context.strokeStyle = "black";
    context.lineWidth = 5;
    contextRef.current = context;
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

  return (
    <canvas
      onMouseDown={startDrawing}
      onMouseUp={finishDrawing}
      onMouseMove={draw}
      onTouchStart={startDrawing}
      onTouchMove={draw}
      onTouchEnd={finishDrawing}
      ref={canvasRef}
    />
  );
}

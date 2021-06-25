import React, { useEffect, useRef } from 'react';
import { Rect, Group, Text, Transformer } from 'react-konva';

export default function Rectangle({ objectname, clientX1, clientY1, clientX2, clientY2, toolColor, opacity, isSelected, onSelect, onChange }) {

    const shapeRef = useRef();
    const trRef = useRef();

    useEffect(() => {
        if (isSelected) {
            // we need to attach transformer manually
            trRef.current.nodes([shapeRef.current]);
            trRef.current.getLayer().batchDraw();
        }
    }, [isSelected]);


    return (
        <>
            <Group >
                <Text
                    text={`${objectname}`}
                    x={clientX1 - 20}
                    y={clientY1 - 20}
                    fill={
                        `rgba(${toolColor['r']},${toolColor['g']},${toolColor['b']},${1})`} />

                <Rect
                    // onClick={onSelect}
                    // onTap={onSelect}

                    x={clientX1}
                    y={clientY1}
                    width={clientX2 - clientX1}
                    height={clientY2 - clientY1}
                    scaleX={1}
                    scaleY={1}
                    fill={`rgba(${toolColor['r']},${toolColor['g']},${toolColor['b']},${opacity / 200})`}
                    stroke={`rgba(${toolColor['r']},${toolColor['g']},${toolColor['b']},${opacity / 200})`}
                    strokeWidth={4}



                // onDragEnd={(e) => {
                //     onChange({

                //         x: e.target.x(),
                //         y: e.target.y(),
                //     });
                // }}
                // onTransformEnd={(e) => {
                //     // transformer is changing scale of the node
                //     // and NOT its width or height
                //     // but in the store we have only width and height
                //     // to match the data better we will reset scale on transform end
                //     const node = shapeRef.current;
                //     const scaleX = node.scaleX();
                //     const scaleY = node.scaleY();

                //     // we will reset it back
                //     node.scaleX(1);
                //     node.scaleY(1);
                //     onChange({

                //         x: node.x(),
                //         y: node.y(),
                //         // set minimal value
                //         width: Math.max(5, node.width() * scaleX),
                //         height: Math.max(node.height() * scaleY),
                //     });
                // }}

                />

            </Group>
            {isSelected && (
                <Transformer
                    ref={trRef}
                    boundBoxFunc={(oldBox, newBox) => {
                        // limit resize
                        if (newBox.width < 5 || newBox.height < 5) {
                            return oldBox;
                        }
                        return newBox;
                    }}
                />
            )}
        </>

    )
}
import React, { useRef } from "react";

import PanelHeader from "./components/PanelHeader";

import "./styles.css";

const Panel = ({ children }) => {
  const panelRef = useRef(null);

  const handleDrag = (movementX, movementY) => {
    const panel = panelRef.current;
    if (!panel) return;

    const { x, y } = panel.getBoundingClientRect();

    panel.style.left = `${x + movementX}px`;
    panel.style.top = `${y + movementY}px`;
  };

  return (
    <div className="bg-none fixed" ref={panelRef}>
      <PanelHeader onDrag={handleDrag} />

      <div>{children}</div>
    </div>
  );
};

export default Panel;

import React from "react";

import LabelBrowser from "../../../components/objects/LabelBrowser";
import TopBar from "../../../components/objects/TopBar";
import ToolBar from "../../../components/objects/ToolBar";
import DrawableArea from "../../../components/objects/DrawableArea";
import Panel from "../../../components/objects/Panel/Panel";

export default function Labeltool() {
  const image_url =
    "https://res.cloudinary.com/image-chatbot/image/upload/v1623427911/MD_NEX/image2_htrtd9.png";

  return (
    <div className="w-screen bg-gray-600">
      <TopBar />
      <div className="flex justify-between">
        <LabelBrowser />
        <Panel className="flex justify-content-center">
          {" "}
          <DrawableArea LabelImage={image_url} />
        </Panel>

        <ToolBar />
      </div>
    </div>
  );
}

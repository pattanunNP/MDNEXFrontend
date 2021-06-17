import React, { useContext } from "react";
import { StoreContext } from "../../../context/store";
import LabelBrowser from "../../../components/objects/LabelBrowser";
import TopBar from "../../../components/objects/TopBar";
import ToolBar from "../../../components/objects/ToolBar";
import DrawableArea from "../../../components/objects/DrawableArea";
import Panel from "../../../components/objects/Panel/Panel";

export default function Labeltool() {
  const image_url =
    "https://res.cloudinary.com/image-chatbot/image/upload/v1623427911/MD_NEX/image2_htrtd9.png";

  const { filter_brightness, filter_contrast } = useContext(StoreContext);

  return (
    <div className="w-screen bg-gray-600">
      <TopBar />
      <div className="flex justify-between">
        <LabelBrowser />
        <Panel className="relative">
          <DrawableArea
            className="absolute inset-0"
            LabelImage={image_url}
            filter_brightness={filter_brightness}
            filter_contrast={filter_contrast}
          />
        </Panel>

        <ToolBar />
      </div>
    </div>
  );
}

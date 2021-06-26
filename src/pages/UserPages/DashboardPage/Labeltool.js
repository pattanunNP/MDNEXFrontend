import React, { useContext } from "react";
import { StoreContext } from "../../../context/store";
import Panel from "../../../components/objects/Panel/Panel"
import DrawableArea from "../../../components/objects/DrawableArea";
import LabelBrowser from "../../../components/objects/LabelBrowser"
import TopBar from "../../../components/objects/TopBar";
import ToolBar from "../../../components/objects/ToolBar";
// import { useParams } from "react-router-dom";

export default function Labeltool() {

  const image_url =
    "https://res.cloudinary.com/image-chatbot/image/upload/v1623427911/MD_NEX/image4_wdnlm0.png";

  // let { project } = useParams();

  // let { dataset } = useParams();

  const { filter_brightness, filter_contrast } = useContext(StoreContext);

  return (<>
    <div className="w-screen bg-gray-600">
      <TopBar />

      <div className="flex justify-between">
        <LabelBrowser />


        <Panel className="relative">
          <DrawableArea
            className="absolute inset-0"
            image_url={image_url}
            img_width={512}
            img_height={406}
            filter_brightness={filter_brightness}
            filter_contrast={filter_contrast}
          />
        </Panel>

        <ToolBar />

      </div>

    </div>

  </>
  );
}

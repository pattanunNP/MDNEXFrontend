import React, { useContext } from "react";
import { StoreContext } from "../../../context/store";
import Panel from "../../../components/objects/Panel/Panel"
import DrawableArea from "../../../components/objects/DrawableArea";
import LabelBrowser from "../../../components/objects/LabelBrowser"
import TopBar from "../../../components/objects/TopBar";
import ToolBar from "../../../components/objects/ToolBar";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import axios from "axios"



async function FetchImage(path) {
  const url = process.env.REACT_APP_API_URL;
  const access_token = sessionStorage.getItem("access_token");
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${access_token}`,
  };

  const response = await axios.get(`${url}${path}`, { headers: headers });

  if (!response.statusText === "OK") {
    const error = new Error("An error occurred while fetching the data.");
    // Attach extra info to the error object.
    error.info = await response.data;
    error.status = response.status;
    throw error;
  }
  console.log(response.data);
  return response.data
}

export default function Labeltool() {


  let { project_id } = useParams();

  let { dataset_id } = useParams();

  let { file_id } = useParams();


  const options = { suspense: true };
  const { data: image } = useSWR(
    `/api/v1/labeling/getimage?project_id=${project_id}&dataset_id=${dataset_id}&file_id=${file_id}`,
    FetchImage,
    options
  );

  const { filter_brightness, filter_contrast } = useContext(StoreContext);

  return (<>
    <div className="w-screen bg-gray-600">
      <TopBar />

      <div className="flex justify-between">
        <LabelBrowser />


        <Panel className="relative">
          <DrawableArea
            className="absolute inset-0"
            image_url={image['file_url']}
            img_width={image['file_metadata']['width']}
            img_height={image['file_metadata']['height']}
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

import React, { useContext } from "react";
import { StoreContext } from "../../../context/store";
import Panel from "../../../components/objects/Panel/Panel"
import DrawableArea from "../../../components/objects/DrawableArea";
import LabelBrowser from "../../../components/objects/LabelBrowser"
import TopBar from "../../../components/objects/TopBar";
import ToolBar from "../../../components/objects/ToolBar";
import { useParams, useLocation } from "react-router-dom";
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
  // console.log(response.data);
  return response.data
}

export default function Labeltool() {
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  let query = useQuery();
  let { task_id } = useParams();
  let queue_id = query.get("queue_id")

  const options = { suspense: true };
  const { data: image } = useSWR(
    `/api/v1/labeling/getimage?task_id=${task_id}&queue_id=${queue_id}`,
    FetchImage,
    options
  );

  const { filter_brightness, filter_contrast } = useContext(StoreContext);

  return (<>
    <div className="w-screen bg-gray-600">
      <TopBar />

      <div className="flex justify-between">
        <LabelBrowser task_id={task_id} />


        <Panel className="relative">
          <DrawableArea
            className="absolute inset-0"
            image_url={image['image']['file_url']}
            img_width={image['image']['file_metadata']['width']}
            img_height={image['image']['file_metadata']['height']}
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

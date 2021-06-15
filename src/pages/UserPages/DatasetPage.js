import React from "react";
import axios from "axios";
import { Paper } from "@material-ui/core";
import useSWR from "swr";
import { useParams } from "react-router-dom";
import SearchBox from "../../components/objects/SearchBox";
import Sidenavbar from "../../components/objects/Sidenavbar";
async function FetchDataset(path) {
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
  return response.data;
}

export default function DatasetPage() {
  let { uuid } = useParams();

  const options = { suspense: true };

  const { data: dataset } = useSWR(
    `/api/v1/dataset/${uuid}`,
    FetchDataset,
    options
  );
  function ConvertTime(timestamp) {
    const time = new Date(timestamp).toLocaleDateString("en-TH", {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "long",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    return time;
  }
  return (
    <div className="bg-right-top bg-auto bg-no-repeat bg-fixed bg-mainbackground2 flex h-screen">
      <Sidenavbar />

      <div className="flex flex-col flex-1 w-full overflow-y-auto">
        <header className="grid justify-items-stretch py-1 bg-gray-800 h-16">
          <div className="flex justify-center">
            <SearchBox />
          </div>
        </header>

        <main>
          <div className="mt-10 pb-10 px-8 mx-4 rounded-3xl">
            <Paper className="w-full flex justify-center shadow-md ">
              <div className="w-full h-64 bg-red-100 relative">
                <div
                  className="absolute inset-0 bg-cover bg-center z-0"
                  style={{
                    backgroundImage: `url(${dataset.dataset_thumbnail})`,
                  }}
                ></div>
                <div className="p-5 opacity-100 absolute inset-0 z-10 flex justify-start items-center text-6xl text-white font-semibold">
                  {dataset.dataset_name}
                </div>
                <div className="p-5 absolute inset-50 z-10 flex justify-start items-start text-xl text-white font-semibold">
                  Created : {ConvertTime(dataset.dataset_created_time)}
                </div>
                <div class="absolute bottom-5 left-5 h-16 w-full text-white text-2xl font-semibold opacity-90 ">
                  {dataset.dataset_description}
                </div>
              </div>
            </Paper>
          </div>
          <div className="pb-10 px-8 mx-4 rounded-3xl ">
            <Paper className="w-full shadow-3xl h-screen p-10">
              <div className="flex justify-center container mx-auto overflow-y-auto h-full w-full">
                <div className="mt-10 grid grid-cols-10 gap-1">
                  {dataset.dataset_files.length > 0 ? (
                    dataset.dataset_files.map((image) => (
                      <div key={image[0].file_uuid}>
                        <img
                          alt="data"
                          src={image[0].files_url}
                          className="h-48 w-48 opacity-100 object-cover hover:opacity-80"
                        />
                        {/* <p>{image[0].filename}</p> */}
                      </div>
                    ))
                  ) : (
                    <div>
                      <h1 className="text-xl font-semibold text-gray-500">
                        Your don't have any projects
                      </h1>
                    </div>
                  )}
                </div>
              </div>
            </Paper>
          </div>
        </main>
      </div>
    </div>
  );
}

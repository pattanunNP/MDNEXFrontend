import React, { useState, useEffect } from "react";
import axios from "axios";
import { Paper } from "@material-ui/core";

import { useParams } from "react-router-dom";
import SearchBox from "../../components/objects/SearchBox";
import Sidenavbar from "../../components/objects/Sidenavbar";

// import { StoreContext } from "../../context/store";
export default function ProjectPage() {
  let { uuid } = useParams();

  let baseUrl = process.env.REACT_APP_API_URL;
  const access_token = sessionStorage.getItem("access_token");
  // const { userData } = useContext(StoreContext);
  const [info, setInfo] = useState({});

  useEffect(() => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    };
    const fetchData = () => {
      axios(`${baseUrl}/api/v1/project/${uuid}`, { headers: headers }).then(
        (response) => {
          setInfo(response.data);
        }
      );
    };
    fetchData();
  }, [uuid, baseUrl, access_token]);
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
            <Paper className="w-full flex justify-center shadow-md">
              <div className="w-full h-64 bg-red-100 relative">
                <div
                  className="absolute inset-0 bg-cover bg-center z-0"
                  style={{
                    backgroundImage: `url(${info.project_thumbnail})`,
                  }}
                ></div>
                <div className="p-5 opacity-100 absolute inset-0 z-10 flex justify-start items-center text-6xl text-white font-semibold">
                  {info.project_name}
                </div>
                <div className="p-5 opacity-80 absolute inset-50 z-10 flex justify-start items-start text-xl text-white font-semibold">
                  Created : {ConvertTime(info.project_created_time)}
                </div>
                <div class="absolute bottom-5 left-5 h-16 w-full text-white text-2xl font-semibold opacity-90 ">
                  {info.project_description}
                </div>
              </div>
            </Paper>
          </div>
        </main>
      </div>
    </div>
  );
}

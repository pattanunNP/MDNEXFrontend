import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Stat from "../../components/Content/Stat";
import ProjectsTabel from "../../components/Content/ProjectsTabel";
import ActivitysTabel from "../../components/Content/ActivitysTabel";
import Sidenavbar from "../../components/objects/Sidenavbar";
import useSWR from "swr";
import SearchBox from "../../components/objects/SearchBox";
import axios from "axios";
import AddCircleIcon from "@material-ui/icons/AddCircle";

import { StoreContext } from "../../context/store";

async function FetchData(path) {
  const url = process.env.REACT_APP_API_URL;
  const { setUserData } = useContext(StoreContext);
  const access_token = sessionStorage.getItem("access_token");
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${access_token}`,
  };
  const response = await axios.get(`${url}${path}`, { headers: headers });
  console.log(response);
  if (!response.statusText === "OK") {
    const error = new Error("An error occurred while fetching the data.");
    // Attach extra info to the error object.
    error.info = await response.data;
    error.status = response.status;
    throw error;
  }
  setUserData(response.data);
  return response.data;
}

async function FetchProjects(path) {
  const url = process.env.REACT_APP_API_URL;
  const access_token = sessionStorage.getItem("access_token");
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${access_token}`,
  };
  const { setUserProjects } = useContext(StoreContext);
  const response = await axios.get(`${url}${path}`, { headers: headers });
  console.log(response);
  if (!response.statusText === "OK") {
    const error = new Error("An error occurred while fetching the data.");
    // Attach extra info to the error object.
    error.info = await response.data;
    error.status = response.status;
    throw error;
  }
  setUserProjects(response.data.match);
  return response.data;
}
export default function Dashboard() {
  const options = { suspense: true };

  const { data: user } = useSWR("/api/v1/dashboard", FetchData, options);
  const { data: projects } = useSWR(
    "/api/v1/userprojects",
    FetchProjects,
    options
  );

  return (
    <div className="bg-right-top bg-auto bg-no-repeat bg-fixed bg-mainbackground2 flex h-screen">
      <Sidenavbar
        username={user.username}
        role={user.role}
        uuid={user.uuid}
        profileImage={user.profileImage}
      />

      <div className="flex flex-col flex-1 w-full overflow-y-auto">
        <header className="grid justify-items-stretch py-1 bg-gray-800 h-16">
          <div className="flex justify-center">
            <SearchBox />
          </div>
        </header>

        <main>
          <div className="mt-40 pb-10 px-8 mx-4 rounded-3xl">
            <Stat />
          </div>
          <div className="mb-3 px-8 mx-4 ">
            <div className="grid gap-2 grid-cols-4 lg:grid-cols-4">
              <Link to="/dashboard/projects/newproject">
                <button className="p-1 transition duration-500 ease-in-out bg-green-400 text-white w-48 font-bold rounded-full hover:bg-green-500 filter drop-shadow-lg  transform hover:-translate-y-1 hover:scale-10">
                  <AddCircleIcon />
                  Create New Project
                </button>
              </Link>
            </div>
          </div>
          <div className="z-10 col-span-12 mt-5">
            <ProjectsTabel data={projects} />
          </div>
          <div className="z-10 col-span-12 mt-5">
            <ActivitysTabel data />
          </div>
        </main>
      </div>
    </div>
  );
}

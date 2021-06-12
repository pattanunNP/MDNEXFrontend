import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Stat from "../../components/Content/Stat";
import ProjectsTabel from "../../components/Content/ProjectsTabel";
import ActivitysTabel from "../../components/Content/ActivitysTabel";
// import RefreshIcon from "@material-ui/icons/Refresh";
import Sidenavbar from "../../components/objects/Sidenavbar";
import useSWR from "swr";
import SearchBox from "../../components/objects/SearchBox";
import axios from "axios";
import AddCircleIcon from "@material-ui/icons/AddCircle";

import { StoreContext } from "../../context/store";

// import useDashboardFetch from "../../components/Hook/useDashboardFetch";

export default function Dashboard() {
  const { userData, userProjects, setUserData } = useContext(StoreContext);
  const url = process.env.REACT_APP_API_URL;
  const access_token = sessionStorage.getItem("access_token");
  const options = {};
  async function fetchData(path) {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    };
    await axios
      .get(`${url}${path}`, { headers: headers })
      .then((response) => {
        setUserData(response.json());
        console.log(response.json());
      })
      .catch((error) => {
        console.error(error.message);
      });
  }

  useSWR("/api/v1/dashboard", fetchData, options);

  return (
    <div className="bg-right-top bg-auto bg-no-repeat bg-fixed bg-mainbackground2 flex h-screen">
      <Sidenavbar
        username={userData.username}
        role={userData.role}
        uuid={userData.uuid}
        profileImage={userData.profileImage}
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
            <ProjectsTabel data={userProjects.match} />
          </div>
          <div className="z-10 col-span-12 mt-5">
            <ActivitysTabel data />
          </div>
        </main>
      </div>
    </div>
  );
}

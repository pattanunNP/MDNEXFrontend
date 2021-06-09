// import axios from "axios";
import React, { useContext } from "react";

import Stat from "../../components/Content/Stat";
import ProjectsTabel from "../../components/Content/ProjectsTabel";
import ActivitysTabel from "../../components/Content/ActivitysTabel";

import Sidenavbar from "../../components/objects/Sidenavbar";
import { CreateProject } from "../../components/Content/Create";

import SearchBox from "../../components/objects/SearchBox";

import AddCircleIcon from "@material-ui/icons/AddCircle";

import useDashboardFetch from "../../components/Hook/useDashboardFetch";
import ModalPop from "../../components/objects/Modal";

import { StoreContext } from "../../context/store";

export default function Dashboard() {
  const { userData, setOpenModal } = useContext(StoreContext);
  const url = process.env.REACT_APP_API_URL;
  const access_token = sessionStorage.getItem("access_token");
  useDashboardFetch(url, access_token);

  return (
    <div className="bg-right-top bg-auto bg-no-repeat bg-fixed bg-mainbackground2 flex h-screen">
      <Sidenavbar
        username={userData.username}
        role={userData.role}
        profileImage={userData.profileImage}
      />
      <ModalPop width={"500px"} height={"450px"} contents={CreateProject} />
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
              <button
                className="p-1 transition duration-500 ease-in-out bg-green-400 text-white w-48 font-bold rounded-full hover:bg-green-500 filter drop-shadow-lg  transform hover:-translate-y-1 hover:scale-10"
                onClick={() => {
                  setOpenModal(true);
                }}
              >
                <AddCircleIcon />
                Create New Project
              </button>
            </div>
          </div>
          <div className="z-10 col-span-12 mt-5">
            <ProjectsTabel data />
          </div>
          <div className="z-10 col-span-12 mt-5">
            <ActivitysTabel data />
          </div>
        </main>
      </div>
    </div>
  );
}

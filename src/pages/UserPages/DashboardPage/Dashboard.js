import React from "react";
import { Link } from "react-router-dom";
import AddCircleIcon from "@material-ui/icons/AddCircle";

import Stat from "../../../components/Content/Stat";
import ProjectsTabel from "../../../components/Content/ProjectsTabel";
import Sidenavbar from "../../../components/objects/Sidenavbar";
import SearchBox from "../../../components/objects/SearchBox";

export default function Dashboard() {
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
          <div className="mt-40 pb-10 px-8 mx-4 rounded-3xl">
            <Stat />
          </div>
          <div className="mb-3 px-8 mx-4">
            <div className="grid gap-5 grid-rows-2 lg:grid-rows-2">
              <Link to="/dashboard/projects/newproject">
                <button className="p-1 transition duration-500 ease-in-out bg-green-400 text-white w-48 font-bold rounded-full hover:bg-green-500 filter drop-shadow-lg  transform hover:-translate-y-1 hover:scale-10">
                  <AddCircleIcon className="mr-2" />
                  Create New Project
                </button>
              </Link>
              <Link to="/dashboard/teams/newteam">
                <button className="p-1 transition duration-500 ease-in-out bg-blue-400 text-white w-48 font-bold rounded-full hover:bg-blue-500 filter drop-shadow-lg  transform hover:-translate-y-1 hover:scale-10">
                  <AddCircleIcon className="mr-5" />
                  Create New Team
                </button>
              </Link>
            </div>
          </div>

          <div className="z-10 col-span-12 mt-5">
            <ProjectsTabel />
          </div>
        </main>
      </div>
    </div>
  );
}

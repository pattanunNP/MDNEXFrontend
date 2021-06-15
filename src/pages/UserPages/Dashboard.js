import React from "react";
import { Link } from "react-router-dom";
import Stat from "../../components/Content/Stat";
import ProjectsTabel from "../../components/Content/ProjectsTabel";
import ActivitysTabel from "../../components/Content/ActivitysTabel";
import Sidenavbar from "../../components/objects/Sidenavbar";
import SearchBox from "../../components/objects/SearchBox";
import AddCircleIcon from "@material-ui/icons/AddCircle";

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
            <ProjectsTabel />
          </div>
          <div className="z-10 col-span-12 mt-5">
            <ActivitysTabel data />
          </div>
        </main>
      </div>
    </div>
  );
}

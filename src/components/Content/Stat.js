import React, { useContext } from "react";

import PeopleIcon from "@material-ui/icons/People";
import PhotoLibraryIcon from "@material-ui/icons/PhotoLibrary";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import { StoreContext } from "../../context/store";
import useDashboardFetch from "../../components/Hook/useDashboardFetch";
export default function Stat() {
  let access_token = sessionStorage.getItem("access_token");
  let url = process.env.REACT_APP_API_URL;
  useDashboardFetch(url, access_token);
  const { userData } = useContext(StoreContext);

  return (
    <div className="z-10 static">
      <div className="grid grid-cols-12 gap-6">
        <a
          className="transform  hover:scale-105 transition duration-300 shadow-xl rounded-lg col-span-12 sm:col-span-6 xl:col-span-3 intro-y bg-white"
          href="/work"
        >
          <div className="p-5">
            <div className="my-4 flex justify-center">
              <PhotoLibraryIcon className="text-indigo-400" />
            </div>

            <div className="flex justify-center">
              <div className="mt-3 text-3xl font-bold">
                {userData.count_images === undefined
                  ? "Null"
                  : userData.count_images}
              </div>
            </div>
            <div className="flex justify-center">
              <div className="mt-4 text-base text-gray-600">Images</div>
            </div>
          </div>
        </a>

        <a
          className="transform  hover:scale-105 transition duration-300 shadow-xl rounded-lg col-span-12 sm:col-span-6 xl:col-span-3 intro-y bg-white"
          href="/work"
        >
          <div className="p-5">
            <div className="my-4 flex justify-center">
              <CheckCircleOutlineIcon className="text-green-400" />
            </div>

            <div className="flex justify-center">
              <div className="mt-3 text-3xl font-bold">
                {" "}
                {userData.count_projects === undefined
                  ? "Null"
                  : userData.count_projects}
              </div>
            </div>
            <div className="flex justify-center">
              <div className="mt-4 text-base text-gray-600">
                Active Projects
              </div>
            </div>
          </div>
        </a>
        <a
          className="transform hover:scale-105 transition duration-300 shadow-xl rounded-lg col-span-12 sm:col-span-6 xl:col-span-3 intro-y bg-white"
          href="/work"
        >
          <div className="p-5">
            <div className="my-4 flex justify-center">
              <PeopleIcon className="text-red-400" />
            </div>

            <div className="flex justify-center">
              <div className="mt-3 text-3xl font-bold">
                {userData.count_teams === undefined
                  ? "Null"
                  : userData.count_teams}
              </div>
            </div>
            <div className="flex justify-center">
              <div className="mt-4 text-base text-gray-600">Teams</div>
            </div>
          </div>
        </a>
        <a
          className="transform  hover:scale-105 transition duration-300 shadow-xl rounded-lg col-span-12 sm:col-span-6 xl:col-span-3 intro-y bg-white"
          href="/work"
        >
          <div className="p-5">
            <div className="my-4 flex justify-center">
              <AccessTimeIcon className="text-pink-300" />
            </div>
            <div className="flex justify-center">
              <div className="mt-3 text-2xl font-bold leading-8">
                Last edited project
              </div>
            </div>
            <div className="flex justify-center">
              <div className="mt-1 text-base text-gray-600">
                {userData.last_edit_projects === undefined
                  ? "Not Fround"
                  : userData.last_edit_projects}
              </div>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
}

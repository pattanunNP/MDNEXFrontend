import React from "react";
import PeopleIcon from "@material-ui/icons/People";
import PhotoLibraryIcon from "@material-ui/icons/PhotoLibrary";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import axios from "axios";
import useSWR from "swr";

async function FetchData(path) {
  const url = process.env.REACT_APP_API_URL;
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
  return response.data;
}
export default function Stat() {
  const options = { suspense: true };

  const { data: user } = useSWR("/api/v1/dashboard", FetchData, options);

  console.log(user);
  return (
    <div className="z-10 static">
      <div className="grid grid-cols-12 gap-6">
        <a
          className="transform  hover:scale-105 transition duration-300 shadow-xl rounded-lg col-span-12 sm:col-span-6 xl:col-span-3 intro-y bg-white"
          href="/dashboard/datasets/manage"
        >
          <div className="p-5">
            <div className="my-4 flex justify-center">
              <PhotoLibraryIcon className="text-indigo-400" />
            </div>

            <div className="flex justify-center">
              <div className="mt-3 text-3xl font-bold">
                {user.count_images === undefined ? "Null" : user.count_images}
              </div>
            </div>
            <div className="flex justify-center">
              <div className="mt-4 text-base text-gray-600">Images</div>
            </div>
          </div>
        </a>

        <a
          className="transform  hover:scale-105 transition duration-300 shadow-xl rounded-lg col-span-12 sm:col-span-6 xl:col-span-3 intro-y bg-white"
          href="/dashboard/projects/manage"
        >
          <div className="p-5">
            <div className="my-4 flex justify-center">
              <CheckCircleOutlineIcon className="text-green-400" />
            </div>

            <div className="flex justify-center">
              <div className="mt-3 text-3xl font-bold">
                {" "}
                {user.count_projects === undefined
                  ? "Null"
                  : user.count_projects}
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
          href="/dashboard/teams/manage"
        >
          <div className="p-5">
            <div className="my-4 flex justify-center">
              <PeopleIcon className="text-red-400" />
            </div>

            <div className="flex justify-center">
              <div className="mt-3 text-3xl font-bold">
                {user.count_projects === undefined ? "Null" : user.count_teams}
              </div>
            </div>
            <div className="flex justify-center">
              <div className="mt-4 text-base text-gray-600">Teams</div>
            </div>
          </div>
        </a>
        <a
          className="transform  hover:scale-105 transition duration-300 shadow-xl rounded-lg col-span-12 sm:col-span-6 xl:col-span-3 intro-y bg-white"
          href="/dashboard/projects/manage"
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
                {user.last_edit_projects === undefined
                  ? "Not Fround"
                  : user.last_edit_projects}
              </div>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
}

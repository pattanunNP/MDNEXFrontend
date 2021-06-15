import React, { useState } from "react";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import StorageIcon from "@material-ui/icons/Storage";
import SettingsIcon from "@material-ui/icons/Settings";
import BuildIcon from "@material-ui/icons/Build";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import { useHistory, Link } from "react-router-dom";
import { IconButton } from "@material-ui/core";
import AssignmentIcon from "@material-ui/icons/Assignment";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import axios from "axios";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import FadeIn from "react-fade-in";

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
export default function Sidenavbar(props) {
  const history = useHistory();
  const [opensidebar, setOpenSidebar] = useState(false);

  function handleLogout() {
    sessionStorage.removeItem("access_token");
    sessionStorage.removeItem("refresh_token");
    history.push("/login");
  }
  const options = { suspense: true };

  const { data: user } = useSWR("/api/v1/dashboard", FetchData, options);

  return (
    <div>
      {opensidebar ? (
        <FadeIn>
          <aside className="z-20 flex-shink-0 hidden w-60 h-screen pl-2 overflow-y-auto bg-gray-800 rounded-rb-2xl filter drop-shadow-lg md:block">
            <div>
              <div className="text-white">
                <div>
                  <div className="justify-self-start">
                    <IconButton
                      onClick={() => {
                        setOpenSidebar(false);
                      }}
                    >
                      <KeyboardArrowLeftIcon
                        style={{
                          width: "40px",
                          height: "40px",
                        }}
                        className="text-green-400 text-xl transition-colors duration-150 hover:text-green-500"
                      />
                    </IconButton>
                  </div>
                </div>
                <div className="flex justify-center">
                  <div className="grid grid-row-1">
                    <Link to="/">
                      <img alt="logo" src="/favicon.ico" className="w-20" />
                    </Link>
                    <Link to={`/profile/${props.uuid}`}>
                      <img
                        alt="user"
                        className=" my-5 hidden h-24 w-24 rounded-full sm:block object-cover mr-2 border-4 border-green-400"
                        src={
                          user.profileImage !== undefined
                            ? user.profileImage
                            : "https://image.flaticon.com/icons/png/512/149/149071.png"
                        }
                      />
                    </Link>

                    <p className="font-bold text-green-500 pt-2 text-center w-24">
                      {user.username}
                    </p>
                    <p className="font-normal  text-gray-200 pt-2 text-center w-24">
                      {user.role}
                    </p>

                    <div>
                      <ul className="mt-2 leading-10">
                        <li className="relative px-2 py-8 ">
                          <Link
                            className="inline-flex items-center w-full text-sm font-semibold text-green-400 transition-colors duration-150 cursor-pointer hover:text-green-700"
                            to="/dashboard"
                          >
                            <button>
                              <DashboardIcon />{" "}
                              <span className="ml-6">DASHBOARD</span>
                            </button>
                          </Link>
                        </li>
                        <li className="relative px-2 py-8 ">
                          <Link
                            className="inline-flex items-center w-full text-sm font-semibold text-green-400 transition-colors duration-150 cursor-pointer hover:text-green-700"
                            to="/dashboard"
                          >
                            <button>
                              <AssignmentIcon />{" "}
                              <span className="ml-6">MANAGE PROJECTS</span>
                            </button>
                          </Link>
                        </li>
                        <li className="relative px-2 py-8 ">
                          <Link
                            className="inline-flex items-center w-full text-sm font-semibold text-green-400 transition-colors duration-150 cursor-pointer hover:text-green-700"
                            to="dashboard/projects/manage"
                          >
                            <PeopleIcon />

                            <span className="ml-6">TEAMS</span>
                          </Link>
                        </li>
                        <li className="relative px-2 py-8 ">
                          <Link
                            className="inline-flex items-center w-full text-sm font-semibold text-green-400 transition-colors duration-150 cursor-pointer hover:text-green-700"
                            to="/dashboard/labeltool"
                          >
                            <BuildIcon />
                            <span className="ml-6">TOOLS</span>
                          </Link>
                        </li>
                        <li className="relative px-2 py-8 ">
                          <Link
                            className="inline-flex items-center w-full text-sm font-semibold text-green-400 transition-colors duration-150 cursor-pointer hover:text-green-700"
                            to="/dashboard/dataset/manage"
                          >
                            <StorageIcon />
                            <span className="ml-6">DATA</span>
                          </Link>
                        </li>
                        <li className="relative px-2 py-8">
                          <Link
                            className="inline-flex items-center w-full text-sm font-semibold text-green-400 transition-colors duration-150 cursor-pointer hover:text-green-700"
                            to="/dashboard/setting"
                          >
                            <SettingsIcon />
                            <span className="ml-6">SETTING</span>
                          </Link>
                        </li>
                        <li className="relative px-2 py-8">
                          <button
                            onClick={handleLogout}
                            className="mt-4 p-1 font-bold text-center rounded-lg bg-red-400 w-24 hover:bg-red-500"
                          >
                            <ExitToAppIcon /> Logout
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </FadeIn>
      ) : (
        <FadeIn>
          <aside className="z-20 flex-shrink-0 w-20 h-screen px-2 overflow-y-auto overflow-x-hidden bg-gray-800 rounded-rb-2xl filter drop-shadow-lg">
            <div>
              <div className="text-white">
                <div>
                  <IconButton
                    onClick={() => {
                      setOpenSidebar(true);
                    }}
                  >
                    <KeyboardArrowRightIcon
                      style={{
                        width: "40px",
                        height: "40px",
                      }}
                      className="text-green-400 text-xl transition-colors duration-150 hover:text-green-500"
                    />
                  </IconButton>
                </div>
                <div className="flex justify-center">
                  <div className="grid grid-row-2">
                    <Link to="/">
                      <img alt="logo" src="/favicon.ico" className="w-20" />
                    </Link>
                    <div className="flex justify-center">
                      <Link to={`/profile/${user.uuid}`}>
                        <img
                          alt="user"
                          className=" my-5 hidden h-12 w-12 rounded-full sm:block object-cover mr-2 border-4 border-green-400"
                          src={
                            user.profileImage !== undefined
                              ? user.profileImage
                              : "https://image.flaticon.com/icons/png/512/149/149071.png"
                          }
                        />
                      </Link>
                    </div>
                    <div className="flex justify-center">
                      <ul className="mt-2 leading-10">
                        <li className="relative px-2 py-8 ">
                          <Link
                            className="inline-flex items-center w-full text-sm font-semibold text-green-400 transition-colors duration-150 cursor-pointer hover:text-green-700"
                            to="/dashboard"
                          >
                            <IconButton>
                              <DashboardIcon className="text-green-400 transition-colors duration-150 cursor-pointer hover:text-green-700" />
                            </IconButton>
                          </Link>
                        </li>
                        <li className="relative px-2 py-8 ">
                          <Link
                            className="inline-flex items-center w-full text-sm font-semibold text-green-400 transition-colors duration-150 cursor-pointer hover:text-green-700"
                            to="/dashboard/projects/manage"
                          >
                            <IconButton>
                              <AssignmentIcon className="text-green-400 transition-colors duration-150 cursor-pointer hover:text-green-700" />
                            </IconButton>
                          </Link>
                        </li>
                        <li className="relative px-2 py-8 ">
                          <Link
                            className="inline-flex items-center w-full text-sm font-semibold text-green-400 transition-colors duration-150 cursor-pointer hover:text-green-700"
                            to="/dashboard/teams"
                          >
                            <IconButton>
                              <PeopleIcon className="text-green-400 transition-colors duration-150 cursor-pointer hover:text-green-700" />
                            </IconButton>
                          </Link>
                        </li>
                        <li className="relative px-2 py-8">
                          <Link
                            className="inline-flex items-center w-full text-sm font-semibold text-green-400 transition-colors duration-150 cursor-pointer hover:text-green-700"
                            to="/dashboard/labeltool"
                          >
                            <IconButton>
                              <BuildIcon className="text-green-400 transition-colors duration-150 cursor-pointer hover:text-green-700" />
                            </IconButton>
                          </Link>
                        </li>
                        <li className="relative px-2 py-8 ">
                          <Link
                            className="inline-flex items-center w-full text-sm font-semibold text-green-400 transition-colors duration-150 cursor-pointer hover:text-green-700"
                            to="/dashboard/dataset/manage"
                          >
                            <IconButton>
                              {" "}
                              <StorageIcon className="text-green-400 transition-colors duration-150 cursor-pointer hover:text-green-700" />
                            </IconButton>
                          </Link>
                        </li>
                        <li className="relative px-2 py-8 ">
                          <Link
                            className="inline-flex items-center w-full text-sm font-semibold "
                            href="/dashboard/setting"
                          >
                            {" "}
                            <IconButton>
                              <SettingsIcon className="text-green-400 transition-colors duration-150 cursor-pointer hover:text-green-700" />
                            </IconButton>
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <div className="flex justify-center">
                      <IconButton onClick={handleLogout}>
                        <ExitToAppIcon className="inline-flex items-center w-full text-sm font-semibold text-red-400 transition-colors duration-150 cursor-pointer hover:text-red-700" />
                      </IconButton>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </FadeIn>
      )}
    </div>
  );
}

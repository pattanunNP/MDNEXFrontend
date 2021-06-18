import React, { useState, useContext } from "react";
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
import Tooltip from "@material-ui/core/Tooltip";
import useSWR from "swr";
import { StoreContext } from "../../context/store";
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
  const { setDatasetname, setDatasetuuid } =
    useContext(StoreContext);
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
          <aside className="z-20 flex-shink-0 hidden w-60 h-screen pl-2 bg-white overflow-y-auto  rounded-rb-2xl filter drop-shadow-lg border-r-1 border-green-400 md:block">
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
                    <div className="flex justify-center">
                      <Link to="/">
                        <img
                          alt="logo"
                          src="https://res.cloudinary.com/image-chatbot/image/upload/v1623756618/MD_NEX/Purple_Event_Styling_Logo_7_ixrzkq.png"
                          className="w-24"
                        />
                      </Link>
                    </div>
                    <div className="flex justify-center">
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
                    </div>
                    <div className="flex justify-center">
                      <p
                        style={{
                          textTransform: "capitalize",
                        }}
                        className="font-normal text-green-500 pt-2 text-center w-48"
                      >
                        {user.username}
                      </p>
                    </div>
                    <div className="flex justify-center">
                      <p
                        style={{
                          textTransform: "capitalize",
                        }}
                        className="font-thin  text-gray-400 pt-2 text-center text-sm w-24"
                      >
                        {user.role}
                      </p>
                    </div>
                    <div>
                      <ul className="mt-2 leading-10">
                        <li className="relative px-2 my-7 ">
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
                        <li className="relative px-2 my-7 ">
                          <Link
                            className="inline-flex items-center w-full text-sm font-semibold text-green-400 transition-colors duration-150 cursor-pointer hover:text-green-700"
                            to="/dashboard"
                          >
                            <button>
                              <AssignmentIcon />{" "}
                              <span className="ml-6">MANANGE PROJECTS</span>
                            </button>
                          </Link>
                        </li>
                        <li className="relative px-2 my-7 ">
                          <Link
                            className="inline-flex items-center w-full text-sm font-semibold text-green-400 transition-colors duration-150 cursor-pointer hover:text-green-700"
                            to="/dashboard/datasets/manage"
                          >
                            <StorageIcon onClick={() => {
                              setDatasetname(null)
                              setDatasetuuid(null)
                            }} />
                            <span className="ml-6">MANAGE DATASET</span>
                          </Link>
                        </li>
                        <li className="relative px-2 my-7 ">
                          <Link
                            className="inline-flex items-center w-full text-sm font-semibold text-green-400 transition-colors duration-150 cursor-pointer hover:text-green-700"
                            to="/dashboard/teams/manage"
                          >
                            <PeopleIcon />

                            <span className="ml-6">TEAMS</span>
                          </Link>
                        </li>
                        <li className="relative px-2 my-7 ">
                          <Link
                            className="inline-flex items-center w-full text-sm font-semibold text-green-400 transition-colors duration-150 cursor-pointer hover:text-green-700"
                            to="/dashboard/labeltool"
                          >
                            <BuildIcon />
                            <span className="ml-6">TOOLS</span>
                          </Link>
                        </li>

                        <li className="relative px-2 my-7">
                          <Link
                            className="inline-flex items-center w-full text-sm font-semibold text-green-400 transition-colors duration-150 cursor-pointer hover:text-green-700"
                            to="/dashboard/setting"
                          >
                            <SettingsIcon />
                            <span className="ml-6">SETTING</span>
                          </Link>
                        </li>
                        <li className="relative px-2 my-7">
                          <a
                            className="inline-flex items-center w-full text-sm font-semibold text-green-400 transition-colors duration-150 cursor-pointer hover:text-green-700"
                            href="https://docs.mdnex.standupcode.co/"
                          >
                            <i className="fas fa-book text-green-400 transition-colors duration-150 cursor-pointer hover:text-green-700"></i>
                            <span className="ml-6">DOCUMENTS</span>
                          </a>
                        </li>
                      </ul>
                      <div className="flex justify-center">
                        <button
                          onClick={handleLogout}
                          className="mb-10 mt-4 p-1 font-bold text-center rounded-lg bg-red-400 w-24 hover:bg-red-500"
                        >
                          <ExitToAppIcon /> Logout
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </FadeIn>
      ) : (
        <FadeIn>
          <aside className="z-20 flex-shrink-0 w-20 h-screen px-2 overflow-y-auto overflow-x-hidden  border-r-1 border-green-400 bg-white rounded-rb-2xl filter drop-shadow-lg">
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
                  <div>
                    <div className="flex justify-center">
                      <Link to="/">
                        <img
                          alt="logo"
                          src="https://res.cloudinary.com/image-chatbot/image/upload/v1623756618/MD_NEX/Purple_Event_Styling_Logo_7_ixrzkq.png"
                          className="w-20"
                        />
                      </Link>
                    </div>
                    <div className="flex justify-center">
                      <Link to={`/profile/${user.uuid}`}>
                        <img
                          alt="user"
                          className="hidden h-12 w-12 rounded-full sm:block object-cover  border-4 border-green-400"
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
                        <li className="relative px-2 my-7 ">
                          <Tooltip title="Dashboard">
                            <Link
                              className="inline-flex items-center w-full text-sm font-semibold text-green-400 transition-colors duration-150 cursor-pointer hover:text-green-700"
                              to="/dashboard"
                            >
                              <IconButton>
                                <DashboardIcon className="text-green-400 transition-colors duration-150 cursor-pointer hover:text-green-700" />
                              </IconButton>
                            </Link>
                          </Tooltip>
                        </li>
                        <li className="relative px-2 my-7 ">
                          <Tooltip title="ManangeProjects">
                            <Link
                              className="inline-flex items-center w-full text-sm font-semibold text-green-400 transition-colors duration-150 cursor-pointer hover:text-green-700"
                              to="/dashboard/projects/manage"
                            >
                              <IconButton>
                                <AssignmentIcon className="text-green-400 transition-colors duration-150 cursor-pointer hover:text-green-700" />
                              </IconButton>
                            </Link>
                          </Tooltip>
                        </li>

                        <li className="relative px-2 my-7 ">
                          {" "}
                          <Tooltip title="ManangeDatasets">
                            <Link
                              className="inline-flex items-center w-full text-sm font-semibold text-green-400 transition-colors duration-150 cursor-pointer hover:text-green-700"
                              to="/dashboard/datasets/manage"
                            >
                              <IconButton onClick={() => {
                                setDatasetname(null)
                                setDatasetuuid(null)
                              }}
                              >
                                < StorageIcon className="text-green-400 transition-colors duration-150 cursor-pointer hover:text-green-700" />
                              </IconButton>
                            </Link>
                          </Tooltip>
                        </li>
                        <li className="relative px-2 my-7 ">
                          <Tooltip title="ManangeTeams">
                            <Link
                              className="inline-flex items-center w-full text-sm font-semibold text-green-400 transition-colors duration-150 cursor-pointer hover:text-green-700"
                              to="/dashboard/teams/manage"
                            >
                              <IconButton>
                                <PeopleIcon className="text-green-400 transition-colors duration-150 cursor-pointer hover:text-green-700" />
                              </IconButton>
                            </Link>
                          </Tooltip>
                        </li>
                        <li className="relative px-2 my-7">
                          <Tooltip title="LabelTool">
                            <Link
                              className="inline-flex items-center w-full text-sm font-semibold text-green-400 transition-colors duration-150 cursor-pointer hover:text-green-700"
                              to="/dashboard/labeltool"
                            >
                              <IconButton>
                                <BuildIcon className="text-green-400 transition-colors duration-150 cursor-pointer hover:text-green-700" />
                              </IconButton>
                            </Link>
                          </Tooltip>
                        </li>

                        <li className="relative px-2 my-7">
                          <Tooltip title="Setting">
                            <Link
                              className="inline-flex items-center w-full text-sm font-semibold "
                              to="/dashboard/setting"
                            >
                              <IconButton>
                                <SettingsIcon className="text-green-400 transition-colors duration-150 cursor-pointer hover:text-green-700" />
                              </IconButton>
                            </Link>
                          </Tooltip>
                        </li>
                        <li className="relative px-2 my-7">
                          <Tooltip title="Documents">
                            <a
                              className="inline-flex items-center w-full text-sm font-semibold "
                              href="https://docs.mdnex.standupcode.co/"
                            >
                              <IconButton>
                                <i class="fas fa-book text-green-400 transition-colors duration-150 cursor-pointer hover:text-green-700"></i>
                              </IconButton>
                            </a>
                          </Tooltip>
                        </li>
                      </ul>
                    </div>
                    <div className="flex justify-center">
                      {" "}
                      <Tooltip title="Logout">
                        <IconButton onClick={handleLogout}>
                          <ExitToAppIcon className="inline-flex items-center w-full text-sm font-semibold text-red-400 transition-colors duration-150 cursor-pointer hover:text-red-700" />{" "}
                        </IconButton>
                      </Tooltip>
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

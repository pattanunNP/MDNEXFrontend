import React, { useState, useContext } from "react";
import { StoreContext } from "../../context/store";
import ModalPop from "../../components/objects/Modal";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import StorageIcon from "@material-ui/icons/Storage";
import SettingsIcon from "@material-ui/icons/Settings";
import Badge from '@material-ui/core/Badge';
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import { useHistory, Link } from "react-router-dom";
import { IconButton } from "@material-ui/core";
import AssignmentIcon from "@material-ui/icons/Assignment";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import axios from "axios";

import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import FadeIn from "react-fade-in";
import Tooltip from "@material-ui/core/Tooltip";
import useSWR from "swr";


async function FetchData(path) {
  const url = process.env.REACT_APP_API_URL;
  const access_token = sessionStorage.getItem("access_token");
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${access_token}`,
  };
  const response = await axios.get(`${url}${path}`, { headers: headers });
  console.log(response.data);
  if (!response.statusText === "OK") {
    const error = new Error("An error occurred while fetching the data.");
    // Attach extra info to the error object.
    error.info = await response.data;
    error.status = response.status;
    throw error;
  }
  return response.data;
}


async function FetchFollowers(path) {
  const url = process.env.REACT_APP_API_URL;
  const access_token = sessionStorage.getItem("access_token");
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${access_token}`,
  };
  const response = await axios.get(`${url}${path}`, { headers: headers });
  console.log(response.data);
  if (!response.statusText === "OK") {
    const error = new Error("An error occurred while fetching the data.");
    // Attach extra info to the error object.
    error.info = await response.data;
    error.status = response.status;
    throw error;
  }
  return response.data;
}

async function FetchFollowing(path) {
  const url = process.env.REACT_APP_API_URL;
  const access_token = sessionStorage.getItem("access_token");
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${access_token}`,
  };
  const response = await axios.get(`${url}${path}`, { headers: headers });
  console.log(response.data);
  if (!response.statusText === "OK") {
    const error = new Error("An error occurred while fetching the data.");
    // Attach extra info to the error object.
    error.info = await response.data;
    error.status = response.status;
    throw error;
  }
  return response.data;
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function Sidenavbar(props) {
  const history = useHistory();
  const [value, setValue] = useState(0);

  const { setOpenModal } = useContext(StoreContext);
  const [opensidebar, setOpenSidebar] = useState(false);

  function handleLogout() {
    sessionStorage.removeItem("access_token");
    sessionStorage.removeItem("refresh_token");
    history.push("/login");
  }
  const options = { suspense: true };

  const { data: user } = useSWR("/api/v1/dashboard", FetchData, options);

  const { data: followers_data } = useSWR("/api/v1/get-followers", FetchFollowers, options);

  const { data: following_data } = useSWR("/api/v1/get-following", FetchFollowing, options);

  function roundFollowers(numFollowers) {
    let rounded;
    if (numFollowers >= 1000) {
      rounded = `${(numFollowers / 1000).toFixed(1)}K`
    } else {
      rounded = numFollowers
    }
    return rounded
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const followers = (
    <div className>
      <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
        <Tab label="Followers" {...a11yProps(0)} />
        <Tab label="Following" {...a11yProps(1)} />

      </Tabs>
      <TabPanel value={value} index={0}>
        <div>
          {followers_data.info.length > 0 ? followers_data.info.map((item, idx) => (

            <div className="mt-5 grid grid-cols-3 gap-0 p-2 " key={idx}>

              <img alt="user_pic" src={item.profile_photo} className="w-10 h-10" />
              <Link to={`/profile/${item.uuid}`}>
                <p className="text-sm text-black">{item.username}</p>
              </Link>
              <button className="p-1 h-8  rounded-2xl bg-red-400 text-sm text-white hover:bg-red-500">Remove</button>

            </div>

          )) : <p className="my-20 flex justify-center">You don't have any followers</p>}
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <div>
          {following_data.info.length > 0 ? following_data.info.map((item, idx) => (

            <div className="mt-5 grid grid-cols-3 gap-0 p-2" key={idx}>

              <img alt="user_pic" src={item.profile_photo} className="w-10 h-10" />
              <Link to={`/profile/${item.uuid}`}>
                <p className="text-sm text-black">{item.username}</p>
              </Link>

              <button className="p-1 h-8  rounded-2xl bg-blue-400 text-sm text-white hover:bg-blue-500">Unfollow</button>
            </div>

          )) :
            <p className="my-20 flex justify-center">You don't following anyone</p>}

        </div>
      </TabPanel>
    </div>
  )



  return (
    <div>
      <ModalPop contents={followers} width={"450px"} height={"450px"} />
      {opensidebar ? (
        <FadeIn>
          <aside className="z-20 flex-shink-0 hidden w-60 h-screen pl-2 bg-white overflow-y-auto  rounded-rb-2xl border-r-1 border-green-400 md:block">
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
                      <Link to={`/profile/${user.uuid}`}>
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
                      <div className="grid grid-cols-2 gap-2">

                        <button className="text-green-400"
                          onClick={() => {
                            setOpenModal(true)
                          }}
                        >{roundFollowers(user.Followers.length)}&nbsp; Followers</button>


                        <button className="text-green-400"
                          onClick={() => {
                            setOpenModal(true)
                          }}
                        >{roundFollowers(user.Following.length)}&nbsp; Following</button>

                      </div>
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
                            className="inline-flex items-center w-full text-sm font-normal text-green-400 transition-colors duration-150 cursor-pointer hover:text-green-700"
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
                            className="inline-flex items-center w-full text-sm font-normal text-green-400 transition-colors duration-150 cursor-pointer hover:text-green-700"
                            to="/dashboard"
                          >
                            <button>
                              <Badge badgeContent={user.projects.length} color="secondary">
                                <AssignmentIcon />  </Badge>
                              <span className="ml-6">MANANGE PROJECTS</span>
                            </button>
                          </Link>
                        </li>
                        <li className="relative px-2 my-7 ">

                          <Link
                            className="inline-flex items-center w-full text-sm font-normal text-green-400 transition-colors duration-150 cursor-pointer hover:text-green-700"
                            to="/dashboard/datasets/manage"
                          >   <Badge badgeContent={user.datasets.length} color="secondary">
                              <StorageIcon />
                            </Badge>
                            <span className="ml-6">MANAGE DATASET</span>
                          </Link>

                        </li>
                        <li className="relative px-2 my-7 ">
                          <Link
                            className="inline-flex items-center w-full text-sm font-normal text-green-400 transition-colors duration-150 cursor-pointer hover:text-green-700"
                            to="/dashboard/teams/manage"
                          ><Badge badgeContent={user.teams.length} color="secondary">
                              <PeopleIcon />
                            </Badge>
                            <span className="ml-6">TEAMS</span>
                          </Link>
                        </li>


                        <li className="relative px-2 my-7">
                          <Link
                            className="inline-flex items-center w-full text-sm font-normald text-green-400 transition-colors duration-150 cursor-pointer hover:text-green-700"
                            to="/dashboard/setting"
                          >
                            <SettingsIcon />
                            <span className="ml-6">SETTING</span>
                          </Link>
                        </li>
                        <li className="relative px-2 my-7">
                          <a
                            className="inline-flex items-center w-full text-sm font-normal text-green-400 transition-colors duration-150 cursor-pointer hover:text-green-700"
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
          <aside className="z-20 flex-shrink-0 w-20 h-screen px-2 overflow-y-auto overflow-x-hidden  border-r-1 border-green-400 bg-white rounded-rb-2xl filter ">
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
                                <Badge badgeContent={user.projects.length} color="secondary">
                                  <AssignmentIcon className="text-green-400 transition-colors duration-150 cursor-pointer hover:text-green-700" />
                                </Badge>
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
                              <IconButton

                              > <Badge badgeContent={user.datasets.length} color="secondary">
                                  < StorageIcon className="text-green-400 transition-colors duration-150 cursor-pointer hover:text-green-700" />
                                </Badge>
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
                                <Badge badgeContent={user.teams.length} color="secondary">
                                  <PeopleIcon className="text-green-400 transition-colors duration-150 cursor-pointer hover:text-green-700" />
                                </Badge>
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

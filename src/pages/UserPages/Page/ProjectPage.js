import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  Paper,
  Tabs,
  Box,
  Typography,
  Tab,
  AppBar,
} from "@material-ui/core";
import PropTypes from "prop-types";
import SearchBox from "../../../components/objects/SearchBox";
import Sidenavbar from "../../../components/objects/Sidenavbar";
import useSWR from "swr";
import { IconButton } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
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
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
async function FetchProjects(path) {
  const url = process.env.REACT_APP_API_URL;
  const access_token = sessionStorage.getItem("access_token");
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${access_token}`,
  };
  const response = await axios.get(`${url}${path}`, { headers: headers });

  if (!response.statusText === "OK") {
    const error = new Error("An error occurred while fetching the data.");
    // Attach extra info to the error object.
    error.info = await response.data;
    error.status = response.status;
    throw error;
  }
  console.log(response.data);
  return response.data;
}
export default function ProjectPage() {
  let { uuid } = useParams();
  const [value, setValue] = useState(0);

  const options = { suspense: true }

  const { data: info } = useSWR(
    `/api/v1/project/${uuid}`,
    FetchProjects,
    options
  );

  function ConvertTime(timestamp) {
    const time = new Date(timestamp).toLocaleDateString("en-TH", {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "long",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    return time;
  } const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function handleStartLabel() {

  }


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
          <div className="mt-10 pb-10 px-8 mx-4 rounded-3xl">
            <Paper className="w-full flex justify-center shadow-md"
              style={{
                background: "rgba(255, 255, 255, 0.5 )",
                boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
                backdropFilter: "blur( 5.0px )",
                borderRadius: "20px",
                border: "1px solid rgba( 255, 255, 255, 0.18 )",
              }}>
              <div className="w-full h-64 bg-red-100 relative">
                <div
                  className="absolute inset-0 bg-cover bg-center z-0"
                  style={{
                    backgroundImage: `url(${info.project_thumbnail})`,
                  }}
                ></div>
                <div className="p-5 opacity-100 absolute inset-0 z-10 flex justify-start items-center text-6xl text-white font-semibold">
                  {info.project_name}
                </div>
                <div className="p-5 opacity-80 absolute inset-50 z-10 flex justify-start items-start text-xl text-white font-semibold">
                  Created : {ConvertTime(info.project_created_time)}
                </div>
                <div class="absolute bottom-5 left-5 h-16 w-full text-white text-2xl font-semibold opacity-90 ">
                  {info.project_description}
                </div>
              </div>
            </Paper>
            <AppBar

              position="relative"
              style={{
                backgroundColor: "#ffffff",
              }}
            >
              <Tabs
                value={value}
                onChange={handleChange}
                className="text-black font-bold"
              >
                <Tab label="Infomation" {...a11yProps(0)} />

                <Tab label="Task" {...a11yProps(1)} />

                <Tab label="Activity" {...a11yProps(2)} />

                <Tab label="Project Members" {...a11yProps(3)} />

                <Tab label="Setting" {...a11yProps(4)} />
              </Tabs>
            </AppBar>

          </div>
          <TabPanel value={value} index={0}>
            <Paper className="w-full shadow-3xl h-screen p-10" style={{
              background: "rgba(255, 255, 255, 0.5 )",
              boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
              backdropFilter: "blur( 5.0px )",
              borderRadius: "20px",
              border: "1px solid rgba( 255, 255, 255, 0.18 )",
            }}
            >
              <div>
                {" "}
                <div className="bg-gray-200 p-2 w-full">
                  <Typography>
                    <h1 className="text-xl font-extrabold">Information</h1>
                  </Typography>
                </div>
                <Typography>
                  <h1
                    style={{ textTransform: "Capitalize" }}
                    className="mt-10 text-xl"
                  >
                    Projectname:&nbsp;
                    {info.project_name}
                  </h1>

                  <h1
                    style={{ textTransform: "Capitalize" }}
                    className="mt-10 text-xl"
                  >
                    Project description:&nbsp;
                    {info.project_description}
                  </h1>

                  <h1
                    style={{ textTransform: "Capitalize" }}
                    className="mt-10 text-xl"
                  >
                    Project Owner:&nbsp;{info.project_owner_name}
                  </h1>
                  <h1 className="mt-10 text-xl">
                    Project UUID:&nbsp;{info.project_uuid}
                  </h1>

                </Typography>
              </div>
            </Paper>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Paper className="w-full shadow-3xl h-screen p-10" style={{
              background: "rgba(255, 255, 255, 0.5 )",
              boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
              backdropFilter: "blur( 5.0px )",
              borderRadius: "20px",
              border: "1px solid rgba( 255, 255, 255, 0.18 )",
            }}>
              <div>
                {" "}
                <div className="bg-gray-200 p-2 w-full">
                  <Typography>
                    <h1 className="text-xl font-extrabold">Task</h1>
                  </Typography>
                </div>
                <Typography>
                  <button className="mt-20 btn p-3 bg-green-400 text-white  rounded-3xl hover:bg-green-500"
                    onClick={handleStartLabel}>
                    Start Label
                  </button>


                </Typography>
              </div>
            </Paper>
          </TabPanel>
          <TabPanel value={value} index={3}>
            <Paper className="w-full shadow-3xl h-screen p-10"
              style={{
                background: "rgba(255, 255, 255, 0.5 )",
                boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
                backdropFilter: "blur( 5.0px )",
                borderRadius: "20px",
                border: "1px solid rgba( 255, 255, 255, 0.18 )",
              }}>
              <div>
                {" "}
                <div className="bg-gray-200 p-2 w-full">
                  <Typography>
                    <h1 className="text-4xl font-extrabold">Project Member</h1>
                  </Typography>
                </div>
              </div>
              <div>
                <table className="mt-10 min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 bg-gray-50 text-lg leading-4 font-medium text-gray-700 uppercase tracking-wider">
                        <div className="flex cursor-pointer">
                          <span className="mr-2">NAME</span>
                        </div>
                      </th>
                      <th className="px-6 py-3 bg-gray-50 text-lg leading-4 font-medium text-gray-700 uppercase tracking-wider">
                        <div className="flex cursor-pointer">
                          <span className="mr-2">Roles</span>
                        </div>
                      </th>
                      <th className="px-6 py-3 bg-gray-50 text-lg leading-4 font-medium text-gray-700 uppercase tracking-wider">
                        <div className="flex cursor-pointer">
                          <span className="mr-2">Last Active</span>
                        </div>
                      </th>

                    </tr>
                  </thead>
                  {info.project_members.length > 0 ? (
                    <tbody class="bg-white divide-y divide-gray-200">
                      {info.project_members.map((item) => (
                        <tr key={item.uuid} className="shadow-sm">
                          <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5">
                            <div className="grid grid-cols-1 gap-5">
                              <img alt="user_profile"
                                src={item.member_info.profile_photo}
                                className="w-12 h-12 rounded-full" />
                              <p
                                style={{

                                  textTransform: "capitalize",
                                }}>{item.member_info.username}</p></div>

                          </td>


                          <td class="px-6 py-4 whitespace-no-wrap text-md leading-5">
                            <div class="flex space-x-4">
                              <div class="flex justify-center">
                                <p style={{
                                  textTransform: "capitalize",
                                }}> {item.member_info.role}</p>
                              </div>
                            </div>
                          </td>

                          <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5">
                            <div class="flex space-x-4">
                              <div class="flex justify-center">
                                <p> 5 mim</p>
                              </div>
                            </div>
                          </td>
                          <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5">
                            <div class="flex space-x-4">
                              <div class="flex justify-center">
                                <IconButton>
                                  <MoreVertIcon />
                                </IconButton>
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  ) : (
                    <tbody className="bg-white divide-y divide-gray-200 flex justify-center ">
                      <tr className="flex justify-center">
                        <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5">
                          <div>
                            <p>Don't have any members</p>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  )}
                </table>

              </div>
            </Paper>
          </TabPanel>
        </main>
      </div>
    </div >
  );
}

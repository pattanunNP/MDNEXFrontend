import React, { useState } from "react";
import axios from "axios";
import {
  Paper,
  AppBar,
  Tabs,
  Tab,
  Typography,
  Tooltip,
  Box,
  TextField,
  IconButton,
} from "@material-ui/core";
import useSWR from "swr";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";

import LockIcon from "@material-ui/icons/Lock";
import DeleteIcon from "@material-ui/icons/Delete";
import PublicIcon from "@material-ui/icons/Public";

import SearchBox from "../../../components/objects/SearchBox";
import Sidenavbar from "../../../components/objects/Sidenavbar";
async function FetchDataset(path) {
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

export default function DatasetPage() {
  let { uuid } = useParams();

  const options = { suspense: true };

  const { data: dataset } = useSWR(
    `/api/v1/dataset/${uuid}`,
    FetchDataset,
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
  }

  const [value, setValue] = useState(0);
  const [veiwGrid, setVeiwGrid] = useState(true);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
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
            <Paper className="w-full flex justify-center shadow-md ">
              <div className="w-full h-64 bg-red-100 relative">
                <div
                  className="absolute inset-0 bg-cover bg-center z-0"
                  style={{
                    backgroundImage: `url(${dataset.dataset_thumbnail})`,
                  }}
                >
                  <div className="p-5 opacity-100 absolute inset-0 z-10 flex justify-start items-center text-5xl text-white font-semibold">
                    {dataset.dataset_name}
                  </div>
                  <div className="p-5 absolute inset-50 z-10 flex justify-start items-start text-xl text-white font-semibold">
                    Created : {ConvertTime(dataset.dataset_created_time)}
                  </div>
                  <div class="absolute bottom-0 left-5 h-16 w-full text-white text-xl font-semibold opacity-90 ">
                    {dataset.dataset_description}
                  </div>
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

                <Tab label="Images" {...a11yProps(1)} />

                <Tab label="Setting" {...a11yProps(2)} />
              </Tabs>
            </AppBar>
          </div>
          <TabPanel value={value} index={0}>
            <Paper className="w-full shadow-3xl h-screen p-10">
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
                    Datasetname:&nbsp;
                    {dataset.dataset_name}
                  </h1>

                  <h1
                    style={{ textTransform: "Capitalize" }}
                    className="mt-10 text-xl"
                  >
                    Dataset description:&nbsp;
                    {dataset.dataset_description}
                  </h1>

                  <h1
                    style={{ textTransform: "Capitalize" }}
                    className="mt-10 text-xl"
                  >
                    dataset Owner:&nbsp;{dataset.dataset_owner_name}
                  </h1>
                  <h1 className="mt-10 text-xl">
                    Dataset UUID:&nbsp;{dataset.dataset_uuid}
                  </h1>
                </Typography>
              </div>
            </Paper>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <div className="pb-10 px-8  rounded-3xl ">
              <Paper className="w-full shadow-3xl h-full p-10">
                <div className="bg-gray-200 p-2 w-full">
                  <Typography>
                    <h1 className="text-xl font-extrabold">Dataset</h1>
                  </Typography>
                </div>
                <div className="flex justify-end">
                  <div>
                    <Tooltip title="Grid Veiw">
                      <IconButton
                        className="text-grey-300 hover:text-green-400"
                        onClick={() => {
                          setVeiwGrid(true);
                        }}
                      >
                        <i className="far fa-images" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="List Veiw">
                      <IconButton
                        className="text-grey-300 hover:text-green-400"
                        onClick={() => {
                          setVeiwGrid(false);
                        }}
                      >
                        <i className="fas fa-th-list" />
                      </IconButton>
                    </Tooltip>
                  </div>
                </div>

                <div className="flex justify-center container mx-auto overflow-y-auto h-full w-full">
                  {veiwGrid ? (
                    <div className="mt-10 grid sm:grid-cols-3 gap-1 md:grid-cols-5">
                      {dataset.dataset_files.length > 0 ? (
                        dataset.dataset_files.map((image) => (
                          <div key={image[0].file_uuid}>
                            <div
                              className="p-2 opacity-100 hover:opacity-80 h-48 w-48 text-white"
                              style={{
                                backgroundImage: `url(${image[0].files_url})`,
                              }}
                            >
                              <a
                                href={`${image[0].files_url}`}
                                className="relative bottom-0"
                              >
                                <p
                                  className="p-2"
                                  style={{
                                    fontSize: "12px",
                                    backgroundColor: "rgba(255, 255, 255,0.5)",
                                  }}
                                >
                                  <i class="fas fa-download mx-2 "></i>
                                  {image[0].filename}
                                </p>
                              </a>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div>
                          <h1 className="text-xl font-semibold text-gray-500">
                            Your don't have any projects
                          </h1>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="mt-10 grid grid-rows-15 gap-1">
                      <table className="table-fixed">
                        <thead>
                          <tr>
                            <th className="w-1/2">Image</th>
                            <th className="w-1/2">Filename</th>
                            <th className="w-1/2">UUID</th>
                            <th className="w-1/2">Url</th>
                          </tr>
                        </thead>
                        <tbody>
                          {dataset.dataset_files.length > 0 ? (
                            dataset.dataset_files.map((image) => (
                              <tr
                                key={image[0].file_uuid}
                                className="p-1 hover:bg-gray-200"
                              >
                                <td>
                                  <img
                                    alt="mini"
                                    src={image[0].files_url}
                                    className="w-10 h-10"
                                  />
                                </td>{" "}
                                <td>{image[0].filename}</td>{" "}
                                <td>{image[0].file_uuid}</td>{" "}
                                <td>
                                  <a
                                    href={image[0].files_url}
                                    className="text-grey-200 hover:text-blue-300"
                                  >
                                    {image[0].files_url}
                                  </a>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <div>
                              <h1 className="text-xl font-semibold text-gray-500">
                                Your don't have any projects
                              </h1>
                            </div>
                          )}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </Paper>
            </div>
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Paper className="w-full shadow-3xl h-full p-10">
              <div className="bg-gray-200 p-2 w-full">
                <Typography>
                  <h1 className="text-xl font-extrabold">Settings</h1>
                </Typography>
              </div>
              <Typography>
                <h1
                  style={{ textTransform: "Capitalize" }}
                  className="mt-10 text-3xl"
                >
                  Datasetname:&nbsp;
                  <TextField
                    value={dataset.dataset_name}
                    className="w-full"
                  ></TextField>
                </h1>

                <h1
                  style={{ textTransform: "Capitalize" }}
                  className="mt-10 text-3xl"
                >
                  Dataset description:&nbsp;
                  <TextField
                    className="w-full"
                    value={dataset.dataset_description}
                  ></TextField>
                </h1>
                <div>
                  <div>
                    <h1 className="my-10 text-3xl">
                      Upload New Dataset Thumbnail
                    </h1>
                  </div>
                  <img
                    alt="banner"
                    src={dataset.dataset_thumbnail}
                    className="w-96 h-48"
                  />
                </div>
                <h1
                  style={{ textTransform: "Capitalize" }}
                  className="mt-10 text-2xl"
                >
                  dataset Owner:&nbsp;{dataset.dataset_owner_name}
                </h1>
              </Typography>
              <div className="my-20 bg-red-300 p-2 w-full border-1 border-red-500">
                <Typography>
                  <h1 className="text-3xl font-extrabold text-red-600">
                    Danger Zone
                  </h1>
                </Typography>
              </div>
              <div>
                <h1 className="my-10 text-md font-extrabold text-red-600">
                  {dataset.private === true ? (
                    <div>
                      {" "}
                      Made Public:&nbsp;&nbsp;&nbsp;
                      <button className="p-1 w-32 text-md  bg-red-500 text-white ring-2 ring-red-300 rounded-3xl">
                        <PublicIcon className="mx-2" /> Public
                      </button>
                    </div>
                  ) : (
                    <div>
                      {" "}
                      Made Private:&nbsp;&nbsp;&nbsp;
                      <button className="p-1 w-32  text-md bg-red-500 text-white ring-2 ring-red-300 rounded-3xl">
                        <LockIcon className="mx-2" /> Private
                      </button>
                    </div>
                  )}
                </h1>
                <h1 className="my-10 text-xl font-extrabold text-red-600">
                  Transfer Owner:&nbsp;&nbsp;&nbsp;
                  <button className="p-1 text-md  w-48 bg-red-500 text-white ring-2 ring-red-300 rounded-3xl">
                    <i className="fas fa-exchange-alt mx-2" />
                    Transfer
                  </button>
                </h1>
                <h1 className="my-10 text-xl font-extrabold text-red-600">
                  Delete this Dataset:&nbsp;&nbsp;&nbsp;
                  <button className="p-1  text-md w-32 bg-red-500 text-white ring-2 ring-red-300 rounded-3xl">
                    <DeleteIcon className="mx-2" />
                    Delete
                  </button>
                </h1>
              </div>
            </Paper>
          </TabPanel>
        </main>
      </div>
    </div>
  );
}

import React, { Fragment, useState, useContext, } from "react";
import axios from "axios";
import { Dialog, Switch, Transition } from '@headlessui/react'
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
import { useParams, useHistory } from "react-router-dom";
import { StoreContext } from "../../../context/store";
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
        <Box p={5}>
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
  const [enabled, setEnabled] = useState(false)
  let [isOpen, setIsOpen] = useState(false)

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
  const history = useHistory();

  const { setDatasetname, setDatasetuuid, setActiveStep } =
    useContext(StoreContext);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };



  return (
    <div className="bg-right-top bg-auto bg-no-repeat bg-fixed bg-mainbackground2 flex h-screen">
      <Sidenavbar />
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={() => {
            setIsOpen(false)
          }}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Transfer Owner?
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Your need to select members that you wan't to transfer owner
                  </p>

                </div>

                <div className="mt-4">

                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
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
                    Total Image:&nbsp; <span className="font-semibold">{dataset.dataset_number_of_images}</span> Images
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
              <Paper className="w-full shadow-3xl h-screen p-12 overflow-y-auto"
                style={{
                  background: "rgba(255, 255, 255, 0.5 )",
                  boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
                  backdropFilter: "blur( 5.0px )",
                  borderRadius: "20px",
                  border: "1px solid rgba( 255, 255, 255, 0.18 )",
                }}>
                <div className="bg-gray-200 p-2 w-full">
                  <Typography>
                    <h1 className="text-xl font-extrabold">Dataset</h1>
                  </Typography>
                </div>
                <div className="flex justify-end">
                  <div>
                    <Tooltip title="Add Dataset">
                      <IconButton
                        className="text-grey-300 hover:text-green-400"
                        onClick={() => {
                          setActiveStep(1)
                          setDatasetname(dataset.dataset_name)
                          setDatasetuuid(dataset.dataset_uuid)

                          history.push(`/dashboard/datasets/newdata`)
                        }}
                      >
                        <i className="fas fa-plus-square"></i>
                      </IconButton>
                    </Tooltip>
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
                          <div key={image[0].file_uuid}
                          >

                            <div
                              className="p-2 opacity-100 h-48 w-48 text-white"
                              style={{
                                backgroundImage: `url(${image[0].file_url})`,
                              }}
                            >
                              <a
                                href={`${image[0].file_url}`}
                                className="relative bottom-0"
                              >
                                <p
                                  className="p-2 truncate"
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
                            <th className="w-1/8">Image</th>
                            <th className="w-1/4">Filename</th>
                            <th className="w-1/8">Metadata</th>
                            {/* <th className="w-1/2">UUID</th> */}
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
                                    src={image[0].file_url}
                                    className="w-16 h-16 object-contain object-center"
                                  />
                                </td>{" "}
                                <td className="truncate">{image[0].filename}<br></br>{image[0].file_uuid}</td>{" "}
                                <td className="truncate">Width:&nbsp;{image[0].file_metadata.width}px<br></br>Height:&nbsp;{image[0].file_metadata.height}px</td>{" "}

                                <td>
                                  <a
                                    href={image[0].file_url}
                                    className="text-grey-200 hover:text-blue-300 "
                                  >
                                    {image[0].file_url}
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
                    className="w-96 h-48 object-contain object-center"
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
                <div className="grid grid-rows-2 gap-2">
                  {enabled === true ? <PublicIcon style={{
                    color: "green"
                  }} /> : <LockIcon />}
                  <h1 className="title text-2xl font-bold">{enabled === true ? `Public` : `Private`}</h1>
                  <Switch
                    checked={enabled}
                    onChange={() => {
                      setEnabled(!enabled)
                    }}
                    className={`${enabled ? 'bg-green-600' : 'bg-gray-200'
                      } relative inline-flex items-center h-6 rounded-full w-11`}
                  >
                    <span className="sr-only">Enable notifications</span>
                    <span
                      className={`${enabled ? 'translate-x-6' : 'translate-x-1'
                        } inline-block w-4 h-4 transform bg-white rounded-full`}
                    />
                  </Switch>
                </div>
                <div className="grid grid-rows-2 gap-1">
                  <h1 className="mt-5 text-xl font-extrabold text-red-600">
                    Transfer Owner:&nbsp;&nbsp;&nbsp;

                  </h1>
                  <button onClick={() => {
                    setIsOpen(true)
                  }} className="p-1 text-md h-8 w-32 bg-red-500 text-white ring-2 ring-red-300 rounded-3xl">
                    <i className="fas fa-exchange-alt mx-2" />
                    Transfer
                  </button>
                </div>
                <div className="grid grid-rows-2 gap-1">
                  <h1 className="mt-5 text-xl font-extrabold text-red-600">
                    Delete this Dataset:&nbsp;&nbsp;&nbsp;

                  </h1>
                  <button className="p-1  text-md h-8 w-32 bg-red-500 text-white ring-2 ring-red-300 rounded-3xl">
                    <DeleteIcon className="mx-2" />
                    Delete
                  </button>
                </div>

              </div>
            </Paper>
          </TabPanel>
        </main>
      </div>
    </div>
  );
}

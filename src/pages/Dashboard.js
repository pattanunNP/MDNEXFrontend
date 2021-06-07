import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import PhotoLibraryIcon from "@material-ui/icons/PhotoLibrary";
import Sidenavbar from "../components/Sidenavbar";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import CancelIcon from "@material-ui/icons/Cancel";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import axios from "axios";

export default function Dashboard() {
  let baseUrl = process.env.REACT_APP_API_URL;

  const [userdata, setUserData] = useState({});
  const history = useHistory();
  let acess_token = sessionStorage.getItem("access_token");
  let refresh_token = sessionStorage.getItem("refresh_token");

  useEffect(() => {
    const fetchData = async () => {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${acess_token}`,
      };

      await axios
        .get(`${baseUrl}/api/v1/dashboard`, { headers: headers })
        .then((response) => {
          setUserData({
            profileImage: response.data.profileImage,
            username: response.data.username,
            role: response.data.role,
          });
        })
        .catch((e) => {
          history.push("login");
        });
    };
    fetchData();
  }, [baseUrl, acess_token, refresh_token, history]);
  return (
    <div className="flex h-screen">
      <Sidenavbar
        username={userdata.username}
        role={userdata.role}
        profileImage={userdata.profileImage}
      />
      <div className="flex flex-col flex-1 w-full overflow-y-auto">
        <header className="z-40 py-4 bg-none">
          <div className="flex justify-center  mt-2 mr-4">
            <div className="relative flex w-96 flex-wrap items-stretch mb-3">
              <input
                type="search"
                placeholder="Search"
                className="form-input px-3 py-2 placeholder-gray-400 text-gray-700 relative bg-white rounded-lg text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full pr-10"
              />
              <span className="z-10 h-full leading-snug font-normal  text-center text-gray-400 absolute bg-transparent rounded text-base items-center justify-center w-8 right-0 pr-3 py-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 -mt-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </span>
            </div>
          </div>
        </header>
        <main>
          <div className="grid mb-4 pb-10 px-8 mx-4 rounded-3xl ">
            <div className="grid grid-cols-12 gap-6">
              <a
                className="transform  hover:scale-105 transition duration-300 shadow-xl rounded-lg col-span-12 sm:col-span-6 xl:col-span-3 intro-y bg-white"
                href="/work"
              >
                <div className="p-5">
                  <div className="flex justify-between"></div>
                  <div className="ml-2 w-full flex-1">
                    <div>
                      <PhotoLibraryIcon className="text-indigo-400" />
                      <div className="mt-3 text-3xl font-bold leading-8">
                        232
                      </div>
                      <div className="mt-1 text-base text-gray-600">
                        Image to labels
                      </div>
                    </div>
                  </div>
                </div>
              </a>

              <a
                className="transform  hover:scale-105 transition duration-300 shadow-xl rounded-lg col-span-12 sm:col-span-6 xl:col-span-3 intro-y bg-white"
                href="/work"
              >
                <div className="p-5">
                  <div className="flex justify-between"></div>
                  <div className="ml-2 w-full flex-1">
                    <div>
                      <CheckCircleOutlineIcon className="text-green-400" />

                      <div className="mt-3 text-3xl font-bold leading-8">3</div>
                      <div className="mt-1 text-base text-gray-600">
                        Active Projects
                      </div>
                    </div>
                  </div>
                </div>
              </a>
              <a
                className="transform  hover:scale-105 transition duration-300 shadow-xl rounded-lg col-span-12 sm:col-span-6 xl:col-span-3 intro-y bg-white"
                href="/work"
              >
                <div className="p-5">
                  <div className="flex justify-between"></div>
                  <div className="ml-2 w-full flex-1">
                    <div>
                      <InsertDriveFileIcon className="text-yellow-400" />
                      <div className="mt-3 text-3xl font-bold leading-8">4</div>
                      <div className="mt-1 text-base text-gray-600">
                        Project
                      </div>
                    </div>
                  </div>
                </div>
              </a>
              <a
                className="transform  hover:scale-105 transition duration-300 shadow-xl rounded-lg col-span-12 sm:col-span-6 xl:col-span-3 intro-y bg-white"
                href="/work"
              >
                <div className="p-5">
                  <div className="flex justify-between"></div>
                  <div className="ml-2 w-full flex-1">
                    <div>
                      <AccessTimeIcon className="text-pink-300" />
                      <div className="mt-3 text-3xl font-bold leading-8">
                        Last edited project
                      </div>
                      <div className="mt-1 text-base text-gray-600">
                        Bones Segmentation
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          </div>
          <div className="grid mb-3 px-8 mx-4 ">
            <div className="grid gap-2 grid-cols-4 lg:grid-cols-4">
              <a
                href="/create"
                className="p-1 transition duration-500 ease-in-out bg-green-400 text-white w-48 font-bold rounded-full hover:bg-green-500 filter drop-shadow-lg  transform hover:-translate-y-1 hover:scale-10"
              >
                <AddCircleIcon className="text-white mr-2" />
                Create New Project
              </a>
            </div>
          </div>
          <div className="col-span-12 mt-5">
            <div className="grid gap-2 grid-cols-1 lg:grid-cols-1">
              <div className=" p-4 rounded-lg">
                <h2 className="title text-white font-bold">Projects</h2>
                <div className="mt-4">
                  <div className="flex flex-col">
                    <div classNaem="-my-2 overflow-x-auto">
                      <div className="py-2 align-middle inline-block min-w-full">
                        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg bg-white">
                          <table className="min-w-full divide-y divide-gray-200">
                            <thead>
                              <tr>
                                <th className="px-6 py-3 bg-gray-50 text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                  <div className="flex cursor-pointer">
                                    <span className="mr-2">PROJECTS NAME</span>
                                  </div>
                                </th>
                                <th className="px-6 py-3 bg-gray-50 text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                  <div className="flex cursor-pointer">
                                    <span class="mr-2">Labels</span>
                                  </div>
                                </th>
                                <th class="px-6 py-3 bg-gray-50 text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                  <div class="flex cursor-pointer">
                                    <span class="mr-2">STATUS</span>
                                  </div>
                                </th>
                                <th class="px-6 py-3 bg-gray-50 text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                  <div class="flex cursor-pointer">
                                    <span class="mr-2">ACTION</span>
                                  </div>
                                </th>
                              </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-200">
                              <tr>
                                <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5">
                                  <p>Bones Segmentation</p>
                                  <p class="text-xs text-gray-400">
                                    Ortholpredic
                                  </p>
                                </td>
                                <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5">
                                  <p>77</p>
                                </td>
                                <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5">
                                  <div class="flex text-green-500">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      class="w-5 h-5 mr-1"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                    >
                                      <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                      />
                                    </svg>
                                    <p>Active 4 hours age</p>
                                  </div>
                                </td>
                                <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5">
                                  <div class="flex space-x-4">
                                    <a
                                      href="/edit?id=dw22"
                                      class="text-blue-500 hover:text-blue-600"
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        class="w-5 h-5 mr-1"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                      >
                                        <path
                                          stroke-linecap="round"
                                          stroke-linejoin="round"
                                          stroke-width="2"
                                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                        />
                                      </svg>
                                      <p>Edit</p>
                                    </a>
                                    <a
                                      href="/delete?id=dw2222"
                                      class="text-red-500 hover:text-red-600"
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        class="w-5 h-5 mr-1 ml-3"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                      >
                                        <path
                                          stroke-linecap="round"
                                          stroke-linejoin="round"
                                          stroke-width="2"
                                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                        />
                                      </svg>
                                      <p>Delete</p>
                                    </a>
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                            <tbody class="bg-white divide-y divide-gray-200">
                              <tr>
                                <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5">
                                  <p>Lung Covid</p>
                                  <p class="text-xs text-gray-400">
                                    Respiratory
                                  </p>
                                </td>
                                <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5">
                                  <p>32</p>
                                </td>
                                <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5">
                                  <div class="flex text-green-500">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      class="w-5 h-5 mr-1"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                    >
                                      <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                      />
                                    </svg>
                                    <p>Active 3 months age</p>
                                  </div>
                                </td>
                                <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5">
                                  <div class="flex space-x-4">
                                    <a
                                      href="/edit?id=dw22"
                                      class="text-blue-500 hover:text-blue-600"
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        class="w-5 h-5 mr-1"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                      >
                                        <path
                                          stroke-linecap="round"
                                          stroke-linejoin="round"
                                          stroke-width="2"
                                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                        />
                                      </svg>
                                      <p>Edit</p>
                                    </a>
                                    <a
                                      href="/delete?id=dwee22"
                                      class="text-red-500 hover:text-red-600"
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        class="w-5 h-5 mr-1 ml-3"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                      >
                                        <path
                                          stroke-linecap="round"
                                          stroke-linejoin="round"
                                          stroke-width="2"
                                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                        />
                                      </svg>
                                      <p>Delete</p>
                                    </a>
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                            <tbody class="bg-white divide-y divide-gray-200">
                              <tr>
                                <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5">
                                  <p>Cancer Tissue Segement</p>
                                  <p class="text-xs text-gray-400">Tissue</p>
                                </td>
                                <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5">
                                  <p>77</p>
                                </td>
                                <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5">
                                  <div class="flex text-red-500">
                                    <CancelIcon className="text-red-400" />
                                    <p>Deactived 4 hours ago</p>
                                  </div>
                                </td>
                                <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5">
                                  <div class="flex space-x-4">
                                    <a
                                      href="/edit?id=dw22"
                                      class="text-blue-500 hover:text-blue-600"
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        class="w-5 h-5 mr-1"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                      >
                                        <path
                                          stroke-linecap="round"
                                          stroke-linejoin="round"
                                          stroke-width="2"
                                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                        />
                                      </svg>
                                      <p>Edit</p>
                                    </a>
                                    <a
                                      href="/delete?id=d12"
                                      class="text-red-500 hover:text-red-600"
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        class="w-5 h-5 mr-1 ml-3"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                      >
                                        <path
                                          stroke-linecap="round"
                                          stroke-linejoin="round"
                                          stroke-width="2"
                                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                        />
                                      </svg>
                                      <p>Delete</p>
                                    </a>
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                            <tbody class="bg-white divide-y divide-gray-200">
                              <tr>
                                <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5">
                                  <p>Brain</p>
                                  <p class="text-xs text-gray-400">Barin</p>
                                </td>
                                <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5">
                                  <p>77</p>
                                </td>
                                <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5">
                                  <div class="flex text-green-500">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      class="w-5 h-5 mr-1"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                    >
                                      <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                      />
                                    </svg>
                                    <p>Active 1 weeks ago</p>
                                  </div>
                                </td>
                                <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5">
                                  <div class="flex space-x-4">
                                    <a
                                      href="/edit?id=dw22"
                                      class="text-blue-500 hover:text-blue-600"
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        class="w-5 h-5 mr-1"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                      >
                                        <path
                                          stroke-linecap="round"
                                          stroke-linejoin="round"
                                          stroke-width="2"
                                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                        />
                                      </svg>
                                      <p>Edit</p>
                                    </a>
                                    <a
                                      href="/delete?id=dw22"
                                      class="text-red-500 hover:text-red-600"
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        class="w-5 h-5 mr-1 ml-3"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                      >
                                        <path
                                          stroke-linecap="round"
                                          stroke-linejoin="round"
                                          stroke-width="2"
                                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                        />
                                      </svg>
                                      <p>Delete</p>
                                    </a>
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-12 mt-5">
            <div className="grid gap-2 grid-cols-1 lg:grid-cols-1">
              <div className=" p-4 rounded-lg">
                <h2 className="title text-white font-bold">Activity</h2>
                <div className="mt-4">
                  <div className="flex flex-col">
                    <div classNaem="-my-2 overflow-x-auto">
                      <div className="py-2 align-middle inline-block min-w-full">
                        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg bg-white">
                          <table className="min-w-full divide-y divide-gray-200">
                            <thead>
                              <tr>
                                <th className="px-6 py-3 bg-gray-50 text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                  <div className="flex cursor-pointer"></div>
                                </th>
                                <th className="px-6 py-3 bg-gray-50 text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                  <div className="flex cursor-pointer">
                                    <span className="mr-2">USER</span>
                                  </div>
                                </th>
                                <th className="px-6 py-3 bg-gray-50 text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                  <div className="flex cursor-pointer">
                                    <span class="mr-2">Labels</span>
                                  </div>
                                </th>
                                <th className="px-6 py-3 bg-gray-50 text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                  <div className="flex cursor-pointer">
                                    <span className="mr-2">STATUS</span>
                                  </div>
                                </th>
                                <th className="px-6 py-3 bg-gray-50 text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                  <div className="flex cursor-pointer">
                                    <span className="mr-2">ACTION</span>
                                  </div>
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                              <tr>
                                <td>
                                  <img
                                    className="ml-3 w-10 h-10"
                                    src="https://image.flaticon.com/icons/png/512/149/149071.png"
                                    alt="user"
                                  />
                                </td>
                                <td className="py-4 whitespace-no-wrap text-sm leading-5">
                                  <p>Pattanun Numpong</p>
                                  <p className="text-xs text-gray-400">
                                    Project owner
                                  </p>
                                </td>
                                <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5">
                                  <p>77</p>
                                </td>
                                <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5">
                                  <div class="flex text-green-500">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      class="w-5 h-5 mr-1"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                    >
                                      <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                      />
                                    </svg>
                                    <p>Active 4 hours age</p>
                                  </div>
                                </td>
                                <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5">
                                  <div class="flex text-green-500 hover:text-green-600">
                                    <a href="project?id=2123">
                                      Created new project
                                    </a>
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

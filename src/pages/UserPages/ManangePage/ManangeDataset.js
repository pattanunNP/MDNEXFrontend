import React, { useContext, useState } from "react";
import axios from "axios";
import { useHistory, Link, useLocation } from "react-router-dom";
import useSWR, { mutate } from "swr";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { Paper, Typography } from "@material-ui/core";
import { StoreContext } from "../../../context/store";
import Sidenavbar from "../../../components/objects/Sidenavbar";
import ModalPop from "../../../components/objects/Modal";
import Lottie from "react-lottie";

import {
  successAnimationObjects,
  failedAnimationObjects,
  loadingringAnimationObjects,
} from "../../../components/animation/animation";

async function FetchDatasets(path) {
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
  return response.data.match;
}
export default function Data() {
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  let query = useQuery();
  const { setOpenModal } = useContext(StoreContext);
  let project_uuid = query.get("projectuuid");
  const [error, setError] = useState({});
  const [success, setSuccess] = useState(false);
  const [success_text, setSuccessText] = useState({});
  const [loadingFetch, setLoadingFetch] = useState(false);
  const history = useHistory();
  const options = { suspense: true };
  const { data: datasets } = useSWR(
    "/api/v1/userdatasets",
    FetchDatasets,
    options
  );

  function addDatasetToproject(project_uuid, dataset_uuid) {
    const url = process.env.REACT_APP_API_URL;
    const access_token = sessionStorage.getItem("access_token");
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    };
    const payload = {
      project_uuid: project_uuid,
      dataset_uuid: dataset_uuid,
    };

    setTimeout(() => {
      setLoadingFetch(false);
      setTimeout(() => {
        setLoadingFetch(true);
        setOpenModal(true);
        axios
          .post(`${url}/api/v1/dataset/add-to-project`, payload, {
            headers: headers,
          })
          .then((response) => {
            setLoadingFetch(false);
            setSuccess(true);
            success_text["message"] = response.data.message;
            setSuccessText(success_text);
            mutate("/api/v1/userdatasets");
          })
          .catch((error) => {
            setSuccess(false);
            setLoadingFetch(false);
            //console.log(error);
            let errors = {};
            let error_detail = error.response.data.detail;
            errors["message"] = error_detail;
            setError(errors);
          });
      }, 2000);
    }, 1000);
  }

  function removeDatasetToproject(project_uuid, dataset_uuid) {
    const url = process.env.REACT_APP_API_URL;
    const access_token = sessionStorage.getItem("access_token");
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    };
    const payload = {
      project_uuid: project_uuid,
      dataset_uuid: dataset_uuid,
    };

    setTimeout(() => {
      setLoadingFetch(false);
      setTimeout(() => {
        setLoadingFetch(true);
        setOpenModal(true);
        axios
          .post(`${url}/api/v1/dataset/remove-from-project`, payload, {
            headers: headers,
          })
          .then((response) => {
            setLoadingFetch(false);
            setSuccess(true);
            success_text["message"] = response.data.message;
            setSuccessText(success_text);
            mutate("/api/v1/userdatasets");
          })
          .catch((error) => {
            setSuccess(false);
            setLoadingFetch(false);
            //console.log(error);
            let errors = {};
            let error_detail = error.response.data.detail;
            errors["message"] = error_detail;
            setError(errors);
          });
      }, 2000);
    }, 500);
  }
  const modalContent = (
    <div className="flex justify-center">
      {loadingFetch ? (
        <div>
          <Typography className="flex justify-center">
            <h1 className="title font-bold text-3xl">Processing ... </h1>
          </Typography>
          <Lottie
            style={{
              marginTop: "30px",
            }}
            options={loadingringAnimationObjects}
            height={200}
            width={200}
          />
        </div>
      ) : (
        <div>
          {success ? (
            <div className="p-1">
              <Typography className="flex justify-center">
                <h1 className="title font-bold text-3xl">Success</h1>
              </Typography>

              <Lottie
                style={{
                  marginTop: "30px",
                }}
                options={successAnimationObjects}
                height={270}
                width={270}
              ></Lottie>
              <Typography className="flex justify-center">
                <h1 className="title font-bold text-3xl">
                  {success_text["message"]}
                </h1>
              </Typography>
            </div>
          ) : (
            <div className="p-1">
              <Typography className="flex justify-center">
                <h1 className="title font-bold text-3xl"> Failed</h1>
              </Typography>

              <Lottie
                style={{
                  marginTop: "30px",
                }}
                options={failedAnimationObjects}
                height={200}
                width={200}
              ></Lottie>
              <Typography className="flex justify-center">
                <h1 className="title font-bold text-3xl">{error["message"]}</h1>
              </Typography>
            </div>
          )}
        </div>
      )}
    </div>
  );
  return (
    <div className="bg-right-top bg-auto bg-no-repeat bg-fixed bg-mainbackground2 flex h-screen">
      <Sidenavbar />
      <ModalPop contents={modalContent} />
      <div className="flex flex-col flex-1 w-full overflow-y-auto">
        <header className="grid justify-items-stretch py-1 bg-gray-800 h-16"></header>

        <main>
          <div className="z-10 col-span-12 mt-5">
            <Paper
              className=" m-10 w-sceen h-screen"
              style={{
                background: "rgba(255, 255, 255, 0.5 )",
                boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
                backdropFilter: "blur( 5.0px )",
                borderRadius: "20px",
                border: "1px solid rgba( 255, 255, 255, 0.18 )",
              }}
            >
              <Typography className="flex justify-center">
                <h1 className="mt-10 font-bold text-3xl text-gray-500">
                  {" "}
                  Dataset Manager
                </h1>
              </Typography>
              <div className="mt-5 flex justify-center">
                <button
                  onClick={() => {
                    history.push("/dashboard/datasets/newdata");
                  }}
                  className="p-2 transition duration-500 ease-in-out bg-green-400 text-white w-64 font-bold rounded-full hover:bg-green-500 filter drop-shadow-lg  transform hover:-translate-y-1 hover:scale-10"
                >
                  <AddCircleIcon />
                  Create New Dataset
                </button>
              </div>
              <div className="mt-10 flex justify-center">
                <Typography>
                  <h1 className="text-3xl font-semibold">OR</h1>
                </Typography>
              </div>
              <div className="mt-10 flex justify-center">
                <Typography>
                  <h1 className="text-xl font-semibold text-gray-500">
                    Select Below
                  </h1>
                </Typography>
              </div>
              <div className="mt-20 flex justify-center container mx-auto overflow-y-auto h-96">
                <div className="grid sm:grid-cols-1 lg: grid-cols-4 gap-5 md:grid-cols-3">
                  {datasets.length > 0 ? (
                    datasets.map((dataset) => (
                      <div
                        className="shadow-md bg-white w-64 h-72 rounded-xl hover:shadow-xl"
                        key={dataset.dataset_uuid}
                      >


                        <img
                          alt="thumbnail"
                          src={dataset.dataset_thumbnail}
                          className="h-40 object-cover rounded-t-xl "
                        />

                        <p className="px-5 mt-3 flex justify-between text-green-500 text-sm p-1 font-bold">
                          <h1 className="orders-frist">
                            {" "}
                            {dataset.dataset_name}
                          </h1>
                        </p>{" "}
                        <div className="px-5 mt-5 flex justify-start  text-sm">
                          <h1 className="text-blue-500 font-bold">
                            Total Image: {dataset.dataset_number_of_images}{" "}
                            Images
                          </h1>
                        </div>
                        <div className="flex justify-center text-gray-400 text-sm">
                          <Link to={`/dataset/${dataset.dataset_uuid}`}>
                            <button className="my-3 mx-3 p-1 bg-blue-500 text-white rounded-xl text-sm w-16 shadow-sm">
                              Veiw
                            </button>
                          </Link>
                        </div>
                        {project_uuid ? (
                          <div className="mt-1 flex justify-center text-gray-400 text-sm">
                            {!dataset.dataset_atteched_project.includes(
                              project_uuid
                            ) ? (
                              <button
                                className="mx-3 mt-10 p-1 bg-red-400 text-white rounded-xl text-sm w-64 shadow-sm "
                                onClick={() => {
                                  addDatasetToproject(
                                    project_uuid,
                                    dataset.dataset_uuid
                                  );
                                }}
                              >
                                Attach
                              </button>
                            ) : (
                              <button
                                className="mx-3 mt-10 p-1 bg-blue-400 text-white rounded-xl text-sm w-64 shadow-sm "
                                onClick={() => {
                                  removeDatasetToproject(
                                    project_uuid,
                                    dataset.dataset_uuid
                                  );
                                }}
                              >
                                Detach
                              </button>
                            )}
                          </div>
                        ) : null}
                      </div>
                    ))
                  ) : (
                    <div>
                      <h1 className="text-xl font-semibold text-gray-500">
                        Your don't have any datasets
                      </h1>
                    </div>
                  )}
                </div>
              </div>
            </Paper>
          </div>
        </main>
      </div>
    </div>
  );
}

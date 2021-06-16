import React, { useState, useContext } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Sidenavbar from "../../../components/objects/Sidenavbar";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import "@uppy/core/dist/style.css";
import "@uppy/dashboard/dist/style.css";
import {
  IconButton,
  Paper,
  Typography,
  TextField,
  TextareaAutosize,
} from "@material-ui/core";
import { mutate } from "swr";
import ModalPop from "../../../components/objects/Modal";
import { StoreContext } from "../../../context/store";

import CustomButton from "../../../components/objects/CustomButton";
import Lottie from "react-lottie";
import {
  successAnimationObjects,
  failedAnimationObjects,
  loadingringAnimationObjects,
} from "../../../components/animation/animation";

export default function NewProject() {
  const history = useHistory();
  const [project, setProject] = useState({});
  const [errors, setErrors] = useState({});
  const [loadingFetch, setLoadingFetch] = useState(false);
  const [errorsState, setErrorState] = useState({});
  const [success, setSuccess] = useState(false);
  const { userData, setOpenModal } = useContext(StoreContext);
  const [success_text, setSuccessText] = useState({});

  const url = process.env.REACT_APP_API_URL;
  const access_token = sessionStorage.getItem("access_token");

  function validate() {
    let errors = {};
    let errorsState = {};

    let isValid = true;

    if (!project.name) {
      isValid = false;
      errors["name"] = "Please enter your project name.";
      errorsState["name"] = true;
    }

    setErrorState(errorsState);
    setErrors(errors);

    return isValid;
  }
  function handleChange(e) {
    e.preventDefault();
    setProject({
      ...project,
      [e.target.name]: e.target.value,
    });
    validate();
  }

  function onSubmit(e) {
    e.preventDefault();
    let payload = {
      project_name: project.name,
      project_description: project.description,
    };
    // console.log(payload);
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    };
    if (validate()) {
      setTimeout(() => {
        setOpenModal(true);
        setLoadingFetch(true);
        setTimeout(() => {
          axios
            .post(`${url}/api/v1/create/project`, payload, {
              headers: headers,
            })
            .then((response) => {
              console.log(response.data);
              mutate("/api/v1/dashboard");
              mutate("/api/v1/userprojects");
              success_text["message"] = response.data.message;
              setSuccess(true);
              setSuccessText(success_text);
              setLoadingFetch(false);
            })
            .catch((error) => {
              setSuccess(false);
              setLoadingFetch(false);
              let errors = {};
              let error_detail = error.response.data.detail;
              errors["message"] = error_detail;
              setErrors(errors);
            });
        }, 3000);
      }, 1000);
    }
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
          {!success ? (
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
                <h1 className="title font-bold text-3xl">
                  {errors["message"]}
                </h1>
              </Typography>
            </div>
          ) : (
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
              <div className="mt-5 flex justify-center">
                {" "}
                <Typography>
                  <h1 className="font-bold">
                    Next step add or create new dataset
                  </h1>
                </Typography>
              </div>
              <div className="mt-5 flex justify-center">
                <button
                  className="p-2 bg-green-400 text-white w-24 rounded-3xl font-bold shadow-xl"
                  onClick={() => {
                    history.push("/dashboard/datasets/manage");
                  }}
                >
                  GO
                </button>{" "}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
  return (
    <div className="bg-right-top bg-auto bg-no-repeat bg-fixed bg-mainbackground2 flex h-screen">
      <Sidenavbar
        uuid={userData.uuid}
        username={userData.username}
        role={userData.role}
        profileImage={userData.profileImage}
      />

      <div className="flex flex-col flex-1 w-full overflow-y-auto">
        <header className="grid justify-items-stretch py-1 bg-gray-800 h-16"></header>

        <main>
          <ModalPop contents={modalContent} width={"450px"} height={"550px"} />
          <div className="z-10 col-span-12 mt-5">
            <Paper
              className="m-10 w-sceen h-full"
              style={{
                padding: "2rem",
                background: "rgba(255, 255, 255, 0.5 )",
                boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
                backdropFilter: "blur( 5.0px )",
                borderRadius: "20px",
                border: "1px solid rgba( 255, 255, 255, 0.18 )",
              }}
            >
              <div className="flex justify-start">
                <IconButton
                  onClick={() => {
                    window.history.back();
                  }}
                >
                  <KeyboardArrowLeftIcon
                    style={{
                      width: "40px",
                      height: "40px",
                    }}
                    className="text-green-400 text-xl hover:text-green-500"
                  />
                </IconButton>
              </div>
              <Typography className="flex justify-center">
                <h1 className="mt-10 font-bold text-3xl text-gray-500">
                  {" "}
                  Create Projects
                </h1>
              </Typography>
              <Typography className="flex justify-center">
                <h1 className="mt-10 font-bold text-xl text-green-500">
                  Your project name : &nbsp;
                  {project.name !== undefined ? `${project.name}` : null}
                </h1>
              </Typography>
              <form onSubmit={onSubmit}>
                <div className="mt-5 flex justify-center">
                  <TextField
                    style={{
                      marginTop: "30px",
                      width: "260px",
                    }}
                    className="w-full"
                    autoComplete="off"
                    label="Name your project"
                    name="name"
                    variant="outlined"
                    type="text"
                    helperText={errors["Name"]}
                    error={errorsState["name"]}
                    value={project.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="mt-5 flex justify-center">
                  <TextareaAutosize
                    name="description"
                    value={project.description}
                    onChange={handleChange}
                    className="p-2 w-96 border-4 border-green-400"
                    rowsMin={5}
                    placeholder="Your Projects Description (optional)"
                  ></TextareaAutosize>
                </div>
                <div className="mt-5 flex justify-center">
                  <CustomButton
                    name={"Create New Projects"}
                    type={"submit"}
                    classStyle={
                      "fixed mt-10 relative p-5 title text-sm font-bold transition duration-500 ease-in-out bg-green-400 text-white font-bold w-64 rounded-full hover:bg-green-500 filter drop-shadow-lg  transform hover:-translate-y-1 hover:scale-10"
                    }
                  />
                </div>
              </form>
            </Paper>
          </div>
        </main>
      </div>
    </div>
  );
}

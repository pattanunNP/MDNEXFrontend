import axios from "axios";
import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { StoreContext } from "../../context/store";
import { Paper, Typography, TextField } from "@material-ui/core";

import { useFormik } from "formik";
import Lottie from "react-lottie";

import {
  successAnimationObjects,
  failedAnimationObjects,
  loadingringAnimationObjects,
} from "../../components/animation/animation";

// Custom Import
import ModalPop from "../../components/objects/Modal";
import CustomButton from "../../components/objects/CustomButton";
import Navbar from "../../components/objects/Navbar";
import Footer from "../../components/objects/Footer";
import { LoginInfo } from "../../components/schema/validator";

export default function Login() {
  const { setOpenModal } = useContext(StoreContext);
  const [error, setError] = useState({});
  const [success, setSuccess] = useState(false);
  const [success_text, setSuccessText] = useState({});
  let baseUrl = process.env.REACT_APP_API_URL;
  const [loadingFetch, setLoadingFetch] = useState(false);
  const history = useHistory();

  const { handleSubmit, handleChange, values, touched, errors, handleBlur } =
    useFormik({
      initialValues: {
        username: "",
        password: "",
      },
      validationSchema: LoginInfo,
      onSubmit: ({ username, password }) => {
        let payload = {
          username: values.username,
          password: values.password,
        };
        setTimeout(() => {
          setLoadingFetch(false);

          setTimeout(() => {
            setLoadingFetch(true);
            setOpenModal(true);
            axios
              .post(`${baseUrl}/api/v1/login`, payload)
              .then((response) => {
                setSuccess(true);
                success_text["message"] = response.data.message;
                setSuccessText(success_text);
                sessionStorage.setItem(
                  "access_token",
                  response.data.access_token
                );
                sessionStorage.setItem(
                  "refresh_token",
                  response.data.refresh_token
                );
                setOpenModal(false);
                history.push("/dashboard");
                setSuccess(true);
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
          }, 2200);
        }, 1000);
      },
    });

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
    <div>
      <div className="bg-left-top bg-auto bg-no-repeat bg-fixed bg-mainbackground2 w-full h-screen">
        <Navbar btn_name={"Register"} btn_link={"/register"} />
        <ModalPop contents={modalContent} />

        <div className="flex justify-center item-center">
          <div>
            <Paper
              style={{
                height: "450px",
                width: "530px",
                borderRadius: "30px",
              }}
              variant="outlined"
              className="mt-10 p-4 bg-white-300 bg-opacity-40 shadow-lg blur-lg"
            >
              <Typography className="flex justify-center">
                <h1 className="title text-4xl font-bold">Login</h1>
              </Typography>
              <div
                style={{
                  marginTop: "20px",
                }}
                className=" 
          flex flex-wrap content-start content-between"
              >
                <form onSubmit={handleSubmit}>
                  <TextField
                    style={{
                      marginTop: "20px",
                    }}
                    className="mt-5 w-full"
                    label="username"
                    name="username"
                    variant="outlined"
                    type="text"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.username && errors.username}
                    helperText={errors.username}
                  />
                  <TextField
                    style={{
                      marginTop: "20px",
                    }}
                    className="mt-5 w-full"
                    name="password"
                    label="password"
                    variant="outlined"
                    type="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.password && errors.password}
                    helperText={errors.password}
                  />

                  <CustomButton
                    name={"Login"}
                    type={"submit"}
                    classStyle={
                      "mt-5 p-5 title text-sm font-bold transition duration-500 ease-in-out bg-red-400 text-white font-bold w-full rounded-full hover:bg-red-500 filter drop-shadow-lg  transform hover:-translate-y-1 hover:scale-10"
                    }
                  />
                </form>
              </div>

              <Typography className="mt-32">
                <a
                  href="/forgotpassword"
                  className="mt-20 title text-sm font-bold flex justify-self-stretch text-blue-300 hover:text-blue-400"
                >
                  {" "}
                  Forgot password ?
                </a>
                <a
                  href="/register"
                  className="font-medium text-blue-300 hover:text-blue-400"
                >
                  <span>Don't have accout</span> Register
                </a>
              </Typography>
            </Paper>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

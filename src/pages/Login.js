import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import CancelIcon from "@material-ui/icons/Cancel";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Typography, TextField } from "@material-ui/core";
import Modal from "../components/Modal";
import Lottie from "react-lottie";
import axios from "axios";
import successAnimation from "../components/animation/confirm.json";
import failedAnimation from "../components/animation/failed.json";
import submitingAnimation from "../components/animation/loadingring.json";
import CTA from "../components/CTA";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: "20px",

      width: "500px",
      height: "400px",
      borderRadius: "30px",
    },
  },
}));

export default function Login() {
  const [userdata, setUserData] = useState({});
  const [errors, setError] = useState({});
  const classes = useStyles();
  const [success, setSuccess] = useState(false);
  const [success_text, setSuccessText] = useState({});
  const [open, setOpen] = useState(false);
  let baseUrl = process.env.REACT_APP_API_URL;
  const [loadingFetch, setLoadingFetch] = useState(false);
  const history = useHistory();

  const defaultOptions2 = {
    loop: false,
    autoplay: true,
    animationData: successAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const defaultOptions3 = {
    loop: false,
    autoplay: true,
    animationData: failedAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const defaultOptions4 = {
    loop: false,
    autoplay: true,
    animationData: submitingAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  function handleChange(e) {
    e.preventDefault();
    setUserData({ ...userdata, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setOpen(true);
    setLoadingFetch(true);
    let payload = {
      username: userdata.username,
      password: userdata.password,
    };
    setTimeout(() => {
      axios
        .post(`${baseUrl}/api/v1/login`, payload)
        .then((response) => {
          setSuccess(true);
          // console.log(response.data);
          success_text["message"] = response.data.message;
          setSuccessText(success_text);
          sessionStorage.setItem("access_token", response.data.access_token);
          sessionStorage.setItem("refresh_token", response.data.refresh_token);
          history.push("/dashboard");
        })
        .catch((error) => {
          setSuccess(false);
          let errors = {};
          let error_detail = error.response.data.detail;
          errors["message"] = error_detail;
          setError(errors);
        });
      setLoadingFetch(false);
    }, 5000);
  }
  const modalContent = (
    <div className="flex justify-center">
      <Paper
        style={{
          margin: "50px",
          width: "450px",
          height: "450px",
          borderRadius: "30px",
        }}
      >
        {" "}
        <button
          className="p-3"
          onClick={() => {
            setOpen(false);
          }}
        >
          <CancelIcon className="flex justify-end text-red-500 text-3xl hover:text-red-600" />
        </button>
        {loadingFetch ? (
          <div>
            <Typography className="flex justify-center">
              <h1 className="title font-bold text-3xl">Processing ... </h1>
            </Typography>
            <Lottie
              style={{
                marginTop: "30px",
              }}
              options={defaultOptions4}
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
                  options={defaultOptions3}
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
                  options={defaultOptions2}
                  height={270}
                  width={270}
                ></Lottie>
                <Typography className="flex justify-center">
                  <h1 className="title font-bold text-3xl">
                    {success_text["message"]}
                  </h1>
                </Typography>
              </div>
            )}
          </div>
        )}
      </Paper>
    </div>
  );
  return (
    <div>
      <Modal open={open} content={modalContent} />
      <Typography>
        <h1 className="my-5 bg-white w-64  justify-self-center title text-2xl text-black font-semibold border-green-300">
          Welcome to
          <span className="text-indigo-400  border-white"> MD</span>
          <span className="text-pink-400  border-white">NEX</span>
        </h1>
      </Typography>
      <div className="bg-auto flex justify-center">
        <div className={classes.root}>
          <Paper
            variant="outlined"
            className=" p-5 bg-white-300 bg-opacity-40 shadow-lg blur-lg"
          >
            <Typography>
              <h1 className="title text-4xl font-bold">Login</h1>
            </Typography>
            <div
              style={{
                marginTop: "20px",
              }}
              className="h-56
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
                />

                <CTA
                  name={"Login"}
                  type={"submit"}
                  classStyle={
                    "mt-5 p-5 title text-sm font-bold transition duration-500 ease-in-out bg-red-400 text-white font-bold w-full rounded-full hover:bg-red-500 filter drop-shadow-lg  transform hover:-translate-y-1 hover:scale-10"
                  }
                />
              </form>
            </div>

            <a
              href="/forgotpassword"
              className="mt-5 title text-sm font-bold flex justify-self-stretch text-blue-300 hover:text-blue-400"
            >
              {" "}
              Forgot password ?
            </a>
          </Paper>
        </div>
      </div>
      <Typography>
        <a
          href="/register"
          className="font-medium text-white hover:text-blue-200"
        >
          <span>Don't have accout</span> Register
        </a>
      </Typography>
      <Typography>
        <a
          href="/contact"
          className="mx-3 font-medium text-white hover:text-blue-200 "
        >
          Contact us
        </a>

        <a
          href="/terms"
          className="mx-3 font-medium text-white hover:text-blue-200"
        >
          Terms of use
        </a>
      </Typography>
    </div>
  );
}

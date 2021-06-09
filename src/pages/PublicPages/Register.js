import React, { useState, useContext } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { StoreContext } from "../../context/store";

import {
  Paper,
  MenuItem,
  Typography,
  TextField,
  Select,
  FormControl,
} from "@material-ui/core";
import Lottie from "react-lottie";

import ModalPop from "../../components/objects/Modal";
import Navbar from "../../components/objects/Navbar";
import CustomButton from "../../components/objects/CustomButton";
import Footer from "../../components/objects/Footer";

import {
  successAnimationObjects,
  failedAnimationObjects,
  loadingringAnimationObjects,
} from "../../components/animation/animation";

export default function Register() {
  const [info, setInfo] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });
  const [errorState, setErrorState] = useState({});
  const [errors, setError] = useState({});
  const history = useHistory();
  const [success, setSuccess] = useState(false);
  const [success_text, setSuccessText] = useState({});
  const { setOpenModal } = useContext(StoreContext);
  let baseUrl = process.env.REACT_APP_API_URL;

  const [loadingFetch, setLoadingFetch] = useState(false);

  const handleChange = (e) => {
    e.preventDefault();
    setInfo({ ...info, [e.target.name]: e.target.value });
    validate();
  };

  function validate() {
    let errors = {};
    let errorsState = {};

    let isValid = true;

    if (!info.username) {
      isValid = false;
      errors["username"] = "Please enter your username.";
      errorsState["username"] = true;
    }

    if (!info.email) {
      isValid = false;
      errors["email"] = "Please enter your email Address.";
      errorsState["email"] = true;
    }
    if (typeof info.email !== "undefined") {
      var pattern = new RegExp("^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$");
      if (!pattern.test(info.email)) {
        isValid = false;
        errors["email"] = "Please enter valid email address.";
        errorsState["email"] = true;
      }
    }
    if (info.password.length <= 8) {
      isValid = false;
      errors["password"] = "Password must be equal 8 or more charecter";
      errorsState["password"] = true;
    }
    if (!info.password) {
      isValid = false;
      errors["password"] = "Please enter your password.";
      errorsState["password"] = true;
    }
    if (!info.role) {
      isValid = false;
      errors["role"] = "Please select your role.";
      errorsState["role"] = true;
    }
    if (!info.confirmPassword) {
      isValid = false;
      errors["confirm_password"] = "Please enter your confirm password.";
      errorsState["confirm_password"] = true;
    }
    if (
      typeof info.password !== "undefined" &&
      typeof info.confirmPassword !== "undefined"
    ) {
      if (info.password !== info.confirmPassword) {
        isValid = false;
        errors["password"] = "Passwords don't match.";
        errorsState["password"] = true;
      }
    }
    setErrorState(errorsState);
    setError(errors);

    return isValid;
  }
  function handleSubmit(e) {
    let success_text = {};
    e.preventDefault();
    if (validate()) {
      const payload = {
        username: info.username,
        email: info.email,
        password: info.password,
        role: info.role,
      };

      setTimeout(() => {
        setLoadingFetch(false);
        setOpenModal(false);

        setTimeout(() => {
          setOpenModal(true);
          setLoadingFetch(true);
          axios
            .post(`${baseUrl}/api/v1/register`, payload)
            .then((response) => {
              setSuccess(true);
              success_text["message"] = response.data.message;
              setSuccessText(success_text);
              setTimeout(() => {
                history.push(`/verify/email?uuid=${response.data.uuid}`);
                setInfo({
                  username: "",
                  email: "",
                  password: "",
                  confirmPassword: "",
                  role: "",
                });
              }, 5000);
            })
            .catch((error) => {
              setSuccess(false);
              setLoadingFetch(false);
              let errors = {};
              let error_detail = error.response.data.detail;
              errors["message"] = error_detail;
              setError(errors);
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
            </div>
          )}
        </div>
      )}
    </div>
  );
  return (
    <div>
      <div className="bg-right-top bg-auto bg-no-repeat bg-fixed bg-mainbackground2 w-full h-screen">
        <Navbar btn_name={"Login"} btn_link={"/login"} />
        <ModalPop contents={modalContent} width={"450px"} height={"450px"} />
        <div>
          <div className="flex justify-center">
            <div></div>

            <div>
              <Paper
                style={{
                  height: "710px",
                  borderRadius: "30px",
                }}
                variant="outlined"
                className="mt-10 p-4 w-96 bg-white-300 bg-opacity-40 shadow-lg blur-lg rounded-3xl"
              >
                <Typography className="flex justify-center">
                  <h1 className="title text-4xl font-bold">Register</h1>
                </Typography>
                <FormControl>
                  <form onSubmit={handleSubmit} autoComplete="off">
                    <div
                      style={{
                        marginTop: "30px",
                      }}
                      className="h-56 flex flex-wrap content-start content-between"
                    >
                      <TextField
                        style={{
                          marginTop: "30px",
                        }}
                        className="w-full"
                        autoComplete="off"
                        label="Username*"
                        name="username"
                        variant="outlined"
                        type="text"
                        value={info.userName}
                        error={errorState["username"]}
                        helperText={errors["username"]}
                        onChange={handleChange}
                      />
                      <TextField
                        style={{
                          marginTop: "30px",
                        }}
                        className="w-full"
                        autoComplete="off"
                        label="Email*"
                        name="email"
                        variant="outlined"
                        type="email"
                        value={info.email}
                        error={errorState["email"]}
                        helperText={errors["email"]}
                        onChange={handleChange}
                      />
                      <TextField
                        style={{
                          marginTop: "30px",
                        }}
                        className="w-full"
                        autoComplete="off"
                        label="Password*"
                        variant="outlined"
                        name="password"
                        type="password"
                        value={info.password}
                        error={errorState["password"]}
                        helperText={errors["password"]}
                        onChange={handleChange}
                      />
                      <TextField
                        style={{
                          marginTop: "30px",
                        }}
                        className=" my-10 w-full"
                        autoComplete="off"
                        label="Confrim password*"
                        variant="outlined"
                        name="confirmPassword"
                        type="password"
                        value={info.confirmPassword}
                        error={errorState["confrim password"]}
                        helperText={errors["confrim password"]}
                        onChange={handleChange}
                      />
                      <p className="mt-5 w-full text-black">Select Role</p>
                      <Select
                        error={errorState["role"]}
                        className="mt-5 w-full text-black"
                        name="role"
                        variant="filled"
                        label="Select Role"
                        value={info.role}
                        onChange={handleChange}
                        helperText={errors["role"]}
                      >
                        <MenuItem value="" disabled>
                          <em>Select Role</em>
                        </MenuItem>
                        <MenuItem value="visitor">Visitor</MenuItem>
                        <MenuItem value="co-responding">Corresponding</MenuItem>
                        <MenuItem value="researcher">Researcher</MenuItem>
                        <MenuItem value="labeler">Labeler</MenuItem>
                      </Select>
                      <CustomButton
                        name={"Register"}
                        type={"submit"}
                        classStyle={
                          "fixed mt-10 relative p-5 title text-sm font-bold transition duration-500 ease-in-out bg-green-400 text-white font-bold w-full rounded-full hover:bg-green-500 filter drop-shadow-lg  transform hover:-translate-y-1 hover:scale-10"
                        }
                      />
                    </div>
                  </form>
                </FormControl>
              </Paper>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

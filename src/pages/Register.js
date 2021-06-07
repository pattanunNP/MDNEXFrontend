import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import {
  Paper,
  MenuItem,
  Typography,
  InputLabel,
  TextField,
  Select,
} from "@material-ui/core";

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
  // const [success, setSuccess] = React.useState(false);
  // const [loading, setLoading] = React.useState(false);

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
    e.preventDefault();
    if (validate()) {
      const payload = {
        username: info.username,
        email: info.email,
        password: info.password,
        role: info.role,
      };
      axios
        .post(`http://127.0.0.1:8000/api/v1/register`, payload)
        .then((response) => {
          if (response.status === 200) {
            // console.log(response.data.uuid);
            console.log(
              `http://localhost:3000/verify/email?uuid=${response.data.uuid}`
            );
            return history.push(`/verify/email?uuid=${response.data.uuid}`);
            // setInfo({
            //   username: "",
            //   email: "",
            //   password: "",
            //   confirmPassword: "",
            //   role: "",
            // });
          }
        });
    }
  }
  return (
    <div>
      {/* <Navbar /> */}
      <Typography>
        <h1 className="bg-white w-64  justify-self-center title text-2xl text-black font-semibold border-green-300">
          Welcome to
          <span className="text-indigo-400  border-white"> MD</span>
          <span className="text-pink-400  border-white">NEX</span>
        </h1>
      </Typography>
      <div className="flex justify-center">
        <div>
          <Paper
            style={{
              height: "650px",
              borderRadius: "30px",
            }}
            variant="outlined"
            className="p-4 w-96 bg-white-300 bg-opacity-40 shadow-lg blur-lg rounded-3xl"
          >
            <Typography>
              <h1 className="title text-4xl font-bold">Register</h1>
            </Typography>
            <form onSubmit={handleSubmit} autoComplete="off">
              <div
                style={{
                  marginTop: "20px",
                }}
                className="h-56
          flex flex-wrap content-start content-between"
              >
                <TextField
                  style={{
                    marginTop: "20px",
                  }}
                  className="w-full"
                  id="outlined-basic"
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
                    marginTop: "20px",
                  }}
                  className="w-full"
                  autoComplete="off"
                  id="outlined-basic"
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
                    marginTop: "20px",
                  }}
                  className="w-full"
                  autoComplete="off"
                  id="outlined-basic"
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
                    marginTop: "20px",
                  }}
                  className=" my-10 w-full"
                  autoComplete="off"
                  id="outlined-basic"
                  label="Confrim password*"
                  variant="outlined"
                  name="confirmPassword"
                  type="password"
                  value={info.confirmPassword}
                  error={errorState["confrim password"]}
                  helperText={errors["confrim password"]}
                  onChange={handleChange}
                />
                <InputLabel className="mt-5">Select Role*</InputLabel>
                <Select
                  error={errorState["role"]}
                  className="mt-5 mb-5 w-full"
                  name="role"
                  variant="outlined"
                  value={info.role}
                  onChange={handleChange}
                  helperText={errors["role"]}
                >
                  <MenuItem value="" disabled>
                    Select Role
                  </MenuItem>
                  <MenuItem value="visitor">Visitor</MenuItem>
                  <MenuItem value="co-responding">Corresponding</MenuItem>
                  <MenuItem value="researcher">Researcher</MenuItem>
                  <MenuItem value="labeler">Labeler</MenuItem>
                </Select>

                <input
                  className="mt-5 p-5 title text-sm font-bold transition duration-500 ease-in-out bg-green-400 text-white font-bold w-full rounded-full hover:bg-green-500 filter drop-shadow-lg  transform hover:-translate-y-1 hover:scale-10"
                  type="submit"
                />
              </div>
            </form>
          </Paper>
        </div>
      </div>
      <Typography className="mt-10">
        <a href="/login" className="font-medium text-white hover:text-blue-200">
          <span>Already have accout</span> Login
        </a>
      </Typography>
      <Typography className="mt-10">
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

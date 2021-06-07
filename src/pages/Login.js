import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Typography, TextField } from "@material-ui/core";

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
  const classes = useStyles();
  return (
    <div>
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
              <TextField
                className="w-full"
                id="outlined-basic"
                label="username"
                variant="outlined"
                type="text"
              />
              <TextField
                className="w-full"
                id="outlined-basic"
                label="password"
                variant="outlined"
                type="password"
              />

              <a
                href="/forgotpassword"
                className="title text-sm font-bold flex justify-self-stretch text-blue-300 hover:text-blue-400"
              >
                {" "}
                Forgot password ?
              </a>
            </div>

            <button
              style={{
                marginTop: "20px",
              }}
              className="my-24 p-5 title text-sm font-bold transition duration-500 ease-in-out bg-red-400 text-white font-bold w-full rounded-full hover:bg-red-500 filter drop-shadow-lg  transform hover:-translate-y-1 hover:scale-10"
            >
              Login
            </button>
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

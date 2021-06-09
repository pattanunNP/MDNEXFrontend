import React, { Fragment } from "react";
import Navbar from "../components/Navbar";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Typography, TextField, Checkbox } from "@material-ui/core";

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
      <Navbar />
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

              <h1 className="title text-sm font-bold flex justify-self-start">
                {" "}
                <Checkbox inputProps={{ "aria-label": "primary checkbox" }} />
                Remember me ?
              </h1>
            </div>

            <button
              className="title text-sm font-bold"
              style={{
                marginTop: "20px",
              }}
              className="my-24 p-5 transition duration-500 ease-in-out bg-red-400 text-white font-bold w-full rounded-full hover:bg-red-500 filter drop-shadow-lg  transform hover:-translate-y-1 hover:scale-10"
            >
              Login
            </button>
          </Paper>
        </div>
      </div>
    </div>
  );
}

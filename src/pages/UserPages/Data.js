import React, { useState, useContext } from "react";

import { useHistory } from "react-router-dom";
import { StoreContext } from "../../context/store";
import AddCircleIcon from "@material-ui/icons/AddCircle";

import Sidenavbar from "../../components/objects/Sidenavbar";

import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";

import { IconButton, Paper, Typography } from "@material-ui/core";
import useDashboardFetch from "../../components/Hook/useDashboardFetch";

export default function Data() {
  const [opensidebar, setOpenSidebar] = useState(false);
  const { userData } = useContext(StoreContext);
  const url = process.env.REACT_APP_API_URL;
  const access_token = sessionStorage.getItem("access_token");
  useDashboardFetch(url, access_token);

  const history = useHistory();

  return (
    <div className="bg-right-top bg-auto bg-no-repeat bg-fixed bg-mainbackground2 flex h-screen">
      <Sidenavbar
        opensidebar={opensidebar}
        username={userData.username}
        role={userData.role}
        profileImage={userData.profileImage}
      />

      <div className="flex flex-col flex-1 w-full overflow-y-auto">
        <header className="grid justify-items-stretch py-1 bg-gray-800 h-16">
          <div className="justify-self-start">
            {opensidebar ? (
              <IconButton
                onClick={() => {
                  setOpenSidebar(false);
                }}
              >
                <KeyboardArrowRightIcon
                  style={{
                    width: "40px",
                    height: "40px",
                  }}
                  className="text-green-400 text-xl hover:text-green-500"
                />
              </IconButton>
            ) : (
              <IconButton
                onClick={() => {
                  setOpenSidebar(true);
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
            )}
          </div>
        </header>

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
                    history.push("/dashboard/data/newdata");
                  }}
                  className="p-2 transition duration-500 ease-in-out bg-green-400 text-white w-48 font-bold rounded-full hover:bg-green-500 filter drop-shadow-lg  transform hover:-translate-y-1 hover:scale-10"
                >
                  <AddCircleIcon />
                  Create New Dataset
                </button>
              </div>
            </Paper>
          </div>
        </main>
      </div>
    </div>
  );
}

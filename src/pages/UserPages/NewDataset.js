import React, { useState, useContext } from "react";

import Sidenavbar from "../../components/objects/Sidenavbar";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import "@uppy/core/dist/style.css";
import "@uppy/dashboard/dist/style.css";
import { IconButton, Paper, Typography, TextField } from "@material-ui/core";
import { StoreContext } from "../../context/store";
import Uppy from "@uppy/core";
import useDashboardFetch from "../../components/Hook/useDashboardFetch";

import { Dashboard } from "@uppy/react";

export default function NewData() {
  const [dataset, setDataset] = useState({});
  const { userData } = useContext(StoreContext);
  const url = process.env.REACT_APP_API_URL;
  const access_token = sessionStorage.getItem("access_token");
  useDashboardFetch(url, access_token);

  const [opensidebar, setOpenSidebar] = useState(false);

  function handleChange(e) {
    e.preventDefault();
    setDataset({ ...dataset, name: e.target.value });
  }
  const uppy = new Uppy({
    debug: true,
    autoProceed: false,
    restrictions: {
      maxFileSize: 2000000000,
      maxNumberOfFiles: 1000,
      minNumberOfFiles: 1,
      allowedFileTypes: ["image/*", "video/*"],
    },
  });
  uppy.on("complete", (result) => {
    const url = result.successful[0].uploadURL;
    console.log(url);
  });

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
                  Create Dataset
                </h1>
              </Typography>
              <Typography className="flex justify-center">
                <h1 className="mt-10 font-bold text-xl text-green-500">
                  Your dataset name : &nbsp;
                  {dataset.name !== undefined ? `${dataset.name}` : null}
                </h1>
              </Typography>

              <div className="mt-5 flex justify-center">
                <TextField
                  style={{
                    marginTop: "30px",
                    width: "260px",
                  }}
                  className="w-full"
                  autoComplete="off"
                  label="Name your dataset"
                  name="name"
                  variant="outlined"
                  type="text"
                  value={dataset.name}
                  onChange={handleChange}
                />
              </div>

              <div className="mt-10 flex justify-center ">
                <Dashboard uppy={uppy} />
              </div>
            </Paper>
          </div>
        </main>
      </div>
    </div>
  );
}

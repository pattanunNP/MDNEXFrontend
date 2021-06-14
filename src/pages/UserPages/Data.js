import React, { useContext } from "react";

import { useHistory } from "react-router-dom";
import { StoreContext } from "../../context/store";
import AddCircleIcon from "@material-ui/icons/AddCircle";

import Sidenavbar from "../../components/objects/Sidenavbar";

import { Paper, Typography } from "@material-ui/core";

export default function Data() {
  const { userData } = useContext(StoreContext);

  const history = useHistory();

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
